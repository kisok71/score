// src/utils/storage.ts
import { PRESET_COURSES } from '../data/presetCourses';
import { Course, PlayerClubProfile, Round } from '../types/golf';

const STORAGE_KEYS = {
  ROUNDS: 'caddiemaster_rounds_v1',
  ACTIVE_ROUND_ID: 'caddiemaster_active_round_id_v1',
  CLUB_PROFILE: 'caddiemaster_club_profile_v1',
  CUSTOM_COURSES: 'caddiemaster_custom_courses_v1',
  USER_NAME: 'caddiemaster_user_name_v1',
};

export const DEFAULT_CLUB_PROFILE: PlayerClubProfile = {
  userName: '골퍼 (나)',
  driverDistance: 220,
  wood3Distance: 200,
  utilityDistance: 185,
  iron7Distance: 150,
  pitchingDistance: 115,
  sandDistance: 80,
  preferredShotShape: 'straight',
};

export function loadUserName(): string {
  try {
    return localStorage.getItem(STORAGE_KEYS.USER_NAME) || '골퍼 (나)';
  } catch {
    return '골퍼 (나)';
  }
}

export function saveUserName(name: string) {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_NAME, name);
  } catch (e) {
    console.error('Failed to save user name', e);
  }
}

// Realistic mock round for initial showcase (Single user only)
function createInitialShowcaseRound(): Round {
  const course = PRESET_COURSES[0]; // 사우스스프링스 CC
  const holes = course.holes;

  const scoresObj: Record<number, any> = {};
  const mockStrokes = [4, 5, 3, 4, 5, 2, 5, 5, 4, 5, 6, 3, 4, 5, 4, 5, 4, 5];
  const mockPutts =   [2, 2, 1, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2];
  const mockFw: ('hit' | 'left' | 'right' | 'none')[] = [
    'hit', 'right', 'none', 'hit', 'hit', 'none', 'left', 'hit', 'hit',
    'hit', 'left', 'none', 'hit', 'right', 'none', 'hit', 'hit', 'left'
  ];
  const mockGir: ('on' | 'miss')[] = [
    'on', 'miss', 'on', 'on', 'miss', 'on', 'miss', 'on', 'on',
    'miss', 'miss', 'on', 'on', 'miss', 'miss', 'on', 'on', 'miss'
  ];
  const mockOb = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
  const mockHazard = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  holes.forEach((h, i) => {
    scoresObj[h.holeNumber] = {
      holeNumber: h.holeNumber,
      strokes: mockStrokes[i],
      putts: mockPutts[i],
      obCount: mockOb[i],
      hazardCount: mockHazard[i],
      bunkerCount: i === 1 ? 1 : 0,
      fairwayHit: mockFw[i],
      gir: mockGir[i],
      sandSave: i === 1,
      notes: i === 5 ? '환상의 7m 버디 퍼트 성공!' : undefined
    };
  });

  return {
    id: 'showcase-round-1',
    date: '2026-09-28',
    teeOffTime: '07:28',
    courseId: course.id,
    courseName: course.name,
    courseSection: `${course.courses.outCourseName} / ${course.courses.inCourseName}`,
    teeBox: 'white',
    weather: 'sunny',
    windSpeed: 2,
    status: 'completed',
    createdAt: Date.now() - 86400000,
    players: [
      {
        id: 'player-1',
        name: loadUserName(),
        handicap: 12,
        avatarColor: '#10b981',
        isMainUser: true,
        scores: scoresObj
      }
    ]
  };
}

export function loadRounds(): Round[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ROUNDS);
    if (!raw) {
      const initial = [createInitialShowcaseRound()];
      saveRounds(initial);
      return initial;
    }
    const parsed: Round[] = JSON.parse(raw);
    const userName = loadUserName();

    // Ensure only single main user is kept for each round
    const cleaned = parsed.map(r => ({
      ...r,
      players: r.players
        .filter(p => p.isMainUser || p.id === 'player-1' || p.id === r.players[0]?.id)
        .slice(0, 1)
        .map(p => ({
          ...p,
          name: p.name || userName,
          isMainUser: true,
        }))
    }));

    return cleaned;
  } catch (e) {
    console.error('Failed to load rounds', e);
    return [createInitialShowcaseRound()];
  }
}

export function saveRounds(rounds: Round[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.ROUNDS, JSON.stringify(rounds));
  } catch (e) {
    console.error('Failed to save rounds', e);
  }
}

export function loadActiveRoundId(): string | null {
  return localStorage.getItem(STORAGE_KEYS.ACTIVE_ROUND_ID) || 'showcase-round-1';
}

export function saveActiveRoundId(id: string) {
  localStorage.setItem(STORAGE_KEYS.ACTIVE_ROUND_ID, id);
}

export function loadClubProfile(): PlayerClubProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CLUB_PROFILE);
    return raw ? JSON.parse(raw) : DEFAULT_CLUB_PROFILE;
  } catch {
    return DEFAULT_CLUB_PROFILE;
  }
}

export function saveClubProfile(profile: PlayerClubProfile) {
  localStorage.setItem(STORAGE_KEYS.CLUB_PROFILE, JSON.stringify(profile));
}

export function getAllCourses(): Course[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_COURSES);
    const custom: Course[] = raw ? JSON.parse(raw) : [];
    return [...PRESET_COURSES, ...custom];
  } catch {
    return PRESET_COURSES;
  }
}

export function saveCustomCourse(course: Course): Course[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_COURSES);
    let custom: Course[] = raw ? JSON.parse(raw) : [];
    const index = custom.findIndex(c => c.id === course.id);
    if (index >= 0) {
      custom[index] = course;
    } else {
      custom.unshift(course);
    }
    localStorage.setItem(STORAGE_KEYS.CUSTOM_COURSES, JSON.stringify(custom));
    return [...PRESET_COURSES, ...custom];
  } catch (e) {
    console.error('Failed to save custom course', e);
    return PRESET_COURSES;
  }
}

export function deleteCustomCourse(courseId: string): Course[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_COURSES);
    let custom: Course[] = raw ? JSON.parse(raw) : [];
    custom = custom.filter(c => c.id !== courseId);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_COURSES, JSON.stringify(custom));
    return [...PRESET_COURSES, ...custom];
  } catch (e) {
    console.error('Failed to delete custom course', e);
    return PRESET_COURSES;
  }
}
