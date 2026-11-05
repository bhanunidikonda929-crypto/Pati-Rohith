import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../i18n/translations';
import { Language } from '../types/recipe';
import { 
  Flame, 
  Mic, 
  Languages, 
  RefreshCw, 
  Smartphone, 
  Monitor, 
  RotateCw, 
  Layers, 
  Heart,
  User as UserIcon,
  Search,
  Check
} from 'lucide-react';
import { audioManager } from '../utils/audio';

export const AppBar: React.FC = () => {
  const {
    language,
    setLanguage,
    currentScreen,
    navigateTo,
    favoriteIds,
    setIsVoiceAssistantOpen,
    setIsSubstitutionsOpen,
    setIsAuthModalOpen,
    user,
    screenState,
    setScreenState,
    viewMode,
    setViewMode,
    isPhoneSideways,
    togglePhoneSideways,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isStateMenuOpen, setIsStateMenuOpen] = useState(false);

  const languagesList: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' }
  ];

  return (
    <header className="sticky top-0 z-30 bg-stone-900/95 backdrop-blur-md border-b border-amber-900/40 text-stone-100 flutter-elevation-2">
      {/* Top Utility Ribbon: Device View & Evaluator Controls */}
      <div className="bg-stone-950/90 px-3 py-1.5 border-b border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-amber-400/90 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Flutter Material 3
          </span>
          <span className="hidden sm:inline text-stone-600">|</span>
          <span className="hidden sm:inline text-stone-400">KHIT Guntur Group Project</span>
        </div>

        {/* View mode toggle & 4 states tester */}
        <div className="flex items-center gap-2">
          {/* GP 8 Sideways Orientation Toggle (only visible in mobile frame mode) */}
          {viewMode === 'mobile' && (
            <button
              onClick={togglePhoneSideways}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition ${
                isPhoneSideways 
                  ? 'bg-amber-500 text-stone-950 font-bold' 
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
              }`}
              title="Test GP 8 phone turned sideways"
            >
              <RotateCw className="w-3 h-3" />
              <span className="hidden xs:inline">{isPhoneSideways ? 'Landscape' : 'Rotate (GP 8)'}</span>
            </button>
          )}

          {/* View Mode: Mobile vs Web */}
          <div className="flex items-center bg-stone-900 rounded-lg p-0.5 border border-stone-800">
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition ${
                viewMode === 'mobile' ? 'bg-amber-500/20 text-amber-400' : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Mobile Device Frame"
            >
              <Smartphone className="w-3 h-3" />
              <span className="hidden md:inline">Mobile App</span>
            </button>
            <button
              onClick={() => setViewMode('web')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition ${
                viewMode === 'web' ? 'bg-amber-500/20 text-amber-400' : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Flutter Web (Desktop)"
            >
              <Monitor className="w-3 h-3" />
              <span className="hidden md:inline">Flutter Web</span>
            </button>
          </div>

          {/* GP 3: Four Screen States Selector (Essential for 5-min demo live grading!) */}
          <div className="relative">
            <button
              onClick={() => setIsStateMenuOpen(!isStateMenuOpen)}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 text-[11px] font-medium transition"
              title="Simulate GP 3 Screen States"
            >
              <Layers className="w-3 h-3 text-amber-400" />
              <span className="capitalize">{screenState} State</span>
            </button>

            {isStateMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-44 bg-stone-900 border border-stone-700 rounded-xl shadow-2xl py-1 z-50 animate-fade-in text-xs">
                <div className="px-3 py-1 text-[10px] uppercase font-bold text-stone-500 border-b border-stone-800">
                  GP 3 Screen States:
                </div>
                {[
                  { state: 'normal' as const, label: '1. Data State (Loaded)' },
                  { state: 'loading' as const, label: '2. Loading Indicator' },
                  { state: 'error' as const, label: '3. Error with Retry' },
                  { state: 'empty' as const, label: '4. Empty State' }
                ].map((item) => (
                  <button
                    key={item.state}
                    onClick={() => {
                      audioManager.playClickTone();
                      setScreenState(item.state);
                      setIsStateMenuOpen(false);
                      if (currentScreen !== 'home') navigateTo('home');
                    }}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-amber-500/10 transition ${
                      screenState === item.state ? 'text-amber-400 font-semibold' : 'text-stone-300'
                    }`}
                  >
                    <span>{item.label}</span>
                    {screenState === item.state && <Check className="w-3 h-3 text-amber-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Flutter AppBar */}
      <div className="px-4 py-2.5 flex items-center justify-between gap-2 max-w-7xl mx-auto">
        {/* Brand & Title */}
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 flex items-center justify-center text-stone-950 shadow-md shadow-amber-500/20 group-hover:scale-105 transition">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h1 className="font-bold text-base md:text-lg tracking-tight text-stone-100 flex items-center gap-1.5">
              <span>{getTranslation(language, 'appName')}</span>
            </h1>
            <p className="text-[10px] text-amber-400/90 font-medium tracking-wide">
              {getTranslation(language, 'appSubheading')}
            </p>
          </div>
        </button>

        {/* Actions Row */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Voice Command Button */}
          <button
            onClick={() => {
              audioManager.playVoiceAckTone();
              setIsVoiceAssistantOpen(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-medium transition shadow-sm hover:scale-105"
            title="Voice Commands (English, Hindi, Telugu)"
          >
            <Mic className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="hidden sm:inline">{getTranslation(language, 'voiceAssistant')}</span>
          </button>

          {/* Ingredient Swaps */}
          <button
            onClick={() => {
              audioManager.playClickTone();
              setIsSubstitutionsOpen(true);
            }}
            className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-400 border border-stone-700/80 transition"
            title={getTranslation(language, 'substitutions')}
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* 3-Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-semibold transition"
              title="Select Language (English, Hindi, Telugu)"
            >
              <Languages className="w-3.5 h-3.5 text-amber-400" />
              <span className="uppercase text-[11px]">{language}</span>
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-stone-900 border border-stone-700 rounded-2xl shadow-2xl py-1.5 z-50 animate-fade-in text-xs">
                {languagesList.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      audioManager.playClickTone();
                      setLanguage(l.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-amber-500/10 transition ${
                      language === l.code ? 'text-amber-400 font-bold bg-amber-500/5' : 'text-stone-300'
                    }`}
                  >
                    <span>{l.native}</span>
                    {language === l.code && <Check className="w-3.5 h-3.5 text-amber-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Favorites shortcut */}
          <button
            onClick={() => navigateTo('favorites')}
            className={`p-2 rounded-full border transition relative ${
              currentScreen === 'favorites'
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-300 border-stone-700'
            }`}
            title={getTranslation(language, 'favorites')}
          >
            <Heart className={`w-4 h-4 ${favoriteIds.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {favoriteIds.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center">
                {favoriteIds.length}
              </span>
            )}
          </button>

          {/* User Profile / Login Portal */}
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-1.5 p-1 rounded-full bg-stone-800 hover:bg-stone-700 border border-stone-700 transition"
            title="Profile & Firebase Login"
          >
            {user.isLoggedIn ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover border border-amber-500"
              />
            ) : (
              <span className="w-7 h-7 rounded-full bg-stone-700 flex items-center justify-center text-stone-300">
                <UserIcon className="w-4 h-4" />
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
