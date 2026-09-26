import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { 
  MessageCircle, 
  AlertTriangle, 
  BarChart2, 
  ChevronDown, 
  ChevronUp, 
  EyeOff, 
  Eye, 
  X, 
  Layers
} from 'lucide-react';

interface QuickUtilityHubProps {
  currentLang: Language;
  activeVisitorsCount: number;
  onOpenMessenger: () => void;
  onOpenSafetyAdvisory: () => void;
  onOpenSurvey: () => void;
}

export function QuickUtilityHub({
  currentLang,
  activeVisitorsCount,
  onOpenMessenger,
  onOpenSafetyAdvisory,
  onOpenSurvey,
}: QuickUtilityHubProps) {
  // Hub state: 'expanded' | 'minimized' | 'hidden'
  const [hubState, setHubState] = useState<'expanded' | 'minimized' | 'hidden'>(() => {
    try {
      const saved = localStorage.getItem('bataar_hub_state');
      if (saved === 'minimized' || saved === 'hidden' || saved === 'expanded') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'expanded';
  });

  const saveState = (state: 'expanded' | 'minimized' | 'hidden') => {
    setHubState(state);
    try {
      localStorage.setItem('bataar_hub_state', state);
    } catch {
      // ignore
    }
  };

  const t = {
    mn: {
      tag: 'ШУУРХАЙ ХОЛБООС',
      title: 'Үйлчилгээний төв',
      hide: 'Хураах',
      expand: 'Нээх',
      showBtn: 'Шуурхай (3)',
      unhide: 'Шуурхай цэсийг буцааж гаргах',
      messengerTitle: 'Messenger холбоос',
      messengerDesc: 'Шууд чатлах & холбоос түгээх',
      safetyTitle: 'Аяллын санамж',
      safetyDesc: 'Хэрмэн цав, говийн аюулгүй байдал',
      surveyTitle: 'Онлайн & Судалгаа',
      surveyDesc: `${activeVisitorsCount} хүн онлайн • Санал асуулга`,
      hideCompletely: 'Дэлгэцээс бүрэн нуух',
    },
    en: {
      tag: 'QUICK ACCESS',
      title: 'Quick Services',
      hide: 'Minimize',
      expand: 'Expand',
      showBtn: 'Quick Tools (3)',
      unhide: 'Show quick services widget',
      messengerTitle: 'Messenger Link',
      messengerDesc: 'Direct chat & share link',
      safetyTitle: 'Travel Safety',
      safetyDesc: 'Khermen Tsav & Gobi hazards',
      surveyTitle: 'Live & Survey',
      surveyDesc: `${activeVisitorsCount} online • Visitor poll`,
      hideCompletely: 'Hide completely from screen',
    },
    ja: {
      tag: 'クイックアクセス',
      title: 'クイック機能',
      hide: '閉じる',
      expand: '開く',
      showBtn: '機能 (3)',
      unhide: 'クイックメニューを再表示',
      messengerTitle: 'Messenger リンク',
      messengerDesc: 'チャット & ページ共有',
      safetyTitle: '旅の安全心得',
      safetyDesc: 'ゴビ峡谷の安全ガイド',
      surveyTitle: 'オンライン & 調査',
      surveyDesc: `${activeVisitorsCount} 名接続中 • 意識調査`,
      hideCompletely: '画面から完全に非表示にする',
    },
    zh: {
      tag: '快捷服务',
      title: '快捷功能中心',
      hide: '折叠',
      expand: '展开',
      showBtn: '快捷 (3)',
      unhide: '恢复显示快捷工具',
      messengerTitle: 'Messenger 链接',
      messengerDesc: '即时沟通与微信分享',
      safetyTitle: '戈壁出行须知',
      safetyDesc: '黑尔缅察夫野外安全指南',
      surveyTitle: '在线访客与调研',
      surveyDesc: `${activeVisitorsCount} 人在线 • 问卷调研`,
      hideCompletely: '从屏幕上完全隐藏',
    },
  }[currentLang];

  // If completely hidden, render a minimal subtle button in the corner to restore
  if (hubState === 'hidden') {
    return (
      <aside 
        aria-label="Restore quick utilities"
        className="fixed bottom-20 md:bottom-6 left-4 z-40"
      >
        <button
          id="restore-quick-hub-btn"
          onClick={() => saveState('expanded')}
          className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 hover:bg-white text-stone-700 hover:text-stone-950 border border-stone-300 shadow-md text-xs font-medium backdrop-blur-md hover:scale-105 transition cursor-pointer"
          title={t.unhide}
        >
          <Layers className="w-3.5 h-3.5 text-stone-500 group-hover:text-stone-900" />
          <span className="text-[11px] font-medium hidden sm:inline">{t.showBtn}</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </button>
      </aside>
    );
  }

  // Minimized state: a single clean pill button
  if (hubState === 'minimized') {
    return (
      <aside 
        aria-label="Quick utilities dock"
        className="fixed bottom-20 md:bottom-6 left-4 z-40 flex items-center gap-2"
      >
        <button
          id="expand-quick-hub-btn"
          onClick={() => saveState('expanded')}
          className="group flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-white text-stone-900 border border-stone-300 shadow-xl hover:shadow-2xl hover:border-stone-400 hover:scale-105 transition cursor-pointer"
          title={t.expand}
        >
          <div className="flex items-center -space-x-1">
            <span className="w-5 h-5 rounded-full bg-[#0084FF] flex items-center justify-center text-white text-[10px] shadow-sm">
              <MessageCircle className="w-3 h-3 fill-white" />
            </span>
            <span className="w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center text-white text-[10px] shadow-sm">
              <AlertTriangle className="w-3 h-3" />
            </span>
            <span className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[10px] shadow-sm">
              <BarChart2 className="w-3 h-3" />
            </span>
          </div>

          <span className="text-xs font-semibold text-stone-800 tracking-tight">
            {t.title}
          </span>

          <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-stone-100 text-stone-700">
            3
          </span>

          <ChevronUp className="w-4 h-4 text-stone-500 group-hover:text-stone-900 transition-transform" />
        </button>
      </aside>
    );
  }

  // Expanded state: elegant 3-item Annandale card with Hide buttons
  return (
    <aside 
      aria-label="Quick services container"
      className="fixed bottom-20 md:bottom-6 left-4 z-40 w-[290px] sm:w-[320px] bg-white text-stone-900 rounded-2xl border border-stone-200 shadow-2xl overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] animate-fade-in"
    >
      {/* Header with Title & Hide/Minimize Controls */}
      <div className="px-4 py-3 bg-[#FAF9F5] border-b border-stone-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <div>
            <span className="block text-[9px] uppercase font-bold tracking-[0.18em] text-stone-600">
              {t.tag}
            </span>
            <h4 className="font-['Cormorant_Garamond',serif] text-base font-bold text-stone-900 leading-tight">
              {t.title}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Minimize into floating pill */}
          <button
            id="quick-hub-minimize-btn"
            onClick={() => saveState('minimized')}
            className="p-1.5 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-200/70 transition cursor-pointer"
            title={t.hide}
          >
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Completely hide */}
          <button
            id="quick-hub-close-btn"
            onClick={() => saveState('hidden')}
            className="p-1.5 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-200/70 transition cursor-pointer"
            title={t.hideCompletely}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3 Unified Action Items */}
      <div className="p-2 space-y-1.5">
        {/* 1. Messenger Link */}
        <button
          id="hub-messenger-action-btn"
          onClick={() => {
            onOpenMessenger();
          }}
          className="w-full text-left flex items-center gap-3 p-2.5 rounded-xl hover:bg-stone-50 border border-transparent hover:border-stone-200 transition group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-[#0084FF]/10 text-[#0084FF] flex items-center justify-center shrink-0 group-hover:bg-[#0084FF] group-hover:text-white transition shadow-xs">
            <MessageCircle className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900 group-hover:text-[#0084FF] transition">
                {t.messengerTitle}
              </span>
              <span className="text-[10px] font-bold text-[#0084FF] bg-blue-50 px-1.5 py-0.5 rounded">
                Chat
              </span>
            </div>
            <p className="text-[11px] text-stone-700 truncate mt-0.5">
              {t.messengerDesc}
            </p>
          </div>
        </button>

        {/* 2. Travel Safety Advisory */}
        <button
          id="hub-safety-action-btn"
          onClick={() => {
            onOpenSafetyAdvisory();
          }}
          className="w-full text-left flex items-center gap-3 p-2.5 rounded-xl hover:bg-amber-50/60 border border-transparent hover:border-amber-200/60 transition group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-600/10 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition shadow-xs">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900 group-hover:text-amber-800 transition">
                {t.safetyTitle}
              </span>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 px-1.5 py-0.5 rounded">
                Checklist
              </span>
            </div>
            <p className="text-[11px] text-stone-700 truncate mt-0.5">
              {t.safetyDesc}
            </p>
          </div>
        </button>

        {/* 3. Live Visitors & Online Survey */}
        <button
          id="hub-survey-action-btn"
          onClick={() => {
            onOpenSurvey();
          }}
          className="w-full text-left flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50/60 border border-transparent hover:border-emerald-200/60 transition group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-600/10 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition shadow-xs">
            <BarChart2 className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900 group-hover:text-emerald-800 transition">
                {t.surveyTitle}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                {activeVisitorsCount}
              </span>
            </div>
            <p className="text-[11px] text-stone-700 truncate mt-0.5">
              {t.surveyDesc}
            </p>
          </div>
        </button>
      </div>

      {/* Footer Strip with Quick Collapse Button */}
      <div className="px-4 py-2 bg-[#FAF9F5] border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-700">
        <button
          onClick={() => saveState('minimized')}
          className="hover:text-stone-900 font-medium inline-flex items-center gap-1 transition cursor-pointer"
        >
          <ChevronDown className="w-3.5 h-3.5" />
          <span>{t.hide}</span>
        </button>

        <button
          onClick={() => saveState('hidden')}
          className="hover:text-stone-900 font-medium inline-flex items-center gap-1 transition cursor-pointer"
        >
          <EyeOff className="w-3.5 h-3.5" />
          <span>{t.hideCompletely}</span>
        </button>
      </div>
    </aside>
  );
}
