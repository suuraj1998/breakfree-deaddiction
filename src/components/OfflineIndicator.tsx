import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/usePWAInstall';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-500/90 text-slate-950 px-3.5 py-2 text-xs font-semibold shadow-xl backdrop-blur-md border border-amber-300 animate-pulse">
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>Offline Mode active — Sobriety alarms & workouts remain 100% operational.</span>
    </div>
  );
};
