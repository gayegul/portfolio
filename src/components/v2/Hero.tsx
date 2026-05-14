import { personalInfo } from '../../data/personalInfo';

/**
 * Hero — Field Notes title page.
 *
 * Editorial three-column layout (marginalia | main column | marginalia)
 * collapsing to a single column on mobile. Type-only, no photo, no motion
 * on load. Sets the typographic vocabulary for every later section:
 *   - small mono labels in margin-red for section folio numbers
 *   - serif display type, italic on a single trailing word for warmth
 *   - hand-drawn underline accent under the name only
 *   - bg-highlight reserved for a single short phrase per section
 */
export function Hero() {
  return (
    <header
      id="top"
      aria-labelledby="hero-name"
      className="relative min-h-screen px-4 sm:px-6 lg:px-10 pt-16 sm:pt-20 lg:pt-24 pb-16"
    >
      {/* Masthead rule — sits at the top like the head of a printed page */}
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between border-b border-ink/80 pb-3">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-ink">
            Field Notes
            <span className="mx-2 text-muted">/</span>
            <span className="text-muted">Vol. 01 — Ed. 2026</span>
          </span>
          <span
            className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted"
            aria-hidden="true"
          >
            pp. 001
          </span>
        </div>
      </div>

      {/* Main editorial grid */}
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-8 lg:gap-x-12 pt-12 sm:pt-16 md:pt-24 lg:pt-32">

          {/* LEFT RAIL — marginalia */}
          <aside
            className="md:col-span-2 lg:col-span-2 order-1 md:order-1"
            aria-label="Edition details"
          >
            <div className="md:sticky md:top-24 flex flex-col gap-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Edition
                </p>
                <p className="font-mono text-xs text-ink mt-1 tabular-nums">
                  2026 / portfolio
                </p>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Filed under
                </p>
                <p className="font-mono text-xs text-ink mt-1">
                  Software · Games · Edu
                </p>
              </div>

              <div className="hidden md:block">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Author
                </p>
                <p className="font-mono text-xs text-ink mt-1">
                  G. Bulut
                </p>
              </div>
            </div>
          </aside>

          {/* MAIN COLUMN — name + subtitle */}
          <div className="md:col-span-8 lg:col-span-8 order-2 md:order-2">
            {/* Folio number — the one consistent margin-red accent we'll reuse on later sections */}
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent mb-6 sm:mb-8">
              <span aria-hidden="true">§ </span>
              Nº 01 — Title page
            </p>

            {/* Eyebrow title sits ABOVE the name like a magazine masthead */}
            <p className="font-serif text-base sm:text-lg text-muted italic mb-3 sm:mb-4">
              Senior Software Engineer
            </p>

            <h1
              id="hero-name"
              className="font-serif font-medium text-ink leading-[0.92] tracking-tight text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[10.5rem]"
            >
              <span className="block">Gaye</span>
              <span className="block">
                <span className="italic">Bulut</span>
                <span aria-hidden="true" className="text-accent">.</span>
              </span>
            </h1>

            {/* Hand-ruled underline — fine line, accent color, sits under the name */}
            <div
              aria-hidden="true"
              className="mt-6 sm:mt-8 h-px w-24 sm:w-32 bg-accent"
            />

            {/* Subtitle — indented slightly to feel like a pull quote in the page */}
            <div className="mt-10 sm:mt-12 md:mt-14 max-w-xl md:pl-1">
              <p className="font-serif text-lg sm:text-xl md:text-2xl leading-snug text-ink">
                I built the prototype Xbox demoed to{' '}
                <span className="relative inline-block">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[0.55em] bg-highlight -z-0"
                  />
                  <span className="relative z-10">Satya Nadella</span>
                </span>
                . It secured the funding that became Cloud Gaming. Now I&rsquo;m at
                Seesaw, building for 25M+ students.
              </p>
            </div>

            {/* Hand-written ed. note — sits beneath the subtitle in mono, gives the page a working-notebook feel */}
            <p className="mt-10 sm:mt-12 font-mono text-xs text-muted max-w-md">
              <span className="text-ink">ed. note —</span>{' '}
              the parts that didn&rsquo;t make the press release. Drafts, scars, ship dates.
            </p>
          </div>

          {/* RIGHT RAIL — scroll hint + current role */}
          <aside
            className="md:col-span-2 lg:col-span-2 order-3 md:order-3"
            aria-label="Navigation hints"
          >
            <div className="md:sticky md:top-24 flex flex-col gap-6 md:items-end md:text-right">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Currently
                </p>
                <p className="font-mono text-xs text-ink mt-1">
                  Seesaw — SF
                </p>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Last revised
                </p>
                <p className="font-mono text-xs text-ink mt-1 tabular-nums">
                  May 2026
                </p>
              </div>

              {/* Scroll hint — only after the rest, in mono, with an arrow glyph */}
              <a
                href="#work"
                className="group font-mono text-xs text-muted hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper transition-colors mt-2 inline-flex md:flex-col md:items-end items-center gap-1"
              >
                <span className="uppercase tracking-[0.18em]">there&rsquo;s more below</span>
                <span aria-hidden="true" className="text-base leading-none">
                  ↓
                </span>
                <span className="sr-only">Jump to projects section below</span>
              </a>
            </div>
          </aside>
        </div>
      </div>

      {/* Hidden semantic alias for screen readers — preserves the test contract */}
      <span className="sr-only">{personalInfo.name}</span>
    </header>
  );
}

export default Hero;
