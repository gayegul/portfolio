import { useState, useEffect, lazy, Suspense } from 'react';

// Constants
import { ANIMATION } from './constants/animation';

// Components (eager load)
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navigation } from './components/Navigation';
import { Hero } from './components/v2/Hero';

// Components (lazy load)
const Experience = lazy(() =>
  import('./components/v2/Experience').then((module) => ({ default: module.Experience }))
);
const Press = lazy(() =>
  import('./components/v2/Press').then((module) => ({ default: module.Press }))
);
const About = lazy(() =>
  import('./components/v2/About').then((module) => ({ default: module.About }))
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
      <div className="min-h-screen bg-paper text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-accent focus:text-paper focus:rounded-lg z-50"
        >
          Skip to main content
        </a>

        <Navigation isVisible={navVisible} />

        <main id="main-content" className="relative z-10">
          <Hero />
          <Suspense fallback={<div className="min-h-screen" />}>
            <Experience />
            <Press />
            <About />
            <Footer />
          </Suspense>
        </main>
      </div>
    </ErrorBoundary>
  );
}
