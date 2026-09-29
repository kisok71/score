// src/components/course/CustomCourseBuilderModal.tsx
import React, { useState, useEffect } from 'react';
import { Course, SubCourse } from '../../types/golf';
import { compose18HolesFromSubCourses } from '../../utils/golfHoleGenerator';
import {
  X,
  Plus,
  Check,
  Flag,
  MapPin,
  Trash2,
  Layers,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface CustomCourseBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveCourse: (course: Course) => void;
  initialCourseName?: string;
  editingCourse?: Course | null;
}

const DEFAULT_PARS_36: (3 | 4 | 5)[] = [4, 4, 3, 5, 4, 3, 4, 5, 4];

const DEFAULT_COURSE_NAMES = [
  '동 코스',
  '서 코스',
  '남 코스',
  '북 코스',
  '마운틴 코스',
  '레이크 코스',
  '밸리 코스',
  '힐 코스',
];

export const CustomCourseBuilderModal: React.FC<CustomCourseBuilderModalProps> = ({
  isOpen,
  onClose,
  onSaveCourse,
  initialCourseName,
  editingCourse,
}) => {
  const [courseName, setCourseName] = useState<string>('');
  const [location, setLocation] = useState<string>('경기도');
  const [subCourses, setSubCourses] = useState<SubCourse[]>([
    { id: 'sub-1', name: '동 코스', pars: [...DEFAULT_PARS_36] },
    { id: 'sub-2', name: '서 코스', pars: [...DEFAULT_PARS_36] },
  ]);

  // Initialize or reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      if (editingCourse) {
        setCourseName(editingCourse.name);
        setLocation(editingCourse.location || '대한민국');
        if (editingCourse.subCourses && editingCourse.subCourses.length >= 2) {
          setSubCourses(editingCourse.subCourses.map(sc => ({
            ...sc,
            pars: [...sc.pars],
          })));
        } else {
          // Extract from existing course holes if subCourses not defined
          const outPars = editingCourse.holes.slice(0, 9).map(h => (h.par === 6 ? 5 : h.par as 3 | 4 | 5));
          const inPars = editingCourse.holes.slice(9, 18).map(h => (h.par === 6 ? 5 : h.par as 3 | 4 | 5));
          setSubCourses([
            { id: 'sub-1', name: editingCourse.courses.outCourseName || 'OUT 코스', pars: outPars.length === 9 ? outPars : [...DEFAULT_PARS_36] },
            { id: 'sub-2', name: editingCourse.courses.inCourseName || 'IN 코스', pars: inPars.length === 9 ? inPars : [...DEFAULT_PARS_36] },
          ]);
        }
      } else {
        const name = initialCourseName?.trim() || '';
        setCourseName(name);

        // Smart city/region detection from name
        if (name.includes('안성')) setLocation('경기도 안성시');
        else if (name.includes('용인')) setLocation('경기도 용인시');
        else if (name.includes('여주')) setLocation('경기도 여주시');
        else if (name.includes('이천')) setLocation('경기도 이천시');
        else if (name.includes('가평')) setLocation('경기도 가평군');
        else if (name.includes('포천')) setLocation('경기도 포천시');
        else if (name.includes('화성')) setLocation('경기도 화성시');
        else if (name.includes('파주')) setLocation('경기도 파주시');
        else if (name.includes('춘천')) setLocation('강원도 춘천시');
        else if (name.includes('원주')) setLocation('강원도 원주시');
        else if (name.includes('홍천')) setLocation('강원도 홍천군');
        else if (name.includes('천안')) setLocation('충청남도 천안시');
        else if (name.includes('충주')) setLocation('충청북도 충주시');
        else if (name.includes('제주') || name.includes('서귀포')) setLocation('제주특별자치도');
        else if (name.includes('송도') || name.includes('인천')) setLocation('인천광역시');
        else if (name.includes('부산') || name.includes('기장')) setLocation('부산광역시');
        else if (name.includes('대구')) setLocation('대구광역시');
        else setLocation('경기도');

        // Default 2 sub-courses
        setSubCourses([
          { id: `sub-${Date.now()}-1`, name: '동 코스', pars: [...DEFAULT_PARS_36] },
          { id: `sub-${Date.now()}-2`, name: '서 코스', pars: [...DEFAULT_PARS_36] },
        ]);
      }
    }
  }, [isOpen, initialCourseName, editingCourse]);

  if (!isOpen) return null;

  // Add a new sub-course (e.g. 3rd or 4th 9-hole course)
  const handleAddSubCourse = () => {
    const nextIdx = subCourses.length;
    const defaultName = DEFAULT_COURSE_NAMES[nextIdx] || `코스 ${String.fromCharCode(65 + nextIdx)}`;
    const newSub: SubCourse = {
      id: `sub-${Date.now()}-${nextIdx}`,
      name: defaultName,
      pars: [...DEFAULT_PARS_36],
    };
    setSubCourses(prev => [...prev, newSub]);
  };

  // Remove a sub-course (disabled if <= 2)
  const handleRemoveSubCourse = (id: string) => {
    if (subCourses.length <= 2) {
      alert('18홀 라운드를 위해 최소 2개의 9홀 코스가 필요합니다.');
      return;
    }
    setSubCourses(prev => prev.filter(sc => sc.id !== id));
  };

  // Update sub-course name
  const handleUpdateSubName = (id: string, name: string) => {
    setSubCourses(prev =>
      prev.map(sc => (sc.id === id ? { ...sc, name } : sc))
    );
  };

  // Update a single hole's Par for a sub-course
  const handleUpdatePar = (subId: string, holeIdx: number, par: 3 | 4 | 5) => {
    setSubCourses(prev =>
      prev.map(sc => {
        if (sc.id !== subId) return sc;
        const newPars = [...sc.pars];
        newPars[holeIdx] = par;
        return { ...sc, pars: newPars };
      })
    );
  };

  // Reset a sub-course to standard Par 36
  const handleResetSubPars = (subId: string) => {
    setSubCourses(prev =>
      prev.map(sc => (sc.id === subId ? { ...sc, pars: [...DEFAULT_PARS_36] } : sc))
    );
  };

  // Calculate total course summary
  const totalRegisteredHoles = subCourses.length * 9;

  // Save handler
  const handleSave = () => {
    if (!courseName.trim()) {
      alert('골프장 명칭을 입력해 주세요.');
      return;
    }

    if (subCourses.length < 2) {
      alert('최소 2개 이상의 9홀 코스를 등록해야 합니다.');
      return;
    }

    // Check all sub-course names
    for (let i = 0; i < subCourses.length; i++) {
      if (!subCourses[i].name.trim()) {
        alert(`코스 ${i + 1}의 이름을 입력해 주세요.`);
        return;
      }
    }

    const firstSub = subCourses[0];
    const secondSub = subCourses[1];

    // Compose default 18 holes using first two sub-courses
    const initialHoles = compose18HolesFromSubCourses(
      courseName.trim(),
      firstSub,
      secondSub
    );

    const newCourse: Course = {
      id: editingCourse?.id || `custom-course-${Date.now()}`,
      name: courseName.trim(),
      location: location.trim() || '대한민국',
      totalHoles: totalRegisteredHoles,
      courses: {
        outCourseName: firstSub.name.trim(),
        inCourseName: secondSub.name.trim(),
      },
      subCourses: subCourses.map(sc => ({
        ...sc,
        name: sc.name.trim(),
      })),
      holes: initialHoles,
      isCustom: true,
      tags: ['직접등록', `${totalRegisteredHoles}홀`, location.split(' ')[0] || '국내'],
    };

    onSaveCourse(newCourse);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#101b16] border border-emerald-900/60 rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-emerald-900/50 bg-[#0c1612] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <Flag size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {editingCourse ? '골프장 코스 정보 수정' : '새 골프코스 직접 등록'}
              </h3>
              <p className="text-xs text-slate-400">
                거리/형태 입력 없이, 코스명과 홀별 파(Par)만 간편 설정
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {/* 1. 골프장 기본 정보 */}
          <div className="bg-black/30 border border-emerald-950 rounded-2xl p-3.5 space-y-3">
            <h4 className="font-bold text-emerald-400 text-xs flex items-center gap-1.5">
              <MapPin size={13} />
              <span>골프장 기본 정보</span>
            </h4>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                골프장 명칭 <span className="text-emerald-400">*</span>
              </label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="예: 안성베네스트 GC, 해운대비치 CC, 스마트골프클럽"
                className="w-full bg-black/60 border border-emerald-900 rounded-xl px-3 py-2 text-white font-bold text-xs placeholder-slate-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">소재지 / 지역</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="예: 경기도 안성시, 부산시 기장군, 제주특별자치도"
                className="w-full bg-black/60 border border-emerald-900 rounded-xl px-3 py-2 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          {/* 2. 다중 9홀 코스 목록 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5">
                <Layers size={14} className="text-emerald-400" />
                <span className="font-bold text-white text-xs">골프장 소속 9홀 코스 설정</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono font-bold">
                  총 {subCourses.length}개 코스 ({totalRegisteredHoles}홀)
                </span>
              </div>
            </div>

            {/* Sub-courses Cards */}
            <div className="space-y-3">
              {subCourses.map((sub, sIdx) => {
                const subParSum = sub.pars.reduce((sum, p) => sum + p, 0);

                return (
                  <div
                    key={sub.id}
                    className="bg-black/35 border border-emerald-900/70 rounded-2xl p-3.5 space-y-2.5 transition-all shadow-md"
                  >
                    {/* Course Header Row: Name & Total Par & Delete */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-[11px] font-mono shrink-0">
                          코스 {sIdx + 1}
                        </span>
                        <input
                          type="text"
                          value={sub.name}
                          onChange={(e) => handleUpdateSubName(sub.id, e.target.value)}
                          placeholder="코스 이름 (예: 동 코스, 레이크, A코스)"
                          className="w-full max-w-[200px] bg-black/60 border border-emerald-900/80 rounded-xl px-2.5 py-1 text-white font-bold text-xs focus:outline-none focus:border-emerald-400"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                          Par {subParSum}
                        </span>

                        {subCourses.length > 2 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveSubCourse(sub.id)}
                            className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-all"
                            title="이 코스 삭제"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* 9 Holes Par Selectors (Compact 9-column grid, 3/4/5 buttons) */}
                    <div>
                      <div className="grid grid-cols-9 gap-1">
                        {sub.pars.map((par, hIdx) => (
                          <div
                            key={hIdx}
                            className="bg-black/50 border border-emerald-950/90 rounded-xl p-1 flex flex-col items-center gap-1"
                          >
                            <span className="text-[10px] font-bold text-slate-400 font-mono">
                              {hIdx + 1}H
                            </span>

                            <div className="flex flex-col gap-0.5 w-full">
                              {([3, 4, 5] as const).map(p => (
                                <button
                                  key={p}
                                  type="button"
                                  onClick={() => handleUpdatePar(sub.id, hIdx, p)}
                                  className={`w-full py-0.5 text-[10px] font-bold rounded transition-all ${
                                    par === p
                                      ? 'bg-emerald-500 text-black font-black shadow-sm'
                                      : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
                                  }`}
                                >
                                  {p}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Reset to Par 36 helper */}
                      <div className="flex justify-end pt-1.5">
                        <button
                          type="button"
                          onClick={() => handleResetSubPars(sub.id)}
                          className="text-[10px] text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                        >
                          <RotateCcw size={10} />
                          <span>표준 36파로 리셋</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* + Add 9-Hole Course Button */}
            <button
              type="button"
              onClick={handleAddSubCourse}
              className="w-full py-2.5 rounded-2xl border-2 border-dashed border-emerald-800/80 hover:border-emerald-400 bg-emerald-950/20 hover:bg-emerald-900/30 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-98 shadow-sm"
            >
              <Plus size={15} className="text-emerald-400" />
              <span>새 9홀 코스 추가 (남 코스, 레이크, 밸리...)</span>
            </button>
          </div>

          {/* 3. Guide & Summary Notice */}
          <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-2xl p-3 space-y-1 text-slate-300 text-[11px] leading-relaxed">
            <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
              <Sparkles size={13} className="text-amber-400" />
              <span>자유로운 코스 조합 안내</span>
            </div>
            <p className="text-slate-400">
              거리와 코스형태는 Par(3/4/5)에 맞춰 캐디 알고리즘이 표준 제원과 최적 공략을 자동 생성합니다.
            </p>
            <p className="text-emerald-400 font-medium pt-0.5">
              💡 3개 이상의 코스(27홀, 36홀 등)를 등록해 두시면, 라운드 시작 시 원하는 2개 코스를 전반/후반으로 직접 조합하여 플레이하실 수 있습니다.
            </p>
          </div>
        </div>

        {/* Footer Save Button */}
        <div className="p-4 border-t border-emerald-900/50 bg-[#0c1612]">
          <button
            type="button"
            onClick={handleSave}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 font-black text-white text-xs flex items-center justify-center gap-1.5 shadow-xl shadow-emerald-950 active:scale-98 transition-all"
          >
            <Check size={16} />
            <span>이 골프장 및 코스로 등록 완료</span>
          </button>
        </div>
      </div>
    </div>
  );
};
