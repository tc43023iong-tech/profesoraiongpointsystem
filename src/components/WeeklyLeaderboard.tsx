import React from 'react';
import { Student } from '../types';
import { X, Award, Flame, ThumbsUp, TrendingUp } from 'lucide-react';

interface WeeklyLeaderboardProps {
  students: Student[];
  onClose: () => void;
}

export default function WeeklyLeaderboard({ students, onClose }: WeeklyLeaderboardProps) {
  // Sort students by net score (goodScore + careScore) high to low
  const sortedStudents = [...students].sort((a, b) => {
    const netA = a.goodScore + a.careScore;
    const netB = b.goodScore + b.careScore;
    return netB - netA;
  });

  const champion = sortedStudents[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Yellow/Gold Framed Leaderboard Panel */}
      <div 
        className="relative bg-amber-50 border-8 border-yellow-500 rounded-[36px] shadow-[8px_8px_0px_0px_rgba(217,119,6,1)] w-full max-w-2xl overflow-hidden animate-cute-pop"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon Banner */}
        <div className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 border-b-4 border-yellow-600 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-3xl">💯</span>
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-wider font-heading">
                每週龍虎榜
              </h2>
              <p className="text-xs uppercase tracking-widest text-slate-700 font-bold font-mono">
                Weekly Leaderboard
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-amber-600/20 active:scale-95 duration-100 rounded-full border-2 border-slate-800 bg-white shadow-sm text-slate-800"
          >
            <X className="w-5 h-5 stroke-[3px]" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          
          {/* Champion Big Highlight Card */}
          {champion && (
            <div className="relative bg-gradient-to-br from-amber-100 via-yellow-100 to-amber-200 border-4 border-amber-400 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-[4px_4px_0px_0px_rgba(217,119,6,0.3)]">
              {/* Crown Emblem floating */}
              <div className="absolute -top-6 -left-3 rotate-[-15deg] bg-amber-400 text-white p-2 rounded-full border-4 border-slate-800 shadow-md transform hover:scale-110 transition duration-150">
                <span className="text-3xl">👑</span>
              </div>

              {/* Huge Avatar Frame in Golden Glow */}
              <div className="relative flex-shrink-0 bg-white rounded-full border-4 border-amber-400 p-2 shadow-lg w-28 h-28 flex items-center justify-center">
                <img
                  src={champion.avatarUrl}
                  alt={champion.name}
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 object-contain"
                />
              </div>

              {/* Champion Information in Right column */}
              <div className="text-center sm:text-left flex-grow">
                <div className="inline-flex items-center space-x-1 bg-amber-400/30 text-amber-900 border border-amber-400 text-xs font-black px-3 py-1 rounded-full mb-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>本週第一名 CHAMPION</span>
                </div>
                <h3 className="text-4xl font-extrabold text-slate-800 font-heading mb-1 select-none">
                  {champion.name}
                </h3>
                <p className="text-slate-600 text-sm font-semibold mb-2">
                  學號 #{champion.id} • 成功擊敗所有強大的小夥伴！
                </p>
                <div className="text-xl font-black text-rose-500 font-sans tracking-wide">
                  本週淨分: <span className="text-2xl bg-white border border-rose-200 shadow-sm px-3 py-0.5 rounded-xl">{champion.goodScore + champion.careScore >= 0 ? `+${champion.goodScore + champion.careScore}` : champion.goodScore + champion.careScore}</span>
                </div>
              </div>
            </div>
          )}

          {/* Ranking List Table Headers */}
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-500 font-extrabold flex px-4 pb-2 border-b border-yellow-200">
              <div className="w-12 text-center">排名</div>
              <div className="flex-grow pl-3">學生</div>
              <div className="w-48 text-right hidden sm:flex justify-end gap-4">
                <div className="w-14 text-center">加分</div>
                <div className="w-14 text-center">減分</div>
                <div className="w-16 text-center">淨分</div>
              </div>
            </div>

            {/* List items */}
            <div className="divide-y divide-yellow-100 mt-2 space-y-2">
              {sortedStudents.map((student, index) => {
                const rankNum = index + 1;
                const netScore = student.goodScore + student.careScore; // careScore is negative

                return (
                  <div
                    key={student.id}
                    className="flex items-center bg-white border-2 border-amber-200 hover:border-yellow-400 hover:shadow-sm rounded-2xl p-3 px-4 transition-all"
                  >
                    {/* Rank column */}
                    <div className="w-12 flex-shrink-0 flex justify-center">
                      {rankNum === 1 ? (
                        <span className="text-2xl">🥇</span>
                      ) : rankNum === 2 ? (
                        <span className="text-2xl">🥈</span>
                      ) : rankNum === 3 ? (
                        <span className="text-2xl">🥉</span>
                      ) : (
                        <span className="text-sm font-black text-slate-400 font-mono">
                          {rankNum}
                        </span>
                      )}
                    </div>

                    {/* Small Avatar Frame */}
                    <div className="w-10 h-10 rounded-full border border-slate-200 bg-stone-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img
                        src={student.avatarUrl}
                        alt={student.name}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 object-contain"
                      />
                    </div>

                    {/* Student Name */}
                    <div className="flex-grow pl-3">
                      <div className="font-extrabold text-slate-800 text-lg">
                        {student.name}
                      </div>
                      <div className="text-[11px] text-slate-500 font-semibold font-mono">
                        學號 #{student.id}
                      </div>
                    </div>

                    {/* Scores breakdowns row */}
                    <div className="flex items-center gap-3">
                      {/* Mobile minimal status */}
                      <span className="sm:hidden font-black text-amber-600 text-sm">
                        Net: {netScore >= 0 ? `+${netScore}` : netScore}
                      </span>

                      {/* Desktop columns */}
                      <div className="hidden sm:flex items-center gap-4 text-xs font-bold font-sans">
                        {/* Positive score widget */}
                        <div className="w-14 text-center bg-green-50 text-green-700 border border-green-200 py-1 rounded-lg">
                          +{student.goodScore}
                        </div>
                        {/* Care/Deduction score widget */}
                        <div className="w-14 text-center bg-red-50 text-red-600 border border-red-200 py-1 rounded-lg">
                          {student.careScore}
                        </div>
                        {/* Net score column */}
                        <div className="w-18 text-center bg-amber-100 text-amber-800 border border-amber-300 py-1 px-1.5 rounded-lg text-sm font-black">
                          {netScore >= 0 ? `+${netScore}` : netScore}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer info text */}
        <div className="bg-yellow-100 px-6 py-3 border-t-2 border-yellow-200 text-center text-xs text-yellow-800 font-extrabold font-mono uppercase tracking-wider">
          👑 龍虎榜數據基於當前評分紀錄計算 👑
        </div>
      </div>
    </div>
  );
}
