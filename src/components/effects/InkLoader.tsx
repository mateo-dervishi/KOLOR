'use client';

import { motion } from 'framer-motion';

interface InkLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export function InkLoader({ size = 'md', color = '#FF6B35' }: InkLoaderProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  return (
    <div className={`relative ${sizes[size]}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{
            scale: [0, 1.5, 2],
            opacity: [0.8, 0.4, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: [0.19, 1, 0.22, 1],
          }}
        />
      ))}
    </div>
  );
}

export function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
    >
      <div className="relative">
        <InkLoader size="lg" />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <span className="font-display text-2xl tracking-wider text-off-white">
            KOLOR
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

