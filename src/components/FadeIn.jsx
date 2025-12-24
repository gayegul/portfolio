import React from 'react';
import PropTypes from 'prop-types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ANIMATION } from '../constants/animation';

export function FadeIn({ children, delay = 0, direction = 'up', className = '' }) {
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

FadeIn.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
  className: PropTypes.string,
};
