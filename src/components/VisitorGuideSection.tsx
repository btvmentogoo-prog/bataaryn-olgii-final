import React, { useState } from 'react';
import { Language, Currency } from '../types';
import { translations } from '../data/translations';
import { 
  Tent, 
  MapPin, 
  Users, 
  Sun, 
  Wifi, 
  Coffee, 
  Compass, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  Bed, 
  ChevronRight,
  Eye,
  CheckCircle2,
  Play,
  Pause,
  Maximize2,
  Volume2,
  VolumeX,
  RotateCcw,
  Upload,
  Film,
  X,
  Smartphone,
  Check,
  Loader2,
  Route,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Download,
  Camera,
  Image as ImageIcon
} from 'lucide-react';
import campPanoramicImg from '../assets/images/bataar_camp_exact_official.jpg';
import campLodgeRoomImg from '../assets/images/bataar_camp_lodge_room_1788608056966.jpg';
import deluxeRoomImg from '../assets/images/deluxe_hotel_room_1788105870634.jpg';
import standardRoomImg from '../assets/images/standard_hotel_room_1788105443352.jpg';
import familyMasterImg from '../assets/images/family_suite_master_bedroom_1788610220821.jpg';
import familyTwinImg from '../assets/images/family_suite_twin_room_1788610237421.jpg';
import familyBathImg from '../assets/images/family_suite_bathroom_1788610251261.jpg';

interface VisitorGuideProps {
  currentLang: Language;
  currentCurrency: Currency;
  onOpenBooking: () => void;
}

const DB_NAME = 'bataar_media_db';
const STORE_NAME = 'videos';

function openVideoDB(): Promise<IDBDatabase> {
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

function saveVideoToDB(file: File | Blob): Promise<void> {
  return openVideoDB().then((db) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(file, 'suite_video');
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  });
}

function loadVideoFromDB(): Promise<Blob | null> {
  return openVideoDB().then((db) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get('suite_video');
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  });
}

function savePanoramaToDB(file: File | Blob): Promise<void> {
  return openVideoDB().then((db) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(file, 'camp_panorama');
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  });
}

function loadPanoramaFromDB(): Promise<Blob | null> {
  return openVideoDB().then((db) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get('camp_panorama');
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  });
}

