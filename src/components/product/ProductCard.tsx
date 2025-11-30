'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const mainImage = product.images.find((img) => img.isMain) || product.images[0];
  const secondaryImage = product.images[1] || mainImage;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.19, 1, 0.22, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <Link href={`/product/${product.slug}`}>
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-charcoal mb-4">
          {/* Main Image */}
          <motion.img
            src={mainImage.url}
            alt={mainImage.alt}
            className="absolute inset-0 w-full h-full object-cover"
            initial={false}
            animate={{
              filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)',
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          />

          {/* Secondary Image (shown on hover) */}
          {product.images.length > 1 && (
            <motion.img
              src={secondaryImage.url}
              alt={secondaryImage.alt}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                filter: 'grayscale(0%)',
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            />
          )}

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.new && (
              <span className="px-3 py-1 bg-burnt-orange text-black text-xs font-medium tracking-wider uppercase">
                New
              </span>
            )}
            {!product.inStock && (
              <span className="px-3 py-1 bg-grey-dark text-grey-light text-xs font-medium tracking-wider uppercase">
                Sold Out
              </span>
            )}
          </div>

          {/* Quick Add Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                // Quick add logic here
              }}
              className="w-full py-3 bg-off-white text-black text-sm font-medium tracking-wider uppercase hover:bg-burnt-orange transition-colors"
            >
              Quick Add
            </button>
          </motion.div>

          {/* Glitch Effect on Hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none mix-blend-screen"
            animate={{
              opacity: isHovered ? [0, 0.3, 0] : 0,
            }}
            transition={{ duration: 0.3 }}
            style={{
              background:
                'linear-gradient(45deg, transparent 30%, rgba(255,107,53,0.3) 50%, transparent 70%)',
            }}
          />
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <h3 className="text-off-white font-medium group-hover:text-burnt-orange transition-colors duration-300">
            {product.name}
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-grey-light">${product.price.toFixed(2)}</span>
            {product.compareAtPrice && (
              <span className="text-grey-mid line-through text-sm">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>
          {/* Color Swatches */}
          {product.colors.length > 1 && (
            <div className="flex gap-2 pt-2">
              {product.colors.slice(0, 4).map((color) => (
                <div
                  key={color.name}
                  className="w-4 h-4 rounded-full border border-grey-mid"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-grey-mid">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}

