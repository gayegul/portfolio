import React, { useState, useEffect, lazy, Suspense } from 'react';

// Constants
import { ANIMATION } from './constants/animation';

// Hooks
import { useScrollProgress } from './hooks/useScrollProgress';

// Components (eager load)
import { MorphingBackground } from './components/MorphingBackground';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navigation } from './components/Navigation';
import { HeroSectionWithPhoto } from './components/HeroSectionWithPhoto';

// Components (lazy load)
const ExperienceSection = lazy(() => import('./components/ExperienceSection').then(module => ({ default: module.ExperienceSection })));
const Press = lazy(() => import('./components/Press').then(module => ({ default: module.Press })));
const AboutSection = lazy(() => import('./components/AboutSection').then(module => ({ default: module.AboutSection })));
const Footer = lazy(() => import('./components/Footer').then(module => ({ default: module.Footer })));

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
      <div className="min-h-screen text-slate-100 bg-navy-dark">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-teal-500 focus:text-slate-950 focus:rounded-lg z-50"
        >
          Skip to main content
        </a>

        <Navigation isVisible={navVisible} />

        <MorphingBackground scrollProgress={scrollProgress} />

        <main id="main-content" className="relative z-10">
          <HeroSectionWithPhoto />
          <Suspense fallback={<div className="min-h-screen" />}>
            <ExperienceSection />
            <Press />
            <AboutSection />
            <Footer />
          </Suspense>
        </main>
      </div>
    </ErrorBoundary>
  );
}
