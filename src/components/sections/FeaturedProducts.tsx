'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ProductCard } from '../product/ProductCard';
import { TextReveal } from '../effects/TextReveal';
import { featuredProducts } from '@/data/products';
import { Button } from '../ui/Button';

export function FeaturedProducts() {
  return (
    <section className="py-24 md:py-32 bg-black">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <TextReveal>
              <span className="text-burnt-orange text-sm font-medium tracking-widest uppercase mb-4 block">
                New Arrivals
              </span>
            </TextReveal>
            <TextReveal delay={0.1}>
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-off-white">
                FEATURED
              </h2>
            </TextReveal>
          </div>
          <TextReveal delay={0.2}>
            <Link href="/shop">
              <Button variant="ghost" className="group">
                View All
                <motion.span
                  className="inline-block ml-2"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                >
                  →
                </motion.span>
              </Button>
            </Link>
          </TextReveal>
        </div>

        {/* Products Grid - Asymmetric Layout */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Large Featured Item */}
          {featuredProducts[0] && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="col-span-12 md:col-span-7 lg:col-span-8"
            >
              <Link
                href={`/product/${featuredProducts[0].slug}`}
                className="group block relative aspect-[4/5] md:aspect-[16/10] overflow-hidden bg-charcoal"
              >
                <motion.img
                  src={featuredProducts[0].images[0].url}
                  alt={featuredProducts[0].name}
                  className="w-full h-full object-cover"
                  initial={{ filter: 'grayscale(100%)', scale: 1 }}
                  whileHover={{ filter: 'grayscale(0%)', scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <span className="text-burnt-orange text-xs font-medium tracking-widest uppercase mb-2 block">
                    Featured
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl text-off-white mb-2">
                    {featuredProducts[0].name}
                  </h3>
                  <p className="text-grey-light">
                    ${featuredProducts[0].price.toFixed(2)}
                  </p>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Stacked Items */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-6">
            {featuredProducts.slice(1, 3).map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index + 1}
              />
            ))}
          </div>

          {/* Bottom Row - 3 items */}
          {featuredProducts.slice(3, 6).map((product, index) => (
            <div key={product.id} className="col-span-6 md:col-span-4">
              <ProductCard product={product} index={index + 3} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

