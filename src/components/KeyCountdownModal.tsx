import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Check, X, ShieldAlert, Award, Smile, Sparkles } from 'lucide-react';

interface KeyCountdownModalProps {
  type: 'quiet' | 'ready';
  onConfirmCount: () => void;
  onClose: () => void;
}

// Specialized Web Audio synthesizer for premium sound effects
function playWebAudioSfx(type: 'tick' | 'success' | 'sad') {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    if (type === 'tick') {
      // Clean woodblock tick
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.11);
    } else if (type === 'success') {
      // Arpeggio chord sweep (C major pentatonic rise)
      const freqs = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50]; // C5 to C6
      freqs.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + index * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.08 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + index * 0.08);
        osc.stop(ctx.currentTime + index * 0.08 + 0.42);
      });
    } else if (type === 'sad') {
      // Crying slide down buzzer
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';
      
      osc1.frequency.setValueAtTime(180, ctx.currentTime);
      osc2.frequency.setValueAtTime(184, ctx.currentTime); // detuned
      
      osc1.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.6);
      osc2.frequency.linearRampToValueAtTime(112, ctx.currentTime + 0.6);
      
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      
      osc1.start();
      osc2.start();
      
      osc1.stop(ctx.currentTime + 0.62);
      osc2.stop(ctx.currentTime + 0.62);
    }
  } catch (err) {
    console.warn('Audio context blocked or failed', err);
  }
}

