import React, { useState, useMemo } from 'react';
import { Student } from '../types';
import { X, Search, Shuffle, Sparkles, Smile, Upload, Image, HelpCircle, Heart } from 'lucide-react';
import { FRIEND_STICKERS, getPokemonAvatarUrl } from '../studentsData';

// Reference newly generated high-quality cute painter illustrations as static paths
const cuteAngelCat = '/src/assets/images/cute_angel_cat_1780146111898.png';
const cuteHatDuck = '/src/assets/images/cute_hat_duck_1780146130966.png';

interface CutePreset {
  name: string;
  url: string;
  desc: string;
  emoji: string;
}

const CUTE_PRESETS: CutePreset[] = [
  {
    name: '天使白貓與雲朵',
    url: cuteAngelCat,
    desc: '綿綿毛茸茸',
    emoji: '👼'
  },
  {
    name: '元氣探險小黃鴨',
    url: cuteHatDuck,
    desc: '可愛小足跡',
    emoji: '🎒'
  },
  {
    name: '萌萌小白貓',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f431.png',
    desc: '愛撒嬌的雪白貓咪',
    emoji: '🐱'
  },
  {
    name: '元氣柴犬',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f436.png',
    desc: '充滿活力與歡笑',
    emoji: '🐶'
  },
  {
    name: '胖胖圓滾熊貓',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f43c.png',
    desc: '最愛吃竹子的國寶',
    emoji: '🐼'
  },
  {
    name: '呆萌抱抱無尾熊',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f428.png',
    desc: '貼心又溫柔的樹袋熊',
    emoji: '🐨'
  },
  {
    name: '蹦蹦跳跳粉兔',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f430.png',
    desc: '耳朵長長的小兔子',
    emoji: '🐰'
  },
  {
    name: '極地搖擺企鵝',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f427.png',
    desc: '穿著燕尾服的小紳士',
    emoji: '🐧'
  },
  {
    name: '溫厚大棕熊',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f43b.png',
    desc: '守護班級的小衛士',
    emoji: '🐻'
  },
  {
    name: '幸福紅嘴小粉豬',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f437.png',
    desc: '福氣滿滿的小驚喜',
    emoji: '🐷'
  },
  {
    name: '開心大眼綠青蛙',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f438.png',
    desc: '愛唱歌的水潭歌星',
    emoji: '🐸'
  },
  {
    name: '精靈古怪紅狐狸',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f98a.png',
    desc: '聰明伶俐的小智多星',
    emoji: '🦊'
  },
  {
    name: '夢幻彩色獨角獸',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f984.png',
    desc: '飛行在彩虹上的神獸',
    emoji: '🦄'
  },
  {
    name: '破殼而出萌黃雞',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f425.png',
    desc: '毛茸茸的可愛小生命',
    emoji: '🐥'
  },
  {
    name: '勤勞蜜蜂飛行員',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f41d.png',
    desc: '嗡嗡嗡專注學習的蜜蜂',
    emoji: '🐝'
  },
  {
    name: '歡跳逐浪藍海豚',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f42c.png',
    desc: '聰明活潑的海洋精靈',
    emoji: '🐬'
  },
  {
    name: '紅通通萌萌小章魚',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f419.png',
    desc: '有多隻手幫忙寫字的小章魚',
    emoji: '🐙'
  },
  {
    name: '雄赳赳Ｑ版獅子王',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f981.png',
    desc: '勇敢前行的小班長',
    emoji: '🦁'
  },
  {
    name: '綠色探險恐龍寶寶',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f996.png',
    desc: '充滿好奇的超人恐龍',
    emoji: '🦖'
  },
  {
    name: '招財祥瑞可愛小飛龍',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f432.png',
    desc: '飛舞在天空送祝福的小龍',
    emoji: '🐲'
  },
  {
    name: '開心小猴子',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f435.png',
    desc: '機靈調皮的小探險家',
    emoji: '🐵'
  },
  {
    name: '軟萌毛毛小倉鼠',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f439.png',
    desc: '臉頰塞滿美味葵花籽',
    emoji: '🐹'
  },
  {
    name: '活力斑紋小老虎',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f42f.png',
    desc: '威風凜凜又可愛',
    emoji: '🐯'
  },
  {
    name: '機靈尋寶小灰鼠',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f42d.png',
    desc: '耳朵圓圓心思細',
    emoji: '🐭'
  },
  {
    name: '溫和勤勞乳牛寶寶',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f42e.png',
    desc: '踏踏實實愛學習',
    emoji: '🐮'
  },
  {
    name: '拍拍翅膀大公雞',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f414.png',
    desc: '起床早早愛讀書',
    emoji: '🐔'
  },
  {
    name: '出殼探頭萌小雞',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f423.png',
    desc: '探望世界第一眼',
    emoji: '🐣'
  },
  {
    name: '毛絨圓臉小黃黃',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f424.png',
    desc: '最愛在草地跑來跑去',
    emoji: '🐤'
  },
  {
    name: '歡唱林中小藍鳥',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f426.png',
    desc: '歌聲清脆響亮',
    emoji: '🐦'
  },
  {
    name: '智慧守護小夜鷹',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f989.png',
    desc: '夜裏看得很清楚',
    emoji: '🦉'
  },
  {
    name: '風馳電掣帥氣小馬',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f434.png',
    desc: '奔跑如風勇敢前行',
    emoji: '🐴'
  },
  {
    name: '雲朵咩咩小白羊',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f411.png',
    desc: '軟糯溫順的綿羊',
    emoji: '🐑'
  },
  {
    name: '七彩斑斕寄居貝',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f41a.png',
    desc: '收集海浪的聲音',
    emoji: '🐚'
  },
  {
    name: '鼓氣呼呼粉河豚',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f421.png',
    desc: '氣鼓鼓的十分可愛',
    emoji: '🐡'
  },
  {
    name: '慢吞吞壽星烏龜',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f422.png',
    desc: '一步一腳印堅持不懈',
    emoji: '🐢'
  },
  {
    name: '斑斕彩翅美蝴蝶',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f98b.png',
    desc: '在花叢中起舞',
    emoji: '🦋'
  },
  {
    name: '七星高照紅瓢蟲',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f41e.png',
    desc: '帶來幸運的圓滾滾',
    emoji: '🐞'
  },
  {
    name: '舞動雙鉗大龍蝦',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f99e.png',
    desc: '深海大鉗探險家',
    emoji: '🦞'
  },
  {
    name: '噴水溫柔大藍鯨',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f433.png',
    desc: '遨遊蔚藍大海守護星',
    emoji: '🐳'
  },
  {
    name: '萌萌熱帶斑馬魚',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f420.png',
    desc: '穿著漂亮條紋睡衣',
    emoji: '🐠'
  },
  {
    name: '威武橫行萌萌蟹',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f980.png',
    desc: '左右搖擺打招呼',
    emoji: '🦀'
  },
  {
    name: '森林貪吃松鼠仔',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f43f.png',
    desc: '尾巴蓬蓬超愛存松果',
    emoji: '🐿️'
  },
  {
    name: '溫和害羞小刺蝟',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f994.png',
    desc: '遇到生人團成球球',
    emoji: '🦔'
  },
  {
    name: '暗夜守護萌蝙蝠',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f987.png',
    desc: '擁有一對酷炫的小翅膀',
    emoji: '🦇'
  },
  {
    name: '森林漫步梅花鹿',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f98c.png',
    desc: '斑點精緻溫柔的大眼睛',
    emoji: '🦌'
  },
  {
    name: '搏擊長空傲嬌鷹',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f985.png',
    desc: '展翅翺翔大智慧',
    emoji: '🦅'
  },
  {
    name: '搖擺走路小家鴨',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f986.png',
    desc: '嘎嘎歡笑熱愛游泳',
    emoji: '🦆'
  },
  {
    name: '霸氣破浪小鯊魚',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f988.png',
    desc: '海洋游速超快的健將',
    emoji: '🦈'
  },
  {
    name: '慢吞吞爬行小青蟲',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f41b.png',
    desc: '努力吃葉子化身成蝶',
    emoji: '🐛'
  },
  {
    name: '微風探頭步小蝸牛',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f40c.png',
    desc: '背著溫暖小屋慢慢前行',
    emoji: '🐌'
  },
  {
    name: '盛開微笑粉櫻花',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f338.png',
    desc: '教室香噴噴綻放精彩',
    emoji: '🌸'
  },
  {
    name: '陽光燦爛向日葵',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f33b.png',
    desc: '永遠朝著夢想和陽光生長',
    emoji: '🌻'
  },
  {
    name: '暖融融秋天小楓葉',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f341.png',
    desc: '落葉寫出金黃的詩篇',
    emoji: '🍁'
  },
  {
    name: '幸運祝福幸運草',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f340.png',
    desc: '給小朋友帶來滿滿的好運',
    emoji: '🍀'
  },
  {
    name: '夜空中閃亮許願星',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u2b50.png',
    desc: '照亮努力前行的小腳步',
    emoji: '⭐'
  },
  {
    name: '七彩好運幸運彩虹',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f308.png',
    desc: '橫跨天空的斑斕橋樑',
    emoji: '🌈'
  },
  {
    name: '溫暖微笑大太陽',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f31e.png',
    desc: '普照班級送來無限溫暖',
    emoji: '🌞'
  },
  {
    name: '夢幻柔光彎彎月',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f319.png',
    desc: '守護晚安夢境的小天使',
    emoji: '🌙'
  },
  {
    name: '機伶探路小老鼠',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f401.png',
    desc: '做事精細靈巧',
    emoji: '🐀'
  },
  {
    name: '踏實開荒小水牛',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f402.png',
    desc: '一步一腳印有耐心',
    emoji: '🐂'
  },
  {
    name: '威風斑斕大老虎',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f405.png',
    desc: '朝氣蓬勃有活力',
    emoji: '🐅'
  },
  {
    name: '雪白長耳小萌兔',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f407.png',
    desc: '溫柔善良懂禮貌',
    emoji: '🐇'
  },
  {
    name: '五彩祥雲小飛龍',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f409.png',
    desc: '前途無量小希望',
    emoji: '🐉'
  },
  {
    name: '乖巧盤繞綠色小蛇',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f40d.png',
    desc: '冷靜思考的小精靈',
    emoji: '🐍'
  },
  {
    name: '英勇奔騰小駿馬',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f40e.png',
    desc: '勇往直前不退縮',
    emoji: '🐎'
  },
  {
    name: '彎角溫柔大公羊',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f40f.png',
    desc: '謙讓有禮好朋友',
    emoji: '🐏'
  },
  {
    name: '小山坡快樂小山羊',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f410.png',
    desc: '蹦蹦跳跳愛攀登',
    emoji: '🐐'
  },
  {
    name: '頑皮長尾小靈猴',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f412.png',
    desc: '古靈精怪點子多',
    emoji: '🐒'
  },
  {
    name: '昂首啼鳴大花雞',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f413.png',
    desc: '勤奮好學起得早',
    emoji: '🐓'
  },
  {
    name: '忠誠陪伴小黃狗',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f415.png',
    desc: '熱誠守信用夥伴',
    emoji: '🐕'
  },
  {
    name: '粉嫩招財小肥豬',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f416.png',
    desc: '幸福快樂沒煩惱',
    emoji: '🐖'
  },
  {
    name: '雙峰漫步大駱駝',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f42a.png',
    desc: '堅韌不拔走沙漠',
    emoji: '🐫'
  },
  {
    name: '長鼻開懷大象',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f418.png',
    desc: '力量無窮心寬廣',
    emoji: '🐘'
  },
  {
    name: '叢林巡邏小豹子',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f406.png',
    desc: '敏捷威武跑得快',
    emoji: '🐆'
  },
  {
    name: '快樂斑紋斑馬',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f993.png',
    desc: '身穿黑白條紋衫',
    emoji: '🦓'
  },
  {
    name: '高個子長頸鹿',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f992.png',
    desc: '看得遠的高瞻遠矚',
    emoji: '🦒'
  },
  {
    name: '袋鼠媽媽與寶寶',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f998.png',
    desc: '跳躍前進快樂多',
    emoji: '🦘'
  },
  {
    name: '溫柔治癒小樹獺',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9a5.png',
    desc: '慢條斯理心平氣和',
    emoji: '🦥'
  },
  {
    name: '活潑戲水小水獺',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9a6.png',
    desc: '聰明伶俐愛乾淨',
    emoji: '🦦'
  },
  {
    name: '辛勤建造小海狸',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9ab.png',
    desc: '動手動腦小工程師',
    emoji: '🦫'
  },
  {
    name: '優雅飛舞小天鵝',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9a2.png',
    desc: '高雅純潔有風度',
    emoji: '🦢'
  },
  {
    name: '單腳站立粉火烈鳥',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9a9.png',
    desc: '高挑美麗的小舞者',
    emoji: '🦩'
  },
  {
    name: '開屏炫麗大孔雀',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f99a.png',
    desc: '五彩繽紛引人注目',
    emoji: '🦚'
  },
  {
    name: '聰明學舌綠鸚鵡',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f99c.png',
    desc: '口才一流小達人',
    emoji: '🦜'
  },
  {
    name: '極地鼓掌小海豹',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9a3.png',
    desc: '熱情鼓舞送掌聲',
    emoji: '🦭'
  },
  {
    name: '金黃游動小鯉魚',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f41f.png',
    desc: '游來游去無憂無慮',
    emoji: '🐟'
  },
  {
    name: '綠絨沙灘小蜥蜴',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f98e.png',
    desc: '靈活攀爬的小健將',
    emoji: '🦎'
  },
  {
    name: '開懷長頸大龍',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f995.png',
    desc: '史前溫柔的大寶寶',
    emoji: '🦕'
  },
  {
    name: '紅彤彤香甜大蘋果',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f34e.png',
    desc: '平平安安好學童',
    emoji: '🍎'
  },
  {
    name: '清脆多汁甜香梨',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f350.png',
    desc: '甜甜蜜蜜水靈靈',
    emoji: '🍐'
  },
  {
    name: '粉嫩多汁大蜜桃',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f351.png',
    desc: '桃李滿天下',
    emoji: '🍑'
  },
  {
    name: '雙生紅透小櫻桃',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f352.png',
    desc: '形影不離好朋友',
    emoji: '🍒'
  },
  {
    name: '甜甜人見人愛草莓',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f353.png',
    desc: '草莓般甜美的笑容',
    emoji: '🍓'
  },
  {
    name: '消暑清爽大西瓜',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f349.png',
    desc: '暑假快樂甜滋滋',
    emoji: '🍉'
  },
  {
    name: '彎彎營養香蕉船',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f34c.png',
    desc: '多吃水果身體棒',
    emoji: '🍌'
  },
  {
    name: '金黃王冠大鳳梨',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f34d.png',
    desc: '鳳梨頭像金光閃閃',
    emoji: '🍍'
  },
  {
    name: '成串紫色大葡萄',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f347.png',
    desc: '碩果累累收穫多',
    emoji: '🍇'
  },
  {
    name: '清甜圓潤大哈密瓜',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f348.png',
    desc: '散發淡淡蜜瓜甜香',
    emoji: '🍈'
  },
  {
    name: '酸甜開胃小檸檬',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f34b.png',
    desc: '清新活力每一天',
    emoji: '🍋'
  },
  {
    name: '圓滾滾多汁大橙子',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f34a.png',
    desc: '陽光橙心想事成',
    emoji: '🍊'
  },
  {
    name: '紅彤彤大番茄',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f345.png',
    desc: '番茄炒蛋元氣十足',
    emoji: '🍅'
  },
  {
    name: '脆生生大胡蘿蔔',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f955.png',
    desc: '小免最愛營養豐富',
    emoji: '🥕'
  },
  {
    name: '綠油油大西蘭花',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f966.png',
    desc: '健康飲食身體強',
    emoji: '🥦'
  },
  {
    name: '小雨傘紅斑點蘑菇',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f344.png',
    desc: '森林深處的童話小草',
    emoji: '🍄'
  },
  {
    name: '溫柔微笑小白雲',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u2601.png',
    desc: '隨風飄然好心情',
    emoji: '☁️'
  },
  {
    name: '冬天快樂紅帽雪人',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u26c4.png',
    desc: '歡歌笑語雪花飄',
    emoji: '⛄'
  },
  {
    name: '絢麗多彩許願氣球',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f388.png',
    desc: '飛向蔚藍高天空',
    emoji: '🎈'
  },
  {
    name: '優雅綻放粉紅鬱金香',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f337.png',
    desc: '美麗春天悄悄來臨',
    emoji: '🌷'
  },
  {
    name: '熱情奔放紅扶桑',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f33a.png',
    desc: '海島陽光燦爛花朵',
    emoji: '🌺'
  },
  {
    name: '嬌艷欲滴紅玫瑰',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f339.png',
    desc: '充滿愛心的小花朵',
    emoji: '🌹'
  },
  {
    name: '治癒綠色香香葉',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f33f.png',
    desc: '散發淡淡的大自然清香',
    emoji: '🌿'
  },
  {
    name: '茁壯成長小綠芽',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f331.png',
    desc: '天天向上快快長大',
    emoji: '🌱'
  },
  {
    name: '夢幻甜香波棒糖',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f36d.png',
    desc: '給努力進步的小獎勵',
    emoji: '🍭'
  },
  {
    name: '入口即化甜筒冰淇淋',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f366.png',
    desc: '消暑甜蜜第一選',
    emoji: '🍦'
  },
  {
    name: '草莓醬奶油小蛋糕',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f370.png',
    desc: '祝你每天都像過生日',
    emoji: '🍰'
  },
  {
    name: '巧克力粉霜甜甜圈',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f369.png',
    desc: '圓圓滿滿常歡樂',
    emoji: '🍩'
  },
  {
    name: '燕麥碎烤香曲奇饼',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f36a.png',
    desc: '香香脆脆小點心',
    emoji: '🍪'
  },
  {
    name: '香甜脆口爆米花',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f37f.png',
    desc: '看電影時最佳拍檔',
    emoji: '🍿'
  },
  {
    name: '絲滑濃醇黑巧克力',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f36b.png',
    desc: '甜中帶點小溫暖',
    emoji: '🍫'
  },
  {
    name: '香甜雙扭水果糖',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f36c.png',
    desc: '嘴裏含顆糖心情甜滋滋',
    emoji: '🍬'
  },
  {
    name: '牽線飛翔七彩風箏',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1fa81.png',
    desc: '迎風飛揚飛得高',
    emoji: '🪁'
  },
  {
    name: '回旋快樂粉藍悠悠球',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1fa80.png',
    desc: '指尖旋轉樂趣多',
    emoji: '🪀'
  },
  {
    name: '軟蓬溫暖泰迪熊',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9f8.png',
    desc: '晚安陪伴好夥伴',
    emoji: '🧸'
  },
  {
    name: '心心眼粉萌貓咪',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f63b.png',
    desc: '滿眼都是小魚乾跟愛心',
    emoji: '😻'
  },
  {
    name: '迎春微笑大臉臉',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f600.png',
    desc: '天天開心、元氣滿滿',
    emoji: '😀'
  },
  {
    name: '愛搞怪眼斜斜鬼臉',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f92a.png',
    desc: '頑皮幽默小可愛',
    emoji: '🤪'
  },
  {
    name: '帥呆酷帥太陽鏡臉',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f60e.png',
    desc: '信心十足、帥氣滿分',
    emoji: '😎'
  },
  {
    name: '求抱抱溫和笑臉',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f917.png',
    desc: '敞開雙手熱情歡迎',
    emoji: '🤗'
  },
  {
    name: '碧海深處游水大鯨',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f40b.png',
    desc: '大海裏的溫柔大精靈',
    emoji: '🐋'
  },
  {
    name: '憨厚胖圓大河馬',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f99b.png',
    desc: '憨萌可愛的小吃貨',
    emoji: '🦛'
  },
  {
    name: '單峰沉穩沙灘駱駝',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f42a.png',
    desc: '默默陪伴安靜守候',
    emoji: '🐪'
  },
  {
    name: '強壯健壯野水牛',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f403.png',
    desc: '堅定可靠有力量',
    emoji: '🐃'
  },
  {
    name: '青草地上大白牛',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f404.png',
    desc: '默默無聞有奉獻精神',
    emoji: '🐄'
  },
  {
    name: '樂哈哈綠皮大鱷魚',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f40a.png',
    desc: '張大嘴巴笑哈哈',
    emoji: '🐊'
  },
  {
    name: '智慧無比小蜜獾',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9a1.png',
    desc: '不怕困難的勇氣之王',
    emoji: '🦡'
  },
  {
    name: '高原漫步萌駝駝',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f99f.png',
    desc: '溫順軟糯的草泥馬',
    emoji: '🦙'
  },
  {
    name: '古怪孤獨渡渡鳥',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9a4.png',
    desc: '珍惜眼前快樂時光',
    emoji: '🦤'
  },
  {
    name: '淘氣斑斕小臭鼬',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9a8.png',
    desc: '靈活調皮小驚喜',
    emoji: '🦨'
  },
  {
    name: '勤勞織網小蜘蛛',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f577.png',
    desc: '精細編織大夢想',
    emoji: '🕷️'
  },
  {
    name: '智慧遠揚大灰狼',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f43a.png',
    desc: '思維敏捷的小探險家',
    emoji: '🐺'
  },
  {
    name: '甜蜜甘醇小蜜罐',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f36f.png',
    desc: '生活像沾了蜜糖一樣甜',
    emoji: '🍯'
  },
  {
    name: '焦糖軟嫩小布丁',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f36e.png',
    desc: 'Q彈又細滑的布丁',
    emoji: '🍮'
  },
  {
    name: '夏日繽紛蜜糖刨冰',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f367.png',
    desc: '給夏天降降火的小刨冰',
    emoji: '🍧'
  },
  {
    name: '招牌珍珠大奶茶',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9cb.png',
    desc: '來一杯大容量珍珠奶茶',
    emoji: '🧋'
  },
  {
    name: '砰砰漫天狂歡紙筒',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f389.png',
    desc: '歡慶大家的優異進步',
    emoji: '🎉'
  },
  {
    name: '彩紙漫天慶典球球',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f38a.png',
    desc: '五彩斑斕灑下歡笑',
    emoji: '🎊'
  },
  {
    name: '優雅精緻蝴蝶緞帶',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f380.png',
    desc: '送給小公主的漂亮裝飾',
    emoji: '🎀'
  },
  {
    name: '星光璀璨許願禮箱',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f381.png',
    desc: '拆開有滿滿的幸運好禮',
    emoji: '🎁'
  },
  {
    name: '冠亞榮耀大金獎盃',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f3c6.png',
    desc: '第一名得主，你是班級驕傲',
    emoji: '🏆'
  },
  {
    name: '表現突出金色獎章',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f396.png',
    desc: '熱愛學習的卓越代表',
    emoji: '🏅'
  },
  {
    name: '精準命中大靶心',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f3af.png',
    desc: '目標明確，每次都正中紅心',
    emoji: '🎯'
  },
  {
    name: '超級幸運拉霸樂',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f3b0.png',
    desc: '驚喜連連，幸運值爆棚',
    emoji: '🎰'
  },
  {
    name: '藝術無限調色盤板',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f3a8.png',
    desc: '抹出人生的繽紛色彩',
    emoji: '🎨'
  },
  {
    name: '元氣亮麗雙肩書包',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f392.png',
    desc: '裝滿知識，快樂上學去',
    emoji: '🎒'
  },
  {
    name: '彩針果醬紙杯蛋糕',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9c1.png',
    desc: '精巧甜蜜的奶糖蛋糕',
    emoji: '🧁'
  },
  {
    name: '快樂高歌大五線譜',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f3bc.png',
    desc: '譜寫班級歡樂與和諧',
    emoji: '🎼'
  },
  {
    name: '熱烈搖滾木吉他',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f3b8.png',
    desc: '彈奏熱情的音樂旋律',
    emoji: '🎸'
  },
  {
    name: '飛舞吧音樂彩符',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f3b5.png',
    desc: '旋律在耳邊快樂跳動',
    emoji: '🎵'
  },
  {
    name: '酷玩炫彩手柄',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f3ae.png',
    desc: '下課放鬆的智力大比拼',
    emoji: '🎮'
  },
  {
    name: '沖上雲霄宇航火箭',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f680.png',
    desc: '探索浩瀚未知的宇宙',
    emoji: '🚀'
  },
  {
    name: '神祕漫遊天外飛碟',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f6f8.png',
    desc: '科幻奇妙的太空來客',
    emoji: '🛸'
  },
  {
    name: '嘹亮高亢小銅號',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f4ef.png',
    desc: '吹響集結與前進的號角',
    emoji: '📯'
  },
  {
    name: '紅磚瓦美麗大校園',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f3eb.png',
    desc: '在這裡一起快樂學習長大',
    emoji: '🏫'
  }
];

