import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  setRating?: (rating: number) => void;
  readOnly?: boolean;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, setRating, readOnly = false, size = 16 }) => {
  return (
    <div className="flex items-center space-x-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => setRating && setRating(star)}
          className={`${readOnly ? 'cursor-default' : 'cursor-pointer'} focus:outline-none`}
        >
          <Star
            size={size}
            fill={star <= rating ? '#facc15' : '#E8DDD3'} // yellow-400 vs warm beige
            className={star <= rating ? 'text-yellow-400' : 'text-[#E8DDD3]'}
            strokeWidth={0} 
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;