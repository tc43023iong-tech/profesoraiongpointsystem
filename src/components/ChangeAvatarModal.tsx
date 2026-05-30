import React, { useState, useMemo } from 'react';
import { Student } from '../types';
import { X, Search, Shuffle, Sparkles, Smile, Upload, Image, HelpCircle, Heart } from 'lucide-react';
import { FRIEND_STICKERS, getPokemonAvatarUrl } from '../studentsData';

// Reference newly generated high-quality cute painter illustrations as static paths
const cuteAngelCat = '/src/assets/images/cute_angel_cat_1780146111898.png';
const cuteHatDuck = '/src/assets/images/cute_hat_duck_1780146130966.png';

interface ChangeAvatarModalProps {
  student: Student;
  onSelectAvatar: (url: string, pokemonId?: number) => void;
  onClose: () => void;
}

interface GenTab {
  id: string;
  name: string;
  start: number;
  end: number;
}

const GENERATIONS: GenTab[] = [
  { id: 'gen1', name: 'Gen 1', start: 1, end: 151 },
  { id: 'gen2', name: 'Gen 2', start: 152, end: 251 },
  { id: 'gen3', name: 'Gen 3', start: 252, end: 386 },
  { id: 'gen4', name: 'Gen 4', start: 387, end: 493 },
  { id: 'gen5', name: 'Gen 5', start: 494, end: 649 },
  { id: 'gen6', name: 'Gen 6', start: 650, end: 721 },
  { id: 'gen7', name: 'Gen 7', start: 722, end: 809 },
  { id: 'gen8', name: 'Gen 8', start: 810, end: 898 },
  { id: 'gen9', name: 'Gen 9+', start: 899, end: 1010 },
];

