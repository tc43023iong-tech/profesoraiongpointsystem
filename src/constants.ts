import { ScoreItem } from './types';

export const POSITIVE_ACTIONS: ScoreItem[] = [
  // Page 1
  { id: 'pos_1', icon: '🌱', name: '小鼓勵', englishName: 'Small encouragement', points: 1 },
  { id: 'pos_2', icon: '🙋‍♂️', name: '積極參與', englishName: 'Good participation', points: 2 },
  { id: 'pos_3', icon: '👍', name: '讚讚讚~', englishName: 'Amazing amazing!', points: 3 },
  { id: 'pos_4', icon: '👩‍🏫', name: '尊重老師！', englishName: 'Respect Miss Iong!', points: 5 },
  { id: 'pos_5', icon: '❤️', name: '你太讓容老師高興了😊！', englishName: 'You made Miss Iong so happy! 😊', points: 7 },
  { id: 'pos_6', icon: '🌟', name: '知錯能改，讚讚讚！', englishName: 'Correcting mistakes, great job!', points: 8 },
  // Page 2
  { id: 'pos_7', icon: '🏆', name: '你簡直太棒了🥳👍！', englishName: 'You are simply amazing 🥳👍!', points: 10 },
  { id: 'pos_8', icon: '📝', name: '提前完成作業', englishName: 'Early homework completion', points: 15 },
  { id: 'pos_9', icon: '🌈', name: '你超級無敵棒！！！！！', englishName: 'You are super duper amazing!!!!!', points: 20 },
  { id: 'pos_10', icon: '⭐', name: '不得了！不得了！', englishName: 'Unbelievable! Amazing!', points: 30 },
  { id: 'pos_11', icon: '🩹', name: '啦啦啦~你治癒了老師', englishName: 'La la la~ You healed the teacher', points: 40 },
  { id: 'pos_12', icon: '💯', name: '默測考100或以上', englishName: 'Quiz/Test 100 or above', points: 50 }
];

export const NEGATIVE_ACTIONS: ScoreItem[] = [
  // Page 1
  { id: 'neg_1', icon: '✨', name: '溫馨提示', englishName: 'Gentle reminder', points: -1 },
  { id: 'neg_2', icon: '⚠️', name: '小懲大戒', englishName: 'Small punishment, big warning', points: -2 },
  { id: 'neg_3', icon: '😠', name: '態度欠佳', englishName: 'Bad attitude', points: -3 },
  { id: 'neg_4', icon: '📢', name: '過於吵鬧', englishName: 'Noisy', points: -3 },
  { id: 'neg_5', icon: '🏃', name: '離開座位', englishName: 'Leaving seat', points: -3 },
  { id: 'neg_6', icon: '🤐', name: '不舉手發言，0禮貌', englishName: 'Speaking without raising hand, zero manners', points: -5 },
  // Page 2
  { id: 'neg_7', icon: '🛑', name: '對容老師無禮', englishName: 'Disrespectful to Miss Iong', points: -10 },
  { id: 'neg_8', icon: '🚽', name: '我要喝水/去洗手間...', englishName: 'Asking for water/toilet...', points: -15 },
  { id: 'neg_9', icon: '❌', name: '欠交作業', englishName: 'Missing homework', points: -15 },
  { id: 'neg_10', icon: '💔', name: '你太令容老師失望了😢！', englishName: 'You disappointed Miss Iong! 😢', points: -20 },
  { id: 'neg_11', icon: '💀', name: '完蛋了，完蛋了...', englishName: "Oh no, it's over...", points: -30 },
  { id: 'neg_12', icon: '😔', name: '屢勸不改，態度惡劣', englishName: 'Repeated warnings, bad attitude', points: -40 }
];
