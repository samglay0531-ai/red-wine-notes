
import React, { useState, useRef, useEffect } from 'react';
import { HierarchyOption, SelectOption } from '../types';
import { ChevronRight, ChevronLeft, ChevronDown, X, Search } from 'lucide-react';

interface CascadingSelectProps {
  hierarchy: HierarchyOption[];
  flatOptions: SelectOption[]; // 用於反查 Label 與全域搜尋
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CascadingSelect: React.FC<CascadingSelectProps> = ({ 
  hierarchy, 
  flatOptions,
  value, 
  onChange, 
  placeholder = "Select..." 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentLevel, setCurrentLevel] = useState<0 | 1>(0);
  const [selectedCategory, setSelectedCategory] = useState<HierarchyOption | null>(null);
  
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 當外部 Value 改變，更新顯示文字
  useEffect(() => {
    if (!value) {
      if (inputValue !== '') setInputValue('');
      return;
    }
    
    // 嘗試從扁平列表中找到對應的完整 Label
    const found = flatOptions.find(opt => opt.value === value);
    if (found) {
      if (inputValue !== found.label) {
        setInputValue(found.label);
      }
    } else {
      // 找不到（可能是自訂輸入），直接顯示 Value
      if (inputValue !== value) {
        setInputValue(value);
      }
    }
  }, [value, flatOptions]);

  // 點擊外部關閉
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // 如果關閉時，Input 的值不等於目前的 Value (使用者打了一半沒選)，重置回 Value
        // 除非 Value 本身是空的
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  // 搜尋模式：如果使用者正在打字 (且不是完整的已選 Label)，則視為搜尋
  const isSearching = inputValue && !flatOptions.some(opt => opt.label === inputValue);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputValue(text);
    setIsOpen(true);
    onChange(text); // 允許即時自訂輸入
    // 打字時自動切回 Root Level (搜尋模式)
    setCurrentLevel(0);
    setSelectedCategory(null);
  };

  const handleCategoryClick = (category: HierarchyOption, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCategory(category);
    setCurrentLevel(1);
  };

  const handleBackClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentLevel(0);
    setSelectedCategory(null);
  };

  const handleOptionSelect = (option: SelectOption) => {
    // 這裡我們希望顯示完整的 Label (包含國家/類型前綴)
    // flatOptions 裡面的 label 已經處理好前綴了，我們試著找找看
    const flatMatch = flatOptions.find(f => f.value === option.value);
    const fullLabel = flatMatch ? flatMatch.label : option.label;

    setInputValue(fullLabel);
    onChange(option.value);
    setIsOpen(false);
    setCurrentLevel(0);
    setSelectedCategory(null);
  };

  const clearInput = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInputValue('');
    onChange('');
    setIsOpen(true);
    setCurrentLevel(0);
    setSelectedCategory(null);
    inputRef.current?.focus();
  };

  // 決定要顯示的清單內容
  const renderContent = () => {
    // 1. 搜尋模式 (顯示扁平結果)
    if (isSearching) {
      const searchLower = inputValue.toLowerCase();
      const results = flatOptions.filter(opt => 
        opt.label.toLowerCase().includes(searchLower) || 
        opt.value.toLowerCase().includes(searchLower)
      );

      if (results.length === 0) {
         return (
          <li className="px-3 py-3 text-[#6B6B6B] italic text-sm">
            無符合選項 (將使用您輸入的文字)
          </li>
        );
      }

      return results.map(opt => (
        <li 
          key={opt.value}
          className="px-3 py-3 bg-white hover:bg-[#F5EDE4] cursor-pointer text-[#1A1A1A] border-b border-[#F5EDE4] last:border-none flex items-center"
          onMouseDown={(e) => { e.preventDefault(); handleOptionSelect(opt); }}
        >
          <Search size={14} className="mr-2 text-[#6B6B6B]" />
          {opt.label}
        </li>
      ));
    }

    // 2. 第二層 (子選項)
    if (currentLevel === 1 && selectedCategory) {
      return (
        <>
          <li 
            className="px-3 py-2 bg-[#F5EDE4] text-[#722F37] font-bold text-sm flex items-center cursor-pointer sticky top-0 z-10 border-b border-[#E8DDD3]"
            onMouseDown={(e) => { e.preventDefault(); handleBackClick(e); }}
          >
            <ChevronLeft size={16} className="mr-1" />
            返回 {selectedCategory.label.split('(')[0]}
          </li>
          {selectedCategory.children.map(child => (
            <li 
              key={child.value}
              className="px-3 py-3 bg-white hover:bg-[#F5EDE4] cursor-pointer text-[#1A1A1A] border-b border-[#F5EDE4] last:border-none pl-6"
              onMouseDown={(e) => { e.preventDefault(); handleOptionSelect(child); }}
            >
              {child.label}
            </li>
          ))}
        </>
      );
    }

    // 3. 第一層 (大分類)
    return hierarchy.map(cat => (
      <li 
        key={cat.value}
        className="px-3 py-3 bg-white hover:bg-[#F5EDE4] cursor-pointer text-[#1A1A1A] border-b border-[#F5EDE4] last:border-none flex justify-between items-center font-medium"
        onMouseDown={(e) => { e.preventDefault(); handleCategoryClick(cat, e); }}
      >
        <span>{cat.label}</span>
        <ChevronRight size={16} className="text-[#6B6B6B]" />
      </li>
    ));
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          autoComplete="off"
          className="w-full rounded-lg p-3 pr-10 border border-[#E8DDD3] focus:ring-2 focus:ring-[#722F37] outline-none transition-all appearance-none bg-white text-[#1A1A1A] placeholder-[#6B6B6B]"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onClick={() => setIsOpen(true)}
          onFocus={() => setIsOpen(true)}
        />
         <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {inputValue ? (
            <button type="button" onClick={clearInput} className="text-[#6B6B6B] hover:text-[#1A1A1A] p-1">
              <X size={16} />
            </button>
          ) : (
            <div className="pointer-events-none text-[#6B6B6B]">
               <ChevronDown size={16} />
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <ul className="absolute z-[100] w-full mt-1 max-h-60 overflow-y-auto bg-white border border-[#E8DDD3] rounded-lg shadow-xl py-1 text-sm touch-pan-y">
          {renderContent()}
        </ul>
      )}
    </div>
  );
};

export default CascadingSelect;
