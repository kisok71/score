// src/utils/golfCalculator.ts
import { HoleInfo, HoleScore, Player, Round, RoundStats } from '../types/golf';

export interface ScoreClassification {
  name: string;
  diff: number; // strokes - par
  badgeColor: string; // Tailwind color class
  textColor: string;
  borderClass: string;
  isGood: boolean;
}

export function classifyScore(par: number, strokes: number): ScoreClassification {
  if (strokes === 0) {
    return { name: '-', diff: 0, badgeColor: 'bg-slate-800', textColor: 'text-slate-400', borderClass: 'border-slate-700', isGood: false };
  }

  const diff = strokes - par;

  // Hole-in-One special check
  if (strokes === 1) {
    return {
      name: '홀인원 🎯',
      diff,
      badgeColor: 'bg-gradient-to-r from-amber-500 to-yellow-300 text-black font-extrabold',
      textColor: 'text-yellow-400',
      borderClass: 'border-yellow-400 ring-2 ring-yellow-400/50',
      isGood: true
    };
  }

  if (diff <= -3) {
    return {
      name: '알바트로스',
      diff,
      badgeColor: 'bg-amber-600 text-white font-bold',
      textColor: 'text-amber-400',
      borderClass: 'border-amber-400',
      isGood: true
    };
  } else if (diff === -2) {
    return {
      name: '이글 🦅',
      diff,
      badgeColor: 'bg-yellow-500 text-black font-bold',
      textColor: 'text-yellow-300',
      borderClass: 'border-yellow-400',
      isGood: true
    };
  } else if (diff === -1) {
    return {
      name: '버디 🐦',
      diff,
      badgeColor: 'bg-emerald-600 text-white font-bold',
      textColor: 'text-emerald-400',
      borderClass: 'border-emerald-500',
      isGood: true
    };
  } else if (diff === 0) {
    return {
      name: '파 (Par)',
      diff,
      badgeColor: 'bg-slate-700 text-emerald-200 font-medium',
      textColor: 'text-emerald-300',
      borderClass: 'border-slate-600',
      isGood: false
    };
  } else if (diff === 1) {
    return {
      name: '보기',
      diff,
      badgeColor: 'bg-blue-900/60 text-blue-200',
      textColor: 'text-blue-300',
      borderClass: 'border-blue-700/60',
      isGood: false
    };
  } else if (diff === 2) {
    return {
      name: '더블 보기',
      diff,
      badgeColor: 'bg-rose-950/70 text-rose-300',
      textColor: 'text-rose-300',
      borderClass: 'border-rose-800/60',
      isGood: false
    };
  } else if (diff === 3) {
    return {
      name: '트리플 보기',
      diff,
      badgeColor: 'bg-red-950 text-red-400',
      textColor: 'text-red-400',
      borderClass: 'border-red-900',
      isGood: false
    };
  } else {
    return {
      name: `+${diff} 타`,
      diff,
      badgeColor: 'bg-purple-950 text-purple-300',
      textColor: 'text-purple-300',
      borderClass: 'border-purple-800',
      isGood: false
    };
  }
}

/**
 * Calculates comprehensive stats for a player in a round
 */
