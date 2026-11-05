import React, { createContext, useContext, useState, useEffect } from 'react';
import { Recipe, Language, MealPlanDay, ShoppingItem, UserProfile } from '../types/recipe';
import { TRADITIONAL_RECIPES } from '../data/traditionalRecipes';
import { audioManager } from '../utils/audio';

export type ScreenName = 
  | 'home' 
  | 'detail' 
  | 'add' 
  | 'meal_planner' 
  | 'shopping_list' 
  | 'favorites' 
  | 'khit_code';

export type ScreenState = 'normal' | 'loading' | 'error' | 'empty';

export interface ActiveTimer {
  id: string;
  recipeTitle: string;
  stepNumber: number;
  remainingSeconds: number;
  totalSeconds: number;
  isRunning: boolean;
}

interface AppContextType {
  // Navigation
  currentScreen: ScreenName;
  navigateTo: (screen: ScreenName, recipeId?: string) => void;
  selectedRecipeId: string | null;
  selectedRecipe: Recipe | null;

  // Language
  language: Language;
  setLanguage: (lang: Language) => void;

  // Recipes & GP 2 Persistence
  recipes: Recipe[];
  addRecipe: (newRecipe: Omit<Recipe, 'id' | 'createdAt'>) => string;
  toggleFavorite: (recipeId: string) => void;
  favoriteIds: string[];

  // GP 3 Four Screen States
  screenState: ScreenState;
  setScreenState: (state: ScreenState) => void;
  triggerRetry: () => void;

  // Meal Planner
  mealPlan: MealPlanDay[];
  addToMealPlan: (dayIndex: number, slot: 'breakfast' | 'lunch' | 'dinner' | 'snack', recipeId: string) => void;
  removeFromMealPlan: (dayIndex: number, slot: 'breakfast' | 'lunch' | 'dinner' | 'snack') => void;
  generateShoppingFromPlan: () => void;

  // Shopping List
  shoppingList: ShoppingItem[];
  addShoppingItem: (name: string, quantity: string, category?: ShoppingItem['category'], recipeTitle?: string) => void;
  toggleShoppingItem: (id: string) => void;
  removeShoppingItem: (id: string) => void;
  clearCompletedShopping: () => void;
  addRecipeIngredientsToShopping: (recipe: Recipe) => void;

  // Active Cooking Timer
  activeTimer: ActiveTimer | null;
  startTimerForStep: (recipeTitle: string, stepNumber: number, minutes: number) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetTimer: () => void;
  closeTimer: () => void;

  // Modals & Drawers
  isSubstitutionsOpen: boolean;
  setIsSubstitutionsOpen: (open: boolean) => void;
  isVoiceAssistantOpen: boolean;
  setIsVoiceAssistantOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  // User Profile
  user: UserProfile;
  loginUser: (provider: 'google' | 'email' | 'guest', name?: string, email?: string) => void;
  logoutUser: () => void;

  // Layout View Mode (Mobile vs Flutter Web) & Orientation (GP 8)
  viewMode: 'mobile' | 'web';
  setViewMode: (mode: 'mobile' | 'web') => void;
  isPhoneSideways: boolean;
  togglePhoneSideways: () => void;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  dietFilter: 'all' | 'veg' | 'non-veg';
  setDietFilter: (filter: 'all' | 'veg' | 'non-veg') => void;
}

const STORAGE_KEY_RECIPES = 'rasoi_custom_recipes_v1';
const STORAGE_KEY_FAVS = 'rasoi_favorites_v1';
const STORAGE_KEY_PLAN = 'rasoi_meal_plan_v1';
const STORAGE_KEY_SHOPPING = 'rasoi_shopping_list_v1';
const STORAGE_KEY_LANG = 'rasoi_language_v1';
const STORAGE_KEY_USER = 'rasoi_user_v1';

