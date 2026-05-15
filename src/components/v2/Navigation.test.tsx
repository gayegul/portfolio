import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Navigation } from './Navigation';

describe('Navigation (v2 — running head)', () => {
  beforeEach(() => {
    // Mock IntersectionObserver — scrollspy depends on it.
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

  it('renders the section navigation landmark', () => {
    render(<Navigation />);
    expect(
      screen.getByRole('navigation', { name: /section navigation/i })
    ).toBeInTheDocument();
  });

  it('renders the Field Notes masthead pill linking to top', () => {
    render(<Navigation />);
    const masthead = screen.getByRole('link', { name: /back to top/i });
    expect(masthead).toHaveAttribute('href', '#top');
  });

  it('renders section links with the correct anchors', () => {
    render(<Navigation />);
    expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute('href', '#work');
    expect(screen.getByRole('link', { name: 'Press' })).toHaveAttribute('href', '#press');
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '#about');
  });

  it('renders a résumé link that opens the PDF in a new tab', () => {
    render(<Navigation />);
    const resumeLinks = screen.getAllByRole('link', { name: /résumé/i });
    expect(resumeLinks.length).toBeGreaterThan(0);
    expect(resumeLinks[0]).toHaveAttribute('href', '/Gaye_Bulut_Resume.pdf');
    expect(resumeLinks[0]).toHaveAttribute('target', '_blank');
    expect(resumeLinks[0]).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does NOT render an Education link (Education is footnotes in About)', () => {
    render(<Navigation />);
    expect(screen.queryByRole('link', { name: /^education$/i })).toBeNull();
  });

  it('toggles the mobile menu open and closed', () => {
    render(<Navigation />);
    const toggle = screen.getByRole('button', { name: /menu/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveTextContent(/close/i);

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveTextContent(/menu/i);
  });
});
