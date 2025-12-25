import { Github, Linkedin } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';

export function Footer() {
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
