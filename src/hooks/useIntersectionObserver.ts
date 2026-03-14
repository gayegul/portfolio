import { useState, useEffect, useRef, RefObject } from 'react';
import { INTERSECTION } from '../constants/animation';

export function useIntersectionObserver(
  threshold: number = INTERSECTION.THRESHOLD,
  rootMargin: string = INTERSECTION.ROOT_MARGIN
): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if element is already visible in viewport on mount
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
          clearTimeout(fallbackTimer);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    // Safety net: ensure visibility if observer never fires
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
      observer.disconnect();
    }, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}
