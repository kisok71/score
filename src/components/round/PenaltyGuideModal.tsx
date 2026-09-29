// src/components/round/PenaltyGuideModal.tsx
import React from 'react';
import { X, AlertTriangle, ShieldAlert, CheckCircle2, HelpCircle } from 'lucide-react';

interface PenaltyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PenaltyGuideModal: React.FC<PenaltyGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#121c17] border border-emerald-900/60 rounded-3xl w-full max-w-md max-h-[85vh] overflow-y-auto p-5 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-emerald-900/40">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <ShieldAlert size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">골프 페널티 & 벌타 룰 가이드</h2>
              <p className="text-xs text-slate-400">캐디 매니저가 정리해 드리는 실전 룰</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 pt-4 text-xs leading-relaxed text-slate-300">
          {/* 1. OB (Out of Bounds) */}
          <div className="bg-red-950/30 border border-red-900/50 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-white border-2 border-red-500" />
              <h3 className="text-sm font-bold text-red-300">1. OB (Out of Bounds) - 흰색 말뚝</h3>
              <span className="ml-auto text-[11px] font-bold px-2 py-0.5 rounded bg-red-900/60 text-red-200">
                +2 벌타
              </span>
            </div>
            <p className="text-slate-300 mb-2">
              볼이 코스 경계를 벗어난 경우입니다.
            </p>
            <div className="space-y-1.5 bg-black/40 rounded-xl p-2.5 text-[11px]">
              <div className="flex items-start gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>한국 골프장 로컬룰 (특설 OB티):</strong> 티샷 OB 시 전방에 마련된 OB티로 이동하여 <span className="text-amber-300 font-bold">4번째 샷(4th Shot)</span>으로 플레이합니다. (1타 티샷 + 2벌타 = 4타째)</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle2 size={13} className="text-slate-400 shrink-0 mt-0.5" />
                <span><strong>정규 투어 룰:</strong> 특설티가 없는 경우 직전 타격 위치(티박스)에서 잠정구(Provisional Ball)를 다시 치며 3번째 샷이 됩니다.</span>
              </div>
            </div>
          </div>

          {/* 2. Penalty Area (Hazards) */}
          <div className="bg-amber-950/30 border border-amber-900/50 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <h3 className="text-sm font-bold text-amber-300">2. 페널티 구역 (해저드) - 노랑/빨강 말뚝</h3>
              <span className="ml-auto text-[11px] font-bold px-2 py-0.5 rounded bg-amber-900/60 text-amber-200">
                +1 벌타
              </span>
            </div>
            <p className="text-slate-300 mb-2">
              워터해저드, 깊은 숲 등 페널티 구역으로 공이 들어간 경우입니다.
            </p>
            <div className="space-y-1.5 bg-black/40 rounded-xl p-2.5 text-[11px]">
              <div className="flex items-start gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>특설 해저드티 이동:</strong> 티샷이 해저드에 들어간 경우 해저드티에서 <span className="text-amber-300 font-bold">3번째 샷(3rd Shot)</span>으로 진행합니다. (1타 티샷 + 1벌타 = 3타째)</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle2 size={13} className="text-slate-400 shrink-0 mt-0.5" />
                <span><strong>후방선 / 2클럽 드롭:</strong> 볼이 경계를 통과한 지점에서 핀에 가깝지 않게 2클럽 이내에 무릎 높이에서 드롭 후 플레이합니다.</span>
              </div>
            </div>
          </div>

          {/* 3. Bunker & Unplayable */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle size={15} className="text-emerald-400" />
              <h3 className="text-sm font-bold text-slate-200">3. 언플레이어블 & 벙커 룰</h3>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-300">
              <li>나무 뿌리 등에 박혀 칠 수 없을 때: <strong>1벌타</strong> 후 2클럽 이내 드롭</li>
              <li>벙커 내 공 치기 불가 선언: <strong>1벌타</strong>로 벙커 내 드롭, 또는 <strong>2벌타</strong>로 벙커 밖 직후방 선상 드롭 가능</li>
              <li>모래에 클럽 페이스를 미리 대거나 연습스윙 시 모래를 건드리면 벌타(2벌타) 대상입니다.</li>
            </ul>
          </div>
        </div>

        {/* Footer Button */}
        <div className="pt-4 mt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white text-xs transition-all shadow-lg shadow-emerald-950"
          >
            확인했습니다 (코스로 복귀)
          </button>
        </div>
      </div>
    </div>
  );
};
