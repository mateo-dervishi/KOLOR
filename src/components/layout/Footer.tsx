'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/ui';

const footerLinks = [
  { label: 'SHOP', href: '/shop' },
  { label: 'LOOKBOOK', href: '/lookbook' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACT', href: '/contact' },
];

const legalLinks = [
  { label: 'TERMS', href: '/terms' },
  { label: 'PRIVACY', href: '/privacy' },
  { label: 'SHIPPING', href: '/shipping' },
];

const socialLinks = [
  { label: 'INSTAGRAM', href: 'https://instagram.com/kolor' },
  { label: 'TIKTOK', href: 'https://tiktok.com/@kolor' },
  { label: 'TWITTER', href: 'https://twitter.com/kolor' },
];

export function Footer() {
  const pathname = usePathname();
  const { hasEntered } = useUIStore();
  const currentYear = new Date().getFullYear();
  
  // Check if we're on home page and haven't entered yet
  const isHomePage = pathname === '/';
  const shouldHide = isHomePage && !hasEntered;

  return (
    <AnimatePresence>
      {!shouldHide && (
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="border-t border-grey-dark"
        >
          {/* Main Footer */}
          <div className="container py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
              {/* Brand */}
              <div className="md:col-span-4">
                <Link href="/">
                  <span className="font-display text-5xl md:text-6xl text-white">
                    KOLOR
                  </span>
                </Link>
                <p className="font-serif italic text-grey-light text-lg mt-4 max-w-xs">
                  &quot;I thought life was full of kolor&quot;
                </p>
              </div>

              {/* Navigation */}
              <div className="md:col-span-2">
                <ul className="space-y-3">
                  {footerLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-mono text-[11px] text-grey-light hover:text-white tracking-widest transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social */}
              <div className="md:col-span-2">
                <ul className="space-y-3">
                  {socialLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[11px] text-grey-light hover:text-white tracking-widest transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div className="md:col-span-2">
                <ul className="space-y-3">
                  {legalLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-mono text-[11px] text-grey-light hover:text-white tracking-widest transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div className="md:col-span-2">
                <p className="font-mono text-[11px] text-grey-light tracking-widest mb-4">
                  NEWSLETTER
                </p>
                <form className="flex flex-col gap-2">
                  <input
                    type="email"
                    placeholder="EMAIL"
                    className="w-full bg-transparent border-b border-grey-dark py-2 font-mono text-[11px] text-white placeholder:text-grey-mid focus:outline-none focus:border-white transition-colors"
                  />
                  <button
                    type="submit"
                    className="font-mono text-[11px] text-grey-light hover:text-white tracking-widest text-left transition-colors mt-2"
                  >
                    SUBSCRIBE →
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-grey-dark">
            <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="font-mono text-[10px] text-grey-mid tracking-widest">
                © {currentYear} KOLOR. ALL RIGHTS RESERVED.
              </p>
              <p className="font-mono text-[10px] text-grey-mid tracking-widest">
                NO KOLOR JUST REALITY
              </p>
            </div>
          </div>
        </motion.footer>
      )}
    </AnimatePresence>
  );
}
