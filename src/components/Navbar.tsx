'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Crown, Phone, ChevronRight } from 'lucide-react';
import { GYM_INFO } from '@/data/gymData';
import { GymInfo } from '@/types';

interface NavbarProps {
  onOpenLeadsModal?: () => void;
  settings?: GymInfo;
}

export default function Navbar({ onOpenLeadsModal, settings = GYM_INFO }: NavbarProps) {
  const currentSettings = settings || GYM_INFO;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section
      const sections = [
        'home',
        'about',
        'gallery',
        'equipment',
        'features',
        'programs',
        'trainers',
        'reviews',
        'pricing',
        'contact',
      ];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Equipment', href: '#equipment' },
    { name: 'Features', href: '#features' },
    { name: 'Programs', href: '#programs' },
    { name: 'Trainers', href: '#trainers' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-gold-500/20 py-2.5 sm:py-3 shadow-2xl shadow-black/80'
            : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-3 sm:py-4'
        }`}
      >
        <div className="w-full max-w-[1680px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left Column: Brand Logo (Guaranteed non-shrinking, clean spacing) */}
          <Link href="#home" className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0 z-10">
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/VST_Fitness_World_Logo_Transparent.png"
                alt="VST Fitness World Logo"
                fill
                sizes="(max-width: 640px) 36px, 48px"
                className="object-contain drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bebas text-xl sm:text-2xl md:text-3xl tracking-wider text-white leading-none whitespace-nowrap">
                VST <span className="gold-gradient-text">FITNESS</span>
              </span>
              <span className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] text-neutral-400 uppercase font-semibold whitespace-nowrap">
                World • Pallikaranai
              </span>
            </div>
          </Link>

          {/* Middle Column: Desktop Nav Links (Centered, fully visible, zero clipping on HOME or CONTACT) */}
          <nav className="hidden xl:flex items-center justify-center flex-1 mx-2 2xl:mx-6 gap-0.5 xl:gap-1.5 2xl:gap-3.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`group relative text-[10.5px] xl:text-[11.5px] 2xl:text-[13px] font-semibold tracking-wider uppercase transition-all duration-200 py-1.5 px-1.5 xl:px-2 2xl:px-3 rounded-full whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? 'text-gold-300 font-bold bg-gold-500/10'
                      : 'text-neutral-300 hover:text-gold-400 hover:bg-neutral-900/60'
                  }`}
                >
                  <span className="relative z-10 transition-transform duration-200 inline-block group-hover:-translate-y-0.5">
                    {link.name}
                  </span>

                  {/* Animated Transforming Gold Underline Indicator */}
                  <span
                    className={`absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent transition-all duration-200 origin-center ${
                      isActive
                        ? 'opacity-100 scale-x-100'
                        : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Column: Actions (Guaranteed non-shrinking, clean spacing) */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 z-10">
            {/* Phone link (shown on extra-wide 2xl screens to give maximum room for nav) */}
            <a
              href={`tel:${currentSettings.phoneRaw}`}
              className="hidden 2xl:flex items-center gap-1.5 text-xs font-semibold tracking-wider text-neutral-300 hover:text-gold-400 transition-colors px-3 py-2 rounded-full border border-neutral-800 hover:border-gold-500/40 whitespace-nowrap"
              title="Call Reception"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
              <span>{currentSettings.phoneDisplay}</span>
            </a>

            {/* Book an Enquiry CTA button */}
            <Link
              href="#contact"
              className="btn-gold px-3.5 sm:px-5 2xl:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 shadow-lg shadow-gold-500/25 transition-all hover:scale-[1.02] whitespace-nowrap"
            >
              <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-950 flex-shrink-0" />
              <span>Book an Enquiry</span>
            </Link>

            {/* Mobile / Tablet Menu Transformation Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex xl:hidden relative w-9 h-9 sm:w-10 sm:h-10 items-center justify-center rounded-lg bg-neutral-900/80 border border-neutral-800 hover:border-gold-500/40 focus:outline-none transition-colors p-2 flex-shrink-0"
              aria-label="Toggle navigation menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between items-center relative">
                {/* Top line */}
                <span
                  className={`w-5 h-[2px] bg-gold-400 rounded-full transition-all duration-300 origin-center ${
                    mobileMenuOpen
                      ? 'rotate-45 translate-y-[7px]'
                      : ''
                  }`}
                />
                {/* Middle line */}
                <span
                  className={`w-5 h-[2px] bg-gold-400 rounded-full transition-all duration-200 ${
                    mobileMenuOpen
                      ? 'opacity-0 scale-x-0'
                      : 'opacity-100 scale-x-100'
                  }`}
                />
                {/* Bottom line */}
                <span
                  className={`w-5 h-[2px] bg-gold-400 rounded-full transition-all duration-300 origin-center ${
                    mobileMenuOpen
                      ? '-rotate-45 -translate-y-[7px]'
                      : ''
                  }`}
                />
              </div>
            </button>
          </div>

        </div>
      </header>

      {/* Mobile / Tablet Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile / Tablet Drawer with Slide-in Transformation */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[290px] sm:w-[350px] bg-[#0c0c0c] border-l border-gold-500/30 z-50 flex flex-col justify-between p-6 shadow-2xl transition-all duration-400 cubic-bezier(0.16,1,0.3,1) ${
          mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="overflow-y-auto">
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-5 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 flex-shrink-0">
                <Image
                  src="/VST_Fitness_World_Logo_Transparent.png"
                  alt="VST Fitness Logo"
                  fill
                  sizes="36px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bebas text-xl text-white tracking-wider leading-none">
                  VST <span className="gold-gradient-text">FITNESS</span>
                </span>
                <span className="text-[8px] text-neutral-400 tracking-widest uppercase">
                  World • Pallikaranai
                </span>
              </div>
            </div>

            {/* Close morph button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-400 hover:text-white p-2 rounded-md hover:bg-neutral-900 transition-colors"
              aria-label="Close navigation menu"
            >
              <span className="font-bold text-lg text-gold-400">✕</span>
            </button>
          </div>

          {/* Navigation Links with Transformation Hover */}
          <nav className="flex flex-col gap-2 mt-5">
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ transitionDelay: `${idx * 25}ms` }}
                  className={`group text-sm sm:text-base font-medium tracking-wide py-2.5 px-3.5 rounded-xl transition-all duration-300 flex items-center justify-between ${
                    isActive
                      ? 'bg-gold-500/15 text-gold-400 font-bold border-l-3 border-gold-400 shadow-sm shadow-gold-500/10'
                      : 'text-neutral-300 hover:text-gold-300 hover:bg-neutral-900/80 hover:translate-x-1.5'
                  }`}
                >
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    {link.name}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isActive
                        ? 'text-gold-400 translate-x-0'
                        : 'text-neutral-600 group-hover:text-gold-400 group-hover:translate-x-1'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Drawer Footer Actions */}
        <div className="pt-5 border-t border-neutral-800 flex flex-col gap-3">
          <Link
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-gold w-full py-3 rounded-full text-center text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20 transition-transform hover:scale-[1.02]"
          >
            <Crown className="w-4 h-4 text-neutral-950" />
            <span>Book an Enquiry</span>
          </Link>

          <a
            href={`tel:${currentSettings.phoneRaw}`}
            className="text-center text-xs text-neutral-300 hover:text-gold-400 py-2.5 border border-neutral-800 rounded-full transition-colors flex items-center justify-center gap-2 hover:border-gold-500/40"
          >
            <Phone className="w-3.5 h-3.5 text-gold-400" />
            <span>Call: {currentSettings.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </>
  );
}
