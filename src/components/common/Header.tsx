// src/components/common/Header.tsx
import React from 'react';
import { Flag, Sparkles, SlidersHorizontal, PlusCircle, Compass, Search } from 'lucide-react';
import { Round } from '../../types/golf';

interface HeaderProps {
  round: Round | null;
  userName?: string;
  onOpenNewRound: () => void;
  onOpenCaddieChat: () => void;
  onOpenBagSettings: () => void;
  onOpenCourseSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  round,
  userName,
  onOpenNewRound,
  onOpenCaddieChat,
  onOpenBagSettings,
  onOpenCourseSearch,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0b1411]/90 backdrop-blur-md border-b border-emerald-900/30 px-4 pt-3 pb-3">
      <div className="flex items-center justify-between">
        {/* Logo and Golf Course Info (Clickable for instant course search) */}
        <div
          onClick={onOpenCourseSearch}
          className="flex items-center gap-2.5 cursor-pointer group"
          title="골프 코스 검색 및 변경"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-900/30 border border-emerald-400/30 group-hover:scale-105 transition-transform">
            <Flag className="text-white fill-white/20" size={18} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold tracking-wider text-emerald-400 uppercase">Caddie Pro</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="flex items-center gap-1">
              <h1 className="text-sm font-bold text-white tracking-tight truncate max-w-[155px] group-hover:text-emerald-300 transition-colors">
                {round ? round.courseName : '골프 코스 선택'}
              </h1>
              <Search size={12} className="text-emerald-400/70 group-hover:text-emerald-300" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-1.5">
          {/* AI Caddie Chat Button */}
          <button
            onClick={onOpenCaddieChat}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25 active:scale-95 transition-all text-xs font-semibold shadow-sm shadow-emerald-950"
            title="AI 캐디 매니저 상담"
          >
            <Sparkles size={13} className="text-amber-300 animate-pulse" />
            <span>캐디 톡</span>
          </button>

          {/* Club Bag Settings */}
          <button
            onClick={onOpenBagSettings}
            className="p-1.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-300 hover:text-white active:scale-95 transition-all"
            title="나의 클럽별 비거리 설정"
          >
            <SlidersHorizontal size={16} />
          </button>

          {/* New Round Setup Button */}
          <button
            onClick={onOpenNewRound}
            className="p-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 active:scale-95 transition-all shadow-md shadow-emerald-900/30"
            title="새 라운드 생성"
          >
            <PlusCircle size={16} />
          </button>
        </div>
      </div>

      {/* Round Sub-info Bar */}
      {round && (
        <div className="mt-2 pt-2 border-t border-emerald-950 flex items-center justify-between text-[11px] text-slate-400">
          <div
            onClick={onOpenCourseSearch}
            className="flex items-center gap-1.5 cursor-pointer hover:text-emerald-300 transition-colors truncate max-w-[210px]"
          >
            <span className="text-white font-bold">{userName || round.players[0]?.name}</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-300 font-medium truncate">{round.courseSection}</span>
            <span className="text-slate-600">•</span>
            <span>{round.teeOffTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="capitalize px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700 text-[10px]">
              {round.teeBox.toUpperCase()} TEE
            </span>
            <span className="text-slate-400 flex items-center gap-0.5">
              <Compass size={11} className="text-emerald-400" />
              {round.windSpeed}m/s
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
