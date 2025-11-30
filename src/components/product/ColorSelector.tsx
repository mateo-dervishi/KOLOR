'use client';

import { motion } from 'framer-motion';
import { ProductColor } from '@/types';

interface ColorSelectorProps {
  colors: ProductColor[];
  selectedColor: ProductColor | null;
  onSelect: (color: ProductColor) => void;
}

export function ColorSelector({
  colors,
  selectedColor,
  onSelect,
}: ColorSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-grey-light tracking-wider uppercase">
          Color
        </span>
        {selectedColor && (
          <span className="text-sm text-grey-mid">— {selectedColor.name}</span>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => {
          const isSelected = selectedColor?.name === color.name;
          const isAvailable = color.available;

          return (
            <motion.button
              key={color.name}
              onClick={() => isAvailable && onSelect(color)}
              whileHover={isAvailable ? { scale: 1.1 } : {}}
              whileTap={isAvailable ? { scale: 0.9 } : {}}
              disabled={!isAvailable}
              className={`
                relative w-10 h-10 rounded-full
                transition-all duration-200
                ${!isAvailable ? 'opacity-30 cursor-not-allowed' : ''}
              `}
              title={color.name}
            >
              <span
                className="absolute inset-1 rounded-full"
                style={{ backgroundColor: color.hex }}
              />
              {isSelected && (
                <motion.span
                  layoutId="color-selector"
                  className="absolute inset-0 border-2 border-burnt-orange rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              {!isAvailable && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-full h-[2px] bg-grey-mid rotate-45 absolute" />
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

