// src/utils/golfHoleGenerator.ts
import { HoleInfo, SubCourse } from '../types/golf';

export const createStandardHoles = (
  courseName: string,
  outName: string = 'OUT 코스',
  inName: string = 'IN 코스',
  distanceMultiplier: number = 1.0,
  elevationBias: number = 0
): HoleInfo[] => {
  const basePars: (3 | 4 | 5)[] = [
    4, 4, 3, 5, 4, 3, 4, 5, 4, // OUT (36)
    4, 5, 3, 4, 4, 3, 5, 4, 4  // IN (36)
  ];
  const baseDistances: number[] = [
    360, 345, 160, 480, 375, 145, 390, 505, 370,
    355, 490, 175, 380, 340, 155, 520, 385, 365
  ];
  const handicaps: number[] = [
    7, 11, 15, 3, 1, 17, 5, 9, 13,
    8, 4, 14, 2, 12, 16, 6, 10, 18
  ];
  const shapes: ('straight' | 'dogleg-left' | 'dogleg-right' | 'island')[] = [
    'straight', 'dogleg-right', 'straight', 'dogleg-left', 'straight', 'island', 'dogleg-right', 'straight', 'straight',
    'dogleg-left', 'straight', 'straight', 'dogleg-right', 'straight', 'island', 'dogleg-left', 'straight', 'straight'
  ];

  return basePars.map((par, idx) => {
    const holeNumber = idx + 1;
    const distanceMeter = Math.round(baseDistances[idx] * distanceMultiplier);
    const distanceYard = Math.round(distanceMeter * 1.09361);
    const handicap = handicaps[idx];
    const shape = shapes[idx];
    const sectionName = holeNumber <= 9 ? outName : inName;

    const hazards: HoleInfo['hazards'] = [];
    if (par === 3) {
      hazards.push({ type: 'bunker', location: '그린 좌우 벙커 가드', distance: distanceMeter - 10 });
      if (idx % 2 === 0) hazards.push({ type: 'water', location: '그린 앞 워터해저드', distance: distanceMeter - 30 });
    } else {
      hazards.push({ type: 'bunker', location: '페어웨이 우측 랜딩 벙커', distance: 215 });
      hazards.push({ type: 'ob', location: '홀 좌측 전체 OB 구역', distance: 0 });
      if (idx % 3 === 0) hazards.push({ type: 'water', location: '세컨샷 지점 우측 해저드', distance: 240 });
    }

    const elevation = (idx % 3 === 0 ? -6 : idx % 2 === 0 ? 8 : -2) + elevationBias;

    return {
      holeNumber,
      par,
      distanceMeter,
      distanceYard,
      handicap,
      elevationMeter: elevation,
      shape,
      hazards,
      caddieStrategy: {
        safeRoute: par === 3
          ? `그린 중앙 안전지대를 목표로 핀보다 반클럽 여유 있게 티샷`
          : `페어웨이 중앙 약간 좌측 200m 티샷 후 그린 앞 벙커를 피해 안전한 공략`,
        attackRoute: par === 3
          ? `핀 하이 다이렉트 샷으로 핀 2m 이내 안착 버디 트라이`
          : `우측 벙커 캐리 230m 티샷 후 100m 숏웨지 버디 찬스 노림`,
        recommendedClub: par === 3 ? (distanceMeter > 165 ? '5~6번 아이언' : '7~8번 아이언') : '드라이버',
        keyWarning: par === 3 ? '그린 앞 벙커 및 내리막 런 주의' : '좌측 OB 및 페어웨이 벙커 회피가 필수',
        caddieVoice: `${courseName} ${sectionName} ${holeNumber}번홀입니다. 대표님, 자신감 있는 스윙으로 페어웨이 중앙을 시원하게 가르시죠!`
      }
    };
  });
};

/**
 * 전반 9홀과 후반 9홀 코스를 조합하여 18홀 라운드 코스를 생성합니다.
 * 사용자가 거리와 형태를 입력하지 않아도 Par(3/4/5)에 맞춘 현실적인 전장 거리와 공략 팁이 자동 설정됩니다.
 */