const CUTE_PRESETS_2: CutePreset[] = [
  {
    name: '萌萌小黃鴨',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f424.png',
    desc: '可愛頑皮的小鴨子',
    emoji: '🐤'
  },
  {
    name: '溫和獨角獸',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f984.png',
    desc: '夢幻與純潔的象徵',
    emoji: '🦄'
  },
  {
    name: '機靈紅狐狸',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f98a.png',
    desc: '聰明無比的小智多星',
    emoji: '🦊'
  },
  {
    name: '圓滾小企鵝',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f427.png',
    desc: '搖搖晃晃前進吧',
    emoji: '🐧'
  },
  {
    name: '呆萌無尾熊',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f428.png',
    desc: '最愛考拉抱抱',
    emoji: '🐨'
  },
  {
    name: '彩虹夢境',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f308.png',
    desc: '帶給我們無盡希望',
    emoji: '🌈'
  },
  {
    name: '小松鼠愛果果',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f43f.png',
    desc: '愛存松果的小精靈',
    emoji: '🐿️'
  },
  {
    name: '害羞小刺蝟',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f994.png',
    desc: '背上有奇特的小刺刺',
    emoji: '🦔'
  },
  {
    name: '游泳小海獺',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9a6.png',
    desc: '漂浮在水上的游泳能手',
    emoji: '🦦'
  },
  {
    name: '快樂小章魚',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f419.png',
    desc: '多隻小手來幫忙了',
    emoji: '🐙'
  },
  {
    name: '七彩熱帶魚',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f420.png',
    desc: '在珊瑚礁裡捉迷藏',
    emoji: '🐠'
  },
  {
    name: '氣鼓鼓河豚',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f421.png',
    desc: '一生氣就把肚子填滿風',
    emoji: '🐡'
  },
  {
    name: '紅色大螃蟹',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f980.png',
    desc: '橫著走的陽光沙灘歌手',
    emoji: '🦀'
  },
  {
    name: '藍色俏皮海豚',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f42c.png',
    desc: '躍出海面的微笑大使',
    emoji: '🐬'
  },
  {
    name: '霸氣暴龍寶寶',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f996.png',
    desc: '大吼一聲我是最棒的',
    emoji: '🦖'
  },
  {
    name: '溫和雷龍寶寶',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f995.png',
    desc: '愛吃青草的長脖子精靈',
    emoji: '🦕'
  },
  {
    name: '草莓冰淇淋粉筒',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f366.png',
    desc: '融化你心靈的甜蜜味道',
    emoji: '🍦'
  },
  {
    name: '彩針烤甜甜圈',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f369.png',
    desc: '生活總是要圓圓滿滿的',
    emoji: '🍩'
  },
  {
    name: '香脆巧克力曲奇',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f36a.png',
    desc: '酥脆可口的大餅乾',
    emoji: '🍪'
  },
  {
    name: '奶油黑森林草莓蛋糕',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f370.png',
    desc: '送給小壽星的美味禮物',
    emoji: '🍰'
  },
  {
    name: '五彩繽紛水果硬糖',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f36c.png',
    desc: '甜滋滋的童年回憶',
    emoji: '🍬'
  },
  {
    name: '旋風波浪棒棒糖',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f36d.png',
    desc: '轉動幸運與甜蜜的力量',
    emoji: '🍭'
  },
  {
    name: '美味巨無霸漢堡',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f354.png',
    desc: '多層生菜與美味肉排的結合',
    emoji: '🍔'
  },
  {
    name: '香軟紅草莓',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f353.png',
    desc: '新鮮採摘的多汁草莓',
    emoji: '🍓'
  },
  {
    name: '雙子星粉紅櫻桃',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f352.png',
    desc: '手拉手一起學習的好夥伴',
    emoji: '🍒'
  },
  {
    name: '涼爽大無核西瓜',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f349.png',
    desc: '切開滿滿的清甜涼水',
    emoji: '🍉'
  },
  {
    name: '晶瑩紫色大葡萄',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f347.png',
    desc: '一串沉甸甸的豐收果實',
    emoji: '🍇'
  },
  {
    name: '酸甜陽光小黃檸檬',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f34b.png',
    desc: '富含滿滿維生素C',
    emoji: '🍋'
  },
  {
    name: '金黃彎彎甜香蕉',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f34c.png',
    desc: '補充能量，元氣滿格',
    emoji: '🍌'
  },
  {
    name: '夏威夷熱帶鳳梨',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f34d.png',
    desc: '戴著金黃皇冠的霸氣水果',
    emoji: '🍍'
  },
  {
    name: '太空發光小飛碟',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f6f8.png',
    desc: '載著夢想前行的小飛碟',
    emoji: '🛸'
  },
  {
    name: '沖上月球科技火箭',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f680.png',
    desc: '承載大家的希望探索世界',
    emoji: '🚀'
  },
  {
    name: '發光紅氣球',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f388.png',
    desc: '飄向高空，夢想永無止境',
    emoji: '🎈'
  },
  {
    name: '萌系小瓢蟲',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f41e.png',
    desc: '森林花間的紅色小精靈',
    emoji: '🐞'
  },
  {
    name: '發光愛心盒',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f496.png',
    desc: '閃閃發光的粉色浪漫愛心',
    emoji: '💖'
  },
  {
    name: '太空漫步小水母',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9bc.png',
    desc: '半透明的深海發光水母',
    emoji: '🪼'
  },
  {
    name: '胖胖圓滾熊貓臉',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f43c.png',
    desc: '安靜萌動招人喜愛',
    emoji: '🐼'
  },
  {
    name: '金黃閃耀小星星',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u2b50.png',
    desc: '照亮我們班級的夜空星光',
    emoji: '⭐'
  },
  {
    name: '美味雙層芝士披薩',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f355.png',
    desc: '拉絲美味，快樂分享',
    emoji: '🍕'
  },
  {
    name: '大眼綠色萌萌蛙',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f438.png',
    desc: '池塘裡最耀眼的明星',
    emoji: '🐸'
  },
  {
    name: '微笑柴犬大臉',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f436.png',
    desc: '忠誠好朋友，天天想著你',
    emoji: '🐶'
  },
  {
    name: '調皮可愛粉兔臉',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f430.png',
    desc: '長耳朵抖一抖，好運全帶走',
    emoji: '🐰'
  },
  {
    name: '大眼睛萌化小咪',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f431.png',
    desc: '喵嗚~ 需要更多的溫柔抱抱',
    emoji: '🐱'
  },
  {
    name: '圓滾滾Q彈大蜜蜂',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f41d.png',
    desc: '勤勞工作的小可愛',
    emoji: '🐝'
  },
  {
    name: '七彩斑斕泡泡龍',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f432.png',
    desc: '飛天祥瑞，喜樂安康',
    emoji: '🐲'
  },
  {
    name: '快樂高歌小鳥',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f426.png',
    desc: '每天早晨為你歌唱',
    emoji: '🐦'
  },
  {
    name: '林間玩耍溫厚大熊',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f43b.png',
    desc: '安靜守護大家的勇氣大熊',
    emoji: '🐻'
  },
  {
    name: '甜絲絲小紅富士蘋果',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f34e.png',
    desc: '一日一蘋果，醫生遠離我',
    emoji: '🍎'
  },
  {
    name: 'Q萌智力型小精靈',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f47e.png',
    desc: '經典與創意的像素世界',
    emoji: '👾'
  },
  {
    name: '太空冒險小機器人',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f916.png',
    desc: '擁有超級運算的機械助手',
    emoji: '🤖'
  }
];

