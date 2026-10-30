'use client';

import React, { useState } from 'react';
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
  Send,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import { GYM_INFO } from '@/data/gymData';

interface FooterProps {
  onOpenLeadsModal: () => void;
}

export default function Footer({ onOpenLeadsModal }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 4000);
    }
  };

  return (
    <footer className="relative bg-[#070707] border-t border-neutral-900 pt-16 pb-12 overflow-hidden">
      <div className="ambient-glow bottom-0 left-[20%] opacity-15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-neutral-800">
          {/* Brand Info (col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
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

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              The standard of uncompromising strength, science-based physique architecture, and luxury fitness wellness. Forged for those who demand physical mastery.
            </p>

            <div className="space-y-2 text-xs text-neutral-300">
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

          {/* Quick Links (col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-bebas text-xl text-white tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About Us', href: '#about' },
                { label: 'Gym Equipment', href: '#equipment' },
                { label: 'Why Choose Us', href: '#features' },
                { label: 'Training Programs', href: '#programs' },
                { label: 'Master Coaches', href: '#trainers' },
                { label: 'Membership Plans', href: '#pricing' },
                { label: 'Gallery & Results', href: '#gallery' },
                { label: 'Contact Concierge', href: '#contact' },
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

          {/* Sanctuary Timings (col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-bebas text-xl text-white tracking-wider">
              Sanctuary Timings
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 divide-y divide-neutral-900">
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
              <li className="flex justify-between pt-2">
                <span>VIP Cardholders:</span>
                <span className="font-semibold text-gold-400">{GYM_INFO.hours.vip}</span>
              </li>
              <li className="flex justify-between pt-2">
                <span>Spa & Ice Plunge:</span>
                <span className="font-semibold text-neutral-200">{GYM_INFO.hours.spa}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe (col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-bebas text-xl text-white tracking-wider">
              Elite Newsletter
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Subscribe for exclusive workout programming blueprints, science-backed nutrition insights, and guest passes.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-gold-400"
                />
                <button
                  type="submit"
                  className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5 text-neutral-950" />
                </button>
              </div>

              {newsletterSuccess && (
                <div className="text-xs text-emerald-400 flex items-center gap-1.5 animate-fade-in font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed! Welcome to the VST inner circle.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} <strong className="text-neutral-300">VST FITNESS WORLD</strong>. All Rights Reserved. Built for champions.
          </div>

          <div className="flex items-center gap-4">
            <Link href="#home" className="hover:text-neutral-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#home" className="hover:text-neutral-300 transition-colors">
              Terms of Service
            </Link>
            <button
              onClick={onOpenLeadsModal}
              className="text-neutral-500 hover:text-gold-400 transition-colors flex items-center gap-1"
              title="Staff Portal / Lead Vault"
            >
              <Lock className="w-3 h-3" />
              <span>Staff Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