const INITIAL_DAYS: MealPlanDay[] = [
  { date: '2026-11-09', dayName: 'Monday', breakfast: 'crispy-masala-dosa', lunch: 'andhra-chepala-pulusu' },
  { date: '2026-11-10', dayName: 'Tuesday', lunch: 'sarson-ka-saag', dinner: 'punjabi-dal-makhani' },
  { date: '2026-11-11', dayName: 'Wednesday', lunch: 'temple-pulihora' },
  { date: '2026-11-12', dayName: 'Thursday', lunch: 'gongura-pachadi', dinner: 'punjabi-dal-makhani' },
  { date: '2026-11-13', dayName: 'Friday', dinner: 'hyderabadi-dum-biryani' },
  { date: '2026-11-14', dayName: 'Saturday', lunch: 'hyderabadi-dum-biryani', snack: 'royal-mysore-pak' },
  { date: '2026-11-15', dayName: 'Sunday', breakfast: 'crispy-masala-dosa', dinner: 'hyderabadi-dum-biryani' }
];

const INITIAL_SHOPPING: ShoppingItem[] = [
  { id: '1', name: 'Fresh Red Gongura Leaves', quantity: '3 bunches', category: 'Produce', isCompleted: false },
  { id: '2', name: 'Guntur Dry Red Chilies', quantity: '100g', category: 'Spices & Herbs', isCompleted: false },
  { id: '3', name: 'Pure Desi Buffalo Ghee', quantity: '500g', category: 'Dairy & Ghee', isCompleted: true },
  { id: '4', name: 'Aged Basmati Rice', quantity: '1 kg', category: 'Grains & Lentils', isCompleted: false },
  { id: '5', name: 'Kashmiri Saffron', quantity: '1g box', category: 'Spices & Herbs', isCompleted: false }
];

