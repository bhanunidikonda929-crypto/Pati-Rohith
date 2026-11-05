import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../i18n/translations';
import { Mic, MicOff, Volume2, Sparkles, X, ArrowRight } from 'lucide-react';
import { audioManager } from '../utils/audio';

// Cross-browser speech recognition interface
interface IWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

export const VoiceAssistantModal: React.FC = () => {
  const {
    language,
    isVoiceAssistantOpen,
    setIsVoiceAssistantOpen,
    navigateTo,
    setLanguage,
    setSearchQuery,
    startTimerForStep,
    selectedRecipe
  } = useApp();

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [hasSpeechSupport, setHasSpeechSupport] = useState(true);

  // Set recognition language based on app language
  const getRecognitionLang = () => {
    if (language === 'te') return 'te-IN';
    if (language === 'hi') return 'hi-IN';
    return 'en-IN';
  };

  useEffect(() => {
    const win = window as unknown as IWindow;
    if (!win.SpeechRecognition && !win.webkitSpeechRecognition) {
      setHasSpeechSupport(false);
    }
  }, []);

  const handleVoiceCommand = (text: string) => {
    const lower = text.toLowerCase().trim();
    audioManager.playVoiceAckTone();

    // Language switches
    if (lower.includes('telugu') || lower.includes('తెలుగు')) {
      setLanguage('te');
      setFeedback('భాష తెలుగులోకి మార్చబడింది! (Switched to Telugu)');
      return;
    }
    if (lower.includes('hindi') || lower.includes('हिंदी') || lower.includes('हिन्दी')) {
      setLanguage('hi');
      setFeedback('भाषा हिंदी में बदली गई! (Switched to Hindi)');
      return;
    }
    if (lower.includes('english')) {
      setLanguage('en');
      setFeedback('Language switched to English!');
      return;
    }

    // Navigation commands
    if (lower.includes('favorite') || lower.includes('favourites') || lower.includes('fav') || lower.includes('పసంద్') || lower.includes('ఇష్టమైన') || lower.includes('पसंदीदा')) {
      setFeedback('Opening Favorites screen...');
      setTimeout(() => {
        navigateTo('favorites');
        setIsVoiceAssistantOpen(false);
      }, 700);
      return;
    }

    if (lower.includes('meal plan') || lower.includes('planner') || lower.includes('ప్లానర్') || lower.includes('యోజన')) {
      setFeedback('Opening Meal Planner...');
      setTimeout(() => {
        navigateTo('meal_planner');
        setIsVoiceAssistantOpen(false);
      }, 700);
      return;
    }

    if (lower.includes('shop') || lower.includes('grocery') || lower.includes('లిస్ట్') || lower.includes('సామాన్') || lower.includes('खरीदारी')) {
      setFeedback('Opening Shopping List...');
      setTimeout(() => {
        navigateTo('shopping_list');
        setIsVoiceAssistantOpen(false);
      }, 700);
      return;
    }

    if (lower.includes('add recipe') || lower.includes('create') || lower.includes('కొత్త వంటకం') || lower.includes('रेसिपी जोड़ें')) {
      setFeedback('Opening Add Recipe Form...');
      setTimeout(() => {
        navigateTo('add');
        setIsVoiceAssistantOpen(false);
      }, 700);
      return;
    }

    if (lower.includes('code') || lower.includes('khit') || lower.includes('flutter') || lower.includes('project') || lower.includes('కోడ్')) {
      setFeedback('Opening KHIT Flutter Codebase Hub...');
      setTimeout(() => {
        navigateTo('khit_code');
        setIsVoiceAssistantOpen(false);
      }, 700);
      return;
    }

    if (lower.includes('home') || lower.includes('హోమ్') || lower.includes('होम')) {
      setFeedback('Navigating to Home...');
      setTimeout(() => {
        navigateTo('home');
        setIsVoiceAssistantOpen(false);
      }, 700);
      return;
    }

    // Timer command: e.g. "Start timer for 10 minutes"
    const timerMatch = lower.match(/(\d+)\s*(?:min|minute|నిమిషం|मिनट)/);
    if (timerMatch) {
      const mins = parseInt(timerMatch[1], 10);
      const title = selectedRecipe?.title[language] || 'Traditional Cooking';
      startTimerForStep(title, 1, mins);
      setFeedback(`Started ${mins} minute cooking timer!`);
      setTimeout(() => {
        setIsVoiceAssistantOpen(false);
      }, 1000);
      return;
    }

    // Search command: e.g. "Search Biryani" or just "Biryani"
    let cleanSearch = lower
      .replace('search', '')
      .replace('find', '')
      .replace('look for', '')
      .replace('చూపించు', '')
      .replace('వెతుకు', '')
      .replace('ढूंढो', '')
      .replace('दिखाओ', '')
      .trim();

    if (!cleanSearch) cleanSearch = lower;

    setSearchQuery(cleanSearch);
    setFeedback(`Searching for "${cleanSearch}"...`);
    setTimeout(() => {
      navigateTo('home');
      setIsVoiceAssistantOpen(false);
    }, 800);
  };

  const startListening = () => {
    const win = window as unknown as IWindow;
    const SpeechClass = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechClass) {
      setFeedback('Browser speech recognition unavailable. Click any sample command below!');
      return;
    }

    try {
      const recognition = new SpeechClass();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = getRecognitionLang();

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
        setFeedback(null);
      };

      recognition.onresult = (event: any) => {
        const current = event.results[0][0].transcript;
        setTranscript(current);
      };

      recognition.onerror = (e: any) => {
        setIsListening(false);
        setFeedback('Listening stopped or mic permission denied. Try clicking suggested commands below.');
      };

      recognition.onend = () => {
        setIsListening(false);
        if (transcript) {
          handleVoiceCommand(transcript);
        }
      };

      recognition.start();
    } catch {
      setIsListening(false);
      setFeedback('Microphone couldn’t start. Use quick sample commands below!');
    }
  };

  if (!isVoiceAssistantOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-stone-900 border border-amber-600/30 rounded-3xl p-6 shadow-2xl text-stone-100 overflow-hidden">
        {/* Traditional Ornamental Glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-600/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-orange-600/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-semibold text-lg text-amber-100 flex items-center gap-2">
                {getTranslation(language, 'voiceAssistant')}
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-mono">
                  {language.toUpperCase()}
                </span>
              </h3>
              <p className="text-xs text-stone-400">English • हिन्दी • తెలుగు</p>
            </div>
          </div>
          <button
            onClick={() => setIsVoiceAssistantOpen(false)}
            className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center Listening Orb */}
        <div className="flex flex-col items-center justify-center my-6">
          <button
            onClick={startListening}
            className={`relative p-6 rounded-full transition-all duration-300 ${
              isListening
                ? 'bg-amber-500 text-stone-950 scale-110 shadow-lg shadow-amber-500/50'
                : 'bg-stone-800 hover:bg-amber-600 text-amber-400 hover:text-white border border-amber-500/30'
            }`}
          >
            {isListening && (
              <>
                <span className="absolute inset-0 rounded-full bg-amber-400/40 animate-ping" />
                <span className="absolute -inset-2 rounded-full border border-amber-400 animate-pulse" />
              </>
            )}
            {isListening ? <Mic className="w-8 h-8 animate-bounce" /> : <Mic className="w-8 h-8" />}
          </button>

          <p className="mt-3 font-medium text-sm text-stone-300">
            {isListening ? getTranslation(language, 'voiceListening') : getTranslation(language, 'speakCommand')}
          </p>

          {/* Transcript display */}
          {transcript && (
            <div className="mt-2 px-4 py-2 bg-stone-800/80 rounded-xl border border-stone-700 text-amber-200 text-sm font-medium text-center">
              "{transcript}"
            </div>
          )}

          {/* Assistant feedback */}
          {feedback && (
            <div className="mt-2 text-xs text-amber-400 font-medium animate-pulse text-center">
              {feedback}
            </div>
          )}
        </div>

        {/* Suggested Voice Commands */}
        <div className="mt-4">
          <p className="text-xs text-stone-400 mb-2 font-medium flex items-center justify-between">
            <span>Tap to test immediate command:</span>
            <span className="text-[10px] text-amber-500">Auto executes</span>
          </p>

          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {[
              { label: 'Search Gongura Pachadi', query: 'Search Gongura' },
              { label: 'Search Hyderabadi Biryani', query: 'Search Biryani' },
              { label: 'Show My Favorites', query: 'Show favorites' },
              { label: 'Open Weekly Meal Planner', query: 'Meal planner' },
              { label: 'Start 10 Min Cooking Timer', query: '10 minute timer' },
              { label: 'Change Language to Telugu (తెలుగు)', query: 'Telugu' },
              { label: 'Change Language to Hindi (हिन्दी)', query: 'Hindi' },
              { label: 'View KHIT Flutter Codebase', query: 'Flutter project' }
            ].map((cmd, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setTranscript(cmd.query);
                  handleVoiceCommand(cmd.query);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-stone-800/60 hover:bg-amber-600/20 hover:border-amber-500/40 border border-stone-800 text-left text-xs text-stone-200 transition group"
              >
                <span>"{cmd.label}"</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
          <span>Uses Web Speech Recognition API</span>
          <button
            onClick={() => setIsVoiceAssistantOpen(false)}
            className="text-amber-400 hover:underline"
          >
            {getTranslation(language, 'close')}
          </button>
        </div>
      </div>
    </div>
  );
};
