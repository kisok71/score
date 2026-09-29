// src/components/common/MobileFrame.tsx
import React, { useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-neutral-950 text-slate-100 flex flex-col items-center justify-start py-0 sm:py-6 px-0 sm:px-4">
      {/* Top Device Switcher for Desktop */}
      <div className="hidden sm:flex items-center gap-3 mb-4 bg-emerald-950/40 border border-emerald-800/40 px-4 py-1.5 rounded-full text-xs text-emerald-300 backdrop-blur-md shadow-lg">
        <span className="font-semibold text-emerald-400">⛳ CaddieMaster Mobile View</span>
        <div className="h-3 w-px bg-emerald-700/50" />
        <button
          onClick={() => setIsPhoneFrame(true)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
            isPhoneFrame
              ? 'bg-emerald-500 text-neutral-950 font-bold shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Smartphone size={14} />
          <span>모바일 폰 프레임</span>
        </button>
        <button
          onClick={() => setIsPhoneFrame(false)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
            !isPhoneFrame
              ? 'bg-emerald-500 text-neutral-950 font-bold shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Monitor size={14} />
          <span>전체 화면</span>
        </button>
      </div>

      {/* Main Container */}
      <div
        className={`w-full transition-all duration-300 relative ${
          isPhoneFrame
            ? 'max-w-[430px] min-h-[100dvh] sm:min-h-[880px] sm:max-h-[920px] sm:rounded-[48px] sm:border-[8px] sm:border-neutral-800 sm:ring-1 sm:ring-white/10 shadow-2xl overflow-hidden flex flex-col bg-[#0b1411]'
            : 'max-w-4xl min-h-screen sm:rounded-2xl border border-neutral-800 flex flex-col bg-[#0b1411]'
        }`}
      >
        {/* iPhone Dynamic Island & Speaker Mockup (Only in Phone Frame) */}
        {isPhoneFrame && (
          <div className="hidden sm:block absolute top-0 left-0 right-0 h-8 z-50 pointer-events-none">
            <div className="mx-auto w-28 h-5 bg-black rounded-b-2xl flex items-center justify-center gap-2 border-b border-x border-neutral-800">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-700" />
              <div className="w-2 h-2 rounded-full bg-emerald-950/80" />
            </div>
          </div>
        )}

        {/* Inner Content */}
        <div className="flex-1 flex flex-col overflow-y-auto relative pb-20">
          {children}
        </div>
      </div>
    </div>
  );
};