export const VisitorGuideSection: React.FC<VisitorGuideProps> = ({
  currentLang,
  currentCurrency,
  onOpenBooking,
}) => {
  const t = translations[currentLang];
  const vg = t.visitorGuide;
  const [campHeroView, setCampHeroView] = useState<'lodge' | 'panorama'>('panorama');
  const [showPanoramaModal, setShowPanoramaModal] = useState<boolean>(false);
  const [panoramaZoom, setPanoramaZoom] = useState<number>(1);
  const [customPanoramaUrl, setCustomPanoramaUrl] = useState<string | null>(null);
  const [isPanoramaUploading, setIsPanoramaUploading] = useState<boolean>(false);
  const [panoramaUploadSuccess, setPanoramaUploadSuccess] = useState<boolean>(false);
  const panoramaFileInputRef = React.useRef<HTMLInputElement | null>(null);

  const [selectedGerTab, setSelectedGerTab] = useState<'deluxe' | 'standard' | 'family'>('deluxe');
  const [familyMediaTab, setFamilyMediaTab] = useState<'video' | 'master' | 'twin' | 'bath'>('video');
  const [customVideoUrl, setCustomVideoUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = React.useRef<HTMLVideoElement | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Restore video and custom authentic panorama from IndexedDB on component mount
  React.useEffect(() => {
    loadVideoFromDB()
      .then((blob) => {
        if (blob) {
          setCustomVideoUrl(URL.createObjectURL(blob));
        }
      })
      .catch(() => {});

    loadPanoramaFromDB()
      .then((blob) => {
        if (blob) {
          setCustomPanoramaUrl(URL.createObjectURL(blob));
        }
      })
      .catch(() => {});
  }, []);

  const handleUploadPanorama = async (file: File) => {
    if (!file) return;
    setIsPanoramaUploading(true);
    setPanoramaUploadSuccess(false);

    // Instant local view with zero waiting
    const localUrl = URL.createObjectURL(file);
    setCustomPanoramaUrl(localUrl);

    try {
      // Save locally to IndexedDB so it never disappears
      await savePanoramaToDB(file);

      // Post to backend for ImageMagick 300 DPI auto-level & unsharp enhancement
      const res = await fetch('/api/upload-camp-panorama', {
        method: 'POST',
        headers: { 'Content-Type': file.type || 'image/jpeg' },
        body: file,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          setCustomPanoramaUrl(`${data.url}&ts=${Date.now()}`);
        }
      }
      setPanoramaUploadSuccess(true);
      setTimeout(() => setPanoramaUploadSuccess(false), 7000);
    } catch (err) {
      console.warn('Backend sync failed, using local master image:', err);
      setPanoramaUploadSuccess(true);
    } finally {
      setIsPanoramaUploading(false);
    }
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

  const handleRestartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  const processUploadedVideoFile = async (file: File) => {
    if (!file) return;

    // 1. Instant local playback
    const url = URL.createObjectURL(file);
    setCustomVideoUrl(url);
    setFamilyMediaTab('video');
    setIsVideoPlaying(true);
    setIsUploading(true);
    setUploadSuccess(false);

    // 2. Persist in local browser IndexedDB
    try {
      await saveVideoToDB(file);
    } catch (err) {
      console.warn('Could not cache video locally in IndexedDB:', err);
    }

    // 3. Persist to server so all visitors can see it
    try {
      const response = await fetch('/api/upload-suite-video', {
        method: 'POST',
        headers: {
          'Content-Type': file.type || 'video/mp4',
        },
        body: file,
      });

      if (response.ok) {
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 7000);
      }
    } catch (err) {
      console.error('Server upload failed:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCustomVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processUploadedVideoFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type.startsWith('video/') || file.name.match(/\.(mp4|mov|m4v|webm)$/i))) {
      processUploadedVideoFile(file);
    }
  };

  const currentVideoSrc = customVideoUrl || '/family_suite_tour.mp4';

  const gerData = {
    deluxe: {
      title: vg.deluxeGerTitle,
      desc: vg.deluxeGerDesc,
      price: vg.deluxeGerPrice,
      badge: '⭐ VIP Deluxe Suite',
      specs: [
        currentLang === 'mn' ? 'Модон доторлогоотой, том давхар ор' : 'Pine wood walls, king-size bed',
        currentLang === 'mn' ? 'Хувийн халуун шүршүүр & 00' : 'Private ensuite bathroom',
        currentLang === 'mn' ? 'Starlink өндөр хурдны Wi-Fi' : 'High-speed Starlink Wi-Fi',
        currentLang === 'mn' ? 'Өглөөний зоог багтсан' : 'Gourmet breakfast included',
      ],
      image: deluxeRoomImg,
    },
    standard: {
      title: vg.standardGerTitle,
      desc: vg.standardGerDesc,
      price: vg.standardGerPrice,
      badge: '🏡 Eco Cabin Room',
      specs: [
        currentLang === 'mn' ? '2 тав тухтай ор' : '2 comfortable twin beds',
        currentLang === 'mn' ? 'Монгол хээтэй уламжлалт ширээ' : 'Traditional painted table & stool',
        currentLang === 'mn' ? 'Цонхоор бааз харагдах цэлгэр харагдац' : 'Scenic camp & yurt view window',
        currentLang === 'mn' ? 'Цэвэр модон интерьер & цэвэр ариун цэврийн өрөө' : 'Warm pine interior & clean bathhouse access',
      ],
      image: campLodgeRoomImg,
    },
    family: {
      title: vg.familyGerTitle,
      desc: vg.familyGerDesc,
      price: vg.familyGerPrice,
      badge: '🎥 Бодит Видео Тоймтой • Family Suite',
      specs: [
        currentLang === 'mn' ? '2 тусдаа унтлагын өрөө (Мастер + 2 ортой)' : '2 separate bedrooms (Master + Twin)',
        currentLang === 'mn' ? 'Хувийн халуун хүйтэн шүршүүр, 00, толь' : 'Private ensuite bathroom with hot shower & vanity',
        currentLang === 'mn' ? '4-6 хүн тухлах цэлгэр модон эко байшин' : 'Spacious wooden eco lodge for 4-6 guests',
        currentLang === 'mn' ? 'Говийн тэнгэрийн хаяа харагдах том цонхнууд' : 'Large windows with open Gobi horizon views',
        currentLang === 'mn' ? 'Шууд үзэх өрөөний видео танилцуулгатай' : 'Integrated video walkthrough tour',
      ],
      image: familyMasterImg,
    },
  };

  const amenities = [
    {
      icon: <Coffee className="w-5 h-5 text-amber-400" />,
      title: vg.amenityDining,
      desc: vg.amenityDiningDesc,
    },
    {
      icon: <Sparkles className="w-5 h-5 text-indigo-400" />,
      title: vg.amenityStargazing,
      desc: vg.amenityStargazingDesc,
    },
    {
      icon: <Compass className="w-5 h-5 text-amber-400" />,
      title: vg.amenitySafari,
      desc: vg.amenitySafariDesc,
    },
    {
      icon: <Sun className="w-5 h-5 text-amber-400" />,
      title: vg.amenitySolar,
      desc: vg.amenitySolarDesc,
    },
    {
      icon: <Wifi className="w-5 h-5 text-teal-400" />,
      title: vg.amenityWifi,
      desc: vg.amenityWifiDesc,
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: vg.amenityFieldBase,
      desc: vg.amenityFieldBaseDesc,
    },
  ];

  return (
    <section id="visitor-guide" className="py-24 bg-white text-stone-900 border-b border-stone-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="block text-[10px] uppercase font-bold tracking-[0.3em] text-stone-500 mb-2">
            {vg.badge}
          </span>
          <h2 className="font-['Cormorant_Garamond',serif] text-4xl sm:text-5xl lg:text-6xl font-normal text-stone-900 leading-[1.08] tracking-tight mb-4">
            {vg.sectionTitle}
          </h2>
          <p className="font-['Cormorant_Garamond',serif] italic text-xl sm:text-2xl text-stone-700 font-light leading-relaxed max-w-2xl mx-auto">
            {vg.sectionSubtitle}
          </p>
        </div>

        {/* Camp Hero Panoramic Presentation: Clean Authentic Photo + Introduction */}
        <div className="relative overflow-hidden border border-stone-200 shadow-md mb-16">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] max-h-[540px] w-full">
            <img
              src={customPanoramaUrl || campPanoramicImg}
              alt="Батаарын өлгий жуулчны бааз"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {/* Subtle gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />

            {/* Introduction Only */}
            <div className="absolute inset-0 p-6 sm:p-10 lg:p-12 flex flex-col justify-end">
              <div className="max-w-4xl">
                <h3 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-100 mb-3 drop-shadow">
                  {vg.campName}
                </h3>
                <p className="font-['Cormorant_Garamond',serif] italic text-base sm:text-lg lg:text-xl text-stone-200 font-light leading-relaxed drop-shadow max-w-3xl">
                  {vg.campDesc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Facts Strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-20">
          <div className="p-6 bg-[#FAF9F5] border border-stone-200/80 hover:border-stone-400 transition flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-stone-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{vg.locationLabel}</span>
              </div>
              <div className="text-sm font-semibold text-stone-900 mt-1">{vg.locationValue}</div>
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=43.6820,102.4150&travelmode=driving"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-stone-900 hover:text-amber-800 tracking-wider uppercase"
            >
              <span>Google Maps GPS чиглэл</span>
              <span className="text-[9px]">↗</span>
            </a>
          </div>

          <div className="p-6 bg-[#FAF9F5] border border-stone-200/80 hover:border-stone-400 transition">
            <div className="flex items-center gap-2 text-stone-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
              <Users className="w-3.5 h-3.5" />
              <span>{vg.capacityLabel}</span>
            </div>
            <div className="text-sm font-semibold text-stone-900 mt-1">{vg.capacityValue}</div>
          </div>

          <div className="p-6 bg-[#FAF9F5] border border-stone-200/80 hover:border-stone-400 transition">
            <div className="flex items-center gap-2 text-stone-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{vg.seasonLabel}</span>
            </div>
            <div className="text-sm font-semibold text-stone-900 mt-1">{vg.seasonValue}</div>
          </div>

          <div className="p-6 bg-[#FAF9F5] border border-stone-200/80 hover:border-stone-400 transition">
            <div className="flex items-center gap-2 text-stone-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
              <Sun className="w-3.5 h-3.5" />
              <span>{vg.energyLabel}</span>
            </div>
            <div className="text-sm font-semibold text-stone-900 mt-1">{vg.energyValue}</div>
          </div>

          <div className="col-span-2 md:col-span-1 lg:col-span-1 p-6 bg-[#FAF9F5] border border-stone-200/80 hover:border-stone-400 transition">
            <div className="flex items-center gap-2 text-stone-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
              <Phone className="w-3.5 h-3.5" />
              <span>{vg.contactLabel}</span>
            </div>
            <div className="text-xs font-semibold text-stone-900 mt-2 grid grid-cols-1 gap-1">
              <div>
                <a href="tel:+97672010099" className="hover:text-amber-800 transition font-mono">
                  +976 7201 0099
                </a>
              </div>
              <div>
                <a href="tel:+97688223584" className="hover:text-amber-800 transition font-mono">
                  +976 8822 3584
                </a>
              </div>
              <div>
                <a href="tel:+97699530099" className="hover:text-amber-800 transition font-mono">
                  +976 9953 0099
                </a>
              </div>
              <div>
                <a href="tel:+97699723336" className="hover:text-amber-800 transition font-mono">
                  +976 9972 3336
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Ger Accommodation Types Section */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="block text-[10px] uppercase font-bold tracking-[0.3em] text-stone-500 mb-1">
                {vg.gersTitle}
              </span>
              <h3 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl font-normal text-stone-900 mt-1">
                {currentLang === 'mn' ? 'Тав тухтай эко өрөөнүүд' : currentLang === 'ja' ? '快適なエコ客室・宿泊ロッジ' : currentLang === 'zh' ? '舒适生态客房与特色木屋' : 'Comfortable Eco Rooms & Lodges'}
              </h3>
              <p className="font-['Cormorant_Garamond',serif] italic text-lg text-stone-600 mt-1 max-w-xl">
                {vg.gersSubtitle}
              </p>
            </div>

            {/* Ger / Room Selector Tabs */}
            <div className="flex items-center p-1 border border-stone-300 bg-[#FAF9F5]">
              <button
                onClick={() => setSelectedGerTab('deluxe')}
                className={`px-5 py-2.5 text-[11px] font-semibold tracking-widest uppercase transition cursor-pointer ${
                  selectedGerTab === 'deluxe'
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {currentLang === 'mn' ? 'Люкс Өрөө' : currentLang === 'ja' ? 'デラックス' : currentLang === 'zh' ? '豪华客房' : 'Deluxe Room'}
              </button>
              <button
                onClick={() => setSelectedGerTab('standard')}
                className={`px-5 py-2.5 text-[11px] font-semibold tracking-widest uppercase transition cursor-pointer ${
                  selectedGerTab === 'standard'
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {currentLang === 'mn' ? 'Стандарт Өрөө' : currentLang === 'ja' ? 'スタンダード' : currentLang === 'zh' ? '标准客房' : 'Standard Room'}
              </button>
              <button
                onClick={() => setSelectedGerTab('family')}
                className={`px-5 py-2.5 text-[11px] font-semibold tracking-widest uppercase transition cursor-pointer ${
                  selectedGerTab === 'family'
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {currentLang === 'mn' ? 'Гэр бүлийн Свифт' : currentLang === 'ja' ? 'ファミリー' : currentLang === 'zh' ? '家庭套房' : 'Family Suite'}
              </button>
            </div>
          </div>

          {/* Active Ger Presentation Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF9F5] border border-stone-200/80 p-6 sm:p-10 shadow-sm">
            {selectedGerTab === 'family' ? (
              <div className="lg:col-span-6 flex flex-col space-y-3">
                {/* Sub-tabs to choose Video Tour or Room photos */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-1 p-1 bg-white border border-stone-200">
                    <button
                      type="button"
                      onClick={() => setFamilyMediaTab('video')}
                      className={`px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase transition flex items-center gap-1.5 cursor-pointer ${
                        familyMediaTab === 'video'
                          ? 'bg-stone-900 text-white shadow-sm'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <Film className="w-3.5 h-3.5" />
                      <span>{currentLang === 'mn' ? 'Видео тойм' : 'Video Tour'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFamilyMediaTab('master')}
                      className={`px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase transition flex items-center gap-1.5 cursor-pointer ${
                        familyMediaTab === 'master'
                          ? 'bg-stone-900 text-white shadow-sm'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <Bed className="w-3.5 h-3.5" />
                      <span>{currentLang === 'mn' ? 'Мастер өрөө' : 'Master Bed'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFamilyMediaTab('twin')}
                      className={`px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase transition flex items-center gap-1.5 cursor-pointer ${
                        familyMediaTab === 'twin'
                          ? 'bg-stone-900 text-white shadow-sm'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <Bed className="w-3.5 h-3.5" />
                      <span>{currentLang === 'mn' ? '2-р өрөө' : 'Twin Room'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFamilyMediaTab('bath')}
                      className={`px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase transition flex items-center gap-1.5 cursor-pointer ${
                        familyMediaTab === 'bath'
                          ? 'bg-stone-900 text-white shadow-sm'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{currentLang === 'mn' ? 'Ариун цэвэр' : 'Ensuite'}</span>
                    </button>
                  </div>

                  {/* Upload/Replace video action */}
                  <label className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-500 hover:text-stone-900 transition cursor-pointer px-2 py-1">
                    <Upload className="w-3 h-3" />
                    <span>{currentLang === 'mn' ? 'Өөрийн бичлэг сонгох' : 'Upload video'}</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/*"
                      onChange={handleCustomVideoUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Media frame */}
                <div className="overflow-hidden border border-stone-200 shadow-md aspect-[16/10] relative group bg-stone-950">
                  {familyMediaTab === 'video' ? (
                    <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
                      {/* Ambient background blur */}
                      <video
                        src={currentVideoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-110 pointer-events-none"
                      />

                      {/* Authentic uncropped video playing at its original aspect ratio */}
                      <video
                        ref={videoRef}
                        src={currentVideoSrc}
                        autoPlay
                        loop
                        muted={isVideoMuted}
                        playsInline
                        className="relative z-10 max-w-full max-h-full object-contain mx-auto"
                        onPlay={() => setIsVideoPlaying(true)}
                        onPause={() => setIsVideoPlaying(false)}
                      />

                      {/* Video status badge */}
                      <div className="absolute top-3 left-3 px-3 py-1 bg-stone-950/85 backdrop-blur-md border border-white/20 text-stone-200 text-xs font-semibold flex items-center gap-1.5 shadow-lg z-20">
                        <Film className="w-3.5 h-3.5 text-amber-400" />
                        <span>{currentLang === 'mn' ? 'Гэр бүлийн свифт — Бодит тойм бичлэг' : 'Family Suite — Walkthrough Tour'}</span>
                      </div>

                      {/* Video Player overlay controls */}
                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between gap-2 opacity-95 group-hover:opacity-100 transition z-20">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={toggleVideoPlay}
                            className="p-2 bg-stone-900/80 hover:bg-white hover:text-stone-950 text-stone-200 transition border border-stone-700/60 cursor-pointer"
                            title={isVideoPlaying ? 'Зогсоох' : 'Тоглуулах'}
                          >
                            {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                          </button>
                          <button
                            type="button"
                            onClick={toggleVideoMute}
                            className="p-2 bg-stone-900/80 hover:bg-white hover:text-stone-950 text-stone-200 transition border border-stone-700/60 cursor-pointer"
                            title={isVideoMuted ? 'Дуу асаах' : 'Дуу хаах'}
                          >
                            {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                          </button>
                          <button
                            type="button"
                            onClick={handleRestartVideo}
                            className="p-2 bg-stone-900/80 hover:bg-stone-700 text-stone-200 transition border border-stone-700/60 cursor-pointer"
                            title="Дахин эхлүүлэх"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setShowVideoModal(true)}
                            className="px-3.5 py-1.5 bg-white text-stone-900 hover:bg-stone-100 text-xs font-semibold tracking-wider uppercase transition flex items-center gap-1.5 shadow cursor-pointer"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                            <span>{currentLang === 'mn' ? 'Томруулах' : 'Fullscreen'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <img
                        src={
                          familyMediaTab === 'master'
                            ? familyMasterImg
                            : familyMediaTab === 'twin'
                            ? familyTwinImg
                            : familyBathImg
                        }
                        alt="Family Suite Room"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 bg-stone-950/85 backdrop-blur-md border border-white/20 text-stone-200 text-xs font-medium">
                        {familyMediaTab === 'master'
                          ? currentLang === 'mn' ? '🛏️ Мастер унтлагын өрөө (Том давхар ор)' : '🛏️ Master Bedroom'
                          : familyMediaTab === 'twin'
                          ? currentLang === 'mn' ? '🛏️ 2-р унтлагын өрөө (Хоёр ортой)' : '🛏️ Twin Bedroom'
                          : currentLang === 'mn' ? '🚿 Хувийн ариун цэврийн өрөө' : '🚿 Private Ensuite Bathroom'}
                      </div>
                      <button
                        type="button"
                        onClick={() => setFamilyMediaTab('video')}
                        className="absolute bottom-3 right-3 px-3.5 py-1.5 bg-stone-950/85 hover:bg-white hover:text-stone-950 text-stone-200 border border-white/20 text-xs font-semibold tracking-wider uppercase transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{currentLang === 'mn' ? 'Видео тойм үзэх' : 'Play Video Tour'}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Video Upload Dropzone */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`p-3.5 border transition flex flex-col sm:flex-row items-center justify-between gap-3 ${
                    isDragging
                      ? 'bg-amber-50 border-stone-900'
                      : 'bg-white border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#FAF9F5] text-stone-700 border border-stone-200 shrink-0">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        <span>{currentLang === 'mn' ? 'Өөрийн хийсэн эх бичлэгийг байгаагаар нь оруулах' : 'Upload Authentic Room Video'}</span>
                        <span className="text-[10px] px-1.5 py-0.5 bg-stone-100 text-stone-600 font-mono">MP4 / MOV</span>
                      </h4>
                      <p className="text-[11px] text-stone-500 leading-tight">
                        {currentLang === 'mn'
                          ? 'Утас, төхөөрөмж дээрх анхны бодит видеогоо сонгоход системд бүрэн суурилагдана'
                          : 'Select or drag & drop your original camera video to store in the app'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isUploading ? (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 text-stone-800 text-xs font-semibold border border-stone-300">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>{currentLang === 'mn' ? 'Хадгалж байна...' : 'Saving...'}</span>
                      </div>
                    ) : uploadSuccess ? (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-300">
                        <Check className="w-3.5 h-3.5" />
                        <span>{currentLang === 'mn' ? 'Эх бичлэг амжилттай суулаа!' : 'Original video saved!'}</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 border border-stone-900 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold tracking-wider uppercase transition shadow-sm flex items-center gap-1.5 cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{currentLang === 'mn' ? 'Эх бичлэг сонгох' : 'Select Video'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="lg:col-span-6 overflow-hidden border border-stone-200 shadow-md aspect-[16/10] relative group">
                <img
                  src={gerData[selectedGerTab].image}
                  alt={gerData[selectedGerTab].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 bg-stone-950/80 backdrop-blur-md border border-white/20 text-stone-200 text-xs font-medium">
                  {gerData[selectedGerTab].badge}
                </div>
              </div>
            )}

            <div className="lg:col-span-6 space-y-5">
              <div>
                <span className="block text-[10px] uppercase font-bold tracking-[0.3em] text-stone-500 mb-1">
                  {currentLang === 'mn' ? 'Өрөөний мэдээлэл' : 'Room Specification'}
                </span>
                <h4 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl font-normal text-stone-900 mt-1">
                  {gerData[selectedGerTab].title}
                </h4>
                <p className="font-['Cormorant_Garamond',serif] italic text-base sm:text-lg text-stone-600 leading-relaxed mt-2">
                  {gerData[selectedGerTab].desc}
                </p>
              </div>

              <div className="p-4 bg-white border border-stone-200 space-y-1">
                <div className="text-[11px] uppercase tracking-wider text-stone-500">
                  {currentLang === 'mn' ? 'Үнийн мэдээлэл:' : 'Pricing & Inclusions:'}
                </div>
                <div className="text-xl font-bold font-mono text-stone-900">
                  {gerData[selectedGerTab].price}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {gerData[selectedGerTab].specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-stone-700 font-light">
                    <CheckCircle2 className="w-4 h-4 text-stone-900 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  id="camp-book-ger-tab-btn"
                  onClick={onOpenBooking}
                  className="border border-stone-900 bg-stone-900 hover:bg-stone-800 text-white px-8 py-3.5 text-xs font-semibold tracking-[0.25em] uppercase transition shadow-sm cursor-pointer"
                >
                  {vg.bookStayBtn}
                </button>
                <a
                  href="mailto:bataartravel@gmail.com"
                  className="border border-stone-300 hover:border-stone-900 text-stone-800 px-6 py-3.5 text-xs font-semibold tracking-wider uppercase transition inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-stone-600" />
                  <span>bataartravel@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Camp Facilities & Activities Grid */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="block text-[10px] uppercase font-bold tracking-[0.3em] text-stone-500 mb-1">
              {currentLang === 'mn' ? 'Дээд зэргийн үйлчилгээ' : 'Premium Guest Facilities'}
            </span>
            <h3 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl font-normal text-stone-900 mt-1">
              {vg.amenitiesTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((item, index) => (
              <div
                key={index}
                className="p-6 bg-[#FAF9F5] border border-stone-200/80 hover:border-stone-400 hover:shadow-lg transition duration-300 space-y-3"
              >
                <div className="w-10 h-10 bg-white border border-stone-200 flex items-center justify-center">
                  {item.icon}
                </div>
                <h4 className="font-['Cormorant_Garamond',serif] text-2xl font-normal text-stone-900">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Location, Directions & Contact Banner */}
        <div className="bg-[#FAF9F5] border border-stone-200/80 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em] flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-stone-700" />
                  <span>{vg.directionsLabel}</span>
                </span>
                <span className="px-3 py-1 bg-stone-100 border border-stone-300 text-stone-800 font-mono text-[11px] font-semibold flex items-center gap-1.5">
                  <Route className="w-3.5 h-3.5 text-stone-600" />
                  <span>{currentLang === 'mn' ? 'Даланзадгад хотоос: 390 км' : currentLang === 'en' ? 'From Dalanzadgad: 390 km' : currentLang === 'ja' ? 'ダランザドガドより: 390 km' : '距达兰扎达嘎德: 390公里'}</span>
                </span>
              </div>
              <h4 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl font-normal text-stone-900">
                {currentLang === 'mn' ? 'Батаарын өлгий жуулчны баазад хүрэлцэн ирэх замнал' : 'How to Reach Bataar’s Cradle Camp'}
              </h4>
              <p className="text-stone-600 text-sm leading-relaxed font-light">
                {vg.directionsValue}
              </p>
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-stone-500 font-mono">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-stone-700" />
                  <span>GPS: 43°29'42"N 101°32'18"E</span>
                </span>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="flex items-center gap-1.5 text-stone-700 font-medium">
                    <Phone className="w-4 h-4 text-stone-700" />
                    <span>Утас:</span>
                  </span>
                  <a href="tel:+97672010099" className="hover:text-amber-800 transition underline underline-offset-4 decoration-stone-400">
                    +976 7201 0099
                  </a>
                  <span className="text-stone-400">/</span>
                  <a href="tel:+97688223584" className="hover:text-amber-800 transition underline underline-offset-4 decoration-stone-400">
                    +976 8822 3584
                  </a>
                  <span className="text-stone-400">/</span>
                  <a href="tel:+97699530099" className="hover:text-amber-800 transition underline underline-offset-4 decoration-stone-400">
                    +976 9953 0099
                  </a>
                  <span className="text-stone-400">/</span>
                  <a href="tel:+97699723336" className="hover:text-amber-800 transition underline underline-offset-4 decoration-stone-400">
                    +976 9972 3336
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                id="camp-bottom-book-now-btn"
                onClick={onOpenBooking}
                className="w-full py-4 px-6 border border-stone-900 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-[0.25em] transition cursor-pointer text-center"
              >
                {vg.bookStayBtn}
              </button>
              <a
                href="mailto:bataartravel@gmail.com"
                className="w-full py-4 px-6 border border-stone-300 hover:border-stone-900 bg-white text-stone-800 font-semibold text-xs uppercase tracking-[0.2em] text-center transition"
              >
                {vg.inquireBtn}
              </a>
            </div>
          </div>
        </div>

        {/* Fullscreen Video Tour Modal */}
        {showVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-4xl bg-stone-900 border border-stone-700/80 overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-stone-800 bg-stone-950/80">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 text-stone-200 border border-white/10">
                    <Film className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-normal text-stone-100 font-['Cormorant_Garamond',serif]">
                      {currentLang === 'mn' ? 'Батаарын Өлгий — Гэр бүлийн Свифт видео тойм' : 'Bataar’s Cradle — Family Suite Walkthrough Video'}
                    </h3>
                    <p className="text-xs text-stone-400">
                      {currentLang === 'mn' ? '2 унтлагын өрөө, хувийн халуун хүйтэн шүршүүр & 00, цэлгэр цонхнууд' : '2 bedrooms, private ensuite bathroom, large scenic windows'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowVideoModal(false)}
                  className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player */}
              <div className="relative aspect-[16/9] bg-black flex items-center justify-center overflow-hidden">
                <video
                  src={currentVideoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-110 pointer-events-none"
                />
                <video
                  ref={modalVideoRef}
                  src={currentVideoSrc}
                  autoPlay
                  controls
                  loop
                  playsInline
                  className="relative z-10 max-w-full max-h-full object-contain mx-auto"
                />
              </div>

              {/* Modal Footer with room highlights */}
              <div className="p-4 sm:p-5 bg-stone-950 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex flex-wrap items-center gap-4 text-stone-300">
                  <span className="flex items-center gap-1.5 text-stone-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>{currentLang === 'mn' ? 'Мастер унтлагын өрөө' : 'Master Bedroom'}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-stone-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>{currentLang === 'mn' ? '2-р унтлагын өрөө (Хоёр ортой)' : 'Twin Bedroom'}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-stone-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>{currentLang === 'mn' ? 'Хувийн халуун шүршүүр & 00' : 'Ensuite Shower & Bath'}</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowVideoModal(false);
                    onOpenBooking();
                  }}
                  className="px-6 py-2.5 bg-white hover:bg-stone-200 text-stone-950 font-semibold text-xs uppercase tracking-widest transition shadow cursor-pointer"
                >
                  {vg.bookStayBtn}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Fullscreen HD Panoramic Lightbox Modal */}
        {showPanoramaModal && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 select-none animate-fadeIn"
            onClick={() => setShowPanoramaModal(false)}
          >
            {/* Modal Header */}
            <div 
              className="flex items-center justify-between text-white max-w-7xl mx-auto w-full pb-3 border-b border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold tracking-widest uppercase rounded">
                  4K ULTRA-HD
                </span>
                <div>
                  <h4 className="font-['Cormorant_Garamond',serif] text-xl sm:text-2xl font-normal text-white">
                    {currentLang === 'mn' ? 'Батаарын өлгий бааз — Бодит панорама' : 'Bataar Tourist Camp — Authentic Panorama'}
                  </h4>
                  <p className="text-[11px] text-stone-400 font-sans hidden sm:block">
                    {currentLang === 'mn' ? 'Өмнөговь аймаг • 300 DPI өндөр нягтрал' : 'South Gobi Desert, Mongolia • 300 DPI High-Density Master'}
                  </p>
                </div>
              </div>

              {/* Controls: Zoom & Download & Close */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Zoom Controls */}
                <div className="flex items-center bg-stone-900 border border-white/15 rounded p-0.5">
                  <button
                    onClick={() => setPanoramaZoom((prev) => Math.max(0.8, Number((prev - 0.25).toFixed(2))))}
                    className="p-1.5 hover:bg-stone-800 text-stone-300 hover:text-white transition cursor-pointer"
                    title="Жижигрүүлэх"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="px-2 text-[11px] font-mono text-amber-300 min-w-[44px] text-center">
                    {Math.round(panoramaZoom * 100)}%
                  </span>
                  <button
                    onClick={() => setPanoramaZoom((prev) => Math.min(3, Number((prev + 0.25).toFixed(2))))}
                    className="p-1.5 hover:bg-stone-800 text-stone-300 hover:text-white transition cursor-pointer"
                    title="Томруулах"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  {panoramaZoom !== 1 && (
                    <button
                      onClick={() => setPanoramaZoom(1)}
                      className="px-2 py-1 text-[10px] uppercase font-bold text-stone-400 hover:text-white border-l border-white/10 transition cursor-pointer"
                    >
                      100%
                    </button>
                  )}
                </div>

                {/* Upload / Replace Authentic Photo Button */}
                <button
                  onClick={() => panoramaFileInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-stone-200 hover:text-white text-xs font-medium rounded transition cursor-pointer"
                  title="Өөрийн бодит эх зургийг оруулах (өөрчлөлтгүй, чанарыг сайжруулан)"
                >
                  <Camera className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">{currentLang === 'mn' ? 'Эх зургаа оруулах' : 'Upload Photo'}</span>
                </button>

                {/* Download Button */}
                <a
                  href="/bataar_camp_real_panorama.jpg"
                  download="bataar_camp_panorama_4k.jpg"
                  className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 text-xs font-semibold rounded transition"
                  title="Эх зургийг бүрэн нарийвчлалаар татах"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>{currentLang === 'mn' ? 'Эх хувиар татах' : 'Download HD'}</span>
                </a>

                {/* Close Button */}
                <button
                  onClick={() => setShowPanoramaModal(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                  title="Хаах"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Image Area with Zoom */}
            <div 
              className="flex-1 flex items-center justify-center p-2 sm:p-4 overflow-auto cursor-grab active:cursor-grabbing"
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="transition-transform duration-200 ease-out origin-center max-w-full"
                style={{ transform: `scale(${panoramaZoom})` }}
              >
                <img
                  src={customPanoramaUrl || campPanoramicImg}
                  alt="Bataar Camp Real Panorama Fullscreen"
                  className="max-w-full max-h-[75vh] object-contain rounded shadow-2xl pointer-events-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div 
              className="max-w-7xl mx-auto w-full pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-stone-300 text-xs gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 text-stone-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                <span>
                  {currentLang === 'mn'
                    ? 'Байшин сууцнууд, тансаг цагаан эсгий гэрүүд, 2 давхар төв лодж, говийн бэлчээрлэх тэмээн сүрэг'
                    : 'Eco-lodge wooden cabins, luxury nomadic gers, 2-story guest headquarters, and grazing camels'}
                </span>
              </div>

              <div className="flex items-center gap-4 text-stone-400 text-[11px]">
                <span>100% Solar Powered</span>
                <span>•</span>
                <span>Starlink Broadband</span>
                <span>•</span>
                <span className="text-amber-400 font-semibold">+976 7201 0099 / 8822 3584</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

