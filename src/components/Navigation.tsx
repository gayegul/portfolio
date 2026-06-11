import React, { useState, useEffect, useCallback } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';

interface NavigationProps {
  isVisible: boolean;
}

const NAV_LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#press', label: 'Press' },
  { href: '#about', label: 'About' },
  { href: '#education', label: 'Education' },
];

export function Navigation({ isVisible }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [mobileMenuOpen]);

  const copyEmailToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  }, []);

  const scrollToTop = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState('', document.title, window.location.pathname + window.location.search);
  }, []);

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
      <div className="border-b border-line bg-ground/95">
        <div className="container-spec flex items-center justify-between py-4">
          <a
            href="#"
            onClick={scrollToTop}
            className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:text-accent"
          >
            <span className="inline-block h-2 w-2 bg-accent" aria-hidden="true" />
            {personalInfo.name}
          </a>

          {/* Desktop nav */}
          {!isMobile && (
            <div className="flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              ))}

              <a
                href="/Gaye_Bulut_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent transition-colors hover:text-ink"
                aria-label="View resume"
              >
                Resume <span aria-hidden="true">↗</span>
              </a>

              <span className="h-4 w-px bg-line" aria-hidden="true" />

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-muted hover:text-accent focus-visible:text-accent transition-colors"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-muted hover:text-accent focus-visible:text-accent transition-colors"
                aria-label="GitHub profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <button
                onClick={copyEmailToClipboard}
                className="relative text-ink-muted hover:text-accent focus-visible:text-accent transition-colors"
                title={emailCopied ? 'Email copied!' : 'Copy email to clipboard'}
                aria-label={emailCopied ? 'Email copied!' : 'Copy email to clipboard'}
              >
                <Mail className="w-4 h-4" />
                {emailCopied && (
                  <span
                    role="status"
                    aria-live="polite"
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.15em] text-accent"
                  >
                    Copied!
                  </span>
                )}
              </button>
            </div>
          )}

          {/* Mobile menu button */}
          {isMobile && (
            <button
              className="p-2 text-ink-muted hover:text-ink transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Mobile menu dropdown */}
        {isMobile && mobileMenuOpen && (
          <div className="border-t border-line">
            <div className="container-spec space-y-4 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block font-mono text-xs uppercase tracking-[0.18em] text-ink-muted transition-colors hover:text-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/Gaye_Bulut_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-mono text-xs uppercase tracking-[0.18em] text-accent transition-colors hover:text-ink"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="View resume"
              >
                Resume <span aria-hidden="true">↗</span>
              </a>
              <div className="flex items-center gap-4 pt-2">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-muted hover:text-accent focus-visible:text-accent transition-colors"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-muted hover:text-accent focus-visible:text-accent transition-colors"
                  aria-label="GitHub profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <button
                  onClick={copyEmailToClipboard}
                  className="relative text-ink-muted hover:text-accent focus-visible:text-accent transition-colors"
                  title={emailCopied ? 'Email copied!' : 'Copy email to clipboard'}
                  aria-label={emailCopied ? 'Email copied!' : 'Copy email to clipboard'}
                >
                  <Mail className="w-5 h-5" />
                  {emailCopied && (
                    <span
                      role="status"
                      aria-live="polite"
                      className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.15em] text-accent"
                    >
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
