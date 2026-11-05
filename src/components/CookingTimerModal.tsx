import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../i18n/translations';
import { Timer, Play, Pause, RotateCcw, X, Bell, ChevronDown, ChevronUp } from 'lucide-react';
import { audioManager } from '../utils/audio';

export const CookingTimerModal: React.FC = () => {
  const { activeTimer, pauseTimer, resumeTimer, resetTimer, closeTimer, language } = useApp();
  const [isMinimized, setIsMinimized] = useState(false);

  if (!activeTimer) return null;

  const minutes = Math.floor(activeTimer.remainingSeconds / 60);
  const seconds = activeTimer.remainingSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const progressPercent = activeTimer.totalSeconds > 0 
    ? ((activeTimer.totalSeconds - activeTimer.remainingSeconds) / activeTimer.totalSeconds) * 100 
    : 100;
  const isFinished = activeTimer.remainingSeconds === 0;

  if (isMinimized) {
    return (
      <div className="fixed bottom-20 right-4 z-40 flex items-center gap-3 bg-stone-900 border border-amber-500/50 shadow-2xl rounded-full px-4 py-2 text-stone-100 animate-slide-up">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300"
        >
          <Timer className={`w-4 h-4 ${activeTimer.isRunning ? 'animate-spin' : ''}`} />
          <span>{formattedTime}</span>
          <span className="text-stone-400 font-normal truncate max-w-[100px]">{activeTimer.recipeTitle}</span>
          <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
        </button>
        <button
          onClick={closeTimer}
          className="text-stone-500 hover:text-stone-300 ml-1"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-sm bg-stone-900 border border-amber-500/40 rounded-3xl p-6 shadow-2xl text-stone-100 overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-500/15 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Timer className="w-4 h-4" />
            </span>
            <div>
              <h4 className="font-semibold text-sm text-stone-200">
                {getTranslation(language, 'startTimer')}
              </h4>
              <p className="text-[11px] text-stone-400 truncate max-w-[180px]">
                {activeTimer.recipeTitle} (Step {activeTimer.stepNumber})
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition"
              title="Minimize timer"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
            <button
              onClick={closeTimer}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition"
              title="Close timer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Circular Countdown Progress */}
        <div className="flex flex-col items-center justify-center my-6">
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* SVG Ring */}
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="88"
                cy="88"
                r="74"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-stone-800"
              />
              <circle
                cx="88"
                cy="88"
                r="74"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray="465"
                strokeDashoffset={465 - (465 * progressPercent) / 100}
                strokeLinecap="round"
                className={`${isFinished ? 'text-emerald-500' : 'text-amber-500'} transition-all duration-500`}
              />
            </svg>

            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className={`text-4xl font-extrabold font-mono tracking-tight ${isFinished ? 'text-emerald-400 animate-pulse' : 'text-white'}`}>
                {formattedTime}
              </span>
              <span className="text-[11px] text-stone-400 mt-1 uppercase tracking-wider">
                {isFinished ? 'Done! Check Pot' : activeTimer.isRunning ? 'Cooking...' : 'Paused'}
              </span>
            </div>
          </div>

          {isFinished && (
            <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/30">
              <Bell className="w-3.5 h-3.5 animate-bounce" />
              <span>{getTranslation(language, 'timerDone')}</span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={resetTimer}
            className="p-3 rounded-full bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition"
            title={getTranslation(language, 'reset')}
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {activeTimer.isRunning ? (
            <button
              onClick={pauseTimer}
              className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold flex items-center gap-2 shadow-lg shadow-amber-500/30 transition"
            >
              <Pause className="w-5 h-5 fill-current" />
              <span>{getTranslation(language, 'pause')}</span>
            </button>
          ) : (
            <button
              onClick={() => {
                if (isFinished) resetTimer();
                resumeTimer();
              }}
              className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold flex items-center gap-2 shadow-lg shadow-amber-500/30 transition"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>{isFinished ? getTranslation(language, 'startTimer') : getTranslation(language, 'resume')}</span>
            </button>
          )}

          <button
            onClick={() => {
              audioManager.playTimerDoneChime();
            }}
            className="p-3 rounded-full bg-stone-800 text-stone-400 hover:text-amber-400 hover:bg-stone-700 transition"
            title="Test temple bell sound"
          >
            <Bell className="w-4 h-4" />
          </button>
        </div>

        <p className="mt-4 text-center text-[11px] text-stone-500">
          Tip: You can minimize this timer to keep browsing other recipes.
        </p>
      </div>
    </div>
  );
};
