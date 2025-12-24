import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FadeIn } from './FadeIn';

describe('FadeIn', () => {
  beforeEach(() => {
    // Mock IntersectionObserver
    global.IntersectionObserver = vi.fn((callback) => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
      root: null,
      rootMargin: '',
      thresholds: [],
      takeRecords: () => [],
    })) as any;
  });

  it('renders children correctly', () => {
    render(
      <FadeIn>
        <div>Test content</div>
      </FadeIn>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies correct initial styles when not visible', () => {
    const { container } = render(
      <FadeIn>
        <div>Test content</div>
      </FadeIn>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle({ opacity: '0' });
  });

  it('applies custom className', () => {
    const { container } = render(
      <FadeIn className="custom-class">
        <div>Test content</div>
      </FadeIn>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('applies correct transform based on direction prop', () => {
    const { container: upContainer } = render(
      <FadeIn direction="up">
        <div>Up</div>
      </FadeIn>
    );
    const upWrapper = upContainer.firstChild as HTMLElement;
    expect(upWrapper.style.transform).toContain('translateY');

    const { container: downContainer } = render(
      <FadeIn direction="down">
        <div>Down</div>
      </FadeIn>
    );
    const downWrapper = downContainer.firstChild as HTMLElement;
    expect(downWrapper.style.transform).toContain('translateY');

    const { container: leftContainer } = render(
      <FadeIn direction="left">
        <div>Left</div>
      </FadeIn>
    );
    const leftWrapper = leftContainer.firstChild as HTMLElement;
    expect(leftWrapper.style.transform).toContain('translateX');

    const { container: rightContainer } = render(
      <FadeIn direction="right">
        <div>Right</div>
      </FadeIn>
    );
    const rightWrapper = rightContainer.firstChild as HTMLElement;
    expect(rightWrapper.style.transform).toContain('translateX');
  });

  it('applies delay to transition', () => {
    const { container } = render(
      <FadeIn delay={500}>
        <div>Delayed</div>
      </FadeIn>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle({ transitionDelay: '500ms' });
  });
});
