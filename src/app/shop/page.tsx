'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { products, getProductsByCategory } from '@/data/products';
import { ProductCategory } from '@/types';

const categories: { label: string; value: ProductCategory }[] = [
  { label: 'ALL', value: 'all' },
  { label: 'HOODIES', value: 'hoodies' },
  { label: 'T-SHIRTS', value: 't-shirts' },
  { label: 'PANTS', value: 'pants' },
  { label: 'JACKETS', value: 'jackets' },
  { label: 'ACCESSORIES', value: 'accessories' },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const filteredProducts = getProductsByCategory(selectedCategory);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-24">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 pt-8">
          <div>
            <p className="font-mono text-[10px] tracking-widest text-grey-mid mb-2">
              001
            </p>
            <h1 className="font-display text-huge">SHOP</h1>
          </div>
          <p className="font-mono text-[11px] tracking-widest text-grey-mid">
            {filteredProducts.length} PRODUCTS
          </p>
        </div>

        {/* Filters */}
        <div className="border-y border-grey-dark py-4 mb-12">
          <div className="flex flex-wrap gap-4 md:gap-8">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`font-mono text-[11px] tracking-widest transition-colors ${
                  selectedCategory === category.value
                    ? 'text-white'
                    : 'text-grey-mid hover:text-grey-light'
                }`}
              >
                {category.label}
                {selectedCategory === category.value && (
                  <motion.div
                    layoutId="category-indicator"
                    className="h-[1px] bg-white mt-1"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link href={`/product/${product.slug}`} className="group block">
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-charcoal mb-4">
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="w-full h-full object-cover grayscale-hover"
                    />
                    
                    {/* Badges */}
                    {product.new && (
                      <span className="absolute top-3 left-3 font-mono text-[9px] tracking-widest bg-kolor-orange text-black px-2 py-1">
                        NEW
                      </span>
                    )}
                    
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="font-mono text-[11px] tracking-widest text-white">
                          SOLD OUT
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="space-y-1">
                    <h3 className="font-mono text-[11px] tracking-wider text-white group-hover:text-grey-light transition-colors">
                      {product.name.toUpperCase()}
                    </h3>
                    <p className="font-mono text-[11px] text-grey-mid">
                      ${product.price}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <p className="font-mono text-[11px] tracking-widest text-grey-mid">
              NO PRODUCTS FOUND
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
