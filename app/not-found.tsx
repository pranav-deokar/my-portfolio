'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import styles from './not-found.module.css';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.title}>404</h1>
          <h2 className={styles.subtitle}>Page Not Found</h2>
          <p className={styles.description}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className={styles.actions}>
            <button
              className={styles.primaryButton}
              onClick={() => router.push('/')}
            >
              Go Home
            </button>
            <button
              className={styles.secondaryButton}
              onClick={() => router.back()}
            >
              Go Back
            </button>
          </div>
        </motion.div>
      </div>

      <div className={styles.backgroundGlow} />
    </div>
  );
}
