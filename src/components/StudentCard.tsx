import React from 'react';
import { Student } from '../types';
import { Palette, Check } from 'lucide-react';

interface StudentCardProps {
  key?: React.Key;
  student: Student;
  rank: number;
  isNegRank?: boolean;
  isMultiSelectMode: boolean;
  isSelected: boolean;
  onSelectToggle: (id: number) => void;
  onCardClick: (student: Student, initialCategory?: 'pos' | 'neg') => void;
  onChangeAvatarClick: (student: Student, e: React.MouseEvent) => void;
}

export default function StudentCard({
  student,
  rank,
  isNegRank = false,
  isMultiSelectMode,
  isSelected,
  onSelectToggle,
  onCardClick,
  onChangeAvatarClick,
}: StudentCardProps): React.JSX.Element {
  const currentTotal = student.goodScore + student.careScore; // careScore is negative
 
  // Decide colored pencil backing based on student.id
  const sketchBgClass = 
    student.id % 4 === 0 ? 'sketch-bg-yellow border-amber-400/50' :
    student.id % 4 === 1 ? 'sketch-bg-pink border-pink-400/50' :
    student.id % 4 === 2 ? 'sketch-bg-blue border-blue-400/50' :
    'sketch-bg-green border-emerald-400/50';

  const highlightClass = 
    student.id % 3 === 0 ? 'highlight-yellow' :
    student.id % 3 === 1 ? 'highlight-pink' :
    'highlight-green';

  // Alternate visual angle of cards slightly for hand-painted playful feel
  const tiltClass = student.id % 2 === 0 ? 'hover:scale-105 active:scale-95' : 'hover:scale-105 active:scale-95';
  
  // Decide rank badge style
  const renderRankBadge = () => {
    if (isNegRank) {
      if (rank === 1) return <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-700 shadow-sm">NEG RANK 1 👑</span>;
      if (rank === 2) return <span className="bg-slate-800 text-slate-100 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-700 shadow-sm">NEG RANK 2 ⚡</span>;
      if (rank === 3) return <span className="bg-slate-800 text-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-700 shadow-sm">NEG RANK 3 ⚡</span>;
      return <span className="bg-slate-700 text-slate-300 text-[10px] px-1.5 py-0.5 rounded-full">NEG #{rank}</span>;
    } else {
      if (rank === 1) return <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full border-2 border-white shadow-sm">Rank 1 👑</span>;
      if (rank === 2) return <span className="bg-amber-400 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-white shadow-sm">Rank 2 🥈</span>;
      if (rank === 3) return <span className="bg-orange-300 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-white shadow-sm">Rank 3 🥉</span>;
      return <span className="bg-orange-100 text-orange-800 text-[10px] px-1.5 py-0.2 rounded-full font-medium">Rank {rank}</span>;
    }
  };

  return (
    <div
      onClick={() => {
        if (isMultiSelectMode) {
          onSelectToggle(student.id);
        } else {
          onCardClick(student, 'pos');
        }
      }}
      className={`relative bg-white border-4 border-slate-800 rounded-[28px_16px_28px_20px] p-4 shadow-[6px_6px_0px_0px_#3f3935] transition-all duration-200 cursor-pointer ${
        isSelected 
          ? 'ring-4 ring-pink-400 bg-pink-50/40 border-pink-500 scale-[1.02] shadow-[6px_6px_0px_0px_#ec4899]' 
          : 'bg-[#fffdfa] hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#3f3935]'
      } ${tiltClass} overflow-hidden`}
    >
      {/* Top Header Row within Card */}
      <div className="flex justify-between items-center mb-1">
        {/* Student Roll/Number and Rank Badge */}
        <div className="flex items-center space-x-1">
          <span className="text-xl font-black font-playful text-[#eb725a] drop-shadow-sm">#{student.id}</span>
          {renderRankBadge()}
        </div>
 
        {/* Change look & Total Score summary badge */}
        <div className="flex items-center space-x-1 z-10" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={(e) => onChangeAvatarClick(student, e)}
            className="p-1.5 bg-yellow-105 hover:bg-yellow-200 border-2 border-slate-800 rounded-full transition-all text-slate-700 hover:scale-110 active:scale-95 cursor-pointer"
            title="幫學生更換樣子"
          >
            <Palette className="w-4 h-4 text-amber-600 stroke-[2px]" />
          </button>
          
          <div className="bg-amber-300 text-slate-800 border-2 border-slate-800 rounded-xl px-2.5 py-0.5 text-xs font-black shadow-[2px_2px_0px_0px_#3f3935] font-playful">
            🖍️ {currentTotal}
          </div>
        </div>
      </div>

      {/* Multi-Select Indicator */}
      {isMultiSelectMode && (
        <div className="absolute top-2 left-2 z-10">
          <div className={`w-6 h-6 rounded-full border-2 border-slate-800 flex items-center justify-center ${isSelected ? 'bg-green-500 text-white' : 'bg-white'}`}>
            {isSelected && <Check className="w-4 h-4 stroke-[3px]" />}
          </div>
        </div>
      )}

      {/* Large Bold Student Name with soft pencil highlighter */}
      <div className="text-center mb-3 mt-1.5 select-none">
        <span className={`${highlightClass} text-xl sm:text-2xl font-black text-slate-800 font-heading tracking-wider px-4 py-0.5 inline-block`}>
          {student.name}
        </span>
      </div>

      {/* Center Image Container in custom polaroid block with sketchy backdrop padding */}
      <div className={`relative flex justify-center ${sketchBgClass} border-3 border-dashed rounded-2xl py-2 px-4 shadow-inner min-h-[140px] items-center`}>
        <img
          src={student.avatarUrl}
          alt={student.name}
          referrerPolicy="no-referrer"
          className="w-28 h-28 object-contain drop-shadow transition-transform duration-200 hover:scale-115"
          onError={(e) => {
            // fallback inside client
            (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/bottts/svg?seed=${student.name}`;
          }}
        />
        {student.pokemonId && (
          <span className="absolute bottom-1 right-2 text-[9px] text-[#3f3935]/80 bg-[#fffdfa]/90 border border-slate-300 rounded px-1 font-mono font-bold shadow-xs">
            NO.{student.pokemonId}
          </span>
        )}
      </div>

      {/* Footer Pill Points: GOOD and CARE */}
      <div className="mt-4 flex gap-2 justify-around" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={(e) => {
            if (isMultiSelectMode) {
              onSelectToggle(student.id);
            } else {
              e.stopPropagation();
              onCardClick(student, 'pos');
            }
          }}
          className="flex-1 text-center bg-[#f0fdf4] hover:bg-emerald-100/90 rounded-xl py-1.5 border-2 border-dashed border-emerald-500 shadow-xs leading-tight hover:scale-105 active:scale-95 transition-all cursor-pointer block"
        >
          <div className="text-[10px] uppercase tracking-wider text-emerald-800 font-extrabold select-none">👍 加分 GOOD</div>
          <div className="text-emerald-600 font-black text-sm font-playful mt-0.5">
            +{student.goodScore}
          </div>
        </button>

        <button
          onClick={(e) => {
            if (isMultiSelectMode) {
              onSelectToggle(student.id);
            } else {
              e.stopPropagation();
              onCardClick(student, 'neg');
            }
          }}
          className="flex-1 text-center bg-[#fff5f5] hover:bg-rose-100/90 rounded-xl py-1.5 border-2 border-dashed border-rose-400 shadow-xs leading-tight hover:scale-105 active:scale-95 transition-all cursor-pointer block"
        >
          <div className="text-[10px] uppercase tracking-wider text-rose-800 font-extrabold select-none">🚀 待改進 CARE</div>
          <div className="text-rose-600 font-black text-sm font-playful mt-0.5">
            {student.careScore}
          </div>
        </button>
      </div>
    </div>
  );
}
