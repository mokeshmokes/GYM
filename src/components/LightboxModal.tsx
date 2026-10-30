'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '@/types';

interface LightboxModalProps {
  isOpen: boolean;
  items: GalleryItem[];
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
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-11 h-11 rounded-full bg-neutral-900/80 border border-gold-500/30 text-white hover:text-gold-400 hover:border-gold-400 flex items-center justify-center transition-all z-50"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-neutral-900/80 border border-gold-500/30 text-white hover:text-gold-400 hover:border-gold-400 flex items-center justify-center transition-all z-50"
        aria-label="Previous Image"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      {/* Next Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-neutral-900/80 border border-gold-500/30 text-white hover:text-gold-400 hover:border-gold-400 flex items-center justify-center transition-all z-50"
        aria-label="Next Image"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Main Image Container */}
      <div
        className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[60vh] sm:h-[75vh] rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl">
          <Image
            src={currentItem.image}
            alt={currentItem.caption}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>

        {/* Caption */}
        <div className="mt-4 text-center">
          <p className="text-sm sm:text-base text-neutral-200 font-semibold tracking-wide">
            {currentItem.caption}
          </p>
          <span className="text-xs text-gold-400 uppercase tracking-widest mt-1 inline-block">
            {currentIndex + 1} of {items.length} • {currentItem.categoryLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
