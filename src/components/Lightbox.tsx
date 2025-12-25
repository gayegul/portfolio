import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface LightboxProps {
  image?: string;
  alt?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function Lightbox({ image, alt, isOpen, onClose }: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      // Store the currently focused element
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Focus the close button
      setTimeout(() => closeButtonRef.current?.focus(), 0);

      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';

      // Hide main content from screen readers
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.setAttribute('aria-hidden', 'true');
      }
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';

      // Restore focus to previous element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }

      // Restore main content visibility to screen readers
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.removeAttribute('aria-hidden');
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm z-[9999]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      <button
        ref={closeButtonRef}
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-teal-400 focus-visible:text-teal-400 transition-colors"
        aria-label="Close image viewer"
      >
        <X className="w-8 h-8" />
      </button>
      <img
        src={image}
        alt={alt}
        className="max-w-full max-h-full object-contain"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      />
    </div>
  );
}
