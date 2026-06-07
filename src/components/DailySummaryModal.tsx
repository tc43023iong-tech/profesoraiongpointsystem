import React, { useState, useMemo } from 'react';
import { Student, PointRecord } from '../types';
import { X, Calendar, Clock, Sparkles, ChevronRight, Filter } from 'lucide-react';

interface DailySummaryModalProps {
  students: Student[];
  onClose: () => void;
}

// Robust helper to parse various local/ISO date formats to standard JS Date object
function parseRecordTimestamp(timestampStr: string): Date | null {
  if (!timestampStr) return null;
  
  try {
    // Matches "YYYY/MM/DD HH:MM:SS" or "YYYY-MM-DD HH:MM:SS"
    const matches = timestampStr.match(/(\d{4})[/-](\d{1,2})[/-](\d{1,2})(?:\s+(\d{1,2}):(\d{1,2}):(\d{1,2}))?/);
    if (matches) {
      const year = parseInt(matches[1], 10);
      const month = parseInt(matches[2], 10);
      const day = parseInt(matches[3], 10);
      const hour = matches[4] ? parseInt(matches[4], 10) : 0;
      const minute = matches[5] ? parseInt(matches[5], 10) : 0;
      const second = matches[6] ? parseInt(matches[6], 10) : 0;
      return new Date(year, month - 1, day, hour, minute, second);
    }
  } catch (e) {
    // Fail silently
  }

  const d = new Date(timestampStr);
  return isNaN(d.getTime()) ? null : d;
}

// 1. Check if same calendar day
function isTodayRecord(timestampStr: string): boolean {
  const dObj = parseRecordTimestamp(timestampStr);
  if (!dObj) return false;
  const today = new Date();
  return (
    dObj.getFullYear() === today.getFullYear() &&
    dObj.getMonth() === today.getMonth() &&
    dObj.getDate() === today.getDate()
  );
}

// 2. Check if within current calendar week (Monday to Sunday)
function isThisWeekRecord(timestampStr: string): boolean {
  const dObj = parseRecordTimestamp(timestampStr);
  if (!dObj) return false;
  
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday ...
  const distanceToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  
  const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - distanceToMonday);
  monday.setHours(0, 0, 0, 0);
  
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  
  return dObj >= monday && dObj <= sunday;
}

