'use client';

import React from 'react';
import Image from 'next/image';
import { Quote, Star, MessageSquareQuote, CheckCircle2, Sparkles } from 'lucide-react';
import { TESTIMONIALS_LIST } from '@/data/gymData';

export default function Testimonials() {
  const marqueeList = [...TESTIMONIALS_LIST, ...TESTIMONIALS_LIST];

  return (
    <section id="reviews" className="relative py-16 sm:py-20 lg:py-28 bg-[#0a0a0a] border-t border-neutral-900 scroll-mt-20 overflow-hidden">
      {/* Anchor for backward compatibility with #testimonials */}
      <div id="testimonials" className="sr-only" />

      <div className="ambient-glow top-[15%] left-[35%] opacity-20" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
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
      </div>

      {/* Full-width Infinite Smooth Glide Showcase */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Edge Vignette Fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 lg:w-40 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 lg:w-40 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-20" />

        {/* Continuous Gliding Track Moving from One End to Another */}
        <div className="animate-marquee-smooth flex items-stretch gap-5 sm:gap-6 py-4 px-4">
          {marqueeList.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-[320px] sm:w-[380px] lg:w-[420px] flex-shrink-0 glass-card rounded-3xl p-6 sm:p-8 border border-neutral-800/80 hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-gold-500/10 relative"
            >
              {/* Top Quote Watermark */}
              <Quote className="w-10 h-10 text-gold-500/10 absolute top-5 right-5 -scale-x-100 pointer-events-none group-hover:text-gold-500/20 transition-colors" />

              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(item.stars)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-gold-400 text-gold-400"
                      />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gold-400/90 bg-gold-500/10 border border-gold-500/20 px-2.5 py-0.5 rounded-full">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Verified Champion</span>
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-sm sm:text-[15px] text-neutral-300 font-light leading-relaxed mb-6 italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-neutral-800/60 mt-auto">
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-gold-500/50 shadow-md shadow-gold-500/20 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="48px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="text-left min-w-0">
                  <div className="font-bebas text-lg sm:text-xl text-white tracking-wide leading-tight truncate">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-gold-400 font-semibold tracking-wider truncate">
                    {item.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
