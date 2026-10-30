'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Crown, Sparkles, ArrowRight, ShieldCheck, Flame, Compass } from 'lucide-react';
import { HERO_TYPING_PHRASES } from '@/data/gymData';

export default function Hero() {
  const [currentText, setCurrentText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = HERO_TYPING_PHRASES[phraseIdx];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (currentText.length < fullText.length) {
        timer = setTimeout(() => {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        }, 55);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullText.substring(0, currentText.length - 1));
        }, 30);
      } else {
        setIsDeleting(false);
        setPhraseIdx((prev) => (prev + 1) % HERO_TYPING_PHRASES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIdx]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Cinematic Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=85')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/95 via-[#0a0a0a]/85 to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#0a0a0a]" />

      {/* Atmospheric Gold Glow Accents */}
      <div className="ambient-glow top-[15%] left-[-100px] opacity-40 animate-pulse-slow" />
      <div className="ambient-glow bottom-[10%] right-[-100px] opacity-35" />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Luxury Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-gold-500/40 backdrop-blur-md mb-6 shadow-lg shadow-black/50">
          <Crown className="w-4 h-4 text-gold-400" />
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gold-300">
            The Premier Luxury Fitness Sanctuary • Pallikaranai
          </span>
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
        </div>

        {/* Headline */}
        <h1 className="font-bebas text-5xl sm:text-7xl md:text-8xl tracking-tight text-white uppercase leading-[0.92] mb-6 drop-shadow-2xl">
          FORGED FOR <span className="gold-gradient-text">MASTERY.</span>
          <br />
          BUILT FOR <span className="text-white">CHAMPIONS.</span>
        </h1>

        {/* Dynamic Typing Text Subtitle */}
        <div className="h-14 sm:h-12 flex items-center justify-center mb-6">
          <p className="text-lg sm:text-xl md:text-2xl text-neutral-300 font-light max-w-3xl">
            Where Chennai’s elite train with{' '}
            <span className="font-semibold text-gold-400 border-b-2 border-gold-400/80 pb-0.5">
              {currentText}
            </span>
            <span className="inline-block w-1 h-5 bg-gold-400 ml-1 animate-pulse" />
          </p>
        </div>

        <p className="text-sm sm:text-base text-neutral-400 max-w-2xl font-normal leading-relaxed mb-10">
          Step into a black & gold realm engineered for unmatched physical supremacy. From Eleiko calibrated free weights to infrared recovery suites, elevate your performance with zero compromises.
        </p>

        {/* Dual CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="#contact"
            className="btn-gold w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 group"
          >
            <span>Claim 1-Day Free VIP Pass</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <Link
            href="#equipment"
            className="btn-outline-gold w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Arsenal</span>
          </Link>
        </div>

        {/* Mini Trust Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 pt-8 border-t border-neutral-800/80 w-full max-w-4xl text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white tracking-wide">CSCS Certified</div>
              <div className="text-[11px] text-neutral-400">Master Coaches</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
              <Flame className="w-4 h-4 text-gold-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white tracking-wide">150+ Imported</div>
              <div className="text-[11px] text-neutral-400">Calibrated Stations</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
              <Crown className="w-4 h-4 text-gold-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white tracking-wide">24/7 Biometric</div>
              <div className="text-[11px] text-neutral-400">VIP Member Access</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-gold-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white tracking-wide">Zero Lead Loss</div>
              <div className="text-[11px] text-neutral-400">Cloud Sheet Sync</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

