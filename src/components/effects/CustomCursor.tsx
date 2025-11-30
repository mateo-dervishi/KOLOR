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
  
  // Clothing colors - sage green and purple
  const colors = [
    '#90B77D', // Sage green (Pantone 13-1530)
    '#6B5EA1', // Purple (Pantone 18-3946)
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
      {/* Main cursor - Arrow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            scale: isPointer ? 1.2 : 1,
            opacity: isPointer ? 0.7 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="relative"
          style={{ marginLeft: '-2px', marginTop: '-2px' }}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="black"
            className="drop-shadow-sm"
          >
            <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35z" />
          </svg>
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
