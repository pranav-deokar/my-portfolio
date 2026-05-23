import HeroSection from '@/components/landing/HeroSection';
import AboutSection from '@/components/landing/AboutSection';
import SkillsSection from '@/components/landing/SkillsSection';
import ProjectsSection from '@/components/landing/ProjectsSection';
import ResearchSection from '@/components/landing/ResearchSection';
import CertificatesSection from '@/components/landing/CertificatesSection';
import AchievementsSection from '@/components/landing/AchievementsSection';
import ContactSection from '@/components/landing/ContactSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ResearchSection />
      <CertificatesSection />
      <AchievementsSection />
      <ContactSection />
    </main>
  );
}
