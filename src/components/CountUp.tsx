import { useEffect, useRef, useState } from 'react';
import { ANIMATION } from '../constants/animation';

interface CountUpProps {
  target: number;
  duration?: number;
  formatter?: (n: number) => string;
}

export function CountUp({
  target,
  duration = ANIMATION.COUNT_UP_DURATION,
  formatter = (n) => n.toLocaleString('en-US'),
}: CountUpProps) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const reducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setValue(target);
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration]);

  return <>{formatter(value)}</>;
}
