// src/data/presetCourses.ts
import { Course, HoleInfo } from '../types/golf';

export const createStandardHoles = (
  courseName: string,
  outName: string,
  inName: string,
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

export const PRESET_COURSES: Course[] = [
  {
    id: 'south-springs',
    name: '사우스스프링스 CC',
    location: '경기도 이천시 모가면',
    totalHoles: 18,
    courses: {
      outCourseName: '레이크 코스',
      inCourseName: '마운틴 코스'
    },
    holes: createStandardHoles('사우스스프링스 CC', '레이크 코스', '마운틴 코스', 1.0, 0),
    tags: ['수도권', '이천', 'KLPGA', '대중제']
  },
  {
    id: 'jack-nicklaus',
    name: '잭니클라우스 GC 코리아',
    location: '인천 연수구 송도국제도시',
    totalHoles: 18,
    courses: {
      outCourseName: '어반 코스',
      inCourseName: '링크스 코스'
    },
    holes: createStandardHoles('잭니클라우스 GC', '어반 코스', '링크스 코스', 1.06, -2),
    tags: ['인천', '송도', '프레지던츠컵', '명문회원제']
  },
  {
    id: 'ananti-seoul',
    name: '아난티 클럽 서울',
    location: '경기도 가평군 설악면',
    totalHoles: 18,
    courses: {
      outCourseName: '젤코바 코스',
      inCourseName: '자작나무 코스'
    },
    holes: createStandardHoles('아난티 클럽 서울', '젤코바 코스', '자작나무 코스', 0.98, 4),
    tags: ['수도권', '가평', '리조트', '회원제']
  },
  {
    id: 'club-mow',
    name: '클럽모우 CC',
    location: '강원도 홍천군 서면',
    totalHoles: 18,
    courses: {
      outCourseName: '오아시스 코스',
      inCourseName: '와일드 코스'
    },
    holes: createStandardHoles('클럽모우 CC', '오아시스 코스', '와일드 코스', 1.0, 7),
    tags: ['강원', '홍천', '산악지형', '대중제']
  },
  {
    id: 'haesley-ninebridges',
    name: '해슬리 나인브릿지',
    location: '경기도 여주시 점동면',
    totalHoles: 18,
    courses: {
      outCourseName: '해슬리 코스',
      inCourseName: 'PGA 코스'
    },
    holes: createStandardHoles('해슬리 나인브릿지', '해슬리 코스', 'PGA 코스', 1.05, 0),
    tags: ['수도권', '여주', 'PGA투어', '세계100대코스']
  },
  {
    id: 'anyang-cc',
    name: '안양 CC',
    location: '경기도 군포시 당정동',
    totalHoles: 18,
    courses: {
      outCourseName: '아웃 코스',
      inCourseName: '인 코스'
    },
    holes: createStandardHoles('안양 CC', '아웃 코스', '인 코스', 1.02, -1),
    tags: ['수도권', '군포', '전통명문', '회원제']
  },
  {
    id: 'bearcreek-pocheon',
    name: '베어크리크 포천',
    location: '경기도 포천시 화현면',
    totalHoles: 18,
    courses: {
      outCourseName: '크리크 코스',
      inCourseName: '베어 코스'
    },
    holes: createStandardHoles('베어크리크 포천', '크리크 코스', '베어 코스', 1.03, 3),
    tags: ['수도권', '포천', '친환경골프장', '대중제']
  },
  {
    id: 'woo-jeong-hills',
    name: '우정힐스 CC',
    location: '충청남도 천안시 동남구',
    totalHoles: 18,
    courses: {
      outCourseName: '아웃 코스',
      inCourseName: '인 코스'
    },
    holes: createStandardHoles('우정힐스 CC', '아웃 코스', '인 코스', 1.04, 1),
    tags: ['충청', '천안', '한국오픈개최', '회원제']
  },
  {
    id: 'lavieestbelle',
    name: '라비에벨 CC',
    location: '강원도 춘천시 동산면',
    totalHoles: 18,
    courses: {
      outCourseName: '올드 코스',
      inCourseName: '듄스 코스'
    },
    holes: createStandardHoles('라비에벨 CC', '올드 코스', '듄스 코스', 1.01, 2),
    tags: ['강원', '춘천', '한옥클럽하우스', '대중제']
  },
  {
    id: 'club-72',
    name: '클럽72 (구 스카이72)',
    location: '인천 중구 영종해안북로',
    totalHoles: 18,
    courses: {
      outCourseName: '하늘 코스',
      inCourseName: '바다 코스'
    },
    holes: createStandardHoles('클럽72', '하늘 코스', '바다 코스', 1.04, -3),
    tags: ['인천', '영종도', '바닷바람', '대형골프장']
  },
  {
    id: 'pinx-gc',
    name: '핀크스 GC',
    location: '제주특별자치도 서귀포시 안덕면',
    totalHoles: 18,
    courses: {
      outCourseName: '동 코스',
      inCourseName: '서 코스'
    },
    holes: createStandardHoles('핀크스 GC', '동 코스', '서 코스', 1.02, 0),
    tags: ['제주', '서귀포', '세계100대코스', '명문회원제']
  },
  {
    id: 'blackstone-icheon',
    name: '블랙스톤 이천',
    location: '경기도 이천시 장호원읍',
    totalHoles: 18,
    courses: {
      outCourseName: '동 코스',
      inCourseName: '북 코스'
    },
    holes: createStandardHoles('블랙스톤 이천', '동 코스', '북 코스', 1.05, 3),
    tags: ['수도권', '이천', '유러피언투어개최', '회원제']
  },
  {
    id: 'lakeside-cc',
    name: '레이크사이드 CC',
    location: '경기도 용인시 처인구',
    totalHoles: 18,
    courses: {
      outCourseName: '동 코스',
      inCourseName: '남 코스'
    },
    holes: createStandardHoles('레이크사이드 CC', '동 코스', '남 코스', 1.0, 1),
    tags: ['수도권', '용인', '접근성최고', '대형54홀']
  },
  {
    id: 'sagewood-yeosu',
    name: '세이지우드 여수경도',
    location: '전라남도 여수시 대경도길',
    totalHoles: 18,
    courses: {
      outCourseName: '오동도 코스',
      inCourseName: '돌산도 코스'
    },
    holes: createStandardHoles('세이지우드 여수경도', '오동도 코스', '돌산도 코스', 0.99, -2),
    tags: ['전라', '여수', '아일랜드시사이드', '골프앤리조트']
  },
  {
    id: 'trinity-club',
    name: '트리니티 클럽',
    location: '경기도 여주시 가남읍',
    totalHoles: 18,
    courses: {
      outCourseName: '아웃 코스',
      inCourseName: '인 코스'
    },
    holes: createStandardHoles('트리니티 클럽', '아웃 코스', '인 코스', 1.06, 0),
    tags: ['수도권', '여주', '최고급프라이빗', '명문회원제']
  }
];
