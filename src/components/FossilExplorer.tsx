import React, { useState } from 'react';
import { Language, DinosaurSpecimen } from '../types';
import { dinosaurSpecimens } from '../data/paleoData';
import { translations } from '../data/translations';
import { getLocalizedText, getLocalizedList } from '../utils/localization';
import { Search, Bone, Volume2, Sparkles, MapPin, Calendar, Scale, Layers, ChevronRight, X, Star, MessageCircle, Share2 } from 'lucide-react';

interface FossilExplorerProps {
  currentLang: Language;
  onOpenAudioGuide: (specimenId: string) => void;
  savedSpecimenIds?: string[];
  onToggleSave?: (specimenId: string) => void;
  onOpenMessengerShare?: (specimen?: DinosaurSpecimen) => void;
}

export const FossilExplorer: React.FC<FossilExplorerProps> = ({
  currentLang,
  onOpenAudioGuide,
  savedSpecimenIds = [],
  onToggleSave,
  onOpenMessengerShare,
}) => {
  const t = translations[currentLang];
  const [selectedDiet, setSelectedDiet] = useState<'All' | 'Carnivore' | 'Herbivore' | 'Omnivore'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecimen, setSelectedSpecimen] = useState<DinosaurSpecimen | null>(null);
  const [view3DMode, setView3DMode] = useState(false);

  const filteredSpecimens = dinosaurSpecimens.filter((specimen) => {
    const matchesDiet = selectedDiet === 'All' || specimen.diet === selectedDiet;
    const query = searchQuery.toLowerCase();
    const locText = getLocalizedText(specimen.location, currentLang);
    const matchesSearch =
      specimen.name.toLowerCase().includes(query) ||
      specimen.scientificName.toLowerCase().includes(query) ||
      locText.toLowerCase().includes(query);
    return matchesDiet && matchesSearch;
  });

  return (
    <section id="dinosaurs" className="py-24 bg-white text-stone-900 relative border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="block text-[10px] uppercase font-bold tracking-[0.3em] text-stone-500 mb-2">
            Fossil & Dinosaur Specimen Gallery
          </span>
          <h2 className="font-['Cormorant_Garamond',serif] text-4xl sm:text-5xl lg:text-6xl font-normal text-stone-900 mb-4 tracking-tight leading-[1.08]">
            {t.dinosaurs.sectionTitle}
          </h2>
          <p className="font-['Cormorant_Garamond',serif] italic text-xl sm:text-2xl text-stone-700 font-light leading-relaxed max-w-2xl mx-auto">
            {t.dinosaurs.sectionSubtitle}
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 bg-[#FAF9F5] p-3 sm:p-4 border border-stone-200/80 shadow-sm">
          {/* Diet Tabs */}
          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
            <button
              id="filter-diet-all"
              onClick={() => setSelectedDiet('All')}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                selectedDiet === 'All'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:text-stone-900 border border-stone-200'
              }`}
            >
              {t.dinosaurs.allDiet}
            </button>
            <button
              id="filter-diet-carnivore"
              onClick={() => setSelectedDiet('Carnivore')}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                selectedDiet === 'Carnivore'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:text-stone-900 border border-stone-200'
              }`}
            >
              {t.dinosaurs.carnivore}
            </button>
            <button
              id="filter-diet-herbivore"
              onClick={() => setSelectedDiet('Herbivore')}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                selectedDiet === 'Herbivore'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:text-stone-900 border border-stone-200'
              }`}
            >
              {t.dinosaurs.herbivore}
            </button>
            <button
              id="filter-diet-omnivore"
              onClick={() => setSelectedDiet('Omnivore')}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                selectedDiet === 'Omnivore'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:text-stone-900 border border-stone-200'
              }`}
            >
              {t.dinosaurs.omnivore}
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              id="fossil-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.dinosaurs.searchPlaceholder}
              className="w-full pl-11 pr-4 py-2 bg-white border border-stone-300 text-stone-900 text-xs sm:text-sm placeholder-stone-400 focus:outline-none focus:border-stone-900 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Dinosaur Specimen Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpecimens.map((specimen) => (
            <div
              key={specimen.id}
              id={`specimen-card-${specimen.id}`}
              className="group bg-white border border-stone-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image & Overlay Badge */}
              <div className="relative h-72 overflow-hidden bg-stone-100">
                <img
                  src={specimen.image}
                  alt={specimen.name}
                  className="w-full h-full object-cover object-[center_12%] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Diet Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 text-[10px] font-semibold shadow-sm uppercase tracking-wider backdrop-blur-md ${
                      specimen.diet === 'Carnivore'
                        ? 'bg-white/95 text-stone-900 border border-stone-300'
                        : specimen.diet === 'Herbivore'
                        ? 'bg-white/95 text-stone-900 border border-stone-300'
                        : 'bg-white/95 text-stone-900 border border-stone-300'
                    }`}
                  >
                    {getLocalizedText(specimen.dietLabel, currentLang)}
                  </span>
                </div>

                {/* Action Buttons: Bookmark & Audio Guide */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  {onToggleSave && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(specimen.id);
                      }}
                      className={`p-2 rounded-full backdrop-blur-md transition cursor-pointer shadow-sm ${
                        savedSpecimenIds.includes(specimen.id)
                          ? 'bg-stone-900 text-white border border-stone-900'
                          : 'bg-white/90 hover:bg-white text-stone-700 border border-stone-300'
                      }`}
                      title={savedSpecimenIds.includes(specimen.id) ? 'Remove bookmark' : 'Bookmark specimen for offline field journal'}
                    >
                      <Star className={`w-3.5 h-3.5 ${savedSpecimenIds.includes(specimen.id) ? 'fill-white' : ''}`} />
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenAudioGuide(specimen.id);
                    }}
                    className="p-2 rounded-full bg-white/90 hover:bg-stone-900 hover:text-white text-stone-800 border border-stone-300 backdrop-blur-md transition cursor-pointer shadow-sm"
                    title="Play audio guide"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Length & Discovery Stat overlay */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white font-medium">
                  <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 border border-white/20">
                    <Scale className="w-3 h-3 text-stone-200" />
                    <span>{specimen.lengthMeters}m / {specimen.weightTons}т</span>
                  </span>
                  <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 border border-white/20">
                    <Calendar className="w-3 h-3 text-stone-200" />
                    <span>{specimen.discoveredYear} он</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-['Cormorant_Garamond',serif] text-2xl font-normal text-stone-900 group-hover:text-stone-700 transition">
                      {specimen.name}
                    </h3>
                  </div>
                  <p className="text-xs italic font-serif text-stone-500 mb-3">
                    {specimen.scientificName}
                  </p>

                  <p className="font-['Cormorant_Garamond',serif] italic text-base text-stone-600 line-clamp-3 leading-relaxed mb-4">
                    {getLocalizedText(specimen.description, currentLang)}
                  </p>

                  {/* Anatomical Highlights List */}
                  <div className="space-y-1.5 border-t border-stone-200 pt-3 mb-2">
                    {getLocalizedList(specimen.highlights, currentLang).slice(0, 2).map((hl, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-stone-600">
                        <span className="text-stone-400 shrink-0 font-light">—</span>
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Row */}
                <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-3">
                  <div className="text-xs text-stone-500 flex items-center gap-1 truncate max-w-[150px]">
                    <MapPin className="w-3 h-3 text-stone-700 shrink-0" />
                    <span className="truncate">{getLocalizedText(specimen.location, currentLang)}</span>
                  </div>

                  <button
                    id={`view-detail-btn-${specimen.id}`}
                    onClick={() => setSelectedSpecimen(specimen)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-stone-900 hover:bg-stone-900 hover:text-white text-stone-900 text-xs font-semibold tracking-wider uppercase transition cursor-pointer"
                  >
                    <span>{t.dinosaurs.viewSpecimen}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep Specimen Detail Modal */}
      {selectedSpecimen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-stone-300 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-10 relative text-stone-900">
            {/* Close Button */}
            <button
              onClick={() => setSelectedSpecimen(null)}
              className="absolute top-6 right-6 p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title & Scientific Tag */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-700 text-xs font-semibold uppercase tracking-wider mb-2 border border-stone-200">
                <span>{getLocalizedText(selectedSpecimen.dietLabel, currentLang)}</span>
                <span>•</span>
                <span>{selectedSpecimen.period}</span>
              </div>
              <h2 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl md:text-5xl font-normal text-stone-900">
                {selectedSpecimen.name}
              </h2>
              <p className="font-['Cormorant_Garamond',serif] italic text-base text-stone-600">
                {selectedSpecimen.scientificName} ({getLocalizedText(selectedSpecimen.meaning, currentLang)})
              </p>
            </div>

            {/* Image Preview & Toggle 3D Bone Mode */}
            <div className="relative overflow-hidden mb-6 bg-stone-100 border border-stone-200 h-80 sm:h-96">
              <img
                src={view3DMode && selectedSpecimen.skullImage ? selectedSpecimen.skullImage : selectedSpecimen.image}
                alt={selectedSpecimen.name}
                className="w-full h-full object-cover object-[center_10%]"
              />

              {/* 3D Bone / Skin Mode Switcher & Messenger Share */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 flex-wrap">
                {onOpenMessengerShare && (
                  <button
                    id={`share-specimen-messenger-${selectedSpecimen.id}`}
                    onClick={() => onOpenMessengerShare(selectedSpecimen)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition cursor-pointer"
                    title="Messenger-ээр хуваалцах"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>Messenger</span>
                  </button>
                )}
                <button
                  onClick={() => setView3DMode(!view3DMode)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 hover:bg-stone-900 hover:text-white text-stone-900 text-xs font-semibold border border-stone-300 transition cursor-pointer"
                >
                  <Bone className="w-3.5 h-3.5" />
                  <span>{view3DMode ? 'View Life Reconstruction' : t.dinosaurs.view3DBones}</span>
                </button>
                <button
                  onClick={() => onOpenAudioGuide(selectedSpecimen.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-sm transition cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{t.dinosaurs.listenAudio}</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-4 bg-[#FAF9F5] border border-stone-200">
                <div className="text-[10px] uppercase font-bold tracking-wider text-stone-500 mb-1">{t.dinosaurs.length}</div>
                <div className="text-lg font-light font-mono text-stone-900">{selectedSpecimen.lengthMeters} метр</div>
              </div>
              <div className="p-4 bg-[#FAF9F5] border border-stone-200">
                <div className="text-[10px] uppercase font-bold tracking-wider text-stone-500 mb-1">{t.dinosaurs.weight}</div>
                <div className="text-lg font-light font-mono text-stone-900">{selectedSpecimen.weightTons} тонн</div>
              </div>
              <div className="p-4 bg-[#FAF9F5] border border-stone-200">
                <div className="text-[10px] uppercase font-bold tracking-wider text-stone-500 mb-1">{t.dinosaurs.height}</div>
                <div className="text-lg font-light font-mono text-stone-900">{selectedSpecimen.heightMeters} метр</div>
              </div>
              <div className="p-4 bg-[#FAF9F5] border border-stone-200">
                <div className="text-[10px] uppercase font-bold tracking-wider text-stone-500 mb-1">{t.dinosaurs.discovered}</div>
                <div className="text-lg font-light font-mono text-stone-900">{selectedSpecimen.discoveredYear} он</div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="font-['Cormorant_Garamond',serif] italic text-lg text-stone-700 leading-relaxed">
                {getLocalizedText(selectedSpecimen.description, currentLang)}
              </p>
            </div>

            {/* Anatomical Facts */}
            <div className="mb-6 p-6 bg-[#FAF9F5] border border-stone-200">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-stone-700" />
                <span>{t.dinosaurs.anatomicalFacts}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-700">
                {getLocalizedList(selectedSpecimen.anatomicalFeatures, currentLang).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white p-3 border border-stone-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-700" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Scientific Discoveries */}
            <div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-stone-700" />
                <span>{t.dinosaurs.keyHighlights}</span>
              </h4>
              <ul className="space-y-2 text-xs text-stone-700">
                {getLocalizedList(selectedSpecimen.highlights, currentLang).map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-[#FAF9F5] p-3 border border-stone-200">
                    <span className="text-stone-900 mt-0.5 font-bold">✓</span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
