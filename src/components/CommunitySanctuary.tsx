import React, { useState } from 'react';
import { Users, Shield, Heart, ThumbsUp, Send, MessageSquare, Sparkles, Filter } from 'lucide-react';
import { CommunityPost, HabitCategory } from '../types';
import { INITIAL_COMMUNITY_POSTS } from '../data/mockData';

export const CommunitySanctuary: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<HabitCategory>('porn');
  const [streakDaysInput, setStreakDaysInput] = useState(7);
  const [isPosting, setIsPosting] = useState(false);

  const filteredPosts =
    filterCategory === 'all'
      ? posts
      : posts.filter((p) => p.habitCategory === filterCategory);

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const pseudonyms = ['SovereignMind', 'PhoenixReborn', 'QuietGrit', 'DayByDayWarrior', 'CalmFocus'];
    const randomPseudo = pseudonyms[Math.floor(Math.random() * pseudonyms.length)];

    const newPost: CommunityPost = {
      id: 'post-' + Date.now(),
      pseudonym: randomPseudo,
      habitCategory: newPostCategory,
      streakDays: streakDaysInput,
      content: newPostContent.trim(),
      timestamp: 'Just now',
      reactions: { shields: 1, hearts: 1, fistBumps: 1 },
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setIsPosting(false);
  };

  const handleReaction = (postId: string, reactionType: 'shields' | 'hearts' | 'fistBumps') => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            reactions: {
              ...p.reactions,
              [reactionType]: p.reactions[reactionType] + 1,
            },
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-900/90 border border-emerald-500/30 rounded-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Anonymous Recovery Sanctuary</h3>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30 uppercase">
                  Zero Vanity · Pure Peer Aid
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Share victories, celebrate milestone clean days, and uplift fellow recovery seekers anonymously.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsPosting(!isPosting)}
            className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white rounded-xl transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isPosting ? 'Cancel' : 'Share Anonymous Check-In'}</span>
          </button>
        </div>
      </div>

      {/* Post Creator Form */}
      {isPosting && (
        <form
          onSubmit={handleAddPost}
          className="p-5 bg-slate-900 border border-emerald-500/40 rounded-2xl space-y-3 animate-in fade-in"
        >
          <div className="text-xs font-bold text-white">Post Anonymous Recovery Check-In</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Habit Category</label>
              <select
                value={newPostCategory}
                onChange={(e) => setNewPostCategory(e.target.value as HabitCategory)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="porn">Adult Content &amp; Porn</option>
                <option value="smoking">Smoking &amp; Nicotine</option>
                <option value="alcohol">Alcohol</option>
                <option value="sugar">Sugar &amp; Fast Food</option>
                <option value="gaming">Gaming</option>
                <option value="movies">Screen Bingeing</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">
                Current Clean Streak: <strong className="text-emerald-400">{streakDaysInput} Days</strong>
              </label>
              <input
                type="number"
                min="1"
                max="365"
                value={streakDaysInput}
                onChange={(e) => setStreakDaysInput(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          <div>
            <textarea
              required
              rows={3}
              placeholder="Share what worked today, how you handled a craving, or what milestone you achieved..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 leading-relaxed"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsPosting(false)}
              className="px-3.5 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-xs transition"
            >
              Post to Sanctuary
            </button>
          </div>
        </form>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        {[
          { key: 'all', label: 'All Sanctuary' },
          { key: 'smoking', label: 'Nicotine Free' },
          { key: 'porn', label: 'Adult Content Free' },
          { key: 'alcohol', label: 'Alcohol Free' },
          { key: 'sugar', label: 'Sugar Free' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterCategory(tab.key)}
            className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition ${
              filterCategory === tab.key
                ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Posts Stream */}
      <div className="space-y-3.5">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-3 hover:border-slate-700 transition"
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-[10px] text-emerald-400">
                  {post.pseudonym.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <span className="font-bold text-white">{post.pseudonym}</span>
                  <span className="text-slate-500 text-[11px] ml-1.5">· {post.timestamp}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono font-bold">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>{post.streakDays} Days Clean</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{post.content}</p>

            {/* Reactions */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80 text-xs text-slate-400">
              <button
                onClick={() => handleReaction(post.id, 'shields')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 hover:text-white transition active:scale-95"
              >
                <Shield className="w-3.5 h-3.5 text-indigo-400" />
                <span>{post.reactions.shields} Respect</span>
              </button>

              <button
                onClick={() => handleReaction(post.id, 'hearts')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 hover:text-white transition active:scale-95"
              >
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>{post.reactions.hearts} Solidarity</span>
              </button>

              <button
                onClick={() => handleReaction(post.id, 'fistBumps')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 hover:text-white transition active:scale-95"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-amber-400" />
                <span>{post.reactions.fistBumps} Fist Bump</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
