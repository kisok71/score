// src/utils/multiRoundAnalytics.ts
import { Course, HoleInfo, Round, RoundStats } from '../types/golf';
import { calculateRoundStats } from './golfCalculator';
import { PRESET_COURSES } from '../data/presetCourses';

export interface ScoreTrendPoint {
  roundId: string;
  date: string;
  shortDate: string;
  courseName: string;
  shortCourseName: string;
  strokes: number;
  overPar: number;
  putts: number;
  fir: number;
  gir: number;
}

export interface CourseStatSummary {
  courseName: string;
  playCount: number;
  avgStrokes: number;
  bestStrokes: number;
  avgPutts: number;
  lastPlayed: string;
}

export interface MultiRoundStats {
  totalRounds: number;
  filteredRounds: Round[];
  avgStrokes: number;
  avgOverPar: number;
  bestScore: { strokes: number; courseName: string; date: string; roundId: string } | null;
  worstScore: { strokes: number; courseName: string; date: string; roundId: string } | null;
  avgPutts: number;
  avgPuttsPerHole: number;
  avgFIR: number;
  avgGIR: number;
  avgOB: number;
  avgHazard: number;
  avgPenaltyLoss: number;
  par3Avg: number;
  par4Avg: number;
  par5Avg: number;
  scoreDistribution: {
    birdiePlus: number;
    par: number;
    bogey: number;
    doublePlus: number;
    totalHoles: number;
    birdiePct: number;
    parPct: number;
    bogeyPct: number;
    doublePlusPct: number;
  };
  scoreTrend: ScoreTrendPoint[];
  courseStats: CourseStatSummary[];
  caddieDiagnosis: {
    headline: string;
    summary: string;
    strengths: string[];
    weaknesses: string[];
    prescriptions: string[];
  };
}

export interface MultiRoundFilterOptions {
  period: '10' | '5' | 'all';
  year: 'all' | string;
}

/**
 * Helper to retrieve 18 holes for a round's course
 */
export function getHolesForRound(round: Round, allCourses: Course[]): HoleInfo[] {
  const course = allCourses.find(c => c.id === round.courseId) ||
                 PRESET_COURSES.find(c => c.id === round.courseId) ||
                 PRESET_COURSES[0];
  return course.holes;
}

/**
 * Filter rounds based on period (last 10, last 5, all) and year
 */
export function filterRounds(
  rounds: Round[],
  filter: MultiRoundFilterOptions
): Round[] {
  // Sort descending by date first
  let list = [...rounds].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Filter by year if specific year chosen
  if (filter.year !== 'all') {
    list = list.filter(r => r.date.startsWith(filter.year));
  }

  // Filter by count limit
  if (filter.period === '10') {
    list = list.slice(0, 10);
  } else if (filter.period === '5') {
    list = list.slice(0, 5);
  }

  return list;
}

/**
 * Calculate multi-round aggregated statistics
 */
