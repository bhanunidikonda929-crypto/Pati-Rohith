export type Language = 'en' | 'hi' | 'te';

export type SpiceLevel = 'mild' | 'medium' | 'hot' | 'extra_hot';

export type CourseType = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert';

export type RegionalOrigin = 
  | 'Andhra & Telangana' 
  | 'Tamil Nadu' 
  | 'Kerala' 
  | 'Karnataka' 
  | 'Punjab & North' 
  | 'Mughlai & Hyderabad' 
  | 'Bengal & East' 
  | 'Gujarat & West';

export interface MultilingualText {
  en: string;
  hi: string;
  te: string;
}

export interface Ingredient {
  name: MultilingualText;
  quantity: string;
  unit?: string;
  notes?: MultilingualText;
}

export interface RecipeStep {
  stepNumber: number;
  instruction: MultilingualText;
  tip?: MultilingualText;
  timerMinutes?: number;
}

export interface Recipe {
  id: string;
  title: MultilingualText;
  description: MultilingualText;
  category: 'biryani' | 'curry' | 'breakfast' | 'sweets' | 'rice' | 'bread' | 'dal';
  cuisine: RegionalOrigin;
  diet: 'veg' | 'non-veg' | 'vegan';
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  caloriesPerServing?: number;
  spiceLevel: SpiceLevel;
  imageUrl: string;
  ingredients: Ingredient[];
  instructions: RecipeStep[];
  traditionalTip?: MultilingualText;
  isFavorite?: boolean;
  isUserCreated?: boolean;
  createdAt: string;
}

export interface SubstitutionItem {
  id: string;
  original: MultilingualText;
  substitute: MultilingualText;
  ratio: string;
  flavorImpact: MultilingualText;
  dietaryBenefit: string; // e.g. "Vegan", "Gluten-Free", "Low-Fat", "Quick pantry swap"
}

export interface MealPlanDay {
  date: string; // YYYY-MM-DD
  dayName: string; // Mon, Tue, etc.
  breakfast?: string; // Recipe ID
  lunch?: string;
  dinner?: string;
  snack?: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  category: 'Produce' | 'Spices & Herbs' | 'Dairy & Ghee' | 'Grains & Lentils' | 'Meat & Seafood' | 'Other';
  recipeTitle?: string;
  isCompleted: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  preferredLanguage: Language;
  isLoggedIn: boolean;
  provider: 'google' | 'email' | 'guest';
}
