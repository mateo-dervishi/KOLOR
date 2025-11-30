// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  category: ProductCategory;
  images: ProductImage[];
  sizes: Size[];
  colors: ProductColor[];
  inStock: boolean;
  featured?: boolean;
  new?: boolean;
  createdAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isMain?: boolean;
}

export interface ProductColor {
  name: string;
  hex: string;
  available: boolean;
}

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'ONE SIZE';

export type ProductCategory = 
  | 'hoodies'
  | 't-shirts'
  | 'pants'
  | 'jackets'
  | 'accessories'
  | 'all';

// Cart Types
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size: Size;
  color: ProductColor;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Navigation Types
export interface NavLink {
  label: string;
  href: string;
  featured?: boolean;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Newsletter Types
export interface NewsletterData {
  email: string;
}

// Filter Types
export interface FilterOptions {
  category: ProductCategory;
  sizes: Size[];
  priceRange: [number, number];
  inStock: boolean;
  sortBy: 'newest' | 'price-low' | 'price-high' | 'name';
}

