import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation, getSpiceLabel, TranslationKey } from '../../i18n/translations';
import { 
  Search, 
  Clock, 
  Flame, 
  Heart, 
  RotateCw, 
  AlertTriangle, 
  PlusCircle, 
  Sparkles, 
  Utensils, 
  Filter,
  Check
} from 'lucide-react';
import { audioManager } from '../../utils/audio';

export const HomeScreen: React.FC = () => {
  const {
    recipes,
    language,
    navigateTo,
    toggleFavorite,
    favoriteIds,
    screenState,
    triggerRetry,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    dietFilter,
    setDietFilter
  } = useApp();

  const categories: { id: string; labelKey?: TranslationKey; label?: string }[] = [
    { id: 'all', labelKey: 'all' },
    { id: 'curry', label: 'Curries & Pulusu' },
    { id: 'biryani', label: 'Biryani & Pulao' },
    { id: 'breakfast', label: 'Tiffins & Dosa' },
    { id: 'dal', label: 'Dal & Lentils' },
    { id: 'rice', label: 'Prasadam & Rice' },
    { id: 'sweets', label: 'Mithai & Sweets' }
  ];

  // Filter recipes based on search, category, and diet
  const filteredRecipes = useMemo(() => {
    return recipes.filter(r => {
      const title = (r.title[language] || r.title.en).toLowerCase();
      const desc = (r.description[language] || r.description.en).toLowerCase();
      const cuisine = r.cuisine.toLowerCase();
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch = !query || title.includes(query) || desc.includes(query) || cuisine.includes(query) ||
        r.ingredients.some(ing => (ing.name[language] || ing.name.en).toLowerCase().includes(query));

      const matchesCategory = selectedCategory === 'all' || r.category === selectedCategory;
      const matchesDiet = dietFilter === 'all' || r.diet === dietFilter;

      return matchesSearch && matchesCategory && matchesDiet;
    });
  }, [recipes, searchQuery, selectedCategory, dietFilter, language]);

  // Featured Dish of the Day
  const featuredRecipe = recipes.find(r => r.id === 'gongura-pachadi') || recipes[0];

  // --- STATE 1: LOADING STATE (GP 3) ---
  if (screenState === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[480px] p-6 text-center animate-fade-in">
        {/* Flutter CircularProgressIndicator simulation */}
        <div className="relative w-16 h-16 flex items-center justify-center mb-4">
          <div className="w-14 h-14 rounded-full border-4 border-stone-800 border-t-amber-500 animate-spin" />
          <Flame className="w-6 h-6 text-amber-500 absolute animate-pulse" />
        </div>
        <h3 className="font-semibold text-stone-200 text-sm">
          {getTranslation(language, 'loadingRecipes')}
        </h3>
        <p className="text-xs text-stone-500 mt-1 max-w-xs">
          Simulating Flutter async FutureBuilder & Provider state transition...
        </p>
      </div>
    );
  }

  // --- STATE 2: ERROR STATE WITH RETRY (GP 3) ---
  if (screenState === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[480px] p-6 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-3xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-4 shadow-lg shadow-red-500/10">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h3 className="font-bold text-stone-100 text-base">
          {getTranslation(language, 'errorTitle')}
        </h3>
        <p className="text-xs text-stone-400 mt-1.5 max-w-sm leading-relaxed">
          {getTranslation(language, 'errorMessage')} (GP 3 specification check).
        </p>
        <button
          onClick={triggerRetry}
          className="mt-5 px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition active:scale-95"
        >
          <RotateCw className="w-4 h-4" />
          <span>{getTranslation(language, 'retryBtn')}</span>
        </button>
      </div>
    );
  }

  // --- STATE 3: EMPTY STATE (GP 3) ---
  if (screenState === 'empty' || (filteredRecipes.length === 0 && !searchQuery)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[480px] p-6 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
          <Utensils className="w-8 h-8" />
        </div>
        <h3 className="font-bold text-stone-100 text-base">
          {getTranslation(language, 'emptyListTitle')}
        </h3>
        <p className="text-xs text-stone-400 mt-1.5 max-w-sm leading-relaxed">
          {getTranslation(language, 'emptyListDesc')}
        </p>
        <div className="flex items-center gap-3 mt-5">
          <button
            onClick={() => navigateTo('add')}
            className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 shadow-lg transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{getTranslation(language, 'addRecipe')}</span>
          </button>
          <button
            onClick={triggerRetry}
            className="px-4 py-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-xs transition"
          >
            Reset Filters
          </button>
        </div>
      </div>
    );
  }

  // --- STATE 4: NORMAL DATA STATE (GP 3) ---
  return (
    <div className="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
      {/* Flutter Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={getTranslation(language, 'searchPlaceholder')}
          className="w-full bg-stone-900 border border-stone-800 focus:border-amber-500 rounded-2xl pl-10 pr-10 py-3 text-xs md:text-sm text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-md transition"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 text-xs px-1.5 py-0.5 rounded-full bg-stone-800"
          >
            ✕
          </button>
        )}
      </div>

      {/* Dietary Filters & Categories */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          {/* Categories Horizontal Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar flex-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const label = cat.labelKey ? getTranslation(language, cat.labelKey) : cat.label;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    audioManager.playClickTone();
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-stone-900/90 hover:bg-stone-800 text-stone-300 border border-stone-800'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Diet Pills */}
          <div className="flex items-center bg-stone-900 p-0.5 rounded-xl border border-stone-800 shrink-0">
            <button
              onClick={() => setDietFilter('all')}
              className={`px-2 py-1 rounded-lg text-[11px] font-medium transition ${
                dietFilter === 'all' ? 'bg-stone-800 text-amber-400 font-bold' : 'text-stone-400'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setDietFilter('veg')}
              className={`px-2 py-1 rounded-lg text-[11px] font-medium transition flex items-center gap-1 ${
                dietFilter === 'veg' ? 'bg-emerald-950 text-emerald-400 font-bold border border-emerald-800/60' : 'text-stone-400'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Veg
            </button>
            <button
              onClick={() => setDietFilter('non-veg')}
              className={`px-2 py-1 rounded-lg text-[11px] font-medium transition flex items-center gap-1 ${
                dietFilter === 'non-veg' ? 'bg-red-950 text-red-400 font-bold border border-red-800/60' : 'text-stone-400'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              Non-Veg
            </button>
          </div>
        </div>
      </div>

      {/* Featured Traditional Dish of the Day (shown when no specific search is active) */}
      {!searchQuery && selectedCategory === 'all' && featuredRecipe && (
        <div
          onClick={() => navigateTo('detail', featuredRecipe.id)}
          className="relative rounded-3xl overflow-hidden border border-amber-600/40 bg-gradient-to-t from-stone-950 via-stone-900/80 to-transparent p-4 cursor-pointer group shadow-xl hover:border-amber-500 transition"
        >
          <div className="absolute inset-0 z-0">
            <img
              src={featuredRecipe.imageUrl}
              alt="Featured traditional recipe"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-40 brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent" />
          </div>

          <div className="relative z-10 flex flex-col justify-end pt-24 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 font-extrabold text-[10px] tracking-wide uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-current" />
                {getTranslation(language, 'dishOfTheDay')}
              </span>
              <span className="text-[11px] text-amber-300 font-medium">
                {featuredRecipe.cuisine}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">
              {featuredRecipe.title[language] || featuredRecipe.title.en}
            </h2>

            <p className="text-xs text-stone-300 line-clamp-2 max-w-xl">
              {featuredRecipe.description[language] || featuredRecipe.description.en}
            </p>

            <div className="flex items-center gap-4 pt-1 text-xs text-stone-300">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {featuredRecipe.prepTimeMinutes + featuredRecipe.cookTimeMinutes} {getTranslation(language, 'mins')}
              </span>
              <span className="flex items-center gap-1 text-rose-400">
                <Flame className="w-3.5 h-3.5" />
                {getSpiceLabel(language, featuredRecipe.spiceLevel)}
              </span>
              <span className="text-amber-400 font-medium text-xs ml-auto group-hover:translate-x-1 transition flex items-center gap-1">
                View Recipe →
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Recipe List / Grid Header */}
      <div className="flex items-center justify-between pt-1">
        <h3 className="font-bold text-sm text-stone-200">
          Traditional Dishes ({filteredRecipes.length})
        </h3>
        {searchQuery && (
          <span className="text-xs text-amber-400">
            Matches for "{searchQuery}"
          </span>
        )}
      </div>

      {/* Recipe Cards List / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {filteredRecipes.map((recipe) => {
          const isFav = favoriteIds.includes(recipe.id);
          const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
          const isVeg = recipe.diet === 'veg' || recipe.diet === 'vegan';

          return (
            <div
              key={recipe.id}
              onClick={() => navigateTo('detail', recipe.id)}
              className="group bg-stone-900/90 border border-stone-800 hover:border-amber-500/40 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-200 flex flex-col"
            >
              {/* Recipe Image & Floating Badges */}
              <div className="relative h-40 w-full overflow-hidden bg-stone-950">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/30" />

                {/* Diet indicator badge (Veg square with green circle or Non-veg red triangle) */}
                <div className="absolute top-2.5 left-2.5 bg-stone-900/90 backdrop-blur-md p-1.5 rounded-md border border-stone-700/80">
                  <div className={`w-3.5 h-3.5 border flex items-center justify-center ${isVeg ? 'border-emerald-500' : 'border-rose-600'}`}>
                    <div className={`w-2 h-2 rounded-full ${isVeg ? 'bg-emerald-500' : 'bg-rose-600'}`} />
                  </div>
                </div>

                {/* Regional Origin Tag */}
                <div className="absolute top-2.5 left-10 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-stone-700/80 text-[10px] text-amber-300 font-medium">
                  {recipe.cuisine}
                </div>

                {/* Favorite Heart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(recipe.id);
                  }}
                  className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition ${
                    isFav
                      ? 'bg-rose-500/30 text-rose-500 border border-rose-500/50'
                      : 'bg-black/50 text-stone-300 hover:text-white border border-stone-700'
                  }`}
                  title="Toggle Favorite"
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                </button>

                {/* Cooking time pill */}
                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-stone-950/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] text-stone-300 font-mono">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{totalTime}m</span>
                </div>

                {/* Servings */}
                <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 bg-stone-950/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] text-stone-300">
                  <Utensils className="w-3 h-3 text-amber-400" />
                  <span>{recipe.servings}p</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h4 className="font-bold text-sm text-stone-100 group-hover:text-amber-300 transition line-clamp-1">
                    {recipe.title[language] || recipe.title.en}
                  </h4>
                  <p className="text-xs text-stone-400 line-clamp-2 mt-1 leading-relaxed">
                    {recipe.description[language] || recipe.description.en}
                  </p>
                </div>

                {/* Key Spice & Ingredients count */}
                <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
                  <span className="flex items-center gap-1 text-amber-400/90">
                    <Flame className="w-3 h-3" />
                    {getSpiceLabel(language, recipe.spiceLevel)}
                  </span>
                  <span>{recipe.ingredients.length} traditional ingredients</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
