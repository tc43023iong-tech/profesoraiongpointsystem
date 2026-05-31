import React, { useState, useEffect, useMemo } from 'react';
import { Student } from '../types';
import { X, Award, CheckSquare, Sparkles, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DrawnStudentsModalProps {
  students: Student[];
  allStudents?: Student[];
  onClose: () => void;
  onEnterMultiSelect: (ids: number[]) => void;
  onAwardAll: () => void;
  onSingleSelected?: (student: Student) => void;
}

// Playful click/tick sound for each wheel element selection
function playTickSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    // Vary the pitch slightly for an authentic mechanical click sound
    const pitch = 550 + Math.random() * 200;
    osc.frequency.setValueAtTime(pitch, ctx.currentTime);
    
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (_) {
    // If blocked by browser user interaction policy, ignore gracefully
  }
}

// Upbeat pentatonic chime for triumphant reveals
function playRevealSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
      gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.46);
    });
  } catch (_) {
    // Graceful fallback
  }
}

const CONFETTI_EMOJIS = ['⭐', '✨', '🎉', '🍎', '🌈', '🍦', '🍩', '😻', '🎨', '🚀', '💖', '🍀', '🏆', '🥇'];

export default function DrawnStudentsModal({
  students,
  allStudents = [],
  onClose,
  onEnterMultiSelect,
  onAwardAll,
  onSingleSelected,
}: DrawnStudentsModalProps) {
  const [step, setStep] = useState<'spinning' | 'slowing' | 'revealed'>('spinning');
  const [currentShuffleStudent, setCurrentShuffleStudent] = useState<Student | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  // Generate dynamic, randomized colorful confetti floating effects on successful draw
  const confettiList = useMemo(() => {
    const list = [];
    for (let i = 0; i < 40; i++) {
      list.push({
        id: i,
        emoji: CONFETTI_EMOJIS[Math.floor(Math.random() * CONFETTI_EMOJIS.length)],
        x: Math.random() * 560 - 280, // Offset horizontally relative to screen center
        drift: Math.random() * 140 - 70,
        duration: 1.5 + Math.random() * 2.0,
        delay: Math.random() * 0.6,
      });
    }
    return list;
  }, []);

  // Set up the high-energy rolling state sequencing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    const pool = allStudents.length > 0 ? allStudents : students;

    if (step === 'spinning') {
      // Shuffling rapidly at 55ms ticks
      interval = setInterval(() => {
        playTickSound();
        const randomStudent = pool[Math.floor(Math.random() * pool.length)];
        setCurrentShuffleStudent(randomStudent);
      }, 55);

      // Spin for 700ms before slowing down
      const startSlowing = setTimeout(() => {
        setStep('slowing');
      }, 700);

      return () => {
        clearInterval(interval);
        clearTimeout(startSlowing);
      };
    } else if (step === 'slowing') {
      // 3 final tension-building fast-decelerating ticks
      const delays = [110, 180, 250];
      let tickCount = 0;
      let slowTimeout: NodeJS.Timeout;

      const runSlowTick = () => {
        if (tickCount < delays.length) {
          playTickSound();
          const randomStudent = pool[Math.floor(Math.random() * pool.length)];
          setCurrentShuffleStudent(randomStudent);
          
          slowTimeout = setTimeout(runSlowTick, delays[tickCount]);
          tickCount++;
        } else {
          // Slowing complete! Reveal cards
          setStep('revealed');
        }
      };

      slowTimeout = setTimeout(runSlowTick, 50);

      return () => {
        clearTimeout(slowTimeout);
      };
    } else if (step === 'revealed') {
      // Play celebratory sound arpeggio
      playRevealSound();
      
      // Delay the 3D flip slightly (50ms) to trigger instant excitement
      const flipTimer = setTimeout(() => {
        setIsFlipped(true);
      }, 50);

      // Auto automation trigger timer!
      // Give the user ~1000ms to visually enjoy the flip result, then proceed automatically!
      const autoTimer = setTimeout(() => {
        if (students.length === 1) {
          if (onSingleSelected) {
            onSingleSelected(students[0]);
          }
          onClose();
        } else if (students.length > 1) {
          onEnterMultiSelect(students.map((s) => s.id));
          onClose();
        }
      }, 1050);

      return () => {
        clearTimeout(flipTimer);
        clearTimeout(autoTimer);
      };
    }
  }, [step, allStudents, students, onClose, onEnterMultiSelect, onSingleSelected]);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Playful Handdrawn Orange Canvas Border */}
      <div 
        className="relative bg-orange-50 border-6 border-slate-900 rounded-[36px] shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] w-full max-w-2xl overflow-hidden animate-cute-pop"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Confetti Animation Layer */}
        {isFlipped && confettiList.map((c) => (
          <motion.div
            key={c.id}
            initial={{ y: -60, x: c.x, rotate: 0, opacity: 1, scale: 0.5 }}
            animate={{ y: 580, x: c.x + c.drift, rotate: 540, opacity: 0, scale: 1.2 }}
            transition={{ duration: c.duration, delay: c.delay, ease: 'easeOut' }}
            className="absolute top-0 left-1/2 text-2xl pointer-events-none z-40 select-none"
          >
            {c.emoji}
          </motion.div>
        ))}

        {/* Header decoration */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-450 to-orange-600 border-b-6 border-slate-900 px-6 py-4 flex justify-between items-center text-slate-900 relative">
          <div className="flex items-center space-x-2">
            <span className="text-3xl animate-bounce">🎉</span>
            <div>
              <h2 className="text-2xl font-black tracking-wider text-white font-heading">
                {step !== 'revealed' ? '🎲 隨機抽選進行中...' : '🌟 恭喜幸運得主！'}
              </h2>
              <p className="text-[10px] uppercase font-extrabold tracking-widest text-orange-100 font-mono">
                {step !== 'revealed' ? 'Selecting lucky student...' : 'Congratulations to the Selected!'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 border-2 border-slate-800 rounded-full shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] active:scale-95 duration-100 transition-all cursor-pointer z-10"
          >
            <X className="w-5 h-5 stroke-[3px]" />
          </button>
        </div>

        {/* Core content slot */}
        <div className="p-6 min-h-[340px] flex flex-col items-center justify-center bg-stone-50 border-b-4 border-slate-900 relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {(step === 'spinning' || step === 'slowing') ? (
              /* Slot Machine Animation Screen */
              <motion.div 
                key="spinner-visual"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-6"
              >
                <div className="text-center mb-6">
                  <span className="text-sm font-black text-amber-600 bg-amber-100 border-2 border-amber-300 px-4 py-1 rounded-full animate-pulse">
                    {step === 'spinning' ? '🎰 全速輪轉中' : '⌛ 即將鎖定名單'}
                  </span>
                  <p className="text-xs text-slate-400 font-black mt-2">
                    不要眨眼！名單正在快速飛過...
                  </p>
                </div>

                <div className="w-56 h-56 bg-amber-200/50 border-4 border-dashed border-slate-400 rounded-3xl p-4 flex flex-col items-center justify-center relative shadow-inner">
                  {currentShuffleStudent && (
                    <motion.div
                      key={currentShuffleStudent.id}
                      initial={{ y: 50, opacity: 0, scale: 0.7 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -50, opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.08, ease: 'easeInOut' }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-24 h-24 bg-white border-3 border-slate-900 rounded-2xl flex items-center justify-center p-2 mb-3 shadow-[3px_3px_0px_0px_rgba(30,41,59,1)]">
                        <img
                          src={currentShuffleStudent.avatarUrl}
                          alt={currentShuffleStudent.name}
                          referrerPolicy="no-referrer"
                          className="w-20 h-20 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/bottts/svg?seed=${currentShuffleStudent.name}`;
                          }}
                        />
                      </div>
                      <span className="bg-orange-400 text-white text-[10px] font-black px-2 py-0.5 rounded-full border border-slate-950">
                        #{currentShuffleStudent.id}
                      </span>
                      <h4 className="text-xl font-black text-slate-900 mt-2">
                        {currentShuffleStudent.name}
                      </h4>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ) : (
              /* Triumphant Staggered Card Flip Reveal Sheet */
              <motion.div
                key="reveal-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center space-x-1 bg-yellow-100 border-2 border-yellow-400 text-yellow-800 text-xs font-black px-4 py-1.5 rounded-full shadow-sm animate-bounce">
                    <Sparkles className="w-3.5 h-3.5 stroke-[3px]" />
                    <span>閃亮登場！今天的幸運班級代表</span>
                  </div>
                </div>

                {/* Staggered cards grid layout */}
                <div className="flex flex-wrap justify-center gap-6 py-4 px-2 max-h-[340px] overflow-y-auto">
                  {students.map((student, idx) => {
                    const score = student.goodScore + student.careScore;
                    return (
                      <div key={student.id} className="[perspective:1000px] select-none">
                        <motion.div
                          initial={{ rotateY: 0, scale: 0.85, opacity: 0 }}
                          animate={{ 
                            rotateY: isFlipped ? 180 : 0,
                            scale: 1,
                            opacity: 1
                          }}
                          transition={{ 
                            type: 'spring', 
                            stiffness: 90, 
                            damping: 14,
                            delay: idx * 0.18 + 0.35 // index-based stagger delay for maximum drama
                          }}
                          className="relative w-44 h-56 [transform-style:preserve-3d] transition-all duration-200"
                        >
                          {/* Face Up Face (Revealed - target face of 180 deg rotaY) */}
                          <div 
                            className="absolute inset-0 w-full h-full rounded-2xl border-4 border-slate-900 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex flex-col items-center justify-between p-4 [backface-visibility:hidden] [transform:rotateY(180deg)]"
                          >
                            <div className="w-20 h-20 bg-[#fffbeb] border-2 border-slate-900 rounded-full flex items-center justify-center p-1.5 shadow-inner overflow-hidden relative">
                              <img
                                src={student.avatarUrl}
                                alt={student.name}
                                referrerPolicy="no-referrer"
                                className="w-16 h-16 object-contain"
                              />
                            </div>
                            
                            <div className="text-center w-full mt-1 flex flex-col items-center">
                              <span className="bg-yellow-300 text-slate-900 text-[9px] font-black px-1.5 py-0.5 rounded border border-slate-900 max-w-max">
                                #{student.id}
                              </span>
                              <h4 className="text-base font-black text-slate-950 mt-1 truncate max-w-full">
                                {student.name}
                              </h4>
                              <span className="text-[10px] font-bold text-slate-400 block mt-0.5">
                                總計: {score} 分
                              </span>
                            </div>
                          </div>

                          {/* Face Down Face (Back of Card) */}
                          <div 
                            className="absolute inset-0 w-full h-full rounded-2xl border-4 border-slate-900 bg-gradient-to-br from-amber-400 via-yellow-300 to-orange-400 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex flex-col items-center justify-center p-3 [backface-visibility:hidden]"
                          >
                            <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-900 flex items-center justify-center shadow-md mb-2 animate-pulse">
                              <span className="text-2xl font-black text-orange-500">❓</span>
                            </div>
                            <span className="text-xs font-black text-slate-950 tracking-wider">
                              幸運得主
                            </span>
                            <span className="text-[10px] font-black text-orange-950/70 mt-1">
                              即將震撼揭曉
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Footer controls: fade in after reveal */}
        <div className="bg-orange-100 p-5 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <span className="text-xs text-orange-900 font-extrabold text-center sm:text-left">
            ✨ {step !== 'revealed' ? '正在為課堂進行隨機抽選，請耐心等候！' : `恭喜這 ${students.length} 位同學幸運登台！可以進行加分獎勵喔！`}
          </span>

          {step === 'revealed' && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-2 w-full sm:w-auto"
            >
              {/* Award them directly */}
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

              {/* Multi Select Score config */}
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
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
