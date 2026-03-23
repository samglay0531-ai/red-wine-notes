
export interface WineNote {
  id: string;
  name: string;
  region: string;
  variety: string;
  vintage: string;
  price: string;
  rating: number;
  appearance: string;
  aromas: string[];
  sweetness: string;
  body: string;
  acidity: number;
  tannin: number;
  finish: string;
  memo?: string; // 新增品飲心得欄位
  date: string;
}

export type TabView = 'notes' | 'map' | 'variety';

export interface SelectOption {
  value: string;
  label: string;
  color?: string; // Optional text color for styling
}

// 新增：支援兩層結構的選項介面
export interface HierarchyOption {
  label: string;
  value: string; // Category ID (e.g., 'France', 'Red')
  children: SelectOption[]; // The actual selectable items
}
