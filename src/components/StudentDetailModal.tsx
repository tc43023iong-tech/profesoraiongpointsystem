import React, { useState } from 'react';
import { Student, ScoreItem, PointRecord } from '../types';
import { X, Calendar, ClipboardList, PenTool, Flame, ArrowLeft, Trash2, Heart, Settings } from 'lucide-react';
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

  // Dynamic score items
  const [positiveActions, setPositiveActions] = useState<ScoreItem[]>(() => {
    const saved = localStorage.getItem('class_positive_actions');
    return saved ? JSON.parse(saved) : POSITIVE_ACTIONS;
  });

  const [negativeActions, setNegativeActions] = useState<ScoreItem[]>(() => {
    const saved = localStorage.getItem('class_negative_actions');
    return saved ? JSON.parse(saved) : NEGATIVE_ACTIONS;
  });

  // Settings states
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<'pos' | 'neg'>('pos');
  const [tempPositiveActions, setTempPositiveActions] = useState<ScoreItem[]>([]);
  const [tempNegativeActions, setTempNegativeActions] = useState<ScoreItem[]>([]);

  const handleOpenSettings = () => {
    setTempPositiveActions(JSON.parse(JSON.stringify(positiveActions)));
    setTempNegativeActions(JSON.parse(JSON.stringify(negativeActions)));
    setSettingsTab(scoreCategory);
    setIsSettingsOpen(true);
  };

  const handleSaveSettings = () => {
    localStorage.setItem('class_positive_actions', JSON.stringify(tempPositiveActions));
    localStorage.setItem('class_negative_actions', JSON.stringify(tempNegativeActions));
    setPositiveActions(tempPositiveActions);
    setNegativeActions(tempNegativeActions);
    setIsSettingsOpen(false);
  };

  const handleResetToDefaults = () => {
    if (confirm('確定要將所有加分/扣分項目重設為系統預設值嗎？')) {
      localStorage.removeItem('class_positive_actions');
      localStorage.removeItem('class_negative_actions');
      setPositiveActions(POSITIVE_ACTIONS);
      setNegativeActions(NEGATIVE_ACTIONS);
      setTempPositiveActions(JSON.parse(JSON.stringify(POSITIVE_ACTIONS)));
      setTempNegativeActions(JSON.parse(JSON.stringify(NEGATIVE_ACTIONS)));
    }
  };

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
      {/* Container Card - Styled as a beautiful fresh classroom playbook with flat black rounded border and zero shadows */}
      <div 
        className="bg-[#fffdf9] border-2 border-black/15 rounded-[38px] w-full max-w-4xl overflow-hidden animate-cute-pop flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner/Header Block - matching the beautiful signature cherry-orange palette */}
        <div className="bg-gradient-to-r from-[#eb725a] via-[#f08573] to-[#eb725a] border-b border-black/15 px-4 sm:px-6 py-4.5 flex flex-col md:flex-row gap-4 items-center justify-between text-slate-900 relative">
          
          {/* Left Student Info Card Section - Styled like Polaroid with ID */}
          <div className="flex items-center space-x-3.5 bg-white/20 px-4 py-2.5 rounded-2xl border border-dashed border-white/40">
            {/* Student Avatar Icon */}
            <div 
              onClick={onChangeAvatarClick}
              className="relative w-16 h-16 bg-white border border-black/15 rounded-2xl p-1.5 cursor-pointer hover:rotate-6 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center flex-shrink-0"
              title="更換頭像/伴侶"
            >
              <img
                src={student.avatarUrl}
                alt={student.name}
                referrerPolicy="no-referrer"
                className="w-13 h-13 object-contain"
              />
              <span className="absolute -bottom-1 -right-1 bg-yellow-300 text-slate-900 border border-black/15 text-[9px] font-black px-1 py-0.2 rounded-md">
                #{student.id}
              </span>
            </div>
 
            {/* Title / Score text */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-heading tracking-wider select-none flex items-center gap-1.5 drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)]">
                {student.name}
              </h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className="bg-[#fff1dc] text-orange-700 text-[9.5px] font-black px-2 py-0.5 rounded-full border border-orange-200 uppercase tracking-widest font-sans">
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
            <form onSubmit={handleManualSubmit} className="relative flex items-center bg-[#fffbf2] border border-black/15 rounded-2xl px-3 py-1.5 hover:scale-[1.01] transition-transform duration-100">
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
                className="bg-yellow-400 hover:bg-yellow-505 text-slate-900 font-extrabold px-3 py-1 rounded-xl border border-black/15 text-xs active:scale-95 duration-100 flex-shrink-0 cursor-pointer"
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
                className="bg-sky-450 hover:bg-sky-505 text-slate-900 border border-black/15 rounded-2xl px-3 py-2 flex items-center space-x-1.5 text-xs font-black active:scale-95 duration-100 cursor-pointer"
                title="查看歷史黑板紀錄"
              >
                <ClipboardList className="w-4 h-4 stroke-[2.5px]" />
                <span>黑板紀錄 ({student.history.length})</span>
              </button>
            ) : (
              <button
                onClick={() => setActivePane('rules')}
                className="bg-emerald-400 hover:bg-emerald-500 text-slate-900 border border-black/15 rounded-2xl px-3 py-2 flex items-center space-x-1.5 text-xs font-black active:scale-95 duration-100 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5px]" />
                <span>返回評分</span>
              </button>
            )}
 
            {/* X Exit Button */}
            <button
              onClick={onClose}
              className="p-2 bg-white hover:bg-rose-50 text-rose-600 hover:text-rose-700 border border-black/15 rounded-full hover:scale-105 active:scale-90 transition duration-150 cursor-pointer"
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
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between border-b-2 border-slate-200/60 pb-3">
                <div className="bg-[#fffcf7] p-1.5 rounded-2xl border border-black/15 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setScoreCategory('pos')}
                    className={`px-5 py-2 sm:px-7 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
                      scoreCategory === 'pos'
                        ? 'bg-emerald-500 text-white border border-transparent scale-[1.03]'
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
                        ? 'bg-rose-500 text-white border border-transparent scale-[1.03]'
                        : 'text-rose-700 hover:bg-rose-50 font-bold'
                    }`}
                  >
                    <span>🩹 要注意 (-扣分)</span>
                  </button>
                </div>

                {/* Settings Configuration Button */}
                <button
                  type="button"
                  onClick={handleOpenSettings}
                  className="px-4 py-2 border border-black/15 bg-white hover:bg-slate-55 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 text-slate-700 shadow-xs"
                >
                  <Settings className="w-3.5 h-3.5 stroke-[2.5px]" />
                  <span>項目設定</span>
                </button>
              </div>
 
              {/* Grid content based on chosen category */}
              {scoreCategory === 'pos' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-2">
                  {positiveActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => onApplyScore({ name: action.name, points: action.points })}
                      className="group relative flex items-center justify-between text-left p-3.5 bg-white border border-black/15 hover:border-emerald-500 hover:bg-emerald-50/15 rounded-2xl transition duration-150 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3.5 pr-2 min-w-0 font-sans">
                        {/* Cutest round sticker container */}
                        <span className="text-2xl group-hover:scale-115 duration-150 flex-shrink-0 select-none bg-emerald-50 text-emerald-600 w-11 h-11 rounded-xl flex items-center justify-center border border-dashed border-emerald-200">
                          {action.icon}
                        </span>
                        <div className="truncate">
                          <div className="font-extrabold text-slate-800 text-xs sm:text-sm truncate leading-snug">
                            {action.name}
                          </div>
                          {action.englishName && (
                            <div className="text-[9px] text-slate-400 truncate leading-tight font-black uppercase mt-0.5 tracking-wider font-sans">
                              {action.englishName}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0 bg-emerald-500 text-white font-black text-xs rounded-xl px-2.5 py-1">
                        +{action.points}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-2">
                  {negativeActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => onApplyScore({ name: action.name, points: action.points })}
                      className="group relative flex items-center justify-between text-left p-3.5 bg-white border border-black/15 hover:border-rose-500 hover:bg-rose-50/15 rounded-2xl transition duration-150 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3.5 pr-2 min-w-0 font-sans">
                        {/* Cutest round sticker container */}
                        <span className="text-2xl group-hover:scale-115 duration-150 flex-shrink-0 select-none bg-rose-50 text-rose-600 w-11 h-11 rounded-xl flex items-center justify-center border border-dashed border-rose-200">
                          {action.icon}
                        </span>
                        <div className="truncate">
                          <div className="font-extrabold text-slate-800 text-xs sm:text-sm truncate leading-snug">
                            {action.name}
                          </div>
                          {action.englishName && (
                            <div className="text-[9px] text-slate-400 truncate leading-tight font-black uppercase mt-0.5 tracking-wider font-sans">
                              {action.englishName}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0 bg-rose-500 text-white font-black text-xs rounded-xl px-2.5 py-1">
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
            <div className="bg-[#fdfaf3] border border-black/15 rounded-[28px] p-5 max-w-xl mx-auto flex flex-col">
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
                      className="bg-white border border-black/15 rounded-2xl p-3 flex items-center justify-between hover:scale-[1.01] transition-transform duration-100"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 font-sans">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div className="font-sans">
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
                          className={`font-black px-2.5 py-1 rounded-xl text-xs border border-black/15 ${
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
                          className="p-1.5 bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-650 rounded-xl border border-black/15 active:scale-95 duration-100 transition-all cursor-pointer"
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
                className="w-full bg-[#f08573] hover:bg-[#e47664] text-white border border-black/15 text-sm font-black py-3 rounded-2xl hover:scale-101 duration-100 flex items-center justify-center space-x-1 cursor-pointer"
              >
                <span>回去加分吧！</span>
              </button>
            </div>
          )}
 
        </div>
 
        {/* Crayon credit message line */}
        <div className="bg-[#fff0eb] px-6 py-3 border-t border-black/15 text-center text-[10.5px] text-[#ca4d39] font-extrabold tracking-widest font-mono uppercase">
          ✦ MISS IONG'S CLASS ✦
        </div>
      </div>

      {/* Settings Modal Overlay */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
          <div className="bg-[#fffdfa] border border-black/15 rounded-[32px] w-full max-w-2xl overflow-hidden shadow-xl animate-cute-pop flex flex-col h-[520px]">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-505 text-white p-5 flex justify-between items-center border-b border-black/15">
              <div className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-white stroke-[2.5px]" />
                <h3 className="text-lg font-black text-white font-heading">
                  調整獎懲項目與分數
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="text-white hover:bg-white/20 p-1.5 rounded-full duration-100 cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[3px]" />
              </button>
            </div>

            {/* Editor Content */}
            <div className="flex-grow p-5 overflow-y-auto space-y-4">
              {/* Tab Selector inside Settings */}
              <div className="flex bg-[#fffbf2] p-1.5 rounded-2xl border border-black/15 max-w-xs mx-auto mb-2">
                <button
                  type="button"
                  onClick={() => setSettingsTab('pos')}
                  className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    settingsTab === 'pos'
                      ? 'bg-emerald-500 text-white shadow-sm scale-102'
                      : 'text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  🌱 做得好 (+加分)
                </button>
                <button
                  type="button"
                  onClick={() => setSettingsTab('neg')}
                  className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    settingsTab === 'neg'
                      ? 'bg-rose-500 text-white shadow-sm scale-102'
                      : 'text-rose-700 hover:bg-rose-50'
                  }`}
                >
                  🩹 要注意 (-扣分)
                </button>
              </div>

              {/* Editable rows list */}
              <div className="space-y-2 pb-2">
                {(settingsTab === 'pos' ? tempPositiveActions : tempNegativeActions).map((action, idx) => (
                  <div key={action.id} className="flex items-center gap-3 p-3 bg-white border border-black/15 rounded-2xl shadow-xs">
                    <span className="text-xl w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center select-none flex-shrink-0">
                      {action.icon}
                    </span>
                    
                    <div className="flex-grow min-w-0">
                      <div className="text-[9.5px] font-black text-slate-400 select-none uppercase tracking-wider mb-0.5 sm:mb-1">項目名稱</div>
                      <input
                        type="text"
                        value={action.name}
                        onChange={(e) => {
                          const newName = e.target.value;
                          if (settingsTab === 'pos') {
                            setTempPositiveActions(prev => prev.map((item, i) => i === idx ? { ...item, name: newName } : item));
                          } else {
                            setTempNegativeActions(prev => prev.map((item, i) => i === idx ? { ...item, name: newName } : item));
                          }
                        }}
                        className="w-full bg-[#fdf9f0]/40 border border-slate-200 focus:border-slate-400 focus:ring-0 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-800"
                        placeholder="項目名稱"
                      />
                    </div>

                    <div className="w-24">
                      <div className="text-[9.5px] font-black text-slate-400 select-none uppercase tracking-wider mb-0.5 sm:mb-1 text-center">分數值</div>
                      <input
                        type="number"
                        value={action.points}
                        onChange={(e) => {
                          const newPoints = parseInt(e.target.value, 10) || 0;
                          if (settingsTab === 'pos') {
                            setTempPositiveActions(prev => prev.map((item, i) => i === idx ? { ...item, points: newPoints } : item));
                          } else {
                            setTempNegativeActions(prev => prev.map((item, i) => i === idx ? { ...item, points: newPoints } : item));
                          }
                        }}
                        className="w-full bg-[#fdf9f0]/40 border border-slate-200 focus:border-slate-400 focus:ring-0 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-center text-slate-800"
                        placeholder="分數"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer with Reset Defaults and Save updates buttons */}
            <div className="bg-[#fdf9f3] border-t border-black/15 px-5 py-3.5 flex justify-between items-center select-none flex-shrink-0">
              <button
                type="button"
                onClick={handleResetToDefaults}
                className="text-xs font-extrabold text-slate-500 hover:text-red-500 cursor-pointer transition-colors"
              >
                🔄 重置項目為預設值
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-4 py-2 border border-slate-350 bg-white rounded-xl text-xs font-extrabold hover:bg-slate-50 cursor-pointer text-slate-700"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="px-5 py-2 bg-[#eb725a] hover:bg-[#d05c45] border border-black/10 text-white rounded-xl text-xs font-black cursor-pointer shadow-sm active:scale-95 duration-100"
                >
                  儲存變更
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