const CUTE_PRESETS_3: CutePreset[] = [
  {
    name: '溫和林間小鹿',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f98c.png',
    desc: '活潑跳躍林間的小鹿',
    emoji: '🦌'
  },
  {
    name: '威風探險小虎',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f42f.png',
    desc: '威風凜凜又愛笑的老虎寶寶',
    emoji: '🐯'
  },
  {
    name: '福氣滿滿胖豬',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f437.png',
    desc: '福氣滿滿的小粉豬臉',
    emoji: '🐷'
  },
  {
    name: '勤勞踏實牛牛',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f42e.png',
    desc: '踏踏實實努力耕耘',
    emoji: '🐮'
  },
  {
    name: '金毛勇氣獅子',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f981.png',
    desc: '勇敢面對一切困難的小獅王',
    emoji: '🦁'
  },
  {
    name: '古靈精怪小鼠',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f42d.png',
    desc: '愛動腦筋的小白鼠',
    emoji: '🐭'
  },
  {
    name: '棉花糖長耳兔',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f430.png',
    desc: '長耳朵抖一抖的萌趣白兔',
    emoji: '🐰'
  },
  {
    name: '憨厚溫暖熊熊',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f43b.png',
    desc: '溫厚踏實的森林小夥伴',
    emoji: '🐻'
  },
  {
    name: '圓滾黑眼熊貓',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f43c.png',
    desc: '圓頭圓腦的可愛小國寶',
    emoji: '🐼'
  },
  {
    name: '愛睡覺無尾熊',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f428.png',
    desc: '慵懶趴在樹梢上的萌寶',
    emoji: '🐨'
  },
  {
    name: '機靈紅毛小狐',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f98a.png',
    desc: '森林中最聰明的小狐狸',
    emoji: '🦊'
  },
  {
    name: '調皮快樂猴子',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f435.png',
    desc: '蹦蹦跳跳十分逗人喜愛',
    emoji: '🐵'
  },
  {
    name: '七彩祥雲萌龍',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f432.png',
    desc: '傳來喜氣與祝福的小祥龍',
    emoji: '🐲'
  },
  {
    name: '破殼小雞寶寶',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f425.png',
    desc: '剛探出頭來打招呼的嫩黃雞',
    emoji: '🐥'
  },
  {
    name: '極地擺尾企鵝',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f427.png',
    desc: '在冰川上快樂滑行的小紳士',
    emoji: '🐧'
  },
  {
    name: '快樂池塘蛙蛙',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f438.png',
    desc: '唱起歌來清脆響亮的大眼蛙',
    emoji: '🐸'
  },
  {
    name: '多手學習章魚',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f419.png',
    desc: '多隻觸手同時寫作業的章魚',
    emoji: '🐙'
  },
  {
    name: '微笑海洋天使',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f42c.png',
    desc: '在藍海中起舞的微笑天使',
    emoji: '🐬'
  },
  {
    name: '愛藏堅果松鼠',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f43f.png',
    desc: '忙忙碌碌儲存松子寶貝',
    emoji: '🐿️'
  },
  {
    name: '背刺防衛刺蝟',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f994.png',
    desc: '害羞得縮成一小團的刺刺球',
    emoji: '🦔'
  },
  {
    name: '仰泳高手海獺',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9a6.png',
    desc: '愛漂浮在水上的可愛寶寶',
    emoji: '🦦'
  },
  {
    name: '彩虹夢幻飛馬',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f984.png',
    desc: '承載天真夢想的純真天馬',
    emoji: '🦄'
  },
  {
    name: '勤奮小蜜蜂',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f41d.png',
    desc: '飛舞在花間的勤勞勞動之星',
    emoji: '🐝'
  },
  {
    name: '幸運斑點瓢蟲',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f41e.png',
    desc: '草葉叢中幸運的星點瓢蟲',
    emoji: '🐞'
  },
  {
    name: '一步一腳印蝸牛',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f40c.png',
    desc: '雖然緩慢但永不停歇的旅行者',
    emoji: '🐌'
  },
  {
    name: '翩翩飛舞小蝶',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f98b.png',
    desc: '五彩斑斕的小舞者',
    emoji: '🦋'
  },
  {
    name: '霸氣吼叫小恐龍',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f996.png',
    desc: '元氣滿滿最愛大吼的霸王龍',
    emoji: '🦖'
  },
  {
    name: '長頸食草萌龍',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f995.png',
    desc: '溫柔愛學習的長脖子小雷龍',
    emoji: '🦕'
  },
  {
    name: '睿智大眼貓頭鷹',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f989.png',
    desc: '夜捕害蟲的班級大智囊',
    emoji: '🦉'
  },
  {
    name: '振翅高飛雄鷹',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f985.png',
    desc: '勇敢翺翔于碧海藍天',
    emoji: '🦅'
  },
  {
    name: '搖擺嘎嘎大鴨',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f986.png',
    desc: '嘎嘎歡笑唱新歌的水上精靈',
    emoji: '🦆'
  },
  {
    name: '優雅純潔白天鵝',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9a2.png',
    desc: '湖面上翩翩起舞的高貴舞者',
    emoji: '🦢'
  },
  {
    name: '粉紅站立紅鸛',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9a9.png',
    desc: '有一雙修長美腿的水鳥寶寶',
    emoji: '🦩'
  },
  {
    name: '美麗開屏孔雀',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f99a.png',
    desc: '展示五彩耀眼翠綠羽毛',
    emoji: '🦚'
  },
  {
    name: '愛說好話鸚鵡',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f99c.png',
    desc: '愛模仿好話的亮麗小鸚鵡',
    emoji: '🦜'
  },
  {
    name: '長壽穩重小龜',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f422.png',
    desc: '一步步朝著終點爬去的小智慧',
    emoji: '🐢'
  },
  {
    name: '靈活扭扭青蛇',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f40d.png',
    desc: '靈活穿梭林間的可憐小可愛',
    emoji: '🐍'
  },
  {
    name: '噴水溫和藍鯨',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f433.png',
    desc: '噴起好幾米噴泉的深海守護者',
    emoji: '🐳'
  },
  {
    name: '海洋巡邏鯊鯊',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f988.png',
    desc: '威武敏銳的海洋安全巡警',
    emoji: '🦈'
  },
  {
    name: '金黃幸運閃星',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u2b50.png',
    desc: '在夜空裡閃耀的百分小金星',
    emoji: '⭐'
  },
  {
    name: '溫暖元氣太陽',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u2600.png',
    desc: '散發出暖暖熱量的小太陽',
    emoji: '☀️'
  },
  {
    name: '滋潤大地雨雲',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f327.png',
    desc: '淅淅瀝瀝滋潤萬物生長的細雨雲',
    emoji: '🌧️'
  },
  {
    name: '色彩繽紛彩虹',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f308.png',
    desc: '風雨過後最璀璨好看的奇景',
    emoji: '🌈'
  },
  {
    name: '夢想高飛氣球',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f388.png',
    desc: '飄到雲彩上裝滿祝福的紅氣球',
    emoji: '🎈'
  },
  {
    name: '閃閃滿分愛心',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f496.png',
    desc: '閃耀著百分關懷的情意之心',
    emoji: '💖'
  },
  {
    name: '草莓紙杯蛋糕',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9c1.png',
    desc: '甜甜柔軟的草莓奶油紙杯蛋糕',
    emoji: '🧁'
  },
  {
    name: '美味七彩甜甜圈',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f369.png',
    desc: '撒著巧克力針在舌尖起舞',
    emoji: '🍩'
  },
  {
    name: '巧克力碎曲奇',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f36a.png',
    desc: '酥脆掉渣的星點巧克力餅乾',
    emoji: '🍪'
  },
  {
    name: '雙層奶油蛋糕',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f370.png',
    desc: '鬆軟綿密美味得流口水',
    emoji: '🍰'
  },
  {
    name: '繽紛好運糖果',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f36c.png',
    desc: '酸酸甜甜的橙味糖紙袋',
    emoji: '🍬'
  },
  {
    name: '旋轉七彩棒棒糖',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f36d.png',
    desc: '旋出的彩虹螺旋是快樂密碼',
    emoji: '🍭'
  },
  {
    name: '香甜牛奶雪糕',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f366.png',
    desc: '融化在口中的香濃小雪花',
    emoji: '🍦'
  },
  {
    name: '黃金芝士披薩',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f355.png',
    desc: '香噴噴拉絲的黃金薄脆披薩',
    emoji: '🍕'
  },
  {
    name: '雙層牛肉漢堡',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f354.png',
    desc: '足料新鮮生菜大漢堡',
    emoji: '🍔'
  },
  {
    name: '香脆熱辣薯條',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f35f.png',
    desc: '薯條金黃，蘸番茄醬最對味',
    emoji: '🍟'
  },
  {
    name: '美味香烤熱狗',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f32d.png',
    desc: '塗滿香甜黃芥末和肉醬',
    emoji: '🌭'
  },
  {
    name: '戲院爆谷桶',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f37f.png',
    desc: '焦糖香氣撲鼻的鬆脆爆米花',
    emoji: '🍿'
  },
  {
    name: '墨西哥牛肉夾餅',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f32e.png',
    desc: '包裹著香辣肉餡和芝士片',
    emoji: ' taco 🌮'
  },
  {
    name: '香甜多汁紅莓',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f353.png',
    desc: '新鮮採摘的維生素果中皇后',
    emoji: '🍓'
  },
  {
    name: '並蒂小甜櫻桃',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f352.png',
    desc: '手拉手不分開的紅寶石果實',
    emoji: '🍒'
  },
  {
    name: '清爽無比大西瓜',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f349.png',
    desc: '消暑解渴的超級紅沙瓜壤',
    emoji: '🍉'
  },
  {
    name: '飽滿水蜜桃',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f351.png',
    desc: '粉撲撲的清甜多汁水蜜桃',
    emoji: '🍑'
  },
  {
    name: '平安紅大蘋果',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f34e.png',
    desc: '紅潤又爽口，送出滿滿健康',
    emoji: '🍎'
  },
  {
    name: '香甜飽肚香蕉',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f34c.png',
    desc: '運動學習後補充能量的好幫手',
    emoji: '🍌'
  },
  {
    name: '金冠大鳳梨',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f34d.png',
    desc: '熱情奔放的酸甜大黃金鳳梨',
    emoji: '🍍'
  },
  {
    name: '珍珠多汁黑提子',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f347.png',
    desc: '一串沉甸甸的水果瑪瑙',
    emoji: '🍇'
  },
  {
    name: '吉利甜口砂糖桔',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f34a.png',
    desc: '剥開皮芳香四溢的蜜糖小桔子',
    emoji: '🍊'
  },
  {
    name: '網紋甜哈密瓜',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f348.png',
    desc: '冰鎮吃一口的夏日甜王',
    emoji: '🍈'
  },
  {
    name: '酸甜提神黃檸檬',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f34b.png',
    desc: '滿嘴清新，VC營養超值',
    emoji: '🍋'
  },
  {
    name: '金黃香甜芒果仔',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f96d.png',
    desc: '味道濃郁的南國芒果之王',
    emoji: '🥭'
  },
  {
    name: '清甜去火香沙梨',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f350.png',
    desc: '口感爽脆水潤的大香梨',
    emoji: '🍐'
  },
  {
    name: '奇異綠奇異果',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f95d.png',
    desc: '滿身絨毛的微酸開心奇異果',
    emoji: '🥝'
  },
  {
    name: '森林奶油牛油果',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f951.png',
    desc: '高營養的軟糯沙拉好配角',
    emoji: '🥑'
  },
  {
    name: '天然消暑大椰子',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f965.png',
    desc: '喝一口清甜無比的大椰汁',
    emoji: '🥥'
  },
  {
    name: '紅亮沙瓤大番茄',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f345.png',
    desc: '紅紅的外皮下裹著滿滿汁水',
    emoji: '🍅'
  },
  {
    name: '健康亮亮小胡蘿蔔',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f955.png',
    desc: '保護視力多吃橙紅大蘿蔔',
    emoji: '🥕'
  },
  {
    name: '綠色椰菜西蘭花',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f966.png',
    desc: '像小樹一樣充滿生機的西蘭花',
    emoji: '🥦'
  },
  {
    name: '金黃黃大玉米',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f33d.png',
    desc: '一排排珍珠一樣的金黃玉米粒',
    emoji: '🌽'
  },
  {
    name: '紅薯暖笠笠地瓜',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f360.png',
    desc: '捧在手上暖烘烘甜在心裡',
    emoji: '🍠'
  },
  {
    name: '香脆扭花蝴蝶餅',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f968.png',
    desc: '打著蝴蝶結的傳統香烘培餅',
    emoji: '🥨'
  },
  {
    name: '美味層層牛角包',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f950.png',
    desc: '散發出黃油香氣的金黃酥皮包',
    emoji: '🥐'
  },
  {
    name: '香軟松餅熱松餅',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f95e.png',
    desc: '疊高高澆滿楓糖漿與小黃油',
    emoji: '🥞'
  },
  {
    name: '三色糯米丸子',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f361.png',
    desc: '粉綠白交織的軟糯點心串串',
    emoji: '🍡'
  },
  {
    name: '金元寶美味水餃',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f95f.png',
    desc: '飽滿多汁熱辣出鍋的水餃兒',
    emoji: '🥟'
  },
  {
    name: '新年多多幸運餅乾',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f960.png',
    desc: '裡面藏著神祕好運祝福紙條',
    emoji: '🥠'
  },
  {
    name: '黃澄澄大孔乳酪',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9c0.png',
    desc: '傑利鼠最愛的一整塊黃金大芝士',
    emoji: '🧀'
  },
  {
    name: '寧靜彎彎小夜月',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f319.png',
    desc: '散發著幽微清亮柔光的小月亮',
    emoji: '🌙'
  },
  {
    name: '一飛沖天勇氣火箭',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f680.png',
    desc: '載著無畏夢想沖入浩瀚太空中',
    emoji: '🚀'
  },
  {
    name: '神祕發光小飛碟',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f6f8.png',
    desc: '在夜空裡旋轉盤旋的造訪小UFO',
    emoji: '🛸'
  },
  {
    name: '溫馨大熊泰迪熊',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9f8.png',
    desc: '隨時給予你最誠摯踏實的小擁抱',
    emoji: '🧸'
  },
  {
    name: '愛意精緻禮品盒',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f381.png',
    desc: '裡面裝著大家親手準備的小禮物',
    emoji: '🎁'
  },
  {
    name: '天馬行空藝術彩板',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f3a8.png',
    desc: '用五彩斑斕畫筆勾勒生活的小秘密',
    emoji: '🎨'
  },
  {
    name: '神奇魔術仙女棒',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1fa84.png',
    desc: '叮！所有好運在這一瞬間成真',
    emoji: '🪄'
  },
  {
    name: '預測未來水晶球',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f52e.png',
    desc: '透過夢幻紫霧看見我們的明天',
    emoji: '🔮'
  },
  {
    name: '浩瀚神祕土星環',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1fa90.png',
    desc: '擁有絕美閃亮光圈的深空大行星',
    emoji: '🪐'
  },
  {
    name: '幸運無比四葉草',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f340.png',
    desc: '尋找到它便能擁有一整天的好心情',
    emoji: '🍀'
  },
  {
    name: '向上向陽大葵花',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f33b.png',
    desc: '永遠朝著明媚太陽仰起笑臉',
    emoji: '🌻'
  },
  {
    name: '粉白嬌嫩小鬱金香',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f337.png',
    desc: '充滿初春清新與朝氣的手捧花',
    emoji: '🌷'
  },
  {
    name: '濃情浪漫大紅玫瑰',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f339.png',
    desc: '美麗綻放的熱情真摯代表',
    emoji: '🌹'
  },
  {
    name: '唯美春櫻八重花瓣',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f338.png',
    desc: '悠悠飄落在春風裡的浪漫小粉花',
    emoji: '🌸'
  }
];

