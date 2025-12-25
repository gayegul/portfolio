import { FadeIn } from './FadeIn';
import { CompanyLogo } from './CompanyLogo';
import { ANIMATION } from '../constants/animation';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <FadeIn delay={index * ANIMATION.STAGGER_DELAY}>
      <article className="relative p-5 sm:p-8 rounded-xl sm:rounded-2xl border border-slate-border bg-slate-card transition-all duration-500 hover:-translate-y-1 hover:border-teal-400/30 group">
        <div className="absolute top-0 left-5 right-5 sm:left-8 sm:right-8 h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-3 sm:mb-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-slate-100 group-hover:text-teal-400 transition-colors">
            {project.name}
          </h3>
          <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 sm:gap-1">
            <a
              href={project.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-teal-400 transition-colors"
            >
              <span>{project.company}</span>
              <CompanyLogo company={project.company} />
            </a>
            <span className="text-sm text-slate-600 tabular-nums">{project.period}</span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-3 sm:mb-4">
          {project.description}
        </p>

        <p className="text-sm sm:text-base text-teal-400 font-medium flex items-center gap-2">
          <span>↳</span>
          <span>{project.impact}</span>
        </p>
      </article>
    </FadeIn>
  );
}
