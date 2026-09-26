import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { getLocalizedText } from '../utils/localization';
import snowLeopardRidgeImg from '../assets/images/gobi_snow_leopard_ridge_1788084150553.jpg';
import snowLeopardBgArt from '../assets/images/snow_leopard_bg_art_1788085770307.jpg';
import { 
  Camera, 
  Volume2, 
  VolumeX, 
  Eye, 
  Sparkles, 
  ShieldAlert, 
  Compass, 
  Mountain, 
  Radio, 
  CheckCircle2, 
  Activity,
  Layers,
  HeartHandshake,
  ZoomIn,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  RotateCcw,
  Download,
  Video,
  Image as ImageIcon,
  Crosshair,
  Zap,
  Flame,
  Scan
} from 'lucide-react';

type ThermalMode = 'ir' | 'flir' | 'nvg' | 'whiteHot';

interface SnowLeopardSectionProps {
  currentLang: Language;
  onOpenBooking?: () => void;
}

interface CameraTrapSite {
  id: string;
  locationName: Record<string, string>;
  coords: string;
  elevation: string;
  temperature: string;
  dayImg: string;
  nightImg: string;
  videoUrl?: string;
  leopardPosition: { top: string; left: string; width: string; height: string };
  spottedBioNote: Record<string, string>;
  preyContext: Record<string, string>;
}

const cameraTrapSites: CameraTrapSite[] = [
  {
    id: 'tost-ridge',
    locationName: {
      mn: 'Тост, Тосонбумбын нуруу (Өмнөговь, Гурвантэс)',
      en: 'Tost Mountain Ridge (South Gobi, Gurvantes)',
      ja: 'トスト山脈・自然保護区（南ゴビ）',
      zh: '托斯特山脉自然保护区（南戈壁）',
    },
    coords: "43°12'N 100°30'E",
    elevation: '2,460 m',
    temperature: '-12°C',
    dayImg: snowLeopardRidgeImg,
    nightImg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    videoUrl: '/tost_snow_leopard_night_camera.mp4',
    leopardPosition: { top: '32%', left: '42%', width: '38%', height: '48%' },
    spottedBioNote: {
      mn: 'Эр цоохор ирвэс (Тост нурууны хадан хясаа). Янгирын сүргийн мөр мөшгин хадан цохиогоор маш сонор соргог мярааж байна.',
      en: 'Adult male snow leopard on the Tost ridge. Stalking alertly along the granite cliffline tracking a Siberian ibex herd.',
      ja: 'トスト山脈の断崖に佇む成獣オス。シベリアアイベックスの群れを鋭く追尾中。',
      zh: '托斯特山脉悬崖上的成年雄性雪豹。正敏锐地沿着花岗岩山脊潜行，追踪北山羊群。',
    },
    preyContext: {
      mn: 'Ойролцоо ажиглагдсан: 14 янгир (Siberian Ibex), 3 мануул',
      en: 'Nearby observed: 14 Siberian Ibex, 3 Pallas’s Cats',
      ja: '周辺確認：シベリアアイベックス14頭、マヌルネコ3頭',
      zh: '周边记录：北山羊14只、兔狲3只',
    },
  },
  {
    id: 'khuren-khan',
    locationName: {
      mn: 'Хүрэн ханын хэц',
      en: 'Khuren Khan Ridge',
      ja: 'フレン・ハヌィン・ヘツ',
      zh: '呼伦哈尼山脊',
    },
    coords: "43°29'N 104°05'E",
    elevation: '2,200 m',
    temperature: '-8°C',
    dayImg: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80',
    nightImg: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    leopardPosition: { top: '28%', left: '36%', width: '44%', height: '52%' },
    spottedBioNote: {
      mn: 'Эм ирвэс 2 зулзагын хамт (Өвлийн өтгөн үстэй). Хүрэн ханын хэцийн хадан цохион дээгүүр амарч байна.',
      en: 'Female snow leopard with 2 sub-adult cubs. Resting on a shaded crag above the Khuren Khan Ridge.',
      ja: '母ユキヒョウと2頭の仔（モフモフの冬毛）。フレン・ハヌィン・ヘツの岩棚で休息中。',
      zh: '雌性雪豹携2只幼崽。在呼伦哈尼山脊上方的阴凉岩壁上休整。',
    },
    preyContext: {
      mn: 'Ойролцоо ажиглагдсан: 8 аргаль (Argali Sheep), говийн туулай',
      en: 'Nearby observed: 8 Argali Wild Sheep, Tolai hares',
      ja: '周辺確認：アルガリ（オオツノヒツジ）8頭、トライフサウサギ',
      zh: '周边记录：盘羊8只、戈壁托氏兔',
    },
  },
  {
    id: 'nemegt-crag',
    locationName: {
      mn: 'Нэмэгтийн нурууны хадан хясаа (Үлэг гүрвэлийн хөндий)',
      en: 'Nemegt Mountain Escarpment (Prehistoric Valley)',
      ja: 'ネメグト山脈・化石峡谷断崖（恐竜層直上）',
      zh: '耐梅盖特山脉断崖（恐龙峡谷之上）',
    },
    coords: "43°30'N 101°02'E",
    elevation: '1,980 m',
    temperature: '+4°C',
    dayImg: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    nightImg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    leopardPosition: { top: '35%', left: '40%', width: '40%', height: '45%' },
    spottedBioNote: {
      mn: 'Тарбозаврын олдворт давхаргын дээрх байц хадан цохионд байр сууриа тэмдэглэж буй залуу ирвэс.',
      en: 'Young leopard scent-marking territory directly above the Cretaceous Tarbosaurus sandstone cliffs.',
      ja: 'タルボサウルスの化石層直上の断崖で縄張り主張（マーキング）を行う若個体。',
      zh: '年轻雪豹正在特暴龙白垩纪砂岩层上方的悬崖上进行气味标记领地。',
    },
    preyContext: {
      mn: 'Ойролцоо ажиглагдсан: Говийн хар сүүлт зээр, ёл шувуу',
      en: 'Nearby observed: Goitered Gazelle, Bearded Vultures',
      ja: '周辺確認：コウジョウセンガゼル、ヒゲワシ',
      zh: '周边记录：鹅喉羚、胡兀鹫',
    },
  },
];

