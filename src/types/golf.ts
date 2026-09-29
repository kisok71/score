// src/types/golf.ts

export type TeeType = 'black' | 'blue' | 'white' | 'red';

export type WeatherType = 'sunny' | 'cloudy' | 'windy' | 'rainy';

export type FairwayHit = 'hit' | 'left' | 'right' | 'none';

export type GreenHit = 'on' | 'miss' | 'fringe';

export interface HoleInfo {
  holeNumber: number; // 1 to 18
  par: 3 | 4 | 5 | 6;
  distanceMeter: number; // e.g. 350
  distanceYard: number;  // e.g. 383
  handicap: number;      // 1 to 18 (1 is hardest)
  elevationMeter: number; // +10 (uphill) or -8 (downhill)
  shape: 'straight' | 'dogleg-left' | 'dogleg-right' | 'island';
  hazards: {
    type: 'water' | 'bunker' | 'ob' | 'lateral';
    location: string; // e.g., '티샷 210m 우측 워터해저드'
    distance: number;
  }[];
  caddieStrategy: {
    safeRoute: string;     // 안전 공략
    attackRoute: string;   // 공격 공략
    recommendedClub: string; // 추천 클럽 (드라이버, 3번 우드, 유틸 등)
    keyWarning: string;    // 핵심 주의사항 (슬라이스 바람, 내리막 그린 등)
    caddieVoice: string;   // 캐디의 생생한 현장 조언
  };
}

export interface Course {
  id: string;
  name: string;        // e.g. "사우스스프링스 CC"
  location: string;    // e.g. "경기도 이천시"
  totalHoles: number;  // 18
  courses: {
    outCourseName: string; // e.g. "레이크 코스"
    inCourseName: string;  // e.g. "마운틴 코스"
  };
  holes: HoleInfo[];    // 18 holes
  isCustom?: boolean;   // 사용자가 직접 등록한 코스 여부
  tags?: string[];      // 예: ["수도권", "KLPGA", "회원제"]
}

export interface HoleScore {
  holeNumber: number;
  strokes: number;       // 총 타수 (퍼트 및 벌타 포함)
  putts: number;         // 퍼트 수
  obCount: number;       // OB 발생 횟수 (1회당 2벌타)
  hazardCount: number;   // 해저드/페널티구역 횟수 (1회당 1벌타)
  bunkerCount: number;   // 벙커 샷 횟수
  fairwayHit: FairwayHit;// 티샷 페어웨이 안착 여부
  gir: GreenHit;         // 레귤레이션 온 (그린 적중 여부)
  sandSave: boolean;     // 벙커 탈출 후 파 세이브 여부
  notes?: string;        // 홀 메모
}

export interface Player {
  id: string;
  name: string;
  handicap: number;
  avatarColor: string;
  isMainUser: boolean;
  scores: Record<number, HoleScore>; // holeNumber -> score
}

export interface Round {
  id: string;
  date: string;          // YYYY-MM-DD
  teeOffTime: string;    // HH:mm (e.g. 07:30)
  courseId: string;
  courseName: string;
  courseSection: string; // "레이크 / 마운틴"
  teeBox: TeeType;
  weather: WeatherType;
  windSpeed: number;     // m/s
  players: Player[];
  status: 'in-progress' | 'completed';
  createdAt: number;
}

export interface PlayerClubProfile {
  driverDistance: number;    // 기본 220m
  wood3Distance: number;     // 200m
  utilityDistance: number;   // 185m
  iron7Distance: number;     // 145m
  pitchingDistance: number;  // 115m
  sandDistance: number;      // 75m
  preferredShotShape: 'straight' | 'fade' | 'draw';
}

export interface RoundStats {
  totalStrokes: number;
  overPar: number;
  frontStrokes: number;
  backStrokes: number;
  totalPutts: number;
  avgPuttsPerHole: number;
  fairwayAccuracy: number; // %
  girRate: number;         // %
  scramblingRate: number;  // % (GIR 실패 후 파 세이브율)
  totalOB: number;
  totalHazard: number;
  penaltyStrokesLost: number;
  scoreBreakdown: {
    albatross: number;
    eagle: number;
    birdie: number;
    par: number;
    bogey: number;
    doubleBogey: number;
    triplePlus: number;
  };
  parStats: {
    par3Avg: number;
    par4Avg: number;
    par5Avg: number;
  };
}
