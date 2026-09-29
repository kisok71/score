// src/components/caddie/CaddieChatModal.tsx
import React, { useState } from 'react';
import { HoleInfo, Round, RoundStats } from '../../types/golf';
import { calculateRoundStats } from '../../utils/golfCalculator';
import { X, Send, Sparkles, MessageSquare, Flag, Lightbulb } from 'lucide-react';

interface CaddieChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentHole: HoleInfo;
  round: Round | null;
}

interface Message {
  id: string;
  sender: 'caddie' | 'user';
  text: string;
  timestamp: string;
}

export const CaddieChatModal: React.FC<CaddieChatModalProps> = ({
  isOpen,
  onClose,
  currentHole,
  round,
}) => {
  const [inputText, setInputText] = useState<string>('');

  const initialStats: RoundStats | null = round
    ? calculateRoundStats(round, [currentHole], round.players[0])
    : null;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'caddie',
      text: `안녕하세요 대표님! 오늘 전담 캐디 매니저입니다. 현재 ${currentHole.holeNumber}번홀(Par ${currentHole.par}, ${currentHole.distanceMeter}m)에 위치해 계시네요. 샷 전략이나 멘탈 코칭, 클럽 추천 등 무엇이든 말씀해 주시면 최선을 다해 서포트하겠습니다! 🏌️‍♂️`,
      timestamp: '방금',
    },
  ]);

  if (!isOpen) return null;

  const quickQuestions = [
    `🎯 ${currentHole.holeNumber}번홀 핵심 공략법 알려줘`,
    '🌪️ 바람과 고저차 클럽 선택 요령은?',
    '🧘 방금 미스샷 났는데 멘탈 어떻게 잡아?',
    '⛳ 3퍼트 안 하는 퍼팅 거리감 팁 줘',
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: '방금',
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Generate intelligent, professional Caddie Manager answer
    setTimeout(() => {
      let reply = '';
      if (query.includes('공략법')) {
        reply = `대표님, ${currentHole.holeNumber}번홀은 ${currentHole.caddieStrategy.safeRoute} 이 가장 안전합니다. 특히 ${currentHole.caddieStrategy.keyWarning} 이 홀의 관건이니 욕심을 버리고 공략해 보시죠!`;
      } else if (query.includes('바람') || query.includes('고저차')) {
        reply = `현재 ${currentHole.elevationMeter > 0 ? '오르막 +' + currentHole.elevationMeter + 'm' : '내리막 ' + currentHole.elevationMeter + 'm'} 상태입니다. 바람이 2~3m/s 불 경우 볼 탄도가 뜨면 1클럽 이상 밀립니다. 탄도를 낮게 누르고 ${currentHole.caddieStrategy.recommendedClub}으로 부드러운 3/4 스윙을 추천드립니다.`;
      } else if (query.includes('멘탈') || query.includes('미스샷')) {
        reply = `대표님! 타이거 우즈도 한 라운드에 3개 이상의 실수를 합니다. 방금 친 샷은 이미 지난 일이고, 골프에서 가장 중요한 샷은 '지금 칠 다음 샷'입니다. 어깨 힘을 한 번 툭 털어내시고 깊은 호흡 세 번 후 편안하게 빈스윙 2회만 해보세요!`;
      } else if (query.includes('퍼트') || query.includes('거리감')) {
        reply = `거리감 맞추실 땐 홀컵을 보면서 빈스윙을 두 번 하세요. 그리고 공 뒤에서 핀까지의 거리를 발걸음(보폭)으로 상상하고, 백스윙 크기로만 거리를 조절하시는 것이 3퍼트를 원천 차단하는 특효약입니다!`;
      } else {
        reply = `대표님, 좋은 질문이십니다! ${currentHole.holeNumber}번홀은 침착하게 페어웨이 중앙을 확보하시면 다음 세컨샷 시야가 아주 훤하게 열립니다. 동반자 샷에 휘말리지 마시고 대표님만의 부드러운 템포(하나, 둘, 셋)를 유지해 주세요! 나이스 샷!`;
      }

      const caddieMsg: Message = {
        id: `c-${Date.now()}`,
        sender: 'caddie',
        text: reply,
        timestamp: '방금',
      };
      setMessages(prev => [...prev, caddieMsg]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#101b16] border border-emerald-800/60 rounded-3xl w-full max-w-md h-[80vh] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-emerald-900/50 bg-[#0c1612] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <Sparkles size={18} className="text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-white">AI 투어 캐디 매니저</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <p className="text-[11px] text-emerald-300">
                {currentHole.holeNumber}번홀 서포트 중 • 즉시 실시간 조언
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

        {/* Chat message list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map(m => {
            const isCaddie = m.sender === 'caddie';
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isCaddie ? 'items-start' : 'items-end'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow ${
                    isCaddie
                      ? 'bg-slate-900/90 border border-emerald-900/60 text-slate-100 rounded-tl-sm'
                      : 'bg-emerald-600 text-white font-medium rounded-tr-sm'
                  }`}
                >
                  {isCaddie && (
                    <span className="text-[10px] text-emerald-400 font-bold block mb-1">
                      캐디 매니저
                    </span>
                  )}
                  {m.text}
                </div>
                <span className="text-[9px] text-slate-500 mt-1 px-1">{m.timestamp}</span>
              </div>
            );
          })}
        </div>

        {/* Quick Question Chips */}
        <div className="p-2 border-t border-emerald-950 bg-black/40 overflow-x-auto flex items-center gap-1.5 no-scrollbar">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/60 text-emerald-300 hover:bg-emerald-900 active:scale-95 transition-all"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#0c1612] border-t border-emerald-950 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="캐디 매니저에게 궁금한 점을 물어보세요..."
            className="flex-1 bg-black/50 border border-emerald-900/70 rounded-2xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
          />
          <button
            onClick={() => handleSend()}
            className="p-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white active:scale-95 transition-all shadow-md shadow-emerald-950"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
