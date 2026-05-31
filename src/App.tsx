import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Student, ClassID, PointRecord } from './types';
import { getInitialClassData } from './studentsData';
import { 
  X, Palette, Check, Award, Plus, ArrowLeft, ClipboardList, Calendar, 
  Download, Upload, UserPlus, RefreshCw, Undo2, LogIn, LogOut, 
  Trash2, RotateCcw, AlertTriangle, ChevronDown 
} from 'lucide-react';

import StudentCard from './components/StudentCard';
import WeeklyLeaderboard from './components/WeeklyLeaderboard';
import StudentDetailModal from './components/StudentDetailModal';
import ChangeAvatarModal from './components/ChangeAvatarModal';
import RewardAlertToast from './components/RewardAlertToast';
import AddStudentModal from './components/AddStudentModal';
import ResetScoresModal from './components/ResetScoresModal';
import DrawnStudentsModal from './components/DrawnStudentsModal';
import DailySummaryModal from './components/DailySummaryModal';
import KeyCountdownModal from './components/KeyCountdownModal';

// Web audio api playful synthesizer
function playSimpleSynthSound(type: 'success' | 'warn' | 'bell') {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    if (type === 'bell') {
      // Play school chime
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);
        gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.15 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.15);
        osc.stop(ctx.currentTime + idx * 0.15 + 0.61);
      });
    } else if (type === 'success') {
      // Mario-like powerup
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(330, ctx.currentTime); // E4
      osc.frequency.setValueAtTime(660, ctx.currentTime + 0.08); // E5
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.31);
    } else {
      // Buzzer warning down pitch
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.41);
    }
  } catch (err) {
    console.warn('Audio synthesis blocked by client policy', err);
  }
}

