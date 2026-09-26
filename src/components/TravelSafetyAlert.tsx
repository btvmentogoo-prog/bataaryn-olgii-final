import React, { useState } from 'react';
import { Language } from '../types';
import { 
  AlertTriangle, 
  X, 
  Sun, 
  Compass, 
  Droplets, 
  Phone, 
  ShieldAlert, 
  FileText, 
  Flame, 
  Radio, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Printer
} from 'lucide-react';

interface TravelSafetyAlertProps {
  currentLang: Language;
  onOpenBooking?: () => void;
  externalModalOpen?: boolean;
  onCloseExternalModal?: () => void;
  hideFloatingBtn?: boolean;
}

export function TravelSafetyAlert({ 
  currentLang, 
  onOpenBooking,
  externalModalOpen,
  onCloseExternalModal,
  hideFloatingBtn = false,
}: TravelSafetyAlertProps) {
  const [internalModalOpen, setInternalModalOpen] = useState(false);
  const [isTickerDismissed, setIsTickerDismissed] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const isModalActive = externalModalOpen !== undefined ? externalModalOpen : internalModalOpen;
  const setModalOpen = (open: boolean) => {
    if (!open && onCloseExternalModal) {
      onCloseExternalModal();
    }
    setInternalModalOpen(open);
  };

  const t = {
    mn: {
      tickerBadge: '🚨 САНАЖ ЯВБАЛ ЗОХИХ ЗҮЙЛС',
      tickerSub: 'Хэрмэн цав & Говийн хээрийн аяллын онцгой анхааруулга',
      openBtn: 'Дэлгэрэнгүй зөвлөмж',
      closeTooltip: 'Анхааруулгыг хаах',
      floatingBtn: 'Аяллын санамж & Анхааруулга',
      modalTitle: 'Санаж явбал зохих зүйлс',
      modalSubtitle: 'Хэрмэн цав, Нэмэгтийн хоолой, Алтан уул чиглэлийн аяллын аюулгүй байдлын онцгой зөвлөмж',
      sourceBadge: 'FactCheck • Хээрийн аюулгүй байдлын мэдээлэл',
      warning1Title: 'Цаг агаар, дулааны эрсдэл & Дэд бүтэц',
      warning1Text: 'Хэрмэн цав нь зуны улиралд өдөртөө +40°C давж халах бөгөөд замын дийлэнх хэсэг нь бартаат, элсэрхэг, хүний хөлөөс зайдуу, ундны ус хомс, утасны сүлжээ барихгүй гэх зэрэг танаас багагүй зориг зүрх, хариуцлагатай бэлтгэл шаардах вий.',
      warning2Title: 'Хавцлын төөрөлт & "Үхлийн хөндий"',
      warning2Text: 'Олон салаа хавцалтай учир хөтөчгүйгээр гүн рүү нь зүтгэх нь төөрөхөөс гадна, нутгийнхны нэрлэж заншсанаар "Үхлийн хөндий" гэх нэрийнх нь утгыг биеэрээ мэдрэх эрсдэлтэйг анхааруулъя.',
      checklistTitle: 'Хээрийн аялалд заавал бэлтгэх зүйлс:',
      item1: 'Ундны усны нөөц: 1 хүнд хоногт дор хаяж 5-6 литр цэвэр ундны ус + эрдэст ундаа',
      item2: 'Навигаци ба холбоо: Офлайн GPS (Maps.me, GPX), хиймэл дагуулын байршил тогтоогч / Garmin',
      item3: 'Тээврийн хэрэгсэл: 4x4 бүрэн хөтлөгч, 2 ширхэг сэлбэг дугуй, элсний трап, компрессор, хүрз',
      item4: 'Мэргэжлийн хөтөч: Олон салаа гүн хавцал руу зөвхөн орон нутгийн мэргэшсэн хөтөчтэй орох',
      item5: 'Хууль хамгаалалт: Палеонтологийн олдворыг дур мэдэн хөндөх, ухаж зөөхийг хуулиар хатуу хориглоно',
      hotlineTitle: 'Баазын шуурхай дугаар & Холбоо барих:',
      emergencyTitle: 'Улсын онцгой байдал:',
      printBtn: 'Зөвлөмж хэвлэх / хадгалах',
      contactBtn: 'Баазын хөтөч & Захиалга',
      closeBtn: 'Хаах'
    },
    en: {
      tickerBadge: '🚨 EXPEDITION SAFETY ADVISORY',
      tickerSub: 'Crucial Field Precautions for Khermen Tsav & Gobi Canyons',
      openBtn: 'View Safety Details',
      closeTooltip: 'Dismiss banner',
      floatingBtn: 'Travel Safety Advisory',
      modalTitle: 'Crucial Things to Keep in Mind',
      modalSubtitle: 'Official Travel & Field Safety Advisory for Khermen Tsav, Nemegt Basin & Western Gobi',
      sourceBadge: 'FactCheck • Verified Field Advisory',
      warning1Title: 'Extreme Heat (+40°C) & Remote Wilderness',
      warning1Text: 'During the summer months, temperatures at Khermen Tsav exceed +40°C (104°F). Most routes consist of rugged, remote sand tracks with zero mobile cellular coverage, far from settlements and with no natural drinking water sources. This demands serious courage and meticulous preparation.',
      warning2Title: 'Labyrinthine Canyons & The "Valley of Death"',
      warning2Text: 'Due to hundreds of intricate, branching labyrinth canyons, venturing deep without an experienced local guide carries severe risks of getting lost, exposing travelers to what locals historically call the "Valley of Death".',
      checklistTitle: 'Essential Expedition Checklist:',
      item1: 'Drinking Water: Minimum 5-6 Liters per person/day + electrolyte hydration salts',
      item2: 'Navigation: Offline satellite GPS maps (Maps.me / Garmin inReach satellite communicator)',
      item3: 'Vehicle: High-clearance 4WD expedition vehicle, 2 spare tires, sand recovery tracks, tire compressor & shovel',
      item4: 'Certified Guide: Never explore deep slot canyons alone without our experienced nomadic rangers',
      item5: 'Heritage Protection: Strictly prohibited by Mongolian law to disturb or excavate dinosaur fossils',
      hotlineTitle: 'Camp Emergency & Hotline:',
      emergencyTitle: 'National Emergency:',
      printBtn: 'Print / Save Advisory',
      contactBtn: 'Contact Basecamp Guides',
      closeBtn: 'Close'
    },
    ja: {
      tickerBadge: '🚨 ゴビ遠征・安全注意事項',
      tickerSub: 'ヘルメン・ツァヴおよびゴビ峡谷探検における重要注意事項',
      openBtn: '詳細安全情報を見る',
      closeTooltip: '閉じる',
      floatingBtn: '安全注意事項',
      modalTitle: '旅の安全心得と注意事項',
      modalSubtitle: 'ヘルメン・ツァヴ、ネメグト盆地探検のための公式安全ガイドライン',
      sourceBadge: 'FactCheck • 現地公式安全ガイダンス',
      warning1Title: '日中+40℃超の酷暑と過酷な砂漠環境',
      warning1Text: '夏季のヘルメン・ツァヴは日中気温が+40℃を超え、道路の大部分は悪路や砂地です。携帯電話の電波が一切届かず、飲料水の補給も困難な無人地帯のため、万全な装備と責任ある準備が必須となります。',
      warning2Title: '迷路のような複雑な峡谷と「死の谷」',
      warning2Text: '幾筋にも分岐する深い峡谷のため、熟練ガイドを伴わずに奥深くへ侵入することは遭難の危険が極めて高く、現地で「死の谷」と呼ばれる過酷なリスクに直面します。',
      checklistTitle: '必須携行品・事前準備チェックリスト：',
      item1: '飲料水：1人1日あたり最低5〜6Lの清潔な水と電解質補給飲料',
      item2: 'ナビゲーション：圏外対応オフラインGPS（Garmin、Maps.me）、衛星通信機',
      item3: '車両装備：4WD車、スペアタイヤ2本、スタック脱出用サンドラダー、空気圧調整器、スコップ',
      item4: '専任ガイド：深い迷路峡谷への立ち入りは必ず当キャンプ専属ガイドが同行すること',
      item5: '化石保護法：恐竜化石や地質遺産の無断発掘・持ち出しは法律で厳しく処罰されます',
      hotlineTitle: 'キャンプ緊急連絡先・予約：',
      emergencyTitle: 'モンゴル救急番号：',
      printBtn: '印刷・保存',
      contactBtn: 'キャンプに連絡する',
      closeBtn: '閉じる'
    },
    zh: {
      tickerBadge: '🚨 戈壁探险安全预警',
      tickerSub: '赫尔曼察夫（Khermen Tsav）及戈壁峡谷重要安全须知',
      openBtn: '查看安全详情',
      closeTooltip: '关闭提示',
      floatingBtn: '戈壁出行须知',
      modalTitle: '戈壁探险谨记须知',
      modalSubtitle: '前往赫尔曼察夫、耐梅盖特峡谷及红崖地区的官方安全指南',
      sourceBadge: 'FactCheck • 官方野外安全核查',
      warning1Title: '夏季40℃以上极端高温与无信号荒漠',
      warning1Text: '赫尔曼察夫夏季白天最高气温超过+40℃，沿途多为崎岖沙地、渺无人烟，且完全无手机网络信号、极度缺乏水源，对探险者的体能、心理及物资准备提出了极高要求。',
      warning2Title: '错综复杂的迷宫峡谷与“死亡之谷”',
      warning2Text: '峡谷分支极多且地貌险峻，若无专业当地向导切勿擅自深入，以免迷路甚至陷入当地人所称的“死亡之谷”险境。',
      checklistTitle: '戈壁探险必备物资与准则：',
      item1: '充足饮用水：每人每天至少储备5-6升饮用水及电解质补水剂',
      item2: '导航设备：离线GPS地图（Maps.me）、卫星电话/北斗卫星定位设备',
      item3: '车辆配置：四驱越野车、两条全尺寸备胎、脱困沙板、充气泵及工兵铲',
      item4: '专业向导：进入深层峡谷必须由营地资深蒙古向导带队',
      item5: '法律保护：严禁私自挖掘、破坏或携带任何古生物恐龙化石出境',
      hotlineTitle: '营地紧急联络与预订：',
      emergencyTitle: '蒙古国救援专线：',
      printBtn: '打印/保存须知',
      contactBtn: '联系营地向导',
      closeBtn: '关闭'
    }
  }[currentLang];

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* 1. SCROLLING MARQUEE TICKER BAR */}
      {!isTickerDismissed && (
        <aside 
          aria-label="Travel safety warning banner"
          className="relative z-30 bg-gradient-to-r from-red-950 via-amber-950 to-stone-950 border-y border-amber-500/40 text-stone-100 shadow-lg overflow-hidden py-2 px-3 sm:px-4 flex items-center justify-between"
        >
          {/* Static Left Badge */}
          <div className="flex items-center gap-2 shrink-0 pr-3 border-r border-amber-500/30 bg-gradient-to-r from-red-950 to-amber-950 z-10 py-0.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <AlertTriangle className="w-4 h-4 text-amber-400 animate-bounce" />
            <button
              onClick={() => setModalOpen(true)}
              className="text-xs font-bold font-['Cinzel',serif] tracking-wider text-amber-300 hover:text-white transition uppercase text-left cursor-pointer"
            >
              {t.tickerBadge}
            </button>
          </div>

          {/* Marquee Ticker Track */}
          <div 
            className="flex-1 overflow-hidden relative mx-3 cursor-pointer select-none"
            onClick={() => setModalOpen(true)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            title="Дэлгэрэнгүй зөвлөмж үзэх бол дарна уу"
          >
            <div 
              className={`animate-marquee whitespace-nowrap text-xs text-stone-200 font-medium ${isPaused ? '[animation-play-state:paused]' : ''}`}
            >
              {/* Message Block 1 */}
              <span className="inline-flex items-center gap-2 mx-6">
                <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  <strong>Хэрмэн цав:</strong> Зуны улиралд өдөртөө +40°C давж халдаг, бартаат элсэрхэг, ундны ус хомс, утасны сүлжээгүй тул хариуцлагатай бэлтгэл шаардана!
                </span>
              </span>

              <span className="inline-block text-amber-500/50 mx-2">•</span>

              {/* Message Block 2 */}
              <span className="inline-flex items-center gap-2 mx-6">
                <Compass className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>
                  <strong>"Үхлийн хөндий":</strong> Олон салаа хавцалтай учир хөтөчгүйгээр гүн рүү зүтгэж төөрөх эрсдэлтэйг анхаарна уу!
                </span>
              </span>

              <span className="inline-block text-amber-500/50 mx-2">•</span>

              {/* Message Block 3 */}
              <span className="inline-flex items-center gap-2 mx-6">
                <Droplets className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>
                  <strong>Ундны ус & Машин:</strong> Хүн тутамд 5L+ цэвэр ус, 4x4 хөтлөгчтэй машин, GPS навигаци, 2 сэлбэг дугуй бэлтгэх.
                </span>
              </span>

              <span className="inline-block text-amber-500/50 mx-2">•</span>

              {/* Message Block 4 */}
              <span className="inline-flex items-center gap-2 mx-6">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  <strong>Баазын холбоо:</strong> +976 7201 0099, +976 8822 3584, +976 9953 0099, +976 9972 3336 | bataartravel@gmail.com
                </span>
              </span>

              <span className="inline-block text-amber-500/50 mx-2">•</span>

              {/* Duplicate for seamless infinite loop */}
              <span className="inline-flex items-center gap-2 mx-6">
                <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  <strong>Хэрмэн цав:</strong> Зуны улиралд өдөртөө +40°C давж халдаг, бартаат элсэрхэг, ундны ус хомс, утасны сүлжээгүй тул хариуцлагатай бэлтгэл шаардана!
                </span>
              </span>

              <span className="inline-block text-amber-500/50 mx-2">•</span>

              <span className="inline-flex items-center gap-2 mx-6">
                <Compass className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>
                  <strong>"Үхлийн хөндий":</strong> Олон салаа хавцалтай учир хөтөчгүйгээр гүн рүү зүтгэж төөрөх эрсдэлтэйг анхаарна уу!
                </span>
              </span>
            </div>
          </div>

          {/* Action Buttons Right */}
          <div className="flex items-center gap-2 shrink-0 z-10 pl-2 bg-gradient-to-l from-stone-950 via-stone-950/90 to-transparent">
            <button
              id="safety-alert-view-btn"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 hover:text-white border border-amber-500/40 text-xs font-semibold transition"
            >
              <span>{t.openBtn}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsTickerDismissed(true)}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800/80 transition"
              title={t.closeTooltip}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}

      {/* 2. FLOATING QUICK ACCESS BUTTON */}
      {!hideFloatingBtn && (
        <div className="fixed bottom-20 md:bottom-6 left-4 z-40">
          <button
            id="floating-travel-safety-btn"
            onClick={() => setModalOpen(true)}
            className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-stone-900/95 hover:bg-stone-800 text-stone-200 border border-amber-500/50 hover:border-amber-400 shadow-xl shadow-stone-950/80 hover:scale-105 active:scale-95 transition cursor-pointer backdrop-blur-md"
            title="Говийн аяллын санамж, аюулгүй байдлын зөвлөмж"
          >
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60"></span>
              <AlertTriangle className="w-4 h-4 text-amber-400 relative z-10" />
            </div>
            <span className="text-xs font-bold text-amber-300 font-['Cinzel',serif] tracking-wide">
              {t.floatingBtn}
            </span>
          </button>
        </div>
      )}

      {/* 3. PARCHMENT & EXPEDITION STYLE MODAL WINDOW */}
      {isModalActive && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-stone-950/85 backdrop-blur-md overflow-y-auto animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div 
            className="relative w-full max-w-2xl rounded-2xl bg-[#f5efe6] text-stone-900 shadow-2xl border-4 border-[#d4af37]/60 overflow-hidden my-auto"
            style={{
              backgroundImage: `radial-gradient(#e6d8c3 1px, transparent 1px), radial-gradient(#dfcaa8 1px, #f7f2e7 1px)`,
              backgroundSize: '24px 24px',
              backgroundPosition: '0 0, 12px 12px'
            }}
          >
            {/* Top Tape / Pin Graphic Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-4 bg-amber-200/80 border-b border-amber-300 shadow-sm opacity-80 rotate-[-1deg]" />

            {/* Vintage Header Strip */}
            <div className="pt-6 px-6 sm:px-8 pb-4 border-b border-stone-300/80 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-900 text-amber-100 text-[10px] font-bold uppercase tracking-wider">
                    <ShieldAlert className="w-3 h-3 text-amber-300" />
                    {t.sourceBadge}
                  </span>
                  <span className="text-xs font-mono font-bold text-stone-600">
                    KHERMEN-TSAV • ADVISORY
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-['Cinzel',serif] tracking-tight">
                  {t.modalTitle}
                </h3>
                <p className="text-xs text-stone-700 mt-0.5">
                  {t.modalSubtitle}
                </p>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-full bg-stone-200/80 hover:bg-stone-300 text-stone-700 transition shrink-0 ml-2"
                aria-label="Хаах"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Content Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              
              {/* Highlight Note 1: Extreme Heat & Wilderness */}
              <div className="p-4 sm:p-5 rounded-xl bg-amber-100/80 border-l-4 border-amber-700 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-200/90 text-amber-950 shrink-0 mt-0.5">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-amber-950 font-['Cinzel',serif] uppercase tracking-wide">
                      • {t.warning1Title}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-800 mt-1.5 leading-relaxed font-medium">
                      {t.warning1Text}
                    </p>
                  </div>
                </div>
              </div>

              {/* Highlight Note 2: Valley of Death & Guide Requirement */}
              <div className="p-4 sm:p-5 rounded-xl bg-red-100/80 border-l-4 border-red-700 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-red-200/90 text-red-950 shrink-0 mt-0.5">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-red-950 font-['Cinzel',serif] uppercase tracking-wide">
                      • {t.warning2Title}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-800 mt-1.5 leading-relaxed font-medium">
                      {t.warning2Text}
                    </p>
                  </div>
                </div>
              </div>

              {/* Expedition Checklist */}
              <div className="bg-stone-100/90 p-5 rounded-xl border border-stone-300">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-['Cinzel',serif] flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>{t.checklistTitle}</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-800 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-800 font-bold">1.</span>
                    <span>{t.item1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-800 font-bold">2.</span>
                    <span>{t.item2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-800 font-bold">3.</span>
                    <span>{t.item3}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-800 font-bold">4.</span>
                    <span>{t.item4}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-800 font-bold">5.</span>
                    <span>{t.item5}</span>
                  </li>
                </ul>
              </div>

              {/* Direct Hotlines & Basecamp Assistance */}
              <div className="bg-stone-900 text-stone-100 p-5 rounded-xl shadow-md border border-stone-800">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 animate-pulse" />
                  <span>{t.hotlineTitle}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono font-bold text-stone-200">
                  <a 
                    href="tel:+97672010099" 
                    className="p-2.5 rounded-lg bg-stone-800/90 hover:bg-amber-500/20 border border-stone-700 hover:border-amber-400 text-amber-300 transition flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>+976 7201 0099</span>
                  </a>
                  <a 
                    href="tel:+97688223584" 
                    className="p-2.5 rounded-lg bg-stone-800/90 hover:bg-amber-500/20 border border-stone-700 hover:border-amber-400 text-amber-300 transition flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>+976 8822 3584</span>
                  </a>
                  <a 
                    href="tel:+97699530099" 
                    className="p-2.5 rounded-lg bg-stone-800/90 hover:bg-amber-500/20 border border-stone-700 hover:border-amber-400 text-amber-300 transition flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>+976 9953 0099</span>
                  </a>
                  <a 
                    href="tel:+97699723336" 
                    className="p-2.5 rounded-lg bg-stone-800/90 hover:bg-amber-500/20 border border-stone-700 hover:border-amber-400 text-amber-300 transition flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>+976 9972 3336</span>
                  </a>
                </div>

                <div className="mt-3 pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-400">
                  <span>
                    Имэйл: <a href="mailto:bataartravel@gmail.com" className="text-amber-300 underline font-mono">bataartravel@gmail.com</a>
                  </span>
                  <span>
                    ОБЕГ: <strong className="text-red-400 font-mono">105</strong> | Түргэн: <strong className="text-red-400 font-mono">103</strong> | Цагдаа: <strong className="text-red-400 font-mono">102</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Bottom Footer Action Buttons */}
            <div className="px-6 sm:px-8 py-4 bg-stone-200/90 border-t border-stone-300 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-300 hover:bg-stone-400 text-stone-800 text-xs font-semibold transition cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>{t.printBtn}</span>
              </button>

              <div className="flex items-center gap-2">
                {onOpenBooking && (
                  <button
                    onClick={() => {
                      setModalOpen(false);
                      onOpenBooking();
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-md cursor-pointer"
                  >
                    {t.contactBtn}
                  </button>
                )}
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-semibold text-xs transition cursor-pointer"
                >
                  {t.closeBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
