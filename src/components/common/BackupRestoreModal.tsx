// src/components/common/BackupRestoreModal.tsx
import React, { useState, useRef } from 'react';
import {
  downloadBackupFile,
  createFullBackup,
  restoreFromBackup,
  AppBackupData,
  loadRounds,
  getCustomCourses,
  loadUserName,
} from '../../utils/storage';
import {
  X,
  Download,
  Upload,
  Database,
  FileJson,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  RefreshCw,
  HardDrive,
} from 'lucide-react';

interface BackupRestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataRestored: () => void;
}

export const BackupRestoreModal: React.FC<BackupRestoreModalProps> = ({
  isOpen,
  onClose,
  onDataRestored,
}) => {
  const [activeTab, setActiveTab] = useState<'backup' | 'restore'>('backup');
  const [restoreMode, setRestoreMode] = useState<'overwrite' | 'merge'>('overwrite');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [pastedJson, setPastedJson] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const currentRounds = loadRounds();
  const currentCustomCourses = getCustomCourses();
  const currentUserName = loadUserName();

  const handleDownload = () => {
    downloadBackupFile();
    setStatusMessage({ type: 'success', text: '백업 파일(.json)이 다운로드 폴더에 안전하게 저장되었습니다.' });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleCopyClipboard = () => {
    const backup = createFullBackup();
    navigator.clipboard.writeText(JSON.stringify(backup, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content) as AppBackupData;
        executeRestore(parsed);
      } catch (err: any) {
        setStatusMessage({ type: 'error', text: '파일 파싱 실패: 올바른 JSON 형식이 아닙니다.' });
      }
    };
    reader.readAsText(file);
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePastedRestore = () => {
    if (!pastedJson.trim()) {
      setStatusMessage({ type: 'error', text: '복원할 JSON 텍스트를 입력해 주세요.' });
      return;
    }
    try {
      const parsed = JSON.parse(pastedJson) as AppBackupData;
      executeRestore(parsed);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: 'JSON 구문 오류: 올바른 백업 데이터를 붙여넣어 주세요.' });
    }
  };

  const executeRestore = (backup: AppBackupData) => {
    const result = restoreFromBackup(backup, restoreMode);
    if (result.success) {
      setStatusMessage({
        type: 'success',
        text: `복원 완료! 총 ${result.roundCount}개 라운드와 ${result.courseCount}개 커스텀 코스가 반영되었습니다.`
      });
      onDataRestored();
      setTimeout(() => {
        setStatusMessage(null);
        onClose();
      }, 1500);
    } else {
      setStatusMessage({ type: 'error', text: result.message });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#101b16] border border-emerald-900/60 rounded-3xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-emerald-900/50 bg-[#0c1612] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <Database size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">데이터 백업 & 불러오기</h3>
              <p className="text-xs text-slate-400">로컬 스코어 및 코스 정보 안전 보관</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-1 p-2 bg-[#0c1612] border-b border-emerald-950">
          <button
            onClick={() => setActiveTab('backup')}
            className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'backup'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Download size={14} />
            <span>데이터 백업 (내보내기)</span>
          </button>
          <button
            onClick={() => setActiveTab('restore')}
            className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'restore'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload size={14} />
            <span>데이터 불러오기 (복원)</span>
          </button>
        </div>

        {/* Feedback Message Banner */}
        {statusMessage && (
          <div className={`p-3 text-xs flex items-center gap-2 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/80 border-b border-emerald-800 text-emerald-300'
              : 'bg-red-950/80 border-b border-red-800 text-red-300'
          }`}>
            {statusMessage.type === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {activeTab === 'backup' ? (
            <div className="space-y-4">
              {/* Current Storage Status Card */}
              <div className="bg-black/30 border border-emerald-950 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-slate-300 font-bold mb-1">
                  <span className="flex items-center gap-1.5">
                    <HardDrive size={13} className="text-emerald-400" />
                    <span>현재 로컬 데이터 현황</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">안전 저장 중</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="bg-black/40 p-2 rounded-xl border border-slate-900">
                    <span className="text-[10px] text-slate-400 block">라운드 기록</span>
                    <span className="text-sm font-black text-white font-mono">{currentRounds.length}개</span>
                  </div>
                  <div className="bg-black/40 p-2 rounded-xl border border-slate-900">
                    <span className="text-[10px] text-slate-400 block">직접 등록 코스</span>
                    <span className="text-sm font-black text-white font-mono">{currentCustomCourses.length}개</span>
                  </div>
                  <div className="bg-black/40 p-2 rounded-xl border border-slate-900">
                    <span className="text-[10px] text-slate-400 block">골퍼 프로필</span>
                    <span className="text-sm font-black text-emerald-300 truncate block">{currentUserName}</span>
                  </div>
                </div>
              </div>

              {/* Main Backup Download Action */}
              <div className="space-y-2">
                <button
                  onClick={handleDownload}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 font-black text-white text-xs flex items-center justify-center gap-2 shadow-xl shadow-emerald-950 active:scale-98 transition-all"
                >
                  <Download size={16} />
                  <span>전체 데이터 백업 파일(.json) 다운로드</span>
                </button>
                <p className="text-[11px] text-slate-400 text-center">
                  스마트폰 변경 시에도 다운로드한 파일로 언제든 100% 복원 가능합니다.
                </p>
              </div>

              {/* Fallback Clipboard Copy */}
              <div className="pt-2 border-t border-emerald-950 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">텍스트로 간편 복사</span>
                <button
                  onClick={handleCopyClipboard}
                  className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-semibold transition-all"
                >
                  {isCopied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{isCopied ? '복사됨!' : '클립보드에 복사'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Restore Options */}
              <div className="bg-black/30 border border-emerald-950 rounded-2xl p-3 space-y-2">
                <span className="font-bold text-slate-300 block mb-1">복원 방식 선택</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRestoreMode('overwrite')}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      restoreMode === 'overwrite'
                        ? 'bg-emerald-600/30 border-emerald-400 text-white font-bold'
                        : 'bg-black/40 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="block text-xs font-bold">덮어쓰기 (권장)</span>
                    <span className="text-[9px] text-slate-400">백업 파일로 완전 대체</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRestoreMode('merge')}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      restoreMode === 'merge'
                        ? 'bg-emerald-600/30 border-emerald-400 text-white font-bold'
                        : 'bg-black/40 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="block text-xs font-bold">병합하기 (Merge)</span>
                    <span className="text-[9px] text-slate-400">기존 데이터에 추가</span>
                  </button>
                </div>
              </div>

              {/* 1. File Upload Button */}
              <div className="space-y-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".json,application/json"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 active:scale-98 transition-all"
                >
                  <FileJson size={16} />
                  <span>백업 파일(.json) 선택하여 불러오기</span>
                </button>
                <p className="text-[11px] text-slate-400 text-center">
                  기기에서 이전에 다운로드한 .json 파일을 선택해 주세요.
                </p>
              </div>

              {/* 2. Text Paste Restore (Alternative) */}
              <div className="pt-2 border-t border-emerald-950 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">또는 백업 JSON 텍스트 직접 붙여넣기</span>
                </div>
                <textarea
                  rows={3}
                  value={pastedJson}
                  onChange={(e) => setPastedJson(e.target.value)}
                  placeholder="클립보드에 복사해 둔 백업 JSON 문자열을 여기에 붙여넣으세요..."
                  className="w-full bg-black/50 border border-emerald-900/60 rounded-xl p-2.5 text-[11px] text-slate-200 font-mono placeholder-slate-600 focus:outline-none focus:border-emerald-400"
                />
                <button
                  type="button"
                  onClick={handlePastedRestore}
                  disabled={!pastedJson.trim()}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <RefreshCw size={13} />
                  <span>입력한 JSON으로 복원 실행</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