export default function App() {
  // Core Application active configuration
  const [currentClass, setCurrentClass] = useState<ClassID>('P5A');
  const [students, setStudents] = useState<Student[]>([]);
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);

  // Sorting mode selection ('id', 'hilo', 'care')
  const [sorting, setSorting] = useState<'id' | 'hilo' | 'care'>('id');

  // Multi-select features
  const [isMultiSelectMode, setIsMultiSelectMode] = useState<boolean>(false);
  const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>([]);

  // Random drawing features
  const [drawPool, setDrawPool] = useState<number[]>([]);
  const [drawnCount, setDrawnCount] = useState<number>(0);
  const [lastDrawnStudent, setLastDrawnStudent] = useState<Student | null>(null);
  const [drawCountInput, setDrawCountInput] = useState<number>(1);
  const [drawnStudents, setDrawnStudents] = useState<Student[] | null>(null);

  // Modal display states
  const [selectedDetailStudent, setSelectedDetailStudent] = useState<Student | null>(null);
  const [detailInitialCategory, setDetailInitialCategory] = useState<'pos' | 'neg'>('pos');
  const [selectedChangeAvatarStudent, setSelectedChangeAvatarStudent] = useState<Student | null>(null);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);
  const [isDailySummaryOpen, setIsDailySummaryOpen] = useState<boolean>(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState<boolean>(false);
  const [isResetScoresOpen, setIsResetScoresOpen] = useState<boolean>(false);

  // Keyboard shortcut countdown trigger states
  const [activeShortcutModal, setActiveShortcutModal] = useState<'quiet' | 'ready' | null>(null);

  // Score History undo tracker (global undo buffer across the class)
  const [globalHistoryBuffer, setGlobalHistoryBuffer] = useState<{ studentId: number; recordId: string; points: number }[]>([]);

  // Award toast alerts pop
  const [toastAlert, setToastAlert] = useState<{
    student: Student;
    itemName: string;
    points: number;
    recordId: string;
  } | null>(null);

  // Load students dataset based on currentClass ID on change
  useEffect(() => {
    const storageKey = `miss_iong_class_students_${currentClass}`;
    const saved = localStorage.getItem(storageKey);
    let loadedStudents: Student[] = [];

    if (saved) {
      try {
        loadedStudents = JSON.parse(saved);
      } catch (err) {
        console.error('Failed to parse students data from localStorage', err);
        loadedStudents = getInitialClassData(currentClass);
      }
    } else {
      loadedStudents = getInitialClassData(currentClass);
    }

    setStudents(loadedStudents);
    setSelectedStudentIds([]);
    setIsMultiSelectMode(false);
    
    // Setup random draw pool for this class
    const initialPool = loadedStudents.map(s => s.id);
    setDrawPool(initialPool);
    setDrawnCount(0);
    setLastDrawnStudent(null);
  }, [currentClass]);

  // Keyboard keydown action listener for classroom activities
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      if (activeElement && (
        activeElement.tagName === 'INPUT' || 
        activeElement.tagName === 'TEXTAREA' || 
        activeElement.getAttribute('contenteditable') === 'true'
      )) {
        return;
      }
      
      const key = e.key.toUpperCase();
      if (key === 'Q') {
        e.preventDefault();
        setActiveShortcutModal('quiet');
      } else if (key === 'C') {
        e.preventDefault();
        setActiveShortcutModal('ready');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleApplyAllStudentsReward = (itemName: string, points: number) => {
    if (students.length === 0) return;
    const timestampStr = new Date().toLocaleString('zh-TW', { hour12: false });
    
    const updated = students.map((s) => {
      const recordId = Math.random().toString(36).substr(2, 9);
      const newRecord: PointRecord = {
        id: recordId,
        timestamp: timestampStr,
        itemName,
        points
      };
      return {
        ...s,
        goodScore: s.goodScore + points,
        history: [...s.history, newRecord]
      };
    });
    
    saveStudentsData(updated);
  };

  // Persist updated students list to state and local storage
  const saveStudentsData = (updated: Student[]) => {
    setStudents(updated);
    const storageKey = `miss_iong_class_students_${currentClass}`;
    localStorage.setItem(storageKey, JSON.stringify(updated));

    // Also update current detail state in sync
    if (selectedDetailStudent) {
      const liveObj = updated.find((s) => s.id === selectedDetailStudent.id);
      if (liveObj) {
        setSelectedDetailStudent(liveObj);
      }
    }
  };

  // 1. ADD POINT / SCORE HANDLER
  const handleApplyScore = (studentId: number, itemName: string, points: number) => {
    const timestampStr = new Date().toLocaleString('zh-TW', { hour12: false });
    const recordId = Math.random().toString(36).substr(2, 9);

    const updated = students.map((s) => {
      if (s.id === studentId) {
        const newRecord: PointRecord = {
          id: recordId,
          timestamp: timestampStr,
          itemName,
          points
        };

        const scoreObj = points >= 0 
          ? { goodScore: s.goodScore + points }
          : { careScore: s.careScore + points }; // careScore remains negative

        return {
          ...s,
          ...scoreObj,
          history: [...s.history, newRecord]
        };
      }
      return s;
    });

    saveStudentsData(updated);

    // Push into global history buffer for global quick undo trigger
    setGlobalHistoryBuffer((prev) => [
      ...prev,
      { studentId, recordId, points }
    ]);

    // Play playful synthesized effect
    playSimpleSynthSound(points >= 0 ? 'success' : 'warn');

    // Trigger full center screen toast poster
    const activeStudent = updated.find((s) => s.id === studentId);
    if (activeStudent) {
      setToastAlert({
        student: activeStudent,
        itemName,
        points,
        recordId
      });
    }
  };

  // Score applying trigger for Bulk multi-select entries
  const handleApplyBulkScore = (itemName: string, points: number) => {
    if (selectedStudentIds.length === 0) return;
    
    const timestampStr = new Date().toLocaleString('zh-TW', { hour12: false });
    let updated = [...students];

    selectedStudentIds.forEach((studentId) => {
      const recordId = Math.random().toString(36).substr(2, 9);
      updated = updated.map((s) => {
        if (s.id === studentId) {
          const newRecord: PointRecord = {
            id: recordId,
            timestamp: timestampStr,
            itemName,
            points
          };

          const scoreObj = points >= 0 
            ? { goodScore: s.goodScore + points }
            : { careScore: s.careScore + points };

          return {
            ...s,
            ...scoreObj,
            history: [...s.history, newRecord]
          };
        }
        return s;
      });
    });

    saveStudentsData(updated);
    playSimpleSynthSound('success');
    setIsMultiSelectMode(false);
    setSelectedStudentIds([]);
    alert(`已為所選的 ${selectedStudentIds.length} 位學生成功套用 ${points >= 0 ? '+' : ''}${points} 分！`);
  };

  // 2. SPECIFIC RECORD UNDO HANDLER
  const handleUndoSingleRecord = (studentId: number, recordId: string) => {
    const targetStudent = students.find((s) => s.id === studentId);
    if (!targetStudent) return;

    const record = targetStudent.history.find((r) => r.id === recordId);
    if (!record) return;

    const pointsToDeduct = record.points;
    const updatedHistory = targetStudent.history.filter((r) => r.id !== recordId);

    const updated = students.map((s) => {
      if (s.id === studentId) {
        const scoreObj = pointsToDeduct >= 0
          ? { goodScore: Math.max(0, s.goodScore - pointsToDeduct) }
          : { careScore: Math.min(0, s.careScore - pointsToDeduct) };

        return {
          ...s,
          ...scoreObj,
          history: updatedHistory
        };
      }
      return s;
    });

    saveStudentsData(updated);

    // Filter cancelled ones out of global undo buffer
    setGlobalHistoryBuffer((prev) => prev.filter((h) => h.recordId !== recordId));
    
    // synthesized trash swipe chimes
    playSimpleSynthSound('warn');
  };

  // Global Quick Back-Arrow / Revert Undo Action
  const handleGlobalUndo = () => {
    if (globalHistoryBuffer.length === 0) {
      alert('目前沒有剩餘評分紀錄可撤銷！');
      return;
    }

    const lastAction = globalHistoryBuffer[globalHistoryBuffer.length - 1];
    handleUndoSingleRecord(lastAction.studentId, lastAction.recordId);
    setGlobalHistoryBuffer((prev) => prev.slice(0, -1));
    alert('已成功撤銷上一步的評分點數！');
  };

  // 3. EDIT AVATAR HANDLER
  const handleUpdateAvatar = (studentId: number, url: string, pokemonId?: number) => {
    const updated = students.map((s) => {
      if (s.id === studentId) {
        return {
          ...s,
          avatarUrl: url,
          pokemonId
        };
      }
      return s;
    });
    saveStudentsData(updated);
    setSelectedChangeAvatarStudent(null);
  };

  // 4. RANDOM STUDENT DRAWER / PICKER SPINNER
  const handlePerformRaffle = (count: number) => {
    if (students.length === 0) return;
    const requestedCount = Math.min(count, students.length);

    let currentPool = [...drawPool];
    let selectedIds: number[] = [];

    // Choose selectedIds from currentPool
    while (selectedIds.length < requestedCount) {
      if (currentPool.length === 0) {
        // Refill pool
        currentPool = students.map((s) => s.id);
      }

      const idx = Math.floor(Math.random() * currentPool.length);
      const id = currentPool[idx];
      if (!selectedIds.includes(id)) {
        selectedIds.push(id);
      }
      currentPool = currentPool.filter((item) => item !== id);
    }

    // Update pool
    setDrawPool(currentPool);
    setDrawnCount(students.length - currentPool.length);

    // Find drawn student objects
    const items = students.filter((s) => selectedIds.includes(s.id));

    // Play chime sound
    playSimpleSynthSound('bell');

    if (requestedCount === 1) {
      // If only 1 requested, directly pop up their detail modal as prior experience
      const drawnZero = items[0];
      setLastDrawnStudent(drawnZero);
      setSelectedDetailStudent(drawnZero);
    } else {
      // Pop up the multiple drawn modal list!
      setDrawnStudents(items);
    }
  };

  // Reset Drawer Pool back
  const handleResetDrawPool = () => {
    const initialPool = students.map((s) => s.id);
    setDrawPool(initialPool);
    setDrawnCount(0);
    setLastDrawnStudent(null);
    alert('已重新重置隨機抽選池！這下大家都有機會重新上台了 😉');
  };

  // 5. INITIATE NEW STUDENT
  const handleAddStudent = (name: string, rollId: number) => {
    // Check duplication
    const duplicated = students.find((s) => s.id === rollId);
    if (duplicated) {
      alert(`學號 #${rollId} 已存在！`);
      return;
    }

    const defaultImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${rollId}.png`;
    const newStudent: Student = {
      id: rollId,
      name,
      avatarUrl: defaultImg,
      pokemonId: rollId,
      goodScore: 0,
      careScore: 0,
      history: []
    };

    const updated = [...students, newStudent].sort((a,b) => a.id - b.id);
    saveStudentsData(updated);
    setIsAddStudentOpen(false);
  };

  // 6. INITIAL RESET SCORES DATA
  const handleResetAllScores = () => {
    const updated = students.map((s) => ({
      ...s,
      goodScore: 0,
      careScore: 0,
      history: []
    }));
    saveStudentsData(updated);
    setGlobalHistoryBuffer([]);
    alert('已成功清空並重置當前班級所有學生的全部加分/減分數據與歷史紀錄！');
  };

  // 7. EXPORT DATA FILE
  const handleExportDataFile = async () => {
    try {
      const dataStr = JSON.stringify(students, null, 2);
      const fileName = `Miss_Iongs_Class_${currentClass}_ScoreStats.json`;

      // 嘗試使用現代 File System Access API 以便瀏覽器能彈出對話框問學生資料要存檔在電腦哪裡
      if (typeof window !== 'undefined' && 'showSaveFilePicker' in window) {
        try {
          const handle = await (window as any).showSaveFilePicker({
            suggestedName: fileName,
            types: [{
              description: 'JSON 學習成績單備份 (JSON Files)',
              accept: {
                'application/json': ['.json'],
              }
            }]
          });
          const writable = await handle.createWritable();
          await writable.write(dataStr);
          await writable.close();
          // 如果儲存成功，直接返回，避免重複下載
          return;
        } catch (err: any) {
          // 如果使用者按下了取消（AbortError），視為預期行為，不需要繼續
          if (err.name === 'AbortError') {
            return;
          }
          console.warn('File System Access API 失敗或受到沙盒限制，將自動降級使用一般下載機制：', err);
        }
      }

      // 一般瀏覽器下載備份 (Legacy fallback download)
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href',       dataUri);
      downloadAnchor.setAttribute('download', fileName);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (e) {
      alert('匯出文件失敗，請稍後再試。');
    }
  };

  // 8. IMPORT BACKUP DATA FILE
  const handleImportDataFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const files = e.target.files;
    if (!files || files.length === 0) return;

    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // simple check keyfields
          const valid = parsed.every((s) => 'id' in s && 'name' in s && 'goodScore' in s && 'careScore' in s);
          if (valid) {
            saveStudentsData(parsed);
            alert(`成功導入並還原 ${parsed.length} 位學生的成績單！`);
          } else {
            alert('導入失败：JSON 結構不符合格式，請提供由本系統匯出之有效備份檔案！');
          }
        }
      } catch (err) {
        alert('文件讀取錯誤：無法正確解析為 JSON 文件。');
      }
    };
    fileReader.readAsText(files[0]);
  };

  // Sorting calculation helper
  const sortedStudentsList = useMemo(() => {
    const list = [...students];
    if (sorting === 'id') {
      return list.sort((a, b) => a.id - b.id);
    } else if (sorting === 'hilo') {
      return list.sort((a, b) => {
        const netA = a.goodScore + a.careScore;
        const netB = b.goodScore + b.careScore;
        return netB - netA;
      });
    } else if (sorting === 'care') {
      // sort by negative Care points value descends (the absolute deduction size)
      return list.sort((a, b) => {
        return a.careScore - b.careScore; // since careScore is negative, lower value represents bigger negative deduction
      });
    }
    return list;
  }, [students, sorting]);

  // Bulk Multi-Select checkboxes controls
  const handleSelectToggle = (id: number) => {
    setSelectedStudentIds((prev) => 
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedStudentIds(students.map((s) => s.id));
  };

  const handleSelectCancel = () => {
    setSelectedStudentIds([]);
    setIsMultiSelectMode(false);
  };

  return (
    <div className="relative min-h-screen px-4 pb-16 selection:bg-[#f3a697] selection:text-[#3f3935]">
      
      {/* ────────────────── TOP SITE HEADER PANEL ────────────────── */}
      <header className="max-w-7xl mx-auto pt-8 pb-5 border-b-4 border-dashed border-[#eb725a]/40 flex flex-col lg:flex-row items-center justify-between gap-5 select-none">
        
        {/* Title play branding with pencil / school feeling */}
        <div className="flex items-center space-x-3.5 cursor-pointer">
          <span className="text-5xl animate-bounce duration-1000">🎨</span>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black font-playful tracking-wider text-[#eb725a] drop-shadow-xs">
              Miss Iong's Class 🖍️
            </h1>
          </div>
        </div>

        {/* Current Class Selector Area / and Import Export file buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          
          {/* Quick No-keyboard countdown shortcuts */}
          <button
            onClick={() => setActiveShortcutModal('quiet')}
            className="px-4 py-3 bg-[#f0f9ff] hover:bg-sky-100 border-4 border-[#3f3935] text-sky-950 text-base font-black rounded-2xl shadow-[4px_4px_0px_0px_#3f3935] hover:shadow-[1.5px_1.5px_0px_0px_#3f3935] hover:translate-y-0.5 active:scale-95 cursor-pointer flex items-center space-x-1.5 transition-all"
            title="快速安靜倒計時 (🤫 快捷鍵 Q)"
          >
            <span className="text-xl">🤫</span>
            <span className="font-sans">快速安靜</span>
          </button>

          <button
            onClick={() => setActiveShortcutModal('ready')}
            className="px-4 py-3 bg-[#fefce8] hover:bg-amber-100 border-4 border-[#3f3935] text-amber-950 text-base font-black rounded-2xl shadow-[4px_4px_0px_0px_#3f3935] hover:shadow-[1.5px_1.5px_0px_0px_#3f3935] hover:translate-y-0.5 active:scale-95 cursor-pointer flex items-center space-x-1.5 transition-all"
            title="準備上課倒計時 (🧑‍🏫 快捷鍵 C)"
          >
            <span className="text-xl">🧑‍🏫</span>
            <span className="font-sans">準備上課</span>
          </button>

          {/* Class Select dropdown box wrapper */}
          <div className="relative">
            <button
              onClick={() => setIsClassDropdownOpen(!isClassDropdownOpen)}
              className="px-5 py-3 bg-[#fffefc] border-4 border-rose-450 rounded-2xl flex items-center space-x-2 shadow-[4px_4px_0px_0px_#ec4899] hover:scale-105 active:scale-95 transition-all text-sm font-black text-rose-650"
            >
              <span className="text-base font-sans">🏫 {currentClass === 'P5A' ? 'P5A 班級小木屋' : currentClass === 'P5B' ? 'P5B 班級小木屋' : 'P5C 班級小木屋'}</span>
              <ChevronDown className="w-4 h-4 stroke-[3px] text-rose-500" />
            </button>

            {isClassDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-[#fffefc] border-3 border-rose-500 rounded-2xl shadow-xl z-30 overflow-hidden animate-cute-pop">
                {['P5A', 'P5B', 'P5C'].map((id) => (
                  <button
                    key={id}
                    onClick={() => {
                      setCurrentClass(id as ClassID);
                      setIsClassDropdownOpen(false);
                    }}
                    className={`w-full text-left px-5 py-3.5 text-sm font-black border-b border-rose-100 hover:bg-rose-50/50 transition-colors flex items-center gap-2 ${
                      currentClass === id ? 'text-rose-600 bg-rose-50' : 'text-slate-705'
                    }`}
                  >
                    <span>🎨 {id} 班級</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export File Button with Crayon style */}
          <button
            onClick={handleExportDataFile}
            className="px-4 py-3 bg-[#f0fdf4] hover:bg-emerald-100 border-3 border-slate-800 text-emerald-800 text-xs font-black rounded-2xl shadow-[3.5px_3.5px_0px_0px_#3f3935] hover:shadow-[1.5px_1.5px_0px_0px_#3f3935] hover:translate-y-0.5 transition-all flex items-center space-x-1.5 active:scale-95 cursor-pointer"
            title="把小朋友的加減分成績單存起來"
          >
            <Download className="w-4 h-4 stroke-[3px] text-emerald-650" />
            <span>💾 備份存檔 (Export)</span>
          </button>

          {/* Import File Button wrapper */}
          <label className="px-4 py-3 bg-[#ecfeff] hover:bg-cyan-100 border-3 border-slate-800 text-cyan-850 text-xs font-black rounded-2xl shadow-[3.5px_3.5px_0px_0px_#3f3935] hover:shadow-[1.5px_1.5px_0px_0px_#3f3935] hover:translate-y-0.5 cursor-pointer transition-all flex items-center space-x-1.5 active:scale-95">
            <Upload className="w-4 h-4 stroke-[3px] text-cyan-650" />
            <span>📂 載入檔案 (Import)</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportDataFile}
              className="hidden"
            />
          </label>
        </div>
      </header>


      {/* ────────────────── FILTER PANEL / CONTROL PANEL BAR ────────────────── */}
      <section className="max-w-7xl mx-auto mt-6 mb-8 select-none">
        <div className="bg-[#fffefb] sketch-bg-yellow crayon-border-pink p-4.5 sm:p-5 flex flex-col xl:flex-row items-center justify-between gap-5 shadow-md">
          
          {/* Sorting panel selectors with wobbly craft look */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-black text-rose-600 bg-rose-50 border border-rose-200 rounded px-2 py-0.5 font-sans mr-1">
              排序看這裡 🔍
            </span>

            <button
              onClick={() => setSorting('id')}
              className={`px-4 py-2 text-xs font-black border-3 rounded-xl transition-all duration-150 active:scale-95 flex items-center gap-1 cursor-pointer ${
                sorting === 'id'
                  ? 'bg-[#eb725a] text-white border-[#3f3935] shadow-[3px_3px_0px_0px_#3f3935] skew-left'
                  : 'bg-white text-slate-705 border-slate-300 hover:border-rose-400 hover:scale-105 shadow-[2.5px_2.5px_0px_0px_#cbd5e0]'
              }`}
            >
              <span>🔢 按學號</span>
            </button>

            <button
              onClick={() => setSorting('hilo')}
              className={`px-4 py-2 text-xs font-black border-3 rounded-xl transition-all duration-150 active:scale-95 flex items-center gap-1 cursor-pointer ${
                sorting === 'hilo'
                  ? 'bg-[#eb725a] text-white border-[#3f3935] shadow-[3px_3px_0px_0px_#3f3935] skew-right'
                  : 'bg-white text-slate-750 border-slate-300 hover:border-rose-400 hover:scale-105 shadow-[2.5px_2.5px_0px_0px_#cbd5e0]'
              }`}
            >
              👑 總分榜 / 高到低
            </button>

            <button
              onClick={() => setSorting('care')}
              className={`px-4 py-2 text-xs font-black border-3 rounded-xl transition-all duration-150 active:scale-95 flex items-center gap-1 cursor-pointer ${
                sorting === 'care'
                  ? 'bg-[#eb725a] text-white border-[#3f3935] shadow-[3px_3px_0px_0px_#3f3935] skew-left'
                  : 'bg-white text-slate-755 border-slate-300 hover:border-rose-400 hover:scale-105 shadow-[2.5px_2.5px_0px_0px_#cbd5e0]'
              }`}
            >
              ⚡ 待改進榜 😈
            </button>

            {/* Weekly Leaderboard activate */}
            <button
              onClick={() => setIsLeaderboardOpen(true)}
              className="ml-2.5 w-12 h-12 bg-[#fffbeb] hover:bg-amber-100 text-amber-600 border-3 border-amber-450 rounded-2xl shadow-[3px_3px_0px_0px_#d97706] hover:shadow-[1.5px_1.5px_0px_0px_#d97706] hover:translate-y-0.5 active:scale-90 transition-all flex flex-col items-center justify-center font-black cursor-pointer group"
              title="查看毎週龍虎榜 🏆"
            >
              <span className="text-lg group-hover:scale-120 transition-transform">🏆</span>
              <span className="text-[7.5px] font-sans -mt-0.5 font-bold">龍虎榜</span>
            </button>

            {/* Today's Scoring Summary activate */}
            <button
              onClick={() => setIsDailySummaryOpen(true)}
              className="ml-2 w-12 h-12 bg-cyan-50 hover:bg-cyan-100 text-cyan-650 border-3 border-cyan-400 rounded-2xl shadow-[3px_3px_0px_0px_#0891b2] hover:shadow-[1.5px_1.5px_0px_0px_#0891b2] hover:translate-y-0.5 active:scale-90 transition-all flex flex-col items-center justify-center font-black cursor-pointer group"
              title="查看當天評分總結 📅"
            >
              <span className="text-lg group-hover:scale-120 transition-transform">📅</span>
              <span className="text-[7.5px] font-sans -mt-0.5 font-bold">今日總結</span>
            </button>
          </div>

          {/* Middle: Multi Select Controls */}
          <div className="bg-[#f08573]/10 border-2 border-dashed border-[#f08573] rounded-2xl p-2 px-4 flex flex-wrap items-center gap-3.5">
            <label className="flex items-center space-x-2.5 cursor-pointer text-xs font-black text-rose-700">
              <input
                type="checkbox"
                checked={isMultiSelectMode}
                onChange={(e) => {
                  setIsMultiSelectMode(e.target.checked);
                  if (!e.target.checked) setSelectedStudentIds([]);
                }}
                className="w-4.5 h-4.5 accent-rose-500 rounded border-2 border-slate-800 cursor-pointer"
              />
              <span>多選模式</span>
            </label>

            {isMultiSelectMode && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSelectAll}
                  className="px-3 py-1 bg-white hover:bg-rose-50 border border-slate-400 rounded-lg text-[10px] font-black text-rose-600 transition-all active:scale-95"
                >
                  全選
                </button>
                <button
                  onClick={handleSelectCancel}
                  className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-[10px] font-black text-slate-500 transition-all active:scale-95"
                >
                  取消
                </button>
              </div>
            )}
          </div>

          {/* Right Section: Multi Random selector spinner, quick undo, reset values, bell */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Multi Draw Drawer with Orange style */}
            <div className="crayon-border-orange bg-[#fffbf0] p-1.5 flex items-center space-x-2">
              <span className="text-xs font-black text-orange-700 pl-1 select-none">抽取人數:</span>
              <select
                value={drawCountInput}
                onChange={(e) => setDrawCountInput(parseInt(e.target.value, 10))}
                className="bg-white border-2 border-orange-300 rounded-xl px-2 py-1 text-xs font-black text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} 人
                  </option>
                ))}
              </select>
              <button
                onClick={() => handlePerformRaffle(drawCountInput)}
                className="bg-orange-500 hover:bg-orange-600 text-white border-2 border-orange-600 font-black text-xs px-4 py-1.5 rounded-xl shadow-sm flex items-center space-x-1 active:scale-95 transition-all cursor-pointer"
              >
                <span>🎲 隨機抽取</span>
                <span className="font-mono text-[10px] bg-orange-700 text-white rounded-md px-1 ml-1">
                  ({drawPool.length}剩餘)
                </span>
              </button>

              <button
                onClick={handleResetDrawPool}
                className="p-1.5 bg-white hover:bg-stone-100 border-2 border-orange-200 rounded-xl text-slate-600 active:scale-95 duration-100 transition-all flex items-center justify-center cursor-pointer"
                title="重置抽取池"
              >
                <RefreshCw className="w-3.5 h-3.5 stroke-[2.5px]" />
              </button>
            </div>

            {/* Scoring launcher for bulk select */}
            {isMultiSelectMode && selectedStudentIds.length > 0 && (
              <button
                onClick={() => {
                  const rep = students.find((s) => s.id === selectedStudentIds[0]) || students[0];
                  setSelectedDetailStudent({
                    ...rep,
                    name: `多選群體 (${selectedStudentIds.length}位學生)`,
                    id: 999,
                    history: []
                  });
                }}
                className="bg-indigo-650 hover:bg-indigo-750 text-white border-2 border-indigo-700 font-black text-xs px-3.5 py-2 px-3 py-2.5 rounded-xl shadow-sm flex items-center space-x-1 active:scale-95 cursor-pointer"
              >
                <span>獎懲評分 ({selectedStudentIds.length})</span>
              </button>
            )}

            {/* Quick action buttons row: quick undo, add student profile, Wipe trash */}
            <div className="flex items-center space-x-1.5 bg-stone-150 p-1 rounded-xl">
              {/* Back Quick Undo */}
              <button
                onClick={handleGlobalUndo}
                className="p-2.5 bg-white hover:bg-stone-50 text-slate-800 border border-slate-400 rounded-xl shadow-[1.5px_1.5px_0px_0px_rgba(30,41,59,1)] hover:scale-105 active:scale-90 transition-transform flex items-center justify-center cursor-pointer"
                title="撤銷近期做的上一個評分"
              >
                <Undo2 className="w-4.5 h-4.5 stroke-[2.5px]" />
              </button>

              {/* Add Student Plus profile */}
              <button
                onClick={() => setIsAddStudentOpen(true)}
                className="p-2.5 bg-teal-400 hover:bg-teal-500 text-slate-900 border border-slate-400 rounded-xl shadow-[1.5px_1.5px_0px_0px_rgba(30,41,59,1)] hover:scale-105 active:scale-90 transition-transform flex items-center justify-center cursor-pointer"
                title="新增一位學生"
              >
                <UserPlus className="w-4.5 h-4.5 stroke-[2.5px]" />
              </button>

              {/* RESET SCOREBOARD GEAR */}
              <button
                onClick={() => setIsResetScoresOpen(true)}
                className="p-2.5 bg-rose-500 hover:bg-rose-600 text-white border border-slate-650 rounded-xl shadow-[1.5px_1.5px_0px_0px_rgba(30,41,59,1)] hover:scale-105 active:scale-90 transition-transform flex items-center justify-center cursor-pointer"
                title="清空當前班級分數"
              >
                <Trash2 className="w-4.5 h-4.5 stroke-[2.5px]" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ────────────────── MAIN CARDS DISPLAY GRID ────────────────── */}
      <main className="max-w-7xl mx-auto">
        {students.length === 0 ? (
          <div className="text-center py-20 bg-white/70 border-3 border-dashed border-stone-300 rounded-[32px] p-6 max-w-md mx-auto">
            <span className="text-5xl block mb-2 font-mono">🏫</span>
            <p className="text-slate-500 font-extrabold text-lg">
              這個班級目前沒有導入同學喔！
            </p>
            <p className="text-xs text-slate-400 mt-2">
              點擊右上角 “IMPORT / 匯入” 或點擊 “👤+” 來手動添加。
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {sortedStudentsList.map((student, idx) => {
              // Real computed rank number within this sorted listing layout (useful if sorted)
              const realRank = idx + 1;

              return (
                <StudentCard
                  key={student.id}
                  student={student}
                  rank={realRank}
                  isNegRank={sorting === 'care'}
                  isMultiSelectMode={isMultiSelectMode}
                  isSelected={selectedStudentIds.includes(student.id)}
                  onSelectToggle={handleSelectToggle}
                  onCardClick={(s, cat) => {
                    setDetailInitialCategory(cat || 'pos');
                    setSelectedDetailStudent(s);
                  }}
                  onChangeAvatarClick={(s, e) => {
                    e.stopPropagation();
                    setSelectedChangeAvatarStudent(s);
                  }}
                />
              );
            })}
          </div>
        )}
      </main>

      {/* ────────────────── HANDDRAWN GRAPHIC BACKGROUND CREDIT TEXT ────────────────── */}
      <footer className="mt-20 text-center text-xs text-slate-400 font-bold select-none flex items-center justify-center space-x-2">
        <span>Miss Iong's Class</span>
      </footer>

      {/* ────────────────── SYSTEM MODALS & CELEBRATION DISPLAYS ────────────────── */}

      {/* 1. STUDENT DETAIL CARD SCORING MODAL */}
      {selectedDetailStudent && (
        <StudentDetailModal
          student={selectedDetailStudent}
          initialCategory={detailInitialCategory}
          onApplyScore={({ name, points }) => {
            if (selectedDetailStudent.id === 999) {
              // represents group bulk apply
              handleApplyBulkScore(name, points);
            } else {
              handleApplyScore(selectedDetailStudent.id, name, points);
            }
            setSelectedDetailStudent(null);
          }}
          onUndoRecord={(recordId) => {
            handleUndoSingleRecord(selectedDetailStudent.id, recordId);
          }}
          onClose={() => setSelectedDetailStudent(null)}
          onChangeAvatarClick={() => {
            setSelectedChangeAvatarStudent(selectedDetailStudent);
            setSelectedDetailStudent(null);
          }}
        />
      )}

      {/* 2. CHANGE AVATAR GALLERY */}
      {selectedChangeAvatarStudent && (
        <ChangeAvatarModal
          student={selectedChangeAvatarStudent}
          onSelectAvatar={(url, pokeId) => {
            handleUpdateAvatar(selectedChangeAvatarStudent.id, url, pokeId);
          }}
          onClose={() => setSelectedChangeAvatarStudent(null)}
        />
      )}

      {/* 3. WEEKLY SCOREBOARD LEADERBOARD */}
      {isLeaderboardOpen && (
        <WeeklyLeaderboard
          students={students}
          onClose={() => setIsLeaderboardOpen(false)}
        />
      )}

      {/* 3.1 DAILY SCORING SUMMARY MODAL */}
      {isDailySummaryOpen && (
        <DailySummaryModal
          students={students}
          onClose={() => setIsDailySummaryOpen(false)}
        />
      )}

      {/* 4. SUCCESS CELEBRATION DISK OVERLAY */}
      {toastAlert && (
        <RewardAlertToast
          student={toastAlert.student}
          itemName={toastAlert.itemName}
          points={toastAlert.points}
          onUndo={() => {
            // Revert action values
            handleUndoSingleRecord(toastAlert.student.id, toastAlert.recordId);
          }}
          onClose={() => setToastAlert(null)}
        />
      )}

      {/* 5. ADD INCOMING ROLL PROFILE */}
      {isAddStudentOpen && (
        <AddStudentModal
          onAddStudent={handleAddStudent}
          onClose={() => setIsAddStudentOpen(false)}
          nextRollId={students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1}
        />
      )}

      {/* 6. RESET DATA OVERLAY CONFIRM */}
      {isResetScoresOpen && (
        <ResetScoresModal
          onConfirm={handleResetAllScores}
          onClose={() => setIsResetScoresOpen(false)}
        />
      )}

      {/* 7. DRAWN STUDENTS LIST MODAL */}
      {drawnStudents && (
        <DrawnStudentsModal
          students={drawnStudents}
          onClose={() => setDrawnStudents(null)}
          onEnterMultiSelect={(ids) => {
            setIsMultiSelectMode(true);
            setSelectedStudentIds(ids);
          }}
          onAwardAll={() => {
            // Automatically select group and open score details panel
            const ids = drawnStudents.map((s) => s.id);
            setSelectedStudentIds(ids);
            setIsMultiSelectMode(true);

            // Pop up detail panel configured as group representation
            setSelectedDetailStudent({
              ...drawnStudents[0],
              name: `多選群體 (${ids.length}位學生)`,
              id: 999,
              history: []
            });
          }}
        />
      )}

      {/* 8. SHORTCUT KEY COUNTDOWN TIMER MODAL (Q & C KEYS) */}
      {activeShortcutModal && (
        <KeyCountdownModal
          type={activeShortcutModal}
          onConfirmCount={() => {
            const rewardName = activeShortcutModal === 'quiet' 
              ? '🤫 全班課堂專注安靜獎勵' 
              : '🎒 快速回座準備上課獎勵';
            handleApplyAllStudentsReward(rewardName, 2);
          }}
          onClose={() => setActiveShortcutModal(null)}
        />
      )}

    </div>
  );
}
