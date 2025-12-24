import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { BLOB_CONFIG, SPARKLE_COUNT } from '../constants/animation';

export function MorphingBackground({ scrollProgress }) {
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

MorphingBackground.propTypes = {
  scrollProgress: PropTypes.number.isRequired,
};
