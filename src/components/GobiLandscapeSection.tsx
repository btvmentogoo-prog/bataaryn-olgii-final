import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { 
  Sun, 
  Moon, 
  Clock, 
  Wind, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  X, 
  Compass, 
  TreePine, 
  Sparkles, 
  Layers, 
  Calendar, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

import khermenImg from '../assets/images/khermen_tsav_canyon_1788058798021.jpg';
import saxaulImg from '../assets/images/gobi_saxaul_dunes_1788058828050.jpg';
import dunesImg from '../assets/images/khongor_sand_dunes_1788058870269.jpg';
import camelImg from '../assets/images/gobi_camel_herd_1788058813665.jpg';

interface GobiLandscapeSectionProps {
  currentLang: Language;
  onExploreExpeditions: () => void;
}

type LandscapeTab = 'khermen' | 'saxaul' | 'dunes' | 'camels';
type TimePhase = 'dawn' | 'noon' | 'goldenHour' | 'night';

export const GobiLandscapeSection: React.FC<GobiLandscapeSectionProps> = ({
  currentLang,
  onExploreExpeditions,
}) => {
  const t = translations[currentLang];
  const gl = t.gobiLandscape;

  const [activeTab, setActiveTab] = useState<LandscapeTab>('khermen');
  const [selectedPhase, setSelectedPhase] = useState<TimePhase>('goldenHour');
  const [gobiTime, setGobiTime] = useState<string>('');
  const [isPlayingAudio, setIsPlayingAudio] = useState<'dune' | 'camel' | null>(null);
  const [modalImage, setModalImage] = useState<{ src: string; title: string; desc: string } | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const audioNodesRef = useRef<{ oscillator?: OscillatorNode; gain?: GainNode; noise?: AudioNode } | null>(null);

  // Live South Gobi Clock (UTC+8)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // UTC + 8 hours for Mongolia/Omnogovi
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const gobiDate = new Date(utc + 3600000 * 8);

      const hours = String(gobiDate.getHours()).padStart(2, '0');
      const minutes = String(gobiDate.getMinutes()).padStart(2, '0');
      const seconds = String(gobiDate.getSeconds()).padStart(2, '0');
      setGobiTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Web Audio Synthesizer for Gobi Singing Dunes & Caravan Chimes
  const stopAudio = () => {
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch {
        // audio context closed safely
      }
      audioContextRef.current = null;
      audioNodesRef.current = null;
    }
    setIsPlayingAudio(null);
  };

  const playDuneSound = () => {
    if (isPlayingAudio === 'dune') {
      stopAudio();
      return;
    }
    stopAudio();

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      // Low frequency drone for singing sand resonance
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(98, ctx.currentTime); // Low G2 resonance

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(146.8, ctx.currentTime); // D3 overtone

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, ctx.currentTime);

      gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 1.5);

      // Pink noise simulation for desert wind
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.95 * b1 + white * 0.1;
        b2 = 0.85 * b2 + white * 0.15;
        output[i] = (b0 + b1 + b2) * 0.15;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(320, ctx.currentTime);
      noiseFilter.Q.setValueAtTime(2.0, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.08, ctx.currentTime);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start();
      osc2.start();
      whiteNoise.start();

      setIsPlayingAudio('dune');
    } catch {
      setIsPlayingAudio('dune');
    }
  };

  const playCamelSound = () => {
    if (isPlayingAudio === 'camel') {
      stopAudio();
      return;
    }
    stopAudio();

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      // Bell chime sequence simulation
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.2, ctx.currentTime);
      masterGain.connect(ctx.destination);

      const playChime = (timeOffset: number, freq: number) => {
        const osc = ctx.createOscillator();
        const chimeGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + timeOffset);
        
        chimeGain.gain.setValueAtTime(0, ctx.currentTime + timeOffset);
        chimeGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + timeOffset + 0.02);
        chimeGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + timeOffset + 1.2);

        osc.connect(chimeGain);
        chimeGain.connect(masterGain);
        osc.start(ctx.currentTime + timeOffset);
        osc.stop(ctx.currentTime + timeOffset + 1.25);
      };

      // Periodic chime interval
      playChime(0.1, 523.25); // C5
      playChime(0.6, 659.25); // E5
      playChime(1.2, 783.99); // G5
      playChime(2.0, 523.25);

      setIsPlayingAudio('camel');
    } catch {
      setIsPlayingAudio('camel');
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const landscapeData = {
    khermen: {
      id: 'khermen',
      title: gl.khermenTitle,
      sub: gl.khermenSub,
      desc: gl.khermenDesc,
      stats: gl.khermenStats,
      image: khermenImg,
      icon: '🏛️',
      tag: '70M BC Cretaceous Red Canyon',
      color: 'from-amber-600 to-rose-700',
    },
    saxaul: {
      id: 'saxaul',
      title: gl.saxaulTitle,
      sub: gl.saxaulSub,
      desc: gl.saxaulDesc,
      stats: gl.saxaulStats,
      image: saxaulImg,
      icon: '🌲',
      tag: 'Haloxylon ammodendron Ecosystem',
      color: 'from-emerald-700 to-amber-700',
    },
    dunes: {
      id: 'dunes',
      title: gl.dunesTitle,
      sub: gl.dunesSub,
      desc: gl.dunesDesc,
      stats: gl.dunesStats,
      image: dunesImg,
      icon: '🏜️',
      tag: '180km Acoustic Singing Sand Waves',
      color: 'from-amber-500 to-orange-600',
    },
    camels: {
      id: 'camels',
      title: gl.camelsTitle,
      sub: gl.camelsSub,
      desc: gl.camelsDesc,
      stats: gl.camelsStats,
      image: camelImg,
      icon: '🐪',
      tag: 'Living Nomadic Heritage & Caravan',
      color: 'from-orange-600 to-amber-800',
    },
  };

  const currentItem = landscapeData[activeTab];

  // Dynamic Phase Lighting Gradient for the Viewer
  const phaseLightingClasses = {
    dawn: 'bg-gradient-to-t from-slate-950 via-slate-900/50 to-indigo-950/40 border-indigo-500/30',
    noon: 'bg-gradient-to-t from-stone-950 via-amber-950/30 to-amber-500/10 border-amber-500/30',
    goldenHour: 'bg-gradient-to-t from-stone-950 via-orange-950/50 to-rose-950/30 border-orange-500/40',
    night: 'bg-gradient-to-t from-black via-slate-950/80 to-blue-950/40 border-blue-500/30',
  };

  return (
    <section id="gobi-landscapes" className="py-24 bg-[#FAF9F5] text-stone-900 relative overflow-hidden border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="block text-[10px] uppercase font-bold tracking-[0.3em] text-stone-500 mb-2">
            {gl.badge}
          </span>
          <h2 className="font-['Cormorant_Garamond',serif] text-4xl sm:text-5xl lg:text-6xl font-normal text-stone-900 mb-4 tracking-tight leading-[1.08]">
            {gl.sectionTitle}
          </h2>
          <p className="font-['Cormorant_Garamond',serif] italic text-xl sm:text-2xl text-stone-700 font-light leading-relaxed max-w-2xl mx-auto">
            {gl.sectionSubtitle}
          </p>
        </div>

        {/* Live South Gobi Solar Clock & Atmospheric Daylight Widget */}
        <div className="mb-12 bg-white border border-stone-200/80 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Realtime Time Display */}
            <div className="lg:col-span-4 flex items-center gap-5 border-b lg:border-b-0 lg:border-r border-stone-200 pb-6 lg:pb-0 lg:pr-6">
              <div className="w-14 h-14 bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-800 shrink-0">
                <Clock className="w-6 h-6 text-stone-700 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block mb-1">
                  {gl.gobiTimeNow} (UTC+8)
                </span>
                <div className="font-mono text-3xl sm:text-4xl font-light text-stone-900 tracking-wider">
                  {gobiTime || '08:45:20'}
                </div>
                <div className="flex items-center gap-3 text-xs text-stone-500 mt-1 font-light">
                  <span>🌅 {gl.sunriseLabel}</span>
                  <span>•</span>
                  <span>🌇 {gl.sunsetLabel}</span>
                </div>
              </div>
            </div>

            {/* Interactive Daylight & Lighting Cycle Selector */}
            <div className="lg:col-span-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-2">
                  <Sun className="w-4 h-4 text-stone-700" />
                  <span>{gl.localSolarTime}</span>
                </span>
                <span className="font-['Cormorant_Garamond',serif] italic text-sm text-stone-600 font-light">
                  {gl.timePhaseDesc[selectedPhase]}
                </span>
              </div>

              {/* 4 Daylight Phases Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  onClick={() => setSelectedPhase('dawn')}
                  className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider border flex items-center justify-center gap-2 transition cursor-pointer ${
                    selectedPhase === 'dawn'
                      ? 'bg-stone-900 border-stone-900 text-white shadow-sm'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>{gl.timePhases.dawn}</span>
                </button>

                <button
                  onClick={() => setSelectedPhase('noon')}
                  className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider border flex items-center justify-center gap-2 transition cursor-pointer ${
                    selectedPhase === 'noon'
                      ? 'bg-stone-900 border-stone-900 text-white shadow-sm'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>{gl.timePhases.noon}</span>
                </button>

                <button
                  onClick={() => setSelectedPhase('goldenHour')}
                  className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider border flex items-center justify-center gap-2 transition cursor-pointer ${
                    selectedPhase === 'goldenHour'
                      ? 'bg-stone-900 border-stone-900 text-white shadow-sm'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{gl.timePhases.goldenHour}</span>
                </button>

                <button
                  onClick={() => setSelectedPhase('night')}
                  className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider border flex items-center justify-center gap-2 transition cursor-pointer ${
                    selectedPhase === 'night'
                      ? 'bg-stone-900 border-stone-900 text-white shadow-sm'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>{gl.timePhases.night}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Feature Tabs Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <button
            id="tab-khermen"
            onClick={() => setActiveTab('khermen')}
            className={`p-4 border text-left transition cursor-pointer ${
              activeTab === 'khermen'
                ? 'bg-white border-stone-900 text-stone-900 shadow-sm ring-1 ring-stone-900'
                : 'bg-white/70 border-stone-200 text-stone-600 hover:bg-white hover:text-stone-900'
            }`}
          >
            <div className="text-lg mb-1">🏛️</div>
            <div className="text-sm font-medium font-serif text-stone-900">{gl.tabKhermen}</div>
            <div className="text-[11px] text-stone-500 mt-0.5 font-light">70M BC Red Canyon</div>
          </button>

          <button
            id="tab-saxaul"
            onClick={() => setActiveTab('saxaul')}
            className={`p-4 border text-left transition cursor-pointer ${
              activeTab === 'saxaul'
                ? 'bg-white border-stone-900 text-stone-900 shadow-sm ring-1 ring-stone-900'
                : 'bg-white/70 border-stone-200 text-stone-600 hover:bg-white hover:text-stone-900'
            }`}
          >
            <div className="text-lg mb-1">🌲</div>
            <div className="text-sm font-medium font-serif text-stone-900">{gl.tabSaxaul}</div>
            <div className="text-[11px] text-stone-500 mt-0.5 font-light">Haloxylon ammodendron</div>
          </button>

          <button
            id="tab-dunes"
            onClick={() => setActiveTab('dunes')}
            className={`p-4 border text-left transition cursor-pointer ${
              activeTab === 'dunes'
                ? 'bg-white border-stone-900 text-stone-900 shadow-sm ring-1 ring-stone-900'
                : 'bg-white/70 border-stone-200 text-stone-600 hover:bg-white hover:text-stone-900'
            }`}
          >
            <div className="text-lg mb-1">🏜️</div>
            <div className="text-sm font-medium font-serif text-stone-900">{gl.tabDunes}</div>
            <div className="text-[11px] text-stone-500 mt-0.5 font-light">180km Singing Dunes</div>
          </button>

          <button
            id="tab-camels"
            onClick={() => setActiveTab('camels')}
            className={`p-4 border text-left transition cursor-pointer ${
              activeTab === 'camels'
                ? 'bg-white border-stone-900 text-stone-900 shadow-sm ring-1 ring-stone-900'
                : 'bg-white/70 border-stone-200 text-stone-600 hover:bg-white hover:text-stone-900'
            }`}
          >
            <div className="text-lg mb-1">🐪</div>
            <div className="text-sm font-medium font-serif text-stone-900">{gl.tabCamels}</div>
            <div className="text-[11px] text-stone-500 mt-0.5 font-light">Bactrian Camel Herd</div>
          </button>
        </div>

        {/* Main Immersive Showcase Display */}
        <div className="bg-white border border-stone-200/80 p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden text-stone-900">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: High-Res Panorama Visual */}
            <div className="lg:col-span-7 relative group">
              <div className="relative w-full h-[320px] sm:h-[420px] overflow-hidden border border-stone-200 shadow-sm bg-black">
                
                {/* Main Landscape Photograph */}
                <img
                  src={currentItem.image}
                  alt={currentItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Daylight Phase Tint Overlays */}
                {selectedPhase === 'dawn' && (
                  <div className="absolute inset-0 bg-indigo-950/20 mix-blend-color pointer-events-none" />
                )}
                {selectedPhase === 'goldenHour' && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/20 via-orange-600/15 to-transparent pointer-events-none" />
                )}
                {selectedPhase === 'night' && (
                  <div className="absolute inset-0 bg-blue-950/40 mix-blend-multiply pointer-events-none" />
                )}

                {/* Top Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/95 text-stone-900 border border-stone-200 text-xs font-semibold backdrop-blur-md shadow-sm">
                    {currentItem.tag}
                  </span>
                </div>

                {/* Top Right: Full-Screen Zoom Button */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setModalImage({
                      src: currentItem.image,
                      title: currentItem.title,
                      desc: currentItem.desc,
                    })}
                    className="p-2 bg-white/90 hover:bg-white text-stone-800 border border-stone-200 transition cursor-pointer shadow-sm"
                    title={gl.viewHighRes}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom Bar: Audio Trigger */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 bg-white/95 backdrop-blur-md px-4 py-2.5 border border-stone-200 shadow-sm text-stone-900">
                  <div className="flex items-center gap-2 text-xs text-stone-700 font-medium">
                    <Wind className="w-4 h-4 text-stone-700 shrink-0" />
                    <span>
                      {activeTab === 'dunes'
                        ? gl.soundPlayDune
                        : activeTab === 'camels'
                        ? gl.soundPlayCamel
                        : gl.timePhaseDesc[selectedPhase]}
                    </span>
                  </div>

                  {(activeTab === 'dunes' || activeTab === 'camels') && (
                    <button
                      onClick={activeTab === 'dunes' ? playDuneSound : playCamelSound}
                      className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer border ${
                        isPlayingAudio
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300'
                      }`}
                    >
                      {isPlayingAudio ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5" />
                          <span>{gl.soundStop}</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{gl.soundPlaying}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

              </div>
            </div>

            {/* Right: Knowledge & Stats */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-stone-100 border border-stone-200 text-xs font-semibold text-stone-700 mb-3">
                  <span>{currentItem.icon}</span>
                  <span>{currentItem.sub}</span>
                </div>

                <h3 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl font-normal text-stone-900 mb-3">
                  {currentItem.title}
                </h3>

                <p className="font-['Cormorant_Garamond',serif] italic text-base sm:text-lg text-stone-700 leading-relaxed mb-6 font-light">
                  {currentItem.desc}
                </p>

                {/* Key Stats Checklist */}
                <div className="space-y-2.5 mb-8">
                  {currentItem.stats.map((stat, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-[#FAF9F5] border border-stone-200 p-3">
                      <div className="w-5 h-5 bg-stone-200 flex items-center justify-center text-stone-800 shrink-0 text-xs mt-0.5">
                        ✓
                      </div>
                      <span className="text-xs sm:text-sm text-stone-800 font-light">
                        {stat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-stone-200">
                <button
                  onClick={onExploreExpeditions}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-[0.25em] shadow-sm transition cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-white" />
                  <span>{t.hero.expeditionBtn}</span>
                </button>

                <button
                  onClick={() => setModalImage({
                    src: currentItem.image,
                    title: currentItem.title,
                    desc: currentItem.desc,
                  })}
                  className="w-full sm:w-auto px-5 py-3.5 bg-white hover:bg-stone-50 text-stone-800 font-semibold text-xs uppercase tracking-wider border border-stone-300 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Maximize2 className="w-4 h-4 text-stone-700" />
                  <span>{gl.viewHighRes}</span>
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* 4 Mini Gallery Preview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {Object.values(landscapeData).map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id as LandscapeTab)}
              className={`group relative overflow-hidden border transition cursor-pointer p-3 bg-white ${
                activeTab === item.id
                  ? 'border-stone-900 ring-1 ring-stone-900 shadow-sm'
                  : 'border-stone-200 hover:border-stone-400'
              }`}
            >
              <div className="w-full h-28 overflow-hidden mb-2.5 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-serif font-semibold text-stone-900 group-hover:text-amber-800 transition line-clamp-1">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-stone-500 font-light">{item.icon} {item.tag.split(' ')[0]}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-0.5 transition shrink-0" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Full-Screen Modal Viewer */}
      {modalImage && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
          <div className="w-full max-w-5xl flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-['Cinzel',serif]">
                {modalImage.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 line-clamp-1 max-w-xl">
                {modalImage.desc}
              </p>
            </div>
            <button
              onClick={() => setModalImage(null)}
              className="p-3 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="w-full max-w-5xl max-h-[75vh] rounded-2xl overflow-hidden border border-stone-800 shadow-2xl relative">
            <img
              src={modalImage.src}
              alt={modalImage.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain bg-stone-950"
            />
          </div>
        </div>
      )}

    </section>
  );
};
