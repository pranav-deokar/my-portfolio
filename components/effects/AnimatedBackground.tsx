'use client';

import { useEffect, useRef } from 'react';
import styles from './AnimatedBackground.module.css';

type Spark = {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  drift: number;
};

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let animationFrameId = 0;
    let phase = 0;
    let sparks: Spark[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createSparks = () => {
      const sparkCount = Math.min(42, Math.floor((canvas.width * canvas.height) / 42000));
      sparks = Array.from({ length: sparkCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.4 + 0.8,
        opacity: Math.random() * 0.35 + 0.08,
        drift: Math.random() * 0.6 + 0.2,
      }));
    };

    const drawSparkField = () => {
      sparks.forEach((spark, index) => {
        const offsetY = Math.sin(phase * 0.6 + index) * spark.drift * 8;
        context.beginPath();
        context.arc(spark.x, spark.y + offsetY, spark.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(146, 196, 255, ${spark.opacity})`;
        context.fill();
      });
    };

    const drawWaveRibbon = ({
      baseY,
      amplitude,
      wavelength,
      lineCount,
      spacing,
      thickness,
      opacity,
      phaseShift,
      startX,
      endX,
    }: {
      baseY: number;
      amplitude: number;
      wavelength: number;
      lineCount: number;
      spacing: number;
      thickness: number;
      opacity: number;
      phaseShift: number;
      startX: number;
      endX: number;
    }) => {
      for (let lineIndex = 0; lineIndex < lineCount; lineIndex += 1) {
        context.beginPath();
        context.lineWidth = thickness;

        const alpha = opacity * (1 - lineIndex / (lineCount * 1.08));
        context.strokeStyle = `rgba(104, 160, 255, ${alpha})`;

        for (let x = startX; x <= endX; x += 10) {
          const normalized = (x - startX) / Math.max(endX - startX, 1);
          const envelope = Math.sin(Math.PI * normalized);
          const y =
            baseY +
            Math.sin(x / wavelength + phase + phaseShift + lineIndex * 0.08) *
              amplitude *
              envelope +
            Math.cos(x / (wavelength * 0.55) - phase * 0.7) * (spacing * lineIndex * 0.32) +
            lineIndex * spacing;

          if (x === startX) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        }

        context.stroke();
      }
    };

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      drawWaveRibbon({
        baseY: canvas.height * 0.2,
        amplitude: canvas.height * 0.16,
        wavelength: canvas.width * 0.12,
        lineCount: 18,
        spacing: 5.4,
        thickness: 0.75,
        opacity: 0.2,
        phaseShift: 0,
        startX: -canvas.width * 0.08,
        endX: canvas.width * 0.42,
      });

      drawWaveRibbon({
        baseY: canvas.height * 0.56,
        amplitude: canvas.height * 0.08,
        wavelength: canvas.width * 0.1,
        lineCount: 26,
        spacing: 3.9,
        thickness: 0.85,
        opacity: 0.22,
        phaseShift: 0.8,
        startX: canvas.width * 0.22,
        endX: canvas.width * 1.04,
      });

      drawWaveRibbon({
        baseY: canvas.height * 0.6,
        amplitude: canvas.height * 0.05,
        wavelength: canvas.width * 0.072,
        lineCount: 14,
        spacing: 3.2,
        thickness: 0.65,
        opacity: 0.14,
        phaseShift: 1.7,
        startX: canvas.width * 0.05,
        endX: canvas.width * 0.95,
      });

      drawSparkField();

      phase += 0.012;
      animationFrameId = window.requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resize();
      createSparks();
    };

    resize();
    createSparks();
    animate();
    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.backgroundContainer}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.gradient1} />
      <div className={styles.gradient2} />
      <div className={styles.gradient3} />
      <div className={styles.noise} />
      <div className={styles.vignette} />
    </div>
  );
}
