import React from 'react';
import { SectionHeader } from './SectionHeader';
import { FadeIn } from './FadeIn';
import { EducationCard } from './EducationCard';
import { education } from '../data/education';

export function AboutSection() {
  return (
    <section id="about" className="py-8 sm:py-12 px-4 sm:px-6" aria-label="About and education" style={{ scrollMarginTop: '5rem' }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeader>About</SectionHeader>
        <div className="mb-12 sm:mb-16">
          <FadeIn>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed text-justify">
              Three degrees in engineering, then a pivot to software as an apprentice at Microsoft. Now, I own things end-to-end: specs, architecture, implementation, tests, deployment. I like solving problems, building, and shipping fast.
            </p>
          </FadeIn>
        </div>

        {/* Education Section */}
        <div id="education" style={{ scrollMarginTop: '5rem' }}>
          <SectionHeader>Education</SectionHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {education.map((edu, index) => (
              <EducationCard key={index} edu={edu} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
