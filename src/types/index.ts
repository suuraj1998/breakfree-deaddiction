export type HabitCategory =
  | 'porn'
  | 'smoking'
  | 'alcohol'
  | 'sugar'
  | 'movies'
  | 'gaming'
  | 'shopping'
  | 'social'
  | 'substances';

export interface Habit {
  id: string;
  name: string;
  category: HabitCategory;
  tagline: string;
  streakStartDate: string; // ISO string
  costPerDayINR: number;
  hoursSavedPerDay: number;
  relapseCount: number;
  triggers: string[];
  milestonesReached: string[];
  active: boolean;
}

export interface DangerZone {
  id: string;
  name: string;
  category: HabitCategory;
  address: string;
  latitude: number;
  longitude: number;
  radiusMeters: number;
  isActive: boolean;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
  notifyOnGeofence: boolean;
  notifyOnBypass: boolean;
  notifyOnPanic: boolean;
  isVerified: boolean;
}

export interface WellnessExercise {
  id: string;
  title: string;
  type: 'workout' | 'breathwork' | 'somatic';
  durationSeconds: number;
  reps?: string;
  caloriesBurned?: number;
  dopamineBenefit: string;
  instructions: string[];
  intensity: 'Quick Shock' | 'Moderate' | 'Intense';
}

export interface AdPlacement {
  id: string;
  type: 'google_admob' | 'direct_sponsor' | 'affiliate';
  brandName: string;
  headline: string;
  description: string;
  ctaText: string;
  targetCategory: HabitCategory | 'all';
  bannerType: 'header' | 'in_feed' | 'urge_screen';
  monthlyBudgetINR: number;
  clickUrl: string;
  affiliateCommissionINR?: number;
  impressions: number;
  clicks: number;
  imageTheme: string;
}

export interface CommunityPost {
  id: string;
  pseudonym: string;
  habitCategory: HabitCategory;
  streakDays: number;
  content: string;
  timestamp: string;
  reactions: {
    shields: number;
    hearts: number;
    fistBumps: number;
  };
  userReacted?: string | null;
}

export interface SentinelTriggerEvent {
  type: 'url_block' | 'geofence' | 'incognito_breach' | 'vpn_tamper' | 'panic_button';
  habitName?: string;
  locationName?: string;
  timestamp: string;
  details: string;
}

export interface UserSubscription {
  tier: 'free' | 'pro';
  region: 'IN' | 'US' | 'EU' | 'UK';
  currency: 'INR' | 'USD' | 'EUR' | 'GBP';
  priceMonthly: number;
  priceAnnual: number;
  activeUntil?: string;
}
