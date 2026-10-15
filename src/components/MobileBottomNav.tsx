import React from 'react';
import { LayoutDashboard, ShieldAlert, Dumbbell, ShoppingBag, Brain } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: 'dashboard' | 'sentinel' | 'antibypass' | 'wellness' | 'store' | 'community' | 'ailab';
  onSelectTab: (tab: 'dashboard' | 'sentinel' | 'antibypass' | 'wellness' | 'store' | 'community' | 'ailab') => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activeTab, onSelectTab }) => {
  const tabs = [
    { key: 'dashboard' as const, label: 'Habits', icon: LayoutDashboard },
    { key: 'sentinel' as const, label: 'Sentinel', icon: ShieldAlert },
    { key: 'ailab' as const, label: 'AI Lab', icon: Brain },
    { key: 'wellness' as const, label: 'Workouts', icon: Dumbbell },
    { key: 'store' as const, label: 'Store', icon: ShoppingBag },
  ];

  return (
    <nav className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 pb-safe">
      <div className="grid grid-cols-5 h-14 items-center px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onSelectTab(tab.key)}
              className={`relative flex flex-col items-center justify-center h-full min-h-[44px] min-w-[44px] transition-all select-none active:scale-95 ${
                isActive ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {/* Subtle top indicator bar */}
              {isActive && (
                <span className="absolute top-0 w-8 h-0.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              )}
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-[56px]">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
