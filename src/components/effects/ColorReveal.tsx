'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ColorRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function ColorReveal({
  children,
  className = '',
  delay = 0,
  duration = 1.2,
}: ColorRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ filter: 'grayscale(100%)', opacity: 0.8 }}
      animate={
        isInView
          ? { filter: 'grayscale(0%)', opacity: 1 }
          : { filter: 'grayscale(100%)', opacity: 0.8 }
      }
      transition={{
        duration,
        delay,
        ease: [0.19, 1, 0.22, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

interface ColorRevealImageProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}

export function ColorRevealImage({
  src,
  alt,
  className = '',
  delay = 0,
}: ColorRevealImageProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <motion.div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ filter: 'grayscale(100%)', scale: 1.1 }}
        animate={
          isInView
            ? { filter: 'grayscale(0%)', scale: 1 }
            : { filter: 'grayscale(100%)', scale: 1.1 }
        }
        transition={{
          duration: 1.2,
          delay,
          ease: [0.19, 1, 0.22, 1],
        }}
      />
    </motion.div>
  );
}