export default function ChangeAvatarModal({ student, onSelectAvatar, onClose }: ChangeAvatarModalProps) {
  const [activeTab, setActiveTab] = useState<string>('cute'); // Default to our cute custom tab for instant user review!
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customPokeId, setCustomPokeId] = useState<string>('');

  // Persistent user-uploaded avatars list via localStorage so they can re-select files
  const [uploadedAvatars, setUploadedAvatars] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('custom_cute_uploaded_avatars') || '[]');
    } catch {
      return [];
    }
  });

  const [dragActive, setDragActive] = useState(false);

  // Helper to handle and scale drag & drop image uploads
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('請務必上傳有效的圖片檔案（PNG 或 JPG/JPEG）！');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target?.result as string;
      if (base64Data) {
        // Prepend to uploadedAvatars list to stay on top
        const updatedList = [base64Data, ...uploadedAvatars.filter(url => url !== base64Data)].slice(0, 36);
        setUploadedAvatars(updatedList);
        localStorage.setItem('custom_cute_uploaded_avatars', JSON.stringify(updatedList));
        // Select immediately
        onSelectAvatar(base64Data, undefined);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const deleteUploadedAvatar = (urlToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedList = uploadedAvatars.filter(url => url !== urlToDelete);
    setUploadedAvatars(updatedList);
    localStorage.setItem('custom_cute_uploaded_avatars', JSON.stringify(updatedList));
  };

  // Generate Pokemon list for active tab
  const tabPokemonList = useMemo(() => {
    const currentGen = GENERATIONS.find((g) => g.id === activeTab);
    if (!currentGen) return [];
    
    // To prevent browser crashes, we list the first 64 Pokemon of each generation, 
    // but if the user searches or enters numbers, they can get any Pokemon!
    const list = [];
    const limit = Math.min(currentGen.start + 63, currentGen.end);
    for (let i = currentGen.start; i <= limit; i++) {
      list.push(i);
    }
    return list;
  }, [activeTab]);

  // Curated list of cute Emojis for "Emoji" tab (300+ ultra-cute icons!)
  const EMOJI_LIST = useMemo(() => {
    return [
      // 1. Faces/Smiles & Gestures (70)
      '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '🫠', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '☺️', '😚', '😙', '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🫣', '🤭', '🤫', '🤔', '🫨', '🤐', '🤨', '😐', '😑', '😶', '🫥', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '🥸', '😎', '🤓', '🧐', '😭', '🥺',
      // 2. Cute Animals & Magical Beasts (80)
      '🐱', '🐶', '🦊', '🦁', '🐯', '🐼', '🐨', '🐻', '🐹', '🐰', '🐸', '🐙', '🐵', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🪱', '🐛', '🐌', '🐞', '🐜', '🪰', '🪲', '🪳', '🦟', '🦗', '🕷️', '🕸️', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐳', '🐬', '🐋', '🐟', '🐠', '🐡', '鯊', '🐚', '🪼', '🦀', '🦞', '🦐', '🦑', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🐃', '🐄', '🐎', '🐖', '🐏', '🐑', '🐐', '🦌', '🐕', '🐩', '🐈', '🐓', '🦃',
      // 3. Delicacies, Fruits & Desserts (70)
      '🍉', '🍓', '🍒', '🍊', '🍎', '🍏', '🍐', '🍋', '🍌', '🍇', '🫐', '🍈', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🫑', '🥑', '🍆', '🥔', '🥕', '🌽', '🌶️', '🥞', '🧇', '🧀', '🍖', '🍗', '🥩', '🥓', '🍔', '🍟', '🍕', '🌭', '🥪', '🌮', '🌯', '🥚', '🍳', '🥘', '🍲', '🍿', '🧂', '🍱', '🍘', '🍙', '🍚', '🍛', '🍜', '🍝', '🍠', '🍢', '🍣', '🍤', '🍥', '🍡', '🥟', '🍧', '🍨', '🍦', '🍰', '🧁', '🥧', '🍫', '🍬', '🍭', '🍮', '🍯',
      // 4. Beverages & Refreshing Treats (20)
      '🍼', '🥛', '☕', '🍵', '🥤', '🧋', '🧃', '🧉', '🍶', '🍺', '🍻', '🥂', '🍾', '🍷', '🥃', '🍸', '🍹', '🍽️', '🥄', '🥣',
      // 5. Play, Sports, Magic & School Badges (40)
      '👾', '🤖', '👻', '💀', '☠️', '💩', '🤡', '👹', '👺', '🎃', '🛸', '🪐', '⭐', '🌟', '⚡', '🌀', '🌈', '☃️', '🎈', '🎉', '🎊', '🪄', '🎨', '🎭', '🎯', '🎪', '🎒', '👑', '🧣', '🧤', '🧥', '🪡', '🧵', '🧶', '🏆', '🥇', '🥈', '🥉', '🏅', '🎖️',
      // 6. Glowing Hearts & Star Sparkles (20)
      '💖', '💗', '💓', '💞', '💕', '❣', '💔', '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '🔮', '💯', '🔥', '✨'
    ];
  }, []);

  // Handle setting a custom card ID
  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const idNum = parseInt(customPokeId, 10);
    if (idNum > 0 && idNum <= 1025) {
      const url = getPokemonAvatarUrl(idNum);
      onSelectAvatar(url, idNum);
    } else {
      alert('請輸入 1 至 1025 之間的精靈編號！');
    }
  };

  // Randomized selection from Pokémon list or Friends list
  const handleRandomize = () => {
    const randomType = Math.random() > 0.3; // 70% chance of Pokemon, 30% of Cute Friend
    if (randomType) {
      const randomPokeId = Math.floor(Math.random() * 850) + 1;
      const url = getPokemonAvatarUrl(randomPokeId);
      onSelectAvatar(url, randomPokeId);
    } else {
      const randomFriend = FRIEND_STICKERS[Math.floor(Math.random() * FRIEND_STICKERS.length)];
      onSelectAvatar(randomFriend.url, undefined);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      {/* Playful Card Container - Styled cohesively with warm cream & thick outline */}
      <div 
        className="relative bg-[#fffdf9] border-6 border-slate-900 rounded-[38px] shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] w-full max-w-4xl overflow-hidden animate-cute-pop flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Area - Fresh Ocean Blue and Turquoise */}
        <div className="bg-[#eb725a] border-b-6 border-slate-900 px-6 py-4.5 flex justify-between items-center text-white">
          <div className="flex items-center space-x-2.5">
            <span className="text-3xl filter drop-shadow">🎨</span>
            <div>
              <h2 className="text-2xl font-black tracking-wider font-heading text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)] select-none">
                幫 {student.name} 換個新樣子！
              </h2>
              <p className="text-[10px] uppercase font-black tracking-widest text-rose-100 font-mono">
                Crayon Art Gallery • Choose Your Partner
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white hover:bg-rose-50 text-rose-600 border-3 border-slate-900 rounded-full shadow-[2.5px_2.5px_0px_0px_rgba(30,41,59,1)] hover:scale-105 active:scale-90 transition duration-150 cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[3.5px]" />
          </button>
        </div>

        {/* Subheader Banner - Chalkboard Ivory Informer */}
        <div className="bg-[#fffbeb] border-b-4 border-dashed border-amber-200 px-6 py-3 flex flex-wrap gap-4 items-center justify-between text-xs text-amber-900 font-bold">
          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
            <span>目前樣子：</span>
            <span className="bg-amber-500 text-slate-900 rounded-full px-3 py-1 text-xs font-black border-2 border-slate-900 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,0.15)] flex items-center gap-0.5">
              🚀 {student.pokemonId ? `#${student.pokemonId}` : '自訂精靈'}
            </span>
            <span className="ml-2 text-amber-700/80 text-[11px] select-none">✨ 滑鼠懸浮特定頭像，即可放大觀賞預覽喔！</span>
          </div>

          {/* Quick Code search input */}
          <form onSubmit={handleCustomSubmit} className="flex items-center space-x-2">
            <span className="text-[11px] text-amber-800 font-extrabold">🔎 輸入精靈編號 (1-1025):</span>
            <input
              type="number"
              min="1"
              max="1025"
              placeholder="例如 25"
              value={customPokeId}
              onChange={(e) => setCustomPokeId(e.target.value)}
              className="w-20 bg-white border-2 border-slate-900 text-amber-955 rounded-xl px-2 py-1 text-center font-black focus:outline-none focus:ring-2 focus:ring-amber-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 border-2 border-slate-900 rounded-xl px-3.5 py-1 font-black shadow-[1.5px_1.5px_0px_0px_rgba(30,41,59,1)] active:scale-95 duration-100 cursor-pointer"
            >
              載入
            </button>
          </form>
        </div>

        {/* Categories Tab selector bar */}
        <div className="bg-white border-b-2 border-slate-100 px-4 py-3 flex items-center overflow-x-auto gap-1.5 scrollbar-thin">
          {GENERATIONS.map((gen) => (
            <button
              key={gen.id}
              onClick={() => {
                setActiveTab(gen.id);
                setSearchQuery('');
              }}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-black border-2 transition-all cursor-pointer ${
                activeTab === gen.id
                  ? 'bg-orange-500 text-white border-slate-905 shadow-[2px_2px_0px_0px_rgba(30,41,59,1)]'
                  : 'bg-orange-50/50 border-orange-100 hover:bg-orange-50 text-slate-700 hover:border-slate-300'
              }`}
            >
              {gen.name}
            </button>
          ))}

          {/* New Cute custom & presets tab */}
          <button
            onClick={() => {
              setActiveTab('cute');
              setSearchQuery('');
            }}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-black border-2 transition-all flex items-center space-x-1 cursor-pointer ${
              activeTab === 'cute'
                ? 'bg-semibold bg-pink-500 text-white border-slate-900 shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] hover:bg-pink-600'
                : 'bg-pink-50/50 border-pink-100 hover:bg-pink-55 text-pink-700 hover:border-slate-300'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current text-pink-500 group-hover:scale-110" />
            <span>Cute 萌物 🌸</span>
          </button>

          {/* Dedicated non-pokemon handdrawn tab */}
          <button
            onClick={() => {
              setActiveTab('friends');
              setSearchQuery('');
            }}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-black border-2 transition-all flex items-center space-x-1 cursor-pointer ${
              activeTab === 'friends'
                ? 'bg-emerald-500 text-white border-slate-905 shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] hover:bg-emerald-600'
                : 'bg-emerald-50/50 border-emerald-150 hover:bg-emerald-50 text-emerald-700 hover:border-slate-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Friends ✨</span>
          </button>

          {/* Cute emojis tab */}
          <button
            onClick={() => {
              setActiveTab('emoji');
              setSearchQuery('');
            }}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-black border-2 transition-all flex items-center space-x-1 cursor-pointer ${
              activeTab === 'emoji'
                ? 'bg-amber-400 text-slate-900 border-slate-905 shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] hover:bg-amber-500'
                : 'bg-amber-50 border-amber-100 hover:bg-amber-100 text-amber-700'
            }`}
          >
            <Smile className="w-3.5 h-3.5" />
            <span>Emoji 😊</span>
          </button>

          {/* Randomizer quick button */}
          <button
            onClick={handleRandomize}
            className="flex-shrink-0 ml-auto px-4 py-1.5 rounded-xl text-xs font-black border-2 border-slate-900 bg-sky-400 hover:bg-sky-500 text-slate-900 transition-all shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] flex items-center space-x-1 active:scale-95 cursor-pointer"
            title="隨機給予模樣"
          >
            <Shuffle className="w-3.5 h-3.5 stroke-[2.5px]" />
            <span>隨機發送</span>
          </button>
        </div>

        {/* Search Searchbar inside Modal */}
        <div className="p-4 bg-orange-50/10 flex border-b border-orange-100 items-center justify-between">
          <div className="relative flex-grow max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="在當前分頁搜尋特定精靈或代碼..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-slate-800"
            />
          </div>
          <span className="text-[10px] text-slate-400 font-extrabold select-none">
            MISS IONG'S ILLUSTRATIONS
          </span>
        </div>

        {/* The Giant grid of selections */}
        <div className="p-6 h-[420px] overflow-y-auto bg-[#fffdfb] border-b-2 border-slate-100">
          
          {/* Renders CUTE activeTab (Upload custom illustrations + Premium generated watercolor presets) */}
          {activeTab === 'cute' && (
            <div className="space-y-6 pb-4 animate-cute-pop select-none">
              
              {/* Premium-generated Chibi Watercolor Presets */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 border-b-2 border-dashed border-pink-200 pb-2">
                  <span className="text-xl">🎨</span>
                  <h3 className="text-sm sm:text-base font-black text-pink-700 font-heading">
                    手繪經典 Q 版頭像
                  </h3>
                  <span className="text-xs bg-pink-100 text-pink-600 font-black px-2 py-0.5 rounded-full">
                    點擊直接套用預設
                  </span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {/* Angel Cat Preset */}
                  <div
                    onClick={() => onSelectAvatar(cuteAngelCat, undefined)}
                    className="group bg-white border-2 border-slate-200 hover:border-pink-500 hover:ring-2 hover:ring-pink-200 rounded-3xl p-3 flex flex-col items-center cursor-pointer transition-all duration-150 shadow-sm hover:shadow-[3.5px_3.5px_0px_0px_rgba(30,41,59,1)] transform hover:-translate-y-1"
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center mb-2 p-1.5 relative">
                      <img
                        src={cuteAngelCat}
                        alt="愛心與雲朵小白貓"
                        referrerPolicy="no-referrer"
                        className="w-22 h-22 object-contain group-hover:scale-115 transition duration-150"
                      />
                    </div>
                    <span className="text-xs font-black text-slate-800 text-center leading-tight">
                      👼 天使白貓與雲朵
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 mt-1">
                      綿綿毛茸茸
                    </span>
                  </div>

                  {/* Cute Hat Duck Preset */}
                  <div
                    onClick={() => onSelectAvatar(cuteHatDuck, undefined)}
                    className="group bg-white border-2 border-slate-200 hover:border-pink-500 hover:ring-2 hover:ring-pink-200 rounded-3xl p-3 flex flex-col items-center cursor-pointer transition-all duration-150 shadow-sm hover:shadow-[3.5px_3.5px_0px_0px_rgba(30,41,59,1)] transform hover:-translate-y-1"
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center mb-2 p-1.5 relative">
                      <img
                        src={cuteHatDuck}
                        alt="元氣探險小黃鴨"
                        referrerPolicy="no-referrer"
                        className="w-22 h-22 object-contain group-hover:scale-115 transition duration-150"
                      />
                    </div>
                    <span className="text-xs font-black text-slate-800 text-center leading-tight">
                      🎒 元氣探險小黃鴨
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 mt-1">
                      可愛小足跡
                    </span>
                  </div>
                </div>
              </div>

              {/* TWO SECRETS: Custom drag-and-drop uploader & illustrated helper */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* File Drop Upload Box */}
                <div 
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`border-4 border-dashed rounded-3xl p-6 flex flex-col items-center justify-center text-center transition-all duration-150 ${
                    dragActive 
                      ? 'border-pink-500 bg-pink-50 font-black scale-[0.98]' 
                      : 'border-pink-200 bg-pink-50/10 hover:bg-pink-50/25'
                  }`}
                >
                  <Upload className={`w-10 h-10 mb-2 transition-transform duration-200 ${dragActive ? 'text-pink-500 animate-bounce' : 'text-pink-400'}`} />
                  <p className="text-xs font-black text-pink-800 mb-1">
                    拖曳你喜歡的任何圖片到這裡
                  </p>
                  <p className="text-[10px] font-extrabold text-[#ca4d39] mb-3">
                    或點選下方按鈕上傳 (PNG, JPG, WEBP)
                  </p>
                  <label className="bg-pink-500 hover:bg-pink-600 border-2 border-slate-900 text-white rounded-xl text-xs font-black px-4 py-2 cursor-pointer shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] hover:scale-105 active:scale-95 duration-100">
                    選擇電腦圖片檔案
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload} 
                      className="hidden" 
                    />
                  </label>
                </div>

                {/* Illustrated Guidance / Instructions card */}
                <div className="bg-amber-50/60 border-2 border-dashed border-amber-200 rounded-3xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-20 md:mb-2">
                      <HelpCircle className="w-5 h-5 text-amber-600" />
                      <h4 className="text-xs sm:text-sm font-black text-amber-900">
                        如何在此介面選擇與更換圖片？
                      </h4>
                    </div>
                    <ul className="space-y-2 text-[11px] text-amber-800/95 font-bold leading-relaxed">
                      <li className="flex items-start gap-1.5">
                        <span className="flex items-center justify-center w-4 h-4 bg-amber-200 text-amber-900 rounded-full font-mono text-[9px] font-black mt-0.5">1</span>
                        <span><b>上傳專屬圖片：</b>點擊左方粉色對話框「上傳電腦檔案」，或直接拖曳圖片（如在聊天室上放的貓咪或鴨子）進去！</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="flex items-center justify-center w-4 h-4 bg-amber-200 text-amber-900 rounded-full font-mono text-[9px] font-black mt-0.5">2</span>
                        <span><b>快速套用：</b>一旦上傳成功，當前選取的學生就會立刻換成該圖片！且下方的「自訂上傳庫」會留下方便重複點選。</span>
                      </li>
                    </ul>
                  </div>
                  <div className="text-[9.5px] text-amber-600/80 font-black mt-2 bg-white/70 rounded-lg p-1.5 border border-dashed border-amber-100">
                    💡 萬能提示：你可以直接從裝置儲存你給的可愛飛天小白貓與元氣小黃鴨，並點左側上傳，以後就能不限人數、隨時指派給班上任何學生當頭像了！
                  </div>
                </div>
              </div>

              {/* Uploaded Gallery shelf */}
              {uploadedAvatars.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between border-b border-pink-100 pb-1.5">
                    <span className="text-xs font-black text-pink-700 flex items-center gap-1">
                      <Image className="w-3.5 h-3.5" /> 已上傳的自訂圖片庫 (可重複點擊指派給不同學生)
                    </span>
                    <button 
                      onClick={() => {
                        if (confirm('確定要清空所有已上傳的自訂圖片嗎？')) {
                          setUploadedAvatars([]);
                          localStorage.removeItem('custom_cute_uploaded_avatars');
                        }
                      }}
                      className="text-[9.5px] text-[#ca4d39] font-black underline hover:text-red-700 cursor-pointer"
                    >
                      清空我的上傳
                    </button>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                    {uploadedAvatars.map((url, idx) => (
                      <div 
                        key={idx}
                        onClick={() => onSelectAvatar(url, undefined)}
                        className="group relative bg-white border-2 border-slate-200 hover:border-pink-500 hover:scale-105 duration-100 rounded-3xl p-1.5 flex flex-col items-center justify-center cursor-pointer shadow-sm hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]"
                      >
                        <div className="w-14 h-14 overflow-hidden rounded-2xl flex items-center justify-center bg-slate-50">
                          <img 
                            src={url} 
                            alt={`Uploaded index ${idx}`}
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 object-cover"
                          />
                        </div>
                        <button 
                          onClick={(e) => deleteUploadedAvatar(url, e)}
                          className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-4.5 h-4.5 flex items-center justify-center text-[9px] font-black border-2 border-slate-900 shadow hover:bg-red-600 hover:scale-110"
                          title="刪除此圖片"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Renders standard Pokémon lists */}
          {activeTab !== 'friends' && activeTab !== 'emoji' && activeTab !== 'cute' && (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 sm:gap-4 pb-2">
              {tabPokemonList
                .filter((p) => {
                  if (!searchQuery) return true;
                  return p.toString().includes(searchQuery);
                })
                .map((id) => {
                  const url = getPokemonAvatarUrl(id);
                  return (
                    <div
                      key={id}
                      onClick={() => onSelectAvatar(url, id)}
                      className="group relative bg-white border-2 border-slate-200 hover:border-orange-500 hover:ring-2 hover:ring-orange-300 rounded-2xl p-2 flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-150 transform hover:-translate-y-0.5 shadow-sm hover:shadow-[3px_3px_0px_0px_rgba(30,41,59,1)] overflow-hidden"
                    >
                      <span className="text-[9px] font-mono font-black text-slate-400 self-start">
                        #{id}
                      </span>
                      <img
                        src={url}
                        alt={`Pokemon ${id}`}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 object-contain group-hover:scale-125 transition-transform duration-200"
                        loading="lazy"
                        onError={(e) => {
                          const src = getPokemonAvatarUrl(id);
                          (e.target as HTMLImageElement).src = src;
                        }}
                      />
                    </div>
                  );
                })}
            </div>
          )}

          {/* Renders Friends (illustrations) tab grouped by beautiful themes */}
          {activeTab === 'friends' && (
            <div className="space-y-8 pb-4">
              {Array.from(new Set(FRIEND_STICKERS.map((f) => f.category))).map((category) => {
                const filtered = FRIEND_STICKERS.filter(
                  (f) =>
                    f.category === category &&
                    f.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
                if (filtered.length === 0) return null;
                return (
                  <div key={category} className="space-y-4 animate-fade-in">
                    <div className="flex items-center space-x-2 border-b-2 border-dashed border-emerald-200 pb-2">
                      <span className="text-lg">✨</span>
                      <h3 className="text-sm sm:text-base font-black text-emerald-800 font-heading">
                        {category}
                      </h3>
                      <span className="text-xs bg-emerald-100 text-emerald-700 font-black px-2 py-0.5 rounded-full font-mono">
                        {filtered.length} 個角色
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                      {filtered.map((sticker, idx) => (
                        <div
                          key={idx}
                          onClick={() => onSelectAvatar(sticker.url, undefined)}
                          className="group bg-white border-2 border-slate-200 hover:border-emerald-500 hover:ring-2 hover:ring-emerald-250 rounded-3xl p-3 flex flex-col items-center cursor-pointer transition-all duration-150 shadow-sm hover:shadow-[3.5px_3.5px_0px_0px_rgba(30,41,59,1)] transform hover:-translate-y-1"
                        >
                          <div className="w-18 h-18 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center mb-2 p-1 relative">
                            <img
                              src={sticker.url}
                              alt={sticker.name}
                              referrerPolicy="no-referrer"
                              className="w-16 h-16 object-contain group-hover:scale-115 transition duration-150"
                            />
                          </div>
                          <span className="text-[10px] font-black text-slate-700 line-clamp-2 max-w-full text-center leading-tight">
                            {sticker.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Renders cute Emojis */}
          {activeTab === 'emoji' && (
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-3 pb-2">
              {EMOJI_LIST
                .filter((emoji) => searchQuery ? emoji === searchQuery : true)
                .map((emoji, idx) => {
                  const customSelectUrl = `https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u${emoji.codePointAt(0)?.toString(16)}.png`;
                  
                  return (
                    <div
                      key={idx}
                      onClick={() => onSelectAvatar(customSelectUrl, undefined)}
                      className="group bg-white border-2 border-slate-300 hover:border-amber-400 hover:ring-2 hover:ring-amber-200 rounded-2xl w-14 h-14 flex items-center justify-center text-3xl cursor-pointer hover:scale-110 transition shadow-sm hover:shadow-[2.5px_2.5px_0px_0px_rgba(30,41,59,1)]"
                      title="點點我選用 Emoji"
                    >
                      {emoji}
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* Footer info banner */}
        <div className="bg-[#fff3f0] flex justify-between items-center px-6 py-4 border-t-6 border-slate-900 text-[10px] text-[#ca4d39] font-black uppercase tracking-wider">
          <span>✨ 挑個討喜的新夥伴吧！每天陪伴你快樂讀書、努力得分 ✨</span>
          <span className="opacity-70 font-mono hidden sm:inline">Choose Your Best Mate</span>
        </div>
      </div>
    </div>
  );
}
