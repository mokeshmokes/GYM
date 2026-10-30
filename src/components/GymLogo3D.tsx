'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function GymLogo3D() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Smooth subtle luxury tilt (max 8 deg, perfectly stable)
    const tiltX = -((y - centerY) / centerY) * 8;
    const tiltY = ((x - centerX) / centerX) * 8;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] xl:max-w-[480px] aspect-square mx-auto flex items-center justify-center select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1100px' }}
    >
      {/* Golden Aura Glow (Highlighted softly in the air) */}
      <div className="absolute inset-2 sm:inset-4 rounded-full bg-gradient-to-tr from-gold-500/30 via-gold-400/20 to-transparent blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full bg-gold-500/20 blur-2xl pointer-events-none" />

      {/* Floating 3D Emblem Container (Smoothly flying in the air) */}
      <div
        className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] md:w-[410px] md:h-[410px] animate-float-air transition-transform duration-500 ease-out flex items-center justify-center"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Outer Circular Medallion Frame */}
        <div className="relative w-full h-full rounded-full p-2 sm:p-2.5 flex items-center justify-center border-2 sm:border-[3px] border-gold-500/50 bg-gradient-to-b from-[#1c1810]/95 via-[#111111]/95 to-[#070707] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.4)] ring-1 ring-gold-400/40 overflow-hidden">
          
          {/* Subtle Circular Inset Ring Accent */}
          <div className="absolute inset-2 sm:inset-2.5 rounded-full border border-gold-400/30 pointer-events-none" />

          {/* Golden Specular Sheen Crossing */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gold-300/10 to-transparent pointer-events-none" />

          {/* LOGO COVERING THE ENTIRE CIRCLE */}
          <div className="relative w-full h-full drop-shadow-[0_10px_30px_rgba(212,175,55,0.5)] flex items-center justify-center">
            <Image
              src="/VST_Fitness_World_Logo_Transparent.png"
              alt="VST Fitness World Luxury Emblem"
              fill
              sizes="(max-width: 640px) 300px, 420px"
              className="object-contain pointer-events-none p-1 sm:p-1.5 filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
              priority
            />
          </div>

          {/* Subtle Outer Bevel Rim */}
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-gold-300/30 pointer-events-none" />
        </div>

        {/* Ambient Hover Floor Shadow breathing with the float */}
        <div className="absolute -bottom-8 sm:-bottom-10 w-60 sm:w-72 h-8 rounded-full bg-black/85 blur-xl pointer-events-none scale-90 animate-pulse-slow" />
      </div>
    </div>
  );
}
