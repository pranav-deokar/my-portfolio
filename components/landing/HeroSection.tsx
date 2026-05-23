'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';

const roles = [
  'Computer Science Engineering Student',
  'Full-Stack Developer',
  'AI/ML Enthusiast',
  'Research-Oriented Builder',
];

export default function HeroSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.heroContent}>
        <motion.div
          className={styles.textContent}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className={styles.greeting}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className={styles.greetingDot} />
            Hello, I'm
          </motion.div>

          <motion.h1
            className={styles.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            PRANAV BALASAHEB
            <br />
            <span className={styles.nameGradient}>DEOKAR</span>
          </motion.h1>

          <div className={styles.roleContainer}>
            <motion.span className={styles.rolePrefix}>I'm a</motion.span>
            <motion.div
              key={currentRoleIndex}
              className={styles.role}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {roles[currentRoleIndex]}
            </motion.div>
          </div>

          <motion.p
            className={styles.tagline}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Building the future through code, creativity, and innovation.
            <br />
            Passionate about solving complex problems with elegant solutions.
          </motion.p>

          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.button
              className={styles.primaryCta}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
              <div className={styles.ctaGlow} />
            </motion.button>

            <motion.button
              className={styles.secondaryCta}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get in Touch
            </motion.button>
          </motion.div>

          <motion.div
            className={styles.stats}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className={styles.stat}>
              <div className={styles.statValue}>8.93</div>
              <div className={styles.statLabel}>CGPA</div>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <div className={styles.statValue}>10+</div>
              <div className={styles.statLabel}>Projects</div>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <div className={styles.statValue}>5+</div>
              <div className={styles.statLabel}>Technologies</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.imageContent}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className={styles.imageWrapper}>
            <div className={styles.imageGlow} />
            <div className={styles.imageBorder} />
            <div className={styles.imageFrame}>
              {/* Placeholder for professional image */}
             <img
  src="/profile.jpeg"
  alt="Pranav Deokar"
  className={styles.profileImage}
/>
            </div>
            <div className={styles.orbitalRing} />
            <div className={styles.orbitalDot} />
          </div>
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <div className={styles.scrollText}>Scroll to Explore</div>
        <div className={styles.scrollLine} />
      </motion.div>
    </section>
  );
}
