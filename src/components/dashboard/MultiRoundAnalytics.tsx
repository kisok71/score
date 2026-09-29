// src/components/dashboard/MultiRoundAnalytics.tsx
import React, { useState } from 'react';
import { Course, Round } from '../../types/golf';
import {
  calculateMultiRoundStats,
  filterRounds,
  MultiRoundFilterOptions,
} from '../../utils/multiRoundAnalytics';
import {
  TrendingUp,
  Trophy,
  Target,
  Flag,
  Crosshair,
  AlertTriangle,
  Award,
  Sparkles,
  PieChart,
  Calendar,
  Layers,
  ChevronRight,
  Info,
  CheckCircle,
} from 'lucide-react';

interface MultiRoundAnalyticsProps {
  rounds: Round[];
  allCourses: Course[];
  onSelectRound?: (roundId: string) => void;
  onOpenNewRound?: () => void;
}

export const MultiRoundAnalytics: React.FC<MultiRoundAnalyticsProps> = ({
  rounds,
  allCourses,
  onSelectRound,
  onOpenNewRound,
}) => {
  const [filter, setFilter] = useState<MultiRoundFilterOptions>({
    period: '10',
    year: 'all',
  });
  const [selectedPointIndex, setSelectedPointIndex] = useState<number | null>(null);

  // Extract available years
  const availableYears = Array.from(
    new Set(rounds.map(r => r.date.slice(0, 4)).filter(Boolean))
  ).sort().reverse();

  // Filter rounds
  const filteredRounds = filterRounds(rounds, filter);
  const stats = calculateMultiRoundStats(filteredRounds, allCourses);

  // Score Trend Chart calculations
  const trendData = stats.scoreTrend;
  const minScore = trendData.length > 0 ? Math.min(...trendData.map(d => d.strokes), 72) - 2 : 68;
  const maxScore = trendData.length > 0 ? Math.max(...trendData.map(d => d.strokes), 90) + 3 : 100;
  const chartHeight = 160;
  const chartWidth = 320;
  const paddingX = 25;
  const paddingY = 25;

  const getY = (val: number) => {
    return chartHeight - paddingY - ((val - minScore) / (maxScore - minScore)) * (chartHeight - paddingY * 2);
  };

  const getX = (idx: number) => {
    if (trendData.length <= 1) return chartWidth / 2;
    return paddingX + (idx / (trendData.length - 1)) * (chartWidth - paddingX * 2);
  };

  const avgY = getY(stats.avgStrokes);
  const par72Y = getY(72);

  // Build SVG path for line
  const linePoints = trendData.map((d, i) => `${getX(i)},${getY(d.strokes)}`).join(' ');

  return (
    <div className="space-y-4">
      {/* Top Filter Controls */}
      <div className="bg-[#0c1612] border border-emerald-950 p-3 rounded-2xl space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <Layers size={14} className="text-emerald-400" />
            <span>분석 범위 선택</span>
          </span>
          <span className="text-[11px] font-mono text-emerald-400 font-bold">
            분석 대상: {stats.totalRounds}개 라운드
          </span>
        </div>

        {/* Period Buttons (최근 10경기, 최근 5경기, 전체) */}
        <div className="grid grid-cols-3 gap-1.5 pt-1">
          <button
            onClick={() => setFilter(f => ({ ...f, period: '10' }))}
            className={`py-1.5 rounded-xl font-bold text-xs transition-all ${
              filter.period === '10'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            ⭐ 최근 10경기
          </button>
          <button
            onClick={() => setFilter(f => ({ ...f, period: '5' }))}
            className={`py-1.5 rounded-xl font-bold text-xs transition-all ${
              filter.period === '5'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            최근 5경기
          </button>
          <button
            onClick={() => setFilter(f => ({ ...f, period: 'all' }))}
            className={`py-1.5 rounded-xl font-bold text-xs transition-all ${
              filter.period === 'all'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            전체 경기
          </button>
        </div>

        {/* Year Filter Pills */}
        <div className="flex items-center gap-1 pt-1 overflow-x-auto text-xs">
          <span className="text-slate-500 text-[10px] mr-1 flex-shrink-0">연도:</span>
          <button
            onClick={() => setFilter(f => ({ ...f, year: 'all' }))}
            className={`px-2 py-0.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              filter.year === 'all'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            전체 연도
          </button>
          {availableYears.map(yr => (
            <button
              key={yr}
              onClick={() => setFilter(f => ({ ...f, year: yr }))}
              className={`px-2 py-0.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filter.year === yr
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {yr}년
            </button>
          ))}
        </div>
      </div>

      {stats.totalRounds === 0 ? (
        <div className="text-center py-12 bg-[#0c1612] rounded-3xl border border-emerald-950 p-6 space-y-3">
          <Info size={36} className="text-slate-600 mx-auto" />
          <h4 className="text-sm font-bold text-slate-300">누적된 경기 기록이 없습니다</h4>
          <p className="text-xs text-slate-500">새 라운드를 등록하고 18홀 스코어를 기록하시면 투어급 누적 통계와 타수 추이 분석이 제공됩니다.</p>
          {onOpenNewRound && (
            <button
              onClick={onOpenNewRound}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-950 mt-1 active:scale-95 transition-all"
            >
              새 라운드 시작하기
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Key KPI Metrics Grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* Average Score */}
            <div className="bg-[#101b16] border border-emerald-900/50 rounded-2xl p-3 shadow-md">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>평균 타수</span>
                <TrendingUp size={13} className="text-emerald-400" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-white font-mono">{stats.avgStrokes}</span>
                <span className="text-xs text-slate-400">타</span>
                <span className={`text-xs font-bold font-mono ml-1 ${stats.avgOverPar <= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  ({stats.avgOverPar >= 0 ? `+${stats.avgOverPar}` : stats.avgOverPar})
                </span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-1">
                분석 경기 {stats.totalRounds}회 평균
              </span>
            </div>

            {/* Life Best Score */}
            <div className="bg-[#101b16] border border-emerald-900/50 rounded-2xl p-3 shadow-md">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>라이프 베스트 (라베)</span>
                <Trophy size={13} className="text-amber-400" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-amber-400 font-mono">
                  {stats.bestScore?.strokes || '-'}
                </span>
                <span className="text-xs text-slate-400">타</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-1 truncate">
                {stats.bestScore ? `${stats.bestScore.courseName.slice(0, 7)} (${stats.bestScore.date})` : '-'}
              </span>
            </div>

            {/* Fairway Accuracy (FIR) */}
            <div className="bg-[#101b16] border border-emerald-900/50 rounded-2xl p-3 shadow-md">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>평균 티샷 안착률 (FIR)</span>
                <Crosshair size={13} className="text-emerald-400" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-emerald-300 font-mono">{stats.avgFIR}%</span>
                <span className="text-[10px] text-slate-400">페어웨이</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${stats.avgFIR}%` }} />
              </div>
            </div>

            {/* Green In Regulation (GIR) */}
            <div className="bg-[#101b16] border border-emerald-900/50 rounded-2xl p-3 shadow-md">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>평균 그린 적중률 (GIR)</span>
                <Target size={13} className="text-blue-400" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-blue-400 font-mono">{stats.avgGIR}%</span>
                <span className="text-[10px] text-slate-400">온그린</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: `${stats.avgGIR}%` }} />
              </div>
            </div>

            {/* Average Putts */}
            <div className="bg-[#101b16] border border-emerald-900/50 rounded-2xl p-3 shadow-md">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>평균 퍼트 수</span>
                <Flag size={13} className="text-emerald-400" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-white font-mono">{stats.avgPutts}</span>
                <span className="text-[10px] text-slate-400">개 / 라운드</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">
                홀당 평균 {stats.avgPuttsPerHole}개
              </span>
            </div>

            {/* Average Penalty Loss */}
            <div className="bg-[#101b16] border border-emerald-900/50 rounded-2xl p-3 shadow-md">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>평균 벌타 실점</span>
                <AlertTriangle size={13} className="text-amber-400" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-amber-400 font-mono">{stats.avgPenaltyLoss}</span>
                <span className="text-[10px] text-slate-400">타 상실</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">
                OB {stats.avgOB}회 / 해저드 {stats.avgHazard}회
              </span>
            </div>
          </div>

          {/* Score Trend Timeline Chart */}
          <div className="bg-[#0f1915] border border-emerald-900/50 rounded-3xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <TrendingUp size={14} className="text-emerald-400" />
                  <span>경기별 타수 추이 그래프</span>
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">최근 라운드 시간순 스코어 궤적</p>
              </div>
              <div className="flex items-center gap-2 text-[10px]">
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-0.5 bg-emerald-400 inline-block rounded" />
                  <span className="text-slate-400">Par 72</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-0.5 bg-amber-400 inline-block rounded border-dashed" />
                  <span className="text-slate-400">평균 ({stats.avgStrokes})</span>
                </div>
              </div>
            </div>

            {/* SVG Interactive Chart */}
            <div className="w-full overflow-x-auto py-2">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-44 overflow-visible">
                <defs>
                  <linearGradient id="scoreAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid guidelines */}
                <line x1={paddingX} y1={par72Y} x2={chartWidth - paddingX} y2={par72Y} stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                <text x={paddingX - 4} y={par72Y + 3} textAnchor="end" fill="#10b981" fontSize="9" fontFamily="monospace">72</text>

                <line x1={paddingX} y1={avgY} x2={chartWidth - paddingX} y2={avgY} stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                <text x={chartWidth - paddingX + 4} y={avgY + 3} textAnchor="start" fill="#f59e0b" fontSize="8" fontFamily="monospace">{stats.avgStrokes}</text>

                {/* Area under curve */}
                {trendData.length > 1 && (
                  <path
                    d={`M ${getX(0)},${getY(trendData[0].strokes)} ${trendData.map((d, i) => `L ${getX(i)},${getY(d.strokes)}`).join(' ')} L ${getX(trendData.length - 1)},${chartHeight - paddingY} L ${getX(0)},${chartHeight - paddingY} Z`}
                    fill="url(#scoreAreaGradient)"
                  />
                )}

                {/* Line */}
                {trendData.length > 1 && (
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={linePoints}
                  />
                )}

                {/* Dots & Labels */}
                {trendData.map((point, idx) => {
                  const cx = getX(idx);
                  const cy = getY(point.strokes);
                  const isSelected = selectedPointIndex === idx;
                  const isUnder80 = point.strokes < 80;

                  return (
                    <g key={point.roundId} className="cursor-pointer" onClick={() => setSelectedPointIndex(idx)}>
                      {/* Pulse circle for selected */}
                      {isSelected && (
                        <circle cx={cx} cy={cy} r="10" fill="#10b981" fillOpacity="0.25" className="animate-ping" />
                      )}

                      {/* Main point */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isSelected ? "6" : "4.5"}
                        fill={isUnder80 ? "#fbbf24" : "#10b981"}
                        stroke="#0f1915"
                        strokeWidth="2"
                      />

                      {/* Score Value text above point */}
                      <text
                        x={cx}
                        y={cy - 8}
                        textAnchor="middle"
                        fill={isUnder80 ? "#fbbf24" : "#ffffff"}
                        fontSize="9"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {point.strokes}
                      </text>

                      {/* Date label at bottom */}
                      <text
                        x={cx}
                        y={chartHeight - 6}
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize="8"
                        fontFamily="monospace"
                      >
                        {point.shortDate}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Selected Point Detail Card */}
            {selectedPointIndex !== null && trendData[selectedPointIndex] && (
              <div className="bg-black/40 border border-emerald-500/50 rounded-2xl p-3 flex items-center justify-between text-xs animate-in fade-in duration-200">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white">
                      {trendData[selectedPointIndex].courseName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {trendData[selectedPointIndex].date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                    <span>퍼트: {trendData[selectedPointIndex].putts}개</span>
                    <span>•</span>
                    <span>FIR: {trendData[selectedPointIndex].fir}%</span>
                    <span>•</span>
                    <span>GIR: {trendData[selectedPointIndex].gir}%</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-base font-black text-emerald-400 font-mono block">
                      {trendData[selectedPointIndex].strokes}타
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {trendData[selectedPointIndex].overPar >= 0 ? `+${trendData[selectedPointIndex].overPar}` : trendData[selectedPointIndex].overPar}
                    </span>
                  </div>
                  {onSelectRound && (
                    <button
                      onClick={() => onSelectRound(trendData[selectedPointIndex].roundId)}
                      className="p-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 text-xs"
                      title="이 라운드 보기"
                    >
                      <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Par 3, 4, 5 Difficulty Breakdown */}
          <div className="bg-[#0f1915] border border-emerald-900/50 rounded-3xl p-4 shadow-lg space-y-3">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Award size={14} className="text-amber-400" />
              <span>파 3 / 파 4 / 파 5 난이도별 평균 성적</span>
            </h3>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              {/* Par 3 */}
              <div className="bg-black/30 border border-emerald-950 p-3 rounded-2xl">
                <span className="text-[10px] text-blue-400 block font-bold mb-1">PAR 3</span>
                <span className="text-xl font-black text-white font-mono block">{stats.par3Avg}타</span>
                <span className="text-[9px] text-slate-400 mt-1 block font-mono">
                  기준 대비 {stats.par3Avg - 3 >= 0 ? `+${(stats.par3Avg - 3).toFixed(2)}` : (stats.par3Avg - 3).toFixed(2)}
                </span>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-blue-400 h-full rounded-full" style={{ width: `${Math.min(100, ((stats.par3Avg - 2.5) / 2) * 100)}%` }} />
                </div>
              </div>

              {/* Par 4 */}
              <div className="bg-black/30 border border-emerald-950 p-3 rounded-2xl">
                <span className="text-[10px] text-emerald-400 block font-bold mb-1">PAR 4</span>
                <span className="text-xl font-black text-white font-mono block">{stats.par4Avg}타</span>
                <span className="text-[9px] text-slate-400 mt-1 block font-mono">
                  기준 대비 {stats.par4Avg - 4 >= 0 ? `+${(stats.par4Avg - 4).toFixed(2)}` : (stats.par4Avg - 4).toFixed(2)}
                </span>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${Math.min(100, ((stats.par4Avg - 3.5) / 2.5) * 100)}%` }} />
                </div>
              </div>

              {/* Par 5 */}
              <div className="bg-black/30 border border-emerald-950 p-3 rounded-2xl">
                <span className="text-[10px] text-amber-400 block font-bold mb-1">PAR 5</span>
                <span className="text-xl font-black text-white font-mono block">{stats.par5Avg}타</span>
                <span className="text-[9px] text-slate-400 mt-1 block font-mono">
                  기준 대비 {stats.par5Avg - 5 >= 0 ? `+${(stats.par5Avg - 5).toFixed(2)}` : (stats.par5Avg - 5).toFixed(2)}
                </span>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: `${Math.min(100, ((stats.par5Avg - 4.5) / 2.5) * 100)}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Cumulative Score Distribution Bar */}
          <div className="bg-[#0f1915] border border-emerald-900/50 rounded-3xl p-4 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <PieChart size={14} className="text-emerald-400" />
                <span>누적 스코어 구성 비율 (총 {stats.scoreDistribution.totalHoles}홀)</span>
              </h3>
              <span className="text-[10px] text-slate-400">버디 / 파 / 보기 비중</span>
            </div>

            {/* Segmented Color Bar */}
            <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-800">
              <div style={{ width: `${stats.scoreDistribution.birdiePct}%` }} className="bg-emerald-500" title={`버디+ ${stats.scoreDistribution.birdiePct}%`} />
              <div style={{ width: `${stats.scoreDistribution.parPct}%` }} className="bg-teal-700" title={`파 ${stats.scoreDistribution.parPct}%`} />
              <div style={{ width: `${stats.scoreDistribution.bogeyPct}%` }} className="bg-blue-600" title={`보기 ${stats.scoreDistribution.bogeyPct}%`} />
              <div style={{ width: `${stats.scoreDistribution.doublePlusPct}%` }} className="bg-rose-600" title={`더블보기+ ${stats.scoreDistribution.doublePlusPct}%`} />
            </div>

            {/* Breakdown Grid */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs pt-1">
              <div className="bg-black/30 p-2 rounded-xl">
                <span className="text-[10px] text-emerald-400 block font-bold">버디+</span>
                <span className="text-base font-black text-white font-mono">
                  {stats.scoreDistribution.birdiePlus}
                </span>
                <span className="text-[9px] text-slate-400 block">({stats.scoreDistribution.birdiePct}%)</span>
              </div>

              <div className="bg-black/30 p-2 rounded-xl">
                <span className="text-[10px] text-teal-300 block font-bold">파 (Par)</span>
                <span className="text-base font-black text-white font-mono">
                  {stats.scoreDistribution.par}
                </span>
                <span className="text-[9px] text-slate-400 block">({stats.scoreDistribution.parPct}%)</span>
              </div>

              <div className="bg-black/30 p-2 rounded-xl">
                <span className="text-[10px] text-blue-300 block font-bold">보기</span>
                <span className="text-base font-black text-white font-mono">
                  {stats.scoreDistribution.bogey}
                </span>
                <span className="text-[9px] text-slate-400 block">({stats.scoreDistribution.bogeyPct}%)</span>
              </div>

              <div className="bg-black/30 p-2 rounded-xl">
                <span className="text-[10px] text-rose-400 block font-bold">더블+</span>
                <span className="text-base font-black text-white font-mono">
                  {stats.scoreDistribution.doublePlus}
                </span>
                <span className="text-[9px] text-slate-400 block">({stats.scoreDistribution.doublePlusPct}%)</span>
              </div>
            </div>
          </div>

          {/* Course-by-Course Ranking Table */}
          <div className="bg-[#0f1915] border border-emerald-900/50 rounded-3xl p-4 shadow-lg space-y-3">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Flag size={14} className="text-emerald-400" />
              <span>골프장별 누적 전적 & 성적 비교</span>
            </h3>

            <div className="space-y-2">
              {stats.courseStats.map((cs) => (
                <div key={cs.courseName} className="bg-black/30 border border-emerald-950/80 rounded-2xl p-3 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-white text-xs">{cs.courseName}</h4>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                      <span>{cs.playCount}회 라운드</span>
                      <span>•</span>
                      <span>최근: {cs.lastPlayed}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-baseline justify-end gap-1">
                      <span className="text-base font-black text-white font-mono">{cs.avgStrokes}</span>
                      <span className="text-[10px] text-slate-400">평균타</span>
                    </div>
                    <span className="text-[10px] text-amber-400 font-mono block">
                      베스트 {cs.bestStrokes}타 (퍼트 {cs.avgPutts})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tour Caddie Manager's Cumulative Diagnosis Report */}
          <div className="bg-gradient-to-br from-[#0c2419] to-[#07130e] border border-emerald-600/40 rounded-3xl p-4 shadow-xl space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                <Sparkles size={16} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
                  Tour Caddie Cumulative Diagnosis
                </span>
                <h3 className="text-sm font-black text-white">
                  {stats.caddieDiagnosis.headline}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-black/30 p-3 rounded-2xl border border-emerald-950">
              {stats.caddieDiagnosis.summary}
            </p>

            {/* Strengths */}
            {stats.caddieDiagnosis.strengths.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                  👍 주요 강점 분석
                </span>
                {stats.caddieDiagnosis.strengths.map((str, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                    <CheckCircle size={13} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Weaknesses & Prescriptions */}
            {stats.caddieDiagnosis.prescriptions.length > 0 && (
              <div className="space-y-1 pt-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  🎯 캐디 매니저의 원포인트 처방전
                </span>
                {stats.caddieDiagnosis.prescriptions.map((prs, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-xs text-amber-200/90 bg-amber-950/20 p-2 rounded-xl border border-amber-900/40">
                    <Sparkles size={13} className="text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{prs}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
