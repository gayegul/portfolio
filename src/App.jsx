import React, { useState, useEffect } from 'react';

// Constants
import { ANIMATION } from './constants/animation';

// Hooks
import { useScrollProgress } from './hooks/useScrollProgress';

// Components
import { MorphingBackground } from './components/MorphingBackground';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navigation } from './components/Navigation';
import { HeroSectionWithPhoto } from './components/HeroSectionWithPhoto';
import { ExperienceSection } from './components/ExperienceSection';
import { Press } from './components/Press';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';

export default function Portfolio() {
  const scrollProgress = useScrollProgress();
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavVisible(window.scrollY > ANIMATION.NAV_SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen text-slate-100" style={{ backgroundColor: '#020617' }}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-teal-500 focus:text-slate-950 focus:rounded-lg"
          style={{ zIndex: 50 }}
        >
          Skip to main content
        </a>

        <Navigation isVisible={navVisible} />

        <MorphingBackground scrollProgress={scrollProgress} />

        <main id="main-content" className="relative" style={{ zIndex: 10 }}>
          <HeroSectionWithPhoto />
          <ExperienceSection />
          <Press />
          <AboutSection />
          <Footer />
        </main>
      </div>
    </ErrorBoundary>
  );
}
