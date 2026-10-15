import React, { useState, useEffect } from 'react';
import { Shield, Clock, Plus, Sparkles, CheckCircle2, ChevronRight, Zap, Bot, ArrowUpRight } from 'lucide-react';
import { Habit, HabitCategory } from '../types';

interface HabitDashboardProps {
  habits: Habit[];
  onTriggerEmergencyPanic: (habit: Habit) => void;
  onOpenAiCounselor: () => void;
  onOpenWellness: () => void;
  onToggleHabit: (id: string) => void;
  onAddHabit: (habit: Habit) => void;
}

export const HabitDashboard: React.FC<HabitDashboardProps> = ({
  habits,
  onTriggerEmergencyPanic,
  onOpenAiCounselor,
  onOpenWellness,
  onToggleHabit,
  onAddHabit,
}) => {
  const [selectedHabitId, setSelectedHabitId] = useState<string>(habits[0]?.id || '');
  const [now, setNow] = useState<number>(Date.now());
  const [isAddingHabit, setIsAddingHabit] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitCategory, setNewHabitCategory] = useState<HabitCategory>('porn');
  const [newHabitCost, setNewHabitCost] = useState(200);

  // Live timer tick
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeHabit = habits.find((h) => h.id === selectedHabitId) || habits[0];

  // Calculate clean streak in days, hours, mins, secs
  const streakStartMs = new Date(activeHabit?.streakStartDate || Date.now()).getTime();
  const diffMs = Math.max(0, now - streakStartMs);

  const daysClean = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hoursClean = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutesClean = Math.floor((diffMs / (1000 * 60)) % 60);
  const secondsClean = Math.floor((diffMs / 1000) % 60);

  // Overall financial and time savings across all habits
  const totalMoneySavedINR = habits.reduce((acc, h) => {
    const diff = Math.max(0, now - new Date(h.streakStartDate).getTime());
    const days = diff / (1000 * 60 * 60 * 24);
    return acc + Math.round(days * h.costPerDayINR);
  }, 0);

  const totalHoursReclaimed = habits.reduce((acc, h) => {
    const diff = Math.max(0, now - new Date(h.streakStartDate).getTime());
    const days = diff / (1000 * 60 * 60 * 24);
    return acc + Math.round(days * h.hoursSavedPerDay);
  }, 0);

  const handleCreateHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;

    const newHabit: Habit = {
      id: 'habit-' + Date.now(),
      name: newHabitName.trim(),
      category: newHabitCategory,
      tagline: 'Committed to permanent freedom and cognitive mastery.',
      streakStartDate: new Date().toISOString(),
      costPerDayINR: newHabitCost,
      hoursSavedPerDay: 1.5,
      relapseCount: 0,
      triggers: ['Late night boredom', 'Stress triggers'],
      milestonesReached: ['Day 1 Sovereign'],
      active: true,
    };

    onAddHabit(newHabit);
    setSelectedHabitId(newHabit.id);
    setNewHabitName('');
    setIsAddingHabit(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* =========================================================================
          MOBILE-ONLY UNCLUTTERED INTERFACE (sm:hidden)
          Spacious, focused, thumb-friendly, zero visual clutter
         ========================================================================= */}
      <div className="block sm:hidden space-y-4">
        {/* Mobile Horizontal Habit Carousel with Active Pill */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          {habits.map((h) => {
            const isSelected = activeHabit ? h.id === activeHabit.id : false;
            return (
              <button
                key={h.id}
                onClick={() => setSelectedHabitId(h.id)}
                className={`px-3 py-2 rounded-xl whitespace-nowrap transition flex items-center gap-1.5 shrink-0 active:scale-95 ${
                  isSelected
                    ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-900/30'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-400'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? 'bg-white' : 'bg-slate-600'
                  }`}
                />
                <span className="text-xs">{h.name}</span>
              </button>
            );
          })}
          <button
            onClick={() => setIsAddingHabit(!isAddingHabit)}
            className="px-2.5 py-2 rounded-xl bg-slate-900 border border-dashed border-slate-700 text-emerald-400 flex items-center gap-1 text-xs font-semibold shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

        {/* Mobile Add Habit Form if Toggled */}
        {isAddingHabit && (
          <form
            onSubmit={handleCreateHabit}
            className="p-4 bg-slate-900 border border-emerald-500/40 rounded-2xl space-y-3 shadow-xl animate-in fade-in"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Add Habit to Guard</span>
              <button
                type="button"
                onClick={() => setIsAddingHabit(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Habit Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Nicotine, Screen Time, Sugar"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Category</label>
                <select
                  value={newHabitCategory}
                  onChange={(e) => setNewHabitCategory(e.target.value as HabitCategory)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="porn">Adult Content</option>
                  <option value="smoking">Smoking/Vape</option>
                  <option value="alcohol">Alcohol</option>
                  <option value="sugar">Refined Sugar</option>
                  <option value="movies">Screen Binge</option>
                  <option value="gaming">Gaming</option>
                  <option value="shopping">Shopping</option>
                  <option value="social">Doomscroll</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Daily Cost (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={newHabitCost}
                  onChange={(e) => setNewHabitCost(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-md"
            >
              Start Guarding
            </button>
          </form>
        )}

        {/* Clean Hero Sobriety Card for Mobile (Uncrowded, calm, prominent) */}
        <div className="p-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/25 rounded-2xl shadow-lg relative overflow-hidden">
          {/* Subtle glow highlight */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide">
                Active Sobriety
              </span>
            </div>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {activeHabit?.category}
            </span>
          </div>

          {/* Focal Streak Number & Clean Ticker */}
          <div className="text-center py-4 my-1">
            <div className="text-5xl font-black font-mono tracking-tight text-white">
              {daysClean}
            </div>
            <div className="text-xs uppercase tracking-widest text-emerald-400/90 font-bold mt-1">
              Days Clean &amp; Free
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-950/80 border border-slate-800 rounded-full text-[11px] font-mono text-slate-300 mt-2.5">
              <Clock className="w-3 h-3 text-emerald-400" />
              <span>
                {hoursClean < 10 ? `0${hoursClean}` : hoursClean}:
                {minutesClean < 10 ? `0${minutesClean}` : minutesClean}:
                {secondsClean < 10 ? `0${secondsClean}` : secondsClean}
              </span>
            </div>
          </div>

          {/* 2 Micro-Stats (Side by Side, clean) */}
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80">
            <div className="p-2.5 bg-slate-950/60 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 block font-medium">Money Saved</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">
                ₹{totalMoneySavedINR.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="p-2.5 bg-slate-950/60 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 block font-medium">Time Reclaimed</span>
              <span className="text-sm font-bold text-white font-mono">
                {totalHoursReclaimed} hrs
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Quick Action Buttons (Thumb Sized, High Ergonomics) */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => activeHabit && onTriggerEmergencyPanic(activeHabit)}
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-950/40 active:scale-95 transition"
          >
            <Zap className="w-4 h-4 fill-current animate-pulse text-amber-200" />
            <span>Panic SOS Siren</span>
          </button>

          <button
            onClick={onOpenAiCounselor}
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 active:bg-indigo-800 text-white font-bold text-xs shadow-lg shadow-indigo-950/40 active:scale-95 transition"
          >
            <Bot className="w-4 h-4 text-indigo-200" />
            <span>AI Craving Coach</span>
          </button>
        </div>

        {/* Clean Habits List for Mobile (No visual clutter) */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Guarded Habits ({habits.length})
            </span>
            <span className="text-[11px] text-slate-500">Tap to view</span>
          </div>

          <div className="space-y-2">
            {habits.map((habit) => {
              const isSelected = activeHabit ? habit.id === activeHabit.id : false;
              const diff = Math.max(0, now - new Date(habit.streakStartDate).getTime());
              const days = Math.floor(diff / (1000 * 60 * 60 * 24));
              const savedINR = Math.round(days * habit.costPerDayINR);

              return (
                <div
                  key={habit.id}
                  onClick={() => setSelectedHabitId(habit.id)}
                  className={`p-3.5 rounded-xl border transition flex items-center justify-between cursor-pointer active:scale-[0.99] ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500/70 ring-1 ring-emerald-500/30'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Shield className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">{habit.name}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="text-emerald-400 font-bold font-mono">{days}d clean</span>
                        <span>·</span>
                        <span className="font-mono text-slate-300">₹{savedINR} saved</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isSelected ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Selected
                      </span>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =========================================================================
          DESKTOP & TABLET LANDSCAPE VIEW (hidden sm:block)
          Preserved in its complete, rich, spacious format as requested
         ========================================================================= */}
      <div className="hidden sm:block space-y-6">
        {/* Habit Switcher Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          {habits.map((h) => {
            const isSelected = activeHabit ? h.id === activeHabit.id : false;
            return (
              <button
                key={h.id}
                onClick={() => setSelectedHabitId(h.id)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-emerald-600 text-white font-bold shadow-sm'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                <span>{h.name}</span>
              </button>
            );
          })}
        </div>

        {/* Hero Sobriety Clock Card */}
        <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-3xl shadow-xl">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Active Sobriety Clock
                </span>
                <span className="text-xs text-slate-300 font-semibold">{activeHabit?.name || 'Recovery Guard'}</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white mt-1 tracking-tight">
                {daysClean} Days Clean
              </h2>
              <p className="text-xs text-slate-400 mt-0.5 max-w-md">{activeHabit?.tagline || 'Every day sovereign is a victory.'}</p>
            </div>

            {/* Urgent Emergency Intervene Button */}
            <button
              onClick={() => activeHabit && onTriggerEmergencyPanic(activeHabit)}
              className="px-4 py-3 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-red-600/20 transition flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-current animate-pulse" />
              <span>Panic / Craving Intervene</span>
            </button>
          </div>

          {/* Live Precision Countdown Timer */}
          <div className="grid grid-cols-4 gap-4 my-6 py-4 px-6 bg-slate-950/70 border border-slate-800 rounded-2xl text-center">
            <div className="space-y-1">
              <div className="text-4xl font-black font-mono text-white tabular-nums">
                {daysClean}
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                Days
              </div>
            </div>

            <div className="space-y-1 border-l border-slate-800">
              <div className="text-4xl font-black font-mono text-emerald-400 tabular-nums">
                {hoursClean < 10 ? `0${hoursClean}` : hoursClean}
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                Hours
              </div>
            </div>

            <div className="space-y-1 border-l border-slate-800">
              <div className="text-4xl font-black font-mono text-slate-200 tabular-nums">
                {minutesClean < 10 ? `0${minutesClean}` : minutesClean}
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                Mins
              </div>
            </div>

            <div className="space-y-1 border-l border-slate-800">
              <div className="text-4xl font-black font-mono text-emerald-300 tabular-nums">
                {secondsClean < 10 ? `0${secondsClean}` : secondsClean}
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                Secs
              </div>
            </div>
          </div>

          {/* Aggregate Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 font-bold text-xs">
                ₹
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Total Saved</span>
                <div className="text-sm font-bold text-white font-mono">
                  ₹{totalMoneySavedINR.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Time Reclaimed</span>
                <div className="text-sm font-bold text-white font-mono">{totalHoursReclaimed} hrs</div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Active Shields</span>
                <div className="text-sm font-bold text-emerald-400 font-mono">
                  {habits.filter((h) => h.active).length} Addictions Guarded
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add New Habit Form */}
        {isAddingHabit && (
          <form
            onSubmit={handleCreateHabit}
            className="p-5 bg-slate-900 border border-emerald-500/40 rounded-2xl space-y-3 animate-in fade-in"
          >
            <div className="text-sm font-bold text-white">Add New Habit to Guard</div>
            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Habit Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nicotine, Sugar, Gaming"
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Category</label>
                <select
                  value={newHabitCategory}
                  onChange={(e) => setNewHabitCategory(e.target.value as HabitCategory)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="porn">Adult Content &amp; Porn</option>
                  <option value="smoking">Smoking &amp; Nicotine</option>
                  <option value="alcohol">Alcohol &amp; Drinking</option>
                  <option value="sugar">Refined Sugar &amp; Junk Food</option>
                  <option value="movies">Movies &amp; Screen Bingeing</option>
                  <option value="gaming">Gaming</option>
                  <option value="shopping">Impulsive Shopping</option>
                  <option value="social">Social Media Doomscroll</option>
                  <option value="substances">Substance Dependency</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Daily Cost Saved (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={newHabitCost}
                  onChange={(e) => setNewHabitCost(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddingHabit(false)}
                className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs transition"
              >
                Add Habit
              </button>
            </div>
          </form>
        )}

        {/* Habits Portfolio List (Desktop Grid) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              All Guarded Habits ({habits.length})
            </h3>
            <button
              onClick={() => setIsAddingHabit(!isAddingHabit)}
              className="flex items-center gap-1 text-xs text-emerald-400 font-semibold hover:text-emerald-300 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isAddingHabit ? 'Close' : 'Add Habit'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5">
            {habits.map((habit) => {
              const isSelected = activeHabit ? habit.id === activeHabit.id : false;
              const diff = Math.max(0, now - new Date(habit.streakStartDate).getTime());
              const days = Math.floor(diff / (1000 * 60 * 60 * 24));
              const savedINR = Math.round(days * habit.costPerDayINR);

              return (
                <div
                  key={habit.id}
                  onClick={() => setSelectedHabitId(habit.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500/60 shadow-md ring-1 ring-emerald-500/20'
                      : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">
                        {habit.category}
                      </span>
                      <h4 className="text-xs font-bold text-white truncate">{habit.name}</h4>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                      <span className="text-emerald-400 font-bold font-mono">{days}d clean</span>
                      <span>·</span>
                      <span className="font-mono text-slate-300">₹{savedINR} saved</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTriggerEmergencyPanic(habit);
                    }}
                    className="px-2 py-1 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-400 border border-red-500/30 transition text-[10px] font-bold flex items-center gap-1 shrink-0"
                    title="Trigger Panic Intervention"
                  >
                    <Zap className="w-3 h-3" />
                    <span>SOS</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
