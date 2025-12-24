import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';

export function Navigation({ isVisible }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const copyEmailToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
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

Navigation.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};
