export interface CuteAnimalSticker {
  name: string;
  category: string;
  themeColor: string; // Pastel background hex
  bodyColor: string;  // Core body color hex
  ears: 'dog' | 'cat' | 'rabbit' | 'bear' | 'bird' | 'pig' | 'koala' | 'fox' | 'mouse' | 'seal' | 'deer' | 'sloth' | 'none';
  eyes: 'happy' | 'sleeping' | 'blank' | 'dizzy' | 'sparkle' | 'greedy' | 'tear' | 'shocked' | 'judgment' | 'eyeroll' | 'smile_cry';
  props: string[]; // Options: 'onsen', 'orange', 'backpack', 'clover', 'toast', 'sushi', 'egg', 'latte', 'daifuku', 'tempura', 'donut', 'cup', 'avocado', 'glasses', 'pencil', 'magnifier', 'hachimaki', 'milk', 'firefly', 'flower', 'jellyfish', 'chamomile', 'wings', 'unicorn_horn', 'crown', 'nine_tails', 'space_stars', 'trophy', 'wizard', 'rainbow_blow', 'halo', 'thumbsup', 'cpu_smoke', 'squeezed', 'snot_bubble', 'smile_cry', 'flat_penguin';
}

export const CUTE_ANIMAL_STICKERS: CuteAnimalSticker[] = [
  // 1. 棉花糖軟萌小動物
  {
    name: '捧著臉頰肉的軟萌博美犬',
    category: '☁️ 1. 棉花糖軟萌小動物',
    themeColor: '#fff0f2',
    bodyColor: '#fff9f2',
    ears: 'dog',
    eyes: 'happy',
    props: ['squeezed']
  },
  {
    name: '在雲朵上打瞌睡的銀喉長尾山雀',
    category: '☁️ 1. 棉花糖軟萌小動物',
    themeColor: '#f0f9ff',
    bodyColor: '#ffffff',
    ears: 'bird',
    eyes: 'sleeping',
    props: []
  },
  {
    name: '抱著自己大尾巴的睡覺松鼠',
    category: '☁️ 1. 棉花糖軟萌小動物',
    themeColor: '#fff7ed',
    bodyColor: '#f59e0b',
    ears: 'fox',
    eyes: 'sleeping',
    props: ['flat_penguin']
  },
  {
    name: '探出頭的垂耳兔寶寶',
    category: '☁️ 1. 棉花糖軟萌小動物',
    themeColor: '#fff1f2',
    bodyColor: '#fef2f2',
    ears: 'rabbit',
    eyes: 'happy',
    props: ['flower']
  },
  {
    name: '歪頭微笑的薩摩耶犬',
    category: '☁️ 1. 棉花糖軟萌小動物',
    themeColor: '#e0f2fe',
    bodyColor: '#ffffff',
    ears: 'dog',
    eyes: 'happy',
    props: []
  },
  {
    name: '裹著小手帕的軟Q倉鼠',
    category: '☁️ 1. 棉花糖軟萌小動物',
    themeColor: '#fefcee',
    bodyColor: '#fbbf24',
    ears: 'mouse',
    eyes: 'happy',
    props: ['clover']
  },
  {
    name: '趴在軟墊上的肥嘟嘟橘貓',
    category: '☁️ 1. 棉花糖軟萌小動物',
    themeColor: '#fffaf2',
    bodyColor: '#f97316',
    ears: 'cat',
    eyes: 'sleeping',
    props: ['flat_penguin']
  },

  // 2. 日系甜點精靈
  {
    name: '草莓大福小白兔',
    category: '🍓 2. 日系甜點精靈',
    themeColor: '#fff5f5',
    bodyColor: '#ffffff',
    ears: 'rabbit',
    eyes: 'happy',
    props: ['daifuku']
  },
  {
    name: '珍珠奶茶杯緣海豹',
    category: '🍓 2. 日系甜點精靈',
    themeColor: '#ecfeff',
    bodyColor: '#f8fafc',
    ears: 'none',
    eyes: 'happy',
    props: ['cup']
  },
  {
    name: '杯子蛋糕水豚君',
    category: '🍓 2. 日系甜點精靈',
    themeColor: '#faf5ff',
    bodyColor: '#78350f',
    ears: 'bear',
    eyes: 'blank',
    props: ['cup']
  },
  {
    name: '焦糖布丁胖倉鼠',
    category: '🍓 2. 日系甜點精靈',
    themeColor: '#fef3c7',
    bodyColor: '#fbbf24',
    ears: 'mouse',
    eyes: 'happy',
    props: ['donut']
  },
  {
    name: '馬卡龍夾心小狐狸',
    category: '🍓 2. 日系甜點精靈',
    themeColor: '#f0fdf4',
    bodyColor: '#f97316',
    ears: 'fox',
    eyes: 'happy',
    props: ['sushi']
  },
  {
    name: '霜淇淋雙馬尾少女貓',
    category: '🍓 2. 日系甜點精靈',
    themeColor: '#fff1f2',
    bodyColor: '#ffffff',
    ears: 'cat',
    eyes: 'happy',
    props: ['cup']
  },
  {
    name: '棉花糖雲朵羊',
    category: '🍓 2. 日系甜點精靈',
    themeColor: '#e0f2fe',
    bodyColor: '#fff1f2',
    ears: 'bear',
    eyes: 'sleeping',
    props: ['wings']
  },

  // 3. 暖心校園生活
  {
    name: '咬著厚吐司奔跑的雙馬尾女孩',
    category: '🎒 3. 暖心校園生活',
    themeColor: '#fffaf2',
    bodyColor: '#fef08a',
    ears: 'none',
    eyes: 'happy',
    props: ['toast']
  },
  {
    name: '戴著超大圓框眼鏡的小學霸',
    category: '🎒 3. 暖心校園生活',
    themeColor: '#f1f5f9',
    bodyColor: '#94a3b8',
    ears: 'bear',
    eyes: 'sparkle',
    props: ['glasses']
  },
  {
    name: '頭頂著一根大鉛筆的認真小海豹',
    category: '🎒 3. 暖心校園生活',
    themeColor: '#f0f9ff',
    bodyColor: '#ffffff',
    ears: 'none',
    eyes: 'happy',
    props: ['pencil']
  },
  {
    name: '舉手發言的亮眼小可愛',
    category: '🎒 3. 暖心校園生活',
    themeColor: '#fffbeb',
    bodyColor: '#fbbf24',
    ears: 'cat',
    eyes: 'sparkle',
    props: ['thumbsup']
  },
  {
    name: '托腮放空的小迷糊',
    category: '🎒 3. 暖心校園生活',
    themeColor: '#ede9fe',
    bodyColor: '#cbd5e1',
    ears: 'none',
    eyes: 'dizzy',
    props: ['flower']
  },
  {
    name: '戴配戴耳機聽音樂的休閒小熊',
    category: '🎒 3. 暖心校園生活',
    themeColor: '#f3f4f6',
    bodyColor: '#d97706',
    ears: 'bear',
    eyes: 'sleeping',
    props: ['milk']
  },
  {
    name: '手拿魔法棒魔法亮晶晶小小班長',
    category: '🎒 3. 暖心校園生活',
    themeColor: '#faf5ff',
    bodyColor: '#ffffff',
    ears: 'rabbit',
    eyes: 'sparkle',
    props: ['wizard']
  },

  // 4. 綠意盎然植物園
  {
    name: '躲在多肉植物盆栽裡的小刺蝟',
    category: '🌿 4. 綠意盎然植物園',
    themeColor: '#f2fdf5',
    bodyColor: '#86efac',
    ears: 'none',
    eyes: 'happy',
    props: ['avocado']
  },
  {
    name: '把大香菇當成雨傘的小青蛙',
    category: '🌿 4. 綠意盎然植物園',
    themeColor: '#f0fdf4',
    bodyColor: '#4ade80',
    ears: 'koala',
    eyes: 'happy',
    props: ['clover']
  },
  {
    name: '背著小幸運草盆栽的慢吞吞烏龜',
    category: '🌿 4. 4. 綠意盎然植物園',
    themeColor: '#f5fdf6',
    bodyColor: '#22c55e',
    ears: 'none',
    eyes: 'happy',
    props: ['clover']
  },
  {
    name: '頭頂開出一朵小黃花的小柴犬',
    category: '🌿 4. 綠意盎然植物園',
    themeColor: '#fffbeb',
    bodyColor: '#fbbf24',
    ears: 'dog',
    eyes: 'happy',
    props: ['flower']
  },
  {
    name: '耳朵是兩片嫩綠葉子的小白兔',
    category: '🌿 4. 綠意盎然植物園',
    themeColor: '#ecfdf5',
    bodyColor: '#ffffff',
    ears: 'rabbit',
    eyes: 'happy',
    props: ['clover']
  },
  {
    name: '抱著巨大蒲公英的小毛球精靈',
    category: '🌿 4. 綠意盎然植物園',
    themeColor: '#f0fdf4',
    bodyColor: '#cbd5e1',
    ears: 'none',
    eyes: 'happy',
    props: ['chamomile']
  },

  // 5. 夢幻童話與星空啟航
  {
    name: '坐在月亮搖籃裡打瞌睡的小貓',
    category: '🌌 5. 夢幻童話與星空啟航',
    themeColor: '#1e1b4b',
    bodyColor: '#ffffff',
    ears: 'cat',
    eyes: 'sleeping',
    props: ['space_stars']
  },
  {
    name: '手持指南針的星空小探險家',
    category: '🌌 5. 夢幻童話與星空啟航',
    themeColor: '#0f172a',
    bodyColor: '#cbd5e1',
    ears: 'fox',
    eyes: 'sparkle',
    props: ['magnifier']
  },
  {
    name: '尾巴灑落彩虹亮粉的獨角獸寶寶',
    category: '🌌 5. 夢幻童話與星空啟航',
    themeColor: '#faf5ff',
    bodyColor: '#ffffff',
    ears: 'deer',
    eyes: 'sparkle',
    props: ['unicorn_horn']
  },
  {
    name: '在銀河裡用尾巴釣星星的小水獺',
    category: '🌌 5. 夢幻童話與星空啟航',
    themeColor: '#083344',
    bodyColor: '#ea580c',
    ears: 'bear',
    eyes: 'happy',
    props: ['space_stars']
  },
  {
    name: '半透明像藍色果凍的氣泡小水母',
    category: '🌌 5. 夢幻童話與星空啟航',
    themeColor: '#0c4a6e',
    bodyColor: '#38bdf8',
    ears: 'none',
    eyes: 'happy',
    props: ['jellyfish']
  },
  {
    name: '乘著羽翼在雲海中穿梭的Q版勇者',
    category: '🌌 5. 夢幻童話與星空啟航',
    themeColor: '#e0f2fe',
    bodyColor: '#ffffff',
    ears: 'none',
    eyes: 'happy',
    props: ['wings']
  },

  // 6. 高分限定「究極日系守護神」系列
  {
    name: '戴著巨大純金皇冠的奶貓國王',
    category: '👑 6. 高分限定「究極日系守護神」系列',
    themeColor: '#fef3c7',
    bodyColor: '#ffffff',
    ears: 'cat',
    eyes: 'happy',
    props: ['crown']
  },
  {
    name: '六隻蓬鬆羽翼小白貓天使長',
    category: '👑 6. 高分限定「究極日系守護神」系列',
    themeColor: '#fffdfa',
    bodyColor: '#ffffff',
    ears: 'cat',
    eyes: 'sparkle',
    props: ['halo']
  },
  {
    name: '星空斗篷大魔導士小小白兔',
    category: '👑 6. 高分限定「究極日系守護神」系列',
    themeColor: '#1e1b4b',
    bodyColor: '#fafaf9',
    ears: 'rabbit',
    eyes: 'sparkle',
    props: ['wizard']
  },
  {
    name: '盤踞在黃金獎盃裡洗臉的小金豹',
    category: '👑 6. 高分限定「究極日系守護神」系列',
    themeColor: '#fef3c7',
    bodyColor: '#f59e0b',
    ears: 'cat',
    eyes: 'happy',
    props: ['trophy']
  },
  {
    name: '戴著單片眼鏡精緻高冷小灰狐',
    category: '👑 6. 高分限定「究極日系守護神」系列',
    themeColor: '#f1f5f9',
    bodyColor: '#cbd5e1',
    ears: 'fox',
    eyes: 'judgment',
    props: ['wizard']
  },
  {
    name: '頭頂噴出愛心雨的藍鯨守護神',
    category: '👑 6. 高分限定「究極日系守護神」系列',
    themeColor: '#e0f2fe',
    bodyColor: '#0284c7',
    ears: 'none',
    eyes: 'happy',
    props: ['rainbow_blow']
  },

  // 7. 暖心小互動與心情語錄
  {
    name: '捧著粉紅大愛心的治癒小熊',
    category: '🎨 7. 暖心小互動與心情語錄',
    themeColor: '#fff1f2',
    bodyColor: '#b45309',
    ears: 'bear',
    eyes: 'happy',
    props: ['thumbsup']
  },
  {
    name: '綁頭帶自信滿點握拳柴犬',
    category: '🎨 7. 暖心小互動與心情語錄',
    themeColor: '#fffbeb',
    bodyColor: '#fbbf24',
    ears: 'dog',
    eyes: 'happy',
    props: ['hachimaki']
  },
  {
    name: '兩隻小動物手牽手的繪本插畫',
    category: '🎨 7. 暖心小互動與心情語錄',
    themeColor: '#fff5f5',
    bodyColor: '#f472b6',
    ears: 'bear',
    eyes: 'happy',
    props: []
  },
  {
    name: '想要跟你High Five的小海豹',
    category: '🎨 7. 暖心小互動與心情語錄',
    themeColor: '#ecfeff',
    bodyColor: '#ffffff',
    ears: 'none',
    eyes: 'happy',
    props: ['thumbsup']
  },
  {
    name: '捏大大臉頰肉微笑的小豬寶寶',
    category: '🎨 7. 暖心小互動與心情語錄',
    themeColor: '#fff0f5',
    bodyColor: '#fda4af',
    ears: 'pig',
    eyes: 'happy',
    props: ['squeezed']
  },
  {
    name: '舉「辛苦啦」小木牌的治癒鴨鴨',
    category: '🎨 7. 暖心小互動與心情語錄',
    themeColor: '#fffbeb',
    bodyColor: '#fbbf24',
    ears: 'bird',
    eyes: 'happy',
    props: ['hachimaki']
  },
  {
    name: '裹在貓睡睡袋睡覺的佛系水豚',
    category: '🎨 7. 暖心小互動與心情語錄',
    themeColor: '#f8fafc',
    bodyColor: '#78350f',
    ears: 'bear',
    eyes: 'sleeping',
    props: ['flat_penguin']
  },
  {
    name: '抱著發光大金星歡笑的綠恐龍',
    category: '🎨 7. 暖心小互動與心情語錄',
    themeColor: '#ecfdf5',
    bodyColor: '#10b981',
    ears: 'none',
    eyes: 'sparkle',
    props: ['space_stars']
  },
  {
    name: '折考卷紙飛機飛向彩虹的小女孩',
    category: '🎨 7. 暖心小互動與心情語錄',
    themeColor: '#fef2f2',
    bodyColor: '#ffffff',
    ears: 'none',
    eyes: 'happy',
    props: ['wings']
  },
  {
    name: '給自己編織幸運御守的粉紅貓',
    category: '🎨 7. 暖心小互動與心情語錄',
    themeColor: '#fdf2f8',
    bodyColor: '#fda4af',
    ears: 'cat',
    eyes: 'happy',
    props: ['clover']
  },
  {
    name: '趴在Good Job!文字上睡覺的松鼠',
    category: '🎨 7. 暖心小互動與心情語錄',
    themeColor: '#fffbeb',
    bodyColor: '#d97706',
    ears: 'fox',
    eyes: 'sleeping',
    props: ['flat_penguin']
  }
];

