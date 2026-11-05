import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation } from '../../i18n/translations';
import { ShoppingItem } from '../../types/recipe';
import { 
  ShoppingBag, 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Copy, 
  Plus, 
  Check, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { audioManager } from '../../utils/audio';

export const ShoppingListScreen: React.FC = () => {
  const {
    shoppingList,
    toggleShoppingItem,
    removeShoppingItem,
    clearCompletedShopping,
    addShoppingItem,
    language,
    navigateTo
  } = useApp();

  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [copiedToast, setCopiedToast] = useState(false);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    audioManager.playClickTone();
    addShoppingItem(newItemName.trim(), newItemQuantity.trim() || '1 item', 'Other');
    setNewItemName('');
    setNewItemQuantity('');
  };

  const handleCopyList = () => {
    audioManager.playVoiceAckTone();
    const formatted = shoppingList
      .map(item => `${item.isCompleted ? '[✓]' : '[ ]'} ${item.name} (${item.quantity})${item.recipeTitle ? ` - for ${item.recipeTitle}` : ''}`)
      .join('\n');

    const fullText = `🛒 *Rasoi & Vindu - Traditional Grocery Shopping List*\n\n${formatted}\n\nGenerated with Rasoi & Vindu Recipe App.`;

    navigator.clipboard.writeText(fullText);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const categories: ShoppingItem['category'][] = [
    'Produce',
    'Spices & Herbs',
    'Dairy & Ghee',
    'Grains & Lentils',
    'Meat & Seafood',
    'Other'
  ];

  const pendingItems = shoppingList.filter(i => !i.isCompleted);
  const completedItems = shoppingList.filter(i => i.isCompleted);

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-5 animate-fade-in text-stone-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
        <div>
          <h2 className="font-bold text-lg md:text-xl text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <span>{getTranslation(language, 'shoppingList')}</span>
          </h2>
          <p className="text-xs text-stone-400">
            {pendingItems.length} items to buy • {completedItems.length} in pantry cart
          </p>
        </div>

        {shoppingList.length > 0 && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleCopyList}
              className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 border border-stone-700 transition"
              title="Copy to clipboard for WhatsApp or Notes"
            >
              {copiedToast ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
              <span>{copiedToast ? 'Copied!' : 'Copy List'}</span>
            </button>

            {completedItems.length > 0 && (
              <button
                onClick={clearCompletedShopping}
                className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-red-950/60 text-stone-400 hover:text-red-400 text-xs font-semibold flex items-center gap-1.5 border border-stone-700 transition"
                title="Clear checked items"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Clear Done</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add Custom Item Input */}
      <form onSubmit={handleAddItem} className="flex gap-2">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder={getTranslation(language, 'itemPlaceholder')}
          className="flex-1 bg-stone-900 border border-stone-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none"
        />
        <input
          type="text"
          value={newItemQuantity}
          onChange={(e) => setNewItemQuantity(e.target.value)}
          placeholder="Qty (e.g. 500g)"
          className="w-24 bg-stone-900 border border-stone-800 focus:border-amber-500 rounded-xl px-2.5 py-2.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl font-bold text-xs flex items-center gap-1 shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">{getTranslation(language, 'addCustomItem')}</span>
        </button>
      </form>

      {/* Empty State */}
      {shoppingList.length === 0 ? (
        <div className="py-14 text-center space-y-3 bg-stone-900/50 rounded-3xl border border-stone-800/80 p-6">
          <div className="w-14 h-14 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h3 className="font-semibold text-stone-200 text-sm">
            {getTranslation(language, 'shoppingListEmpty')}
          </h3>
          <p className="text-xs text-stone-400 max-w-sm mx-auto">
            Open any traditional dish (like Gongura Pachadi or Biryani) and tap "Add to Shopping List", or plan your weekly meals!
          </p>
          <button
            onClick={() => navigateTo('home')}
            className="px-5 py-2.5 rounded-full bg-amber-500 text-stone-950 font-bold text-xs inline-flex items-center gap-1.5 shadow-lg"
          >
            <span>Explore Traditional Recipes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        /* Categorized Items List */
        <div className="space-y-5">
          {categories.map((category) => {
            const items = shoppingList.filter(item => item.category === category);
            if (items.length === 0) return null;

            return (
              <div key={category} className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>{category}</span>
                  <span className="text-[10px] text-stone-500 font-normal">({items.length})</span>
                </h4>

                <div className="space-y-1.5">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleShoppingItem(item.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition select-none ${
                        item.isCompleted
                          ? 'bg-stone-950/40 border-stone-900 opacity-50'
                          : 'bg-stone-900 border-stone-800 hover:border-amber-500/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-stone-500 shrink-0" />
                        )}
                        <div>
                          <p className={`text-xs ${item.isCompleted ? 'line-through text-stone-500' : 'text-stone-200 font-medium'}`}>
                            {item.name}
                          </p>
                          {item.recipeTitle && (
                            <p className="text-[10px] text-stone-500">
                              For: {item.recipeTitle}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-semibold text-amber-400">
                          {item.quantity}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeShoppingItem(item.id);
                          }}
                          className="p-1 rounded text-stone-600 hover:text-red-400 hover:bg-stone-800 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
