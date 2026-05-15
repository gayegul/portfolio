import type { ReactNode } from 'react';

/**
 * About — Section Nº 04. "About this person."
 *
 * Dedication page of a memoir, not a LinkedIn About. The pivot story
 * (Environmental Engineering → software via a Microsoft apprenticeship)
 * is the spine.
 *
 *   col-span-2   left rail   (Filed / 2026 / personal, Currently / Seesaw — SF)
 *   col-span-8   main column (folio + heading + manifesto epigraph + prose +
 *                             numbered footnotes referencing Education)
 *   col-span-2   right rail  (Resume → download link)
 *
 * Inherited from Hero, Experience, Press:
 *  - § Nº 04 folio in accent
 *  - serif heading, italic on the trailing word
 *  - h-px w-24 sm:w-32 bg-accent rule under the heading
 *  - one bg-highlight phrase per section (on "Microsoft apprenticeship")
 *  - end-of-section colophon (accent rule + mono "end of section —" line)
 *  - margin annotations in accent-red mono, dry voice (no inspirational tone)
 *  - no motion
 *
 * Education is rendered as numbered footnotes referenced in the body
 * via <sup>[1]</sup> markers and listed below the prose in a `Notes` block.
 */

/**
 * Annotation — handwritten-style mono note in accent-red, pinned absolutely
 * on desktop, inline on mobile. Mirrors the Press primitive so About reads
 * as a continuation of the same notebook.
 */
interface AnnotationProps {
  children: ReactNode;
  /** Desktop-only positioning classes — e.g. "md:top-10 md:-right-6" */
  position?: string;
  rotate?: string;
}

function Annotation({
  children,
  position = '',
  rotate = 'md:-rotate-2',
}: AnnotationProps) {
  return (
    <p
      aria-hidden="true"
      className={`pointer-events-none font-mono text-xs text-accent leading-snug max-w-[16ch] ${rotate} md:absolute ${position} my-3 md:my-0`}
    >
      {children}
    </p>
  );
}

/**
 * FootnoteRef — small superscript marker in accent-red mono. Used inline in
 * the body prose to point at the matching entry in the Notes block below.
 * Implemented as a real anchor so keyboard/screen-reader users can jump.
 */
interface FootnoteRefProps {
  n: number;
}

function FootnoteRef({ n }: FootnoteRefProps) {
  return (
    <sup className="ml-0.5 align-super">
      <a
        href={`#about-fn-${n}`}
        id={`about-fnref-${n}`}
        className="font-mono text-[0.65em] text-accent hover:underline decoration-accent underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper tabular-nums"
        aria-label={`Footnote ${n}`}
      >
        [{n}]
      </a>
    </sup>
  );
}

/**
 * Footnote — a single entry in the Notes block at the bottom of the section.
 * Two-up layout: bracketed mono number on the left, mono small-caps detail
 * on the right.
 */
interface FootnoteProps {
  n: number;
  children: ReactNode;
}

