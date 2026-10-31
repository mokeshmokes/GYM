import React from 'react';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-[#070707] flex flex-col items-center justify-center p-4">
      {/* Background ambient glow */}
      <div className="ambient-glow top-[30%] left-[20%] opacity-20" />
      <div className="ambient-glow bottom-[30%] right-[20%] opacity-20" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Pulsing Circular Emblem */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-gold-500/30 animate-ping opacity-30" />
          <div className="relative w-full h-full p-2.5 rounded-full border-2 border-gold-500/60 bg-gradient-to-b from-[#1b1710] to-[#0a0a0a] shadow-2xl shadow-gold-500/30 flex items-center justify-center">
            <Image
              src="/VST_Fitness_World_Logo_Transparent.png"
              alt="VST Fitness World"
              fill
              sizes="96px"
              className="object-contain p-2"
              priority
            />
          </div>
        </div>

        {/* Brand Name */}
        <div className="font-bebas text-2xl sm:text-3xl text-white tracking-widest mb-2">
          VST <span className="gold-gradient-text">FITNESS WORLD</span>
        </div>

        {/* Loading Spinner & Status */}
        <div className="flex items-center gap-2.5 text-xs text-gold-400 font-semibold uppercase tracking-widest">
          <div className="w-3.5 h-3.5 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
          <span>Entering Sanctuary...</span>
        </div>
      </div>
    </div>
  );
}
