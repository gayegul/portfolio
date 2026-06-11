import { CompanyLogo } from './CompanyLogo';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="group border-t border-line">
      <div className="container-spec grid gap-y-4 py-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-5 lg:py-10">
        <span className="font-display text-2xl font-bold leading-none text-ink-faint transition-colors group-hover:text-accent lg:col-span-1 lg:pt-2">
          {String(index + 1).padStart(2, '0')}
        </span>

        <h3 className="font-sans text-2xl font-semibold leading-snug text-ink sm:text-3xl lg:col-span-8 lg:col-start-2">
          {project.name}
        </h3>

        {/* Meta — desktop right rail */}
        <div className="hidden font-mono text-xs text-ink-faint lg:col-span-3 lg:col-start-10 lg:flex lg:flex-col lg:items-end lg:gap-2 lg:pt-2 lg:text-right">
          <a
            href={project.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 uppercase tracking-[0.12em] transition-colors hover:text-accent focus-visible:text-accent"
          >
            <span>{project.company}</span>
            <CompanyLogo company={project.company} />
          </a>
          <span className="tabular-nums">{project.period}</span>
        </div>

        {/* Meta — mobile inline */}
        <a
          href={project.companyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint transition-colors hover:text-accent focus-visible:text-accent lg:hidden"
        >
          <CompanyLogo company={project.company} />
          <span>{project.company}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums normal-case">{project.period}</span>
        </a>

        <div className="lg:col-span-7 lg:col-start-2">
          <p className="max-w-xl font-sans text-base leading-relaxed text-ink-muted">
            {project.description}
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-accent sm:text-sm">
            <span aria-hidden="true">→ </span>
            {project.impact}
          </p>
        </div>
      </div>
    </article>
  );
}
