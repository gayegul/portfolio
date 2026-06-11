import { useState, useEffect, lazy, Suspense } from 'react';

// Constants
import { ANIMATION } from './constants/animation';

// Components (eager load)
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navigation } from './components/Navigation';
import { HeroSectionWithPhoto } from './components/HeroSectionWithPhoto';

// Components (lazy load)
const ExperienceSection = lazy(() =>
  import('./components/ExperienceSection').then((module) => ({ default: module.ExperienceSection }))
);
const Press = lazy(() =>
  import('./components/Press').then((module) => ({ default: module.Press }))
);
const AboutSection = lazy(() =>
  import('./components/AboutSection').then((module) => ({ default: module.AboutSection }))
);
const Footer = lazy(() =>
  import('./components/Footer').then((module) => ({ default: module.Footer }))
);

export default function Portfolio() {
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
      <div className="min-h-screen bg-ground text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-accent focus:text-ground focus:font-mono focus:text-sm z-50"
        >
          Skip to main content
        </a>

        <Navigation isVisible={navVisible} />

        {/* Page furniture on very wide screens */}
        <span
          className="fixed right-5 top-1/2 z-0 hidden -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-ink-faint/60 [writing-mode:vertical-rl] 2xl:block"
          aria-hidden="true"
        >
          Gaye Bulut — 2026
        </span>

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
