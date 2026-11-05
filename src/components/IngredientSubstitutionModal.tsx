import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../i18n/translations';
import { TRADITIONAL_SUBSTITUTIONS } from '../data/substitutions';
import { RefreshCw, Search, X, CheckCircle2, Sparkles, Filter } from 'lucide-react';

export const IngredientSubstitutionModal: React.FC = () => {
  const { language, isSubstitutionsOpen, setIsSubstitutionsOpen } = useApp();
  const [query, setQuery] = useState('');
  const [filterTag, setFilterTag] = useState<string>('all');

  if (!isSubstitutionsOpen) return null;

  const filteredSubs = TRADITIONAL_SUBSTITUTIONS.filter(item => {
    const orig = item.original[language] || item.original.en;
    const sub = item.substitute[language] || item.substitute.en;
    const matchesQuery = orig.toLowerCase().includes(query.toLowerCase()) || 
                         sub.toLowerCase().includes(query.toLowerCase()) ||
                         item.original.en.toLowerCase().includes(query.toLowerCase());
    const matchesTag = filterTag === 'all' || item.dietaryBenefit.toLowerCase().includes(filterTag.toLowerCase());
    return matchesQuery && matchesTag;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-stone-900 border border-amber-600/30 rounded-3xl p-6 shadow-2xl text-stone-100 max-h-[90vh] flex flex-col overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-600/15 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <RefreshCw className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-semibold text-lg text-amber-100 flex items-center gap-2">
                {getTranslation(language, 'substitutions')}
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-normal">
                  Traditional Swaps
                </span>
              </h3>
              <p className="text-xs text-stone-400">Pantry alternatives, vegan, and satvik diet swaps</p>
            </div>
          </div>
          <button
            onClick={() => setIsSubstitutionsOpen(false)}
            className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Dietary Filters */}
        <div className="mt-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search ingredient (e.g. Tamarind, Ghee, Paneer, Gongura)..."
              className="w-full bg-stone-800/80 border border-stone-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-200 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-[10px] text-stone-500 uppercase font-semibold flex items-center gap-1 pl-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {['all', 'vegan', 'gluten', 'jain', 'pantry'].map(tag => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`px-3 py-1 rounded-full text-[11px] capitalize font-medium transition ${
                  filterTag === tag
                    ? 'bg-amber-500 text-stone-950 font-semibold'
                    : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                {tag === 'all' ? 'All Swaps' : tag}
              </button>
            ))}
          </div>
        </div>

        {/* Substitutions List */}
        <div className="mt-4 flex-1 overflow-y-auto space-y-3 pr-1">
          {filteredSubs.length === 0 ? (
            <div className="text-center py-10 text-stone-400 text-xs">
              No matching traditional substitution found for "{query}".
            </div>
          ) : (
            filteredSubs.map(sub => (
              <div
                key={sub.id}
                className="p-4 rounded-2xl bg-stone-800/60 border border-stone-800 hover:border-amber-500/30 transition space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-rose-300 line-through">
                      {sub.original[language] || sub.original.en}
                    </span>
                    <span className="text-stone-500 font-mono text-xs">→</span>
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {sub.substitute[language] || sub.substitute.en}
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-stone-700 text-amber-300 font-medium whitespace-nowrap">
                    {sub.dietaryBenefit}
                  </span>
                </div>

                {/* Ratio */}
                <div className="flex items-center gap-2 text-[11px] text-stone-300 bg-stone-900/60 px-3 py-1.5 rounded-lg border border-stone-800/80">
                  <span className="text-amber-400 font-semibold">Recommended Ratio:</span>
                  <span>{sub.ratio}</span>
                </div>

                {/* Flavor Impact */}
                <p className="text-[11px] text-stone-400 italic">
                  "{sub.flavorImpact[language] || sub.flavorImpact.en}"
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <span>Traditional culinary tips from Amma & Dadi</span>
          <button
            onClick={() => setIsSubstitutionsOpen(false)}
            className="px-4 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 font-medium"
          >
            {getTranslation(language, 'close')}
          </button>
        </div>
      </div>
    </div>
  );
};
