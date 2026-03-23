
import React, { useState, useRef, useEffect } from 'react';
import { SelectOption } from '../types';
import { ChevronDown, X } from 'lucide-react';

interface SearchableSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select..." 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 當外部 value 改變時，同步更新內部的文字顯示
  useEffect(() => {
    const selectedOption = options.find(opt => opt.value === value);
    
    if (selectedOption) {
      // 如果找到對應的選項，顯示 Label (例如: 🇫🇷 法國...)
      // 只有當目前顯示的文字跟 Label 不一樣時才更新，避免游標跳動
      if (inputValue !== selectedOption.label) {
        setInputValue(selectedOption.label);
      }
    } else {
      // 如果找不到選項（代表是自訂輸入，或是空值）
      // 如果外部 value 跟內部 inputValue 不一致，才強制同步
      // 這是為了避免使用者正在打字時，useEffect 強制把輸入框重置
      if (value !== inputValue) {
        setInputValue(value || '');
      }
    }
  }, [value, options]); 

  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(inputValue.toLowerCase()) || 
    opt.value.toLowerCase().includes(inputValue.toLowerCase())
  );

  // 點擊外部關閉選單
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputValue(text);
    setIsOpen(true);
    // 立即回傳給父層，允許使用者輸入自訂文字
    onChange(text); 
  };

  const handleSelectOption = (option: SelectOption) => {
    setInputValue(option.label);
    onChange(option.value); // 傳回真實 value (例如: France/Bordeaux)
    setIsOpen(false);
  };

  const handleInputClick = () => {
    setIsOpen(true);
  };

  const clearInput = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInputValue('');
    onChange('');
    setIsOpen(true);
    inputRef.current?.focus();
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          autoComplete="off" 
          className="w-full rounded-lg p-3 pr-10 border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all appearance-none bg-white text-gray-900 placeholder-gray-400"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onFocus={() => setIsOpen(true)}
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {inputValue && (
            <button 
              type="button" 
              onClick={clearInput} 
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X size={16} />
            </button>
          )}
          {!inputValue && (
            <div className="pointer-events-none text-gray-400">
               <ChevronDown size={16} />
            </div>
          )}
        </div>
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute z-[100] w-full mt-1 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-xl py-1 text-sm touch-pan-y">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option.value}
                className="px-3 py-3 bg-white hover:bg-red-50 cursor-pointer text-gray-900 border-b border-gray-50 last:border-none flex items-center transition-colors duration-150"
                onMouseDown={(e) => {
                    e.preventDefault(); // 防止 input blur
                    handleSelectOption(option);
                }}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="px-3 py-3 bg-white text-gray-500 italic">
              無符合選項 (將使用目前輸入值)
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchableSelect;
