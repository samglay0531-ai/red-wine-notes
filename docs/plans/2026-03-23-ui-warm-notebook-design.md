# UI 改版設計：品酒筆記本風格

## 目標
將 Red Wine Notes 的視覺風格從冷灰 iOS 預設風轉為溫暖的品酒筆記本風格，提升使用吸引力。只改視覺，不動功能邏輯。

## 設計決策

### 配色系統

| 用途 | 舊值 | 新值 | 說明 |
|------|------|------|------|
| 背景底色 | `#f2f2f7` | `#FAF6F1`（暖米白） | 營造紙質溫暖感 |
| 卡片底色 | `#FFFFFF` | `#FFFFFF` | 不變，靠背景色產生層次 |
| 主色 accent | `red-800` (#991b1b) | `#722F37`（酒紅） | 更沉穩的酒紅色 |
| 主文字 | `text-gray-900` | `#1A1A1A` | 深黑，確保可讀性 |
| 次要文字 | `text-gray-500/600` | `#6B6B6B` | 中灰 |
| 邊框/分隔線 | `border-gray-200` | `#E8DDD3`（暖灰棕） | 溫暖的分隔線 |
| tag/標籤底色 | `bg-gray-100` | `#F5EDE4`（淡奶茶） | 溫暖的標籤背景 |
| accent 淺色 | `bg-red-50/100` | `#F5EDE4` | 用於品種標籤等 |
| 未選中星星 | `#e5e7eb` | `#E8DDD3` | 跟暖色系統一 |

### 字體

- 標題（酒名、區塊標題、header）：Noto Serif TC 700
- 內文、表單、標籤：Noto Sans TC 400/500/700（維持現有 sans-serif）
- 透過 Google Fonts CDN 載入

### 可讀性原則

- 主文字 `#1A1A1A` 對背景 `#FAF6F1` 對比度 > 7:1（WCAG AAA）
- 次要文字 `#6B6B6B` 對背景對比度 > 4.5:1（WCAG AA）
- serif 字體只用於大字（標題），小字維持 sans-serif

## 影響範圍

僅修改視覺樣式，不改動：
- 資料結構 / types
- 功能邏輯 / 事件處理
- 元件結構 / props

需修改的檔案：
1. `index.html` — 加入 Google Fonts、更新 body 背景色
2. `App.tsx` — header、tab bar、頁面容器的 className
3. `components/NoteCard.tsx` — 卡片樣式、標籤顏色
4. `components/NoteDetailModal.tsx` — 詳情頁配色
5. `components/AddNoteModal.tsx` — 表單區塊配色
6. `components/CascadingSelect.tsx` — 下拉選單配色
7. `components/StarRating.tsx` — 未選中星星顏色
8. `components/SearchableSelect.tsx` — 下拉選單配色

## 預覽
已通過 `preview.html` 靜態原型驗證，使用者確認 OK。
