import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, PhoneCall, ArrowRight, ShieldAlert, Award } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[#070707] text-white flex items-center justify-center px-4 sm:px-6 py-20 overflow-hidden">
      {/* Background Cinematic Atmosphere & Glows */}
      <div className="ambient-glow top-[20%] left-[-100px] opacity-25" />
      <div className="ambient-glow bottom-[20%] right-[-100px] opacity-25" />

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Brand Emblem */}
        <div className="inline-flex items-center justify-center mb-6">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 p-2 rounded-full border-2 border-gold-500/40 bg-gradient-to-b from-[#1b1710] to-[#0a0a0a] shadow-2xl shadow-gold-500/20">
            <Image
              src="/VST_Fitness_World_Logo_Transparent.png"
              alt="VST Fitness World"
              fill
              sizes="96px"
              className="object-contain p-2"
              priority
            />
          </div>
        </div>

        {/* 404 Headline */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-widest mb-4">
          <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
          <span>Error 404 • Destination Not Found</span>
        </div>

        <h1 className="font-bebas text-6xl sm:text-7xl md:text-8xl tracking-wider text-white mb-3">
          OUTSIDE THE <span className="gold-gradient-text">SANCTUARY</span>
        </h1>

        <p className="text-sm sm:text-base text-neutral-400 max-w-lg mx-auto leading-relaxed mb-8">
          The page or section you attempted to access is not part of the VST Fitness World perimeter.
          Please return to the main floor or contact our concierge desk.
        </p>

        {/* Quick Return Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-10">
          <Link
            href="/"
            className="btn-gold w-full sm:w-auto px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-gold-500/20"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/pricing"
            className="btn-outline-gold w-full sm:w-auto px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gold-500/10"
          >
            <Award className="w-4 h-4" />
            <span>View Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-gold-500/40 flex items-center justify-center gap-2 transition-all"
          >
            <PhoneCall className="w-4 h-4 text-gold-400" />
            <span>Contact Desk</span>
          </Link>
        </div>

        {/* Footer Direct Hotline Callout */}
        <div className="p-4 rounded-2xl glass-card border border-neutral-800 max-w-md mx-auto">
          <div className="text-xs text-neutral-400">
            Need immediate assistance? Reach our front desk directly at{' '}
            <a
              href="tel:+917550155331"
              className="text-gold-400 font-bold hover:underline"
            >
              +91 75501 55331
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
