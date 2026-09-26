import React from 'react';
import { Language, PageId } from '../types';
import { getLocalizedText } from '../utils/localization';
import { ArrowLeft, Home, Compass } from 'lucide-react';

interface PageBannerProps {
  currentLang: Language;
  title: string;
  subtitle?: string;
  categoryTag?: string;
  onNavigateHome: () => void;
  onNavigatePage?: (page: PageId) => void;
  currentPage: PageId;
}

export const PageBanner: React.FC<PageBannerProps> = ({
  currentLang,
  title,
  subtitle,
  categoryTag,
  onNavigateHome,
  onNavigatePage,
  currentPage,
}) => {
  const quickLinks: { id: PageId; label: Record<string, string> }[] = [
    { id: 'accommodations', label: { mn: 'Өрөө сууц', en: 'Accommodations', ja: '宿泊・ゲル', zh: '客房与营地' } },
    { id: 'expeditions', label: { mn: 'Экспедиц', en: 'Expeditions', ja: '探検ツアー', zh: '科考探险' } },
    { id: 'dinosaurs', label: { mn: 'Үлэг гүрвэлүүд', en: 'Dinosaurs', ja: '恐竜化石', zh: '恐龙化石' } },
    { id: 'maps', label: { mn: 'Газрын зураг', en: 'Sites Map', ja: 'ゴビ地図', zh: '戈壁地图' } },
    { id: 'snow-leopard', label: { mn: 'Ирвэс', en: 'Snow Leopard', ja: 'ユキヒョウ', zh: '雪豹保护' } },
    { id: 'landscapes', label: { mn: 'Байгаль', en: 'Landscapes', ja: '絶景', zh: '地质风光' } },
    { id: 'bataar-story', label: { mn: 'Батаарын түүх', en: 'Bataar Epic', ja: 'バタール物語', zh: '巴特尔归来' } },
    { id: 'virtual-lab', label: { mn: 'Малтлагын лаб', en: 'Dig Lab', ja: '発掘ラボ', zh: '虚拟发掘' } },
    { id: 'weather', label: { mn: 'Цаг агаар', en: 'Weather', ja: '気象情報', zh: '实时天气' } },
    { id: 'collaborations', label: { mn: 'Түншлэл', en: 'Partners', ja: '共同研究', zh: '科研合作' } },
  ];

  return (
    <div className="bg-[#FAF9F5] border-b border-stone-200 pt-8 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Breadcrumbs & Back button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-medium text-stone-500 uppercase tracking-wider">
            <button
              onClick={onNavigateHome}
              className="hover:text-stone-900 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{currentLang === 'mn' ? 'НҮҮР' : 'HOME'}</span>
            </button>
            <span className="text-stone-300">/</span>
            <span className="text-stone-900 font-semibold">{categoryTag || title}</span>
          </div>

          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-stone-300 hover:border-stone-900 text-stone-800 hover:text-stone-950 text-xs font-semibold uppercase tracking-wider transition shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{currentLang === 'mn' ? 'Нүүр хуудас руу буцах' : 'Back to Home'}</span>
          </button>
        </div>

        {/* Title and Subtitle */}
        <div className="max-w-3xl">
          {categoryTag && (
            <span className="block text-[10px] uppercase font-bold tracking-[0.25em] text-stone-500 mb-2">
              {categoryTag}
            </span>
          )}
          <h1 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight leading-[1.1] mb-3">
            {title}
          </h1>
          {subtitle && (
            <p className="font-['Cormorant_Garamond',serif] italic text-base sm:text-lg text-stone-600 font-light leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Quick page switcher tabs */}
        {onNavigatePage && (
          <div className="mt-8 pt-6 border-t border-stone-200">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 shrink-0 pr-2">
                {currentLang === 'mn' ? 'Хуудас солих:' : 'Jump to:'}
              </span>
              {quickLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => onNavigatePage(link.id)}
                    className={`px-3 py-1.5 text-xs whitespace-nowrap transition cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-stone-900 text-white font-medium shadow-sm'
                        : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-400'
                    }`}
                  >
                    {getLocalizedText(link.label, currentLang)}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
