
import React from 'react';
import { WineNote } from '../types';
import StarRating from './StarRating';
import { AROMA_TAGS } from '../constants';

interface NoteCardProps {
  note: WineNote;
  onClick: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onClick }) => {
  // Helper to find aroma label
  const displayAroma = (aromaValue: string) => {
     const found = AROMA_TAGS.find(t => t.value === aromaValue);
     return found ? found.label : aromaValue;
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white p-4 rounded-2xl shadow-[0_1px_4px_rgba(114,47,55,0.04)] border border-[#E8DDD3] cursor-pointer active:scale-[0.98] transition-transform"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 mr-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#F5EDE4] text-[#722F37] text-xs font-bold px-2 py-0.5 rounded-full">
              {note.variety}
            </span>
            <span className="text-xs text-[#6B6B6B]">{note.vintage}</span>
          </div>
          <h2 className="font-bold text-xl text-[#1A1A1A] font-['Noto_Serif_TC'] leading-tight mb-1">{note.name}</h2>
          <p className="text-sm text-[#6B6B6B]">{note.region}</p>

          <div className="mt-3 flex flex-wrap gap-1">
            {note.aromas.slice(0, 5).map((aroma) => (
              <span key={aroma} className="text-[10px] bg-[#F5EDE4] text-[#6B6B6B] px-1.5 py-0.5 rounded">
                {displayAroma(aroma)}
              </span>
            ))}
            {note.aromas.length > 5 && (
              <span className="text-[10px] bg-[#F5EDE4] text-[#6B6B6B] px-1.5 py-0.5 rounded">
                +{note.aromas.length - 5}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="mb-2">
            <StarRating rating={note.rating} readOnly size={16} />
          </div>
          <span className="text-2xl font-bold text-[#1A1A1A]">{note.rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