const DEFAULT_USER: UserProfile = {
  id: 'cook_default',
  name: 'Ananya Sharma',
  email: 'ananya.sharma@example.com',
  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
  preferredLanguage: 'en',
  isLoggedIn: true,
  provider: 'google'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('home');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>('gongura-pachadi');

  // Language
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LANG);
      if (saved === 'hi' || saved === 'te' || saved === 'en') return saved;
    } catch {
      // ignore
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY_LANG, lang);
    } catch {
      // ignore
    }
  };

  // User Profile
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_USER;
  });

  const loginUser = (provider: 'google' | 'email' | 'guest', name?: string, email?: string) => {
    const updated: UserProfile = {
      id: 'usr_' + Date.now(),
      name: name || (provider === 'guest' ? 'Traditional Guest Cook' : 'Ananya Sharma'),
      email: email || (provider === 'guest' ? 'guest@rasoivindu.local' : 'ananya.sharma@gmail.com'),
      avatarUrl: provider === 'guest' 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
        : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      preferredLanguage: language,
      isLoggedIn: true,
      provider
    };
    setUser(updated);
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const logoutUser = () => {
    const guest: UserProfile = {
      id: 'guest',
      name: 'Guest Cook',
      email: '',
      avatarUrl: '',
      preferredLanguage: language,
      isLoggedIn: false,
      provider: 'guest'
    };
    setUser(guest);
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(guest));
    } catch {
      // ignore
    }
  };

  // Recipes (Builtin + User-saved)
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RECIPES);
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...TRADITIONAL_RECIPES, ...parsed];
      }
    } catch {
      // fallback
    }
    return TRADITIONAL_RECIPES;
  });

  // Favorites
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FAVS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return ['gongura-pachadi', 'hyderabadi-dum-biryani', 'crispy-masala-dosa'];
  });

  const toggleFavorite = (recipeId: string) => {
    audioManager.playClickTone();
    setFavoriteIds(prev => {
      const next = prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId) 
        : [...prev, recipeId];
      try {
        localStorage.setItem(STORAGE_KEY_FAVS, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Add Recipe (Form screen - GP 4)
  const addRecipe = (newRecipeData: Omit<Recipe, 'id' | 'createdAt'>): string => {
    audioManager.playClickTone();
    const newId = 'custom-' + Date.now();
    const recipeWithId: Recipe = {
      ...newRecipeData,
      id: newId,
      createdAt: new Date().toISOString(),
      isUserCreated: true
    };

    setRecipes(prev => {
      const updated = [recipeWithId, ...prev];
      // Save user created recipes
      const userCustomOnly = updated.filter(r => r.isUserCreated);
      try {
        localStorage.setItem(STORAGE_KEY_RECIPES, JSON.stringify(userCustomOnly));
      } catch {
        // ignore
      }
      return updated;
    });

    return newId;
  };

  // GP 3 Four Screen States
  const [screenState, setScreenState] = useState<ScreenState>('normal');

  const triggerRetry = () => {
    setScreenState('loading');
    setTimeout(() => {
      setScreenState('normal');
    }, 900);
  };

  // Meal Planner
  const [mealPlan, setMealPlan] = useState<MealPlanDay[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PLAN);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_DAYS;
  });

  const addToMealPlan = (dayIndex: number, slot: 'breakfast' | 'lunch' | 'dinner' | 'snack', recipeId: string) => {
    setMealPlan(prev => {
      const next = [...prev];
      if (next[dayIndex]) {
        next[dayIndex] = { ...next[dayIndex], [slot]: recipeId };
        try {
          localStorage.setItem(STORAGE_KEY_PLAN, JSON.stringify(next));
        } catch {
          // ignore
        }
      }
      return next;
    });
  };

  const removeFromMealPlan = (dayIndex: number, slot: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    setMealPlan(prev => {
      const next = [...prev];
      if (next[dayIndex]) {
        const copy = { ...next[dayIndex] };
        delete copy[slot];
        next[dayIndex] = copy;
        try {
          localStorage.setItem(STORAGE_KEY_PLAN, JSON.stringify(next));
        } catch {
          // ignore
        }
      }
      return next;
    });
  };

  // Shopping List
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SHOPPING);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_SHOPPING;
  });

  const saveShoppingList = (items: ShoppingItem[]) => {
    setShoppingList(items);
    try {
      localStorage.setItem(STORAGE_KEY_SHOPPING, JSON.stringify(items));
    } catch {
      // ignore
    }
  };

  const addShoppingItem = (name: string, quantity: string, category: ShoppingItem['category'] = 'Other', recipeTitle?: string) => {
    const newItem: ShoppingItem = {
      id: 'shop_' + Date.now() + Math.random().toString(36).substring(2, 6),
      name,
      quantity,
      category,
      recipeTitle,
      isCompleted: false
    };
    saveShoppingList([newItem, ...shoppingList]);
  };

  const toggleShoppingItem = (id: string) => {
    audioManager.playClickTone();
    saveShoppingList(
      shoppingList.map(item => item.id === id ? { ...item, isCompleted: !item.isCompleted } : item)
    );
  };

  const removeShoppingItem = (id: string) => {
    saveShoppingList(shoppingList.filter(item => item.id !== id));
  };

  const clearCompletedShopping = () => {
    saveShoppingList(shoppingList.filter(item => !item.isCompleted));
  };

  const addRecipeIngredientsToShopping = (recipe: Recipe) => {
    audioManager.playVoiceAckTone();
    const newItems: ShoppingItem[] = recipe.ingredients.map(ing => {
      const name = ing.name[language] || ing.name.en;
      let cat: ShoppingItem['category'] = 'Other';
      const lower = name.toLowerCase();
      if (lower.includes('leaf') || lower.includes('onion') || lower.includes('mango') || lower.includes('garlic') || lower.includes('chili') || lower.includes('tamarind') || lower.includes('spinach') || lower.includes('potat')) {
        cat = 'Produce';
      } else if (lower.includes('jeera') || lower.includes('mustard') || lower.includes('coriander') || lower.includes('cardamom') || lower.includes('clove') || lower.includes('fenugreek') || lower.includes('salt') || lower.includes('turmeric') || lower.includes('methi') || lower.includes('masala')) {
        cat = 'Spices & Herbs';
      } else if (lower.includes('ghee') || lower.includes('butter') || lower.includes('curd') || lower.includes('paneer') || lower.includes('cream') || lower.includes('milk')) {
        cat = 'Dairy & Ghee';
      } else if (lower.includes('rice') || lower.includes('dal') || lower.includes('flour') || lower.includes('urad') || lower.includes('chana') || lower.includes('rajma') || lower.includes('besan')) {
        cat = 'Grains & Lentils';
      } else if (lower.includes('chicken') || lower.includes('mutton') || lower.includes('fish') || lower.includes('prawn') || lower.includes('egg')) {
        cat = 'Meat & Seafood';
      }
      return {
        id: 'shop_' + Date.now() + Math.random().toString(36).substring(2, 6),
        name,
        quantity: ing.quantity,
        category: cat,
        recipeTitle: recipe.title[language] || recipe.title.en,
        isCompleted: false
      };
    });
    saveShoppingList([...newItems, ...shoppingList]);
  };

  const generateShoppingFromPlan = () => {
    audioManager.playVoiceAckTone();
    const recipeIdSet = new Set<string>();
    mealPlan.forEach(day => {
      if (day.breakfast) recipeIdSet.add(day.breakfast);
      if (day.lunch) recipeIdSet.add(day.lunch);
      if (day.dinner) recipeIdSet.add(day.dinner);
      if (day.snack) recipeIdSet.add(day.snack);
    });

    const plannedRecipes = recipes.filter(r => recipeIdSet.has(r.id));
    const items: ShoppingItem[] = [];

    plannedRecipes.forEach(recipe => {
      recipe.ingredients.forEach(ing => {
        const name = ing.name[language] || ing.name.en;
        items.push({
          id: 'shop_plan_' + Math.random().toString(36).substring(2, 8),
          name,
          quantity: ing.quantity,
          category: 'Produce',
          recipeTitle: recipe.title[language] || recipe.title.en,
          isCompleted: false
        });
      });
    });

    saveShoppingList([...items, ...shoppingList]);
  };

  // Active Cooking Timer
  const [activeTimer, setActiveTimer] = useState<ActiveTimer | null>(null);

  const startTimerForStep = (recipeTitle: string, stepNumber: number, minutes: number) => {
    audioManager.playClickTone();
    const totalSeconds = Math.max(1, Math.round(minutes * 60));
    setActiveTimer({
      id: 'timer_' + Date.now(),
      recipeTitle,
      stepNumber,
      remainingSeconds: totalSeconds,
      totalSeconds,
      isRunning: true
    });
  };

  const pauseTimer = () => {
    if (activeTimer) setActiveTimer({ ...activeTimer, isRunning: false });
  };

  const resumeTimer = () => {
    if (activeTimer) setActiveTimer({ ...activeTimer, isRunning: true });
  };

  const resetTimer = () => {
    if (activeTimer) {
      setActiveTimer({
        ...activeTimer,
        remainingSeconds: activeTimer.totalSeconds,
        isRunning: false
      });
    }
  };

  const closeTimer = () => {
    setActiveTimer(null);
  };

  // Timer interval tick
  useEffect(() => {
    if (!activeTimer || !activeTimer.isRunning) return;

    const interval = setInterval(() => {
      setActiveTimer(prev => {
        if (!prev) return null;
        if (prev.remainingSeconds <= 1) {
          audioManager.playTimerDoneChime();
          return { ...prev, remainingSeconds: 0, isRunning: false };
        }
        return { ...prev, remainingSeconds: prev.remainingSeconds - 1 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTimer?.isRunning]);

  // Modals
  const [isSubstitutionsOpen, setIsSubstitutionsOpen] = useState(false);
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // View Mode & Orientation
  const [viewMode, setViewMode] = useState<'mobile' | 'web'>('mobile');
  const [isPhoneSideways, setIsPhoneSideways] = useState(false);

  const togglePhoneSideways = () => {
    audioManager.playClickTone();
    setIsPhoneSideways(prev => !prev);
  };

  // Search & Filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg'>('all');

  const navigateTo = (screen: ScreenName, recipeId?: string) => {
    audioManager.playClickTone();
    if (recipeId) setSelectedRecipeId(recipeId);
    setCurrentScreen(screen);
    // Scroll to top when changing screen
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedRecipe = recipes.find(r => r.id === selectedRecipeId) || recipes[0] || null;

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        navigateTo,
        selectedRecipeId,
        selectedRecipe,
        language,
        setLanguage,
        recipes,
        addRecipe,
        toggleFavorite,
        favoriteIds,
        screenState,
        setScreenState,
        triggerRetry,
        mealPlan,
        addToMealPlan,
        removeFromMealPlan,
        generateShoppingFromPlan,
        shoppingList,
        addShoppingItem,
        toggleShoppingItem,
        removeShoppingItem,
        clearCompletedShopping,
        addRecipeIngredientsToShopping,
        activeTimer,
        startTimerForStep,
        pauseTimer,
        resumeTimer,
        resetTimer,
        closeTimer,
        isSubstitutionsOpen,
        setIsSubstitutionsOpen,
        isVoiceAssistantOpen,
        setIsVoiceAssistantOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        user,
        loginUser,
        logoutUser,
        viewMode,
        setViewMode,
        isPhoneSideways,
        togglePhoneSideways,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        dietFilter,
        setDietFilter
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
