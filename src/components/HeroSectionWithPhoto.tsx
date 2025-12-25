import { FadeIn } from './FadeIn';
import { personalInfo } from '../data/personalInfo';
import { ANIMATION } from '../constants/animation';
import xcloudAward from '../assets/images/photos/xcloud_award.jpg';

export function HeroSectionWithPhoto() {
  return (
    <header className="min-h-[30vh] lg:min-h-[60vh] flex items-center pt-16 sm:pt-20 px-4 sm:px-6 pb-4 lg:pb-0">
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">
          <div className="flex-1 w-full lg:max-w-2xl">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-slate-100 mb-3 sm:mb-4">
              {personalInfo.name}
            </h1>

            <FadeIn delay={ANIMATION.HERO_SUBTITLE_DELAY}>
              <p className="text-xl sm:text-2xl md:text-3xl text-slate-400 leading-relaxed mb-4 sm:mb-6">
                {personalInfo.title}
              </p>
            </FadeIn>

            <FadeIn delay={ANIMATION.HERO_DESCRIPTION_DELAY}>
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
                Founding engineer on Xbox Cloud Gaming. Built and presented the prototype to Satya
                Nadella that secured project funding. Now at Seesaw, building for 25M+ students
                across 1 in 3 US elementary schools.
              </p>
            </FadeIn>
          </div>

          <FadeIn
            delay={ANIMATION.HERO_DESCRIPTION_DELAY}
            direction="left"
            className="w-full lg:w-auto lg:flex-shrink-0"
          >
            <a
              href="https://www.tomsguide.com/us/best-of-e3-2019,review-6571.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block max-w-[220px] mx-auto lg:mx-0 lg:max-w-[280px] rounded-2xl overflow-hidden border-2 border-slate-800 hover:border-teal-400 transition-all shadow-photo"
            >
              <img
                src={xcloudAward}
                alt="xCloud award recognition"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </a>
          </FadeIn>
        </div>
      </div>
    </header>
  );
}
