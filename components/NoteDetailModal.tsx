
import React, { useEffect } from 'react';
import { WineNote } from '../types';
import { X, Calendar, DollarSign, MapPin, Grape, Clock } from 'lucide-react';
import StarRating from './StarRating';
import { AROMA_TAGS, APPEARANCE_OPTIONS, SWEETNESS_OPTIONS, BODY_OPTIONS, FINISH_OPTIONS, LEVEL_LABELS } from '../constants';

interface NoteDetailModalProps {
  note: WineNote;
  onClose: () => void;
}

const NoteDetailModal: React.FC<NoteDetailModalProps> = ({ note, onClose }) => {

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Helper to find labels
  const getLabel = (options: {value: string, label: string}[], val: string) => {
    const found = options.find(o => o.value === val);
    return found ? found.label : val;
  };

  const displayAroma = (aromaValue: string) => {
     const found = AROMA_TAGS.find(t => t.value === aromaValue);
     return found ? found.label : aromaValue;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF6F1] flex flex-col animate-fade-in">
      {/* Header */}
      <div className="bg-white shadow-sm flex justify-between items-center px-4 py-3 border-b border-[#E8DDD3] shrink-0 pt-safe-top">
        <div className="w-10"></div> {/* Spacer */}
        <h2 className="font-bold text-lg text-[#1A1A1A] font-['Noto_Serif_TC']">筆記詳情</h2>
        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center text-[#6B6B6B] hover:bg-[#F5EDE4] rounded-full transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-20 bg-[#FAF6F1]">
        <div className="max-w-2xl mx-auto space-y-4">

            {/* Header Card */}
            <div className="bg-white p-5 rounded-2xl shadow-[0_1px_4px_rgba(114,47,55,0.04)] border border-[#E8DDD3]">
                <div className="flex flex-col items-center text-center mb-4">
                    <div className="bg-[#F5EDE4] text-[#722F37] px-3 py-1 rounded-full text-sm font-bold mb-2">
                        {note.vintage}
                    </div>
                    <h1 className="text-2xl font-bold text-[#1A1A1A] font-['Noto_Serif_TC'] leading-tight mb-2">{note.name}</h1>
                    <div className="flex items-center justify-center space-x-1">
                         <StarRating rating={note.rating} readOnly size={24} />
                         <span className="text-xl font-bold text-[#1A1A1A] ml-2">{note.rating.toFixed(1)}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="flex items-start space-x-3 p-3 bg-[#F5EDE4] rounded-lg">
                        <MapPin size={18} className="text-[#722F37] mt-0.5 shrink-0" />
                        <div>
                            <div className="text-xs text-[#6B6B6B] uppercase font-bold">產區</div>
                            <div className="text-sm font-medium text-[#1A1A1A]">{note.region}</div>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-[#F5EDE4] rounded-lg">
                        <Grape size={18} className="text-[#722F37] mt-0.5 shrink-0" />
                        <div>
                             <div className="text-xs text-[#6B6B6B] uppercase font-bold">品種</div>
                             <div className="text-sm font-medium text-[#1A1A1A]">{note.variety}</div>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-[#F5EDE4] rounded-lg">
                        <DollarSign size={18} className="text-[#722F37] mt-0.5 shrink-0" />
                        <div>
                             <div className="text-xs text-[#6B6B6B] uppercase font-bold">價格</div>
                             <div className="text-sm font-medium text-[#1A1A1A]">{note.price || '未填寫'}</div>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-[#F5EDE4] rounded-lg">
                        <Calendar size={18} className="text-[#722F37] mt-0.5 shrink-0" />
                        <div>
                             <div className="text-xs text-[#6B6B6B] uppercase font-bold">日期</div>
                             <div className="text-sm font-medium text-[#1A1A1A]">{new Date(note.date).toLocaleDateString()}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Taste Profile */}
            <div className="bg-white p-5 rounded-2xl shadow-[0_1px_4px_rgba(114,47,55,0.04)] border border-[#E8DDD3]">
                 <h3 className="text-base font-bold text-[#1A1A1A] font-['Noto_Serif_TC'] mb-4 flex items-center">
                    <span className="w-1 h-5 bg-[#722F37] rounded mr-2"></span>
                    品飲細節
                </h3>

                <div className="space-y-4">
                    <div className="flex justify-between border-b border-[#F5EDE4] pb-2">
                        <span className="text-[#6B6B6B] text-sm">外觀</span>
                        <span className="text-[#1A1A1A] font-medium text-sm">{getLabel(APPEARANCE_OPTIONS, note.appearance)}</span>
                    </div>

                    <div>
                        <span className="text-[#6B6B6B] text-sm block mb-2">香氣</span>
                        <div className="flex flex-wrap gap-2">
                            {note.aromas.map(a => (
                                <span key={a} className="text-xs bg-[#F5EDE4] text-[#6B6B6B] px-2 py-1 rounded-full">
                                    {displayAroma(a)}
                                </span>
                            ))}
                        </div>
                    </div>

                     <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-2">
                        <div>
                            <span className="text-[#6B6B6B] text-xs uppercase block mb-1">甜度</span>
                            <span className="text-[#1A1A1A] font-medium text-sm block bg-[#F5EDE4] p-2 rounded">{getLabel(SWEETNESS_OPTIONS, note.sweetness)}</span>
                        </div>
                         <div>
                            <span className="text-[#6B6B6B] text-xs uppercase block mb-1">酒體</span>
                            <span className="text-[#1A1A1A] font-medium text-sm block bg-[#F5EDE4] p-2 rounded">{getLabel(BODY_OPTIONS, note.body)}</span>
                        </div>
                         <div>
                            <span className="text-[#6B6B6B] text-xs uppercase block mb-1">酸度</span>
                            <div className="flex items-center justify-between bg-[#F5EDE4] p-2 rounded">
                                <span className="text-[#1A1A1A] font-medium text-sm">{LEVEL_LABELS[note.acidity - 1]}</span>
                                <div className="flex gap-0.5">
                                    {[1,2,3,4,5].map(i => (
                                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= note.acidity ? 'bg-[#722F37]' : 'bg-[#E8DDD3]'}`}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                         <div>
                            <span className="text-[#6B6B6B] text-xs uppercase block mb-1">單寧</span>
                             <div className="flex items-center justify-between bg-[#F5EDE4] p-2 rounded">
                                <span className="text-[#1A1A1A] font-medium text-sm">{LEVEL_LABELS[note.tannin - 1]}</span>
                                <div className="flex gap-0.5">
                                    {[1,2,3,4,5].map(i => (
                                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= note.tannin ? 'bg-[#722F37]' : 'bg-[#E8DDD3]'}`}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                     <div className="mt-2 pt-2 border-t border-[#F5EDE4]">
                        <div className="flex justify-between items-center">
                             <span className="text-[#6B6B6B] text-sm">餘韻</span>
                             <div className="flex items-center text-[#1A1A1A] font-medium text-sm">
                                <Clock size={14} className="mr-1 text-[#722F37]" />
                                {getLabel(FINISH_OPTIONS, note.finish)}
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Memo / Notes */}
            {note.memo && (
                <div className="bg-white p-5 rounded-2xl shadow-[0_1px_4px_rgba(114,47,55,0.04)] border border-[#E8DDD3]">
                    <h3 className="text-base font-bold text-[#1A1A1A] font-['Noto_Serif_TC'] mb-3 flex items-center">
                        <span className="w-1 h-5 bg-[#6B6B6B] rounded mr-2"></span>
                        心得
                    </h3>
                    <p className="text-[#1A1A1A] text-sm leading-relaxed whitespace-pre-wrap">
                        {note.memo}
                    </p>
                </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default NoteDetailModal;
