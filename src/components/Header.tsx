import React, { useState } from 'react';
import { Language, Currency, PageId } from '../types';
import { translations } from '../data/translations';
import { Globe, Compass, Menu, X, DollarSign, Smartphone, BookOpen, MessageCircle, Phone, Sun, Activity, Users, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import officialLogoImg from '../assets/images/bataar_official_logo_1788064678288.jpg';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentCurrency: Currency;
  onCurrencyChange: (curr: Currency) => void;
  onOpenBooking: () => void;
  currentPage: PageId;
  onNavigatePage: (page: PageId) => void;
  onOpenAppModal?: () => void;
  onOpenJournal?: () => void;
  onOpenMessengerShare?: () => void;
  onOpenAnalytics?: () => void;
  activeVisitorsCount?: number;
  savedCount?: number;
  isExtraRowOpen?: boolean;
  onToggleExtraRow?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  currentCurrency,
  onCurrencyChange,
  onOpenBooking,
  currentPage,
  onNavigatePage,
  onOpenAppModal,
  onOpenJournal,
  onOpenMessengerShare,
  onOpenAnalytics,
  activeVisitorsCount = 24,
  savedCount = 0,
  isExtraRowOpen,
  onToggleExtraRow,
}) => {
  const t = translations[currentLang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [internalExtraRowOpen, setInternalExtraRowOpen] = useState(false);
  const [arrivalDate, setArrivalDate] = useState('2026-09-17');
  const [departureDate, setDepartureDate] = useState('2026-09-23');
  const [guestCount, setGuestCount] = useState('2');

  const isRowActive = isExtraRowOpen !== undefined ? isExtraRowOpen : internalExtraRowOpen;
  const toggleExtraRow = () => {
    if (onToggleExtraRow) {
      onToggleExtraRow();
    } else {
      setInternalExtraRowOpen(!internalExtraRowOpen);
    }
  };

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'mn', label: 'Монгол', flag: '🇲🇳' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  ];

  const currencies: Currency[] = ['MNT', 'USD', 'EUR', 'JPY'];

  const handlePageClick = (page: PageId) => {
    setMobileMenuOpen(false);
    onNavigatePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header id="main-header" className="sticky top-0 z-50 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-stone-200 text-stone-900 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left spacer to keep center logo perfectly balanced */}
          <div className="w-10 sm:w-28 flex items-center shrink-0" />

          {/* Center: Brand Lockup with Official Logo & Typography */}
          <div 
            id="brand-header-logo-lockup"
            className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group py-1.5 select-none" 
            onClick={() => handlePageClick('home')}
            title="Батаарын өлгий - Нүүр хуудас"
          >
            <div className="relative shrink-0">
              <img
                src={officialLogoImg}
                alt="Батаарын өлгий лого"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shadow-sm ring-1 ring-stone-300 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-['Cormorant_Garamond',serif] text-lg sm:text-2xl lg:text-3xl font-normal tracking-[0.1em] sm:tracking-[0.14em] text-stone-950 group-hover:text-amber-950 transition-colors uppercase leading-none sm:leading-tight">
                БАТААРЫН ӨЛГИЙ
              </span>
              <span className="text-[7px] sm:text-[8.5px] md:text-[9.5px] uppercase tracking-[0.15em] sm:tracking-[0.24em] text-stone-600 font-semibold leading-tight mt-1">
                LUXURY DESERT SANCTUARY & PALEONTOLOGY BASECAMP
              </span>
            </div>
          </div>

          {/* Right Actions: Desktop Language Selector & Mobile Menu Trigger */}
          <div className="w-auto sm:w-36 flex items-center justify-end gap-2 relative">
            {/* Desktop Language Dropdown */}
            <div className="hidden lg:block relative">
              <button
                id="desktop-language-selector"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-stone-200 hover:border-stone-400 text-stone-900 text-xs font-semibold uppercase tracking-wider transition shadow-xs cursor-pointer rounded"
                title="Select Language / Хэл солих"
              >
                <span className="text-sm leading-none">
                  {languages.find((l) => l.code === currentLang)?.flag || '🌐'}
                </span>
                <span className="font-mono text-xs">{currentLang.toUpperCase()}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {langMenuOpen && (
                <div 
                  className="absolute right-0 mt-1 w-44 bg-white border border-stone-200 shadow-xl rounded-md py-1 z-50 animate-fade-in"
                  onMouseLeave={() => setLangMenuOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-stone-500 border-b border-stone-100">
                    Language / Хэл
                  </div>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        onLanguageChange(l.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left hover:bg-stone-50 transition cursor-pointer ${
                        currentLang === l.code ? 'font-bold text-stone-950 bg-stone-100' : 'text-stone-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-sm">{l.flag}</span>
                        <span>{l.label}</span>
                      </span>
                      <span className="font-mono text-[10px] text-stone-500 uppercase">{l.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded bg-white border border-stone-200 text-stone-800 hover:text-stone-950 cursor-pointer shadow-xs"
              aria-label="Цэс"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Row: 5 Compact Items (Нүүр, Танилцуулга, Аялал, Ирвэс, Батаар) */}
        <div className="hidden lg:flex items-center justify-center space-x-10 xl:space-x-14 py-1.5 border-t border-stone-200 text-[11.5px] uppercase tracking-[0.18em] font-bold">
          <button
            onClick={() => handlePageClick('home')}
            className={`transition-colors cursor-pointer py-1 border-b-2 ${
              currentPage === 'home'
                ? 'text-black font-black border-stone-950'
                : 'text-stone-800 hover:text-black border-transparent font-bold'
            }`}
          >
            {currentLang === 'mn' ? 'НҮҮР' : 'HOME'}
          </button>
          <button
            onClick={() => handlePageClick('accommodations')}
            className={`transition-colors cursor-pointer py-1 border-b-2 ${
              currentPage === 'accommodations'
                ? 'text-black font-black border-stone-950'
                : 'text-stone-800 hover:text-black border-transparent font-bold'
            }`}
          >
            {currentLang === 'mn' ? 'ТАНИЛЦУУЛГА' : 'ABOUT & GUIDE'}
          </button>
          <button
            onClick={() => handlePageClick('expeditions')}
            className={`transition-colors cursor-pointer py-1 border-b-2 ${
              currentPage === 'expeditions'
                ? 'text-black font-black border-stone-950'
                : 'text-stone-800 hover:text-black border-transparent font-bold'
            }`}
          >
            {currentLang === 'mn' ? 'АЯЛАЛ' : 'EXPEDITIONS'}
          </button>
          <button
            onClick={() => handlePageClick('snow-leopard')}
            className={`transition-colors cursor-pointer py-1 border-b-2 ${
              currentPage === 'snow-leopard'
                ? 'text-black font-black border-stone-950'
                : 'text-stone-800 hover:text-black border-transparent font-bold'
            }`}
          >
            {currentLang === 'mn' ? 'ИРВЭС' : 'SNOW LEOPARD'}
          </button>
          <button
            onClick={() => handlePageClick('dinosaurs')}
            className={`transition-colors cursor-pointer py-1 border-b-2 ${
              currentPage === 'dinosaurs'
                ? 'text-black font-black border-stone-950'
                : 'text-stone-800 hover:text-black border-transparent font-bold'
            }`}
          >
            {currentLang === 'mn' ? 'БАТААР' : 'BATAAR'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F5] border-b border-stone-200 px-4 pt-3 pb-6 space-y-3">
          <div 
            className="flex items-center gap-3 pb-3 border-b border-stone-200 cursor-pointer"
            onClick={() => handlePageClick('home')}
          >
            <img
              src={officialLogoImg}
              alt="Батаарын өлгий лого"
              className="w-10 h-10 rounded-full object-cover shadow-sm ring-1 ring-stone-300 shrink-0"
            />
            <div className="flex flex-col">
              <span className="font-['Cormorant_Garamond',serif] text-lg font-bold tracking-wider text-stone-950 uppercase leading-none">
                БАТААРЫН ӨЛГИЙ
              </span>
              <span className="text-[7.5px] uppercase tracking-[0.16em] text-stone-600 font-semibold mt-1">
                LUXURY DESERT SANCTUARY & PALEONTOLOGY BASECAMP
              </span>
            </div>
          </div>

          <div className="flex flex-col space-y-1.5 text-sm font-medium text-stone-800">
            <button
              onClick={() => handlePageClick('home')}
              className={`text-left px-3.5 py-2.5 border rounded-md transition font-bold ${
                currentPage === 'home'
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-white border-stone-200 hover:bg-stone-100 text-stone-900'
              }`}
            >
              🏠 {currentLang === 'mn' ? 'Нүүр' : 'Home'}
            </button>
            <button
              onClick={() => handlePageClick('accommodations')}
              className={`text-left px-3.5 py-2.5 border rounded-md transition font-bold ${
                currentPage === 'accommodations'
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-white border-stone-200 hover:bg-stone-100 text-stone-900'
              }`}
            >
              ⛺ {currentLang === 'mn' ? 'Танилцуулга' : 'About & Guide'}
            </button>
            <button
              onClick={() => handlePageClick('expeditions')}
              className={`text-left px-3.5 py-2.5 border rounded-md transition font-bold ${
                currentPage === 'expeditions'
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-white border-stone-200 hover:bg-stone-100 text-stone-900'
              }`}
            >
              🧭 {currentLang === 'mn' ? 'Аялал' : 'Expeditions'}
            </button>
            <button
              onClick={() => handlePageClick('snow-leopard')}
              className={`text-left px-3.5 py-2.5 border rounded-md transition font-bold ${
                currentPage === 'snow-leopard'
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-white border-stone-200 hover:bg-stone-100 text-stone-900'
              }`}
            >
              🐾 {currentLang === 'mn' ? 'Ирвэс' : 'Snow Leopard'}
            </button>
            <button
              onClick={() => handlePageClick('dinosaurs')}
              className={`text-left px-3.5 py-2.5 border rounded-md transition font-bold ${
                currentPage === 'dinosaurs'
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-white border-stone-200 hover:bg-stone-100 text-stone-900'
              }`}
            >
              🦖 {currentLang === 'mn' ? 'Батаар' : 'Bataar'}
            </button>
            <button
              onClick={() => handlePageClick('collaborations')}
              className={`text-left px-3 py-2 border transition ${
                currentPage === 'collaborations'
                  ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                  : 'bg-white border-stone-200 hover:bg-stone-100'
              }`}
            >
              🏛️ {currentLang === 'mn' ? 'Эрдэм шинжилгээний түншлэл' : 'Collaborations'}
            </button>

            {onOpenJournal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenJournal();
                }}
                className="text-left px-3 py-2 bg-white border border-stone-200 text-stone-800 hover:bg-stone-100 font-semibold flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-stone-800" />
                  <span>Миний тэмдэглэл</span>
                </span>
                {savedCount > 0 && (
                  <span className="w-5 h-5 bg-stone-900 text-white rounded-full text-xs font-bold flex items-center justify-center">
                    {savedCount}
                  </span>
                )}
              </button>
            )}
            {onOpenAnalytics && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAnalytics();
                }}
                className="text-left px-3 py-2 bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  <span>📊 Зочдын тоо & Хээрийн судалгаа</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-xs font-mono font-bold">
                  {activeVisitorsCount} онлайн
                </span>
              </button>
            )}
            {onOpenMessengerShare && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMessengerShare();
                }}
                className="text-left px-3 py-2 bg-blue-50 border border-blue-200 text-blue-900 font-bold flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-blue-600" />
                <span>💬 Messenger холбоос</span>
              </button>
            )}
            {onOpenAppModal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAppModal();
                }}
                className="text-left px-3 py-2 bg-stone-100 border border-stone-300 text-stone-900 font-bold flex items-center gap-2"
              >
                <Smartphone className="w-4 h-4 text-stone-800" />
                <span>📱 Аппликейшн суулгах (PWA)</span>
              </button>
            )}

            {/* Mobile Language Switcher (8 Languages) */}
            <div className="pt-3 pb-1 border-t border-stone-200">
              <div className="text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-stone-900" />
                <span>Хэл солих / Language:</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => onLanguageChange(l.code)}
                    className={`flex items-center justify-center gap-1 py-2 px-1 rounded border text-xs font-semibold transition cursor-pointer ${
                      currentLang === l.code
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs font-bold'
                        : 'bg-white border-stone-200 text-stone-800 hover:bg-stone-100'
                    }`}
                    title={l.label}
                  >
                    <span className="text-sm leading-none">{l.flag}</span>
                    <span className="font-mono text-[11px] uppercase">{l.code}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Hotline Contacts */}
            <div className="pt-3 pb-1 border-t border-stone-200">
              <div className="text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-stone-900" />
                <span>Холбогдох утас / Hotline:</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+97672010099"
                  className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-white border border-stone-200 text-stone-900 text-xs font-semibold hover:border-stone-400 transition font-mono"
                >
                  <span>+976 7201 0099</span>
                </a>
                <a
                  href="tel:+97688223584"
                  className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-white border border-stone-200 text-stone-900 text-xs font-semibold hover:border-stone-400 transition font-mono"
                >
                  <span>+976 8822 3584</span>
                </a>
                <a
                  href="tel:+97699530099"
                  className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-white border border-stone-200 text-stone-900 text-xs font-semibold hover:border-stone-400 transition font-mono"
                >
                  <span>+976 9953 0099</span>
                </a>
                <a
                  href="tel:+97699723336"
                  className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-white border border-stone-200 text-stone-900 text-xs font-semibold hover:border-stone-400 transition font-mono"
                >
                  <span>+976 9972 3336</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-200">
            <button
              onClick={onOpenBooking}
              className="w-full flex items-center justify-center gap-2 py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-wider shadow-sm"
            >
              <Compass className="w-4 h-4" />
              <span>{t.nav.bookTour}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

