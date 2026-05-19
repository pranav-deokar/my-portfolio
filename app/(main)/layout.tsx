import Navbar from '@/components/shared/Navbar';
import AnimatedBackground from '@/components/effects/AnimatedBackground';
import CustomCursor from '@/components/effects/CustomCursor';
import EyeTracker from '@/components/effects/EyeTracker';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnimatedBackground />
      <CustomCursor />
      <EyeTracker />
      <Navbar />
      {children}
    </>
  );
}
