
import { SelectOption, HierarchyOption } from './types';

// 產生年份列表 (NV + 今年往下推 100 年)
const currentYear = new Date().getFullYear();
export const VINTAGE_OPTIONS: SelectOption[] = [
  { value: 'NV', label: '無年份 (NV)' },
  ...Array.from({ length: 75 }, (_, i) => {
    const year = (currentYear - i).toString();
    return { value: year, label: year };
  })
];

export const CURRENCY_OPTIONS: SelectOption[] = [
  { value: 'TWD', label: 'NT$' },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'JPY', label: 'JPY' },
  { value: 'CNY', label: 'CNY' },
  { value: 'GBP', label: 'GBP' },
];

// --- 階層式產區資料 (Country -> Region) ---
export const REGION_HIERARCHY: HierarchyOption[] = [
  {
    label: '🇫🇷 法國 (France)',
    value: 'France',
    children: [
      { value: 'France/Bordeaux', label: '波爾多 (Bordeaux)' },
      { value: 'France/Bordeaux/Left Bank', label: '波爾多左岸 (Left Bank)' },
      { value: 'France/Bordeaux/Right Bank', label: '波爾多右岸 (Right Bank)' },
      { value: 'France/Burgundy', label: '布根地 (Burgundy)' },
      { value: 'France/Champagne', label: '香檳 (Champagne)' },
      { value: 'France/Rhône Valley', label: '隆河谷 (Rhône Valley)' },
      { value: 'France/Alsace', label: '阿爾薩斯 (Alsace)' },
      { value: 'France/Loire Valley', label: '羅亞爾河谷 (Loire Valley)' },
      { value: 'France/Provence', label: '普羅旺斯 (Provence)' },
      { value: 'France/Languedoc', label: '朗格多克 (Languedoc)' },
    ]
  },
  {
    label: '🇮🇹 義大利 (Italy)',
    value: 'Italy',
    children: [
      { value: 'Italy/Tuscany', label: '托斯卡尼 (Tuscany)' },
      { value: 'Italy/Piedmont', label: '皮埃蒙特 (Piedmont)' },
      { value: 'Italy/Veneto', label: '威尼托 (Veneto)' },
      { value: 'Italy/Sicily', label: '西西里 (Sicily)' },
      { value: 'Italy/Puglia', label: '普利亞 (Puglia)' },
      { value: 'Italy/Abruzzo', label: '阿布魯佐 (Abruzzo)' },
    ]
  },
  {
    label: '🇪🇸 西班牙 (Spain)',
    value: 'Spain',
    children: [
      { value: 'Spain/Rioja', label: '里奧哈 (Rioja)' },
      { value: 'Spain/Ribera del Duero', label: '斗羅河岸 (Ribera del Duero)' },
      { value: 'Spain/Cava', label: '卡瓦 (Cava)' },
      { value: 'Spain/Priorat', label: '普里奧拉 (Priorat)' },
      { value: 'Spain/Rías Baixas', label: '下海灣 (Rías Baixas)' },
    ]
  },
  {
    label: '🇺🇸 美國 (USA)',
    value: 'USA',
    children: [
      { value: 'USA/Napa Valley', label: '納帕谷 (Napa Valley)' },
      { value: 'USA/Sonoma County', label: '索諾瑪 (Sonoma County)' },
      { value: 'USA/Oregon', label: '奧勒岡 (Oregon)' },
      { value: 'USA/Washington', label: '華盛頓州 (Washington)' },
    ]
  },
  {
    label: '🇩🇪 德國 (Germany)',
    value: 'Germany',
    children: [
      { value: 'Germany/Mosel', label: '摩澤爾 (Mosel)' },
      { value: 'Germany/Rheingau', label: '萊茵高 (Rheingau)' },
      { value: 'Germany/Pfalz', label: '法爾茲 (Pfalz)' },
    ]
  },
  {
    label: '🇦🇺 澳洲 (Australia)',
    value: 'Australia',
    children: [
      { value: 'Australia/Barossa Valley', label: '巴羅莎谷 (Barossa Valley)' },
      { value: 'Australia/Margaret River', label: '瑪格麗特河 (Margaret River)' },
      { value: 'Australia/Yarra Valley', label: '雅拉谷 (Yarra Valley)' },
      { value: 'Australia/Coonawarra', label: '庫納瓦拉 (Coonawarra)' },
    ]
  },
  {
    label: '🇳🇿 紐西蘭 (New Zealand)',
    value: 'New Zealand',
    children: [
      { value: 'New Zealand/Marlborough', label: '馬爾堡 (Marlborough)' },
      { value: 'New Zealand/Central Otago', label: '中奧塔哥 (Central Otago)' },
      { value: 'New Zealand/Hawke\'s Bay', label: '霍克斯灣 (Hawke\'s Bay)' },
    ]
  },
  {
    label: '🇨🇱 智利 (Chile)',
    value: 'Chile',
    children: [
      { value: 'Chile/Maipo Valley', label: '邁坡谷 (Maipo Valley)' },
      { value: 'Chile/Colchagua Valley', label: '科爾查瓜谷 (Colchagua Valley)' },
      { value: 'Chile/Casablanca Valley', label: '卡薩布蘭卡谷 (Casablanca Valley)' },
    ]
  },
  {
    label: '其他產區 (Others)',
    value: 'Others',
    children: [
      { value: 'Argentina/Mendoza', label: '🇦🇷 阿根廷 / 門多薩 (Mendoza)' },
      { value: 'South Africa/Stellenbosch', label: '🇿🇦 南非 / 斯泰倫博斯 (Stellenbosch)' },
      { value: 'Portugal/Douro', label: '🇵🇹 葡萄牙 / 杜羅河 (Douro)' },
      { value: 'Austria/Wachau', label: '🇦🇹 奧地利 / 瓦豪 (Wachau)' },
      { value: 'Hungary/Tokaj', label: '🇭🇺 匈牙利 / 托卡伊 (Tokaj)' },
    ]
  }
];

