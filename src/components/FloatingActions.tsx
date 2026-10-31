'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { GYM_INFO } from '@/data/gymData';
import { GymInfo } from '@/types';

interface FloatingActionsProps {
  settings?: GymInfo;
}

export default function FloatingActions({ settings = GYM_INFO }: FloatingActionsProps) {
  const currentSettings = settings || GYM_INFO;
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${currentSettings.whatsappRaw}?text=${encodeURIComponent(
    currentSettings.whatsappMessage
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto relative group w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 shadow-emerald-950/80"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white" />

        {/* Hover Tooltip */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-black/90 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-emerald-500/30 shadow-lg">
          Chat on WhatsApp ({currentSettings.phoneDisplay})
        </span>

        {/* Pulse Ping Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping -z-10" />
      </a>

      {/* Back To Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto w-12 h-12 rounded-full bg-neutral-900 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-black hover:border-gold-400 flex items-center justify-center transition-all duration-300 shadow-xl shadow-black/80"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
