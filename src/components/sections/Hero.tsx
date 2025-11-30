'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { CharacterReveal } from '../effects/TextReveal';

const taglines = [
  'no kolor just reality',
  "what's life without kolor",
  'I thought life was full of kolor',
];

export function Hero() {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [colorRevealed, setColorRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  // Cycle through taglines
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Reveal color after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setColorRevealed(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Background Image with Color Reveal */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0"
      >
        <motion.div
          initial={{ filter: 'grayscale(100%)' }}
          animate={{ filter: colorRevealed ? 'grayscale(0%)' : 'grayscale(100%)' }}
          transition={{ duration: 2, ease: [0.19, 1, 0.22, 1] }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1920&q=80"
            alt="KOLOR Hero"
            className="w-full h-full object-cover"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </motion.div>

        {/* Color Bleed Effect */}
        <motion.div
          initial={{ clipPath: 'circle(0% at 50% 50%)' }}
          animate={{
            clipPath: colorRevealed
              ? 'circle(150% at 50% 50%)'
              : 'circle(0% at 50% 50%)',
          }}
          transition={{ duration: 2.5, ease: [0.19, 1, 0.22, 1], delay: 0.5 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(255,107,53,0.4) 0%, transparent 70%)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative h-full flex flex-col items-center justify-center text-center px-6"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
        >
          <h1 className="font-display text-[15vw] md:text-[12vw] lg:text-[10vw] leading-none text-off-white tracking-wider">
            KOLOR
          </h1>
        </motion.div>

        {/* Rotating Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-4 h-8 overflow-hidden"
        >
          <motion.div
            key={currentTagline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="font-serif italic text-lg md:text-xl text-grey-light"
          >
            &quot;{taglines[currentTagline]}&quot;
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col sm:flex-row gap-4 mt-12"
        >
          <Link href="/shop">
            <Button size="lg">Shop Collection</Button>
          </Link>
          <Link href="/lookbook">
            <Button variant="outline" size="lg">
              View Lookbook
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-grey-light tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border border-grey-mid rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-off-white rounded-full" />
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 0.1, x: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block"
      >
        <div className="writing-mode-vertical text-xs text-grey-mid tracking-[0.3em] uppercase">
          EST. 2024 — STREETWEAR WITH PURPOSE
        </div>
      </motion.div>
    </div>
  );
}

