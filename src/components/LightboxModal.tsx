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
      className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fadeIn"
      onClick={onClose}
    >
      {/* Medium Popup Container - dynamically fits image aspect ratio */}
      <div
        className="relative inline-flex flex-col items-center justify-center max-w-[92vw] sm:max-w-[80vw] md:max-w-xl lg:max-w-2xl max-h-[72vh] z-40"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Card-corner Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-950 border-2 border-gold-500 text-gold-400 hover:text-white hover:border-gold-300 hover:scale-110 flex items-center justify-center transition-all z-50 shadow-xl shadow-black cursor-pointer"
          aria-label="Close"
          title="Close (Esc)"
        >
          <X className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
        </button>

        {/* Prev Navigation Button */}
        {items.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-1 sm:-left-5 md:-left-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-950/95 border border-gold-500/70 text-gold-400 hover:text-white hover:border-gold-300 hover:scale-110 flex items-center justify-center transition-all z-50 shadow-xl shadow-black cursor-pointer"
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
            className="absolute right-1 sm:-right-5 md:-right-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-950/95 border border-gold-500/70 text-gold-400 hover:text-white hover:border-gold-300 hover:scale-110 flex items-center justify-center transition-all z-50 shadow-xl shadow-black cursor-pointer"
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
