import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, ShieldCheck, Home, Bug, Copy, Check } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  copied: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    copied: false,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[Aegis Recovery ErrorBoundary caught error]:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    // Clear potentially corrupted transient caches or sessionStorage
    try {
      sessionStorage.clear();
    } catch {
      // Ignore if unavailable
    }
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  private handleSoftRecover = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private handleCopyDiagnostic = () => {
    const diagnostic = `Aegis Recovery Diagnostic Report
Time: ${new Date().toISOString()}
Error: ${this.state.error?.name}: ${this.state.error?.message}
Stack:
${this.state.error?.stack || 'No stack trace'}
Component Trace:
${this.state.errorInfo?.componentStack || 'No component stack'}`;

    navigator.clipboard.writeText(diagnostic).then(() => {
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2500);
    });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
          <div className="w-full max-w-lg bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
            
            {/* Shield Icon Badge */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Diagnostic Shield Active
                </span>
                <h1 className="text-xl font-bold text-white tracking-tight mt-1">
                  Aegis Self-Healing Interceptor
                </h1>
              </div>
            </div>

            {/* Reassuring Explanation */}
            <p className="text-sm text-slate-300 leading-relaxed">
              An unexpected render or network glitch occurred. Your streak days, anti-bypass PIN protection, and recovery data are safely preserved in local storage.
            </p>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                Self-Heal & Reload
              </button>

              <button
                onClick={this.handleSoftRecover}
                className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                Return to Dashboard
              </button>
            </div>

            {/* Diagnostic Details Accordion */}
            <div className="border-t border-slate-800/80 pt-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <Bug className="w-3.5 h-3.5 text-slate-400" /> Technical Telemetry
                </span>
                <button
                  onClick={this.handleCopyDiagnostic}
                  className="flex items-center gap-1 hover:text-emerald-400 transition text-[11px]"
                >
                  {this.state.copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy Log
                    </>
                  )}
                </button>
              </div>

              <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 text-[11px] font-mono text-rose-300 max-h-36 overflow-y-auto space-y-1">
                <p className="font-semibold text-rose-200">
                  {this.state.error?.message || 'Unknown runtime error'}
                </p>
                {this.state.error?.stack && (
                  <p className="text-slate-500 text-[10px] whitespace-pre-wrap leading-tight">
                    {this.state.error.stack.slice(0, 300)}...
                  </p>
                )}
              </div>
            </div>

            {/* Footer reassurance */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-900">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Aegis Recovery Sovereign Blocker Engine</span>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
