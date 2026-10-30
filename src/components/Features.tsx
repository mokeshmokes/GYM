'use client';

import React from 'react';
import {
  Award,
  Gauge,
  Wind,
  UserCheck,
  Apple,
  Shield,
  Users,
  Clock,
  Car,
  Sparkles,
} from 'lucide-react';
import { FEATURES_LIST } from '@/data/gymData';

export default function Features() {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Award':
        return <Award className="w-6 h-6 text-gold-400" />;
      case 'Gauge':
        return <Gauge className="w-6 h-6 text-gold-400" />;
      case 'Wind':
        return <Wind className="w-6 h-6 text-gold-400" />;
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-gold-400" />;
      case 'Apple':
        return <Apple className="w-6 h-6 text-gold-400" />;
      case 'Shield':
        return <Shield className="w-6 h-6 text-gold-400" />;
      case 'Users':
        return <Users className="w-6 h-6 text-gold-400" />;
      case 'Clock':
        return <Clock className="w-6 h-6 text-gold-400" />;
      case 'Car':
        return <Car className="w-6 h-6 text-gold-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-gold-400" />;
    }
  };

  return (
    <section id="features" className="relative py-20 lg:py-28 bg-[#0a0a0a]">
      <div className="ambient-glow top-[20%] right-[-100px] opacity-25" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-gold-400">
              The VST Advantage
            </span>
          </div>

          <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-none mb-4">
            Why Choose <span className="gold-gradient-text">VST Fitness World</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Engineered from foundation to ceiling to provide the highest echelon of safety, hygiene, equipment caliber, and results in Tamil Nadu.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-6" />
        </div>

        {/* 9 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES_LIST.map((feat) => (
            <div
              key={feat.id}
              className="glass-card p-6 rounded-2xl flex items-start gap-4 hover:border-gold-500/50 transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-gold-500/20 transition-all duration-300">
                {getIcon(feat.iconName)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

