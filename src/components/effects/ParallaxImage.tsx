'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  grayscale?: boolean;
}

export function ParallaxImage({
  src,
  alt,
  className = '',
  speed = 0.5,
  grayscale = true,
}: ParallaxImageProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);
  const filter = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    grayscale
      ? ['grayscale(100%)', 'grayscale(50%)', 'grayscale(0%)', 'grayscale(0%)']
      : ['grayscale(0%)', 'grayscale(0%)', 'grayscale(0%)', 'grayscale(0%)']
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, filter }}
        className="w-full h-full object-cover scale-110"
      />
    </div>
  );
}

