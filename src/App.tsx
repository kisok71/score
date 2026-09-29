// src/App.tsx
import React, { useState, useEffect } from 'react';
import { MobileFrame } from './components/common/MobileFrame';
import { Header } from './components/common/Header';
import { BottomNav, NavTab } from './components/common/BottomNav';
import { HoleNavigator } from './components/round/HoleNavigator';
import { HoleScoreInput } from './components/round/HoleScoreInput';
import { CourseStrategyMap } from './components/course/CourseStrategyMap';
import { ScoreCardView } from './components/dashboard/ScoreCardView';
import { AnalyticsDashboard } from './components/dashboard/AnalyticsDashboard';
import { RoundHistoryView } from './components/history/RoundHistoryView';
import { RoundSetupModal } from './components/round/RoundSetupModal';
import { PenaltyGuideModal } from './components/round/PenaltyGuideModal';
import { CaddieChatModal } from './components/caddie/CaddieChatModal';
import { BagSettingsModal } from './components/caddie/BagSettingsModal';
import { CourseSearchModal } from './components/course/CourseSearchModal';
import { CustomCourseBuilderModal } from './components/course/CustomCourseBuilderModal';
import { BackupRestoreModal } from './components/common/BackupRestoreModal';
import { Flag, PlusCircle } from 'lucide-react';

import {
  loadRounds,
  saveRounds,
  deleteRound,
  updateRound,
  loadActiveRoundId,
  saveActiveRoundId,
  loadClubProfile,
  saveClubProfile,
  getAllCourses,
  saveCustomCourse,
  deleteCustomCourse,
  loadUserName,
  saveUserName,
} from './utils/storage';
import { Course, HoleScore, PlayerClubProfile, Round } from './types/golf';
import { PRESET_COURSES } from './data/presetCourses';
import { compose18HolesFromSubCourses } from './utils/golfHoleGenerator';

