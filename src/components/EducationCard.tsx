import { Education } from '../data/education';

interface EducationCardProps {
  edu: Education;
}

export function EducationCard({ edu }: EducationCardProps) {
  return (
    <a
      href={edu.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid gap-1 border-t border-line py-4 last:border-b sm:grid-cols-12 sm:items-baseline sm:gap-4"
    >
      <span className="font-mono text-xs uppercase tracking-[0.15em] text-accent sm:col-span-3">
        {edu.degree}{' '}
        <span title={edu.country} aria-label={edu.country}>
          {edu.flag}
        </span>
      </span>

      <span className="font-sans text-base text-ink sm:col-span-4">{edu.field}</span>

      <span
        className="font-mono text-xs text-ink-faint transition-colors group-hover:text-accent sm:col-span-5"
        title={edu.schoolFull}
      >
        {edu.school} <span aria-hidden="true">↗</span>
      </span>
    </a>
  );
}
