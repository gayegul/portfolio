import React from 'react';
import PropTypes from 'prop-types';
import { ExternalLink } from 'lucide-react';
import { FadeIn } from './FadeIn';

export function EducationCard({ edu, index }) {
  return (
    <FadeIn delay={index * 100}>
      <a
        href={edu.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative p-3 sm:p-4 rounded-lg transition-all duration-300 hover:-translate-y-1 group block h-full"
        style={{
          backgroundColor: 'rgba(15, 23, 42, 0.5)',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'rgb(30, 41, 59)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(20, 184, 166, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgb(30, 41, 59)';
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm sm:text-base font-semibold text-teal-400">
            {edu.degree}
          </span>
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

EducationCard.propTypes = {
  edu: PropTypes.shape({
    degree: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    school: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    flag: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
