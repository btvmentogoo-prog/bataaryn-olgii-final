import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Sparkles, Award, RotateCcw, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface VirtualExcavationGameProps {
  currentLang: Language;
}

interface FossilMystery {
  id: string;
  name: { mn: string; en: string; ja: string; zh: string };
  specimen: string;
  age: string;
  facts: { mn: string; en: string; ja: string; zh: string };
  emoji: string;
}

const mysteries: FossilMystery[] = [
  {
    id: 'tarbo-tooth',
    name: {
      mn: 'Тарбозавр Батаарын хөрөөлөгч шүд',
      en: 'Tarbosaurus bataar Serrated Tooth',
      ja: 'タルボサウルスの鋸歯状の牙',
      zh: '特暴龙·巴特尔锯齿状完整牙齿',
    },
    specimen: 'Tarbosaurus bataar',
    age: '70,000,000 Years Old (Late Cretaceous)',
    facts: {
      mn: 'Энэхүү 15 см урт шүд нь яс бутлах чадалтай бөгөөд амьдралынх нь туршид шинээр урган солигддог байжээ.',
      en: 'This 15cm knife-like tooth possessed microscopic serrations capable of biting clean through hadrosaur bone.',
      ja: '長さ15cmの牙には獲物の骨を噛み砕く無数の微細なノコギリ歯（セレーション）が刻まれています。',
      zh: '这颗长达15厘米的骨质牙齿边缘密布微观锯齿，能轻易切裂并粉碎恐龙坚硬骨骼。',
    },
    emoji: '🦖',
  },
  {
    id: 'oviraptor-egg',
    name: {
      mn: 'Овирапторын чулуужсан өндөг',
      en: 'Fossilized Oviraptor Egg Clutch',
      ja: 'オビラプトルの化石卵',
      zh: '原位窃蛋龙完整恐龙化石蛋',
    },
    specimen: 'Oviraptor philoceratops',
    age: '75,000,000 Years Old (Campanian)',
    facts: {
      mn: '1923 онд Баянзагаас олдсон дэлхийн анхны өндөгний олдвортой яг ижил давхаргаас олдсон эрдэнэ юм.',
      en: 'Discovered in identical sandstone strata as the legendary 1923 Bayanzag Roy Chapman Andrews expedition.',
      ja: '1923年にバヤンザグで発見され、恐竜が卵生であることを証明した歴史的化石と同種の卵です。',
      zh: '出土于与1923年巴彦扎格安德鲁斯考察队震惊世界的恐龙蛋同源的红色白垩纪砂岩地层。',
    },
    emoji: '🥚',
  },
  {
    id: 'raptor-claw',
    name: {
      mn: 'Велоцирапторын хадуур савар',
      en: 'Velociraptor Sickle Claw',
      ja: 'ヴェロキラプトルの超伸展鎌爪',
      zh: '伶盗龙超伸展致命镰刀趾爪',
    },
    specimen: 'Velociraptor mongoliensis',
    age: '80,000,000 Years Old',
    facts: {
      mn: 'Төгрөгийн ширээнээс олдсон Ноцолдож буй үлэг гүрвэлийн адил Протоцератопсын хүзүүг ороох зэвсэг байв.',
      en: 'The famous weapon of the Fighting Dinosaurs fossil found at Tugrugiin Shiree in the South Gobi.',
      ja: '南ゴビのトゥグリキン・シレで発掘された格闘恐竜が用いた、獲物の頸動脈を仕留める必殺の爪。',
      zh: '托格罗金希雷格斗恐龙化石中，伶盗龙正是利用这根特化巨爪死死锁住了原角龙的喉部要害。',
    },
    emoji: '🦅',
  },
];

