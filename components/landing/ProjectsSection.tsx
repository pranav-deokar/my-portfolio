'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/lib/hooks/useInView';
import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Github, Orbit } from 'lucide-react';
import styles from './ProjectsSection.module.css';

interface Project {
  id: string;
  title: string;
  description: string;
  long_description?: string;
  technologies: string[];
  github_url?: string;
  live_url?: string;
  image_url?: string;
  images?: string[];
  status: string;
  featured: boolean;
  categories?: string[];
  tags?: string[];
  start_date?: string;
  end_date?: string;
}

export default function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = useMemo(
    () => (filter === 'featured' ? projects.filter((project) => project.featured) : projects),
    [filter, projects]
  );

  useEffect(() => {
    if (filteredProjects.length === 0) {
      setActiveIndex(0);
      return;
    }

    if (activeIndex > filteredProjects.length - 1) {
      setActiveIndex(0);
    }

    setGalleryIndex(0);
  }, [activeIndex, filteredProjects.length]);

  const activeProject = filteredProjects[activeIndex];

  const handleStep = (direction: 'prev' | 'next') => {
    if (filteredProjects.length === 0) {
      return;
    }

    setActiveIndex((previous) => {
      if (direction === 'next') {
        return (previous + 1) % filteredProjects.length;
      }

      return (previous - 1 + filteredProjects.length) % filteredProjects.length;
    });
  };

  const activeYears = useMemo(() => {
    if (!activeProject) {
      return '';
    }

    const startYear = activeProject.start_date ? new Date(activeProject.start_date).getFullYear() : null;
    const endYear = activeProject.end_date ? new Date(activeProject.end_date).getFullYear() : null;

    if (startYear && endYear) {
      return `${startYear} - ${endYear}`;
    }

    if (startYear) {
      return `${startYear}`;
    }

    return activeProject.status;
  }, [activeProject]);

  return (
    <section id="projects" className={styles.projects} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionLabel}>Project Showcase</span>
          <h2 className={styles.title}>Project Theatre</h2>
          <p className={styles.subtitle}>
          </p>

          <div className={styles.filterButtons}>
            <button
              className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
              onClick={() => {
                setFilter('all');
                setActiveIndex(0);
              }}
            >
              All Projects
            </button>
            <button
              className={`${styles.filterBtn} ${filter === 'featured' ? styles.active : ''}`}
              onClick={() => {
                setFilter('featured');
                setActiveIndex(0);
              }}
            >
              Featured
            </button>
          </div>
        </motion.div>

        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loader} />
            <p>Loading projects...</p>
          </div>
        ) : activeProject ? (
          <motion.div
            className={styles.theatre}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className={styles.waveField} />
            <div className={styles.topBeam} />

            <aside className={styles.projectRail}>
              <div className={styles.railHeader}>
                <Orbit size={16} />
                <span>Project Index</span>
              </div>

              <div className={styles.railList}>
                {filteredProjects.map((project, index) => (
                  <button
                    key={project.id}
                    type="button"
                    className={`${styles.railItem} ${index === activeIndex ? styles.railItemActive : ''}`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <span className={styles.railItemNumber}>{String(index + 1).padStart(2, '0')}</span>
                    <span className={styles.railItemText}>
                      <strong>{project.title}</strong>
                      <small>{project.categories?.[0] || project.status}</small>
                    </span>
                  </button>
                ))}
              </div>

              <div className={styles.railControls}>
                <button type="button" className={styles.navButton} onClick={() => handleStep('prev')}>
                  <ChevronLeft size={18} />
                </button>
                <button type="button" className={styles.navButton} onClick={() => handleStep('next')}>
                  <ChevronRight size={18} />
                </button>
              </div>
            </aside>

            <div className={styles.focusStage}>
              <motion.div
                key={activeProject.id}
                className={styles.signalDisplay}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className={styles.signalBackdrop} />
                <div className={styles.signalMeta}>
                  <span className={styles.metaBadge}>{activeProject.status}</span>
                  {activeProject.featured ? <span className={styles.featuredBadge}>Featured</span> : null}
                </div>

                <div className={styles.titleCluster}>
                  <span className={styles.kicker}>Active selection</span>
                  <h3 className={styles.projectTitle}>{activeProject.title}</h3>
                  <p className={styles.projectLead}>
                    {activeProject.long_description || activeProject.description}
                  </p>
                </div>

                <div className={styles.infoStrips}>
                  <div className={styles.infoStrip}>
                    <span className={styles.infoLabel}>Categories</span>
                    <span className={styles.infoValue}>
                      {activeProject.categories?.join(' / ') || 'Portfolio build'}
                    </span>
                  </div>
                  <div className={styles.infoStrip}>
                    <span className={styles.infoLabel}>Timeline</span>
                    <span className={styles.infoValue}>{activeYears}</span>
                  </div>
                </div>

                <div className={styles.techStream}>
                  {activeProject.technologies?.map((tech) => (
                    <span key={tech} className={styles.techPill}>
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              <div className={styles.waveStage}>
                <div className={styles.waveRibbon} />
                <div className={styles.waveRibbonSecondary} />
                <div className={styles.waveDots} />
              </div>
            </div>

            <aside className={styles.detailColumn}>
              <div className={styles.detailBlock}>
                <span className={styles.detailLabel}>Project note</span>
                <p>{activeProject.description}</p>
              </div>

              {activeProject.image_url ? (
                <div className={styles.detailBlock}>
                  <span className={styles.detailLabel}>Cover Image</span>
                  <div className={styles.projectImageContainer}>
                    <img 
                      src={activeProject.image_url} 
                      alt={activeProject.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              ) : null}

              {activeProject.images && activeProject.images.length > 0 ? (
                <div className={styles.detailBlock}>
                  <span className={styles.detailLabel}>Gallery</span>
                  <div className={styles.projectGalleryContainer}>
                    <div className={styles.galleryImageDisplay}>
                      <img 
                        src={activeProject.images[galleryIndex]} 
                        alt={`${activeProject.title} - ${galleryIndex + 1}`}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                    {activeProject.images.length > 1 ? (
                      <div className={styles.galleryNav}>
                        <button 
                          type="button"
                          className={styles.galleryNavButton}
                          onClick={() => setGalleryIndex((g) => (g - 1 + activeProject.images!.length) % activeProject.images!.length)}
                        >
                          <ChevronLeft size={14} />
                        </button>
                        <span className={styles.galleryCounter}>
                          {galleryIndex + 1} / {activeProject.images.length}
                        </span>
                        <button 
                          type="button"
                          className={styles.galleryNavButton}
                          onClick={() => setGalleryIndex((g) => (g + 1) % activeProject.images!.length)}
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {activeProject.tags && activeProject.tags.length > 0 ? (
                <div className={styles.detailBlock}>
                  <span className={styles.detailLabel}>Tags</span>
                  <p>{activeProject.tags.join(' / ')}</p>
                </div>
              ) : null}

              <div className={styles.actionCluster}>
                {activeProject.github_url ? (
                  <a
                    href={activeProject.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionButton}
                  >
                    <Github size={17} />
                    <span>GitHub</span>
                  </a>
                ) : null}

                {activeProject.live_url ? (
                  <a
                    href={activeProject.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionButton}
                  >
                    <ArrowUpRight size={17} />
                    <span>Live Demo</span>
                  </a>
                ) : null}
              </div>
            </aside>
          </motion.div>
        ) : (
          <div className={styles.emptyState}>
            <p>No projects found. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
