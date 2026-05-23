'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/lib/hooks/useInView';
import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import styles from './ContactSection.module.css';

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon?: string;
  visible: boolean;
  sort_order: number;
}

const iconMap: Record<string, typeof Mail> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  mail: Mail,
};

export default function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [socials, setSocials] = useState<SocialLink[]>([]);

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const response = await fetch('/api/socials');
        const data = await response.json();
        setSocials(data.filter((social: SocialLink) => social.visible));
      } catch (error) {
        console.error('Error fetching socials:', error);
      }
    };

    fetchSocials();
  }, []);

  return (
    <section id="contact" className={styles.contact} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.mainContent}>
            <span className={styles.sectionLabel}>Let's Connect</span>
            <h2 className={styles.title}>Get in Touch</h2>
            <p className={styles.description}>
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <div className={styles.contactInfo}>
              <motion.div className={styles.infoCard} whileHover={{ scale: 1.02 }}>
                <div className={styles.infoIcon}>
                  <Mail size={24} />
                </div>
                <div className={styles.infoContent}>
                  <div className={styles.infoLabel}>Email</div>
                  <a href="mailto:pranavdeokar6@gmail.com" className={styles.infoValue}>
                    pranavdeokar6@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div className={styles.infoCard} whileHover={{ scale: 1.02 }}>
                <div className={styles.infoIcon}>
                  <MapPin size={24} />
                </div>
                <div className={styles.infoContent}>
                  <div className={styles.infoLabel}>Location</div>
                  <div className={styles.infoValue}>Kopargaon, Maharashtra, IN</div>
                </div>
              </motion.div>
            </div>

            {socials.length > 0 && (
              <div className={styles.socialLinks}>
                <div className={styles.socialLabel}>Find me on</div>
                <div className={styles.socialIcons}>
                  {socials.map((social) => {
                    const IconComponent = iconMap[social.platform.toLowerCase()] || Mail;

                    return (
                      <motion.a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialIcon}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <IconComponent size={24} />
                        <div className={styles.socialTooltip}>{social.platform}</div>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className={styles.visualContent}>
            <div className={styles.glowOrb} />
            <motion.div
              className={styles.codeBlock}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className={styles.codeHeader}>
                <span className={styles.codeDot} />
                <span className={styles.codeDot} />
                <span className={styles.codeDot} />
              </div>
              <div className={styles.codeContent}>
                <div className={styles.codeLine}>
                  <span className={styles.codeKeyword}>const</span>{' '}
                  <span className={styles.codeVariable}>contact</span> = {'{'}
                </div>
                <div className={styles.codeLine}>
                  {'  '}<span className={styles.codeProperty}>email</span>:{' '}
                  <span className={styles.codeString}>"pranavdeokar6@gmail.com"</span>,
                </div>
                <div className={styles.codeLine}>
                  {'  '}<span className={styles.codeProperty}>status</span>:{' '}
                  <span className={styles.codeString}>"Open to opportunities"</span>,
                </div>
                <div className={styles.codeLine}>
                  {'  '}<span className={styles.codeProperty}>interests</span>: [
                </div>
                <div className={styles.codeLine}>
                  {'    '}<span className={styles.codeString}>"Full-Stack Dev"</span>,
                </div>
                <div className={styles.codeLine}>
                  {'    '}<span className={styles.codeString}>"AI/ML"</span>,
                </div>
                <div className={styles.codeLine}>
                  {'    '}<span className={styles.codeString}>"Research"</span>
                </div>
                <div className={styles.codeLine}>{'  '}]</div>
                <div className={styles.codeLine}>{'};'}</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.footer
          className={styles.footer}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className={styles.footerContent}>
            <div className={styles.footerText}>
              <p>Copyright {new Date().getFullYear()} Pranav Balasaheb Deokar. All rights reserved.</p>
              <p className={styles.footerSubtext}>
                Built  using Next.js, TypeScript, and Supabase
              </p>
            </div>
            <div className={styles.footerLinks}>
              <a href="#home">Back to Top</a>
            </div>
          </div>
          <div className={styles.footerGlow} />
        </motion.footer>
      </div>
    </section>
  );
}
