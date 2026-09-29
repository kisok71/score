// src/components/course/CourseStrategyMap.tsx
import React, { useState } from 'react';
import { HoleInfo, PlayerClubProfile, Round } from '../../types/golf';
import {
  ShieldCheck,
  Zap,
  Wind,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Info,
  Navigation,
} from 'lucide-react';

interface CourseStrategyMapProps {
  hole: HoleInfo;
  round: Round | null;
  clubProfile: PlayerClubProfile;
}

export const CourseStrategyMap: React.FC<CourseStrategyMapProps> = ({
  hole,
  round,
  clubProfile,
}) => {
  const [selectedStrategy, setSelectedStrategy] = useState<'safe' | 'attack'>('safe');
  const [simulatedClub, setSimulatedClub] = useState<string>('driver');

  // Club distance simulation
  const clubDistances: Record<string, { name: string; dist: number }> = {
    driver: { name: '드라이버', dist: clubProfile.driverDistance },
    wood3: { name: '3번 우드', dist: clubProfile.wood3Distance },
    utility: { name: '유틸리티', dist: clubProfile.utilityDistance },
    iron7: { name: '7번 아이언', dist: clubProfile.iron7Distance },
  };

  const currentDist = clubDistances[simulatedClub]?.dist || clubProfile.driverDistance;

  // Elevation and wind compensation
  const windEffect = round ? round.windSpeed * 3 : 6; // ~3m per m/s
  const elevationEffect = hole.elevationMeter * 1.0;
  const realDistanceNeeded = Math.round(hole.distanceMeter + elevationEffect + (round?.windSpeed ? 5 : 0));

  // Determine SVG path points based on hole shape
  const isDoglegLeft = hole.shape === 'dogleg-left';
  const isDoglegRight = hole.shape === 'dogleg-right';
  const isIsland = hole.shape === 'island';

  // SVG dimensions
  const svgWidth = 360;
  const svgHeight = 440;

  // Pin coords (top of hole)
  const pinX = isDoglegLeft ? 130 : isDoglegRight ? 230 : 180;
  const pinY = 65;

  // Tee coords (bottom of hole)
  const teeX = 180;
  const teeY = 390;

  // Mid landing zone (fairway)
  const midX = isDoglegLeft ? 150 : isDoglegRight ? 210 : 180;
  const midY = 220;

  // Attack landing zone
  const attackX = isDoglegLeft ? 120 : isDoglegRight ? 240 : 180;
  const attackY = 175;

  // Safe landing zone
  const safeX = isDoglegLeft ? 180 : isDoglegRight ? 180 : 180;
  const safeY = 240;

  return (
    <div className="p-4 space-y-4 max-w-full">
      {/* Strategy Header */}
      <div className="bg-[#101b16] border border-emerald-900/60 rounded-3xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-white">
              {hole.holeNumber}H 코스 공략 가이드
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
              PAR {hole.par}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-black/40 px-2.5 py-1 rounded-xl border border-emerald-950">
            <Navigation size={13} className="text-emerald-400" />
            <span className="font-bold text-white">{hole.distanceMeter}m</span>
            <span className="text-[10px] text-slate-400">({hole.distanceYard}yd)</span>
          </div>
        </div>

        {/* Real Adjusted Distance Info */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs bg-black/30 p-2.5 rounded-2xl border border-emerald-950/70">
          <div>
            <span className="text-[10px] text-slate-400 block">실제 공략 거리</span>
            <span className="text-sm font-extrabold text-amber-300">{realDistanceNeeded}m</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">고저차 보정</span>
            <span className={`text-xs font-bold flex items-center justify-center gap-0.5 mt-0.5 ${
              hole.elevationMeter > 0 ? 'text-rose-400' : 'text-blue-400'
            }`}>
              {hole.elevationMeter > 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {hole.elevationMeter > 0 ? `+${hole.elevationMeter}m` : `${hole.elevationMeter}m`}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">바람 영향</span>
            <span className="text-xs font-bold text-cyan-300 flex items-center justify-center gap-0.5 mt-0.5">
              <Wind size={11} />
              {round ? `${round.windSpeed}m/s` : '2m/s'}
            </span>
          </div>
        </div>

        {/* Strategy Switcher (Safe vs Attack) */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button
            onClick={() => setSelectedStrategy('safe')}
            className={`py-2 px-3 rounded-2xl border flex items-center justify-center gap-1.5 text-xs font-bold transition-all ${
              selectedStrategy === 'safe'
                ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-950 ring-2 ring-emerald-400/30'
                : 'bg-black/30 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck size={15} />
            <span>안전 코스 공략 (추천)</span>
          </button>
          <button
            onClick={() => setSelectedStrategy('attack')}
            className={`py-2 px-3 rounded-2xl border flex items-center justify-center gap-1.5 text-xs font-bold transition-all ${
              selectedStrategy === 'attack'
                ? 'bg-amber-600 border-amber-400 text-white shadow-lg shadow-amber-950 ring-2 ring-amber-400/30'
                : 'bg-black/30 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap size={15} />
            <span>공격적 버디 트라이</span>
          </button>
        </div>
      </div>

      {/* Visual SVG Hole Layout Map */}
      <div className="bg-gradient-to-b from-[#091510] via-[#0d2119] to-[#07130e] border border-emerald-900/50 rounded-3xl p-3 shadow-2xl relative overflow-hidden flex flex-col items-center">
        {/* Top Badges overlay on Map */}
        <div className="w-full flex items-center justify-between text-[11px] px-2 mb-1 z-10">
          <span className="text-slate-400 font-medium">⛳ 필드 레이아웃 조감도</span>
          <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800/60 font-mono">
            {selectedStrategy === 'safe' ? '안전 루트 시각화' : '공격 루트 시각화'}
          </span>
        </div>

        {/* Interactive SVG Field Canvas */}
        <div className="w-full relative flex justify-center py-1">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full max-w-[340px] h-auto drop-shadow-2xl select-none"
          >
            <defs>
              {/* Gradients */}
              <linearGradient id="roughGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#081811" />
                <stop offset="100%" stopColor="#05100c" />
              </linearGradient>

              <linearGradient id="fairwayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e5238" />
                <stop offset="50%" stopColor="#15422d" />
                <stop offset="100%" stopColor="#133d2a" />
              </linearGradient>

              <linearGradient id="greenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>

              <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>

              <pattern id="sandPat" width="6" height="6" patternUnits="userSpaceOnUse">
                <rect width="6" height="6" fill="#d97706" />
                <circle cx="2" cy="2" r="0.75" fill="#fef3c7" opacity="0.6" />
                <circle cx="5" cy="5" r="0.6" fill="#b45309" opacity="0.6" />
              </pattern>
            </defs>

            {/* Background Rough Turf */}
            <rect width={svgWidth} height={svgHeight} rx="24" fill="url(#roughGrad)" />

            {/* Out of Bounds Line (OB Stakes on Left/Right) */}
            <line x1="25" y1="50" x2="25" y2="400" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />
            <text x="30" y="240" fill="#ef4444" fontSize="10" fontWeight="bold" opacity="0.8">OB 흰색 말뚝</text>

            <line x1="335" y1="50" x2="335" y2="400" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />

            {/* Fairway Contour Shape */}
            {isDoglegLeft ? (
              <path
                d="M140 375 C 130 310, 110 260, 120 200 C 130 140, 120 110, 130 75 L 170 75 C 180 120, 200 180, 220 240 C 230 300, 220 340, 210 375 Z"
                fill="url(#fairwayGrad)"
                stroke="#2d7a54"
                strokeWidth="1.5"
              />
            ) : isDoglegRight ? (
              <path
                d="M150 375 C 140 330, 130 280, 145 230 C 160 170, 200 130, 225 75 L 265 75 C 255 120, 245 160, 235 210 C 220 270, 225 320, 215 375 Z"
                fill="url(#fairwayGrad)"
                stroke="#2d7a54"
                strokeWidth="1.5"
              />
            ) : (
              <path
                d="M145 375 C 135 310, 130 230, 140 160 C 145 110, 150 85, 155 75 L 205 75 C 210 85, 215 110, 220 160 C 230 230, 225 310, 215 375 Z"
                fill="url(#fairwayGrad)"
                stroke="#2d7a54"
                strokeWidth="1.5"
              />
            )}

            {/* Water Hazard (if applicable) */}
            {(hole.par >= 4 || isIsland) && (
              <g>
                <path
                  d={
                    isIsland
                      ? "M 90 40 Q 180 20 270 40 Q 300 90 270 120 Q 180 140 90 120 Q 60 80 90 40 Z"
                      : "M 225 180 Q 275 160 295 210 Q 285 260 240 240 Z"
                  }
                  fill="url(#waterGrad)"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  opacity="0.85"
                />
                <text
                  x={isIsland ? 180 : 255}
                  y={isIsland ? 32 : 215}
                  fill="#7dd3fc"
                  fontSize="9"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  워터 해저드
                </text>
              </g>
            )}

            {/* Bunkers */}
            <g>
              {/* Green Bunker Left */}
              <ellipse cx={pinX - 35} cy={pinY + 12} rx="14" ry="9" fill="url(#sandPat)" stroke="#f59e0b" strokeWidth="1" />
              {/* Green Bunker Right */}
              <ellipse cx={pinX + 38} cy={pinY + 15} rx="16" ry="10" fill="url(#sandPat)" stroke="#f59e0b" strokeWidth="1" />
              {/* Fairway Bunker (Landing Zone) */}
              <ellipse cx={isDoglegRight ? 215 : 145} cy="235" rx="18" ry="12" fill="url(#sandPat)" stroke="#f59e0b" strokeWidth="1" />
              <text x={isDoglegRight ? 215 : 145} y="253" fill="#fbbf24" fontSize="8" fontWeight="bold" textAnchor="middle">
                벙커 (215m)
              </text>
            </g>

            {/* Green (Putting Surface) */}
            <ellipse cx={pinX} cy={pinY} rx="30" ry="24" fill="url(#greenGrad)" stroke="#6ee7b7" strokeWidth="2" />
            <text x={pinX} y={pinY + 18} fill="#a7f3d0" fontSize="8" fontWeight="bold" textAnchor="middle">
              GREEN
            </text>

            {/* Pin Flag with Animation */}
            <g transform={`translate(${pinX}, ${pinY - 14})`}>
              <line x1="0" y1="0" x2="0" y2="18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              {/* Red triangular flag */}
              <polygon points="0,0 12,4 0,8" fill="#ef4444" />
              {/* Hole cup */}
              <ellipse cx="0" cy="18" rx="3.5" ry="1.5" fill="#000000" />
            </g>

            {/* Distance Arc Circles (100m, 150m, 200m from green) */}
            <path d={`M ${pinX - 80} ${pinY + 90} A 120 120 0 0 0 ${pinX + 80} ${pinY + 90}`} fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
            <text x={pinX + 85} y={pinY + 95} fill="#94a3b8" fontSize="8">100m</text>

            <path d={`M ${pinX - 110} ${pinY + 150} A 180 180 0 0 0 ${pinX + 110} ${pinY + 150}`} fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
            <text x={pinX + 115} y={pinY + 155} fill="#94a3b8" fontSize="8">150m</text>

            {/* Tee Box */}
            <g transform={`translate(${teeX}, ${teeY})`}>
              <rect x="-35" y="-12" width="70" height="24" rx="12" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              {/* Tee markers */}
              <circle cx="-20" cy="0" r="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
              <circle cx="20" cy="0" r="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
              <text x="0" y="3" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                TEE BOX
              </text>
            </g>

            {/* Strategy Shot Paths */}
            {selectedStrategy === 'safe' ? (
              // Safe Route (Teebox -> Safe Zone -> Green)
              <g>
                {/* Shot 1: Tee to Safe zone */}
                <path
                  d={`M ${teeX} ${teeY - 12} Q ${safeX + 10} ${(teeY + safeY) / 2} ${safeX} ${safeY}`}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                />
                {/* Landing marker 1 */}
                <circle cx={safeX} cy={safeY} r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                <text x={safeX} y={safeY + 3} fill="#000000" fontSize="8" fontWeight="bold" textAnchor="middle">1</text>
                <text x={safeX + 26} y={safeY + 3} fill="#34d399" fontSize="9" fontWeight="bold">210m 안착</text>

                {/* Shot 2: Approach to Green */}
                <path
                  d={`M ${safeX} ${safeY} Q ${(safeX + pinX) / 2} ${(safeY + pinY) / 2} ${pinX} ${pinY + 5}`}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  strokeDasharray="5 3"
                  strokeLinecap="round"
                />
                <circle cx={pinX} cy={pinY + 5} r="6" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                <text x={pinX} y={pinY + 8} fill="#000000" fontSize="7" fontWeight="bold" textAnchor="middle">2</text>
              </g>
            ) : (
              // Attack Route (Teebox -> Direct Attack Zone -> Green)
              <g>
                {/* Shot 1: Long aggressive tee shot */}
                <path
                  d={`M ${teeX} ${teeY - 12} Q ${attackX} ${(teeY + attackY) / 2} ${attackX} ${attackY}`}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3.5"
                  strokeDasharray="6 3"
                  strokeLinecap="round"
                />
                {/* Landing marker 1 */}
                <circle cx={attackX} cy={attackY} r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                <text x={attackX} y={attackY + 3} fill="#000000" fontSize="8" fontWeight="bold" textAnchor="middle">1</text>
                <text x={attackX - 35} y={attackY + 3} fill="#fbbf24" fontSize="9" fontWeight="bold">240m 캐리</text>

                {/* Shot 2: Wedge to pin */}
                <path
                  d={`M ${attackX} ${attackY} L ${pinX} ${pinY + 5}`}
                  fill="none"
                  stroke="#ec4899"
                  strokeWidth="3"
                  strokeDasharray="4 3"
                  strokeLinecap="round"
                />
                <circle cx={pinX} cy={pinY + 5} r="6" fill="#ec4899" stroke="#ffffff" strokeWidth="2" />
                <text x={pinX} y={pinY + 8} fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">2</text>
              </g>
            )}

            {/* Player's Simulated Club Distance Arc */}
            <g>
              <circle
                cx={teeX}
                cy={teeY - 12 - (currentDist * 0.95)}
                r="4"
                fill="#38bdf8"
                className="animate-ping"
              />
              <circle
                cx={teeX}
                cy={teeY - 12 - (currentDist * 0.95)}
                r="4"
                fill="#38bdf8"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
            </g>
          </svg>
        </div>

        {/* Club Simulation Quick Filter */}
        <div className="w-full pt-2 border-t border-emerald-950 flex items-center justify-between">
          <span className="text-[10px] text-slate-400 font-medium">내 클럽 비거리 확인:</span>
          <div className="flex items-center gap-1.5">
            {Object.entries(clubDistances).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setSimulatedClub(key)}
                className={`text-[10px] px-2 py-0.5 rounded-lg font-bold transition-all ${
                  simulatedClub === key
                    ? 'bg-emerald-500 text-black shadow'
                    : 'bg-black/40 text-slate-400 hover:text-slate-200'
                }`}
              >
                {data.name} ({data.dist}m)
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Caddie Strategy & Key Advice Cards */}
      <div className="space-y-3">
        {/* Recommended Route Strategy Detail */}
        <div className={`p-4 rounded-3xl border transition-all ${
          selectedStrategy === 'safe'
            ? 'bg-emerald-950/30 border-emerald-700/50'
            : 'bg-amber-950/30 border-amber-700/50'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {selectedStrategy === 'safe' ? (
              <ShieldCheck className="text-emerald-400" size={18} />
            ) : (
              <Zap className="text-amber-400" size={18} />
            )}
            <h3 className="text-sm font-bold text-white">
              {selectedStrategy === 'safe' ? '안전 루트 세부 공략' : '공격적 버디 루트 세부 공략'}
            </h3>
            <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-black/40 text-slate-300 font-mono">
              추천 클럽: {hole.caddieStrategy.recommendedClub}
            </span>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed">
            {selectedStrategy === 'safe'
              ? hole.caddieStrategy.safeRoute
              : hole.caddieStrategy.attackRoute}
          </p>
        </div>

        {/* Hazard / Key Warning Notice */}
        <div className="bg-red-950/20 border border-red-900/40 rounded-2xl p-3 flex items-start gap-2.5">
          <Info size={16} className="text-red-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-red-300 block mb-0.5">캐디 매니저의 핵심 주의구간:</span>
            <p className="text-slate-300 leading-tight">{hole.caddieStrategy.keyWarning}</p>
          </div>
        </div>

        {/* Personal Caddie Voice Box */}
        <div className="bg-gradient-to-r from-emerald-950/50 to-slate-900/80 border border-emerald-800/40 rounded-2xl p-3.5 flex items-start gap-3 shadow-lg">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0">
            <Sparkles size={16} className="text-amber-300" />
          </div>
          <div className="text-xs">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="font-bold text-emerald-400">전담 캐디 매니저 조언</span>
              <span className="text-[10px] text-slate-500">실시간 피드백</span>
            </div>
            <p className="text-slate-200 italic leading-relaxed">
              "{hole.caddieStrategy.caddieVoice}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
