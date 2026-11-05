import React from 'react';
import { useApp } from '../context/AppContext';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const { viewMode, isPhoneSideways } = useApp();

  if (viewMode === 'web') {
    return (
      <div className="min-h-screen bg-[#12100E] text-stone-100 flex flex-col">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0c0b] py-4 md:py-8 px-2 flex flex-col items-center justify-center transition-all duration-300">
      {/* Device Exterior Chassis */}
      <div
        className={`relative bg-stone-950 border-[6px] md:border-[10px] border-stone-800 rounded-[44px] md:rounded-[52px] shadow-2xl shadow-black/80 overflow-hidden transition-all duration-500 ease-in-out ${
          isPhoneSideways
            ? 'w-[94vw] max-w-[850px] h-[520px]'
            : 'w-full max-w-[430px] h-[860px] max-h-[92vh]'
        } flex flex-col`}
      >
        {/* Device Status Bar */}
        <div className="h-8 bg-stone-950 px-6 flex items-center justify-between text-stone-400 text-[11px] font-semibold select-none z-30 shrink-0">
          <span>09:41</span>

          {/* Dynamic Island / Camera Punch Hole */}
          <div className="w-24 h-4 bg-stone-900 rounded-full flex items-center justify-center gap-1.5 border border-stone-800">
            <span className="w-2 h-2 rounded-full bg-stone-950 border border-stone-700" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
          </div>

          <div className="flex items-center gap-1.5">
            <Signal className="w-3 h-3 text-stone-300" />
            <Wifi className="w-3 h-3 text-stone-300" />
            <BatteryMedium className="w-3.5 h-3.5 text-stone-300" />
          </div>
        </div>

        {/* Scrollable Phone Screen Canvas */}
        <div className="flex-1 overflow-y-auto bg-[#12100E] text-stone-100 relative pb-16">
          {children}
        </div>

        {/* Bottom Android Home Indicator Pill */}
        <div className="h-4 bg-stone-950 flex items-center justify-center shrink-0 z-30">
          <div className="w-32 h-1 bg-stone-600 rounded-full" />
        </div>
      </div>
    </div>
  );
};
