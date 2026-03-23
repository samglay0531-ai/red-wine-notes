# UI 品酒筆記本風格改版 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 將 Red Wine Notes 的視覺從冷灰 iOS 風轉為溫暖品酒筆記本風格，只改 CSS/className，不動功能邏輯。

**Architecture:** 透過 Tailwind 的 arbitrary value 語法（如 `bg-[#FAF6F1]`）直接替換色值，加入 Google Fonts 載入 Noto Serif TC 用於標題。所有變更僅限 className 字串與 index.html 的 `<head>`。

**Tech Stack:** React + Tailwind CSS (CDN) + Google Fonts

---

### Task 1: index.html — 加入字體與更新背景色

**Files:**
- Modify: `index.html`

**Step 1: 加入 Google Fonts link 到 `<head>`**

在 `<meta name="viewport">` 之後加入：

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;700&family=Noto+Sans+TC:wght@400;500;700&display=swap" rel="stylesheet">
```

**Step 2: 更新 body 背景色**

將 `<style>` 區塊中的：
```css
background-color: #f2f2f7;
```
改為：
```css
background-color: #FAF6F1;
font-family: 'Noto Sans TC', sans-serif;
```

**Step 3: 驗證**

Run: `npx vite build 2>&1 | tail -5`
Expected: build 成功無錯誤

**Step 4: Commit**

```bash
git add index.html
git commit -m "style: add Google Fonts and warm background color"
```

---

### Task 2: App.tsx — Header、Tab Bar、頁面容器

**Files:**
- Modify: `App.tsx`

**Step 1: 更新 Header 樣式**

將 header 的 className：
```
bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200
```
改為：
```
bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E8DDD3]
```

將 header 內按鈕文字區域的顏色：
```
text-red-800
```
改為：
```
text-[#722F37]
```

將 `bg-red-100` 改為 `bg-[#F5EDE4]`。

將「新增一則紅酒筆記」的 `<span>` 加入 serif 字體：
```
font-bold text-lg
```
改為：
```
font-bold text-lg font-['Noto_Serif_TC']
```

**Step 2: 更新頁面標題**

將「我的筆記」的 `<h1>` className：
```
text-2xl font-bold text-gray-900
```
改為：
```
text-2xl font-bold text-[#1A1A1A] font-['Noto_Serif_TC']
```

將旁邊的筆記數量 `text-gray-500` 改為 `text-[#6B6B6B]`。

**Step 3: 更新 Tab Bar**

將 tab bar 的 className：
```
bg-white/95 backdrop-blur shadow-[0_-1px_3px_rgba(0,0,0,0.05)]
```
中的 `border-gray-200` 改為 `border-[#E8DDD3]`。

將 active tab 的 `text-red-800` 改為 `text-[#722F37]`。
將 inactive tab 的 `text-gray-400` 改為 `text-[#6B6B6B]`，`hover:text-gray-600` 改為 `hover:text-[#1A1A1A]`。

**Step 4: 更新 Placeholder 頁面**

地圖和品種 placeholder 的 `text-gray-600` 改為 `text-[#6B6B6B]`，`text-gray-400` 改為 `text-[#6B6B6B]`。
將 h2 加入 `font-['Noto_Serif_TC']`。

**Step 5: 驗證**

Run: `npx vite build 2>&1 | tail -5`
Expected: build 成功

**Step 6: Commit**

```bash
git add App.tsx
git commit -m "style: apply warm notebook theme to App shell"
```

---

### Task 3: StarRating.tsx — 更新星星顏色

**Files:**
- Modify: `components/StarRating.tsx`

**Step 1: 更新未選中星星顏色**

將 `fill` 屬性的未選中色：
```
'#e5e7eb'
```
改為：
```
'#E8DDD3'
```

將 `className` 的 `text-gray-200` 改為 `text-[#E8DDD3]`。

**Step 2: 驗證**

Run: `npx vite build 2>&1 | tail -5`
Expected: build 成功

**Step 3: Commit**

```bash
git add components/StarRating.tsx
git commit -m "style: warm star rating colors"
```

---

### Task 4: NoteCard.tsx — 卡片樣式

**Files:**
- Modify: `components/NoteCard.tsx`

**Step 1: 更新卡片容器**

將卡片外層 `border-gray-100` 改為 `border-[#E8DDD3]`，加入 `shadow-[0_1px_4px_rgba(114,47,55,0.04)]` 取代 `shadow-sm`。

**Step 2: 更新品種標籤**

將 `bg-red-50 text-red-800` 改為 `bg-[#F5EDE4] text-[#722F37]`。

**Step 3: 更新文字顏色**

- 酒名 `text-gray-900` → `text-[#1A1A1A] font-['Noto_Serif_TC']`
- 產區 `text-gray-600` → `text-[#6B6B6B]`
- 年份 `text-gray-400` → `text-[#6B6B6B]`
- 評分數字 `text-gray-800` → `text-[#1A1A1A]`

**Step 4: 更新香氣 tags**

將 `bg-gray-100 text-gray-600` 改為 `bg-[#F5EDE4] text-[#6B6B6B]`。
將溢出的 `bg-gray-50 text-gray-400` 改為 `bg-[#F5EDE4] text-[#6B6B6B]`。

**Step 5: 驗證**

Run: `npx vite build 2>&1 | tail -5`
Expected: build 成功

**Step 6: Commit**

```bash
git add components/NoteCard.tsx
git commit -m "style: warm notebook theme for note cards"
```

---

### Task 5: NoteDetailModal.tsx — 詳情頁

**Files:**
- Modify: `components/NoteDetailModal.tsx`

**Step 1: 更新 Modal 背景與 Header**

- Modal 背景 `bg-gray-100` → `bg-[#FAF6F1]`
- Header `border-gray-200` → `border-[#E8DDD3]`
- 標題 `text-gray-900` → `text-[#1A1A1A] font-['Noto_Serif_TC']`
- 關閉按鈕 `text-gray-500 hover:bg-gray-100` → `text-[#6B6B6B] hover:bg-[#F5EDE4]`
- 內容區 `bg-[#f2f2f7]` → `bg-[#FAF6F1]`

**Step 2: 更新 Header Card**

- 卡片 `border-gray-100` → `border-[#E8DDD3]`，加 `shadow-[0_1px_4px_rgba(114,47,55,0.04)]`
- 年份標籤 `bg-red-50 text-red-800` → `bg-[#F5EDE4] text-[#722F37]`
- 酒名加入 `font-['Noto_Serif_TC']`
- 評分數字 `text-gray-800` → `text-[#1A1A1A]`
- 資訊格子 `bg-gray-50` → `bg-[#F5EDE4]`
- 標籤文字 `text-gray-400` → `text-[#6B6B6B]`
- 值文字 `text-gray-900` → `text-[#1A1A1A]`
- icon `text-gray-400` → `text-[#722F37]`

**Step 3: 更新品飲細節區塊**

- 區塊標題裝飾條 `bg-red-800` → `bg-[#722F37]`
- 分隔線 `border-gray-50` → `border-[#F5EDE4]`
- label `text-gray-500` → `text-[#6B6B6B]`
- value `text-gray-900` → `text-[#1A1A1A]`
- 子區塊 `bg-gray-50` → `bg-[#F5EDE4]`
- 酸度/單寧圓點 active `bg-red-800` → `bg-[#722F37]`，inactive `bg-gray-200` → `bg-[#E8DDD3]`
- 香氣 tag `bg-gray-100 text-gray-700` → `bg-[#F5EDE4] text-[#6B6B6B]`

**Step 4: 更新心得區塊**

- 裝飾條 `bg-gray-600` → `bg-[#6B6B6B]`
- 心得文字 `text-gray-700` → `text-[#1A1A1A]`
- 區塊標題加入 `font-['Noto_Serif_TC']`

**Step 5: 驗證**

Run: `npx vite build 2>&1 | tail -5`
Expected: build 成功

**Step 6: Commit**

```bash
git add components/NoteDetailModal.tsx
git commit -m "style: warm notebook theme for detail modal"
```

---

### Task 6: AddNoteModal.tsx — 表單頁

**Files:**
- Modify: `components/AddNoteModal.tsx`

**Step 1: 更新 Modal 外殼**

- 背景 `bg-gray-100` → `bg-[#FAF6F1]`
- Header `border-gray-200` → `border-[#E8DDD3]`
- 取消/儲存按鈕 `text-red-600` → `text-[#722F37]`
- 標題 `text-gray-900` → `text-[#1A1A1A] font-['Noto_Serif_TC']`
- 表單區 `bg-[#f2f2f7]` → `bg-[#FAF6F1]`

**Step 2: 更新區塊卡片**

- 卡片 `border-gray-100` → `border-[#E8DDD3]`
- 區塊標題裝飾條 `bg-red-800` → `bg-[#722F37]`
- 區塊標題 `text-gray-800` → `text-[#1A1A1A] font-['Noto_Serif_TC']`

**Step 3: 更新表單欄位**

- 所有 label `text-gray-500` → `text-[#6B6B6B]`
- 所有 input/select `border-gray-200` → `border-[#E8DDD3]`
- 所有 input/select `focus:ring-red-500` → `focus:ring-[#722F37]`
- 所有 input/select `text-gray-900` → `text-[#1A1A1A]`
- 貨幣選單 `bg-gray-50` → `bg-[#F5EDE4]`
- 下拉箭頭 `text-gray-700` → `text-[#6B6B6B]`

**Step 4: 更新品酒筆記區塊**

- 香氣 tag active `bg-red-800 border-red-800` → `bg-[#722F37] border-[#722F37]`
- 香氣 tag inactive `bg-gray-100 text-gray-600` → `bg-[#F5EDE4] text-[#6B6B6B]`
- 滑桿背景 `bg-gray-50 border-gray-200` → `bg-[#F5EDE4] border-[#E8DDD3]`
- 滑桿 label `text-gray-700` → `text-[#1A1A1A]`
- 滑桿值 `text-red-700` → `text-[#722F37]`
- 滑桿軌道 `bg-gray-300` → `bg-[#E8DDD3]`
- 滑桿 accent `accent-red-700` → `accent-[#722F37]`
- 滑桿端標 `text-gray-400` → `text-[#6B6B6B]`
- 分隔線 `border-gray-100` → `border-[#E8DDD3]`

**Step 5: 驗證**

Run: `npx vite build 2>&1 | tail -5`
Expected: build 成功

**Step 6: Commit**

```bash
git add components/AddNoteModal.tsx
git commit -m "style: warm notebook theme for add note form"
```

---

### Task 7: CascadingSelect.tsx + SearchableSelect.tsx — 下拉選單

**Files:**
- Modify: `components/CascadingSelect.tsx`
- Modify: `components/SearchableSelect.tsx`

**Step 1: CascadingSelect 配色更新**

- input `border-gray-200` → `border-[#E8DDD3]`
- input `focus:ring-red-500` → `focus:ring-[#722F37]`
- input `text-gray-900` → `text-[#1A1A1A]`
- input `placeholder-gray-400` → `placeholder-[#6B6B6B]`
- 清除/箭頭 icon `text-gray-400 hover:text-gray-600` → `text-[#6B6B6B] hover:text-[#1A1A1A]`
- 下拉面板 `border-gray-200` → `border-[#E8DDD3]`
- 選項 hover `hover:bg-red-50` → `hover:bg-[#F5EDE4]`
- 選項文字 `text-gray-900` → `text-[#1A1A1A]`
- 選項邊框 `border-gray-50` → `border-[#F5EDE4]`
- 搜尋 icon `text-gray-400` → `text-[#6B6B6B]`
- 返回按鈕 `bg-gray-50 text-red-800 border-gray-200` → `bg-[#F5EDE4] text-[#722F37] border-[#E8DDD3]`
- 空結果 `text-gray-500` → `text-[#6B6B6B]`

**Step 2: SearchableSelect 同步更新**

套用與 CascadingSelect 完全相同的色值替換。

**Step 3: 驗證**

Run: `npx vite build 2>&1 | tail -5`
Expected: build 成功

**Step 4: Commit**

```bash
git add components/CascadingSelect.tsx components/SearchableSelect.tsx
git commit -m "style: warm notebook theme for select components"
```

---

### Task 8: 清理與最終驗證

**Files:**
- Delete: `preview.html`

**Step 1: 刪除預覽檔案**

```bash
rm preview.html
```

**Step 2: 完整 build 驗證**

Run: `npx vite build 2>&1`
Expected: build 成功，無錯誤無警告

**Step 3: 啟動 dev server 手動驗證**

Run: `npx vite`
手動確認：
- 背景色為暖米白
- 卡片邊框為暖灰棕
- 標題使用 serif 字體
- 所有文字清晰可讀
- 酒紅色 accent 一致

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove preview file, UI redesign complete"
```

**Step 5: Push to GitHub**

```bash
git push origin main
```
