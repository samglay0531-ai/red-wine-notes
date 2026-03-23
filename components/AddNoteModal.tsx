
import React, { useState, useEffect } from 'react';
import { 
    REGION_HIERARCHY, VARIETY_HIERARCHY, ALL_REGIONS_FLAT, ALL_VARIETIES_FLAT,
    APPEARANCE_OPTIONS, SWEETNESS_OPTIONS, BODY_OPTIONS, FINISH_OPTIONS, 
    AROMA_TAGS, LEVEL_LABELS, VINTAGE_OPTIONS, CURRENCY_OPTIONS
} from '../constants';
import { WineNote } from '../types';
import StarRating from './StarRating';
import CascadingSelect from './CascadingSelect';

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: WineNote) => void;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({ isOpen, onClose, onSave }) => {
  // Form States
  const [name, setName] = useState('');
  
  const [region, setRegion] = useState('');
  const [variety, setVariety] = useState('');
  
  const [vintage, setVintage] = useState('');
  
  // Price split into Currency and Amount
  const [currency, setCurrency] = useState('TWD');
  const [price, setPrice] = useState('');
  
  const [rating, setRating] = useState(0);
  
  // Default to Ruby
  const [appearance, setAppearance] = useState('Ruby');
  const [aromas, setAromas] = useState<string[]>([]);
  
  const [sweetness, setSweetness] = useState('Dry');
  const [body, setBody] = useState('Medium-Bodied');
  const [acidity, setAcidity] = useState(3);
  const [tannin, setTannin] = useState(3);
  const [finish, setFinish] = useState('Medium');
  
  const [memo, setMemo] = useState('');

  // Effect to lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset form when opening/closing
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setName('');
        setRegion('');
        setVariety('');
        setVintage('');
        setCurrency('TWD');
        setPrice('');
        setRating(0);
        setAppearance('Ruby'); 
        setAromas([]);
        setSweetness('Dry');
        setBody('Medium-Bodied');
        setAcidity(3);
        setTannin(3);
        setFinish('Medium');
        setMemo('');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const toggleAroma = (value: string) => {
    setAromas(prev => 
      prev.includes(value) ? prev.filter(a => a !== value) : [...prev, value]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 尋找完整的 Label (例如 "🇫🇷 法國 / 波爾多") 以便儲存和顯示
    // 如果是自訂輸入，foundRegion 會是 undefined，則直接使用輸入的值
    const foundRegion = ALL_REGIONS_FLAT.find(r => r.value === region);
    const finalRegion = foundRegion ? foundRegion.label : region;

    const foundVariety = ALL_VARIETIES_FLAT.find(v => v.value === variety);
    const finalVariety = foundVariety ? foundVariety.label : variety; 
    // Variety Label 通常很長，我們可以只取括號內或第一段，但這裡我們保留完整 Label 以求精確

    // Combine currency and price
    const finalPrice = price ? `${currency === 'TWD' ? 'NT$' : currency} ${price}` : '';

    const newNote: WineNote = {
      id: Date.now().toString(),
      name: name || '未命名酒款',
      region: finalRegion || 'Unknown Region',
      variety: finalVariety || 'Blend',
      vintage: vintage || 'NV',
      price: finalPrice,
      rating: rating || 0,
      appearance,
      aromas,
      sweetness,
      body,
      acidity,
      tannin,
      finish,
      memo,
      date: new Date().toISOString()
    };

    onSave(newNote);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 bg-[#FAF6F1] flex flex-col transition-transform duration-300 transform ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
    >
      {/* Header */}
      <div className="bg-white shadow-sm flex justify-between items-center px-4 py-3 border-b border-[#E8DDD3] shrink-0 pt-safe-top z-10">
        <button 
          type="button"
          onClick={onClose} 
          className="text-[#722F37] text-base font-medium hover:opacity-70 transition-opacity"
        >
          取消
        </button>
        <h2 className="font-bold text-lg text-[#1A1A1A] font-['Noto_Serif_TC']">新增筆記</h2>
        <button 
          type="button"
          onClick={handleSave} 
          className="text-[#722F37] text-base font-bold hover:opacity-70 transition-opacity"
        >
          儲存
        </button>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 pb-20 bg-[#FAF6F1]">
        <form className="space-y-6 max-w-2xl mx-auto">
          
          {/* Section 1: Basic Info */}
          <section className="bg-white p-5 rounded-xl shadow-sm border border-[#E8DDD3]">
            <h3 className="text-base font-bold text-[#1A1A1A] font-['Noto_Serif_TC'] mb-4 flex items-center">
              <span className="w-1 h-5 bg-[#722F37] rounded mr-2"></span>
              基本資料
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="wine-name" className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider mb-1">酒名 / Name</label>
                <input 
                  id="wine-name"
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="例如：Château Margaux" 
                  className="w-full rounded-lg p-3 border border-[#E8DDD3] focus:ring-2 focus:ring-[#722F37] focus:border-transparent outline-none transition-all appearance-none bg-white text-[#1A1A1A]"
                />
              </div>

              {/* Region (Cascading Select) */}
              <div className="relative z-30">
                <label className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider mb-1">產區 / Region</label>
                <CascadingSelect 
                  hierarchy={REGION_HIERARCHY}
                  flatOptions={ALL_REGIONS_FLAT}
                  value={region}
                  onChange={setRegion}
                  placeholder="選擇或輸入產區 (先選國家)..."
                />
              </div>

              {/* Variety (Cascading Select) */}
              <div className="relative z-20">
                <label className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider mb-1">葡萄品種 / Variety</label>
                <CascadingSelect 
                  hierarchy={VARIETY_HIERARCHY}
                  flatOptions={ALL_VARIETIES_FLAT}
                  value={variety}
                  onChange={setVariety}
                  placeholder="選擇或輸入品種 (先選類型)..."
                />
              </div>

              <div className="flex gap-4">
                {/* Vintage */}
                <div className="flex-1">
                  <label htmlFor="vintage-select" className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider mb-1">年份 / Vintage</label>
                  <div className="relative">
                    <select 
                        id="vintage-select"
                        value={vintage}
                        onChange={(e) => setVintage(e.target.value)}
                        className="w-full rounded-lg p-3 border border-[#E8DDD3] focus:ring-2 focus:ring-[#722F37] outline-none appearance-none bg-white text-[#1A1A1A]"
                    >
                        <option value="" disabled>選擇年份</option>
                        {VINTAGE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#6B6B6B]">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="flex-1">
                  <label htmlFor="price-input" className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider mb-1">價格 / Price</label>
                  <div className="flex rounded-lg shadow-sm">
                    <div className="relative w-24">
                         <select 
                            id="currency-select"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="w-full h-full rounded-l-lg p-3 pr-6 border-y border-l border-[#E8DDD3] focus:ring-2 focus:ring-[#722F37] outline-none appearance-none bg-[#F5EDE4] text-sm font-medium text-[#1A1A1A]"
                        >
                            {CURRENCY_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                    </div>
                    <input 
                        id="price-input"
                        type="number" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0" 
                        className="flex-1 rounded-r-lg p-3 border border-[#E8DDD3] focus:ring-2 focus:ring-[#722F37] outline-none appearance-none bg-white min-w-0 text-[#1A1A1A]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Tasting Note */}
          <section className="bg-white p-5 rounded-xl shadow-sm border border-[#E8DDD3]">
            <h3 className="text-base font-bold text-[#1A1A1A] font-['Noto_Serif_TC'] mb-4 flex items-center">
              <span className="w-1 h-5 bg-[#722F37] rounded mr-2"></span>
              品酒筆記
            </h3>
            
            <div className="space-y-6">
              {/* Rating */}
              <div className="flex flex-col items-center py-2">
                <label className="text-sm font-bold text-[#1A1A1A] mb-2">整體評分</label>
                <div className="scale-125">
                    <StarRating rating={rating} setRating={setRating} size={24} />
                </div>
              </div>

              <hr className="border-[#E8DDD3]" />

              {/* Appearance */}
              <div>
                <label htmlFor="appearance-select" className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider mb-1">外觀 / Appearance</label>
                <div className="relative">
                    <select 
                    id="appearance-select"
                    value={appearance}
                    onChange={(e) => setAppearance(e.target.value)}
                    className="w-full rounded-lg p-3 border border-[#E8DDD3] focus:ring-2 focus:ring-[#722F37] outline-none appearance-none bg-white text-[#1A1A1A]"
                    >
                    {APPEARANCE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#6B6B6B]">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
              </div>

              {/* Aromas */}
              <div>
                <label className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider mb-2">香氣 / Aroma</label>
                <div className="flex flex-wrap gap-2">
                  {AROMA_TAGS.map((tag) => {
                    const isActive = aromas.includes(tag.value);
                    return (
                      <button
                        key={tag.value}
                        type="button"
                        onClick={() => toggleAroma(tag.value)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                          isActive 
                            ? 'bg-[#722F37] text-white border-[#722F37] shadow-md'
                            : 'bg-[#F5EDE4] text-[#6B6B6B] border-transparent hover:bg-[#E8DDD3]'
                        }`}
                      >
                        {tag.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Palate Grid */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="sweetness-select" className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider mb-1">甜度 / Sweetness</label>
                   <div className="relative">
                        <select 
                            id="sweetness-select"
                            value={sweetness}
                            onChange={(e) => setSweetness(e.target.value)}
                            className="w-full rounded-lg p-3 border border-[#E8DDD3] focus:ring-2 focus:ring-[#722F37] outline-none appearance-none bg-white text-[#1A1A1A]"
                        >
                            {SWEETNESS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#6B6B6B]">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                   </div>
                </div>

                <div>
                  <label htmlFor="body-select" className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider mb-1">酒體 / Body</label>
                   <div className="relative">
                        <select 
                            id="body-select"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className="w-full rounded-lg p-3 border border-[#E8DDD3] focus:ring-2 focus:ring-[#722F37] outline-none appearance-none bg-white text-[#1A1A1A]"
                        >
                            {BODY_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#6B6B6B]">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>

                {/* Acidity Slider */}
                <div className="p-3 bg-[#F5EDE4] rounded-lg border border-[#E8DDD3]">
                  <label htmlFor="acidity-range" className="flex justify-between text-sm font-medium text-[#1A1A1A]">
                    <span>酸度 (Acidity)</span>
                    <span className="text-[#722F37] font-bold">{LEVEL_LABELS[acidity - 1]}</span>
                  </label>
                  <input 
                    id="acidity-range"
                    type="range" 
                    min="1" 
                    max="5" 
                    value={acidity}
                    onChange={(e) => setAcidity(Number(e.target.value))}
                    className="w-full h-2 bg-[#E8DDD3] rounded-lg appearance-none cursor-pointer mt-2 accent-[#722F37]"
                  />
                  <div className="flex justify-between text-xs text-[#6B6B6B] mt-1"><span>低</span><span>高</span></div>
                </div>

                {/* Tannin Slider */}
                <div className="p-3 bg-[#F5EDE4] rounded-lg border border-[#E8DDD3]">
                  <label htmlFor="tannin-range" className="flex justify-between text-sm font-medium text-[#1A1A1A]">
                    <span>單寧 (Tannin)</span>
                    <span className="text-[#722F37] font-bold">{LEVEL_LABELS[tannin - 1]}</span>
                  </label>
                  <input 
                    id="tannin-range"
                    type="range" 
                    min="1" 
                    max="5" 
                    value={tannin}
                    onChange={(e) => setTannin(Number(e.target.value))}
                    className="w-full h-2 bg-[#E8DDD3] rounded-lg appearance-none cursor-pointer mt-2 accent-[#722F37]"
                  />
                  <div className="flex justify-between text-xs text-[#6B6B6B] mt-1"><span>低</span><span>高</span></div>
                </div>
              </div>

              {/* Finish */}
              <div>
                <label htmlFor="finish-select" className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider mb-1">餘韻 / Finish</label>
                 <div className="relative">
                    <select 
                        id="finish-select"
                        value={finish}
                        onChange={(e) => setFinish(e.target.value)}
                        className="w-full rounded-lg p-3 border border-[#E8DDD3] focus:ring-2 focus:ring-[#722F37] outline-none appearance-none bg-white text-[#1A1A1A]"
                    >
                        {FINISH_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#6B6B6B]">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
              </div>

              {/* Memo */}
              <div>
                <label htmlFor="memo-text" className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider mb-1">心得 / Notes</label>
                <textarea
                    id="memo-text"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="寫下您的品飲心得..."
                    rows={4}
                    className="w-full rounded-lg p-3 border border-[#E8DDD3] focus:ring-2 focus:ring-[#722F37] outline-none appearance-none bg-white text-[#1A1A1A] resize-none"
                ></textarea>
              </div>

            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default AddNoteModal;
