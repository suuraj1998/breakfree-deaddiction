import React from 'react';
import { LayoutDashboard, ShieldAlert, Lock, Dumbbell, ShoppingBag, Brain } from 'lucide-react';

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
    <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/90 pb-safe">
      <div className="grid grid-cols-5 h-16 items-center px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onSelectTab(tab.key)}
              className={`flex flex-col items-center justify-center h-full min-h-[44px] min-w-[44px] transition-colors ${
                isActive ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
              <span className="text-[10px] font-medium tracking-tight mt-1 truncate max-w-[60px]">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
