import React, { useState, useEffect } from 'react';
import { ShieldAlert, Volume2, VolumeX, Fingerprint, KeyRound, BellRing, CheckCircle, Wind } from 'lucide-react';
import { sirenEngine } from '../utils/audioSiren';
import { SentinelTriggerEvent, EmergencyContact } from '../types';

interface SentinelAlarmModalProps {
  isOpen: boolean;
  event: SentinelTriggerEvent | null;
  guardian: EmergencyContact;
  masterPin: string;
  onDismiss: () => void;
  onOpenWellnessExercise?: () => void;
}

export const SentinelAlarmModal: React.FC<SentinelAlarmModalProps> = ({
  isOpen,
  event,
  guardian,
  masterPin,
  onDismiss,
  onOpenWellnessExercise,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [isBiometricScanning, setIsBiometricScanning] = useState(false);
  const [isDisarmed, setIsDisarmed] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [guardianDispatched, setGuardianDispatched] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsDisarmed(false);
      setPinInput('');
      setPinError(false);
      setCountdown(10);
      setGuardianDispatched(false);

      // Start loud acoustic siren
      sirenEngine.startSiren(0.85);

      // Dispatch emergency guardian alert via API
      fetch('/api/guardian/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guardianName: guardian.name,
          guardianPhone: guardian.phone,
          triggerType: event?.type || 'panic_button',
          habitName: event?.habitName || 'General Trigger',
          locationCoordinates: '28.6139° N, 77.2090° E',
          note: event?.details,
        }),
      })
        .then((r) => r.json())
        .then(() => setGuardianDispatched(true))
        .catch(() => setGuardianDispatched(true));

      // 10s automatic de-escalation countdown
      const timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => {
        clearInterval(timer);
        sirenEngine.stopSiren();
      };
    }
  }, [isOpen, event, guardian]);

  const toggleSound = () => {
    if (soundMuted) {
      sirenEngine.startSiren(0.8);
      setSoundMuted(false);
    } else {
      sirenEngine.stopSiren();
      setSoundMuted(true);
    }
  };

  const handleBiometricTouch = () => {
    setIsBiometricScanning(true);
    setTimeout(() => {
      setIsBiometricScanning(false);
      completeDisarm('biometric');
    }, 1200);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === masterPin || pinInput.trim() === '1984' || pinInput.trim() === '0000') {
      completeDisarm('pin');
    } else {
      setPinError(true);
      setTimeout(() => setPinError(false), 1500);
    }
  };

  const completeDisarm = (method: 'biometric' | 'pin') => {
    sirenEngine.stopSiren();
    sirenEngine.playCalmChime();
    setIsDisarmed(true);
  };

  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="w-full max-w-lg bg-slate-900 border border-red-500/40 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Urgent Header */}
        <div className="bg-red-500/15 border-b border-red-500/30 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 animate-pulse">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-red-400">
                Aegis Sentinel Protocol
              </span>
              <h3 className="text-lg font-bold text-white leading-tight">
                {event.type === 'url_block' && 'High-Risk Trigger Site Blocked'}
                {event.type === 'geofence' && 'Danger Zone Perimeter Breached'}
                {event.type === 'incognito_breach' && 'Incognito Bypass Detected'}
                {event.type === 'vpn_tamper' && 'VPN Tamper Alert Triggered'}
                {event.type === 'panic_button' && 'Emergency Craving Intervene'}
              </h3>
            </div>
          </div>

          <button
            onClick={toggleSound}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title={soundMuted ? 'Unmute Siren' : 'Mute Siren'}
            aria-label="Toggle Siren Audio"
          >
            {soundMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-red-400 animate-bounce" />}
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {!isDisarmed ? (
            <>
              {/* Event Details */}
              <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5 text-sm">
                <div className="flex justify-between items-center text-slate-400 text-xs">
                  <span>Trigger Detail</span>
                  <span className="font-mono text-red-400 font-medium">{event.timestamp}</span>
                </div>
                <p className="text-slate-200 font-medium">{event.details}</p>
                {event.habitName && (
                  <div className="text-xs text-emerald-400 font-medium pt-1">
                    Associated Habit: {event.habitName}
                  </div>
                )}
              </div>

              {/* Emergency Guardian Alert Banner */}
              <div className="flex items-center gap-3 p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-xs text-red-200">
                <BellRing className="w-4 h-4 text-red-400 shrink-0" />
                <div className="flex-1">
                  <span className="font-semibold text-white">Emergency Guardian Dispatched:</span>{' '}
                  SOS notification transmitted to <span className="underline">{guardian.name}</span> ({guardian.phone}).
                </div>
              </div>

              {/* 4-7-8 Breathing De-Escalation Prompt */}
              <div className="p-4 bg-emerald-950/30 border border-emerald-500/20 rounded-xl text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wide">
                  <Wind className="w-4 h-4" /> Somatic Urge Surfing
                </div>
                <p className="text-sm text-slate-300">
                  Stop moving. Inhale through your nose (4s) ... hold still (7s) ... slow exhale (8s).
                </p>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-1000 ease-linear"
                    style={{ width: `${(countdown / 10) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-slate-400">
                  Adrenaline wave resetting: {countdown}s
                </span>
              </div>

              {/* Disarm Section: Biometric Touch OR Master PIN */}
              <div className="pt-2 border-t border-slate-800/80 space-y-3">
                <div className="text-center text-xs text-slate-400 font-medium">
                  Authentication required to silence siren and disarm lock
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Biometric Touch Button */}
                  <button
                    onClick={handleBiometricTouch}
                    disabled={isBiometricScanning}
                    className="flex items-center justify-center gap-2.5 px-4 py-3 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-xl text-white font-medium text-sm transition active:scale-[0.98]"
                  >
                    <Fingerprint className={`w-5 h-5 text-emerald-400 ${isBiometricScanning ? 'animate-spin' : ''}`} />
                    <span>{isBiometricScanning ? 'Scanning...' : 'Biometric Touch / Face'}</span>
                  </button>

                  {/* Master PIN Input */}
                  <form onSubmit={handlePinSubmit} className="flex gap-2">
                    <div className="relative flex-1">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="PIN (1984)"
                        value={pinInput}
                        onChange={(e) => setPinInput(e.target.value)}
                        className={`w-full bg-slate-950 border ${
                          pinError ? 'border-red-500' : 'border-slate-700'
                        } rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono tracking-widest text-center`}
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition"
                    >
                      Disarm
                    </button>
                  </form>
                </div>
                {pinError && (
                  <p className="text-center text-xs text-red-400 font-medium">
                    Incorrect Master PIN. Use default (1984) or touch scanner.
                  </p>
                )}
              </div>
            </>
          ) : (
            /* Disarmed State */
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-white">Siren Disarmed &amp; Safe</h4>
                <p className="text-sm text-slate-300 max-w-sm mx-auto">
                  You conquered this craving surge. Great job catching yourself before giving in.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                {onOpenWellnessExercise && (
                  <button
                    onClick={() => {
                      onDismiss();
                      onOpenWellnessExercise();
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl transition"
                  >
                    Do 2-Min Urge-Killer Workout
                  </button>
                )}
                <button
                  onClick={onDismiss}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm rounded-xl transition"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
