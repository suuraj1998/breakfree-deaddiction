/**
 * BreakFree: De-Addiction, Wellness & Ad Monetization Ecosystem
 * Built for Web, iOS (Capacitor), and Android
 */

import React, { useState } from 'react';
import { NavigationHeader } from './components/NavigationHeader';
import { MobileBottomNav } from './components/MobileBottomNav';
import { HabitDashboard } from './components/HabitDashboard';
import { GeofenceRadar } from './components/GeofenceRadar';
import { SentinelInterceptorView } from './components/SentinelInterceptorView';
import { AntiBypassShield } from './components/AntiBypassShield';
import { WellnessModule } from './components/WellnessModule';
import { WellnessStore } from './components/WellnessStore';
import { AiNeuralLab } from './components/AiNeuralLab';
import { OwnerAdminModal } from './components/OwnerAdminModal';
import { CommunitySanctuary } from './components/CommunitySanctuary';
import { SentinelAlarmModal } from './components/SentinelAlarmModal';
import { AiCounselorModal } from './components/AiCounselorModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { AppStoreExportModal } from './components/AppStoreExportModal';

import {
  Habit,
  DangerZone,
  EmergencyContact,
  SentinelTriggerEvent,
  UserSubscription,
} from './types';
import {
  INITIAL_HABITS,
  INITIAL_DANGER_ZONES,
  INITIAL_GUARDIAN,
} from './data/mockData';
import { Bot, Zap, Crown, ShieldAlert, Brain } from 'lucide-react';

