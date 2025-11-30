'use client';

import { motion } from 'framer-motion';

interface MarqueeProps {
  text?: string;
  speed?: number;
  className?: string;
}

export function Marquee({
  text = 'I THOUGHT LIFE WAS FULL OF KOLOR — WHAT\'S LIFE WITHOUT KOLOR — NO KOLOR JUST REALITY — ',
  speed = 20,
  className = '',
}: MarqueeProps) {
  return (
    <div className={`overflow-hidden py-6 bg-charcoal ${className}`}>
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: '-50%' }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="flex whitespace-nowrap"
      >
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-off-white/10 mx-4"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function MarqueeAccent() {
  return (
    <div className="overflow-hidden py-4 bg-burnt-orange">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: '-50%' }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="flex whitespace-nowrap"
      >
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="font-display text-xl md:text-2xl text-black mx-8 flex items-center gap-8"
          >
            <span>NEW DROP</span>
            <span className="text-2xl">★</span>
            <span>FREE SHIPPING OVER $150</span>
            <span className="text-2xl">★</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

