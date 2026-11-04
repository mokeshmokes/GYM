'use client';

import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface LightboxItem {
  image: string;
  alt?: string;
  caption?: string;
  title?: string;
}

interface LightboxModalProps {
  isOpen: boolean;
  items: LightboxItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function LightboxModal({
  isOpen,
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxModalProps) {
  const currentItem = items[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentItem) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-8"
      onClick={onClose}
    >
      {/* Screen-level Close button (fixed top-right) */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-neutral-900/90 border border-gold-500/40 text-neutral-300 hover:text-gold-400 hover:border-gold-400 flex items-center justify-center transition-all z-50 shadow-xl shadow-black/80"
        aria-label="Close Popup"
        title="Close (Esc)"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Medium Popup Container - dynamically fits image aspect ratio */}
      <div
        className="relative inline-flex flex-col items-center justify-center max-w-[92vw] sm:max-w-[80vw] md:max-w-xl lg:max-w-2xl max-h-[72vh] z-40"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Box-corner Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 sm:-top-3.5 sm:-right-3.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-900 border border-gold-500/80 text-gold-400 hover:text-white hover:border-gold-300 hover:scale-110 flex items-center justify-center transition-all z-50 shadow-lg shadow-black"
          aria-label="Close"
          title="Close"
        >
          <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>

        {/* Prev Navigation Button */}
        {items.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-900/95 border border-gold-500/60 text-gold-400 hover:text-white hover:border-gold-300 hover:scale-110 flex items-center justify-center transition-all z-50 shadow-xl shadow-black"
            aria-label="Previous Image"
            title="Previous (←)"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {/* Next Navigation Button */}
        {items.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-900/95 border border-gold-500/60 text-gold-400 hover:text-white hover:border-gold-300 hover:scale-110 flex items-center justify-center transition-all z-50 shadow-xl shadow-black"
            aria-label="Next Image"
            title="Next (→)"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {/* The Card Box - fits tightly around the image */}
        <div className="rounded-2xl overflow-hidden border border-gold-500/50 shadow-2xl shadow-black/95 bg-black flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentItem.image}
            alt={currentItem.alt || currentItem.caption || currentItem.title || 'Image Preview'}
            className="max-h-[65vh] sm:max-h-[70vh] max-w-[88vw] sm:max-w-[78vw] md:max-w-xl lg:max-w-2xl w-auto h-auto object-contain block select-none"
          />
        </div>
      </div>
    </div>
  );
}
