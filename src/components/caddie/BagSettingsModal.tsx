// src/components/caddie/BagSettingsModal.tsx
import React, { useState } from 'react';
import { PlayerClubProfile } from '../../types/golf';
import { X, SlidersHorizontal, Check } from 'lucide-react';

interface BagSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerClubProfile;
  onSaveProfile: (profile: PlayerClubProfile) => void;
}

export const BagSettingsModal: React.FC<BagSettingsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [form, setForm] = useState<PlayerClubProfile>(profile);

  if (!isOpen) return null;

  const handleChange = (field: keyof PlayerClubProfile, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSaveProfile(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#121f19] border border-emerald-900/60 rounded-3xl w-full max-w-md max-h-[85vh] overflow-y-auto p-5 shadow-2xl relative">
        <div className="flex items-center justify-between pb-3 border-b border-emerald-900/40">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <SlidersHorizontal size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">나의 클럽백 & 비거리 세팅</h2>
              <p className="text-xs text-slate-400">맞춤형 코스 공략을 위한 비거리 등록</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 pt-4 text-xs">
          {/* Driver Distance */}
          <div className="bg-black/30 p-3 rounded-2xl border border-emerald-950">
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold text-white text-xs">드라이버 평균 비거리</label>
              <span className="font-mono font-black text-emerald-400 text-sm">{form.driverDistance}m</span>
            </div>
            <input
              type="range"
              min="150"
              max="300"
              step="5"
              value={form.driverDistance}
              onChange={(e) => handleChange('driverDistance', Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          {/* 3 Wood Distance */}
          <div className="bg-black/30 p-3 rounded-2xl border border-emerald-950">
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold text-white text-xs">3번 우드 비거리</label>
              <span className="font-mono font-black text-emerald-400 text-sm">{form.wood3Distance}m</span>
            </div>
            <input
              type="range"
              min="140"
              max="260"
              step="5"
              value={form.wood3Distance}
              onChange={(e) => handleChange('wood3Distance', Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          {/* Utility Distance */}
          <div className="bg-black/30 p-3 rounded-2xl border border-emerald-950">
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold text-white text-xs">유틸리티 / 하이브리드</label>
              <span className="font-mono font-black text-emerald-400 text-sm">{form.utilityDistance}m</span>
            </div>
            <input
              type="range"
              min="130"
              max="240"
              step="5"
              value={form.utilityDistance}
              onChange={(e) => handleChange('utilityDistance', Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          {/* 7 Iron Distance */}
          <div className="bg-black/30 p-3 rounded-2xl border border-emerald-950">
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold text-white text-xs">7번 아이언 기준 거리</label>
              <span className="font-mono font-black text-emerald-400 text-sm">{form.iron7Distance}m</span>
            </div>
            <input
              type="range"
              min="100"
              max="190"
              step="5"
              value={form.iron7Distance}
              onChange={(e) => handleChange('iron7Distance', Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          {/* Shot shape preference */}
          <div>
            <label className="font-bold text-slate-300 block mb-1.5">선호 구질 (구질 특성)</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'straight', label: '스트레이트' },
                { id: 'fade', label: '페이드 / 슬라이스' },
                { id: 'draw', label: '드로우 / 훅' },
              ].map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleChange('preferredShotShape', s.id)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    form.preferredShotShape === s.id
                      ? 'bg-emerald-600 border-emerald-400 text-white shadow'
                      : 'bg-black/30 border-slate-800 text-slate-400'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 mt-3">
          <button
            onClick={handleSave}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950"
          >
            <Check size={16} />
            <span>설정 저장 완료</span>
          </button>
        </div>
      </div>
    </div>
  );
};
