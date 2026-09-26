import React from 'react';
import { Language, PageId } from '../types';
import { translations } from '../data/translations';
import { Compass, ShieldCheck, Mail, Globe, Heart, MessageCircle, Share2, Phone, MapPin, Download, Code, FileArchive } from 'lucide-react';
import officialLogoImg from '../assets/images/bataar_official_logo_1788064678288.jpg';

interface FooterProps {
  currentLang: Language;
  onNavigate: (page: PageId) => void;
  onOpenMessengerShare?: () => void;
  onOpenAnalytics?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onNavigate, onOpenMessengerShare, onOpenAnalytics }) => {
  const t = translations[currentLang];

  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF9F5] text-stone-700 border-t border-stone-200 pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-stone-200">
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-stone-300 shadow-sm bg-white shrink-0">
                <img 
                  src={officialLogoImg} 
                  alt="Батаарын өлгий лого" 
                  referrerPolicy="no-referrer" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <span className="font-['Cormorant_Garamond',serif] text-2xl font-normal tracking-wide text-stone-900">
                  {t.siteTitle}
                </span>
                <p className="text-[10px] uppercase font-bold tracking-[0.25em] text-stone-500">
                  Authentic Gobi Camp • Wildlife & Heritage Journeys
                </p>
              </div>
            </div>

            <p className="font-['Cormorant_Garamond',serif] italic text-base text-stone-700 font-light leading-relaxed max-w-sm">
              {t.siteSubtitle}. Dedicated to the scientific study, ethical conservation, and international celebration of Mongolia's global Cretaceous paleontological heritage.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-stone-200 text-xs text-stone-700 font-medium shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-800" />
                <span>Official Mongolian Paleontology Sanctuary</span>
              </div>
              {onOpenMessengerShare && (
                <button
                  onClick={onOpenMessengerShare}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-medium transition cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Messenger холбоос авах</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-['Cormorant_Garamond',serif] text-base font-semibold text-stone-900 uppercase tracking-[0.2em] mb-5">
              Explore
            </h4>
            <ul className="space-y-3 text-xs text-stone-600 font-light">
              <li>
                <button
                  onClick={() => handleNav('accommodations')}
                  className="hover:text-stone-900 transition font-medium flex items-center gap-1.5 text-stone-800"
                >
                  ⛺ {t.nav.visitorGuide}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('dinosaurs')}
                  className="hover:text-stone-900 transition"
                >
                  {t.nav.dinosaurs}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('maps')}
                  className="hover:text-stone-900 transition"
                >
                  {t.nav.gobiSites}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('snow-leopard')}
                  className="hover:text-stone-900 transition font-medium flex items-center gap-1.5"
                >
                  🐾 {t.nav.snowLeopard}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('landscapes')}
                  className="hover:text-stone-900 transition font-medium flex items-center gap-1.5"
                >
                  🏜️ {t.nav.landscapes}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('bataar-story')}
                  className="hover:text-stone-900 transition"
                >
                  {t.nav.bataarStory}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('expeditions')}
                  className="hover:text-stone-900 transition"
                >
                  {t.nav.expeditions}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('weather')}
                  className="hover:text-stone-900 transition font-medium flex items-center gap-1.5"
                >
                  ☀️ {t.nav.weather}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('virtual-lab')}
                  className="hover:text-stone-900 transition"
                >
                  {t.nav.fossilLab}
                </button>
              </li>
              {onOpenAnalytics && (
                <li>
                  <button
                    onClick={onOpenAnalytics}
                    className="hover:text-stone-900 transition text-emerald-700 font-medium flex items-center gap-1.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{currentLang === 'mn' ? 'Зочдын тоо & Хээрийн судалгаа' : currentLang === 'ja' ? 'アクセス統計・探検調査' : currentLang === 'zh' ? '实时访客与科考调研' : 'Visitor Telemetry & Survey'}</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Contact & Tourist Camp Info */}
          <div>
            <h4 className="font-['Cormorant_Garamond',serif] text-base font-semibold text-stone-900 uppercase tracking-[0.2em] mb-5">
              {currentLang === 'mn' ? 'Холбоо барих' : currentLang === 'ja' ? 'お問い合わせ' : currentLang === 'zh' ? '联系与预订' : 'Contact & Booking'}
            </h4>
            <div className="space-y-2.5 text-xs text-stone-700 font-light">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-800 shrink-0" />
                <a href="tel:+97672010099" className="hover:text-stone-900 transition font-mono">
                  +976 7201 0099
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-800 shrink-0" />
                <a href="tel:+97688223584" className="hover:text-stone-900 transition font-mono">
                  +976 8822 3584
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-800 shrink-0" />
                <a href="tel:+97699530099" className="hover:text-stone-900 transition font-mono">
                  +976 9953 0099
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-800 shrink-0" />
                <a href="tel:+97699723336" className="hover:text-stone-900 transition font-mono">
                  +976 9972 3336
                </a>
              </div>
              <div className="flex items-center gap-2 pt-1 text-stone-600">
                <Mail className="w-3.5 h-3.5 text-stone-800 shrink-0" />
                <a href="mailto:bataartravel@gmail.com" className="hover:text-stone-900 transition text-[11px] font-mono">
                  bataartravel@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1 text-[11px] text-stone-600">
                <MapPin className="w-3.5 h-3.5 text-stone-800 shrink-0 mt-0.5" />
                <span>
                  {currentLang === 'mn' ? 'Өмнөговь аймаг, Гурвантэс сум' : 'Gurvantes Soum, South Gobi, Mongolia'}
                </span>
              </div>
            </div>
          </div>

          {/* Scientific Collaborators */}
          <div>
            <h4 className="font-['Cormorant_Garamond',serif] text-base font-semibold text-stone-900 uppercase tracking-[0.2em] mb-5">
              Key Institutions
            </h4>
            <ul className="space-y-3 text-xs text-stone-600 font-light">
              <li>Mongolian Academy of Sciences (MAS)</li>
              <li>Central Dinosaur Museum of Mongolia</li>
              <li>American Museum of Natural History</li>
              <li>Polish Academy of Sciences (PAS)</li>
            </ul>
          </div>

          {/* Heritage Protection Notice */}
          <div>
            <h4 className="font-['Cormorant_Garamond',serif] text-base font-semibold text-stone-900 uppercase tracking-[0.2em] mb-5">
              Legal Protection
            </h4>
            <p className="text-[11px] text-stone-600 leading-relaxed font-light">
              Under Article 7 of the Constitution of Mongolia and the Law on Protection of Cultural Heritage, all paleontological fossils found within Mongolian territory are the inalienable property of the State and its people.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-light border-t border-stone-200/60 mt-4">
          <div>
            © {new Date().getFullYear()} Cradle of Bataar (Батаарын өлгий) • All Rights Reserved.
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <span className="font-medium text-stone-700">{currentLang === 'mn' ? 'Төслийн код татах:' : 'Project Source:'}</span>
            <a
              href="/bataar_app_source.zip"
              download="bataar_project_source.zip"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs shadow-sm transition"
              title="Download Full Project ZIP"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Татах (.ZIP)</span>
            </a>
            <a
              href="/bataar_app_source.tar.gz"
              download="bataar_project_source.tar.gz"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium text-xs border border-stone-300 transition"
              title="Download Full Project TAR.GZ"
            >
              <FileArchive className="w-3.5 h-3.5 text-stone-600" />
              <span>.TAR.GZ</span>
            </a>
            <span className="hidden sm:inline">•</span>
            <span>Ulaanbaatar & South Gobi, Mongolia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
