'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Users, Award, Dumbbell, Calendar } from 'lucide-react';
import { STATS } from '@/data/gymData';

export default function Stats() {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const icons = [
    <Users key="users" className="w-6 h-6 text-gold-400" />,
    <Award key="award" className="w-6 h-6 text-gold-400" />,
    <Dumbbell key="dumbbell" className="w-6 h-6 text-gold-400" />,
    <Calendar key="calendar" className="w-6 h-6 text-gold-400" />,
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1800;
          const steps = 60;
          const stepTime = duration / steps;

          STATS.forEach((stat, idx) => {
            let current = 0;
            const increment = stat.target / steps;

            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.target) {
                current = stat.target;
                clearInterval(timer);
              }
              setCounts((prev) => {
                const next = [...prev];
                next[idx] = Math.floor(current);
                return next;
              });
            }, stepTime);
          });
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section id="stats" ref={sectionRef} className="relative py-12 bg-[#0c0c0c] border-y border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className="glass-card p-6 rounded-2xl flex flex-col items-center text-center group hover:border-gold-500/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-black/40"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {icons[idx]}
              </div>

              <div className="flex items-baseline gap-0.5">
                <span className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-white tracking-wider font-bold">
                  {counts[idx]}
                </span>
                <span className="font-bebas text-3xl sm:text-4xl text-gold-400 font-bold">
                  {stat.suffix}
                </span>
              </div>

              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-400 mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
