import React, { useState, useEffect } from 'react';
import { Shield, Flame, Clock, IndianRupee, Plus, AlertCircle, Sparkles, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
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
    <div className="space-y-6">
      {/* Hero Sobriety Clock & Quick Panic Action */}
      <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-3xl shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Primary Sobriety Clock
              </span>
              <span className="text-xs text-slate-400 font-medium">{activeHabit?.name}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight">
              {daysClean} Days Clean
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-md">{activeHabit?.tagline}</p>
          </div>

          {/* Urgent Emergency Intervene Button */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => onTriggerEmergencyPanic(activeHabit)}
              className="flex-1 md:flex-initial px-5 py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-red-600/25 transition active:scale-95 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-current animate-pulse" />
              <span>Panic / Craving Intervene</span>
            </button>
          </div>
        </div>

        {/* Live Precision Countdown Timer */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 my-6 py-4 px-2 sm:px-6 bg-slate-950/70 border border-slate-800 rounded-2xl text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-black font-mono text-white tabular-nums">
              {daysClean}
            </div>
            <div className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-medium">
              Days
            </div>
          </div>

          <div className="space-y-1 border-l border-slate-800">
            <div className="text-2xl sm:text-4xl font-black font-mono text-emerald-400 tabular-nums">
              {hoursClean < 10 ? `0${hoursClean}` : hoursClean}
            </div>
            <div className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-medium">
              Hours
            </div>
          </div>

          <div className="space-y-1 border-l border-slate-800">
            <div className="text-2xl sm:text-4xl font-black font-mono text-slate-200 tabular-nums">
              {minutesClean < 10 ? `0${minutesClean}` : minutesClean}
            </div>
            <div className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-medium">
              Minutes
            </div>
          </div>

          <div className="space-y-1 border-l border-slate-800">
            <div className="text-2xl sm:text-4xl font-black font-mono text-emerald-300 tabular-nums">
              {secondsClean < 10 ? `0${secondsClean}` : secondsClean}
            </div>
            <div className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-medium">
              Seconds
            </div>
          </div>
        </div>

        {/* Aggregate Health & Financial Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 font-bold">
              ₹
            </div>
            <div>
              <span className="text-[11px] text-slate-400">Total Money Saved</span>
              <div className="text-base font-bold text-white font-mono">
                ₹{totalMoneySavedINR.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400">Cognitive Hours Reclaimed</span>
              <div className="text-base font-bold text-white font-mono">{totalHoursReclaimed} hrs</div>
            </div>
          </div>

          <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400">Active Shields Arming</span>
              <div className="text-base font-bold text-emerald-400 font-mono">
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
          className="p-5 bg-slate-900 border border-emerald-500/40 rounded-2xl space-y-4 animate-in fade-in"
        >
          <div className="text-sm font-bold text-white">Add New Habit to Guard</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Habit / Addiction Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Nicotine Vaping, Sugar, Gambling"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Category</label>
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
                <option value="gaming">Gaming &amp; Microtransactions</option>
                <option value="shopping">Impulsive Shopping</option>
                <option value="social">Social Media Doomscroll</option>
                <option value="substances">Substance Dependency</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Daily Cost Saved (₹)</label>
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

      {/* Habits Portfolio Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-xs">
            Guarded Habits Portfolio ({habits.length})
          </h3>
          <button
            onClick={() => setIsAddingHabit(!isAddingHabit)}
            className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold hover:text-emerald-300 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isAddingHabit ? 'Close' : 'Add Habit'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {habits.map((habit) => {
            const isSelected = habit.id === activeHabit.id;
            const diff = Math.max(0, now - new Date(habit.streakStartDate).getTime());
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const savedINR = Math.round(days * habit.costPerDayINR);

            return (
              <div
                key={habit.id}
                onClick={() => setSelectedHabitId(habit.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-slate-900 border-emerald-500/60 shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500/20'
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {habit.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {days} Days Clean
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-2">{habit.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{habit.tagline}</p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    Saved: <strong className="text-emerald-300 font-mono">₹{savedINR}</strong>
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTriggerEmergencyPanic(habit);
                    }}
                    className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-400 border border-red-500/30 transition text-[11px] font-semibold flex items-center gap-1"
                  >
                    <Zap className="w-3 h-3" />
                    <span>Panic</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
