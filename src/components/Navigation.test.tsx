import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navigation } from './Navigation';

describe('Navigation', () => {
  it('renders navigation links when visible', () => {
    render(<Navigation isVisible={true} />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Gaye Bulut')).toBeInTheDocument();
  });

  it('does not render when isVisible is false', () => {
    const { container } = render(<Navigation isVisible={false} />);
    const nav = container.querySelector('nav');

    expect(nav).toHaveStyle({ opacity: '0' });
    expect(nav).toHaveStyle({ pointerEvents: 'none' });
  });

  it('renders section navigation links', () => {
    render(<Navigation isVisible={true} />);

    expect(screen.getByText('Work')).toHaveAttribute('href', '#work');
    expect(screen.getByText('About')).toHaveAttribute('href', '#about');
    expect(screen.getByText('Education')).toHaveAttribute('href', '#education');
  });

  it('renders social links with correct attributes', () => {
    render(<Navigation isVisible={true} />);

    const linkedinLinks = screen.getAllByLabelText('LinkedIn profile');
    expect(linkedinLinks[0]).toHaveAttribute('href', expect.stringContaining('linkedin.com'));
    expect(linkedinLinks[0]).toHaveAttribute('target', '_blank');
    expect(linkedinLinks[0]).toHaveAttribute('rel', 'noopener noreferrer');

    const githubLinks = screen.getAllByLabelText('GitHub profile');
    expect(githubLinks[0]).toHaveAttribute('href', expect.stringContaining('github.com'));
  });

  it('copies email to clipboard when email button clicked', async () => {
    const mockClipboard = {
      writeText: vi.fn().mockResolvedValue(undefined),
    };
    Object.assign(navigator, { clipboard: mockClipboard });

    render(<Navigation isVisible={true} />);

    const emailButtons = screen.getAllByLabelText(/Copy email to clipboard/i);

    await act(async () => {
      fireEvent.click(emailButtons[0]);
      await Promise.resolve(); // Wait for async clipboard operation
    });

    expect(mockClipboard.writeText).toHaveBeenCalledWith('gayegul@gmail.com');
  });
});
