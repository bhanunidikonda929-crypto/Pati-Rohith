import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { MobileFrame } from './components/MobileFrame';
import { AppBar } from './components/AppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { HomeScreen } from './components/Screens/HomeScreen';
import { DetailScreen } from './components/Screens/DetailScreen';
import { AddRecipeScreen } from './components/Screens/AddRecipeScreen';
import { MealPlannerScreen } from './components/Screens/MealPlannerScreen';
import { ShoppingListScreen } from './components/Screens/ShoppingListScreen';
import { FavoritesScreen } from './components/Screens/FavoritesScreen';
import { KhitSubmissionScreen } from './components/Screens/KhitSubmissionScreen';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { CookingTimerModal } from './components/CookingTimerModal';
import { IngredientSubstitutionModal } from './components/IngredientSubstitutionModal';
import { AuthModal } from './components/AuthModal';

const AppContent: React.FC = () => {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'detail':
        return <DetailScreen />;
      case 'add':
        return <AddRecipeScreen />;
      case 'meal_planner':
        return <MealPlannerScreen />;
      case 'shopping_list':
        return <ShoppingListScreen />;
      case 'favorites':
        return <FavoritesScreen />;
      case 'khit_code':
        return <KhitSubmissionScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <MobileFrame>
      <AppBar />
      <main className="flex-1 min-h-[500px]">
        {renderScreen()}
      </main>
      <BottomNavBar />

      {/* Global Interactive Overlays */}
      <VoiceAssistantModal />
      <CookingTimerModal />
      <IngredientSubstitutionModal />
      <AuthModal />
    </MobileFrame>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
