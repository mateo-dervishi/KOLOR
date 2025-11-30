'use client';

import { motion } from 'framer-motion';
import { Size } from '@/types';

interface SizeSelectorProps {
  sizes: Size[];
  selectedSize: Size | null;
  onSelect: (size: Size) => void;
  availableSizes?: Size[];
}

export function SizeSelector({
  sizes,
  selectedSize,
  onSelect,
  availableSizes = sizes,
}: SizeSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-grey-light tracking-wider uppercase">
          Size
        </span>
        <button className="text-sm text-grey-mid hover:text-off-white transition-colors underline">
          Size Guide
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const isAvailable = availableSizes.includes(size);
          const isSelected = selectedSize === size;

          return (
            <motion.button
              key={size}
              onClick={() => isAvailable && onSelect(size)}
              whileHover={isAvailable ? { scale: 1.05 } : {}}
              whileTap={isAvailable ? { scale: 0.95 } : {}}
              disabled={!isAvailable}
              className={`
                min-w-[3rem] px-4 py-3 text-sm font-medium
                border transition-colors duration-200
                ${
                  isSelected
                    ? 'border-burnt-orange bg-burnt-orange text-black'
                    : isAvailable
                    ? 'border-grey-mid text-off-white hover:border-off-white'
                    : 'border-grey-dark text-grey-dark cursor-not-allowed line-through'
                }
              `}
            >
              {size}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

