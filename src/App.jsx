import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Github, Linkedin, ExternalLink, Mail } from 'lucide-react';

// Constants
const ANIMATION = {
  STAGGER_DELAY: 150,
  HERO_TITLE_DELAY: 200,
  HERO_SUBTITLE_DELAY: 500,
  HERO_DESCRIPTION_DELAY: 700,
  LETTER_STAGGER: 30,
  FADE_DURATION: 700,
  TRANSITION_DURATION: 300,
  NAV_SCROLL_THRESHOLD: 100,
};

const INTERSECTION = {
  THRESHOLD: 0.1,
  ROOT_MARGIN: '0px 0px -50px 0px',
};

const BLOB_CONFIG = [
  { size: 280, basePosition: { x: 75, y: 25 }, drift: { x: -20, y: 40 }, color: 'rgba(20, 184, 166, 0.12)', speed: 1, rotation: 360 },
  { size: 180, basePosition: { x: 20, y: 60 }, drift: { x: 30, y: -20 }, color: 'rgba(6, 182, 212, 0.1)', speed: 0.7, rotation: -180 },
  { size: 120, basePosition: { x: 85, y: 70 }, drift: { x: -40, y: 20 }, color: 'rgba(20, 184, 166, 0.15)', speed: 1.3, rotation: 270 },
  { size: 90, basePosition: { x: 10, y: 30 }, drift: { x: 20, y: 50 }, color: 'rgba(45, 212, 191, 0.08)', speed: 0.5, rotation: -90 },
  { size: 60, basePosition: { x: 60, y: 85 }, drift: { x: -10, y: -30 }, color: 'rgba(94, 234, 212, 0.12)', speed: 1.5, rotation: 180 },
];

const SPARKLE_COUNT = 8;

// Photo data - using placeholder colors to represent the actual images
// In production, these would be actual image URLs
const photos = {
  satya: {
    id: 'satya',
    caption: 'Before presenting xCloud POC to Satya Nadella',
    color: '#1a365d', // dark blue
  },
  e3Award: {
    id: 'e3Award',
    caption: "Best of E3 2019 — Tom's Guide",
    color: '#166534', // xbox green
  },
  xcloudBooth: {
    id: 'xcloudBooth', 
    caption: 'Project xCloud booth at E3',
    color: '#15803d',
  },
  launchDay: {
    id: 'launchDay',
    caption: 'xCloud Launch Day',
    color: '#6b7280',
  },
  photoshoot: {
    id: 'photoshoot',
    caption: 'Microsoft marketing photoshoot',
    color: '#d4d4d4',
  },
};

// Data
const personalInfo = {
  name: 'Gaye Bulut',
  title: 'Senior Software Engineer',
  email: 'gayegul@gmail.com',
  github: 'https://github.com/gayebulut',
  linkedin: 'https://www.linkedin.com/in/gayebulut/',
};

const projects = [
  {
    name: 'Modernization & Design Systems',
    company: 'Seesaw',
    companyUrl: 'https://web.seesaw.me',
    period: '2023 – Present',
    description:
      'Rebuilt 2 of 4 core platform libraries from Angular/Jinja to React + TypeScript. Created a shared component library adopted platform-wide. Led the company rebrand: new design system, color palette, and typography across all libraries.',
    impact: '44-48% faster page loads, 25M+ users',
  },
  {
    name: 'Internationalization',
    company: 'Seesaw',
    companyUrl: 'https://web.seesaw.me',
    period: '2023 – Present',
    description:
      'Added i18n and RTL support across a mixed codebase (Jinja, Angular, React, React Native). Full bidirectional support for Arabic, Hebrew, and 30+ languages. Built admin features for K-12 standards so districts can track student progress against state benchmarks.',
    impact: '30+ languages, 130+ countries',
  },
  {
    name: 'Xbox Cloud Gaming (xCloud)',
    company: 'Microsoft',
    companyUrl: 'https://www.xbox.com/en-US/cloud-gaming',
    period: '2018 – 2022',
    description:
      'One of the first 10 engineers. Built the first player-facing prototype, presented it to Satya Nadella, and that demo got us the budget to scale. As xCloud grew, I shifted to backend: microservices for OS updates and server pool management across the fleet.',
    impact: 'POC to global launch, 150,000+ servers',
  },
  {
    name: 'Xbox Backwards Compatibility',
    company: 'Microsoft',
    companyUrl: 'https://www.xbox.com',
    period: '2016 – 2018',
    description:
      'Built the tools that tracked game title readiness for Xbox backwards compatibility. The program became a fan favorite and half of Xbox One users played legacy games through it.',
    impact: '50% of Xbox One users played legacy games',
  },
];