export const App: React.FC = () => {
  // Persistence state (Production clean deployment - No sample rounds by default)
  const [rounds, setRounds] = useState<Round[]>(() => loadRounds());
  const [activeRoundId, setActiveRoundId] = useState<string | null>(() => loadActiveRoundId());
  const [userName, setUserName] = useState<string>(() => loadUserName());
  const [clubProfile, setClubProfile] = useState<PlayerClubProfile>(() => {
    const prof = loadClubProfile();
    return { ...prof, userName: prof.userName || loadUserName() };
  });
  const [courses, setCourses] = useState<Course[]>(() => getAllCourses());

  // Navigation state
  const [currentTab, setCurrentTab] = useState<NavTab>('round');
  const [activeHoleNumber, setActiveHoleNumber] = useState<number>(1);

  // Modals
  const [isNewRoundOpen, setIsNewRoundOpen] = useState<boolean>(false);
  const [isPenaltyGuideOpen, setIsPenaltyGuideOpen] = useState<boolean>(false);
  const [isCaddieChatOpen, setIsCaddieChatOpen] = useState<boolean>(false);
  const [isBagSettingsOpen, setIsBagSettingsOpen] = useState<boolean>(false);
  const [isCourseSearchOpen, setIsCourseSearchOpen] = useState<boolean>(false);
  const [isCustomBuilderOpen, setIsCustomBuilderOpen] = useState<boolean>(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState<boolean>(false);
  const [builderInitialName, setBuilderInitialName] = useState<string>('');

  // Active round object
  const activeRound = rounds.find(r => r.id === activeRoundId) || rounds[0] || null;

  // Active course & round holes
  const currentCourse = courses.find(c => c.id === activeRound?.courseId) || PRESET_COURSES[0];
  const holes = activeRound?.holes && activeRound.holes.length === 18 ? activeRound.holes : currentCourse.holes;
  const currentHole = holes.find(h => h.holeNumber === activeHoleNumber) || holes[0];

  // Single player (the golfer)
  const activePlayer = activeRound?.players[0];

  // Save rounds whenever changed
  const updateRounds = (newRounds: Round[]) => {
    setRounds(newRounds);
    saveRounds(newRounds);
  };

  // Score update handler
  const handleUpdateScore = (holeNum: number, scorePatch: Partial<HoleScore>) => {
    if (!activeRound || !activePlayer) return;

    const currentScore = activePlayer.scores[holeNum] || {
      holeNumber: holeNum,
      strokes: currentHole.par,
      putts: 2,
      obCount: 0,
      hazardCount: 0,
      bunkerCount: 0,
      fairwayHit: currentHole.par >= 4 ? 'hit' : 'none',
      gir: 'on',
      sandSave: false,
    };

    const updatedScore = { ...currentScore, ...scorePatch };

    const updatedPlayers = [
      {
        ...activePlayer,
        scores: {
          ...activePlayer.scores,
          [holeNum]: updatedScore,
        },
      }
    ];

    const updatedRound: Round = {
      ...activeRound,
      players: updatedPlayers,
    };

    const newRounds = rounds.map(r => (r.id === updatedRound.id ? updatedRound : r));
    updateRounds(newRounds);
  };

  // Create new round handler
  const handleCreateRound = (newRound: Round) => {
    const updated = [newRound, ...rounds];
    updateRounds(updated);
    setActiveRoundId(newRound.id);
    saveActiveRoundId(newRound.id);
    if (newRound.players[0]?.name) {
      setUserName(newRound.players[0].name);
    }
    setActiveHoleNumber(1);
    setCurrentTab('round');
  };

  // Switch Course for Active Round
  const handleSelectCourse = (selectedCourse: Course) => {
    if (!activeRound) return;

    const roundHoles = selectedCourse.subCourses && selectedCourse.subCourses.length >= 2
      ? compose18HolesFromSubCourses(
          selectedCourse.name,
          selectedCourse.subCourses[0],
          selectedCourse.subCourses[1]
        )
      : selectedCourse.holes;

    const updatedRound: Round = {
      ...activeRound,
      courseId: selectedCourse.id,
      courseName: selectedCourse.name,
      courseSection: `${selectedCourse.courses.outCourseName} / ${selectedCourse.courses.inCourseName}`,
      holes: roundHoles,
    };

    const newRounds = rounds.map(r => (r.id === updatedRound.id ? updatedRound : r));
    updateRounds(newRounds);
    setActiveHoleNumber(1);
  };

  // Save Custom Course
  const handleSaveCustomCourse = (newCourse: Course) => {
    const updatedList = saveCustomCourse(newCourse);
    setCourses(updatedList);
    handleSelectCourse(newCourse);
  };

  // Delete Custom Course
  const handleDeleteCustomCourse = (courseId: string) => {
    const updatedList = deleteCustomCourse(courseId);
    setCourses(updatedList);
  };

  // Club profile update (including User Name)
  const handleSaveClubProfile = (profile: PlayerClubProfile) => {
    setClubProfile(profile);
    saveClubProfile(profile);

    if (profile.userName && profile.userName.trim() && profile.userName !== userName) {
      const newName = profile.userName.trim();
      setUserName(newName);
      saveUserName(newName);

      if (activeRound) {
        const updatedPlayers = activeRound.players.map(p => ({
          ...p,
          name: newName,
        }));
        const updatedRound = { ...activeRound, players: updatedPlayers };
        const newRounds = rounds.map(r => r.id === updatedRound.id ? updatedRound : r);
        updateRounds(newRounds);
      }
    }
  };

  // Full backup restore handler
  const handleDataRestored = () => {
    const loadedRounds = loadRounds();
    setRounds(loadedRounds);
    const loadedCourses = getAllCourses();
    setCourses(loadedCourses);
    const name = loadUserName();
    setUserName(name);
    const prof = loadClubProfile();
    setClubProfile(prof);
    if (loadedRounds.length > 0) {
      setActiveRoundId(loadedRounds[0].id);
    }
    setActiveHoleNumber(1);
  };

  // Round management handlers (Select, Delete, Update, Reset Samples)
  const handleSelectActiveRound = (roundId: string) => {
    setActiveRoundId(roundId);
    saveActiveRoundId(roundId);
    const targetRound = rounds.find(r => r.id === roundId);
    if (targetRound) {
      if (targetRound.status === 'in-progress') {
        setCurrentTab('round');
      } else {
        setCurrentTab('scorecard');
      }
    }
  };

  const handleDeleteRound = (roundId: string) => {
    const updated = deleteRound(roundId);
    setRounds(updated);
    if (activeRoundId === roundId) {
      if (updated.length > 0) {
        setActiveRoundId(updated[0].id);
      }
    }
  };

  const handleUpdateRound = (updatedRound: Round) => {
    const updated = updateRound(updatedRound);
    setRounds(updated);
  };

  // Prev / Next Hole
  const handlePrevHole = () => {
    if (activeHoleNumber > 1) {
      setActiveHoleNumber(activeHoleNumber - 1);
    }
  };

  const handleNextHole = () => {
    if (activeHoleNumber < 18) {
      setActiveHoleNumber(activeHoleNumber + 1);
    } else {
      setCurrentTab('analytics');
    }
  };

  return (
    <MobileFrame>
      {/* Header with interactive course search, Golfer Name, and Backup button */}
      <Header
        round={activeRound}
        userName={userName}
        onOpenNewRound={() => setIsNewRoundOpen(true)}
        onOpenCaddieChat={() => setIsCaddieChatOpen(true)}
        onOpenBagSettings={() => setIsBagSettingsOpen(true)}
        onOpenCourseSearch={() => setIsCourseSearchOpen(true)}
        onOpenBackupRestore={() => setIsBackupModalOpen(true)}
      />

      {/* Hole Navigator (Always visible on Round and Strategy tabs when active round exists) */}
      {(currentTab === 'round' || currentTab === 'strategy') && activePlayer && (
        <HoleNavigator
          holes={holes}
          activeHoleNumber={activeHoleNumber}
          onSelectHole={(num) => setActiveHoleNumber(num)}
          player={activePlayer}
        />
      )}

      {/* Main Tab Content */}
      <main className="flex-1 overflow-y-auto">
        {currentTab === 'round' && (
          activeRound && activePlayer ? (
            <HoleScoreInput
              hole={currentHole}
              player={activePlayer}
              onUpdateScore={handleUpdateScore}
              onPrevHole={handlePrevHole}
              onNextHole={handleNextHole}
              onOpenPenaltyGuide={() => setIsPenaltyGuideOpen(true)}
              onOpenStrategy={() => setCurrentTab('strategy')}
            />
          ) : (
            <div className="p-8 text-center space-y-4 my-auto flex flex-col items-center justify-center min-h-[50vh]">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-950">
                <Flag size={32} />
              </div>
              <div className="space-y-1 max-w-xs">
                <h3 className="text-base font-black text-white">진행 중인 라운드가 없습니다</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  골프장과 티업 시간을 설정하고 새로운 18홀 라운드를 시작해 보세요!
                </p>
              </div>
              <button
                onClick={() => setIsNewRoundOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs rounded-2xl shadow-xl shadow-emerald-950 flex items-center gap-2 active:scale-95 transition-all"
              >
                <PlusCircle size={16} />
                <span>새 라운드 시작하기</span>
              </button>
            </div>
          )
        )}

        {currentTab === 'strategy' && (
          <CourseStrategyMap
            hole={currentHole}
            round={activeRound}
            clubProfile={clubProfile}
          />
        )}

        {currentTab === 'scorecard' && (
          activeRound && activePlayer ? (
            <ScoreCardView
              round={activeRound}
              holes={holes}
              mainPlayer={activePlayer}
            />
          ) : (
            <div className="p-8 text-center space-y-4 my-auto flex flex-col items-center justify-center min-h-[50vh]">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-950">
                <Flag size={32} />
              </div>
              <div className="space-y-1 max-w-xs">
                <h3 className="text-base font-black text-white">기록된 스코어카드가 없습니다</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  새 라운드를 시작하고 18홀 스코어를 입력하시면 공식 스코어카드가 생성됩니다.
                </p>
              </div>
              <button
                onClick={() => setIsNewRoundOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs rounded-2xl shadow-xl shadow-emerald-950 flex items-center gap-2 active:scale-95 transition-all"
              >
                <PlusCircle size={16} />
                <span>새 라운드 시작하기</span>
              </button>
            </div>
          )
        )}

        {currentTab === 'analytics' && (
          <AnalyticsDashboard
            round={activeRound}
            holes={holes}
            allRounds={rounds}
            allCourses={courses}
            onSelectRound={handleSelectActiveRound}
            onOpenNewRound={() => setIsNewRoundOpen(true)}
          />
        )}

        {currentTab === 'history' && (
          <RoundHistoryView
            rounds={rounds}
            activeRoundId={activeRoundId}
            allCourses={courses}
            onSelectRound={handleSelectActiveRound}
            onDeleteRound={handleDeleteRound}
            onUpdateRound={handleUpdateRound}
            onOpenNewRound={() => setIsNewRoundOpen(true)}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        activeHoleNumber={activeHoleNumber}
      />

      {/* Modals */}
      <RoundSetupModal
        isOpen={isNewRoundOpen}
        onClose={() => setIsNewRoundOpen(false)}
        courses={courses}
        onCreateRound={handleCreateRound}
        onSaveCustomCourse={handleSaveCustomCourse}
        onDeleteCustomCourse={handleDeleteCustomCourse}
      />

      <CourseSearchModal
        isOpen={isCourseSearchOpen}
        onClose={() => setIsCourseSearchOpen(false)}
        courses={courses}
        selectedCourseId={currentCourse.id}
        onSelectCourse={handleSelectCourse}
        onOpenCreateCourse={(defaultName?: string) => {
          setBuilderInitialName(defaultName || '');
          setIsCustomBuilderOpen(true);
        }}
        onDeleteCustomCourse={handleDeleteCustomCourse}
      />

      <CustomCourseBuilderModal
        isOpen={isCustomBuilderOpen}
        onClose={() => setIsCustomBuilderOpen(false)}
        initialCourseName={builderInitialName}
        onSaveCourse={handleSaveCustomCourse}
      />

      <BackupRestoreModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        onDataRestored={handleDataRestored}
      />

      <PenaltyGuideModal
        isOpen={isPenaltyGuideOpen}
        onClose={() => setIsPenaltyGuideOpen(false)}
      />

      <CaddieChatModal
        isOpen={isCaddieChatOpen}
        onClose={() => setIsCaddieChatOpen(false)}
        currentHole={currentHole}
        round={activeRound}
      />

      <BagSettingsModal
        isOpen={isBagSettingsOpen}
        onClose={() => setIsBagSettingsOpen(false)}
        profile={clubProfile}
        onSaveProfile={handleSaveClubProfile}
      />
    </MobileFrame>
  );
};

export default App;
