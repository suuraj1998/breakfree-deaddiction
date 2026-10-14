import React, { useState } from 'react';
import { ShieldCheck, Lock, AlertTriangle, EyeOff, Radio, Smartphone, Download, Check, ShieldAlert } from 'lucide-react';

interface AntiBypassShieldProps {
  onSimulateBypass: (type: 'incognito_breach' | 'vpn_tamper') => void;
}

export const AntiBypassShield: React.FC<AntiBypassShieldProps> = ({ onSimulateBypass }) => {
  const [vpnSlotLocked, setVpnSlotLocked] = useState(true);
  const [incognitoLockEnabled, setIncognitoLockEnabled] = useState(true);
  const [coolOffDelayHours] = useState(24);
  const [copiedConfig, setCopiedConfig] = useState(false);
  const [simulatingBypass, setSimulatingBypass] = useState<string | null>(null);

  const handleTestAttack = (type: 'incognito_breach' | 'vpn_tamper') => {
    setSimulatingBypass(type);
    setTimeout(() => {
      setSimulatingBypass(null);
      onSimulateBypass(type);
    }, 800);
  };

  const copyMobileConfig = () => {
    const configXml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadDisplayName</key>
  <string>Aegis Recovery Anti-Bypass Profile</string>
  <key>PayloadIdentifier</key>
  <string>com.aegis.recovery.antibypass</string>
  <key>PayloadType</key>
  <string>Configuration</string>
  <key>Restrictions</key>
  <dict>
    <key>safariAllowPrivateBrowsing</key>
    <false/>
    <key>allowVPNCreation</key>
    <false/>
  </dict>
</dict>
</plist>`;
    navigator.clipboard.writeText(configXml);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-900/90 border border-emerald-500/30 rounded-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Ironclad Anti-Bypass Architecture</h3>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30 uppercase">
                  Armed &amp; Active
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Defeats common bypass methods: 3rd-party VPNs, Incognito browsing, and impulse app uninstallation.
              </p>
            </div>
          </div>

          <button
            onClick={copyMobileConfig}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 rounded-xl transition"
          >
            {copiedConfig ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4 text-slate-400" />}
            <span>{copiedConfig ? 'Profile Copied!' : 'Export iOS / Knox Profile'}</span>
          </button>
        </div>
      </div>

      {/* 3 Pillars of Anti-Bypass Defense */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pillar 1: VPN Slot Lock */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Radio className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Slot Reserved
            </span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Local VPN Loopback Lock</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Aegis acts as the device's local encrypted DNS filter. Android and iOS allow only <strong>one</strong> active VPN. If a user turns on an external VPN (Nord/Express), Aegis is knocked offline—which triggers the tamper siren and guardian alert!
            </p>
          </div>
          <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs text-slate-400">
            <span>Tunnel Protocol</span>
            <span className="font-mono text-slate-200 font-medium">Local 127.0.0.1:53</span>
          </div>
        </div>

        {/* Pillar 2: Incognito Lockdown */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <EyeOff className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Supervised Active
            </span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Incognito Mode Lockdown</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Employs browser storage persistence checks and Screen Time / Knox restriction policies that disable private windows in Chrome, Safari, and Edge. If opened, Aegis flags the browser breach immediately.
            </p>
          </div>
          <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs text-slate-400">
            <span>Private Tabs Policy</span>
            <span className="font-medium text-amber-400">Strictly Disallowed</span>
          </div>
        </div>

        {/* Pillar 3: Guardian Co-Signature Delay */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-rose-400 flex items-center gap-1">
              {coolOffDelayHours}h Delay Armed
            </span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Anti-Relapse Uninstall Shield</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Prevents deleting or disabling Aegis during late-night cravings. Any modification requires a guardian co-signature authorization code or initiates a mandatory 24-hour cooldown while sending an SOS alert to your sponsor.
            </p>
          </div>
          <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs text-slate-400">
            <span>Cooldown Period</span>
            <span className="font-mono text-slate-200 font-medium">24 Hours</span>
          </div>
        </div>
      </div>

      {/* Interactive Anti-Bypass Testing Lab */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            Live Anti-Bypass Attack Simulator
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Test how Aegis immediately neutralizes relapse bypass attempts and dispatches accountability alerts:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Test 1: Incognito Attempt */}
          <button
            onClick={() => handleTestAttack('incognito_breach')}
            disabled={simulatingBypass !== null}
            className="flex items-center gap-3 p-3.5 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/40 rounded-xl text-left transition group active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <EyeOff className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                Simulate Incognito Tab Open
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Simulates user opening private browser to search triggers. Triggers alarm &amp; SOS.
              </div>
            </div>
          </button>

          {/* Test 2: External VPN Bypass */}
          <button
            onClick={() => handleTestAttack('vpn_tamper')}
            disabled={simulatingBypass !== null}
            className="flex items-center gap-3 p-3.5 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-red-500/40 rounded-xl text-left transition group active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-lg bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
              <AlertTriangle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-red-300 transition-colors">
                Simulate 3rd-Party VPN Bypass Attempt
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Simulates turning on NordVPN to tunnel past DNS. Triggers tamper siren &amp; SOS.
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
