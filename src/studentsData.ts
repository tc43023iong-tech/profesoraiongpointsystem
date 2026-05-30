import { ClassID, Student } from './types';
import { CUTE_ANIMAL_STICKERS, drawCuteAnimalSVG } from './cuteDrawings';

// Helper to construct PokeAPI official artwork URL
export function getPokemonAvatarUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

// Beautiful dynamically handdrawn vector and illustration list for "Friends" tab
export const FRIEND_STICKERS = CUTE_ANIMAL_STICKERS.map((sticker) => ({
  name: sticker.name,
  category: sticker.category,
  url: drawCuteAnimalSVG(sticker)
}));

export const INITIAL_STUDENTS_P5A = [
  '甘凱銘', '吉靜妍', '何詠芯', '何駿熙', '何馨兒',
  '余文瑄', '吳珊珊', '吳瑋謙', '李沛熹', '周柏宇',
  '姚念怡', '施俊毅', '郭家濠', '陳俊謙', '陳焌軒',
  '馮逸峰', '黃忠民', '黃俊熙', '黃錦然', '趙奕俊',
  '劉志成', '黎軍宇', '鍾子揚', '魏鴻文', '羅梓嘉',
  '關皓瑤'
];

export const INITIAL_STUDENTS_P5B = [
  '甘家軒', '何俊輝', '何祖輝', '吳家睿', '呂悅琳',
  '林啟泓', '邱子衿', '倪詩涵', '徐譽恆', '張廷鋒',
  '張鈞靖', '梁嘉馨', '閆翔勇', '陳毅峻', '馮國鑫',
  '黃永健', '黃昊然', '黃芷凌', '黃揚', '廖志鈞',
  '劉浩賢', '劉熙浩', '蔡雅桔', '龍俊', '鍾秉紘'
];

export const INITIAL_STUDENTS_P5C = [
  '方錦達', '王君菱', '左沁文', '何子軒', '吳婉晴',
  '吳鴻鑫', '呂月澄', '李俊豪', '林君兒', '林賢斐',
  '胡穎茵', '張珈瑜', '張凱喬', '張靜茹', '梁梓瑩',
  '許妍珊', '郭芷筠', '陳梓洋', '彭浩言', '黃永康',
  '黃澤宇', '葉皓熙', '董書筠', '蔣沛恆', '盧駿'
];

export function getInitialClassData(classId: ClassID): Student[] {
  let names: string[] = [];
  let pokeOffset = 1;

  if (classId === 'P5A') {
    names = INITIAL_STUDENTS_P5A;
    pokeOffset = 1; // Bulbasaur
  } else if (classId === 'P5B') {
    names = INITIAL_STUDENTS_P5B;
    pokeOffset = 152; // Chikorita
  } else if (classId === 'P5C') {
    names = INITIAL_STUDENTS_P5C;
    pokeOffset = 252; // Treecko
  }

  return names.map((name, index) => {
    const rollId = index + 1;
    const isSpecialFriend = index % 8 === 7;
    const pokeId = pokeOffset + index;
    const avatarUrl = isSpecialFriend 
      ? FRIEND_STICKERS[index % FRIEND_STICKERS.length].url
      : getPokemonAvatarUrl(pokeId);

    return {
      id: rollId,
      name,
      avatarUrl,
      pokemonId: isSpecialFriend ? undefined : pokeId,
      goodScore: 0,
      careScore: 0,
      history: []
    };
  });
}
