import React from 'react';

interface SectionHeaderProps {
  children: React.ReactNode;
}

export function SectionHeader({ children }: SectionHeaderProps) {
  return (
    <h2 className="text-sm sm:text-base font-semibold tracking-wider uppercase text-slate-400 mb-8 sm:mb-12">
      {children}
    </h2>
  );
}
