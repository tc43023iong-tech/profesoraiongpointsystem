import React from 'react';
import { Student } from '../types';
import { X, Award, CheckSquare } from 'lucide-react';

interface DrawnStudentsModalProps {
  students: Student[];
  onClose: () => void;
  onEnterMultiSelect: (ids: number[]) => void;
  onAwardAll: () => void;
}

export default function DrawnStudentsModal({
  students,
  onClose,
  onEnterMultiSelect,
  onAwardAll,
}: DrawnStudentsModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Playful Orange Card Container */}
      <div 
        className="relative bg-orange-50 border-6 border-slate-900 rounded-[36px] shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] w-full max-w-2xl overflow-hidden animate-cute-pop"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Area */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-450 to-orange-600 border-b-6 border-slate-900 px-6 py-4 flex justify-between items-center text-slate-900">
          <div className="flex items-center space-x-2">
            <span className="text-3xl">🎉</span>
            <div>
              <h2 className="text-2xl font-black tracking-wider text-white font-heading">
                幸運被抽中的學生！
              </h2>
              <p className="text-[10px] uppercase font-extrabold tracking-widest text-orange-100 font-mono">
                Randomly Selected Group • Lucky Partners
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 border-2 border-slate-800 rounded-full shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] active:scale-95 duration-100 transition-all cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[3px]" />
          </button>
        </div>

        {/* The List of Winners */}
        <div className="p-6 max-h-[380px] overflow-y-auto bg-stone-50 border-b-4 border-slate-900">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {students.map((student) => {
              const score = student.goodScore + student.careScore;
              return (
                <div
                  key={student.id}
                  className="bg-white border-3 border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-[3px_3px_0px_0px_rgba(30,41,59,1)] transform hover:rotate-2 transition-transform duration-100"
                >
                  <div className="w-20 h-20 bg-[#fffbeb] border-2 border-slate-800 rounded-full flex items-center justify-center p-2 mb-2 shadow-sm">
                    <img
                      src={student.avatarUrl}
                      alt={student.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <span className="bg-yellow-300 text-slate-850 text-[10px] font-black px-1.5 py-0.5 rounded border border-slate-800">
                    #{student.id}
                  </span>
                  <h4 className="text-base font-black text-slate-850 mt-1.5 truncate max-w-full">
                    {student.name}
                  </h4>
                  <span className="text-[11px] font-bold text-slate-400 mt-0.5">
                    目前總分: {score}分
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-orange-100 p-5 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <span className="text-xs text-orange-905 font-extrabold text-center sm:text-left">
            ✨ 有 {students.length} 位同學幸運登台囉！你可以為他們全體加分。
          </span>

          <div className="flex gap-2 w-full sm:w-auto">
            {/* Quick group score */}
            <button
              onClick={() => {
                onAwardAll();
                onClose();
              }}
              className="flex-1 sm:flex-none bg-orange-500 hover:bg-orange-600 text-white font-black px-4 py-2.5 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(30,41,59,1)] text-xs flex items-center justify-center space-x-1 active:scale-95 duration-100 cursor-pointer"
            >
              <Award className="w-4 h-4 stroke-[2.5px]" />
              <span>一鍵全體評分</span>
            </button>

            {/* Quick multi select */}
            <button
              onClick={() => {
                onEnterMultiSelect(students.map((s) => s.id));
                onClose();
              }}
              className="flex-1 sm:flex-none bg-white hover:bg-slate-50 text-slate-700 font-black px-4 py-2.5 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(30,41,59,1)] text-xs flex items-center justify-center space-x-1 active:scale-95 duration-100 cursor-pointer"
            >
              <CheckSquare className="w-4 h-4 stroke-[2.5px]" />
              <span>選中他們並評分</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
