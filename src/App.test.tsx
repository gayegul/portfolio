import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';

describe('Portfolio App Integration', () => {
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
    await waitFor(() => {
      expect(screen.getByText(/Work/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('renders all main sections', async () => {
    render(<App />);

    // Wait for lazy-loaded components
    await waitFor(() => {
      // Work section
      expect(screen.getByText('Modernization & Design Systems')).toBeInTheDocument();

      // Press section (appears in nav and as heading)
      const pressElements = screen.getAllByText('Press');
      expect(pressElements.length).toBeGreaterThan(0);

      // About section (appears in nav and as heading)
      const aboutElements = screen.getAllByText('About');
      expect(aboutElements.length).toBeGreaterThan(0);

      // Education (appears in nav and as heading)
      const educationElements = screen.getAllByText('Education');
      expect(educationElements.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
  });

  it('renders project cards with correct data', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Modernization & Design Systems')).toBeInTheDocument();
      expect(screen.getByText('Internationalization')).toBeInTheDocument();
      expect(screen.getByText('Xbox Cloud Gaming (xCloud)')).toBeInTheDocument();
      expect(screen.getByText('Xbox Backwards Compatibility')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('renders education cards', async () => {
    render(<App />);

    await waitFor(() => {
      const mastersElements = screen.getAllByText("Master's");
      expect(mastersElements.length).toBeGreaterThan(0);
      const engineeringMgmt = screen.getAllByText('Engineering Management');
      expect(engineeringMgmt.length).toBeGreaterThan(0);
      const envEngElements = screen.getAllByText('Environmental Engineering');
      expect(envEngElements.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
  });

  it('includes social media links in footer', async () => {
    render(<App />);

    await waitFor(() => {
      const emailLinks = screen.getAllByText('gayegul@gmail.com');
      expect(emailLinks.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
  });
});