// --- 階層式品種資料 (Color -> Variety) ---
export const VARIETY_HIERARCHY: HierarchyOption[] = [
  {
    label: '🔴 紅葡萄 (Red)',
    value: 'Red',
    children: [
      { value: 'Cabernet Sauvignon', label: '卡本內蘇維濃 (Cabernet Sauvignon)' },
      { value: 'Merlot', label: '梅洛 (Merlot)' },
      { value: 'Pinot Noir', label: '黑皮諾 (Pinot Noir)' },
      { value: 'Syrah', label: '希哈 (Syrah/Shiraz)' },
      { value: 'Cabernet Franc', label: '卡本內弗朗 (Cabernet Franc)' },
      { value: 'Malbec', label: '馬爾貝克 (Malbec)' },
      { value: 'Sangiovese', label: '桑嬌維塞 (Sangiovese)' },
      { value: 'Nebbiolo', label: '內比奧羅 (Nebbiolo)' },
      { value: 'Tempranillo', label: '丹魄 (Tempranillo)' },
      { value: 'Grenache', label: '格那希 (Grenache)' },
      { value: 'Gamay', label: '嘉美 (Gamay)' },
      { value: 'Zinfandel', label: '金粉黛 (Zinfandel)' },
    ]
  },
  {
    label: '🟡 白葡萄 (White)',
    value: 'White',
    children: [
      { value: 'Chardonnay', label: '夏多內 (Chardonnay)' },
      { value: 'Sauvignon Blanc', label: '白蘇維濃 (Sauvignon Blanc)' },
      { value: 'Riesling', label: '雷司令 (Riesling)' },
      { value: 'Pinot Gris', label: '灰皮諾 (Pinot Gris)' },
      { value: 'Chenin Blanc', label: '許南白 (Chenin Blanc)' },
      { value: 'Gewürztraminer', label: '格烏茲塔明那 (Gewürztraminer)' },
      { value: 'Viognier', label: '維歐尼耶 (Viognier)' },
      { value: 'Semillon', label: '榭密雍 (Sémillon)' },
      { value: 'Muscat', label: '麝香葡萄 (Muscat)' },
      { value: 'Albariño', label: '阿爾巴利諾 (Albariño)' },
    ]
  },
  {
    label: '🫧 氣泡/其他 (Sparkling/Other)',
    value: 'Sparkling',
    children: [
      { value: 'Glera', label: '格雷拉 (Glera/Prosecco)' },
      { value: 'Xarel-lo', label: '沙雷洛 (Xarel-lo/Cava)' },
      { value: 'Red Blend', label: '紅混釀 (Red Blend)' },
      { value: 'White Blend', label: '白混釀 (White Blend)' },
      { value: 'Sparkling Blend', label: '氣泡混釀 (Sparkling Blend)' },
      { value: 'Rosé Blend', label: '粉紅混釀 (Rosé Blend)' },
    ]
  }
];

// Helper: 將階層資料攤平成單一列表，方便全域搜尋與反查 Label
// 同時會自動把 Parent 的 Label 加到 Child Label 前面 (例如: "🇫🇷 法國 / 波爾多")
const flattenHierarchy = (hierarchy: HierarchyOption[]): SelectOption[] => {
  let flat: SelectOption[] = [];
  hierarchy.forEach(parent => {
    parent.children.forEach(child => {
      // 如果 Child Label 已經包含 Emoji 或國家名，就不重複加
      // 我們這裡簡單判斷：如果 Parent 是 "其他"，就不強制加前綴
      let fullLabel = child.label;
      if (parent.value !== 'Others' && !child.label.includes(parent.label.split(' ')[0])) {
         // 簡單取出 Parent 的 Emoji 與中文名稱 (e.g. "🇫🇷 法國")
         const prefix = parent.label.split('(')[0].trim(); 
         fullLabel = `${prefix} / ${child.label}`;
      }
      flat.push({
        value: child.value,
        label: fullLabel
      });
    });
  });
  return flat;
};

