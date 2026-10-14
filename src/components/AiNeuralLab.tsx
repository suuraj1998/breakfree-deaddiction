import React, { useState } from 'react';
import { Brain, Sparkles, ShieldAlert, Zap, AlertTriangle, CheckCircle2, RefreshCw, MessageSquareQuote, Compass, Dna, ArrowRight } from 'lucide-react';
import { Habit } from '../types';

interface AiNeuralLabProps {
  habits: Habit[];
  onTriggerWorkout?: () => void;
}

export const AiNeuralLab: React.FC<AiNeuralLabProps> = ({ habits, onTriggerWorkout }) => {
  const [activeSubTab, setActiveSubTab] = useState<'forecaster' | 'cbt' | 'drill' | 'neuro'>('forecaster');

  // --- Sub-Feature 1: Relapse Risk Forecaster State ---
  const [forecastHabit, setForecastHabit] = useState<string>(habits[0]?.name || 'Smoking');
  const [forecastTimeOfDay, setForecastTimeOfDay] = useState<string>('Late Night (11 PM - 3 AM)');
  const [forecastMood, setForecastMood] = useState<string>('Exhausted & Isolated');
  const [forecastStress, setForecastStress] = useState<number>(8);
  const [forecastLoading, setForecastLoading] = useState(false);
  const [forecastResult, setForecastResult] = useState<any>({
    riskScore: 78,
    riskLevel: 'HIGH',
    vulnerabilitySummary:
      'Late-night fatigue coupled with high cortisol dramatically impairs prefrontal impulse inhibition, leaving you vulnerable to habitual autopilot.',
    immediateShieldProtocol: [
      'Put all mobile devices in another room and turn off Wi-Fi',
      'Drink 400ml cold ice water to trigger the parasympathetic gastro-vagal response',
      'Perform 3 rounds of the Physiological Sigh (double inhale through nose, long slow mouth exhale)',
    ],
    neuroInsight:
      'Your brain is seeking quick dopamine to soothe stress. Discomfort is physical proof of neurochemical baseline calibration in progress.',
  });

  const handleRunForecast = async () => {
    setForecastLoading(true);
    try {
      const res = await fetch('/api/ai/predict-risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          habitName: forecastHabit,
          timeOfDay: forecastTimeOfDay,
          mood: forecastMood,
          currentStress: forecastStress,
          streakDays: 14,
        }),
      });
      const data = await res.json();
      setForecastResult(data);
    } catch {
      // Fallback
    } finally {
      setForecastLoading(false);
    }
  };

  // --- Sub-Feature 2: CBT Rationalization Buster State ---
  const [excuseText, setExcuseText] = useState(
    'I had an exhausting day at work and my head hurts. Just looking once won\'t ruin my 14-day progress.'
  );
  const [cbtLoading, setCbtLoading] = useState(false);
  const [cbtResult, setCbtResult] = useState<any>({
    cognitiveDistortion: 'Minimization & Emotional Reasoning',
    rationalAnalysis:
      'Your exhausted brain is using stress as an emotional excuse to extract quick artificial dopamine. One time is never just one time; it instantly re-arms the chemical neural pathway.',
    mentalArmorResponse:
      'I acknowledge the urge, but I refuse to exchange 5 minutes of numb escape for days of shame, brain fog, and resetting my hard-earned streak.',
    alternativeAction:
      'Drop down and perform 15 explosive push-ups or splash cold tap water on your eyes right now.',
  });

  const handleRunCbtReframe = async () => {
    if (!excuseText.trim()) return;
    setCbtLoading(true);
    try {
      const res = await fetch('/api/ai/cbt-reframe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          excuseText,
          habitName: forecastHabit,
        }),
      });
      const data = await res.json();
      setCbtResult(data);
    } catch {
      // Fallback
    } finally {
      setCbtLoading(false);
    }
  };

  // --- Sub-Feature 3: Context-Aware Somatic Drill Generator ---
  const [environment, setEnvironment] = useState<'desk' | 'bed' | 'party' | 'car' | 'couch'>('desk');
  const [drillLoading, setDrillLoading] = useState(false);
  const [drillResult, setDrillResult] = useState<any>({
    title: 'Desk Vagal Brake & Isometric Clench',
    durationSeconds: 90,
    steps: [
      'Grip the edges of your desk with maximum force for 10 seconds while exhaling slowly.',
      'Perform 25 rapid seated calf-pumps to redirect blood flow from the amygdala to the lower body.',
      'Fix your gaze on a distant static point across the room and take 4 deep nasal breaths.',
    ],
    somaticResetReason:
      'Forces blood flow to large skeletal muscle groups, interrupting the impulse surge before it manifests as physical relapse.',
  });

  const handleGenerateDrill = async (env: 'desk' | 'bed' | 'party' | 'car' | 'couch') => {
    setEnvironment(env);
    setDrillLoading(true);
    try {
      const res = await fetch('/api/ai/custom-drill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          environment: env,
          habitName: forecastHabit,
        }),
      });
      const data = await res.json();
      setDrillResult(data);
    } catch {
      // Fallback
    } finally {
      setDrillLoading(false);
    }
  };

  // --- Sub-Feature 4: Neurobiology Milestone Briefing ---
  const [milestoneDays, setMilestoneDays] = useState<number>(14);
  const [neuroLoading, setNeuroLoading] = useState(false);
  const [neuroResult, setNeuroResult] = useState<any>({
    stageTitle: 'Day 14: Dopamine D2 Receptor Upregulation Phase',
    dopamineStatus: 'Receptor density restored by ~24% compared to Day 1.',
    receptorDensityGain:
      'Delta-FosB accumulation in the nucleus accumbens has dropped significantly. Everyday activities (reading, music, food) begin stimulating natural dopamine again.',
    dailyPowerRule:
      'Protect your healing dopamine receptors from cheap artificial spikes today. Allow gentle stillness.',
  });

  const handleFetchNeuroBriefing = async (days: number) => {
    setMilestoneDays(days);
    setNeuroLoading(true);
    try {
      const res = await fetch('/api/ai/neuro-briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          streakDays: days,
          habitName: forecastHabit,
        }),
      });
      const data = await res.json();
      setNeuroResult(data);
    } catch {
      // Fallback
    } finally {
      setNeuroLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-indigo-500/30 rounded-2xl shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Brain className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">AI Neural Recovery Lab</h3>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30">
                  Gemini 3.8 Flash Engine
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Clinical-grade addiction neuroscience: Relapse forecaster, CBT rationalization buster, and somatic somatic drill generators.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Feature Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl">
        <button
          onClick={() => setActiveSubTab('forecaster')}
          className={`py-2 px-3 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
            activeSubTab === 'forecaster'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Risk Forecaster</span>
        </button>

        <button
          onClick={() => setActiveSubTab('cbt')}
          className={`py-2 px-3 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
            activeSubTab === 'cbt'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <MessageSquareQuote className="w-3.5 h-3.5" />
          <span>CBT Excuse Buster</span>
        </button>

        <button
          onClick={() => setActiveSubTab('drill')}
          className={`py-2 px-3 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
            activeSubTab === 'drill'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Context Drill Generator</span>
        </button>

        <button
          onClick={() => setActiveSubTab('neuro')}
          className={`py-2 px-3 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
            activeSubTab === 'neuro'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Dna className="w-3.5 h-3.5" />
          <span>Brain Dopamine Map</span>
        </button>
      </div>

      {/* --- TAB 1: RELAPSE RISK FORECASTER --- */}
      {activeSubTab === 'forecaster' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inputs */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-400" />
              Circadian &amp; Emotional Vulnerability Scanner
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Guarded Habit</label>
                <select
                  value={forecastHabit}
                  onChange={(e) => setForecastHabit(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                >
                  {habits.map((h) => (
                    <option key={h.id} value={h.name}>
                      {h.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Time of Day</label>
                <select
                  value={forecastTimeOfDay}
                  onChange={(e) => setForecastTimeOfDay(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Late Night (11 PM - 3 AM)">Late Night (11 PM - 3 AM) [Peak Risk]</option>
                  <option value="Evening (6 PM - 10 PM)">Evening (6 PM - 10 PM) [Post-Work]</option>
                  <option value="Afternoon Slump (2 PM - 5 PM)">Afternoon Slump (2 PM - 5 PM)</option>
                  <option value="Morning Waking (6 AM - 9 AM)">Morning Waking (6 AM - 9 AM)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Dominant Emotional State</label>
                <select
                  value={forecastMood}
                  onChange={(e) => setForecastMood(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Exhausted & Isolated">Exhausted &amp; Isolated (HALT State)</option>
                  <option value="High Anxiety / Work Stress">High Anxiety / Work Stress</option>
                  <option value="Bored & Unstimulated">Bored &amp; Unstimulated</option>
                  <option value="Overconfident / Euphoric">Overconfident / Euphoric</option>
                  <option value="Calm & Centered">Calm &amp; Centered</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] text-slate-400">Current Perceived Stress</label>
                  <span className="font-mono font-bold text-amber-400">{forecastStress} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={forecastStress}
                  onChange={(e) => setForecastStress(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
                />
              </div>

              <button
                onClick={handleRunForecast}
                disabled={forecastLoading}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 active:scale-95 shadow-md shadow-indigo-600/20"
              >
                {forecastLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Computing Neural Vulnerability...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Predict Relapse Vulnerability</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Card */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                    forecastResult.riskScore >= 70
                      ? 'bg-red-500/20 text-red-300 border-red-500/40'
                      : forecastResult.riskScore >= 40
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}
                >
                  {forecastResult.riskLevel} VULNERABILITY LEVEL
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Calculated Risk: <strong className="text-white">{forecastResult.riskScore}%</strong>
                </span>
              </div>

              {/* Score Bar */}
              <div className="w-full bg-slate-950 h-3 rounded-full mt-3 overflow-hidden p-0.5 border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    forecastResult.riskScore >= 70
                      ? 'bg-red-500'
                      : forecastResult.riskScore >= 40
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${forecastResult.riskScore}%` }}
                />
              </div>

              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl mt-4 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Circadian Analysis
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {forecastResult.vulnerabilitySummary}
                </p>
              </div>
            </div>

            {/* 3 Step Protocol */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Immediate AI Shield Protocol (Next 15 Minutes)
              </span>
              <div className="space-y-1.5">
                {forecastResult.immediateShieldProtocol?.map((step: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-2.5 bg-slate-950/70 border border-slate-800/80 rounded-xl text-xs text-slate-300"
                  >
                    <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-mono font-bold flex items-center justify-center shrink-0 text-[10px]">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[11px] text-indigo-300/80 bg-indigo-950/30 p-2.5 rounded-xl border border-indigo-500/20 flex items-center gap-2">
              <Brain className="w-4 h-4 shrink-0 text-indigo-400" />
              <span>{forecastResult.neuroInsight}</span>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: CBT RATIONALIZATION BUSTER --- */}
      {activeSubTab === 'cbt' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <MessageSquareQuote className="w-5 h-5 text-indigo-400" />
              <h4 className="text-base font-bold text-white">
                CBT Cognitive Restructuring: The Rationalization Buster
              </h4>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Addiction speaks in seductive rationalizations. Expose the cognitive lie and arm yourself with mental armor.
            </p>
          </div>

          {/* Quick presets */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1.5 uppercase tracking-wider">
              Common Relapse Rationalizations (Click to Test):
            </label>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                'I had a terrible day, I deserve one smoke/drink to unwind.',
                'Looking at porn for 5 minutes won\'t hurt, I am already 14 days clean.',
                'I will restart on Monday, today is already ruined.',
                'Nobody is watching, I can get away with it this once.',
              ].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setExcuseText(preset)}
                  className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl transition text-left"
                >
                  "{preset}"
                </button>
              ))}
            </div>
          </div>

          {/* Custom Input */}
          <div className="space-y-2">
            <textarea
              rows={2}
              value={excuseText}
              onChange={(e) => setExcuseText(e.target.value)}
              placeholder="What excuse or rationalization is your brain telling you right now?"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
            />

            <button
              onClick={handleRunCbtReframe}
              disabled={cbtLoading || !excuseText.trim()}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition flex items-center gap-2 active:scale-95 shadow-md shadow-indigo-600/20"
            >
              {cbtLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Dissecting Cognitive Trap...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Expose Rationalization</span>
                </>
              )}
            </button>
          </div>

          {/* Dissection Result */}
          {cbtResult && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> Identified Cognitive Distortion: {cbtResult.cognitiveDistortion}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {cbtResult.rationalAnalysis}
                </p>
                <div className="pt-2 text-[11px] text-emerald-400 border-t border-slate-800/80">
                  <strong>Alternative Action:</strong> {cbtResult.alternativeAction}
                </div>
              </div>

              <div className="p-4 bg-indigo-950/30 border border-indigo-500/40 rounded-xl space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Memorizable Mental Armor Mantra
                  </span>
                  <blockquote className="text-sm font-semibold text-white italic mt-1 leading-relaxed">
                    "{cbtResult.mentalArmorResponse}"
                  </blockquote>
                </div>
                <span className="text-[10px] text-slate-400">
                  Speak this statement aloud 3 times to engage auditory feedback and break the hypnotic trance.
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- TAB 3: CONTEXT-AWARE DRILL GENERATOR --- */}
      {activeSubTab === 'drill' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-400" />
              <h4 className="text-base font-bold text-white">
                Context-Aware Urge-Killer Drill Generator
              </h4>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Select your immediate physical location. Gemini generates an exact somatic reset drill tailored for where you are standing right now:
            </p>
          </div>

          {/* Environment Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {[
              { key: 'desk' as const, label: 'At Office Desk' },
              { key: 'bed' as const, label: 'Alone in Bed' },
              { key: 'party' as const, label: 'At Social Party' },
              { key: 'car' as const, label: 'In Car / Commute' },
              { key: 'couch' as const, label: 'Restless on Couch' },
            ].map((env) => (
              <button
                key={env.key}
                onClick={() => handleGenerateDrill(env.key)}
                className={`p-3 rounded-xl border text-center transition ${
                  environment === env.key
                    ? 'bg-indigo-600 border-indigo-500 text-white font-bold shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="text-xs">{env.label}</span>
              </button>
            ))}
          </div>

          {/* Generated Drill Display */}
          <div className="p-5 bg-slate-950 border border-indigo-500/30 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-500/30">
                  Target Duration: {drillResult.durationSeconds}s
                </span>
                <h4 className="text-lg font-bold text-white mt-1">{drillResult.title}</h4>
              </div>

              {onTriggerWorkout && (
                <button
                  onClick={onTriggerWorkout}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition flex items-center gap-1.5"
                >
                  <span>Open Full Timer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="space-y-2">
              {drillResult.steps?.map((step: string, idx: number) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-900 border border-slate-800/80 rounded-xl flex items-start gap-3 text-xs text-slate-200"
                >
                  <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-300 font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                    0{idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>

            <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
              <strong className="text-indigo-400 font-medium">Physiological Mechanism:</strong>{' '}
              {drillResult.somaticResetReason}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 4: BRAIN DOPAMINE MILESTONE MAP --- */}
      {activeSubTab === 'neuro' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <Dna className="w-5 h-5 text-indigo-400" />
              <h4 className="text-base font-bold text-white">
                Neuroplasticity &amp; Dopamine Receptor Regeneration Map
              </h4>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Select any clean streak milestone to understand the physical neurobiological changes taking place in your brain:
            </p>
          </div>

          {/* Days selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
            {[3, 7, 14, 21, 30, 60, 90].map((d) => (
              <button
                key={d}
                onClick={() => handleFetchNeuroBriefing(d)}
                className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition font-mono ${
                  milestoneDays === d
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Day {d}
              </button>
            ))}
          </div>

          {/* Neuro Report */}
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                Milestone Status
              </span>
              <h4 className="text-lg font-bold text-white">{neuroResult.stageTitle}</h4>
              <p className="text-xs text-emerald-400 font-medium">{neuroResult.dopamineStatus}</p>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5 text-xs">
              <span className="font-bold text-white">Delta-FosB &amp; Receptor Regeneration:</span>
              <p className="text-slate-300 leading-relaxed">{neuroResult.receptorDensityGain}</p>
            </div>

            <div className="p-4 bg-indigo-950/30 border border-indigo-500/30 rounded-xl space-y-1 text-xs">
              <span className="font-bold text-indigo-300 uppercase tracking-wider text-[10px]">
                Today's Power Rule for Dopamine Homeostasis:
              </span>
              <p className="text-white font-medium italic">"{neuroResult.dailyPowerRule}"</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
