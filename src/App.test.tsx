import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';

describe('Portfolio App Integration', () => {
  beforeEach(() => {
    // Mock IntersectionObserver
    global.IntersectionObserver = vi.fn(() => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
      root: null,
      rootMargin: '',
      thresholds: [],
      takeRecords: () => [],
    })) as unknown as typeof IntersectionObserver;

    // Reset window scroll
    window.scrollY = 0;
  });

  it('renders without crashing', () => {
    render(<App />);
    const names = screen.getAllByText('Gaye Bulut');
    expect(names.length).toBeGreaterThan(0);
  });

  it('renders hero section with name and title', () => {
    render(<App />);

    const names = screen.getAllByText('Gaye Bulut');
    expect(names.length).toBeGreaterThan(0);
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
  });

  it('renders skip to main content link for accessibility', () => {
    render(<App />);

    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('lazy loads sections with Suspense fallback', async () => {
    render(<App />);

    // Hero should be visible immediately (eager loaded)
    const names = screen.getAllByText('Gaye Bulut');
    expect(names.length).toBeGreaterThan(0);

    // Lazy loaded sections should appear after Suspense resolves
    await waitFor(
      () => {
        expect(screen.getByText(/Work/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('renders all main sections', async () => {
    render(<App />);

    // Wait for lazy-loaded components
    await waitFor(
      () => {
        // Work section — chapter heading is split across spans for italic styling
        const headings = screen.getAllByRole('heading');
        expect(
          headings.some((h) =>
            /Modernization\s*&\s*design\s*systems/i.test(h.textContent ?? '')
          )
        ).toBe(true);

        // Press section (appears in nav and as heading)
        const pressElements = screen.getAllByText('Press');
        expect(pressElements.length).toBeGreaterThan(0);

        // About section (appears in nav and as heading)
        const aboutElements = screen.getAllByText('About');
        expect(aboutElements.length).toBeGreaterThan(0);

        // Education (appears in nav and as heading)
        const educationElements = screen.getAllByText('Education');
        expect(educationElements.length).toBeGreaterThan(0);
      },
      { timeout: 3000 }
    );
  });

  it('renders project cards with correct data', async () => {
    render(<App />);

    await waitFor(
      () => {
        // Chapter headings are split across spans for editorial italic styling,
        // so check by combined textContent on each heading element.
        const headings = screen.getAllByRole('heading');
        const headingText = headings.map((h) => h.textContent ?? '');
        expect(
          headingText.some((t) => /Modernization\s*&\s*design\s*systems/i.test(t))
        ).toBe(true);
        expect(headingText.some((t) => /Internationalization/.test(t))).toBe(true);
        expect(headingText.some((t) => /Xbox\s*Cloud\s*Gaming/i.test(t))).toBe(true);
        expect(headingText.some((t) => /Backwards\s*Compatibility/i.test(t))).toBe(true);
      },
      { timeout: 3000 }
    );
  });

  it('renders education cards', async () => {
    render(<App />);

    await waitFor(
      () => {
        // Education appears as numbered footnotes in About — the degree/field
        // text is split across nodes inside <Footnote>, so match by combined
        // textContent of the list items. Curly apostrophe is used in copy.
        const fnItems = Array.from(document.querySelectorAll('li[id^="about-fn-"]'));
        expect(fnItems.length).toBeGreaterThan(0);
        const fnText = fnItems.map((li) => li.textContent ?? '').join(' | ');
        expect(/Master(?:'|’)s/.test(fnText)).toBe(true);
        expect(fnText).toMatch(/Engineering Management/);
        expect(fnText).toMatch(/Environmental Engineering/);
      },
      { timeout: 3000 }
    );
  });

  it('includes social media links in footer', async () => {
    render(<App />);

    await waitFor(
      () => {
        const emailLinks = screen.getAllByText('gayegul@gmail.com');
        expect(emailLinks.length).toBeGreaterThan(0);
      },
      { timeout: 3000 }
    );
  });
});
