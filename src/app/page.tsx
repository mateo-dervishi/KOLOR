'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/ui';

const taglines = [
  'i thought life was full of kolor',
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
  
  const { hasEntered, setHasEntered } = useUIStore();

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

            <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
              <div className="flex justify-between items-start">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="font-mono text-[10px] tracking-widest text-grey-mid"
                >
                  {time}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="font-mono text-[10px] tracking-widest text-grey-mid text-right"
                >
                  ss25
                </motion.div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center">
                <motion.h1
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-[19vw] md:text-[15vw] leading-[0.8] tracking-tight text-black"
                >
                  kolor
                </motion.h1>

                <div className="h-8 mt-6 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentTagline}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="font-mono text-[10px] md:text-[11px] tracking-[0.3em] text-grey-light"
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
                    className="w-2 h-2 rounded-full bg-black mb-4"
                  />
                  <p className="font-mono text-[9px] tracking-[0.3em] text-grey-mid">
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
            className="fixed inset-0 z-[150] bg-white flex items-center justify-center"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 right-0 h-1 bg-[#00FF66] origin-left"
            />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-[#0066FF] origin-right"
            />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="absolute top-0 bottom-0 left-0 w-1 bg-[#00FF66] origin-top"
            />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="absolute top-0 bottom-0 right-0 w-1 bg-[#0066FF] origin-bottom"
            />

            <div className="text-center">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="font-mono text-[10px] tracking-[0.5em] text-grey-mid mb-6"
              >
                adding kolor to reality
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="font-display text-5xl md:text-6xl"
              >
                <motion.span
                  initial={{ color: '#666666' }}
                  animate={{ color: '#0066FF' }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  kolor
                </motion.span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="font-serif italic text-lg text-black mt-6"
              >
                i thought life was full of kolor
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.15, 0] }}
              transition={{ delay: 1, duration: 1.5 }}
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, #00FF66 0%, #0066FF 100%)' }}
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
            <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 md:py-6 flex justify-between items-center">
              {/* Logo - Left */}
              <div className="flex-1">
                <img 
                  src="/logo.png" 
                  alt="KOLOR" 
                  className="h-8 md:h-10 w-auto"
                />
              </div>
              
              {/* Nav Links - Center */}
              <nav className="flex-1 flex justify-center gap-8 md:gap-12">
                <a 
                  href="#about" 
                  className="font-mono text-sm tracking-widest text-black hover:opacity-70 transition-opacity"
                >
                  about
                </a>
                <a 
                  href="#contact" 
                  className="font-mono text-sm tracking-widest text-black hover:opacity-70 transition-opacity"
                >
                  contact
                </a>
              </nav>
              
              {/* Bag - Right */}
              <div className="flex-1 flex justify-end">
                <button 
                  onClick={() => setCartOpen(true)}
                  className="font-mono text-sm tracking-widest text-black hover:opacity-70 transition-opacity"
                >
                  bag ({cartCount})
                </button>
              </div>
            </header>

            {/* Main Product Layout */}
            <div className="min-h-screen flex flex-col lg:flex-row">
              {/* Left - Product Images */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative w-full lg:w-1/2 h-[60vh] lg:h-screen bg-white flex items-center justify-center"
              >
                {/* Image Container - Centered with fixed dimensions */}
                <div className="relative w-full h-full flex items-center justify-center px-8 lg:px-16 py-24 lg:py-32">
                  <div className="relative w-full h-full max-w-[400px] max-h-[500px] flex items-center justify-center">
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
                <div className="absolute bottom-8 lg:bottom-12 left-0 right-0 flex flex-col items-center gap-4">
                  <div className="flex gap-6">
                    <button
                      onClick={() => setCurrentImage('hoodie')}
                      className={`font-mono text-[10px] tracking-widest transition-all duration-300 pb-1 ${
                        currentImage === 'hoodie' 
                          ? 'text-black border-b border-black' 
                          : 'text-grey-mid hover:text-black'
                      }`}
                    >
                      hoodie
                    </button>
                    <button
                      onClick={() => setCurrentImage('pants')}
                      className={`font-mono text-[10px] tracking-widest transition-all duration-300 pb-1 ${
                        currentImage === 'pants' 
                          ? 'text-black border-b border-black' 
                          : 'text-grey-mid hover:text-black'
                      }`}
                    >
                      pants
                    </button>
                  </div>
                  <p className="font-mono text-[9px] tracking-[0.2em] text-grey-mid">
                    {product.colors[selectedColor].name}
                  </p>
                </div>

                {/* Subtle border on right */}
                <div className="hidden lg:block absolute top-0 bottom-0 right-0 w-px bg-grey-pale" />
              </motion.div>

              {/* Right - Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-16 xl:p-20 bg-white"
              >
                <div className="w-full max-w-sm">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="font-mono text-[10px] tracking-widest text-grey-mid mb-4"
                  >
                    ss25 — full set
                  </motion.p>
                  
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="font-display text-4xl md:text-5xl lg:text-5xl mb-4"
                  >
                    kolor tracksuit
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="font-mono text-2xl mb-8"
                  >
                    ${product.price}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="font-mono text-[12px] text-grey-light leading-relaxed mb-12"
                  >
                    {product.description}
                  </motion.p>

                  {/* Color Selection */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="mb-8"
                  >
                    <p className="font-mono text-[10px] tracking-widest text-grey-mid mb-4">
                      color
                    </p>
                    <div className="flex gap-3">
                      {product.colors.map((color, i) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(i)}
                          className={`group relative w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                            selectedColor === i 
                              ? 'border-black scale-110' 
                              : 'border-grey-pale hover:border-grey-mid'
                          }`}
                          style={{ backgroundColor: color.hex }}
                        >
                          {selectedColor === i && (
                            <motion.div
                              layoutId="color-ring"
                              className="absolute inset-[-4px] rounded-full border border-black"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Size Selection */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mb-12"
                  >
                    <p className="font-mono text-[10px] tracking-widest text-grey-mid mb-4">
                      size
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-14 h-14 font-mono text-[12px] border transition-all duration-300 ${
                            selectedSize === size
                              ? 'border-black bg-black text-white'
                              : 'border-grey-pale text-black hover:border-grey-mid'
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
                    transition={{ delay: 1.3 }}
                    onClick={handleAddToBag}
                    disabled={!selectedSize || isAdding}
                    className={`relative w-full py-5 font-mono text-[11px] tracking-widest transition-all duration-300 overflow-hidden ${
                      selectedSize
                        ? 'bg-black text-white hover:bg-[#0066FF] hover:text-white'
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

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    className="font-mono text-[10px] text-grey-mid text-center mt-6"
                  >
                    free worldwide shipping • 30 day returns
                  </motion.p>

                  {/* What's Included */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-8 pt-6 border-t border-grey-pale"
                  >
                    <p className="font-mono text-[10px] tracking-widest text-grey-mid mb-3">
                      includes
                    </p>
                    <ul className="font-mono text-[11px] text-grey-light space-y-1">
                      <li>• zip-up hoodie with kc monogram</li>
                      <li>• matching sweatpants</li>
                      <li>• dust bag</li>
                    </ul>
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
              className="fixed top-0 right-0 bottom-0 z-[301] w-full max-w-md bg-white border-l border-grey-pale flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-grey-pale">
                <div>
                  <h2 className="font-display text-2xl">bag</h2>
                  <p className="font-mono text-[10px] tracking-widest text-grey-mid mt-1">
                    {cartCount} {cartCount === 1 ? 'item' : 'items'}
                  </p>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="font-mono text-[10px] tracking-widest text-grey-mid hover:text-black transition-colors"
                >
                  close
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 border border-grey-pale rounded-full flex items-center justify-center mb-6">
                      <svg className="w-6 h-6 text-grey-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <p className="font-mono text-[11px] tracking-widest text-grey-mid mb-2">
                      your bag is empty
                    </p>
                    <p className="font-mono text-[10px] text-grey-mid mb-6">
                      add some kolor to your life
                    </p>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="font-mono text-[10px] tracking-widest text-black underline hover:text-[#0066FF] transition-colors"
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
                        <div className="w-24 h-28 bg-grey-pale border border-grey-pale overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <h3 className="font-mono text-[11px] tracking-wider text-black">
                              {item.name}
                            </h3>
                            <p className="font-mono text-[10px] text-grey-mid mt-1">
                              {item.size} / {item.color}
                            </p>
                            <p className="font-mono text-[11px] text-black mt-1">
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
                              <span className="w-8 text-center font-mono text-[11px]">
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
                              className="font-mono text-[9px] tracking-widest text-grey-mid hover:text-[#0066FF] transition-colors"
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
                <div className="p-6 border-t border-grey-pale">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] tracking-widest text-grey-mid">
                      subtotal
                    </span>
                    <span className="font-display text-2xl">
                      ${cartTotal}
                    </span>
                  </div>
                  <p className="font-mono text-[9px] text-grey-mid mb-6">
                    shipping calculated at checkout
                  </p>
                  
                  <button className="w-full py-4 bg-black text-white font-mono text-[11px] tracking-widest hover:bg-[#0066FF] hover:text-white transition-colors mb-3">
                    checkout
                  </button>
                  
                  <button
                    onClick={() => setCartOpen(false)}
                    className="w-full py-4 border border-grey-pale text-black font-mono text-[10px] tracking-widest hover:border-black transition-colors"
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