export const compose18HolesFromSubCourses = (
  courseName: string,
  frontCourse: SubCourse,
  backCourse: SubCourse
): HoleInfo[] => {
  const getStandardDistance = (par: number, holeIdx: number): number => {
    if (par === 3) return [155, 145, 165, 150][holeIdx % 4];
    if (par === 5) return [485, 510, 475, 520][holeIdx % 4];
    return [355, 370, 340, 385, 360, 395, 350][holeIdx % 7];
  };

  const frontHandicaps = [7, 11, 15, 3, 1, 17, 5, 9, 13];
  const backHandicaps = [8, 4, 14, 2, 12, 16, 6, 10, 18];

  const frontHoles: HoleInfo[] = frontCourse.pars.map((par, i) => {
    const holeNumber = i + 1;
    const distanceMeter = getStandardDistance(par, i);
    const distanceYard = Math.round(distanceMeter * 1.09361);
    const handicap = frontHandicaps[i] || (i + 1);

    const hazards: HoleInfo['hazards'] = [];
    if (par === 3) {
      hazards.push({ type: 'bunker', location: '그린 좌우 벙커 가드', distance: distanceMeter - 10 });
      if (i % 2 === 0) hazards.push({ type: 'water', location: '그린 앞 워터해저드', distance: distanceMeter - 25 });
    } else {
      hazards.push({ type: 'bunker', location: '페어웨이 우측 랜딩 벙커', distance: 215 });
      hazards.push({ type: 'ob', location: '홀 좌측 전체 OB 구역', distance: 0 });
      if (i % 3 === 0) hazards.push({ type: 'water', location: '세컨샷 지점 우측 해저드', distance: 240 });
    }

    return {
      holeNumber,
      par,
      distanceMeter,
      distanceYard,
      handicap,
      elevationMeter: i % 3 === 0 ? -4 : i % 2 === 0 ? 5 : 0,
      shape: 'straight' as const,
      hazards,
      caddieStrategy: {
        safeRoute: par === 3
          ? '그린 중앙 안전지대를 목표로 핀보다 반클럽 여유 있게 티샷'
          : '페어웨이 중앙 200m 티샷 후 그린 앞 벙커를 피해 안전한 공략',
        attackRoute: par === 3
          ? '핀 하이 다이렉트 샷으로 핀 2m 이내 안착 버디 트라이'
          : '우측 벙커 캐리 230m 티샷 후 100m 숏웨지 버디 찬스 노림',
        recommendedClub: par === 3 ? (distanceMeter > 160 ? '5~6번 아이언' : '7~8번 아이언') : '드라이버',
        keyWarning: par === 3 ? '그린 주변 벙커 및 경사 주의' : '좌측 OB 및 페어웨이 벙커 회피가 필수',
        caddieVoice: `${courseName} ${frontCourse.name} ${holeNumber}번홀(Par ${par})입니다. 대표님, 자신감 있는 스윙으로 굿 샷 가시죠!`
      }
    };
  });

  const backHoles: HoleInfo[] = backCourse.pars.map((par, i) => {
    const holeNumber = i + 10;
    const distanceMeter = getStandardDistance(par, i + 9);
    const distanceYard = Math.round(distanceMeter * 1.09361);
    const handicap = backHandicaps[i] || (i + 10);

    const hazards: HoleInfo['hazards'] = [];
    if (par === 3) {
      hazards.push({ type: 'bunker', location: '그린 앞 가드 벙커', distance: distanceMeter - 10 });
      if (i % 2 === 1) hazards.push({ type: 'water', location: '그린 우측 해저드', distance: distanceMeter - 15 });
    } else {
      hazards.push({ type: 'bunker', location: '페어웨이 좌측 벙커', distance: 220 });
      hazards.push({ type: 'ob', location: '홀 우측 OB 라인', distance: 0 });
      if (i % 3 === 1) hazards.push({ type: 'water', location: '써드샷 지점 워터해저드', distance: 250 });
    }

    return {
      holeNumber,
      par,
      distanceMeter,
      distanceYard,
      handicap,
      elevationMeter: i % 3 === 0 ? -3 : i % 2 === 0 ? 6 : -1,
      shape: 'straight' as const,
      hazards,
      caddieStrategy: {
        safeRoute: par === 3
          ? '바람을 감안하여 그린 중앙 안전 공략'
          : '페어웨이 넓은 쪽을 노리는 안정적 티샷 후 세컨 온그린',
        attackRoute: par === 3
          ? '핀 다이렉트 공략으로 버디 찬스 노림'
          : '시원한 장타 티샷으로 투온 또는 숏어프로치 셋업',
        recommendedClub: par === 3 ? (distanceMeter > 160 ? '5~6번 아이언' : '7~8번 아이언') : '드라이버',
        keyWarning: '후반 집중력을 유지하고 무리한 샷을 피하세요.',
        caddieVoice: `${courseName} ${backCourse.name} ${holeNumber}번홀(Par ${par})입니다. 멋진 샷 기대하겠습니다, 대표님!`
      }
    };
  });

  return [...frontHoles, ...backHoles];
};
