import { useCallback, useEffect, useState } from 'react';

/**
 * Navigation — Field Notes running head.
 *
 * Sits at the top of every page like the head of a printed sheet: a hairline
 * rule, a masthead pill on the left, mono section labels on the right, and a
 * page-folio (pp. NNN) on the far right that updates with the section
 * currently in view. No blur, no glass, no shadow — solid paper and ink.
 *
 * Behavior:
 *  - Sticky, slim (`py-3 sm:py-4`).
 *  - Scrollspy with IntersectionObserver — the section that crosses ~30% of
 *    the viewport from the top is the active one. Inline implementation
 *    because `useIntersectionObserver` disconnects on first fire (used by
 *    the 25M counter, not appropriate for ongoing tracking).
 *  - Active section: `text-accent` + `aria-current="location"`.
 *  - Mobile (<768px): mono "menu"/"close" word in accent-red opens a full-
 *    paper drawer with stacked links at oversized mono. No slide animation.
 *  - "Education" link is gone — Education is now numbered footnotes inside
 *    About, so a separate nav target would point at a non-anchor.
 */

type SectionKey = 'top' | 'work' | 'press' | 'about';

interface SectionLink {
  key: SectionKey;
  href: string;
  label: string;
  /** Page-folio number shown on the far right when this section is active. */
  folio: string;
}

const SECTION_LINKS: ReadonlyArray<SectionLink> = [
  { key: 'work', href: '#work', label: 'Work', folio: 'pp. 002' },
  { key: 'press', href: '#press', label: 'Press', folio: 'pp. 003' },
  { key: 'about', href: '#about', label: 'About', folio: 'pp. 004' },
];

const TITLE_FOLIO = 'pp. 001';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey>('top');

  // Close mobile menu on Escape.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mobileMenuOpen]);

  // Lock body scroll while drawer is open so the page underneath doesn't
  // scroll behind the menu on iOS.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  // Scrollspy — observe each section element. The section whose top crosses
  // the upper third of the viewport wins. If nothing is intersecting (we're
  // at the very top of the page), fall back to `top`.
  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const ids: SectionKey[] = ['top', 'work', 'press', 'about'];
    const elements = ids
      .map((id) => ({ id, el: document.getElementById(id) }))
      .filter((entry): entry is { id: SectionKey; el: HTMLElement } => entry.el !== null);

    if (elements.length === 0) return;

    // Track current intersection ratio per section so we can pick the most
    // visible one as the observer fires.
    const ratios = new Map<SectionKey, number>();
    elements.forEach(({ id }) => ratios.set(id, 0));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as SectionKey;
          ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        // Pick the section with the highest visible ratio. If everything
        // is at 0, leave the previous active section in place — this avoids
        // a flash of "top" while scrolling between two adjacent sections.
        let best: { id: SectionKey; ratio: number } | null = null;
        for (const [id, ratio] of ratios) {
          if (ratio > 0 && (!best || ratio > best.ratio)) {
            best = { id, ratio };
          }
        }

        if (best) {
          setActiveSection(best.id);
        } else if (window.scrollY < 100) {
          // Treat the very top of the page as the title page.
          setActiveSection('top');
        }
      },
      {
        // Trigger when ~30% of a section is in view from the top.
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleMastheadClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.history?.pushState) {
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
    }
    setActiveSection('top');
  }, []);

  const handleSectionClick = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const currentFolio =
    activeSection === 'top'
      ? TITLE_FOLIO
      : SECTION_LINKS.find((l) => l.key === activeSection)?.folio ?? TITLE_FOLIO;

  return (
    <nav
      aria-label="Section navigation"
      className="sticky top-0 z-40 bg-paper border-b border-ink/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Masthead pill — echoes Hero's masthead. Clicks to top. */}
          <a
            href="#top"
            onClick={handleMastheadClick}
            className="group inline-flex items-center font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-ink hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper transition-colors"
            aria-label="Field Notes / G. Bulut — back to top"
          >
            <span aria-hidden="true">Field Notes</span>
            <span aria-hidden="true" className="mx-2 text-muted group-hover:text-accent transition-colors">
              /
            </span>
            <span aria-hidden="true" className="text-muted group-hover:text-accent transition-colors">G. Bulut</span>
          </a>

          {/* Desktop section links + folio */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <ul className="flex items-center gap-6 lg:gap-8" role="list">
              {SECTION_LINKS.map(({ key, href, label }) => {
                const isActive = activeSection === key;
                return (
                  <li key={key}>
                    <a
                      href={href}
                      aria-current={isActive ? 'location' : undefined}
                      className={`font-mono text-xs uppercase tracking-[0.2em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper transition-colors ${
                        isActive ? 'text-accent' : 'text-muted hover:text-ink'
                      }`}
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  href="/Gaye_Bulut_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-[0.2em] text-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper transition-colors"
                  aria-label="Résumé (PDF) — opens in new tab"
                >
                  Résumé
                  <span aria-hidden="true" className="ml-1 text-muted/70">↗</span>
                </a>
              </li>
            </ul>

            {/* Page-folio — updates with the section in view */}
            <span
              aria-hidden="true"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted tabular-nums pl-6 lg:pl-8 border-l border-ink/10"
            >
              {currentFolio}
            </span>
          </div>

          {/* Mobile toggle — mono word in accent-red, not an icon */}
          <button
            type="button"
            className="md:hidden font-mono text-xs uppercase tracking-[0.2em] text-accent hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-section-menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? 'close' : 'menu'}
          </button>
        </div>
      </div>

      {/* Mobile drawer — full paper, links stacked left-aligned in oversized
          mono. No slide animation; show/hide instantly. Rendered inline so
          it sits flush below the running-head rule without needing fixed
          offsets that drift across breakpoints. */}
      {mobileMenuOpen && (
        <div
          id="mobile-section-menu"
          className="md:hidden bg-paper border-t border-ink/10"
        >
          <div className="px-4 sm:px-6 pt-10 pb-12 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent mb-8">
              <span aria-hidden="true">§ </span>
              Contents
            </p>
            <ul className="flex flex-col gap-6" role="list">
              {SECTION_LINKS.map(({ key, href, label, folio }) => {
                const isActive = activeSection === key;
                return (
                  <li key={key} className="flex items-baseline justify-between gap-4">
                    <a
                      href={href}
                      onClick={handleSectionClick}
                      aria-current={isActive ? 'location' : undefined}
                      className={`font-mono text-xl uppercase tracking-[0.16em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper transition-colors ${
                        isActive ? 'text-accent' : 'text-ink hover:text-accent'
                      }`}
                    >
                      {label}
                    </a>
                    <span
                      aria-hidden="true"
                      className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted tabular-nums"
                    >
                      {folio}
                    </span>
                  </li>
                );
              })}
              <li className="flex items-baseline justify-between gap-4 pt-2 border-t border-ink/10">
                <a
                  href="/Gaye_Bulut_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleSectionClick}
                  className="font-mono text-xl uppercase tracking-[0.16em] text-ink hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper transition-colors"
                  aria-label="Résumé (PDF) — opens in new tab"
                >
                  Résumé
                  <span aria-hidden="true" className="ml-2 text-muted">↗</span>
                </a>
                <span
                  aria-hidden="true"
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted"
                >
                  PDF
                </span>
              </li>
            </ul>

            <p className="mt-12 font-mono text-xs text-muted leading-relaxed max-w-xs">
              <span className="text-ink">ed. note —</span>{' '}
              tap a section to jump. Esc closes this list.
            </p>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
