import React from 'react';
import { Language, PageId } from '../types';
import { translations } from '../data/translations';
import { 
  Home, 
  Bone, 
  Sparkles, 
  Compass, 
  Smartphone,
  MessageCircle,
  Tent,
  Map
} from 'lucide-react';

interface MobileAppTabBarProps {
  currentLang: Language;
  currentPage: PageId;
  onNavigatePage: (page: PageId) => void;
  onOpenAppModal: () => void;
  onOpenJournal: () => void;
  onOpenMessengerShare?: () => void;
  savedCount: number;
}

export const MobileAppTabBar: React.FC<MobileAppTabBarProps> = ({
  currentLang,
  currentPage,
  onNavigatePage,
  onOpenAppModal,
  onOpenJournal,
  onOpenMessengerShare,
  savedCount,
}) => {
  const t = translations[currentLang];
  const af = t.appFeatures;

  const handleTabClick = (page: PageId) => {
    onNavigatePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-xl border-t border-stone-200 px-2 py-1.5 shadow-lg safe-area-inset-bottom">
      <div className="flex items-center justify-around">
        
        {/* Home */}
        <button
          id="mobile-tab-home"
          onClick={() => handleTabClick('home')}
          className={`flex flex-col items-center justify-center p-1 transition cursor-pointer min-w-[48px] ${
            currentPage === 'home' ? 'text-stone-900 font-bold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span className="text-[10px]">{af.quickNavHome}</span>
        </button>

        {/* Accommodations */}
        <button
          id="mobile-tab-accommodations"
          onClick={() => handleTabClick('accommodations')}
          className={`flex flex-col items-center justify-center p-1 transition cursor-pointer min-w-[48px] ${
            currentPage === 'accommodations' ? 'text-stone-900 font-bold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Tent className="w-4 h-4 mb-0.5" />
          <span className="text-[10px]">{currentLang === 'mn' ? 'Өрөө сууц' : 'Stay'}</span>
        </button>

        {/* Dinosaurs */}
        <button
          id="mobile-tab-dinosaurs"
          onClick={() => handleTabClick('dinosaurs')}
          className={`flex flex-col items-center justify-center p-1 transition cursor-pointer min-w-[48px] ${
            currentPage === 'dinosaurs' ? 'text-stone-900 font-bold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Bone className="w-4 h-4 mb-0.5" />
          <span className="text-[10px]">{af.quickNavDino}</span>
        </button>

        {/* Expeditions */}
        <button
          id="mobile-tab-expeditions"
          onClick={() => handleTabClick('expeditions')}
          className={`flex flex-col items-center justify-center p-1 transition cursor-pointer min-w-[48px] ${
            currentPage === 'expeditions' ? 'text-stone-900 font-bold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Compass className="w-4 h-4 mb-0.5" />
          <span className="text-[10px]">{currentLang === 'mn' ? 'Аялал' : 'Trips'}</span>
        </button>

        {/* Map */}
        <button
          id="mobile-tab-maps"
          onClick={() => handleTabClick('maps')}
          className={`flex flex-col items-center justify-center p-1 transition cursor-pointer min-w-[48px] ${
            currentPage === 'maps' ? 'text-stone-900 font-bold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Map className="w-4 h-4 mb-0.5" />
          <span className="text-[10px]">{currentLang === 'mn' ? 'Газрын зураг' : 'Map'}</span>
        </button>

        {/* PWA / App */}
        <button
          id="mobile-tab-app"
          onClick={onOpenAppModal}
          className="flex flex-col items-center justify-center p-1 text-stone-700 hover:text-stone-950 transition cursor-pointer min-w-[48px] relative"
        >
          <div className="relative">
            <Smartphone className="w-4 h-4 mb-0.5" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-stone-900 text-white rounded-full text-[9px] font-black flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">{af.quickNavApp}</span>
        </button>

      </div>
    </div>
  );
};
