import React, { useState } from 'react';
import { Student, ScoreItem, PointRecord } from '../types';
import { X, Calendar, ClipboardList, PenTool, Flame, ArrowLeft, Trash2, Heart } from 'lucide-react';
import { POSITIVE_ACTIONS, NEGATIVE_ACTIONS } from '../constants';

interface StudentDetailModalProps {
  student: Student;
  onApplyScore: (scoreItem: { name: string; points: number }) => void;
  onUndoRecord: (recordId: string) => void;
  onClose: () => void;
  onChangeAvatarClick: () => void;
  initialCategory?: 'pos' | 'neg';
}

export default function StudentDetailModal({
  student,
  onApplyScore,
  onUndoRecord,
  onClose,
  onChangeAvatarClick,
  initialCategory = 'pos',
}: StudentDetailModalProps) {
  // Config state
  const [activePane, setActivePane] = useState<'rules' | 'history'>('rules');
  const [scoreCategory, setScoreCategory] = useState<'pos' | 'neg'>(initialCategory);
  const [manualPoints, setManualPoints] = useState<string>('');

  // Handle custom manual numerical input (e.g. +10, -5, 23)
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(manualPoints, 10);
    if (isNaN(val)) {
      alert('請輸入有效的數字！');
      return;
    }
    
    const formattedPoints = val;
    const name = formattedPoints >= 0 ? `手動加分` : `手動扣分`;
    onApplyScore({ name, points: formattedPoints });
    setManualPoints('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      {/* Container Card - Styled as a beautiful fresh classroom playbook */}
      <div 
        className="bg-[#fffdf9] border-6 border-slate-900 rounded-[38px] shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] w-full max-w-4xl overflow-hidden animate-cute-pop flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner/Header Block - matching the beautiful signature cherry-orange palette */}
        <div className="bg-gradient-to-r from-[#eb725a] via-[#f08573] to-[#eb725a] border-b-6 border-slate-900 px-4 sm:px-6 py-4.5 flex flex-col md:flex-row gap-4 items-center justify-between text-slate-900 relative">
          
          {/* Left Student Info Card Section - Styled like Polaroid with ID */}
          <div className="flex items-center space-x-3.5 bg-white/20 px-4 py-2.5 rounded-2xl border-2 border-dashed border-white/45">
            {/* Student Avatar Icon */}
            <div 
              onClick={onChangeAvatarClick}
              className="relative w-16 h-16 bg-white border-3 border-slate-900 rounded-2xl shadow-[3px_3px_0px_0px_rgba(30,41,59,1)] p-1.5 cursor-pointer hover:rotate-6 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center flex-shrink-0"
              title="更換頭像/伴侶"
            >
              <img
                src={student.avatarUrl}
                alt={student.name}
                referrerPolicy="no-referrer"
                className="w-13 h-13 object-contain"
              />
              <span className="absolute -bottom-1 -right-1 bg-yellow-300 text-slate-900 border-2 border-slate-900 text-[9px] font-black px-1 py-0.2 rounded-md">
                #{student.id}
              </span>
            </div>
 
            {/* Title / Score text */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-heading tracking-wider select-none flex items-center gap-1.5 drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)]">
                {student.name}
              </h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className="bg-[#fff1dc] text-orange-700 text-[9.5px] font-black px-2 py-0.5 rounded-full border border-orange-200 uppercase tracking-widest">
                  Classmate
                </span>
                <span className="text-white text-xs font-black drop-shadow-sm flex items-center gap-0.5 bg-black/15 px-2 py-0.5 rounded-full">
                  ⭐ <span className="font-mono">{student.goodScore + student.careScore}</span> 分
                </span>
              </div>
            </div>
          </div>
 
          {/* Middle hand-drawn book Custom Numeric Score Input Form */}
          <div className="flex-grow max-w-sm w-full">
            <form onSubmit={handleManualSubmit} className="relative flex items-center bg-[#fffbf2] border-3 border-slate-900 rounded-2xl px-3 py-1.5 shadow-[3.5px_3.5px_0px_0px_rgba(30,41,59,1)] hover:scale-[1.01] transition-transform duration-100">
              {/* Crayon Pen Drawing Indicator icon */}
              <PenTool className="w-4.5 h-4.5 text-amber-600 mr-2 flex-shrink-0 stroke-[2.5px]" />
              
              <input
                type="text"
                placeholder="手敲分數... (例如 +5, -10)"
                value={manualPoints}
                onChange={(e) => setManualPoints(e.target.value)}
                className="w-full bg-transparent font-black text-slate-800 placeholder-amber-800/40 text-xs focus:outline-none"
              />
              
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-extrabold px-3 py-1 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] text-xs active:scale-95 duration-100 flex-shrink-0 cursor-pointer"
              >
                確認加減
              </button>
            </form>
          </div>
 
          {/* Quick logs button & exit close modal button */}
          <div className="flex items-center space-x-2.5">
            {activePane === 'rules' ? (
              <button
                onClick={() => setActivePane('history')}
                className="bg-sky-400 hover:bg-sky-500 text-slate-900 border-2 border-slate-900 rounded-2xl px-3 py-2 flex items-center space-x-1.5 shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] text-xs font-black active:scale-95 duration-100 cursor-pointer"
                title="查看歷史黑板紀錄"
              >
                <ClipboardList className="w-4 h-4 stroke-[2.5px]" />
                <span>黑板紀錄 ({student.history.length})</span>
              </button>
            ) : (
              <button
                onClick={() => setActivePane('rules')}
                className="bg-emerald-400 hover:bg-emerald-500 text-slate-900 border-2 border-slate-900 rounded-2xl px-3 py-2 flex items-center space-x-1.5 shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] text-xs font-black active:scale-95 duration-100 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5px]" />
                <span>返回評分</span>
              </button>
            )}
 
            {/* X Exit Button */}
            <button
              onClick={onClose}
              className="p-2 bg-white hover:bg-rose-50 text-rose-600 hover:text-rose-700 border-3 border-slate-900 rounded-full shadow-[2.5px_2.5px_0px_0px_rgba(30,41,59,1)] hover:scale-105 active:scale-90 transition duration-150 cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[3.5px]" />
            </button>
          </div>
        </div>
 
        {/* Modal Main Area Container */}
        <div className="flex-grow p-4 sm:p-6 bg-[#fffcf6] max-h-[72vh] overflow-y-auto">
          
          {/* 1. SCORING SCHEME PANEL */}
          {activePane === 'rules' && (
            <div className="flex flex-col gap-4 animate-fade-in">
              {/* Category Tab Selector with elegant styling */}
              <div className="flex justify-center border-b-2 border-slate-200/60 pb-3">
                <div className="bg-[#fffcf7] p-1.5 rounded-2xl border-3 border-slate-900 flex gap-2 shadow-[2.5px_2.5px_0px_0px_rgba(30,41,59,1)]">
                  <button
                    type="button"
                    onClick={() => setScoreCategory('pos')}
                    className={`px-5 py-2 sm:px-7 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
                      scoreCategory === 'pos'
                        ? 'bg-emerald-500 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] scale-[1.03]'
                        : 'text-emerald-700 hover:bg-emerald-50 font-bold'
                    }`}
                  >
                    <span>🌱 做得好 (+加分)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setScoreCategory('neg')}
                    className={`px-5 py-2 sm:px-7 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
                      scoreCategory === 'neg'
                        ? 'bg-rose-500 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] scale-[1.03]'
                        : 'text-rose-700 hover:bg-rose-50 font-bold'
                    }`}
                  >
                    <span>🩹 要注意 (-扣分)</span>
                  </button>
                </div>
              </div>

              {/* Grid content based on chosen category */}
              {scoreCategory === 'pos' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-2">
                  {POSITIVE_ACTIONS.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => onApplyScore({ name: action.name, points: action.points })}
                      className="group relative flex items-center justify-between text-left p-3.5 bg-white border-2 border-slate-900 hover:border-emerald-500 hover:bg-emerald-50/15 rounded-2xl transition duration-150 transform hover:-translate-y-1 active:translate-y-0 shadow-[3px_3px_0px_0px_rgba(30,41,59,1)] hover:shadow-[3px_3px_0px_0px_rgba(16,185,129,1)] cursor-pointer"
                    >
                      <div className="flex items-center space-x-3.5 pr-2 min-w-0">
                        {/* Cutest round sticker container */}
                        <span className="text-2xl group-hover:scale-115 duration-150 flex-shrink-0 select-none bg-emerald-50 text-emerald-600 w-11 h-11 rounded-xl flex items-center justify-center border-2 border-dashed border-emerald-200">
                          {action.icon}
                        </span>
                        <div className="truncate">
                          <div className="font-extrabold text-slate-800 text-xs sm:text-sm truncate leading-snug">
                            {action.name}
                          </div>
                          {action.englishName && (
                            <div className="text-[9px] text-slate-400 truncate leading-tight font-black uppercase mt-0.5 tracking-wider">
                              {action.englishName}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0 bg-emerald-500 text-white font-black text-xs border-2 border-slate-900 rounded-xl px-2.5 py-1 shadow-[1.5px_1.5px_0px_0px_rgba(30,41,59,1)]">
                        +{action.points}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-2">
                  {NEGATIVE_ACTIONS.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => onApplyScore({ name: action.name, points: action.points })}
                      className="group relative flex items-center justify-between text-left p-3.5 bg-white border-2 border-slate-900 hover:border-rose-500 hover:bg-rose-50/15 rounded-2xl transition duration-150 transform hover:-translate-y-1 active:translate-y-0 shadow-[3px_3px_0px_0px_rgba(30,41,59,1)] hover:shadow-[3px_3px_0px_0px_rgba(239,68,68,1)] cursor-pointer"
                    >
                      <div className="flex items-center space-x-3.5 pr-2 min-w-0">
                        {/* Cutest round sticker container */}
                        <span className="text-2xl group-hover:scale-115 duration-150 flex-shrink-0 select-none bg-rose-50 text-rose-600 w-11 h-11 rounded-xl flex items-center justify-center border-2 border-dashed border-rose-200">
                          {action.icon}
                        </span>
                        <div className="truncate">
                          <div className="font-extrabold text-slate-800 text-xs sm:text-sm truncate leading-snug">
                            {action.name}
                          </div>
                          {action.englishName && (
                            <div className="text-[9px] text-slate-400 truncate leading-tight font-black uppercase mt-0.5 tracking-wider">
                              {action.englishName}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0 bg-rose-500 text-white font-black text-xs border-2 border-slate-900 rounded-xl px-2.5 py-1 shadow-[1.5px_1.5px_0px_0px_rgba(30,41,59,1)]">
                        {action.points}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
 
          {/* 2. CHALKBOARD HISTORY LOGS TAB */}
          {activePane === 'history' && (
            <div className="bg-[#fdfaf3] border-4 border-slate-900 rounded-[28px] p-5 shadow-[4px_4px_0px_0px_rgba(30,41,59,1)] max-w-xl mx-auto flex flex-col">
              <div className="text-center pb-4 border-b-2 border-dashed border-stone-300">
                <span className="text-4xl block mb-1">📜</span>
                <h3 className="text-xl font-extrabold text-slate-800 font-heading">
                  小黑板歷史紀錄 - {student.name}
                </h3>
                <p className="text-xs text-slate-500 font-bold mt-0.5">點擊 🧹 按鈕可隨時擦掉單條評分</p>
              </div>
 
              {/* Scrollable logs column */}
              <div className="my-4 max-h-[300px] overflow-y-auto space-y-3 pr-1 py-1">
                {student.history.length === 0 ? (
                  <div className="text-center py-12 text-slate-300">
                    <ClipboardList className="w-10 h-10 mx-auto opacity-30 stroke-[1.5px] mb-2" />
                    <p className="text-sm font-bold">目前沒有任何黑板紀錄喔！</p>
                    <p className="text-xs">所有的評分事件將會在此顯示。</p>
                  </div>
                ) : (
                  [...student.history].reverse().map((record) => (
                    <div
                      key={record.id}
                      className="bg-white border-2 border-slate-905 rounded-2xl p-3 flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] hover:scale-[1.01] transition-transform duration-100"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-extrabold text-slate-800 text-sm">
                            {record.itemName}
                          </div>
                          <div className="text-[10px] text-slate-400 font-bold font-mono">
                            {record.timestamp}
                          </div>
                        </div>
                      </div>
 
                      {/* Display change value with delete/broom buttons */}
                      <div className="flex items-center space-x-2">
                        <span
                          className={`font-black px-2.5 py-1 rounded-xl text-xs border-2 border-slate-900 shadow-[1.5px_1.5px_0px_0px_rgba(30,41,59,1)] ${
                            record.points >= 0
                              ? 'bg-green-50 text-green-700'
                              : 'bg-red-50 text-red-650'
                          }`}
                        >
                          {record.points >= 0 ? `+${record.points}` : record.points}
                        </span>
 
                        {/* Broom / Undo Action trigger */}
                        <button
                          onClick={() => onUndoRecord(record.id)}
                          className="p-1.5 bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-650 rounded-xl border-2 border-slate-900 shadow-[1.5px_1.5px_0px_0px_rgba(30,41,59,1)] active:scale-95 duration-100 transition-all cursor-pointer"
                          title="擦掉此項評分"
                        >
                          <span className="text-sm">🧹</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
 
              {/* Bottom return toggle */}
              <button
                onClick={() => setActivePane('rules')}
                className="w-full bg-[#f08573] hover:bg-[#e47664] text-white border-2 border-slate-900 text-sm font-black py-3 rounded-2xl shadow-[2.5px_2.5px_0px_0px_rgba(30,41,59,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(30,41,59,1)] transition-all flex items-center justify-center space-x-1 cursor-pointer"
              >
                <span>回去加分吧！</span>
              </button>
            </div>
          )}
 
        </div>
 
        {/* Crayon credit message line */}
        <div className="bg-[#fff0eb] px-6 py-3 border-t-6 border-slate-900 text-center text-[10.5px] text-[#ca4d39] font-extrabold tracking-widest font-mono uppercase">
          ✦ MISS IONG'S CLASS ✦
        </div>
      </div>
    </div>
  );
}
