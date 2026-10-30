'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Quote, Star, ChevronLeft, ChevronRight, MessageSquareQuote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS_LIST } from '@/data/gymData';

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % TESTIMONIALS_LIST.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? TESTIMONIALS_LIST.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % TESTIMONIALS_LIST.length);
  };

  const current = TESTIMONIALS_LIST[currentSlide];

  return (
    <section id="reviews" className="relative py-16 sm:py-20 lg:py-28 bg-[#0c0c0c] border-t border-neutral-900 scroll-mt-20">
      {/* Anchor for backward compatibility with #testimonials */}
      <div id="testimonials" className="sr-only" />

      <div className="ambient-glow top-[15%] left-[35%] opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 mb-4">
            <MessageSquareQuote className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-gold-400">
              Verified Member Reviews
            </span>
          </div>

          <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-none mb-4">
            Real Reviews From <span className="gold-gradient-text">Our Champions</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Rated 4.9 / 5.0 by 500+ athletes, business leaders, and fitness enthusiasts in Pallikaranai, Chennai.
          </p>

          <div className="inline-flex items-center gap-2 mt-4 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
            <div className="flex text-gold-400">
              {'★★★★★'}
            </div>
            <span className="font-bold text-white">4.9 / 5.0</span>
            <span className="text-neutral-500">•</span>
            <span className="text-gold-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Genuine Transformations
            </span>
          </div>

          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-6" />
        </div>

        {/* Carousel Container */}
        <div
          className="max-w-4xl mx-auto relative px-2 sm:px-0"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Review Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-10 lg:p-12 relative border border-gold-500/30 shadow-2xl shadow-black/80 flex flex-col items-center text-center">
            {/* Quote watermark icon */}
            <Quote className="w-12 h-12 sm:w-16 sm:h-16 text-gold-500/10 absolute top-4 left-4 sm:top-6 sm:left-6 -scale-x-100 pointer-events-none" />

            {/* Stars */}
            <div className="flex items-center gap-1 sm:gap-1.5 mb-5 sm:mb-6">
              {[...Array(current.stars)].map((_, i) => (
                <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-gold-400 text-gold-400" />
              ))}
            </div>

            {/* Quote Body */}
            <blockquote className="text-base sm:text-xl md:text-2xl text-neutral-200 font-light leading-relaxed mb-6 sm:mb-8 max-w-3xl italic">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-gold-500/50 shadow-md shadow-gold-500/20 flex-shrink-0">
                <Image
                  src={current.image}
                  alt={current.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <div className="font-bebas text-xl sm:text-2xl text-white tracking-wide leading-tight">
                  {current.name}
                </div>
                <div className="text-[11px] sm:text-xs text-gold-400 font-semibold tracking-wider">
                  {current.role}
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6 sm:mt-8 max-w-xs mx-auto">
            <button
              onClick={handlePrev}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-gold-400 hover:border-gold-500/50 flex items-center justify-center transition-all focus:outline-none"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS_LIST.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx
                      ? 'w-7 sm:w-8 bg-gold-400'
                      : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-gold-400 hover:border-gold-500/50 flex items-center justify-center transition-all focus:outline-none"
              aria-label="Next Review"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
