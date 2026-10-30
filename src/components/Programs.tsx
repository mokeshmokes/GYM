'use client';

import React from 'react';
import Image from 'next/image';
import { Flame, Clock, Zap, ArrowRight } from 'lucide-react';
import { PROGRAMS_LIST } from '@/data/gymData';

interface ProgramsProps {
  onSelectProgram: (programName: string) => void;
}

export default function Programs({ onSelectProgram }: ProgramsProps) {
  const handleEnrollClick = (e: React.MouseEvent<HTMLAnchorElement>, progName: string) => {
    e.preventDefault();
    onSelectProgram(progName);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="programs" className="relative py-20 lg:py-28 bg-[#0c0c0c] border-t border-neutral-900">
      <div className="ambient-glow top-[15%] left-[5%] opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 mb-4">
            <Flame className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-gold-400">
              Targeted Disciplines
            </span>
          </div>

          <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-none mb-4">
            Specialized <span className="gold-gradient-text">Fitness Programs</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Scientific, goal-oriented programs designed to shred body fat, pack on dense contractile muscle, and elevate raw athletic power.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-6" />
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PROGRAMS_LIST.map((prog) => (
            <article
              key={prog.id}
              className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between hover:border-gold-500/50 transition-all duration-300 transform hover:-translate-y-1.5 group shadow-xl shadow-black/60"
            >
              <div>
                {/* Header Image */}
                <div className="relative h-44 w-full overflow-hidden bg-neutral-900">
                  <Image
                    src={prog.image}
                    alt={prog.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Intensity Badge */}
                  <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/70 text-gold-300 border border-gold-500/40 backdrop-blur-md flex items-center gap-1">
                    <Zap className="w-3 h-3 text-gold-400" />
                    {prog.intensity}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bebas text-2xl text-white tracking-wide mb-2 group-hover:text-gold-400 transition-colors">
                    {prog.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4 line-clamp-3">
                    {prog.desc}
                  </p>

                  {/* Meta stats */}
                  <div className="flex items-center gap-4 text-xs font-semibold text-neutral-300 mb-5 pb-4 border-b border-neutral-800">
                    <span className="flex items-center gap-1 text-gold-300">
                      <Clock className="w-3.5 h-3.5 text-gold-400" />
                      {prog.duration}
                    </span>
                    <span className="flex items-center gap-1 text-gold-300">
                      <Flame className="w-3.5 h-3.5 text-gold-400" />
                      {prog.calories}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-5 pb-5 pt-0">
                <a
                  href="#contact"
                  onClick={(e) => handleEnrollClick(e, prog.enrollValue)}
                  className="btn-outline-gold w-full py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 group-hover:bg-gold-500/20"
                >
                  <span>Enroll in Program</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

