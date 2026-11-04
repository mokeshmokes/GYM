'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
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
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 md:p-8"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-neutral-900/90 border border-gold-500/40 text-neutral-200 hover:text-gold-400 hover:border-gold-400 flex items-center justify-center transition-all z-50 shadow-xl shadow-black/80"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Button */}
      {items.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-neutral-900/90 border border-gold-500/40 text-neutral-200 hover:text-gold-400 hover:border-gold-400 flex items-center justify-center transition-all z-50 shadow-xl shadow-black/80"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      )}

      {/* Next Button */}
      {items.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-neutral-900/90 border border-gold-500/40 text-neutral-200 hover:text-gold-400 hover:border-gold-400 flex items-center justify-center transition-all z-50 shadow-xl shadow-black/80"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      )}

      {/* Main Image Container - Image ONLY, no caption or extra text */}
      <div
        className="relative max-w-6xl w-full h-[82vh] sm:h-[88vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl shadow-black/90 bg-neutral-950/60">
          <Image
            src={currentItem.image}
            alt={currentItem.alt || currentItem.caption || currentItem.title || 'Image Preview'}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
