'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Crown, Sparkles, ArrowRight, ShieldCheck, Flame, Compass, Award, CalendarCheck } from 'lucide-react';
import { HERO_TYPING_PHRASES } from '@/data/gymData';
import GymLogo3D from './GymLogo3D';

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
    <section id="home" className="relative min-h-[100svh] flex items-center justify-center pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
      {/* Background Cinematic Texture & Moody Dim */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000 opacity-30"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=85')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/95 via-[#0a0a0a]/90 to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0a0a0a]/60 to-[#0a0a0a]" />

      {/* Atmospheric Gold Glow Accents */}
      <div className="ambient-glow top-[12%] left-[-120px] opacity-40 animate-pulse-slow" />
      <div className="ambient-glow bottom-[10%] right-[-120px] opacity-35" />

      {/* Hero 2-Column Responsive Container */}
      <div className="relative z-10 w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14 items-center">
          
          {/* Left Column: Hero Typography & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Luxury Sanctuary Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-black/60 border border-gold-500/40 backdrop-blur-md mb-6 shadow-lg shadow-black/50 transition-all hover:border-gold-400">
              <Crown className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gold-300">
                The Premier Luxury Fitness Sanctuary • Pallikaranai
              </span>
              <Sparkles className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
            </div>

            {/* Main Headline */}
            <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl xl:text-8xl tracking-tight text-white uppercase leading-[0.92] mb-5 drop-shadow-2xl">
              FORGED FOR <span className="gold-gradient-text">MASTERY.</span>
              <br />
              BUILT FOR <span className="text-white">CHAMPIONS.</span>
            </h1>

            {/* Dynamic Typing Subtitle */}
            <div className="min-h-[56px] sm:min-h-[48px] flex items-center mb-5">
              <p className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl text-neutral-300 font-light leading-snug">
                Where Chennai’s elite train with{' '}
                <span className="font-semibold text-gold-400 border-b-2 border-gold-400/80 pb-0.5">
                  {currentText}
                </span>
                <span className="inline-block w-1 h-5 bg-gold-400 ml-1 animate-pulse align-middle" />
              </p>
            </div>

            {/* Narrative Description */}
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl font-normal leading-relaxed mb-8">
              Step into a black & gold realm engineered for unmatched physical supremacy. From Eleiko calibrated free weights to infrared recovery suites, elevate your performance with zero compromises.
            </p>

            {/* Dual CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <Link
                href="#contact"
                className="btn-gold px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 group shadow-xl shadow-gold-500/25 transition-all hover:scale-[1.02]"
              >
                <CalendarCheck className="w-4 h-4 text-neutral-950" />
                <span>Book an Enquiry</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 text-neutral-950" />
              </Link>

              <Link
                href="#equipment"
                className="btn-outline-gold px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Arsenal</span>
              </Link>
            </div>

            {/* Mini Trust Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 pt-6 border-t border-neutral-800/80 w-full text-left">
              <div className="flex items-center gap-2.5 sm:gap-3 p-2 rounded-xl bg-neutral-900/40 border border-neutral-800/60">
                <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                </div>
                <div>
                  <div className="text-[11px] sm:text-xs font-bold text-white tracking-wide">CSCS Certified</div>
                  <div className="text-[10px] text-neutral-400">Master Coaches</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 p-2 rounded-xl bg-neutral-900/40 border border-neutral-800/60">
                <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
                  <Flame className="w-3.5 h-3.5 text-gold-400" />
                </div>
                <div>
                  <div className="text-[11px] sm:text-xs font-bold text-white tracking-wide">150+ Imported</div>
                  <div className="text-[10px] text-neutral-400">Calibrated Stations</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 p-2 rounded-xl bg-neutral-900/40 border border-neutral-800/60">
                <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
                  <Crown className="w-3.5 h-3.5 text-gold-400" />
                </div>
                <div>
                  <div className="text-[11px] sm:text-xs font-bold text-white tracking-wide">All-Day Access</div>
                  <div className="text-[10px] text-neutral-400">Exclusive VIP Member Pass</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 p-2 rounded-xl bg-neutral-900/40 border border-neutral-800/60">
                <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
                  <Award className="w-3.5 h-3.5 text-gold-400" />
                </div>
                <div>
                  <div className="text-[11px] sm:text-xs font-bold text-white tracking-wide">12+ Years</div>
                  <div className="text-[10px] text-neutral-400">Legacy Sanctuary</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Gym Logo Medallion */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative mt-4 lg:mt-0">
            <GymLogo3D />
          </div>

        </div>
      </div>
    </section>
  );
}
