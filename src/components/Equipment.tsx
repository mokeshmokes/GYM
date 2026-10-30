'use client';

import React from 'react';
import Image from 'next/image';
import { Dumbbell, ShieldCheck, Zap } from 'lucide-react';
import { EQUIPMENT_ITEMS } from '@/data/gymData';

export default function Equipment() {
  return (
    <section id="equipment" className="relative py-20 lg:py-28 bg-[#0c0c0c] border-t border-neutral-900">
      <div className="ambient-glow bottom-[5%] right-[-100px] opacity-25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 mb-4">
            <Dumbbell className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-gold-400">
              Championship Arsenal
            </span>
          </div>

          <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-none mb-4">
            World-Class <span className="gold-gradient-text">Gym Equipment</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Every piece in our sanctuary is selected for optimal biomechanical resistance curves, joint safety, and relentless muscle stimulation.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-6" />
        </div>

        {/* Equipment Grid (12 Items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {EQUIPMENT_ITEMS.map((item) => (
            <article
              key={item.id}
              className="group glass-card rounded-2xl overflow-hidden flex flex-col justify-between hover:border-gold-500/50 transition-all duration-300 transform hover:-translate-y-1.5 shadow-xl shadow-black/60"
            >
              <div>
                {/* Image Box */}
                <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/70 text-gold-300 border border-gold-500/30 backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                {/* Content Box */}
                <div className="p-5">
                  <h3 className="font-bebas text-2xl text-white tracking-wide mb-2 group-hover:text-gold-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4 line-clamp-3">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Footer Specs */}
              <div className="px-5 py-3 border-t border-neutral-800/80 bg-neutral-900/50 flex items-center justify-between text-[11px] font-semibold text-neutral-300">
                <span className="flex items-center gap-1.5 text-gold-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {item.brand}
                </span>
                <span className="text-neutral-400 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-gold-500" />
                  {item.spec}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
