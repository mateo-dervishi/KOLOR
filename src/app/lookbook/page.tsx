'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

const lookbookImages = [
  {
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80',
    alt: 'Lookbook 1',
    span: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80',
    alt: 'Lookbook 2',
    span: 'col-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&q=80',
    alt: 'Lookbook 3',
    span: 'col-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80',
    alt: 'Lookbook 4',
    span: 'col-span-1 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80',
    alt: 'Lookbook 5',
    span: 'col-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80',
    alt: 'Lookbook 6',
    span: 'col-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=800&q=80',
    alt: 'Lookbook 7',
    span: 'col-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1200&q=80',
    alt: 'Lookbook 8',
    span: 'col-span-2',
  },
];

export default function LookbookPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity }}
        className="h-screen relative flex items-center justify-center overflow-hidden"
      >
        <motion.img
          style={{ scale: heroScale }}
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=80"
          alt="Lookbook Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 text-center"
        >
          <p className="font-mono text-[10px] tracking-widest text-grey-light mb-4">
            SS25 COLLECTION
          </p>
          <h1 className="font-display text-massive">
            LOOKBOOK
          </h1>
          <p className="font-serif italic text-xl text-grey-light mt-4">
            &quot;The journey from grey to kolor&quot;
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <p className="font-mono text-[10px] tracking-widest text-grey-mid mb-4">
            SCROLL
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"
          />
        </motion.div>
      </motion.section>

      {/* Gallery Grid */}
      <section className="container py-24">
        <div className="flex justify-between items-end mb-16">
          <div>
            <p className="font-mono text-[10px] tracking-widest text-grey-mid mb-2">
              001
            </p>
            <h2 className="font-display text-5xl">THE COLLECTION</h2>
          </div>
          <Link
            href="/shop"
            className="font-mono text-[11px] tracking-widest text-grey-light hover:text-white transition-colors link-underline"
          >
            SHOP NOW
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          {lookbookImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`${img.span} aspect-[3/4] overflow-hidden group cursor-pointer`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover grayscale-hover scale-100 group-hover:scale-105 transition-all duration-700"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Chapter Sections */}
      {[
        { num: '01', title: 'THE AWAKENING', desc: 'Where grey meets the first light of kolor.' },
        { num: '02', title: 'URBAN REALITY', desc: 'Streets paved with shadows and light.' },
        { num: '03', title: 'FULL SPECTRUM', desc: 'The complete revelation of kolor.' },
      ].map((chapter, i) => (
        <section key={chapter.num} className="py-32 border-t border-grey-dark">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <p className="font-mono text-[10px] tracking-widest text-grey-mid mb-4">
                CHAPTER {chapter.num}
              </p>
              <h2 className="font-display text-6xl md:text-7xl mb-6">
                {chapter.title}
              </h2>
              <p className="font-serif italic text-xl text-grey-light">
                {chapter.desc}
              </p>
            </motion.div>

            {/* Chapter Images */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mt-16">
              {lookbookImages.slice(i * 2, i * 2 + 3).map((img, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: j * 0.1 }}
                  className="aspect-[3/4] overflow-hidden"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover grayscale-hover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container"
        >
          <h2 className="font-display text-5xl md:text-6xl mb-8">
            READY TO ADD SOME KOLOR?
          </h2>
          <Link href="/shop">
            <button className="btn btn-filled">
              SHOP THE COLLECTION
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
