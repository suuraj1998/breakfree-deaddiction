import React, { useState } from 'react';
import { Shield, Smartphone, Monitor, Crown, Zap, Lock, Brain, Menu, X, FileText, Users, Play, Globe } from 'lucide-react';
import { UserSubscription } from '../types';
import { PWAInstallButton } from './PWAInstallButton';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onSelectTab('dashboard');
            }}
            className="text-base sm:text-lg font-black tracking-tight text-white whitespace-nowrap flex items-center gap-2"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Shield className="w-4 h-4 fill-current" />
            </div>
            <span>BreakFree</span>
          </a>
        </div>

        {/* Zone 2: Single-line clean nav links (Desktop & Tablet Landscape only) */}
        <nav className="hidden xl:flex items-center gap-6 text-xs font-semibold text-slate-400">
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

        {/* Zone 3: Actions (Desktop full view) */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          {/* PWA Install Button */}
          <PWAInstallButton compact />

          {/* Device frame preview toggle */}
          <button
            onClick={onToggleMobileSimulator}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-medium transition"
            title={isMobileSimulator ? 'Switch to Full Desktop Canvas' : 'Preview in iPhone/Android Shell'}
          >
            {isMobileSimulator ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
            <span>{isMobileSimulator ? 'Desktop' : 'Mobile'}</span>
          </button>

          {/* Publish App to Web & Play Store */}
          <button
            onClick={onOpenAppStoreExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-950 to-slate-900 border border-emerald-500/40 text-xs text-emerald-300 font-bold hover:border-emerald-400 hover:text-white transition shadow-sm"
            title="Publish app to Web and Google Play Store"
          >
            <Play className="w-3.5 h-3.5 fill-current text-emerald-400" />
            <span>Publish App</span>
          </button>

          {/* Owner Portal */}
          <button
            onClick={onOpenOwnerAdmin}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-300 text-xs font-semibold transition"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Owner</span>
          </button>

          {/* Pro Subscription */}
          <button
            onClick={onOpenSubscription}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              subscription.tier === 'pro'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>{subscription.tier === 'pro' ? 'Pro' : 'Pro (₹299)'}</span>
          </button>

          {/* Emergency Panic SOS */}
          <button
            onClick={onTriggerPanic}
            className="p-2 rounded-xl bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/25 transition active:scale-95"
            title="Emergency Panic Alarm"
          >
            <Zap className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Mobile Header Actions (Clean, optimized) */}
        <div className="flex sm:hidden items-center gap-2">
          {/* In-app install button on mobile */}
          <PWAInstallButton compact />

          {/* Quick Panic Trigger */}
          <button
            onClick={onTriggerPanic}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-600 active:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/30"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Panic</span>
          </button>

          {/* Clean Mobile Menu Drawer Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Open Menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-Down Quick Menu Sheet */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-0 top-[53px] z-30 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 p-4 space-y-3 animate-in slide-in-from-top-2 duration-150 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                onOpenAppStoreExport();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold"
            >
              <Play className="w-4 h-4 fill-current text-emerald-400" />
              <span>Publish App (Web/Store)</span>
            </button>

            <button
              onClick={() => {
                onOpenSubscription();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold"
            >
              <Crown className="w-4 h-4" />
              <span>Pro Plan (₹299)</span>
            </button>

            <button
              onClick={() => {
                onOpenOwnerAdmin();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-medium"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Owner Portal</span>
            </button>

            <button
              onClick={() => {
                onSelectTab('community');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-medium"
            >
              <Users className="w-4 h-4 text-indigo-400" />
              <span>Sanctuary</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
