import React, { useState } from 'react';
import { Bot, Send, X, Sparkles, AlertCircle, Dumbbell, Shield } from 'lucide-react';
import { Habit } from '../types';

interface AiCounselorModalProps {
  isOpen: boolean;
  onClose: () => void;
  habits: Habit[];
  onTriggerWorkout?: () => void;
}

export const AiCounselorModal: React.FC<AiCounselorModalProps> = ({
  isOpen,
  onClose,
  habits,
  onTriggerWorkout,
}) => {
  const [selectedHabit, setSelectedHabit] = useState<string>(habits[0]?.name || 'Smoking');
  const [cravingLevel, setCravingLevel] = useState<number>(8);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: "I am your Aegis Recovery Companion. If an urge is hitting you right now, take a deep breath. You don't have to fight it with pure willpower—we will outsmart the neurochemistry together. What are you experiencing right now?",
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = [
    'I have an intense urge to relapse right now',
    'What physical action breaks this craving loop?',
    'Why is my brain convincing me just one time is okay?',
    'Give me a 2-minute distraction drill',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const newMessages = [...messages, { sender: 'user' as const, text }];
    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/counselor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          habitName: selectedHabit,
          cravingIntensity: cravingLevel,
          history: messages,
        }),
      });
      const data = await res.json();
      const reply = data.response || data.fallbackResponse || 'Take 5 deep breaths and drink a tall glass of ice water. You are in control.';
      setMessages([...newMessages, { sender: 'ai', text: reply }]);
    } catch {
      setMessages([
        ...newMessages,
        {
          sender: 'ai',
          text: 'The craving wave peaks between 3 and 7 minutes and will decline. Drop down and do 15 rapid push-ups or splash cold water on your face right now to physically disrupt the loop.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl flex flex-col h-[600px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">AI Craving Counselor</h3>
                <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  Gemini 3.8 Flash
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Confidential CBT Relapse De-Escalation</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Craving Bar & Habit Selector */}
        <div className="px-4 py-3 bg-slate-950/50 border-b border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
              Active Focus Habit
            </label>
            <select
              value={selectedHabit}
              onChange={(e) => setSelectedHabit(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              {habits.map((h) => (
                <option key={h.id} value={h.name}>
                  {h.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Craving Intensity
              </label>
              <span className={`font-mono font-bold ${cravingLevel >= 7 ? 'text-red-400' : 'text-emerald-400'}`}>
                {cravingLevel} / 10
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={cravingLevel}
              onChange={(e) => setCravingLevel(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>
        </div>

        {/* Chat Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none'
                    : 'bg-slate-800 text-slate-200 border border-slate-700/60 rounded-bl-none shadow-sm whitespace-pre-wrap'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 border border-slate-700/60 rounded-2xl rounded-bl-none px-4 py-2 text-xs text-slate-400 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                Analyzing neurochemical triggers...
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg whitespace-nowrap shrink-0 transition"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          {onTriggerWorkout && (
            <button
              onClick={() => {
                onClose();
                onTriggerWorkout();
              }}
              title="Launch 2-Min Urge Workout"
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 transition shrink-0"
            >
              <Dumbbell className="w-4 h-4" />
            </button>
          )}

          <input
            type="text"
            placeholder="Describe your urge or thoughts..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isLoading}
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white transition shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
