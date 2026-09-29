// src/components/round/HoleNavigator.tsx
import React, { useRef, useEffect } from 'react';
import { HoleInfo, Player } from '../../types/golf';
import { classifyScore } from '../../utils/golfCalculator';

interface HoleNavigatorProps {
  holes: HoleInfo[];
  activeHoleNumber: number;
  onSelectHole: (holeNum: number) => void;
  player: Player;
}

export const HoleNavigator: React.FC<HoleNavigatorProps> = ({
  holes,
  activeHoleNumber,
  onSelectHole,
  player,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active hole into view smoothly
  useEffect(() => {
    if (scrollRef.current) {
      const activeEl = scrollRef.current.querySelector(`[data-hole="${activeHoleNumber}"]`) as HTMLElement;
      if (activeEl) {
        const container = scrollRef.current;
        const left = activeEl.offsetLeft - container.offsetWidth / 2 + activeEl.offsetWidth / 2;
        container.scrollTo({ left, behavior: 'smooth' });
      }
    }
  }, [activeHoleNumber]);

  return (
    <div className="bg-[#0b1411] border-b border-emerald-950/60 py-2.5 px-3">
      {/* Front 9 / Back 9 Quick Jump Controls */}
      <div className="flex items-center justify-between mb-2 px-1 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectHole(1)}
            className={`px-2.5 py-0.5 rounded-md font-semibold text-[11px] transition-all ${
              activeHoleNumber <= 9
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            전반 OUT (1~9H)
          </button>
          <button
            onClick={() => onSelectHole(10)}
            className={`px-2.5 py-0.5 rounded-md font-semibold text-[11px] transition-all ${
              activeHoleNumber > 9
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            후반 IN (10~18H)
          </button>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">
          <strong className="text-emerald-400">{activeHoleNumber}</strong> / 18 HOLES
        </span>
      </div>

      {/* Horizontal Scrollable Hole Strip */}
      <div
        ref={scrollRef}
        className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {holes.map((hole) => {
          const isActive = hole.holeNumber === activeHoleNumber;
          const score = player.scores[hole.holeNumber];
          const hasScore = score && score.strokes > 0;
          const scoreClass = hasScore ? classifyScore(hole.par, score.strokes) : null;

          return (
            <button
              key={hole.holeNumber}
              data-hole={hole.holeNumber}
              onClick={() => onSelectHole(hole.holeNumber)}
              className={`shrink-0 w-13 h-15 rounded-xl flex flex-col items-center justify-center p-1 transition-all relative border ${
                isActive
                  ? 'bg-gradient-to-b from-emerald-600 to-emerald-800 border-emerald-400 text-white shadow-lg shadow-emerald-900/50 scale-105 ring-2 ring-emerald-400/40'
                  : hasScore
                  ? 'bg-slate-900/90 border-slate-700/80 text-slate-200 hover:border-slate-500'
                  : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              {/* Hole Number */}
              <span className="text-xs font-bold leading-tight flex items-center gap-0.5">
                {hole.holeNumber}H
              </span>

              {/* Par indicator */}
              <span className={`text-[10px] ${isActive ? 'text-emerald-200' : 'text-slate-500'} font-medium`}>
                P{hole.par}
              </span>

              {/* Score Badge */}
              <div className="mt-1 w-full flex justify-center">
                {hasScore ? (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full leading-none truncate max-w-full ${
                      isActive
                        ? 'bg-white text-emerald-950 font-black'
                        : scoreClass?.badgeColor || 'bg-slate-700 text-white'
                    }`}
                  >
                    {score.strokes}
                  </span>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
