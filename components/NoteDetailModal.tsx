
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
    <div className="fixed inset-0 z-50 bg-gray-100 flex flex-col animate-fade-in">
      {/* Header */}
      <div className="bg-white shadow-sm flex justify-between items-center px-4 py-3 border-b border-gray-200 shrink-0 pt-safe-top">
        <div className="w-10"></div> {/* Spacer */}
        <h2 className="font-bold text-lg text-gray-900">筆記詳情</h2>
        <button 
          type="button"
          onClick={onClose} 
          className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-20 bg-[#f2f2f7]">
        <div className="max-w-2xl mx-auto space-y-4">
            
            {/* Header Card */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex flex-col items-center text-center mb-4">
                    <div className="bg-red-50 text-red-800 px-3 py-1 rounded-full text-sm font-bold mb-2">
                        {note.vintage}
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2">{note.name}</h1>
                    <div className="flex items-center justify-center space-x-1">
                         <StarRating rating={note.rating} readOnly size={24} />
                         <span className="text-xl font-bold text-gray-800 ml-2">{note.rating.toFixed(1)}</span>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <MapPin size={18} className="text-gray-400 mt-0.5 shrink-0" />
                        <div>
                            <div className="text-xs text-gray-400 uppercase font-bold">產區</div>
                            <div className="text-sm font-medium text-gray-900">{note.region}</div>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Grape size={18} className="text-gray-400 mt-0.5 shrink-0" />
                        <div>
                             <div className="text-xs text-gray-400 uppercase font-bold">品種</div>
                             <div className="text-sm font-medium text-gray-900">{note.variety}</div>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <DollarSign size={18} className="text-gray-400 mt-0.5 shrink-0" />
                        <div>
                             <div className="text-xs text-gray-400 uppercase font-bold">價格</div>
                             <div className="text-sm font-medium text-gray-900">{note.price || '未填寫'}</div>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Calendar size={18} className="text-gray-400 mt-0.5 shrink-0" />
                        <div>
                             <div className="text-xs text-gray-400 uppercase font-bold">日期</div>
                             <div className="text-sm font-medium text-gray-900">{new Date(note.date).toLocaleDateString()}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Taste Profile */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                 <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center">
                    <span className="w-1 h-5 bg-red-800 rounded mr-2"></span>
                    品飲細節
                </h3>

                <div className="space-y-4">
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                        <span className="text-gray-500 text-sm">外觀</span>
                        <span className="text-gray-900 font-medium text-sm">{getLabel(APPEARANCE_OPTIONS, note.appearance)}</span>
                    </div>

                    <div>
                        <span className="text-gray-500 text-sm block mb-2">香氣</span>
                        <div className="flex flex-wrap gap-2">
                            {note.aromas.map(a => (
                                <span key={a} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                    {displayAroma(a)}
                                </span>
                            ))}
                        </div>
                    </div>

                     <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-2">
                        <div>
                            <span className="text-gray-500 text-xs uppercase block mb-1">甜度</span>
                            <span className="text-gray-900 font-medium text-sm block bg-gray-50 p-2 rounded">{getLabel(SWEETNESS_OPTIONS, note.sweetness)}</span>
                        </div>
                         <div>
                            <span className="text-gray-500 text-xs uppercase block mb-1">酒體</span>
                            <span className="text-gray-900 font-medium text-sm block bg-gray-50 p-2 rounded">{getLabel(BODY_OPTIONS, note.body)}</span>
                        </div>
                         <div>
                            <span className="text-gray-500 text-xs uppercase block mb-1">酸度</span>
                            <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                <span className="text-gray-900 font-medium text-sm">{LEVEL_LABELS[note.acidity - 1]}</span>
                                <div className="flex gap-0.5">
                                    {[1,2,3,4,5].map(i => (
                                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= note.acidity ? 'bg-red-800' : 'bg-gray-200'}`}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                         <div>
                            <span className="text-gray-500 text-xs uppercase block mb-1">單寧</span>
                             <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                <span className="text-gray-900 font-medium text-sm">{LEVEL_LABELS[note.tannin - 1]}</span>
                                <div className="flex gap-0.5">
                                    {[1,2,3,4,5].map(i => (
                                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= note.tannin ? 'bg-red-800' : 'bg-gray-200'}`}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                     <div className="mt-2 pt-2 border-t border-gray-50">
                        <div className="flex justify-between items-center">
                             <span className="text-gray-500 text-sm">餘韻</span>
                             <div className="flex items-center text-gray-900 font-medium text-sm">
                                <Clock size={14} className="mr-1 text-gray-400" />
                                {getLabel(FINISH_OPTIONS, note.finish)}
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Memo / Notes */}
            {note.memo && (
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center">
                        <span className="w-1 h-5 bg-gray-600 rounded mr-2"></span>
                        心得
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
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