export function calculateMultiRoundStats(
  rounds: Round[],
  allCourses: Course[] = PRESET_COURSES
): MultiRoundStats {
  if (rounds.length === 0) {
    return {
      totalRounds: 0,
      filteredRounds: [],
      avgStrokes: 0,
      avgOverPar: 0,
      bestScore: null,
      worstScore: null,
      avgPutts: 0,
      avgPuttsPerHole: 0,
      avgFIR: 0,
      avgGIR: 0,
      avgOB: 0,
      avgHazard: 0,
      avgPenaltyLoss: 0,
      par3Avg: 0,
      par4Avg: 0,
      par5Avg: 0,
      scoreDistribution: {
        birdiePlus: 0,
        par: 0,
        bogey: 0,
        doublePlus: 0,
        totalHoles: 0,
        birdiePct: 0,
        parPct: 0,
        bogeyPct: 0,
        doublePlusPct: 0,
      },
      scoreTrend: [],
      courseStats: [],
      caddieDiagnosis: {
        headline: '경기 기록이 아직 부족합니다',
        summary: '라운드를 시작하여 스코어를 입력하시면 투어급 누적 통계 분석을 제공해 드립니다.',
        strengths: [],
        weaknesses: [],
        prescriptions: ['새 라운드를 등록하고 18홀 스코어를 기록해 보세요.']
      }
    };
  }

  let totalStrokesSum = 0;
  let totalOverParSum = 0;
  let totalPuttsSum = 0;
  let totalFIRSum = 0;
  let totalGIRSum = 0;
  let totalOBSum = 0;
  let totalHazardSum = 0;
  let totalPenaltyLossSum = 0;

  let totalPar3Strokes = 0;
  let totalPar3Holes = 0;
  let totalPar4Strokes = 0;
  let totalPar4Holes = 0;
  let totalPar5Strokes = 0;
  let totalPar5Holes = 0;

  let cumBirdiePlus = 0;
  let cumPar = 0;
  let cumBogey = 0;
  let cumDoublePlus = 0;
  let cumTotalHoles = 0;

  let bestRoundInfo: { strokes: number; courseName: string; date: string; roundId: string } | null = null;
  let worstRoundInfo: { strokes: number; courseName: string; date: string; roundId: string } | null = null;

  const courseMap: Record<string, { strokes: number[]; putts: number[]; dates: string[] }> = {};

  // For chronological trend chart, sort oldest to latest
  const chronological = [...rounds].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const scoreTrend: ScoreTrendPoint[] = [];

  chronological.forEach((round) => {
    const holes = getHolesForRound(round, allCourses);
    const mainPlayer = round.players.find(p => p.isMainUser) || round.players[0];
    const stats: RoundStats = calculateRoundStats(round, holes, mainPlayer);

    totalStrokesSum += stats.totalStrokes;
    totalOverParSum += stats.overPar;
    totalPuttsSum += stats.totalPutts;
    totalFIRSum += stats.fairwayAccuracy;
    totalGIRSum += stats.girRate;
    totalOBSum += stats.totalOB;
    totalHazardSum += stats.totalHazard;
    totalPenaltyLossSum += stats.penaltyStrokesLost;

    // Best & Worst
    if (!bestRoundInfo || stats.totalStrokes < bestRoundInfo.strokes) {
      bestRoundInfo = {
        strokes: stats.totalStrokes,
        courseName: round.courseName,
        date: round.date,
        roundId: round.id
      };
    }
    if (!worstRoundInfo || stats.totalStrokes > worstRoundInfo.strokes) {
      worstRoundInfo = {
        strokes: stats.totalStrokes,
        courseName: round.courseName,
        date: round.date,
        roundId: round.id
      };
    }

    // Par category accumulator
    holes.forEach((h) => {
      const s = mainPlayer?.scores[h.holeNumber];
      if (s && s.strokes > 0) {
        cumTotalHoles++;
        const diff = s.strokes - h.par;
        if (diff <= -1) cumBirdiePlus++;
        else if (diff === 0) cumPar++;
        else if (diff === 1) cumBogey++;
        else cumDoublePlus++;

        if (h.par === 3) {
          totalPar3Strokes += s.strokes;
          totalPar3Holes++;
        } else if (h.par === 4) {
          totalPar4Strokes += s.strokes;
          totalPar4Holes++;
        } else if (h.par === 5) {
          totalPar5Strokes += s.strokes;
          totalPar5Holes++;
        }
      }
    });

    // Course stats
    if (!courseMap[round.courseName]) {
      courseMap[round.courseName] = { strokes: [], putts: [], dates: [] };
    }
    courseMap[round.courseName].strokes.push(stats.totalStrokes);
    courseMap[round.courseName].putts.push(stats.totalPutts);
    courseMap[round.courseName].dates.push(round.date);

    // Trend Point
    const dateParts = round.date.split('-');
    const shortDate = dateParts.length >= 3 ? `${dateParts[1]}/${dateParts[2]}` : round.date;
    const shortCourse = round.courseName.replace(/(CC|GC|클럽|골프클럽)/g, '').trim().slice(0, 4);

    scoreTrend.push({
      roundId: round.id,
      date: round.date,
      shortDate,
      courseName: round.courseName,
      shortCourseName: shortCourse,
      strokes: stats.totalStrokes,
      overPar: stats.overPar,
      putts: stats.totalPutts,
      fir: stats.fairwayAccuracy,
      gir: stats.girRate,
    });
  });

  const count = rounds.length;
  const avgStrokes = Math.round((totalStrokesSum / count) * 10) / 10;
  const avgOverPar = Math.round((totalOverParSum / count) * 10) / 10;
  const avgPutts = Math.round((totalPuttsSum / count) * 10) / 10;
  const avgPuttsPerHole = Math.round((avgPutts / 18) * 100) / 100;
  const avgFIR = Math.round(totalFIRSum / count);
  const avgGIR = Math.round(totalGIRSum / count);
  const avgOB = Math.round((totalOBSum / count) * 10) / 10;
  const avgHazard = Math.round((totalHazardSum / count) * 10) / 10;
  const avgPenaltyLoss = Math.round((totalPenaltyLossSum / count) * 10) / 10;

  const par3Avg = totalPar3Holes > 0 ? Math.round((totalPar3Strokes / totalPar3Holes) * 100) / 100 : 3.0;
  const par4Avg = totalPar4Holes > 0 ? Math.round((totalPar4Strokes / totalPar4Holes) * 100) / 100 : 4.0;
  const par5Avg = totalPar5Holes > 0 ? Math.round((totalPar5Strokes / totalPar5Holes) * 100) / 100 : 5.0;

  const birdiePct = cumTotalHoles > 0 ? Math.round((cumBirdiePlus / cumTotalHoles) * 100) : 0;
  const parPct = cumTotalHoles > 0 ? Math.round((cumPar / cumTotalHoles) * 100) : 0;
  const bogeyPct = cumTotalHoles > 0 ? Math.round((cumBogey / cumTotalHoles) * 100) : 0;
  const doublePlusPct = cumTotalHoles > 0 ? Math.round((cumDoublePlus / cumTotalHoles) * 100) : 0;

  // Course Stats Array
  const courseStats: CourseStatSummary[] = Object.entries(courseMap).map(([name, data]) => {
    const playCount = data.strokes.length;
    const avgScore = Math.round((data.strokes.reduce((a, b) => a + b, 0) / playCount) * 10) / 10;
    const bestScore = Math.min(...data.strokes);
    const avgPutt = Math.round((data.putts.reduce((a, b) => a + b, 0) / playCount) * 10) / 10;
    const lastPlayed = [...data.dates].sort().reverse()[0];

    return {
      courseName: name,
      playCount,
      avgStrokes: avgScore,
      bestStrokes: bestScore,
      avgPutts: avgPutt,
      lastPlayed,
    };
  }).sort((a, b) => b.playCount - a.playCount || a.avgStrokes - b.avgStrokes);

  // Generate intelligent tour caddie diagnostic report
  let headline = '';
  let summary = '';
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const prescriptions: string[] = [];

  if (avgStrokes < 80) {
    headline = '싱글 디지트 핸디캡 골퍼의 뛰어난 샷 밸런스!';
    summary = `분석된 ${count}개 경기 동안 평균 ${avgStrokes}타로 안정적인 70대 싱글 핸디캡 플레이를 유지하고 계십니다.`;
  } else if (avgStrokes <= 85) {
    headline = '안정적 80대 초반! 싱글 진입을 눈앞에 둔 견고한 경기력';
    summary = `최근 경기 평균 ${avgStrokes}타로 샷의 일관성이 매우 우수합니다. 홀당 0.3타만 줄이시면 곧 70대 싱글 골퍼가 되실 수 있습니다.`;
  } else if (avgStrokes <= 92) {
    headline = '80대 안착과 10타 줄이기를 위한 정밀 매니지먼트 필요';
    summary = `평균 ${avgStrokes}타로 보기 플레이어의 탄탄한 기본기를 갖추셨습니다. 불필요한 벌타 방지와 3퍼트 차단이 핵심 열쇠입니다.`;
  } else {
    headline = '백돌이 탈출 및 80대 진입을 위한 코스 매니지먼트 강화';
    summary = `평균 ${avgStrokes}타로 공격적인 샷보다는 페어웨이 안착과 그린 중앙 안전 공략이 가장 확실한 타수 줄이기 방법입니다.`;
  }

  // Strengths & Weaknesses evaluation
  if (avgFIR >= 60) {
    strengths.push(`티샷 정확도(FIR ${avgFIR}%): 드라이버 방향성이 매우 안정적이어서 세컨샷 기회가 풍부합니다.`);
  } else {
    weaknesses.push(`티샷 미스(FIR ${avgFIR}%): 페어웨이 안착률이 다소 낮아 러프나 트러블 라이에서의 세컨샷 부담이 큽니다.`);
    prescriptions.push('티샷 시 드라이버 대신 3번 우드나 3번 유틸리티로 200m 페어웨이 안착 전략을 시험해 보세요.');
  }

  if (avgGIR >= 45) {
    strengths.push(`그린 적중률(GIR ${avgGIR}%): 아이언 샷의 탄도와 거리감이 뛰어나 버디 찬스를 자주 만듭니다.`);
  } else {
    weaknesses.push(`레귤레이션 온 부진(GIR ${avgGIR}%): 파4 세컨샷에서 그린 주변 프린지나 벙커로 빗나가는 경우가 잦습니다.`);
    prescriptions.push('그린 공략 시 핀을 직접 보지 말고, 그린 중앙 너른 곳을 과감히 에이밍하세요.');
  }

  if (avgPutts <= 32) {
    strengths.push(`퍼팅 세이브 능력(평균 ${avgPutts}개): 홀당 ${avgPuttsPerHole}개로 3퍼트를 효과적으로 억제하고 있습니다.`);
  } else {
    weaknesses.push(`퍼팅 누수(평균 ${avgPutts}개): 3퍼트로 인한 보기 및 더블보기가 라운드당 2~3타 이상 발생하고 있습니다.`);
    prescriptions.push('10m~15m 롱퍼트 거리감 연습과 1.5m 숏퍼트 곧게 치는 스트로크 훈련이 시급합니다.');
  }

  if (avgPenaltyLoss >= 2.0) {
    weaknesses.push(`벌타 상실(평균 ${avgPenaltyLoss}타): 라운드당 OB ${avgOB}회, 해저드 ${avgHazard}회로 경기 흐름을 끊는 실점이 있습니다.`);
    prescriptions.push('좌우 위험 구역이 도사린 홀에서는 캐디가 추천하는 [안전 루트(Safe Route)]로 1클럽 짧게 공략하십시오.');
  } else {
    strengths.push(`철저한 코스 위기 관리(평균 벌타 ${avgPenaltyLoss}타): 치명적인 OB나 해저드를 잘 피해가며 스코어를 방어하고 있습니다.`);
  }

  return {
    totalRounds: count,
    filteredRounds: rounds,
    avgStrokes,
    avgOverPar,
    bestScore: bestRoundInfo,
    worstScore: worstRoundInfo,
    avgPutts,
    avgPuttsPerHole,
    avgFIR,
    avgGIR,
    avgOB,
    avgHazard,
    avgPenaltyLoss,
    par3Avg,
    par4Avg,
    par5Avg,
    scoreDistribution: {
      birdiePlus: cumBirdiePlus,
      par: cumPar,
      bogey: cumBogey,
      doublePlus: cumDoublePlus,
      totalHoles: cumTotalHoles,
      birdiePct,
      parPct,
      bogeyPct,
      doublePlusPct,
    },
    scoreTrend,
    courseStats,
    caddieDiagnosis: {
      headline,
      summary,
      strengths,
      weaknesses,
      prescriptions,
    }
  };
}
