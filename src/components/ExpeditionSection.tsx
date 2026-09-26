import React, { useState, useRef, useEffect } from 'react';
import { Language, Currency, ExpeditionPackage } from '../types';
import { expeditionPackages } from '../data/paleoData';
import { translations } from '../data/translations';
import { getLocalizedText, getLocalizedList } from '../utils/localization';
import {
  Compass,
  Calendar,
  Users,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Upload,
  Video,
  Image as ImageIcon,
  X,
  Info,
  Check,
  RotateCcw,
} from 'lucide-react';

interface ExpeditionSectionProps {
  currentLang: Language;
  currentCurrency: Currency;
  onOpenBookingWithPackage: (pkg: ExpeditionPackage) => void;
}

const DB_NAME = 'bataar_media_db';
const STORE_NAME = 'videos';

function openExpeditionVideoDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported'));
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function saveExpeditionVideoToDB(file: File | Blob): Promise<void> {
  return openExpeditionVideoDB().then((db) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(file, 'expedition_popular_video');
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  });
}

function loadExpeditionVideoFromDB(): Promise<Blob | null> {
  return openExpeditionVideoDB().then((db) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get('expedition_popular_video');
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  });
}

export const ExpeditionSection: React.FC<ExpeditionSectionProps> = ({
  currentLang,
  currentCurrency,
  onOpenBookingWithPackage,
}) => {
  const t = translations[currentLang];
  const [expandedItinerary, setExpandedItinerary] = useState<string | null>('exp-roy-andrews');
  const [popularMediaTab, setPopularMediaTab] = useState<'video' | 'photo'>('video');
  const [customExpVideoUrl, setCustomExpVideoUrl] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showFullscreenVideo, setShowFullscreenVideo] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load persisted video from IndexedDB on mount
  useEffect(() => {
    loadExpeditionVideoFromDB()
      .then((blob) => {
        if (blob) {
          setCustomExpVideoUrl(URL.createObjectURL(blob));
        }
      })
      .catch(() => {});
  }, []);

  const activeVideoSource = customExpVideoUrl || '/expedition_popular_tour.mp4?v=3';

  const resetToDefaultVideo = async () => {
    try {
      const db = await openExpeditionVideoDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete('expedition_popular_video');
    } catch (e) {
      console.warn('Could not clear IndexedDB video:', e);
    }
    setCustomExpVideoUrl(null);
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsVideoMuted(videoRef.current.muted);
    }
  };

  const processVideoFile = async (file: File) => {
    if (!file || (!file.type.startsWith('video/') && !file.name.match(/\.(mp4|mov|m4v|webm|mkv)$/i))) {
      return;
    }

    // Immediately display preview in UI
    const localUrl = URL.createObjectURL(file);
    setCustomExpVideoUrl(localUrl);
    setPopularMediaTab('video');
    setIsVideoPlaying(true);
    setIsUploading(true);

    try {
      // 1. Cache in browser IndexedDB
      await saveExpeditionVideoToDB(file);

      // 2. Persist to server
      const response = await fetch('/api/upload-expedition-video', {
        method: 'POST',
        headers: {
          'Content-Type': file.type || 'video/mp4',
        },
        body: file,
      });

      if (response.ok) {
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 4000);
      }
    } catch (err) {
      console.warn('Expedition video save notice:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processVideoFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processVideoFile(file);
    }
  };

  // Currency Conversion rates
  const currencyRates: Record<Currency, { symbol: string; rate: number }> = {
    USD: { symbol: '$', rate: 1 },
    MNT: { symbol: '₮', rate: 3450 },
    EUR: { symbol: '€', rate: 0.92 },
    JPY: { symbol: '¥', rate: 155 },
  };

  const formatPrice = (priceUSD: number) => {
    const { symbol, rate } = currencyRates[currentCurrency];
    const converted = Math.round(priceUSD * rate);
    if (currentCurrency === 'MNT') {
      return `${converted.toLocaleString()} ${symbol}`;
    }
    return `${symbol}${converted.toLocaleString()}`;
  };

  const toggleItinerary = (pkgId: string) => {
    if (expandedItinerary === pkgId) {
      setExpandedItinerary(null);
    } else {
      setExpandedItinerary(pkgId);
    }
  };

  return (
    <section id="expeditions" className="py-24 bg-[#FAF9F5] text-stone-900 border-b border-stone-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="block text-[10px] uppercase font-bold tracking-[0.3em] text-stone-500 mb-2">
            {currentLang === 'mn' ? 'Хээрийн аяллууд & Экспедиц' : currentLang === 'en' ? 'Gobi Field Expeditions' : currentLang === 'ja' ? 'ゴビ探検ツアー' : '戈壁野外科考与探险'}
          </span>
          <h2 className="font-['Cormorant_Garamond',serif] text-4xl sm:text-5xl lg:text-6xl font-normal text-stone-900 mb-4 tracking-tight leading-[1.08]">
            {t.expeditions.sectionTitle}
          </h2>
          <p className="font-['Cormorant_Garamond',serif] italic text-xl sm:text-2xl text-stone-700 font-light leading-relaxed max-w-2xl mx-auto">
            {t.expeditions.sectionSubtitle}
          </p>
        </div>

        {/* Expedition Cards */}
        <div className="space-y-12">
          {expeditionPackages.map((pkg) => {
            const isItineraryOpen = expandedItinerary === pkg.id;
            const isPopularPackage = pkg.id === 'exp-roy-andrews';

            return (
              <div
                key={pkg.id}
                id={`expedition-package-${pkg.id}`}
                className="bg-white border border-stone-200/90 shadow-sm overflow-hidden transition duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Left Imagery & Video Spec */}
                  <div className="lg:col-span-5 relative min-h-[360px] lg:min-h-full bg-black flex flex-col justify-between overflow-hidden">
                    {/* Media Display: Video or Image */}
                    {isPopularPackage && popularMediaTab === 'video' ? (
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        className="relative w-full h-full min-h-[360px] flex items-center justify-center bg-black overflow-hidden group"
                      >
                        {/* Ambient glow */}
                        <video
                          src={activeVideoSource}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none"
                        />
                        {/* Main video playback */}
                        <video
                          ref={videoRef}
                          src={activeVideoSource}
                          autoPlay
                          loop
                          muted={isVideoMuted}
                          playsInline
                          className="relative z-10 w-full h-full object-cover"
                          onPlay={() => setIsVideoPlaying(true)}
                          onPause={() => setIsVideoPlaying(false)}
                        />

                        {/* Drag and drop active overlay */}
                        {isDragging && (
                          <div className="absolute inset-0 z-30 bg-amber-500/20 backdrop-blur-sm border-2 border-dashed border-amber-400 flex flex-col items-center justify-center p-6 text-center animate-pulse">
                            <Upload className="w-12 h-12 text-amber-400 mb-2" />
                            <p className="text-sm font-bold text-amber-200">
                              {currentLang === 'mn' ? '🚁 Дроны бичлэгийн файлаа энд тавина уу' : 'Drop your drone video file here'}
                            </p>
                          </div>
                        )}

                        {/* Video Controls Bar Overlay */}
                        <div className="absolute inset-0 z-20 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/80 opacity-95 transition-opacity flex flex-col justify-between p-4 pointer-events-none">
                          {/* Top Badges & Drone Telemetry HUD */}
                          <div className="space-y-2 pointer-events-auto">
                            <div className="flex items-center justify-between gap-2">
                              <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-amber-500 text-stone-950 shadow-lg flex items-center gap-1.5">
                                <span>{getLocalizedText(pkg.badge, currentLang)}</span>
                              </span>

                              {/* Video / Photo Tab Switcher */}
                              <div className="flex items-center gap-1 p-1 bg-stone-900/90 backdrop-blur-md rounded-xl border border-stone-700/80 shadow-lg">
                                <button
                                  onClick={() => setPopularMediaTab('video')}
                                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                                    popularMediaTab === 'video'
                                      ? 'bg-amber-500 text-stone-950 shadow'
                                      : 'text-stone-300 hover:text-white'
                                  }`}
                                >
                                  <Video className="w-3 h-3" />
                                  <span>{currentLang === 'mn' ? '🚁 Дроны бичлэг' : 'Drone Video'}</span>
                                </button>
                                <button
                                  onClick={() => setPopularMediaTab('photo')}
                                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                                    popularMediaTab === 'photo'
                                      ? 'bg-amber-500 text-stone-950 shadow'
                                      : 'text-stone-300 hover:text-white'
                                  }`}
                                >
                                  <ImageIcon className="w-3 h-3" />
                                  <span>{currentLang === 'mn' ? 'Зураг' : 'Photo'}</span>
                                </button>
                              </div>
                            </div>

                            {/* Drone Flight HUD */}
                            <div className="flex items-center justify-between text-[11px] font-mono tracking-wider text-amber-400/90 bg-black/60 px-3 py-1 rounded-lg backdrop-blur-md border border-amber-500/20">
                              <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span className="font-bold">DRONE 4K • TOST & KHUREN KHAN</span>
                              </div>
                              <span className="text-stone-300">ALT: 120M | 60FPS</span>
                            </div>
                          </div>

                          {/* Bottom Playback Action Bar */}
                          <div className="space-y-3 pointer-events-auto">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={toggleVideoPlay}
                                  className="w-8 h-8 rounded-full bg-stone-900/90 hover:bg-amber-500 hover:text-stone-950 text-white flex items-center justify-center backdrop-blur-md border border-stone-700 transition shadow-lg cursor-pointer"
                                  title={isVideoPlaying ? 'Pause' : 'Play'}
                                >
                                  {isVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                                </button>
                                <button
                                  onClick={toggleVideoMute}
                                  className="w-8 h-8 rounded-full bg-stone-900/90 hover:bg-amber-500 hover:text-stone-950 text-white flex items-center justify-center backdrop-blur-md border border-stone-700 transition shadow-lg cursor-pointer"
                                  title={isVideoMuted ? 'Unmute' : 'Mute'}
                                >
                                  {isVideoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                                </button>
                                <button
                                  onClick={() => setShowFullscreenVideo(true)}
                                  className="w-8 h-8 rounded-full bg-stone-900/90 hover:bg-amber-500 hover:text-stone-950 text-white flex items-center justify-center backdrop-blur-md border border-stone-700 transition shadow-lg cursor-pointer"
                                  title="Fullscreen modal"
                                >
                                  <Maximize2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Upload Drone Video Button */}
                              <div className="flex items-center gap-1.5">
                                {customExpVideoUrl && (
                                  <button
                                    onClick={resetToDefaultVideo}
                                    className="px-2.5 py-1.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-amber-400 border border-stone-700 text-xs font-semibold cursor-pointer transition shadow-md backdrop-blur-md flex items-center gap-1"
                                    title="Анхны төлөв рүү буцаах"
                                  >
                                    <RotateCcw className="w-3 h-3" />
                                    <span>{currentLang === 'mn' ? 'Анхны бичлэг' : 'Default'}</span>
                                  </button>
                                )}

                                <label
                                  htmlFor="popular-exp-video-upload"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 border border-amber-400 text-xs font-black cursor-pointer transition shadow-md backdrop-blur-md"
                                  title="Өөрийн дроны бичлэг оруулах"
                                >
                                  <Upload className="w-3.5 h-3.5" />
                                  <span>{isUploading ? (currentLang === 'mn' ? 'Хадгалж байна...' : 'Saving...') : (currentLang === 'mn' ? '🚁 Дроны бичлэг оруулах' : 'Upload Drone Video')}</span>
                                  <input
                                    id="popular-exp-video-upload"
                                    ref={fileInputRef}
                                    type="file"
                                    accept="video/*"
                                    className="hidden"
                                    onChange={handleVideoUpload}
                                  />
                                </label>

                                <button
                                  onClick={() => setShowHelpModal(true)}
                                  className="w-7 h-7 rounded-full bg-stone-900/90 hover:bg-stone-800 text-stone-400 hover:text-amber-400 flex items-center justify-center border border-stone-700 text-xs cursor-pointer transition"
                                  title="Messenger болон бичлэг оруулах заавар"
                                >
                                  <Info className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {uploadSuccess && (
                              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/90 border border-emerald-600 text-emerald-300 text-xs font-medium">
                                <Check className="w-3.5 h-3.5" />
                                <span>{currentLang === 'mn' ? 'Таны дроны бичлэг амжилттай хадгалагдлаа!' : 'Drone video successfully saved!'}</span>
                              </div>
                            )}

                            {/* Quick Specs Overlay */}
                            <div className="flex items-center justify-between text-xs text-stone-200 pt-1">
                              <span className="bg-stone-950/85 px-3 py-1.5 rounded-xl border border-stone-800 backdrop-blur-md flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                                <span>{pkg.durationDays} {t.expeditions.days}</span>
                              </span>
                              <span className="bg-stone-950/85 px-3 py-1.5 rounded-xl border border-stone-800 backdrop-blur-md flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5 text-amber-400" />
                                <span>{pkg.groupSize}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-full min-h-[360px]">
                        <img
                          src={pkg.image}
                          alt={pkg.title[currentLang]}
                          className="w-full h-full object-cover filter contrast-110 brightness-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

                        {/* Top Badge & Switcher */}
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                          <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-amber-500 text-stone-950 shadow-lg">
                            {getLocalizedText(pkg.badge, currentLang)}
                          </span>

                          {isPopularPackage && (
                            <button
                              onClick={() => setPopularMediaTab('video')}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 text-stone-950 shadow-lg transition cursor-pointer hover:bg-amber-400"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>{currentLang === 'mn' ? '🎬 Дроны бодит бичлэг үзэх' : 'Watch Drone Tour'}</span>
                            </button>
                          )}
                        </div>

                        {/* Quick Specs Overlay */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-stone-200">
                          <span className="bg-stone-950/85 px-3 py-1.5 rounded-xl border border-stone-800 backdrop-blur-md flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-amber-400" />
                            <span>{pkg.durationDays} {t.expeditions.days}</span>
                          </span>
                          <span className="bg-stone-950/85 px-3 py-1.5 rounded-xl border border-stone-800 backdrop-blur-md flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-amber-400" />
                            <span>{pkg.groupSize}</span>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Content & Inclusions */}
                  <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6 text-stone-900">
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-stone-500 uppercase tracking-[0.25em] mb-2">
                        <span>{getLocalizedText(pkg.season, currentLang)}</span>
                        <span>•</span>
                        <span className="text-stone-600">{getLocalizedText(pkg.difficultyLabel, currentLang)}</span>
                      </div>

                      <h3 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl font-normal text-stone-900 mb-2">
                        {getLocalizedText(pkg.title, currentLang)}
                      </h3>

                      <p className="font-['Cormorant_Garamond',serif] italic text-base sm:text-lg text-stone-700 leading-relaxed mb-6 font-light">
                        {getLocalizedText(pkg.subtitle, currentLang)}
                      </p>

                      {/* Inclusions Checkmarks */}
                      <div className="space-y-2.5 mb-6">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                          <span>{t.expeditions.included}</span>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                          {getLocalizedList(pkg.included, currentLang).map((inc, i) => (
                            <div key={i} className="flex items-start gap-2 bg-[#FAF9F5] p-2.5 border border-stone-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-stone-800 shrink-0 mt-0.5" />
                              <span className="line-clamp-2 font-light">{inc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Price & Action Button Footer */}
                    <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <div className="text-[10px] text-stone-500 uppercase tracking-widest font-semibold">{t.expeditions.pricePerPerson}</div>
                        <div className="text-3xl sm:text-4xl font-normal text-stone-900 font-['Cormorant_Garamond',serif]">
                          {formatPrice(pkg.priceUSD)}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                          onClick={() => toggleItinerary(pkg.id)}
                          className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-3.5 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold uppercase tracking-wider border border-stone-300 transition cursor-pointer"
                        >
                          <span>{isItineraryOpen ? (currentLang === 'mn' ? 'Хөтөлбөр хумих' : 'Hide Schedule') : t.expeditions.itinerary}</span>
                          {isItineraryOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        <button
                          id={`book-pkg-btn-${pkg.id}`}
                          onClick={() => onOpenBookingWithPackage(pkg)}
                          className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-7 py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-[0.25em] shadow-sm transition cursor-pointer whitespace-nowrap"
                        >
                          <span>{t.expeditions.bookNow}</span>
                          <ArrowRight className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Collapsible Full Day-by-Day Itinerary */}
                {isItineraryOpen && (
                  <div className="border-t border-stone-200 bg-[#FAF9F5] p-6 sm:p-8 animate-fade-in text-stone-900">
                    <h4 className="font-['Cormorant_Garamond',serif] text-2xl font-normal text-stone-900 mb-6 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-stone-700" />
                      <span>{t.expeditions.dayByDaySchedule}</span>
                    </h4>

                    <div className="space-y-4">
                      {pkg.itinerary.map((item) => (
                        <div
                          key={item.day}
                          className="flex items-start gap-4 p-4 bg-white border border-stone-200"
                        >
                          <div className="w-12 h-12 bg-stone-100 border border-stone-200 flex flex-col items-center justify-center shrink-0">
                            <span className="text-[10px] text-stone-500 uppercase font-bold">DAY</span>
                            <span className="text-base font-medium font-serif text-stone-900">{item.day}</span>
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold font-serif text-stone-900 mb-1">
                              {getLocalizedText(item.title, currentLang)}
                            </h5>
                            <p className="text-xs text-stone-600 leading-relaxed font-light">
                              {getLocalizedText(item.desc, currentLang)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      {showFullscreenVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fade-in">
          <div className="relative w-full max-w-5xl bg-stone-950 rounded-2xl border border-stone-800 overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 bg-stone-900 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Video className="w-4 h-4" />
                <span>{currentLang === 'mn' ? 'Хамгийн эрэлттэй экспедицийн бодит бичлэг' : 'Most Popular Expedition Real Footage'}</span>
              </div>
              <button
                onClick={() => setShowFullscreenVideo(false)}
                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <video
                ref={modalVideoRef}
                src={activeVideoSource}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Messenger & Upload Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-amber-300 flex items-center gap-2">
                <Info className="w-4 h-4" />
                <span>{currentLang === 'mn' ? 'Бичлэг байршуулах заавар' : 'Video Upload Instructions'}</span>
              </h4>
              <button
                onClick={() => setShowHelpModal(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-stone-300 space-y-2.5 leading-relaxed">
              <p>
                {currentLang === 'mn'
                  ? 'Messenger дээрх "blob:https://www.messenger.com/..." холбоос нь зөвхөн таны тухайн цонхны түр санах ойд (browser memory) байдаг тул хамгаалалтын дүрмийн улмаас өөр сайт шууд татаж авах боломжгүй байдаг.'
                  : 'Messenger blob URLs are restricted to your active browser session and cannot be fetched directly by third-party servers.'}
              </p>
              <div className="p-3.5 bg-stone-950 rounded-xl border border-amber-500/20 space-y-2">
                <div className="font-bold text-amber-400 flex items-center gap-1.5">
                  <span>🚁 Дроны бичлэгээ оруулах 2 хялбар алхам:</span>
                </div>
                <div className="text-stone-200">
                  <span className="font-bold text-amber-300">1.</span> Messenger дээрх дроны бичлэг дээрээ хулганы баруун товчоо дараад (эсвэл 3 цэг дээр дарж) <span className="text-amber-200 underline">"Save video as..." (Видеог хадгалах)</span> хийнэ.
                </div>
                <div className="text-stone-200">
                  <span className="font-bold text-amber-300">2.</span> Татаж авсан видеогоо энэхүү карт дээр <span className="text-amber-200 font-semibold">шууд чирч тавих (Drag & Drop)</span> эсвэл доорх шар товчоор сонгоно.
                </div>
              </div>
              <p className="text-[11px] text-emerald-400/90 font-medium">
                {currentLang === 'mn'
                  ? '✨ Оруулсан дроны бичлэг нь систем болон серверт бүрэн хадгалагдаж, бүх зочдод шууд харагдах болно.'
                  : 'Uploaded drone videos are persisted to the server for all visitors.'}
              </p>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <label
                htmlFor="modal-exp-video-upload"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl cursor-pointer transition flex items-center gap-1.5"
                onClick={() => setShowHelpModal(false)}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{currentLang === 'mn' ? 'Одоо файл сонгох' : 'Select File Now'}</span>
                <input
                  id="modal-exp-video-upload"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleVideoUpload}
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
