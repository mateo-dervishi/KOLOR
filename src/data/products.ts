import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'KOLOR Essential Hoodie',
    slug: 'kolor-essential-hoodie',
    price: 120,
    description: 'Premium heavyweight hoodie crafted from 100% organic cotton. Features the iconic KC monogram with hand-drawn vine illustrations embroidered on the chest. Oversized fit for ultimate comfort.',
    category: 'hoodies',
    images: [
      {
        id: '1-1',
        url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
        alt: 'KOLOR Essential Hoodie Front',
        isMain: true,
      },
      {
        id: '1-2',
        url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
        alt: 'KOLOR Essential Hoodie Back',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#000000', available: true },
      { name: 'Charcoal', hex: '#1A1A1A', available: true },
      { name: 'Burgundy', hex: '#722F37', available: true },
    ],
    inStock: true,
    featured: true,
    new: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Reality Check Tee',
    slug: 'reality-check-tee',
    price: 65,
    description: '"No kolor just reality" printed in distressed typography. Made from premium 220gsm cotton with a relaxed fit. The perfect statement piece for those who question the mundane.',
    category: 't-shirts',
    images: [
      {
        id: '2-1',
        url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
        alt: 'Reality Check Tee Front',
        isMain: true,
      },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Off White', hex: '#FAFAFA', available: true },
      { name: 'Black', hex: '#000000', available: true },
    ],
    inStock: true,
    featured: true,
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    name: 'Vine Monogram Crewneck',
    slug: 'vine-monogram-crewneck',
    price: 95,
    description: 'Luxurious crewneck sweatshirt featuring the KC monogram with organic vine illustrations. Crafted from heavyweight french terry with ribbed cuffs and hem.',
    category: 'hoodies',
    images: [
      {
        id: '3-1',
        url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
        alt: 'Vine Monogram Crewneck',
        isMain: true,
      },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Military Olive', hex: '#4A5D23', available: true },
      { name: 'Dusty Rose', hex: '#C4A4A4', available: true },
      { name: 'Black', hex: '#000000', available: false },
    ],
    inStock: true,
    new: true,
    createdAt: '2024-01-20',
  },
  {
    id: '4',
    name: 'Kolor Cargo Pants',
    slug: 'kolor-cargo-pants',
    price: 145,
    description: 'Technical cargo pants with adjustable straps and multiple utility pockets. Features contrast stitching and the KOLOR wordmark embroidered on the back pocket.',
    category: 'pants',
    images: [
      {
        id: '4-1',
        url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
        alt: 'Kolor Cargo Pants',
        isMain: true,
      },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000', available: true },
      { name: 'Charcoal', hex: '#1A1A1A', available: true },
    ],
    inStock: true,
    featured: true,
    createdAt: '2024-01-05',
  },
  {
    id: '5',
    name: 'Awakening Jacket',
    slug: 'awakening-jacket',
    price: 220,
    description: 'Oversized coach jacket with hidden hood. Features the full KOLOR philosophy text printed on the back: "I thought life was full of kolor." Water-resistant nylon shell.',
    category: 'jackets',
    images: [
      {
        id: '5-1',
        url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
        alt: 'Awakening Jacket',
        isMain: true,
      },
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#000000', available: true },
      { name: 'Burnt Orange', hex: '#FF6B35', available: true },
    ],
    inStock: true,
    featured: true,
    new: true,
    createdAt: '2024-01-25',
  },
  {
    id: '6',
    name: 'KLR Logo Cap',
    slug: 'klr-logo-cap',
    price: 45,
    description: 'Unstructured dad cap featuring the KLR shorthand embroidered in a contrasting thread. Adjustable strap with metal buckle for the perfect fit.',
    category: 'accessories',
    images: [
      {
        id: '6-1',
        url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80',
        alt: 'KLR Logo Cap',
        isMain: true,
      },
    ],
    sizes: ['ONE SIZE'],
    colors: [
      { name: 'Black', hex: '#000000', available: true },
      { name: 'Off White', hex: '#FAFAFA', available: true },
      { name: 'Burnt Orange', hex: '#FF6B35', available: true },
    ],
    inStock: true,
    createdAt: '2024-01-08',
  },
  {
    id: '7',
    name: 'Philosophy Long Sleeve',
    slug: 'philosophy-long-sleeve',
    price: 75,
    description: 'Heavyweight long sleeve tee with the complete KOLOR philosophy printed along the sleeves. Features thumbhole cuffs and dropped shoulders.',
    category: 't-shirts',
    images: [
      {
        id: '7-1',
        url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80',
        alt: 'Philosophy Long Sleeve',
        isMain: true,
      },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000', available: true },
      { name: 'Charcoal', hex: '#1A1A1A', available: true },
    ],
    inStock: true,
    createdAt: '2024-01-12',
  },
  {
    id: '8',
    name: 'Essentials Joggers',
    slug: 'essentials-joggers',
    price: 110,
    description: 'Premium heavyweight joggers with elastic waistband and cuffed ankles. Subtle KOLOR branding on the left thigh. Perfect for elevated casual wear.',
    category: 'pants',
    images: [
      {
        id: '8-1',
        url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80',
        alt: 'Essentials Joggers',
        isMain: true,
      },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#000000', available: true },
      { name: 'Charcoal', hex: '#1A1A1A', available: true },
      { name: 'Military Olive', hex: '#4A5D23', available: true },
    ],
    inStock: true,
    createdAt: '2024-01-18',
  },
];

export const featuredProducts = products.filter((p) => p.featured);
export const newProducts = products.filter((p) => p.new);

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter((p) => p.category === category);
};

