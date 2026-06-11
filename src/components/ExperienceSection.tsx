import { SectionHeader } from './SectionHeader';
import { ProjectCard } from './ProjectCard';
import { projects } from '../data/projects';

export function ExperienceSection() {
  return (
    <section id="work" className="scroll-mt-nav pt-12 lg:pt-16" aria-label="Work experience">
      <div className="container-spec pb-6 sm:pb-8">
        <SectionHeader>Work</SectionHeader>
      </div>
      <div>
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
