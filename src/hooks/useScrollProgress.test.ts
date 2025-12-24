import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useScrollProgress } from './useScrollProgress';

describe('useScrollProgress', () => {
  beforeEach(() => {
    // Reset scroll position
    window.scrollY = 0;
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 2000,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 1000,
    });
  });

  it('returns 0 when at top of page', () => {
    const { result } = renderHook(() => useScrollProgress());
    expect(result.current).toBe(0);
  });

  it('returns 1 when scrolled to bottom', () => {
    const { result } = renderHook(() => useScrollProgress());

    act(() => {
      window.scrollY = 1000; // scrollHeight (2000) - innerHeight (1000) = 1000
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(1);
  });

  it('returns 0.5 when scrolled halfway', () => {
    const { result } = renderHook(() => useScrollProgress());

    act(() => {
      window.scrollY = 500;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(0.5);
  });

  it('clamps progress to max of 1', () => {
    const { result } = renderHook(() => useScrollProgress());

    act(() => {
      window.scrollY = 2000; // Beyond bottom
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(1);
  });
});
