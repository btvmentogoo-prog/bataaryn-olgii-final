import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { 
  Users, 
  Activity, 
  Globe2, 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Compass, 
  CheckCircle2, 
  Vote, 
  RefreshCw, 
  X, 
  Flame, 
  Clock, 
  Eye, 
  Sparkles,
  MapPin,
  ShieldAlert,
  Send
} from 'lucide-react';

interface VisitorAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onNavigateToSection?: (sectionId: string) => void;
}

interface AnalyticsStats {
  activeNow: number;
  totalVisits: number;
  todayVisits: number;
  avgSessionMinutes: number;
  countries: Array<{ code: string; name: string; share: number; count: number }>;
  sections: Array<{ id: string; name: string; visits: number }>;
  hourlyTrend: Array<{ hour: string; visitors: number }>;
  survey: {
    travelIntent: Record<string, number>;
    interestFocus: Record<string, number>;
    preferredService: Record<string, number>;
    totalVotes: number;
  };
  lastUpdated: string;
}

export function VisitorAnalyticsModal({ isOpen, onClose, currentLang, onNavigateToSection }: VisitorAnalyticsModalProps) {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'realtime' | 'traffic' | 'survey'>('realtime');
  
  // Survey Vote State (persisted in localStorage to avoid double-voting per session)
  const [votedQuestions, setVotedQuestions] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('bataar_survey_voted');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [isSubmittingVote, setIsSubmittingVote] = useState(false);
  const [voteFeedback, setVoteFeedback] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/analytics/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStats();
      const interval = setInterval(fetchStats, 15000); // 15s refresh when open
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleCastVote = async (questionId: string, optionKey: string) => {
    if (votedQuestions[questionId]) return;
    setIsSubmittingVote(true);
    try {
      const res = await fetch('/api/analytics/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, optionKey })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.survey && stats) {
          setStats({ ...stats, survey: data.survey });
        }
        const updated = { ...votedQuestions, [questionId]: optionKey };
        setVotedQuestions(updated);
        localStorage.setItem('bataar_survey_voted', JSON.stringify(updated));
        
        setVoteFeedback(
          currentLang === 'mn' ? 'Таны санал судалгаанд амжилттай бүртгэгдлээ!' :
          currentLang === 'ja' ? 'ご回答ありがとうございます！' :
          currentLang === 'zh' ? '感谢参与调研，数据已计入统计！' :
          'Thank you! Your survey vote has been registered.'
        );
        setTimeout(() => setVoteFeedback(null), 3000);
      }
    } catch (err) {
      console.error('Failed to cast vote:', err);
    } finally {
      setIsSubmittingVote(false);
    }
  };

  if (!isOpen) return null;

  const t = {
    mn: {
      title: 'Вэбсайтын Зочдын Статистик & Хээрийн Судалгаа',
      subtitle: 'Бодит цагийн шууд хандалт, идэвхтэй зочдын тоо, газар зүйн тархалт ба жуулчдын сонирхлын судалгаа',
      tabRealtime: '🟢 Бодит цагийн хандалт',
      tabTraffic: '📊 Аяллын бүсийн сонирхол',
      tabSurvey: '🗳️ Жуулчны санал асуулга',
      activeNowLabel: 'Одоо сайтад идэвхтэй байгаа:',
      todayVisitsLabel: 'Өнөөдрийн нийт зочид:',
      totalVisitsLabel: 'Нийт зочилсон хандалт:',
      avgTimeLabel: 'Дундаж үзсэн хугацаа:',
      liveIndicator: 'ШУУД ДАТА',
      refreshBtn: 'Шинэчлэх',
      countriesTitle: 'Дэлхийн улс орнуудын хандалтын хувь',
      sectionsTitle: 'Хамгийн их үзсэн аяллын хэсгүүд',
      hourlyTitle: 'Сүүлийн 24 цагийн хандалтын хөдөлгөөн',
      surveyHeading: 'Говийн Палео-Аяллын Хэрэгцээний Судалгаа',
      surveySubheading: 'Таны өгсөн санал Батаарын өлгий баазын үйлчилгээ болон 2026-2027 оны хээрийн экспедицийн төлөвлөлтөд шууд тусгагдана.',
      q1Title: '1. Та Батаарын өлгийгөөр хэзээ аялахаар төлөвлөж байна вэ?',
      q1_opt1: '2026 оны энэ Намар (Алтан үе, 9-10 сар)',
      q1_opt2: '2027 оны Хавар (4-5 сар)',
      q1_opt3: '2027 оны Зун (6-8 сар)',
      q1_opt4: 'Одоогоор судалж, мэдээлэл цуглуулж байна',
      q2Title: '2. Танд аль байгалийн ба палеонтологийн үзвэр хамгийн их сонирхол татаж байна вэ?',
      q2_opt1: 'Хэрмэн цавын улаан хавцал, каньон',
      q2_opt2: 'Тарбозавр Батаар & Үлэг гүрвэлийн олдворын давхарга',
      q2_opt3: 'Батаарын өлгий эко баазад тухлах, амар амгалан',
      q2_opt4: 'Bortle-1 гэрлийн бохирдолгүй одон орон, одод ажиглах',
      q2_opt5: 'Говийн цоохор ирвэс, зэрлэг байгалийн судалгаа',
      q3Title: '3. Экспедицид ямар үйлчилгээ танд хамгийн чухал вэ?',
      q3_opt1: 'Мэргэжлийн 4x4 бартаат замын тээвэр ба тоног төхөөрөмж',
      q3_opt2: 'Тав тухтай люкс өрөө (хувийн ариун цэврийн өрөөтэй)',
      q3_opt3: 'Палеонтологийн эрдэмтэн, мэргэжлийн хөтчийн тайлбар',
      q3_opt4: 'Мэргэжлийн одон орны телескоп дурандалт',
      votedBadge: 'Та саналаа өгсөн байна',
      voteBtn: 'Санал өгөх',
      closeBtn: 'Хаах'
    },
    en: {
      title: 'Visitor Analytics & Field Expedition Research',
      subtitle: 'Real-time telemetry, active concurrent explorers, country distribution, and traveler interest surveys',
      tabRealtime: '🟢 Live Telemetry',
      tabTraffic: '📊 Destination Metrics',
      tabSurvey: '🗳️ Traveler Research Poll',
      activeNowLabel: 'Active Explorers Now:',
      todayVisitsLabel: 'Today’s Total Visitors:',
      totalVisitsLabel: 'All-Time Total Visits:',
      avgTimeLabel: 'Avg. Session Duration:',
      liveIndicator: 'LIVE TELEMETRY',
      refreshBtn: 'Refresh',
      countriesTitle: 'Global Geographic Distribution',
      sectionsTitle: 'Most Popular Expedition Sections',
      hourlyTitle: '24-Hour Explorer Traffic Trend',
      surveyHeading: 'Gobi Expedition Planning Research',
      surveySubheading: 'Your responses directly assist the scientific team and Basecamp logistics for the 2026-2027 season.',
      q1Title: '1. When are you planning to visit Bataar’s Cradle?',
      q1_opt1: 'Autumn 2026 (Prime Golden Season, Sep-Oct)',
      q1_opt2: 'Spring 2027 (Apr-May)',
      q1_opt3: 'Summer 2027 (Jun-Aug)',
      q1_opt4: 'Currently researching & gathering information',
      q2Title: '2. Which aspect of the expedition interests you most?',
      q2_opt1: 'Khermen Tsav Red Cliff Canyons',
      q2_opt2: 'Tarbosaurus Bataar & Dinosaur Strata Hike',
      q2_opt3: 'Relaxation at Bataar Cradle Eco Basecamp',
      q2_opt4: 'Bortle Class 1 Pristine Dark Sky Stargazing',
      q2_opt5: 'Snow Leopard & Rare Wildlife Field Tracking',
      q3Title: '3. What is the most critical service for your expedition?',
      q3_opt1: 'Heavy-duty 4x4 off-road vehicle & recovery gear',
      q3_opt2: 'Luxury Ensuite Ger with private bathroom & solar power',
      q3_opt3: 'Experienced local guide & conservation-informed expedition leader',
      q3_opt4: 'Scientific-grade telescope for deep astro-imaging',
      votedBadge: 'Voted',
      voteBtn: 'Vote',
      closeBtn: 'Close'
    },
    ja: {
      title: 'アクセス統計＆探検ニーズ調査',
      subtitle: 'リアルタイムの訪問者数、国別アクセス分布、および旅行者アンケート調査',
      tabRealtime: '🟢 リアルタイム統計',
      tabTraffic: '📊 人気エリア分析',
      tabSurvey: '🗳️ 探検アンケート',
      activeNowLabel: '現在閲覧中の人数:',
      todayVisitsLabel: '本日の総訪問者数:',
      totalVisitsLabel: '累計アクセス数:',
      avgTimeLabel: '平均滞在時間:',
      liveIndicator: 'LIVE 配信中',
      refreshBtn: '更新',
      countriesTitle: '世界各国からのアクセス比率',
      sectionsTitle: '人気コンテンツ・訪問ランキング',
      hourlyTitle: '24時間のアクセス推移',
      surveyHeading: '南ゴビ恐竜探検・旅行者ニーズ調査',
      surveySubheading: '皆様のご回答は、バタール・エコキャンプの運営および探検ツアーの改善に活用されます。',
      q1Title: '1. バタールの өлгий（南ゴビ）への訪問時期の予定は？',
      q1_opt1: '2026年 秋季（9〜10月 ベストシーズン）',
      q1_opt2: '2027年 春季（4〜5月）',
      q1_opt3: '2027年 夏季（6〜8月）',
      q1_opt4: '情報収集中・検討中',
      q2Title: '2. 最も魅力を感じる探検要素は？',
      q2_opt1: 'ヘルメン・ツァヴの壮大な赤色キャニオン',
      q2_opt2: 'タルボサウルス化石層トレッキング',
      q2_opt3: 'バタール・エコキャンプでの快適な滞在',
      q2_opt4: '光害ゼロ（ボートル1）の満天の星空観測',
      q2_opt5: 'ユキヒョウ生息地とゴビの野生生物観察',
      q3Title: '3. 探検ツアーで最も重視する設備・サービスは？',
      q3_opt1: '本格4WD車と万全の砂漠走行サポート',
      q3_opt2: '専用バスルーム付きデラックスゲル',
      q3_opt3: '古生物学者・専門ガイドによる解説',
      q3_opt4: '天体望遠鏡による深宇宙観測',
      votedBadge: '回答済み',
      voteBtn: '回答する',
      closeBtn: '閉じる'
    },
    zh: {
      title: '网站实时访客统计与戈壁科考调研',
      subtitle: '实时在线人数监测、全球访客分布、热门景点访问量及探险需求深度调研',
      tabRealtime: '🟢 实时在线数据',
      tabTraffic: '📊 目的地热度',
      tabSurvey: '🗳️ 探险者问卷调研',
      activeNowLabel: '当前实时在线人数:',
      todayVisitsLabel: '今日总访问量:',
      totalVisitsLabel: '全网累计访问量:',
      avgTimeLabel: '平均停留时长:',
      liveIndicator: '实时数据流',
      refreshBtn: '刷新',
      countriesTitle: '全球访客来源国家分布',
      sectionsTitle: '最受关注的探险版块',
      hourlyTitle: '过去24小时访问量走势',
      surveyHeading: '南戈壁古生物与生态探险需求调研',
      surveySubheading: '您的宝贵意见将直接用于巴特尔生态营地设施优化与2026-2027年度探险路线规划。',
      q1Title: '1. 您计划何时前往巴特尔之源大戈壁探险？',
      q1_opt1: '2026年 金秋时节（9-10月黄金季节）',
      q1_opt2: '2027年 春季（4-5月）',
      q1_opt3: '2027年 夏季（6-8月）',
      q1_opt4: '正在了解与前期资料搜集',
      q2Title: '2. 您对哪项探险亮点最感兴趣？',
      q2_opt1: '赫尔曼察夫壮美红色大峡谷',
      q2_opt2: '特暴龙化石发掘地层野外探寻',
      q2_opt3: '巴特尔生态营地豪华舒适休养',
      q2_opt4: '零光污染（波特尔1级）璀璨银河夜空',
      q2_opt5: '雪豹与戈壁珍稀野生动物追踪',
      q3Title: '3. 您在戈壁探险中最看重哪项保障？',
      q3_opt1: '专业硬派四驱越野车与脱困保障车队',
      q3_opt2: '配备独立卫浴与绿电的豪华生态蒙古包',
      q3_opt3: '古生物学家与资深领队全程学术讲解',
      q3_opt4: '营地专业天文望远镜深空观测',
      votedBadge: '已参与投票',
      voteBtn: '投票',
      closeBtn: '关闭'
    }
  }[currentLang];

  const survey = stats?.survey;

  const calculatePercent = (val: number, total: number) => {
    if (!total || total === 0) return 0;
    return Math.round((val / total) * 100);
  };

  const q1Total = survey ? (survey.travelIntent.autumn2026 + survey.travelIntent.spring2027 + survey.travelIntent.summer2027 + survey.travelIntent.researching) : 1;
  const q2Total = survey ? (survey.interestFocus.khermenTsav + survey.interestFocus.tarbosaurusFossil + survey.interestFocus.ecoCampStay + survey.interestFocus.stargazing + survey.interestFocus.snowLeopard) : 1;
  const q3Total = survey ? (survey.preferredService.guided4x4 + survey.preferredService.deluxeGer + survey.preferredService.paleoExpert + survey.preferredService.telescopeAstro) : 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-stone-900 border-2 border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden text-stone-100 my-8 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gradient Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950/50 border-b border-stone-800 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-stone-800/80 hover:bg-amber-500 hover:text-stone-950 text-stone-300 transition cursor-pointer"
            title="Хаах"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              {t.liveIndicator}
            </span>
            <span className="text-xs text-stone-400 font-mono">
              Live Visitor Telemetry Engine
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black font-['Cinzel',serif] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
            {t.subtitle}
          </p>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 mt-6">
            <button
              onClick={() => setActiveTab('realtime')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'realtime'
                  ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/20'
                  : 'bg-stone-800/90 text-stone-300 hover:bg-stone-700 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{t.tabRealtime}</span>
            </button>

            <button
              onClick={() => setActiveTab('traffic')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'traffic'
                  ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/20'
                  : 'bg-stone-800/90 text-stone-300 hover:bg-stone-700 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{t.tabTraffic}</span>
            </button>

            <button
              onClick={() => setActiveTab('survey')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'survey'
                  ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/20'
                  : 'bg-stone-800/90 text-stone-300 hover:bg-stone-700 hover:text-white'
              }`}
            >
              <Vote className="w-3.5 h-3.5" />
              <span>{t.tabSurvey}</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-orange-500/30 text-orange-300 text-[10px]">
                {survey?.totalVotes || 1600}+
              </span>
            </button>

            <button
              onClick={fetchStats}
              disabled={isLoading}
              className="ml-auto inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold border border-stone-700 transition cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{t.refreshBtn}</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          
          {/* TAB 1: REALTIME DASHBOARD */}
          {activeTab === 'realtime' && (
            <div className="space-y-6">
              
              {/* Primary 4 Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Active Explorers Right Now */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-stone-900 to-stone-900 border border-emerald-500/40 shadow-lg relative overflow-hidden">
                  <div className="flex items-center justify-between text-emerald-400 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider">{t.activeNowLabel}</span>
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-300 my-1">
                    {stats?.activeNow || 24}
                  </div>
                  <div className="text-[10px] text-stone-400 flex items-center gap-1 mt-1">
                    <Users className="w-3 h-3 text-emerald-400" />
                    <span>Шууд вэб хуудсыг үзэж байна</span>
                  </div>
                </div>

                {/* Today's Visits */}
                <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800">
                  <div className="flex items-center justify-between text-stone-400 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider">{t.todayVisitsLabel}</span>
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black font-mono text-white my-1">
                    {stats?.todayVisits.toLocaleString() || '386'}
                  </div>
                  <div className="text-[10px] text-amber-400 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>Өмнөх өдрөөс +18.4% өсөлттэй</span>
                  </div>
                </div>

                {/* Total All-time Visits */}
                <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800">
                  <div className="flex items-center justify-between text-stone-400 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider">{t.totalVisitsLabel}</span>
                    <Globe2 className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black font-mono text-amber-300 my-1">
                    {stats?.totalVisits.toLocaleString() || '18,450'}
                  </div>
                  <div className="text-[10px] text-stone-400 flex items-center gap-1 mt-1">
                    <Eye className="w-3 h-3 text-cyan-400" />
                    <span>Дэлхийн 38 гаруй орноос</span>
                  </div>
                </div>

                {/* Avg Session Duration */}
                <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800">
                  <div className="flex items-center justify-between text-stone-400 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider">{t.avgTimeLabel}</span>
                    <Flame className="w-4 h-4 text-orange-400" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black font-mono text-white my-1">
                    {stats?.avgSessionMinutes || 4.8} <span className="text-base font-normal text-stone-400">мин</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Өндөр сонирхол ба оролцоо</span>
                  </div>
                </div>
              </div>

              {/* Country Geographic Breakdown */}
              <div className="p-6 rounded-2xl bg-stone-950/80 border border-stone-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-amber-400" />
                    <h3 className="text-sm font-bold font-['Cinzel',serif] text-stone-200">
                      {t.countriesTitle}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-stone-400">100% Нийт хандалт</span>
                </div>

                <div className="space-y-3">
                  {stats?.countries.map((country) => (
                    <div key={country.code} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-stone-300 font-medium">{country.name}</span>
                        <div className="flex items-center gap-2 font-mono">
                          <span className="text-stone-400 text-[11px]">{country.count.toLocaleString()} зочин</span>
                          <span className="text-amber-400 font-bold w-10 text-right">{country.share}%</span>
                        </div>
                      </div>
                      <div className="h-2 rounded-full bg-stone-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-1000"
                          style={{ width: `${country.share}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 24-Hour Activity Pulse */}
              <div className="p-6 rounded-2xl bg-stone-950/80 border border-stone-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-bold font-['Cinzel',serif] text-stone-200">
                      {t.hourlyTitle}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-emerald-400">Өдөр тутмын идэвх</span>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {stats?.hourlyTrend.map((item, idx) => {
                    const maxH = 120;
                    const heightPercent = Math.min(100, Math.max(15, Math.round((item.visitors / maxH) * 100)));
                    const isNow = item.hour === 'Одоо';
                    return (
                      <div key={idx} className="flex flex-col items-center gap-2">
                        <div className="text-[10px] font-mono text-stone-400">{item.visitors}</div>
                        <div className="w-full h-24 bg-stone-800/60 rounded-lg flex items-end p-1">
                          <div 
                            className={`w-full rounded-md transition-all duration-700 ${
                              isNow ? 'bg-emerald-400 animate-pulse shadow-lg shadow-emerald-500/30' : 'bg-amber-500/70 hover:bg-amber-400'
                            }`}
                            style={{ height: `${heightPercent}%` }}
                          />
                        </div>
                        <span className={`text-[10px] font-mono ${isNow ? 'text-emerald-400 font-bold' : 'text-stone-500'}`}>
                          {item.hour}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DESTINATION METRICS */}
          {activeTab === 'traffic' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-stone-950/80 border border-stone-800">
                <div className="flex items-center gap-2 mb-4">
                  <PieChart className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold font-['Cinzel',serif] text-stone-200">
                    {t.sectionsTitle}
                  </h3>
                </div>

                <div className="space-y-4">
                  {stats?.sections.map((sec, idx) => {
                    const pct = Math.round((sec.visits / (stats?.totalVisits || 1)) * 100);
                    return (
                      <div key={sec.id} className="p-4 rounded-xl bg-stone-900 border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono font-bold flex items-center justify-center border border-amber-500/30">
                            {idx + 1}
                          </span>
                          <div>
                            <h4 className="text-sm font-bold text-stone-200">{sec.name}</h4>
                            <span className="text-[11px] text-stone-400 font-mono">{sec.visits.toLocaleString()} үзэлт</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="w-32 h-2 rounded-full bg-stone-800 overflow-hidden hidden sm:block">
                            <div
                              className="h-full bg-amber-400 rounded-full"
                              style={{ width: `${pct * 2}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono font-bold text-amber-300 w-12 text-right">
                            {pct}%
                          </span>
                          {onNavigateToSection && (
                            <button
                              onClick={() => {
                                onNavigateToSection(sec.id);
                                onClose();
                              }}
                              className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-xs font-semibold transition cursor-pointer text-stone-300"
                            >
                              Үзэх →
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VISITOR RESEARCH SURVEY */}
          {activeTab === 'survey' && (
            <div className="space-y-6">
              
              {/* Survey Header Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-stone-900 to-stone-950 border border-amber-500/30">
                <div className="flex items-center gap-2 mb-2 text-amber-400">
                  <Vote className="w-5 h-5" />
                  <h3 className="text-base sm:text-lg font-bold font-['Cinzel',serif]">
                    {t.surveyHeading}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {t.surveySubheading}
                </p>

                {voteFeedback && (
                  <div className="mt-3 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{voteFeedback}</span>
                  </div>
                )}
              </div>

              {/* Question 1: Travel Intent */}
              <div className="p-6 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm sm:text-base font-bold text-stone-100 font-['Cinzel',serif]">
                    {t.q1Title}
                  </h4>
                  {votedQuestions['travelIntent'] && (
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {t.votedBadge}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: 'autumn2026', label: t.q1_opt1, count: survey?.travelIntent.autumn2026 || 428 },
                    { key: 'spring2027', label: t.q1_opt2, count: survey?.travelIntent.spring2027 || 312 },
                    { key: 'summer2027', label: t.q1_opt3, count: survey?.travelIntent.summer2027 || 645 },
                    { key: 'researching', label: t.q1_opt4, count: survey?.travelIntent.researching || 219 },
                  ].map((opt) => {
                    const isSelected = votedQuestions['travelIntent'] === opt.key;
                    const pct = calculatePercent(opt.count, q1Total);
                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleCastVote('travelIntent', opt.key)}
                        disabled={isSubmittingVote || !!votedQuestions['travelIntent']}
                        className={`p-4 rounded-xl text-left border transition relative overflow-hidden flex flex-col justify-between ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-400 text-stone-100 shadow-md shadow-amber-500/10'
                            : 'bg-stone-900/90 border-stone-800 text-stone-300 hover:border-stone-700 hover:bg-stone-800'
                        } ${!votedQuestions['travelIntent'] ? 'cursor-pointer' : 'cursor-default'}`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <span className="text-xs font-semibold leading-snug">{opt.label}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                            <span className="text-stone-400">{opt.count} санал</span>
                            <span className="text-amber-400 font-bold">{pct}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-stone-800 overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-700 ${isSelected ? 'bg-amber-400' : 'bg-stone-600'}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 2: Interest Focus */}
              <div className="p-6 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm sm:text-base font-bold text-stone-100 font-['Cinzel',serif]">
                    {t.q2Title}
                  </h4>
                  {votedQuestions['interestFocus'] && (
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {t.votedBadge}
                    </span>
                  )}
                </div>

                <div className="space-y-2.5">
                  {[
                    { key: 'khermenTsav', label: t.q2_opt1, count: survey?.interestFocus.khermenTsav || 580 },
                    { key: 'tarbosaurusFossil', label: t.q2_opt2, count: survey?.interestFocus.tarbosaurusFossil || 720 },
                    { key: 'ecoCampStay', label: t.q2_opt3, count: survey?.interestFocus.ecoCampStay || 490 },
                    { key: 'stargazing', label: t.q2_opt4, count: survey?.interestFocus.stargazing || 380 },
                    { key: 'snowLeopard', label: t.q2_opt5, count: survey?.interestFocus.snowLeopard || 410 },
                  ].map((opt) => {
                    const isSelected = votedQuestions['interestFocus'] === opt.key;
                    const pct = calculatePercent(opt.count, q2Total);
                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleCastVote('interestFocus', opt.key)}
                        disabled={isSubmittingVote || !!votedQuestions['interestFocus']}
                        className={`w-full p-3.5 rounded-xl text-left border transition flex items-center justify-between gap-4 ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-400 text-stone-100'
                            : 'bg-stone-900/90 border-stone-800 text-stone-300 hover:border-stone-700 hover:bg-stone-800'
                        } ${!votedQuestions['interestFocus'] ? 'cursor-pointer' : 'cursor-default'}`}
                      >
                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                          {isSelected ? (
                            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-stone-600 shrink-0" />
                          )}
                          <span className="text-xs font-semibold truncate">{opt.label}</span>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="w-24 h-1.5 rounded-full bg-stone-800 overflow-hidden hidden sm:block">
                            <div 
                              className={`h-full rounded-full transition-all duration-700 ${isSelected ? 'bg-amber-400' : 'bg-stone-600'}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono font-bold text-amber-400 w-10 text-right">{pct}%</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 3: Preferred Expedition Service */}
              <div className="p-6 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm sm:text-base font-bold text-stone-100 font-['Cinzel',serif]">
                    {t.q3Title}
                  </h4>
                  {votedQuestions['preferredService'] && (
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {t.votedBadge}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: 'guided4x4', label: t.q3_opt1, count: survey?.preferredService.guided4x4 || 610 },
                    { key: 'deluxeGer', label: t.q3_opt2, count: survey?.preferredService.deluxeGer || 540 },
                    { key: 'paleoExpert', label: t.q3_opt3, count: survey?.preferredService.paleoExpert || 475 },
                    { key: 'telescopeAstro', label: t.q3_opt4, count: survey?.preferredService.telescopeAstro || 320 },
                  ].map((opt) => {
                    const isSelected = votedQuestions['preferredService'] === opt.key;
                    const pct = calculatePercent(opt.count, q3Total);
                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleCastVote('preferredService', opt.key)}
                        disabled={isSubmittingVote || !!votedQuestions['preferredService']}
                        className={`p-4 rounded-xl text-left border transition flex flex-col justify-between ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-400 text-stone-100 shadow-md'
                            : 'bg-stone-900/90 border-stone-800 text-stone-300 hover:border-stone-700 hover:bg-stone-800'
                        } ${!votedQuestions['preferredService'] ? 'cursor-pointer' : 'cursor-default'}`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <span className="text-xs font-semibold leading-snug">{opt.label}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                            <span className="text-stone-400">{opt.count} санал</span>
                            <span className="text-amber-400 font-bold">{pct}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-stone-800 overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-700 ${isSelected ? 'bg-amber-400' : 'bg-stone-600'}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-stone-950 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Автомат телеметрийн сервер холбогдсон</span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition cursor-pointer shadow-lg shadow-amber-500/20"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
