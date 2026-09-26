// Source: Google Maps Platform Code Assist
import React, { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { Language, ExcavationSite } from '../types';
import { excavationSites } from '../data/paleoData';
import { translations } from '../data/translations';
import {
  MapPin,
  Compass,
  Navigation,
  ExternalLink,
  Layers,
  Sparkles,
  Maximize2,
  Minimize2,
  Route,
  Fuel,
  Tent,
  Key,
  Check,
  Globe2,
  Eye,
  AlertTriangle,
} from 'lucide-react';

interface GoogleGobiMapProps {
  currentLang: Language;
  activeSite: ExcavationSite;
  onSelectSite: (site: ExcavationSite) => void;
  onBookSiteTour: (siteName: string) => void;
}

interface WaypointInfo {
  id: string;
  name: Record<string, string>;
  category: 'excavation' | 'hub' | 'natural' | 'camp';
  lat: number;
  lng: number;
  icon: string;
  desc: Record<string, string>;
}

const additionalWaypoints: WaypointInfo[] = [
  {
    id: 'ub',
    name: {
      mn: 'Улаанбаатар (Палеонтологийн Хүрээлэн & Төв Музей)',
      en: 'Ulaanbaatar (Paleontological Institute & Central Museum)',
      ja: 'ウランバートル（古生物学研究所・恐竜中央博物館）',
      zh: '乌兰巴托（古生物研究所与恐龙中央博物馆）',
    },
    category: 'hub',
    lat: 47.9188,
    lng: 106.9176,
    icon: '🏛️',
    desc: {
      mn: 'Тарбозавр Батаарын эх хувь бүтэн араг яс хадгалагдаж буй төв байршил.',
      en: 'Primary repository where original articulated Tarbosaurus bataar is preserved.',
      ja: 'タルボサウルス・バタールのオリジナル全身骨格が収蔵・展示される拠点。',
      zh: '特暴龙巴特尔原生完整骨架珍藏展出的核心国家博物馆。',
    },
  },
  {
    id: 'dalanzadgad',
    name: {
      mn: 'Даланзадгад нисэх онгоцны буудал & Говийн төв',
      en: 'Dalanzadgad Hub Airport & Expedition Base',
      ja: 'ダランザドガド空港・ゴビ探検拠点',
      zh: '达兰扎德嘎德机场与戈壁探险大本营',
    },
    category: 'hub',
    lat: 43.5786,
    lng: 104.4267,
    icon: '✈️',
    desc: {
      mn: 'Өмнөговь аймгийн төв. Шатахуун, хүнс, 4WD тээврийн бэлтгэл базаах гол цэг.',
      en: 'Capital of Omnogovi. Primary logistics hub for 4x4 expedition fuel, food, and satellite guides.',
      ja: '南ゴビ県の中心地。燃料補給、食料調達、4WD探検隊編成の最重要ロジスティクス拠点。',
      zh: '南戈壁省首府。4x4越野探险队油料补给、向导集结与物资准备核心枢纽。',
    },
  },
  {
    id: 'khongor_dunes',
    name: {
      mn: 'Хонгорын элсэн манхан (Дуут элс)',
      en: 'Khongor Sand Dunes (Singing Sands)',
      ja: 'ホンゴル砂丘（歌う砂）',
      zh: '洪戈尔鸣沙大沙丘',
    },
    category: 'natural',
    lat: 43.7314,
    lng: 102.3489,
    icon: '🏜️',
    desc: {
      mn: '180 км урт, 300м өндөр элсэн манхан. Батаарын өлгий баазтай хиллэдэг.',
      en: '180km long, 300m high singing dunes neighboring Bataar Cradle eco camp.',
      ja: '全長180km、高さ最大300mを誇る大砂丘。バタール・エコーベースに隣接。',
      zh: '全长180公里、高达300米的壮丽鸣沙大沙丘，紧邻巴特尔故乡生态营地。',
    },
  },
  {
    id: 'yol_valley',
    name: {
      mn: 'Ёлын ам хавцал (Мөнх цаст хавцал)',
      en: 'Yol Valley Gorge (Eagle Valley Icefield)',
      ja: 'ヨル峡谷（ワシの谷・氷峡）',
      zh: '尤恩谷冰川峡谷（鹰谷）',
    },
    category: 'natural',
    lat: 43.4853,
    lng: 104.0686,
    icon: '❄️',
    desc: {
      mn: 'Говь цөлийн дундах мөнх мөст гүн хавцал, сахалтай тас шувууны өлгий.',
      en: 'Deep glaciated gorge in the desert, habitat of lammergeier bearded vultures.',
      ja: '砂漠の中の氷結峡谷。ヒゲワシや野生ヤギが生息する絶壁地帯。',
      zh: '戈壁荒漠中的深邃高山冰川峡谷，野生胡兀鹫与野山羊栖息圣地。',
    },
  },
  {
    id: 'bataar_base_camp',
    name: {
      mn: 'Батаарын өлгий Эко бааз & Одон орон станц',
      en: 'Bataar Cradle Eco Base & Observatory',
      ja: 'バタール・エコーベース＆星空天文台',
      zh: '巴特尔故乡生态营地与星空天文台',
    },
    category: 'camp',
    lat: 43.6820,
    lng: 102.4150,
    icon: '🏕️',
    desc: {
      mn: 'Жуулчдад зориулсан люкс өрөө, 100% нарны эрчим хүч, хээрийн лаборатори.',
      en: 'Deluxe rooms & eco cabins, 100% solar power, paleontological field lab & telescope.',
      ja: '高級伝統ゲル、100%太陽光発電、古生物現地ラボと天体望遠鏡を完備。',
      zh: '豪华传统蒙古包营地，100%太阳能供电，配备古生物野外实验站与专业天文望远镜。',
    },
  },
];

// Helper to validate Google Maps Platform API Key
// Legitimate Google Maps API keys start with 'AIza' (typically 39 characters)
// Keys starting with 'AQ.' are Gemini / Vertex tokens or OAuth credentials, not Maps keys
const isValidGoogleMapsKey = (key?: string | null): boolean => {
  if (!key) return false;
  const trimmed = key.trim();
  if (!trimmed.startsWith('AIza')) return false;
  if (trimmed === 'MY_GOOGLE_MAPS_API_KEY') return false;
  return trimmed.length >= 30;
};

export const GoogleGobiMap: React.FC<GoogleGobiMapProps> = ({
  currentLang,
  activeSite,
  onSelectSite,
  onBookSiteTour,
}) => {
  const t = translations[currentLang];
  const [mapType, setMapType] = useState<'hybrid' | 'satellite' | 'terrain' | 'roadmap'>('hybrid');
  const [showWaypoints, setShowWaypoints] = useState(true);
  const [showRouteOverlay, setShowRouteOverlay] = useState(true);
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(activeSite.id);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasAuthError, setHasAuthError] = useState(false);
  
  // Google Maps API Key from environment
  const rawApiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '';
  const isKeyValid = isValidGoogleMapsKey(rawApiKey) && !hasAuthError;

  // Intercept Google Maps authentication failure to gracefully fall back
  useEffect(() => {
    const prevAuthFailure = (window as unknown as { gm_authFailure?: () => void }).gm_authFailure;
    (window as unknown as { gm_authFailure?: () => void }).gm_authFailure = () => {
      console.warn('Google Maps authentication failed with the provided key. Falling back to Google Maps Embed view.');
      setHasAuthError(true);
    };
    return () => {
      (window as unknown as { gm_authFailure?: () => void }).gm_authFailure = prevAuthFailure;
    };
  }, []);

  // Sync selected marker when activeSite changes externally
  useEffect(() => {
    setSelectedMarkerId(activeSite.id);
  }, [activeSite.id]);

  // Center coordinate for the map
  const defaultCenter = { lat: activeSite.lat || 43.8, lng: activeSite.lng || 101.5 };

  // Calculate distance between two GPS coordinates (Haversine formula in km)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  const distFromUB = calculateDistance(47.9188, 106.9176, activeSite.lat, activeSite.lng);
  const distFromDZ = calculateDistance(43.5786, 104.4267, activeSite.lat, activeSite.lng);
  const estHoursDZ = (distFromDZ / 42).toFixed(1); // average 4x4 desert offroad speed ~42 km/h

  // Direct Google Maps Deep Links
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${activeSite.lat},${activeSite.lng}&travelmode=driving`;
  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${activeSite.lat},${activeSite.lng}`;
  const googleEarthUrl = `https://earth.google.com/web/@${activeSite.lat},${activeSite.lng},1200a,2500d,35y,0h,45t,0r`;

  // Fallback Google Maps Embed URL when interactive Maps SDK loads or when running standalone
  const embedMapUrl = `https://maps.google.com/maps?q=${activeSite.lat},${activeSite.lng}&z=9&t=${mapType === 'satellite' || mapType === 'hybrid' ? 'k' : 'p'}&output=embed`;

  return (
    <div
      id="google-maps-gobi-explorer"
      className={`relative w-full overflow-hidden border border-stone-300 bg-stone-100 shadow-md transition-all duration-300 ${
        isFullscreen ? 'fixed inset-4 z-50 border-2 border-stone-900' : 'h-[520px] sm:h-[600px]'
      }`}
    >
      {/* Top Controls Bar */}
      <div className="absolute top-3 left-3 right-3 z-30 flex flex-wrap items-center justify-between gap-2 p-2.5 bg-white/95 backdrop-blur-md border border-stone-200 shadow-sm">
        {/* Title & Coordinates */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-800">
            <Globe2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-900">
              <span>Google Maps™ • {activeSite.name[currentLang]}</span>
              <span className="px-1.5 py-0.5 bg-stone-100 text-stone-700 text-[10px] font-mono border border-stone-200">
                GPS: {activeSite.lat.toFixed(4)}°N, {activeSite.lng.toFixed(4)}°E
              </span>
            </div>
            <p className="text-[10px] text-stone-500 hidden sm:block font-serif italic">
              {activeSite.province[currentLang]} • {activeSite.formation}
            </p>
          </div>
        </div>

        {/* Map Type & Control Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Map Layer Selector */}
          <div className="flex items-center bg-stone-100 p-0.5 border border-stone-200 text-[11px]">
            <button
              onClick={() => setMapType('hybrid')}
              className={`px-2.5 py-1 transition cursor-pointer ${
                mapType === 'hybrid' ? 'bg-stone-900 text-white font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Hybrid
            </button>
            <button
              onClick={() => setMapType('satellite')}
              className={`px-2.5 py-1 transition cursor-pointer ${
                mapType === 'satellite' ? 'bg-stone-900 text-white font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => setMapType('terrain')}
              className={`px-2.5 py-1 transition cursor-pointer ${
                mapType === 'terrain' ? 'bg-stone-900 text-white font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Terrain
            </button>
          </div>

          {/* Toggle Landmarks & Hubs */}
          <button
            onClick={() => setShowWaypoints(!showWaypoints)}
            title="Цэгүүдийг харуулах / нуух"
            className={`px-2.5 py-1.5 border text-xs font-medium flex items-center gap-1 cursor-pointer transition ${
              showWaypoints
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{currentLang === 'mn' ? 'Цэгүүд' : 'Waypoints'}</span>
          </button>

          {/* Open Directly in Google Maps App */}
          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
            title="Google Maps апп дээр GPS чиглэл нээх"
          >
            <Navigation className="w-3.5 h-3.5 text-white" />
            <span>Google Maps GPS</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 transition cursor-pointer"
            title={isFullscreen ? 'Багасгах' : 'Бүтэн дэлгэц'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Primary Map Rendering Canvas */}
      <div className="w-full h-full relative">
        {isKeyValid ? (
          <APIProvider
            apiKey={rawApiKey}
            onError={(err) => {
              console.warn('Google Maps APIProvider error:', err);
              setHasAuthError(true);
            }}
          >
            <Map
              defaultCenter={defaultCenter}
              defaultZoom={7}
              mapTypeId={mapType}
              mapId="DEMO_MAP_ID"
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              gestureHandling="greedy"
              disableDefaultUI={false}
              className="w-full h-full"
              style={{ width: '100%', height: '100%' }}
            >
              {/* Primary Excavation Site Advanced Markers */}
              {excavationSites.map((site) => {
                const isSelected = activeSite.id === site.id;
                return (
                  <React.Fragment key={site.id}>
                    <AdvancedMarker
                      position={{ lat: site.lat, lng: site.lng }}
                      title={site.name[currentLang]}
                      onClick={() => {
                        onSelectSite(site);
                        setSelectedMarkerId(site.id);
                      }}
                    >
                      <div
                        className={`group relative flex flex-col items-center cursor-pointer transition-all duration-300 ${
                          isSelected ? 'scale-125 z-40' : 'hover:scale-110 z-20'
                        }`}
                      >
                        {isSelected && (
                          <span className="absolute -inset-2 rounded-full bg-amber-400/40 animate-ping" />
                        )}
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center shadow-2xl border-2 transition ${
                            isSelected
                              ? 'bg-amber-500 text-stone-950 border-white ring-4 ring-amber-400/60'
                              : 'bg-stone-900 text-amber-300 border-amber-500/70 hover:bg-amber-500 hover:text-stone-950'
                          }`}
                        >
                          <span className="text-sm font-bold">🦕</span>
                        </div>
                        <div
                          className={`mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap shadow-lg border ${
                            isSelected
                              ? 'bg-amber-500 text-stone-950 border-amber-300'
                              : 'bg-stone-950/95 text-stone-200 border-stone-800'
                          }`}
                        >
                          {site.mongolianName}
                        </div>
                      </div>
                    </AdvancedMarker>

                    {/* Selected Site Info Window */}
                    {selectedMarkerId === site.id && (
                      <InfoWindow
                        position={{ lat: site.lat, lng: site.lng }}
                        onCloseClick={() => setSelectedMarkerId(null)}
                      >
                        <div className="p-2 max-w-[260px] text-stone-900">
                          <img
                            src={site.image}
                            alt={site.name[currentLang]}
                            className="w-full h-24 object-cover rounded-lg mb-2"
                          />
                          <h4 className="font-bold text-sm text-stone-900 mb-0.5">
                            {site.name[currentLang]}
                          </h4>
                          <p className="text-xs text-amber-800 font-medium mb-1">
                            {site.formation} ({site.age})
                          </p>
                          <p className="text-[11px] text-stone-600 line-clamp-2 mb-2">
                            {site.significance[currentLang]}
                          </p>
                          <div className="flex items-center gap-1.5">
                            <a
                              href={`https://www.google.com/maps/dir/?api=1&destination=${site.lat},${site.lng}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 py-1 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold text-center flex items-center justify-center gap-1"
                            >
                              <Navigation className="w-3 h-3" />
                              <span>Google Maps GPS</span>
                            </a>
                            <button
                              onClick={() => onBookSiteTour(site.name[currentLang])}
                              className="py-1 px-2 bg-amber-600 hover:bg-amber-700 text-white rounded text-[11px] font-bold"
                            >
                              Экспедиц
                            </button>
                          </div>
                        </div>
                      </InfoWindow>
                    )}
                  </React.Fragment>
                );
              })}

              {/* Additional Expedition Waypoint Markers */}
              {showWaypoints &&
                additionalWaypoints.map((wp) => (
                  <AdvancedMarker
                    key={wp.id}
                    position={{ lat: wp.lat, lng: wp.lng }}
                    title={wp.name[currentLang] || wp.name.en || wp.name.mn}
                  >
                    <div className="flex flex-col items-center group cursor-pointer">
                      <div className="w-7 h-7 rounded-full bg-stone-900/90 border border-stone-600 text-stone-200 flex items-center justify-center text-xs shadow-lg group-hover:scale-110 transition">
                        <span>{wp.icon}</span>
                      </div>
                      <span className="mt-0.5 px-1.5 py-0.2 rounded bg-stone-900/90 text-stone-300 border border-stone-800 text-[9px] font-medium whitespace-nowrap">
                        {(wp.name[currentLang] || wp.name.en || wp.name.mn || '').split(' ')[0]}
                      </span>
                    </div>
                  </AdvancedMarker>
                ))}
            </Map>
          </APIProvider>
        ) : (
          /* Live Interactive Google Maps Embed with Synchronized Coordinate View */
          <div className="w-full h-full relative bg-[#13110e]">
            <iframe
              title="Google Maps Gobi Expedition Explorer"
              src={embedMapUrl}
              className="w-full h-full border-0 filter contrast-110 brightness-95"
              loading="lazy"
              allowFullScreen
            />
            {/* Visual Compass & GPS HUD */}
            <div className="absolute top-16 left-4 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-950/80 backdrop-blur-md border border-stone-800 text-stone-300 text-xs font-mono">
              <Compass className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>
                Gobi Sector: {activeSite.coordinates} • Elev ~1,240m
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Expedition Route HUD & Quick Selector Bar */}
      <div className="absolute bottom-3 left-3 right-3 z-30 p-3 bg-white/95 backdrop-blur-md border border-stone-200 shadow-lg flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-stone-900">
        {/* Route Stats to Active Site */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-800">
              <Route className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10px] text-stone-500 block uppercase font-bold tracking-wider">
                {currentLang === 'mn' ? 'Даланзадгад хотоос' : 'From Dalanzadgad'}
              </span>
              <span className="font-mono font-semibold text-stone-900">
                {activeSite.id === 'bataar_base_camp' ? '390 км (~6.5 цаг 4WD)' : `${distFromDZ} км (~${estHoursDZ} цаг 4WD)`}
              </span>
            </div>
          </div>

          <div className="h-6 w-px bg-stone-200 hidden sm:block" />

          <div className="hidden sm:flex items-center gap-2">
            <div className="w-7 h-7 bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-800">
              <Fuel className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10px] text-stone-500 block uppercase font-bold tracking-wider">
                {currentLang === 'mn' ? 'Улаанбаатараас' : 'From Ulaanbaatar'}
              </span>
              <span className="font-mono font-semibold text-stone-900">
                {distFromUB} км (Нийт зам)
              </span>
            </div>
          </div>
        </div>

        {/* Site Quick Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {excavationSites.map((site) => {
            const isSelected = activeSite.id === site.id;
            return (
              <button
                key={site.id}
                onClick={() => {
                  onSelectSite(site);
                  setSelectedMarkerId(site.id);
                }}
                className={`px-3 py-1.5 text-xs whitespace-nowrap transition cursor-pointer border flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-stone-900 text-white font-semibold border-stone-900 shadow-sm'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span>{site.mongolianName}</span>
              </button>
            );
          })}
        </div>

        {/* External Map Tools Links */}
        <div className="flex items-center gap-2">
          <a
            href={googleEarthUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-xs font-semibold flex items-center gap-1 transition"
            title="Google Earth 3D Сансрын панорама нээх"
          >
            <span>Earth 3D</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm border border-stone-900 transition"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Google Maps {currentLang === 'mn' ? 'Замчлал' : 'Nav'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
