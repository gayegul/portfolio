import { ExternalLink } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { Education } from '../data/education';

interface EducationCardProps {
  edu: Education;
  index: number;
}

export function EducationCard({ edu, index }: EducationCardProps) {
  return (
    <FadeIn delay={index * 100}>
      <a
        href={edu.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative p-3 sm:p-4 rounded-lg border border-slate-border bg-slate-card transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/40 group block h-full"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm sm:text-base font-semibold text-teal-400">{edu.degree}</span>
          <span className="text-sm sm:text-base" title={edu.country}>
            {edu.flag}
          </span>
        </div>

        <p className="text-xs sm:text-sm font-medium text-slate-200 mb-1 leading-snug">
          {edu.field}
        </p>

        <p className="text-[11px] sm:text-xs text-slate-400 group-hover:text-teal-400 transition-colors flex items-center gap-1">
          {edu.school}
          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        </p>
      </a>
    </FadeIn>
  );
}
