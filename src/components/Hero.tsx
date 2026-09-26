import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { 
  Calendar, 
  Users, 
  ChevronDown,
  Volume2, 
  VolumeX, 
  Sparkles,
  ArrowRight,
  Tent
} from 'lucide-react';
import campLodgeRoomImg from '../assets/images/bataar_camp_phone_analysis_hero.webp';

interface HeroProps {
  currentLang: Language;
  onExploreClick: () => void;
  onExpeditionClick: () => void;
  onSnowLeopardClick?: () => void;
  onOpenAudioGuide: (specimenId: string) => void;
  onOpenBooking?: (pkg?: any, siteName?: string) => void;
  onCampClick?: () => void;
  onOpenExtraRow?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onExploreClick,
  onExpeditionClick,
  onSnowLeopardClick,
  onOpenAudioGuide,
  onOpenBooking,
  onCampClick,
  onOpenExtraRow,
}) => {
  const t = translations[currentLang];
  const [ambientAudioPlaying, setAmbientAudioPlaying] = useState(false);

  const heroCopyMap: Record<string, {
    headline: string;
    subtitle: string;
    arrival: string;
    departure: string;
    persons: string;
    checkBtn: string;
    peopleLabel: string;
  }> = {
    mn: {
      headline: "Дэлхий таныг олж чадахгүй тэр л аниргүй говьд...",
      subtitle: "HISTORIC . TIMELESS . LEGENDARY . AUTHENTIC™",
      arrival: "ИРЭХ ӨДӨР",
      departure: "БУЦАХ ӨДӨР",
      persons: "ЗОЧИД",
      checkBtn: "БЭЛЭН БАЙДАЛ ШАЛГАХ",
      peopleLabel: "хүн",
    },
    en: {
      headline: "Stay Where The World Can't Find You...",
      subtitle: "HISTORIC . TIMELESS . LEGENDARY . AUTHENTIC™",
      arrival: "ARRIVAL",
      departure: "DEPARTURE",
      persons: "PERSONS",
      checkBtn: "CHECK AVAILABILITY",
      peopleLabel: "People",
    },
    ja: {
      headline: "世界があなたを見つけられない静寂の場所へ...",
      subtitle: "HISTORIC . TIMELESS . LEGENDARY . AUTHENTIC™",
      arrival: "ご到着日",
      departure: "ご出発日",
      persons: "ご利用人数",
      checkBtn: "空室状況を確認",
      peopleLabel: "名様",
    },
    zh: {
      headline: "在世界找不到你的静谧戈壁...",
      subtitle: "HISTORIC . TIMELESS . LEGENDARY . AUTHENTIC™",
      arrival: "入住日期",
      departure: "退房日期",
      persons: "入住人数",
      checkBtn: "查询空房与预订",
      peopleLabel: "位贵宾",
    },
    ko: {
      headline: "세상이 당신을 찾을 수 없는 고요한 고비 사막으로...",
      subtitle: "HISTORIC . TIMELESS . LEGENDARY . AUTHENTIC™",
      arrival: "체크인",
      departure: "체크아웃",
      persons: "인원",
      checkBtn: "객실 및 일정 조회",
      peopleLabel: "명",
    },
    ru: {
      headline: "Там, где мир не сможет найти вас...",
      subtitle: "HISTORIC . TIMELESS . LEGENDARY . AUTHENTIC™",
      arrival: "ЗАЕЗД",
      departure: "ВЫЕЗД",
      persons: "ГОСТИ",
      checkBtn: "ПРОВЕРИТЬ НАЛИЧИЕ",
      peopleLabel: "чел.",
    },
    de: {
      headline: "Wo die Welt Sie nicht finden kann...",
      subtitle: "HISTORIC . TIMELESS . LEGENDARY . AUTHENTIC™",
      arrival: "ANREISE",
      departure: "ABREISE",
      persons: "GÄSTE",
      checkBtn: "VERFÜGBARKEIT PRÜFEN",
      peopleLabel: "Personen",
    },
    fr: {
      headline: "Là où le monde ne peut vous trouver...",
      subtitle: "HISTORIC . TIMELESS . LEGENDARY . AUTHENTIC™",
      arrival: "ARRIVÉE",
      departure: "DÉPART",
      persons: "VOYAGEURS",
      checkBtn: "VÉRIFIER LA DISPONIBILITÉ",
      peopleLabel: "personnes",
    },
  };

  const heroCopy = heroCopyMap[currentLang] || heroCopyMap.en;

  const handleCheckAvailability = () => {
    if (onOpenBooking) {
      onOpenBooking();
    } else if (onCampClick) {
      onCampClick();
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-stone-950 text-white">
      {/* Cinematic Full-Bleed Architectural Landscape Background (Annandale Style) */}
      <div className="absolute inset-0 z-0">
        <img
          src={campLodgeRoomImg}
          alt="Батаарын өлгий жуулчны бааз, говийн тэмээтэй алсын ерөнхий дүр зураг"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[center_56%] scale-100 transition-transform duration-1000 ease-out"
        />
        {/* Subtle Luxury Gradient Vignette for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/80" />
      </div>

      {/* Empty Top Space to push headline to golden ratio position */}
      <div className="pt-24 sm:pt-32" />

      {/* Main Annandale Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center my-auto py-12">
        <h1 className="font-['Cormorant_Garamond',serif] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-stone-50 tracking-tight leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)] text-balance">
          {heroCopy.headline}
          <span className="text-xs sm:text-sm align-super ml-1 font-sans opacity-70">TM</span>
        </h1>

        <p className="font-sans uppercase text-[10px] sm:text-xs tracking-[0.35em] text-stone-200/90 font-medium mt-6 sm:mt-8 drop-shadow-md">
          {heroCopy.subtitle}
        </p>

        {/* Action Button with Arrow to reveal the Extra Row */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="hero-check-availability-trigger-btn"
            onClick={() => {
              if (onOpenExtraRow) {
                onOpenExtraRow();
              } else if (onOpenBooking) {
                onOpenBooking();
              }
            }}
            className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-full bg-stone-900/70 hover:bg-stone-900/95 text-stone-100 border border-white/30 hover:border-amber-400 backdrop-blur-md text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] transition hover:scale-105 cursor-pointer shadow-2xl"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>{heroCopy.checkBtn}</span>
            <ChevronDown className="w-4 h-4 text-amber-400 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Clean Bottom Ambient Spacer for Cinematic Photo Clarity */}
      <div className="relative z-10 w-full pb-8 sm:pb-12 text-center">
        <button
          onClick={() => {
            const el = document.getElementById('visitor-guide') || document.getElementById('sanctuary-overview');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            } else if (onOpenExtraRow) {
              onOpenExtraRow();
            }
          }}
          className="inline-flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.25em] text-stone-300/80 hover:text-white transition cursor-pointer"
        >
          <span>{currentLang === 'mn' ? 'БАТААРЫН ӨЛГИЙ ТАЛБАЙ' : 'BATAAR EXPEDITION SANCTUARY'}</span>
          <ChevronDown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