export const VirtualExcavationGame: React.FC<VirtualExcavationGameProps> = ({
  currentLang,
}) => {
  const t = translations[currentLang];
  const [activeMysteryIndex, setActiveMysteryIndex] = useState(0);
  const [revealedCells, setRevealedCells] = useState<boolean[]>(new Array(16).fill(false));
  const [currentTool, setCurrentTool] = useState<'brush' | 'chisel'>('brush');
  const [isCompleted, setIsCompleted] = useState(false);

  const activeMystery = mysteries[activeMysteryIndex];

  const handleCellClick = (index: number) => {
    if (revealedCells[index]) return;

    const nextCells = [...revealedCells];
    nextCells[index] = true;
    setRevealedCells(nextCells);

    // Check completion
    const count = nextCells.filter(Boolean).length;
    if (count >= 13 && !isCompleted) {
      setIsCompleted(true);
    }
  };

  const resetGame = (newIndex?: number) => {
    setRevealedCells(new Array(16).fill(false));
    setIsCompleted(false);
    if (typeof newIndex === 'number') {
      setActiveMysteryIndex(newIndex);
    }
  };

  const progressPercent = Math.round((revealedCells.filter(Boolean).length / 16) * 100);

  return (
    <section id="fossil-lab" className="py-24 bg-white text-stone-900 relative overflow-hidden border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="block text-[10px] uppercase font-bold tracking-[0.3em] text-stone-500 mb-2">
            Interactive Virtual Paleontology Lab
          </span>
          
          <h2 className="font-['Cormorant_Garamond',serif] text-4xl sm:text-5xl lg:text-6xl font-normal text-stone-900 mb-4 tracking-tight leading-[1.08]">
            {t.fossilLab.sectionTitle}
          </h2>
          
          <p className="font-['Cormorant_Garamond',serif] italic text-xl sm:text-2xl text-stone-700 font-light leading-relaxed max-w-2xl mx-auto">
            {t.fossilLab.sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Left Column: Interactive Sandstone Grid */}
          <div className="lg:col-span-7 bg-[#FAF9F5] border border-stone-300 p-6 shadow-sm text-stone-900">
            {/* Tool Selection Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-200">
              <div className="text-xs font-bold text-stone-700 flex items-center gap-2">
                <span className="uppercase tracking-wider text-[10px]">Equipment:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setCurrentTool('brush')}
                    className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider transition cursor-pointer border ${
                      currentTool === 'brush'
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    🧹 {t.fossilLab.brushTool}
                  </button>
                  <button
                    onClick={() => setCurrentTool('chisel')}
                    className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider transition cursor-pointer border ${
                      currentTool === 'chisel'
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    ⛏️ {t.fossilLab.chiselTool}
                  </button>
                </div>
              </div>

              <button
                onClick={() => resetGame()}
                className="p-1.5 bg-white hover:bg-stone-100 text-stone-600 border border-stone-200 transition cursor-pointer"
                title="Reset Excavation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Excavation Sandstone Grid (4x4) */}
            <div className="relative w-full aspect-square max-w-[360px] mx-auto overflow-hidden border-2 border-stone-300 shadow-inner bg-stone-900">
              {/* Underlying Fossil Treasure */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none bg-stone-950 text-white">
                <span className="text-6xl sm:text-7xl mb-2 animate-bounce">{activeMystery.emoji}</span>
                <span className="font-['Cormorant_Garamond',serif] text-xl font-normal text-amber-200">
                  {activeMystery.name[currentLang]}
                </span>
                <span className="text-xs text-stone-400 font-serif italic mt-0.5 font-light">
                  {activeMystery.specimen}
                </span>
              </div>

              {/* Sandstone Scratch Cells */}
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 p-1">
                {revealedCells.map((revealed, index) => (
                  <button
                    key={index}
                    id={`excavate-cell-${index}`}
                    onClick={() => handleCellClick(index)}
                    className={`transition duration-200 cursor-pointer flex items-center justify-center font-mono text-[10px] ${
                      revealed
                        ? 'bg-transparent pointer-events-none opacity-0'
                        : 'bg-stone-700 hover:bg-stone-600 border border-stone-600 text-stone-300 shadow-sm'
                    }`}
                  >
                    {!revealed && (currentTool === 'brush' ? '🧹' : '⛏️')}
                  </button>
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-stone-500 mb-1 font-light">
                <span>{t.fossilLab.progress}: {progressPercent}%</span>
                <span>{isCompleted ? '✓ Completed' : 'Tap sandstone to uncover'}</span>
              </div>
              <div className="w-full h-2 bg-stone-200 overflow-hidden">
                <div
                  className="h-full bg-stone-900 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Specimen Dossier / Discovery Certificate */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-stone-200 p-6 shadow-sm relative overflow-hidden text-stone-900">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-stone-700" />
                  <span>Specimen Dossier</span>
                </span>
                <span className="text-xs font-mono bg-stone-100 px-2.5 py-1 text-stone-700 border border-stone-200">
                  {activeMystery.age.split(' ')[0]}
                </span>
              </div>

              <h3 className="font-['Cormorant_Garamond',serif] text-3xl font-normal text-stone-900 mb-1">
                {activeMystery.name[currentLang]}
              </h3>
              <p className="font-['Cormorant_Garamond',serif] text-sm italic text-stone-600 mb-4 font-light">
                {activeMystery.specimen}
              </p>

              <div className="p-4 bg-[#FAF9F5] border border-stone-200 font-['Cormorant_Garamond',serif] italic text-base text-stone-700 leading-relaxed mb-6 font-light">
                {activeMystery.facts[currentLang]}
              </div>

              {/* Completion Certificate Banner */}
              {isCompleted ? (
                <div className="p-4 bg-stone-900 text-white text-center animate-fade-in shadow-sm">
                  <div className="text-2xl mb-1">🏆</div>
                  <h4 className="font-['Cormorant_Garamond',serif] text-lg font-normal">
                    {t.fossilLab.discoveryCert}
                  </h4>
                  <p className="text-xs text-stone-300 mt-0.5 font-light">
                    Gobi Certified Junior Paleontologist
                  </p>
                </div>
              ) : (
                <div className="text-center text-xs text-stone-500 py-2 font-light">
                  Uncover at least 80% to earn the Field Explorer Certificate.
                </div>
              )}
            </div>

            {/* Specimen Switcher */}
            <div className="grid grid-cols-3 gap-2">
              {mysteries.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => resetGame(idx)}
                  className={`p-3 text-center border transition text-xs flex flex-col items-center gap-1 cursor-pointer ${
                    activeMysteryIndex === idx
                      ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span className="text-xl">{m.emoji}</span>
                  <span className="truncate w-full text-[10px] uppercase font-semibold">{m.specimen.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
