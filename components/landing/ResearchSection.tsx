'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/lib/hooks/useInView';
import { useEffect, useState } from 'react';
import { Calendar, Download, FileText, Link2 } from 'lucide-react';
import styles from './ResearchSection.module.css';

interface Research {
  id: string;
  title: string;
  abstract?: string;
  authors?: string[];
  publication_date?: string;
  journal?: string;
  conference?: string;
  pdf_url?: string;
  doi?: string;
  tags?: string[];
  type?: string;
  featured: boolean;
}

function formatResearchDate(date?: string) {
  if (!date) {
    return 'Upcoming';
  }

  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
}

export default function ResearchSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [research, setResearch] = useState<Research[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const response = await fetch('/api/research');
        const data = await response.json();
        setResearch(data);
      } catch (error) {
        console.error('Error fetching research:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResearch();
  }, []);

  useEffect(() => {
    if (activeIndex > research.length - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, research.length]);

  const activeItem = research[activeIndex];

  return (
    <section id="research" className={styles.research} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionLabel}>Publications & Research</span>
          <h2 className={styles.title}>Research Signal Line</h2>
          <p className={styles.subtitle}>
            Publications, reports, and experiments arranged like a research control stream instead of repeated cards.
          </p>
        </motion.div>

        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loader} />
            <p>Loading research...</p>
          </div>
        ) : activeItem ? (
          <div className={styles.researchSystem}>
            <motion.div
              className={styles.timelineColumn}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className={styles.panelLabel}>Research timeline</div>

              <div className={styles.timelineList}>
                {research.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`${styles.timelineItem} ${index === activeIndex ? styles.timelineItemActive : ''}`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <span className={styles.timelineDot} />
                    <div className={styles.timelineContent}>
                      <strong>{item.title}</strong>
                      <small>{formatResearchDate(item.publication_date)}</small>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              key={activeItem.id}
              className={styles.previewStage}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 }}
            >
              <div className={styles.previewMeta}>
                <span className={styles.typeBadge}>{activeItem.type || 'paper'}</span>
                {activeItem.featured ? <span className={styles.featuredBadge}>Featured</span> : null}
              </div>

              <h3 className={styles.researchTitle}>{activeItem.title}</h3>

              {activeItem.authors && activeItem.authors.length > 0 ? (
                <div className={styles.authors}>{activeItem.authors.join(', ')}</div>
              ) : null}

              {activeItem.abstract ? <p className={styles.abstract}>{activeItem.abstract}</p> : null}

              <div className={styles.metadataLine}>
                <span className={styles.metadataItem}>
                  <Calendar size={14} />
                  <span>{formatResearchDate(activeItem.publication_date)}</span>
                </span>
                {activeItem.journal ? (
                  <span className={styles.metadataItem}>
                    <FileText size={14} />
                    <span>{activeItem.journal}</span>
                  </span>
                ) : null}
                {activeItem.conference ? (
                  <span className={styles.metadataItem}>
                    <Link2 size={14} />
                    <span>{activeItem.conference}</span>
                  </span>
                ) : null}
              </div>

              {activeItem.tags && activeItem.tags.length > 0 ? (
                <div className={styles.tagLine}>
                  {activeItem.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className={styles.previewActions}>
                {activeItem.pdf_url ? (
                  <a
                    href={activeItem.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionButton}
                  >
                    <Download size={16} />
                    <span>Download PDF</span>
                  </a>
                ) : null}
                {activeItem.doi ? (
                  <a
                    href={`https://doi.org/${activeItem.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionButton}
                  >
                    <span>Open DOI</span>
                  </a>
                ) : null}
              </div>
            </motion.div>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <FileText size={48} />
            <p>Research publications coming soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