export default function App() {
  // Navigation & Viewport State
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'sentinel' | 'antibypass' | 'wellness' | 'store' | 'community' | 'ailab'
  >('dashboard');
  const [isMobileSimulator, setIsMobileSimulator] = useState(false);

  // Application Data State
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [dangerZones, setDangerZones] = useState<DangerZone[]>(INITIAL_DANGER_ZONES);
  const [guardian, setGuardian] = useState<EmergencyContact>(INITIAL_GUARDIAN);
  const [masterPin, setMasterPin] = useState('1984');
  const [subscription, setSubscription] = useState<UserSubscription>({
    tier: 'free',
    region: 'IN',
    currency: 'INR',
    priceMonthly: 299,
    priceAnnual: 1999,
  });

  // Modal Triggers
  const [alarmEvent, setAlarmEvent] = useState<SentinelTriggerEvent | null>(null);
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const [isAiCounselorOpen, setIsAiCounselorOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [isAppStoreExportOpen, setIsAppStoreExportOpen] = useState(false);
  const [isOwnerAdminOpen, setIsOwnerAdminOpen] = useState(false);

  // Emergency Intervention Triggers
  const triggerAlarm = (
    type: 'url_block' | 'geofence' | 'incognito_breach' | 'vpn_tamper' | 'panic_button',
    details: string,
    habitName?: string,
    locationName?: string
  ) => {
    setAlarmEvent({
      type,
      details,
      habitName,
      locationName,
      timestamp: new Date().toLocaleTimeString(),
    });
    setIsAlarmOpen(true);
  };

  const handleManualPanic = (habit?: Habit) => {
    triggerAlarm(
      'panic_button',
      `Manual Panic Craving Trigger activated for ${habit?.name || 'General Urge'}. Relapse intervention sequence initiated.`,
      habit?.name
    );
  };

  const handleSimulateUrlBlock = (url: string) => {
    triggerAlarm(
      'url_block',
      `Access to blocked high-risk domain intercepted: "${url}". Adult content and relapse trigger prevented.`,
      'Adult Content'
    );
  };

  const handleTriggerGeofence = (zone: DangerZone) => {
    triggerAlarm(
      'geofence',
      `Proximity warning breached: entered danger radius of "${zone.name}" (${zone.address}).`,
      zone.category,
      zone.name
    );
  };

  const handleSimulateBypass = (type: 'incognito_breach' | 'vpn_tamper') => {
    if (type === 'incognito_breach') {
      triggerAlarm(
        'incognito_breach',
        'Private / Incognito browsing session detected while adult filter was armed. Supervised policy breached!'
      );
    } else {
      triggerAlarm(
        'vpn_tamper',
        'Third-party external VPN tunnel attempt detected. Local loopback DNS filter bypassed!'
      );
    }
  };

  // Add / Toggle Habits
  const handleAddHabit = (newHabit: Habit) => {
    setHabits((prev) => [newHabit, ...prev]);
  };

  const handleToggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, active: !h.active } : h))
    );
  };

  const handleAddDangerZone = (newZone: DangerZone) => {
    setDangerZones((prev) => [newZone, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <NavigationHeader
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isMobileSimulator={isMobileSimulator}
        onToggleMobileSimulator={() => setIsMobileSimulator(!isMobileSimulator)}
        onOpenSubscription={() => setIsSubscriptionOpen(true)}
        onOpenAppStoreExport={() => setIsAppStoreExportOpen(true)}
        onOpenOwnerAdmin={() => setIsOwnerAdminOpen(true)}
        onTriggerPanic={() => handleManualPanic()}
        subscription={subscription}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 pb-24 lg:pb-12">
        <div
          className={`mx-auto transition-all duration-300 ${
            isMobileSimulator
              ? 'max-w-[420px] my-6 border-[10px] border-slate-800 rounded-[48px] shadow-2xl overflow-hidden bg-slate-950 p-4 ring-1 ring-slate-700/60'
              : 'max-w-6xl px-4 sm:px-6 lg:px-8 py-6'
          }`}
        >
          {/* Mobile Shell Notch & Speaker (Simulated Mode Only) */}
          {isMobileSimulator && (
            <div className="w-full flex justify-center pb-4 pt-1">
              <div className="w-28 h-4 bg-slate-800 rounded-full flex items-center justify-center">
                <div className="w-10 h-1 bg-slate-700 rounded-full" />
              </div>
            </div>
          )}

          {/* Sub Navigation Bar for Mobile Simulator Mode */}
          {isMobileSimulator && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 text-xs no-scrollbar border-b border-slate-800">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
                  activeTab === 'dashboard' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('sentinel')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
                  activeTab === 'sentinel' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400'
                }`}
              >
                Sentinel
              </button>
              <button
                onClick={() => setActiveTab('ailab')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
                  activeTab === 'ailab' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400'
                }`}
              >
                AI Lab
              </button>
              <button
                onClick={() => setActiveTab('antibypass')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
                  activeTab === 'antibypass' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400'
                }`}
              >
                Anti-Bypass
              </button>
              <button
                onClick={() => setActiveTab('wellness')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
                  activeTab === 'wellness' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400'
                }`}
              >
                Workouts
              </button>
              <button
                onClick={() => setActiveTab('store')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
                  activeTab === 'store' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400'
                }`}
              >
                Store
              </button>
            </div>
          )}

          {/* Active View Routing */}
          {activeTab === 'dashboard' && (
            <HabitDashboard
              habits={habits}
              onTriggerEmergencyPanic={handleManualPanic}
              onOpenAiCounselor={() => setIsAiCounselorOpen(true)}
              onOpenWellness={() => setActiveTab('wellness')}
              onToggleHabit={handleToggleHabit}
              onAddHabit={handleAddHabit}
            />
          )}

          {activeTab === 'sentinel' && (
            <div className="space-y-6">
              <SentinelInterceptorView
                guardian={guardian}
                onUpdateGuardian={setGuardian}
                masterPin={masterPin}
                onUpdatePin={setMasterPin}
                onSimulateUrlBlock={handleSimulateUrlBlock}
              />
              <GeofenceRadar
                dangerZones={dangerZones}
                onTriggerGeofenceAlarm={handleTriggerGeofence}
                onAddDangerZone={handleAddDangerZone}
              />
            </div>
          )}

          {activeTab === 'antibypass' && (
            <AntiBypassShield onSimulateBypass={handleSimulateBypass} />
          )}

          {activeTab === 'wellness' && <WellnessModule />}

          {activeTab === 'ailab' && (
            <AiNeuralLab habits={habits} onTriggerWorkout={() => setActiveTab('wellness')} />
          )}

          {activeTab === 'store' && <WellnessStore />}

          {activeTab === 'community' && <CommunitySanctuary />}
        </div>
      </main>

      {/* Floating AI Craving Coach Quick Trigger */}
      <button
        onClick={() => setIsAiCounselorOpen(true)}
        className="fixed bottom-20 lg:bottom-6 right-6 z-30 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white font-bold text-xs rounded-full shadow-xl shadow-indigo-600/30 transition-transform active:scale-95"
      >
        <Bot className="w-4 h-4" />
        <span className="hidden sm:inline">AI Craving Counselor</span>
      </button>

      {/* Mobile Bottom Tab Navigation */}
      <MobileBottomNav activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Modals */}
      <SentinelAlarmModal
        isOpen={isAlarmOpen}
        event={alarmEvent}
        guardian={guardian}
        masterPin={masterPin}
        onDismiss={() => setIsAlarmOpen(false)}
        onOpenWellnessExercise={() => setActiveTab('wellness')}
      />

      <AiCounselorModal
        isOpen={isAiCounselorOpen}
        onClose={() => setIsAiCounselorOpen(false)}
        habits={habits}
        onTriggerWorkout={() => setActiveTab('wellness')}
      />

      <SubscriptionModal
        isOpen={isSubscriptionOpen}
        onClose={() => setIsSubscriptionOpen(false)}
        currentSub={subscription}
        onUpgrade={setSubscription}
      />

      <AppStoreExportModal
        isOpen={isAppStoreExportOpen}
        onClose={() => setIsAppStoreExportOpen(false)}
      />

      {/* Owner / Founder Admin Modal (PIN Protected, completely hidden from public users) */}
      <OwnerAdminModal
        isOpen={isOwnerAdminOpen}
        onClose={() => setIsOwnerAdminOpen(false)}
        masterPin={masterPin}
      />
    </div>
  );
}
