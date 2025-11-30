'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { CartItem as CartItemType } from '@/types';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const { product, quantity, size, color } = item;
  const mainImage = product.images.find((img) => img.isMain) || product.images[0];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="flex gap-4"
    >
      {/* Image */}
      <Link
        href={`/product/${product.slug}`}
        className="relative w-24 h-24 flex-shrink-0 bg-grey-dark overflow-hidden group"
      >
        <img
          src={mainImage.url}
          alt={mainImage.alt}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-off-white font-medium truncate hover:text-burnt-orange transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-grey-light mt-1">
          {size} / {color.name}
        </p>
        <p className="text-sm text-off-white mt-1">${product.price.toFixed(2)}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center border border-grey-mid">
            <button
              onClick={() => updateQuantity(item.id, quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-grey-light hover:text-off-white transition-colors"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <span className="w-8 text-center text-sm text-off-white">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-grey-light hover:text-off-white transition-colors"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="text-grey-mid hover:text-burgundy transition-colors text-sm"
          >
            Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
}

