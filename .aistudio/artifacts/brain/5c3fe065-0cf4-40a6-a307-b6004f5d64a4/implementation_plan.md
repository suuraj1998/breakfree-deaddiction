# Aegis Recovery — Cross-Platform De-Addiction, Wellness & Ad Monetization Ecosystem

A unified, clinical-grade habit recovery, behavioral intervention, and anti-relapse platform engineered for web, Android, and iOS. It delivers active intervention mechanisms (browser content interceptor, synthesised loud acoustic siren alarm, GPS high-risk geofencing, biometric lock, emergency guardian alerts), the **Ironclad Anti-Bypass Engine** (local loopback VPN DNS shield, incognito mode lockdown, VPN tamper detection, and anti-uninstall cool-off), positive self-control exercise drills, dopamine-reset wellness routines, and a multi-tier monetization engine (Google AdSense/AdMob placements, self-serve sponsor ad portal for brand owners, affiliate product marketplace, and regional PPP subscriptions) designed to achieve ₹30,000–₹40,000/month recurring income.

***

### User Review & Critical Decisions

> [!IMPORTANT]
> Revisions incorporated to defeat VPN and Incognito bypass attempts:
> - **The Ironclad Anti-Bypass & Tamper Shield**:
>   1. **Local Loopback VPN Architecture (Android `VpnService` / iOS `NEPacketTunnelProvider`)**: Aegis Recovery operates as the device's primary local encrypted DNS filter. Because mobile operating systems only allow one active VPN slot at a time, third-party bypass VPNs cannot run without knocking Aegis offline—which instantly triggers an audible tamper alarm and guardian alert.
>   2. **Incognito & Private Browsing Lockdown**: Comprehensive heuristic detection in web/PWA mode, paired with automated MDM/Screen Time configuration profiles that lock out Incognito tabs in Chrome, Safari, Edge, and Samsung Internet.
>   3. **Guardian Co-Signature & 24-Hour Uninstall Delay**: Users cannot turn off protection or uninstall the app during a craving impulse; disabling requires guardian authorization or initiates a 24-hour un-lock delay while dispatching an SOS notice to the accountability partner.
>   4. **Interactive Anti-Bypass Testing Simulator**: Lets users and evaluators test what happens when an Incognito tab is opened or a bypass VPN is attempted (visual breach alert, escalating siren, and guardian SOS dispatch).

- **Confirmed Decision 1**: Positive wellness habits and 2-minute urge-killer somatic exercise circuits (push-ups, deep breathwork, cold splash routines) to biologically break dopamine craving loops.
- **Confirmed Decision 2**: Multi-stream advertising engine: Google AdSense/AdMob display ads, self-serve brand sponsor portal for external product owners, affiliate recovery gear marketplace, and regional PPP subscriptions targeting ₹30,000–₹40,000/month.
- **Confirmed Decision 3**: Cross-platform responsive PWA with native mobile ergonomics, biometric/PIN security, and exportable configuration scripts for App Store & Play Store publication.

***

## 1. Overview & Core Concept

### What It Does
**Aegis Recovery** is an uncompromised habit mastery and behavioral relapse prevention system. Most conventional blockers fail because addicts switch to Incognito mode or activate a third-party VPN when cravings peak. Aegis prevents this through its **Ironclad Anti-Bypass Engine**:
- **Occupies the OS VPN Slot**: Routes all device DNS traffic locally to filter adult, gambling, and addictive endpoints at the packet level, making external proxy bypass impossible.
- **Incognito Defenses**: Detects private browsing sessions and enforces supervised restrictions disabling incognito access.
- **Tamper & Disarm Protection**: Any attempt to force-close, clear storage, enable an unapproved VPN, or revoke permissions immediately triggers a high-decibel acoustic siren and alerts the designated guardian via emergency SMS.
- **Wellness & Somatic Reset**: Replaces the compulsive loop with high-intensity urge-killer workouts (push-ups, breathwork, cold therapy).
- **Monetization Engine**: Generates revenue from Google Ads, direct brand sponsors, affiliate commissions, and regional subscriptions.

***

## 2. User Experience & Visual Design

### Key User Flows

1. **Ironclad Protection & Anti-Bypass Setup**:
   - Toggle **Local DNS Shield (VPN Slot Lock)**: Explains how Aegis reserves the device's VPN slot to prevent proxy tunneling.
   - Configure **Incognito Lockdown Profile**: Provides one-tap Apple Configurator / Android Device Admin profiles to disable private tabs.
   - Configure **Guardian Anti-Tamper Shield**: Links emergency contact; sets a mandatory 24-hour delay before settings can be loosened.

