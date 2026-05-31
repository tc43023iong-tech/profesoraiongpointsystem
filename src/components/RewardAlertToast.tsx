import React, { useEffect } from 'react';
import { Student } from '../types';

interface RewardAlertToastProps {
  student?: Student;
  studentsList?: Student[];
  itemName: string;
  points: number;
  onUndo: () => void;
  onClose: () => void;
}

export default function RewardAlertToast({
  student,
  studentsList,
  itemName,
  points,
  onUndo,
  onClose,
}: RewardAlertToastProps) {
  const isPositive = points >= 0;
  const isBulk = studentsList && studentsList.length > 1;
  const currentTotal = student ? (student.goodScore + student.careScore) : 0;

  // Auto close effect after 1.7s (single) or 2.5s (bulk)
  useEffect(() => {
    const duration = isBulk ? 2500 : 1700;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, isBulk]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      {/* Container - Green theme for positive, Red theme for negative */}
      <div 
        className={`relative w-full max-w-sm rounded-[32px] border-6 border-slate-900 p-6 text-center shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] transform transition-transform duration-300 animate-cute-pop ${
          isPositive ? 'bg-emerald-50' : 'bg-rose-50'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Bandage / Sparkles Icon Decoration */}
        <div className="absolute -top-7 left-1/2 -translate-x-1/2">
          {isPositive ? (
            <div className="bg-yellow-400 text-slate-900 p-2.5 rounded-full border-4 border-slate-900 shadow-md transform hover:scale-110">
              <span className="text-3xl">🥳</span>
            </div>
          ) : (
            <div className="bg-amber-100 text-slate-800 p-2.5 rounded-full border-4 border-slate-900 shadow-md">
              <span className="text-3xl">🩹</span>
            </div>
          )}
        </div>

        {/* Title greeting */}
        <div className="mt-4 mb-3" id="reward-dialog-title-container">
          <h2 className={`text-4xl font-black font-heading ${isPositive ? 'text-emerald-700' : 'text-rose-700'}`}>
            {isBulk ? (isPositive ? '太棒了大家！' : '大家再加把勁！') : (isPositive ? '恭喜你！' : '繼續努力！')}
          </h2>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-mono mt-0.5" id="reward-dialog-subtitle">
            {isPositive ? 'EXCELLENT EFFORT' : 'KEEP IT UP'}
          </p>
        </div>

        {/* Avatars Representation */}
        {!isBulk ? (
          <>
            {/* Large Avatar Centering Ring */}
            <div className="relative mx-auto w-36 h-36 rounded-full bg-white border-4 border-slate-800 flex items-center justify-center shadow-md p-3 mb-3">
              <img
                src={student?.avatarUrl}
                alt={student?.name}
                referrerPolicy="no-referrer"
                className="w-28 h-28 object-contain drop-shadow-md animate-bounce"
              />
            </div>

            {/* Student identification text */}
            <div className="mb-4">
              <h3 className="text-2xl font-black text-slate-800 font-heading">
                #{student?.id} {student?.name}
              </h3>
              <span className="inline-block bg-white/70 border border-slate-350 text-xs font-black px-3.5 py-0.5 rounded-full mt-1.5 text-slate-700">
                {itemName}
              </span>
            </div>
          </>
        ) : (
          <>
            {/* Multiple avatars stack */}
            <div className="flex items-center justify-center -space-x-4 mb-4 mt-2">
              {studentsList?.slice(0, 4).map((s, idx) => (
                <div 
                  key={s.id} 
                  className="relative w-18 h-18 rounded-full bg-white border-4 border-slate-800 flex items-center justify-center shadow-md overflow-hidden transform hover:scale-115 transition-transform" 
                  style={{ zIndex: 10 - idx }}
                >
                  <img
                    src={s.avatarUrl}
                    alt={s.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-contain"
                  />
                </div>
              ))}
              {studentsList && studentsList.length > 4 && (
                <div className="relative w-18 h-18 rounded-full bg-slate-800 text-white font-black border-4 border-slate-800 flex items-center justify-center text-sm shadow-md z-0">
                  +{studentsList.length - 4}
                </div>
              )}
            </div>

            {/* Students names list (compact and elegant) */}
            <div className="mb-4 px-2" id="bulk-recipient-list">
              <h3 className="text-base sm:text-lg font-black text-slate-800 font-heading line-clamp-2 leading-snug">
                {studentsList?.map(s => s.name).join('、')}
              </h3>
              <span className="inline-block bg-white/70 border border-slate-350 text-xs font-black px-3.5 py-0.5 rounded-full mt-2 text-slate-700">
                {itemName} | 共 {studentsList?.length} 位學生
              </span>
            </div>
          </>
        )}

        {/* Large formatted Points Badge */}
        <div className="flex justify-center mb-5" id="points-badge-row">
          <div 
            className={`text-6xl font-black font-playful border-4 border-slate-900 px-8 py-2.5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(30,41,59,1)] transform rotate-[-3deg] ${
              isPositive ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
            }`}
          >
            {isPositive ? `+${points}` : points}
          </div>
        </div>

        {/* Total stats sub-information block - only shown for single student */}
        {!isBulk && (
          <div className="bg-white/80 border-2 border-slate-800 rounded-2xl py-2 px-4 shadow-sm mb-5">
            <p className="text-[11px] font-black tracking-widest text-slate-500 font-mono uppercase">
              TOTAL SCORE / 目前總分
            </p>
            <p className="text-3xl font-black text-slate-800 font-heading">
              {currentTotal}
            </p>
          </div>
        )}

        {/* Interactive action buttons footer */}
        <div className="flex gap-2">
          {/* Revert / Undo action - only if not bulk for simplicity, or allowed for bulk if passed */}
          <button
            onClick={() => {
              onUndo();
              onClose();
            }}
            className="flex-1 bg-white hover:bg-slate-100 text-slate-800 font-black py-2.5 rounded-xl border-2 border-slate-800 shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] hover:shadow-[1px_1px_0px_0px_rgba(30,41,59,1)] active:translate-y-0.5 transition-all text-xs flex items-center justify-center space-x-1"
          >
            <span>🧹 撤銷評分 (UNDO)</span>
          </button>

          {/* Close Toast */}
          <button
            onClick={onClose}
            className={`flex-1 font-black py-2.5 rounded-xl border-2 border-slate-800 shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] hover:shadow-[1px_1px_0px_0px_rgba(30,41,59,1)] active:translate-y-0.5 transition-all text-xs text-white ${
              isPositive ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
            }`}
          >
            確認
          </button>
        </div>
      </div>
    </div>
  );
}