const CUTE_PRESETS_4: CutePreset[] = [
  {
    name: '紅透富士大蘋果',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f34e.png',
    desc: '紅潤飽滿的富士蘋果',
    emoji: '🍎'
  },
  {
    name: '青脆甜脆小蘋果',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f34f.png',
    desc: '清新爽脆的青蘋果',
    emoji: '🍏'
  },
  {
    name: '水嫩香甜水晶梨',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f350.png',
    desc: '香甜美味的水晶梨',
    emoji: '🍐'
  },
  {
    name: '金黃誘人蜜柑橘',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f34a.png',
    desc: '酸甜多汁的水蜜柑',
    emoji: '🍊'
  },
  {
    name: '清香酸爽小檸檬',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f34b.png',
    desc: '充滿活力與維他命C',
    emoji: '🍋'
  },
  {
    name: '富集能量香甜蕉',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f34c.png',
    desc: '營養滿滿的黃金香蕉',
    emoji: '🍌'
  },
  {
    name: '沁涼消暑大西瓜',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f349.png',
    desc: '夏天必備的消暑紅瓤西瓜',
    emoji: '🍉'
  },
  {
    name: '紫瀅瀅水晶葡萄',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f347.png',
    desc: '飽滿多汁的一串紫葡萄',
    emoji: '🍇'
  },
  {
    name: '鮮紅誘惑小草莓',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f353.png',
    desc: '草莓甜美口感極佳',
    emoji: '🍓'
  },
  {
    name: '養生白嫩大嫩蒜',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9c4.png',
    desc: '調味與健康的純白大蒜',
    emoji: '🧄'
  },
  {
    name: '清香哈密密瓜蜜',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f348.png',
    desc: '網紋甜美的哈密瓜',
    emoji: '🍈'
  },
  {
    name: '雙子星甜心櫻桃',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f352.png',
    desc: '成雙成對的紅櫻桃',
    emoji: '🍒'
  },
  {
    name: '粉嫩多汁水蜜桃',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f351.png',
    desc: '毛茸茸香甜可口的水蜜桃',
    emoji: '🍑'
  },
  {
    name: '黃澄澄寶石芒果',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f96d.png',
    desc: '充滿熱帶風情的黃金芒果',
    emoji: '🥭'
  },
  {
    name: '金黃耀眼大鳳梨',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f34d.png',
    desc: '酸酸甜甜的陽光鳳梨果',
    emoji: '🍍'
  },
  {
    name: '清爽透心厚椰子',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f965.png',
    desc: '乳白香甜的海島椰子',
    emoji: '🥥'
  },
  {
    name: '綠寶石酸甜奇異果',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f95d.png',
    desc: '維生素極高的奇異果',
    emoji: '🥝'
  },
  {
    name: '火紅圓潤大番茄',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f345.png',
    desc: '既是蔬菜也是水果的番茄',
    emoji: '🍅'
  },
  {
    name: '高貴長條紫袍茄',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f346.png',
    desc: '紫色外表營養健康的茄子',
    emoji: '🍆'
  },
  {
    name: '綿密潤口牛油酪梨',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f951.png',
    desc: '富含優質脂肪的森林牛油酪梨',
    emoji: '🥑'
  },
  {
    name: '健康翠綠花椰菜',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f966.png',
    desc: '像小樹一樣健康的綠色西蘭花',
    emoji: '🥦'
  },
  {
    name: '清爽解渴脆黃瓜',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f952.png',
    desc: '水嫩爽脆的小黃瓜',
    emoji: '🥒'
  },
  {
    name: '熱力四射小青椒',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f336.png',
    desc: '紅豔香辣的朝天椒',
    emoji: '🌶️'
  },
  {
    name: '金黃飽滿甜玉米',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f33d.png',
    desc: '顆顆香甜可口的玉米棒',
    emoji: '🌽'
  },
  {
    name: '甘甜爽口胡蘿蔔',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f955.png',
    desc: '小兔子最愛的清甜胡蘿蔔',
    emoji: '🥕'
  },
  {
    name: '清雅莊重小橄欖',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1fad2.png',
    desc: '象徵和平與希望的青綠果',
    emoji: '🫒'
  },
  {
    name: '香辛調味大洋蔥',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9c5.png',
    desc: '辛香解膩的多層洋蔥',
    emoji: '🧅'
  },
  {
    name: '樸實敦厚馬鈴薯',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f954.png',
    desc: '軟糯香甜的馬鈴薯澱粉來源',
    emoji: '🥔'
  },
  {
    name: '暖胃香糯紫地瓜',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f360.png',
    desc: '熱氣騰騰的街頭烤紅薯',
    emoji: '🍠'
  },
  {
    name: '酥香迷人牛角可頌',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f950.png',
    desc: '法式起司香氣撲鼻的可頌',
    emoji: '🥐'
  },
  {
    name: '香軟切片麥香吐司',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f35e.png',
    desc: '早晨烘焙的經典麥香吐司',
    emoji: '🍞'
  },
  {
    name: '麥穗金黃長法棍',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f956.png',
    desc: '外脆內軟的硬派法棍麵包',
    emoji: '🥖'
  },
  {
    name: '心型鹽香椒鹽餅',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f968.png',
    desc: '精緻扭花造型的歐式卷餅',
    emoji: '🥨'
  },
  {
    name: '圓滾滾美式原味貝果',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f96f.png',
    desc: '煙燻起司奶油的最佳搭檔',
    emoji: '🥯'
  },
  {
    name: '蓬鬆千層甜糖鬆餅',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f95e.png',
    desc: '澆淋了楓糖漿的美式厚鬆餅',
    emoji: '🥞'
  },
  {
    name: '香脆格紋美味華夫',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9c7.png',
    desc: '烤得恰到好處的比利時華夫餅',
    emoji: '🧇'
  },
  {
    name: '濃郁絲滑黃金起司',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9c0.png',
    desc: '老鼠最愛的多孔香濃乳酪',
    emoji: '🧀'
  },
  {
    name: '原始帶骨香炙大肉',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f356.png',
    desc: '極具動漫感的帶骨熟肉',
    emoji: '🍖'
  },
  {
    name: '美式茄汁熱狗潛艇堡',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f32d.png',
    desc: '夾著多汁烤熱狗與黃芥末的麵包',
    emoji: '🌭'
  },
  {
    name: '芝麻生菜雙層大漢堡',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f354.png',
    desc: '層層配料豐富的招牌厚牛肉堡',
    emoji: '🍔'
  },
  {
    name: '紅金極速香脆薯條',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f35f.png',
    desc: '外焦裡嫩的經典香炸細薯條',
    emoji: '🍟'
  },
  {
    name: '意式濃香臘腸披薩',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f355.png',
    desc: '灑滿意式香腸與厚厚起司的切片披薩',
    emoji: '🍕'
  },
  {
    name: '墨式莎莎香脆塔可',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f32e.png',
    desc: '包裹著香濃碎肉與生菜的玉米薄餅',
    emoji: '🌮'
  },
  {
    name: '飽腹牛肉芝士捲餅',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f32f.png',
    desc: '料滿塞實的墨西哥風味長捲餅',
    emoji: '🌯'
  },
  {
    name: '金黃香脆影迷爆米花',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f37f.png',
    desc: '散發淡淡奶油鹹香的爆米花盒',
    emoji: '🍿'
  },
  {
    name: '咸香酥脆醬油仙貝',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f358.png',
    desc: '脆脆香醇的和風烤仙貝',
    emoji: '🍘'
  },
  {
    name: '海苔包裹幸運飯糰',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f359.png',
    desc: '三角形經典和風鹽味飯糰',
    emoji: '🍙'
  },
  {
    name: '繽紛甜糯三色糰子',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f361.png',
    desc: '粉綠白三色極具春日氣息的糰子串',
    emoji: '🍡'
  },
  {
    name: '熱氣騰騰暖冬關東煮',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f362.png',
    desc: '高湯慢熬的昆布、白蘿蔔關東煮串',
    emoji: '🍢'
  },
  {
    name: '精緻鮭魚握壽司',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f363.png',
    desc: '飽滿米飯上有肥美鮭魚生魚片',
    emoji: '🍣'
  },
  {
    name: '金黃酥脆炸天婦羅大蝦',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f364.png',
    desc: '裹上麵糊炸至酥脆的一尾天婦羅蝦',
    emoji: '🍤'
  },
  {
    name: '粉白漩渦日式鳴門卷',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f365.png',
    desc: '拉麵碗中經典的紅白漩渦魚板',
    emoji: '🍥'
  },
  {
    name: '中秋廣式雙黃蓮蓉月餅',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f96e.png',
    desc: '象徵團圓甜蜜的花紋月餅',
    emoji: '🥮'
  },
  {
    name: '純愛香草牛奶霜淇淋',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f366.png',
    desc: '蛋卷筒上的粉白甜美霜淇淋',
    emoji: '🍦'
  },
  {
    name: '夢幻草莓刨冰山',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f367.png',
    desc: '堆疊高高的碎冰並淋上鮮紅櫻桃糖漿',
    emoji: '🍧'
  },
  {
    name: '盛夏綜合水果聖代',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f368.png',
    desc: '裝在玻璃杯中的極致綜合冰淇淋',
    emoji: '🍨'
  },
  {
    name: '粉紅甜心糖霜甜甜圈',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f369.png',
    desc: '帶有彩虹糖針的經典粉紅甜甜圈',
    emoji: '🍩'
  },
  {
    name: '奇妙巧克力豆酥脆曲奇',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f36a.png',
    desc: '綴滿巧克力碎屑的烤手工餅乾',
    emoji: '🍪'
  },
  {
    name: '豪華草莓雙層生日蛋糕',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f382.png',
    desc: '插着蠟燭慶祝特別時刻的白色奶油蛋糕',
    emoji: '🎂'
  },
  {
    name: '粉紫紙杯奶油小蛋糕',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9c1.png',
    desc: '精緻美麗的草莓奶油紙杯糕',
    emoji: '🧁'
  },
  {
    name: '香醇絲滑黑巧克力磚',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f36b.png',
    desc: '紅包包裝紙下微露的整塊巧克力條',
    emoji: '🍫'
  },
  {
    name: '繽紛甜心水果硬糖',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f36c.png',
    desc: '兩端扭起的彩色糖果包裝紙',
    emoji: '🍬'
  },
  {
    name: '甜香螺旋繽紛棒棒糖',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f36d.png',
    desc: '擁有夢幻圈圈螺旋圖案的糖果棍',
    emoji: '🍭'
  },
  {
    name: '法式焦糖雞蛋布丁',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f36e.png',
    desc: '頂部覆蓋黑亮焦糖液的Ｑ彈布丁塊',
    emoji: '🍮'
  },
  {
    name: '香純小熊最愛蜂蜜罐',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f36f.png',
    desc: '印有蜜蜂嗡嗡符號的滿載金黃蜂蜜罐',
    emoji: '🍯'
  },
  {
    name: '夢幻粉紅獨角精靈獸',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f984.png',
    desc: '擁有黃金魔力角與紫色鬃毛的夢幻獸',
    emoji: '🦄'
  },
  {
    name: '深海湛藍斑斕小蝴蝶',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f98b.png',
    desc: '展開藍黑色美麗翅膀在花叢起舞的小蝴蝶',
    emoji: '🦋'
  },
  {
    name: '好運發光紅甲七星瓢蟲',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f41e.png',
    desc: '背部點綴了七顆黑點點的澄紅瓢蟲',
    emoji: '🐞'
  },
  {
    name: '勤勞採蜜可愛黃蜂仔',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f41d.png',
    desc: '擁有黑黃條紋與晶瑩翅膀的小蜜蜂',
    emoji: '🐝'
  },
  {
    name: '背負重殼悠閒小蝸牛',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f40c.png',
    desc: '慢慢爬行享受旅行時光的小蝸牛',
    emoji: '🐌'
  },
  {
    name: '深海舞者紅粉八爪魚',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f419.png',
    desc: '八條觸手舞動的微笑章魚寶寶',
    emoji: '🐙'
  },
  {
    name: '深紫色神祕大眼大魷魚',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f991.png',
    desc: '海洋神祕生物之一的長觸鬚魷魚',
    emoji: '🦑'
  },
  {
    name: '威武揮舞巨鉗大龍蝦',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f99e.png',
    desc: '身披紅色堅硬鎧甲與超大紅雙鉗的龍蝦',
    emoji: '🦞'
  },
  {
    name: '橫行霸道巨無霸螃蟹',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f980.png',
    desc: '露出微笑的澄紅色雙鉗沙灘螃蟹',
    emoji: '🦀'
  },
  {
    name: '一彎通紅鮮美小甜蝦',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f990.png',
    desc: '帶長鬚的小甜蝦一尾',
    emoji: '🦐'
  },
  {
    name: '躍出水面微笑聰慧海豚',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f42c.png',
    desc: '在蔚藍海洋中翻滾的聰明夥伴海豚',
    emoji: '🐬'
  },
  {
    name: '深海噴泉溫柔守護藍鯨',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f433.png',
    desc: '頭頂噴水霧的深海天籟之音大鯨魚',
    emoji: '🐳'
  },
  {
    name: '深海霸王微笑小槌頭鯊',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f988.png',
    desc: '露出雪白牙齒在珊瑚叢中游動的友善小鯊魚',
    emoji: '🦈'
  },
  {
    name: '熱帶雨林慢速生活樹懶',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9a5.png',
    desc: '掛在綠色樹皮上閉目養神的慵懶樹懶寶寶',
    emoji: '🦥'
  },
  {
    name: '海島壽星萬年翠綠龜',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f422.png',
    desc: '馱著硬甲在水底慢吞吞游動的長壽海龜',
    emoji: '🐢'
  },
  {
    name: '池塘歌手快樂大眼荷葉蛙',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f438.png',
    desc: '在雨後荷塘呱呱大合唱的小青蛙',
    emoji: '🐸'
  },
  {
    name: '盤在草叢翠綠萌萌青蛇',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f40d.png',
    desc: '吐着分叉小紅舌頭的無害迷你蛇寶寶',
    emoji: '🐍'
  },
  {
    name: '沙漠探險敏捷小變色蜥蜴',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f98e.png',
    desc: '善於隱身趴在枯木上的大尾巴綠蜥蜴',
    emoji: '🦎'
  },
  {
    name: '遠古霸主威武紅霸王龍',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f996.png',
    desc: '在巨石森林震天咆哮的超酷恐龍',
    emoji: '🦖'
  },
  {
    name: '溫和善良食草長頸龍',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f995.png',
    desc: '伸長脖子漫步在溪流邊的大青龍',
    emoji: '🦕'
  },
  {
    name: '東方祥瑞金爪鱗甲神龍',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f409.png',
    desc: '在金色彩雲中穿梭翱翔的中國圖騰巨龍',
    emoji: '🐉'
  },
  {
    name: '尤加利樹下午茶考拉寶寶',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f428.png',
    desc: '緊抱樹幹半夢半醒的澳大利亞熊貓考拉',
    emoji: '🐨'
  },
  {
    name: '啃食嫩竹翠竹林熊貓貓',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f43c.png',
    desc: '帶著經典黑眼圈的憨實大熊貓憨憨',
    emoji: '🐼'
  },
  {
    name: '仰泳捉貝殼頑皮小海獺',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9a6.png',
    desc: '手捧貝殼浮在水面的毛絨萌物海獺子',
    emoji: '🦦'
  },
  {
    name: '泥塘泡澡胖嘟嘟紫大河馬',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9aa.png',
    desc: '在清涼池水中露出大鼻孔的憨厚河馬',
    emoji: '🦛'
  },
  {
    name: '高原驕傲捲毛小白色草泥馬',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9ab.png',
    desc: '滿身蓬鬆羊毛露出呆滯萌表情的羊駝',
    emoji: '🦙'
  },
  {
    name: '草原哨兵斑點長脖子長頸鹿',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f992.png',
    desc: '伸長優雅細脖子吃最高處嫩葉的金色斑紋鹿',
    emoji: '🦒'
  },
  {
    name: '大跨走智慧招財蒲扇耳象',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f418.png',
    desc: '揮舞長鼻子的陸地巨人灰色大象',
    emoji: '🐘'
  },
  {
    name: '南極冰川燕尾服紳士企鵝寶寶',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f427.png',
    desc: '挺着雪白肚皮搖搖擺擺在冰山行進的小企鵝',
    emoji: '🐧'
  },
  {
    name: '高貴獨秀一足立紅粉火烈鳥',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9a9.png',
    desc: '渾身淡粉色優雅漫步在淺灘的珍稀火烈鳥',
    emoji: '🦩'
  },
  {
    name: '奢華屏風孔雀雀藍珍禽',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f99a.png',
    desc: '開出華麗綠藍眼狀斑紋屏風的驕傲雄孔雀',
    emoji: '🦚'
  },
  {
    name: '熱帶雨林高調綠羽大眼鸚鵡',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f99c.png',
    desc: '拍打翠綠翅膀愛學人類說話的五彩長尾鸚鵡',
    emoji: '🦜'
  },
  {
    name: '森林睿智使者大眼睛白天鷹鴞',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f989.png',
    desc: '站在枯樹幹上守護黑夜、象徵智慧的貓頭鷹',
    emoji: '🦉'
  },
  {
    name: '水晶湖畔悠美踏水白天鵝',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f9a2.png',
    desc: '宛如童話中小白鵝高貴純白羽翼優雅天鵝',
    emoji: '🦢'
  },
  {
    name: '黑夜飛舞超酷披風暗黑蝙蝠',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f987.png',
    desc: '在夜色古堡中倒掛棲息的神祕黑色蝙蝠兒',
    emoji: '🦇'
  },
  {
    name: '七彩熠熠璀璨好運閃光星塵',
    url: 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u2728.png',
    desc: '在空氣中爆發出璀璨耀眼光芒的魔力星星 sparkle',
    emoji: '✨'
  }
];

