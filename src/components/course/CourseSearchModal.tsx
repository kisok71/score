// src/components/course/CourseSearchModal.tsx
import React, { useState, useMemo } from 'react';
import { Course } from '../../types/golf';
import {
  Search,
  X,
  MapPin,
  Flag,
  PlusCircle,
  Tag,
  Check,
  Trash2,
  Sparkles,
} from 'lucide-react';

interface CourseSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  selectedCourseId: string;
  onSelectCourse: (course: Course) => void;
  onOpenCreateCourse: (defaultName?: string) => void;
  onDeleteCustomCourse?: (courseId: string) => void;
}

export const CourseSearchModal: React.FC<CourseSearchModalProps> = ({
  isOpen,
  onClose,
  courses,
  selectedCourseId,
  onSelectCourse,
  onOpenCreateCourse,
  onDeleteCustomCourse,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('전체');
  const [visibleLimit, setVisibleLimit] = useState<number>(30);

  // Available filter tags for 541 nationwide courses
  const filterTags = ['전체', '수도권', '강원', '충청', '전라', '경상', '제주', '회원제', '대중제', '직접 등록'];

  // Reset pagination on search or tag change
  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setVisibleLimit(30);
  };

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
    setVisibleLimit(30);
  };

  // Filter courses based on search term and tag
  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      // Tag filter
      if (selectedTag === '직접 등록' && !c.isCustom) return false;
      if (selectedTag !== '전체' && selectedTag !== '직접 등록') {
        const matchesTag = c.tags?.some(t => t.includes(selectedTag)) || c.location.includes(selectedTag);
        if (!matchesTag) return false;
      }

      // Search keyword filter
      if (!searchTerm.trim()) return true;
      const term = searchTerm.trim().toLowerCase();
      const matchName = c.name.toLowerCase().includes(term);
      const matchLoc = c.location.toLowerCase().includes(term);
      const matchOut = c.courses.outCourseName.toLowerCase().includes(term);
      const matchIn = c.courses.inCourseName.toLowerCase().includes(term);
      const matchTag = c.tags?.some(t => t.toLowerCase().includes(term));

      return matchName || matchLoc || matchOut || matchIn || matchTag;
    });
  }, [courses, searchTerm, selectedTag]);

  const displayedCourses = filteredCourses.slice(0, visibleLimit);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#101b16] border border-emerald-900/60 rounded-3xl w-full max-w-lg h-[85vh] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-emerald-900/50 bg-[#0c1612] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <Search size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">골프 코스 검색 & 자동 입력</h3>
              <p className="text-xs text-slate-400">문화체육관광부 전국 541개 공식 등록 골프장 수록</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Bar & Direct Create Button */}
        <div className="p-4 pb-2 space-y-3 bg-[#0e1914]">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 text-emerald-400" size={17} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="골프장명, 지역(이천, 가평, 춘천, 제주 등) 검색..."
              className="w-full bg-black/60 border border-emerald-900/70 rounded-2xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30"
              autoFocus
            />
            {searchTerm && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-3 text-slate-500 hover:text-white"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Region / Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {filterTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagChange(tag)}
                className={`text-[11px] px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                  selectedTag === tag
                    ? 'bg-emerald-500 text-neutral-950 font-bold shadow'
                    : 'bg-black/30 border border-emerald-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Custom Course Add Action Bar */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-400 font-mono">
              검색 결과: <strong className="text-emerald-400">{filteredCourses.length}</strong>개 골프장
            </span>
            <button
              onClick={() => {
                onClose();
                onOpenCreateCourse(searchTerm.trim() || undefined);
              }}
              className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-bold hover:bg-emerald-500/25 active:scale-95 transition-all shadow-sm"
            >
              <PlusCircle size={13} className="text-emerald-400" />
              <span>+ 새 코스 직접 등록</span>
            </button>
          </div>
        </div>

        {/* Course List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {/* Quick Register Banner while searching */}
          {searchTerm.trim() && filteredCourses.length > 0 && (
            <div
              onClick={() => {
                onClose();
                onOpenCreateCourse(searchTerm.trim());
              }}
              className="p-3 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-black border border-dashed border-emerald-700/60 hover:border-emerald-400 flex items-center justify-between cursor-pointer group transition-all"
            >
              <div className="flex items-center gap-2">
                <PlusCircle size={15} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs text-emerald-200">
                  찾으시는 코스가 없나요? <strong className="text-emerald-300 font-bold">'{searchTerm.trim()}'</strong> 사전에 직접 등록
                </span>
              </div>
              <span className="text-[11px] text-emerald-400 font-bold group-hover:translate-x-0.5 transition-transform">
                등록 →
              </span>
            </div>
          )}

          {filteredCourses.length === 0 ? (
            <div className="py-8 px-4 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-3xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 shadow-lg">
                <Sparkles size={24} className="animate-pulse" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">
                {searchTerm.trim() ? (
                  <span>
                    <span className="text-amber-300">"{searchTerm.trim()}"</span> 코스가 없습니다
                  </span>
                ) : (
                  '검색 조건에 맞는 골프 코스가 없습니다'
                )}
              </h4>
              <p className="text-xs text-slate-400 max-w-xs mb-4 leading-relaxed">
                {searchTerm.trim()
                  ? `"${searchTerm.trim()}" 코스 정보를 사전에 직접 입력해 두시면 언제든 스코어 기록과 코스 공략에 활용하실 수 있습니다.`
                  : '자주 가시는 골프 코스 정보를 사전에 직접 입력해 보세요.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCreateCourse(searchTerm.trim() || undefined);
                }}
                className="w-full max-w-xs py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/80 active:scale-95 transition-all"
              >
                <PlusCircle size={16} />
                <span>
                  {searchTerm.trim()
                    ? `'${searchTerm.trim()}' 코스 사전에 직접 입력하기`
                    : '새 골프 코스 사전에 직접 등록하기'}
                </span>
              </button>
            </div>
          ) : (
            <>
              {displayedCourses.map(course => {
                const isSelected = course.id === selectedCourseId;
                const totalDist = course.totalHoles >= 27 ? '9,800m+ (27홀+)' : '6,400m (18홀)';

                return (
                  <div
                    key={course.id}
                    onClick={() => {
                      onSelectCourse(course);
                      onClose();
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-gradient-to-r from-emerald-950/80 to-slate-900 border-emerald-400/80 shadow-lg ring-1 ring-emerald-400/40'
                        : 'bg-black/30 border-emerald-950/70 hover:border-emerald-800/80 hover:bg-black/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white tracking-tight">
                            {course.name}
                          </h4>
                          {course.isCustom ? (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                              사용자 등록
                            </span>
                          ) : (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-medium">
                              문체부 공인 ({course.totalHoles}홀)
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <MapPin size={12} className="text-emerald-400 shrink-0" />
                          <span>{course.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {isSelected ? (
                          <div className="w-7 h-7 rounded-xl bg-emerald-500 text-black flex items-center justify-center font-bold">
                            <Check size={16} />
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white font-bold text-xs transition-all"
                          >
                            선택
                          </button>
                        )}

                        {course.isCustom && onDeleteCustomCourse && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm(`'${course.name}' 코스를 삭제하시겠습니까?`)) {
                                onDeleteCustomCourse(course.id);
                              }
                            }}
                            className="p-1 rounded-lg text-slate-600 hover:text-red-400 transition-all"
                            title="코스 삭제"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Course Details Bar */}
                    <div className="mt-2.5 pt-2 border-t border-emerald-950/80 flex items-center justify-between text-[11px] text-slate-400">
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-300 font-medium">
                          {course.courses.outCourseName} / {course.courses.inCourseName}
                        </span>
                        <span>•</span>
                        <span>{course.totalHoles >= 27 ? `${course.totalHoles}홀 정규` : '18홀 (Par 72)'}</span>
                      </div>

                      <span className="font-mono text-slate-300">
                        {totalDist}
                      </span>
                    </div>

                    {/* Tags */}
                    {course.tags && course.tags.length > 0 && (
                      <div className="flex items-center gap-1 mt-2 flex-wrap">
                        {course.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-slate-400 border border-slate-800"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Load More Button */}
              {filteredCourses.length > visibleLimit && (
                <button
                  type="button"
                  onClick={() => setVisibleLimit(c => c + 40)}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 border border-emerald-900/60 hover:border-emerald-500/80 text-emerald-400 font-bold text-xs rounded-2xl transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>골프장 더 보기 ({filteredCourses.length - visibleLimit}개 남음) ↓</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
