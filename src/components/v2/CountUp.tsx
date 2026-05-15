import { useEffect, useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

/**
 * CountUp — the single intentional bit of motion in the v2 design.
 *
 * Animates a number from 0 → `to` the first time the element scrolls into
 * view, then settles there permanently. Used on the "25M+ students" stat
 * inside the Seesaw chapter — the only place in the Field Notes layout
 * where we let the page move.
 *
 * Design rules:
 *  - Trigger once. `useIntersectionObserver` disconnects on first fire, so
 *    a subsequent scroll back into view does NOT re-animate.
 *  - rAF-driven with an ease-out cubic — fast start, settles slowly. Feels
 *    like an odometer landing, not a CSS tween.
 *  - Duration ~1.6s — slightly longer than feels natural on purpose.
 *  - `tabular-nums` so width doesn't shift digit-by-digit.
 *  - Respects `prefers-reduced-motion`: render the final value immediately.
 *  - Accessibility: an sr-only span carries the final value so screen
 *    readers don't read intermediate ticks. The visible span is
 *    `aria-hidden`.
 *
 * The visible text format is `${value}${suffix}` (e.g. `25M+`). `value`
 * is integer-only — fractional millions aren't load-bearing here.
 */
interface CountUpProps {
  /** Final integer to count up to (e.g. 25 for "25M+"). */
  to: number;
  /** String appended after the integer (e.g. "M+"). Always rendered. */
  suffix?: string;
  /** Animation duration in milliseconds. Default 1600 (≈ odometer settling). */
  durationMs?: number;
  /** Optional className forwarded to the visible span. */
  className?: string;
}

/** Cubic ease-out — fast at the start, slow at the end. */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Detect prefers-reduced-motion. Guarded for safety even though Vite SSRs nothing. */
function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

export function CountUp({
  to,
  suffix = '',
  durationMs = 1600,
  className = '',
}: CountUpProps) {
  const [ref, isVisible] = useIntersectionObserver<HTMLSpanElement>();
  const [value, setValue] = useState<number>(() => (prefersReducedMotion() ? to : 0));

  useEffect(() => {
    if (!isVisible) return;
    if (prefersReducedMotion()) {
      setValue(to);
      return;
    }

    let rafId = 0;
    let cancelled = false;
    const start = performance.now();

    const tick = (now: number) => {
      if (cancelled) return;
      const elapsed = now - start;
      const t = Math.min(1, elapsed / durationMs);
      const eased = easeOutCubic(t);
      const next = Math.round(eased * to);
      setValue(next);
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        // Pin the exact final value in case rounding drifted.
        setValue(to);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [isVisible, to, durationMs]);

  const display = `${value}${suffix}`;
  const finalDisplay = `${to}${suffix}`;

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      <span aria-hidden="true" aria-live="off">
        {display}
      </span>
      <span className="sr-only">{finalDisplay}</span>
    </span>
  );
}

export default CountUp;
