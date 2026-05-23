'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/lib/hooks/useInView';
import { useEffect, useState } from 'react';
import styles from './CertificatesSection.module.css';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  issue_date?: string;
  expiry_date?: string;
  credential_id?: string;
  credential_url?: string;
  image_url?: string;
  description?: string;
  categories?: string[];
  skills?: string[];
}

export default function CertificatesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await fetch('/api/certifications');
        const data = await response.json();
        setCertifications(data);
      } catch (error) {
        console.error('Error fetching certifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  useEffect(() => {
    if (activeIndex > certifications.length - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, certifications.length]);

  return (
    <section
      id="certifications"
      className={styles.certifications}
      ref={ref}
    >
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionLabel}>
            Professional Credentials
          </span>

          <h2 className={styles.title}>
            Certifications & Credentials
          </h2>

          <p className={styles.subtitle}>
            Selected certifications and achievements showcasing
            continuous learning and technical expertise.
          </p>
        </motion.div>

        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loader} />
            <p>Loading certifications...</p>
          </div>
        ) : certifications.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No certifications yet. Check back soon!</p>
          </div>
        ) : (
          <div className={styles.certificationSystem}>
            <motion.div
              className={styles.ribbon}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              {certifications.map((cert, index) => {
                const offset = index - activeIndex;

                return (
                  <button
                    key={cert.id}
                    type="button"
                    className={`${styles.ribbonStop} ${
                      index === activeIndex
                        ? styles.ribbonStopActive
                        : ''
                    }`}
                    style={{
                      transform: `
                        translate(-50%, -50%)
                        translateX(${offset * 240}px)
                        scale(${index === activeIndex ? 1 : 0.82})
                        rotateY(${offset * -10}deg)
                      `,
                      zIndex:
                        certifications.length -
                        Math.abs(offset),

                      opacity:
                        Math.abs(offset) > 3 ? 0 : 1,
                    }}
                    onClick={() => setActiveIndex(index)}
                  >
                    {cert.image_url ? (
                      <div className={styles.certificateImage}>
                        <img
                          src={cert.image_url}
                          alt={cert.title}
                        />
                      </div>
                    ) : (
                      <div className={styles.imagePlaceholder}>
                        <span>CERTIFICATE</span>
                      </div>
                    )}

                    <div className={styles.cardOverlay} />

                    <div className={styles.cardContent}>
                      <span className={styles.cardIndex}>
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <h3 className={styles.cardTitle}>
                        {cert.title}
                      </h3>
                    </div>
                  </button>
                );
              })}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}