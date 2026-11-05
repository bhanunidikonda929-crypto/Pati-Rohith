import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation, getSpiceLabel } from '../../i18n/translations';
import { 
  ArrowLeft, 
  Heart, 
  Clock, 
  Flame, 
  Utensils, 
  ShoppingBag, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Timer, 
  Volume2, 
  VolumeX, 
  RefreshCw,
  Share2
} from 'lucide-react';
import { audioManager } from '../../utils/audio';

export const DetailScreen: React.FC = () => {
  const {
    selectedRecipe,
    language,
    navigateTo,
    toggleFavorite,
    favoriteIds,
    addRecipeIngredientsToShopping,
    startTimerForStep,
    setIsSubstitutionsOpen
  } = useApp();

  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [addedToCartToast, setAddedToCartToast] = useState(false);

  if (!selectedRecipe) {
    return (
      <div className="p-6 text-center">
        <p className="text-stone-400">No recipe selected.</p>
        <button
          onClick={() => navigateTo('home')}
          className="mt-4 px-4 py-2 bg-amber-500 text-stone-950 font-bold rounded-xl text-xs"
        >
          Return to Recipes
        </button>
      </div>
    );
  }

  const isFav = favoriteIds.includes(selectedRecipe.id);
  const title = selectedRecipe.title[language] || selectedRecipe.title.en;
  const description = selectedRecipe.description[language] || selectedRecipe.description.en;
  const isVeg = selectedRecipe.diet === 'veg' || selectedRecipe.diet === 'vegan';

  const toggleIngredientCheck = (idx: number) => {
    audioManager.playClickTone();
    setCheckedIngredients(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleStepCheck = (stepNum: number) => {
    audioManager.playClickTone();
    setCompletedSteps(prev => ({ ...prev, [stepNum]: !prev[stepNum] }));
  };

  // Text to Speech
  const toggleSpeech = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const stepsText = selectedRecipe.instructions
      .map(s => `Step ${s.stepNumber}. ${s.instruction[language] || s.instruction.en}`)
      .join('. ');

    const fullText = `${title}. ${description}. ${stepsText}`;

    const utterance = new SpeechSynthesisUtterance(fullText);
    if (language === 'hi') utterance.lang = 'hi-IN';
    else if (language === 'te') utterance.lang = 'te-IN';
    else utterance.lang = 'en-IN';

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleAddToShopping = () => {
    addRecipeIngredientsToShopping(selectedRecipe);
    setAddedToCartToast(true);
    setTimeout(() => setAddedToCartToast(false), 2500);
  };

  return (
    <div className="pb-16 max-w-4xl mx-auto animate-fade-in text-stone-100">
      {/* Top Floating App Bar */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden bg-stone-950">
        <img
          src={selectedRecipe.imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-black/40 to-black/60" />

        {/* Back and actions */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <button
            onClick={() => navigateTo('home')}
            className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-stone-200 hover:text-white border border-stone-700 shadow-md transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(selectedRecipe.id)}
              className={`p-2.5 rounded-full backdrop-blur-md border shadow-md transition ${
                isFav
                  ? 'bg-rose-500/30 text-rose-500 border-rose-500/50'
                  : 'bg-black/60 text-stone-200 hover:text-white border-stone-700'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title over Hero */}
        <div className="absolute bottom-4 left-4 right-4 space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold uppercase tracking-wider">
              {selectedRecipe.cuisine}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-stone-900/80 text-stone-300 text-[10px] font-medium border border-stone-700">
              {isVeg ? 'Pure Veg' : 'Non-Veg'}
            </span>
          </div>

          <h1 className="text-xl md:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
            {title}
          </h1>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-6">
        {/* Story & Description */}
        <p className="text-xs md:text-sm text-stone-300 leading-relaxed italic border-l-2 border-amber-500 pl-3">
          "{description}"
        </p>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="p-2.5 rounded-2xl bg-stone-900 border border-stone-800">
            <Clock className="w-4 h-4 text-amber-400 mx-auto mb-1" />
            <span className="text-[10px] text-stone-400 block">{getTranslation(language, 'prepTime')}</span>
            <span className="text-xs font-bold text-stone-100">{selectedRecipe.prepTimeMinutes}m</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-stone-900 border border-stone-800">
            <Flame className="w-4 h-4 text-orange-400 mx-auto mb-1" />
            <span className="text-[10px] text-stone-400 block">{getTranslation(language, 'cookTime')}</span>
            <span className="text-xs font-bold text-stone-100">{selectedRecipe.cookTimeMinutes}m</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-stone-900 border border-stone-800">
            <Utensils className="w-4 h-4 text-amber-400 mx-auto mb-1" />
            <span className="text-[10px] text-stone-400 block">{getTranslation(language, 'servings')}</span>
            <span className="text-xs font-bold text-stone-100">{selectedRecipe.servings} people</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-stone-900 border border-stone-800">
            <Sparkles className="w-4 h-4 text-rose-400 mx-auto mb-1" />
            <span className="text-[10px] text-stone-400 block">{getTranslation(language, 'spiceLevel')}</span>
            <span className="text-[11px] font-bold text-rose-400 capitalize">
              {getSpiceLabel(language, selectedRecipe.spiceLevel)}
            </span>
          </div>
        </div>

        {/* Traditional Tip Box */}
        {selectedRecipe.traditionalTip && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
            <span className="p-2 rounded-xl bg-amber-500 text-stone-950 font-bold shrink-0">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                {getTranslation(language, 'traditionalTip')}
              </h4>
              <p className="text-xs text-amber-100/90 mt-1 leading-relaxed">
                {selectedRecipe.traditionalTip[language] || selectedRecipe.traditionalTip.en}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleAddToShopping}
            className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{getTranslation(language, 'addToShoppingList')}</span>
          </button>

          <button
            onClick={() => navigateTo('meal_planner')}
            className="py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs flex items-center gap-2 border border-stone-700 transition"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>{getTranslation(language, 'addToMealPlan')}</span>
          </button>

          <button
            onClick={() => setIsSubstitutionsOpen(true)}
            className="py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 font-semibold text-xs flex items-center gap-2 border border-amber-500/30 transition"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{getTranslation(language, 'substitutions')}</span>
          </button>

          {/* Voice Read Aloud Button */}
          <button
            onClick={toggleSpeech}
            className={`py-3 px-3.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
              isSpeaking
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/50 animate-pulse'
                : 'bg-stone-800 text-stone-300 border-stone-700 hover:text-white'
            }`}
            title="Read instructions aloud via speech synthesis"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden sm:inline">
              {isSpeaking ? getTranslation(language, 'stopReadAloud') : getTranslation(language, 'readAloud')}
            </span>
          </button>
        </div>

        {/* Toast confirmation */}
        {addedToCartToast && (
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Added all {selectedRecipe.ingredients.length} traditional ingredients to your shopping list!</span>
          </div>
        )}

        {/* Ingredients Checklist */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-stone-100 flex items-center gap-2">
              <span>{getTranslation(language, 'ingredients')}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-stone-800 text-stone-400">
                {selectedRecipe.ingredients.length}
              </span>
            </h3>
            <span className="text-[11px] text-stone-400">
              {getTranslation(language, 'ingredientChecklist')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {selectedRecipe.ingredients.map((ing, idx) => {
              const isChecked = !!checkedIngredients[idx];
              const ingName = ing.name[language] || ing.name.en;
              return (
                <div
                  key={idx}
                  onClick={() => toggleIngredientCheck(idx)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition select-none ${
                    isChecked
                      ? 'bg-stone-900/40 border-stone-800/60 opacity-60'
                      : 'bg-stone-900 border-stone-800 hover:border-amber-500/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {isChecked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-stone-500 shrink-0" />
                    )}
                    <span className={`text-xs ${isChecked ? 'line-through text-stone-500' : 'text-stone-200'}`}>
                      {ingName}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-amber-400 shrink-0 pl-2">
                    {ing.quantity}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cooking Steps with Timers */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-stone-100">
              {getTranslation(language, 'instructions')}
            </h3>
            <span className="text-xs text-amber-400 font-mono">
              {Object.values(completedSteps).filter(Boolean).length} / {selectedRecipe.instructions.length} done
            </span>
          </div>

          <div className="space-y-3.5">
            {selectedRecipe.instructions.map((step) => {
              const isDone = !!completedSteps[step.stepNumber];
              const instructionText = step.instruction[language] || step.instruction.en;
              const tipText = step.tip ? (step.tip[language] || step.tip.en) : null;

              return (
                <div
                  key={step.stepNumber}
                  className={`p-4 rounded-2xl border transition ${
                    isDone
                      ? 'bg-stone-900/40 border-stone-800/80'
                      : 'bg-stone-900 border-stone-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleStepCheck(step.stepNumber)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition ${
                          isDone
                            ? 'bg-emerald-500 text-stone-950'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        }`}
                      >
                        {isDone ? '✓' : step.stepNumber}
                      </button>

                      <div className="space-y-1">
                        <p className={`text-xs md:text-sm leading-relaxed ${isDone ? 'text-stone-400 line-through' : 'text-stone-200'}`}>
                          {instructionText}
                        </p>

                        {tipText && (
                          <p className="text-[11px] text-amber-400/90 italic">
                            💡 Tip: {tipText}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Step Timer Trigger */}
                    {step.timerMinutes && (
                      <button
                        onClick={() => startTimerForStep(title, step.stepNumber, step.timerMinutes!)}
                        className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-amber-400 border border-stone-700 text-[11px] font-semibold flex items-center gap-1.5 shrink-0 transition"
                        title="Start timer for this step"
                      >
                        <Timer className="w-3.5 h-3.5" />
                        <span>{step.timerMinutes}m</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
