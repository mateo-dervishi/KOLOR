'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { TextReveal } from '../effects/TextReveal';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <section className="py-16 md:py-24 bg-charcoal border-b border-grey-dark">
      <div className="container max-w-2xl text-center">
        <TextReveal>
          <h2 className="font-display text-4xl md:text-5xl text-off-white mb-4">
            JOIN THE KOLOR REVOLUTION
          </h2>
        </TextReveal>
        <TextReveal delay={0.1}>
          <p className="text-grey-light mb-8">
            Subscribe for exclusive drops, early access, and a world beyond grey.
          </p>
        </TextReveal>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8"
            >
              {/* Color Explosion Effect */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-burnt-orange flex items-center justify-center"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-black"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </motion.div>
              <p className="text-off-white font-medium text-lg">
                Welcome to the kolor revolution
              </p>
              <p className="text-grey-light text-sm mt-2">
                Check your inbox for a special surprise
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-14"
                />
              </div>
              <Button type="submit" isLoading={isLoading} size="lg">
                Subscribe
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

