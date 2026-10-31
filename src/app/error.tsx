'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RotateCw, Home, MessageSquare } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled app error caught by ErrorBoundary:', error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#070707] text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <div className="ambient-glow top-[20%] left-[-100px] opacity-20" />
      <div className="ambient-glow bottom-[20%] right-[-100px] opacity-20" />

      <div className="relative z-10 max-w-lg w-full text-center p-8 rounded-3xl glass-card border border-red-500/30 shadow-2xl">
        <div className="relative w-16 h-16 mx-auto mb-5 rounded-full border-2 border-gold-500/40 p-2 bg-neutral-900 shadow-lg shadow-gold-500/20">
          <Image
            src="/VST_Fitness_World_Logo_Transparent.png"
            alt="VST Fitness World"
            fill
            sizes="64px"
            className="object-contain p-1"
          />
        </div>

        <div className="text-xs font-bold uppercase tracking-widest text-red-400 mb-2">
          Temporary Connection Disruption
        </div>

        <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide mb-3">
          SANCTUARY FEED INTERRUPTED
        </h2>

        <p className="text-xs sm:text-sm text-neutral-400 mb-6 leading-relaxed">
          The requested data took too long or encountered an unexpected network delay.
          Our automatic failsafe is protecting your session.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="btn-gold w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="btn-outline-gold w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>

          <a
            href="https://wa.me/917550155331?text=Hi%20VST%20Fitness%20World,%20I%20experienced%20a%20loading%20error%20on%20the%20website"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </main>
  );
}

