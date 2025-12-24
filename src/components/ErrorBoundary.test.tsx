import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';

const ThrowError = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  // Suppress console.error for these tests
  const originalError = console.error;
  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalError;
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders error UI when child component throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText('Refresh Page')).toBeInTheDocument();
  });

  it('logs error to console', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('provides refresh button that reloads page', () => {
    const mockReload = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true,
    });

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const refreshButton = screen.getByText('Refresh Page');
    refreshButton.click();

    expect(mockReload).toHaveBeenCalled();
  });
});
