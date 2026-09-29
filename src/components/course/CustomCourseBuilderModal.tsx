// src/components/course/CustomCourseBuilderModal.tsx
import React, { useState } from 'react';
import { Course, HoleInfo } from '../../types/golf';
import {
  X,
  Plus,
  Check,
  Flag,
  MapPin,
  Sparkles,
  Sliders,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface CustomCourseBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveCourse: (course: Course) => void;
  initialCourseName?: string;
}

export const CustomCourseBuilderModal: React.FC<CustomCourseBuilderModalProps> = ({
  isOpen,
  onClose,
  onSaveCourse,
  initialCourseName,
}) => {
  const [courseName, setCourseName] = useState<string>('');
  const [location, setLocation] = useState<string>('경기도');
  const [outCourseName, setOutCourseName] = useState<string>('OUT 코스');
  const [inCourseName, setInCourseName] = useState<string>('IN 코스');
  const [activeTab, setActiveTab] = useState<'out' | 'in'>('out');
  const [showHoleDetails, setShowHoleDetails] = useState<boolean>(false);

  // Auto-fill course name and smart-detect region if searched previously
  React.useEffect(() => {
    if (isOpen) {
      if (initialCourseName && initialCourseName.trim()) {
        const name = initialCourseName.trim();
        setCourseName(name);

        // Smart city/region detection
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
      }
    }
  }, [isOpen, initialCourseName]);

  // Default 18 holes data (Standard Par 72)
  const [holes, setHoles] = useState<HoleInfo[]>(() => {
    const pars: (3 | 4 | 5)[] = [
      4, 4, 3, 5, 4, 3, 4, 5, 4, // Out: 36
      4, 5, 3, 4, 4, 3, 5, 4, 4  // In: 36
    ];
    const distances = [
      360, 340, 160, 480, 370, 150, 390, 500, 370,
      350, 490, 170, 380, 340, 155, 510, 385, 360
    ];

    return pars.map((par, idx) => ({
      holeNumber: idx + 1,
      par,
      distanceMeter: distances[idx],
      distanceYard: Math.round(distances[idx] * 1.09361),
      handicap: (idx % 18) + 1,
      elevationMeter: idx % 3 === 0 ? -5 : idx % 2 === 0 ? 6 : 0,
      shape: idx % 4 === 1 ? 'dogleg-right' : idx % 4 === 3 ? 'dogleg-left' : 'straight',
      hazards: [
        { type: 'bunker', location: '페어웨이 우측 벙커', distance: 210 },
        { type: 'ob', location: '좌측 OB 라인', distance: 0 }
      ],
      caddieStrategy: {
        safeRoute: '페어웨이 중앙 200m 티샷 후 그린 중앙 공략',
        attackRoute: '페어웨이 벙커를 직접 넘겨 230m 공략 후 버디 찬스',
        recommendedClub: par === 3 ? '6~7번 아이언' : '드라이버',
        keyWarning: '바람과 그린 주변 벙커를 주의하세요.',
        caddieVoice: `${idx + 1}번홀입니다. 편안한 템포로 굿 샷 가시죠!`
      }
    }));
  });

  if (!isOpen) return null;

  // Apply quick templates
  const handleApplyTemplate = (type: 'standard' | 'mountain' | 'long') => {
    let multiplier = 1.0;
    let bias = 0;
    if (type === 'mountain') {
      multiplier = 0.98;
      bias = 8;
    } else if (type === 'long') {
      multiplier = 1.06;
      bias = -2;
    }

    setHoles(prev =>
      prev.map((h, i) => {
        const dist = Math.round(h.distanceMeter * multiplier);
        return {
          ...h,
          distanceMeter: dist,
          distanceYard: Math.round(dist * 1.09361),
          elevationMeter: (i % 2 === 0 ? 6 : -4) + bias,
        };
      })
    );
  };

  const handleUpdateHole = (holeNum: number, patch: Partial<HoleInfo>) => {
    setHoles(prev =>
      prev.map(h => {
        if (h.holeNumber === holeNum) {
          const updated = { ...h, ...patch };
          if (patch.distanceMeter !== undefined) {
            updated.distanceYard = Math.round(patch.distanceMeter * 1.09361);
          }
          return updated;
        }
        return h;
      })
    );
  };

  const totalCoursePar = holes.reduce((sum, h) => sum + h.par, 0);
  const totalCourseDist = holes.reduce((sum, h) => sum + h.distanceMeter, 0);

  const handleSave = () => {
    if (!courseName.trim()) {
      alert('골프장 이름을 입력해 주세요.');
      return;
    }

    const newCourse: Course = {
      id: `custom-course-${Date.now()}`,
      name: courseName.trim(),
      location: location.trim() || '대한민국',
      totalHoles: 18,
      courses: {
        outCourseName: outCourseName.trim() || 'OUT 코스',
        inCourseName: inCourseName.trim() || 'IN 코스',
      },
      holes: holes.map(h => ({
        ...h,
        caddieStrategy: {
          ...h.caddieStrategy,
          caddieVoice: `${courseName} ${h.holeNumber <= 9 ? outCourseName : inCourseName} ${h.holeNumber}번홀(Par ${h.par})입니다. 대표님, 자신감 있게 나이스 샷!`
        }
      })),
      isCustom: true,
      tags: ['직접등록', location.split(' ')[0] || '국내']
    };

    onSaveCourse(newCourse);
    onClose();
  };

  const displayedHoles = activeTab === 'out'
    ? holes.filter(h => h.holeNumber <= 9)
    : holes.filter(h => h.holeNumber > 9);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#121f19] border border-emerald-900/60 rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-emerald-900/50 bg-[#0c1612] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <Plus size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">새 골프코스 직접 등록</h3>
              <p className="text-xs text-slate-400">원하는 골프장과 코스를 자유롭게 설계하세요</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {/* 1. Basic Course Info */}
          <div className="bg-black/30 border border-emerald-950 rounded-2xl p-3.5 space-y-3">
            <h4 className="font-bold text-emerald-400 text-xs flex items-center gap-1.5">
              <Flag size={13} />
              <span>골프장 기본 정보</span>
            </h4>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">골프장 명칭 *</label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="예: 해운대비치 CC, 남여주 GC, 스마트골프존"
                className="w-full bg-black/50 border border-emerald-900 rounded-xl px-3 py-2 text-white font-bold placeholder-slate-600 focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">소재지 / 지역</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="예: 부산시 기장군, 경기도 여주시, 제주도"
                className="w-full bg-black/50 border border-emerald-900 rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">전반 코스명 (1~9H)</label>
                <input
                  type="text"
                  value={outCourseName}
                  onChange={(e) => setOutCourseName(e.target.value)}
                  placeholder="예: 동코스, 레이크"
                  className="w-full bg-black/50 border border-emerald-900 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
              <div>
                <label className="text-slate-300 font-semibold block mb-1">후반 코스명 (10~18H)</label>
                <input
                  type="text"
                  value={inCourseName}
                  onChange={(e) => setInCourseName(e.target.value)}
                  placeholder="예: 서코스, 마운틴"
                  className="w-full bg-black/50 border border-emerald-900 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>
          </div>

          {/* 2. Course Style Quick Template */}
          <div className="bg-black/30 border border-emerald-950 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-300 text-xs flex items-center gap-1">
                <Sparkles size={13} className="text-amber-400" />
                <span>원클릭 코스 전장 템플릿</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">
                기준: Par {totalCoursePar} / {totalCourseDist.toLocaleString()}m
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleApplyTemplate('standard')}
                className="p-2 rounded-xl bg-slate-900/90 border border-emerald-900/60 hover:border-emerald-400 text-slate-300 hover:text-white text-center transition-all"
              >
                <span className="font-bold block text-xs">표준 코스</span>
                <span className="text-[10px] text-slate-400">약 6,400m</span>
              </button>
              <button
                type="button"
                onClick={() => handleApplyTemplate('mountain')}
                className="p-2 rounded-xl bg-slate-900/90 border border-emerald-900/60 hover:border-emerald-400 text-slate-300 hover:text-white text-center transition-all"
              >
                <span className="font-bold block text-xs">산악 지형</span>
                <span className="text-[10px] text-slate-400">오르막/내리막</span>
              </button>
              <button
                type="button"
                onClick={() => handleApplyTemplate('long')}
                className="p-2 rounded-xl bg-slate-900/90 border border-emerald-900/60 hover:border-emerald-400 text-slate-300 hover:text-white text-center transition-all"
              >
                <span className="font-bold block text-xs">롱 챔피언십</span>
                <span className="text-[10px] text-slate-400">약 6,750m</span>
              </button>
            </div>
          </div>

          {/* 3. Detailed Hole Customizer Accordion */}
          <div className="bg-black/30 border border-emerald-950 rounded-2xl p-3.5 space-y-3">
            <div
              onClick={() => setShowHoleDetails(!showHoleDetails)}
              className="flex items-center justify-between cursor-pointer"
            >
              <span className="font-bold text-white text-xs flex items-center gap-1.5">
                <Sliders size={13} className="text-emerald-400" />
                <span>홀별 상세 파 & 거리 직접 수정</span>
              </span>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                <span>{showHoleDetails ? '접기' : '상세 편집'}</span>
                {showHoleDetails ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </div>
            </div>

            {showHoleDetails && (
              <div className="pt-2 space-y-3">
                {/* Out/In switcher */}
                <div className="grid grid-cols-2 gap-1 bg-black/40 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setActiveTab('out')}
                    className={`py-1 rounded-lg text-xs font-bold transition-all ${
                      activeTab === 'out'
                        ? 'bg-emerald-600 text-white shadow'
                        : 'text-slate-400'
                    }`}
                  >
                    전반 {outCourseName} (1~9H)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('in')}
                    className={`py-1 rounded-lg text-xs font-bold transition-all ${
                      activeTab === 'in'
                        ? 'bg-emerald-600 text-white shadow'
                        : 'text-slate-400'
                    }`}
                  >
                    후반 {inCourseName} (10~18H)
                  </button>
                </div>

                {/* Hole rows */}
                <div className="space-y-2">
                  {displayedHoles.map(h => (
                    <div
                      key={h.holeNumber}
                      className="bg-black/50 border border-emerald-950/80 rounded-xl p-2.5 flex items-center justify-between gap-2"
                    >
                      <span className="font-black text-white text-xs w-8 font-mono">
                        {h.holeNumber}H
                      </span>

                      {/* Par selector */}
                      <div className="flex items-center gap-1">
                        {[3, 4, 5].map(p => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => handleUpdateHole(h.holeNumber, { par: p as any })}
                            className={`w-7 h-6 rounded text-xs font-bold transition-all ${
                              h.par === p
                                ? 'bg-emerald-500 text-black font-extrabold'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            P{p}
                          </button>
                        ))}
                      </div>

                      {/* Distance input */}
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={h.distanceMeter}
                          onChange={(e) => handleUpdateHole(h.holeNumber, { distanceMeter: Number(e.target.value) || 0 })}
                          className="w-16 bg-black/60 border border-slate-700 rounded px-1.5 py-1 text-center font-mono text-xs text-white"
                        />
                        <span className="text-[10px] text-slate-400">m</span>
                      </div>

                      {/* Shape selector */}
                      <select
                        value={h.shape}
                        onChange={(e) => handleUpdateHole(h.holeNumber, { shape: e.target.value as any })}
                        className="bg-slate-800 border border-slate-700 rounded px-1.5 py-1 text-[11px] text-slate-300"
                      >
                        <option value="straight">직선</option>
                        <option value="dogleg-left">좌도그렉</option>
                        <option value="dogleg-right">우도그렉</option>
                        <option value="island">아일랜드</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
            <span>이 골프 코스로 등록 및 즉시 선택</span>
          </button>
        </div>
      </div>
    </div>
  );
};