2. **Daily Command Center & Streaks**:
   - Master Sobriety Timers for chosen habits (Porn, Nicotine, Alcohol, Sugar, Gaming, Shopping, Social Media).
   - Clean streaks, financial savings counter, and milestone rewards.
   - Quick-access "Panic Craving" trigger in the primary thumb zone.

3. **Urge-Killer Workouts & Somatic Self-Control**:
   - 2-minute high-intensity physical circuits (push-ups, wall sits, jumping jacks) that flood the brain with natural endorphins to cancel dopamine cravings.
   - Somatic 4-7-8 breathing pacer with animated inhale/hold/exhale circle.
   - Daily wellness check-in (hydration, gratitude, meditation).

4. **Sentinel Emergency Intervention & Anti-Bypass Simulator**:
   - Interactive testing laboratory:
     - *Simulate Blocked URL Visit* → Content interceptor + breathing exercise.
     - *Simulate Incognito Tab Open* → Incognito detection alert + penalty warning.
     - *Simulate Bypass VPN Attempt* → Immediate acoustic siren + guardian SMS dispatch preview.
     - *Simulate Geofence Danger Zone (Bar/Smoke Shop)* → Perimeter radar breach siren.
   - Silenced only via WebAuthn Biometric touch/face verification or Master PIN.

5. **Multi-Stream Ad & Monetization Hub**:
   - **Google AdSense / AdMob Banners**: Responsive ad units with real CPM/CPC impression tracking.
   - **Self-Serve Sponsor Portal ("Run Your Ad with Us")**: Form for third-party brand owners to submit ad campaigns, select addiction categories, set daily budgets, and upload creative banners.
   - **Affiliate Marketplace**: Verified recovery products (nicotine-free diffusers, focus journals, electrolyte packs, gym equipment) with purchase tracking and commission payouts.
   - **Income Goal Tracker**: Live dashboard showing current monthly earnings toward the ₹30,000–₹40,000/month target.

6. **Community Sanctuary & AI Counselor**:
   - Anonymous peer feed with recovery milestones and supportive reactions.
   - 24/7 CBT-grounded AI Recovery Companion powered by Gemini 3.8 Flash.

### Visual Identity & Theme
- **Aesthetic Direction**: Clinical Modern Wellness — deep slate canvas (`bg-slate-950`), bio-emerald (`#10b981`), warm calm amber (`#f59e0b`), and clean tabular metrics. Emergency crimson (`#ef4444`) is isolated strictly to active sirens and bypass breach alerts.
- **Typography**: Neo-grotesque display headings (`Plus Jakarta Sans`), crisp body copy (`DM Sans`), and tabular numerals (`font-mono tabular-nums`).
- **Touch-First Ergonomics**: $44\text{px}+$ tap targets, bottom tab bar navigation for mobile devices, and seamless multi-column expansion for desktop viewports.

***

## 3. Key Product Decisions & Trade-Offs

| Decision | Chosen Approach | Rationale & Trade-Off |
| :--- | :--- | :--- |
| **Defeating Bypass VPNs** | Local Loopback VPN (`VpnService` / `NEPacketTunnelProvider`) + Tamper Siren | Android & iOS only support 1 active VPN. By running Aegis as the local DNS resolver, bypass VPNs cannot connect without disconnecting Aegis, which triggers the loud siren and guardian alert. |
| **Defeating Incognito Tabs** | Browser Storage Quota Heuristics + Mobile Supervised Profile (MDM / Screen Time) | In web/PWA mode, storage persistence quotas identify private windows; on mobile, supervised configuration files completely hide the "New Incognito Tab" option in browsers. |
| **Preventing Relapse Uninstalls** | 24-Hour Co-Signature Delay + Guardian Alert | Eliminates impulsive "weak-moment uninstalls" by requiring a mandatory waiting period or guardian approval code. |
| **Somatic Craving Intervention** | 2-Minute Physical Workouts (Push-ups, squats, somatic breathwork) | Physical exercise metabolizes excess adrenaline and cortisol, biologically resetting the nervous system faster than passive willpower. |
| **Multi-Stream Monetization** | Google Ads + Direct Sponsor Portal + Affiliate Sales + Regional Subscriptions | Provides diversified income streams to reliably hit ₹30,000–₹40,000/month even with a starting base of 300–500 active users. |

