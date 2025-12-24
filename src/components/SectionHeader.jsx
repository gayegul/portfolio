import React from 'react';
import PropTypes from 'prop-types';
import { FadeIn } from './FadeIn';

export function SectionHeader({ children }) {
  return (
    <FadeIn>
      <h2 className="text-sm sm:text-base font-semibold tracking-wider uppercase text-slate-400 mb-8 sm:mb-12">
        {children}
      </h2>
    </FadeIn>
  );
}

SectionHeader.propTypes = {
  children: PropTypes.node.isRequired,
};
