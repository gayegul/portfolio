import { personalInfo } from '../data/personalInfo';

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-spec flex flex-col gap-4 py-8 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-faint sm:flex-row sm:items-baseline sm:justify-between">
        <p>
          © {new Date().getFullYear()} {personalInfo.name}
        </p>
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent focus-visible:text-accent"
            aria-label="LinkedIn profile"
          >
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent focus-visible:text-accent"
            aria-label="GitHub profile"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="normal-case transition-colors hover:text-accent focus-visible:text-accent"
            aria-label={`Email ${personalInfo.email}`}
          >
            {personalInfo.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
