import React, { useState } from 'react';
import { Lock, DollarSign, X, CheckCircle2, TrendingUp, Building2, PlusCircle, ExternalLink, MousePointerClick, Globe, Shield } from 'lucide-react';
import { AdRevenueHub } from './AdRevenueHub';

interface OwnerAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  masterPin: string;
  onOpenPublish?: () => void;
  onOpenPlayStoreHub?: () => void;
}

export const OwnerAdminModal: React.FC<OwnerAdminModalProps> = ({
  isOpen,
  onClose,
  masterPin,
  onOpenPublish,
  onOpenPlayStoreHub,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === masterPin || pinInput.trim() === '1998') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
      setTimeout(() => setPinError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Owner &amp; Admin Business Portal</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
                  Private &amp; Confidential
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Only visible to you (App Founder). Zero financial data is ever exposed to public users.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsAuthenticated(false);
              setPinInput('');
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-amber-400">
                <Shield className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white">Founder Authentication Required</h4>
                <p className="text-xs text-slate-400">
                  Enter your 4-digit Master Security PIN to view private ad monetization metrics and sponsor campaigns.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-3 pt-2">
                <input
                  type="password"
                  maxLength={4}
                  autoFocus
                  placeholder="Master PIN (1998)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className={`w-40 mx-auto block bg-slate-950 border ${
                    pinError ? 'border-red-500' : 'border-slate-700'
                  } rounded-xl px-4 py-2.5 text-center font-mono font-bold text-white text-base focus:outline-none focus:border-amber-500 tracking-widest`}
                />
                {pinError && (
                  <p className="text-xs text-red-400 font-medium">
                    Incorrect PIN. Use master PIN (1998).
                  </p>
                )}
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-lg transition active:scale-95"
                >
                  Access Owner Dashboard
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span>
                  ✓ Founder session authenticated. Public users only see the regular <strong>Recovery Store</strong>.
                </span>
                <div className="flex items-center gap-2">
                  {onOpenPlayStoreHub && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenPlayStoreHub();
                      }}
                      className="px-2.5 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-black rounded-lg text-[11px] flex items-center gap-1 transition shadow-sm"
                    >
                      <span>Play Store Hub (.zip)</span>
                    </button>
                  )}
                  {onOpenPublish && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenPublish();
                      }}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg text-[11px] flex items-center gap-1 transition shadow-sm"
                    >
                      <span>Publish Docs</span>
                    </button>
                  )}
                  <button
                    onClick={() => setIsAuthenticated(false)}
                    className="text-[11px] underline text-slate-400 hover:text-white"
                  >
                    Lock Session
                  </button>
                </div>
              </div>

              {/* Render the internal revenue hub exclusively inside this protected modal */}
              <AdRevenueHub />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