export const SnowLeopardSection: React.FC<SnowLeopardSectionProps> = ({ currentLang, onOpenBooking }) => {
  const t = translations[currentLang];
  const sl = t.snowLeopard;

  // Simulator View Modes: 'video' | 'photos'
  const [activeTab, setActiveTab] = useState<'video' | 'photos'>('video');
  const [thermalMode, setThermalMode] = useState<ThermalMode>('ir');
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [videoProgress, setVideoProgress] = useState<number>(12); // seconds (0-30)
  const [showAiBoxes, setShowAiBoxes] = useState(true);
  const [selectedTarget, setSelectedTarget] = useState<string | null>('leopard');
  const [isFullView, setIsFullView] = useState(false);

  // Photos trap mode state
  const [selectedSiteIndex, setSelectedSiteIndex] = useState(0);
  const [isNightMode, setIsNightMode] = useState(true);
  const [isSpotted, setIsSpotted] = useState(false);

  // Audio state
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioStep, setAudioStep] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Canvas ref for high-performance thermal video simulation
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const progressRef = useRef<number>(12);

  const activeSite = cameraTrapSites[selectedSiteIndex];

  // Video Animation Loop in HTML5 Canvas
  const renderVideoFrame = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const totalDuration = 30; // 30s loop
    const normTime = (time % totalDuration) / totalDuration; // 0 to 1

    // Camera Pan / Drift along the mountain ridge
    const panX = Math.sin(normTime * Math.PI * 2) * 20;
    const panY = Math.cos(normTime * Math.PI * 2) * 10;

    // Clear background based on Thermal mode
    if (thermalMode === 'ir') {
      ctx.fillStyle = '#0a0a0c';
    } else if (thermalMode === 'flir') {
      ctx.fillStyle = '#100520';
    } else if (thermalMode === 'nvg') {
      ctx.fillStyle = '#021206';
    } else {
      ctx.fillStyle = '#050505';
    }
    ctx.fillRect(0, 0, width, height);

    // Distant mountain ridge layer
    ctx.beginPath();
    ctx.moveTo(0, height * 0.4 + panY * 0.3);
    ctx.lineTo(width * 0.25, height * 0.25 + panY * 0.3);
    ctx.lineTo(width * 0.55, height * 0.35 + panY * 0.3);
    ctx.lineTo(width * 0.85, height * 0.18 + panY * 0.3);
    ctx.lineTo(width, height * 0.3 + panY * 0.3);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();

    if (thermalMode === 'ir') {
      ctx.fillStyle = '#18181e';
    } else if (thermalMode === 'flir') {
      ctx.fillStyle = '#220b3b';
    } else if (thermalMode === 'nvg') {
      ctx.fillStyle = '#06240e';
    } else {
      ctx.fillStyle = '#121212';
    }
    ctx.fill();

    // Foreground Tost Mountain Ridge - Sharp illuminated granite crag
    ctx.beginPath();
    ctx.moveTo(-50, height * 0.85 + panY);
    ctx.lineTo(width * 0.15 + panX, height * 0.65 + panY);
    ctx.lineTo(width * 0.38 + panX, height * 0.48 + panY);
    ctx.lineTo(width * 0.68 + panX, height * 0.32 + panY);
    ctx.lineTo(width * 0.88 + panX, height * 0.22 + panY);
    ctx.lineTo(width + 50, height * 0.15 + panY);
    ctx.lineTo(width + 50, height + 50);
    ctx.lineTo(-50, height + 50);
    ctx.closePath();

    if (thermalMode === 'ir') {
      const grad = ctx.createLinearGradient(0, height * 0.2, 0, height);
      grad.addColorStop(0, '#424248');
      grad.addColorStop(0.4, '#26262c');
      grad.addColorStop(1, '#111114');
      ctx.fillStyle = grad;
    } else if (thermalMode === 'flir') {
      const grad = ctx.createLinearGradient(0, height * 0.2, 0, height);
      grad.addColorStop(0, '#751a6d');
      grad.addColorStop(0.5, '#400c4e');
      grad.addColorStop(1, '#1b0526');
      ctx.fillStyle = grad;
    } else if (thermalMode === 'nvg') {
      const grad = ctx.createLinearGradient(0, height * 0.2, 0, height);
      grad.addColorStop(0, '#155c26');
      grad.addColorStop(0.5, '#0b3515');
      grad.addColorStop(1, '#031407');
      ctx.fillStyle = grad;
    } else {
      const grad = ctx.createLinearGradient(0, height * 0.2, 0, height);
      grad.addColorStop(0, '#3a3a3a');
      grad.addColorStop(0.5, '#202020');
      grad.addColorStop(1, '#0e0e0e');
      ctx.fillStyle = grad;
    }
    ctx.fill();

    // Ridge Crest Highlight (Infrared illuminated edge)
    ctx.beginPath();
    ctx.moveTo(-50, height * 0.85 + panY);
    ctx.lineTo(width * 0.15 + panX, height * 0.65 + panY);
    ctx.lineTo(width * 0.38 + panX, height * 0.48 + panY);
    ctx.lineTo(width * 0.68 + panX, height * 0.32 + panY);
    ctx.lineTo(width * 0.88 + panX, height * 0.22 + panY);
    ctx.lineTo(width + 50, height * 0.15 + panY);
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = thermalMode === 'ir' ? 'rgba(210,215,225,0.75)' : thermalMode === 'flir' ? 'rgba(255,140,50,0.85)' : thermalMode === 'nvg' ? 'rgba(120,255,150,0.8)' : 'rgba(255,255,255,0.85)';
    ctx.stroke();

    // Rocky Crag facets and texture
    for (let i = 0; i < 8; i++) {
      const rx = (width * 0.12 * i + panX * 1.2) % width;
      const ry = height * 0.45 + (i % 3) * 60 + panY;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx + 40, ry - 35);
      ctx.lineTo(rx + 85, ry + 20);
      ctx.strokeStyle = thermalMode === 'ir' ? 'rgba(160,165,175,0.25)' : thermalMode === 'flir' ? 'rgba(200,80,120,0.3)' : thermalMode === 'nvg' ? 'rgba(50,180,80,0.3)' : 'rgba(180,180,180,0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Positions of Wildlife traversing the ridge path
    const ridgeBaseX = width * 0.85 - normTime * (width * 0.7) + panX;
    const getRidgeY = (x: number) => {
      const rel = (x - panX) / width;
      return height * 0.2 + (1 - rel) * (height * 0.6) + panY;
    };

    // 1. Siberian Ibex Herd (Lead animal #1, #2, #3)
    const ibexList = [
      { id: 'ibex-1', offset: 0, scale: 1.0, temp: '+38.4°C' },
      { id: 'ibex-2', offset: -55, scale: 0.85, temp: '+37.9°C' },
      { id: 'ibex-3', offset: -105, scale: 0.9, temp: '+38.1°C' },
    ];

    // 2. Snow Leopard (Stalking behind the herd)
    const leopardObj = {
      id: 'leopard',
      offset: -175,
      scale: 1.15,
      temp: '+37.8°C',
    };

    // Draw Ibex Herd Heat Signatures
    ibexList.forEach((ibex) => {
      const ix = ridgeBaseX + ibex.offset;
      const iy = getRidgeY(ix) - 18 * ibex.scale;
      const bob = Math.sin(time * 6 + ibex.offset) * 2;

      // Draw Ibex body thermal glow
      ctx.save();
      ctx.translate(ix, iy + bob);

      const glowGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, 22 * ibex.scale);
      if (thermalMode === 'ir') {
        glowGrad.addColorStop(0, 'rgba(255,255,255,0.95)');
        glowGrad.addColorStop(0.5, 'rgba(220,225,235,0.7)');
        glowGrad.addColorStop(1, 'rgba(150,150,160,0)');
      } else if (thermalMode === 'flir') {
        glowGrad.addColorStop(0, 'rgba(255,255,240,1)');
        glowGrad.addColorStop(0.35, 'rgba(255,220,50,0.9)');
        glowGrad.addColorStop(0.7, 'rgba(235,90,30,0.6)');
        glowGrad.addColorStop(1, 'rgba(120,20,80,0)');
      } else if (thermalMode === 'nvg') {
        glowGrad.addColorStop(0, 'rgba(240,255,240,1)');
        glowGrad.addColorStop(0.4, 'rgba(140,255,160,0.85)');
        glowGrad.addColorStop(1, 'rgba(30,160,50,0)');
      } else {
        glowGrad.addColorStop(0, 'rgba(255,255,255,1)');
        glowGrad.addColorStop(0.6, 'rgba(200,200,200,0.6)');
        glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
      }

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.ellipse(0, 0, 16 * ibex.scale, 10 * ibex.scale, 0.15, 0, Math.PI * 2);
      ctx.fill();

      // Head & Curved Horns
      ctx.beginPath();
      ctx.ellipse(-12 * ibex.scale, -7 * ibex.scale, 6 * ibex.scale, 5 * ibex.scale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Horn arcs
      ctx.beginPath();
      ctx.arc(-14 * ibex.scale, -12 * ibex.scale, 9 * ibex.scale, 0.2 * Math.PI, 1.2 * Math.PI, true);
      ctx.lineWidth = 2 * ibex.scale;
      ctx.strokeStyle = thermalMode === 'flir' ? '#fffae0' : '#ffffff';
      ctx.stroke();

      // Four active walking legs
      const legWalk1 = Math.sin(time * 8 + ibex.offset) * 6;
      const legWalk2 = -legWalk1;
      ctx.lineWidth = 2 * ibex.scale;
      ctx.strokeStyle = thermalMode === 'flir' ? '#ffd030' : thermalMode === 'nvg' ? '#a3f7b5' : '#ffffff';
      
      // Front legs
      ctx.beginPath();
      ctx.moveTo(-10 * ibex.scale, 4 * ibex.scale);
      ctx.lineTo(-12 * ibex.scale + legWalk1, 16 * ibex.scale);
      ctx.moveTo(-7 * ibex.scale, 4 * ibex.scale);
      ctx.lineTo(-8 * ibex.scale + legWalk2, 16 * ibex.scale);
      // Hind legs
      ctx.moveTo(8 * ibex.scale, 4 * ibex.scale);
      ctx.lineTo(9 * ibex.scale + legWalk2, 16 * ibex.scale);
      ctx.moveTo(11 * ibex.scale, 4 * ibex.scale);
      ctx.lineTo(12 * ibex.scale + legWalk1, 16 * ibex.scale);
      ctx.stroke();

      ctx.restore();

      // AI Bounding Box for Ibex
      if (showAiBoxes && ix > 30 && ix < width - 30) {
        ctx.save();
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.8)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        const bw = 38 * ibex.scale;
        const bh = 34 * ibex.scale;
        ctx.strokeRect(ix - bw / 2, iy + bob - bh / 2 - 2, bw, bh);

        // Tag label
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        ctx.fillRect(ix - bw / 2, iy + bob - bh / 2 - 16, bw + 22, 13);
        ctx.fillStyle = '#fbbf24';
        ctx.font = '9px monospace';
        ctx.fillText(`IBEX ${ibex.temp}`, ix - bw / 2 + 2, iy + bob - bh / 2 - 6);
        ctx.restore();
      }
    });

    // Draw Stalking Snow Leopard
    const lx = ridgeBaseX + leopardObj.offset;
    const ly = getRidgeY(lx) - 14 * leopardObj.scale;
    const leopardBob = Math.sin(time * 5) * 1.5;

    ctx.save();
    ctx.translate(lx, ly + leopardBob);

    // Leopard Thermal Heat Core
    const leopardGlow = ctx.createRadialGradient(0, 0, 2, 0, 0, 26 * leopardObj.scale);
    if (thermalMode === 'ir') {
      leopardGlow.addColorStop(0, 'rgba(255,255,255,1)');
      leopardGlow.addColorStop(0.4, 'rgba(240,245,255,0.9)');
      leopardGlow.addColorStop(0.8, 'rgba(180,185,200,0.5)');
      leopardGlow.addColorStop(1, 'rgba(100,100,120,0)');
    } else if (thermalMode === 'flir') {
      leopardGlow.addColorStop(0, '#ffffff');
      leopardGlow.addColorStop(0.25, '#fff64d');
      leopardGlow.addColorStop(0.65, '#ff4d17');
      leopardGlow.addColorStop(0.9, '#8f0c5b');
      leopardGlow.addColorStop(1, 'rgba(50,0,50,0)');
    } else if (thermalMode === 'nvg') {
      leopardGlow.addColorStop(0, '#f2fff4');
      leopardGlow.addColorStop(0.35, '#52ff75');
      leopardGlow.addColorStop(0.75, '#169c33');
      leopardGlow.addColorStop(1, 'rgba(0,40,10,0)');
    } else {
      leopardGlow.addColorStop(0, '#ffffff');
      leopardGlow.addColorStop(0.6, '#cccccc');
      leopardGlow.addColorStop(1, 'rgba(0,0,0,0)');
    }

    ctx.fillStyle = leopardGlow;
    // Sleek predatory body (stealth low crawl)
    ctx.beginPath();
    ctx.ellipse(0, 0, 22 * leopardObj.scale, 8.5 * leopardObj.scale, 0.1, 0, Math.PI * 2);
    ctx.fill();

    // Leopard Head (forward focus)
    ctx.beginPath();
    ctx.ellipse(-18 * leopardObj.scale, -4 * leopardObj.scale, 7.5 * leopardObj.scale, 6 * leopardObj.scale, 0, 0, Math.PI * 2);
    ctx.fill();

    // Round ears
    ctx.beginPath();
    ctx.arc(-17 * leopardObj.scale, -10 * leopardObj.scale, 2.5 * leopardObj.scale, 0, Math.PI * 2);
    ctx.arc(-21 * leopardObj.scale, -8 * leopardObj.scale, 2.5 * leopardObj.scale, 0, Math.PI * 2);
    ctx.fill();

    // Long Iconic Snow Leopard Tail (curving upwards behind for balance)
    ctx.beginPath();
    ctx.moveTo(18 * leopardObj.scale, -2 * leopardObj.scale);
    ctx.quadraticCurveTo(
      32 * leopardObj.scale, 
      -16 * leopardObj.scale + Math.sin(time * 3) * 4, 
      26 * leopardObj.scale, 
      -22 * leopardObj.scale
    );
    ctx.lineWidth = 4.5 * leopardObj.scale;
    ctx.strokeStyle = thermalMode === 'flir' ? '#fffae0' : thermalMode === 'nvg' ? '#c2ffd0' : '#ffffff';
    ctx.lineCap = 'round';
    ctx.stroke();

    // Stealthy walking limbs
    const stalkStep1 = Math.sin(time * 6) * 7;
    const stalkStep2 = -stalkStep1;
    ctx.lineWidth = 3 * leopardObj.scale;
    ctx.strokeStyle = thermalMode === 'flir' ? '#ffe030' : thermalMode === 'nvg' ? '#62ff82' : '#ffffff';
    
    // Front limbs
    ctx.beginPath();
    ctx.moveTo(-12 * leopardObj.scale, 3 * leopardObj.scale);
    ctx.lineTo(-14 * leopardObj.scale + stalkStep1, 13 * leopardObj.scale);
    ctx.moveTo(-8 * leopardObj.scale, 3 * leopardObj.scale);
    ctx.lineTo(-9 * leopardObj.scale + stalkStep2, 13 * leopardObj.scale);
    // Hind limbs
    ctx.moveTo(10 * leopardObj.scale, 3 * leopardObj.scale);
    ctx.lineTo(11 * leopardObj.scale + stalkStep2, 13 * leopardObj.scale);
    ctx.moveTo(15 * leopardObj.scale, 3 * leopardObj.scale);
    ctx.lineTo(16 * leopardObj.scale + stalkStep1, 13 * leopardObj.scale);
    ctx.stroke();

    ctx.restore();

    // AI Bounding Box for Snow Leopard
    if (showAiBoxes && lx > 30 && lx < width - 30) {
      ctx.save();
      ctx.strokeStyle = '#2dd4bf'; // Teal AI tracking box
      ctx.lineWidth = 1.8;
      
      const lbw = 58 * leopardObj.scale;
      const lbh = 42 * leopardObj.scale;
      const boxX = lx - lbw / 2;
      const boxY = ly + leopardBob - lbh / 2 - 5;

      // Corner target brackets
      const bracketLen = 8;
      // Top Left
      ctx.beginPath();
      ctx.moveTo(boxX, boxY + bracketLen);
      ctx.lineTo(boxX, boxY);
      ctx.lineTo(boxX + bracketLen, boxY);
      // Top Right
      ctx.moveTo(boxX + lbw - bracketLen, boxY);
      ctx.lineTo(boxX + lbw, boxY);
      ctx.lineTo(boxX + lbw, boxY + bracketLen);
      // Bottom Left
      ctx.moveTo(boxX, boxY + lbh - bracketLen);
      ctx.lineTo(boxX, boxY + lbh);
      ctx.lineTo(boxX + bracketLen, boxY + lbh);
      // Bottom Right
      ctx.moveTo(boxX + lbw - bracketLen, boxY + lbh);
      ctx.lineTo(boxX + lbw, boxY + lbh);
      ctx.lineTo(boxX + lbw, boxY + lbh - bracketLen);
      ctx.stroke();

      // AI Detection Header Banner
      ctx.fillStyle = 'rgba(13, 148, 136, 0.9)';
      ctx.fillRect(boxX, boxY - 20, 142, 18);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9.5px monospace';
      ctx.fillText('TARGET: Panthera uncia', boxX + 4, boxY - 7);

      // AI Sub-telemetry tag
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(boxX, boxY + lbh + 3, 135, 14);
      ctx.fillStyle = '#5eead4';
      ctx.font = '9px monospace';
      ctx.fillText('CONF: 99.2% | HEAT: +37.8°C', boxX + 4, boxY + lbh + 13);

      ctx.restore();
    }

    // Dynamic Night Vision Scanlines & Noise Texture
    ctx.save();
    ctx.fillStyle = thermalMode === 'nvg' ? 'rgba(0, 40, 0, 0.12)' : 'rgba(0, 0, 0, 0.15)';
    for (let line = 0; line < height; line += 4) {
      ctx.fillRect(0, line, width, 1.5);
    }

    // Digital Noise / Sensor Grain
    const grainImg = ctx.createImageData(100, 100);
    for (let p = 0; p < grainImg.data.length; p += 4) {
      const v = Math.random() * 255;
      grainImg.data[p] = v;
      grainImg.data[p+1] = v;
      grainImg.data[p+2] = v;
      grainImg.data[p+3] = 12; // faint opacity
    }
    for (let gx = 0; gx < width; gx += 100) {
      for (let gy = 0; gy < height; gy += 100) {
        ctx.putImageData(grainImg, gx, gy);
      }
    }
    ctx.restore();

    // Central Precision Recon Crosshair
    ctx.save();
    ctx.strokeStyle = thermalMode === 'flir' ? 'rgba(255,200,80,0.35)' : thermalMode === 'nvg' ? 'rgba(50,255,100,0.35)' : 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1;
    const cx = width / 2;
    const cy = height / 2;
    ctx.beginPath();
    ctx.moveTo(cx - 20, cy);
    ctx.lineTo(cx - 6, cy);
    ctx.moveTo(cx + 6, cy);
    ctx.lineTo(cx + 20, cy);
    ctx.moveTo(cx, cy - 20);
    ctx.lineTo(cx, cy - 6);
    ctx.moveTo(cx, cy + 6);
    ctx.lineTo(cx, cy + 20);
    ctx.stroke();
    ctx.restore();

  }, [thermalMode, showAiBoxes]);

  // Animation Frame Loop Runner
  useEffect(() => {
    let active = true;

    const loop = (time: number) => {
      if (!active) return;
      
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (isVideoPlaying && activeTab === 'video') {
        progressRef.current = (progressRef.current + delta * playbackSpeed) % 30;
        setVideoProgress(progressRef.current);
      }

      if (canvasRef.current && activeTab === 'video') {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          renderVideoFrame(ctx, canvas.width, canvas.height, progressRef.current);
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      active = false;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isVideoPlaying, playbackSpeed, activeTab, renderVideoFrame]);

  // Handle timeline scrubber change
  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProg = parseFloat(e.target.value);
    progressRef.current = newProg;
    setVideoProgress(newProg);
  };

  // Download snapshot of current frame
  const handleDownloadSnapshot = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/jpeg', 0.95);
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `tost_mountain_camera_trap_${thermalMode}_${Math.floor(videoProgress)}s.jpg`;
    a.click();
  };

  // Sound Synthesizer simulating Snow Leopard Chuffing & Wind
  const playSnowLeopardSound = () => {
    if (audioPlaying) {
      setAudioPlaying(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      setAudioPlaying(true);
      setAudioStep(1);

      // Create gentle wind noise buffer
      const bufferSize = ctx.sampleRate * 3;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.05;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);
      filter.Q.setValueAtTime(3, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.08, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 3);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      whiteNoise.start();

      // Create Snow Leopard Chuff / Prusten sound pulses (soft rhythmic warm puffs)
      const chuffTimes = [0.4, 0.75, 1.1, 1.45, 2.1];
      chuffTimes.forEach((time, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(140 - idx * 10, ctx.currentTime + time);
        osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + time + 0.15);

        oscGain.gain.setValueAtTime(0.001, ctx.currentTime + time);
        oscGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + time + 0.04);
        oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + 0.16);

        osc.connect(oscGain);
        oscGain.connect(ctx.destination);

        osc.start(ctx.currentTime + time);
        osc.stop(ctx.currentTime + time + 0.18);
      });

      setTimeout(() => {
        setAudioStep(2);
      }, 1500);

      setTimeout(() => {
        setAudioPlaying(false);
        setAudioStep(0);
      }, 3200);
    } catch {
      setAudioPlaying(false);
    }
  };

  useEffect(() => {
    setIsSpotted(false);
  }, [selectedSiteIndex, isNightMode]);

  return (
    <section id="snow-leopard" className="relative py-24 bg-white text-stone-900 overflow-hidden border-b border-stone-200">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="block text-[10px] uppercase font-bold tracking-[0.3em] text-stone-500 mb-2">
            {sl.badge}
          </span>

          <h2 className="font-['Cormorant_Garamond',serif] text-4xl sm:text-5xl lg:text-6xl font-normal text-stone-900 tracking-tight leading-[1.08] mb-4">
            {sl.sectionTitle}
          </h2>

          <p className="font-['Cormorant_Garamond',serif] italic text-xl sm:text-2xl text-stone-700 font-light leading-relaxed max-w-2xl mx-auto">
            {sl.sectionSubtitle}
          </p>
        </div>

        {/* FEATURED AUTHENTIC GOBI WILDLIFE PHOTOGRAPHY HERO */}
        <div className="mb-12 bg-white border border-stone-200/80 shadow-sm overflow-hidden">
          {/* Top Bar with Location & Origin */}
          <div className="px-5 py-3.5 bg-[#FAF9F5] border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-white border border-stone-200 text-xs font-semibold text-stone-800 shadow-sm">
                <Camera className="w-3.5 h-3.5 text-stone-700" />
                <span>Монгол Говь • Хээрийн бодит гэрэл зураг</span>
              </span>
              <span className="px-2.5 py-1 bg-stone-100 border border-stone-200 text-stone-700 text-xs font-mono">
                Panthera uncia
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-stone-600">
              <span>📍 Өмнөговь, Тост Тосонбумбын нуруу (2,460 м)</span>
            </div>
          </div>

          {/* Clean Photo View */}
          <div className="relative w-full bg-stone-950 flex items-center justify-center overflow-hidden">
            <img
              src={snowLeopardRidgeImg}
              alt="Wild Snow Leopard in Mongolian Gobi Altai Mountain Ridge"
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[620px] object-contain mx-auto shadow-inner select-none transition duration-700 hover:scale-[1.01]"
            />
          </div>

          {/* Caption & Controls Section */}
          <div className="p-5 sm:p-6 bg-[#FAF9F5] border-t border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-stone-200 text-stone-800 border border-stone-300">
                  Бодит ажиглалт
                </span>
                <h4 className="font-['Cormorant_Garamond',serif] text-xl font-normal text-stone-900">
                  Хадан хясааны эзэн Цоохор Ирвэс (Тост нурууны хяр)
                </h4>
              </div>
              <p className="font-['Cormorant_Garamond',serif] italic text-base text-stone-700 leading-relaxed font-light">
                {currentLang === 'mn'
                  ? 'Монгол Алтай болон Говийн өндөр хадан хясаанд маш сонор соргог сууж буй бодит цоохор ирвэс. Өтгөн ноолуурлаг цагаан цээж, урт сүүл, байгалийн төгс өнгөлөн далдлалт нь цөлийн хад асгатай нэгэн цул болж харагдана.'
                  : 'A majestic wild snow leopard sitting alertly on the sunlit rocky ridges of the Mongolian Gobi. Master of high-altitude stealth, thick protective fur, and natural cliff camouflage.'}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                id="play-snow-leopard-sound-btn"
                onClick={playSnowLeopardSound}
                className="px-4 py-2 border border-stone-900 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-sm transition cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Дуу хоолой сонсох</span>
              </button>
            </div>
          </div>
        </div>

        {/* Narrative & Quick Stats Bento Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          {/* Main Story Card with Snow Leopard Art Background */}
          <div className="lg:col-span-7 bg-stone-950 border border-stone-300 p-6 sm:p-8 shadow-sm relative overflow-hidden flex flex-col justify-between group">
            <div className="absolute inset-0 pointer-events-none select-none z-0">
              <img
                src={snowLeopardBgArt}
                alt="Snow Leopard Portrait Art"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top sm:object-[center_25%] opacity-85 sm:opacity-90 group-hover:scale-105 transition-transform duration-1000 ease-out filter contrast-115 brightness-105 saturate-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-stone-950/30 to-transparent" />
            </div>

            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-black/60 text-white border border-white/20 text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-sm">
                  {sl.latinName}
                </span>
                <span className="px-3 py-1 bg-black/60 text-amber-300 border border-amber-400/30 text-xs font-semibold backdrop-blur-md shadow-sm">
                  {sl.localName}
                </span>
              </div>

              <h3 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl font-normal text-white mb-4 leading-snug">
                {sl.storyTitle}
              </h3>

              <p className="text-stone-200 text-sm sm:text-base leading-relaxed mb-6 font-light">
                {sl.storyDesc}
              </p>
            </div>

            {/* Vocalization & Sound Experience Button */}
            <div className="relative z-10 pt-5 border-t border-stone-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <button
                id="snow-leopard-audio-btn"
                onClick={playSnowLeopardSound}
                className="flex items-center gap-3 px-5 py-2.5 bg-black/70 hover:bg-black/90 text-white border border-white/30 text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition cursor-pointer"
              >
                {audioPlaying ? (
                  <>
                    <Volume2 className="w-4 h-4 text-amber-300" />
                    <span>
                      {audioStep === 1 ? '🔊 Chuffing & Prusten...' : '🏔️ Mountain Echo...'}
                    </span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-stone-200" />
                    <span>{sl.listenVocalization}</span>
                  </>
                )}
              </button>

              <div className="text-xs text-stone-300 flex items-center gap-2 font-medium bg-black/40 px-3 py-1.5 border border-stone-800">
                <Radio className="w-4 h-4 text-stone-300 shrink-0" />
                <span>{sl.vocalizationActive}</span>
              </div>
            </div>
          </div>

          {/* 4 Core Vital Statistics */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-[#FAF9F5] border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                  {sl.popLabel}
                </div>
                <div className="text-2xl sm:text-3xl font-light text-stone-900 font-mono mb-2">
                  {sl.popValue}
                </div>
              </div>
              <p className="text-xs text-stone-600 font-light">
                Дэлхийн нийт цоохор ирвэсийн 20 орчим хувь нь Монголын өндөр уулс, говийн хаданд нутагладаг.
              </p>
            </div>

            <div className="p-5 bg-[#FAF9F5] border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                  {sl.statusLabel}
                </div>
                <div className="text-xl sm:text-2xl font-light text-stone-900 font-mono mb-2">
                  {sl.statusValue}
                </div>
              </div>
              <p className="text-xs text-stone-600 font-light">
                1953 оноос агнахыг хуулиар хатуу хориглож, төрийн дээд хамгаалалтад авсан.
              </p>
            </div>

            <div className="p-5 bg-[#FAF9F5] border border-stone-200 flex flex-col justify-between sm:col-span-2">
              <div>
                <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                  {sl.tostLabel}
                </div>
                <div className="text-lg sm:text-xl font-normal font-serif text-stone-900 mb-1">
                  {sl.tostValue}
                </div>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Өмнөговь аймгийн Гурвантэс сумын нутаг дахь Тост, Тосонбумбын нуруу нь орон нутгийн малчдын хамгаалалт, дэлхийн сансрын дохиололт хүзүүвчний урт хугацааны мониторинг явагддаг гол цөм юм.
              </p>
            </div>
          </div>
        </div>

        {/* 🎥 ADVANCED INTERACTIVE CAMERA-TRAP FIELD VIDEO & SIMULATOR */}
        <div className="bg-[#FAF9F5] border border-stone-200/80 shadow-sm p-5 sm:p-8 mb-16 overflow-hidden">
          {/* Main Top Header with Mode Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-5 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-stone-700 uppercase tracking-widest mb-1.5">
                <Camera className="w-4 h-4 text-stone-700" />
                <span>{sl.cameraTrapTitle}</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono bg-white text-stone-700 border border-stone-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  ONLINE
                </span>
              </div>
              <p className="font-['Cormorant_Garamond',serif] italic text-base text-stone-600 max-w-2xl font-light">
                {sl.cameraTrapSubtitle}
              </p>
            </div>

            {/* Tab Switcher: Video Stream vs Photos */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center bg-white p-1 border border-stone-200 shadow-sm">
                <button
                  id="tab-cam-video-btn"
                  onClick={() => setActiveTab('video')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                    activeTab === 'video'
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>{sl.videoTabLabel}</span>
                </button>

                <button
                  id="tab-cam-photos-btn"
                  onClick={() => setActiveTab('photos')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                    activeTab === 'photos'
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>{sl.photoTabLabel}</span>
                </button>
              </div>

              {/* Day/Night button in Photo Mode */}
              {activeTab === 'photos' && (
                <button
                  id="camera-night-toggle-btn"
                  onClick={() => setIsNightMode(!isNightMode)}
                  className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider border border-stone-300 bg-white text-stone-800 transition cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{isNightMode ? sl.cameraTrapNightMode : sl.cameraTrapDayMode}</span>
                </button>
              )}
            </div>
          </div>

          {/* TAB 1: 🎥 REAL-TIME LIVE VIDEO SIMULATION */}
          {activeTab === 'video' && (
            <div>
              {/* Spectrum Palette Selector & AI Controls Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-2">
                {/* Thermal Color Spectrum Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono text-stone-400 flex items-center gap-1 mr-1">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>Spectrum:</span>
                  </span>
                  
                  <button
                    id="spectrum-ir-btn"
                    onClick={() => setThermalMode('ir')}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg border transition cursor-pointer ${
                      thermalMode === 'ir'
                        ? 'bg-stone-200 text-stone-900 border-white font-bold shadow-md'
                        : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-600'
                    }`}
                  >
                    {sl.thermalIR}
                  </button>

                  <button
                    id="spectrum-flir-btn"
                    onClick={() => setThermalMode('flir')}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg border transition cursor-pointer ${
                      thermalMode === 'flir'
                        ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white border-amber-300 font-bold shadow-md'
                        : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-600'
                    }`}
                  >
                    {sl.thermalFLIR}
                  </button>

                  <button
                    id="spectrum-nvg-btn"
                    onClick={() => setThermalMode('nvg')}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg border transition cursor-pointer ${
                      thermalMode === 'nvg'
                        ? 'bg-emerald-900 text-emerald-200 border-emerald-400 font-bold shadow-md'
                        : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-600'
                    }`}
                  >
                    {sl.thermalNVG}
                  </button>

                  <button
                    id="spectrum-whitehot-btn"
                    onClick={() => setThermalMode('whiteHot')}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg border transition cursor-pointer ${
                      thermalMode === 'whiteHot'
                        ? 'bg-stone-800 text-white border-teal-400 font-bold shadow-md'
                        : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-600'
                    }`}
                  >
                    {sl.thermalWhiteHot}
                  </button>
                </div>

                {/* AI Target Box & Tools Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    id="toggle-ai-boxes-btn"
                    onClick={() => setShowAiBoxes(!showAiBoxes)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-semibold border transition cursor-pointer ${
                      showAiBoxes
                        ? 'bg-teal-500/20 text-teal-300 border-teal-400 shadow-sm'
                        : 'bg-stone-950 text-stone-400 border-stone-800'
                    }`}
                  >
                    <Crosshair className="w-3.5 h-3.5 text-teal-400" />
                    <span>AI Target HUD: {showAiBoxes ? 'ON' : 'OFF'}</span>
                  </button>

                  <button
                    id="snapshot-download-btn"
                    onClick={handleDownloadSnapshot}
                    title={sl.captureSnapshot}
                    className="p-1.5 rounded-lg bg-stone-950 border border-stone-800 hover:border-stone-600 text-stone-300 hover:text-white transition cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Viewport Screen (Canvas Video Simulator) */}
              <div 
                className={`relative rounded-2xl overflow-hidden bg-black border border-stone-800 shadow-2xl group transition-all duration-300 ${
                  isFullView ? 'fixed inset-4 z-50 max-h-none h-[calc(100vh-32px)]' : 'w-full aspect-video max-h-[560px]'
                }`}
              >
                {/* 60 FPS HTML5 Video Canvas */}
                <canvas
                  ref={canvasRef}
                  width={960}
                  height={540}
                  className="w-full h-full object-cover block select-none cursor-crosshair"
                  onClick={() => {
                    setSelectedTarget(selectedTarget === 'leopard' ? 'ibex' : 'leopard');
                  }}
                />

                {/* TOP TELEMETRY HUD OVERLAY */}
                <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none text-[11px] sm:text-xs font-mono select-none">
                  {/* Left: REC Status & Sensor Location */}
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-stone-700 text-emerald-400 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="font-bold tracking-wider text-red-400">● REC</span>
                    <span className="text-stone-500">|</span>
                    <span className="text-stone-200">CAM-01 [TOST-RIDGE]</span>
                    <span className="text-stone-500">|</span>
                    <span className="text-emerald-300">43°12'18"N 100°30'44"E</span>
                  </div>

                  {/* Right: Environmental Readings */}
                  <div className="flex items-center gap-2.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-stone-700 text-stone-300 shadow-lg">
                    <span className="text-amber-300">Alt: 2,460m</span>
                    <span className="text-stone-500">•</span>
                    <span className="text-sky-300">Amb: -12°C</span>
                    <span className="text-stone-500">•</span>
                    <span className="text-emerald-400">⚡ Solar: 96%</span>
                    <span className="text-stone-500">•</span>
                    <span className="text-stone-300">PIR: ACTIVE</span>
                  </div>
                </div>

                {/* BOTTOM TELEMETRY HUD OVERLAY */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none text-[11px] font-mono select-none">
                  <div className="px-3 py-1 rounded-md bg-black/85 backdrop-blur-md border border-teal-500/40 text-teal-300 flex items-center gap-2 shadow-lg">
                    <Activity className="w-3.5 h-3.5 text-teal-400" />
                    <span>{sl.aiTargetLocked}</span>
                  </div>

                  <div className="px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md border border-stone-700 text-stone-300">
                    <span>FPS: 60 • IR SENSOR: FLIR TAU2 (640×512)</span>
                  </div>
                </div>

                {/* Fullscreen toggle button on top right */}
                <button
                  onClick={() => setIsFullView(!isFullView)}
                  className="absolute top-3 right-3 z-20 p-1.5 rounded-lg bg-black/70 border border-stone-700 text-stone-300 hover:text-white transition cursor-pointer"
                  title="Toggle Full View"
                >
                  {isFullView ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>

              {/* TIMELINE SCRUBBER & PLAYBACK CONTROLS BAR */}
              <div className="mt-4 p-4 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col gap-3 shadow-inner">
                {/* Scrubber Progress Slider */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-stone-400 w-12 shrink-0">
                    {`00:${Math.floor(videoProgress).toString().padStart(2, '0')}`}
                  </span>
                  
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="0.1"
                    value={videoProgress}
                    onChange={handleScrub}
                    className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-teal-400 hover:accent-teal-300"
                  />
                  
                  <span className="text-xs font-mono text-stone-400 w-12 shrink-0 text-right">
                    00:30
                  </span>
                </div>

                {/* Control Buttons row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-stone-850">
                  <div className="flex items-center gap-2">
                    {/* Play / Pause */}
                    <button
                      id="video-play-pause-btn"
                      onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                      className="px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow transition cursor-pointer"
                    >
                      {isVideoPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>{sl.pauseVideo}</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>{sl.playVideo}</span>
                        </>
                      )}
                    </button>

                    {/* Reset Loop */}
                    <button
                      id="video-reset-loop-btn"
                      onClick={() => {
                        progressRef.current = 0;
                        setVideoProgress(0);
                      }}
                      title="Rewind"
                      className="p-1.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-stone-600 text-stone-300 hover:text-white transition cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>

                    {/* Speed Selector */}
                    <div className="flex items-center bg-stone-900 rounded-xl p-0.5 border border-stone-800">
                      {[0.5, 1.0, 2.0].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => setPlaybackSpeed(spd)}
                          className={`px-2 py-1 text-[11px] font-mono rounded-lg transition cursor-pointer ${
                            playbackSpeed === spd
                              ? 'bg-teal-700 text-white font-bold'
                              : 'text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sound synthesizer button */}
                  <div className="flex items-center gap-3">
                    <button
                      id="video-sound-effect-btn"
                      onClick={playSnowLeopardSound}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                        audioPlaying
                          ? 'bg-teal-500/20 text-teal-300 border-teal-400 animate-pulse'
                          : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-stone-600'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5 text-teal-400" />
                      <span>{audioPlaying ? '🔊 Аудио идэвхтэй...' : 'Шөнийн салхи & Дуу авиа'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Scientific Annotation Card for Video */}
              <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      ТОСТ ТОСОНБУМБА ТХГ • ТАЙЛБАР
                    </span>
                    <span className="text-xs font-mono text-stone-400">
                      PIR Auto-Trigger Camera Trap #01
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-medium">
                    {sl.videoDesc}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs">
                    <div className="font-bold flex items-center gap-1">
                      <Scan className="w-3.5 h-3.5 text-teal-400" />
                      <span>Ирвэс судлалын баримт</span>
                    </div>
                    <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                      Малчдын хамгааллын сүлжээ
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 📷 CAMERA SITES (INTERACTIVE SPOTTER & LIVE FOOTAGE) */}
          {activeTab === 'photos' && (
            <div>
              {/* Site selector tabs */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {cameraTrapSites.map((site, index) => (
                  <button
                    key={site.id}
                    id={`cam-trap-tab-${site.id}`}
                    onClick={() => {
                      setSelectedSiteIndex(index);
                      setIsSpotted(false);
                    }}
                    className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-xl transition border cursor-pointer ${
                      selectedSiteIndex === index
                        ? 'bg-teal-600 text-white border-teal-400 shadow-md'
                        : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
                    }`}
                  >
                    <span>{`CAM-0${index + 1}: ${getLocalizedText(site.locationName, currentLang).split('(')[0]}`}</span>
                    {site.videoUrl && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse">
                        ● LIVE VIDEO
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Viewfinder Screen (Video for CAM-01 / Photo for other sites) */}
              <div className="relative rounded-2xl overflow-hidden aspect-video max-h-[520px] w-full bg-stone-950 border border-stone-800 shadow-inner group">
                {activeSite.videoUrl ? (
                  <video
                    key={activeSite.videoUrl}
                    src={activeSite.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`w-full h-full object-cover transition duration-700 ${
                      isNightMode
                        ? 'filter contrast-125 brightness-95 grayscale'
                        : 'filter contrast-110 brightness-100'
                    }`}
                  />
                ) : (
                  <img
                    src={isNightMode ? activeSite.nightImg : activeSite.dayImg}
                    alt="Gobi Camera View"
                    className={`w-full h-full object-cover transition duration-700 ${
                      isNightMode
                        ? 'filter grayscale contrast-150 brightness-75 hue-rotate-90'
                        : 'filter contrast-110 brightness-95'
                    }`}
                  />
                )}

                {/* Night Vision Scanlines Overlay */}
                {isNightMode && (
                  <div className="absolute inset-0 bg-emerald-950/20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,255,100,0.1)_50%)] bg-[length:100%_4px] pointer-events-none" />
                )}

                {/* Top Telemetry Overlay */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none text-xs font-mono">
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="font-bold tracking-wider">
                      ● {activeSite.videoUrl ? 'VIDEO STREAM' : 'REC'} [CAM-0{selectedSiteIndex + 1}]
                    </span>
                    <span className="text-stone-400">|</span>
                    <span>{activeSite.coords}</span>
                  </div>

                  <div className="hidden sm:flex items-center gap-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-stone-300 border border-stone-700">
                    <span>Elev: {activeSite.elevation}</span>
                    <span>Temp: {activeSite.temperature}</span>
                  </div>
                </div>

                {/* Bottom Location Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pointer-events-none">
                  <div className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-xs font-medium text-stone-200 border border-stone-800 max-w-md">
                    📍 {getLocalizedText(activeSite.locationName, currentLang)}
                  </div>

                  <div className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-xs text-amber-300 font-semibold border border-amber-500/30">
                    🔭 {getLocalizedText(activeSite.preyContext, currentLang)}
                  </div>
                </div>

                {/* Interactive Leopard Hotspot Target */}
                <div
                  onClick={() => setIsSpotted(true)}
                  style={{
                    top: activeSite.leopardPosition.top,
                    left: activeSite.leopardPosition.left,
                    width: activeSite.leopardPosition.width,
                    height: activeSite.leopardPosition.height,
                  }}
                  className={`absolute cursor-pointer transition-all duration-300 rounded-2xl flex items-center justify-center ${
                    isSpotted
                      ? 'border-2 border-teal-400 bg-teal-500/20 shadow-2xl shadow-teal-500/50'
                      : 'border border-dashed border-white/20 hover:border-teal-400/80 hover:bg-teal-500/10'
                  }`}
                  title="Click to identify camouflaged Snow Leopard"
                >
                  {!isSpotted ? (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 text-white text-xs font-bold border border-teal-400/50 animate-bounce backdrop-blur-md">
                      <Eye className="w-3.5 h-3.5 text-teal-400" />
                      <span>{currentLang === 'mn' ? 'Ирвэсийг илрүүлэх' : 'Spot Leopard'}</span>
                    </div>
                  ) : (
                    <div className="p-2 bg-teal-950/90 rounded-xl border border-teal-400 text-teal-200 text-xs font-mono font-bold flex items-center gap-1.5 shadow-xl">
                      <CheckCircle2 className="w-4 h-4 text-teal-400" />
                      <span>PANTHERA UNCIA DETECTED</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Spotted Information Card when Leopard is found */}
              {isSpotted && (
                <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-teal-950/90 via-stone-900 to-stone-900 border border-teal-500/50 shadow-xl animate-fade-in flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400 shrink-0 mt-0.5">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-teal-400 tracking-wider uppercase mb-0.5">
                        {sl.spotSuccess}
                      </div>
                      <p className="text-stone-200 text-xs sm:text-sm font-medium">
                        {getLocalizedText(activeSite.spottedBioNote, currentLang)}
                      </p>
                    </div>
                  </div>

                  <button
                    id="reset-trap-btn"
                    onClick={() => {
                      setSelectedSiteIndex((selectedSiteIndex + 1) % cameraTrapSites.length);
                    }}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer whitespace-nowrap"
                  >
                    {sl.resetTrap} →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 4 KEY EVOLUTIONARY SUPERPOWERS */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl font-normal text-stone-900 mb-2">
              {sl.adaptationTitle}
            </h3>
            <p className="font-['Cormorant_Garamond',serif] italic text-lg text-stone-600 font-light">
              Говь, хадан хавцлын -40°C-аас +40°C хүртэлх эрс тэс уур амьсгалд зохицсон байгалийн төгс бүтээл
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Paws */}
            <div className="p-6 bg-white border border-stone-200/80 shadow-sm hover:shadow-md transition group text-stone-900">
              <div className="w-10 h-10 bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-800 mb-4 group-hover:scale-105 transition">
                <span className="text-xl">🐾</span>
              </div>
              <h4 className="font-['Cormorant_Garamond',serif] text-xl font-medium text-stone-900 mb-2">
                {sl.adaptPawsTitle}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                {sl.adaptPawsDesc}
              </p>
            </div>

            {/* Tail */}
            <div className="p-6 bg-white border border-stone-200/80 shadow-sm hover:shadow-md transition group text-stone-900">
              <div className="w-10 h-10 bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-800 mb-4 group-hover:scale-105 transition">
                <span className="text-xl">🧣</span>
              </div>
              <h4 className="font-['Cormorant_Garamond',serif] text-xl font-medium text-stone-900 mb-2">
                {sl.adaptTailTitle}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                {sl.adaptTailDesc}
              </p>
            </div>

            {/* Nose */}
            <div className="p-6 bg-white border border-stone-200/80 shadow-sm hover:shadow-md transition group text-stone-900">
              <div className="w-10 h-10 bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-800 mb-4 group-hover:scale-105 transition">
                <span className="text-xl">🫁</span>
              </div>
              <h4 className="font-['Cormorant_Garamond',serif] text-xl font-medium text-stone-900 mb-2">
                {sl.adaptNoseTitle}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                {sl.adaptNoseDesc}
              </p>
            </div>

            {/* Camouflage */}
            <div className="p-6 bg-white border border-stone-200/80 shadow-sm hover:shadow-md transition group text-stone-900">
              <div className="w-10 h-10 bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-800 mb-4 group-hover:scale-105 transition">
                <span className="text-xl">🪨</span>
              </div>
              <h4 className="font-['Cormorant_Garamond',serif] text-xl font-medium text-stone-900 mb-2">
                {sl.adaptCamouflageTitle}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                {sl.adaptCamouflageDesc}
              </p>
            </div>
          </div>
        </div>

        {/* COMMUNITY & RANGER ALLIANCE CTA */}
        <div className="bg-[#FAF9F5] border border-stone-300 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm text-stone-900">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 uppercase tracking-widest mb-2">
              <HeartHandshake className="w-4 h-4 text-stone-800" />
              <span>{sl.rangerSupportTitle}</span>
            </div>
            <h3 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl font-normal text-stone-900 mb-2">
              {currentLang === 'mn' ? 'Өв соёл ба Байгаль хамгаалал хамтдаа' : 'Living Heritage & Wildlife Conservation'}
            </h3>
            <p className="font-['Cormorant_Garamond',serif] italic text-base text-stone-600 leading-relaxed font-light">
              {sl.rangerSupportDesc}
            </p>
          </div>

          <button
            id="leopard-expedition-join-btn"
            onClick={onOpenBooking}
            className="flex items-center gap-3 px-8 py-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-[0.25em] shadow-sm transition cursor-pointer whitespace-nowrap"
          >
            <Compass className="w-4 h-4" />
            <span>{sl.rangerSupportBtn}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
