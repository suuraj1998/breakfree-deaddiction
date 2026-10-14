import React, { useState } from 'react';
import { Crown, Check, X, Shield, Globe, Sparkles } from 'lucide-react';
import { UserSubscription } from '../types';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSub: UserSubscription;
  onUpgrade: (sub: UserSubscription) => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  currentSub,
  onUpgrade,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<'IN' | 'US' | 'EU' | 'UK'>('IN');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  if (!isOpen) return null;

  const pricingTable = {
    IN: { currency: 'INR', symbol: '₹', monthly: 299, annual: 1999, label: 'India (Purchasing Power Parity)' },
    US: { currency: 'USD', symbol: '$', monthly: 9.99, annual: 69.99, label: 'United States & Canada' },
    EU: { currency: 'EUR', symbol: '€', monthly: 8.99, annual: 64.99, label: 'European Union' },
    UK: { currency: 'GBP', symbol: '£', monthly: 7.99, annual: 54.99, label: 'United Kingdom' },
  };

  const currentPrice = pricingTable[selectedRegion];
  const priceToDisplay = billingCycle === 'monthly' ? currentPrice.monthly : currentPrice.annual;

  const features = [
    '100% Ad-Free & Distraction-Free Experience',
    'Unlimited AI Craving De-Escalations with Gemini 3.8 Flash',
    'Unlimited GPS Danger Geofences & Proximity Sirens',
    'Emergency Guardian Automated SMS Gateway Dispatch',
    'Ironclad Anti-Bypass VPN & Incognito Lockdown Engine',
    'Multi-Device Mobile & Desktop Cloud Synchronization',
    'Advanced Relapse Biometric Analytics & Urge Heatmaps',
  ];

  const handleConfirmUpgrade = () => {
    onUpgrade({
      tier: 'pro',
      region: selectedRegion,
      currency: currentPrice.currency as any,
      priceMonthly: currentPrice.monthly,
      priceAnnual: currentPrice.annual,
      activeUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-slate-900 border border-emerald-500/40 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/40 border-b border-slate-800 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Aegis Pro Membership</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
                  Global Parity
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Fair regional pricing tailored for each country's purchasing power.
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

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Region Tabs */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1.5 uppercase tracking-wider">
              Select Your Region (PPP Pricing)
            </label>
            <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
              {(['IN', 'US', 'EU', 'UK'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRegion(r)}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition ${
                    selectedRegion === r
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {r === 'IN' && '🇮🇳 India'}
                  {r === 'US' && '🇺🇸 USA'}
                  {r === 'EU' && '🇪🇺 Europe'}
                  {r === 'UK' && '🇬🇧 UK'}
                </button>
              ))}
            </div>
          </div>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800 max-w-xs mx-auto">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition ${
                billingCycle === 'monthly' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400'
              }`}
            >
              Monthly Plan
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition ${
                billingCycle === 'annual' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400'
              }`}
            >
              Annual Pass <span className="text-emerald-400 text-[10px] font-bold">Save 40%</span>
            </button>
          </div>

          {/* Pricing Highlight */}
          <div className="p-4 bg-slate-950 border border-emerald-500/30 rounded-xl text-center space-y-1">
            <span className="text-xs text-slate-400 font-medium">{currentPrice.label}</span>
            <div className="text-3xl font-black text-white font-mono">
              {currentPrice.symbol}
              {priceToDisplay}
              <span className="text-xs font-normal text-slate-400">
                {billingCycle === 'monthly' ? ' / month' : ' / year'}
              </span>
            </div>
            <p className="text-[11px] text-emerald-400 font-medium">
              Cancel anytime with 1-click. 14-day zero-risk refund guarantee.
            </p>
          </div>

          {/* Feature Checklist */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              What You Unlock With Aegis Pro:
            </span>
            <div className="space-y-1.5">
              {features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleConfirmUpgrade}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/20 transition active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>
              Activate Aegis Pro ({currentPrice.symbol}
              {priceToDisplay})
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
