'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/ui';

const taglines = [
  'life is full of kolor',
  "what's life without kolor",
  'no kolor just reality',
];

// The tracksuit product
const product = {
  id: 'kolor-tracksuit',
  name: 'KOLOR TRACKSUIT',
  price: 280,
  description: 'Full tracksuit set. Premium heavyweight cotton. Zip-up hoodie with matching pants. Oversized fit. KC monogram embroidery.',
  colors: [
    { 
      name: 'VOID BLACK', 
      hex: '#0A0A0A', 
      hoodie: '/black-hoodie.png',
      pants: '/black-pants.png',
    },
    { 
      name: 'BURGUNDY', 
      hex: '#722F37', 
      hoodie: '/burgundy-hoodie.png',
      pants: '/burgundy-pants.png',
    },
  ],
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
};

// Cart item type
interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  color: string;
  colorHex: string;
  image: string;
  quantity: number;
}

export default function Home() {
  const [phase, setPhase] = useState<'landing' | 'transition' | 'product'>('landing');
  const [currentTagline, setCurrentTagline] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<'hoodie' | 'pants'>('hoodie');
  const [time, setTime] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  
  const { hasEntered, setHasEntered } = useUIStore();
  
  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (hasEntered) {
      setPhase('product');
    }
  }, [hasEntered]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    if (phase !== 'landing') return;
    setPhase('transition');
    
    setTimeout(() => {
      setPhase('product');
      setHasEntered(true);
    }, 2500);
  };

  const handleAddToBag = async () => {
    if (!selectedSize) return;
    
    setIsAdding(true);
    await new Promise(r => setTimeout(r, 600));
    
    const selectedColorData = product.colors[selectedColor];
    const itemId = `${product.id}-${selectedSize}-${selectedColorData.name}`;
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === itemId);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevCart, {
        id: itemId,
        name: product.name,
        price: product.price,
        size: selectedSize,
        color: selectedColorData.name,
        colorHex: selectedColorData.hex,
        image: selectedColorData.hoodie,
        quantity: 1,
      }];
    });
    
    setIsAdding(false);
    setAddedFeedback(true);
    
    setTimeout(() => {
      setAddedFeedback(false);
      setCartOpen(true);
    }, 800);
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prevCart => {
      return prevCart
        .map(item => {
          if (item.id === itemId) {
            const newQuantity = item.quantity + delta;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
          }
          return item;
        })
        .filter(item => item.quantity > 0);
    });
  };

  const removeItem = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const getCurrentImage = () => {
    const colorData = product.colors[selectedColor];
    return currentImage === 'hoodie' ? colorData.hoodie : colorData.pants;
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      
      {/* ========== PHASE 1: LANDING ========== */}
      <AnimatePresence>
        {phase === 'landing' && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={handleEnter}
            className="fixed inset-0 z-[200] bg-white cursor-pointer"
            style={{ filter: 'grayscale(100%)' }}
          >
            <div className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />

            <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-10 pb-16 md:pb-20">
              <div className="flex justify-between items-start">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="font-mono text-[9px] md:text-[10px] tracking-widest text-grey-mid"
                >
                  {time}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="font-mono text-[9px] md:text-[10px] tracking-widest text-grey-mid text-right"
                >
                  ss25
                </motion.div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center">
                <motion.h1
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-[22vw] md:text-[15vw] leading-[0.8] tracking-tight text-black"
                >
                  kolor
                </motion.h1>

                <div className="h-8 mt-4 md:mt-6 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentTagline}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="font-mono text-[10px] md:text-[12px] tracking-[0.2em] md:tracking-[0.3em] text-grey-light text-center px-4"
                    >
                      {taglines[currentTagline]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="flex justify-center"
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-black mb-3 md:mb-4"
                  />
                  <p className="font-mono text-[10px] md:text-[12px] tracking-[0.2em] md:tracking-[0.3em] text-grey-mid">
                    click to add kolor
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== PHASE 2: TRANSITION ========== */}
      <AnimatePresence>
        {phase === 'transition' && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 2 }}
            className="fixed inset-0 z-[150] flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #e8f0e3 0%, #e5e0f0 100%)' }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 right-0 h-2 bg-[#90B77D] origin-left"
            />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="absolute bottom-0 left-0 right-0 h-2 bg-[#6B5EA1] origin-right"
            />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="absolute top-0 bottom-0 left-0 w-2 bg-[#90B77D] origin-top"
            />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="absolute top-0 bottom-0 right-0 w-2 bg-[#6B5EA1] origin-bottom"
            />

            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="font-display text-5xl md:text-6xl"
              >
                <motion.span
                  initial={{ color: '#666666' }}
                  animate={{ color: '#6B5EA1' }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  kolor
                </motion.span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="font-mono text-[11px] md:text-[12px] tracking-[0.3em] text-grey-light mt-6"
              >
                life is full of kolor
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0.3] }}
              transition={{ delay: 0.8, duration: 1.8 }}
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, #90B77D 0%, #6B5EA1 100%)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== PHASE 3: PRODUCT ========== */}
      <AnimatePresence>
        {phase === 'product' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen"
          >
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 py-4 md:py-6 px-4 md:px-8">
              <div className="flex items-start justify-between">
                {/* Spacer for mobile balance */}
                <div className="w-16 md:w-24" />
                
                {/* Logo & Nav - Center */}
                <div className="flex flex-col items-center">
                  <img 
                    src="/logo.png" 
                    alt="KOLOR" 
                    className="h-8 md:h-14 w-auto mb-2"
                  />
                  <nav className="flex justify-center gap-4 md:gap-10">
                    <a 
                      href="#about" 
                      className="font-mono text-[11px] md:text-[14px] tracking-[0.15em] text-black hover:opacity-60 transition-opacity"
                    >
                      about
                    </a>
                    <a 
                      href="#contact" 
                      className="font-mono text-[11px] md:text-[14px] tracking-[0.15em] text-black hover:opacity-60 transition-opacity"
                    >
                      contact
                    </a>
                  </nav>
                </div>
                
                {/* Bag - Right */}
                <div className="w-16 md:w-24 flex justify-end">
                  <button 
                    onClick={() => setCartOpen(true)}
                    className="font-mono text-[11px] md:text-[14px] tracking-[0.15em] text-black hover:opacity-60 transition-opacity"
                  >
                    bag{cartCount > 0 && ` (${cartCount})`}
                  </button>
                </div>
              </div>
            </header>

            {/* Main Product Layout */}
            <div className="min-h-screen flex flex-col lg:flex-row pt-20 md:pt-24 lg:pt-0">
              {/* Left - Product Images */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative w-full lg:w-1/2 h-[50vh] md:h-[60vh] lg:h-screen bg-white flex items-center justify-center"
              >
                {/* Image Container - Centered with fixed dimensions */}
                <div className="relative w-full h-full flex items-center justify-center px-4 md:px-8 lg:px-16 py-8 md:py-16 lg:py-32">
                  <div className="relative w-full h-full max-w-[280px] md:max-w-[350px] lg:max-w-[400px] max-h-[350px] md:max-h-[450px] lg:max-h-[500px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`${selectedColor}-${currentImage}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        src={getCurrentImage()}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </AnimatePresence>
                  </div>
                </div>

                {/* Image Toggle - Bottom Center */}
                <div className="absolute bottom-4 md:bottom-8 lg:bottom-12 left-0 right-0 flex flex-col items-center gap-2 md:gap-4">
                  <div className="flex gap-4 md:gap-6">
                    <button
                      onClick={() => setCurrentImage('hoodie')}
                      className={`font-mono text-[10px] md:text-[11px] tracking-widest transition-all duration-300 pb-1 ${
                        currentImage === 'hoodie' 
                          ? 'text-black border-b border-black' 
                          : 'text-grey-mid hover:text-black'
                      }`}
                    >
                      hoodie
                    </button>
                    <button
                      onClick={() => setCurrentImage('pants')}
                      className={`font-mono text-[10px] md:text-[11px] tracking-widest transition-all duration-300 pb-1 ${
                        currentImage === 'pants' 
                          ? 'text-black border-b border-black' 
                          : 'text-grey-mid hover:text-black'
                      }`}
                    >
                      pants
                    </button>
                  </div>
                  <p className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-grey-mid">
                    {product.colors[selectedColor].name}
                  </p>
                </div>

              </motion.div>

              {/* Right - Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="w-full lg:w-1/2 flex items-start lg:items-center justify-center p-6 md:p-10 lg:p-16 xl:p-20 bg-white overflow-y-auto"
              >
                <div className="w-full max-w-sm">
                  {/* Collection Tag */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="font-mono text-xs tracking-[0.2em] text-grey-mid mb-4"
                  >
                    ss25 — full set
                  </motion.p>
                  
                  {/* Product Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="font-mono text-2xl md:text-3xl lg:text-4xl font-normal mb-4 tracking-tight"
                  >
                    kolor tracksuit
                  </motion.h1>

                  {/* Price */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="font-mono text-lg md:text-xl text-black mb-6 md:mb-8"
                  >
                    ${product.price}
                  </motion.p>

                  {/* Color Selection */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mb-8"
                  >
                    <p className="font-mono text-xs tracking-[0.15em] text-grey-mid mb-3 uppercase">
                      color — {product.colors[selectedColor].name.toLowerCase()}
                    </p>
                    <div className="flex gap-3">
                      {product.colors.map((color, i) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(i)}
                          className={`group relative w-9 h-9 rounded-full border-2 transition-all duration-300 ${
                            selectedColor === i 
                              ? 'border-black' 
                              : 'border-grey-pale hover:border-grey-mid'
                          }`}
                          style={{ backgroundColor: color.hex }}
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* Size Selection */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="mb-8"
                  >
                    <p className="font-mono text-xs tracking-[0.15em] text-grey-mid mb-3 uppercase">
                      size
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-11 h-11 font-mono text-sm border transition-all duration-300 ${
                            selectedSize === size
                              ? 'border-black bg-black text-white'
                              : 'border-grey-pale text-black hover:border-black'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Add to Bag Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    onClick={handleAddToBag}
                    disabled={!selectedSize || isAdding}
                    className={`relative w-full py-4 font-mono text-sm tracking-[0.1em] transition-all duration-300 overflow-hidden ${
                      selectedSize
                        ? 'bg-black text-white hover:bg-[#6B5EA1]'
                        : 'bg-grey-pale text-grey-mid cursor-not-allowed'
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {isAdding ? (
                        <motion.span
                          key="adding"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          adding...
                        </motion.span>
                      ) : addedFeedback ? (
                        <motion.span
                          key="added"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          added to bag
                        </motion.span>
                      ) : (
                        <motion.span
                          key="add"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                        >
                          {selectedSize ? 'add to bag — $' + product.price : 'select size'}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  {/* Shipping Info */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                    className="font-mono text-xs text-grey-mid text-center mt-3 mb-6"
                  >
                    free worldwide shipping • 30 day returns
                  </motion.p>

                  {/* Accordion Sections */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    className="border-t border-grey-pale"
                  >
                    {/* Description Accordion */}
                    <div className="border-b border-grey-pale">
                      <button
                        onClick={() => toggleAccordion('description')}
                        className="w-full py-5 flex items-center justify-between font-mono text-sm tracking-[0.1em] text-black hover:text-grey-mid transition-colors"
                      >
                        <span>description</span>
                        <motion.span
                          animate={{ rotate: openAccordion === 'description' ? 45 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-lg"
                        >
                          +
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {openAccordion === 'description' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="font-mono text-sm text-grey-mid leading-relaxed pb-5">
                              {product.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* What's Included Accordion */}
                    <div className="border-b border-grey-pale">
                      <button
                        onClick={() => toggleAccordion('includes')}
                        className="w-full py-5 flex items-center justify-between font-mono text-sm tracking-[0.1em] text-black hover:text-grey-mid transition-colors"
                      >
                        <span>what's included</span>
                        <motion.span
                          animate={{ rotate: openAccordion === 'includes' ? 45 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-lg"
                        >
                          +
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {openAccordion === 'includes' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <ul className="font-mono text-sm text-grey-mid space-y-2 pb-5">
                              <li>— zip-up hoodie with kc monogram</li>
                              <li>— matching sweatpants</li>
                              <li>— branded dust bag</li>
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Specifications Accordion */}
                    <div className="border-b border-grey-pale">
                      <button
                        onClick={() => toggleAccordion('specs')}
                        className="w-full py-5 flex items-center justify-between font-mono text-sm tracking-[0.1em] text-black hover:text-grey-mid transition-colors"
                      >
                        <span>specifications</span>
                        <motion.span
                          animate={{ rotate: openAccordion === 'specs' ? 45 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-lg"
                        >
                          +
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {openAccordion === 'specs' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <ul className="font-mono text-sm text-grey-mid space-y-2 pb-5">
                              <li>— 100% premium heavyweight cotton</li>
                              <li>— 400gsm french terry</li>
                              <li>— oversized fit</li>
                              <li>— ribbed cuffs and hem</li>
                              <li>— embroidered kc monogram</li>
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Shipping Accordion */}
                    <div className="border-b border-grey-pale">
                      <button
                        onClick={() => toggleAccordion('shipping')}
                        className="w-full py-5 flex items-center justify-between font-mono text-sm tracking-[0.1em] text-black hover:text-grey-mid transition-colors"
                      >
                        <span>shipping & returns</span>
                        <motion.span
                          animate={{ rotate: openAccordion === 'shipping' ? 45 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-lg"
                        >
                          +
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {openAccordion === 'shipping' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <ul className="font-mono text-sm text-grey-mid space-y-2 pb-5">
                              <li>— free worldwide shipping</li>
                              <li>— 5-7 business days delivery</li>
                              <li>— 30 day return policy</li>
                              <li>— full refund on unworn items</li>
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== CART DRAWER ========== */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-[300] bg-white/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[301] w-full md:max-w-md bg-white border-l border-grey-pale flex flex-col"
            >
              <div className="flex items-center justify-between p-5 md:p-8 border-b border-grey-pale">
                <div>
                  <h2 className="font-mono text-lg md:text-xl tracking-wide">bag</h2>
                  <p className="font-mono text-[10px] md:text-xs tracking-widest text-grey-mid mt-1 md:mt-2">
                    {cartCount} {cartCount === 1 ? 'item' : 'items'}
                  </p>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="font-mono text-xs md:text-sm tracking-widest text-grey-mid hover:text-black transition-colors"
                >
                  close
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 md:p-8">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 border border-grey-pale rounded-full flex items-center justify-center mb-8">
                      <svg className="w-6 h-6 text-grey-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <p className="font-mono text-sm tracking-widest text-grey-mid mb-4">
                      your bag is empty
                    </p>
                    <p className="font-mono text-xs text-grey-mid mb-8">
                      add some kolor to your life
                    </p>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="font-mono text-sm tracking-widest text-black underline hover:text-[#6B5EA1] transition-colors"
                    >
                      continue shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="flex gap-4"
                      >
                        <div className="w-24 h-28 bg-white border border-grey-pale overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <h3 className="font-mono text-sm tracking-wider text-black">
                              {item.name}
                            </h3>
                            <p className="font-mono text-xs text-grey-mid mt-1">
                              {item.size} / {item.color}
                            </p>
                            <p className="font-mono text-sm text-black mt-1">
                              ${item.price}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-grey-pale">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 flex items-center justify-center text-grey-mid hover:text-black transition-colors"
                              >
                                −
                              </button>
                              <span className="w-8 text-center font-mono text-sm">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 flex items-center justify-center text-grey-mid hover:text-black transition-colors"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="font-mono text-xs tracking-widest text-grey-mid hover:text-[#6B5EA1] transition-colors"
                            >
                              remove
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-5 md:p-8 border-t border-grey-pale">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-sm tracking-widest text-grey-mid">
                      subtotal
                    </span>
                    <span className="font-mono text-xl">
                      ${cartTotal}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-grey-mid mb-8">
                    shipping calculated at checkout
                  </p>
                  
                  <button className="w-full py-4 bg-black text-white font-mono text-sm tracking-widest hover:bg-[#6B5EA1] hover:text-white transition-colors mb-4">
                    checkout
                  </button>
                  
                  <button
                    onClick={() => setCartOpen(false)}
                    className="w-full py-4 border border-grey-pale text-black font-mono text-sm tracking-widest hover:border-black transition-colors"
                  >
                    continue shopping
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
