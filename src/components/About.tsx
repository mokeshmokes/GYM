'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dumbbell, Activity, Flame, Shield, ArrowRight, Award } from 'lucide-react';
import { ABOUT_PILLARS } from '@/data/gymData';

export default function About() {
  const pillarIcons = [
    <Dumbbell key="dumb" className="w-5 h-5 text-gold-400" />,
    <Activity key="act" className="w-5 h-5 text-gold-400" />,
    <Flame key="flame" className="w-5 h-5 text-gold-400" />,
  ];

  return (
    <section id="about" className="relative py-20 lg:py-28 overflow-hidden bg-[#0a0a0a]">
      <div className="ambient-glow top-[30%] left-[-150px] opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with Experience Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-[440px] sm:h-[520px] rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl shadow-black/80 group">
              <Image
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=900&q=80"
                alt="VST Fitness World Luxury Gym Floor"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Floating Experience Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl glass-card border border-gold-500/40 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-gradient flex items-center justify-center text-neutral-950 font-bold shadow-lg shadow-gold-500/30">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bebas text-2xl text-white tracking-wider">
                      12+ Years Of Championship Legacy
                    </div>
                    <div className="text-xs text-gold-300 font-medium">
                      Pallikaranai’s benchmark for uncompromising physique transformation
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Accent Border decoration */}
            <div className="absolute -inset-4 border border-gold-500/10 rounded-3xl -z-10 hidden sm:block" />
          </div>

          {/* Right Column: Narrative & Pillars */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 w-fit mb-4">
              <Shield className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-xs font-bold tracking-widest uppercase text-gold-400">
                The VST Standard
              </span>
            </div>

            <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-[0.95] mb-6">
              More Than A Gym.{' '}
              <span className="gold-gradient-text">A Private Sanctuary</span> For High Achievers.
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-8">
              Founded on the belief that peak physical condition is the bedrock of unstoppable confidence, VST FITNESS WORLD discards corporate commercial compromises. Located on Varadharajapuram Main Road in Pallikaranai, we combine world-class Olympic iron with private luxury wellness suites.
            </p>

            {/* Pillars */}
            <div className="space-y-4 mb-8">
              {ABOUT_PILLARS.map((pillar, idx) => (
                <div
                  key={pillar.title}
                  className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 hover:border-gold-500/30 transition-all duration-300 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {pillarIcons[idx]}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div>
              <Link
                href="#contact"
                className="btn-gold inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider group"
              >
                <span>Schedule Your Facility Tour</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

