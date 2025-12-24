import { useState, useEffect, useRef } from 'react';
import { INTERSECTION } from '../constants/animation';

export function useIntersectionObserver(
  threshold = INTERSECTION.THRESHOLD,
  rootMargin = INTERSECTION.ROOT_MARGIN
) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}
