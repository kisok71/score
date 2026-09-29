// src/components/round/HoleScoreInput.tsx
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  HoleInfo,
  HoleScore,
  Player,
  FairwayHit,
  GreenHit,
} from '../../types/golf';
import { classifyScore } from '../../utils/golfCalculator';
import {
  Plus,
  Minus,
  HelpCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Compass,
} from 'lucide-react';

interface HoleScoreInputProps {
  hole: HoleInfo;
  player: Player;
  onUpdateScore: (holeNum: number, score: Partial<HoleScore>) => void;
  onPrevHole: () => void;
  onNextHole: () => void;
  onOpenPenaltyGuide: () => void;
  onOpenStrategy: () => void;
}

export const HoleScoreInput: React.FC<HoleScoreInputProps> = ({
  hole,
  player,
  onUpdateScore,
  onPrevHole,
  onNextHole,
  onOpenPenaltyGuide,
  onOpenStrategy,
}) => {
  const [isDetailedMode, setIsDetailedMode] = useState<boolean>(false);
  const [isMeter, setIsMeter] = useState<boolean>(true);

  const currentScore: HoleScore = player.scores[hole.holeNumber] || {
    holeNumber: hole.holeNumber,
    strokes: hole.par,
    putts: 2,
    obCount: 0,
    hazardCount: 0,
    bunkerCount: 0,
    fairwayHit: hole.par >= 4 ? 'hit' : 'none',
    gir: 'on',
    sandSave: false,
    notes: '',
  };

  const scoreClass = classifyScore(hole.par, currentScore.strokes);

  // Trigger celebration on good scores!
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#10b981', '#f59e0b', '#3b82f6', '#ec4899', '#ffffff'],
    });
  };

  const handleSetStrokes = (strokes: number) => {
    const updated = Math.max(1, strokes);
    if (updated < hole.par || (updated === 1)) {
      triggerConfetti();
    }
    onUpdateScore(hole.holeNumber, { strokes: updated });
  };

  const handleQuickScoreType = (diff: number) => {
    const targetStrokes = Math.max(1, hole.par + diff);
    if (diff < 0) {
      triggerConfetti();
    }
    onUpdateScore(hole.holeNumber, { strokes: targetStrokes });
  };

  return (
    <div className="p-4 space-y-4 max-w-full">
      {/* Hole Header Card */}
      <div className="bg-gradient-to-br from-[#12241d] to-[#0c1813] border border-emerald-800/40 rounded-3xl p-4 shadow-xl relative overflow-hidden">
        {/* Background glow badge */}
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-white tracking-tight">
              HOLE {hole.holeNumber}
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              PAR {hole.par}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              HDCP {hole.handicap}
            </span>
          </div>

          {/* Unit Toggle & Strategy Shortcut */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsMeter(!isMeter)}
              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-semibold"
            >
              {isMeter ? 'M' : 'YD'}
            </button>
            <button
              onClick={onOpenStrategy}
              className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold hover:bg-emerald-500/30 active:scale-95 transition-all"
            >
              <Compass size={12} className="animate-spin-slow" />
              <span>공략 맵</span>
            </button>
          </div>
        </div>

        {/* Distance, Elevation & Shape */}
        <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-emerald-900/40 text-xs">
          <div className="bg-black/20 rounded-xl py-1.5 px-2">
            <span className="text-[10px] text-slate-400 block">전장 거리</span>
            <span className="font-bold text-white text-sm">
              {isMeter ? `${hole.distanceMeter}m` : `${hole.distanceYard}yd`}
            </span>
          </div>
          <div className="bg-black/20 rounded-xl py-1.5 px-2">
            <span className="text-[10px] text-slate-400 block">고저차</span>
            <span className={`font-bold text-sm flex items-center justify-center gap-0.5 ${
              hole.elevationMeter > 0 ? 'text-amber-400' : hole.elevationMeter < 0 ? 'text-blue-400' : 'text-slate-300'
            }`}>
              {hole.elevationMeter > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {hole.elevationMeter > 0 ? `+${hole.elevationMeter}m` : `${hole.elevationMeter}m`}
            </span>
          </div>
          <div className="bg-black/20 rounded-xl py-1.5 px-2">
            <span className="text-[10px] text-slate-400 block">홀 형태</span>
            <span className="font-bold text-emerald-300 text-xs truncate capitalize">
              {hole.shape === 'dogleg-left' ? '좌도그렉' : hole.shape === 'dogleg-right' ? '우도그렉' : hole.shape === 'island' ? '아일랜드' : '직선형'}
            </span>
          </div>
        </div>

        {/* Quick Caddie Voice Bubble */}
        <div className="mt-3 bg-emerald-950/40 border border-emerald-800/30 rounded-2xl p-2.5 flex items-start gap-2 text-xs">
          <Sparkles size={14} className="text-amber-400 shrink-0 mt-0.5" />
          <p className="text-emerald-100/90 text-[11px] leading-tight line-clamp-2">
            <span className="text-emerald-400 font-bold">캐디 팁:</span> {hole.caddieStrategy.caddieVoice}
          </p>
        </div>
      </div>

      {/* Active Golfer Status Banner */}
      <div className="flex items-center justify-between px-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
          <span className="font-bold text-white text-xs">{player.name}님의 라운드</span>
        </div>
        <span className="text-[11px] text-emerald-400/80 font-mono bg-emerald-950/60 border border-emerald-900/60 px-2 py-0.5 rounded-full">
          HDCP {player.handicap}
        </span>
      </div>

      {/* Main Score Input Section */}
      <div className="bg-[#111a16] border border-emerald-900/40 rounded-3xl p-4 space-y-4 shadow-xl">
        {/* Current Result Banner */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">현재 타수 판정</span>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${scoreClass.badgeColor} ${scoreClass.borderClass}`}>
              {scoreClass.name}
            </span>
          </div>
          {/* Mode Switcher */}
          <button
            onClick={() => setIsDetailedMode(!isDetailedMode)}
            className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <span>{isDetailedMode ? '간편 모드로 전환' : '정밀 기록 모드'}</span>
            <span className="text-[10px] px-1 rounded bg-emerald-950 border border-emerald-800">
              {isDetailedMode ? '간편' : '정밀'}
            </span>
          </button>
        </div>

        {/* Large Stroke Stepper */}
        <div className="flex items-center justify-between gap-3 bg-black/40 rounded-2xl p-3 border border-emerald-950">
          <button
            onClick={() => handleSetStrokes(currentScore.strokes - 1)}
            disabled={currentScore.strokes <= 1}
            className="w-14 h-14 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-white text-2xl font-bold transition-all border border-slate-700"
          >
            <Minus size={22} />
          </button>

          <div className="flex flex-col items-center justify-center">
            <span className="text-5xl font-black text-white font-mono tracking-tight">
              {currentScore.strokes}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {currentScore.strokes === hole.par
                ? 'EVEN PAR'
                : currentScore.strokes > hole.par
                ? `+${currentScore.strokes - hole.par} OVER`
                : `${currentScore.strokes - hole.par} UNDER`}
            </span>
          </div>

          <button
            onClick={() => handleSetStrokes(currentScore.strokes + 1)}
            className="w-14 h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 flex items-center justify-center text-white text-2xl font-bold transition-all border border-emerald-400 shadow-lg shadow-emerald-950"
          >
            <Plus size={22} />
          </button>
        </div>

        {/* Quick One-Touch Buttons (Eagle, Birdie, Par, Bogey, Double, Triple) */}
        <div>
          <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">원터치 빠른 타수 선택</span>
          <div className="grid grid-cols-5 gap-1.5">
            <button
              onClick={() => handleQuickScoreType(-1)}
              className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                currentScore.strokes === hole.par - 1
                  ? 'bg-emerald-600 border-emerald-400 text-white shadow-md'
                  : 'bg-slate-900/80 border-slate-800 text-emerald-400 hover:border-emerald-600'
              }`}
            >
              버디 (-1)
            </button>
            <button
              onClick={() => handleQuickScoreType(0)}
              className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                currentScore.strokes === hole.par
                  ? 'bg-slate-700 border-slate-400 text-white shadow-md'
                  : 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-slate-600'
              }`}
            >
              파 (Even)
            </button>
            <button
              onClick={() => handleQuickScoreType(1)}
              className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                currentScore.strokes === hole.par + 1
                  ? 'bg-blue-800 border-blue-400 text-white shadow-md'
                  : 'bg-slate-900/80 border-slate-800 text-blue-300 hover:border-blue-700'
              }`}
            >
              보기 (+1)
            </button>
            <button
              onClick={() => handleQuickScoreType(2)}
              className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                currentScore.strokes === hole.par + 2
                  ? 'bg-rose-900 border-rose-500 text-white shadow-md'
                  : 'bg-slate-900/80 border-slate-800 text-rose-300 hover:border-rose-800'
              }`}
            >
              더블 (+2)
            </button>
            <button
              onClick={() => handleQuickScoreType(3)}
              className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                currentScore.strokes === hole.par + 3
                  ? 'bg-red-950 border-red-600 text-white shadow-md'
                  : 'bg-slate-900/80 border-slate-800 text-red-400 hover:border-red-900'
              }`}
            >
              트리플 (+3)
            </button>
          </div>
        </div>

        {/* Putting Count Selector */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-slate-400 font-medium">퍼트 수 (Putts)</span>
            <span className="text-[10px] text-emerald-400 font-mono">
              샷: {Math.max(0, currentScore.strokes - currentScore.putts)}회 + 퍼트: {currentScore.putts}회
            </span>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {[0, 1, 2, 3, 4].map((p) => {
              const isPuttSelected = currentScore.putts === p;
              return (
                <button
                  key={p}
                  onClick={() => onUpdateScore(hole.holeNumber, { putts: p })}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    isPuttSelected
                      ? 'bg-emerald-500 border-emerald-300 text-black font-extrabold shadow-md'
                      : 'bg-black/30 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {p === 0 ? '칩인 (0)' : `${p}퍼트`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Penalties: OB & Hazard Handling (Requirement #3) */}
        <div className="pt-2 border-t border-emerald-950/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
              벌타 및 페널티 처리
            </span>
            <button
              onClick={onOpenPenaltyGuide}
              className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
            >
              <HelpCircle size={12} />
              <span>OB/해저드 룰 가이드</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* OB Stepper */}
            <div className={`p-2.5 rounded-2xl border transition-all ${
              currentScore.obCount > 0 ? 'bg-red-950/40 border-red-700/60' : 'bg-black/30 border-slate-800/80'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-red-300 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-white border border-red-500" />
                  OB (+2벌타)
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {currentScore.obCount > 0 ? `+${currentScore.obCount * 2}타 부여` : '0회'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    const newCount = Math.max(0, currentScore.obCount - 1);
                    onUpdateScore(hole.holeNumber, { obCount: newCount });
                  }}
                  disabled={currentScore.obCount === 0}
                  className="w-8 h-8 rounded-lg bg-slate-800 disabled:opacity-20 text-slate-200 flex items-center justify-center font-bold"
                >
                  <Minus size={14} />
                </button>
                <span className="font-bold text-base text-white">{currentScore.obCount}</span>
                <button
                  onClick={() => {
                    const newCount = currentScore.obCount + 1;
                    onUpdateScore(hole.holeNumber, {
                      obCount: newCount,
                      strokes: currentScore.strokes + 2 // auto add 2 strokes
                    });
                  }}
                  className="w-8 h-8 rounded-lg bg-red-900/60 hover:bg-red-800 border border-red-600 text-white flex items-center justify-center font-bold"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Hazard / Penalty Area Stepper */}
            <div className={`p-2.5 rounded-2xl border transition-all ${
              currentScore.hazardCount > 0 ? 'bg-amber-950/40 border-amber-700/60' : 'bg-black/30 border-slate-800/80'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-yellow-400" />
                  해저드 (+1벌타)
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {currentScore.hazardCount > 0 ? `+${currentScore.hazardCount}타 부여` : '0회'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    const newCount = Math.max(0, currentScore.hazardCount - 1);
                    onUpdateScore(hole.holeNumber, { hazardCount: newCount });
                  }}
                  disabled={currentScore.hazardCount === 0}
                  className="w-8 h-8 rounded-lg bg-slate-800 disabled:opacity-20 text-slate-200 flex items-center justify-center font-bold"
                >
                  <Minus size={14} />
                </button>
                <span className="font-bold text-base text-white">{currentScore.hazardCount}</span>
                <button
                  onClick={() => {
                    const newCount = currentScore.hazardCount + 1;
                    onUpdateScore(hole.holeNumber, {
                      hazardCount: newCount,
                      strokes: currentScore.strokes + 1 // auto add 1 stroke
                    });
                  }}
                  className="w-8 h-8 rounded-lg bg-amber-900/60 hover:bg-amber-800 border border-amber-600 text-white flex items-center justify-center font-bold"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Mode: Fairway Hit, GIR, Bunker, Notes */}
        {isDetailedMode && (
          <div className="pt-3 border-t border-emerald-950/80 space-y-3">
            {/* Fairway Hit (FIR) - only for Par 4/5 */}
            {hole.par >= 4 && (
              <div>
                <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">티샷 페어웨이 안착 (FIR)</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['left', 'hit', 'right'] as FairwayHit[]).map((val) => {
                    const isSelected = currentScore.fairwayHit === val;
                    return (
                      <button
                        key={val}
                        onClick={() => onUpdateScore(hole.holeNumber, { fairwayHit: val })}
                        className={`py-1.5 rounded-xl text-xs font-bold transition-all border ${
                          isSelected
                            ? val === 'hit'
                              ? 'bg-emerald-600 border-emerald-400 text-white'
                              : 'bg-amber-900/60 border-amber-500 text-amber-200'
                            : 'bg-black/30 border-slate-800 text-slate-400'
                        }`}
                      >
                        {val === 'left' ? '← 좌측 러프' : val === 'hit' ? '🎯 페어웨이 안착' : '우측 러프 →'}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Green In Regulation (GIR) */}
            <div>
              <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">그린 적중 (GIR, 온그린 여부)</span>
              <div className="grid grid-cols-2 gap-2">
                {(['on', 'miss'] as GreenHit[]).map((val) => {
                  const isSelected = currentScore.gir === val;
                  return (
                    <button
                      key={val}
                      onClick={() => onUpdateScore(hole.holeNumber, { gir: val })}
                      className={`py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        isSelected
                          ? val === 'on'
                            ? 'bg-emerald-600 border-emerald-400 text-white'
                            : 'bg-slate-800 border-slate-600 text-slate-300'
                          : 'bg-black/30 border-slate-800 text-slate-400'
                      }`}
                    >
                      {val === 'on' ? '⛳ 그린 적중 (On Green)' : '❌ 그린 놓침 (Miss)'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bunker shot count & Sand save */}
            <div className="flex items-center justify-between bg-black/30 p-2.5 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-300 font-medium">벙커 샷 횟수</span>
              <div className="flex items-center gap-2">
                {[0, 1, 2, 3].map((b) => (
                  <button
                    key={b}
                    onClick={() => onUpdateScore(hole.holeNumber, { bunkerCount: b })}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                      currentScore.bunkerCount === b
                        ? 'bg-amber-600 text-white font-extrabold'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes input */}
            <div>
              <span className="text-[11px] text-slate-400 block mb-1 font-medium">홀 메모 (캐디 노트)</span>
              <input
                type="text"
                value={currentScore.notes || ''}
                onChange={(e) => onUpdateScore(hole.holeNumber, { notes: e.target.value })}
                placeholder="예: 7번 아이언 핀 2m 온그린, 버디 성공!"
                className="w-full bg-black/40 border border-emerald-950 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Prev / Next Hole Navigation Footer */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          onClick={onPrevHole}
          disabled={hole.holeNumber === 1}
          className="flex-1 py-3 rounded-2xl bg-slate-900 border border-slate-800 disabled:opacity-30 disabled:pointer-events-none text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
        >
          <ChevronLeft size={16} />
          <span>{hole.holeNumber === 1 ? '첫 번째 홀' : `${hole.holeNumber - 1}번홀`}</span>
        </button>

        <button
          onClick={onNextHole}
          disabled={hole.holeNumber === 18}
          className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 disabled:pointer-events-none text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-lg shadow-emerald-950"
        >
          <span>{hole.holeNumber === 18 ? '라운드 완료' : `${hole.holeNumber + 1}번홀`}</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
