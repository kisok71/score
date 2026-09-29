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

export function loadRounds(): Round[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ROUNDS);
    if (!raw) {
      return [];
    }
    const parsed: Round[] = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return [];
    }

    // Filter out all sample/showcase rounds for production clean deployment
    const realRounds = parsed.filter(
      r => !r.id.startsWith('sample-round-') && r.id !== 'showcase-round-1'
    );

    // Save cleaned real rounds if any sample was purged
    if (realRounds.length !== parsed.length) {
      saveRounds(realRounds);
    }

    const userName = loadUserName();
    return realRounds.map(r => ({
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
  } catch (e) {
    console.error('Failed to load rounds', e);
    return [];
  }
}

export function saveRounds(rounds: Round[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.ROUNDS, JSON.stringify(rounds));
  } catch (e) {
    console.error('Failed to save rounds', e);
  }
}

export function deleteRound(roundId: string): Round[] {
  const current = loadRounds();
  const updated = current.filter(r => r.id !== roundId);
  saveRounds(updated);

  const activeId = loadActiveRoundId();
  if (activeId === roundId) {
    if (updated.length > 0) {
      saveActiveRoundId(updated[0].id);
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_ROUND_ID);
    }
  }

  return updated;
}

export function updateRound(updatedRound: Round): Round[] {
  const current = loadRounds();
  const exists = current.some(r => r.id === updatedRound.id);
  const updated = exists
    ? current.map(r => r.id === updatedRound.id ? updatedRound : r)
    : [updatedRound, ...current];
  saveRounds(updated);
  return updated;
}

export function loadActiveRoundId(): string | null {
  const id = localStorage.getItem(STORAGE_KEYS.ACTIVE_ROUND_ID);
  if (!id || id.startsWith('sample-round-') || id === 'showcase-round-1') {
    try {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_ROUND_ID);
    } catch {}
    return null;
  }
  return id;
}

export function saveActiveRoundId(id: string) {
  localStorage.setItem(STORAGE_KEYS.ACTIVE_ROUND_ID, id);
}

export function loadClubProfile(): PlayerClubProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CLUB_PROFILE);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_CLUB_PROFILE, ...parsed, userName: parsed.userName || loadUserName() };
    }
    return DEFAULT_CLUB_PROFILE;
  } catch {
    return DEFAULT_CLUB_PROFILE;
  }
}

export function saveClubProfile(profile: PlayerClubProfile) {
  localStorage.setItem(STORAGE_KEYS.CLUB_PROFILE, JSON.stringify(profile));
  if (profile.userName) {
    saveUserName(profile.userName);
  }
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

export function getCustomCourses(): Course[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_COURSES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
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

// ==========================================
// Backup & Restore System (JSON Export / Import)
// ==========================================

export interface AppBackupData {
  app: 'CaddieMaster';
  version: '1.0';
  exportedAt: string;
  userName: string;
  clubProfile: PlayerClubProfile;
  rounds: Round[];
  customCourses: Course[];
}

export function createFullBackup(): AppBackupData {
  const userName = loadUserName();
  const clubProfile = loadClubProfile();
  const rounds = loadRounds();
  const customCourses = getCustomCourses();

  return {
    app: 'CaddieMaster',
    version: '1.0',
    exportedAt: new Date().toISOString(),
    userName,
    clubProfile,
    rounds,
    customCourses,
  };
}

export function downloadBackupFile() {
  const backup = createFullBackup();
  const jsonStr = JSON.stringify(backup, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const timeStr = `${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
  const filename = `caddiemaster_backup_${dateStr}_${timeStr}.json`;

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function restoreFromBackup(
  backup: AppBackupData,
  mode: 'overwrite' | 'merge' = 'overwrite'
): { success: boolean; message: string; roundCount: number; courseCount: number } {
  try {
    if (!backup || !backup.rounds || !Array.isArray(backup.rounds)) {
      return { success: false, message: '올바른 CaddieMaster 백업 파일 형식이 아닙니다.', roundCount: 0, courseCount: 0 };
    }

    // Restore User Name
    if (backup.userName) {
      saveUserName(backup.userName);
    }

    // Restore Club Profile
    if (backup.clubProfile) {
      saveClubProfile(backup.clubProfile);
    }

    // Restore Rounds
    let finalRounds: Round[] = [];
    if (mode === 'merge') {
      const existingRounds = loadRounds();
      const existingIds = new Set(existingRounds.map(r => r.id));
      const newRounds = backup.rounds.filter(r => !existingIds.has(r.id));
      finalRounds = [...existingRounds, ...newRounds];
    } else {
      finalRounds = backup.rounds;
    }
    saveRounds(finalRounds);

    if (finalRounds.length > 0) {
      saveActiveRoundId(finalRounds[0].id);
    }

    // Restore Custom Courses
    let finalCourses: Course[] = [];
    const backupCustomCourses = backup.customCourses || [];
    if (mode === 'merge') {
      const existingCustom = getCustomCourses();
      const existingIds = new Set(existingCustom.map(c => c.id));
      const newCourses = backupCustomCourses.filter(c => !existingIds.has(c.id));
      finalCourses = [...existingCustom, ...newCourses];
    } else {
      finalCourses = backupCustomCourses;
    }
    localStorage.setItem(STORAGE_KEYS.CUSTOM_COURSES, JSON.stringify(finalCourses));

    return {
      success: true,
      message: '성공적으로 백업 데이터를 불러왔습니다!',
      roundCount: finalRounds.length,
      courseCount: finalCourses.length,
    };
  } catch (e: any) {
    console.error('Failed to restore backup', e);
    return { success: false, message: `복원 중 오류 발생: ${e?.message || e}`, roundCount: 0, courseCount: 0 };
  }
}
