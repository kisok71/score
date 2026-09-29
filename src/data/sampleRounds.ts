// src/data/sampleRounds.ts
import { PRESET_COURSES } from './presetCourses';
import { HoleScore, Round } from '../types/golf';

interface RoundBlueprint {
  id: string;
  courseId: string;
  courseName: string;
  courseSection: string;
  date: string;
  teeOffTime: string;
  weather: 'sunny' | 'cloudy' | 'windy' | 'rainy';
  windSpeed: number;
  teeBox: 'white' | 'blue' | 'black' | 'red';
  status: 'completed' | 'in-progress';
  strokes: number[]; // 18 numbers
  putts: number[];   // 18 numbers
  obHoles: number[]; // hole numbers (1-18) where OB occurred
  hazardHoles: number[]; // hole numbers (1-18) where hazard occurred
  bunkerHoles: number[]; // hole numbers where bunker was hit
  fairwayHits: ('hit' | 'left' | 'right' | 'none')[];
  girHits: ('on' | 'miss')[];
  notes?: Record<number, string>;
}

const SAMPLE_BLUEPRINTS: RoundBlueprint[] = [
  {
    id: 'sample-round-1',
    courseId: 'south-springs',
    courseName: '사우스스프링스 CC',
    courseSection: '레이크 / 마운틴',
    date: '2026-09-28',
    teeOffTime: '07:28',
    weather: 'sunny',
    windSpeed: 2,
    teeBox: 'white',
    status: 'completed',
    strokes:     [4, 5, 3, 4, 5, 2, 5, 5, 4, 5, 6, 3, 4, 5, 4, 5, 4, 5], // 82
    putts:       [2, 2, 1, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2], // 31
    obHoles:     [11],
    hazardHoles: [2],
    bunkerHoles: [2, 10],
    fairwayHits: ['hit', 'right', 'none', 'hit', 'hit', 'none', 'left', 'hit', 'hit', 'hit', 'left', 'none', 'hit', 'right', 'none', 'hit', 'hit', 'left'],
    girHits:     ['on', 'miss', 'on', 'on', 'miss', 'on', 'miss', 'on', 'on', 'miss', 'miss', 'on', 'on', 'miss', 'miss', 'on', 'on', 'miss'],
    notes: { 6: '환상의 7m 버디 퍼트 성공!', 11: '특설 OB티 4번째 샷 온그린 더블보기 방어' }
  },
  {
    id: 'sample-round-2',
    courseId: 'jack-nicklaus-korea',
    courseName: '잭니클라우스 GC 코리아',
    courseSection: '어반 코스 / 링크스 코스',
    date: '2026-09-14',
    teeOffTime: '08:02',
    weather: 'windy',
    windSpeed: 4,
    teeBox: 'white',
    status: 'completed',
    strokes:     [5, 4, 4, 5, 5, 3, 5, 6, 4, 4, 6, 4, 4, 5, 3, 6, 4, 4], // 85
    putts:       [2, 2, 2, 2, 2, 1, 2, 3, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2], // 35
    obHoles:     [8],
    hazardHoles: [11],
    bunkerHoles: [1, 7, 16],
    fairwayHits: ['left', 'hit', 'hit', 'hit', 'right', 'none', 'hit', 'left', 'hit', 'hit', 'left', 'none', 'hit', 'hit', 'none', 'right', 'hit', 'hit'],
    girHits:     ['miss', 'on', 'on', 'miss', 'miss', 'on', 'miss', 'miss', 'on', 'on', 'miss', 'miss', 'on', 'miss', 'on', 'miss', 'on', 'on'],
    notes: { 10: '바람 계산 완벽했던 120m 9번 아이언 핀 1m 버디!' }
  },
  {
    id: 'sample-round-3',
    courseId: 'club-72-cc',
    courseName: '클럽72 CC',
    courseSection: '하늘 코스 / 바다 코스',
    date: '2026-08-22',
    teeOffTime: '06:50',
    weather: 'sunny',
    windSpeed: 1,
    teeBox: 'white',
    status: 'completed',
    strokes:     [4, 4, 3, 4, 4, 3, 4, 5, 4, 4, 5, 2, 4, 4, 3, 5, 4, 5], // 79 (라베 Life Best!)
    putts:       [2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2], // 29
    obHoles:     [],
    hazardHoles: [],
    bunkerHoles: [8],
    fairwayHits: ['hit', 'hit', 'none', 'hit', 'hit', 'none', 'hit', 'hit', 'hit', 'hit', 'hit', 'none', 'hit', 'hit', 'none', 'hit', 'right', 'hit'],
    girHits:     ['on', 'on', 'on', 'on', 'on', 'miss', 'on', 'on', 'on', 'on', 'miss', 'on', 'on', 'on', 'on', 'miss', 'on', 'miss'],
    notes: { 12: '165m 6번 아이언 핀 하이 1.5m 버디! 오늘 생애 베스트(79타) 달성!' }
  },
  {
    id: 'sample-round-4',
    courseId: 'anyang-cc',
    courseName: '안양 CC',
    courseSection: '아웃 코스 / 인 코스',
    date: '2026-08-05',
    teeOffTime: '07:40',
    weather: 'cloudy',
    windSpeed: 2,
    teeBox: 'white',
    status: 'completed',
    strokes:     [4, 5, 3, 5, 4, 4, 5, 5, 4, 5, 5, 3, 4, 5, 4, 5, 4, 5], // 83
    putts:       [2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2], // 33
    obHoles:     [],
    hazardHoles: [4],
    bunkerHoles: [2, 14],
    fairwayHits: ['hit', 'left', 'none', 'right', 'hit', 'none', 'hit', 'hit', 'hit', 'left', 'hit', 'none', 'hit', 'left', 'none', 'hit', 'hit', 'hit'],
    girHits:     ['on', 'miss', 'on', 'miss', 'on', 'miss', 'miss', 'on', 'on', 'miss', 'on', 'on', 'on', 'miss', 'miss', 'on', 'on', 'miss'],
  },
  {
    id: 'sample-round-5',
    courseId: 'lavieestbelle-cc',
    courseName: '라비에벨 CC',
    courseSection: '올드 코스 / 듄스 코스',
    date: '2026-07-18',
    teeOffTime: '07:12',
    weather: 'sunny',
    windSpeed: 3,
    teeBox: 'white',
    status: 'completed',
    strokes:     [5, 5, 3, 5, 5, 4, 4, 6, 4, 4, 6, 3, 5, 4, 4, 6, 4, 5], // 86
    putts:       [2, 2, 1, 2, 2, 2, 2, 3, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2], // 34
    obHoles:     [8],
    hazardHoles: [11],
    bunkerHoles: [4, 16],
    fairwayHits: ['right', 'hit', 'none', 'hit', 'left', 'none', 'hit', 'right', 'hit', 'hit', 'left', 'none', 'hit', 'hit', 'none', 'right', 'hit', 'hit'],
    girHits:     ['miss', 'miss', 'on', 'miss', 'miss', 'miss', 'on', 'miss', 'on', 'on', 'miss', 'on', 'miss', 'on', 'miss', 'miss', 'on', 'miss'],
  },
  {
    id: 'sample-round-6',
    courseId: 'pinx-gc',
    courseName: '핀크스 GC',
    courseSection: '동 코스 / 서 코스',
    date: '2026-06-02',
    teeOffTime: '09:30',
    weather: 'windy',
    windSpeed: 4,
    teeBox: 'white',
    status: 'completed',
    strokes:     [4, 4, 3, 5, 4, 3, 5, 5, 4, 4, 5, 3, 4, 5, 3, 5, 4, 5], // 81
    putts:       [2, 1, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2], // 31
    obHoles:     [],
    hazardHoles: [7],
    bunkerHoles: [4, 14],
    fairwayHits: ['hit', 'hit', 'none', 'hit', 'hit', 'none', 'left', 'hit', 'hit', 'hit', 'hit', 'none', 'hit', 'hit', 'none', 'hit', 'hit', 'hit'],
    girHits:     ['on', 'on', 'on', 'miss', 'on', 'on', 'miss', 'on', 'on', 'on', 'miss', 'on', 'on', 'miss', 'on', 'miss', 'on', 'miss'],
    notes: { 6: '한라산 라이를 완벽히 읽고 4m 버디 퍼트 성공' }
  },
  {
    id: 'sample-round-7',
    courseId: 'haesley-nine-bridges',
    courseName: '해슬리 나인브릿지',
    courseSection: 'PGA 코스 / 클럽 코스',
    date: '2026-05-15',
    teeOffTime: '11:20',
    weather: 'rainy',
    windSpeed: 3,
    teeBox: 'white',
    status: 'completed',
    strokes:     [5, 5, 4, 6, 5, 3, 5, 6, 5, 5, 5, 4, 5, 5, 4, 6, 4, 6], // 88
    putts:       [2, 2, 2, 2, 2, 1, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3], // 37
    obHoles:     [4, 16],
    hazardHoles: [8],
    bunkerHoles: [1, 9, 13, 18],
    fairwayHits: ['left', 'hit', 'none', 'right', 'left', 'none', 'hit', 'right', 'left', 'hit', 'hit', 'none', 'left', 'hit', 'none', 'right', 'hit', 'left'],
    girHits:     ['miss', 'miss', 'miss', 'miss', 'miss', 'on', 'miss', 'miss', 'miss', 'miss', 'on', 'miss', 'miss', 'miss', 'miss', 'miss', 'on', 'miss'],
  },
  {
    id: 'sample-round-8',
    courseId: 'south-springs',
    courseName: '사우스스프링스 CC',
    courseSection: '레이크 / 마운틴',
    date: '2025-10-20',
    teeOffTime: '08:15',
    weather: 'sunny',
    windSpeed: 2,
    teeBox: 'white',
    status: 'completed',
    strokes:     [5, 4, 3, 5, 4, 3, 5, 6, 4, 5, 5, 3, 5, 5, 3, 5, 4, 5], // 84
    putts:       [2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2], // 32
    obHoles:     [8],
    hazardHoles: [13],
    bunkerHoles: [7, 17],
    fairwayHits: ['hit', 'hit', 'none', 'hit', 'hit', 'none', 'left', 'right', 'hit', 'left', 'hit', 'none', 'right', 'hit', 'none', 'hit', 'hit', 'hit'],
    girHits:     ['miss', 'on', 'on', 'miss', 'on', 'on', 'miss', 'miss', 'on', 'miss', 'on', 'on', 'miss', 'miss', 'on', 'on', 'on', 'miss'],
  },
  {
    id: 'sample-round-9',
    courseId: 'ananti-club-seoul',
    courseName: '아난티 클럽 서울',
    courseSection: '젤코바 코스 / 버치 코스',
    date: '2025-09-12',
    teeOffTime: '07:50',
    weather: 'cloudy',
    windSpeed: 2,
    teeBox: 'white',
    status: 'completed',
    strokes:     [5, 5, 4, 5, 5, 4, 5, 6, 4, 5, 6, 3, 4, 5, 4, 6, 4, 5], // 87
    putts:       [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 1, 2, 2, 2, 2, 2, 2], // 35
    obHoles:     [8, 11],
    hazardHoles: [4],
    bunkerHoles: [2, 10, 16],
    fairwayHits: ['right', 'hit', 'none', 'right', 'hit', 'none', 'hit', 'left', 'hit', 'hit', 'right', 'none', 'hit', 'left', 'none', 'right', 'hit', 'hit'],
    girHits:     ['miss', 'miss', 'miss', 'miss', 'miss', 'miss', 'miss', 'miss', 'on', 'miss', 'miss', 'on', 'on', 'miss', 'miss', 'miss', 'on', 'miss'],
  },
  {
    id: 'sample-round-10',
    courseId: 'woojung-hills',
    courseName: '우정힐스 CC',
    courseSection: '아웃 코스 / 인 코스',
    date: '2025-06-08',
    teeOffTime: '08:30',
    weather: 'sunny',
    windSpeed: 3,
    teeBox: 'white',
    status: 'completed',
    strokes:     [5, 5, 4, 6, 5, 4, 5, 6, 5, 5, 6, 3, 5, 5, 4, 6, 4, 6], // 89
    putts:       [2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2], // 36
    obHoles:     [4, 8],
    hazardHoles: [11],
    bunkerHoles: [3, 9, 13, 17],
    fairwayHits: ['left', 'hit', 'none', 'right', 'hit', 'none', 'left', 'right', 'hit', 'hit', 'right', 'none', 'left', 'hit', 'none', 'right', 'hit', 'left'],
    girHits:     ['miss', 'miss', 'miss', 'miss', 'miss', 'miss', 'miss', 'miss', 'miss', 'miss', 'miss', 'on', 'miss', 'miss', 'miss', 'miss', 'on', 'miss'],
  }
];

