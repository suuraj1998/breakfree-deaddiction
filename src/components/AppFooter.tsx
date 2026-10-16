import React from 'react';
import { Shield, Heart, Lock, ExternalLink, Smartphone, Download, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';

interface AppFooterProps {
  onOpenPlayStoreHub: () => void;
  onOpenAppStoreExport: () => void;
  onOpenOwnerAdmin: () => void;
  onSelectTab: (tab: 'dashboard' | 'sentinel' | 'antibypass' | 'wellness' | 'store' | 'community' | 'ailab') => void;
  onOpenAiCounselor: () => void;
  onTriggerPanic: () => void;
}

export const AppFooter: React.FC<AppFooterProps> = ({
  onOpenPlayStoreHub,
  onOpenAppStoreExport,
  onOpenOwnerAdmin,
  onSelectTab,
  onOpenAiCounselor,
  onTriggerPanic,
}) => {
  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs">
      {/* Top Banner: Emergency Help Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border-b border-slate-800/60 py-4 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <p className="text-white font-bold text-xs">In an intense urge or crisis?</p>
              <p className="text-slate-400 text-[11px]">Free, confidential support is available 24/7. You don't have to fight this alone.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onTriggerPanic}
              className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition shadow-sm active:scale-95"
            >
              Panic SOS Protocol
            </button>
            <button
              onClick={onOpenAiCounselor}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-sm active:scale-95"
            >
              Talk to AI Coach
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-black text-base">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Shield className="w-4 h-4 fill-current" />
              </div>
              <span>BreakFree</span>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                v2.4.0
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Science-backed de-addiction and compulsive habit interception platform. Featuring hardware acoustic sirens, real-time geofence radar, anti-bypass supervision, and cognitive urge workouts.
            </p>
            <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-500">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Local-First &amp; Private
              </span>
              <span>•</span>
              <span>Zero-Tracker Architecture</span>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Features</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button onClick={() => onSelectTab('dashboard')} className="hover:text-emerald-400 transition">
                  Habit Tracker &amp; Streaks
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('sentinel')} className="hover:text-emerald-400 transition">
                  Sentinel Web Interceptor
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('antibypass')} className="hover:text-emerald-400 transition">
                  Anti-Bypass Shield
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('wellness')} className="hover:text-emerald-400 transition">
                  Urge-Killer Workouts
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('ailab')} className="hover:text-emerald-400 transition">
                  AI Neural Craving Lab
                </button>
              </li>
            </ul>
          </div>

          {/* Recovery Resources */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Resources</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button onClick={() => onSelectTab('community')} className="hover:text-emerald-400 transition">
                  Sanctuary Community
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('store')} className="hover:text-emerald-400 transition">
                  Recovery Hardware Store
                </button>
              </li>
              <li>
                <a
                  href="/privacy-policy.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition inline-flex items-center gap-1"
                >
                  <span>Privacy Policy</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a
                  href="/terms-of-service.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition inline-flex items-center gap-1"
                >
                  <span>Terms of Service</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Helplines & Developer Tools */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Helplines &amp; Tools</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li className="text-slate-300">
                <span className="font-semibold text-emerald-400">Tele-MANAS:</span> 14416
              </li>
              <li className="text-slate-300">
                <span className="font-semibold text-emerald-400">SAMHSA Helpline:</span> 1-800-662-4357
              </li>
              <li className="text-slate-300">
                <span className="font-semibold text-emerald-400">Crisis Text Line:</span> Text HOME to 741741
              </li>
              <li className="pt-2 border-t border-slate-800/80">
                <button
                  onClick={onOpenPlayStoreHub}
                  className="text-slate-400 hover:text-emerald-400 transition inline-flex items-center gap-1.5 font-medium"
                >
                  <Smartphone className="w-3 h-3 text-emerald-400" />
                  <span>Google Play Release Hub</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAppStoreExport}
                  className="text-slate-400 hover:text-emerald-400 transition inline-flex items-center gap-1.5"
                >
                  <Download className="w-3 h-3" />
                  <span>Publishing Suite</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenOwnerAdmin}
                  className="text-slate-400 hover:text-amber-400 transition inline-flex items-center gap-1.5"
                >
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>Owner Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} BreakFree Technologies. All rights reserved. For personal wellness and self-sovereign habit recovery.</p>
          <div className="flex items-center gap-4">
            <a href="/privacy-policy.html" className="hover:text-slate-300 transition">Privacy</a>
            <a href="/terms-of-service.html" className="hover:text-slate-300 transition">Terms</a>
            <button onClick={onOpenPlayStoreHub} className="hover:text-emerald-400 transition">Play Store Build</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
