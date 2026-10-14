import React, { useState } from 'react';
import { Apple, Smartphone, Copy, Check, X, ShieldCheck, FileText, Code2, ExternalLink } from 'lucide-react';

interface AppStoreExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppStoreExportModal: React.FC<AppStoreExportModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'ios' | 'android' | 'privacy'>('ios');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const iosCapacitorCode = `# 1. Install Capacitor Native Bridge
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android

# 2. Initialize App Bundle & Build
npx cap init "Aegis Recovery" "com.aegis.recovery.app" --web-dir dist
npm run build
npx cap add ios
npx cap add android

# 3. Add Native Background Geolocation & Audio Plugins
npm install @capacitor/geolocation @capacitor-community/keep-awake

# 4. Open in Xcode to deploy to Apple App Store
npx cap open ios`;

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-950 to-slate-900 border-b border-slate-800 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Apple className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Apple App Store &amp; Play Store Package</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Ready to Publish
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Capacitor / React Native deployment bridge and store review compliance checklist.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-6 gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('ios')}
            className={`py-3 flex items-center gap-1.5 border-b-2 transition ${
              activeTab === 'ios'
                ? 'border-emerald-500 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Apple className="w-4 h-4" />
            <span>Apple App Store (iOS)</span>
          </button>

          <button
            onClick={() => setActiveTab('android')}
            className={`py-3 flex items-center gap-1.5 border-b-2 transition ${
              activeTab === 'android'
                ? 'border-emerald-500 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Google Play Store (Android)</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`py-3 flex items-center gap-1.5 border-b-2 transition ${
              activeTab === 'privacy'
                ? 'border-emerald-500 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Privacy Policy &amp; Terms</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {activeTab === 'ios' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <span className="font-bold text-white text-xs block">
                  1. One-Command Native iOS Capacitor Setup
                </span>
                <p className="text-slate-400">
                  Because this app is built with standard Vite and React, it wraps seamlessly into an Xcode project using Capacitor without rewriting your code:
                </p>
                <div className="relative">
                  <pre className="p-3 bg-slate-900 border border-slate-800 rounded-lg font-mono text-[11px] text-emerald-400 overflow-x-auto leading-relaxed">
                    {iosCapacitorCode}
                  </pre>
                  <button
                    onClick={() => copyCode(iosCapacitorCode)}
                    className="absolute right-2 top-2 p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white transition"
                    title="Copy Command Block"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <span className="font-bold text-white text-xs block">
                  2. Apple App Review Safety Guidelines
                </span>
                <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                  <li>
                    <strong>Section 1.2 (User-Generated Content):</strong> Community forum includes anonymous reporting and moderation filters.
                  </li>
                  <li>
                    <strong>Section 3.1.1 (In-App Purchases):</strong> Subscriptions (₹299/mo) can be wired directly to Apple StoreKit 2 product ID <code>com.aegis.pro.monthly</code>.
                  </li>
                  <li>
                    <strong>Section 5.1.1 (Location):</strong> The GPS danger geofence radar requires the <code>NSLocationWhenInUseUsageDescription</code> key in <code>Info.plist</code>.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'android' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <span className="font-bold text-white text-xs block">
                  Google Play Store Publishing Steps
                </span>
                <ol className="space-y-2 text-slate-300 list-decimal list-inside">
                  <li>
                    Run <code>npx cap add android</code> in terminal.
                  </li>
                  <li>
                    Run <code>npx cap open android</code> to launch the project in Android Studio.
                  </li>
                  <li>
                    Configure <code>VpnService</code> and <code>ACCESS_FINE_LOCATION</code> in <code>AndroidManifest.xml</code> for the anti-bypass shield and geofencing.
                  </li>
                  <li>
                    Generate a Signed Android App Bundle (AAB): <strong>Build &gt; Generate Signed Bundle / APK</strong>.
                  </li>
                  <li>
                    Upload to Google Play Console with your ₹299 monthly recurring in-app subscription product.
                  </li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-3">
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <span className="font-bold text-white text-xs block">
                  Exportable Store Privacy Policy (Mandatory)
                </span>
                <p className="text-slate-400 leading-relaxed">
                  Aegis Recovery adheres to zero-knowledge privacy standards: All recovery logs, streaks, and geofence locations are stored locally on the user's device. No personal health records are shared with third parties or sold to advertisers.
                </p>
                <div className="p-3 bg-slate-900 rounded-lg text-slate-300 font-mono text-[11px] leading-relaxed">
                  URL for App Store Connect: <code>https://aegis-recovery.app/privacy-policy</code>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