// 導出扁平列表供 AddNoteModal 查找完整名稱使用
export const ALL_REGIONS_FLAT = flattenHierarchy(REGION_HIERARCHY);
export const ALL_VARIETIES_FLAT = flattenHierarchy(VARIETY_HIERARCHY);


// 外觀選項：移除紫色，加入白酒/粉紅酒顏色
export const APPEARANCE_OPTIONS: SelectOption[] = [
  // White
  { value: 'Lemon Green', label: '🟢 檸檬綠 / Lemon Green' },
  { value: 'Lemon', label: '🟡 檸檬黃 / Lemon' },
  { value: 'Gold', label: '📀 金黃色 / Gold' },
  { value: 'Amber', label: '🟠 琥珀色 / Amber' },
  // Rosé
  { value: 'Pink', label: '🌸 粉紅色 / Pink' },
  { value: 'Salmon', label: '🍣 鮭魚紅 / Salmon' },
  // Red
  { value: 'Ruby', label: '🔴 寶石紅 / Ruby' },
  { value: 'Garnet', label: '🛑 石榴紅 / Garnet' },
  { value: 'Brick Red', label: '🟤 磚紅色 / Brick Red' },
  { value: 'Tawny', label: '🟤 茶色 / Tawny' },
];

export const SWEETNESS_OPTIONS: SelectOption[] = [
  { value: 'Bone-Dry', label: '極乾 (Bone-Dry)' },
  { value: 'Dry', label: '乾型 (Dry)' },
  { value: 'Off-Dry', label: '半乾 (Off-Dry)' },
  { value: 'Medium-Sweet', label: '半甜 (Medium-Sweet)' },
  { value: 'Sweet', label: '甜型 (Sweet)' },
  { value: 'Luscious', label: '極甜 (Luscious)' },
];

export const BODY_OPTIONS: SelectOption[] = [
  { value: 'Light-Bodied', label: '輕盈 (Light-Bodied)' },
  { value: 'Medium-Bodied', label: '中等 (Medium-Bodied)' },
  { value: 'Full-Bodied', label: '飽滿/厚重 (Full-Bodied)' },
];

export const FINISH_OPTIONS: SelectOption[] = [
  { value: 'Short', label: '短 (Short)' },
  { value: 'Medium', label: '中等 (Medium)' },
  { value: 'Long', label: '長 (Long)' },
];

export const AROMA_TAGS = [
  // Fruit
  { label: '🍒 櫻桃', value: 'Cherry' },
  { label: '🍓 草莓', value: 'Strawberry' },
  { label: '🫐 黑醋栗', value: 'Blackcurrant' },
  { label: '🍇 覆盆子', value: 'Raspberry' },
  { label: '🫐 藍莓', value: 'Blueberry' },
  { label: '🍋 檸檬', value: 'Lemon' },
  { label: '🍏 青蘋果', value: 'Green Apple' },
  { label: '🍐 梨子', value: 'Pear' },
  { label: '🍑 水蜜桃', value: 'Peach' },
  { label: '🍍 鳳梨', value: 'Pineapple' },
  { label: '🥭 芒果', value: 'Mango' },
  { label: '🍈 哈密瓜', value: 'Melon' },
  { label: '🍊 柑橘', value: 'Citrus' },
  { label: '🍯 蜂蜜', value: 'Honey' },
  
  // Floral & Herbal
  { label: '🌹 玫瑰', value: 'Rose' },
  { label: '🌼 小白花', value: 'White Flower' },
  { label: '🌿 薄荷', value: 'Mint' },
  { label: '🌱 青草', value: 'Grass' },
  { label: '🫑 青椒', value: 'Green Pepper' },
  
  // Spice & Oak
  { label: '🪵 橡木', value: 'Oak' },
  { label: '🍦 香草', value: 'Vanilla' },
  { label: '🌶️ 胡椒', value: 'Pepper' },
  { label: '🍂 丁香', value: 'Clove' },
  { label: '🍫 巧克力', value: 'Chocolate' },
  { label: '☕ 咖啡', value: 'Coffee' },
  { label: '🚬 菸草', value: 'Tobacco' },
  { label: '🥐 奶油/麵包', value: 'Brioche' },
  
  // Earth & Mineral
  { label: '🪨 礦石', value: 'Mineral' },
  { label: '🍄 蘑菇', value: 'Mushroom' },
  { label: '🍂 森林', value: 'Forest Floor' },
  { label: '⛽ 汽油', value: 'Petrol' },
  { label: '🥓 煙燻', value: 'Smoke' },
  { label: '🥜 堅果', value: 'Nut' },
];

export const LEVEL_LABELS = ['低', '中偏低', '中等', '中偏高', '高'];
