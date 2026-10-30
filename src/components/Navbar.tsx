'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Crown, Phone } from 'lucide-react';
import { GYM_INFO } from '@/data/gymData';

interface NavbarProps {
  onOpenLeadsModal?: () => void;
}

export default function Navbar({ onOpenLeadsModal }: NavbarProps) {
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-gold-500/20 py-2.5 sm:py-3 shadow-2xl shadow-black/80'
            : 'bg-gradient-to-b from-black/85 via-black/45 to-transparent py-3.5 sm:py-5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between gap-3 lg:gap-6">
          {/* Brand Logo */}
          <Link href="#home" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
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

          {/* Desktop Nav Links (Visible on xl screens and above) */}
          <nav className="hidden xl:flex items-center gap-3.5 2xl:gap-6 flex-shrink-0">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs 2xl:text-[13px] font-semibold tracking-wider uppercase transition-colors duration-200 relative py-1 px-1 whitespace-nowrap ${
                    isActive
                      ? 'text-gold-400 font-bold'
                      : 'text-neutral-300 hover:text-gold-400'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            {/* Phone link (shown on large screens) */}
            <a
              href={`tel:${GYM_INFO.phoneRaw}`}
              className="hidden lg:flex items-center gap-2 text-xs font-semibold tracking-wider text-neutral-300 hover:text-gold-400 transition-colors px-3.5 py-2 rounded-full border border-neutral-800 hover:border-gold-500/40"
              title="Call Reception"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span>{GYM_INFO.phoneDisplay}</span>
            </a>

            {/* Book an Enquiry CTA button */}
            <Link
              href="#contact"
              className="btn-gold px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-gold-500/25 transition-all hover:scale-[1.02]"
            >
              <Crown className="w-4 h-4 text-neutral-950 flex-shrink-0" />
              <span className="whitespace-nowrap">Book an Enquiry</span>
            </Link>

            {/* Mobile / Tablet Menu Button (Visible on screens below xl) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex xl:hidden text-neutral-200 hover:text-gold-400 p-2 rounded-lg bg-neutral-900/80 border border-neutral-800 hover:border-gold-500/40 focus:outline-none transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / Tablet Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile / Tablet Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[290px] sm:w-[350px] bg-[#0c0c0c] border-l border-gold-500/30 z-50 flex flex-col justify-between p-6 shadow-2xl transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
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
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-400 hover:text-white p-1 rounded-md hover:bg-neutral-900"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2 mt-5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm sm:text-base font-medium tracking-wide py-2.5 px-3 rounded-lg transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-gold-500/15 text-gold-400 font-bold border-l-2 border-gold-400'
                      : 'text-neutral-300 hover:text-gold-400 hover:bg-neutral-900/60'
                  }`}
                >
                  <span>{link.name}</span>
                  <span className="text-xs text-gold-500/60">›</span>
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
            className="btn-gold w-full py-3 rounded-full text-center text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20"
          >
            <Crown className="w-4 h-4 text-neutral-950" />
            <span>Book an Enquiry</span>
          </Link>

          <a
            href={`tel:${GYM_INFO.phoneRaw}`}
            className="text-center text-xs text-neutral-300 hover:text-gold-400 py-2.5 border border-neutral-800 rounded-full transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-3.5 h-3.5 text-gold-400" />
            <span>Call: {GYM_INFO.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </>
  );
}
