import React from 'react';
import { ShoppingBag, ExternalLink, Star, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { AdPlacement } from '../types';
import { INITIAL_AFFILIATE_PRODUCTS } from '../data/mockData';

interface WellnessStoreProps {
  onProductClick?: (product: AdPlacement) => void;
}

export const WellnessStore: React.FC<WellnessStoreProps> = ({ onProductClick }) => {
  const products = INITIAL_AFFILIATE_PRODUCTS;

  return (
    <div className="space-y-6">
      {/* Hero Store Banner */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Recovery Tools &amp; Wellness Store</h3>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30 uppercase">
                  Verified Aids
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Scientifically formulated physical aids to overcome oral fixation, mental brain fog, and restless cravings.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sponsored Partner Spotlight */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded">
              Featured Partner
            </span>
            <span className="text-xs font-bold text-white">BreathePure Aromatherapeutics</span>
          </div>
          <p className="text-xs text-slate-300 font-medium">
            Non-electric sensory inhaler replacing smoking/vaping urges with certified botanical terpenes.
          </p>
        </div>

        <a
          href="https://example.com/breathepure?ref=aegis"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shrink-0 transition flex items-center gap-1.5"
        >
          <span>Claim 20% Partner Discount</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Curated Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {products.map((prod) => (
          <div
            key={prod.id}
            className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-4 hover:border-slate-700 transition group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-800 text-slate-300 rounded">
                  {prod.brandName}
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-xs">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold">4.9</span>
                </div>
              </div>

              <h4 className="text-base font-bold text-white mt-2 group-hover:text-emerald-300 transition-colors">
                {prod.headline}
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{prod.description}</p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Clean Standard</span>
              </div>

              <a
                href={prod.clickUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onProductClick && onProductClick(prod)}
                className="px-4 py-2 bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5 active:scale-95"
              >
                <span>{prod.ctaText}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
