// src/components/history/EditRoundModal.tsx
import React, { useState, useEffect } from 'react';
import { Round, TeeType, WeatherType } from '../../types/golf';
import { X, Calendar, Clock, Flag, Sun, Cloud, Wind, CloudRain, Save, AlertCircle } from 'lucide-react';

interface EditRoundModalProps {
  isOpen: boolean;
  onClose: () => void;
  round: Round | null;
  onSave: (updatedRound: Round) => void;
}

export const EditRoundModal: React.FC<EditRoundModalProps> = ({
  isOpen,
  onClose,
  round,
  onSave,
}) => {
  const [courseName, setCourseName] = useState('');
  const [courseSection, setCourseSection] = useState('');
  const [date, setDate] = useState('');
  const [teeOffTime, setTeeOffTime] = useState('');
  const [teeBox, setTeeBox] = useState<TeeType>('white');
  const [weather, setWeather] = useState<WeatherType>('sunny');
  const [windSpeed, setWindSpeed] = useState<number>(2);
  const [status, setStatus] = useState<'in-progress' | 'completed'>('completed');

  useEffect(() => {
    if (round) {
      setCourseName(round.courseName);
      setCourseSection(round.courseSection || '');
      setDate(round.date);
      setTeeOffTime(round.teeOffTime);
      setTeeBox(round.teeBox);
      setWeather(round.weather);
      setWindSpeed(round.windSpeed);
      setStatus(round.status);
    }
  }, [round]);

  if (!isOpen || !round) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseName.trim()) {
      alert('골프장 이름을 입력해 주세요.');
      return;
    }

    const updated: Round = {
      ...round,
      courseName: courseName.trim(),
      courseSection: courseSection.trim(),
      date,
      teeOffTime,
      teeBox,
      weather,
      windSpeed: Number(windSpeed) || 0,
      status,
    };

    onSave(updated);
    onClose();
  };

  const weatherOptions: { type: WeatherType; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { type: 'sunny', label: '맑음', icon: Sun },
    { type: 'cloudy', label: '흐림', icon: Cloud },
    { type: 'windy', label: '바람', icon: Wind },
    { type: 'rainy', label: '비', icon: CloudRain },
  ];

  const teeOptions: { type: TeeType; label: string; color: string }[] = [
    { type: 'black', label: '블랙 (챔피언)', color: 'bg-black text-white border-slate-700' },
    { type: 'blue', label: '블루 (백티)', color: 'bg-blue-600 text-white border-blue-500' },
    { type: 'white', label: '화이트 (레귤러)', color: 'bg-white text-slate-900 border-slate-300' },
    { type: 'red', label: '레드 (레이디)', color: 'bg-rose-500 text-white border-rose-400' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#101b16] border border-emerald-900/60 rounded-3xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-emerald-900/50 bg-[#0c1612] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <Flag size={16} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">경기 정보 수정</h3>
              <p className="text-xs text-slate-400">골프장, 일시, 티박스 및 라운드 상태 변경</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleFormSubmit} className="p-4 overflow-y-auto space-y-4 text-xs">
          {/* Golf Course & Section */}
          <div className="space-y-3 bg-[#0d1612] p-3 rounded-2xl border border-emerald-950">
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">골프장 이름</label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="예: 사우스스프링스 CC"
                className="w-full px-3 py-2 bg-slate-900/80 border border-emerald-900/60 rounded-xl text-white font-medium focus:outline-none focus:border-emerald-500 text-xs"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">코스 구분 (전반 / 후반)</label>
              <input
                type="text"
                value={courseSection}
                onChange={(e) => setCourseSection(e.target.value)}
                placeholder="예: 레이크 / 마운틴"
                className="w-full px-3 py-2 bg-slate-900/80 border border-emerald-900/60 rounded-xl text-white font-medium focus:outline-none focus:border-emerald-500 text-xs"
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-2 bg-[#0d1612] p-3 rounded-2xl border border-emerald-950">
            <div>
              <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1 mb-1">
                <Calendar size={12} className="text-emerald-400" />
                <span>라운드 날짜</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-900/80 border border-emerald-900/60 rounded-xl text-white font-mono focus:outline-none focus:border-emerald-500 text-xs"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1 mb-1">
                <Clock size={12} className="text-emerald-400" />
                <span>티업 시간</span>
              </label>
              <input
                type="time"
                value={teeOffTime}
                onChange={(e) => setTeeOffTime(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-900/80 border border-emerald-900/60 rounded-xl text-white font-mono focus:outline-none focus:border-emerald-500 text-xs"
                required
              />
            </div>
          </div>

          {/* Tee Box */}
          <div className="bg-[#0d1612] p-3 rounded-2xl border border-emerald-950 space-y-1.5">
            <label className="text-[11px] font-bold text-slate-300 block">티박스 선택</label>
            <div className="grid grid-cols-2 gap-1.5">
              {teeOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.type}
                  onClick={() => setTeeBox(opt.type)}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all text-left flex items-center justify-between ${
                    teeBox === opt.type
                      ? `${opt.color} ring-2 ring-emerald-400 shadow-md`
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{opt.label}</span>
                  {teeBox === opt.type && <span className="text-[10px]">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Weather & Wind */}
          <div className="bg-[#0d1612] p-3 rounded-2xl border border-emerald-950 space-y-2">
            <label className="text-[11px] font-bold text-slate-300 block">날씨 및 풍속</label>
            <div className="grid grid-cols-4 gap-1">
              {weatherOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = weather === opt.type;
                return (
                  <button
                    type="button"
                    key={opt.type}
                    onClick={() => setWeather(opt.type)}
                    className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                      isSelected
                        ? 'bg-emerald-600/30 border-emerald-400 text-emerald-300 font-bold'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-[10px]">{opt.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-400 text-[11px]">풍속 (m/s)</span>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={windSpeed}
                  onChange={(e) => setWindSpeed(Number(e.target.value))}
                  className="w-24 accent-emerald-500"
                />
                <span className="font-mono text-white font-bold w-10 text-right">{windSpeed} m/s</span>
              </div>
            </div>
          </div>

          {/* Status Selection */}
          <div className="bg-[#0d1612] p-3 rounded-2xl border border-emerald-950 space-y-1.5">
            <label className="text-[11px] font-bold text-slate-300 block">라운드 진행 상태</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setStatus('completed')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                  status === 'completed'
                    ? 'bg-emerald-600 border-emerald-400 text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                🏁 경기 완료
              </button>
              <button
                type="button"
                onClick={() => setStatus('in-progress')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                  status === 'in-progress'
                    ? 'bg-amber-600 border-amber-400 text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                ⏳ 진행 중 (스코어 입력 가능)
              </button>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-all"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-950 flex items-center justify-center gap-1.5 transition-all"
            >
              <Save size={15} />
              <span>변경사항 저장</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