// Helper to compile a highly detailed, extremely cute kawaii avatar card in SVG format
export function drawCuteAnimalSVG(sticker: CuteAnimalSticker): string {
  const isDarkBg = sticker.themeColor === '#0f172a' || sticker.themeColor === '#083344';
  const strokeColor = '#1e293b';

  // Subcomponents for eyes
  let eyesSvg = '';
  switch (sticker.eyes) {
    case 'happy':
      eyesSvg = `
        <path d="M 75 95 Q 85 85 95 95" stroke="${strokeColor}" stroke-width="5" stroke-linecap="round" fill="none" />
        <path d="M 105 95 Q 115 85 125 95" stroke="${strokeColor}" stroke-width="5" stroke-linecap="round" fill="none" />
      `;
      break;
    case 'sleeping':
      eyesSvg = `
        <path d="M 73 95 Q 83 103 93 95" stroke="${strokeColor}" stroke-width="4.5" stroke-linecap="round" fill="none" />
        <path d="M 107 95 Q 117 103 127 95" stroke="${strokeColor}" stroke-width="4.5" stroke-linecap="round" fill="none" />
      `;
      break;
    case 'blank':
      eyesSvg = `
        <circle cx="83" cy="95" r="5" fill="${strokeColor}" />
        <circle cx="117" cy="95" r="5" fill="${strokeColor}" />
      `;
      break;
    case 'dizzy':
      eyesSvg = `
        <path d="M 75 90 L 89 104 M 89 90 L 75 104" stroke="${strokeColor}" stroke-width="4.5" stroke-linecap="round" />
        <path d="M 111 90 L 125 104 M 125 90 L 111 104" stroke="${strokeColor}" stroke-width="4.5" stroke-linecap="round" />
      `;
      break;
    case 'sparkle':
      eyesSvg = `
        <circle cx="83" cy="95" r="9" fill="${strokeColor}" />
        <circle cx="117" cy="95" r="9" fill="${strokeColor}" />
        <circle cx="81" cy="92" r="3" fill="#ffffff" />
        <circle cx="115" cy="92" r="3" fill="#ffffff" />
        <circle cx="86" cy="98" r="1.5" fill="#ffffff" />
        <circle cx="120" cy="98" r="1.5" fill="#ffffff" />
      `;
      break;
    case 'greedy':
      eyesSvg = `
        <text x="73" y="103" font-size="20" font-family="monospace" font-weight="900" fill="${strokeColor}">$</text>
        <text x="107" y="103" font-size="20" font-family="monospace" font-weight="900" fill="${strokeColor}">$</text>
      `;
      break;
    case 'judgment':
      eyesSvg = `
        <line x1="72" y1="88" x2="94" y2="92" stroke="${strokeColor}" stroke-width="4" stroke-linecap="round" />
        <line x1="106" y1="92" x2="128" y2="88" stroke="${strokeColor}" stroke-width="4" stroke-linecap="round" />
        <circle cx="81" cy="96" r="3.5" fill="${strokeColor}" />
        <circle cx="119" cy="96" r="3.5" fill="${strokeColor}" />
      `;
      break;
    case 'eyeroll':
      eyesSvg = `
        <circle cx="83" cy="95" r="10" fill="#ffffff" stroke="${strokeColor}" stroke-width="3" />
        <circle cx="117" cy="95" r="10" fill="#ffffff" stroke="${strokeColor}" stroke-width="3" />
        <circle cx="83" cy="89" r="4.5" fill="${strokeColor}" />
        <circle cx="117" cy="89" r="4.5" fill="${strokeColor}" />
      `;
      break;
    case 'shocked':
      eyesSvg = `
        <circle cx="80" cy="92" r="7.5" fill="#ffffff" stroke="${strokeColor}" stroke-width="3" />
        <circle cx="120" cy="92" r="7.5" fill="#ffffff" stroke="${strokeColor}" stroke-width="3" />
        <circle cx="80" cy="92" r="3" fill="${strokeColor}" />
        <circle cx="120" cy="92" r="3" fill="${strokeColor}" />
        <path d="M 70 78 L 90 82" stroke="${strokeColor}" stroke-width="3" stroke-linecap="round" />
        <path d="M 130 78 L 110 82" stroke="${strokeColor}" stroke-width="3" stroke-linecap="round" />
      `;
      break;
    case 'smile_cry':
      eyesSvg = `
        <path d="M 75 95 Q 85 85 95 95" stroke="${strokeColor}" stroke-width="5" stroke-linecap="round" fill="none" />
        <path d="M 105 95 Q 115 85 125 95" stroke="${strokeColor}" stroke-width="5" stroke-linecap="round" fill="none" />
        <path d="M 72 96 Q 71 106 72 108" stroke="#38bdf8" stroke-width="4.5" stroke-linecap="round" fill="none" />
        <path d="M 128 96 Q 129 106 128 108" stroke="#38bdf8" stroke-width="4.5" stroke-linecap="round" fill="none" />
      `;
      break;
  }

  // Mouth renders
  let mouthSvg = `
    <path d="M 95 106 Q 100 110 105 106 Z" fill="#eb5757" stroke="${strokeColor}" stroke-width="3" />
  `;
  if (sticker.eyes === 'sleeping' || sticker.eyes === 'blank') {
    mouthSvg = `<path d="M 94 104 Q 100 109 106 104" stroke="${strokeColor}" stroke-width="3.5" stroke-linecap="round" fill="none" />`;
  } else if (sticker.eyes === 'shocked') {
    mouthSvg = `<ellipse cx="100" cy="112" rx="10" ry="14" fill="#6b21a8" stroke="${strokeColor}" stroke-width="3.5" />`;
  } else if (sticker.eyes === 'eyeroll') {
    mouthSvg = `<line x1="90" y1="112" x2="110" y2="108" stroke="${strokeColor}" stroke-width="4.5" stroke-linecap="round" />`;
  } else if (sticker.eyes === 'judgment') {
    mouthSvg = `<path d="M 92 108 Q 100 101 108 108" stroke="${strokeColor}" stroke-width="3.5" stroke-linecap="round" fill="none" />`;
  } else if (sticker.props.includes('squeezed')) {
    mouthSvg = `<circle cx="100" cy="106" r="4.5" fill="#eb5757" stroke="${strokeColor}" stroke-width="2.5" />`;
  }

  // Ears & Horns
  let earsSvg = '';
  switch (sticker.ears) {
    case 'cat':
      earsSvg = `
        <polygon points="50,60 82,80 50,96" fill="${sticker.bodyColor}" stroke="${strokeColor}" stroke-width="5.5" stroke-linejoin="round" />
        <polygon points="150,60 118,80 150,96" fill="${sticker.bodyColor}" stroke="${strokeColor}" stroke-width="5.5" stroke-linejoin="round" />
        <polygon points="56,68 76,81 56,90" fill="#f472b6" />
        <polygon points="144,68 124,81 144,90" fill="#f472b6" />
      `;
      break;
    case 'dog':
      earsSvg = `
        <path d="M 46,75 Q 32,70 34,95 Q 36,120 54,105 Z" fill="${sticker.bodyColor}" stroke="${strokeColor}" stroke-width="5.5" stroke-linejoin="round" />
        <path d="M 154,75 Q 168,70 166,95 Q 164,120 146,105 Z" fill="${sticker.bodyColor}" stroke="${strokeColor}" stroke-width="5.5" stroke-linejoin="round" />
      `;
      break;
    case 'rabbit':
      earsSvg = `
        <path d="M 60,75 Q 30,55 52,110 Z" fill="${sticker.bodyColor}" stroke="${strokeColor}" stroke-width="5.5" />
        <path d="M 140,75 Q 170,55 148,110 Z" fill="${sticker.bodyColor}" stroke="${strokeColor}" stroke-width="5.5" />
        <path d="M 60,82 Q 40,68 53,103 Z" fill="#f472b6" />
        <path d="M 140,82 Q 160,68 147,103 Z" fill="#f472b6" />
      `;
      break;
    case 'bear':
      earsSvg = `
        <circle cx="60" cy="65" r="18" fill="${sticker.bodyColor}" stroke="${strokeColor}" stroke-width="5.5" />
        <circle cx="140" cy="65" r="18" fill="${sticker.bodyColor}" stroke="${strokeColor}" stroke-width="5.5" />
        <circle cx="60" cy="65" r="10" fill="#f472b6" />
        <circle cx="140" cy="65" r="10" fill="#f472b6" />
      `;
      break;
    case 'fox':
      earsSvg = `
        <polygon points="46,54 84,76 60,94" fill="${sticker.bodyColor}" stroke="${strokeColor}" stroke-width="5" stroke-linejoin="round" />
        <polygon points="154,54 116,76 140,94" fill="${sticker.bodyColor}" stroke="${strokeColor}" stroke-width="5" stroke-linejoin="round" />
      `;
      break;
    case 'mouse':
      earsSvg = `
        <circle cx="54" cy="58" r="22" fill="${sticker.bodyColor}" stroke="${strokeColor}" stroke-width="5" />
        <circle cx="146" cy="58" r="22" fill="${sticker.bodyColor}" stroke="${strokeColor}" stroke-width="5" />
        <circle cx="54" cy="58" r="14" fill="#fda4af" />
        <circle cx="146" cy="58" r="14" fill="#fda4af" />
      `;
      break;
    case 'pig':
      earsSvg = `
        <path d="M 54,64 L 64,48 L 78,64 Z" fill="#f472b6" stroke="${strokeColor}" stroke-width="4" stroke-linejoin="round" />
        <path d="M 146,64 L 136,48 L 122,64 Z" fill="#f472b6" stroke="${strokeColor}" stroke-width="4" stroke-linejoin="round" />
      `;
      break;
    case 'deer':
      earsSvg = `
        <path d="M 45,72 Q 25,60 40,82 Z" fill="#b45309" stroke="${strokeColor}" stroke-width="4" />
        <path d="M 155,72 Q 175,60 160,82 Z" fill="#b45309" stroke="${strokeColor}" stroke-width="4" />
        <path d="M 73,63 L 64,43 L 74,48 L 68,30" stroke="${strokeColor}" stroke-width="4" stroke-linecap="round" fill="none" />
        <path d="M 127,63 L 136,43 L 126,48 L 132,30" stroke="${strokeColor}" stroke-width="4" stroke-linecap="round" fill="none" />
      `;
      break;
    case 'koala':
      earsSvg = `
        <circle cx="50" cy="74" r="24" fill="#cbd5e1" stroke="${strokeColor}" stroke-width="5" />
        <circle cx="150" cy="74" r="24" fill="#cbd5e1" stroke="${strokeColor}" stroke-width="5" />
        <circle cx="50" cy="74" r="16" fill="#f1f5f9" />
        <circle cx="150" cy="74" r="16" fill="#f1f5f9" />
      `;
      break;
    case 'bird':
      earsSvg = `
        <path d="M 92,60 Q 100,45 108,60" fill="none" stroke="${strokeColor}" stroke-width="4.5" stroke-linecap="round" />
      `;
      break;
  }

  // Hash-based unique gradient IDs to ensure compliant SVG def references
  const stickerIndexId = Math.abs(sticker.name.split('').reduce((hash, char) => hash + char.charCodeAt(0), 0));
  const cardGradientId = `cardGrad-${stickerIndexId}`;
  const bodyGradientId = `bodyGrad-${stickerIndexId}`;

  // Blush with soft-matte diffuse glow filter
  const blushSvg = `
    <circle cx="68" cy="102" r="9" fill="#fda4af" opacity="0.85" filter="url(#soft-blush-filter)" />
    <circle cx="132" cy="102" r="9" fill="#fda4af" opacity="0.85" filter="url(#soft-blush-filter)" />
  `;

  // Body construction with glossy translucent water-highlight
  const bodyShape = `
    <rect x="52" y="70" width="96" height="86" rx="42" fill="url(#${bodyGradientId})" stroke="${strokeColor}" stroke-width="6" />
    <ellipse cx="100" cy="120" rx="36" ry="32" fill="#ffffff" opacity="0.2" />
    <!-- High-end handdrawn highlights -->
    <path d="M 64,80 Q 72,74 84,74" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" fill="none" opacity="0.45" />
  `;

  // Overlay Props / Costumes
  let propsSvg = '';
  sticker.props.forEach((prop) => {
    switch (prop) {
      case 'orange':
        propsSvg += `
          <!-- Cute orange with green leaf -->
          <circle cx="100" cy="50" r="12" fill="#f97316" stroke="${strokeColor}" stroke-width="3" />
          <path d="M 100,38 Q 106,32 108,41" fill="none" stroke="${strokeColor}" stroke-width="2.5" />
          <path d="M 100,38 Q 94,36 97,42" fill="#22c55e" />
        `;
        break;
      case 'onsen':
        propsSvg += `
          <!-- Hot Water, Steaming & Yellow Chick on Head -->
          <path d="M 30,135 Q 100,140 170,135 L 170,165 Q 100,170 30,165 Z" fill="#67e8f9" opacity="0.6" stroke="${strokeColor}" stroke-width="3" />
          <!-- Steam streams -->
          <path d="M 60,120 Q 64,110 58,104 M 140,120 Q 144,110 138,104" stroke="#ffffff" stroke-width="3.5" fill="none" stroke-linecap="round" />
          <!-- Head chick -->
          <circle cx="100" cy="50" r="10" fill="#facc15" stroke="${strokeColor}" stroke-width="2.5" />
          <polygon points="98,50 102,50 100,53" fill="#ea580c" />
        `;
        break;
      case 'backpack':
        propsSvg += `
          <!-- Yellow primary student backpack -->
          <rect x="118" y="110" width="22" height="30" rx="6" fill="#eab308" stroke="${strokeColor}" stroke-width="3" />
          <line x1="118" y1="120" x2="140" y2="120" stroke="${strokeColor}" stroke-width="2.5" />
        `;
        break;
      case 'clover':
        propsSvg += `
          <!-- Green lucky 4-leaf clover -->
          <path d="M 100 110 Q 100 120 105 125" stroke="#22c55e" stroke-width="3.5" stroke-linecap="round" fill="none" />
          <circle cx="95" cy="110" r="6" fill="#22c55e" />
          <circle cx="105" cy="110" r="6" fill="#22c55e" />
          <circle cx="100" cy="105" r="6" fill="#22c55e" />
          <circle cx="100" cy="115" r="6" fill="#2cba58" />
        `;
        break;
      case 'toast':
        propsSvg += `
          <!-- Corgi stuck in toast bread frame -->
          <rect x="42" y="60" width="116" height="106" rx="20" fill="none" stroke="#d97706" stroke-width="12" />
          <rect x="42" y="60" width="116" height="106" rx="20" fill="none" stroke="#fcd34d" stroke-width="6" />
        `;
        break;
      case 'sushi':
        propsSvg += `
          <!-- Seaweed sushi wrapper wrap -->
          <rect x="46" y="112" width="108" height="42" rx="10" fill="#1e293b" stroke="${strokeColor}" stroke-width="4.5" />
          <line x1="50" y1="120" x2="150" y2="120" stroke="#ffffff" stroke-width="2.5" stroke-dasharray="3,3" opacity="0.4" />
        `;
        break;
      case 'egg':
        propsSvg += `
          <!-- Egg yolk sleeping pillow & egg white blanket wrapper -->
          <ellipse cx="100" cy="142" rx="44" ry="18" fill="#ffffff" stroke="${strokeColor}" stroke-width="3.5" />
          <circle cx="70" cy="136" r="14" fill="#f59e0b" stroke="${strokeColor}" stroke-width="3.5" />
        `;
        break;
      case 'latte':
        propsSvg += `
          <!-- Matcha cup latte mugs -->
          <path d="M 50,118 L 150,118 L 140,165 Q 100,172 60,165 Z" fill="#15803d" stroke="${strokeColor}" stroke-width="4.5" />
          <ellipse cx="100" cy="118" rx="50" ry="10" fill="#ffffff" stroke="${strokeColor}" stroke-width="3" />
        `;
        break;
      case 'daifuku':
        propsSvg += `
          <!-- Wrapping strawberry mochi Daifuku jacket -->
          <path d="M 50,120 Q 30,95 100,90 Q 170,95 150,120 Z" fill="#f43f5e" opacity="0.4" />
        `;
        break;
      case 'tempura':
        propsSvg += `
          <!-- Tempura wrapper crunch & red shrimp tail -->
          <path d="M 36,134 Q 30,105 100,102 Q 170,105 164,134 Z" fill="#ebc460" opacity="0.5" />
          <path d="M 120,135 Q 140,165 160,135" stroke="#f43f5e" stroke-width="12" stroke-linecap="round" />
        `;
        break;
      case 'donut':
        propsSvg += `
          <!-- Chocolate doughnut body -->
          <ellipse cx="100" cy="128" rx="58" ry="24" fill="#78350f" stroke="${strokeColor}" stroke-width="5" />
          <!-- Sprinkles scatter pink/white -->
          <circle cx="70" cy="120" r="2" fill="#ec4899" />
          <circle cx="120" cy="122" r="2" fill="#ffffff" />
          <circle cx="100" cy="132" r="2" fill="#eab308" />
        `;
        break;
      case 'cup':
        propsSvg += `
          <!-- Sundae glass parfait vessel -->
          <path d="M 54,106 Q 100,110 146,106 L 126,165 L 74,165 Z" fill="none" stroke="#2dd4bf" stroke-width="4.5" />
          <circle cx="100" cy="55" r="7" fill="#dc2626" /> <!-- Cherry -->
        `;
        break;
      case 'avocado':
        propsSvg += `
          <!-- Green Avocado shell -->
          <path d="M 54,68 Q 100,50 146,68 L 136,140 Q 100,165 64,140 Z" fill="#15803d" stroke="${strokeColor}" stroke-width="4" />
          <circle cx="100" cy="128" r="16" fill="#78350f" /> <!-- seed -->
        `;
        break;
      case 'glasses':
        propsSvg += `
          <!-- Magnifying smart student glasses -->
          <circle cx="81" cy="94" r="18" fill="none" stroke="${strokeColor}" stroke-width="4.5" />
          <circle cx="119" cy="94" r="18" fill="none" stroke="${strokeColor}" stroke-width="4.5" />
          <line x1="99" y1="94" x2="101" y2="94" stroke="${strokeColor}" stroke-width="4" />
        `;
        break;
      case 'pencil':
        propsSvg += `
          <!-- Huge yellow cartoon crayon pen -->
          <rect x="50" y="44" width="100" height="14" rx="4" fill="#eab308" stroke="${strokeColor}" stroke-width="3" />
          <polygon points="150,44 162,51 150,58" fill="#ef4444" stroke="${strokeColor}" stroke-width="2.5" />
        `;
        break;
      case 'magnifier':
        propsSvg += `
          <!-- Detective glass magnifier -->
          <circle cx="80" cy="120" r="12" fill="none" stroke="${strokeColor}" stroke-width="3.5" />
          <line x1="88" y1="128" x2="100" y2="140" stroke="${strokeColor}" stroke-width="4.5" stroke-linecap="round" />
        `;
        break;
      case 'hachimaki':
        propsSvg += `
          <!-- Red victory headband -->
          <rect x="52" y="70" width="96" height="11" fill="#dc2626" stroke="${strokeColor}" stroke-width="2" />
          <text x="100" y="79" font-size="10" font-weight="900" fill="#ffffff" text-anchor="middle">必勝</text>
        `;
        break;
      case 'milk':
        propsSvg += `
          <!-- Strawberry milk carton with cartoon draw straw -->
          <rect x="120" y="112" width="22" height="30" rx="4" fill="#fbcfe8" stroke="${strokeColor}" stroke-width="2.5" />
          <line x1="124" y1="112" x2="108" y2="102" stroke="#22c55e" stroke-width="3.5" />
        `;
        break;
      case 'firefly':
        propsSvg += `
          <!-- Transparent glowing firefly tails backdrop -->
          <circle cx="100" cy="148" r="18" fill="#facc15" opacity="0.8" filter="blur(2px)" />
        `;
        break;
      case 'flower':
        propsSvg += `
          <!-- Magical peach blooming pink blossom -->
          <circle cx="100" cy="50" r="7" fill="#f472b6" />
          <circle cx="93" cy="50" r="5" fill="#f472b6" />
          <circle cx="107" cy="50" r="5" fill="#f472b6" />
          <circle cx="100" cy="43" r="5" fill="#f472b6" />
          <circle cx="100" cy="57" r="5" fill="#f472b6" />
          <circle cx="100" cy="50" r="3" fill="#eab308" />
        `;
        break;
      case 'jellyfish':
        propsSvg += `
          <!-- Translucent sky jellyfish filaments floating -->
          <path d="M 60,140 Q 64,165 70,165 M 100,140 Q 101,170 100,165 M 140,140 Q 136,165 130,165" stroke="#38bdf8" stroke-width="3.5" stroke-linecap="round" fill="none" />
        `;
        break;
      case 'chamomile':
        propsSvg += `
          <!-- Camomile small yellow centers floral patches -->
          <circle cx="86" cy="120" r="5" fill="#ffffff" />
          <circle cx="86" cy="120" r="2.5" fill="#eab308" />
          <circle cx="114" cy="124" r="5" fill="#ffffff" />
          <circle cx="114" cy="124" r="2.5" fill="#eab308" />
        `;
        break;
      case 'wings':
        propsSvg += `
          <!-- Fairy gold wing extensions -->
          <path d="M 44,110 Q 14,94 36,128 Z" fill="#fef08a" stroke="${strokeColor}" stroke-width="3" opacity="0.8" />
          <path d="M 156,110 Q 186,94 164,128 Z" fill="#fef08a" stroke="${strokeColor}" stroke-width="3" opacity="0.8" />
        `;
        break;
      case 'unicorn_horn':
        propsSvg += `
          <!-- Golden spiraled mythical horn -->
          <polygon points="100,30 94,54 106,54" fill="#fbbf24" stroke="${strokeColor}" stroke-width="3" stroke-linejoin="round" />
        `;
        break;
      case 'crown':
        propsSvg += `
          <!-- Divine mini crown of academic distinction -->
          <polygon points="86,40 114,40 110,54 90,54" fill="#fbbf24" stroke="${strokeColor}" stroke-width="3" />
          <polygon points="86,40 100,48 114,40 108,30 92,30" fill="#fcd34d" />
        `;
        break;
      case 'nine_tails':
        propsSvg += `
          <!-- Fan of white tails spread -->
          <path d="M 30,130 Q 14,142 22,110 Q 40,110 50,130" fill="#ffffff" stroke="${strokeColor}" stroke-width="2.5" opacity="0.7" />
          <path d="M 170,130 Q 186,142 178,110 Q 160,110 150,130" fill="#ffffff" stroke="${strokeColor}" stroke-width="2.5" opacity="0.7" />
        `;
        break;
      case 'space_stars':
        propsSvg += `
          <!-- Celestial glowing crescent moon symbol -->
          <path d="M 100,44 Q 93,42 96,52 Q 104,50 100,44" fill="#fbbf24" />
        `;
        break;
      case 'trophy':
        propsSvg += `
          <!-- Standing gold award cup goblet -->
          <path d="M 60,138 L 140,138 L 130,165 Q 100,172 70,165 Z" fill="#f59e0b" stroke="${strokeColor}" stroke-width="4" />
        `;
        break;
      case 'wizard':
        propsSvg += `
          <!-- Bowtie ribbon accessory set -->
          <polygon points="86,134 114,134 100,128" fill="#dc2626" stroke="${strokeColor}" stroke-width="3.5" />
        `;
        break;
      case 'rainbow_blow':
        propsSvg += `
          <!-- Water spout spray arcs -->
          <path d="M 100,40 Q 94,18 84,24" stroke="#e11d48" stroke-width="3.5" fill="none" stroke-linecap="round" />
          <path d="M 100,40 Q 106,18 116,24" stroke="#3b82f6" stroke-width="3.5" fill="none" stroke-linecap="round" />
        `;
        break;
      case 'halo':
        propsSvg += `
          <!-- Divine golden loop ring halo -->
          <ellipse cx="100" cy="40" rx="20" ry="6" fill="none" stroke="#facc15" stroke-width="4.5" />
        `;
        break;
      case 'thumbsup':
        propsSvg += `
          <!-- Cute small chibi style hand holding thumbs up -->
          <circle cx="140" cy="120" r="8" fill="${sticker.bodyColor}" stroke="${strokeColor}" stroke-width="3" />
          <path d="M 140,114 Q 146,108 142,106 Q 138,106 140,114" fill="#fc8e12" stroke="${strokeColor}" stroke-width="2" />
        `;
        break;
      case 'cpu_smoke':
        propsSvg += `
          <!-- Smoke steam clouds -->
          <circle cx="100" cy="40" r="10" fill="#cbd5e1" opacity="0.6" />
          <circle cx="110" cy="36" r="8" fill="#cbd5e1" opacity="0.5" />
        `;
        break;
      case 'snot_bubble':
        propsSvg += `
          <!-- Growing cute sleeping snot bubble -->
          <circle cx="110" cy="116" r="10" fill="#38bdf8" opacity="0.65" stroke="${strokeColor}" stroke-width="1.5" />
        `;
        break;
      case 'flat_penguin':
        propsSvg += `
          <!-- Funny flattened body shadow -->
          <rect x="44" y="112" width="112" height="42" rx="14" fill="${sticker.bodyColor}" stroke="${strokeColor}" stroke-width="5" />
        `;
        break;
    }
  });

  // Category-specific warm hand-painted decorative illustrations and background features
  let backgroundDecorations = '';
  if (sticker.category.includes('星空') || sticker.category.includes('夢幻') || sticker.themeColor === '#1e1b4b' || sticker.themeColor === '#0f172a' || sticker.themeColor === '#083344') {
    backgroundDecorations = `
      <!-- Soft handdrawn star sparks -->
      <path d="M 30,35 Q 35,35 35,30 Q 35,35 40,35 Q 35,35 35,40 Q 35,35 30,35 Z" fill="#fdeb6a" opacity="0.8" />
      <path d="M 165,155 Q 170,155 170,150 Q 170,155 175,155 Q 170,155 170,160 Q 170,155 165,155 Z" fill="#fffa90" opacity="0.75" />
      <circle cx="155" cy="50" r="3" fill="#fef08a" opacity="0.5" />
      <circle cx="45" cy="150" r="2.5" fill="#ffffff" opacity="0.4" />
    `;
  } else if (sticker.category.includes('植物') || sticker.category.includes('綠意')) {
    backgroundDecorations = `
      <!-- Tiny fresh leaf doodles -->
      <path d="M 32,32 Q 40,25 36,40 Q 28,45 32,32 Z" fill="#86efac" opacity="0.8" />
      <path d="M 165,160 Q 155,152 158,168 Q 168,172 165,160 Z" fill="#4ade80" opacity="0.7" />
      <circle cx="30" cy="155" r="4.5" fill="#bbf7d0" opacity="0.6" />
    `;
  } else if (sticker.category.includes('甜點') || sticker.category.includes('烘焙') || sticker.category.includes('下午茶') || sticker.category.includes('甜品精靈')) {
    backgroundDecorations = `
      <!-- Soft sweet hearts and dots -->
      <path d="M 28,34 Q 24,26 32,26 Q 36,26 36,34 Q 36,38 32,42 Q 28,38 28,34 Z" fill="#fecdd3" opacity="0.85" />
      <circle cx="168" cy="155" r="4" fill="#fda4af" opacity="0.8" />
      <circle cx="155" cy="40" r="3" fill="#fda4af" opacity="0.5" />
    `;
  } else {
    // Elegant warm sprinkles
    backgroundDecorations = `
      <circle cx="34" cy="38" r="4" fill="#fbbf24" opacity="0.7" />
      <circle cx="165" cy="155" r="4.5" fill="#fda4af" opacity="0.75" />
      <circle cx="162" cy="44" r="3" fill="#38bdf8" opacity="0.6" />
      <circle cx="40" cy="160" r="3.5" fill="#c084fc" opacity="0.55" />
    `;
  }

  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <defs>
        <!-- Soft blurred airbrushed watercolor blush filter -->
        <filter id="soft-blush-filter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
        
        <!-- Faded rich pastel watercolor paper linear gradient -->
        <linearGradient id="${cardGradientId}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
          <stop offset="30%" stop-color="#fffefa" />
          <stop offset="100%" stop-color="${sticker.themeColor}" />
        </linearGradient>

        <!-- Dynamic soft depth gradient for the body to look jelly/rounded -->
        <linearGradient id="${bodyGradientId}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.4" />
          <stop offset="20%" stop-color="${sticker.bodyColor}" />
          <stop offset="100%" stop-color="${sticker.bodyColor}" />
        </linearGradient>
      </defs>

      <!-- Decorative background banner card of the crayon art -->
      <rect width="200" height="200" fill="url(#${cardGradientId})" rx="30" stroke="${strokeColor}" stroke-width="6" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="#f1f5f9" stroke-width="2" stroke-dasharray="6,6" opacity="0.25" />
      
      <!-- Handdrawn cute decorations and sparks -->
      ${backgroundDecorations}
      
      <!-- Animal Ears & Horns -->
      ${earsSvg}
      
      <!-- Animal Main Body Core Shape -->
      ${bodyShape}
      
      <!-- Facial Elements -->
      ${blushSvg}
      ${eyesSvg}
      ${mouthSvg}
      
      <!-- Customized dynamic props overlays -->
      ${propsSvg}
    </svg>
  `;

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svgContent);
}