function Footnote({ n, children }: FootnoteProps) {
  return (
    <li
      id={`about-fn-${n}`}
      className="grid grid-cols-[2.5rem_1fr] gap-3 sm:gap-4 items-baseline scroll-mt-nav"
    >
      <span className="font-mono text-xs text-accent tabular-nums">
        [{n}]
      </span>
      <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.16em] text-ink leading-relaxed">
        {children}
      </span>
    </li>
  );
}

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative px-4 sm:px-6 lg:px-10 pt-24 sm:pt-32 lg:pt-40 pb-24 sm:pb-32 scroll-mt-nav"
    >
      <div className="mx-auto max-w-7xl">
        {/* ─── Section header — mirrors Experience / Press ─── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-2" aria-hidden="true" />
          <div className="md:col-span-10">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent mb-6 sm:mb-8">
              <span aria-hidden="true">§ </span>
              Nº 04 — About
            </p>

            <h2
              id="about-heading"
              className="font-serif font-medium text-ink leading-[0.95] tracking-tight text-5xl sm:text-6xl md:text-7xl"
            >
              About this <span className="italic">person</span>
              <span aria-hidden="true" className="text-accent">.</span>
            </h2>

            <div
              aria-hidden="true"
              className="mt-6 sm:mt-8 h-px w-24 sm:w-32 bg-accent"
            />

            <p className="mt-8 sm:mt-10 font-serif italic text-base sm:text-lg text-muted max-w-xl">
              The dedication page. Read it like a letter, not a résumé.
            </p>
          </div>
        </div>

        {/* ─── Body — three-rail editorial layout ─── */}
        <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-8 lg:gap-x-12">

          {/* LEFT RAIL — filed / currently */}
          <aside
            className="md:col-span-2 order-1"
            aria-label="About metadata"
          >
            <div className="md:sticky md:top-24 flex flex-col gap-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Filed
                </p>
                <p className="font-mono text-xs text-ink mt-1 tabular-nums">
                  2026 / personal
                </p>
              </div>

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
                  Pronouns
                </p>
                <p className="font-mono text-xs text-ink mt-1">
                  she / her
                </p>
              </div>
            </div>
          </aside>

          {/* MAIN COLUMN — manifesto + prose + footnotes */}
          <div className="md:col-span-8 order-2 min-w-0 relative">

            {/* ── Manifesto bio — set like an epigraph ─────────────────── */}
            {/*
              Treated as a pulled-out dedication line. Thin accent rule on
              the left, indented, italic serif at oversized scale. The
              one bg-highlight phrase in the section sits on "Microsoft
              apprenticeship".
            */}
            <blockquote className="md:-ml-2 lg:-ml-4 border-l-2 border-accent pl-6 lg:pl-8 max-w-3xl">
              <p className="font-serif italic font-medium text-ink leading-[1.2] tracking-tight text-2xl sm:text-3xl md:text-4xl">
                Three engineering degrees, none in software. I pivoted in
                through a{' '}
                <span className="relative inline-block">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[0.55em] bg-highlight -z-0"
                  />
                  <span className="relative z-10">
                    Microsoft apprenticeship
                  </span>
                </span>{' '}
                in 2016, and I&rsquo;ve been shipping ever since: specs,
                architecture, code, tests, deploys. I like solving problems
                and shipping fast.
              </p>
              <footer className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                — manifesto, in one paragraph.
              </footer>
            </blockquote>

            {/* ── Expanded body prose — three short paragraphs ─────────── */}
            <div className="mt-14 md:mt-16 max-w-2xl space-y-6 font-serif text-base sm:text-lg leading-relaxed text-ink">
              <p>
                I grew up in Turkey and trained as an environmental engineer
                at METU<FootnoteRef n={1} /> — water systems, treatment
                plants, the slow grammar of physical infrastructure. I
                liked the rigor and I liked that the math had real-world
                consequences. After undergrad I moved to the US for grad
                school at New Mexico Tech and finished two master&rsquo;s
                degrees there: one in Environmental Engineering<FootnoteRef n={2} />,
                then a second in Engineering Management<FootnoteRef n={3} />{' '}
                because I wanted to understand how the work actually got
                shipped, not just designed.
              </p>

              <p>
                The pivot wasn&rsquo;t a clean arc. I had three engineering
                degrees and zero lines of production code on my résumé when
                Microsoft started an apprenticeship program for people
                without a software background. They bet on me. I spent my
                first months learning what the rest of the team treated as
                table stakes — version control, code review, how a service
                actually goes from a branch to a fleet. The scars from
                that year are the reason I still write the README before
                I write the code.
              </p>

              <p>
                From there it was six years at Microsoft —{' '}
                Backwards Compatibility first, then Xbox Cloud Gaming as
                one of the early engineers — and since 2023, Seesaw, where
                I work on the platform that millions of K-12 students see
                every day. The throughline isn&rsquo;t a stack or a domain.
                It&rsquo;s end-to-end ownership: writing the spec, drawing
                the architecture, shipping the code, owning what breaks at
                two in the morning, and being the one who explains why on
                Monday.
              </p>
            </div>

            {/* ── Notes — the Education block, as footnotes ────────────── */}
            <div className="mt-16 md:mt-20 max-w-2xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-5">
                Notes
              </p>
              <ol className="space-y-3" aria-label="Education footnotes">
                <Footnote n={1}>
                  Bachelor&rsquo;s · Environmental Engineering ·{' '}
                  <a
                    href="https://www.metu.edu.tr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-muted/40 underline-offset-2 hover:text-accent hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper transition-colors"
                  >
                    METU
                  </a>{' '}
                  · Ankara, Turkey
                </Footnote>
                <Footnote n={2}>
                  Master&rsquo;s · Environmental Engineering ·{' '}
                  <a
                    href="https://www.nmt.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-muted/40 underline-offset-2 hover:text-accent hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper transition-colors"
                  >
                    New Mexico Tech
                  </a>{' '}
                  · Socorro, NM
                </Footnote>
                <Footnote n={3}>
                  Master&rsquo;s · Engineering Management ·{' '}
                  <a
                    href="https://www.nmt.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-muted/40 underline-offset-2 hover:text-accent hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper transition-colors"
                  >
                    New Mexico Tech
                  </a>{' '}
                  · Socorro, NM
                </Footnote>
              </ol>
            </div>

            {/* ── Margin annotations — pinned in the rails on desktop ──── */}
            {/*
              Three short accent-red mono notes — same voice as Press.
              Honest, specific, dry. They sit absolutely positioned around
              the manifesto and the body so they read as hand-margin notes
              rather than chrome.
            */}
            <Annotation
              position="md:top-2 md:-right-24 lg:-right-36"
              rotate="md:-rotate-2"
            >
              → this is the part I&rsquo;m
              <br />
              still grateful for.
            </Annotation>

            <Annotation
              position="md:top-[20rem] md:-left-28 lg:-left-40"
              rotate="md:rotate-2"
            >
              ↓ field switch was harder
              <br />
              than it sounds.
            </Annotation>

            <Annotation
              position="md:bottom-[14rem] md:-right-20 lg:-right-32"
              rotate="md:rotate-1"
            >
              ← still the answer to
              <br />
              &ldquo;what do you do?&rdquo;
            </Annotation>
          </div>

          {/* RIGHT RAIL — résumé download */}
          <aside
            className="md:col-span-2 order-3"
            aria-label="Résumé"
          >
            <div className="md:sticky md:top-24 flex flex-col gap-6 md:items-end md:text-right">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Résumé
                </p>
                <a
                  href="/Gaye_Bulut_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex md:flex-col md:items-end items-center gap-1 font-mono text-xs text-ink hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper transition-colors"
                >
                  <span className="underline decoration-muted/40 underline-offset-4 hover:decoration-accent">
                    download (PDF)
                  </span>
                  <span aria-hidden="true" className="text-base leading-none">
                    →
                  </span>
                  <span className="sr-only">— opens PDF in a new tab</span>
                </a>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Last revised
                </p>
                <p className="font-mono text-xs text-ink mt-1 tabular-nums">
                  May 2026
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* ─── End-of-section colophon ─── */}
        <div className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-2" aria-hidden="true" />
          <div className="md:col-span-8">
            <div aria-hidden="true" className="h-px w-24 sm:w-32 bg-accent" />
            <p className="mt-6 font-mono text-xs text-muted max-w-md">
              <span className="text-ink">end of section —</span>{' '}
              the contact details continue overleaf.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
