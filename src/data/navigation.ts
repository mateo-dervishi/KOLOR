import { NavLink } from '@/types';

export const mainNavLinks: NavLink[] = [
  { label: 'Shop', href: '/shop' },
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const shopCategories: NavLink[] = [
  { label: 'All', href: '/shop' },
  { label: 'Hoodies', href: '/shop/hoodies' },
  { label: 'T-Shirts', href: '/shop/t-shirts' },
  { label: 'Pants', href: '/shop/pants' },
  { label: 'Jackets', href: '/shop/jackets' },
  { label: 'Accessories', href: '/shop/accessories' },
];

export const footerLinks = {
  shop: [
    { label: 'All Products', href: '/shop' },
    { label: 'New Arrivals', href: '/shop?filter=new' },
    { label: 'Best Sellers', href: '/shop?filter=featured' },
    { label: 'Sale', href: '/shop?filter=sale' },
  ],
  info: [
    { label: 'About Us', href: '/about' },
    { label: 'Lookbook', href: '/lookbook' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'Contact', href: '/contact' },
  ],
  help: [
    { label: 'Shipping & Returns', href: '/shipping' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Track Order', href: '/track-order' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
};

export const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/kolor', icon: 'instagram' },
  { label: 'Twitter', href: 'https://twitter.com/kolor', icon: 'twitter' },
  { label: 'TikTok', href: 'https://tiktok.com/@kolor', icon: 'tiktok' },
];

