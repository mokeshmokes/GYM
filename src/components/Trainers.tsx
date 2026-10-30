'use client';

import React from 'react';
import Image from 'next/image';
import { Award, Instagram, Linkedin, Twitter } from 'lucide-react';
import { TRAINERS_LIST, GYM_INFO } from '@/data/gymData';

export default function Trainers() {
  return (
    <section id="trainers" className="relative py-20 lg:py-28 bg-[#0a0a0a]">
      <div className="ambient-glow top-[25%] right-[5%] opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 mb-4">
            <Award className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-gold-400">
              Championship Faculty
            </span>
          </div>

          <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-none mb-4">
            Meet Our <span className="gold-gradient-text">Elite Trainers</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Industry pioneers, former national athletes, and master coaches dedicated to your physical supremacy.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-6" />
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRAINERS_LIST.map((trainer) => (
            <article
              key={trainer.id}
              className="glass-card rounded-2xl overflow-hidden group hover:border-gold-500/50 transition-all duration-300 transform hover:-translate-y-1.5 shadow-xl shadow-black/70 flex flex-col justify-between"
            >
              <div>
                {/* Trainer Image & Social Overlay */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-neutral-900">
                  <Image
                    src={trainer.image}
                    alt={trainer.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Social links hover overlay */}
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a
                      href={GYM_INFO.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-neutral-950 hover:scale-110 transition-transform shadow-lg shadow-gold-500/40"
                      aria-label={`${trainer.name} on Instagram`}
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href={trainer.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white hover:border-gold-400 hover:text-gold-400 hover:scale-110 transition-all"
                      aria-label={`${trainer.name} on LinkedIn`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={trainer.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white hover:border-gold-400 hover:text-gold-400 hover:scale-110 transition-all"
                      aria-label={`${trainer.name} on Twitter`}
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Trainer Info */}
                <div className="p-5">
                  <h3 className="font-bebas text-2xl text-white tracking-wide mb-1 group-hover:text-gold-400 transition-colors">
                    {trainer.name}
                  </h3>
                  <div className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-3">
                    {trainer.role}
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {trainer.bio}
                  </p>
                </div>
              </div>

              {/* Bottom tag */}
              <div className="px-5 py-3 border-t border-neutral-800/80 bg-neutral-900/50 flex items-center justify-between text-[11px] text-neutral-400 font-medium">
                <span className="text-gold-400 font-semibold">@vst_fitnesss</span>
                <span>Verified Coach</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

