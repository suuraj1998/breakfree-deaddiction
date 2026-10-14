import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Tag, PlusCircle, ExternalLink, MousePointerClick, Eye, ShieldCheck, CheckCircle2, ShoppingBag, Globe, Building2 } from 'lucide-react';
import { AdPlacement } from '../types';
import { INITIAL_AFFILIATE_PRODUCTS } from '../data/mockData';

export const AdRevenueHub: React.FC = () => {
  // Direct sponsor campaigns
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [affiliates, setAffiliates] = useState<AdPlacement[]>(INITIAL_AFFILIATE_PRODUCTS);

  // Revenue metrics
  const [googleAdEarningsINR, setGoogleAdEarningsINR] = useState(5420);
  const [affiliateEarningsINR, setAffiliateEarningsINR] = useState(9450);
  const [sponsorEarningsINR, setSponsorEarningsINR] = useState(18500);
  const [subscriptionEarningsINR, setSubscriptionEarningsINR] = useState(5980);

  // Live impressions & clicks simulation
  const [liveImpressions, setLiveImpressions] = useState(48290);
  const [liveClicks, setLiveClicks] = useState(1280);

  // Form for new sponsor submission
  const [isAddingSponsor, setIsAddingSponsor] = useState(false);
  const [sponsorForm, setSponsorForm] = useState({
    brandName: '',
    contactEmail: '',
    headline: '',
    description: '',
    ctaText: 'Claim Offer',
    targetCategory: 'all',
    bannerType: 'in_feed',
    monthlyBudgetINR: 5000,
    clickUrl: 'https://brand-example.com/recovery',
  });
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Load sponsors from server
  useEffect(() => {
    fetch('/api/sponsors')
      .then((r) => r.json())
      .then((data) => {
        if (data.sponsors) setSponsors(data.sponsors);
      })
      .catch(() => {});
  }, []);

  const totalMonthlyEarningsINR =
    googleAdEarningsINR + affiliateEarningsINR + sponsorEarningsINR + subscriptionEarningsINR;

  const targetMonthlyINR = 35000;
  const progressPercent = Math.min(Math.round((totalMonthlyEarningsINR / targetMonthlyINR) * 100), 100);

  const handleSimulateClick = (type: 'google' | 'affiliate' | 'sponsor', payoutINR: number) => {
    setLiveClicks((prev) => prev + 1);
    if (type === 'google') {
      setGoogleAdEarningsINR((prev) => prev + payoutINR);
    } else if (type === 'affiliate') {
      setAffiliateEarningsINR((prev) => prev + payoutINR);
    } else if (type === 'sponsor') {
      setSponsorEarningsINR((prev) => prev + payoutINR);
    }
  };

  const handleSponsorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sponsorForm.brandName || !sponsorForm.headline) return;

    try {
      const res = await fetch('/api/sponsor/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sponsorForm),
      });
      const data = await res.json();
      if (data.success && data.campaign) {
        setSponsors([data.campaign, ...sponsors]);
        setSponsorEarningsINR((prev) => prev + Number(sponsorForm.monthlyBudgetINR));
        setSubmissionSuccess(true);
        setTimeout(() => {
          setSubmissionSuccess(false);
          setIsAddingSponsor(false);
        }, 1800);
      }
    } catch {
      // Fallback
      setSponsors([
        {
          id: 'spons-' + Date.now(),
          ...sponsorForm,
          createdAt: new Date().toISOString(),
          status: 'active',
        },
        ...sponsors,
      ]);
      setSponsorEarningsINR((prev) => prev + Number(sponsorForm.monthlyBudgetINR));
      setSubmissionSuccess(true);
      setTimeout(() => {
        setSubmissionSuccess(false);
        setIsAddingSponsor(false);
      }, 1800);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Monthly Revenue Progress */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-2xl shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Founder Revenue Roadmap
              </span>
              <span className="text-xs text-slate-400">Target: ₹30,000–₹40,000 / month</span>
            </div>
            <h3 className="text-2xl font-bold text-white mt-1">
              ₹{totalMonthlyEarningsINR.toLocaleString('en-IN')}{' '}
              <span className="text-sm font-normal text-slate-400">/ ₹35,000 monthly goal</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Multi-stream monetization: Google AdMob + Direct Brand Sponsors + Affiliate Recovery Tools + Pro Subs.
            </p>
          </div>

          <div className="w-full md:w-64 bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Monthly Target Progress</span>
              <span className="font-bold text-emerald-400">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-400 flex justify-between">
              <span>₹0</span>
              <span className="text-emerald-400 font-medium">₹35,000 Goal Reached!</span>
            </div>
          </div>
        </div>

        {/* 4 Revenue Engine Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
            <span className="text-[11px] text-slate-400">Google AdSense / AdMob</span>
            <div className="text-lg font-bold text-white mt-0.5 font-mono">
              ₹{googleAdEarningsINR.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-emerald-400">CPM + Click share</span>
          </div>

          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
            <span className="text-[11px] text-slate-400">Brand Sponsors Portal</span>
            <div className="text-lg font-bold text-white mt-0.5 font-mono">
              ₹{sponsorEarningsINR.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-emerald-400">{sponsors.length} active campaigns</span>
          </div>

          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
            <span className="text-[11px] text-slate-400">Affiliate Sales (10-30%)</span>
            <div className="text-lg font-bold text-white mt-0.5 font-mono">
              ₹{affiliateEarningsINR.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-emerald-400">Per purchase margin</span>
          </div>

          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
            <span className="text-[11px] text-slate-400">Pro Subscriptions (PPP)</span>
            <div className="text-lg font-bold text-white mt-0.5 font-mono">
              ₹{subscriptionEarningsINR.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-emerald-400">₹299/mo recurring</span>
          </div>
        </div>
      </div>

      {/* Stream 1: Google AdSense / AdMob Live Banner Slot */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-bold text-white">Google AdMob / AdSense Network Slot</h4>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Impressions: {liveImpressions.toLocaleString()} · Clicks: {liveClicks}
          </span>
        </div>

        {/* Display Banner Mock */}
        <div className="p-4 bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-700/60 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded">
                Ad by Google
              </span>
              <span className="text-xs font-semibold text-white">
                Mindful Mornings: Clinically Backed Sleep &amp; Habit Restoration
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Download the free sleep hygiene kit. Over 50,000+ recovery seekers trust this routine.
            </p>
          </div>

          <button
            onClick={() => handleSimulateClick('google', 25)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shrink-0 transition flex items-center gap-1.5 active:scale-95"
          >
            <MousePointerClick className="w-3.5 h-3.5" />
            <span>Simulate User Ad Click (+₹25)</span>
          </button>
        </div>
      </div>

      {/* Stream 2: Self-Serve Brand Sponsorship Portal ("Run Your Ad with Us") */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <h4 className="text-sm font-bold text-white">Direct Brand Sponsorship Portal</h4>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Allow outside wellness and recovery product owners to run their ads directly on Aegis.
            </p>
          </div>

          <button
            onClick={() => setIsAddingSponsor(!isAddingSponsor)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-semibold transition"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{isAddingSponsor ? 'Close Booking Form' : 'Book Sponsor Campaign'}</span>
          </button>
        </div>

        {/* Sponsor Booking Form */}
        {isAddingSponsor && (
          <form
            onSubmit={handleSponsorSubmit}
            className="p-4 bg-slate-950 border border-emerald-500/40 rounded-xl space-y-3 animate-in fade-in"
          >
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>Brand Ad Placement Setup</span>
              <span className="text-slate-400 font-normal">
                (Standard monthly fee: ₹4,000 - ₹8,000/placement)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Brand Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PureRecover Hydration"
                  value={sponsorForm.brandName}
                  onChange={(e) => setSponsorForm({ ...sponsorForm, brandName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Contact Email</label>
                <input
                  type="email"
                  required
                  placeholder="sponsor@brand.com"
                  value={sponsorForm.contactEmail}
                  onChange={(e) => setSponsorForm({ ...sponsorForm, contactEmail: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Ad Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Non-Nicotine Mint Inhalers"
                  value={sponsorForm.headline}
                  onChange={(e) => setSponsorForm({ ...sponsorForm, headline: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Monthly Sponsorship Fee (INR)</label>
                <select
                  value={sponsorForm.monthlyBudgetINR}
                  onChange={(e) =>
                    setSponsorForm({ ...sponsorForm, monthlyBudgetINR: Number(e.target.value) })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value={4000}>₹4,000 / month (Standard In-Feed)</option>
                  <option value={6000}>₹6,000 / month (Urge Screen High Priority)</option>
                  <option value={8000}>₹8,000 / month (Top Header Leaderboard)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Product Description / Offer</label>
              <input
                type="text"
                placeholder="Replace oral fixation naturally with pure essential botanicals."
                value={sponsorForm.description}
                onChange={(e) => setSponsorForm({ ...sponsorForm, description: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAddingSponsor(false)}
                className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-xs transition"
              >
                {submissionSuccess ? 'Campaign Booked!' : 'Submit Ad & Activate (+₹' + sponsorForm.monthlyBudgetINR + ')'}
              </button>
            </div>
          </form>
        )}

        {/* Active Sponsor Campaign Cards */}
        <div className="space-y-2.5">
          {sponsors.map((sp) => (
            <div
              key={sp.id}
              className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-slate-700 transition"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
                    Sponsor Partner
                  </span>
                  <span className="text-xs font-bold text-white">{sp.brandName}</span>
                  <span className="text-xs text-slate-500">·</span>
                  <span className="text-xs font-medium text-emerald-400">
                    ₹{sp.monthlyBudgetINR?.toLocaleString('en-IN')}/mo
                  </span>
                </div>
                <div className="text-xs font-medium text-slate-200">{sp.headline}</div>
                <div className="text-xs text-slate-400">{sp.description}</div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleSimulateClick('sponsor', 50)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium rounded-lg transition flex items-center gap-1 active:scale-95"
                >
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                  <span>{sp.ctaText || 'Learn More'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stream 3: Curated Affiliate Recovery Products Marketplace */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-bold text-white">Affiliate Recovery Marketplace</h4>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            When users click and purchase helpful recovery tools, you earn 10%–30% profit share per sale.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {affiliates.map((prod) => (
            <div
              key={prod.id}
              className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col justify-between space-y-3 hover:border-slate-700 transition"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                    ₹{prod.affiliateCommissionINR} Profit / Sale
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {prod.clicks} clicks recorded
                  </span>
                </div>
                <h5 className="text-sm font-bold text-white mt-2">{prod.headline}</h5>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{prod.description}</p>
              </div>

              <button
                onClick={() => handleSimulateClick('affiliate', prod.affiliateCommissionINR || 150)}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 active:scale-95"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Simulate Purchase (+₹{prod.affiliateCommissionINR} Profit)</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
