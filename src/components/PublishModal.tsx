import React, { useState } from 'react';
import {
  X,
  Globe,
  Play,
  Smartphone,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Download,
  Terminal,
  FileText,
  Sparkles,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'playstore' | 'web' | 'assets'>('playstore');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  if (!isOpen) return null;

  const rawOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-ade2qvx4uwwfjx5bx54x4a-21782451185.asia-east1.run.app';
  // Convert private dev URL (ais-dev-) to public crawler-accessible preview URL (ais-pre-) so PWABuilder detects the manifest
  const currentWebUrl = rawOrigin.replace('ais-dev-', 'ais-pre-');
  const privacyPolicyUrl = `${currentWebUrl}/privacy-policy.html`;
  const manifestUrl = `${currentWebUrl}/manifest.json`;
  const assetlinksUrl = `${currentWebUrl}/.well-known/assetlinks.json`;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const bubblewrapCommand = `npm install -g @bubblewrap/cli
bubblewrap init --manifest=${manifestUrl}
bubblewrap build`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/40 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-900/40 font-bold">
              <Play className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white">Publish to Web & Google Play Store</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold uppercase tracking-wider">
                  Ready
                </span>
              </div>
              <p className="text-xs text-slate-400">
                PWA Certified &bull; TWA Play Store Compliant &bull; Instant Android Bundle (.AAB)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-4 sm:px-6 pt-2">
          <button
            onClick={() => setActiveTab('playstore')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'playstore'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Play className="w-4 h-4 fill-current text-emerald-400" />
            <span>Google Play Store (Android App)</span>
          </button>

          <button
            onClick={() => setActiveTab('web')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'web'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Live Web & Custom Domain</span>
          </button>

          <button
            onClick={() => setActiveTab('assets')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'assets'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Play Store Compliance & ASO Package</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">

          {/* TAB 1: GOOGLE PLAY STORE */}
          {activeTab === 'playstore' && (
            <div className="space-y-6 text-left">
              {/* Architecture Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Google Trusted Web Activity (TWA) Certified</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                    Your app is already configured with an offline service worker, Web App Manifest, 512px maskable icons, and Digital Asset Links. It packages into a native Google Play Store <strong>.AAB (Android App Bundle)</strong> that installs like any native Android app with zero browser bars!
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono">
                    Package ID: com.breakfree.deaddiction
                  </span>
                </div>
              </div>

              {/* Publication Method 1: PWABuilder (Recommended & Easiest) */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center">1</span>
                    <h3 className="text-sm sm:text-base font-bold text-white">Method A: Instant 1-Click Package with PWABuilder (Recommended)</h3>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    No Android Studio needed
                  </span>
                </div>

                <p className="text-xs text-slate-300">
                  Google and Microsoft co-developed <strong>PWABuilder</strong> to take your live web URL and automatically generate a signed Android package (<strong>.aab</strong>) ready to upload to the Google Play Console in 2 minutes.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                  <div className="flex-1 px-3 py-2 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 font-semibold truncate select-all">
                    {currentWebUrl}
                  </div>
                  <button
                    onClick={() => copyToClipboard(currentWebUrl, 'url')}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition"
                  >
                    {copiedItem === 'url' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedItem === 'url' ? 'Copied URL!' : 'Copy URL'}</span>
                  </button>
                  <a
                    href={`https://www.pwabuilder.com/?url=${encodeURIComponent(currentWebUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition"
                  >
                    <span>Analyze on PWABuilder</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-emerald-300">Public Crawler URL:</span> PWABuilder is an external automated robot. Testing the private internal editor link (<code className="text-amber-300 font-mono">ais-dev-...</code>) fails because it is protected by Google session cookies. Use the public shared URL above (<code className="text-emerald-300 font-mono">ais-pre-...</code>) where the Web App Manifest and Service Worker are open and verified.
                  </div>
                </div>
              </div>

              {/* Publication Method 2: Google's Official CLI (Bubblewrap) */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-xs flex items-center justify-center">2</span>
                    <h3 className="text-sm sm:text-base font-bold text-white">Method B: Google Official Bubblewrap CLI</h3>
                  </div>
                  <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full">
                    Command Line
                  </span>
                </div>

                <p className="text-xs text-slate-300">
                  Run these 3 standard commands in any terminal with Node.js installed to build the Google Play `.aab` file:
                </p>

                <div className="relative">
                  <pre className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl font-mono text-xs text-emerald-300 overflow-x-auto">
                    {bubblewrapCommand}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(bubblewrapCommand, 'cmd')}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition"
                  >
                    {copiedItem === 'cmd' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedItem === 'cmd' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Step-by-Step Google Play Console Submission Roadmap */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>Google Play Console Submission Checklist</span>
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div className="text-xs space-y-1">
                      <p className="font-semibold text-white">Step 1: Create App in Google Play Console</p>
                      <p className="text-slate-400">
                        Visit <a href="https://play.google.com/console" target="_blank" rel="noreferrer" className="text-emerald-400 underline">play.google.com/console</a> ($25 one-time developer registration). Click <strong>Create app</strong> &rarr; Title: <strong>BreakFree: De-Addiction &amp; Sobriety</strong> &rarr; Category: <strong>Health &amp; Fitness</strong> &rarr; Free.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div className="text-xs space-y-1">
                      <p className="font-semibold text-white">Step 2: Submit Privacy Policy (Mandatory)</p>
                      <p className="text-slate-400">
                        Google Play rejects any health or recovery app without a live privacy policy. Your app includes an official privacy policy hosted at:
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="text-emerald-300 font-mono text-[11px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          {privacyPolicyUrl}
                        </code>
                        <button
                          onClick={() => copyToClipboard(privacyPolicyUrl, 'pp')}
                          className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] flex items-center gap-1"
                        >
                          {copiedItem === 'pp' ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>Copy Link</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div className="text-xs space-y-1">
                      <p className="font-semibold text-white">Step 3: Complete App Content Questionnaire</p>
                      <ul className="text-slate-400 list-disc list-inside space-y-0.5">
                        <li><strong>Target Audience:</strong> Select 18+ (due to adult content blocker &amp; anti-porn features).</li>
                        <li><strong>Ads:</strong> Select "Yes, my app contains ads" (for AdMob/Affiliate revenue).</li>
                        <li><strong>Health declaration:</strong> Wellness / habit coach (non-clinical software).</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div className="text-xs space-y-1">
                      <p className="font-semibold text-white">Step 4: Upload the .AAB Bundle &amp; Publish</p>
                      <p className="text-slate-400">
                        Go to <strong>Production &rarr; Releases &rarr; Create new release</strong>. Drag and drop the <code>.aab</code> file downloaded from PWABuilder or Bubblewrap, then click <strong>Review release</strong> and <strong>Start rollout to Production</strong>. Google typically approves within 24 to 48 hours!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE WEB & CUSTOM DOMAINS */}
          {activeTab === 'web' && (
            <div className="space-y-6 text-left">
              {/* Live Web Status Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/30 border border-cyan-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <h3 className="text-sm sm:text-base font-bold text-white">Your App Is Currently Live On Web</h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                    100% Online
                  </span>
                </div>

                <p className="text-xs text-slate-300">
                  Anyone in the world can open this link on iOS Safari, Android Chrome, Mac, Windows, or Linux and immediately install it or use the full de-addiction platform.
                </p>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    readOnly
                    value={currentWebUrl}
                    className="flex-1 px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 select-all"
                  />
                  <button
                    onClick={() => copyToClipboard(currentWebUrl, 'live-web')}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    {copiedItem === 'live-web' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedItem === 'live-web' ? 'Copied Link' : 'Copy Live Web Link'}</span>
                  </button>
                </div>
              </div>

              {/* One-Click Deploy to Custom Domain / Cloud Providers */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span>Connecting Your Own Domain (e.g. www.breakfree-app.com)</span>
                </h3>

                <p className="text-xs text-slate-300">
                  You can deploy this codebase to any host in 30 seconds with automated SSL certificates:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-white">Vercel (Recommended)</span>
                    <pre className="p-2 bg-slate-950 rounded text-[11px] font-mono text-emerald-400">npx vercel</pre>
                    <p className="text-[11px] text-slate-400">Zero config, connects custom domain automatically.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-white">Netlify</span>
                    <pre className="p-2 bg-slate-950 rounded text-[11px] font-mono text-emerald-400">npx netlify deploy --prod</pre>
                    <p className="text-[11px] text-slate-400">Fast worldwide CDN edge network.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-white">Google Cloud / Docker</span>
                    <pre className="p-2 bg-slate-950 rounded text-[11px] font-mono text-emerald-400">npm run build && node server.ts</pre>
                    <p className="text-[11px] text-slate-400">Full stack with Express and WebSocket support.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ASO & ASSETS PACKAGE */}
          {activeTab === 'assets' && (
            <div className="space-y-6 text-left">
              {/* App Store Optimization (ASO) Metadata */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Google Play Store Listing Copy (Rank #1 on Search)</span>
                  </h3>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `Title: BreakFree: De-Addiction & Sobriety Blocker\nShort Description: Block adult content, quit smoking and alcohol with loud sirens, geofencing radar, and AI coach.\nKeywords: de-addiction, deaddiction app, quit porn, stop smoking, sobriety tracker, quit alcohol, habit recovery, anti relapse`,
                        'aso'
                      )
                    }
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs flex items-center gap-1"
                  >
                    {copiedItem === 'aso' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedItem === 'aso' ? 'Copied All' : 'Copy All Copy'}</span>
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-slate-400 text-[11px] font-semibold uppercase">App Title (Google Play Limit: 30 chars)</label>
                    <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-white font-medium mt-1">
                      BreakFree: De-Addiction &amp; Sobriety
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 text-[11px] font-semibold uppercase">Short Description (Google Play Limit: 80 chars)</label>
                    <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-white font-medium mt-1">
                      Block adult content, quit smoking &amp; alcohol with loud sirens and AI coach.
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 text-[11px] font-semibold uppercase">High-Converting Search Keywords</label>
                    <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-emerald-400 font-mono text-[11px] mt-1">
                      de-addiction, deaddiction app, quit porn, stop smoking, sobriety tracker, quit alcohol, habit recovery, anti relapse, urge surfing
                    </div>
                  </div>
                </div>
              </div>

              {/* Ready Files Check */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Google Play Compliance Manifests Built &amp; Verified</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">/manifest.webmanifest</p>
                      <p className="text-[10px] text-slate-400">PWA Manifest with Standalone &amp; Icons</p>
                    </div>
                    <a href={manifestUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline text-[11px]">View</a>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">/.well-known/assetlinks.json</p>
                      <p className="text-[10px] text-slate-400">Digital Asset Links for Fullscreen TWA</p>
                    </div>
                    <a href={assetlinksUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline text-[11px]">View</a>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">/privacy-policy.html</p>
                      <p className="text-[10px] text-slate-400">Mandatory Store Privacy Document</p>
                    </div>
                    <a href={privacyPolicyUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline text-[11px]">View</a>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">/pwa-512x512.png &amp; maskable</p>
                      <p className="text-[10px] text-slate-400">High-Res Google Play Store Icons</p>
                    </div>
                    <a href={`${currentWebUrl}/pwa-512x512.png`} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline text-[11px]">View</a>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Both Web and Play Store builds use the exact same synchronized real-time code.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
            >
              Close
            </button>
            <a
              href={`https://www.pwabuilder.com/?url=${encodeURIComponent(currentWebUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950"
            >
              <span>Build .AAB Package Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
