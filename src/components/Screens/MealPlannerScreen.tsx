import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation } from '../../i18n/translations';
import { 
  Calendar, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  Clock, 
  Utensils, 
  Flame, 
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { audioManager } from '../../utils/audio';

export const MealPlannerScreen: React.FC = () => {
  const {
    mealPlan,
    recipes,
    language,
    addToMealPlan,
    removeFromMealPlan,
    generateShoppingFromPlan,
    navigateTo
  } = useApp();

  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [assigningSlot, setAssigningSlot] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeDay = mealPlan[activeDayIdx] || mealPlan[0];

  const slots: { id: 'breakfast' | 'lunch' | 'dinner' | 'snack'; label: string; icon: string }[] = [
    { id: 'breakfast', label: 'Traditional Breakfast / Tiffins', icon: '🌅' },
    { id: 'lunch', label: 'Heritage Thali / Lunch', icon: '☀️' },
    { id: 'snack', label: 'Evening Chai & Snacks / Mithai', icon: '☕' },
    { id: 'dinner', label: 'Comfort Dinner / Biryani', icon: '🌙' }
  ];

  const handleAssign = (recipeId: string) => {
    if (!assigningSlot) return;
    audioManager.playClickTone();
    addToMealPlan(activeDayIdx, assigningSlot, recipeId);
    setAssigningSlot(null);
  };

  const handleGenerateShopping = () => {
    generateShoppingFromPlan();
    setToastMessage('Generated shopping list from your weekly traditional meal plan!');
    setTimeout(() => {
      setToastMessage(null);
      navigateTo('shopping_list');
    }, 1200);
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-5 animate-fade-in text-stone-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
        <div>
          <h2 className="font-bold text-lg md:text-xl text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-500" />
            <span>{getTranslation(language, 'mealPlanner')}</span>
          </h2>
          <p className="text-xs text-stone-400">
            {language === 'te' ? 'వారం మొత్తం సాంప్రదాయ భోజన ప్రణాళిక' : language === 'hi' ? 'सप्ताहिक पारंपरिक भोजन योजना' : 'Plan authentic South & North Indian menus for the week'}
          </p>
        </div>

        <button
          onClick={handleGenerateShopping}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition active:scale-95 self-start sm:self-auto"
        >
          <ShoppingBag className="w-4 h-4 fill-current" />
          <span>{getTranslation(language, 'generatePlanShopping')}</span>
        </button>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Week Day Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {mealPlan.map((day, idx) => {
          const isSelected = activeDayIdx === idx;
          const assignedCount = [day.breakfast, day.lunch, day.dinner, day.snack].filter(Boolean).length;
          return (
            <button
              key={day.dayName}
              onClick={() => {
                audioManager.playClickTone();
                setActiveDayIdx(idx);
              }}
              className={`flex-1 min-w-[76px] py-2.5 px-2 rounded-2xl border text-center transition flex flex-col items-center gap-0.5 ${
                isSelected
                  ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-stone-900 border-stone-800 text-stone-300 hover:bg-stone-800'
              }`}
            >
              <span className="text-[10px] uppercase tracking-wider">{day.dayName.substring(0, 3)}</span>
              <span className="text-xs font-extrabold">{day.date.split('-')[2]}</span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-stone-950 text-amber-400' : 'bg-stone-800 text-stone-400'}`}>
                {assignedCount} meals
              </span>
            </button>
          );
        })}
      </div>

      {/* Day Overview Banner */}
      <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <h3 className="font-bold text-sm text-amber-100">
            {activeDay.dayName} Traditional Menu
          </h3>
        </div>
        <span className="text-xs text-stone-400">
          {[activeDay.breakfast, activeDay.lunch, activeDay.dinner, activeDay.snack].filter(Boolean).length} / 4 slots planned
        </span>
      </div>

      {/* 4 Meal Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {slots.map((slot) => {
          const recipeId = activeDay[slot.id];
          const recipe = recipeId ? recipes.find(r => r.id === recipeId) : null;

          return (
            <div
              key={slot.id}
              className="p-4 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/30 transition flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">{slot.icon}</span>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-stone-300">
                    {slot.label}
                  </h4>
                </div>
                {recipe && (
                  <button
                    onClick={() => removeFromMealPlan(activeDayIdx, slot.id)}
                    className="p-1 rounded-lg text-stone-500 hover:text-red-400 hover:bg-stone-800 transition"
                    title="Remove from slot"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {recipe ? (
                <div
                  onClick={() => navigateTo('detail', recipe.id)}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-950/70 border border-stone-800 hover:border-amber-500/40 cursor-pointer group transition"
                >
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title.en}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-xs text-stone-100 group-hover:text-amber-400 truncate">
                      {recipe.title[language] || recipe.title.en}
                    </h5>
                    <p className="text-[11px] text-stone-400 mt-0.5 truncate">
                      {recipe.cuisine} • {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins
                    </p>
                    <span className="text-[10px] text-amber-500 font-semibold group-hover:underline flex items-center gap-1 mt-1">
                      View Recipe <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setAssigningSlot(slot.id)}
                  className="w-full py-6 rounded-xl border border-dashed border-stone-700/80 hover:border-amber-500/60 bg-stone-950/30 text-stone-400 hover:text-amber-400 text-xs font-medium flex flex-col items-center justify-center gap-1 transition"
                >
                  <Plus className="w-5 h-5 text-amber-500" />
                  <span>Choose Traditional Dish for {slot.id}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Recipe Picker Modal */}
      {assigningSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-stone-900 border border-amber-600/30 rounded-3xl p-5 shadow-2xl text-stone-100 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="font-bold text-sm text-amber-200 capitalize">
                Select Dish for {assigningSlot} ({activeDay.dayName})
              </h3>
              <button
                onClick={() => setAssigningSlot(null)}
                className="text-stone-400 hover:text-white text-xs px-2 py-1 rounded bg-stone-800"
              >
                Cancel
              </button>
            </div>

            <div className="mt-3 flex-1 overflow-y-auto space-y-2 pr-1">
              {recipes.map((r) => (
                <div
                  key={r.id}
                  onClick={() => handleAssign(r.id)}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-800/60 hover:bg-amber-600/20 border border-stone-800 hover:border-amber-500/40 cursor-pointer transition"
                >
                  <img
                    src={r.imageUrl}
                    alt={r.title.en}
                    className="w-12 h-12 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-xs text-stone-100 truncate">
                      {r.title[language] || r.title.en}
                    </h5>
                    <p className="text-[10px] text-stone-400">
                      {r.cuisine} • {r.prepTimeMinutes + r.cookTimeMinutes} mins
                    </p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-amber-500 text-stone-950 font-bold">
                    Select
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
