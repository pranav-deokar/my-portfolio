'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/lib/hooks/useInView';
import { useEffect, useState } from 'react';
import { Award, Calendar, ExternalLink, Trophy } from 'lucide-react';
import styles from './AchievementsSection.module.css';

interface Achievement {
  id: string;
  title: string;
  description?: string;
  type?: string;
  position?: string;
  organization?: string;
  event_date?: string;
  image_url?: string;
  certificate_url?: string;
  tags?: string[];
  featured: boolean;
}

function formatAchievementDate(date?: string) {
  if (!date) {
    return 'Recent';
  }

  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
}

export default function AchievementsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch('/api/achievements');
        const data = await response.json();
        setAchievements(data);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  useEffect(() => {
    if (activeIndex > achievements.length - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, achievements.length]);

  const activeAchievement = achievements[activeIndex];

  return (
    <section id="achievements" className={styles.achievements} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionLabel}>Recognition & Milestones</span>
          <h2 className={styles.title}>Achievement Spotlight</h2>
          <p className={styles.subtitle}>
            A spotlight ribbon for wins, milestones, and hackathon results instead of another generic card grid.
          </p>
        </motion.div>

        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loader} />
            <p>Loading achievements...</p>
          </div>
        ) : activeAchievement ? (
          <div className={styles.spotlightSystem}>
            <motion.div
              className={styles.ribbon}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {achievements.map((achievement, index) => (
                <button
                  key={achievement.id}
                  type="button"
                  className={`${styles.ribbonStop} ${index === activeIndex ? styles.ribbonStopActive : ''}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className={styles.stopIndex}>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{achievement.title}</strong>
                  <small>{achievement.position || achievement.type || 'milestone'}</small>
                </button>
              ))}
            </motion.div>

            <motion.div
              key={activeAchievement.id}
              className={styles.spotlight}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.15 }}
            >
              <div className={styles.spotlightGlow} />

              <div className={styles.spotlightHeader}>
                <div className={styles.iconWrap}>
                  {activeAchievement.position?.toLowerCase().includes('winner') ||
                  activeAchievement.position?.toLowerCase().includes('1st') ? (
                    <Trophy size={34} className={styles.goldIcon} />
                  ) : (
                    <Award size={34} className={styles.icon} />
                  )}
                </div>

                <div className={styles.headerText}>
                  <span className={styles.positionBadge}>
                    {activeAchievement.position || activeAchievement.type || 'Recognition'}
                  </span>
                  {activeAchievement.featured ? <span className={styles.featuredBadge}>Featured</span> : null}
                </div>
              </div>

              <h3 className={styles.achievementTitle}>{activeAchievement.title}</h3>

              {activeAchievement.organization ? (
                <div className={styles.organization}>{activeAchievement.organization}</div>
              ) : null}

              {activeAchievement.description ? (
                <p className={styles.description}>{activeAchievement.description}</p>
              ) : null}

              <div className={styles.metaLine}>
                <span className={styles.date}>
                  <Calendar size={14} />
                  <span>{formatAchievementDate(activeAchievement.event_date)}</span>
                </span>
              </div>

              {activeAchievement.tags && activeAchievement.tags.length > 0 ? (
                <div className={styles.tagLine}>
                  {activeAchievement.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}

              {activeAchievement.certificate_url ? (
                <a
                  href={activeAchievement.certificate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.viewCertificate}
                >
                  <ExternalLink size={16} />
                  <span>View Certificate</span>
                </a>
              ) : null}
            </motion.div>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <Trophy size={48} />
            <p>Achievements coming soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