***

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           AEGIS RECOVERY ECOSYSTEM                              │
│                                                                                 │
│  ┌────────────────────────┐  ┌───────────────────────┐  ┌────────────────────┐  │
│  │   Wellness & Workouts  │  │   Sentinel Protocol   │  │ Ironclad Anti-Bypass│ │
│  │ - 2-Min Urge Killer    │  │ - Web Audio Siren     │  │ - VPN Slot Lock    │  │
│  │ - Breathwork Pacer     │  │ - Geofence Radar      │  │ - Incognito Shield │  │
│  │ - Somatic Cold Reset   │  │ - Biometric Disarm    │  │ - Anti-Tamper SOS  │  │
│  └───────────┬────────────┘  └───────────┬───────────┘  └─────────┬──────────┘  │
│              │                           │                        │             │
│  ┌───────────┴───────────────────────────┴────────────────────────┴──────────┐  │
│  │                         Central State & Storage                           │  │
│  │  - Habits & Recovery Streaks                                              │  │
│  │  - Danger Geofences & Emergency Contacts                                  │  │
│  │  - Active Sponsor Ad Campaigns & Google Ad Impressions                    │  │
│  │  - Monthly Revenue Calculator (₹30,000–₹40,000 Target Progress)           │  │
│  └───────────────────────────────────────┬───────────────────────────────────┘  │
└──────────────────────────────────────────┼──────────────────────────────────────┘
                                           │
                                   HTTP POST /api/*
                                           │
┌──────────────────────────────────────────▼──────────────────────────────────────┐
│                           BACKEND SERVER (Node/Express)                         │
│                                                                                 │
│   POST /api/ai/counselor       ──►  GoogleGenAI SDK (gemini-3.8-flash)          │
│   POST /api/guardian/notify    ──►  Emergency SMS / Tamper Alert Simulator      │
│   POST /api/sponsor/submit     ──►  Brand Ad Placement Booking Engine           │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Data Model & Key Entities
- `Habit`: `{ id, title, category, streakStartTimestamp, targetMilestones, costPerDay, hoursLostPerDay }`
- `AntiBypassConfig`: `{ vpnSlotLocked, incognitoBlocked, tamperAlertEnabled, guardianCoolOffHours: 24, lastTamperAttemptTimestamp }`
- `WellnessExercise`: `{ id, title, type: 'workout' | 'breathwork' | 'somatic', durationSeconds, reps, instructions, dopamineBenefit }`
- `AdPlacement`: `{ id, type: 'google_admob' | 'direct_sponsor' | 'affiliate', title, sponsorName, bannerUrl, targetCategory, cpmRate, cpcRate, affiliateCommission, destinationUrl, impressions, clicks }`
- `RevenueProjection`: `{ googleAdRevenue, sponsorBookingRevenue, affiliateRevenue, subscriptionRevenue, totalMonthlyINR, targetINR: 35000 }`
- `SentinelTrigger`: `{ type: 'url_block' | 'geofence' | 'incognito_breach' | 'vpn_tamper' | 'panic_button', timestamp, habitId, resolvedVia: 'exercise' | 'biometric' | 'pin' }`
- `GeofenceZone`: `{ id, name, latitude, longitude, radiusMeters, associatedHabit, isActive }`

### Verification & Implementation Steps
1. Update `metadata.json` and `index.html` with clinical title, description, and PWA setup.
2. Build server-side Express endpoint with Gemini 3.8 Flash for AI recovery & workout guidance.
3. Build the **Ironclad Anti-Bypass & Lockdown Engine** with interactive simulators for Incognito detection, VPN tamper alerts, and guardian cool-off delay.
4. Build the **Wellness & Urge-Killer Workout Module** with interactive exercise timers, somatic breathwork, and dopamine reset drills.
5. Build the **Aegis Sentinel Protocol** with Web Audio API acoustic siren, geofence danger-zone radar, and biometric/PIN disarm.
6. Build the **Multi-Stream Ad & Monetization Hub**:
   - Google AdSense/AdMob responsive slots.
   - Self-serve Brand Sponsor Campaign Creator for third-party business owners.
   - Curated recovery affiliate product marketplace.
   - Live Monthly Revenue Calculator showing progress toward the ₹30,000–₹40,000/month milestone.
7. Build Habit Tracker, Sobriety Clock, and Anonymous Community Support Forum.
8. Provide exportable Apple App Store & Google Play native deployment blueprints (`VpnService` & Screen Time MDM profiles).
9. Verify application with `compile_applet`.
