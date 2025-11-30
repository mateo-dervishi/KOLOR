'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuLinks = [
  { label: 'SHOP', href: '/shop' },
  { label: 'LOOKBOOK', href: '/lookbook' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACT', href: '/contact' },
];

const secondaryLinks = [
  { label: 'INSTAGRAM', href: 'https://instagram.com/kolor' },
  { label: 'TIKTOK', href: 'https://tiktok.com/@kolor' },
  { label: 'TWITTER', href: 'https://twitter.com/kolor' },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[95] bg-black"
        >
          <div className="h-full flex flex-col justify-between p-5 pt-24">
            {/* Main Navigation */}
            <nav className="flex-1 flex flex-col justify-center">
              {menuLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block py-3"
                  >
                    <span className="font-display text-6xl text-white hover:text-kolor-orange transition-colors">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="border-t border-grey-dark pt-6"
            >
              <div className="flex gap-6">
                {secondaryLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] tracking-widest text-grey-light hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <p className="font-mono text-[10px] tracking-widest text-grey-mid mt-6">
                © 2024 KOLOR. ALL RIGHTS RESERVED.
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