export function generateSampleRounds(userName: string = '골퍼 (나)'): Round[] {
  return SAMPLE_BLUEPRINTS.map((bp) => {
    const scoresObj: Record<number, HoleScore> = {};

    for (let h = 1; h <= 18; h++) {
      const idx = h - 1;
      scoresObj[h] = {
        holeNumber: h,
        strokes: bp.strokes[idx],
        putts: bp.putts[idx],
        obCount: bp.obHoles.includes(h) ? 1 : 0,
        hazardCount: bp.hazardHoles.includes(h) ? 1 : 0,
        bunkerCount: bp.bunkerHoles.includes(h) ? 1 : 0,
        fairwayHit: bp.fairwayHits[idx] || 'hit',
        gir: bp.girHits[idx] || 'on',
        sandSave: bp.bunkerHoles.includes(h) && bp.strokes[idx] <= 4,
        notes: bp.notes?.[h]
      };
    }

    return {
      id: bp.id,
      date: bp.date,
      teeOffTime: bp.teeOffTime,
      courseId: bp.courseId,
      courseName: bp.courseName,
      courseSection: bp.courseSection,
      teeBox: bp.teeBox,
      weather: bp.weather,
      windSpeed: bp.windSpeed,
      status: bp.status,
      createdAt: new Date(bp.date).getTime(),
      players: [
        {
          id: 'player-1',
          name: userName,
          handicap: 12,
          avatarColor: '#10b981',
          isMainUser: true,
          scores: scoresObj
        }
      ]
    };
  });
}
