'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getProductBySlug, products } from '@/data/products';
import { useCartStore } from '@/store/cart';
import { useUIStore } from '@/store/ui';
import { Size, ProductColor } from '@/types';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    product?.colors.find((c) => c.available) || null
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const showToast = useUIStore((state) => state.showToast);

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-white mb-4">NOT FOUND</h1>
          <Link href="/shop" className="font-mono text-[11px] tracking-widest text-grey-light hover:text-white">
            ← BACK TO SHOP
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) return;
    
    setIsAdding(true);
    await new Promise((r) => setTimeout(r, 500));
    
    addItem(product, selectedSize, selectedColor, 1);
    showToast('Added to bag', 'success');
    setIsAdding(false);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-24">
      <div className="container">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pt-8 mb-8"
        >
          <div className="font-mono text-[10px] tracking-widest text-grey-mid">
            <Link href="/shop" className="hover:text-white transition-colors">SHOP</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{product.name.toUpperCase()}</span>
          </div>
        </motion.div>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div className="aspect-[3/4] bg-charcoal overflow-hidden mb-4">
              <img
                src={product.images[selectedImageIndex].url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`w-20 h-24 overflow-hidden border transition-colors ${
                      selectedImageIndex === i ? 'border-white' : 'border-grey-dark hover:border-grey-mid'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            {/* Title & Price */}
            <div className="mb-8">
              {product.new && (
                <span className="font-mono text-[9px] tracking-widest bg-kolor-orange text-black px-2 py-1 inline-block mb-4">
                  NEW
                </span>
              )}
              <h1 className="font-display text-5xl md:text-6xl mb-4">
                {product.name.toUpperCase()}
              </h1>
              <p className="font-mono text-[14px] text-white">
                ${product.price}
              </p>
            </div>

            {/* Description */}
            <p className="font-mono text-[12px] text-grey-light leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="mb-6">
              <p className="font-mono text-[10px] tracking-widest text-grey-mid mb-3">
                COLOR — {selectedColor?.name.toUpperCase()}
              </p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => color.available && setSelectedColor(color)}
                    disabled={!color.available}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor?.name === color.name
                        ? 'border-white scale-110'
                        : 'border-transparent'
                    } ${!color.available ? 'opacity-30 cursor-not-allowed' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <p className="font-mono text-[10px] tracking-widest text-grey-mid">
                  SIZE
                </p>
                <button className="font-mono text-[10px] tracking-widest text-grey-mid hover:text-white transition-colors underline">
                  SIZE GUIDE
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] px-4 py-3 font-mono text-[11px] border transition-all ${
                      selectedSize === size
                        ? 'border-white bg-white text-black'
                        : 'border-grey-dark text-white hover:border-grey-mid'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor || !product.inStock || isAdding}
              className={`w-full py-4 font-mono text-[11px] tracking-widest transition-all ${
                !selectedSize || !selectedColor || !product.inStock
                  ? 'bg-grey-dark text-grey-mid cursor-not-allowed'
                  : 'bg-white text-black hover:bg-kolor-orange'
              }`}
            >
              {isAdding
                ? 'ADDING...'
                : !product.inStock
                ? 'SOLD OUT'
                : !selectedSize
                ? 'SELECT SIZE'
                : 'ADD TO BAG'}
            </button>

            {/* Product Details */}
            <div className="mt-12 pt-8 border-t border-grey-dark space-y-6">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer font-mono text-[11px] tracking-widest py-3">
                  <span>DETAILS</span>
                  <span className="group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="font-mono text-[11px] text-grey-light leading-relaxed pb-4">
                  {product.description}
                </p>
              </details>
              
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer font-mono text-[11px] tracking-widest py-3 border-t border-grey-dark">
                  <span>SHIPPING</span>
                  <span className="group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="font-mono text-[11px] text-grey-light leading-relaxed pb-4 space-y-2">
                  <p>• Free shipping on orders over $150</p>
                  <p>• Standard: 5-7 business days</p>
                  <p>• Express: 2-3 business days</p>
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer font-mono text-[11px] tracking-widest py-3 border-t border-grey-dark">
                  <span>CARE</span>
                  <span className="group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="font-mono text-[11px] text-grey-light leading-relaxed pb-4 space-y-2">
                  <p>• Machine wash cold</p>
                  <p>• Do not bleach</p>
                  <p>• Tumble dry low</p>
                </div>
              </details>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 pt-16 border-t border-grey-dark">
            <div className="flex justify-between items-end mb-12">
              <h2 className="font-display text-4xl">YOU MAY ALSO LIKE</h2>
              <Link 
                href="/shop"
                className="font-mono text-[11px] tracking-widest text-grey-light hover:text-white transition-colors"
              >
                VIEW ALL
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="group">
                  <div className="aspect-[3/4] bg-charcoal overflow-hidden mb-4">
                    <img
                      src={p.images[0].url}
                      alt={p.name}
                      className="w-full h-full object-cover grayscale-hover"
                    />
                  </div>
                  <h3 className="font-mono text-[11px] tracking-wider text-white group-hover:text-grey-light transition-colors">
                    {p.name.toUpperCase()}
                  </h3>
                  <p className="font-mono text-[11px] text-grey-mid mt-1">
                    ${p.price}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
