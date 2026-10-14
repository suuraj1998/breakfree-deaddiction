import React from 'react';
import { Shield, Smartphone, Monitor, Crown, BellRing, Sparkles, Zap, Lock, ShoppingBag, Brain } from 'lucide-react';
import { UserSubscription } from '../types';

interface NavigationHeaderProps {
  activeTab: 'dashboard' | 'sentinel' | 'antibypass' | 'wellness' | 'store' | 'community' | 'ailab';
  onSelectTab: (tab: 'dashboard' | 'sentinel' | 'antibypass' | 'wellness' | 'store' | 'community' | 'ailab') => void;
  isMobileSimulator: boolean;
  onToggleMobileSimulator: () => void;
  onOpenSubscription: () => void;
  onOpenAppStoreExport: () => void;
  onOpenOwnerAdmin: () => void;
  onTriggerPanic: () => void;
  subscription: UserSubscription;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  activeTab,
  onSelectTab,
  isMobileSimulator,
  onToggleMobileSimulator,
  onOpenSubscription,
  onOpenAppStoreExport,
  onOpenOwnerAdmin,
  onTriggerPanic,
  subscription,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 md:gap-8">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-2.5 shrink-0">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onSelectTab('dashboard');
          }}
          className="text-lg font-black tracking-tight text-white whitespace-nowrap flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Shield className="w-4 h-4 fill-current" />
          </div>
          <span>BreakFree De-Addiction</span>
        </a>
      </div>

      {/* Zone 2: Single-line clean nav links */}
      <nav className="hidden xl:flex items-center gap-5 text-xs font-semibold text-slate-400">
        <button
          onClick={() => onSelectTab('dashboard')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 ${
            activeTab === 'dashboard' ? 'text-white border-b-2 border-emerald-500' : ''
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => onSelectTab('sentinel')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 ${
            activeTab === 'sentinel' ? 'text-white border-b-2 border-emerald-500' : ''
          }`}
        >
          Sentinel &amp; Radar
        </button>
        <button
          onClick={() => onSelectTab('antibypass')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 ${
            activeTab === 'antibypass' ? 'text-white border-b-2 border-emerald-500' : ''
          }`}
        >
          Anti-Bypass Shield
        </button>
        <button
          onClick={() => onSelectTab('wellness')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 ${
            activeTab === 'wellness' ? 'text-white border-b-2 border-emerald-500' : ''
          }`}
        >
          Urge Workouts
        </button>
        <button
          onClick={() => onSelectTab('ailab')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5 ${
            activeTab === 'ailab' ? 'text-indigo-400 border-b-2 border-indigo-500' : ''
          }`}
        >
          <Brain className="w-3.5 h-3.5" />
          <span>AI Neural Lab</span>
        </button>
        <button
          onClick={() => onSelectTab('store')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 ${
            activeTab === 'store' ? 'text-white border-b-2 border-emerald-500' : ''
          }`}
        >
          Recovery Store
        </button>
        <button
          onClick={() => onSelectTab('community')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 ${
            activeTab === 'community' ? 'text-white border-b-2 border-emerald-500' : ''
          }`}
        >
          Sanctuary
        </button>
      </nav>

      {/* Zone 3: 1 primary action cluster */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Device frame preview toggle */}
        <button
          onClick={onToggleMobileSimulator}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-medium transition"
          title={isMobileSimulator ? 'Switch to Full Desktop Canvas' : 'Preview in iPhone/Android Shell'}
        >
          {isMobileSimulator ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
          <span>{isMobileSimulator ? 'Desktop' : 'Mobile'}</span>
        </button>

        {/* Store Export Blueprint Modal Trigger */}
        <button
          onClick={onOpenAppStoreExport}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium hover:text-white hover:border-slate-700 transition"
        >
          <span>Store Prep</span>
        </button>

        {/* Private Founder Admin Portal Trigger */}
        <button
          onClick={onOpenOwnerAdmin}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-300 text-xs font-semibold transition"
          title="Private Owner Revenue & Sponsor Portal (PIN Protected)"
        >
          <Lock className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Owner</span>
        </button>

        {/* Pro Subscription Badge */}
        <button
          onClick={onOpenSubscription}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
            subscription.tier === 'pro'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
          }`}
        >
          <Crown className="w-3.5 h-3.5" />
          <span>{subscription.tier === 'pro' ? 'Pro Member' : 'Pro (₹299)'}</span>
        </button>

        {/* Emergency Intervene Trigger */}
        <button
          onClick={onTriggerPanic}
          className="p-2 rounded-xl bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/25 transition active:scale-95"
          title="Emergency Panic Alarm"
        >
          <Zap className="w-4 h-4 fill-current" />
        </button>
      </div>
    </header>
  );
};
