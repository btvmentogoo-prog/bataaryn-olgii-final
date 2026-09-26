import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Globe, X } from 'lucide-react';
import { Language, Currency } from '../types';

interface BottomBookingWidgetProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentCurrency: Currency;
  onCurrencyChange: (curr: Currency) => void;
  onOpenBooking: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const BottomBookingWidget: React.FC<BottomBookingWidgetProps> = ({
  currentLang,
  onLanguageChange,
  currentCurrency,
  onCurrencyChange,
  onOpenBooking,
  isOpen,
  onToggle,
}) => {
  const [arrivalDate, setArrivalDate] = useState('2026-09-17');
  const [departureDate, setDepartureDate] = useState('2026-09-23');
  const [guestCount, setGuestCount] = useState('2');

  const languages: { code: Language; label: string }[] = [
    { code: 'mn', label: 'Монгол' },
    { code: 'en', label: 'English' },
    { code: 'ja', label: '日本語' },
    { code: 'zh', label: '中文' },
    { code: 'ko', label: '한국어' },
    { code: 'de', label: 'Deutsch' },
    { code: 'fr', label: 'Français' },
    { code: 'ru', label: 'Русский' },
  ];

  const currencies: Currency[] = ['MNT', 'USD', 'EUR', 'JPY'];

  return (
    <aside
      id="bottom-booking-settings-widget"
      aria-label="Захиалга ба тохиргоо"
      className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 select-none"
    >
      {/* Expandable Popover Card when opened */}
      {isOpen && (
        <div
          id="bottom-booking-settings-panel"
          className="absolute bottom-full mb-3 right-0 w-[92vw] sm:w-[500px] md:w-[580px] max-w-[calc(100vw-2rem)] bg-stone-950/95 text-white border border-stone-800 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-xl transition-all animate-fade-in"
        >
          {/* Card Header */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-white font-serif">
                {currentLang === 'mn' ? 'ЗАХИАЛГА & ТОХИРГОО' : 'BOOKING & SETTINGS'}
              </span>
            </div>
            <button
              onClick={onToggle}
              className="p-1 rounded-md text-stone-400 hover:text-white hover:bg-stone-800 transition cursor-pointer"
              title={currentLang === 'mn' ? 'Хураах' : 'Close'}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Section 1: Language & Currency Controls */}
          <div className="py-3 flex flex-wrap items-center justify-between gap-3 border-b border-stone-800/80">
            {/* Language */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-[0.16em] text-stone-400">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentLang === 'mn' ? 'Хэл' : 'Language'}:</span>
              </div>
              <div className="flex flex-wrap items-center gap-1 bg-stone-900 p-1 rounded-md border border-stone-800 max-w-full">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code)}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold transition cursor-pointer ${
                      currentLang === lang.code
                        ? 'bg-amber-500 text-stone-950 shadow-xs'
                        : 'text-stone-300 hover:text-white hover:bg-stone-800'
                    }`}
                    title={lang.label}
                  >
                    {lang.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Currency */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-[0.16em] text-stone-400">
                <span>{currentLang === 'mn' ? 'Валют' : 'Currency'}:</span>
              </div>
              <div className="flex items-center gap-1 bg-stone-900 p-1 rounded-md border border-stone-800">
                {currencies.map((curr) => (
                  <button
                    key={curr}
                    onClick={() => onCurrencyChange(curr)}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold transition cursor-pointer ${
                      currentCurrency === curr
                        ? 'bg-stone-200 text-stone-950 shadow-xs'
                        : 'text-stone-300 hover:text-white hover:bg-stone-800'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Date & Guest Selection */}
          <div className="pt-3 pb-2 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Arrival */}
            <div className="bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 focus-within:border-amber-500/60 transition">
              <span className="block text-[9px] uppercase font-bold tracking-[0.2em] text-stone-400">
                {currentLang === 'mn' ? 'ИРЭХ ӨДӨР' : 'ARRIVAL'}
              </span>
              <input
                type="date"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer w-full [color-scheme:dark] mt-0.5"
              />
            </div>

            {/* Departure */}
            <div className="bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 focus-within:border-amber-500/60 transition">
              <span className="block text-[9px] uppercase font-bold tracking-[0.2em] text-stone-400">
                {currentLang === 'mn' ? 'БУЦАХ ӨДӨР' : 'DEPARTURE'}
              </span>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer w-full [color-scheme:dark] mt-0.5"
              />
            </div>

            {/* Guests */}
            <div className="bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 focus-within:border-amber-500/60 transition">
              <span className="block text-[9px] uppercase font-bold tracking-[0.2em] text-stone-400">
                {currentLang === 'mn' ? 'ЗОЧИД' : 'GUESTS'}
              </span>
              <div className="flex items-center justify-between mt-0.5">
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer w-full [color-scheme:dark]"
                >
                  <option value="1" className="bg-stone-900 text-white">1 {currentLang === 'mn' ? 'хүн' : 'Guest'}</option>
                  <option value="2" className="bg-stone-900 text-white">2 {currentLang === 'mn' ? 'хүн' : 'Guests'}</option>
                  <option value="3" className="bg-stone-900 text-white">3 {currentLang === 'mn' ? 'хүн' : 'Guests'}</option>
                  <option value="4" className="bg-stone-900 text-white">4 {currentLang === 'mn' ? 'хүн' : 'Guests'}</option>
                  <option value="6" className="bg-stone-900 text-white">6+ {currentLang === 'mn' ? 'хүн' : 'Guests'}</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Section 3: Check Availability Button */}
          <div className="pt-2">
            <button
              id="bottom-check-availability-action-btn"
              onClick={() => {
                onToggle();
                onOpenBooking();
              }}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-[0.2em] transition shadow-lg hover:shadow-xl cursor-pointer text-center"
            >
              {currentLang === 'mn' ? 'БЭЛЭН БАЙДАЛ ШАЛГАХ' : 'CHECK AVAILABILITY'}
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Button (Positioned down in the bottom corner) */}
      <button
        id="bottom-corner-booking-trigger-btn"
        onClick={onToggle}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-[10.5px] sm:text-[11.5px] font-bold uppercase tracking-[0.15em] transition-all cursor-pointer shadow-xl backdrop-blur-md hover:scale-105 active:scale-95 ${
          isOpen
            ? 'bg-stone-900 text-amber-300 border-stone-900 shadow-2xl'
            : 'bg-white/95 hover:bg-white text-stone-900 border-stone-300 hover:border-stone-900'
        }`}
        title={isOpen ? (currentLang === 'mn' ? 'Хураах' : 'Collapse') : (currentLang === 'mn' ? 'Захиалга ба тохиргоо нээх' : 'Open booking & settings')}
      >
        <Calendar className="w-4 h-4 text-amber-600" />
        <span>
          {currentLang === 'mn' ? 'ЗАХИАЛГА & ТОХИРГОО' : 'BOOKING & SETTINGS'}
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-amber-400 transition-transform" />
        ) : (
          <ChevronDown className="w-4 h-4 text-stone-600 transition-transform" />
        )}
      </button>
    </aside>
  );
};
