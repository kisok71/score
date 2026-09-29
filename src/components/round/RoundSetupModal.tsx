// src/components/round/RoundSetupModal.tsx
import React, { useState } from 'react';
import { Course, Round, TeeType, WeatherType } from '../../types/golf';
import {
  X,
  Calendar,
  Clock,
  Flag,
  User,
  Sun,
  Cloud,
  Wind,
  CloudRain,
  Search,
  MapPin,
} from 'lucide-react';
import { CourseSearchModal } from '../course/CourseSearchModal';
import { CustomCourseBuilderModal } from '../course/CustomCourseBuilderModal';
import { loadUserName, saveUserName } from '../../utils/storage';

interface RoundSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  onCreateRound: (newRound: Round) => void;
  onSaveCustomCourse: (course: Course) => void;
  onDeleteCustomCourse?: (courseId: string) => void;
}

export const RoundSetupModal: React.FC<RoundSetupModalProps> = ({
  isOpen,
  onClose,
  courses,
  onCreateRound,
  onSaveCustomCourse,
  onDeleteCustomCourse,
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || 'south-springs');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState<string>('07:30');
  const [teeBox, setTeeBox] = useState<TeeType>('white');
  const [weather, setWeather] = useState<WeatherType>('sunny');
  const [windSpeed, setWindSpeed] = useState<number>(2);

  // Single player settings (companion removed)
  const [userName, setUserName] = useState<string>(() => loadUserName());
  const [handicap, setHandicap] = useState<number>(12);

  // Sub modals
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState<boolean>(false);
  const [builderInitialName, setBuilderInitialName] = useState<string>('');

  if (!isOpen) return null;

  const currentCourse = courses.find(c => c.id === selectedCourseId) || courses[0];

  const handleSelectCourseFromSearch = (course: Course) => {
    setSelectedCourseId(course.id);
  };

  const handleCreatedCustomCourse = (newCourse: Course) => {
    onSaveCustomCourse(newCourse);
    setSelectedCourseId(newCourse.id);
  };

  const handleSave = () => {
    const finalUserName = userName.trim() || '골퍼';
    saveUserName(finalUserName);

    const newRound: Round = {
      id: `round-${Date.now()}`,
      date,
      teeOffTime: time,
      courseId: currentCourse.id,
      courseName: currentCourse.name,
      courseSection: `${currentCourse.courses.outCourseName} / ${currentCourse.courses.inCourseName}`,
      teeBox,
      weather,
      windSpeed,
      status: 'in-progress',
      createdAt: Date.now(),
      players: [
        {
          id: `player-${Date.now()}-0`,
          name: finalUserName,
          handicap: Number(handicap) || 0,
          avatarColor: '#10b981',
          isMainUser: true,
          scores: Object.fromEntries(
            currentCourse.holes.map(h => [h.holeNumber, {
              holeNumber: h.holeNumber,
              strokes: h.par,
              putts: 2,
              obCount: 0,
              hazardCount: 0,
              bunkerCount: 0,
              fairwayHit: h.par >= 4 ? 'hit' : 'none',
              gir: 'on',
              sandSave: false,
            }])
          ),
        }
      ],
    };

    onCreateRound(newRound);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
        <div className="bg-[#121f19] border border-emerald-900/60 rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto p-5 shadow-2xl relative">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-emerald-900/40">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Flag size={18} />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">새 라운드 시작</h2>
                <p className="text-xs text-slate-400">골프장 선택 및 환경 설정</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form Body */}
          <div className="space-y-4 pt-4 text-xs">
            {/* 1. 골프장 선택 & 검색 */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-slate-300 font-semibold flex items-center gap-1">
                  <Flag size={13} className="text-emerald-400" />
                  <span>골프 코스 선택</span>
                </label>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setIsBuilderOpen(true)}
                    className="text-[11px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-0.5"
                  >
                    <span>+ 직접 등록</span>
                  </button>
                </div>
              </div>

              {/* Active Selected Course Visual Card */}
              <div className="bg-black/40 border border-emerald-900/80 rounded-2xl p-3 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{currentCourse.name}</span>
                      {currentCourse.isCustom && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                          직접등록
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                      <MapPin size={11} className="text-emerald-400" />
                      <span>{currentCourse.location}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(true)}
                    className="px-2.5 py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-400/50 text-emerald-300 font-bold text-xs flex items-center gap-1 active:scale-95 transition-all shadow-sm"
                  >
                    <Search size={13} />
                    <span>코스 검색</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-emerald-950 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-300">
                    {currentCourse.courses.outCourseName} / {currentCourse.courses.inCourseName}
                  </span>
                  <span className="text-slate-400 font-mono">18홀 (Par 72)</span>
                </div>
              </div>
            </div>

            {/* 2. 사용자(골퍼) 이름 및 핸디캡 설정 (동반자 제거 후 메인으로 배치) */}
            <div className="bg-black/30 border border-emerald-950 rounded-2xl p-3 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-slate-200 font-bold flex items-center gap-1.5">
                  <User size={13} className="text-emerald-400" />
                  <span>골퍼(플레이어) 이름 설정</span>
                </label>
                <span className="text-[10px] text-slate-400">단일 플레이어 기록</span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="col-span-2">
                  <label className="text-[10px] text-slate-400 block mb-1">사용자 이름</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="이름 입력 (예: 김대표, 타이거)"
                    className="w-full bg-black/60 border border-emerald-900 rounded-xl px-3 py-2 text-white font-bold text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">핸디캡 (HDCP)</label>
                  <input
                    type="number"
                    min="0"
                    max="72"
                    value={handicap}
                    onChange={(e) => setHandicap(Number(e.target.value))}
                    className="w-full bg-black/60 border border-emerald-900 rounded-xl px-2 py-2 text-white font-mono font-bold text-xs text-center focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>
            </div>

            {/* 3. 날짜 및 티업시간 */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-semibold flex items-center gap-1 mb-1.5">
                  <Calendar size={13} className="text-emerald-400" />
                  <span>라운드 날짜</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-black/40 border border-emerald-900 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-slate-300 font-semibold flex items-center gap-1 mb-1.5">
                  <Clock size={13} className="text-emerald-400" />
                  <span>티업 시간</span>
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-black/40 border border-emerald-900 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* 4. 티 박스 선택 */}
            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">티 박스 (Tee Box)</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'white' as TeeType, label: '화이트', color: 'bg-white text-black' },
                  { id: 'blue' as TeeType, label: '블루', color: 'bg-blue-600 text-white' },
                  { id: 'black' as TeeType, label: '블랙', color: 'bg-neutral-900 text-white border border-slate-600' },
                  { id: 'red' as TeeType, label: '레드', color: 'bg-rose-600 text-white' },
                ].map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTeeBox(t.id)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                      teeBox === t.id
                        ? `${t.color} ring-2 ring-emerald-400 shadow-md`
                        : 'bg-black/30 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. 날씨 & 풍속 */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1.5">날씨</label>
                <div className="grid grid-cols-4 gap-1">
                  {[
                    { id: 'sunny' as WeatherType, icon: Sun, label: '맑음' },
                    { id: 'cloudy' as WeatherType, icon: Cloud, label: '흐림' },
                    { id: 'windy' as WeatherType, icon: Wind, label: '바람' },
                    { id: 'rainy' as WeatherType, icon: CloudRain, label: '비' },
                  ].map(w => {
                    const Icon = w.icon;
                    return (
                      <button
                        key={w.id}
                        type="button"
                        onClick={() => setWeather(w.id)}
                        className={`p-1.5 rounded-lg flex flex-col items-center justify-center transition-all border ${
                          weather === w.id
                            ? 'bg-emerald-600 text-white border-emerald-400'
                            : 'bg-black/30 text-slate-400 border-slate-800'
                        }`}
                      >
                        <Icon size={14} />
                        <span className="text-[9px] mt-0.5">{w.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1.5">바람 세기 (m/s)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={windSpeed}
                    onChange={(e) => setWindSpeed(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                  <span className="font-mono text-emerald-400 font-bold w-12 text-right">
                    {windSpeed}m/s
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <div className="pt-4 mt-2">
            <button
              onClick={handleSave}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 font-black text-white text-sm transition-all shadow-xl shadow-emerald-950/60 active:scale-98"
            >
              🏌️‍♂️ 티업 시작! (라운드 스타트)
            </button>
          </div>
        </div>
      </div>

      {/* Course Search Modal */}
      <CourseSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        courses={courses}
        selectedCourseId={selectedCourseId}
        onSelectCourse={handleSelectCourseFromSearch}
        onOpenCreateCourse={(defaultName?: string) => {
          setBuilderInitialName(defaultName || '');
          setIsBuilderOpen(true);
        }}
        onDeleteCustomCourse={onDeleteCustomCourse}
      />

      {/* Custom Course Builder Modal */}
      <CustomCourseBuilderModal
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        initialCourseName={builderInitialName}
        onSaveCourse={handleCreatedCustomCourse}
      />
    </>
  );
};