const COMBINED_CUTE_2: CutePreset[] = [...CUTE_PRESETS_2, ...CUTE_PRESETS_3, ...CUTE_PRESETS_4];

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
      {/* Playful Card Container - Styled cohesively with warm cream & thin outline */}
      <div 
        className="relative bg-[#fffdf9] border-2 border-black/15 rounded-[38px] w-full max-w-4xl overflow-hidden animate-cute-pop flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Area - Fresh Ocean Blue and Turquoise */}
        <div className="bg-gradient-to-r from-[#eb725a] via-[#f08573] to-[#eb725a] border-b border-black/15 px-6 py-4.5 flex justify-between items-center text-white">
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
            className="p-2 bg-white hover:bg-rose-50 text-rose-600 border border-black/15 rounded-full hover:scale-105 active:scale-90 transition duration-150 cursor-pointer"
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
                ? 'bg-pink-500 text-white border-slate-900 shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] hover:bg-pink-600'
                : 'bg-pink-50/50 border-pink-100 hover:bg-pink-55 text-pink-700 hover:border-slate-300'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current text-pink-500 group-hover:scale-110" />
            <span>cute 1.0 🌸</span>
          </button>

          {/* New Cute 2.0 Tab */}
          <button
            onClick={() => {
              setActiveTab('cute2');
              setSearchQuery('');
            }}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-black border-2 transition-all flex items-center space-x-1 cursor-pointer ${
              activeTab === 'cute2'
                ? 'bg-purple-500 text-white border-slate-900 shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] hover:bg-purple-600'
                : 'bg-purple-50/50 border-purple-100 hover:bg-purple-55 text-purple-700 hover:border-slate-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 fill-current text-purple-500 group-hover:scale-110" />
            <span>cute 2.0 🌟</span>
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
              <div className="space-y-3 font-sans">
                <div className="flex items-center space-x-2 border-b-2 border-dashed border-pink-200 pb-2">
                  <span className="text-xl">🌸</span>
                  <h3 className="text-sm sm:text-base font-black text-pink-700 font-heading">
                    精選可愛萌物頭像庫
                  </h3>
                  <span className="text-xs bg-pink-100 text-pink-600 font-black px-2.5 py-0.5 rounded-full">
                    點擊直接套用為學生頭像
                  </span>
                </div>
                
                <div className="grid grid-cols-6 gap-2">
                  {CUTE_PRESETS.map((preset, index) => (
                    <div
                      key={index}
                      onClick={() => onSelectAvatar(preset.url, undefined)}
                      className="group bg-white border-2 border-slate-200 hover:border-pink-500 hover:ring-2 hover:ring-pink-200 rounded-2xl p-1.5 aspect-square flex items-center justify-center cursor-pointer transition-all duration-150 shadow-xs hover:scale-105"
                      title={preset.name}
                    >
                      <div className="w-full h-full rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-0.5 relative">
                        <img
                          src={preset.url}
                          alt={preset.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain group-hover:scale-110 transition duration-150"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/bottts/svg?seed=${preset.name}`;
                          }}
                        />
                      </div>
                    </div>
                  ))}
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

          {/* Renders CUTE 2.0 activeTab (250 new adorable icons) */}
          {activeTab === 'cute2' && (
            <div className="space-y-6 pb-4 animate-cute-pop select-none">
              
              {/* Premium-generated Cute 2.0 Presets */}
              <div className="space-y-3 font-sans">
                <div className="flex items-center space-x-2 border-b-2 border-dashed border-purple-205 pb-2">
                  <span className="text-xl">🌟</span>
                  <h3 className="text-sm sm:text-base font-black text-purple-700 font-heading">
                    精選 250 個全新可愛萌物 2.0 🌟
                  </h3>
                  <span className="text-xs bg-purple-100 text-purple-600 font-black px-2.5 py-0.5 rounded-full">
                    點擊直接套用為學生頭像
                  </span>
                </div>
                
                <div className="grid grid-cols-6 gap-2">
                  {COMBINED_CUTE_2.filter(preset => {
                    if (!searchQuery) return true;
                    return preset.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           preset.desc.toLowerCase().includes(searchQuery.toLowerCase());
                  }).map((preset, index) => (
                    <div
                      key={index}
                      onClick={() => onSelectAvatar(preset.url, undefined)}
                      className="group bg-white border-2 border-slate-200 hover:border-purple-500 hover:ring-2 hover:ring-purple-200 rounded-2xl p-1.5 aspect-square flex items-center justify-center cursor-pointer transition-all duration-150 shadow-xs hover:scale-105"
                      title={preset.name}
                    >
                      <div className="w-full h-full rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-0.5 relative">
                        <img
                          src={preset.url}
                          alt={preset.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain group-hover:scale-110 transition duration-150"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/bottts/svg?seed=${preset.name}`;
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Renders standard Pokémon lists */}
          {activeTab !== 'friends' && activeTab !== 'emoji' && activeTab !== 'cute' && activeTab !== 'cute2' && (
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
