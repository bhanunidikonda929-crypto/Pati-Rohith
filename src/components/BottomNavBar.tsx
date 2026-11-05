import React from 'react';
import { useApp, ScreenName } from '../context/AppContext';
import { getTranslation } from '../i18n/translations';
import { Home, Calendar, PlusCircle, ShoppingBag, Code2 } from 'lucide-react';
import { audioManager } from '../utils/audio';

export const BottomNavBar: React.FC = () => {
  const { currentScreen, navigateTo, language, shoppingList } = useApp();

  const navItems: { screen: ScreenName; labelKey: any; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { screen: 'home', labelKey: 'home', icon: Home },
    { screen: 'meal_planner', labelKey: 'mealPlanner', icon: Calendar },
    { screen: 'add', labelKey: 'addRecipe', icon: PlusCircle },
    { 
      screen: 'shopping_list', 
      labelKey: 'shoppingList', 
      icon: ShoppingBag, 
      badge: shoppingList.filter(i => !i.isCompleted).length 
    },
    { screen: 'khit_code', labelKey: 'khitCode', icon: Code2 }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-stone-900/95 backdrop-blur-lg border-t border-stone-800 text-stone-400 flutter-elevation-3">
      <div className="max-w-md mx-auto flex items-center justify-around px-2 py-1.5">
        {navItems.map((item) => {
          const isActive = currentScreen === item.screen;
          const Icon = item.icon;
          return (
            <button
              key={item.screen}
              onClick={() => {
                audioManager.playClickTone();
                navigateTo(item.screen);
              }}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-2xl transition relative group ${
                isActive
                  ? 'text-amber-400'
                  : 'hover:text-stone-200'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition duration-200 relative ${
                  isActive
                    ? 'bg-amber-500/15 scale-110 shadow-sm shadow-amber-500/10'
                    : 'group-hover:bg-stone-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {typeof item.badge === 'number' && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-amber-500 text-stone-950 text-[9px] font-extrabold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] mt-0.5 tracking-tight font-medium ${
                  isActive ? 'text-amber-400 font-bold' : 'text-stone-400'
                }`}
              >
                {getTranslation(language, item.labelKey)}
              </span>

              {/* Flutter Material active pill indicator */}
              {isActive && (
                <div className="w-5 h-0.5 bg-amber-500 rounded-full mt-0.5 animate-fade-in" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
