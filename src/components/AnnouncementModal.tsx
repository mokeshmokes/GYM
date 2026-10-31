'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, X, Bell } from 'lucide-react';
import { AnnouncementData } from '@/types';

interface AnnouncementModalProps {
  announcement?: AnnouncementData;
}

const STORAGE_KEY = 'vst_announcement_seen_v1';

export default function AnnouncementModal({ announcement }: AnnouncementModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => {
    setIsOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // storage might be disabled in private mode
    }
  }, []);

  useEffect(() => {
    if (!announcement || !announcement.isActive || announcement.showPopup === false) {
      return;
    }

    // Check frequency setting
    if (announcement.popupFrequency === 'session') {
      try {
        const seen = sessionStorage.getItem(STORAGE_KEY);
        if (seen === 'true') {
          return;
        }
      } catch {
        // fallback: open
      }
    }

    // Slight delay so the user sees page appear first, then smooth modal entrance
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 600);

    return () => clearTimeout(timer);
  }, [announcement]);

  // Handle ESC key to dismiss
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  if (!isOpen || !announcement || !announcement.isActive || announcement.showPopup === false) {
    return null;
  }

  const {
    title,
    badge = 'EXCLUSIVE OFFER',
    message,
    ctaText = 'Claim Your Privilege',
    ctaLink = '#contact',
  } = announcement;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="announcement-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={close}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border-2 border-gold-500/50 bg-[#0d0d0d] p-6 sm:p-8 shadow-2xl shadow-gold-500/20 text-center animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Glows */}
        <div className="ambient-glow top-[-50px] left-1/2 -translate-x-1/2 w-72 h-36 opacity-30 pointer-events-none" />

        {/* Close button */}
        <button
          onClick={close}
          aria-label="Close Announcement"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-gold-500/40 flex items-center justify-center transition-colors shadow-md"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon */}
        <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shadow-lg shadow-gold-500/10">
          <Bell className="w-7 h-7 text-gold-400 animate-bounce" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/40 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-gold-400 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>{badge}</span>
        </div>

        {/* Title */}
        <h3
          id="announcement-modal-title"
          className="font-bebas text-2xl sm:text-3xl lg:text-4xl tracking-wide text-white mb-3 leading-tight"
        >
          {title}
        </h3>

        {/* Message */}
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6 sm:mb-8 px-2">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href={ctaLink}
            onClick={close}
            className="btn-gold w-full py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-gold-500/25 transition-all hover:scale-[1.02]"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={close}
            className="text-xs text-neutral-400 hover:text-gold-400 transition-colors uppercase tracking-wider font-semibold py-1"
          >
            Continue to Sanctuary Website
          </button>
        </div>
      </div>
    </div>
  );
}