export function calculateRoundStats(round: Round, holes: HoleInfo[], player?: Player): RoundStats {
  const targetPlayer = player || round.players.find(p => p.isMainUser) || round.players[0];
  
  if (!targetPlayer) {
    return {
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
  }

  let totalStrokes = 0;
  let totalCoursePar = 0;
  let frontStrokes = 0;
  let backStrokes = 0;
  let totalPutts = 0;
  let recordedHolesCount = 0;

  // FIR (Fairway In Regulation) tracking: only Par 4 and Par 5
  let firPossible = 0;
  let firHit = 0;

  // GIR (Green in regulation) tracking: all holes
  let girHit = 0;
  let girMiss = 0;

  // Scrambling: GIR miss and Par or better
  let scrambleChances = 0;
  let scrambleSaves = 0;

  let totalOB = 0;
  let totalHazard = 0;

  const scoreBreakdown = {
    albatross: 0,
    eagle: 0,
    birdie: 0,
    par: 0,
    bogey: 0,
    doubleBogey: 0,
    triplePlus: 0
  };

  const parCounts = {
    par3: { count: 0, totalStrokes: 0 },
    par4: { count: 0, totalStrokes: 0 },
    par5: { count: 0, totalStrokes: 0 }
  };

  holes.forEach((hole) => {
    const score = targetPlayer.scores[hole.holeNumber];
    if (score && score.strokes > 0) {
      recordedHolesCount++;
      totalStrokes += score.strokes;
      totalCoursePar += hole.par;
      totalPutts += score.putts || 0;

      if (hole.holeNumber <= 9) {
        frontStrokes += score.strokes;
      } else {
        backStrokes += score.strokes;
      }

      totalOB += score.obCount || 0;
      totalHazard += score.hazardCount || 0;

      // Par stats
      if (hole.par === 3) {
        parCounts.par3.count++;
        parCounts.par3.totalStrokes += score.strokes;
      } else if (hole.par === 4) {
        parCounts.par4.count++;
        parCounts.par4.totalStrokes += score.strokes;
      } else if (hole.par === 5) {
        parCounts.par5.count++;
        parCounts.par5.totalStrokes += score.strokes;
      }

      // FIR calculation
      if (hole.par >= 4) {
        firPossible++;
        if (score.fairwayHit === 'hit') firHit++;
      }

      // GIR calculation
      // Standard GIR: Strokes to reach green <= Par - 2
      // e.g. Par 4: strokes - putts <= 2
      const shotsToGreen = score.strokes - score.putts;
      const isGir = score.gir === 'on' || (score.putts > 0 && shotsToGreen <= hole.par - 2);

      if (isGir) {
        girHit++;
      } else {
        girMiss++;
        scrambleChances++;
        // If scrambled (Par or better without GIR)
        if (score.strokes <= hole.par) {
          scrambleSaves++;
        }
      }

      // Breakdown
      const diff = score.strokes - hole.par;
      if (diff <= -3) scoreBreakdown.albatross++;
      else if (diff === -2) scoreBreakdown.eagle++;
      else if (diff === -1) scoreBreakdown.birdie++;
      else if (diff === 0) scoreBreakdown.par++;
      else if (diff === 1) scoreBreakdown.bogey++;
      else if (diff === 2) scoreBreakdown.doubleBogey++;
      else scoreBreakdown.triplePlus++;
    }
  });

  const overPar = totalStrokes - totalCoursePar;
  const avgPuttsPerHole = recordedHolesCount > 0 ? Number((totalPutts / recordedHolesCount).toFixed(1)) : 0;
  const fairwayAccuracy = firPossible > 0 ? Math.round((firHit / firPossible) * 100) : 0;
  const girRate = (girHit + girMiss) > 0 ? Math.round((girHit / (girHit + girMiss)) * 100) : 0;
  const scramblingRate = scrambleChances > 0 ? Math.round((scrambleSaves / scrambleChances) * 100) : 0;

  // OB loses 2 penalty strokes each, Hazard loses 1 penalty stroke each
  const penaltyStrokesLost = (totalOB * 2) + totalHazard;

  const par3Avg = parCounts.par3.count > 0 ? Number((parCounts.par3.totalStrokes / parCounts.par3.count).toFixed(2)) : 3.0;
  const par4Avg = parCounts.par4.count > 0 ? Number((parCounts.par4.totalStrokes / parCounts.par4.count).toFixed(2)) : 4.0;
  const par5Avg = parCounts.par5.count > 0 ? Number((parCounts.par5.totalStrokes / parCounts.par5.count).toFixed(2)) : 5.0;

  return {
    totalStrokes,
    overPar,
    frontStrokes,
    backStrokes,
    totalPutts,
    avgPuttsPerHole,
    fairwayAccuracy,
    girRate,
    scramblingRate,
    totalOB,
    totalHazard,
    penaltyStrokesLost,
    scoreBreakdown,
    parStats: {
      par3Avg,
      par4Avg,
      par5Avg
    }
  };
}

/**
 * Returns professional caddie advice depending on player's current performance
 */
export function getCaddieMentalAdvice(stats: RoundStats, currentHole: number): string {
  if (currentHole <= 1) {
    return "대표님, 오늘 라운드도 즐겁고 부드러운 스윙으로 시작해 보시죠! 긴장 푸시고 나이스 샷!";
  }

  if (stats.penaltyStrokesLost >= 3) {
    return "티샷 시 벌타가 조금 발생하고 있습니다. 드라이버 대신 3번 우드나 유틸리티로 페어웨이를 확실하게 지키는 전략이 오늘 스코어를 3타 이상 줄여줄 수 있습니다!";
  }

  if (stats.avgPuttsPerHole >= 2.2) {
    return "그린에서 3퍼트가 엿보입니다. 홀 컵을 바로 넣으려 하기보다, 반경 1m 훌라후프 안에 멈춘다는 느낌으로 거리감에 집중해 주세요!";
  }

  if (stats.girRate >= 60) {
    return "샷 감이 아주 날카롭습니다! 그린 적중률이 60% 이상으로 프로급입니다. 이 템포 그대로 무리하지 말고 파 세이브를 이어가세요!";
  }

  return "스윙 리듬이 아주 좋습니다! 다음 홀도 욕심내지 말고 코스가 열어주는 대로 안전하게 공략하겠습니다.";
}
