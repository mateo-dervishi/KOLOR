'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TextReveal, SplitTextReveal } from '../effects/TextReveal';
import { ColorRevealImage } from '../effects/ColorReveal';

export function BrandStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-black overflow-hidden">
      <div className="container">
        {/* Main Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-24">
          <div>
            <TextReveal>
              <span className="text-burnt-orange text-sm font-medium tracking-widest uppercase mb-4 block">
                Our Philosophy
              </span>
            </TextReveal>
            <TextReveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-off-white mb-6">
                THE WORLD STARTS GREY
              </h2>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-grey-light leading-relaxed mb-6">
                In a world saturated with noise, we chose silence. In a world full of
                color, we started with grey. Because true kolor isn&apos;t just seen—it&apos;s
                felt, earned, revealed through the mundane reality of everyday life.
              </p>
            </TextReveal>
            <TextReveal delay={0.3}>
              <p className="text-grey-light leading-relaxed">
                KOLOR is more than clothing. It&apos;s a philosophy—a reminder that beauty
                exists in contrast, that the vibrant becomes meaningful only against
                the backdrop of the ordinary.
              </p>
            </TextReveal>
          </div>

          <ColorRevealImage
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
            alt="Brand Story"
            className="aspect-[4/5]"
          />
        </div>

        {/* Parallax Text */}
        <div className="relative py-16">
          <motion.div style={{ x: x1 }} className="mb-4">
            <span className="font-display text-6xl md:text-8xl lg:text-9xl text-grey-dark whitespace-nowrap">
              NO KOLOR JUST REALITY NO KOLOR JUST REALITY
            </span>
          </motion.div>
          <motion.div style={{ x: x2 }}>
            <span className="font-display text-6xl md:text-8xl lg:text-9xl text-off-white/10 whitespace-nowrap">
              I THOUGHT LIFE WAS FULL OF KOLOR
            </span>
          </motion.div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {[
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
            'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80',
            'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&q=80',
            'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80',
          ].map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.19, 1, 0.22, 1],
              }}
              className="aspect-[3/4] overflow-hidden"
            >
              <motion.img
                src={src}
                alt={`Lookbook ${i + 1}`}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05, filter: 'grayscale(0%)' }}
                initial={{ filter: 'grayscale(100%)' }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

