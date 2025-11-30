'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white pt-24 pb-24">
      {/* Hero */}
      <section className="container pt-16 pb-32">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono text-[10px] tracking-widest text-grey-mid mb-4">
              001 — ABOUT
            </p>
            <h1 className="font-display text-huge mb-8">
              BORN FROM GREY REALITY
            </h1>
            <p className="font-serif text-2xl md:text-3xl font-light text-grey-light leading-relaxed max-w-2xl">
              In a world oversaturated with noise, we chose silence. In a world 
              full of color, we started with grey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Full Bleed Image */}
      <section className="relative h-[70vh] overflow-hidden">
        <motion.img
          style={{ y }}
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=80"
          alt="KOLOR Brand"
          className="absolute inset-0 w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-black/40" />
      </section>

      {/* Philosophy */}
      <section className="container py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <p className="font-mono text-[10px] tracking-widest text-grey-mid mb-8">
              002 — PHILOSOPHY
            </p>
            <h2 className="font-display text-5xl md:text-6xl mb-8">
              THE PHILOSOPHY
            </h2>
          </div>
          <div className="space-y-8">
            <div>
              <p className="font-serif italic text-xl text-kolor-orange mb-4">
                &quot;I thought life was full of kolor.&quot;
              </p>
              <p className="font-mono text-[12px] text-grey-light leading-relaxed">
                This isn&apos;t just a tagline—it&apos;s the question we ask ourselves 
                every day. What happens when we strip away the artificial 
                brightness, the forced optimism, the Instagram filters?
              </p>
            </div>
            <div>
              <p className="font-serif italic text-xl text-grey-mid mb-4">
                &quot;What&apos;s life without kolor?&quot;
              </p>
              <p className="font-mono text-[12px] text-grey-light leading-relaxed">
                We discovered that in the absence of color, you learn to see 
                differently. You notice texture, form, shadow—the fundamentals 
                that make beauty possible.
              </p>
            </div>
            <div>
              <p className="font-serif italic text-xl text-white mb-4">
                &quot;No kolor just reality.&quot;
              </p>
              <p className="font-mono text-[12px] text-grey-light leading-relaxed">
                This is where we start. Not as pessimism, but as honesty. 
                Reality is grey. Your job is to add the kolor—through how you 
                dress, how you move, how you live.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-grey-dark py-24">
        <div className="container">
          <p className="font-mono text-[10px] tracking-widest text-grey-mid mb-12">
            003 — VALUES
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              {
                num: '01',
                title: 'AUTHENTICITY',
                text: 'No gimmicks, no shortcuts. Every piece we create is born from genuine creative vision.',
              },
              {
                num: '02',
                title: 'QUALITY',
                text: 'We source the finest materials and work with skilled artisans. Every stitch matters.',
              },
              {
                num: '03',
                title: 'PURPOSE',
                text: 'Streetwear with meaning. Each design carries a philosophy beyond aesthetics.',
              },
            ].map((value, i) => (
              <motion.div
                key={value.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <p className="font-display text-4xl text-grey-dark mb-4">
                  {value.num}
                </p>
                <h3 className="font-display text-2xl text-white mb-4">
                  {value.title}
                </h3>
                <p className="font-mono text-[12px] text-grey-light leading-relaxed">
                  {value.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="container py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="font-serif italic text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            &quot;In a grey world, be the kolor that makes people stop and 
            look twice.&quot;
          </p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="container pb-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-16 border-t border-grey-dark">
          <p className="font-mono text-[12px] text-grey-light">
            Ready to add some kolor to your life?
          </p>
          <Link href="/shop">
            <button className="btn btn-filled">
              SHOP COLLECTION
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
