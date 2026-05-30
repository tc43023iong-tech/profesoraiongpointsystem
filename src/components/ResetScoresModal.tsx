import React from 'react';
import { X, TriangleAlert } from 'lucide-react';

interface ResetScoresModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

export default function ResetScoresModal({ onConfirm, onClose }: ResetScoresModalProps) {
  return (
    <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Pink styled card */}
      <div 
        className="bg-[#fedfd4] border-6 border-slate-900 rounded-[32px] shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] w-full max-w-sm overflow-hidden animate-cute-pop"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#eb725a] border-b-6 border-slate-900 px-6 py-4 flex justify-between items-center text-white">
          <div className="flex items-center space-x-2">
            <TriangleAlert className="w-5 h-5 stroke-[2.5px]" />
            <h2 className="text-xl font-black font-heading tracking-wide">
              確認重設
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-rose-700/20 rounded-full border border-slate-800 bg-white text-slate-800"
          >
            <X className="w-5 h-5 stroke-[2.5px]" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 text-center space-y-4">
          <p className="text-slate-800 text-lg font-extrabold max-w-full">
            確定要重設當前班級所有學生的分數嗎？
          </p>
          <p className="text-rose-600 text-sm font-black bg-rose-50 border-2 border-dashed border-rose-300 rounded-xl py-2 px-3 leading-relaxed">
            (總分、加分、減分及紀錄將全部歸0)
          </p>

          {/* Buttons actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              type="button"
              className="flex-1 bg-white hover:bg-slate-100 text-slate-700 font-extrabold py-3 border-2 border-slate-800 rounded-2xl shadow-[4px_4px_0px_0px_rgba(30,41,59,1)] active:translate-y-0.5 duration-100"
            >
              取消
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              type="button"
              className="flex-grow bg-[#eb725a] hover:bg-rose-600 text-white font-black py-3 border-2 border-slate-800 rounded-2xl shadow-[4px_4px_0px_0px_rgba(30,41,59,1)] active:translate-y-0.5 duration-100"
            >
              確定重設
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
