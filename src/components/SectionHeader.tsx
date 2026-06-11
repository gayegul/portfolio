import React from 'react';

interface SectionHeaderProps {
  children: React.ReactNode;
}

export function SectionHeader({ children }: SectionHeaderProps) {
  return (
    <h2 className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-ink">{children}</h2>
  );
}
