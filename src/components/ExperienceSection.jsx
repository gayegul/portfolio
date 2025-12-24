import React from 'react';
import { SectionHeader } from './SectionHeader';
import { ProjectCard } from './ProjectCard';
import { projects } from '../data/projects';

export function ExperienceSection() {
  return (
    <section id="work" className="py-4 lg:py-16 px-4 sm:px-6" aria-label="Work experience" style={{ scrollMarginTop: '5rem' }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeader>Work</SectionHeader>
        <div className="grid gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
