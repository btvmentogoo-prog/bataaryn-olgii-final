import React, { useState } from 'react';
import { Language } from '../types';
import { bataarTimeline } from '../data/paleoData';
import { translations } from '../data/translations';
import { ShieldCheck, Gavel, AlertTriangle, Sparkles, MapPin, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import bataarMuseumPhoto from '../assets/images/bataar_museum_skeleton_1788064922332.jpg';

interface BataarRepatriationStoryProps {
  currentLang: Language;
}

export const BataarRepatriationStory: React.FC<BataarRepatriationStoryProps> = ({
  currentLang,
}) => {
  const t = translations[currentLang];
  const [selectedEventIndex, setSelectedEventIndex] = useState<number>(4); // Default to victorious return

  return (
    <section id="bataar-story" className="py-24 bg-white text-stone-900 relative overflow-hidden border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="block text-[10px] uppercase font-bold tracking-[0.3em] text-stone-500 mb-2">
            Landmark International Repatriation Case
          </span>
          
          <h2 className="font-['Cormorant_Garamond',serif] text-4xl sm:text-5xl lg:text-6xl font-normal text-stone-900 mb-4 tracking-tight leading-[1.08]">
            {t.bataarStory.sectionTitle}
          </h2>
          
          <p className="font-['Cormorant_Garamond',serif] italic text-xl sm:text-2xl text-stone-700 font-light leading-relaxed max-w-2xl mx-auto">
            {t.bataarStory.sectionSubtitle}
          </p>
        </div>

        {/* Hero Narrative Highlight Box */}
        <div className="mb-14 p-7 sm:p-9 bg-[#FAF9F5] border border-stone-300 shadow-sm relative overflow-hidden text-stone-900">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-stone-500 uppercase tracking-[0.25em]">
                <Gavel className="w-4 h-4 text-stone-800" />
                <span>United States of America v. One Tyrannosaurus Bataar Skeleton</span>
              </div>
              <h3 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl font-normal text-stone-900 leading-tight">
                {bataarTimeline[selectedEventIndex].title[currentLang]}
              </h3>
              <p className="font-['Cormorant_Garamond',serif] italic text-base sm:text-lg text-stone-700 font-light leading-relaxed">
                {bataarTimeline[selectedEventIndex].description[currentLang]}
              </p>
              <div className="flex items-center gap-3 pt-2 text-xs text-stone-600 font-mono">
                <span className="flex items-center gap-1.5 bg-white px-3 py-1 border border-stone-200 text-[11px] shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-stone-700" />
                  <span>{bataarTimeline[selectedEventIndex].location[currentLang]}</span>
                </span>
                <span className="bg-stone-900 text-white px-3 py-1 font-semibold text-[11px]">
                  {bataarTimeline[selectedEventIndex].year}
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 relative overflow-hidden border border-stone-200 h-64 bg-stone-100 shadow-inner group">
              <img
                src={bataarMuseumPhoto}
                alt="Tarbosaurus Bataar Museum Skeleton"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition duration-700"
              />
              <div className="absolute bottom-3 left-3 text-[11px] font-medium text-stone-900 flex items-center gap-1.5 bg-white/95 px-3 py-1 border border-stone-200 shadow-sm backdrop-blur-sm">
                <span>⭐ Эх орондоо эргэн ирсэн Тарбозавр Батаар</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Timeline Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          {bataarTimeline.map((item, idx) => {
            const isSelected = selectedEventIndex === idx;

            return (
              <button
                key={idx}
                id={`timeline-step-${idx}`}
                onClick={() => setSelectedEventIndex(idx)}
                className={`text-left p-5 border transition duration-200 flex flex-col justify-between cursor-pointer relative ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                    : 'bg-white border-stone-200 text-stone-700 hover:border-stone-400 hover:bg-stone-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {item.year}
                    </span>
                    {isSelected ? (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    ) : (
                      <span className="text-xs text-stone-400">0{idx + 1}</span>
                    )}
                  </div>
                  <h4 className="font-['Cormorant_Garamond',serif] text-base font-medium leading-snug line-clamp-2 mb-2">
                    {item.title[currentLang]}
                  </h4>
                </div>

                <div className={`text-[11px] flex items-center gap-1 mt-3 pt-2 border-t ${
                  isSelected ? 'border-white/20 text-stone-300' : 'border-stone-100 text-stone-500'
                }`}>
                  <span className="uppercase tracking-wider text-[10px] font-semibold">View Details</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Global Paleontologist Endorsements / Historic Quotations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="p-6 bg-[#FAF9F5] border border-stone-200 shadow-sm relative text-stone-900">
            <div className="text-stone-400 text-3xl font-serif mb-2">“</div>
            <p className="font-['Cormorant_Garamond',serif] italic text-base sm:text-lg text-stone-700 leading-relaxed mb-4 font-light">
              "The return of Tarbosaurus bataar to Mongolia set an extraordinary legal precedent for the preservation of world paleontology and cultural sovereignty. Mongolia proved to the world that these treasures belong to the people in the cradle where they were born."
            </p>
            <div className="flex items-center gap-3 border-t border-stone-200 pt-3">
              <div className="w-9 h-9 bg-stone-200 flex items-center justify-center text-xs font-bold text-stone-800">
                MN
              </div>
              <div>
                <div className="text-xs font-serif font-semibold text-stone-900">Dr. Mark Norell</div>
                <div className="text-[11px] text-stone-500 font-light">American Museum of Natural History (AMNH)</div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#FAF9F5] border border-stone-200 shadow-sm relative text-stone-900">
            <div className="text-stone-400 text-3xl font-serif mb-2">“</div>
            <p className="font-['Cormorant_Garamond',serif] italic text-base sm:text-lg text-stone-700 leading-relaxed mb-4 font-light">
              "Every single bone of Tarbosaurus bataar tells a story that cannot be duplicated anywhere else on Earth. Standing in Ulaanbaatar and witnessing hundreds of thousands of Mongolian children gazing at Bataar was the greatest moment of my paleontological career."
            </p>
            <div className="flex items-center gap-3 border-t border-stone-200 pt-3">
              <div className="w-9 h-9 bg-stone-200 flex items-center justify-center text-xs font-bold text-stone-800">
                PC
              </div>
              <div>
                <div className="text-xs font-serif font-semibold text-stone-900">Dr. Philip J. Currie</div>
                <div className="text-[11px] text-stone-500 font-light">University of Alberta & World Gobi Expeditionist</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
