// src/components/dashboard/ScoreCardView.tsx
import React, { useState } from 'react';
import { HoleInfo, Player, Round } from '../../types/golf';
import { classifyScore } from '../../utils/golfCalculator';
import { Share2, Award, Check } from 'lucide-react';

interface ScoreCardViewProps {
  round: Round;
  holes: HoleInfo[];
  mainPlayer: Player;
}

export const ScoreCardView: React.FC<ScoreCardViewProps> = ({
  round,
  holes,
  mainPlayer,
}) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>(mainPlayer.id);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const activePlayer = round.players.find(p => p.id === selectedPlayerId) || mainPlayer;

  // Split into Out (1-9) and In (10-18)
  const outHoles = holes.filter(h => h.holeNumber <= 9);
  const inHoles = holes.filter(h => h.holeNumber > 9);

  // Computations
  const getSubTotal = (holeList: HoleInfo[]) => {
    let parTotal = 0;
    let strokeTotal = 0;
    let puttTotal = 0;
    let obTotal = 0;
    let hazTotal = 0;

    holeList.forEach(h => {
      parTotal += h.par;
      const s = activePlayer.scores[h.holeNumber];
      if (s && s.strokes > 0) {
        strokeTotal += s.strokes;
        puttTotal += s.putts || 0;
        obTotal += s.obCount || 0;
        hazTotal += s.hazardCount || 0;
      }
    });

    return { parTotal, strokeTotal, puttTotal, obTotal, hazTotal };
  };

  const outTotal = getSubTotal(outHoles);
  const inTotal = getSubTotal(inHoles);
  const fullTotal = {
    parTotal: outTotal.parTotal + inTotal.parTotal,
    strokeTotal: outTotal.strokeTotal + inTotal.strokeTotal,
    puttTotal: outTotal.puttTotal + inTotal.puttTotal,
    obTotal: outTotal.obTotal + inTotal.obTotal,
    hazTotal: outTotal.hazTotal + inTotal.hazTotal,
  };

  const handleShare = () => {
    const text = `⛳ [CaddieMaster 라운드 스코어]\n골프장: ${round.courseName} (${round.courseSection})\n일자: ${round.date}\n플레이어: ${activePlayer.name}\n최종 스코어: ${fullTotal.strokeTotal}타 (${fullTotal.strokeTotal - fullTotal.parTotal >= 0 ? '+' : ''}${fullTotal.strokeTotal - fullTotal.parTotal})\n전반: ${outTotal.strokeTotal}타 / 후반: ${inTotal.strokeTotal}타 / 퍼트: ${fullTotal.puttTotal}개`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const renderScoreCell = (par: number, strokes: number) => {
    if (!strokes || strokes === 0) return <span className="text-slate-600">-</span>;
    const diff = strokes - par;

    // Birdie or better: Circle
    if (diff < 0) {
      return (
        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-black text-xs ${
          diff <= -2 ? 'bg-amber-400 text-black ring-2 ring-yellow-300' : 'bg-emerald-500 text-black'
        }`}>
          {strokes}
        </span>
      );
    }

    // Par: Regular text
    if (diff === 0) {
      return <span className="font-bold text-emerald-400 text-xs">{strokes}</span>;
    }

    // Bogey: Square
    if (diff === 1) {
      return (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-blue-900/80 border border-blue-500 text-blue-200 font-bold text-xs">
          {strokes}
        </span>
      );
    }

    // Double Bogey or worse: Double border / dark red
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-rose-950 border-2 border-rose-600 text-rose-300 font-black text-xs">
        {strokes}
      </span>
    );
  };

  return (
    <div className="p-4 space-y-4 max-w-full">
      {/* Scorecard Header */}
      <div className="bg-[#101c17] border border-emerald-900/60 rounded-3xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold uppercase tracking-wider">
              <Award size={14} />
              <span>Official Scorecard</span>
            </div>
            <h2 className="text-lg font-black text-white">{round.courseName}</h2>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs transition-all shadow-md shadow-emerald-950"
          >
            {isCopied ? <Check size={14} className="text-white" /> : <Share2 size={14} />}
            <span>{isCopied ? '복사 완료!' : '스코어 공유'}</span>
          </button>
        </div>

        {/* Player Selector if multi-player */}
        {round.players.length > 1 && (
          <div className="flex items-center gap-2 pt-2 border-t border-emerald-950 overflow-x-auto">
            {round.players.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPlayerId(p.id)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all border ${
                  p.id === activePlayer.id
                    ? 'bg-emerald-500 text-black font-extrabold border-emerald-400'
                    : 'bg-black/30 border-slate-800 text-slate-400'
                }`}
              >
                {p.name} ({p.handicap})
              </button>
            ))}
          </div>
        )}

        {/* Summary Metric Ribbon */}
        <div className="grid grid-cols-4 gap-2 text-center mt-3 pt-3 border-t border-emerald-950/80">
          <div className="bg-black/30 p-2 rounded-2xl">
            <span className="text-[10px] text-slate-400 block">최종 타수</span>
            <span className="text-xl font-black text-white font-mono">{fullTotal.strokeTotal}</span>
          </div>
          <div className="bg-black/30 p-2 rounded-2xl">
            <span className="text-[10px] text-slate-400 block">오버파</span>
            <span className={`text-xl font-black font-mono ${
              fullTotal.strokeTotal - fullTotal.parTotal <= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {fullTotal.strokeTotal - fullTotal.parTotal >= 0 ? `+${fullTotal.strokeTotal - fullTotal.parTotal}` : fullTotal.strokeTotal - fullTotal.parTotal}
            </span>
          </div>
          <div className="bg-black/30 p-2 rounded-2xl">
            <span className="text-[10px] text-slate-400 block">총 퍼트 수</span>
            <span className="text-xl font-black text-emerald-300 font-mono">{fullTotal.puttTotal}</span>
          </div>
          <div className="bg-black/30 p-2 rounded-2xl">
            <span className="text-[10px] text-slate-400 block">벌타 (OB/해저드)</span>
            <span className="text-xl font-black text-amber-400 font-mono">
              {(fullTotal.obTotal * 2) + fullTotal.hazTotal}
            </span>
          </div>
        </div>
      </div>

      {/* Front 9 (OUT) Table */}
      <div className="bg-[#0e1713] border border-emerald-900/40 rounded-3xl p-3 shadow-lg overflow-x-auto">
        <div className="flex items-center justify-between mb-2 px-1">
          <h3 className="text-xs font-bold text-emerald-300">전반 (OUT 코스) 1~9H</h3>
          <span className="text-[11px] text-slate-400 font-mono">소계: <strong className="text-white">{outTotal.strokeTotal}타</strong> (Par {outTotal.parTotal})</span>
        </div>

        <table className="w-full text-center text-[11px] border-collapse">
          <thead>
            <tr className="bg-black/40 text-slate-400">
              <th className="py-1 px-1 rounded-l-lg">홀</th>
              {outHoles.map(h => (
                <th key={h.holeNumber} className="py-1 px-1 font-mono font-bold text-slate-300">
                  {h.holeNumber}
                </th>
              ))}
              <th className="py-1 px-1 rounded-r-lg text-emerald-400 font-bold">OUT</th>
            </tr>
          </thead>
          <tbody>
            {/* Par Row */}
            <tr className="border-b border-emerald-950/60 text-slate-400 text-[10px]">
              <td className="py-1.5 font-bold">PAR</td>
              {outHoles.map(h => (
                <td key={h.holeNumber} className="py-1.5 font-mono">{h.par}</td>
              ))}
              <td className="py-1.5 font-bold text-slate-300">{outTotal.parTotal}</td>
            </tr>

            {/* Score Row */}
            <tr className="border-b border-emerald-950/60 font-mono">
              <td className="py-2 font-bold text-white">스코어</td>
              {outHoles.map(h => {
                const s = activePlayer.scores[h.holeNumber]?.strokes || 0;
                return (
                  <td key={h.holeNumber} className="py-2">
                    {renderScoreCell(h.par, s)}
                  </td>
                );
              })}
              <td className="py-2 font-black text-sm text-emerald-300">{outTotal.strokeTotal}</td>
            </tr>

            {/* Putts Row */}
            <tr className="text-slate-400 text-[10px] font-mono">
              <td className="py-1">퍼트</td>
              {outHoles.map(h => (
                <td key={h.holeNumber} className="py-1">
                  {activePlayer.scores[h.holeNumber]?.putts ?? '-'}
                </td>
              ))}
              <td className="py-1 font-bold text-slate-200">{outTotal.puttTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Back 9 (IN) Table */}
      <div className="bg-[#0e1713] border border-emerald-900/40 rounded-3xl p-3 shadow-lg overflow-x-auto">
        <div className="flex items-center justify-between mb-2 px-1">
          <h3 className="text-xs font-bold text-emerald-300">후반 (IN 코스) 10~18H</h3>
          <span className="text-[11px] text-slate-400 font-mono">소계: <strong className="text-white">{inTotal.strokeTotal}타</strong> (Par {inTotal.parTotal})</span>
        </div>

        <table className="w-full text-center text-[11px] border-collapse">
          <thead>
            <tr className="bg-black/40 text-slate-400">
              <th className="py-1 px-1 rounded-l-lg">홀</th>
              {inHoles.map(h => (
                <th key={h.holeNumber} className="py-1 px-1 font-mono font-bold text-slate-300">
                  {h.holeNumber}
                </th>
              ))}
              <th className="py-1 px-1 rounded-r-lg text-emerald-400 font-bold">IN</th>
            </tr>
          </thead>
          <tbody>
            {/* Par Row */}
            <tr className="border-b border-emerald-950/60 text-slate-400 text-[10px]">
              <td className="py-1.5 font-bold">PAR</td>
              {inHoles.map(h => (
                <td key={h.holeNumber} className="py-1.5 font-mono">{h.par}</td>
              ))}
              <td className="py-1.5 font-bold text-slate-300">{inTotal.parTotal}</td>
            </tr>

            {/* Score Row */}
            <tr className="border-b border-emerald-950/60 font-mono">
              <td className="py-2 font-bold text-white">스코어</td>
              {inHoles.map(h => {
                const s = activePlayer.scores[h.holeNumber]?.strokes || 0;
                return (
                  <td key={h.holeNumber} className="py-2">
                    {renderScoreCell(h.par, s)}
                  </td>
                );
              })}
              <td className="py-2 font-black text-sm text-emerald-300">{inTotal.strokeTotal}</td>
            </tr>

            {/* Putts Row */}
            <tr className="text-slate-400 text-[10px] font-mono">
              <td className="py-1">퍼트</td>
              {inHoles.map(h => (
                <td key={h.holeNumber} className="py-1">
                  {activePlayer.scores[h.holeNumber]?.putts ?? '-'}
                </td>
              ))}
              <td className="py-1 font-bold text-slate-200">{inTotal.puttTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Legend & Rules Indicator */}
      <div className="bg-black/20 rounded-2xl p-3 text-[10px] text-slate-400 flex flex-wrap items-center justify-around gap-2 border border-slate-900">
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-emerald-500 text-black font-bold flex items-center justify-center text-[9px]">O</span>
          <span>버디 (Circle)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-emerald-400">숫자</span>
          <span>파 (Par)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded bg-blue-900 border border-blue-500 text-blue-200 flex items-center justify-center font-bold text-[9px]">□</span>
          <span>보기 (Square)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded bg-rose-950 border-2 border-rose-600 text-rose-300 flex items-center justify-center font-bold text-[9px]">■</span>
          <span>더블보기+</span>
        </div>
      </div>
    </div>
  );
};
