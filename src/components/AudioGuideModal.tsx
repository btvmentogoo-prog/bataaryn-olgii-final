import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { dinosaurSpecimens } from '../data/paleoData';
import { translations } from '../data/translations';
import { audioGuide } from '../utils/audioGuidePlayer';
import { 
  X, 
  Volume2, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  BookOpen, 
  Gauge, 
  Wind, 
  CheckCircle2, 
  Headphones,
  Sliders,
  SkipForward,
  SkipBack
} from 'lucide-react';

interface AudioGuideModalProps {
  currentLang: Language;
  specimenId: string;
  onClose: () => void;
}

export const AudioGuideModal: React.FC<AudioGuideModalProps> = ({
  currentLang,
  specimenId,
  onClose,
}) => {
  const t = translations[currentLang];
  const specimen = dinosaurSpecimens.find((s) => s.id === specimenId) || dinosaurSpecimens[0];

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [speechRate, setSpeechRate] = useState<number>(0.88); // 0.88x rate is optimal for crystal clear Mongolian clarity
  const [ambientSound, setAmbientSound] = useState(true);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number>(0);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [audioSourceType, setAudioSourceType] = useState<'ai' | 'native'>('ai');

  // Split description into clear distinct sentences
  const rawDescription = specimen.description[currentLang] || '';
  const sentences = React.useMemo(() => {
    return audioGuide.parseSentences(rawDescription);
  }, [rawDescription]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      audioGuide.stop();
    };
  }, []);

  const handleTogglePlay = async () => {
    if (isPlaying) {
      audioGuide.stop();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    setIsLoadingAudio(true);

    if (ambientSound) {
      audioGuide.startAmbience(0.025);
    }

    // First try Gemini AI high-fidelity voice
    const fullText = rawDescription;
    const aiBuffer = await audioGuide.fetchGeminiSpeech(fullText, currentLang);

    setIsLoadingAudio(false);

    if (aiBuffer) {
      setAudioSourceType('ai');
      audioGuide.playBuffer(
        aiBuffer,
        (progress) => setPlaybackProgress(progress),
        () => {
          setIsPlaying(false);
          setPlaybackProgress(100);
        }
      );
    } else {
      // Fallback to crystal-clear tuned native speech synthesizer
      setAudioSourceType('native');
      audioGuide.playNativeSpeech(
        fullText,
        currentLang,
        speechRate,
        (charIndex) => {
          // Calculate approx sentence index
          let accumulated = 0;
          for (let i = 0; i < sentences.length; i++) {
            accumulated += sentences[i].length;
            if (charIndex <= accumulated) {
              setActiveSentenceIndex(i);
              break;
            }
          }
          const progress = Math.min(100, Math.round((charIndex / Math.max(1, fullText.length)) * 100));
          setPlaybackProgress(progress);
        },
        () => {
          setIsPlaying(false);
          setPlaybackProgress(100);
        }
      );
    }
  };

  const playSingleSentence = (index: number) => {
    if (index < 0 || index >= sentences.length) return;
    setActiveSentenceIndex(index);
    setIsPlaying(true);

    const sentence = sentences[index];
    setAudioSourceType('native');
    audioGuide.playNativeSpeech(
      sentence,
      currentLang,
      speechRate,
      undefined,
      () => {
        setIsPlaying(false);
      }
    );
  };

  const handleRestart = () => {
    audioGuide.stop();
    setPlaybackProgress(0);
    setActiveSentenceIndex(0);
    if (isPlaying) {
      handleTogglePlay();
    }
  };

  const handleClose = () => {
    audioGuide.stop();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-lg animate-fade-in">
      <div className="bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 border border-amber-500/50 rounded-3xl max-w-xl w-full shadow-2xl p-6 sm:p-8 relative text-stone-100 max-h-[92vh] flex flex-col justify-between overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition cursor-pointer z-20 border border-stone-700/60"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          {/* Top Tag & Audio Quality Indicator */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-300">
              <Headphones className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>{currentLang === 'mn' ? 'Монгол хэлний цэвэр тод дуут хөтөч' : 'HD Paleontological Audio Guide'}</span>
            </div>

            <div className="text-[11px] font-semibold text-stone-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{audioSourceType === 'ai' ? 'AI Crystal Voice' : 'Enhanced Voice (0.9x)'}</span>
            </div>
          </div>

          {/* Specimen Title */}
          <h3 className="font-['Cinzel',serif] text-2xl sm:text-3xl font-black text-amber-200 mb-1">
            {specimen.name}
          </h3>
          <p className="text-xs font-serif italic text-amber-400/80 mb-4">
            {specimen.scientificName} • {specimen.location[currentLang]}
          </p>

          {/* Specimen Banner with Visualizer */}
          <div className="relative h-40 sm:h-44 rounded-2xl overflow-hidden mb-4 border border-stone-800 bg-stone-950 shadow-inner">
            <img
              src={specimen.image}
              alt={specimen.name}
              className="w-full h-full object-cover object-[center_12%] filter contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

            {/* Cretaceous Ambience Badge */}
            <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-stone-700 text-[10px] font-bold text-amber-300 flex items-center gap-1.5">
              <Wind className="w-3 h-3 text-amber-400" />
              <span>{specimen.period}</span>
            </div>

            {/* Audio Waveform Animation */}
            {isPlaying && (
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-center gap-1.5 h-10 bg-stone-950/60 backdrop-blur-sm p-2 rounded-xl border border-amber-500/20">
                {[30, 60, 90, 75, 100, 85, 45, 95, 100, 65, 80, 50, 90, 70, 40, 85, 95, 60].map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-gradient-to-t from-amber-500 to-orange-400 rounded-full animate-pulse"
                    style={{ height: `${h}%`, animationDelay: `${(i % 5) * 120}ms` }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Interactive Sentence-by-Sentence Synchronized Transcript */}
          <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800/80 max-h-36 sm:max-h-44 overflow-y-auto mb-4 text-xs text-stone-300 space-y-2.5">
            <div className="text-[11px] uppercase font-bold text-amber-400 flex items-center justify-between sticky top-0 bg-stone-950/90 py-1 backdrop-blur-sm">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{currentLang === 'mn' ? 'Өгүүлбэр бүрээр сонсох & унших:' : 'Audio Transcript:'}</span>
              </div>
              <span className="text-[10px] text-stone-400 font-normal">
                {currentLang === 'mn' ? 'Өгүүлбэр дээр дарж тод сонсоорой' : 'Click sentence to play'}
              </span>
            </div>

            {sentences.map((sent, idx) => (
              <div
                key={idx}
                onClick={() => playSingleSentence(idx)}
                className={`p-2.5 rounded-xl transition cursor-pointer flex items-start gap-2.5 border ${
                  activeSentenceIndex === idx && isPlaying
                    ? 'bg-amber-500/15 border-amber-400/50 text-amber-100 shadow-md'
                    : 'bg-stone-900/60 border-stone-800/60 hover:bg-stone-800/80 text-stone-300'
                }`}
              >
                <div className="p-1 rounded-full bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                  <Play className="w-2.5 h-2.5 fill-current" />
                </div>
                <p className="leading-relaxed font-medium">{sent}</p>
              </div>
            ))}
          </div>

          {/* Audio Controls & Settings Panel */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-stone-950/60 rounded-xl border border-stone-800/80 mb-4 text-xs">
            {/* Speed Controller */}
            <div className="flex items-center gap-2">
              <span className="text-stone-400 font-medium flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentLang === 'mn' ? 'Хурд:' : 'Speed:'}</span>
              </span>
              <div className="flex items-center gap-1">
                {[
                  { label: '0.8x (Удаан)', val: 0.8 },
                  { label: '0.9x (Тод)', val: 0.88 },
                  { label: '1.0x', val: 1.0 },
                ].map((s) => (
                  <button
                    key={s.val}
                    onClick={() => {
                      setSpeechRate(s.val);
                      if (isPlaying) {
                        handleRestart();
                      }
                    }}
                    className={`px-2 py-1 rounded-md text-[11px] font-bold transition cursor-pointer ${
                      Math.abs(speechRate - s.val) < 0.05
                        ? 'bg-amber-500 text-stone-950'
                        : 'bg-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Background Ambience Toggle */}
            <button
              onClick={() => {
                const next = !ambientSound;
                setAmbientSound(next);
                if (isPlaying) {
                  if (next) audioGuide.startAmbience(0.025);
                  else audioGuide.stopAmbience();
                }
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer border ${
                ambientSound
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-stone-800/60 border-stone-700 text-stone-400'
              }`}
            >
              <Wind className="w-3 h-3" />
              <span>{currentLang === 'mn' ? 'Байгалийн чимээ' : 'Ambience'}</span>
            </button>
          </div>
        </div>

        {/* Player Controls & Progress Bar */}
        <div className="space-y-3 pt-2 border-t border-stone-800">
          <div className="w-full h-2.5 bg-stone-950 rounded-full overflow-hidden border border-stone-800 relative">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 transition-all duration-200"
              style={{ width: `${playbackProgress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-stone-400">
              {Math.floor((playbackProgress / 100) * 45)}s / 45s
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={() => playSingleSentence(Math.max(0, activeSentenceIndex - 1))}
                className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer"
                title="Өмнөх өгүүлбэр"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={handleRestart}
                className="p-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer"
                title="Дахин эхлүүлэх"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={handleTogglePlay}
                disabled={isLoadingAudio}
                className="p-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-xl shadow-amber-950/80 transition transform hover:scale-105 cursor-pointer font-extrabold flex items-center justify-center min-w-[56px]"
              >
                {isLoadingAudio ? (
                  <div className="w-5 h-5 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-6 h-6 fill-current" />
                ) : (
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                )}
              </button>

              <button
                onClick={() => playSingleSentence(Math.min(sentences.length - 1, activeSentenceIndex + 1))}
                className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer"
                title="Дараагийн өгүүлбэр"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            <span className="text-xs font-mono text-amber-400 font-bold">{specimen.audioDuration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

