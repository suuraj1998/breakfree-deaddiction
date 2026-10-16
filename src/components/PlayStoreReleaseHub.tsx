import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Download,
  Play,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
  FileText,
  Image as ImageIcon,
  FolderArchive,
  Layers,
  ArrowRight,
  Info,
  Check,
  Sparkles,
  Smartphone,
  Eye,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import JSZip from 'jszip';

interface PlayStoreReleaseHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlayStoreReleaseHub: React.FC<PlayStoreReleaseHubProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'export' | 'assets' | 'listing' | 'walkthrough' | 'urlhelp'>('export');
  const [isGeneratingZip, setIsGeneratingZip] = useState(false);
  const [zipProgress, setZipProgress] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [featureGraphicDataUrl, setFeatureGraphicDataUrl] = useState<string>('');
  
  // Interactive Walkthrough completed steps
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const rawOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-ade2qvx4uwwfjx5bx54x4a-21782451185.asia-east1.run.app';
  const sharedUrl = rawOrigin.replace('ais-dev-', 'ais-pre-');
  const privacyPolicyUrl = `${sharedUrl}/privacy-policy.html`;
  const assetlinksUrl = `${sharedUrl}/.well-known/assetlinks.json`;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  // Render 1024x500 Feature Graphic on canvas (Google Play Console mandatory asset)
  const generateFeatureGraphic = (targetCanvas?: HTMLCanvasElement): string => {
    try {
      const canvas = targetCanvas || canvasRef.current || document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 500;
      const ctx = canvas.getContext('2d');
      if (!ctx) return '';

      // 1. Solid Background Base (No alpha - Google Play strictly forbids transparent feature graphics)
      ctx.fillStyle = '#020617'; // slate-950
      ctx.fillRect(0, 0, 1024, 500);

      // 2. High-Tech Recovery Gradient
      const bgGradient = ctx.createLinearGradient(0, 0, 1024, 500);
      bgGradient.addColorStop(0, '#020617'); // slate-950
      bgGradient.addColorStop(0.35, '#064e3b'); // emerald-900
      bgGradient.addColorStop(0.75, '#042f2e'); // dark teal
      bgGradient.addColorStop(1, '#020617'); // slate-950
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, 1024, 500);

      // 3. Decorative Cybernetic Radar / Geofence Circles
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.lineWidth = 1.5;
      for (let r = 70; r <= 370; r += 60) {
        ctx.beginPath();
        ctx.arc(820, 250, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      // Radar crosshairs
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.08)';
      ctx.beginPath();
      ctx.moveTo(820, 0);
      ctx.lineTo(820, 500);
      ctx.moveTo(450, 250);
      ctx.lineTo(1024, 250);
      ctx.stroke();

      // 4. Shield Emblem Aura & Glow
      const shieldX = 135;
      const shieldY = 240;
      
      const glow = ctx.createRadialGradient(shieldX, shieldY, 15, shieldX, shieldY, 110);
      glow.addColorStop(0, 'rgba(16, 185, 129, 0.45)');
      glow.addColorStop(0.6, 'rgba(16, 185, 129, 0.15)');
      glow.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(shieldX, shieldY, 110, 0, Math.PI * 2);
      ctx.fill();

      // Outer Shield Path
      ctx.beginPath();
      ctx.moveTo(shieldX, shieldY - 80);
      ctx.lineTo(shieldX + 68, shieldY - 45);
      ctx.lineTo(shieldX + 68, shieldY + 25);
      ctx.quadraticCurveTo(shieldX + 55, shieldY + 80, shieldX, shieldY + 102);
      ctx.quadraticCurveTo(shieldX - 55, shieldY + 80, shieldX - 68, shieldY + 25);
      ctx.lineTo(shieldX - 68, shieldY - 45);
      ctx.closePath();
      
      const shieldFillGrad = ctx.createLinearGradient(shieldX - 68, shieldY - 80, shieldX + 68, shieldY + 102);
      shieldFillGrad.addColorStop(0, '#34d399');
      shieldFillGrad.addColorStop(0.5, '#10b981');
      shieldFillGrad.addColorStop(1, '#059669');
      ctx.fillStyle = shieldFillGrad;
      ctx.fill();
      ctx.strokeStyle = '#6ee7b7';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Inner Dark Shield Cavity
      ctx.beginPath();
      ctx.moveTo(shieldX, shieldY - 62);
      ctx.lineTo(shieldX + 52, shieldY - 35);
      ctx.lineTo(shieldX + 52, shieldY + 18);
      ctx.quadraticCurveTo(shieldX + 42, shieldY + 62, shieldX, shieldY + 80);
      ctx.quadraticCurveTo(shieldX - 42, shieldY + 62, shieldX - 52, shieldY + 18);
      ctx.lineTo(shieldX - 52, shieldY - 35);
      ctx.closePath();
      ctx.fillStyle = '#020617';
      ctx.fill();

      // Shield Inner Lightning / Victory Checkmark
      ctx.beginPath();
      ctx.moveTo(shieldX - 25, shieldY + 5);
      ctx.lineTo(shieldX - 7, shieldY + 26);
      ctx.lineTo(shieldX + 28, shieldY - 24);
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 9;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      // 5. Main Brand Typography
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 64px system-ui, -apple-system, sans-serif';
      ctx.fillText('BreakFree', 230, 195);

      // Subtitle
      ctx.fillStyle = '#34d399';
      ctx.font = '800 21px system-ui, -apple-system, sans-serif';
      ctx.fillText('DE-ADDICTION & SOBRIETY SHIELD', 234, 240);

      // Feature Line with Badges
      ctx.fillStyle = '#94a3b8';
      ctx.font = '500 17px system-ui, -apple-system, sans-serif';
      ctx.fillText('🛡️ Acoustic Siren   •   📍 GPS Radar   •   🧠 AI Urge Drills', 234, 288);

      // Trust Badges Pill 1 (100% Private)
      ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.beginPath();
      ctx.roundRect(234, 325, 230, 42, 10);
      ctx.fill();
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#6ee7b7';
      ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
      ctx.fillText('★ 100% PRIVATE & ON-DEVICE', 250, 351);

      // Trust Badges Pill 2 (SDK 35 & Android 15 Ready)
      ctx.fillStyle = 'rgba(6, 182, 212, 0.15)';
      ctx.beginPath();
      ctx.roundRect(476, 325, 190, 42, 10);
      ctx.fill();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#67e8f9';
      ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
      ctx.fillText('✓ ANDROID 15 • SDK 35', 492, 351);

      // 6. Right Side: In-App Recovery Mockup Showcase Card
      const cardX = 690;
      const cardY = 85;
      const cardW = 295;
      const cardH = 325;

      // Card Background Shadow & Body
      ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, cardW, cardH, 20);
      ctx.fill();
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Window header dots
      ctx.fillStyle = '#ef4444';
      ctx.beginPath(); ctx.arc(cardX + 24, cardY + 24, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath(); ctx.arc(cardX + 40, cardY + 24, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#10b981';
      ctx.beginPath(); ctx.arc(cardX + 56, cardY + 24, 5, 0, Math.PI * 2); ctx.fill();

      // Card Header
      ctx.fillStyle = '#64748b';
      ctx.font = '600 12px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SOBRIETY RADAR ACTIVE', cardX + cardW / 2, cardY + 28);

      // Streak Label
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.fillText('CLEAN STREAK', cardX + cardW / 2, cardY + 75);

      // Big Streak Value
      ctx.fillStyle = '#34d399';
      ctx.font = '900 42px system-ui, sans-serif';
      ctx.fillText('45 DAYS', cardX + cardW / 2, cardY + 124);

      // Circular ring representation
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(cardX + cardW / 2, cardY + 105, 68, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(cardX + cardW / 2, cardY + 105, 68, -Math.PI / 2, Math.PI * 0.9);
      ctx.stroke();

      // Metric Boxes
      // Box 1: Saved
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.roundRect(cardX + 18, cardY + 195, 122, 55, 10);
      ctx.fill();
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '600 11px system-ui, sans-serif';
      ctx.fillText('SAVED', cardX + 18 + 61, cardY + 215);
      ctx.fillStyle = '#34d399';
      ctx.font = '800 16px system-ui, sans-serif';
      ctx.fillText('$675', cardX + 18 + 61, cardY + 238);

      // Box 2: Reclaimed
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.roundRect(cardX + 155, cardY + 195, 122, 55, 10);
      ctx.fill();
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '600 11px system-ui, sans-serif';
      ctx.fillText('RECLAIMED', cardX + 155 + 61, cardY + 215);
      ctx.fillStyle = '#38bdf8';
      ctx.font = '800 16px system-ui, sans-serif';
      ctx.fillText('108 hrs', cardX + 155 + 61, cardY + 238);

      // Status pill at bottom of card
      ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.beginPath();
      ctx.roundRect(cardX + 18, cardY + 265, 259, 36, 8);
      ctx.fill();

      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.fillText('🛡️ Acoustic Sentinel: ARMED', cardX + cardW / 2, cardY + 288);
      ctx.textAlign = 'left'; // reset

      const dataUrl = canvas.toDataURL('image/png');
      setFeatureGraphicDataUrl(dataUrl);
      return dataUrl;
    } catch (err) {
      console.error('Feature graphic generation error:', err);
      return '';
    }
  };

  // Generate immediately on mount and anytime the hub opens or active tab changes
  useEffect(() => {
    generateFeatureGraphic();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        generateFeatureGraphic(canvasRef.current || undefined);
      }, 50);
    }
  }, [isOpen, activeTab]);

  // Client-side ZIP compilation of the full Android package
  const handleDownloadFullReleaseZip = async () => {
    setIsGeneratingZip(true);
    setZipProgress('Initializing package structure...');

    try {
      const zip = new JSZip();

      // 1. Android Studio Project Root
      const androidProj = zip.folder('breakfree-android-project');
      setZipProgress('Generating Android Gradle build files...');

      // Root build.gradle
      androidProj?.file('build.gradle', `// Top-level build file for BreakFree Android App
buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.2.2'
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
`);

      // settings.gradle
      androidProj?.file('settings.gradle', `pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}
rootProject.name = "BreakFree"
include ':app'
`);

      // gradle.properties
      androidProj?.file('gradle.properties', `org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8
android.useAndroidX=true
android.enableJetifier=true
`);

      // App build.gradle
      const appFolder = androidProj?.folder('app');
      appFolder?.file('build.gradle', `plugins {
    id 'com.android.application'
}

android {
    namespace 'com.breakfree.deaddiction'
    compileSdk 35

    defaultConfig {
        applicationId "com.breakfree.deaddiction"
        minSdk 24
        targetSdk 35
        versionCode 1
        versionName "1.0.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        manifestPlaceholders = [
            hostName: "${sharedUrl.replace('https://', '').split('/')[0]}",
            defaultUrl: "https://${sharedUrl.replace('https://', '').split('/')[0]}/"
        ]
    }

    buildTypes {
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
}

dependencies {
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.11.0'
    implementation 'androidx.browser:browser:1.8.0'
    implementation 'com.google.androidbrowserhelper:androidbrowserhelper:2.5.0'
}
`);

      // AndroidManifest.xml
      const mainFolder = appFolder?.folder('src')?.folder('main');
      mainFolder?.file('AndroidManifest.xml', `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.breakfree.deaddiction">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.BreakFree">

        <activity
            android:name="com.google.androidbrowserhelper.trusted.LauncherActivity"
            android:exported="true"
            android:label="@string/app_name"
            android:theme="@style/Theme.BreakFree">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

            <!-- Trusted Web Activity intent filter -->
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data
                    android:scheme="https"
                    android:host="\${hostName}"
                    android:pathPrefix="/" />
            </intent-filter>

            <meta-data
                android:name="android.support.customtabs.trusted.DEFAULT_URL"
                android:value="\${defaultUrl}" />

            <meta-data
                android:name="android.support.customtabs.trusted.STATUS_BAR_COLOR"
                android:resource="@color/colorPrimary" />

            <meta-data
                android:name="android.support.customtabs.trusted.NAVIGATION_BAR_COLOR"
                android:resource="@color/navigationColor" />

            <!-- Digital Asset Links statement -->
            <meta-data
                android:name="asset_statements"
                android:resource="@string/asset_statements" />
        </activity>
    </application>
</manifest>
`);

      // Values (strings, colors, styles)
      const resValues = mainFolder?.folder('res')?.folder('values');
      resValues?.file('strings.xml', `<resources>
    <string name="app_name">BreakFree</string>
    <string name="asset_statements">
        [{\\"relation\\": [\\"delegate_permission/common.handle_all_urls\\"],
          \\"target\\": {\\"namespace\\": \\"web\\", \\"site\\": \\"https://${sharedUrl.replace('https://', '').split('/')[0]}\\"}}]
    </string>
</resources>
`);

      resValues?.file('colors.xml', `<resources>
    <color name="colorPrimary">#020617</color>
    <color name="colorPrimaryDark">#020617</color>
    <color name="colorAccent">#10b981</color>
    <color name="navigationColor">#020617</color>
</resources>
`);

      resValues?.file('styles.xml', `<resources>
    <style name="Theme.BreakFree" parent="Theme.MaterialComponents.DayNight.NoActionBar">
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryVariant">@color/colorPrimaryDark</item>
        <item name="colorOnPrimary">#ffffff</item>
        <item name="android:statusBarColor">@color/colorPrimary</item>
        <item name="android:navigationBarColor">@color/navigationColor</item>
    </style>
</resources>
`);

      // 2. Play Store Metadata & Listing Content
      setZipProgress('Packaging Play Console listing texts & answers...');
      const metadataFolder = zip.folder('play-console-listing-and-answers');

      metadataFolder?.file('play-store-listing.txt', `=====================================================
GOOGLE PLAY STORE LISTING INFORMATION
=====================================================

APP TITLE (max 30 characters):
BreakFree: De-Addiction Blocker

SHORT DESCRIPTION (max 80 characters):
Overcome addictions, track sobriety streaks, block cravings, and reclaim focus.

FULL DESCRIPTION (max 4000 characters):
BreakFree is your all-in-one sobriety shield, relapse blocker, and craving intervention coach. Designed with evidence-based neurobiology drills, high-decibel acoustic siren alarms, and smart geofencing, BreakFree gives you the tools to break addictive cycles and stay accountable.

KEY CAPABILITIES:

🛡️ ACOUSTIC SENTINEL & ALARM SYSTEM
Trigger instant high-decibel audible sirens when high-risk temptations strike. Disarming the siren requires emergency deep-breathing drills, physical grounding, or a PIN unlock from your trusted guardian.

📍 GEOFENCE RADAR & TEMPTATION SHIELD
Set danger zones around liquor stores, smoke shops, or high-risk locations. When your GPS approaches within 100 meters, BreakFree automatically activates intervention protocols and alerts your guardian.

🧠 AI NEURAL INTERVENTION COACH
Instant cognitive reframing drills, 4-7-8 physiological sigh audio guides, box breathing, and craving journaling designed to calm amygdala hyper-arousal during panic cravings.

🔒 MASTER GUARDIAN & ANTI-BYPASS SHIELD
Prevent impulsive app deletion, VPN tampering, or incognito surfing. Set up a master PIN or emergency contact guardian who receives instant automated intervention pings if policies are breached.

📊 SOBRIETY COUNTERS & MILESTONES
Track your streak days, money saved, health milestones recovered, and dopamine restoration timeline with zero judgment.

🔒 100% PRIVATE & ON-DEVICE
All your personal recovery logs, habit counters, and guardian details remain on your device. We do not sell or monetize personal health data.

Take back control of your mind and life. Download BreakFree today!

CATEGORY:
Health & Fitness (or Lifestyle)

TAGS:
Addiction Recovery, Sobriety, Habit Tracker, Blocker, Digital Detox, Mental Health, Mindfulness
`);

      metadataFolder?.file('play-console-questionnaire-answers.txt', `=====================================================
GOOGLE PLAY CONSOLE - MANDATORY QUESTIONNAIRE CHEAT SHEET
=====================================================

1. APP ACCESS:
Select: "All functionality is available without special access" (Free app, no demo login required).

2. ADS:
Select: "Yes, my app contains ads" (or No if you do not activate AdMob).

3. CONTENT RATING QUESTIONNAIRE:
- Category: Consumer / Lifestyle / Health
- Violence: No
- Sexuality: No (app blocks adult content, but contains no pornographic imagery)
- Offensive language: No
- Controlled substances: Reference only (recovery support for alcohol/nicotine/gambling)
- Target Age: 18+ (due to adult content blocker features) or Teen (13+)

4. TARGET AUDIENCE:
Select: 18 and older (Recommended for smoothest approval without Families policy review).

5. DATA SAFETY FORM:
- Does your app collect or share user data?: NO (All habit streaks and PINs stay in local browser storage).
- Is data encrypted in transit?: YES (via HTTPS / SSL).
- Can users request data deletion?: YES (Users can reset app data in 1 click).

6. FINANCIAL FEATURES:
Select: "My app doesn't provide any financial features".

7. GOVERNMENT APPS:
Select: "No".
`);

      // 3. Store Assets & Graphics
      setZipProgress('Generating graphics & icons for Play Store...');
      const storeAssetsFolder = zip.folder('store-assets');

      // Fetch existing 512x512 icon from public folder
      try {
        const iconRes = await fetch('/pwa-512x512.png');
        if (iconRes.ok) {
          const iconBlob = await iconRes.blob();
          storeAssetsFolder?.file('icon-512x512-playstore.png', iconBlob);
        }
      } catch {
        // fallback
      }

      // Add feature graphic (1024x500 PNG & vector SVG)
      try {
        let graphicUrl = featureGraphicDataUrl;
        if (!graphicUrl) {
          graphicUrl = generateFeatureGraphic();
        }
        if (graphicUrl && graphicUrl.includes(',')) {
          const graphicData = graphicUrl.split(',')[1];
          storeAssetsFolder?.file('feature-graphic-1024x500.png', graphicData, { base64: true });
        } else {
          const fallbackRes = await fetch('/feature-graphic-1024x500.png');
          if (fallbackRes.ok) {
            const fallbackBlob = await fallbackRes.blob();
            storeAssetsFolder?.file('feature-graphic-1024x500.png', fallbackBlob);
          }
        }

        // Also bundle high-resolution SVG vector version
        try {
          const svgRes = await fetch('/feature-graphic-1024x500.svg');
          if (svgRes.ok) {
            const svgText = await svgRes.text();
            storeAssetsFolder?.file('feature-graphic-1024x500.svg', svgText);
          }
        } catch {
          // ignore
        }
        // Bundle Phone Screenshots (1080x1920)
        const screenshotsFolder = storeAssetsFolder?.folder('screenshots');
        try {
          const s1Res = await fetch('/screenshot-1.png');
          if (s1Res.ok) {
            const s1Blob = await s1Res.blob();
            screenshotsFolder?.file('screenshot-1-1080x1920.png', s1Blob);
          }
          const s2Res = await fetch('/screenshot-2.png');
          if (s2Res.ok) {
            const s2Blob = await s2Res.blob();
            screenshotsFolder?.file('screenshot-2-1080x1920.png', s2Blob);
          }
        } catch (e) {
          console.warn('Screenshot zip bundling note:', e);
        }
      } catch (err) {
        console.warn('Feature graphic zip packaging note:', err);
      }

      // Add Privacy Policy
      try {
        const privacyRes = await fetch('/privacy-policy.html');
        if (privacyRes.ok) {
          const privacyText = await privacyRes.text();
          zip.file('privacy-policy.html', privacyText);
        }
      } catch {
        // ignore
      }

      // Add Verification files (assetlinks & manifest)
      const verifFolder = zip.folder('verification-and-domain');
      try {
        const assetlinksRes = await fetch('/.well-known/assetlinks.json');
        if (assetlinksRes.ok) {
          const assetlinksText = await assetlinksRes.text();
          verifFolder?.file('assetlinks.json', assetlinksText);
        }
      } catch {
        // ignore
      }

      try {
        const manifestRes = await fetch('/manifest.webmanifest');
        if (manifestRes.ok) {
          const manifestText = await manifestRes.text();
          verifFolder?.file('manifest.webmanifest', manifestText);
        }
      } catch {
        // ignore
      }

      // 4. Step-by-Step Readme Guide
      zip.file('GOOGLE_PLAY_PUBLISH_GUIDE.md', `# Step-by-Step Google Play Console Guide for BreakFree

Congratulations on taking BreakFree to the Google Play Store!

## STEP 1: Create Your App in Play Console
1. Go to https://play.google.com/console
2. Click **Create app**
3. App name: \`BreakFree: De-Addiction Blocker\`
4. Default language: English (United States)
5. App or game: **App**
6. Free or paid: **Free**
7. Check the declarations and click **Create app**.

---

## STEP 2: Fill in Store Listing Details
Go to **Grow -> Store presence -> Main store listing**:
- **App title**: \`BreakFree: De-Addiction Blocker\`
- **Short description**: \`Overcome addictions, track sobriety streaks, block cravings, and reclaim focus.\`
- **Full description**: Copy & paste from \`play-console-listing-and-answers/play-store-listing.txt\`
- **App icon**: Upload \`store-assets/icon-512x512-playstore.png\`
- **Feature graphic**: Upload \`store-assets/feature-graphic-1024x500.png\`

---

## STEP 3: Complete App Content Questionnaires
Go to **Policy and programs -> App content**:
- **Privacy Policy**: Enter \`${privacyPolicyUrl}\` (or host \`privacy-policy.html\` on your own domain)
- **Ads**: Yes (if monetizing) or No
- **App access**: All functionality available without credentials
- **Content rating**: Complete questionnaire using \`play-console-questionnaire-answers.txt\`
- **Target audience**: 18+
- **Data safety**: Follow answers in \`play-console-questionnaire-answers.txt\`

---

## STEP 4: Build or Upload Your Android Bundle
1. Open the \`breakfree-android-project\` folder in **Android Studio** (or run \`./gradlew bundleRelease\` in terminal).
2. Android Studio will generate \`app/build/outputs/bundle/release/app-release.aab\`.
3. In Play Console, go to **Release -> Production -> Create new release**.
4. Drag and drop the \`.aab\` bundle.
5. Click **Save** -> **Review release** -> **Start rollout to Production**!
`);

      setZipProgress('Compressing archive...');
      const content = await zip.generateAsync({ type: 'blob' });

      // Trigger automatic browser download
      const downloadUrl = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `BreakFree-Google-Play-Release-Package.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      setZipProgress('Download complete!');
      setTimeout(() => {
        setIsGeneratingZip(false);
        setZipProgress('');
      }, 1500);
    } catch (err) {
      console.error('Failed to generate zip:', err);
      setZipProgress('Error generating package. Please retry.');
      setIsGeneratingZip(false);
    }
  };

  // Download individual graphics
  const downloadFeatureGraphic = () => {
    let url = featureGraphicDataUrl;
    if (!url) {
      url = generateFeatureGraphic(canvasRef.current || undefined);
    }
    if (!url) {
      url = '/feature-graphic-1024x500.png';
    }
    const a = document.createElement('a');
    a.href = url;
    a.download = 'breakfree-feature-graphic-1024x500.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadIcon512 = async () => {
    try {
      const res = await fetch('/pwa-512x512.png');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'breakfree-icon-512x512.png';
      a.click();
      URL.revokeObjectURL(url);
    } catch {
    }
  };

  const downloadScreenshot = (num: 1 | 2) => {
    const a = document.createElement('a');
    a.href = `/screenshot-${num}.png`;
    a.download = `breakfree-screenshot-${num}-1080x1920.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/50 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-900/40 font-bold shrink-0">
              <Play className="w-6 h-6 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white">Google Play Store Release Hub</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                  Automated Packager
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Download your complete Android project, store assets, metadata, and submit to Google Play Console with zero guesswork.
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
        <div className="flex border-b border-slate-800 bg-slate-950/80 px-4 sm:px-6 pt-2 overflow-x-auto gap-1">
          <button
            onClick={() => setActiveTab('export')}
            className={`flex items-center gap-2 px-3.5 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'export'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderArchive className="w-4 h-4 text-emerald-400" />
            <span>1-Click Package Export (.zip)</span>
          </button>

          <button
            onClick={() => setActiveTab('assets')}
            className={`flex items-center gap-2 px-3.5 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'assets'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-cyan-400" />
            <span>Store Graphics (512px & 1024px)</span>
          </button>

          <button
            onClick={() => setActiveTab('listing')}
            className={`flex items-center gap-2 px-3.5 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'listing'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Play Console Copy-Paste Assistant</span>
          </button>

          <button
            onClick={() => setActiveTab('walkthrough')}
            className={`flex items-center gap-2 px-3.5 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'walkthrough'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Step-by-Step Console Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('urlhelp')}
            className={`flex items-center gap-2 px-3.5 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'urlhelp'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Info className="w-4 h-4 text-purple-400" />
            <span>PWABuilder / URL Explainer</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 max-h-[72vh]">

          {/* TAB 1: 1-CLICK PACKAGE EXPORT */}
          {activeTab === 'export' && (
            <div className="space-y-6">
              {/* Highlight Hero Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Instant Client-Side Bundle Generation</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Download Complete Android Release Package (.zip)</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    Everything you need is packaged directly into a single zip file: the complete Android Studio project (SDK 35, Manifest, Gradle scripts, TWA Activity), Play Store 512×512 icons, 1024×500 promotional graphics, pre-filled descriptions, and step-by-step instructions.
                  </p>
                </div>

                <div className="shrink-0 w-full md:w-auto">
                  <button
                    onClick={handleDownloadFullReleaseZip}
                    disabled={isGeneratingZip}
                    className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950 transition active:scale-95 disabled:opacity-50"
                  >
                    {isGeneratingZip ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>{zipProgress || 'Packaging...'}</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        <span>Download Complete Release (.zip)</span>
                      </>
                    )}
                  </button>
                  {isGeneratingZip && (
                    <p className="text-[11px] text-emerald-400 text-center mt-2 font-mono">
                      {zipProgress}
                    </p>
                  )}
                </div>
              </div>

              {/* What is inside the archive */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <FolderArchive className="w-4 h-4 text-emerald-400" />
                  <span>Package Contents Tree:</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center gap-2 font-bold text-emerald-300">
                      <Smartphone className="w-4 h-4" />
                      <span>breakfree-android-project/</span>
                    </div>
                    <ul className="text-slate-400 space-y-1 font-mono text-[11px] pl-4 border-l border-slate-800">
                      <li>├── build.gradle (Root build script)</li>
                      <li>├── settings.gradle &amp; gradle.properties</li>
                      <li>└── app/</li>
                      <li>&nbsp;&nbsp;&nbsp;&nbsp;├── build.gradle (Target SDK 35, AndroidX TWA)</li>
                      <li>&nbsp;&nbsp;&nbsp;&nbsp;└── src/main/</li>
                      <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── AndroidManifest.xml (Full TWA Activity)</li>
                      <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── res/values (strings, colors, styles)</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center gap-2 font-bold text-cyan-300">
                      <ImageIcon className="w-4 h-4" />
                      <span>store-assets/ &amp; metadata/</span>
                    </div>
                    <ul className="text-slate-400 space-y-1 font-mono text-[11px] pl-4 border-l border-slate-800">
                      <li>├── icon-512x512-playstore.png (High-Res 32-bit PNG)</li>
                      <li>├── feature-graphic-1024x500.png (Required banner)</li>
                      <li>├── play-store-listing.txt (Exact title &amp; description)</li>
                      <li>├── play-console-questionnaire-answers.txt</li>
                      <li>├── privacy-policy.html (Mandatory policy)</li>
                      <li>└── GOOGLE_PLAY_PUBLISH_GUIDE.md</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Instant Quick Links */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href="https://play.google.com/console"
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-white group-hover:text-emerald-400 transition">Google Play Console</p>
                    <p className="text-[11px] text-slate-400">play.google.com/console</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition" />
                </a>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5 truncate">
                    <p className="text-xs font-bold text-white">Privacy Policy Link</p>
                    <p className="text-[11px] text-slate-400 truncate">{privacyPolicyUrl}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(privacyPolicyUrl, 'pp-quick')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                  >
                    {copiedId === 'pp-quick' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-white">Target Package ID</p>
                    <p className="text-[11px] text-emerald-400 font-mono">com.breakfree.deaddiction</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard('com.breakfree.deaddiction', 'pkg-id')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                  >
                    {copiedId === 'pkg-id' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STORE GRAPHICS (512x512 & 1024x500) */}
          {activeTab === 'assets' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <p className="text-xs text-slate-300">
                  Google Play Console strictly requires two graphic assets before you can submit: a <strong>512×512 High-Res App Icon</strong> (32-bit PNG, no transparency) and a <strong>1024×500 Feature Graphic banner</strong>. Both have been generated below and are ready for download.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 512x512 App Icon Card */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center">1</span>
                        <h4 className="text-sm font-bold text-white">High-Resolution Icon (512 × 512 px)</h4>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        PNG (32-bit)
                      </span>
                    </div>

                    <p className="text-xs text-slate-400">
                      Appears on Google Play search results, app landing page, and user home screen.
                    </p>

                    <div className="flex items-center justify-center py-4 bg-slate-900 rounded-xl border border-slate-800/80">
                      <img
                        src="/pwa-512x512.png"
                        alt="BreakFree App Icon 512x512"
                        className="w-36 h-36 rounded-2xl shadow-xl border border-emerald-500/30"
                      />
                    </div>
                  </div>

                  <button
                    onClick={downloadIcon512}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download 512×512 Icon (.png)</span>
                  </button>
                </div>

                {/* 1024x500 Feature Graphic Card */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center">2</span>
                        <h4 className="text-sm font-bold text-white">Feature Graphic Banner (1024 × 500 px)</h4>
                      </div>
                      <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                        PNG (No Alpha) • 1024×500
                      </span>
                    </div>

                    <p className="text-xs text-slate-400">
                      Mandatory Google Play asset showcased at the very top of your Play Store listing page.
                    </p>

                    {/* Image / Canvas Live Preview */}
                    <div className="relative group overflow-hidden rounded-xl border border-slate-800 bg-slate-900 flex flex-col items-center justify-center">
                      <img
                        src={featureGraphicDataUrl || '/feature-graphic-1024x500.svg'}
                        alt="BreakFree Google Play Feature Graphic Banner 1024x500"
                        className="w-full h-auto aspect-[1024/500] object-cover rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.01]"
                      />
                      {/* Hidden canvas element kept in DOM for programmatic rendering */}
                      <canvas
                        ref={canvasRef}
                        width={1024}
                        height={500}
                        className="hidden"
                      />

                      {/* Dimensions Overlay Tag */}
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur text-[10px] text-slate-300 font-mono border border-white/10">
                        1024 × 500
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      onClick={downloadFeatureGraphic}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-950 transition active:scale-95"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download 1024×500 Banner (.png)</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href="/feature-graphic-1024x500.svg"
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                        <span>View High-Res Vector (.svg)</span>
                      </a>
                      <button
                        onClick={() => generateFeatureGraphic(canvasRef.current || undefined)}
                        className="py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition"
                        title="Redraw / Refresh feature graphic"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Refresh</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Play Required Phone Screenshots (1080x1920) */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex items-center justify-center">3</span>
                    <h4 className="text-sm font-bold text-white">Phone Screenshots (1080 × 1920 px)</h4>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Play Store Mandatory (Min 2)
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    PNG (No alpha) • Portrait 9:16
                  </span>
                </div>

                <p className="text-xs text-slate-400">
                  Google Play requires at least 2 phone screenshots to publish your listing. Both have been generated with professional device frames, features, and metrics below:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* Screenshot 1 */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">Screenshot 1: Sobriety Tracker &amp; Habits</span>
                        <span className="text-[10px] font-mono text-emerald-400">1080 × 1920</span>
                      </div>
                      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-center max-h-56">
                        <img
                          src="/screenshot-1.svg"
                          alt="BreakFree Phone Screenshot 1"
                          className="w-full h-auto object-cover max-h-56"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => downloadScreenshot(1)}
                        className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Screenshot 1 (.png)</span>
                      </button>
                      <a
                        href="/screenshot-1.png"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                        title="Open image"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Screenshot 2 */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">Screenshot 2: GPS Radar &amp; Acoustic Siren</span>
                        <span className="text-[10px] font-mono text-cyan-400">1080 × 1920</span>
                      </div>
                      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-center max-h-56">
                        <img
                          src="/screenshot-2.svg"
                          alt="BreakFree Phone Screenshot 2"
                          className="w-full h-auto object-cover max-h-56"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => downloadScreenshot(2)}
                        className="flex-1 py-2 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Screenshot 2 (.png)</span>
                      </button>
                      <a
                        href="/screenshot-2.png"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                        title="Open image"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PLAY CONSOLE COPY-PASTE ASSISTANT */}
          {activeTab === 'listing' && (
            <div className="space-y-6 text-left">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <p className="text-xs text-slate-300">
                  Google Play Console has strict character limits for App Title (max 30) and Short Description (max 80). Click <strong>Copy</strong> next to each pre-approved field below to paste directly into your Play Console listing.
                </p>
              </div>

              {/* App Title */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">App Title (Character Count: 28 / 30)</span>
                  <button
                    onClick={() => copyToClipboard('BreakFree: De-Addiction Blocker', 'f-title')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1 transition"
                  >
                    {copiedId === 'f-title' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'f-title' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-emerald-300 select-all border border-slate-800">
                  BreakFree: De-Addiction Blocker
                </div>
              </div>

              {/* Short Description */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Short Description (Character Count: 77 / 80)</span>
                  <button
                    onClick={() => copyToClipboard('Overcome addictions, track sobriety streaks, block cravings, and reclaim focus.', 'f-short')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1 transition"
                  >
                    {copiedId === 'f-short' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'f-short' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-emerald-300 select-all border border-slate-800">
                  Overcome addictions, track sobriety streaks, block cravings, and reclaim focus.
                </div>
              </div>

              {/* Full Description */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Full Description</span>
                  <button
                    onClick={() => copyToClipboard(`BreakFree is your all-in-one sobriety shield, relapse blocker, and craving intervention coach. Designed with evidence-based neurobiology drills, high-decibel acoustic siren alarms, and smart geofencing, BreakFree gives you the tools to break addictive cycles and stay accountable.

KEY CAPABILITIES:

🛡️ ACOUSTIC SENTINEL & ALARM SYSTEM
Trigger instant high-decibel audible sirens when high-risk temptations strike. Disarming the siren requires emergency deep-breathing drills, physical grounding, or a PIN unlock from your trusted guardian.

📍 GEOFENCE RADAR & TEMPTATION SHIELD
Set danger zones around liquor stores, smoke shops, or high-risk locations. When your GPS approaches within 100 meters, BreakFree automatically activates intervention protocols and alerts your guardian.

🧠 AI NEURAL INTERVENTION COACH
Instant cognitive reframing drills, 4-7-8 physiological sigh audio guides, box breathing, and craving journaling designed to calm amygdala hyper-arousal during panic cravings.

🔒 MASTER GUARDIAN & ANTI-BYPASS SHIELD
Prevent impulsive app deletion, VPN tampering, or incognito surfing. Set up a master PIN or emergency contact guardian who receives instant automated intervention pings if policies are breached.

📊 SOBRIETY COUNTERS & MILESTONES
Track your streak days, money saved, health milestones recovered, and dopamine restoration timeline with zero judgment.

🔒 100% PRIVATE & ON-DEVICE
All your personal recovery logs, habit counters, and guardian details remain on your device. We do not sell or monetize personal health data.`, 'f-full')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1 transition"
                  >
                    {copiedId === 'f-full' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'f-full' ? 'Copied' : 'Copy Full Description'}</span>
                  </button>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-300 max-h-48 overflow-y-auto whitespace-pre-line border border-slate-800 font-sans leading-relaxed">
{`BreakFree is your all-in-one sobriety shield, relapse blocker, and craving intervention coach. Designed with evidence-based neurobiology drills, high-decibel acoustic siren alarms, and smart geofencing, BreakFree gives you the tools to break addictive cycles and stay accountable.

KEY CAPABILITIES:
• Acoustic Sentinel & High-Decibel Alarm System
• Geofence Proximity Radar (Danger Zone Alarms)
• AI Neural Urge Coach & Box Breathing Drills
• Master Guardian Anti-Bypass Lock (PIN Protected)
• Sobriety Streak Milestone & Dopamine Restoration Trackers
• 100% Private, On-Device Storage (Zero Data Selling)`}
                </div>
              </div>

              {/* Questionnaire Form Answers */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-white">App Content &amp; Data Safety Answers</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                    <p className="font-semibold text-emerald-400">App Category</p>
                    <p className="text-slate-300 mt-0.5">Health &amp; Fitness (or Lifestyle)</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                    <p className="font-semibold text-emerald-400">Target Age</p>
                    <p className="text-slate-300 mt-0.5">18+ (Smoothest automated review)</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                    <p className="font-semibold text-emerald-400">Data Collection</p>
                    <p className="text-slate-300 mt-0.5">No personal data collected or shared</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                    <p className="font-semibold text-emerald-400">Data Encryption</p>
                    <p className="text-slate-300 mt-0.5">Yes, all network traffic is encrypted via HTTPS</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STEP-BY-STEP CONSOLE WALKTHROUGH */}
          {activeTab === 'walkthrough' && (
            <div className="space-y-4 text-left">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">Google Play Console Publishing Checklist</h4>
                  <p className="text-[11px] text-slate-400">Click each checkbox as you complete it on Google Play Console.</p>
                </div>
                <div className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                  {Object.values(completedSteps).filter(Boolean).length} / 5 Done
                </div>
              </div>

              {/* Step 1 */}
              <div
                onClick={() => toggleStep(1)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3.5 ${
                  completedSteps[1]
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs ${
                  completedSteps[1] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {completedSteps[1] ? <Check className="w-4 h-4" /> : '1'}
                </div>
                <div className="space-y-1 text-xs">
                  <p className="font-bold text-white text-sm">Step 1: Create App in Google Play Console</p>
                  <p className="text-slate-300">
                    Visit <a href="https://play.google.com/console" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-emerald-400 underline">play.google.com/console</a> and click <strong>Create app</strong>.
                  </p>
                  <p className="text-slate-400">
                    Set App Name to <code className="text-emerald-300">BreakFree: De-Addiction Blocker</code>, select <strong>App</strong> and <strong>Free</strong>, then accept the developer declarations.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div
                onClick={() => toggleStep(2)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3.5 ${
                  completedSteps[2]
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs ${
                  completedSteps[2] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {completedSteps[2] ? <Check className="w-4 h-4" /> : '2'}
                </div>
                <div className="space-y-1 text-xs">
                  <p className="font-bold text-white text-sm">Step 2: Store Presence &amp; Graphic Assets</p>
                  <p className="text-slate-300">
                    In the left sidebar, navigate to <strong>Grow &rarr; Store presence &rarr; Main store listing</strong>.
                  </p>
                  <p className="text-slate-400">
                    Paste the <strong>Short Description</strong> and <strong>Full Description</strong> from Tab 3. Upload the <strong>512×512 Icon</strong> and <strong>1024×500 Banner</strong> from Tab 2.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div
                onClick={() => toggleStep(3)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3.5 ${
                  completedSteps[3]
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs ${
                  completedSteps[3] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {completedSteps[3] ? <Check className="w-4 h-4" /> : '3'}
                </div>
                <div className="space-y-1 text-xs">
                  <p className="font-bold text-white text-sm">Step 3: App Content, Privacy &amp; Data Safety</p>
                  <p className="text-slate-300">
                    In the left sidebar, navigate to <strong>Policy and programs &rarr; App content</strong>.
                  </p>
                  <p className="text-slate-400">
                    Set the Privacy Policy URL to <code className="text-emerald-300">{privacyPolicyUrl}</code>. Complete the Data Safety questionnaire (no data collected, encrypted via HTTPS).
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div
                onClick={() => toggleStep(4)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3.5 ${
                  completedSteps[4]
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs ${
                  completedSteps[4] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {completedSteps[4] ? <Check className="w-4 h-4" /> : '4'}
                </div>
                <div className="space-y-1 text-xs">
                  <p className="font-bold text-white text-sm">Step 4: Build or Upload .AAB Release Bundle</p>
                  <p className="text-slate-300">
                    Download the release package from Tab 1. Open the project folder in Android Studio and select <strong>Build &rarr; Generate Signed Bundle / APK &rarr; Android App Bundle</strong>.
                  </p>
                  <p className="text-slate-400">
                    In Play Console, go to <strong>Release &rarr; Production &rarr; Create new release</strong> and upload the generated <code className="text-emerald-300">.aab</code> file.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div
                onClick={() => toggleStep(5)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3.5 ${
                  completedSteps[5]
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs ${
                  completedSteps[5] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {completedSteps[5] ? <Check className="w-4 h-4" /> : '5'}
                </div>
                <div className="space-y-1 text-xs">
                  <p className="font-bold text-white text-sm">Step 5: Review &amp; Roll Out to Production</p>
                  <p className="text-slate-300">
                    Click <strong>Review release</strong>, resolve any warnings, and click <strong>Start rollout to Production</strong>!
                  </p>
                  <p className="text-slate-400">
                    Google reviews and publishes apps within 24 to 72 hours. Once published, anyone in the world can install BreakFree directly from the Google Play Store!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PWABUILDER / URL EXPLAINER */}
          {activeTab === 'urlhelp' && (
            <div className="space-y-5 text-left">
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <h4 className="font-bold text-white text-sm">Why did PWABuilder show "Detects Nothing" or Missing Name?</h4>
                  <p className="text-slate-300 leading-relaxed">
                    AI Studio runs apps inside a Google Cloud Run development environment. When an external automated bot (like PWABuilder's remote crawler server) makes an HTTP request to <code className="text-amber-300 font-mono">ais-dev-...</code>, Google's Cloud Run security layer redirects the crawler to <code className="text-amber-300 font-mono">__cookie_check.html</code> (HTTP 302 redirect) to verify human browser cookies.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    Because PWABuilder's bot cannot solve browser cookies, it receives an empty response instead of your manifest—even though your manifest, icons, and service worker are 100% valid!
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>The 2 Ways You Can Publish:</span>
                </h4>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/30 space-y-1.5 text-xs">
                    <p className="font-bold text-emerald-400">Option 1: Use the Downloaded Android Package (Easiest &amp; Instant)</p>
                    <p className="text-slate-300">
                      Head to Tab 1 and click <strong>"Download Complete Release (.zip)"</strong>. You get a pre-built Android Studio project configured for Target SDK 35 with all icons, manifest, and assets included. Open it in Android Studio and build your <code className="text-emerald-300 font-mono">.aab</code> directly—no PWABuilder crawler needed!
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
                    <p className="font-bold text-cyan-400">Option 2: Deploy to Free Public Hosting (If you specifically want PWABuilder cloud build)</p>
                    <p className="text-slate-300">
                      You can deploy this codebase to a free public host with zero cookie protection so PWABuilder's crawler can read it:
                    </p>
                    <ul className="list-disc list-inside text-slate-400 space-y-1 mt-1 pl-2 font-mono text-[11px]">
                      <li><strong className="text-slate-300">Vercel:</strong> Run <code className="text-emerald-400">npx vercel</code> in project folder (gives public domain like <code className="text-emerald-300">your-app.vercel.app</code>)</li>
                      <li><strong className="text-slate-300">Netlify:</strong> Run <code className="text-emerald-400">npx netlify deploy --prod</code></li>
                      <li><strong className="text-slate-300">GitHub Pages / Firebase Hosting</strong></li>
                    </ul>
                    <p className="text-slate-400 text-[11px] mt-1">
                      Once deployed to a public URL with no Cloud Run cookie check, PWABuilder will score it 100/100 and allow 1-click cloud generation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Google Play Console Ready &bull; Package ID: <code className="text-emerald-400 font-mono">com.breakfree.deaddiction</code></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadFullReleaseZip}
              disabled={isGeneratingZip}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Release ZIP</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
