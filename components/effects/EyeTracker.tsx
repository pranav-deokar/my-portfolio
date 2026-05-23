'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './EyeTracker.module.css';

export default function EyeTracker() {
  const [blinking, setBlinking] = useState([false, false]);
  const pupilRefs = useRef<(HTMLDivElement | null)[]>([null, null]);
  const eyeElementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    // Get eye and pupil elements
    const eyes = Array.from(document.querySelectorAll(`.${styles.eye}`));
    const pupils = Array.from(document.querySelectorAll(`.${styles.pupil}`));
    eyeElementsRef.current = eyes as HTMLElement[];
    pupilRefs.current = pupils as HTMLDivElement[];

    if (eyes.length === 0 || pupils.length === 0) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Update pupils with direct DOM manipulation
      eyeElementsRef.current.forEach((eye, index) => {
        const pupil = pupilRefs.current[index];
        if (!pupil) return;

        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;

        const dx = e.clientX - eyeX;
        const dy = e.clientY - eyeY;
        const angle = Math.atan2(dy, dx);
        const distance = Math.min(8, Math.sqrt(dx * dx + dy * dy) / 30);

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        // Direct transform for instant update
        pupil.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Random blinking
    const blinkInterval = setInterval(() => {
      const eyeIndex = Math.floor(Math.random() * 2);
      setBlinking(prev => {
        const newBlink = [...prev];
        newBlink[eyeIndex] = true;
        return newBlink;
      });

      setTimeout(() => {
        setBlinking(prev => {
          const newBlink = [...prev];
          newBlink[eyeIndex] = false;
          return newBlink;
        });
      }, 200);
    }, 3000 + Math.random() * 4000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <div className={styles.eyeTracker}>
      {[0, 1].map((index) => (
        <div key={index} className={styles.eye}>
          <div 
            ref={(el) => {
              if (el) pupilRefs.current[index] = el;
            }}
            className={`${styles.pupil} ${blinking[index] ? styles.blinking : ''}`}
          >
            <div className={styles.pupilGlow} />
          </div>
        </div>
      ))}
    </div>
  );
}
