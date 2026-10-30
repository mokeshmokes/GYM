'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Quote, Star, ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react';
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
    <section id="testimonials" className="relative py-20 lg:py-28 bg-[#0c0c0c] border-t border-neutral-900">
      <div className="ambient-glow top-[15%] left-[35%] opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 mb-4">
            <MessageSquareQuote className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-gold-400">
              Member Accolades
            </span>
          </div>

          <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-none mb-4">
            Words From Our <span className="gold-gradient-text">Champions</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Real stories from corporate executives, competitive athletes, and everyday members who transformed their bodies and lives at VST.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-6" />
        </div>

        {/* Carousel Container */}
        <div
          className="max-w-4xl mx-auto relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Card */}
          <div className="glass-card rounded-3xl p-8 sm:p-12 relative border border-gold-500/30 shadow-2xl shadow-black/80 flex flex-col items-center text-center">
            {/* Quote watermark icon */}
            <Quote className="w-16 h-16 text-gold-500/10 absolute top-6 left-6 -scale-x-100 pointer-events-none" />

            {/* Stars */}
            <div className="flex items-center gap-1.5 mb-6">
              {[...Array(current.stars)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
              ))}
            </div>

            {/* Quote Body */}
            <blockquote className="text-lg sm:text-xl md:text-2xl text-neutral-200 font-light leading-relaxed mb-8 max-w-3xl italic">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gold-500/50 shadow-md shadow-gold-500/20">
                <Image
                  src={current.image}
                  alt={current.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <div className="font-bebas text-2xl text-white tracking-wide">
                  {current.name}
                </div>
                <div className="text-xs text-gold-400 font-semibold tracking-wider">
                  {current.role}
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8 max-w-xs mx-auto">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-gold-400 hover:border-gold-500/50 flex items-center justify-center transition-all"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS_LIST.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx
                      ? 'w-8 bg-gold-400'
                      : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-gold-400 hover:border-gold-500/50 flex items-center justify-center transition-all"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
