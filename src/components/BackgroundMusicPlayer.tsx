import React, { useState, useEffect, useRef } from 'react';
import { Music, Play, Pause, Volume2, VolumeX, X, ChevronRight, Sparkles, AlertCircle } from 'lucide-react';

interface Track {
  id: string;
  name: string;
  desc: string;
  url: string | 'synth'; // 'synth' means procedural web audio
}

export default function BackgroundMusicPlayer(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.35); // Initial volume 35%
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // HTML Audio element ref for MP3 tracks
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Web Audio Context reference for procedural synthesizer
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const synthNodesRef = useRef<AudioNode[]>([]);

  // Track list
  const tracks: Track[] = [
    {
      id: 'synth-lofi',
      name: '✨ 暖意 Lo-Fi 鋼琴旋律 (合成)',
      desc: '100% 離線免音檔，由 Web Audio 即時演奏暖冬爵士和弦',
      url: 'synth',
    },
    {
      id: 'helix-1',
      name: '☕️ Cozy Study Afternoon',
      desc: '溫暖輕柔的爵士木吉他與爵士鼓旋律伴奏',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
      id: 'helix-2',
      name: '🎒 Classroom Focus Beats',
      desc: '中速輕快且穩定的節奏，適合分組做作業與討論',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    },
    {
      id: 'helix-3',
      name: '🌲 Forest & Nature Calm',
      desc: '純淨白噪音與大自然溪流、小鳥鳴叫環境音律',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    },
  ];

  const currentTrack = tracks[currentTrackIndex];

  // Initialize HTML Audio element
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audioRef.current = audio;

    // Standard event handlers
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => {
      setIsLoading(false);
      setErrorMsg(null);
    };
    const handlePlayErr = (e: any) => {
      console.warn('Audio playback error or interrupted: ', e);
      setIsLoading(false);
    };

    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handlePlayErr);

    return () => {
      audio.pause();
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handlePlayErr);
      audioRef.current = null;
    };
  }, []);

  // Update volume of HTML Audio when state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Clean up all active synthesizers on unmount
  useEffect(() => {
    return () => {
      stopProceduralSynth();
    };
  }, []);

  // Procedural Lo-Fi Synthesizer logic
  const startProceduralSynth = () => {
    try {
      stopProceduralSynth();

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Define Chord progress (each row contains frequencies of 4 notes)
      // Cmaj7 (C3, E3, G3, B3) -> Am9 (A2, C3, E3, G3) -> Dm7 (D3, F3, A3, C4) -> G11 (G2, B3, D3, F3)
      const chords = [
        [130.81, 164.81, 196.00, 246.94], // C3, E3, G3, B3
        [110.00, 130.81, 164.81, 196.00], // A2, C3, E3, G3
        [146.83, 174.61, 220.00, 261.63], // D3, F3, A3, C4
        [98.00,  246.94, 146.83, 174.61], // G2, B3, D3, F3
      ];

      let chordIndex = 0;

      // Low pass filter to make the sound muffled and retro-warm (lo-fi vibe)
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, ctx.currentTime);
      filter.Q.setValueAtTime(1, ctx.currentTime);

      // Master gain node
      const masterGain = ctx.createGain();
      const targetVolume = isMuted ? 0 : volume * 0.12; // Synthesizer naturally louder, scale it down
      masterGain.gain.setValueAtTime(targetVolume, ctx.currentTime);

      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      const playNextChord = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'suspended') return;

        const now = ctx.currentTime;
        const currentChordNotes = chords[chordIndex];
        
        // Advance chord index
        chordIndex = (chordIndex + 1) % chords.length;

        // Play each note with a soft Rhodes-like envelope
        currentChordNotes.forEach((freq, idx) => {
          // Main warm sine wave generator
          const osc1 = ctx.createOscillator();
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(freq, now);

          // Subtle harmonics (triangle wave)
          const osc2 = ctx.createOscillator();
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(freq * 1.5, now);

          // Custom note volume envelope for nice soft fade in and progressive slow release
          const noteGain = ctx.createGain();
          const startVol = 0.001;
          const maxVol = 0.15; // individual oscillator scale
          
          noteGain.gain.setValueAtTime(startVol, now);
          // Slow attack (0.6 seconds)
          noteGain.gain.exponentialRampToValueAtTime(maxVol, now + 0.6 + (idx * 0.05));
          // Sustain and slow decay (3.5 seconds)
          noteGain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

          osc1.connect(noteGain);
          osc2.connect(noteGain);
          noteGain.connect(filter);

          osc1.start(now);
          osc2.start(now);

          // Stop notes after they fully decay
          osc1.stop(now + 4.0);
          osc2.stop(now + 4.0);

          synthNodesRef.current.push(osc1, osc2, noteGain);
        });

        // Soft, calming crackle dust noise tick
        const tickOsc = ctx.createOscillator();
        const tickGain = ctx.createGain();
        tickOsc.type = 'triangle';
        tickOsc.frequency.setValueAtTime(45, now);
        tickGain.gain.setValueAtTime(0.008, now);
        tickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        tickOsc.connect(tickGain);
        tickGain.connect(masterGain);
        tickOsc.start(now);
        tickOsc.stop(now + 0.1);
        synthNodesRef.current.push(tickOsc, tickGain);
      };

      // Play immediately of start
      playNextChord();

      // Set schedule interval for every 4 seconds
      const timer = setInterval(() => {
        playNextChord();
      }, 4000);

      synthIntervalRef.current = timer;
    } catch (e) {
      console.warn('Failed to start procedural synthesizer: ', e);
    }
  };

  const stopProceduralSynth = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }

    // Try to safely stop any ongoing scheduled nodes
    synthNodesRef.current.forEach((node) => {
      try {
        if ('stop' in node) {
          (node as any).stop();
        }
      } catch (e) {
        // Already stopped or finished
      }
    });
    synthNodesRef.current = [];

    if (audioCtxRef.current) {
      try {
        if (audioCtxRef.current.state !== 'closed') {
          audioCtxRef.current.close();
        }
      } catch (e) {}
      audioCtxRef.current = null;
    }
  };

  // Switch tracks or toggle play state
  const handleTrackSelect = (index: number) => {
    setErrorMsg(null);
    setCurrentTrackIndex(index);

    const targetTrack = tracks[index];

    // If already playing, trigger instant transition
    if (isPlaying) {
      if (targetTrack.url === 'synth') {
        audioRef.current?.pause();
        startProceduralSynth();
      } else {
        stopProceduralSynth();
        if (audioRef.current) {
          audioRef.current.src = targetTrack.url;
          audioRef.current.load();
          audioRef.current.play().catch((err) => {
            setErrorMsg('無法加載因網路限制，請切換至「暖意合成」或重試');
            setIsPlaying(false);
          });
        }
      }
    }
  };

  const togglePlay = () => {
    setErrorMsg(null);
    
    // Resume context if browser blocked it
    if (currentTrack.url === 'synth' && audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    if (isPlaying) {
      // Pause
      if (currentTrack.url === 'synth') {
        stopProceduralSynth();
      } else {
        audioRef.current?.pause();
      }
      setIsPlaying(false);
    } else {
      // Play
      setIsPlaying(true);
      if (currentTrack.url === 'synth') {
        startProceduralSynth();
      } else {
        if (audioRef.current) {
          audioRef.current.src = currentTrack.url;
          audioRef.current.play().catch((err) => {
            console.warn('Playback block: ', err);
            setErrorMsg('播放受瀏覽器權限或網路限制，請先點按頁面任意處');
            setIsPlaying(false);
          });
        }
      }
    }
  };

  const handleNextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    handleTrackSelect(nextIdx);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVolume = parseFloat(e.target.value);
    setVolume(nextVolume);
    setIsMuted(false);

    // Dynamic adjustment if synth is playing
    if (audioCtxRef.current && currentTrack.url === 'synth') {
      // Restart synth with the new adjusted volume scale
      startProceduralSynth();
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-[99] select-none">
      {/* 1. COLLAPSED MINI CONTROLLER BUBBLE */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className={`w-14 h-14 rounded-full border-4 border-slate-905 bg-[#fffdeb] shadow-[4px_4px_0px_0px_#3f3935] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer relative group ${
            isPlaying ? 'animate-pulse' : ''
          }`}
          title="開啟課堂音樂播放器 🎵"
        >
          <Music className={`w-6 h-6 text-purple-650 transition-transform ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
          
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
            </span>
          )}

          {/* Tooltip hover */}
          <span className="absolute left-16 scale-0 group-hover:scale-100 transition-all duration-150 origin-left bg-slate-900 text-white font-black text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-md">
            {isPlaying ? `播放中: ${currentTrack.name.substring(0, 8)}...` : '課堂輕柔音樂 🎚️'}
          </span>
        </button>
      ) : (
        /* 2. EXPANDED BEAUTIFUL CRAYON BOX CONTROLLER */
        <div className="w-72 bg-white border-4 border-slate-900 rounded-[24px] p-4 shadow-[5px_5px_0px_0px_#1e293b] flex flex-col relative animate-cute-pop bg-gradient-to-br from-[#fffefc] to-[#FAF5FF]">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 border-b-2 border-dashed border-purple-200">
            <div className="flex items-center space-x-1.5 text-purple-950 font-black text-sm">
              <Sparkles className="w-4 h-4 text-purple-500 animate-spin" style={{ animationDuration: '6s' }} />
              <span>課堂安靜背景音</span>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg active:scale-90 transition-all cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[3px]" />
            </button>
          </div>

          {/* Current track details */}
          <div className="py-3">
            <div className={`text-xs font-black p-2 rounded-xl transition-all ${isPlaying ? 'bg-purple-100/60 text-purple-950 border border-purple-300' : 'bg-slate-50 text-slate-600 border border-slate-205'}`}>
              <div className="flex items-center space-x-1 truncate font-bold">
                <span className="animate-bounce">🎵</span>
                <span className="truncate">{currentTrack.name}</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1 leading-relaxed font-semibold">
                {currentTrack.desc}
              </p>
            </div>
          </div>

          {/* Quick error state badge */}
          {errorMsg && (
            <div className="mb-2 text-[10px] font-black text-rose-600 bg-rose-50 p-2 rounded-xl border border-rose-200 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Track Selection lists */}
          <div className="space-y-1 max-h-24 overflow-y-auto pr-1 border border-slate-100 rounded-xl bg-slate-50/50 p-1.5 mb-3 select-none">
            {tracks.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => handleTrackSelect(idx)}
                className={`w-full text-left font-black text-[10px] sm:text-xs px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer flex justify-between items-center ${
                  currentTrackIndex === idx
                    ? 'bg-[#a855f7] text-white'
                    : 'text-slate-700 hover:bg-purple-100/50'
                }`}
              >
                <span className="truncate">{t.name}</span>
                {currentTrackIndex === idx && <span className="text-[9px] animate-pulse">● PLAYING</span>}
              </button>
            ))}
          </div>

          {/* Bottom control row */}
          <div className="flex items-center justify-between gap-3">
            
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className={`w-12 h-12 rounded-xl border-3 border-slate-900 shadow-[2px_2px_0px_0px_#1e293b] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                isPlaying 
                  ? 'bg-rose-500 text-white hover:bg-rose-600' 
                  : 'bg-emerald-500 text-white hover:bg-emerald-600'
              }`}
            >
              {isLoading ? (
                <span className="animate-pulse font-mono text-[10px]">載入中</span>
              ) : isPlaying ? (
                <Pause className="w-5 h-5 fill-white" />
              ) : (
                <Play className="w-5 h-5 fill-white ml-0.5" />
              )}
            </button>

            {/* Next song skip controller */}
            <button
              onClick={handleNextTrack}
              className="w-8 h-8 rounded-lg bg-white hover:bg-purple-50 border-2 border-slate-900 text-slate-700 transition-all flex items-center justify-center shrink-0 cursor-pointer"
              title="下一首"
            >
              <ChevronRight className="w-4 h-4 stroke-[3px]" />
            </button>

            {/* Volume control block */}
            <div className="flex items-center space-x-1.5 flex-grow min-w-0">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-slate-500 hover:text-purple-700 shrink-0 cursor-pointer"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full accent-purple-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
              />
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
