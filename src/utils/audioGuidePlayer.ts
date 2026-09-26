// High-fidelity Audio Guide Narrator with Gemini AI TTS & Offline Pure Mongolian Engine

export interface AudioGuideState {
  isPlaying: boolean;
  isLoading: boolean;
  currentSentenceIndex: number;
  sentences: string[];
  durationSeconds: number;
  currentTimeSeconds: number;
  engine: 'gemini-ai' | 'native-voice' | 'phonetic-clarity';
}

class AudioGuideService {
  private audioContext: AudioContext | null = null;
  private currentSource: AudioBufferSourceNode | null = null;
  private ambientGain: GainNode | null = null;
  private ambientOsc: OscillatorNode | null = null;
  private isPlaying = false;
  private activeUtterance: SpeechSynthesisUtterance | null = null;

  public getAudioContext(): AudioContext {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioCtx();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    return this.audioContext;
  }

  // Split text into meaningful sentences for narration and transcript tracking
  public parseSentences(text: string): string[] {
    if (!text) return [];
    return text
      .split(/(?<=[.!?。！？])\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }

  // Convert raw base64 PCM 24000Hz (from Gemini TTS) into AudioBuffer
  private base64PcmToAudioBuffer(base64: string, sampleRate = 24000): AudioBuffer {
    const ctx = this.getAudioContext();
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const int16 = new Int16Array(bytes.buffer);
    const audioBuffer = ctx.createBuffer(1, int16.length, sampleRate);
    const channelData = audioBuffer.getChannelData(0);

    for (let i = 0; i < int16.length; i++) {
      channelData[i] = int16[i] / 32768.0;
    }
    return audioBuffer;
  }

  // Request high quality Gemini AI Voice from backend
  public async fetchGeminiSpeech(text: string, lang = 'mn'): Promise<AudioBuffer | null> {
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, lang }),
      });

      if (!res.ok) return null;
      const data = await res.json();
      if (data.audioData) {
        return this.base64PcmToAudioBuffer(data.audioData, data.sampleRate || 24000);
      }
      return null;
    } catch {
      return null;
    }
  }

  // Stop any ongoing speech or playback
  public stop() {
    this.isPlaying = false;
    if (this.currentSource) {
      try {
        this.currentSource.stop();
        this.currentSource.disconnect();
      } catch {}
      this.currentSource = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.stopAmbience();
  }

  // Play natural Cretaceous atmosphere in background
  public startAmbience(volume = 0.03) {
    try {
      const ctx = this.getAudioContext();
      this.stopAmbience();

      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(volume, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
      this.currentSource = whiteNoise;
      this.ambientGain = gain;
    } catch {}
  }

  public stopAmbience() {
    if (this.ambientGain) {
      try {
        this.ambientGain.disconnect();
      } catch {}
      this.ambientGain = null;
    }
  }

  // Pure Mongolian phonetic text preparation for speech synthesis
  public prepareMongolianSpeechText(text: string): string {
    return text
      .replace(/T-Rex/gi, 'Ти-Рекс')
      .replace(/(\d+)-(\d+)\s*сая/g, '$1-ээс $2 сая')
      .replace(/(\d+)\s*сая/g, '$1 сая')
      .replace(/1946/g, 'Нэг мянга есөн зуун дөчин зургаан')
      .replace(/1947/g, 'Нэг мянга есөн зуун дөчин долоон')
      .replace(/1965/g, 'Нэг мянга есөн зуун жаран таван')
      .replace(/1970/g, 'Нэг мянга есөн зуун далан')
      .replace(/2013/g, 'Хоёр мянга арван гуравдугаар')
      .replace(/12\.0\s*м/g, 'Арван хоёр метр')
      .replace(/5\.5\s*т/g, 'Таван зууны таван тонн')
      .replace(/4\.2\s*м/g, 'Дөрвөн зууны хоёр метр');
  }

  // Play using Web Speech API with tuned settings
  public playNativeSpeech(
    text: string,
    lang: string,
    rate = 0.9,
    onProgress?: (charIndex: number) => void,
    onEnd?: () => void
  ) {
    if (!('speechSynthesis' in window)) return;
    this.stop();
    this.isPlaying = true;

    const spokenText = lang === 'mn' ? this.prepareMongolianSpeechText(text) : text;
    const utterance = new SpeechSynthesisUtterance(spokenText);

    // Find best available voice
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = voices.find((v) => v.lang.startsWith('mn') || v.lang.includes('MN'));

    if (!selectedVoice && lang === 'mn') {
      // Fallback to high quality neutral European or Russian voice which renders Cyrillic phonetics
      selectedVoice = voices.find((v) => v.lang.startsWith('ru') || v.lang.includes('RU')) ||
                      voices.find((v) => v.name.includes('Google') || v.name.includes('Natural')) ||
                      voices[0];
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.lang = lang === 'mn' ? 'mn-MN' : lang === 'ja' ? 'ja-JP' : lang === 'zh' ? 'zh-CN' : 'en-US';
    utterance.rate = rate;
    utterance.pitch = 1.0;

    utterance.onboundary = (e) => {
      if (onProgress) onProgress(e.charIndex);
    };

    utterance.onend = () => {
      this.isPlaying = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.isPlaying = false;
      if (onEnd) onEnd();
    };

    this.activeUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  // Play AudioBuffer with AudioContext
  public playBuffer(
    buffer: AudioBuffer,
    onProgress?: (progressPercent: number) => void,
    onEnd?: () => void
  ) {
    this.stop();
    const ctx = this.getAudioContext();
    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(1.0, ctx.currentTime);

    source.connect(gainNode);
    gainNode.connect(ctx.destination);

    const startTime = ctx.currentTime;
    const duration = buffer.duration;
    this.isPlaying = true;

    const interval = setInterval(() => {
      if (!this.isPlaying) {
        clearInterval(interval);
        return;
      }
      const elapsed = ctx.currentTime - startTime;
      const pct = Math.min(100, (elapsed / duration) * 100);
      if (onProgress) onProgress(pct);

      if (elapsed >= duration) {
        clearInterval(interval);
        this.isPlaying = false;
        if (onEnd) onEnd();
      }
    }, 100);

    source.onended = () => {
      clearInterval(interval);
      this.isPlaying = false;
      if (onEnd) onEnd();
    };

    source.start(0);
    this.currentSource = source;
  }
}

export const audioGuide = new AudioGuideService();