export default function DailySummaryModal({ students, onClose }: DailySummaryModalProps) {
  const [activeTab, setActiveTab] = useState<'students' | 'timeline'>('students');
  const [dateFilter, setDateFilter] = useState<'today' | 'week' | 'all'>('today');

  // Compute Filtered Data based on time selection
  const {
    summaryStudents,
    recordsCount,
    totalPosGiven,
    totalNegGiven,
    allTimeline
  } = useMemo(() => {
    let recordsCount = 0;
    let totalPosGiven = 0;
    let totalNegGiven = 0;
    const summaryStudentsList: {
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
      // Filter records according to date filter
      const filteredLogs = student.history.filter((rec) => {
        if (dateFilter === 'today') return isTodayRecord(rec.timestamp);
        if (dateFilter === 'week') return isThisWeekRecord(rec.timestamp);
        return true; // all time
      });
      
      if (filteredLogs.length > 0) {
        let pos = 0;
        let neg = 0;
        
        filteredLogs.forEach((rec) => {
          recordsCount++;
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

        summaryStudentsList.push({
          student,
          records: filteredLogs,
          posSum: pos,
          negAbsSum: neg
        });
      }
    });

    // Sort timeline chronologically (latest first, backup using ID or matching order)
    timeline.sort((a, b) => b.record.timestamp.localeCompare(a.record.timestamp));

    // Sort student summary list by sum of points (posSum - negAbsSum desc)
    summaryStudentsList.sort((a, b) => {
      const netA = a.posSum - a.negAbsSum;
      const netB = b.posSum - b.negAbsSum;
      return netB - netA;
    });

    return {
      summaryStudents: summaryStudentsList,
      recordsCount,
      totalPosGiven,
      totalNegGiven,
      allTimeline: timeline
    };
  }, [students, dateFilter]);

  // General formatted date/week display text for visual header
  const formattedToday = useMemo(() => {
    const d = new Date();
    const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][d.getDay()];
    return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日 (${weekday})`;
  }, []);

  return (
    <div className="fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      {/* Container Main Card - Clean class chalkboard layout */}
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
                班級評分績效總結
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

        {/* DATE RANGE SELECTOR TOGGLE */}
        <div className="bg-amber-50/70 px-4 py-3 border-b-3 border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 select-none">
          <div className="flex items-center space-x-1 text-slate-750 font-black text-xs">
            <Filter className="w-4 h-4 text-amber-600 shrink-0" />
            <span>選擇匯總區間 (Date Filter)：</span>
          </div>
          
          {/* Trio pills buttons */}
          <div className="flex bg-slate-200 p-1 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(30,41,59,1)]">
            <button
              onClick={() => setDateFilter('today')}
              className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                dateFilter === 'today'
                  ? 'bg-[#fbbf24] text-slate-900 shadow-inner'
                  : 'text-slate-600 hover:bg-slate-300'
              }`}
            >
              今日 (Today)
            </button>
            <button
              onClick={() => setDateFilter('week')}
              className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                dateFilter === 'week'
                  ? 'bg-[#fbbf24] text-slate-900 shadow-inner'
                  : 'text-slate-600 hover:bg-slate-300'
              }`}
            >
              本週 (This Week)
            </button>
            <button
              onClick={() => setDateFilter('all')}
              className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                dateFilter === 'all'
                  ? 'bg-[#fbbf24] text-slate-900 shadow-inner'
                  : 'text-slate-600 hover:bg-slate-300'
              }`}
            >
              全部 (All Time)
            </button>
          </div>
        </div>

        {/* STATS OVERVIEW HEAD */}
        <div className="px-5 py-3.5 sm:px-6 bg-[#fffdeb] border-b-3 border-dashed border-slate-350 grid grid-cols-3 gap-2 sm:gap-4 text-center">
          <div className="bg-white border-2 border-slate-900 rounded-2xl p-2 shadow-[2px_2px_0px_0px_rgba(30,41,59,1)]">
            <div className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-wider">評分人次 (Events)</div>
            <div className="text-xl sm:text-2xl font-black text-amber-600 font-playful mt-0.5">
              {recordsCount} <span className="text-xs font-bold text-slate-650">次</span>
            </div>
          </div>
          <div className="bg-[#f0faf2] border-2 border-slate-900 rounded-2xl p-2 shadow-[2px_2px_0px_0px_rgba(30,41,59,1)]">
            <div className="text-[9px] sm:text-[10px] font-black text-emerald-700 uppercase tracking-wider">累積加分 (Rewards)</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 font-playful mt-0.5">
              +{totalPosGiven} <span className="text-xs font-bold text-slate-650">分</span>
            </div>
          </div>
          <div className="bg-[#fff5f4] border-2 border-slate-900 rounded-2xl p-2 shadow-[2px_2px_0px_0px_rgba(30,41,59,1)]">
            <div className="text-[9px] sm:text-[10px] font-black text-rose-700 uppercase tracking-wider">待改善減分 (Cares)</div>
            <div className="text-xl sm:text-2xl font-black text-rose-600 font-playful mt-0.5">
              -{totalNegGiven} <span className="text-xs font-bold text-slate-650">分</span>
            </div>
          </div>
        </div>

        {/* TAB TOGGLES selectors */}
        <div className="px-5 pt-3 sm:px-6 flex gap-2 border-b border-slate-200 bg-white select-none">
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 text-xs sm:text-sm font-black transition-all border-t-3 border-x-3 border-slate-900 rounded-t-xl -mb-[1px] relative cursor-pointer ${
              activeTab === 'students'
                ? 'bg-[#fdfaf4] text-amber-800 font-extrabold pb-2.5 z-10'
                : 'bg-slate-50 text-slate-500 hover:bg-slate-100 pb-2'
            }`}
          >
            🌱 學生加減統計 ({summaryStudents.length} 人)
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 text-xs sm:text-sm font-black transition-all border-t-3 border-x-3 border-slate-900 rounded-t-xl -mb-[1px] relative cursor-pointer ${
              activeTab === 'timeline'
                ? 'bg-[#fdfaf4] text-amber-800 font-extrabold pb-2.5 z-10'
                : 'bg-slate-50 text-slate-500 hover:bg-slate-100 pb-2'
            }`}
          >
            🕒 評分時間線 ({recordsCount} 筆)
          </button>
        </div>

        {/* SCROLLABLE INNER REGION */}
        <div className="flex-grow p-4 sm:p-6 overflow-y-auto max-h-[50vh]">
          {summaryStudents.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white border-3 border-dashed border-slate-300 rounded-[28px] max-w-sm mx-auto my-4">
              <span className="text-5xl block mb-2">💫</span>
              <h3 className="text-slate-700 font-black text-base">
                此區間目前沒有任何評分紀錄
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                快回到班級大堂，點擊學生的頭像，幫這群可愛的孩子加分或指派改善作業吧！
              </p>
            </div>
          ) : activeTab === 'students' ? (
            /* Tab 1: Students aggregate lists */
            <div className="space-y-4 animate-fade-in">
              {summaryStudents.map(({ student, records, posSum, negAbsSum }) => {
                const netScore = posSum - negAbsSum;
                return (
                  <div 
                    key={student.id} 
                    className="bg-white border-2 border-slate-900 rounded-[24px] p-4 shadow-[3px_3px_0px_0px_rgba(30,41,59,1)] transition hover:-translate-y-0.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-dashed border-slate-200">
                      {/* Left student details */}
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
                            Roll Number Profile
                          </p>
                        </div>
                      </div>

                      {/* Right scores aggregates */}
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
                          區間淨分 (Net):
                        </span>
                        <span className={`text-sm sm:text-base font-black font-playful ${netScore >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {netScore >= 0 ? `+${netScore}` : netScore} 分
                        </span>
                      </div>
                    </div>

                    {/* Items received */}
                    <div className="pt-2">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 select-none">
                        區間評分清單 (Records logs)
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
            /* Tab 2: Chronological Timeline records list */
            <div className="space-y-3 animate-fade-in">
              {allTimeline.map(({ student, record }) => {
                const isPos = record.points >= 0;
                let displayTime = record.timestamp;
                
                // If it's this week or all time, it is nice to display date along with time e.g. "5/31 15:19"
                if (dateFilter !== 'today') {
                  const matchDate = record.timestamp.match(/(\d{1,2})[/-](\d{1,2})(?:\s+(\d{1,2}):(\d{1,2}))?/);
                  if (matchDate) {
                    const m = matchDate[1];
                    const d = matchDate[2];
                    const hr = matchDate[3] || '00';
                    const min = matchDate[4] || '00';
                    displayTime = `${m}/${d} ${hr}:${min}`;
                  }
                } else {
                  // Today view: just display Hour:Minute
                  const matchTime = record.timestamp.match(/\d{1,2}:\d{2}/);
                  if (matchTime) {
                    displayTime = matchTime[0];
                  }
                }

                return (
                  <div 
                    key={record.id} 
                    className={`flex items-center space-x-3.5 p-3 rounded-2xl border-2 border-slate-900 shadow-sm hover:translate-x-0.5 duration-105 ${
                      isPos ? 'bg-[#f0faf2]' : 'bg-[#fff5f4]'
                    }`}
                  >
                    {/* Time/Date Badge */}
                    <div className="flex items-center space-x-1 text-slate-500 font-black text-[10px] sm:text-xs font-mono select-none bg-white px-2 py-0.5 border border-slate-400 rounded-lg shrink-0">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{displayTime}</span>
                    </div>

                    {/* Student Avatar */}
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <div className="w-7 h-7 rounded-full overflow-hidden border border-slate-600 bg-[#fffbeb] p-0.5 shrink-0">
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

                    {/* Item Description */}
                    <div className="flex-grow min-w-0">
                      <span className="text-xs font-semibold text-slate-700 truncate block">
                        {record.itemName}
                      </span>
                    </div>

                    {/* points indicator */}
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

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-white border-t-4 border-slate-900 flex justify-end">
          <button
            onClick={onClose}
            type="button"
            className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border-2 border-slate-900 rounded-2xl font-black text-xs sm:text-sm shadow-[3px_3px_0px_0px_rgba(30,41,59,1)] active:translate-y-0.5 duration-100 cursor-pointer"
          >
            關閉視窗 (Close)
          </button>
        </div>

      </div>
    </div>
  );
}
