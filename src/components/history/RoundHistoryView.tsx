// src/components/history/RoundHistoryView.tsx
import React, { useState } from 'react';
import { Course, Round, RoundStats } from '../../types/golf';
import { calculateRoundStats } from '../../utils/golfCalculator';
import { getHolesForRound } from '../../utils/multiRoundAnalytics';
import { EditRoundModal } from './EditRoundModal';
import {
  Calendar,
  Clock,
  Trash2,
  Edit3,
  ExternalLink,
  PlusCircle,
  Search,
  Trophy,
  Activity,
  RotateCcw,
  Sun,
  Cloud,
  Wind,
  CloudRain,
  ChevronRight,
  Filter,
  CheckCircle2,
} from 'lucide-react';

interface RoundHistoryViewProps {
  rounds: Round[];
  activeRoundId: string;
  allCourses: Course[];
  onSelectRound: (roundId: string) => void;
  onDeleteRound: (roundId: string) => void;
  onUpdateRound: (updatedRound: Round) => void;
  onOpenNewRound: () => void;
  onResetSamples?: () => void;
}

export const RoundHistoryView: React.FC<RoundHistoryViewProps> = ({
  rounds,
  activeRoundId,
  allCourses,
  onSelectRound,
  onDeleteRound,
  onUpdateRound,
  onOpenNewRound,
  onResetSamples,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [sortOption, setSortOption] = useState<'latest' | 'score' | 'oldest'>('latest');
  const [editingRound, setEditingRound] = useState<Round | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Extract available years from rounds
  const availableYears = Array.from(
    new Set(rounds.map(r => r.date.slice(0, 4)).filter(Boolean))
  ).sort().reverse();

  // Filter and sort rounds
  const filteredRounds = rounds.filter(r => {
    const matchesSearch =
      r.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.courseSection && r.courseSection.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesYear = selectedYear === 'all' || r.date.startsWith(selectedYear);
    return matchesSearch && matchesYear;
  });

  const sortedRounds = [...filteredRounds].sort((a, b) => {
    if (sortOption === 'score') {
      const getScore = (rd: Round) => {
        const p = rd.players[0];
        if (!p) return 999;
        return Object.values(p.scores).reduce((acc, s) => acc + (s.strokes || 0), 0) || 999;
      };
      return getScore(a) - getScore(b);
    }
    if (sortOption === 'oldest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    // Default: latest
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Calculate overall summary stats
  const totalRoundsCount = rounds.length;
  let bestScore = 999;
  let bestCourse = '';
  let totalScoreSum = 0;
  let validScoreCount = 0;

  rounds.forEach(r => {
    const p = r.players[0];
    if (p) {
      const strokes = Object.values(p.scores).reduce((acc, s) => acc + (s.strokes || 0), 0);
      if (strokes > 50) {
        totalScoreSum += strokes;
        validScoreCount++;
        if (strokes < bestScore) {
          bestScore = strokes;
          bestCourse = r.courseName;
        }
      }
    }
  });

  const avgScore = validScoreCount > 0 ? (totalScoreSum / validScoreCount).toFixed(1) : '-';

  const getWeatherIcon = (w: string) => {
    switch (w) {
      case 'sunny': return <Sun size={13} className="text-amber-400" />;
      case 'cloudy': return <Cloud size={13} className="text-slate-400" />;
      case 'windy': return <Wind size={13} className="text-cyan-400" />;
      case 'rainy': return <CloudRain size={13} className="text-blue-400" />;
      default: return <Sun size={13} className="text-amber-400" />;
    }
  };

  const getTeeColor = (tee: string) => {
    switch (tee) {
      case 'black': return 'bg-black text-white border-slate-700';
      case 'blue': return 'bg-blue-900/80 text-blue-200 border-blue-700';
      case 'white': return 'bg-slate-800 text-slate-200 border-slate-600';
      case 'red': return 'bg-rose-950/80 text-rose-300 border-rose-800';
      default: return 'bg-slate-800 text-slate-200 border-slate-600';
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-full">
      {/* Top Banner KPI Header */}
      <div className="bg-gradient-to-br from-[#0e241c] to-[#081510] border border-emerald-800/40 rounded-3xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold uppercase tracking-wider">
              <Trophy size={14} className="text-amber-400" />
              <span>Round History & Management</span>
            </div>
            <h2 className="text-xl font-black text-white">경기 기록 목록</h2>
          </div>
          <div className="flex items-center gap-1.5">
            {onResetSamples && (
              <button
                onClick={onResetSamples}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1 transition-all"
                title="기본 샘플 10경기 데이터 복원"
              >
                <RotateCcw size={13} />
                <span className="hidden sm:inline">샘플 초기화</span>
              </button>
            )}
            <button
              onClick={onOpenNewRound}
              className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-md shadow-emerald-950 transition-all active:scale-95"
            >
              <PlusCircle size={14} />
              <span>새 라운드</span>
            </button>
          </div>
        </div>

        {/* 3-Summary Stats */}
        <div className="grid grid-cols-3 gap-2 text-center py-2.5 border-y border-emerald-900/40 bg-black/20 rounded-2xl">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">총 라운드</span>
            <span className="text-2xl font-black text-white font-mono">{totalRoundsCount}회</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">라이프 베스트 (라베)</span>
            <span className="text-2xl font-black text-amber-400 font-mono">
              {bestScore < 999 ? `${bestScore}타` : '-'}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">평균 타수</span>
            <span className="text-2xl font-black text-emerald-300 font-mono">{avgScore}타</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-2 bg-[#0c1612] p-3 rounded-2xl border border-emerald-950">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="골프장명 또는 코스명 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900/80 border border-emerald-900/40 rounded-xl text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center justify-between gap-2 pt-1 text-xs">
          {/* Year Pills */}
          <div className="flex items-center gap-1 overflow-x-auto py-0.5">
            <button
              onClick={() => setSelectedYear('all')}
              className={`px-2.5 py-1 rounded-lg font-bold text-xs whitespace-nowrap transition-all ${
                selectedYear === 'all'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-850 text-slate-400 hover:text-slate-200'
              }`}
            >
              전체 연도
            </button>
            {availableYears.map(yr => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-2.5 py-1 rounded-lg font-bold text-xs whitespace-nowrap transition-all ${
                  selectedYear === yr
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {yr}년
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as any)}
            className="bg-slate-900 border border-emerald-900/60 rounded-xl text-slate-300 px-2 py-1 text-xs focus:outline-none"
          >
            <option value="latest">최신순</option>
            <option value="score">스코어 낮은순</option>
            <option value="oldest">과거순</option>
          </select>
        </div>
      </div>

      {/* Rounds List */}
      <div className="space-y-3">
        {sortedRounds.length === 0 ? (
          <div className="text-center py-12 bg-[#0c1612] rounded-3xl border border-emerald-950 p-6 space-y-3">
            <Trophy size={36} className="text-slate-600 mx-auto" />
            <h3 className="text-sm font-bold text-slate-300">검색 조건에 맞는 경기 기록이 없습니다</h3>
            <p className="text-xs text-slate-500">새 라운드를 등록하거나 검색 조건을 변경해 보세요.</p>
            <button
              onClick={onOpenNewRound}
              className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow mt-2"
            >
              새 라운드 생성하기
            </button>
          </div>
        ) : (
          sortedRounds.map((round) => {
            const isActive = round.id === activeRoundId;
            const holes = getHolesForRound(round, allCourses);
            const mainPlayer = round.players.find(p => p.isMainUser) || round.players[0];
            const stats: RoundStats = calculateRoundStats(round, holes, mainPlayer);

            const isBest = stats.totalStrokes === bestScore && bestScore < 999;

            return (
              <div
                key={round.id}
                className={`bg-[#0f1b16] border rounded-3xl p-4 transition-all relative overflow-hidden shadow-lg ${
                  isActive
                    ? 'border-emerald-500 ring-2 ring-emerald-500/30 bg-[#12231c]'
                    : 'border-emerald-900/40 hover:border-emerald-700/60'
                }`}
              >
                {/* Active Indicator Strip */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-emerald-500 to-teal-400 py-0.5 px-3 flex items-center justify-between text-[10px] font-black text-black">
                    <span>현재 선택된 활성 라운드</span>
                    <span>ACTIVE</span>
                  </div>
                )}

                {/* Card Header */}
                <div className={`flex items-center justify-between mb-2.5 ${isActive ? 'mt-1.5' : ''}`}>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {/* Status Badge */}
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        round.status === 'completed'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800 animate-pulse'
                      }`}
                    >
                      {round.status === 'completed' ? '완료' : '진행 중'}
                    </span>

                    {/* Tee Box */}
                    <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono border ${getTeeColor(round.teeBox)}`}>
                      {round.teeBox.toUpperCase()}
                    </span>

                    {/* Date & Time */}
                    <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                      <Calendar size={11} className="text-slate-500" />
                      {round.date}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {round.teeOffTime}
                    </span>
                  </div>

                  {/* Weather */}
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 bg-black/30 px-2 py-0.5 rounded-lg border border-emerald-950">
                    {getWeatherIcon(round.weather)}
                    <span>{round.windSpeed}m/s</span>
                  </div>
                </div>

                {/* Main Course Info & Big Score */}
                <div className="flex items-center justify-between my-2">
                  <div className="pr-2">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-black text-white tracking-tight">
                        {round.courseName}
                      </h3>
                      {isBest && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-400 text-black font-black text-[9px] shadow-sm">
                          라베 🏆
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{round.courseSection || '18홀 정규'}</p>
                  </div>

                  {/* Score Box */}
                  <div className="text-right flex-shrink-0 bg-black/40 px-3 py-1.5 rounded-2xl border border-emerald-950">
                    <div className="flex items-baseline justify-end gap-1">
                      <span className="text-2xl font-black text-white font-mono leading-none">
                        {stats.totalStrokes}
                      </span>
                      <span className="text-xs text-slate-400">타</span>
                      <span
                        className={`text-xs font-bold font-mono ml-1 ${
                          stats.overPar <= 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        ({stats.overPar >= 0 ? `+${stats.overPar}` : stats.overPar})
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                      전 {stats.frontStrokes} / 후 {stats.backStrokes}
                    </span>
                  </div>
                </div>

                {/* Performance Mini Grid */}
                <div className="grid grid-cols-4 gap-1.5 bg-black/30 p-2 rounded-xl border border-emerald-950/80 text-center my-2.5 text-xs">
                  <div>
                    <span className="text-[9px] text-slate-400 block">퍼트 수</span>
                    <span className="font-mono font-bold text-slate-200 text-xs">
                      {stats.totalPutts}개
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block">FIR</span>
                    <span className="font-mono font-bold text-emerald-400 text-xs">
                      {stats.fairwayAccuracy}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block">GIR</span>
                    <span className="font-mono font-bold text-blue-400 text-xs">
                      {stats.girRate}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block">벌타 상실</span>
                    <span className="font-mono font-bold text-amber-400 text-xs">
                      {stats.penaltyStrokesLost}타
                    </span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-emerald-950/80 gap-2">
                  <div className="flex items-center gap-1.5">
                    {/* Edit Metadata Button */}
                    <button
                      onClick={() => setEditingRound(round)}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1 transition-all"
                      title="경기 정보 수정"
                    >
                      <Edit3 size={13} className="text-slate-400" />
                      <span>수정</span>
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => setDeleteConfirmId(round.id)}
                      className="p-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 hover:text-rose-200 border border-rose-900/50 text-xs transition-all"
                      title="경기 기록 삭제"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Select / Open Round Button */}
                  <button
                    onClick={() => onSelectRound(round.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                      isActive
                        ? 'bg-emerald-500 text-black shadow-emerald-500/20'
                        : 'bg-emerald-700 hover:bg-emerald-600 text-white'
                    }`}
                  >
                    <span>{isActive ? '현재 라운드 보기' : '이 라운드 열기'}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Edit Round Modal */}
      <EditRoundModal
        isOpen={!!editingRound}
        onClose={() => setEditingRound(null)}
        round={editingRound}
        onSave={onUpdateRound}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#101b16] border border-rose-900/80 rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 mx-auto">
              <Trash2 size={24} />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-white">경기 기록 삭제</h3>
              <p className="text-xs text-slate-400 mt-1">
                해당 라운드의 모든 홀별 스코어와 기록이 영구히 삭제됩니다. 정말 삭제하시겠습니까?
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="py-2.5 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl hover:bg-slate-700"
              >
                취소
              </button>
              <button
                onClick={() => {
                  onDeleteRound(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="py-2.5 bg-rose-600 text-white font-bold text-xs rounded-xl hover:bg-rose-500 shadow-md shadow-rose-950"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
