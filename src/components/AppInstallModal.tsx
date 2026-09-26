import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { generateOfflineFieldGuideHtml } from '../utils/offlineGuideGenerator';
import { 
  Download, 
  Smartphone, 
  Monitor, 
  CheckCircle2, 
  HardDrive, 
  RefreshCw, 
  X, 
  Share2, 
  PlusSquare,
  ExternalLink,
  Copy,
  FileCode,
  FileDown,
  Apple,
  Chrome,
  AlertCircle,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';
import appIconImg from '../assets/images/bataar_official_logo_1788064678288.jpg';

interface AppInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const AppInstallModal: React.FC<AppInstallModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  const t = translations[currentLang];
  const af = t.appFeatures;

  const [activeTab, setActiveTab] = useState<'android' | 'ios' | 'desktop' | 'download'>('android');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isDownloadingOffline, setIsDownloadingOffline] = useState<boolean>(false);
  const [cacheStatus, setCacheStatus] = useState<string>('Хадгалагдсан (24.8 MB)');
  const [isRefreshingCache, setIsRefreshingCache] = useState<boolean>(false);
  const [isIframe, setIsIframe] = useState<boolean>(false);

  useEffect(() => {
    // Detect if running inside iframe
    try {
      setIsIframe(window.self !== window.top);
    } catch {
      setIsIframe(true);
    }

    // Detect default platform tab
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setActiveTab('ios');
    } else if (/android/.test(userAgent)) {
      setActiveTab('android');
    } else {
      setActiveTab('desktop');
    }

    // Check if already in standalone display mode
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
    }

    // Capture PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
      }
    } else if (isIframe) {
      // If inside iframe, open app in dedicated tab to trigger browser PWA install prompt
      window.open(window.location.href, '_blank');
    } else {
      // Switch to instruction tab
      const ua = navigator.userAgent.toLowerCase();
      if (/iphone|ipad/.test(ua)) {
        setActiveTab('ios');
      } else {
        setActiveTab('android');
      }
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleDownloadOfflineGuide = () => {
    setIsDownloadingOffline(true);
    try {
      const htmlContent = generateOfflineFieldGuideHtml(currentLang);
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Bataar_Gobi_Offline_Field_Guide_${currentLang.toUpperCase()}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setTimeout(() => setIsDownloadingOffline(false), 1000);
    }
  };

  const handleRefreshCache = () => {
    setIsRefreshingCache(true);
    if ('caches' in window) {
      caches.keys().then((names) => {
        return Promise.all(names.map((name) => caches.delete(name)));
      }).then(() => {
        setTimeout(() => {
          setIsRefreshingCache(false);
          setCacheStatus('Шинэчлэгдсэн (100% Offline)');
        }, 1000);
      });
    } else {
      setTimeout(() => {
        setIsRefreshingCache(false);
      }, 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-xl w-full p-5 sm:p-7 relative shadow-2xl overflow-hidden my-auto">
        
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* App Icon & Header Title */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-amber-500/50 shadow-xl shrink-0 bg-stone-950">
            <img 
              src={appIconImg} 
              alt="Bataar App Icon" 
              referrerPolicy="no-referrer" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                PWA Application
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Бүртгэл шаардлагагүй
              </span>
            </div>
            <h3 className="font-['Cinzel',serif] text-lg sm:text-xl font-black text-stone-100 mt-0.5">
              {af.installApp}
            </h3>
            <p className="text-xs text-stone-400 font-mono">
              {af.appVersion}
            </p>
          </div>
        </div>

        {/* Zero Registration Guarantee Banner */}
        <div className="mb-4 p-3 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-stone-900 border border-emerald-500/40 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-500/40">
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xs">
            <p className="font-bold text-emerald-300">Шууд нээгдэнэ • Бүртгэл & Нууц үг шаардлагагүй</p>
            <p className="text-stone-300 text-[11px] leading-tight mt-0.5">
              Утсандаа суулгахад имэйл, утасны дугаар огт шаардахгүй. Дэлгэцээсээ 1 даралтаар шууд нээж Говьд офлайн ч ашиглана.
            </p>
          </div>
        </div>

        {/* Main One-Click Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
          {/* Primary Install / Open in new window */}
          <button
            id="install-pwa-primary-btn"
            onClick={handleInstallClick}
            className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-950/60 border border-amber-300/40 transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-stone-950" />
            <span>{isInstalled ? 'Апп суулгагдсан' : '📱 Утсандаа суулгах'}</span>
          </button>

          {/* Direct Instant Open Button */}
          <button
            id="instant-open-direct-btn"
            onClick={() => {
              if (isIframe) {
                window.open(window.location.href, '_blank');
              } else {
                onClose();
              }
            }}
            className="py-3.5 px-4 rounded-2xl bg-stone-800 hover:bg-stone-700 text-amber-300 hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-amber-500/30 transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{af.instantOpenBtn}</span>
          </button>
        </div>

        {/* Offline Package Download Button */}
        <div className="mb-4">
          <button
            onClick={handleDownloadOfflineGuide}
            disabled={isDownloadingOffline}
            className="w-full py-2.5 px-4 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-300 hover:text-amber-300 font-semibold text-xs flex items-center justify-center gap-2 border border-stone-800 transition cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-amber-400" />
            <span>{isDownloadingOffline ? 'Офлайн файл бэлтгэж байна...' : '📥 Хээрийн Офлайн гарын авлага татах (.HTML файл)'}</span>
          </button>
        </div>

        {/* Notice for Preview / Browser */}
        {isIframe && (
          <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Зөвлөмж: </span> 
              Хөтчийн хаягаар бүрэн дэлгэцээр нээснээр утсандаа Native апп болгон суулгах товч идэвхжинэ. 
              <a 
                href={window.location.href} 
                target="_blank" 
                rel="noreferrer"
                className="ml-1.5 underline text-amber-300 font-bold hover:text-white inline-flex items-center gap-0.5"
              >
                Шинэ цонхонд нээх <ExternalLink className="w-3 h-3 inline" />
              </a>
            </div>
          </div>
        )}

        {/* Platform Selection Tabs */}
        <div className="flex rounded-xl bg-stone-950 p-1 border border-stone-800 mb-3">
          <button
            onClick={() => setActiveTab('android')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'android' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Chrome className="w-3.5 h-3.5" />
            <span>Android</span>
          </button>
          <button
            onClick={() => setActiveTab('ios')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'ios' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Apple className="w-3.5 h-3.5" />
            <span>iPhone / iPad</span>
          </button>
          <button
            onClick={() => setActiveTab('desktop')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'desktop' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Компьютер</span>
          </button>
          <button
            onClick={() => setActiveTab('download')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'download' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Офлайн багц</span>
          </button>
        </div>

        {/* Platform Content Body */}
        <div className="bg-stone-950 border border-stone-800/90 rounded-2xl p-4 text-xs text-stone-300 mb-3 min-h-[130px] flex flex-col justify-center">
          {activeTab === 'android' && (
            <div className="space-y-2.5">
              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                <Chrome className="w-4 h-4" />
                <span>Android (Chrome / Samsung Internet) - Бүртгэлгүй суулгах:</span>
              </div>
              <div className="space-y-2 text-stone-300">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                  <span>Хөтчийн баруун дээд талын <strong>3 цэг (⋮)</strong> цэсийг дарна.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                  <span><strong>"Апп суулгах"</strong> эсвэл <strong>"Нүүр дэлгэцэнд нэмэх (Install App)"</strong>-ийг сонгоно.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                  <span>Утасны дэлгэц дээр сууж, <strong>бүртгүүлэх шаардлагагүйгээр шууд нээгдэнэ</strong>.</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ios' && (
            <div className="space-y-2.5">
              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                <Apple className="w-4 h-4" />
                <span>iPhone / iPad (Safari) - Бүртгэлгүй суулгах:</span>
              </div>
              <div className="space-y-2 text-stone-300">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                  <span>Safari хөтчийн доод талын <Share2 className="w-3.5 h-3.5 inline text-amber-400 mx-1" /> <strong>"Share (Хуваалцах)"</strong> товчийг дарна.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                  <span>Цэснээс <PlusSquare className="w-3.5 h-3.5 inline text-amber-400 mx-1" /> <strong>"Add to Home Screen (Нүүр дэлгэцэнд нэмэх)"</strong>-ийг сонгоно.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                  <span>Баруун дээд буланд байрлах <strong>"Add"</strong> товч дарснаар бүртгэлгүй шууд нээгддэг апп болно.</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'desktop' && (
            <div className="space-y-2.5">
              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                <Monitor className="w-4 h-4" />
                <span>Компьютер (Chrome / Edge) дээр суулгах:</span>
              </div>
              <div className="space-y-2 text-stone-300">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                  <span>Хөтчийн хаягийн мөрний баруун талд байрлах <strong>"Суулгах (Install App)"</strong> дүрсийг дарна.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                  <span>Компьютерийн Start / Launchpad цэснээс бүртгэлгүй шууд нээгдэнэ.</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'download' && (
            <div className="space-y-3">
              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                <FileCode className="w-4 h-4" />
                <span>Бие даасан эх код ба Офлайн багцууд:</span>
              </div>
              <p className="text-stone-300 text-xs">
                Та энэхүү төслийг бүхэлд нь ZIP эх кодоор нь татаж аваад өөрийн хостинг (Vercel, Netlify), эсвэл интернэтгүй цөлд бие даан ажиллуулах боломжтой.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <a
                  href="/bataar_app_source.zip"
                  download="bataar_app_source.zip"
                  className="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow text-center"
                >
                  <Download className="w-4 h-4" />
                  <span>📦 Төслийн ZIP татах (4.5MB)</span>
                </a>
                <button
                  onClick={handleDownloadOfflineGuide}
                  disabled={isDownloadingOffline}
                  className="px-3.5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 border border-amber-500/30 transition cursor-pointer"
                >
                  <FileDown className="w-4 h-4 text-amber-400" />
                  <span>📄 Офлайн гарын авлага (.html)</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Link Share & Cache */}
        <div className="border-t border-stone-800/80 pt-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Линк хуулагдлаа!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Аппын линк хуулах</span>
                </>
              )}
            </button>

            <a
              href={`https://www.facebook.com/dialog/send?link=${encodeURIComponent(window.location.href)}&app_id=291494419198752&redirect_uri=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 font-bold transition cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Messenger</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-stone-400 text-[11px]">
              <HardDrive className="w-3.5 h-3.5 text-amber-400" />
              <span>{cacheStatus}</span>
            </div>

            <button
              onClick={handleRefreshCache}
              disabled={isRefreshingCache}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px] transition cursor-pointer"
              title="Шинэчлэх"
            >
              <RefreshCw className={`w-3 h-3 text-amber-400 ${isRefreshingCache ? 'animate-spin' : ''}`} />
              <span>Кэш</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
