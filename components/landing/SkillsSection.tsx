'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/lib/hooks/useInView';
import type { CSSProperties } from 'react';
import { useEffect, useMemo, useState } from 'react';
import {
  BarChart3,
  BrainCircuit,
  Cloud,
  Cpu,
  Database,
  Monitor,
  Server,
} from 'lucide-react';
import styles from './SkillsSection.module.css';

const skillDomains = [
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    icon: Monitor,
    color: '#8cbcff',
    technologies: ['React.js', 'Next.js', 'TypeScript', 'TailwindCSS', 'HTML5', 'CSS3', 'Framer Motion'],
    description: 'Building responsive, performant, and accessible user interfaces',
    orbit: { x: '52%', y: '20%' },
  },
  {
    id: 'backend',
    title: 'Backend Engineering',
    icon: Server,
    color: '#b2e3ff',
    technologies: ['Node.js', 'Express.js', 'Flask', 'FastAPI', 'REST APIs', 'GraphQL'],
    description: 'Designing scalable server architectures and APIs',
    orbit: { x: '22%', y: '46%' },
  },
  {
    id: 'aiml',
    title: 'AI/ML Systems',
    icon: BrainCircuit,
    color: '#8eb6ff',
    technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'NLP', 'Computer Vision', 'Model Deployment'],
    description: 'Developing intelligent systems and machine learning models',
    orbit: { x: '66%', y: '54%' },
  },
  {
    id: 'data',
    title: 'Data Analytics',
    icon: BarChart3,
    color: '#7fbfff',
    technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Data Visualization', 'Statistical Analysis'],
    description: 'Extracting insights from complex datasets',
    orbit: { x: '76%', y: '28%' },
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: Cloud,
    color: '#9bd4ff',
    technologies: ['Docker', 'Git', 'GitHub', 'Vercel', 'Render', 'CI/CD', 'Linux'],
    description: 'Infrastructure automation and deployment optimization',
    orbit: { x: '32%', y: '20%' },
  },
  {
    id: 'iot',
    title: 'IoT & Automation',
    icon: Cpu,
    color: '#95aefb',
    technologies: ['Sensors', 'Microcontrollers', 'Protocol Design', 'Embedded Systems', 'Automation'],
    description: 'Connecting physical devices to digital ecosystems',
    orbit: { x: '38%', y: '72%' },
  },
  {
    id: 'database',
    title: 'Database Systems',
    icon: Database,
    color: '#89c8ff',
    technologies: ['PostgreSQL', 'MongoDB', 'MySQL', 'Supabase', 'Database Design', 'Query Optimization'],
    description: 'Architecting robust data storage solutions',
    orbit: { x: '60%', y: '78%' },
  },
];

const languages = ['Python', 'JavaScript', 'TypeScript', 'C++', 'C', 'SQL'];

export default function SkillsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeDomainId, setActiveDomainId] = useState(skillDomains[0].id);

  const activeDomain = useMemo(
    () => skillDomains.find((domain) => domain.id === activeDomainId) || skillDomains[0],
    [activeDomainId]
  );

  useEffect(() => {
    setActiveDomainId(skillDomains[0].id);
  }, []);

  return (
    <section id="skills" className={styles.skills} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionLabel}>Technical Expertise</span>
          <h2 className={styles.title}>Skills Constellation</h2>
          <p className={styles.subtitle}>
          </p>
        </motion.div>

        <div className={styles.ecosystem}>
          <motion.div
            className={styles.signalPanel}
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className={styles.panelLabel}>Domain focus</div>
            <div
              className={styles.domainBadge}
              style={{ ['--domain-glow' as string]: activeDomain.color } as CSSProperties}
            >
              <activeDomain.icon size={20} />
              <span>{activeDomain.title}</span>
            </div>

            <p className={styles.domainDescription}>{activeDomain.description}</p>

            <div className={styles.technologyCloud}>
              {activeDomain.technologies.map((tech) => (
                <span key={tech} className={styles.techToken}>
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className={styles.orbitField}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className={styles.orbitGlow} />
            <div className={styles.orbitRingPrimary} />
            <div className={styles.orbitRingSecondary} />
            <div className={styles.centerNode}>
              <span className={styles.centerLabel}>Engineering Core</span>
              <strong>Full-Stack + Research</strong>
            </div>

            {skillDomains.map((domain, index) => (
              <button
                key={domain.id}
                type="button"
                className={`${styles.domainNode} ${activeDomain.id === domain.id ? styles.domainNodeActive : ''}`}
                style={
                  {
                    ['--node-x' as string]: domain.orbit.x,
                    ['--node-y' as string]: domain.orbit.y,
                    ['--node-color' as string]: domain.color,
                  } as CSSProperties
                }
                onMouseEnter={() => setActiveDomainId(domain.id)}
                onFocus={() => setActiveDomainId(domain.id)}
                onClick={() => setActiveDomainId(domain.id)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.35, delay: 0.18 + index * 0.06 }}
                  className={styles.domainNodeInner}
                >
                  <domain.icon size={20} />
                  <span>{domain.title}</span>
                </motion.div>
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div
          className={styles.languageRail}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className={styles.panelLabel}>Programming Languages</div>
          <div className={styles.languageTrack}>
            {languages.map((language) => (
              <span key={language} className={styles.languageChip}>
                {language}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
