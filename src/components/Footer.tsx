'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  ChevronRight,
  Clock,
} from 'lucide-react';
import { GYM_INFO } from '@/data/gymData';

interface FooterProps {
  onOpenLeadsModal?: () => void;
}

export default function Footer({ onOpenLeadsModal }: FooterProps) {
  return (
    <footer className="relative bg-[#070707] border-t border-neutral-900 pt-16 pb-12 overflow-hidden">
      <div className="ambient-glow bottom-0 left-[20%] opacity-15" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 pb-14 border-b border-neutral-800">
          
          {/* Brand Info (col-span-5) */}
          <div className="lg:col-span-5 space-y-5">
            <Link href="#home" className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src="/VST_Fitness_World_Logo_Transparent.png"
                  alt="VST Fitness World Logo"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bebas text-3xl tracking-wider text-white leading-none">
                  VST <span className="gold-gradient-text">FITNESS</span>
                </span>
                <span className="text-[10px] tracking-[0.25em] text-neutral-400 uppercase font-semibold">
                  World • Pallikaranai, Chennai
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-md">
              The benchmark of uncompromising strength, science-based physique architecture, and luxury wellness. Designed for champions who demand physical mastery.
            </p>

            <div className="space-y-2.5 text-xs text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>{GYM_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href={`tel:${GYM_INFO.phoneRaw}`} className="hover:text-gold-400 transition-colors">
                  {GYM_INFO.phoneDisplay}
                </a>
                <span>/</span>
                <a href={`tel:${GYM_INFO.phoneRaw}`} className="hover:text-gold-400 transition-colors">
                  {GYM_INFO.phoneInternational}
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={GYM_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-gold-400 hover:border-gold-500/40 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-gold-400 hover:border-gold-500/40 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-gold-400 hover:border-gold-500/40 transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-gold-400 hover:border-gold-500/40 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-bebas text-xl text-white tracking-wider">
              Explore Sanctuary
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About Us', href: '#about' },
                { label: 'Gym Gallery', href: '#gallery' },
                { label: 'Gym Equipment', href: '#equipment' },
                { label: 'Why Choose Us', href: '#features' },
                { label: 'Training Programs', href: '#programs' },
                { label: 'Master Coaches', href: '#trainers' },
                { label: 'Member Reviews', href: '#reviews' },
                { label: 'Membership Plans', href: '#pricing' },
                { label: 'Book an Enquiry', href: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-gold-400 transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-gold-500/60" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sanctuary Timings (col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-bebas text-xl text-white tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold-400" />
              <span>Sanctuary Timings</span>
            </h4>
            <ul className="space-y-3 text-xs text-neutral-400 divide-y divide-neutral-900">
              <li className="flex justify-between pt-1">
                <span>Monday – Friday:</span>
                <span className="font-semibold text-neutral-200">{GYM_INFO.hours.weekdays}</span>
              </li>
              <li className="flex justify-between pt-2">
                <span>Saturday:</span>
                <span className="font-semibold text-neutral-200">{GYM_INFO.hours.saturday}</span>
              </li>
              <li className="flex justify-between pt-2">
                <span>Sunday:</span>
                <span className="font-semibold text-neutral-200">{GYM_INFO.hours.sunday}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom (Clean Customer Facing, No Staff Control) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} <strong className="text-neutral-300">VST FITNESS WORLD</strong>. All Rights Reserved. Built for champions.
          </div>

          <div className="flex items-center gap-6">
            <Link href="#home" className="hover:text-neutral-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#home" className="hover:text-neutral-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
