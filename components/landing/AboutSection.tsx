'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/lib/hooks/useInView';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="about" className={styles.about} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionLabel}>Professional Identity</span>
          <h2 className={styles.title}>Engineering Excellence</h2>
        </motion.div>

        <div className={styles.content}>
          <motion.div
            className={styles.mainContent}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.bioCard}>
              <div className={styles.bioGlow} />
              <p className={styles.bioText}>
                I'm a <strong>B.Tech Computer Science Engineering student</strong> with a specialization in AI/ML Honours, maintaining a <strong>CGPA of 8.93/10</strong>. My journey in technology is driven by a passion for building scalable, intelligent systems that solve real-world problems.
              </p>
              <p className={styles.bioText}>
                With hands-on experience in <strong>full-stack development, AI/ML applications, and enterprise software automation</strong>, I've developed a strong foundation in creating production-grade solutions. My expertise spans across modern web technologies, machine learning frameworks, and cloud infrastructure.
              </p>
              <p className={styles.bioText}>
                I recently completed a <strong>ServiceNow Virtual Internship</strong> focusing on system administration and API development, where I gained valuable insights into enterprise-level automation and workflow optimization.
              </p>
              <p className={styles.bioText}>
                Beyond coding, I'm deeply invested in <strong>research and innovation</strong>. My approach combines theoretical computer science knowledge with practical engineering skills, enabling me to architect solutions that are both elegant and efficient.
              </p>
            </div>
          </motion.div>

          <motion.div
            className={styles.sideContent}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className={styles.highlightTitle}>Education</h3>
              <div className={styles.highlightContent}>
                <div className={styles.degree}>B.Tech in Computer Science Engineering</div>
                <div className={styles.specialization}>AI/ML Honours</div>
                <div className={styles.institution}>Sanjivani College of Engineering</div>
                <div className={styles.timeline}>Expected Graduation: June 2027</div>
                <div className={styles.cgpa}>CGPA: 8.93/10</div>
              </div>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <h3 className={styles.highlightTitle}>Experience</h3>
              <div className={styles.highlightContent}>
                <div className={styles.position}>System Administrator Intern</div>
                <div className={styles.company}>ServiceNow Virtual Internship</div>
                <div className={styles.duration}>Feb 2026 to Mar 2026</div>
                <ul className={styles.responsibilities}>
                  <li>System administration and configuration</li>
                  <li>API development and integration</li>
                  <li>Workflow automation</li>
                </ul>
              </div>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3 className={styles.highlightTitle}>Core Focus</h3>
              <div className={styles.highlightContent}>
                <div className={styles.focusAreas}>
                  <span className={styles.focusTag}>Full-Stack Development</span>
                  <span className={styles.focusTag}>AI/ML Systems</span>
                  <span className={styles.focusTag}>Cloud Architecture</span>
                  <span className={styles.focusTag}>Research & Innovation</span>
                  <span className={styles.focusTag}>IoT Solutions</span>
                  <span className={styles.focusTag}>System Design</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