export default function KeyCountdownModal({ type, onConfirmCount, onClose }: KeyCountdownModalProps) {
  // Configured seconds limit according to key Q (3s) and Key C (7s)
  const initialSeconds = type === 'quiet' ? 3 : 7;
  const [seconds, setSeconds] = useState(initialSeconds);
  const [phase, setPhase] = useState<'counting' | 'question' | 'yes_celebration' | 'no_sad'>('counting');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Floating bubbles state for positive feedback
  const [bubbles, setBubbles] = useState<{ id: number; style: React.CSSProperties; color: string; content: string }[]>([]);

  // Trigger sound effect on tick
  useEffect(() => {
    if (phase === 'counting') {
      if (soundEnabled) {
        playWebAudioSfx('tick');
      }
      if (seconds === 0) {
        setPhase('question');
      } else {
        const timer = setTimeout(() => {
          setSeconds((prev) => prev - 1);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [seconds, phase]);

  // Action for NO automatic close
  useEffect(() => {
    if (phase === 'no_sad') {
      if (soundEnabled) {
        playWebAudioSfx('sad');
      }
      const autoCloseTimer = setTimeout(() => {
        onClose();
      }, 2500);
      return () => clearTimeout(autoCloseTimer);
    }
  }, [phase]);

  // Action for YES celebration bubbles
  useEffect(() => {
    if (phase === 'yes_celebration') {
      if (soundEnabled) {
        playWebAudioSfx('success');
      }
      
      // Populate colorful confetti bubble list
      const bubbleItems = Array.from({ length: 28 }).map((_, i) => {
        const leftVal = Math.random() * 95;
        const speedVal = 1.8 + Math.random() * 2.5;
        const delayVal = Math.random() * 1.5;
        const sizeVal = 20 + Math.random() * 55;
        const colors = [
          'rgba(244,143,177,0.8)', // pink
          'rgba(129,212,250,0.8)', // cyan
          'rgba(165,214,167,0.8)', // green
          'rgba(255,224,130,0.8)', // amber
          'rgba(179,157,219,0.8)', // purple
          'rgba(255,171,145,0.8)'  // coral
        ];
        const emojis = ['🎈', '⭐️', '🍬', '🌸', '✨', '👍', '🐱', '🐣'];
        return {
          id: i,
          color: colors[i % colors.length],
          content: emojis[i % emojis.length],
          style: {
            left: `${leftVal}%`,
            width: `${sizeVal}px`,
            height: `${sizeVal}px`,
            fontSize: `${sizeVal * 0.45}px`,
            animationDelay: `${delayVal}s`,
            animationDuration: `${speedVal}s`,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
            backdropFilter: 'blur(2px)',
          }
        };
      });
      setBubbles(bubbleItems);
    }
  }, [phase]);

  const handleYes = () => {
    onConfirmCount();
    setPhase('yes_celebration');
  };

  const handleNo = () => {
    setPhase('no_sad');
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md select-none">
      
      {/* Dynamic float bubbles container */}
      {phase === 'yes_celebration' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-[1100]">
          {bubbles.map((b) => (
            <div
              key={b.id}
              className="absolute bottom-0 rounded-full flex items-center justify-center animate-float-bubble pointer-events-none"
              style={{
                ...b.style,
                backgroundColor: b.color,
                border: '2px solid rgba(255,255,255,0.4)',
              }}
            >
              <span className="drop-shadow">{b.content}</span>
            </div>
          ))}
        </div>
      )}

      {/* Main dialog card box with crayon board borders */}
      <div className="relative w-full max-w-lg bg-[#fffdf9] border-4 border-slate-900 rounded-[36px] p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-slate-800 transform scale-100 transition-all z-[1200] overflow-hidden animate-cute-pop">
        
        {/* Decorative corner stars */}
        <div className="absolute top-4 left-4 text-pink-300 text-xl font-black">★</div>
        <div className="absolute bottom-4 right-4 text-emerald-300 text-xl font-black">★</div>

        {/* Header toolbar with sound toggle and exit */}
        <div className="flex justify-between items-center mb-6 border-b-2 border-dashed border-slate-200 pb-3">
          <div className="flex items-center space-x-2">
            <span className="flex h-3.5 w-3.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-pink-500"></span>
            </span>
            <span className="text-xs font-black text-slate-500 tracking-wider">
              {type === 'quiet' ? 'STRICT QUIET MODE 🤫' : 'GET READY FOR LESSON 🎒'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 rounded-lg border-2 border-slate-300 hover:border-slate-800 bg-white shadow-sm hover:bg-slate-50 transition cursor-pointer"
              title={soundEnabled ? "關閉音效" : "啟用音效"}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-600 font-bold" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border-2 border-slate-300 hover:border-slate-800 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition cursor-pointer"
              title="關閉"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PHASE 1: Counting down state */}
        {phase === 'counting' && (
          <div className="text-center py-6 space-y-6 flex flex-col items-center">
            
            {/* Conditional sticker rendering based on mode */}
            {type === 'quiet' ? (
              <div className="relative">
                <div className="text-6xl sm:text-7xl animate-bounce duration-1000 select-none">
                  🤫💤
                </div>
                {/* Visual shadow effect for 3D depth */}
                <div className="w-20 h-2 bg-slate-200/60 rounded-full mx-auto mt-2 blur-[1.5px]" />
              </div>
            ) : (
              <div className="relative flex flex-col items-center select-none">
                {/* Center stage huge sticker element */}
                <div className="bg-amber-100 border-4 border-dashed border-amber-400 w-36 h-36 rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(245,158,11,0.3)] animate-pulse">
                  <span className="text-6xl sm:text-7xl filter drop-shadow">😆📣</span>
                </div>
                {/* Wave decor under the speaker */}
                <span className="text-[10px] bg-amber-200 text-amber-800 font-black px-2.5 py-0.5 rounded-full mt-3">
                  喇叭廣播：請回座準備
                </span>
              </div>
            )}

            {/* Gorgeous text message */}
            <div className="space-y-1 px-4">
              <h2 className="text-lg sm:text-2xl font-black text-slate-800 leading-tight">
                {type === 'quiet' 
                  ? '安靜倒數中！Quiet Please...' 
                  : '請準備上課！ Please get yourself ready for class!'}
              </h2>
              <p className="text-xs sm:text-sm font-bold text-slate-500">
                {type === 'quiet' 
                  ? '倒數結束後，回答問題幫全班加分' 
                  : '快快回到座位上坐好，大獎等著大家喔！'}
              </p>
            </div>

            {/* Giant countdown timer numbers */}
            <div className="relative w-40 h-40 flex items-center justify-center bg-white border-4 border-slate-900 rounded-full shadow-[4px_4px_0px_0px_rgba(30,41,59,1)]">
              <span className="font-playful font-black text-7xl sm:text-8xl text-pink-500 animate-ping absolute leading-none">
                {seconds}
              </span>
              <span className="font-playful font-black text-7xl sm:text-8xl text-indigo-600 relative leading-none">
                {seconds}
              </span>
            </div>
            
          </div>
        )}

        {/* PHASE 2: Ask the teacher if they are quiet / ready */}
        {phase === 'question' && (
          <div className="text-center py-4 space-y-6 animate-slide-up-dialog">
            <div className="text-7xl animate-pulse">
              {type === 'quiet' ? '🤔❓' : '🙋‍♂️🎒'}
            </div>

            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-black text-[#ca4d39] leading-snug px-3">
                {type === 'quiet' 
                  ? '全班都安靜了嗎？' 
                  : '全班都準備好了嗎？'}
              </h1>
              <p className="text-sm font-extrabold text-indigo-700 tracking-wide">
                {type === 'quiet' 
                  ? 'Is everyone quiet now?' 
                  : 'Is everyone ready now?'}
              </p>
            </div>

            {/* Premium, cute hand-drawn choice buttons */}
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto pt-2">
              {/* YES BUTTON (Adds points) */}
              <button
                onClick={handleYes}
                className="group relative bg-[#10b981] hover:bg-[#059669] border-4 border-slate-900 text-white rounded-2xl py-3.5 px-4 font-black text-base shadow-[4.5px_4.5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2.5px] hover:translate-y-[2.5px] duration-100 flex flex-col items-center cursor-pointer"
              >
                <span className="text-xs font-black text-emerald-100 group-hover:scale-105 duration-150">YES</span>
                <span className="text-sm font-bold flex items-center space-x-1">
                  <Check className="w-5 h-5 stroke-[3px]" />
                  <span>全部準備好！</span>
                </span>
                <span className="absolute -top-3 -right-3 rotate-12 bg-[#ffe082] border-2 border-slate-900 text-slate-800 text-[10px] font-black px-1.5 py-0.5 rounded-lg group-hover:scale-110 duration-150">
                  全班+2分! 🏅
                </span>
              </button>

              {/* NO BUTTON (Closes / Does not add points) */}
              <button
                onClick={handleNo}
                className="group bg-[#f43f5e] hover:bg-[#e11d48] border-4 border-slate-900 text-white rounded-2xl py-3.5 px-4 font-black text-base shadow-[4.5px_4.5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2.5px] hover:translate-y-[2.5px] duration-100 flex flex-col items-center cursor-pointer"
              >
                <span className="text-xs font-black text-rose-100">NO</span>
                <span className="text-sm font-bold flex items-center space-x-1">
                  <X className="w-5 h-5 stroke-[3px]" />
                  <span>還有加油空間</span>
                </span>
              </button>
            </div>
          </div>
        )}

        {/* PHASE 3: YES celebration splash */}
        {phase === 'yes_celebration' && (
          <div className="text-center py-6 space-y-6">
            <div className="relative">
              <span className="text-7xl block animate-bounce duration-500">🏆🌟</span>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 text-2xl animate-ping opacity-60">✨</div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-[#10b981] leading-tight">
                🏆 大成功！全班點數獎勵！
              </h2>
              <p className="text-base font-extrabold text-[#ca4d39] bg-yellow-100/70 border-2 border-dashed border-yellow-300 rounded-xl py-2 px-3 mx-4 leading-relaxed">
                全班每位學生皆獲得 <b className="text-xl">+2</b> 分與可愛星星標章！
              </p>
              <p className="text-xs font-black text-slate-400 mt-2">
                （評分已成功自動批次登記於每位學生的歷程卡片內）
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="relative bg-slate-900 hover:bg-slate-800 text-white border-2 border-slate-900 rounded-2xl w-full py-3.5 font-black text-sm shadow-[4px_4px_0px_0px_rgba(16,185,129,1)] transition-transform hover:scale-102 active:scale-98 duration-100 cursor-pointer"
              >
                好的，太開心了！ 🌸
              </button>
            </div>
          </div>
        )}

        {/* PHASE 4: NO sad visual outcome */}
        {phase === 'no_sad' && (
          <div className="text-center py-6 space-y-5 select-none relative">
            <div className="text-7xl animate-sad-shake inline-block">
              😢😿
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-700">
                太可惜了！What a pity😢
              </h2>
              <p className="text-xs sm:text-sm font-bold text-slate-400">
                沒關係，下一次一定會做得更好，大家加油！
              </p>
            </div>

            {/* Hand-drawn manual close button inside sad screen */}
            <div className="pt-2 max-w-xs mx-auto">
              <button
                onClick={onClose}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 rounded-xl text-xs font-black text-slate-600 transition cursor-pointer"
              >
                關閉 (Dismiss)
              </button>
            </div>

            {/* Auto-closing bar progress decorator */}
            <div className="absolute bottom-[-24px] left-[-24px] right-[-24px] h-2 bg-rose-100 overflow-hidden">
              <div className="h-full bg-rose-500 animate-progress-deplete" />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
