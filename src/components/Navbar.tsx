'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Crown, Phone, ShieldCheck } from 'lucide-react';
import { GYM_INFO } from '@/data/gymData';

interface NavbarProps {
  onOpenLeadsModal: () => void;
}

export default function Navbar({ onOpenLeadsModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section
      const sections = ['home', 'about', 'equipment', 'features', 'programs', 'trainers', 'pricing', 'gallery', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
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
    { name: 'Equipment', href: '#equipment' },
    { name: 'Features', href: '#features' },
    { name: 'Programs', href: '#programs' },
    { name: 'Trainers', href: '#trainers' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-gold-500/20 py-3 shadow-2xl shadow-black/80'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/VST_Fitness_World_Logo_Transparent.png"
                alt="VST Fitness World Logo"
                fill
                sizes="48px"
                className="object-contain drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bebas text-2xl sm:text-3xl tracking-wider text-white leading-none">
                VST <span className="gold-gradient-text">FITNESS</span>
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.22em] text-neutral-400 uppercase font-semibold">
                World • Pallikaranai
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs xl:text-sm font-semibold tracking-wider uppercase transition-colors duration-200 relative py-1 ${
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

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${GYM_INFO.phoneRaw}`}
              className="hidden xl:flex items-center gap-2 text-xs font-semibold tracking-wider text-neutral-300 hover:text-gold-400 transition-colors px-3 py-2 rounded-full border border-neutral-800 hover:border-gold-500/40"
              title="Call Reception"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span>{GYM_INFO.phoneDisplay}</span>
            </a>

            <button
              onClick={onOpenLeadsModal}
              className="text-neutral-500 hover:text-gold-400 transition-colors p-2 text-xs flex items-center gap-1 rounded"
              title="Admin / Staff Lead Vault"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>

            <Link
              href="#contact"
              className="btn-gold px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2"
            >
              <Crown className="w-4 h-4 text-neutral-950" />
              <span>Book VIP Pass</span>
            </Link>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenLeadsModal}
              className="text-neutral-400 hover:text-gold-400 p-1.5"
              title="Admin Vault"
            >
              <ShieldCheck className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-neutral-200 hover:text-gold-400 p-2 focus:outline-none"
              aria-label="Open mobile menu"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[290px] sm:w-[320px] bg-[#0e0e0e] border-l border-gold-500/30 z-50 flex flex-col justify-between p-6 shadow-2xl transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9">
                <Image
                  src="/VST_Fitness_World_Logo_Transparent.png"
                  alt="VST Fitness Logo"
                  fill
                  sizes="36px"
                  className="object-contain"
                />
              </div>
              <span className="font-bebas text-2xl text-white tracking-wider">
                VST <span className="gold-gradient-text">FITNESS</span>
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-400 hover:text-white p-1"
              aria-label="Close mobile menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Nav Links */}
          <nav className="flex flex-col gap-4 mt-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium tracking-wide text-neutral-300 hover:text-gold-400 py-1 transition-colors flex items-center justify-between border-b border-neutral-900"
              >
                <span>{link.name}</span>
                <span className="text-xs text-gold-500/50">›</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Drawer Footer */}
        <div className="pt-6 border-t border-neutral-800 flex flex-col gap-3">
          <Link
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-gold w-full py-3 rounded-full text-center text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Crown className="w-4 h-4 text-neutral-950" />
            <span>Book VIP Pass</span>
          </Link>
          <a
            href={`tel:${GYM_INFO.phoneRaw}`}
            className="text-center text-xs text-neutral-400 hover:text-gold-400 py-2 border border-neutral-800 rounded-full"
          >
            Call Concierge: {GYM_INFO.phoneDisplay}
          </a>
        </div>
      </div>
    </>
  );
}
