'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cart';
import { useUIStore } from '@/store/ui';
import { CartDrawer } from '../cart/CartDrawer';
import { MobileMenu } from './MobileMenu';

const navLinks = [
  { label: 'SHOP', href: '/shop' },
  { label: 'LOOKBOOK', href: '/lookbook' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACT', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { items, toggleCart, isOpen: cartOpen } = useCartStore();
  const { isMenuOpen, toggleMenu, closeMenu, hasEntered } = useUIStore();
  
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  
  // Check if we're on home page and haven't entered yet
  const isHomePage = pathname === '/';
  const shouldHide = isHomePage && !hasEntered;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!shouldHide && (
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`fixed top-0 left-0 right-0 z-[100] mix-blend-difference transition-all duration-500 ${
              scrolled ? 'py-4' : 'py-6'
            }`}
          >
            <div className="container flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="relative z-10" onClick={closeMenu}>
                <motion.span
                  whileHover={{ opacity: 0.5 }}
                  className="font-display text-2xl md:text-3xl text-white tracking-wider"
                >
                  KOLOR
                </motion.span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="font-mono text-[11px] text-white tracking-widest link-underline"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Right Actions */}
              <div className="flex items-center gap-6">
                {/* Cart */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  onClick={toggleCart}
                  className="relative font-mono text-[11px] text-white tracking-widest"
                >
                  BAG
                  {itemCount > 0 && (
                    <span className="ml-1">({itemCount})</span>
                  )}
                </motion.button>

                {/* Mobile Menu Toggle */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  onClick={toggleMenu}
                  className="md:hidden font-mono text-[11px] text-white tracking-widest"
                >
                  {isMenuOpen ? 'CLOSE' : 'MENU'}
                </motion.button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => useCartStore.getState().closeCart()} />

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => useUIStore.getState().closeMenu()} />
    </>
  );
}
