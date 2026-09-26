import React, { useState } from 'react';
import { Language, ExcavationSite } from '../types';
import { excavationSites } from '../data/paleoData';
import { translations } from '../data/translations';
import { getLocalizedText, getLocalizedList } from '../utils/localization';
import { GoogleGobiMap } from './GoogleGobiMap';
import {
  MapPin,
  Compass,
  Eye,
  ShieldAlert,
  Sparkles,
  Navigation,
  Globe,
  ExternalLink,
  Route,
  Layers,
  Map as MapIcon,
  Copy,
  Check,
} from 'lucide-react';

interface GobiMapSectionProps {
  currentLang: Language;
  onBookSiteTour: (siteName: string) => void;
}

export const GobiMapSection: React.FC<GobiMapSectionProps> = ({
  currentLang,
  onBookSiteTour,
}) => {
  const t = translations[currentLang];
  const [activeSite, setActiveSite] = useState<ExcavationSite>(excavationSites[0]);
  const [viewType, setViewType] = useState<'google' | 'stylized'>('google');
  const [copiedCoords, setCopiedCoords] = useState(false);

  // Relative visual positions on the stylized Gobi Map
  const siteCoordinatesMap: Record<string, { top: string; left: string }> = {
    bayanzag: { top: '38%', left: '68%' },
    nemegt: { top: '65%', left: '42%' },
    tugrugiin_shiree: { top: '32%', left: '62%' },
    khermeen_tsav: { top: '72%', left: '26%' },
    bugiin_tsav: { top: '55%', left: '22%' },
  };

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(`${activeSite.lat}, ${activeSite.lng}`);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${activeSite.lat},${activeSite.lng}&travelmode=driving`;
  const googleEarthUrl = `https://earth.google.com/web/@${activeSite.lat},${activeSite.lng},1200a,2500d,35y,0h,45t,0r`;

  return (
    <section id="gobi-sites" className="py-24 bg-[#FAF9F5] text-stone-900 border-b border-stone-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="block text-[10px] uppercase font-bold tracking-[0.3em] text-stone-500 mb-2">
            {currentLang === 'mn' ? 'ГАЗАР ЗҮЙ & ХЭЭРИЙН МАРШРУТ' : 'EXPEDITION GEOGRAPHY & SATELLITE GPS'}
          </span>
          
          <h2 className="font-['Cormorant_Garamond',serif] text-4xl sm:text-5xl lg:text-6xl font-normal text-stone-900 mb-4 tracking-tight leading-[1.08]">
            {t.gobiSites.sectionTitle}
          </h2>
          
          <p className="font-['Cormorant_Garamond',serif] italic text-xl sm:text-2xl text-stone-700 font-light max-w-2xl mx-auto">
            {t.gobiSites.sectionSubtitle}
          </p>

          {/* Master View Switcher (Google Maps vs Stylized Expedition Map) */}
          <div className="inline-flex items-center gap-1.5 p-1 bg-white border border-stone-200/80 shadow-sm mt-8">
            <button
              onClick={() => setViewType('google')}
              className={`px-5 py-2 text-xs font-semibold tracking-wider uppercase flex items-center gap-2 transition cursor-pointer ${
                viewType === 'google'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Google Maps Live</span>
              <span className="px-1.5 py-0.5 bg-stone-100 text-[9px] font-mono text-stone-700 border border-stone-200">
                GPS
              </span>
            </button>

            <button
              onClick={() => setViewType('stylized')}
              className={`px-5 py-2 text-xs font-semibold tracking-wider uppercase flex items-center gap-2 transition cursor-pointer ${
                viewType === 'stylized'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>{currentLang === 'mn' ? 'Уран зураглал' : 'Artistic Cartography'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Google Maps or Stylized Map */}
          <div className="lg:col-span-7 space-y-4">
            {viewType === 'google' ? (
              <GoogleGobiMap
                currentLang={currentLang}
                activeSite={activeSite}
                onSelectSite={setActiveSite}
                onBookSiteTour={onBookSiteTour}
              />
            ) : (
              /* Stylized Prehistoric Canvas */
              <div className="bg-white border border-stone-200/80 p-5 sm:p-7 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-200">
                  <div className="flex items-center gap-2 text-xs text-stone-600 font-medium tracking-wide">
                    <Navigation className="w-3.5 h-3.5 text-stone-700" />
                    <span>Southern Gobi Desert, Mongolia (43°-44°N)</span>
                  </div>
                  <span className="text-[10px] text-stone-500 font-mono tracking-wider uppercase">Late Cretaceous Strata</span>
                </div>

                <div className="relative w-full h-[400px] sm:h-[480px] overflow-hidden border border-stone-200 bg-stone-900">
                  <img
                    src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80"
                    alt="Gobi Desert Map"
                    className="w-full h-full object-cover filter contrast-125 opacity-70"
                  />
                  <div className="absolute inset-0 bg-stone-950/40" />

                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] text-stone-800 border border-stone-200 tracking-widest uppercase font-medium">
                    🏔️ Gurvansaikhan Mountains
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] text-stone-800 border border-stone-200 tracking-widest uppercase font-medium">
                    🏜️ Khongor Singing Dunes
                  </div>

                  {excavationSites.map((site) => {
                    const pos = siteCoordinatesMap[site.id] || { top: '50%', left: '50%' };
                    const isSelected = activeSite.id === site.id;

                    return (
                      <button
                        key={site.id}
                        onClick={() => setActiveSite(site)}
                        style={{ top: pos.top, left: pos.left }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300 z-20 ${
                          isSelected ? 'scale-110 z-30' : 'hover:scale-105'
                        }`}
                      >
                        <div className="relative flex flex-col items-center">
                          {isSelected && (
                            <span className="absolute w-8 h-8 rounded-full bg-white/50 animate-ping" />
                          )}
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg border transition ${
                              isSelected
                                ? 'bg-stone-900 text-white border-white ring-4 ring-stone-900/30'
                                : 'bg-white text-stone-800 border-stone-300 group-hover:bg-stone-900 group-hover:text-white'
                            }`}
                          >
                            <MapPin className="w-4 h-4" />
                          </div>
                          <span
                            className={`mt-1.5 px-2.5 py-0.5 text-[10px] font-semibold whitespace-nowrap shadow-sm tracking-wider transition ${
                              isSelected
                                ? 'bg-stone-900 text-white'
                                : 'bg-white/95 text-stone-800 border border-stone-200 group-hover:bg-white'
                            }`}
                          >
                            {site.mongolianName}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4">
                  {excavationSites.map((site) => (
                    <button
                      key={site.id}
                      onClick={() => setActiveSite(site)}
                      className={`p-2.5 text-left border transition text-xs flex flex-col justify-between cursor-pointer ${
                        activeSite.id === site.id
                          ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                          : 'bg-[#FAF9F5] border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <span className="truncate font-medium">{getLocalizedText(site.name, currentLang)}</span>
                      <span className="text-[10px] text-stone-500 mt-1">{site.age.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Active Site Deep Dossier & Google Navigation Hub */}
          <div className="lg:col-span-5 bg-white border border-stone-200/80 p-6 sm:p-8 shadow-sm space-y-6">
            {/* Site Image & Province */}
            <div className="relative overflow-hidden h-52 border border-stone-200">
              <img
                src={activeSite.image}
                alt={getLocalizedText(activeSite.name, currentLang)}
                className="w-full h-full object-cover hover:scale-105 transition duration-700"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-stone-800 border border-stone-200 uppercase tracking-wider text-[10px]">
                📍 {getLocalizedText(activeSite.province, currentLang)}
              </div>
              <div className="absolute bottom-3 left-3 text-xs text-stone-800 font-mono flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1 border border-stone-200">
                <span>{activeSite.coordinates}</span>
                <button
                  onClick={handleCopyCoords}
                  title="GPS координат хуулах"
                  className="p-1 hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition cursor-pointer"
                >
                  {copiedCoords ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-stone-600" />}
                </button>
              </div>
            </div>

            {/* Title & Geological Formation */}
            <div>
              <h3 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl font-normal text-stone-900 mb-1 leading-tight">
                {getLocalizedText(activeSite.name, currentLang)}
              </h3>
              <p className="text-xs text-stone-500 font-medium tracking-wide">
                {activeSite.formation} • <span className="text-stone-700">{activeSite.age}</span>
              </p>
            </div>

            {/* Direct Google Maps & Earth Action Bar */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition"
              >
                <Navigation className="w-3.5 h-3.5 text-stone-700" />
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href={googleEarthUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition"
              >
                <Globe className="w-3.5 h-3.5 text-stone-700" />
                <span>Google Earth 3D</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>

            {/* Significance Quote */}
            <div className="p-4 bg-[#FAF9F5] border border-stone-200 text-xs text-stone-700 font-light leading-relaxed">
              ⭐ {getLocalizedText(activeSite.significance, currentLang)}
            </div>

            {/* Description */}
            <p className="font-['Cormorant_Garamond',serif] italic text-base text-stone-700 font-light leading-relaxed">
              {getLocalizedText(activeSite.description, currentLang)}
            </p>

            {/* Key Discoveries */}
            <div className="space-y-2.5">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-stone-600" />
                <span>{t.gobiSites.keyDiscoveries}</span>
              </h4>
              <div className="grid grid-cols-1 gap-1.5">
                {getLocalizedList(activeSite.keyDiscoveries, currentLang).map((disc, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-[#FAF9F5] text-xs text-stone-800 border border-stone-200">
                    <span className="text-stone-600 font-bold text-xs">—</span>
                    <span className="truncate">{disc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visitor Tip */}
            <div className="p-4 bg-[#FAF9F5] border border-stone-200 flex items-start gap-3 text-xs text-stone-600">
              <ShieldAlert className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block mb-0.5 tracking-wider uppercase text-[10px]">{t.gobiSites.visitorTip}:</strong>
                <span className="font-light">{activeSite.visitorTips[currentLang]}</span>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => onBookSiteTour(activeSite.name[currentLang])}
              className="w-full py-4 border border-stone-900 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-[0.25em] transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-white" />
              <span>{t.gobiSites.exploreSiteBtn} ({activeSite.mongolianName})</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
