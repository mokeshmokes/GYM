'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Sparkles, Move3d } from 'lucide-react';

export default function GymLogo3D() {
  const [rotY, setRotY] = useState(0);
  const [rotX, setRotX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const startPos = useRef({ x: 0, y: 0 });
  const startRot = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0, time: 0 });
  const animationFrameRef = useRef<number | null>(null);

  // Inertia and ambient auto-float loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      if (!isDragging) {
        // Apply inertia friction
        if (Math.abs(velocity.current.x) > 0.05 || Math.abs(velocity.current.y) > 0.05) {
          setRotY((prev) => (prev + velocity.current.x * dt * 60) % 360);
          setRotX((prev) => {
            const nextX = prev - velocity.current.y * dt * 40;
            return Math.max(-25, Math.min(25, nextX));
          });

          velocity.current.x *= Math.pow(0.92, dt * 60);
          velocity.current.y *= Math.pow(0.92, dt * 60);
        } else {
          // Subtle ambient idle float
          setRotY((prev) => (prev + 0.35) % 360);
          // Return rotX gently towards zero
          setRotX((prev) => prev * 0.96);
        }
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDragging]);

  // Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setHasInteracted(true);
    velocity.current = { x: 0, y: 0 };
    startPos.current = { x: e.clientX, y: e.clientY };
    startRot.current = { x: rotX, y: rotY };
    lastPos.current = { x: e.clientX, y: e.clientY, time: performance.now() };
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - startPos.current.x;
      const deltaY = e.clientY - startPos.current.y;

      const now = performance.now();
      const dt = Math.max((now - lastPos.current.time) / 1000, 0.001);
      const vx = (e.clientX - lastPos.current.x) / dt * 0.02;
      const vy = (e.clientY - lastPos.current.y) / dt * 0.02;
      velocity.current = { x: vx, y: vy };
      lastPos.current = { x: e.clientX, y: e.clientY, time: now };

      setRotY((startRot.current.y + deltaX * 0.65) % 360);
      const targetX = startRot.current.x - deltaY * 0.35;
      setRotX(Math.max(-28, Math.min(28, targetX)));
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    setIsDragging(true);
    setHasInteracted(true);
    velocity.current = { x: 0, y: 0 };
    const t = e.touches[0];
    startPos.current = { x: t.clientX, y: t.clientY };
    startRot.current = { x: rotX, y: rotY };
    lastPos.current = { x: t.clientX, y: t.clientY, time: performance.now() };
  };

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;

      const t = e.touches[0];
      const deltaX = t.clientX - startPos.current.x;
      const deltaY = t.clientY - startPos.current.y;

      const now = performance.now();
      const dt = Math.max((now - lastPos.current.time) / 1000, 0.001);
      const vx = (t.clientX - lastPos.current.x) / dt * 0.02;
      const vy = (t.clientY - lastPos.current.y) / dt * 0.02;
      velocity.current = { x: vx, y: vy };
      lastPos.current = { x: t.clientX, y: t.clientY, time: now };

      setRotY((startRot.current.y + deltaX * 0.75) % 360);
      const targetX = startRot.current.x - deltaY * 0.35;
      setRotX(Math.max(-28, Math.min(28, targetX)));
    },
    [isDragging]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Lighting calculations based on rotation
  const radY = (rotY * Math.PI) / 180;
  const lightX = Math.sin(radY) * 50 + 50; // 0 to 100%

  return (
    <div className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[440px] xl:max-w-[480px] aspect-square mx-auto flex items-center justify-center select-none py-4">
      {/* Radial Gold Backlight Aura */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-gold-500/20 via-gold-400/10 to-transparent blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute w-72 h-72 rounded-full bg-gold-500/15 blur-2xl pointer-events-none" />

      {/* 3D Scene Viewport */}
      <div
        className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        style={{ perspective: '1100px' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* 3D Rotating Pivot Container */}
        <div
          className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[350px] md:h-[350px] transition-transform"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
            willChange: 'transform',
          }}
        >
          {/* Depth Extrusion Layers (Creates physical 3D coin edge thickness) */}
          {[-12, -9, -6, -3, 0, 3, 6, 9, 12].map((z) => (
            <div
              key={z}
              className="absolute inset-0 rounded-full border border-gold-500/30 pointer-events-none bg-neutral-950/60"
              style={{
                transform: `translateZ(${z}px)`,
                boxShadow: '0 0 20px rgba(0,0,0,0.8) inset',
              }}
            />
          ))}

          {/* FRONT FACE (At +15px Z) */}
          <div
            className="absolute inset-0 rounded-full flex flex-col items-center justify-center p-6 border-4 border-gold-500/60 shadow-[0_0_40px_rgba(212,175,55,0.4)] backdrop-blur-md overflow-hidden"
            style={{
              transform: 'translateZ(15px)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              background: `radial-gradient(circle at ${lightX}% 35%, #1f1b12 0%, #111111 60%, #080808 100%)`,
            }}
          >
            {/* Outer Gold Ornamental Ring */}
            <div className="absolute inset-2.5 rounded-full border-2 border-dashed border-gold-400/40 pointer-events-none" />
            <div className="absolute inset-5 rounded-full border border-gold-500/30 pointer-events-none" />

            {/* Specular Sheen Reflection sweep */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40 transition-opacity"
              style={{
                background: `linear-gradient(${115 + rotY * 0.4}deg, transparent 30%, rgba(255,240,180,0.3) 50%, transparent 70%)`,
              }}
            />

            {/* Front Logo Image */}
            <div className="relative w-[190px] h-[190px] sm:w-[220px] sm:h-[220px] drop-shadow-[0_8px_25px_rgba(212,175,55,0.55)]">
              <Image
                src="/VST_Fitness_World_Logo_Transparent.png"
                alt="VST Fitness World 3D Emblem Front"
                fill
                sizes="(max-width: 640px) 190px, 240px"
                className="object-contain pointer-events-none"
                priority
              />
            </div>

            {/* Subtle Metallic Bevel Overlay */}
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-gold-300/30 pointer-events-none" />
          </div>

          {/* BACK FACE (At -15px Z and rotateY 180deg) */}
          {/* Note: The back side displays the EXACT SAME 3D LOGO as requested! */}
          <div
            className="absolute inset-0 rounded-full flex flex-col items-center justify-center p-6 border-4 border-gold-500/60 shadow-[0_0_40px_rgba(212,175,55,0.4)] backdrop-blur-md overflow-hidden"
            style={{
              transform: 'rotateY(180deg) translateZ(15px)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              background: `radial-gradient(circle at ${100 - lightX}% 35%, #1f1b12 0%, #111111 60%, #080808 100%)`,
            }}
          >
            {/* Outer Gold Ornamental Ring */}
            <div className="absolute inset-2.5 rounded-full border-2 border-dashed border-gold-400/40 pointer-events-none" />
            <div className="absolute inset-5 rounded-full border border-gold-500/30 pointer-events-none" />

            {/* Specular Sheen Reflection sweep on back */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40 transition-opacity"
              style={{
                background: `linear-gradient(${115 - rotY * 0.4}deg, transparent 30%, rgba(255,240,180,0.3) 50%, transparent 70%)`,
              }}
            />

            {/* Back Logo Image (Identical right-side forward presentation!) */}
            <div className="relative w-[190px] h-[190px] sm:w-[220px] sm:h-[220px] drop-shadow-[0_8px_25px_rgba(212,175,55,0.55)]">
              <Image
                src="/VST_Fitness_World_Logo_Transparent.png"
                alt="VST Fitness World 3D Emblem Back"
                fill
                sizes="(max-width: 640px) 190px, 240px"
                className="object-contain pointer-events-none"
                priority
              />
            </div>

            {/* Subtle Metallic Bevel Overlay */}
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-gold-300/30 pointer-events-none" />
          </div>
        </div>

        {/* 3D Contact Shadow on the Floor */}
        <div
          className="absolute -bottom-8 w-56 sm:w-64 h-8 rounded-full bg-black/80 blur-xl pointer-events-none transition-transform duration-200"
          style={{
            transform: `scale(${1 - Math.abs(rotX) * 0.01})`,
            opacity: 0.85,
          }}
        />
      </div>

      {/* Floating 3D Interaction Badge / Hint */}
      <div
        className={`absolute -bottom-3 sm:-bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/85 border border-gold-500/40 text-[10px] sm:text-xs text-gold-300 font-semibold uppercase tracking-wider backdrop-blur-md shadow-xl transition-opacity duration-500 pointer-events-none whitespace-nowrap ${
          hasInteracted ? 'opacity-40 hover:opacity-100' : 'opacity-90 animate-bounce'
        }`}
      >
        <Move3d className="w-3.5 h-3.5 text-gold-400" />
        <span>Swipe / Drag to spin 3D Logo</span>
        <Sparkles className="w-3 h-3 text-gold-400" />
      </div>
    </div>
  );
}
