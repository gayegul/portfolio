import { personalInfo } from '../data/personalInfo';

/**
 * Footer — Field Notes colophon.
 *
 * The colophon page of the document: where the typeface, paper, and
 * production notes traditionally live at the back of a printed book. Three
 * columns on desktop, single column on mobile. Mono throughout, with
 * accent-red on link hover.
 *
 *   Col 1 — Colophon (typeface + tooling credits, last revised date)
 *   Col 2 — Correspondence (email, LinkedIn, GitHub)
 *   Col 3 — Index (mini table of contents linking to each section)
 *
 * Bottom row: an honest one-liner — copyright + "hand-set, no analytics".
 *
 * Inherited from the rest of the document:
 *  - h-px bg-ink/10 hairline at the top
 *  - font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] muted labels
 *  - font-mono text-xs text-ink hover:text-accent for values + links
 *  - no motion beyond transition-colors
 */
export function Footer() {
  // Cleaned GitHub URL — strip any stray query string from older copies.
  const githubHref = personalInfo.github.split('?')[0];

  const indexLinks: ReadonlyArray<{ n: string; label: string; href: string }> = [
    { n: 'Nº 01', label: 'Title page', href: '#top' },
    { n: 'Nº 02', label: 'Work', href: '#work' },
    { n: 'Nº 03', label: 'Press', href: '#press' },
    { n: 'Nº 04', label: 'About', href: '#about' },
  ];

  return (
    <footer
      role="contentinfo"
      aria-labelledby="footer-heading"
      className="relative px-4 sm:px-6 lg:px-10 mt-32 sm:mt-40 pb-12 sm:pb-16"
    >
      <h2 id="footer-heading" className="sr-only">
        Colophon
      </h2>

      <div className="mx-auto max-w-7xl">
        {/* Top hairline — same weight as every other section divider */}
        <div aria-hidden="true" className="h-px w-full bg-ink/10" />

        {/* Folio + tagline above the grid, like a printed colophon header */}
        <div className="pt-10 sm:pt-12">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
            <span aria-hidden="true">§ </span>
            Nº 05 — Colophon
          </p>
          <p className="mt-3 font-serif italic text-base sm:text-lg text-muted max-w-xl">
            Production notes, for the curious.
          </p>
        </div>

        {/* Three columns on md+, stack on mobile */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 lg:gap-16">

          {/* ── Column 1: Colophon proper ──────────────────────────────── */}
          <section aria-labelledby="footer-colophon">
            <h3
              id="footer-colophon"
              className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted"
            >
              Colophon
            </h3>
            <div className="mt-4 font-mono text-xs leading-relaxed text-ink space-y-3">
              <p>
                Set in{' '}
                <span className="font-serif italic text-ink">Newsreader</span>{' '}
                and <span className="text-ink">JetBrains Mono</span>.
              </p>
              <p className="text-muted">
                Built with React, TypeScript, Vite, and Tailwind. Drafted in
                2024. Last revised May 2026.
              </p>
              <p className="text-muted">
                Paper <span className="tabular-nums">#F5F1E8</span>. Ink{' '}
                <span className="tabular-nums">#1A1A1A</span>. Margin red{' '}
                <span className="text-accent tabular-nums">#B23F37</span>.
              </p>
            </div>
          </section>

          {/* ── Column 2: Correspondence ───────────────────────────────── */}
          <section aria-labelledby="footer-correspondence">
            <h3
              id="footer-correspondence"
              className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted"
            >
              Correspondence
            </h3>
            <ul className="mt-4 space-y-3 font-mono text-xs" role="list">
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-baseline gap-2 text-ink hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper transition-colors"
                  aria-label={`${personalInfo.email} — send email`}
                >
                  <span className="text-muted">→</span>
                  <span>{personalInfo.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-baseline gap-2 text-ink hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper transition-colors"
                  aria-label="linkedin.com/in/gayebulut — LinkedIn profile (opens in new tab)"
                >
                  <span className="text-muted">→</span>
                  <span>linkedin.com/in/gayebulut</span>
                  <span aria-hidden="true" className="text-muted/70">↗</span>
                </a>
              </li>
              <li>
                <a
                  href={githubHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-baseline gap-2 text-ink hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper transition-colors"
                  aria-label="github.com/gayebulut — GitHub profile (opens in new tab)"
                >
                  <span className="text-muted">→</span>
                  <span>github.com/gayebulut</span>
                  <span aria-hidden="true" className="text-muted/70">↗</span>
                </a>
              </li>
              <li className="pt-1">
                <a
                  href="/Gaye_Bulut_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-baseline gap-2 text-ink hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper transition-colors"
                  aria-label="Résumé (PDF) — opens in new tab"
                >
                  <span className="text-muted">→</span>
                  <span>résumé (PDF)</span>
                  <span aria-hidden="true" className="text-muted/70">↗</span>
                </a>
              </li>
            </ul>
          </section>

          {/* ── Column 3: Index ────────────────────────────────────────── */}
          <section aria-labelledby="footer-index">
            <h3
              id="footer-index"
              className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted"
            >
              Index
            </h3>
            <ul className="mt-4 space-y-3" role="list">
              {indexLinks.map(({ n, label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="group grid grid-cols-[3rem_1fr] gap-3 items-baseline font-mono text-xs text-ink hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper transition-colors"
                  >
                    <span className="text-accent tabular-nums">{n}</span>
                    <span className="underline decoration-muted/30 underline-offset-4 group-hover:decoration-accent transition-colors">
                      {label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Bottom row — colophon line, not legalese */}
        <div className="mt-16 sm:mt-20 pt-6 border-t border-ink/10 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted">
            © 2026 Gaye Bulut
            <span aria-hidden="true" className="mx-2 text-ink/30">·</span>
            This page is hand-set.
            <span aria-hidden="true" className="mx-2 text-ink/30">·</span>
            No analytics. No tracking.
          </p>
          <p
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted tabular-nums"
            aria-hidden="true"
          >
            — end of file —
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
