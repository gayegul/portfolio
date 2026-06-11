import { SectionHeader } from './SectionHeader';
import { EducationCard } from './EducationCard';
import { education } from '../data/education';

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-nav border-t border-line pt-12 lg:pt-16"
      aria-label="About and education"
    >
      <div className="container-spec pb-12 lg:pb-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <SectionHeader>About</SectionHeader>
            <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-ink-muted sm:mt-8 sm:text-xl">
              Three degrees in engineering, then a pivot to software through a Microsoft
              apprenticeship. I&apos;ve owned things end-to-end ever since: specs, architecture,
              code, tests, deploys.
            </p>
          </div>

          <div id="education" className="scroll-mt-nav lg:col-span-6">
            <SectionHeader>Education</SectionHeader>
            <div className="mt-6 sm:mt-8">
              {education.map((edu) => (
                <EducationCard key={`${edu.degree}-${edu.field}`} edu={edu} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
