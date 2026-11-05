import React from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation, getSpiceLabel } from '../../i18n/translations';
import { Heart, Clock, Flame, Utensils, ArrowLeft, ArrowRight } from 'lucide-react';

export const FavoritesScreen: React.FC = () => {
  const { recipes, favoriteIds, language, navigateTo, toggleFavorite } = useApp();

  const favoriteRecipes = recipes.filter(r => favoriteIds.includes(r.id));

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-5 animate-fade-in text-stone-100">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-800">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigateTo('home')}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="font-bold text-lg md:text-xl text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-current" />
              <span>{getTranslation(language, 'favorites')}</span>
            </h2>
            <p className="text-xs text-stone-400">
              {favoriteRecipes.length} saved heirloom recipes
            </p>
          </div>
        </div>
      </div>

      {favoriteRecipes.length === 0 ? (
        <div className="py-16 text-center space-y-3 bg-stone-900/50 rounded-3xl border border-stone-800/80 p-6">
          <div className="w-14 h-14 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-7 h-7" />
          </div>
          <h3 className="font-semibold text-stone-200 text-sm">
            {getTranslation(language, 'emptyFavoritesTitle')}
          </h3>
          <p className="text-xs text-stone-400 max-w-sm mx-auto">
            {getTranslation(language, 'emptyFavoritesDesc')}
          </p>
          <button
            onClick={() => navigateTo('home')}
            className="px-5 py-2.5 rounded-full bg-amber-500 text-stone-950 font-bold text-xs inline-flex items-center gap-1.5 shadow-lg"
          >
            <span>Browse Heritage Dishes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {favoriteRecipes.map((recipe) => {
            const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
            const isVeg = recipe.diet === 'veg' || recipe.diet === 'vegan';

            return (
              <div
                key={recipe.id}
                onClick={() => navigateTo('detail', recipe.id)}
                className="group bg-stone-900 border border-stone-800 hover:border-amber-500/40 rounded-2xl overflow-hidden cursor-pointer shadow-md transition flex flex-col"
              >
                <div className="relative h-40 w-full overflow-hidden bg-stone-950">
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title.en}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/30" />

                  <div className="absolute top-2.5 left-2.5 bg-stone-900/90 backdrop-blur-md p-1.5 rounded-md border border-stone-700">
                    <div className={`w-3.5 h-3.5 border flex items-center justify-center ${isVeg ? 'border-emerald-500' : 'border-rose-600'}`}>
                      <div className={`w-2 h-2 rounded-full ${isVeg ? 'bg-emerald-500' : 'bg-rose-600'}`} />
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(recipe.id);
                    }}
                    className="absolute top-2.5 right-2.5 p-2 rounded-full bg-rose-500/30 text-rose-500 border border-rose-500/50 backdrop-blur-md"
                  >
                    <Heart className="w-4 h-4 fill-rose-500" />
                  </button>

                  <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-stone-950/80 px-2 py-0.5 rounded-md text-[11px] text-stone-300">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{totalTime}m</span>
                  </div>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h4 className="font-bold text-sm text-stone-100 group-hover:text-amber-300 transition">
                      {recipe.title[language] || recipe.title.en}
                    </h4>
                    <p className="text-xs text-stone-400 line-clamp-2 mt-1 leading-relaxed">
                      {recipe.description[language] || recipe.description.en}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
                    <span className="flex items-center gap-1 text-amber-400">
                      <Flame className="w-3 h-3" />
                      {getSpiceLabel(language, recipe.spiceLevel)}
                    </span>
                    <span>{recipe.cuisine}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
