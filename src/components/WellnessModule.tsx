import React, { useState, useEffect } from 'react';
import { Dumbbell, Wind, Droplets, Flame, Play, Pause, RotateCcw, CheckCircle2, Sparkles, Brain } from 'lucide-react';
import { WellnessExercise } from '../types';
import { WELLNESS_EXERCISES } from '../data/mockData';
import { sirenEngine } from '../utils/audioSiren';

export const WellnessModule: React.FC = () => {
  const [exercises] = useState<WellnessExercise[]>(WELLNESS_EXERCISES);
  const [activeExercise, setActiveExercise] = useState<WellnessExercise>(WELLNESS_EXERCISES[0]);
  const [timerSeconds, setTimerSeconds] = useState(WELLNESS_EXERCISES[0].durationSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [breathPhase, setBreathPhase] = useState<'Inhale (4s)' | 'Hold (7s)' | 'Exhale (8s)'>('Inhale (4s)');
  const [breathCounter, setBreathCounter] = useState(4);

  // Daily self-control habit anchors
  const [dailyHabits, setDailyHabits] = useState([
    { id: 'h1', text: '500ml Cold Water before looking at phone', done: true },
    { id: 'h2', text: '10 min Morning Sunlight & Movement', done: true },
    { id: 'h3', text: 'No phone during meals (Mindful Eating)', done: false },
    { id: 'h4', text: 'Evening Urge-Surfing Breathwork session', done: false },
  ]);

  // Handle exercise timer countdown
  useEffect(() => {
    let interval: any = null;
    if (isRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timerSeconds === 0) {
      setIsRunning(false);
      sirenEngine.playCalmChime();
      if (!completedExercises.includes(activeExercise.id)) {
        setCompletedExercises((prev) => [...prev, activeExercise.id]);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timerSeconds, activeExercise, completedExercises]);

  // Handle 4-7-8 Breathwork animation cycle when active
  useEffect(() => {
    if (activeExercise.type === 'breathwork' && isRunning) {
      const breathInterval = setInterval(() => {
        setBreathCounter((prev) => {
          if (prev > 1) return prev - 1;
          // Transition phases
          setBreathPhase((current) => {
            if (current === 'Inhale (4s)') {
              return 'Hold (7s)';
            } else if (current === 'Hold (7s)') {
              return 'Exhale (8s)';
            } else {
              return 'Inhale (4s)';
            }
          });
          return 4;
        });
      }, 1000);
      return () => clearInterval(breathInterval);
    }
  }, [activeExercise, isRunning]);

  const selectExercise = (ex: WellnessExercise) => {
    setActiveExercise(ex);
    setTimerSeconds(ex.durationSeconds);
    setIsRunning(false);
  };

  const toggleTimer = () => {
    if (!isRunning) {
      sirenEngine.playBeepPulse();
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimerSeconds(activeExercise.durationSeconds);
  };

  const toggleHabit = (id: string) => {
    setDailyHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, done: !h.done } : h))
    );
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="p-5 bg-gradient-to-r from-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Dumbbell className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Somatic Urge-Killer &amp; Wellness Routines</h3>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30 uppercase">
                  Biochemical Control
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Channel restless cravings into explosive physical exercise and parasympathetic breathing drills.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{completedExercises.length} Drills Finished Today</span>
          </div>
        </div>
      </div>

      {/* Main Exercise Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Mobile Horizontal Selector (lg:hidden) */}
        <div className="block lg:hidden space-y-1.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
            Select Protocol
          </div>
          <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1">
            {exercises.map((ex) => {
              const isSelected = ex.id === activeExercise.id;
              const isDone = completedExercises.includes(ex.id);
              return (
                <button
                  key={ex.id}
                  onClick={() => selectExercise(ex)}
                  className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2.5 shrink-0 whitespace-nowrap active:scale-95 ${
                    isSelected
                      ? 'bg-slate-800 border-emerald-500/70 ring-1 ring-emerald-500/30'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      ex.type === 'workout'
                        ? 'bg-rose-500/15 text-rose-400'
                        : ex.type === 'breathwork'
                        ? 'bg-indigo-500/15 text-indigo-400'
                        : 'bg-cyan-500/15 text-cyan-400'
                    }`}
                  >
                    {ex.type === 'workout' && <Flame className="w-3.5 h-3.5" />}
                    {ex.type === 'breathwork' && <Wind className="w-3.5 h-3.5" />}
                    {ex.type === 'somatic' && <Droplets className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{ex.title}</span>
                      {isDone && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {formatTime(ex.durationSeconds)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop Sidebar Selector List (hidden lg:block) */}
        <div className="hidden lg:block lg:col-span-5 space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
            Select Urge-Disruption Protocol
          </h4>
          <div className="space-y-2">
            {exercises.map((ex) => {
              const isSelected = ex.id === activeExercise.id;
              const isDone = completedExercises.includes(ex.id);
              return (
                <button
                  key={ex.id}
                  onClick={() => selectExercise(ex)}
                  className={`w-full p-3.5 rounded-xl border text-left transition flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-800 border-emerald-500/60 shadow-lg shadow-emerald-500/5'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        ex.type === 'workout'
                          ? 'bg-rose-500/15 text-rose-400'
                          : ex.type === 'breathwork'
                          ? 'bg-indigo-500/15 text-indigo-400'
                          : 'bg-cyan-500/15 text-cyan-400'
                      }`}
                    >
                      {ex.type === 'workout' && <Flame className="w-4 h-4" />}
                      {ex.type === 'breathwork' && <Wind className="w-4 h-4" />}
                      {ex.type === 'somatic' && <Droplets className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{ex.title}</span>
                        {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                        {ex.dopamineBenefit}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 shrink-0 font-medium">
                    {formatTime(ex.durationSeconds)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Workout Timer & Somatic Visualizer */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {activeExercise.intensity} Drill
              </span>
              <span className="text-xs font-mono text-slate-400">
                Est. Reps: <strong className="text-white">{activeExercise.reps || 'Continuous'}</strong>
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mt-2">{activeExercise.title}</h3>
            <p className="text-xs text-emerald-400/90 mt-1 flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5 shrink-0" />
              <span>{activeExercise.dopamineBenefit}</span>
            </p>
          </div>

          {/* Center Graphic / Timer */}
          <div className="flex flex-col items-center justify-center py-4">
            {activeExercise.type === 'breathwork' ? (
              /* Breathwork Breathing Circle */
              <div className="relative flex items-center justify-center w-48 h-48 my-2">
                <div
                  className={`absolute inset-0 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 transition-all duration-1000 ${
                    breathPhase === 'Inhale (4s)'
                      ? 'scale-110 bg-emerald-500/25 border-emerald-400'
                      : breathPhase === 'Hold (7s)'
                      ? 'scale-105 bg-indigo-500/20 border-indigo-400'
                      : 'scale-90 bg-cyan-500/10 border-cyan-400'
                  }`}
                />
                <div className="relative z-10 text-center space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    {breathPhase}
                  </span>
                  <div className="text-4xl font-extrabold font-mono text-white tabular-nums">
                    {formatTime(timerSeconds)}
                  </div>
                  <span className="text-[10px] text-slate-400">Cycle Active</span>
                </div>
              </div>
            ) : (
              /* High-Intensity Physical Timer */
              <div className="text-center space-y-2">
                <div className="text-6xl font-black font-mono tracking-tight text-white tabular-nums">
                  {formatTime(timerSeconds)}
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  {isRunning ? 'Push through the discomfort — urge is resetting!' : 'Ready to start'}
                </div>
              </div>
            )}
          </div>

          {/* Action Controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={toggleTimer}
                className={`px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg transition active:scale-95 ${
                  isRunning
                    ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" /> Start Protocol
                  </>
                )}
              </button>

              <button
                onClick={resetTimer}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Instruction Checklist */}
            <div className="p-3.5 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wide">
                Instructions:
              </span>
              <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                {activeExercise.instructions.map((inst, i) => (
                  <li key={i}>{inst}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Self-Regulation Habits */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Daily Self-Control Anchors (Non-Negotiable)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {dailyHabits.map((habit) => (
            <button
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className={`flex items-center gap-3 p-3 rounded-xl border text-left transition ${
                habit.done
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-200'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                  habit.done
                    ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                    : 'border-slate-700'
                }`}
              >
                {habit.done && <CheckCircle2 className="w-4 h-4" />}
              </div>
              <span className={`text-xs font-medium ${habit.done ? 'line-through text-slate-400' : ''}`}>
                {habit.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
