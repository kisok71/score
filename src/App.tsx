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
import { RoundSetupModal } from './components/round/RoundSetupModal';
import { PenaltyGuideModal } from './components/round/PenaltyGuideModal';
import { CaddieChatModal } from './components/caddie/CaddieChatModal';
import { BagSettingsModal } from './components/caddie/BagSettingsModal';
import { CourseSearchModal } from './components/course/CourseSearchModal';
import { CustomCourseBuilderModal } from './components/course/CustomCourseBuilderModal';

import {
  loadRounds,
  saveRounds,
  loadActiveRoundId,
  saveActiveRoundId,
  loadClubProfile,
  saveClubProfile,
  getAllCourses,
  saveCustomCourse,
  deleteCustomCourse,
} from './utils/storage';
import { Course, HoleScore, PlayerClubProfile, Round } from './types/golf';
import { PRESET_COURSES } from './data/presetCourses';

export const App: React.FC = () => {
  // Persistence state
  const [rounds, setRounds] = useState<Round[]>(() => loadRounds());
  const [activeRoundId, setActiveRoundId] = useState<string>(() => loadActiveRoundId() || 'showcase-round-1');
  const [clubProfile, setClubProfile] = useState<PlayerClubProfile>(() => loadClubProfile());
  const [courses, setCourses] = useState<Course[]>(() => getAllCourses());

  // Navigation state
  const [currentTab, setCurrentTab] = useState<NavTab>('round');
  const [activeHoleNumber, setActiveHoleNumber] = useState<number>(1);
  const [activePlayerId, setActivePlayerId] = useState<string>('');

  // Modals
  const [isNewRoundOpen, setIsNewRoundOpen] = useState<boolean>(false);
  const [isPenaltyGuideOpen, setIsPenaltyGuideOpen] = useState<boolean>(false);
  const [isCaddieChatOpen, setIsCaddieChatOpen] = useState<boolean>(false);
  const [isBagSettingsOpen, setIsBagSettingsOpen] = useState<boolean>(false);
  const [isCourseSearchOpen, setIsCourseSearchOpen] = useState<boolean>(false);
  const [isCustomBuilderOpen, setIsCustomBuilderOpen] = useState<boolean>(false);

  // Active round object
  const activeRound = rounds.find(r => r.id === activeRoundId) || rounds[0] || null;

  // Active course
  const currentCourse = courses.find(c => c.id === activeRound?.courseId) || PRESET_COURSES[0];
  const holes = currentCourse.holes;
  const currentHole = holes.find(h => h.holeNumber === activeHoleNumber) || holes[0];

  // Active player
  useEffect(() => {
    if (activeRound && (!activePlayerId || !activeRound.players.some(p => p.id === activePlayerId))) {
      const main = activeRound.players.find(p => p.isMainUser) || activeRound.players[0];
      if (main) setActivePlayerId(main.id);
    }
  }, [activeRound, activePlayerId]);

  const activePlayer = activeRound?.players.find(p => p.id === activePlayerId) || activeRound?.players[0];

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

    const updatedPlayers = activeRound.players.map(p => {
      if (p.id === activePlayer.id) {
        return {
          ...p,
          scores: {
            ...p.scores,
            [holeNum]: updatedScore,
          },
        };
      }
      return p;
    });

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
    setActiveHoleNumber(1);
    setCurrentTab('round');
  };

  // Switch Course for Active Round
  const handleSelectCourse = (selectedCourse: Course) => {
    if (!activeRound) return;

    // Update active round's course info and sections
    const updatedRound: Round = {
      ...activeRound,
      courseId: selectedCourse.id,
      courseName: selectedCourse.name,
      courseSection: `${selectedCourse.courses.outCourseName} / ${selectedCourse.courses.inCourseName}`,
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

  // Club profile update
  const handleSaveClubProfile = (profile: PlayerClubProfile) => {
    setClubProfile(profile);
    saveClubProfile(profile);
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
      // Completed round, navigate to analytics dashboard
      setCurrentTab('analytics');
    }
  };

  return (
    <MobileFrame>
      {/* Header with interactive course search click */}
      <Header
        round={activeRound}
        onOpenNewRound={() => setIsNewRoundOpen(true)}
        onOpenCaddieChat={() => setIsCaddieChatOpen(true)}
        onOpenBagSettings={() => setIsBagSettingsOpen(true)}
        onOpenCourseSearch={() => setIsCourseSearchOpen(true)}
      />

      {/* Hole Navigator (Always visible on Round and Strategy tabs) */}
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
        {currentTab === 'round' && activeRound && activePlayer && (
          <HoleScoreInput
            hole={currentHole}
            player={activePlayer}
            players={activeRound.players}
            activePlayerId={activePlayerId}
            onSelectPlayer={(id) => setActivePlayerId(id)}
            onUpdateScore={handleUpdateScore}
            onPrevHole={handlePrevHole}
            onNextHole={handleNextHole}
            onOpenPenaltyGuide={() => setIsPenaltyGuideOpen(true)}
            onOpenStrategy={() => setCurrentTab('strategy')}
          />
        )}

        {currentTab === 'strategy' && (
          <CourseStrategyMap
            hole={currentHole}
            round={activeRound}
            clubProfile={clubProfile}
          />
        )}

        {currentTab === 'scorecard' && activeRound && activePlayer && (
          <ScoreCardView
            round={activeRound}
            holes={holes}
            mainPlayer={activePlayer}
          />
        )}

        {currentTab === 'analytics' && activeRound && (
          <AnalyticsDashboard
            round={activeRound}
            holes={holes}
            allRounds={rounds}
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
        onOpenCreateCourse={() => setIsCustomBuilderOpen(true)}
        onDeleteCustomCourse={handleDeleteCustomCourse}
      />

      <CustomCourseBuilderModal
        isOpen={isCustomBuilderOpen}
        onClose={() => setIsCustomBuilderOpen(false)}
        onSaveCourse={handleSaveCustomCourse}
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
