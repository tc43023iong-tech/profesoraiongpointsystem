import React, { useState } from 'react';
import { Student } from '../types';
import { X, Sparkles, Wand2, RefreshCw, AlertCircle } from 'lucide-react';

interface BatchScoreModalProps {
  students: Student[];
  onApply: (updates: { studentId: number; points: number }[], itemName: string) => void;
  onClose: () => void;
}

export default function BatchScoreModal({ students, onApply, onClose }: BatchScoreModalProps) {
  const [itemName, setItemName] = useState<string>('課堂綜合表現');
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [pendingUpdates, setPendingUpdates] = useState<{ studentId: number; points: number }[]>([]);
  const [scores, setScores] = useState<Record<number, number>>(() => {
    // Initialise all student points to 0
    const initial: Record<number, number> = {};
    students.forEach((s) => {
      initial[s.id] = 0;
    });
    return initial;
  });

  // Predefined quick reason options
  const quickReasons = [
    '🎒 課堂表現優異',
    '🌟 專注聽講',
    '🤝 小組積極合作',
    '🧹 熱心服務打掃',
    '📝 準時完成作業',
    '⚠️ 課堂分心說話',
    '🚫 未能配合指令',
  ];

  // Quick preset adjust functions
  const handleSetAll = (val: number) => {
    const updated: Record<number, number> = {};
    students.forEach((s) => {
      updated[s.id] = val;
    });
    setScores(updated);
  };

  const handleIncrement = (id: number) => {
    setScores((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id: number) => {
    setScores((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) - 1,
    }));
  };

  const handleInputChange = (id: number, valStr: string) => {
    const val = parseInt(valStr, 10);
    setScores((prev) => ({
      ...prev,
      [id]: isNaN(val) ? 0 : val,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out students with 0 points adjustment
    const updates = students
      .map((s) => ({
        studentId: s.id,
        points: scores[s.id] || 0,
      }))
      .filter((u) => u.points !== 0);

    if (updates.length === 0) {
      alert('請至少為一位學生輸入不為 0 的調整分數！');
      return;
    }

    if (!itemName.trim()) {
      alert('請填寫或選擇評分項目名稱（例如：課堂行為、回答問題等）');
      return;
    }

    setPendingUpdates(updates);
    setShowConfirm(true);
  };

  const handleConfirmSubmit = () => {
    onApply(pendingUpdates, itemName.trim());
    onClose();
  };

  // Compute summary stats of pending changes safely using typed students map
  const studentScoresList = students.map((s) => scores[s.id] || 0);
  const activeChangesCount = studentScoresList.filter((v) => v !== 0).length;
  const totalPositiveChanges = studentScoresList.filter((v) => v > 0).reduce((sum, v) => sum + v, 0);
  const totalNegativeChanges = studentScoresList.filter((v) => v < 0).reduce((sum, v) => sum + v, 0);

  return (
    <div className="fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      {/* Container Main Card */}
      <div 
        className="w-full max-w-3xl bg-[#fdfaf4] border-6 border-slate-900 rounded-[36px] shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] flex flex-col max-h-[90vh] overflow-hidden animate-cute-pop"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Block */}
        <div className="bg-[#a855f7] border-b-6 border-slate-900 px-5 py-4 sm:px-6 flex justify-between items-center text-white relative">
          <div className="flex items-center space-x-2.5">
            <span className="text-3xl animate-bounce">⚡</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-wider text-white">
                全班批量評分 (Batch Class Evaluation)
              </h2>
              <p className="text-[10px] text-purple-200 font-extrabold tracking-widest uppercase font-mono mt-0.5">
                SPEEDY EVALUATION SYSTEM FOR TEACHERS
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 bg-purple-100 hover:bg-purple-200 text-purple-800 border-2 border-slate-900 rounded-full shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] active:scale-95 duration-100 transition-all cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5px]" />
          </button>
        </div>

        {/* TOP CONFIGURATION BOX */}
        <div className="bg-[#FAF5FF] p-4 border-b-4 border-slate-900 space-y-4">
          {/* Reason Choice Section */}
          <div>
            <label className="block text-xs font-black text-purple-950 uppercase tracking-wider mb-2">
              📝 評分說明／項目原因：
            </label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="請輸入評分事由，例如：積極回答問題、幫忙擦黑板、分心..."
              className="w-full px-4 py-2.5 bg-white border-3 border-slate-900 rounded-xl font-heading text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 font-black shadow-[3px_3px_0px_0px_#a855f7]"
            />
            {/* Quick preset tags */}
            <div className="flex flex-wrap gap-2 mt-2.5">
              {quickReasons.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setItemName(r.substring(2))} // strips off the emoji
                  className={`text-xs font-extrabold px-3 py-1.5 rounded-xl border-2 border-slate-900 shadow-[1.5px_1.5px_0px_0px_rgba(30,41,59,1)] transition hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
                    itemName === r.substring(2)
                      ? 'bg-purple-500 text-white'
                      : 'bg-white text-slate-700 hover:bg-purple-50'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Quick presets row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-dashed border-purple-200">
            <span className="text-xs font-black text-slate-600 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-purple-600 animate-spin" />
              全班一鍵同步：
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleSetAll(1)}
                className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white border-2 border-slate-900 font-black text-xs rounded-xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-y-0.5 transition-all cursor-pointer"
              >
                全班 +1 分 🥳
              </button>
              <button
                type="button"
                onClick={() => handleSetAll(2)}
                className="px-3.5 py-1.5 bg-teal-500 hover:bg-teal-600 text-white border-2 border-slate-900 font-black text-xs rounded-xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-y-0.5 transition-all cursor-pointer"
              >
                全班 +2 分 🌟
              </button>
              <button
                type="button"
                onClick={() => handleSetAll(-1)}
                className="px-3.5 py-1.5 bg-rose-500 hover:bg-rose-600 text-white border-2 border-slate-900 font-black text-xs rounded-xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-y-0.5 transition-all cursor-pointer"
              >
                全班 -1 分 ⚠️
              </button>
              <button
                type="button"
                onClick={() => handleSetAll(0)}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-250 text-slate-700 border-2 border-slate-900 font-black text-xs rounded-xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-y-0.5 transition-all cursor-pointer flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                全部歸零 (Clear All)
              </button>
            </div>
          </div>
        </div>

        {/* SCROLLABLE GRID OF STUDENTS */}
        <div className="flex-grow p-3 sm:p-5 overflow-y-auto bg-white">
          <div className="text-xs font-black text-slate-400 tracking-wider mb-2.5 uppercase flex items-center gap-1.5 select-none">
            👤 全班學生評估明細 ({students.length} 位學生)：
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {students.map((student) => {
              const currentVal = scores[student.id] || 0;
              const netTotal = student.goodScore + student.careScore;
              
              return (
                <div 
                  key={student.id}
                  className={`flex items-center justify-between p-3 border-2 rounded-2xl transition duration-150 ${
                    currentVal > 0 
                      ? 'bg-emerald-50/50 border-emerald-500 shadow-sm' 
                      : currentVal < 0 
                        ? 'bg-rose-50/50 border-rose-400 shadow-sm' 
                        : 'bg-[#fcfdfa] border-slate-300 hover:border-slate-400'
                  }`}
                >
                  {/* Left Column: ID + Avatar + Name + Current total score */}
                  <div className="flex items-center space-x-3 min-w-0">
                    <span className="text-xs font-black text-[#eb725a] font-playful flex-shrink-0 w-6">
                      #{student.id}
                    </span>
                    <div className="w-10 h-10 rounded-full border border-slate-400 overflow-hidden bg-amber-50/40 p-0.5 flex-shrink-0">
                      <img 
                        src={student.avatarUrl} 
                        alt={student.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-extrabold text-slate-800 text-sm truncate">
                        {student.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold">
                        目前總分: <span className="font-black text-slate-650">{netTotal} 分</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Interactive point adjusts buttons and textbox */}
                  <div className="flex items-center space-x-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                    {/* Decrement (-1) */}
                    <button
                      type="button"
                      onClick={() => handleDecrement(student.id)}
                      className="w-8 h-8 flex items-center justify-center bg-rose-100 hover:bg-rose-200 text-rose-700 border-2 border-slate-900 rounded-lg active:scale-90 font-black cursor-pointer select-none"
                    >
                      -
                    </button>

                    {/* Score display box / direct typing */}
                    <input
                      type="text"
                      inputMode="numeric"
                      value={currentVal === 0 ? '0' : currentVal > 0 ? `+${currentVal}` : currentVal}
                      onChange={(e) => handleInputChange(student.id, e.target.value)}
                      className={`w-12 h-8 text-center border-2 border-slate-900 rounded-lg font-black text-xs focus:outline-none ${
                        currentVal > 0 
                          ? 'bg-emerald-500 text-white' 
                          : currentVal < 0 
                            ? 'bg-rose-500 text-white' 
                            : 'bg-white text-slate-700'
                      }`}
                    />

                    {/* Increment (+1) */}
                    <button
                      type="button"
                      onClick={() => handleIncrement(student.id)}
                      className="w-8 h-8 flex items-center justify-center bg-emerald-100 hover:bg-emerald-200 text-emerald-700 border-2 border-slate-900 rounded-lg active:scale-90 font-black cursor-pointer select-none"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ADVISORY OR STATUS INFORMATION */}
        {activeChangesCount > 0 && (
          <div className="px-5 py-2.5 bg-purple-50 border-t-2 border-dashed border-purple-200 flex flex-wrap items-center justify-between text-xs font-bold text-purple-900">
            <span className="flex items-center gap-1">
              <AlertCircle className="w-4 h-4 text-purple-600" />
              準備異動位學生：<span className="font-extrabold text-purple-700">{activeChangesCount} 人</span>
            </span>
            <div className="flex gap-4">
              <span>總加分: <span className="font-black text-emerald-600">+{totalPositiveChanges}</span></span>
              <span>總減分: <span className="font-black text-rose-600">-{Math.abs(totalNegativeChanges)}</span></span>
            </div>
          </div>
        )}

        {/* Modal Footer actions */}
        <div className="p-4 sm:p-5 bg-white border-t-4 border-slate-900 flex justify-end gap-3 flex-shrink-0">
          <button
            onClick={onClose}
            type="button"
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border-2 border-slate-900 rounded-2xl font-black text-xs sm:text-sm shadow-[3px_3px_0px_0px_rgba(30,41,59,1)] active:translate-y-0.5 duration-100 cursor-pointer"
          >
            取消 (Cancel)
          </button>
          <button
            onClick={handleSubmit}
            type="submit"
            className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white border-2 border-slate-900 rounded-2xl font-black text-xs sm:text-sm shadow-[3px_3px_0px_0px_rgba(30,41,59,1)] active:translate-y-0.5 duration-100 cursor-pointer flex items-center gap-1"
          >
            <Wand2 className="w-4 h-4 stroke-[2.5px]" />
            套用全班評分 (Apply Adjustments)
          </button>
        </div>

        {/* CONFIRMATION SUB-MODAL OVERLAY */}
        {showConfirm && (
          <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-md flex items-center justify-center p-4 z-[130] animate-fade-in">
            <div className="w-full max-w-md bg-[#fffdf9] border-6 border-slate-900 rounded-[28px] shadow-[6px_6px_0px_0px_rgba(30,41,59,1)] p-6 text-center animate-cute-pop">
              <div className="text-5xl mb-3 animate-bounce">🤔</div>
              <h3 className="text-2xl font-black text-slate-800 font-heading mb-1">
                確認送出評分？
              </h3>
              <p className="text-[10px] font-black tracking-widest text-[#a855f7] uppercase font-mono mb-4">
                CLASSROOM EVALUATION CONFIRMATION
              </p>

              {/* Score item & count details box */}
              <div className="bg-purple-50/70 border-2 border-purple-200 rounded-2xl p-4 text-left space-y-2 mb-4">
                <div className="flex items-start">
                  <span className="text-xs text-slate-400 font-extrabold mr-1 shrink-0 mt-0.5">項目：</span>
                  <span className="text-sm font-black text-purple-950 break-words">{itemName}</span>
                </div>
                <div className="flex justify-between text-xs font-black">
                  <span className="text-slate-650">受影響學生：</span>
                  <span className="text-purple-700">{pendingUpdates.length} 人</span>
                </div>
                <div className="flex gap-4 text-xs font-black pt-1 border-t border-dashed border-purple-200">
                  <span className="text-emerald-600 text-[11px]">
                    🏠 加分: {pendingUpdates.filter(u => u.points > 0).length} 人 (+{totalPositiveChanges}分)
                  </span>
                  <span className="text-rose-500 text-[11px]">
                    🎒 減分: {pendingUpdates.filter(u => u.points < 0).length} 人 (-{Math.abs(totalNegativeChanges)}分)
                  </span>
                </div>
              </div>

              {/* Interactive lists preview */}
              <div className="max-h-36 overflow-y-auto border-2 border-slate-900 rounded-xl bg-[#FAF5FF] p-2.5 text-left mb-5 space-y-1 text-xs">
                {pendingUpdates.map((u) => {
                  const s = students.find((std) => std.id === u.studentId);
                  if (!s) return null;
                  const isPos = u.points > 0;
                  return (
                    <div key={u.studentId} className="flex justify-between items-center py-1 border-b border-purple-100 last:border-none px-1">
                      <span className="font-extrabold text-slate-700">
                        #{s.id} {s.name}
                      </span>
                      <span className={`font-black ${isPos ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {isPos ? `+${u.points}` : u.points} 分
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Actions footer */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border-2 border-slate-900 rounded-xl font-black text-xs shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] active:translate-y-0.5 duration-100 cursor-pointer"
                >
                  ❌ 返回修改
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSubmit}
                  className="flex-1 px-4 py-2.5 bg-[#a855f7] hover:bg-purple-700 text-white border-2 border-slate-900 rounded-xl font-black text-xs shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] active:translate-y-0.5 duration-100 cursor-pointer"
                >
                  ✅ 確認送出
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
