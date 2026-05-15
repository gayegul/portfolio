import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CountUp } from './CountUp';

/**
 * Reduced-motion smoke test for the single animated bit in the v2 design.
 *
 * We mock `matchMedia` to return `matches: true` for
 * `(prefers-reduced-motion: reduce)`. Per the component's contract, that
 * branch should render the final value (`to` + `suffix`) immediately —
 * no rAF tick, no count animation. This guarantees we never accidentally
 * regress the accessibility path.
 */
describe('CountUp (reduced motion)', () => {
  beforeEach(() => {
    // Force reduced-motion = true for every matchMedia call in this suite.
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes('prefers-reduced-motion'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    // IntersectionObserver isn't used on the reduced-motion path's initial
    // state, but other code paths construct one — keep the global stub sane.
    global.IntersectionObserver = vi.fn(() => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
      root: null,
      rootMargin: '',
      thresholds: [],
      takeRecords: () => [],
    })) as unknown as typeof IntersectionObserver;
  });

  it('renders the final value immediately when prefers-reduced-motion is set', () => {
    render(<CountUp to={25} suffix="M+" />);

    // The sr-only span always carries the final value — assert it's there
    // for screen readers regardless of motion preference.
    expect(screen.getByText('25M+', { selector: '.sr-only' })).toBeInTheDocument();

    // On the reduced-motion path the visible (aria-hidden) span should
    // already show the final value on first render — no "0M+" intermediate.
    const visible = document.querySelector('[aria-hidden="true"]');
    expect(visible?.textContent).toBe('25M+');
  });

  it('respects the suffix prop and renders integer + suffix together', () => {
    render(<CountUp to={42} suffix="x" />);
    const visible = document.querySelector('[aria-hidden="true"]');
    expect(visible?.textContent).toBe('42x');
  });
});
