import React, { useState } from 'react';
import { ShieldAlert, Globe, BellRing, KeyRound, Fingerprint, Lock, CheckCircle, AlertTriangle, Play } from 'lucide-react';
import { EmergencyContact } from '../types';

interface SentinelInterceptorViewProps {
  guardian: EmergencyContact;
  onUpdateGuardian: (g: EmergencyContact) => void;
  masterPin: string;
  onUpdatePin: (pin: string) => void;
  onSimulateUrlBlock: (url: string) => void;
}

export const SentinelInterceptorView: React.FC<SentinelInterceptorViewProps> = ({
  guardian,
  onUpdateGuardian,
  masterPin,
  onUpdatePin,
  onSimulateUrlBlock,
}) => {
  const [testUrl, setTestUrl] = useState('https://explicit-adult-trigger.com');
  const [editingGuardian, setEditingGuardian] = useState(false);
  const [tempGuardian, setTempGuardian] = useState(guardian);
  const [newPin, setNewPin] = useState(masterPin);
  const [pinSaved, setPinSaved] = useState(false);

  const blockedCategories = [
    { title: 'Adult Content & Pornography Sites', count: '1,420,000+ domains', icon: ShieldAlert },
    { title: 'Online Gambling & Casino Loot Boxes', count: '85,000+ domains', icon: Lock },
    { title: 'Extreme Doomscroll & Reel Portals', count: 'Custom time limiters', icon: Globe },
    { title: 'Vape & Nicotine E-Commerce Stores', count: '12,000+ domains', icon: AlertTriangle },
  ];

  const handleSaveGuardian = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateGuardian(tempGuardian);
    setEditingGuardian(false);
  };

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length === 4) {
      onUpdatePin(newPin);
      setPinSaved(true);
      setTimeout(() => setPinSaved(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-900/90 border border-emerald-500/30 rounded-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Browser Content Interceptor &amp; Guardian Link</h3>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-red-500/20 text-red-300 rounded border border-red-500/30 uppercase">
                  Zero-Tolerance Active
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Intercepts harmful domains at the DNS level. Instantly sounds loud siren and dispatches SOS SMS.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Simulator: Test Web Block Trigger */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Play className="w-4 h-4 text-emerald-400" />
            Interactive Domain Interception Simulator
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Simulate what happens when an attempt is made to visit an adult or trigger domain:
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
            <input
              type="text"
              value={testUrl}
              onChange={(e) => setTestUrl(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
            />
          </div>

          <button
            onClick={() => onSimulateUrlBlock(testUrl)}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shrink-0 active:scale-95 shadow-md shadow-red-600/20"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Test Trigger Interception</span>
          </button>
        </div>
      </div>

      {/* Blocked Categories Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {blockedCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{cat.title}</div>
                  <div className="text-[11px] text-slate-400">{cat.count}</div>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                Blocked
              </span>
            </div>
          );
        })}
      </div>

      {/* Emergency Guardian & Master PIN Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Emergency Guardian */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <BellRing className="w-4 h-4 text-emerald-400" />
              Emergency Accountability Guardian
            </h4>
            <button
              onClick={() => setEditingGuardian(!editingGuardian)}
              className="text-xs text-emerald-400 font-semibold hover:underline"
            >
              {editingGuardian ? 'Close' : 'Edit'}
            </button>
          </div>

          {!editingGuardian ? (
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Guardian Name:</span>
                <span className="font-bold text-white">{guardian.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Phone Number:</span>
                <span className="font-mono text-emerald-400 font-bold">{guardian.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Relationship:</span>
                <span className="text-slate-300">{guardian.relationship}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center gap-1.5 text-[11px] text-emerald-400">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Automated SMS Cellular Gateway Armed</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveGuardian} className="space-y-2.5 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Guardian Name</label>
                <input
                  type="text"
                  value={tempGuardian.name}
                  onChange={(e) => setTempGuardian({ ...tempGuardian, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Phone (for SOS alerts)</label>
                <input
                  type="text"
                  value={tempGuardian.phone}
                  onChange={(e) => setTempGuardian({ ...tempGuardian, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono"
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setEditingGuardian(false)}
                  className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-emerald-600 text-white font-semibold rounded-lg"
                >
                  Save Guardian
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Master Disarm Security PIN & Biometrics */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-emerald-400" />
            Master Disarm PIN &amp; Biometrics
          </h4>

          <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">WebAuthn Biometrics:</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Fingerprint className="w-3.5 h-3.5" /> Platform Authenticator Ready
              </span>
            </div>

            <form onSubmit={handleSavePin} className="space-y-2 pt-1 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-slate-400">Master 4-Digit Disarm PIN:</label>
                <input
                  type="password"
                  maxLength={4}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  className="w-24 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-center font-mono font-bold text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg text-xs transition"
              >
                {pinSaved ? 'Master PIN Updated!' : 'Update Master PIN'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
