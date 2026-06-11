import { CountUp } from './CountUp';
import { personalInfo } from '../data/personalInfo';
import xcloudAward from '../assets/images/photos/xcloud_award.jpg';

const METRICS = [
  { target: 150000, suffix: '+', label: 'Servers managed' },
  { target: 25, suffix: 'M+', label: 'Users reached' },
  { target: 30, suffix: '+', label: 'Languages shipped' },
  { target: 10, suffix: '', label: 'Years shipping' },
];

export function HeroSectionWithPhoto() {
  return (
    <header className="pt-14 sm:pt-16 lg:pt-20">
      <div className="container-spec">
        <div className="flex flex-col gap-8 pb-8 sm:pb-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-3xl">
            <h1 className="rise rise-1 font-display font-extrabold uppercase leading-[0.9] text-ink text-[clamp(2.75rem,7vw,6rem)]">
              Gaye <span className="block">Bulut</span>
            </h1>

            <p className="rise rise-2 mt-4 font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-accent">
              {personalInfo.title}
            </p>

            <p className="rise rise-3 mt-4 max-w-xl font-sans text-base sm:text-lg leading-relaxed text-ink-muted">
              Founding engineer on Xbox Cloud Gaming. Built and presented the prototype to Satya
              Nadella that secured project funding. Now at Seesaw, building for 25M+ students across
              1 in 3 US elementary schools.
            </p>
          </div>

          <a
            href="https://www.tomsguide.com/us/best-of-e3-2019,review-6571.html"
            target="_blank"
            rel="noopener noreferrer"
            className="rise rise-4 group block w-full max-w-[260px] border border-line transition-colors hover:border-accent focus-visible:border-accent lg:w-[280px] lg:max-w-none xl:w-[320px] lg:flex-shrink-0"
          >
            <img
              src={xcloudAward}
              alt="Gaye Bulut at the xCloud booth receiving E3 2019 award recognition"
              className="block aspect-square w-full object-cover"
              loading="lazy"
            />
            <span className="flex items-center justify-between gap-2 border-t border-line px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint transition-colors group-hover:text-accent">
              <span>Fig. 01 — E3 2019</span>
              <span>Best of show ↗</span>
            </span>
          </a>
        </div>

        {/* Metric strip */}
        <dl className="rise rise-5 grid grid-cols-2 gap-px border-y border-line bg-line lg:grid-cols-4">
          {METRICS.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col-reverse bg-ground py-5 pr-4 sm:py-6 [&:nth-child(even)]:pl-5 sm:[&:nth-child(even)]:pl-8 lg:[&:not(:first-child)]:pl-8"
            >
              <dt className="mt-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-ink-faint">
                {metric.label}
              </dt>
              <dd className="font-display font-bold text-4xl sm:text-5xl xl:text-6xl leading-none text-ink">
                <CountUp target={metric.target} />
                {metric.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
