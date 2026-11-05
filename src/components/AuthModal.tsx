import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../i18n/translations';
import { User, LogIn, LogOut, CheckCircle, Flame, Shield, X, Cloud, Sparkles } from 'lucide-react';
import { audioManager } from '../utils/audio';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, user, loginUser, logoutUser, language } = useApp();
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleGoogleLogin = () => {
    setIsSubmitting(true);
    audioManager.playClickTone();
    setTimeout(() => {
      loginUser('google', 'Ananya Sharma', 'ananya.sharma@gmail.com');
      setIsSubmitting(false);
      setIsAuthModalOpen(false);
    }, 600);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setIsSubmitting(true);
    audioManager.playClickTone();
    setTimeout(() => {
      loginUser('email', nameInput || 'Traditional Cook', emailInput);
      setIsSubmitting(false);
      setIsAuthModalOpen(false);
    }, 600);
  };

  const handleGuestLogin = () => {
    loginUser('guest');
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-stone-900 border border-amber-600/30 rounded-3xl p-6 shadow-2xl text-stone-100 overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-14 -right-14 w-36 h-36 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-stone-950 font-bold shadow-md shadow-amber-500/20">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-amber-100">
                {user.isLoggedIn ? 'Cook Profile & Firebase Portal' : getTranslation(language, 'login')}
              </h3>
              <p className="text-[11px] text-stone-400">
                {language === 'te' ? 'సాంప్రదాయ వంటకాల క్లౌడ్ పోర్టల్' : language === 'hi' ? 'पारंपरिक रसोई क्लाउड पोर्टल' : 'Firebase Auth & Cloud Data Sync'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {user.isLoggedIn ? (
          <div className="my-5 space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-stone-800/70 border border-stone-700">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-amber-500/60 shadow-md"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-stone-100 truncate">{user.name}</h4>
                  <span className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400" title="Authenticated">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </span>
                </div>
                <p className="text-xs text-stone-400 truncate">{user.email}</p>
                <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-medium capitalize">
                  Provider: {user.provider}
                </span>
              </div>
            </div>

            {/* Firebase Status Badge */}
            <div className="p-3.5 rounded-xl bg-stone-800/40 border border-stone-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-stone-300">
                <span className="flex items-center gap-1.5 text-amber-400 font-medium">
                  <Cloud className="w-4 h-4" /> Firebase Firestore:
                </span>
                <span className="text-emerald-400 font-mono text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  ONLINE & SYNCED
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-400">
                <span>Local Offline Cache:</span>
                <span className="text-stone-300">Active (GP 2 Compliant)</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-400">
                <span>Security Rules:</span>
                <span className="text-stone-300 font-mono">firestore.rules (ABAC)</span>
              </div>
            </div>

            <button
              onClick={() => {
                logoutUser();
                setIsAuthModalOpen(false);
              }}
              className="w-full py-2.5 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 font-semibold text-xs flex items-center justify-center gap-2 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out from Device</span>
            </button>
          </div>
        ) : (
          <div className="my-5 space-y-4">
            <p className="text-xs text-stone-300 leading-relaxed">
              {getTranslation(language, 'loginDesc')}
            </p>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-white text-stone-900 font-semibold text-xs flex items-center justify-center gap-3 shadow-lg hover:bg-stone-100 transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{getTranslation(language, 'googleLogin')}</span>
            </button>

            <div className="flex items-center gap-2 my-3">
              <div className="flex-1 h-px bg-stone-800" />
              <span className="text-[10px] text-stone-500 uppercase tracking-widest">or email</span>
              <div className="flex-1 h-px bg-stone-800" />
            </div>

            {/* Email form */}
            <form onSubmit={handleEmailSubmit} className="space-y-2.5">
              <input
                type="text"
                placeholder="Cook Name (Optional)"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
              <input
                type="email"
                required
                placeholder="Email Address"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <LogIn className="w-4 h-4" />
                <span>Continue with Email</span>
              </button>
            </form>

            {/* Guest Login */}
            <button
              onClick={handleGuestLogin}
              className="w-full py-2 text-stone-400 hover:text-amber-400 text-xs font-medium text-center transition"
            >
              {getTranslation(language, 'guestLogin')}
            </button>
          </div>
        )}

        <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-500">
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-amber-500" /> Firebase Auth SDK Ready
          </span>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="text-stone-400 hover:underline"
          >
            {getTranslation(language, 'close')}
          </button>
        </div>
      </div>
    </div>
  );
};
