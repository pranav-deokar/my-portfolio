import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Pranav Balasaheb Deokar | Portfolio',
  description: 'B.Tech CSE student specializing in AI/ML, full-stack development, and innovative engineering solutions. CGPA: 8.93/10',
  keywords: [
    'Pranav Deokar',
    'Full-Stack Developer',
    'AI/ML Engineer',
    'Computer Science',
    'React Developer',
    'Next.js',
    'Python',
    'JavaScript',
    'Machine Learning',
    'Web Development',
  ],
  authors: [{ name: 'Pranav Balasaheb Deokar' }],
  openGraph: {
    title: 'Pranav Balasaheb Deokar | Full-Stack Developer & AI/ML Engineer',
    description: 'B.Tech CSE student specializing in AI/ML, full-stack development, and innovative engineering solutions',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pranav Balasaheb Deokar | Full-Stack Developer & AI/ML Engineer',
    description: 'B.Tech CSE student specializing in AI/ML, full-stack development, and innovative engineering solutions',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
