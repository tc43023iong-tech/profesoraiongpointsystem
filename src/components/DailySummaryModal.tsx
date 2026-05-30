import React, { useState, useMemo } from 'react';
import { Student, PointRecord } from '../types';
import { X, Calendar, Clock, Star, AlertTriangle, Sparkles, TrendingUp, ChevronRight } from 'lucide-react';

interface DailySummaryModalProps {
  students: Student[];
  onClose: () => void;
}

// Robust helper to check if a PointRecord timestamp corresponds to "today" (current client local date)
function isTodayRecord(timestampStr: string): boolean {
  if (!timestampStr) return false;
  
  try {
    // Standard timestamp values like "2026/5/24 07:47:32" or "2026-05-24 07:47:32"
    const matches = timestampStr.match(/(\d{4})[/-](\d{1,2})[/-](\d{1,2})/);
    if (matches) {
      const year = parseInt(matches[1], 10);
      const month = parseInt(matches[2], 10);
      const day = parseInt(matches[3], 10);
      
      const today = new Date();
      return (
        year === today.getFullYear() &&
        month === (today.getMonth() + 1) &&
        day === today.getDate()
      );
    }
  } catch (e) {
    // Fail silently, proceed to fallbacks
  }

  // Fallback checks
  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth() + 1;
  const d = today.getDate();
  const formats = [
    `${y}/${m}/${d}`,
    `${y}-${m}-${d}`,
    `${y}/${String(m).padStart(2, '0')}/${String(d).padStart(2, '0')}`,
    `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
  ];

  return formats.some(f => timestampStr.includes(f));
}

export default function DailySummaryModal({ students, onClose }: DailySummaryModalProps) {
  const [activeTab, setActiveTab] = useState<'students' | 'timeline'>('students');

  // Compute Today's Data
  const {
    todayStudents,
    todayRecordsCount,
    totalPosGiven,
    totalNegGiven,
    allTodayTimeline
  } = useMemo(() => {
    let todayRecordsCount = 0;
    let totalPosGiven = 0;
    let totalNegGiven = 0;
    const todayStudentsList: {
      student: Student;
      records: PointRecord[];
      posSum: number;
      negAbsSum: number;
    }[] = [];

    const timeline: {
      student: Student;
      record: PointRecord;
    }[] = [];

    students.forEach((student) => {
      // Filter student history for today's logs
      const todayLogs = student.history.filter((rec) => isTodayRecord(rec.timestamp));
      
      if (todayLogs.length > 0) {
        let pos = 0;
        let neg = 0;
        
        todayLogs.forEach((rec) => {
          todayRecordsCount++;
          if (rec.points >= 0) {
            pos += rec.points;
            totalPosGiven += rec.points;
          } else {
            neg += Math.abs(rec.points);
            totalNegGiven += Math.abs(rec.points);
          }
          
          timeline.push({
            student,
            record: rec
          });
        });

        todayStudentsList.push({
          student,
          records: todayLogs,
          posSum: pos,
          negAbsSum: neg
        });
      }
    });

    // Sort timeline chronologically (latest first) or by time segment
    timeline.sort((a, b) => b.record.timestamp.localeCompare(a.record.timestamp));

    // Sort student summary list by sum of points (posSum - negAbsSum desc)
    todayStudentsList.sort((a, b) => {
      const netA = a.posSum - a.negAbsSum;
      const netB = b.posSum - b.negAbsSum;
      return netB - netA;
    });

    return {
      todayStudents: todayStudentsList,
      todayRecordsCount,
      totalPosGiven,
      totalNegGiven,
      allTodayTimeline: timeline
    };
  }, [students]);

  // Today's formatted date for visual header
  const formattedToday = useMemo(() => {
    const d = new Date();
    const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][d.getDay()];
    return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日 (${weekday})`;
  }, []);

  return (
    <div className="fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      {/* Container Main Card - Styled as a lovely fresh classroom chalkboard playbook */}
      <div 
        className="w-full max-w-2xl bg-[#fdfaf4] border-6 border-slate-900 rounded-[36px] shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] flex flex-col max-h-[88vh] overflow-hidden animate-cute-pop"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#fbbf24] border-b-6 border-slate-900 px-5 py-4 sm:px-6 flex justify-between items-center text-slate-900 relative">
          <div className="flex items-center space-x-2.5">
            <span className="text-3xl animate-bounce">📅</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-wider text-slate-900">
                今日評分總結 (Today's Summary)
              </h2>
              <p className="text-[10px] text-amber-900 font-extrabold tracking-widest uppercase font-mono mt-0.5">
                {formattedToday}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 border-2 border-slate-900 rounded-full shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] active:scale-95 duration-100 transition-all cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5px]" />
          </button>
        </div>

        {/* STATS OVERVIEW HEAD */}
        <div className="px-5 py-3 sm:px-6 bg-[#fffdeb] border-b-3 border-dashed border-slate-350 grid grid-cols-3 gap-2 sm:gap-4 text-center">
          <div className="bg-white border-2 border-slate-900 rounded-2xl p-2 shadow-[2px_2px_0px_0px_rgba(30,41,59,1)]">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider">評分人次 (Events)</div>
            <div className="text-xl sm:text-2xl font-black text-amber-600 font-playful mt-0.5">
              {todayRecordsCount} <span className="text-xs font-bold text-slate-600">次</span>
            </div>
          </div>
          <div className="bg-[#f0faf2] border-2 border-slate-900 rounded-2xl p-2 shadow-[2px_2px_0px_0px_rgba(30,41,59,1)]">
            <div className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">今日加分 (Reward +)</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 font-playful mt-0.5">
              +{totalPosGiven} <span className="text-xs font-bold text-slate-600">分</span>
            </div>
          </div>
          <div className="bg-[#fff5f4] border-2 border-slate-900 rounded-2xl p-2 shadow-[2px_2px_0px_0px_rgba(30,41,59,1)]">
            <div className="text-[10px] font-black text-rose-700 uppercase tracking-wider">注意減分 (Care -)</div>
            <div className="text-xl sm:text-2xl font-black text-rose-600 font-playful mt-0.5">
              -{totalNegGiven} <span className="text-xs font-bold text-slate-600">分</span>
            </div>
          </div>
        </div>

        {/* TAB TOGGLES selectors */}
        <div className="px-5 pt-3 sm:px-6 flex gap-2 border-b border-slate-200 bg-white">
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 text-xs sm:text-sm font-black transition-all border-t-3 border-x-3 border-slate-900 rounded-t-xl -mb-[1px] relative cursor-pointer ${
              activeTab === 'students'
                ? 'bg-[#fdfaf4] text-amber-800 font-extrabold pb-2.5 z-10'
                : 'bg-slate-50 text-slate-500 hover:bg-slate-100 pb-2'
            }`}
          >
            🌱 學生加減統計 ({todayStudents.length} 人)
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 text-xs sm:text-sm font-black transition-all border-t-3 border-x-3 border-slate-900 rounded-t-xl -mb-[1px] relative cursor-pointer ${
              activeTab === 'timeline'
                ? 'bg-[#fdfaf4] text-amber-800 font-extrabold pb-2.5 z-10'
                : 'bg-slate-50 text-slate-500 hover:bg-slate-100 pb-2'
            }`}
          >
            🕒 今日評分時間線 ({todayRecordsCount} 筆)
          </button>
        </div>

        {/* SCROLLABLE INNER REGION */}
        <div className="flex-grow p-4 sm:p-6 overflow-y-auto max-h-[50vh]">
          {todayStudents.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white border-3 border-dashed border-slate-300 rounded-[28px] max-w-sm mx-auto my-4">
              <span className="text-5xl block mb-2">💫</span>
              <h3 className="text-slate-700 font-black text-base">
                今天目前沒有任何評分紀錄
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                快回到班級大堂，點擊學生的頭像，幫這群可愛的孩子加分吧！加油！
              </p>
            </div>
          ) : activeTab === 'students' ? (
            /* Tab 1: Today Students point aggregate lists */
            <div className="space-y-4 animate-fade-in">
              {todayStudents.map(({ student, records, posSum, negAbsSum }) => {
                const netScore = posSum - negAbsSum;
                return (
                  <div 
                    key={student.id} 
                    className="bg-white border-2 border-slate-900 rounded-[24px] p-4 shadow-[3px_3px_0px_0px_rgba(30,41,59,1)] transition hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-dashed border-slate-200">
                      {/* Left student badge details */}
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-900 flex-shrink-0 bg-[#fffbeb] p-1">
                          <img 
                            src={student.avatarUrl} 
                            alt={student.name} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] bg-slate-950 text-white font-black px-1.5 py-0.5 rounded-lg">
                              #{student.id}
                            </span>
                            <span className="font-extrabold text-slate-800 text-sm sm:text-base">
                              {student.name}
                            </span>
                          </div>
                          <p className="text-[9px] text-slate-400 font-black tracking-wider uppercase mt-0.5">
                            Current Class roll ID
                          </p>
                        </div>
                      </div>

                      {/* Right points scores totals badge */}
                      <div className="flex items-center space-x-2">
                        {posSum > 0 && (
                          <span className="text-xs font-black px-2.5 py-1 bg-emerald-500 text-white border-2 border-slate-900 rounded-xl shadow-[1.5px_1.5px_0px_0px_rgba(30,41,59,1)]">
                            +{posSum}
                          </span>
                        )}
                        {negAbsSum > 0 && (
                          <span className="text-xs font-black px-2.5 py-1 bg-rose-500 text-white border-2 border-slate-900 rounded-xl shadow-[1.5px_1.5px_0px_0px_rgba(30,41,59,1)]">
                            -{negAbsSum}
                          </span>
                        )}
                        <span className="text-[11px] font-black text-slate-400 px-2 select-none">
                          今日淨值 (Net):
                        </span>
                        <span className={`text-sm sm:text-base font-black font-playful ${netScore >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {netScore >= 0 ? `+${netScore}` : netScore} 分
                        </span>
                      </div>
                    </div>

                    {/* Today Items received for this student */}
                    <div className="pt-2">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 select-none">
                        今日評分清單 (Today's Logs)
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {records.map((rec) => (
                          <div 
                            key={rec.id}
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border border-slate-900 flex items-center space-x-1 shadow-sm ${
                              rec.points >= 0 
                                ? 'bg-[#f0faf2] text-emerald-800' 
                                : 'bg-[#fff5f4] text-rose-800'
                            }`}
                          >
                            <span>{rec.itemName}</span>
                            <span className="font-extrabold">({rec.points >= 0 ? '+' : ''}{rec.points})</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            /* Tab 2: Today's direct timestamp timeline list */
            <div className="space-y-3 animate-fade-in">
              {allTodayTimeline.map(({ student, record }, index) => {
                const isPos = record.points >= 0;
                // Parse timestamp to capture time nicely "HH:MM"
                let timeStr = record.timestamp;
                try {
                  const matchTime = record.timestamp.match(/\d{1,2}:\d{2}/);
                  if (matchTime) {
                    timeStr = matchTime[0];
                  }
                } catch(e) {}

                return (
                  <div 
                    key={record.id} 
                    className={`flex items-center space-x-3.5 p-3 rounded-2xl border-2 border-slate-900 shadow-sm hover:translate-x-0.5 duration-100 ${
                      isPos ? 'bg-[#f0faf2]' : 'bg-[#fff5f4]'
                    }`}
                  >
                    {/* Time pill */}
                    <div className="flex items-center space-x-1 text-slate-500 font-black text-xs font-mono select-none bg-white px-2 py-0.5 border border-slate-400 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{timeStr}</span>
                    </div>

                    {/* Student profile details inside timeline */}
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <div className="w-7 h-7 rounded-full overflow-hidden border border-slate-600 bg-[#fffbeb] p-0.5">
                        <img 
                          src={student.avatarUrl} 
                          alt={student.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-xs font-black text-slate-900">
                        {student.name}
                      </span>
                    </div>

                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />

                    {/* Score Item specifics label */}
                    <div className="flex-grow min-w-0">
                      <span className="text-xs font-semibold text-slate-700 truncate block">
                        {record.itemName}
                      </span>
                    </div>

                    {/* Points Badge */}
                    <div className="flex-shrink-0">
                      <span className={`text-xs font-black border-2 border-slate-900 rounded-xl px-2.5 py-0.5 shadow-sm text-white ${
                        isPos ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}>
                        {isPos ? '+' : ''}{record.points}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer actions banner */}
        <div className="p-4 sm:p-5 bg-white border-t-4 border-slate-900 flex justify-end">
          <button
            onClick={onClose}
            type="button"
            className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border-2 border-slate-900 rounded-2xl font-black text-sm shadow-[3px_3px_0px_0px_rgba(30,41,59,1)] active:translate-y-0.5 duration-100"
          >
            關閉視窗 (Close)
          </button>
        </div>

      </div>
    </div>
  );
}
