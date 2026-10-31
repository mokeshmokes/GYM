'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import { AnnouncementData } from '@/types';

interface AnnouncementSectionProps {
  announcement?: AnnouncementData;
}

export default function AnnouncementSection({ announcement }: AnnouncementSectionProps) {
  const [dismissed, setDismissed] = useState(false);

  if (!announcement || !announcement.isActive || announcement.showBanner === false || dismissed) {
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
    <section className="relative z-20 -mt-2 mb-4 px-4 sm:px-6 lg:px-8 max-w-[1560px] mx-auto animate-fade-in">
      <div className="relative overflow-hidden rounded-2xl border border-gold-500/40 bg-gradient-to-r from-neutral-950 via-[#14120a] to-neutral-950 p-4 sm:p-6 shadow-2xl shadow-gold-500/10">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-32 bg-gold-500/15 blur-3xl pointer-events-none -z-10" />
        <div className="absolute -bottom-10 -left-10 w-64 h-32 bg-gold-400/10 blur-2xl pointer-events-none -z-10" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
          {/* Left: Badge & Text */}
          <div className="space-y-2 flex-1 pr-6 sm:pr-8">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/40 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-gold-400">
                <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
                <span>{badge}</span>
              </span>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 hidden sm:inline">
                VST Fitness World Official Notice
              </span>
            </div>

            <h3 className="font-bebas text-xl sm:text-2xl lg:text-3xl tracking-wide text-white leading-tight">
              {title}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-4xl">
              {message}
            </p>
          </div>

          {/* Right: CTA & Dismiss */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end pt-2 lg:pt-0 border-t lg:border-t-0 border-neutral-800">
            <Link
              href={ctaLink}
              className="btn-gold px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-gold-500/25 transition-all hover:scale-[1.02] flex-1 sm:flex-initial whitespace-nowrap"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss Announcement"
              className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 flex items-center justify-center transition-colors flex-shrink-0"
              title="Dismiss for now"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

