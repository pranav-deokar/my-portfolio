'use client';

import { useEffect, useState } from 'react';
import styles from './EyeTracker.module.css';

export default function EyeTracker() {
  const [pupilPositions, setPupilPositions] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 }
  ]);
  const [blinking, setBlinking] = useState([false, false]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const eyes = document.querySelectorAll(`.${styles.eye}`);
      
      const newPositions = Array.from(eyes).map((eye) => {
        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        
        const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
        const distance = Math.min(8, Math.hypot(e.clientX - eyeX, e.clientY - eyeY) / 30);
        
        return {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance
        };
      });
      
      setPupilPositions(newPositions);
    };

    window.addEventListener('mousemove', handleMouseMove);

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
            className={`${styles.pupil} ${blinking[index] ? styles.blinking : ''}`}
            style={{
              transform: `translate(${pupilPositions[index]?.x || 0}px, ${pupilPositions[index]?.y || 0}px)`
            }}
          >
            <div className={styles.pupilGlow} />
          </div>
        </div>
      ))}
    </div>
  );
}
