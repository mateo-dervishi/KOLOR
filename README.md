# KOLOR - Streetwear with Purpose

> "I thought life was full of kolor / what's life without kolor / no kolor just reality"

A modern, visually striking e-commerce/lookbook website for KOLOR - a streetwear clothing brand. The site embodies the brand's core philosophy through a unique "Color Awakening" concept where the interface starts monochrome and reveals color through user interaction.

![KOLOR Brand](https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1200&q=80)

## ✨ Features

### Design Concept: "Color Awakening"
- **Monochrome to Color**: The website starts in greyscale, revealing colors as users interact
- **Hover Effects**: Products bloom from black & white to full color on hover
- **Custom Cursor**: Color paint particles follow mouse movement
- **Scroll Animations**: Text and images reveal with smooth parallax effects

### Technical Features
- **Next.js 14+** with App Router and TypeScript
- **Tailwind CSS** with custom design system
- **Framer Motion** for smooth animations and page transitions
- **Zustand** for state management (cart, UI)
- **Responsive Design** with mobile-first approach
- **SEO Optimized** with structured metadata

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/kolor-web.git
cd kolor-web

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The site will be available at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── shop/              # Shop/collection pages
│   ├── product/[slug]/    # Product detail pages
│   ├── lookbook/          # Editorial lookbook
│   ├── about/             # Brand story
│   ├── contact/           # Contact & FAQ
│   ├── cart/              # Shopping cart
│   └── layout.tsx         # Root layout
├── components/
│   ├── layout/            # Header, Footer, Navigation
│   ├── ui/                # Button, Input, Modal, etc.
│   ├── product/           # ProductCard, Gallery, Selectors
│   ├── cart/              # CartDrawer, CartItem
│   ├── effects/           # CustomCursor, ColorReveal, TextReveal
│   └── sections/          # Hero, FeaturedProducts, Marquee
├── store/                 # Zustand stores (cart, UI)
├── data/                  # Static product & navigation data
├── types/                 # TypeScript type definitions
└── lib/                   # Utility functions
```

## 🎨 Design System

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Black | `#000000` | Primary background |
| Off-White | `#FAFAFA` | Primary text |
| Charcoal | `#1A1A1A` | Secondary background |
| Burnt Orange | `#FF6B35` | Primary accent |
| Burgundy | `#722F37` | Secondary accent |
| Dusty Rose | `#C4A4A4` | Tertiary accent |
| Military Olive | `#4A5D23` | Success states |

### Typography
- **Display**: Bebas Neue (headings)
- **Sans**: Instrument Sans (body text)
- **Serif**: Playfair Display (accent/quotes)

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, featured products, brand story |
| `/shop` | Product collection with filters |
| `/shop/[category]` | Category-filtered products |
| `/product/[slug]` | Product detail with gallery, sizing, add to cart |
| `/lookbook` | Editorial photography and collection stories |
| `/about` | Brand philosophy and founder story |
| `/contact` | Contact form and FAQ |
| `/cart` | Full shopping cart page |

## 🛠️ Key Components

### Effects
- **CustomCursor**: Custom cursor with color particle trail
- **ColorReveal**: Grayscale-to-color reveal animation
- **TextReveal**: Scroll-triggered text animations
- **ParallaxImage**: Scroll-driven parallax effect

### Product
- **ProductCard**: Hover-activated color reveal
- **ProductGallery**: Swipeable image gallery with zoom
- **SizeSelector/ColorSelector**: Visual variant selection
- **AddToCartButton**: Animated add-to-cart with toast

### Layout
- **Header**: Sticky navigation with cart drawer
- **Footer**: Links, newsletter, social
- **PageTransition**: Smooth route transitions

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for any API keys or configuration:

```env
# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id

# Optional: E-commerce backend
SHOPIFY_STOREFRONT_TOKEN=your-token
STRIPE_PUBLIC_KEY=your-key
```

### Customization
- **Colors**: Edit CSS variables in `src/app/globals.css`
- **Products**: Modify `src/data/products.ts`
- **Navigation**: Update `src/data/navigation.ts`

## 📱 Responsive Breakpoints

| Breakpoint | Size |
|------------|------|
| Mobile | 320px+ |
| Tablet | 768px+ |
| Desktop | 1024px+ |
| Large | 1440px+ |
| XL | 1920px+ |

## 🚀 Deployment

The site is optimized for deployment on Vercel:

```bash
# Deploy to Vercel
npm i -g vercel
vercel
```

## 📝 License

MIT License - feel free to use this for your own projects.

---

**Built with 🖤 by KOLOR**

*"In a grey world, be the kolor that makes people stop and look twice."*
