// src/components/common/BottomNav.tsx
import React from 'react';
import { Target, Map, FileSpreadsheet, BarChart3, History } from 'lucide-react';

export type NavTab = 'round' | 'strategy' | 'scorecard' | 'analytics' | 'history';

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
      label: '스코어',
      sub: `${activeHoleNumber}H 입력`,
      icon: Target,
    },
    {
      id: 'strategy' as NavTab,
      label: '코스공략',
      sub: '캐디 팁',
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
      label: '통계분석',
      sub: '10경기/GIR',
      icon: BarChart3,
    },
    {
      id: 'history' as NavTab,
      label: '경기기록',
      sub: '목록/관리',
      icon: History,
    },
  ];

  return (
    <nav className="fixed sm:absolute bottom-0 left-0 right-0 z-40 bg-[#07100d]/95 backdrop-blur-xl border-t border-emerald-950/80 px-1.5 py-1.5 no-print">
      <div className="grid grid-cols-5 gap-0.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-all relative ${
                isActive
                  ? 'text-emerald-400 font-bold bg-emerald-950/40 shadow-inner'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isActive && (
                <span className="absolute top-0.5 w-5 h-0.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#10b981]" />
              )}
              <Icon
                size={18}
                className={`transition-transform duration-200 ${
                  isActive ? 'scale-110 text-emerald-400' : 'text-slate-400'
                }`}
              />
              <span className="text-[10px] mt-1 tracking-tight leading-none">
                {tab.label}
              </span>
              <span className="text-[8px] text-slate-500 font-normal mt-0.5 leading-none">
                {tab.sub}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