const education = [
  {
    degree: "Master's",
    field: 'Engineering Management',
    school: 'New Mexico Tech',
    schoolFull: 'New Mexico Institute of Mining and Technology',
    country: 'US',
    flag: '🇺🇸',
    url: 'https://www.nmt.edu/',
  },
  {
    degree: "Master's",
    field: 'Environmental Engineering',
    school: 'New Mexico Tech',
    schoolFull: 'New Mexico Institute of Mining and Technology',
    country: 'US',
    flag: '🇺🇸',
    url: 'https://www.nmt.edu/',
  },
  {
    degree: "Bachelor's",
    field: 'Environmental Engineering',
    school: 'METU',
    schoolFull: 'Middle East Technical University',
    country: 'Turkey',
    flag: '🇹🇷',
    url: 'https://www.metu.edu.tr/',
  },
];

const LAYOUT_OPTIONS = {
  singleAbout: { name: 'Single in About', description: 'One photo in About section' },
  photoStrip: { name: 'Photo Strip', description: '4 photos in a row' },
  fullDivider: { name: 'Full Divider', description: 'Full-width between sections' },
  heroSide: { name: 'Hero + Side', description: 'Photo alongside your name' },
};

// Hooks
function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setProgress(Math.min(currentProgress, 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

function useIntersectionObserver(threshold = INTERSECTION.THRESHOLD, rootMargin = INTERSECTION.ROOT_MARGIN) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}

// Components
function MorphingBackground({ scrollProgress }) {
  const getBlobRadius = useCallback((seed, progress) => {
    const t = (progress * seed) % 1;
    const a = 40 + Math.sin(t * Math.PI * 2) * 15;
    const b = 60 - Math.cos(t * Math.PI * 2) * 20;
    const c = 50 + Math.sin(t * Math.PI * 2 + 1) * 15;
    const d = 45 - Math.cos(t * Math.PI * 2 + 1) * 10;
    return `${a}% ${100 - a}% ${b}% ${100 - b}% / ${c}% ${d}% ${100 - d}% ${100 - c}%`;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {BLOB_CONFIG.map((blob, index) => {
        const x = blob.basePosition.x + blob.drift.x * scrollProgress;
        const y = blob.basePosition.y + blob.drift.y * scrollProgress;
        const scale = 1 + Math.sin(scrollProgress * Math.PI) * 0.2;
        const rotation = scrollProgress * blob.rotation * blob.speed;

        return (
          <div
            key={index}
            className="absolute transition-all duration-1000 ease-out"
            style={{
              width: blob.size,
              height: blob.size,
              background: `radial-gradient(ellipse at 30% 30%, ${blob.color}, transparent 70%)`,
              borderRadius: getBlobRadius(index + 1, scrollProgress),
              left: `${x}%`,
              top: `${y}%`,
              transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
              filter: 'blur(1px)',
            }}
          />
        );
      })}

      {Array.from({ length: SPARKLE_COUNT }).map((_, index) => {
        const baseX = 15 + index * 12;
        const baseY = 20 + ((index * 37) % 60);
        const drift = Math.sin(scrollProgress * Math.PI * 2 + index) * 10;
        const opacity = 0.3 + Math.sin(scrollProgress * Math.PI * 3 + index) * 0.3;

        return (
          <div
            key={`sparkle-${index}`}
            className="absolute rounded-full transition-all duration-700"
            style={{
              width: 4 + (index % 3) * 2,
              height: 4 + (index % 3) * 2,
              backgroundColor: 'rgba(94, 234, 212, 0.3)',
              left: `${baseX + drift}%`,
              top: `${baseY + drift * 0.5}%`,
              opacity,
              boxShadow: '0 0 8px rgba(94, 234, 212, 0.4)',
            }}
          />
        );
      })}
    </div>
  );
}

function FadeIn({ children, delay = 0, direction = 'up', className = '' }) {
  const [ref, isVisible] = useIntersectionObserver();

  const transforms = {
    up: 'translateY(40px)',
    down: 'translateY(-40px)',
    left: 'translateX(40px)',
    right: 'translateX(-40px)',
  };

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0)' : transforms[direction],
        transitionDuration: `${ANIMATION.FADE_DURATION}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function AnimatedHeading({ children, as: Component = 'h1', delay = 0, className = '' }) {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <Component ref={ref} className={className}>
      {children.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block transition-all"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDuration: `${ANIMATION.TRANSITION_DURATION}ms`,
            transitionDelay: `${delay + index * ANIMATION.LETTER_STAGGER}ms`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Component>
  );
}

function SectionHeader({ children }) {
  return (
    <FadeIn>
      <h2 className="text-xs sm:text-sm font-medium tracking-widest uppercase text-slate-500 mb-8 sm:mb-12">
        {children}
      </h2>
    </FadeIn>
  );
}

// Photo placeholder component (replace with actual images in production)
function PhotoPlaceholder({ photo, className = '', showCaption = true, aspectRatio = 'aspect-square' }) {
  return (
    <div className={`relative overflow-hidden rounded-xl group ${className}`}>
      <div 
        className={`${aspectRatio} w-full flex items-center justify-center text-white text-xs p-4 text-center`}
        style={{ backgroundColor: photo.color }}
      >
        <div>
          <div className="text-2xl mb-2">📸</div>
          <div className="opacity-80">{photo.caption}</div>
        </div>
      </div>
      {showCaption && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-white text-xs">{photo.caption}</p>
        </div>
      )}
    </div>
  );
}

function CompanyLogo({ company }) {
  if (company === 'Microsoft') {
    return (
      <svg className="w-6 h-6" viewBox="0 0 23 23" fill="none">
        <rect x="1" y="1" width="10" height="10" fill="#f25022" />
        <rect x="12" y="1" width="10" height="10" fill="#7fba00" />
        <rect x="1" y="12" width="10" height="10" fill="#00a4ef" />
        <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
      </svg>
    );
  }

  return (
    <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#7c3aed' }}>
      <span className="text-white text-xs font-bold">S</span>
    </div>
  );
}

function EducationCard({ edu, index }) {
  return (
    <FadeIn delay={index * 100}>
      <a
        href={edu.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative p-4 rounded-lg transition-all duration-300 hover:-translate-y-1 group block h-full"
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
          <span className="text-base font-semibold text-teal-400">
            {edu.degree}
          </span>
          <span className="text-base" title={edu.country}>
            {edu.flag}
          </span>
        </div>
        
        <p className="text-sm font-medium text-slate-200 mb-1 leading-snug">
          {edu.field}
        </p>
        
        <p className="text-xs text-slate-400 group-hover:text-teal-400 transition-colors flex items-center gap-1">
          {edu.school}
          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        </p>
      </a>
    </FadeIn>
  );
}

function ProjectCard({ project, index }) {
  return (
    <FadeIn delay={index * ANIMATION.STAGGER_DELAY}>
      <article
        tabIndex={0}
        className="relative p-5 sm:p-8 rounded-xl sm:rounded-2xl border transition-all duration-500 hover:-translate-y-1 focus:outline-none group"
        style={{
          backgroundColor: 'rgba(15, 23, 42, 0.5)',
          borderColor: 'rgb(30, 41, 59)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(20, 184, 166, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgb(30, 41, 59)';
        }}
      >
        <div
          className="absolute top-0 left-5 right-5 sm:left-8 sm:right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(20, 184, 166, 0.5), transparent)',
          }}
        />

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
            <span className="text-sm text-slate-600" style={{ fontVariantNumeric: 'tabular-nums' }}>
              {project.period}
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-3 sm:mb-4">{project.description}</p>

        <p className="text-sm sm:text-base text-teal-400 font-medium flex items-center gap-2">
          <span>↳</span>
          <span>{project.impact}</span>
        </p>
      </article>
    </FadeIn>
  );
}

function Navigation({ isVisible }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };
  
  return (
    <nav
      className="fixed top-0 left-0 right-0 transition-all duration-300"
      style={{
        zIndex: 40,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <div
        className="border-b"
        style={{
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(2, 6, 23, 0.8)',
          borderColor: 'rgba(30, 41, 59, 0.5)',
        }}
      >
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <a
            href="#"
            className="text-base font-semibold text-slate-100 hover:text-teal-400 transition-colors"
          >
            {personalInfo.name}
          </a>

          {/* Desktop nav */}
          {!isMobile && (
            <div className="flex items-center gap-6">
              <a href="#work" className="text-sm text-slate-400 hover:text-slate-100 transition-colors">
                Work
              </a>
              
              <a href="#about" className="text-sm text-slate-400 hover:text-slate-100 transition-colors">
                About
              </a>
              
              <a href="#education" className="text-sm text-slate-400 hover:text-slate-100 transition-colors">
                Education
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-100 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-100 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>

              <button
                onClick={copyEmailToClipboard}
                className="relative text-slate-400 hover:text-slate-100 transition-colors"
                title={emailCopied ? 'Email copied!' : 'Copy email to clipboard'}
              >
                <Mail className="w-5 h-5" />
                {emailCopied && (
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-teal-400 whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </button>
            </div>
          )}

          {/* Mobile menu button */}
          {isMobile && (
            <button
              className="p-2 text-slate-400 hover:text-slate-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Mobile menu dropdown */}
        {isMobile && mobileMenuOpen && (
          <div className="border-t border-slate-800">
            <div className="px-4 py-4 space-y-4">
              <a 
                href="#work" 
                className="block text-slate-300 hover:text-teal-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Work
              </a>
              <a 
                href="#about" 
                className="block text-slate-300 hover:text-teal-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#education" 
                className="block text-slate-300 hover:text-teal-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Education
              </a>
              <div className="flex items-center gap-4 pt-2">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-slate-100 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-slate-100 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <button
                  onClick={copyEmailToClipboard}
                  className="relative text-slate-400 hover:text-slate-100 transition-colors"
                  title={emailCopied ? 'Email copied!' : 'Copy email to clipboard'}
                >
                  <Mail className="w-5 h-5" />
                  {emailCopied && (
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-teal-400 whitespace-nowrap">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Layout Option A: Hero with side photo
function HeroSectionWithPhoto() {
  return (
    <header className="min-h-[60vh] flex items-center pt-20 px-6">
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-12">
          <div className="flex-1">
            <AnimatedHeading
              as="h1"
              delay={ANIMATION.HERO_TITLE_DELAY}
              className="text-6xl md:text-8xl font-bold tracking-tight text-slate-100 mb-4"
            >
              {personalInfo.name}
            </AnimatedHeading>

            <FadeIn delay={ANIMATION.HERO_SUBTITLE_DELAY}>
              <p className="text-2xl md:text-3xl text-slate-400 max-w-2xl leading-relaxed mb-6">
                {personalInfo.title}
              </p>
            </FadeIn>

            <FadeIn delay={ANIMATION.HERO_DESCRIPTION_DELAY}>
              <p className="text-lg text-slate-500 max-w-xl leading-relaxed">
                Currently at Seesaw, building for 1 in 3 US elementary schools. Previously founding engineer on Xbox Cloud Gaming.
              </p>
            </FadeIn>
          </div>
          
          <FadeIn delay={ANIMATION.HERO_DESCRIPTION_DELAY} direction="left" className="hidden lg:block">
            <div className="w-64 h-64 rounded-2xl overflow-hidden border-2 border-slate-800">
              <PhotoPlaceholder photo={photos.e3Award} showCaption={false} aspectRatio="aspect-square" />
            </div>
          </FadeIn>
        </div>
      </div>
    </header>
  );
}

// Layout Option B: Standard hero (no photo)
function HeroSection() {
  return (
    <header className="min-h-[50vh] sm:min-h-[60vh] flex items-center pt-16 sm:pt-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto w-full">
        <AnimatedHeading
          as="h1"
          delay={ANIMATION.HERO_TITLE_DELAY}
          className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-slate-100 mb-3 sm:mb-4"
        >
          {personalInfo.name}
        </AnimatedHeading>

        <FadeIn delay={ANIMATION.HERO_SUBTITLE_DELAY}>
          <p className="text-xl sm:text-2xl md:text-3xl text-slate-400 max-w-2xl leading-relaxed mb-4 sm:mb-6">
            {personalInfo.title}
          </p>
        </FadeIn>

        <FadeIn delay={ANIMATION.HERO_DESCRIPTION_DELAY}>
          <p className="text-base sm:text-lg text-slate-500 max-w-xl leading-relaxed">
            Currently at Seesaw, building for 1 in 3 US elementary schools. Previously founding engineer on Xbox Cloud Gaming.
          </p>
        </FadeIn>
      </div>
    </header>
  );
}

// Photo Strip Component
function PhotoStrip() {
  const stripPhotos = [photos.satya, photos.xcloudBooth, photos.e3Award, photos.launchDay];

  return (
    <FadeIn>
      <div className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stripPhotos.map((photo, index) => (
              <PhotoPlaceholder
                key={photo.id}
                photo={photo}
                className="transform hover:scale-105 transition-transform duration-300"
                aspectRatio="aspect-[4/3]"
              />
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

// Full Width Divider Photo
function FullWidthDivider() {
  return (
    <FadeIn>
      <div className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden" style={{ height: '300px' }}>
            <div 
              className="absolute inset-0 flex items-center justify-center text-white"
              style={{ backgroundColor: photos.satya.color }}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">📸</div>
                <div className="text-xl font-medium mb-2">Before presenting xCloud to Satya Nadella</div>
                <div className="text-sm opacity-70">The demo that got us the budget to scale</div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function ExperienceSection() {
  return (
    <section id="work" className="py-12 sm:py-16 px-4 sm:px-6" style={{ scrollMarginTop: '5rem' }}>
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

// About Section with Single Photo
function AboutSectionWithPhoto() {
  return (
    <section id="about" className="py-16 px-6" style={{ scrollMarginTop: '5rem' }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeader>About</SectionHeader>
        
        <div className="flex gap-12 items-start">
          <div className="flex-1">
            <FadeIn>
              <p className="text-xl text-slate-300 leading-relaxed mb-12">
                Three degrees in engineering, then a pivot to software as an apprentice at Microsoft. Now, I own things end-to-end: specs, architecture, implementation, tests, deployment. I like solving problems, building, and shipping fast.
              </p>
            </FadeIn>
            
            {/* Education Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {education.map((edu, index) => (
                <EducationCard key={index} edu={edu} index={index} />
              ))}
            </div>
          </div>
          
          <FadeIn direction="left" className="hidden lg:block flex-shrink-0">
            <div className="w-72">
              <PhotoPlaceholder 
                photo={photos.satya} 
                aspectRatio="aspect-[3/4]"
                className="rounded-2xl"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// About Section Standard
function AboutSection() {
  return (
    <section id="about" className="py-8 sm:py-12 px-4 sm:px-6" style={{ scrollMarginTop: '5rem' }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeader>About</SectionHeader>
        <div className="max-w-2xl mb-12 sm:mb-16">
          <FadeIn>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
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

function LayoutSelector({ currentLayout, onLayoutChange }) {
  return (
    <div 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 p-4 rounded-2xl border"
      style={{ 
        zIndex: 100, 
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        borderColor: 'rgb(51, 65, 85)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <span className="text-xs text-slate-500 uppercase tracking-wide">Photo Layout</span>
      <div className="flex gap-2">
        {Object.entries(LAYOUT_OPTIONS).map(([key, { name }]) => (
          <button
            key={key}
            onClick={() => onLayoutChange(key)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
              currentLayout === key
                ? 'bg-teal-500 text-slate-950'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-slate-800">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} {personalInfo.name}
          </p>
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-teal-400 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-teal-400 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-slate-500 hover:text-teal-400 transition-colors text-sm"
            >
              {personalInfo.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  const scrollProgress = useScrollProgress();
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavVisible(window.scrollY > ANIMATION.NAV_SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-slate-100" style={{ backgroundColor: '#020617' }}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-teal-500 focus:text-slate-950 focus:rounded-lg"
        style={{ zIndex: 50 }}
      >
        Skip to main content
      </a>

      <Navigation isVisible={navVisible} />

      <MorphingBackground scrollProgress={scrollProgress} />

      <main id="main-content" className="relative" style={{ zIndex: 10 }}>
        <HeroSection />
        <ExperienceSection />
        <AboutSection />
        <Footer />
      </main>
    </div>
  );
}
