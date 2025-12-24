import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface LightboxProps {
  image?: string;
  alt?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function Lightbox({ image, alt, isOpen, onClose }: LightboxProps) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
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
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
