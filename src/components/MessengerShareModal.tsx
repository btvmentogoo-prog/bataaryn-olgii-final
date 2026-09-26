import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { 
  X, 
  Send, 
  Copy, 
  CheckCircle2, 
  Share2, 
  ExternalLink, 
  Smartphone, 
  MessageCircle, 
  QrCode, 
  Sparkles,
  Layers,
  Facebook
} from 'lucide-react';
import officialLogoImg from '../assets/images/bataar_official_logo_1788064678288.jpg';

interface MessengerShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  customTitle?: string;
  customUrl?: string;
  customText?: string;
}

export const MessengerShareModal: React.FC<MessengerShareModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  customTitle,
  customUrl,
  customText,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // App URLs
  const defaultUrl = typeof window !== 'undefined' 
    ? (window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')
        ? 'https://ais-pre-qbkxdsr2iqrwrvve6c4fmj-178600995587.asia-northeast1.run.app'
        : window.location.href)
    : 'https://ais-pre-qbkxdsr2iqrwrvve6c4fmj-178600995587.asia-northeast1.run.app';

  const shareUrl = customUrl || defaultUrl;
  const title = customTitle || (currentLang === 'mn' ? 'Батаарын өлгий • Монголын үлэг гүрвэлийн сан' : 'Cradle of Bataar • Mongolian Paleontology');
  const shareText = customText || (
    currentLang === 'mn'
      ? `🦖 Батаарын өлгий (Cradle of Bataar) - Монголын үлэг гүрвэл, Говийн байгаль, олдворуудын интерактив танилцуулга:\n${shareUrl}`
      : `🦖 Explore Cradle of Bataar - Mongolia's premier digital Cretaceous paleontological sanctuary:\n${shareUrl}`
  );

  // Facebook Messenger Web & Deep Links
  const messengerWebUrl = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(shareUrl)}&app_id=291494419198752&redirect_uri=${encodeURIComponent(shareUrl)}`;
  const messengerMobileUrl = `fb-messenger://share?link=${encodeURIComponent(shareUrl)}&app_id=291494419198752`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  const handleCopyLinkOnly = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyFullMessage = () => {
    navigator.clipboard.writeText(shareText);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: shareText,
          url: shareUrl,
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 3000);
      } catch (err) {
        console.log('Share canceled or error:', err);
      }
    } else {
      // Fallback: Open web messenger
      window.open(messengerWebUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleOpenMessenger = () => {
    // Check if mobile or desktop
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      // Try opening mobile deep link, then fallback
      window.location.href = messengerMobileUrl;
      setTimeout(() => {
        window.open(messengerWebUrl, '_blank', 'noopener,noreferrer');
      }, 500);
    } else {
      window.open(messengerWebUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-lg w-full p-5 sm:p-7 relative shadow-2xl overflow-hidden my-auto">
        
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-500" />

        {/* Close Button */}
        <button
          id="close-messenger-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 p-0.5 shadow-lg shadow-blue-900/40 shrink-0">
            <div className="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center">
              <MessageCircle className="w-7 h-7 text-blue-400 fill-blue-500/20" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 uppercase tracking-wide">
                Messenger Link
              </span>
              <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                1-Даралтаар хуваалцах
              </span>
            </div>
            <h3 className="font-['Cinzel',serif] text-lg sm:text-xl font-black text-stone-100 mt-0.5">
              {currentLang === 'mn' ? 'Messenger-ээр нээх & хуваалцах' : 'Open & Share on Messenger'}
            </h3>
            <p className="text-xs text-stone-400">
              {currentLang === 'mn' 
                ? 'Монголын үлэг гүрвэлийн интерактив сангийн холбоос' 
                : 'Direct link to interactive Cretaceous Mongolian heritage'}
            </p>
          </div>
        </div>

        {/* Quick 1-Click Messenger Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
          {/* Main Messenger Button */}
          <button
            id="open-messenger-direct-btn"
            onClick={handleOpenMessenger}
            className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-950/60 border border-blue-400/40 transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Send className="w-4 h-4 text-blue-100" />
            <span>Messenger-ээр илгээх</span>
          </button>

          {/* Native Phone Share Button (triggers native messenger sheet) */}
          <button
            id="native-share-btn"
            onClick={handleNativeShare}
            className="py-3.5 px-4 rounded-2xl bg-stone-800 hover:bg-stone-700 text-amber-300 hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-amber-500/30 transition cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-amber-400" />
            <span>Утасны Share цэс</span>
          </button>
        </div>

        {/* Direct Link Box with Copy Button */}
        <div className="mb-4 bg-stone-950 border border-stone-800 rounded-2xl p-3.5">
          <div className="flex items-center justify-between text-xs text-stone-400 mb-1.5 font-medium">
            <span>Messenger-д илгээх бэлэн линк:</span>
            <span className="text-[10px] text-amber-400 font-mono">HTTPS Secured</span>
          </div>
          <div className="flex items-center gap-2 bg-stone-900/90 rounded-xl p-2 border border-stone-800">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="bg-transparent text-xs text-stone-200 font-mono w-full focus:outline-none select-all px-1"
            />
            <button
              id="copy-link-only-btn"
              onClick={handleCopyLinkOnly}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                copiedLink 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                  : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
              }`}
            >
              {copiedLink ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Хуулагдлаа!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Хуулах</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Ready formatted chat message box */}
        <div className="mb-4 bg-stone-950 border border-stone-800 rounded-2xl p-3.5">
          <div className="flex items-center justify-between text-xs text-stone-400 mb-1.5 font-medium">
            <span>Messenger чат руу шууд хуулах текстийн загвар:</span>
            <button
              onClick={handleCopyFullMessage}
              className="text-amber-400 hover:text-amber-300 text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer"
            >
              {copiedMessage ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedMessage ? 'Хууллаа!' : 'Бүгдийг хуулах'}</span>
            </button>
          </div>
          <div className="bg-stone-900/80 rounded-xl p-2.5 text-xs text-stone-300 font-sans border border-stone-800/80 leading-relaxed max-h-20 overflow-y-auto select-all">
            {shareText}
          </div>
        </div>

        {/* Extra Actions: QR Code & Facebook Post */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            id="toggle-qr-btn"
            onClick={() => setShowQr(!showQr)}
            className="py-2.5 px-3 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-300 hover:text-amber-300 font-semibold text-xs flex items-center justify-center gap-2 border border-stone-800 transition cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5 text-amber-400" />
            <span>{showQr ? 'QR нуух' : 'QR кодоор нээх'}</span>
          </button>

          <a
            href={facebookShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-300 hover:text-blue-400 font-semibold text-xs flex items-center justify-center gap-2 border border-stone-800 transition cursor-pointer"
          >
            <Facebook className="w-3.5 h-3.5 text-blue-400" />
            <span>FB пост болгох</span>
          </a>
        </div>

        {/* QR Code Expansion */}
        {showQr && (
          <div className="mb-4 p-4 rounded-2xl bg-stone-950 border border-amber-500/30 text-center animate-in zoom-in-95 duration-200">
            <div className="inline-block p-3 bg-white rounded-2xl shadow-xl border-2 border-amber-400">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(shareUrl)}`}
                alt="Messenger QR Code"
                className="w-36 h-36 mx-auto"
              />
            </div>
            <p className="text-xs text-stone-300 mt-2 font-medium">
              Утасны камер эсвэл Messenger QR уншигчаар шууд нээнэ үү
            </p>
          </div>
        )}

        {/* Bottom Status Tip */}
        <div className="border-t border-stone-800/80 pt-3 flex items-center justify-between text-xs text-stone-500">
          <span className="flex items-center gap-1 text-[11px]">
            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
            <span>Утас, компьютер дээр ямар ч аппгүй шууд нээгдэнэ</span>
          </span>
          <span className="text-[11px] text-emerald-400 font-semibold">100% Үнэгүй</span>
        </div>

      </div>
    </div>
  );
};
