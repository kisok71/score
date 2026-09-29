// src/components/dashboard/AnalyticsDashboard.tsx
import React, { useState } from 'react';
import { Course, HoleInfo, Round, RoundStats } from '../../types/golf';
import { calculateRoundStats, getCaddieMentalAdvice } from '../../utils/golfCalculator';
import { MultiRoundAnalytics } from './MultiRoundAnalytics';
import {
  TrendingUp,
  Award,
  Target,
  Flag,
  Crosshair,
  Sparkles,
  BarChart2,
  PieChart,
  Activity,
  AlertCircle,
  Layers,
} from 'lucide-react';

interface AnalyticsDashboardProps {
  round: Round | null;
  holes: HoleInfo[];
  allRounds: Round[];
  allCourses?: Course[];
  onSelectRound?: (roundId: string) => void;
  onOpenNewRound?: () => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  round,
  holes,
  allRounds,
  allCourses = [],
  onSelectRound,
  onOpenNewRound,
}) => {
  const [dashboardMode, setDashboardMode] = useState<'multi' | 'single'>('multi');
  const [selectedSubTab, setSelectedSubTab] = useState<'overview' | 'parStats' | 'shotDetails' | 'courses'>('overview');

  const mainPlayer = round ? (round.players.find(p => p.isMainUser) || round.players[0]) : undefined;
  const stats: RoundStats = (round && mainPlayer)
    ? calculateRoundStats(round, holes, mainPlayer)
    : {
        totalStrokes: 0,
        overPar: 0,
        frontStrokes: 0,
        backStrokes: 0,
        totalPutts: 0,
        avgPuttsPerHole: 0,
        fairwayAccuracy: 0,
        girRate: 0,
        scramblingRate: 0,
        totalOB: 0,
        totalHazard: 0,
        penaltyStrokesLost: 0,
        scoreBreakdown: { albatross: 0, eagle: 0, birdie: 0, par: 0, bogey: 0, doubleBogey: 0, triplePlus: 0 },
        parStats: { par3Avg: 0, par4Avg: 0, par5Avg: 0 },
      };
  const caddieAdvice = getCaddieMentalAdvice(stats, 18);

  // Score distribution counts
  const totalRecorded = Object.values(stats.scoreBreakdown).reduce((a, b) => a + b, 0) || 1;
  const birdieRate = Math.round(((stats.scoreBreakdown.birdie + stats.scoreBreakdown.eagle) / totalRecorded) * 100);
  const parRate = Math.round((stats.scoreBreakdown.par / totalRecorded) * 100);
  const bogeyRate = Math.round((stats.scoreBreakdown.bogey / totalRecorded) * 100);
  const doublePlusRate = Math.round(((stats.scoreBreakdown.doubleBogey + stats.scoreBreakdown.triplePlus) / totalRecorded) * 100);

  // Virtual Clean Score (타수에서 벌타를 뺀 이상적 스코어)
  const virtualCleanScore = stats.totalStrokes - stats.penaltyStrokesLost;

  return (
    <div className="p-4 space-y-4 max-w-full">
      {/* Top Main Mode Switcher: Multi-Round vs Single-Round */}
      <div className="grid grid-cols-2 gap-1.5 p-1 bg-black/60 border border-emerald-950 rounded-2xl">
        <button
          onClick={() => setDashboardMode('multi')}
          className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            dashboardMode === 'multi'
              ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-950'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <TrendingUp size={14} />
          <span>10경기 / 연도별 분석</span>
        </button>
        <button
          onClick={() => setDashboardMode('single')}
          className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            dashboardMode === 'single'
              ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-950'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Flag size={14} />
          <span>이번 라운드 상세</span>
        </button>
      </div>

      {/* Render Multi-Round Analytics if selected */}
      {dashboardMode === 'multi' ? (
        <MultiRoundAnalytics
          rounds={allRounds}
          allCourses={allCourses}
          onSelectRound={onSelectRound}
          onOpenNewRound={onOpenNewRound}
        />
      ) : !round ? (
        <div className="text-center py-12 bg-[#0c1612] rounded-3xl border border-emerald-950 p-6 space-y-3">
          <Flag size={36} className="text-slate-600 mx-auto" />
          <h4 className="text-sm font-bold text-slate-300">현재 선택된 라운드가 없습니다</h4>
          <p className="text-xs text-slate-500">새 라운드를 등록하고 18홀 스코어를 입력하시면 홀별 상세 분석이 제공됩니다.</p>
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
          {/* Top Banner / Round Summary Card */}
          <div className="bg-gradient-to-br from-[#0e241c] to-[#081510] border border-emerald-800/40 rounded-3xl p-4 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest block">
                  Round Performance
                </span>
                <h2 className="text-xl font-black text-white">{round.courseName}</h2>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-black/40 px-2.5 py-1 rounded-xl border border-emerald-950">
                {round.date}
              </span>
            </div>

        {/* Big Score Summary */}
        <div className="grid grid-cols-3 gap-2 text-center py-2 border-y border-emerald-900/40 my-2">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">최종 타수</span>
            <span className="text-3xl font-black text-white font-mono">{stats.totalStrokes}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">기준 타수 대비</span>
            <span className={`text-3xl font-black font-mono ${stats.overPar <= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {stats.overPar >= 0 ? `+${stats.overPar}` : stats.overPar}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">전반 / 후반</span>
            <span className="text-xl font-black text-slate-200 font-mono mt-1 block">
              {stats.frontStrokes} <span className="text-xs text-slate-500">/</span> {stats.backStrokes}
            </span>
          </div>
        </div>

        {/* Virtual Clean Score Highlight */}
        {stats.penaltyStrokesLost > 0 && (
          <div className="bg-amber-950/30 border border-amber-900/50 rounded-2xl p-2.5 mt-2 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-400" />
              <span className="text-slate-300 font-medium">벌타 제외 시 잠재 스코어:</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-mono font-black text-amber-300 text-sm">{virtualCleanScore}타</span>
              <span className="text-[10px] text-slate-400">(-{stats.penaltyStrokesLost}타 세이브 가능)</span>
            </div>
          </div>
        )}
      </div>

      {/* Sub Tabs */}
      <div className="grid grid-cols-4 gap-1 bg-black/40 p-1 rounded-2xl border border-emerald-950 text-xs">
        <button
          onClick={() => setSelectedSubTab('overview')}
          className={`py-1.5 rounded-xl font-bold transition-all ${
            selectedSubTab === 'overview'
              ? 'bg-emerald-600 text-white shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          스코어 분석
        </button>
        <button
          onClick={() => setSelectedSubTab('parStats')}
          className={`py-1.5 rounded-xl font-bold transition-all ${
            selectedSubTab === 'parStats'
              ? 'bg-emerald-600 text-white shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          파3/4/5 분석
        </button>
        <button
          onClick={() => setSelectedSubTab('shotDetails')}
          className={`py-1.5 rounded-xl font-bold transition-all ${
            selectedSubTab === 'shotDetails'
              ? 'bg-emerald-600 text-white shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          GIR/퍼트/FIR
        </button>
        <button
          onClick={() => setSelectedSubTab('courses')}
          className={`py-1.5 rounded-xl font-bold transition-all ${
            selectedSubTab === 'courses'
              ? 'bg-emerald-600 text-white shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          골프장별 비교
        </button>
      </div>

      {/* TAB 1: Overview & Score Distribution */}
      {selectedSubTab === 'overview' && (
        <div className="space-y-3">
          {/* Key Metric 4-Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#101b16] border border-emerald-900/40 rounded-2xl p-3">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>페어웨이 안착률 (FIR)</span>
                <Crosshair size={13} className="text-emerald-400" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-white font-mono">{stats.fairwayAccuracy}%</span>
                <span className="text-[10px] text-slate-400">티샷 정확도</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${stats.fairwayAccuracy}%` }} />
              </div>
            </div>

            <div className="bg-[#101b16] border border-emerald-900/40 rounded-2xl p-3">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>그린 적중률 (GIR)</span>
                <Target size={13} className="text-blue-400" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-white font-mono">{stats.girRate}%</span>
                <span className="text-[10px] text-slate-400">레귤레이션 온</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: `${stats.girRate}%` }} />
              </div>
            </div>

            <div className="bg-[#101b16] border border-emerald-900/40 rounded-2xl p-3">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>홀당 평균 퍼트</span>
                <Flag size={13} className="text-emerald-400" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-emerald-300 font-mono">{stats.avgPuttsPerHole}</span>
                <span className="text-[10px] text-slate-400">개 / 홀</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">총 {stats.totalPutts} 퍼트</span>
            </div>

            <div className="bg-[#101b16] border border-emerald-900/40 rounded-2xl p-3">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>페널티 실점</span>
                <AlertCircle size={13} className="text-amber-400" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-amber-400 font-mono">{stats.penaltyStrokesLost}</span>
                <span className="text-[10px] text-slate-400">타 상실</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">OB {stats.totalOB}회 / 해저드 {stats.totalHazard}회</span>
            </div>
          </div>

          {/* Score Distribution Breakdown Bar & Chart */}
          <div className="bg-[#0f1a15] border border-emerald-900/50 rounded-3xl p-4 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <PieChart size={14} className="text-emerald-400" />
                <span>스코어 분포 (18홀)</span>
              </h3>
              <span className="text-[10px] text-slate-400">버디 / 파 / 보기 비율</span>
            </div>

            {/* Segmented Color Bar */}
            <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-800">
              <div style={{ width: `${birdieRate}%` }} className="bg-emerald-500" title={`버디 ${birdieRate}%`} />
              <div style={{ width: `${parRate}%` }} className="bg-teal-700" title={`파 ${parRate}%`} />
              <div style={{ width: `${bogeyRate}%` }} className="bg-blue-600" title={`보기 ${bogeyRate}%`} />
              <div style={{ width: `${doublePlusRate}%` }} className="bg-rose-600" title={`더블보기+ ${doublePlusRate}%`} />
            </div>

            {/* Breakdown Grid */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs pt-1">
              <div className="bg-black/30 p-2 rounded-xl">
                <span className="text-[10px] text-emerald-400 block font-bold">버디+</span>
                <span className="text-base font-black text-white font-mono">
                  {stats.scoreBreakdown.birdie + stats.scoreBreakdown.eagle}
                </span>
                <span className="text-[9px] text-slate-400 block">({birdieRate}%)</span>
              </div>

              <div className="bg-black/30 p-2 rounded-xl">
                <span className="text-[10px] text-teal-300 block font-bold">파 (Par)</span>
                <span className="text-base font-black text-white font-mono">
                  {stats.scoreBreakdown.par}
                </span>
                <span className="text-[9px] text-slate-400 block">({parRate}%)</span>
              </div>

              <div className="bg-black/30 p-2 rounded-xl">
                <span className="text-[10px] text-blue-300 block font-bold">보기</span>
                <span className="text-base font-black text-white font-mono">
                  {stats.scoreBreakdown.bogey}
                </span>
                <span className="text-[9px] text-slate-400 block">({bogeyRate}%)</span>
              </div>

              <div className="bg-black/30 p-2 rounded-xl">
                <span className="text-[10px] text-rose-400 block font-bold">더블+</span>
                <span className="text-base font-black text-white font-mono">
                  {stats.scoreBreakdown.doubleBogey + stats.scoreBreakdown.triplePlus}
                </span>
                <span className="text-[9px] text-slate-400 block">({doublePlusRate}%)</span>
              </div>
            </div>
          </div>

          {/* Caddie Manager Advice Banner */}
          <div className="bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-800/40 rounded-3xl p-3.5 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
              <Sparkles size={18} />
            </div>
            <div className="text-xs">
              <span className="font-bold text-emerald-400 block mb-0.5">캐디 매니저의 총평 코멘트</span>
              <p className="text-slate-300 leading-relaxed">{caddieAdvice}</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Par 3 / Par 4 / Par 5 Hole Analysis */}
      {selectedSubTab === 'parStats' && (
        <div className="space-y-3">
          <div className="bg-[#0f1915] border border-emerald-900/40 rounded-3xl p-4 space-y-4">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <BarChart2 size={14} className="text-emerald-400" />
              <span>파(Par) 유형별 홀 퍼포먼스 분석</span>
            </h3>

            {/* Par 3 Card */}
            <div className="bg-black/30 border border-emerald-950 rounded-2xl p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-300">PAR 3 홀 분석</span>
                <span className="text-xs font-mono font-black text-white">
                  평균 {stats.parStats.par3Avg}타 <span className="text-[10px] text-slate-400">({stats.parStats.par3Avg > 3 ? `+${(stats.parStats.par3Avg - 3).toFixed(1)}` : 'EVEN'})</span>
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${Math.min(100, (3 / stats.parStats.par3Avg) * 100)}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">
                아이언 티샷 정확도 및 온그린 성공률이 파3 스코어를 결정합니다.
              </p>
            </div>

            {/* Par 4 Card */}
            <div className="bg-black/30 border border-emerald-950 rounded-2xl p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-300">PAR 4 홀 분석</span>
                <span className="text-xs font-mono font-black text-white">
                  평균 {stats.parStats.par4Avg}타 <span className="text-[10px] text-slate-400">({stats.parStats.par4Avg > 4 ? `+${(stats.parStats.par4Avg - 4).toFixed(1)}` : 'EVEN'})</span>
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full"
                  style={{ width: `${Math.min(100, (4 / stats.parStats.par4Avg) * 100)}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">
                티샷 페어웨이 안착(FIR) 후 130~150m 세컨샷 온그린이 핵심 포인트입니다.
              </p>
            </div>

            {/* Par 5 Card */}
            <div className="bg-black/30 border border-emerald-950 rounded-2xl p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300">PAR 5 홀 분석 (버디 기회)</span>
                <span className="text-xs font-mono font-black text-white">
                  평균 {stats.parStats.par5Avg}타 <span className="text-[10px] text-slate-400">({stats.parStats.par5Avg > 5 ? `+${(stats.parStats.par5Avg - 5).toFixed(1)}` : 'EVEN'})</span>
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full"
                  style={{ width: `${Math.min(100, (5 / stats.parStats.par5Avg) * 100)}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">
                롱홀에서는 무리한 2온보다 확실한 3온 레이업으로 버디와 파 세이브를 낚아채세요.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Shot Accuracy & Short Game Details */}
      {selectedSubTab === 'shotDetails' && (
        <div className="space-y-3">
          <div className="bg-[#0f1915] border border-emerald-900/40 rounded-3xl p-4 space-y-3">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Activity size={14} className="text-emerald-400" />
              <span>정밀 샷 지표 & 숏게임 세이브</span>
            </h3>

            {/* Detailed metric list */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/30 border border-emerald-950">
                <span className="text-slate-300">그린 미스 시 스크램블링(파 세이브)</span>
                <span className="font-mono font-bold text-emerald-400">{stats.scramblingRate}%</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/30 border border-emerald-950">
                <span className="text-slate-300">GIR 성공 홀 평균 퍼트 수</span>
                <span className="font-mono font-bold text-white">1.9개</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/30 border border-emerald-950">
                <span className="text-slate-300">총 벙커 탈출 횟수</span>
                <span className="font-mono font-bold text-amber-300">
                  {mainPlayer ? Object.values(mainPlayer.scores).reduce((acc, s) => acc + (s.bunkerCount || 0), 0) : 0}회
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/30 border border-emerald-950">
                <span className="text-slate-300">OB 실점 (1회당 2벌타)</span>
                <span className="font-mono font-bold text-red-400">
                  {stats.totalOB}회 (-{stats.totalOB * 2}타)
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/30 border border-emerald-950">
                <span className="text-slate-300">해저드 실점 (1회당 1벌타)</span>
                <span className="font-mono font-bold text-amber-400">
                  {stats.totalHazard}회 (-{stats.totalHazard}타)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Courses Comparison */}
      {selectedSubTab === 'courses' && (
        <div className="space-y-3">
          <div className="bg-[#0f1915] border border-emerald-900/40 rounded-3xl p-4 space-y-3">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Award size={14} className="text-amber-400" />
              <span>골프장별 라운드 기록 비교</span>
            </h3>

            <div className="space-y-2">
              {allRounds.map((r) => {
                const p = r.players.find(pl => pl.isMainUser) || r.players[0];
                const rStats = calculateRoundStats(r, holes, p);

                return (
                  <div key={r.id} className="bg-black/30 border border-emerald-950/80 rounded-2xl p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">{r.courseName}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                        <span>{r.date}</span>
                        <span>•</span>
                        <span>{r.courseSection}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-white font-mono block">
                        {rStats.totalStrokes}타
                      </span>
                      <span className={`text-[10px] font-bold ${rStats.overPar <= 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                        {rStats.overPar >= 0 ? `+${rStats.overPar}` : rStats.overPar} (퍼트 {rStats.totalPutts})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
};
