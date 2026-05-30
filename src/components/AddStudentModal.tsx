import React, { useState } from 'react';
import { X, UserPlus } from 'lucide-react';

interface AddStudentModalProps {
  onAddStudent: (name: string, rollId: number) => void;
  onClose: () => void;
  nextRollId: number;
}

export default function AddStudentModal({ onAddStudent, onClose, nextRollId }: AddStudentModalProps) {
  const [name, setName] = useState('');
  const [rollId, setRollId] = useState<number>(nextRollId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('請輸入姓名！');
      return;
    }
    if (rollId <= 0) {
      alert('請輸入有效的學號！');
      return;
    }
    onAddStudent(name.trim(), rollId);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Pink styled card */}
      <div 
        className="bg-[#fedfd4] border-6 border-slate-900 rounded-[32px] shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] w-full max-w-sm overflow-hidden animate-cute-pop"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#eb725a] border-b-6 border-slate-900 px-6 py-4 flex justify-between items-center text-white">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">👤+</span>
            <h2 className="text-xl font-black font-heading tracking-wide">
              新增學生
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-red-700/20 rounded-full border border-slate-800 bg-white text-slate-800"
          >
            <X className="w-5 h-5 stroke-[2.5px]" />
          </button>
        </div>

        {/* Inputs */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-slate-700 font-extrabold text-sm mb-1.5 pl-1">
              學生姓名
            </label>
            <input
              type="text"
              placeholder="輸入名字..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border-3 border-dashed border-rose-300 rounded-2xl px-4 py-2.5 text-slate-850 font-extrabold tracking-wide focus:outline-none focus:ring-2 focus:ring-[#eb725a]"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-extrabold text-sm mb-1.5 pl-1">
              學號 (ID)
            </label>
            <input
              type="number"
              min="1"
              value={rollId}
              onChange={(e) => setRollId(parseInt(e.target.value, 10) || 1)}
              className="w-full bg-white border-3 border-dashed border-rose-300 rounded-2xl px-4 py-2.5 text-slate-850 font-extrabold tracking-mono focus:outline-none focus:ring-2 focus:ring-[#eb725a] [appearance:textfield]"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-3">
            <button
              onClick={onClose}
              type="button"
              className="flex-1 bg-white hover:bg-slate-100 text-slate-700 font-extrabold py-3 border-2 border-slate-800 rounded-2xl shadow-[4px_4px_0px_0px_rgba(30,41,59,1)] active:translate-y-0.5 duration-100"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-grow bg-[#eb725a] hover:bg-rose-600 text-white font-black py-3 border-2 border-slate-800 rounded-2xl shadow-[4px_4px_0px_0px_rgba(30,41,59,1)] active:translate-y-0.5 duration-100"
            >
              確認添加
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
