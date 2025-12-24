import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Github, Linkedin, ExternalLink, Mail, X } from 'lucide-react';
import seesawLogo from './assets/images/logos/seesawlogo.png';
import xcloudAward from './assets/images/photos/xcloud_award.jpg';
import wiredMagazine from './assets/images/photos/wired_magazine.png';
import wiredLogo from './assets/images/photos/wired_logo.png';
import msftLogo from './assets/images/photos/msft_logo.png';
import techradarLogo from './assets/images/photos/techradar_logo.png';
import geekwireLogo from './assets/images/photos/geekwire.png';
import pressSocial from './assets/images/photos/press_social.png';
import xcloudBooth from './assets/images/photos/xcloud_booth.jpeg';
import pressPhotoshoot from './assets/images/photos/press_photoshoot.jpg';

// Constants
const ANIMATION = {
  STAGGER_DELAY: 150,
  HERO_SUBTITLE_DELAY: 500,
  HERO_DESCRIPTION_DELAY: 700,
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

// Data
const personalInfo = {
  name: 'Gaye Bulut',
  title: 'Senior Software Engineer',
  email: 'gayegul@gmail.com',
  github: 'https://github.com/gayebulut?tab=overview&from=2025-12-01&to=2025-12-24',
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

function SectionHeader({ children }) {
  return (
    <FadeIn>
      <h2 className="text-sm sm:text-base font-semibold tracking-wider uppercase text-slate-400 mb-8 sm:mb-12">
        {children}
      </h2>
    </FadeIn>
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
    <img src={seesawLogo} alt="Seesaw" className="w-6 h-6 object-contain" />
  );
}

function EducationCard({ edu, index }) {
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
      aria-label="Main navigation"
      style={{
        zIndex: 40,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <div
        className="border-b px-4 sm:px-6"
        style={{
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(2, 6, 23, 0.8)',
          borderColor: 'rgba(30, 41, 59, 0.5)',
        }}
      >
        <div className="max-w-5xl mx-auto py-4 flex items-center justify-between">
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
                className="text-slate-400 hover:text-slate-100 focus-visible:text-slate-100 transition-colors"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-100 focus-visible:text-slate-100 transition-colors"
                aria-label="GitHub profile"
              >
                <Github className="w-5 h-5" />
              </a>

              <button
                onClick={copyEmailToClipboard}
                className="relative text-slate-400 hover:text-slate-100 focus-visible:text-slate-100 transition-colors"
                title={emailCopied ? 'Email copied!' : 'Copy email to clipboard'}
                aria-label={emailCopied ? 'Email copied!' : 'Copy email to clipboard'}
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
            <div className="max-w-5xl mx-auto py-4 space-y-4">
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
                  className="text-slate-400 hover:text-slate-100 focus-visible:text-slate-100 transition-colors"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-slate-100 focus-visible:text-slate-100 transition-colors"
                  aria-label="GitHub profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <button
                  onClick={copyEmailToClipboard}
                  className="relative text-slate-400 hover:text-slate-100 focus-visible:text-slate-100 transition-colors"
                  title={emailCopied ? 'Email copied!' : 'Copy email to clipboard'}
                  aria-label={emailCopied ? 'Email copied!' : 'Copy email to clipboard'}
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
                Founding engineer on Xbox Cloud Gaming. Built and presented the prototype to Satya Nadella that secured project funding. Now at Seesaw, building for 25M+ students across 1 in 3 US elementary schools.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={ANIMATION.HERO_DESCRIPTION_DELAY} direction="left" className="w-full lg:w-auto lg:flex-shrink-0">
            <a
              href="https://www.tomsguide.com/us/best-of-e3-2019,review-6571.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block max-w-[220px] mx-auto lg:mx-0 lg:max-w-[280px] rounded-2xl overflow-hidden border-2 border-slate-800 hover:border-teal-400 transition-all"
              style={{
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(20, 184, 166, 0.1)'
              }}
            >
              <img
                src={xcloudAward}
                alt="xCloud award recognition"
                className="w-full h-auto object-contain"
              />
            </a>
          </FadeIn>
        </div>
      </div>
    </header>
  );
}

function ExperienceSection() {
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

function Lightbox({ image, alt, isOpen, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
      style={{ zIndex: 9999 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-teal-400 focus-visible:text-teal-400 transition-colors"
        aria-label="Close image viewer"
      >
        <X className="w-8 h-8" />
      </button>
      <img
        src={image}
        alt={alt}
        className="max-w-full max-h-full object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

function Press() {
  const [lightboxImage, setLightboxImage] = useState(null);

  const pressItems = [
    { image: wiredMagazine, alt: "Wired Magazine - Xbox Cloud Gaming", title: "Wired", logo: wiredLogo, position: "left center", fit: "cover", url: "https://www.wired.com/story/xbox-cloud-gaming-exclusive/" },
    { image: pressSocial, alt: "Microsoft Blog - Project xCloud", title: "TechRadar", logo: techradarLogo, position: "top", background_color: "white", fit: "contain", url: "https://www.techradar.com/news/prototype-xbox-controllers-for-phones-and-tablets-show-up-in-research-papers" },
    { image: xcloudBooth, alt: "GeekWire - Project xCloud", title: "GeekWire", logo: geekwireLogo, position: "center", fit: "cover", url: "https://www.geekwire.com/2019/microsoft-will-bring-project-xcloud-game-streaming-service-windows-10-pcs/" },
    { image: pressPhotoshoot, alt: "Microsoft marketing photoshoot", title: "Microsoft Blog", logo: msftLogo, position: "center 15%", fit: "cover", url: "https://blogs.microsoft.com/blog/2018/10/08/project-xcloud-gaming-with-you-at-the-center/" },
  ];

  const handleImageClick = (item) => {
    setLightboxImage(item);
  };

  const handleTitleClick = (url, e) => {
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <section className="py-12 lg:py-16 px-4 sm:px-6" aria-label="Press coverage">
        <div className="max-w-5xl mx-auto">
          <SectionHeader>Press</SectionHeader>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {pressItems.map((item, index) => (
              <FadeIn key={index} delay={index * 100}>
                <div className="flex flex-col gap-2">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-slate-300 hover:text-teal-400 focus-visible:text-teal-400 transition-colors flex items-center gap-1.5"
                      onClick={(e) => handleTitleClick(item.url, e)}
                    >
                      {item.logo ? (
                        <img src={item.logo} alt={item.title} className="h-5 object-contain" />
                      ) : (
                        item.title
                      )}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div className="text-sm font-medium text-slate-300">
                      {item.logo ? (
                        <img src={item.logo} alt={item.title} className="h-5 object-contain" />
                      ) : (
                        item.title
                      )}
                    </div>
                  )}
                  <button
                    className="relative rounded-xl border-2 border-slate-800 hover:border-teal-400 focus-visible:border-teal-400 group cursor-pointer overflow-hidden transition-colors w-full"
                    style={{ backgroundColor: item.background_color || '#0f172a' }}
                    onClick={() => handleImageClick(item)}
                    aria-label={`View full image: ${item.alt}`}
                  >
                    <img
                      src={item.image}
                      alt=""
                      role="presentation"
                      className={`w-full h-56 object-${item.fit} transition-all duration-500`}
                      style={{ objectPosition: item.position }}
                    />
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        image={lightboxImage?.image}
        alt={lightboxImage?.alt}
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
    </>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-8 sm:py-12 px-4 sm:px-6" aria-label="About and education" style={{ scrollMarginTop: '5rem' }}>
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
              className="text-slate-500 hover:text-teal-400 focus-visible:text-teal-400 transition-colors"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-teal-400 focus-visible:text-teal-400 transition-colors"
              aria-label="GitHub profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-slate-500 hover:text-teal-400 focus-visible:text-teal-400 transition-colors text-sm"
              aria-label={`Email ${personalInfo.email}`}
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
        <HeroSectionWithPhoto />
        <ExperienceSection />
        <Press />
        <AboutSection />
        <Footer />
      </main>
    </div>
  );
}
