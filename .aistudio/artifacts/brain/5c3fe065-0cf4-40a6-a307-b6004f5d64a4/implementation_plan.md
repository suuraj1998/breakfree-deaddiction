# Google Play Store Publication Plan (One-Step-at-a-Time)

A guided, single-step execution plan to package, verify, and publish **BreakFree: De-Addiction & Sobriety Blocker** to the Google Play Store using Trusted Web Activity (TWA) architecture and PWABuilder.

## User Review & Critical Decisions

> [!IMPORTANT]
> The publication flow is structured to proceed strictly **one step at a time**. You will complete each step and confirm before moving to the next.

- **Developer Account Status**: Confirmed active Google Play Console developer account.
- **Starting Point**: Generating and downloading the production Android App Bundle (`.aab`) and digital asset link signing key via PWABuilder, utilizing the verified public URL.
- **Execution Pace**: One single actionable step per turn with clear instructions, URLs, and expected outcomes.

---

## 1. Overview & Core Concept

- **What It Does**: Packages the BreakFree web application into an official Android App Bundle (`.aab`) that runs with native fullscreen browser immersion (Trusted Web Activity) with no URL bars, full offline support, push notifications, and biometric locker capabilities.
- **Target Audience**: Android users seeking addiction recovery, digital detox, and sobriety support directly from the Google Play Store.
- **Key Value**: Delivers zero-friction store deployment with automated updates (code updates deploy instantly without needing re-approval for every bug fix).

---

## 2. Step-by-Step Publishing Journey

Below is the roadmap of steps that we will execute together sequentially:

```
┌────────────────────────────────────────────────────────┐
│ STEP 1: Generate & Download Android App Bundle (.aab)  │ ◄── [WE ARE HERE]
│         via PWABuilder with public app URL             │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ STEP 2: Configure Digital Asset Links & App Integrity   │
│         Sync SHA-256 fingerprint into assetlinks.json  │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ STEP 3: Create App Listing in Google Play Console       │
│         Title, description, screenshots, and icons     │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ STEP 4: Complete Store Policies & Content Rating        │
│         Privacy policy, target audience, health rating │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ STEP 5: Upload .aab & Roll Out to Closed / Production  │
│         Create release, review checks, and submit      │
└────────────────────────────────────────────────────────┘
```

---

## 3. Key Product Decisions & Trade-Offs

- **PWABuilder / TWA over Native Kotlin Rewrite**:
  - *Chosen Approach*: Trusted Web Activity (TWA) via PWABuilder.
  - *Why*: The app is already fully responsive, features offline caching via Service Worker, includes full audio alarms, and runs seamlessly on mobile. A TWA eliminates weeks of rewrite while providing true Play Store discoverability and installability.
  - *Alternatives Considered*: Full native rewrite (unnecessary overhead and high maintenance).

- **Digital Asset Links Auto-Verification**:
  - *Chosen Approach*: Serve `/.well-known/assetlinks.json` directly from the Express/Vite backend with CORS headers.
  - *Why*: Removes the Chrome URL navigation bar inside the Android app once installed, making the app 100% indistinguishable from a native app.

---

## 4. Technical Architecture & Asset Verification

```
┌─────────────────────────────────────────────────────────────────┐
│                     BreakFree Production PWA                    │
│     https://ais-pre-ade2qvx4uwwfjx5bx54x4a-21782451185...       │
├───────────────────────────────┬─────────────────────────────────┤
│ Manifest (/manifest.json)     │ Service Worker (/sw.js)         │
│ • Name & short name           │ • Pre-cache core shell          │
│ • Icons (192x192, 512x512)    │ • Offline fallback handler      │
│ • Standalone display & theme  │ • Push notification hooks       │
├───────────────────────────────┴─────────────────────────────────┤
│ Digital Asset Links (/.well-known/assetlinks.json)              │
│ • Package: com.breakfree.deaddiction                            │
│ • SHA-256 Fingerprint matching Play Store Signing Key           │
└───────────────────────────────┬─────────────────────────────────┘
                                │ Packaged via PWABuilder
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Google Play Console (.aab)                    │
│   Package ID: com.breakfree.deaddiction                         │
│   Target SDK: 34+                                               │
│   Signed with Play App Signing                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Next Immediate Action

Upon approval, I will provide **Step 1: Generating the signed Android Package via PWABuilder** with exact clickable links, pre-filled parameters, and download instructions.
