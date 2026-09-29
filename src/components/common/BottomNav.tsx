// src/components/common/BottomNav.tsx
import React from 'react';
import { Target, Map, FileSpreadsheet, BarChart3 } from 'lucide-react';

export type NavTab = 'round' | 'strategy' | 'scorecard' | 'analytics';

interface BottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  activeHoleNumber: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  activeHoleNumber,
}) => {
  const tabs = [
    {
      id: 'round' as NavTab,
      label: '스코어 입력',
      sub: `${activeHoleNumber}H 진행중`,
      icon: Target,
    },
    {
      id: 'strategy' as NavTab,
      label: '코스 공략',
      sub: 'AI 캐디 팁',
      icon: Map,
    },
    {
      id: 'scorecard' as NavTab,
      label: '스코어카드',
      sub: '18홀 카드',
      icon: FileSpreadsheet,
    },
    {
      id: 'analytics' as NavTab,
      label: '분석 대시보드',
      sub: 'GIR/퍼트/FIR',
      icon: BarChart3,
    },
  ];

  return (
    <nav className="fixed sm:absolute bottom-0 left-0 right-0 z-40 bg-[#07100d]/95 backdrop-blur-xl border-t border-emerald-950/80 px-2 py-2">
      <div className="grid grid-cols-4 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all relative ${
                isActive
                  ? 'text-emerald-400 font-bold bg-emerald-950/40 shadow-inner'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isActive && (
                <span className="absolute top-0.5 w-6 h-0.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#10b981]" />
              )}
              <Icon
                size={20}
                className={`transition-transform duration-200 ${
                  isActive ? 'scale-110 text-emerald-400' : 'text-slate-400'
                }`}
              />
              <span className="text-[11px] mt-1 tracking-tight leading-none">
                {tab.label}
              </span>
              <span className="text-[9px] text-slate-500 font-normal mt-0.5 leading-none">
                {tab.sub}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
