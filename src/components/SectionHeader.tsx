import React from 'react';
import { FadeIn } from './FadeIn';

interface SectionHeaderProps {
  children: React.ReactNode;
}

export function SectionHeader({ children }: SectionHeaderProps) {
  return (
    <FadeIn>
      <h2 className="text-sm sm:text-base font-semibold tracking-wider uppercase text-slate-400 mb-8 sm:mb-12">
        {children}
      </h2>
    </FadeIn>
  );
}
