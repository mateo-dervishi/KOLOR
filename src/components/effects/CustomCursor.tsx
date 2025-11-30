'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useUIStore } from '@/store/ui';

interface ColorDrop {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [drops, setDrops] = useState<ColorDrop[]>([]);
  const dropIdRef = useRef(0);
  const lastDropTime = useRef(0);
  
  const { hasEntered } = useUIStore();
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // Vibrant color palette - always colorful
  const colors = [
    '#FF4D00', // Orange
    '#E63946', // Red
    '#8B5CF6', // Purple
    '#0066FF', // Blue
    '#00FF66', // Green
    '#FFE600', // Yellow
    '#FF6B35', // Light orange
    '#722F37', // Burgundy
  ];

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const now = Date.now();
      
      // Create drops frequently
      const dropInterval = 35;
      
      if (now - lastDropTime.current > dropInterval) {
        const newDrop: ColorDrop = {
          id: dropIdRef.current++,
          x: e.clientX + (Math.random() - 0.5) * 30,
          y: e.clientY + (Math.random() - 0.5) * 30,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 14 + 6,
        };
        
        setDrops((prev) => [...prev.slice(-25), newDrop]);
        lastDropTime.current = now;
        
        setTimeout(() => {
          setDrops((prev) => prev.filter((d) => d.id !== newDrop.id));
        }, 1200);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = Boolean(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        window.getComputedStyle(target).cursor === 'pointer'
      );
      
      setIsPointer(isClickable);
    };

    const handleMouseLeave = () => {
      cursorX.set(-100);
      cursorY.set(-100);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, cursorX, cursorY, colors, hasEntered]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            scale: isPointer ? 2 : 1,
            opacity: isPointer ? 0.6 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="relative -translate-x-1/2 -translate-y-1/2"
        >
          <div className="w-3 h-3 rounded-full bg-black transition-colors duration-300" />
        </motion.div>
      </motion.div>

      {/* Color drops */}
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          initial={{ 
            opacity: 0.8, 
            scale: 0,
            x: drop.x,
            y: drop.y,
          }}
          animate={{ 
            opacity: 0, 
            scale: 1,
            y: drop.y + 50 + Math.random() * 30,
          }}
          transition={{ 
            duration: 1.2, 
            ease: [0.16, 1, 0.3, 1],
          }}
          className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
          style={{
            width: drop.size,
            height: drop.size,
            backgroundColor: drop.color,
            borderRadius: '50%',
            boxShadow: `0 0 ${drop.size * 1.5}px ${drop.color}80`,
          }}
        />
      ))}
    </>
  );
}
