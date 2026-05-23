'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const isPointerRef = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      // Direct DOM manipulation with transform for instant, GPU-accelerated updates
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

      const target = e.target as HTMLElement;
      const newIsPointer =
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON';

      if (newIsPointer !== isPointerRef.current) {
        isPointerRef.current = newIsPointer;
        setIsPointer(newIsPointer);
      }
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Set initial position
    cursor.style.transform = `translate3d(0, 0, 0) translate(-50%, -50%)`;
    dot.style.transform = `translate3d(0, 0, 0) translate(-50%, -50%)`;

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`${styles.cursor} ${isPointer ? styles.pointer : ''} ${isHidden ? styles.hidden : ''}`}
      />
      <div
        ref={dotRef}
        className={`${styles.cursorDot} ${isHidden ? styles.hidden : ''}`}
      />
    </>
  );
}
