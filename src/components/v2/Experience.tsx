import xcloudAward from '../../assets/images/photos/xcloud_award.jpg';
import seesawLogo from '../../assets/images/logos/seesawlogo.png';
import { Chapter, Marginalia } from './Chapter';

/**
 * Experience — Section Nº 02. "Work."
 *
 * Four chapters in printed-essay order. Each is a Chapter (marginalia | body
 * | marginalia). The xCloud chapter is the marquee: it carries the award
 * photo that breaks the grid into the right rail, a pull quote, and the
 * full Satya story. Other chapters are quieter, text-forward.
 *
 * Design rules carried from Hero:
 *  - one bg-highlight phrase per chapter, on a payoff phrase
 *  - h-px bg-accent w-24 sm:w-32 dividers between chapters
 *  - italic on the trailing word of titles only where it reads naturally
 *  - no motion
 *
 * Notes for later chunks (Press, About):
 *  - chapter spacing primitive is `mt-24 md:mt-32` after the divider
 *  - photo-with-mono-caption pattern is reusable for Press
 */
export function Experience() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative px-4 sm:px-6 lg:px-10 pt-24 sm:pt-32 lg:pt-40 pb-24 sm:pb-32 scroll-mt-nav"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header — folio + serif heading, mirrors Hero's masthead */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-2" aria-hidden="true" />
          <div className="md:col-span-10">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent mb-6 sm:mb-8">
              <span aria-hidden="true">§ </span>
              Nº 02 — Work
            </p>

            <h2
              id="work-heading"
              className="font-serif font-medium text-ink leading-[0.95] tracking-tight text-5xl sm:text-6xl md:text-7xl"
            >
              Things I <span className="italic">built</span>
              <span aria-hidden="true" className="text-accent">.</span>
            </h2>

            <div
              aria-hidden="true"
              className="mt-6 sm:mt-8 h-px w-24 sm:w-32 bg-accent"
            />

            <p className="mt-8 sm:mt-10 font-serif italic text-base sm:text-lg text-muted max-w-xl">
              Four chapters. One marquee. The rest are quieter.
            </p>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────── */}
        {/* Chapter 1 — Seesaw, Modernization & Design Systems           */}
        {/* ─────────────────────────────────────────────────────────── */}
        <div className="mt-24 md:mt-32">
          <Chapter
            year="2023 — Now"
            place="Seesaw · SF"
            marginalia={
              <>
                <Marginalia label="Role" value="Senior eng." />
                <Marginalia
                  label="Impact"
                  value={
                    <span className="tabular-nums">
                      44 – 48% faster
                      <br />
                      page loads
                    </span>
                  }
                />
              </>
            }
          >
            <h3 className="font-serif font-medium text-ink leading-[1.0] tracking-tight text-3xl sm:text-4xl md:text-5xl">
              Modernization &amp; design <span className="italic">systems</span>
            </h3>
            <p className="mt-3 font-serif italic text-muted text-base sm:text-lg">
              at{' '}
              <a
                href="https://web.seesaw.me"
                className="text-muted underline decoration-muted/40 underline-offset-4 hover:text-accent hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Seesaw
              </a>
              {' '}— the K-12 learning platform.
            </p>

            <div className="mt-8 max-w-2xl space-y-5 font-serif text-base sm:text-lg leading-relaxed text-ink">
              <p>
                I rebuilt 2 of 4 core platform libraries from Angular and
                Jinja to React + TypeScript, and shipped a shared component
                library that the rest of the platform adopted. I led the
                rebrand rollout: new design system, palette, and typography,
                threaded through every library.
              </p>
              <p>
                The payoff was{' '}
                <span className="relative inline-block">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[0.55em] bg-highlight -z-0"
                  />
                  <span className="relative z-10">
                    44 – 48% faster page loads
                  </span>
                </span>{' '}
                across the product, for 25M+ students.
              </p>
            </div>
          </Chapter>
        </div>

        {/* divider — quiet, fine, accent */}
        <div className="mt-20 md:mt-28 flex md:pl-[16.6667%]">
          <div aria-hidden="true" className="h-px w-24 sm:w-32 bg-accent" />
        </div>

        {/* ─────────────────────────────────────────────────────────── */}
        {/* Chapter 2 — Seesaw, Internationalization                     */}
        {/* ─────────────────────────────────────────────────────────── */}
        <div className="mt-20 md:mt-28">
          <Chapter
            year="2023 — Now"
            place="Seesaw · SF"
            marginalia={
              <>
                <Marginalia label="Languages" value="30+" />
                <Marginalia label="Reach" value="130+ countries" />
                <div className="hidden md:block opacity-60">
                  <img
                    src={seesawLogo}
                    alt=""
                    aria-hidden="true"
                    className="h-6 w-auto ml-auto"
                  />
                </div>
              </>
            }
          >
            <h3 className="font-serif font-medium text-ink leading-[1.0] tracking-tight text-3xl sm:text-4xl md:text-5xl">
              Internationalization
            </h3>
            <p className="mt-3 font-serif italic text-muted text-base sm:text-lg">
              still at Seesaw — a year later, a different problem.
            </p>

            <div className="mt-8 max-w-2xl space-y-5 font-serif text-base sm:text-lg leading-relaxed text-ink">
              <p>
                I added i18n and RTL support across a mixed codebase of
                Jinja, Angular, React, and React Native. Full bidirectional
                support for{' '}
                <span className="relative inline-block">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[0.55em] bg-highlight -z-0"
                  />
                  <span className="relative z-10">
                    Arabic, Hebrew, and 30+ languages
                  </span>
                </span>
                .
              </p>
              <p>
                I also built admin features for K-12 standards so districts
                can track student progress against state benchmarks.
              </p>
            </div>
          </Chapter>
        </div>

        {/* divider */}
        <div className="mt-20 md:mt-28 flex md:pl-[16.6667%]">
          <div aria-hidden="true" className="h-px w-24 sm:w-32 bg-accent" />
        </div>

        {/* ─────────────────────────────────────────────────────────── */}
        {/* Chapter 3 — xCloud (marquee)                                 */}
        {/* ─────────────────────────────────────────────────────────── */}
        <div className="mt-20 md:mt-32">
          <Chapter
            year="2018 — 2022"
            place="Microsoft · Redmond"
            marginalia={
              <>
                <Marginalia label="Role" value="Founding eng." />
                <Marginalia
                  label="Scale"
                  value={
                    <span className="tabular-nums">
                      POC → global
                      <br />
                      150,000+ servers
                    </span>
                  }
                />
                <Marginalia label="Award" value="Best of E3 ’19" />
              </>
            }
          >
            <h3 className="font-serif font-medium text-ink leading-[1.0] tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Xbox Cloud <span className="italic">Gaming</span>
            </h3>
            <p className="mt-3 font-serif italic text-muted text-base sm:text-lg">
              at{' '}
              <a
                href="https://www.xbox.com/en-US/cloud-gaming"
                className="text-muted underline decoration-muted/40 underline-offset-4 hover:text-accent hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Microsoft
              </a>
              {' '}— internally codenamed xCloud.
            </p>

            <div className="mt-8 max-w-2xl space-y-5 font-serif text-base sm:text-lg leading-relaxed text-ink">
              <p>
                I came in as one of the first 10 engineers. I built the
                first player-facing prototype: a browser-based client that
                streamed a live Xbox session to a phone.
              </p>
              <p>
                Xbox demoed it to{' '}
                <span className="relative inline-block">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[0.55em] bg-highlight -z-0"
                  />
                  <span className="relative z-10">Satya Nadella</span>
                </span>
                , and that demo secured the funding that turned the internal
                project into the public Cloud Gaming product.
              </p>
            </div>

            {/* Photo — breaks the grid into the right rail */}
            <figure className="mt-12 md:mt-16 md:-mr-[28%] lg:-mr-[36%]">
              <div className="overflow-hidden bg-ink/5">
                <img
                  src={xcloudAward}
                  alt="Gaye Bulut at the Xbox booth holding the Tom's Guide Best of E3 2019 award, glowing green Xbox signage behind her."
                  className="block w-full h-auto"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Fig. 01 &nbsp;·&nbsp; xCloud booth, E3 — Los Angeles, June 2019.
              </figcaption>
            </figure>

            {/* Pull quote — oversized italic serif, indented, set apart */}
            <blockquote className="mt-12 md:mt-16 md:-ml-6 lg:-ml-10 border-l-2 border-accent pl-6 lg:pl-8 max-w-3xl">
              <p className="font-serif italic font-medium text-ink leading-[1.15] tracking-tight text-2xl sm:text-3xl md:text-4xl">
                &ldquo;I built the player-facing prototype that streamed a
                live Xbox session to a phone. Xbox demoed it to Satya. That
                demo secured the funding.&rdquo;
              </p>
              <footer className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                — Ed. note, on the day xCloud became a product.
              </footer>
            </blockquote>

            <div className="mt-12 max-w-2xl space-y-5 font-serif text-base sm:text-lg leading-relaxed text-ink">
              <p>
                As xCloud scaled, I moved to the backend. I shipped
                microservices for OS updates and server-pool management
                across the fleet — eventually 150,000+ servers, across
                regions, keeping the streaming infrastructure honest.
              </p>
              <p className="text-muted">
                It is still strange to walk past a stranger playing Halo on
                a phone in a coffee shop and remember the night the
                prototype finally streamed without dropping.
              </p>
            </div>
          </Chapter>
        </div>

        {/* divider */}
        <div className="mt-24 md:mt-32 flex md:pl-[16.6667%]">
          <div aria-hidden="true" className="h-px w-24 sm:w-32 bg-accent" />
        </div>

        {/* ─────────────────────────────────────────────────────────── */}
        {/* Chapter 4 — Backwards Compatibility                          */}
        {/* ─────────────────────────────────────────────────────────── */}
        <div className="mt-20 md:mt-28">
          <Chapter
            year="2016 — 2018"
            place="Microsoft · Redmond"
            marginalia={
              <>
                <Marginalia label="Role" value="Software eng." />
                <Marginalia
                  label="Reach"
                  value={
                    <span className="tabular-nums">
                      50% of Xbox One
                      <br />
                      players
                    </span>
                  }
                />
              </>
            }
          >
            <h3 className="font-serif font-medium text-ink leading-[1.0] tracking-tight text-3xl sm:text-4xl md:text-5xl">
              Backwards <span className="italic">Compatibility</span>
            </h3>
            <p className="mt-3 font-serif italic text-muted text-base sm:text-lg">
              also at Microsoft — the chapter before xCloud.
            </p>

            <div className="mt-8 max-w-2xl space-y-5 font-serif text-base sm:text-lg leading-relaxed text-ink">
              <p>
                I built the tooling that tracked game-title readiness for
                the Xbox backwards-compatibility program. The program
                became a fan favorite —{' '}
                <span className="relative inline-block">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[0.55em] bg-highlight -z-0"
                  />
                  <span className="relative z-10">
                    half of Xbox One players
                  </span>
                </span>{' '}
                ended up playing legacy games through it.
              </p>
            </div>
          </Chapter>
        </div>

        {/* End-of-section colophon — small, in the main column,
            tells the reader the section is done without a hard rule. */}
        <div className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-2" aria-hidden="true" />
          <div className="md:col-span-8">
            <div aria-hidden="true" className="h-px w-24 sm:w-32 bg-accent" />
            <p className="mt-6 font-mono text-xs text-muted max-w-md">
              <span className="text-ink">end of section —</span>{' '}
              the press, the about page, and the contact details continue overleaf.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
