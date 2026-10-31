'use client';

import React from 'react';
import { Gem, Crown, Check, X, ArrowRight } from 'lucide-react';
import { PricingPlan } from '@/types';
import { PRICING_PLANS } from '@/data/gymData';

interface PricingProps {
  onSelectPlan: (planName: string) => void;
  packages?: PricingPlan[];
}

export default function Pricing({ onSelectPlan, packages = PRICING_PLANS }: PricingProps) {
  const activePackages = packages && packages.length > 0 ? packages : PRICING_PLANS;

  const handleSelectPlan = (e: React.MouseEvent<HTMLAnchorElement>, planName: string) => {
    e.preventDefault();
    onSelectPlan(planName);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getGridColsClass = () => {
    if (activePackages.length === 1) return 'max-w-md';
    if (activePackages.length === 2) return 'md:grid-cols-2 max-w-4xl';
    if (activePackages.length === 4) return 'md:grid-cols-2 lg:grid-cols-4 max-w-7xl';
    return 'md:grid-cols-2 lg:grid-cols-3 max-w-6xl';
  };

  return (
    <section id="pricing" className="relative py-16 sm:py-20 lg:py-28 bg-[#0c0c0c] border-t border-neutral-900 scroll-mt-16">
      <div className="ambient-glow bottom-[10%] right-[5%] opacity-20" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 mb-4">
            <Gem className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-gold-400">
              Exclusive Memberships
            </span>
          </div>

          <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-none mb-4">
            Transparent <span className="gold-gradient-text">Tiered Pricing</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Invest in your longevity, physical presence, and championship mindset with our flexible luxury plans.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-6" />
        </div>

        {/* Pricing Cards Grid (Fully Dynamic from Sanity) */}
        <div className={`grid grid-cols-1 ${getGridColsClass()} gap-6 lg:gap-8 items-stretch mx-auto`}>
          {activePackages.map((plan) => {
            const isPopular = Boolean(plan.isPopular);
            const badgeLabel = plan.badge || (isPopular ? 'Most Popular' : null);

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 transform hover:-translate-y-1.5 shadow-2xl ${
                  isPopular
                    ? 'bg-neutral-900/95 border-2 border-gold-500 shadow-gold-500/15 ring-1 ring-gold-400/50'
                    : 'glass-card border border-neutral-800 hover:border-gold-500/40'
                }`}
              >
                {/* Popular or Custom Badge Ribbon */}
                {badgeLabel && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold-gradient text-neutral-950 font-bold text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-gold-500/40 whitespace-nowrap">
                    <Crown className="w-3.5 h-3.5" />
                    <span>{badgeLabel}</span>
                  </div>
                )}

                <div className="flex-1 flex flex-col">
                  {/* Tier Title - Consistent height keeps Price on the exact same line */}
                  <h3
                    className={`font-bebas text-2xl sm:text-3xl tracking-wide min-h-[3.25rem] sm:min-h-[4rem] flex items-start leading-tight mb-2 ${
                      isPopular ? 'gold-gradient-text' : 'text-white'
                    }`}
                  >
                    {plan.tier}
                  </h3>

                  {/* Description - Consistent height across cards */}
                  <p className="text-xs text-neutral-400 leading-relaxed mb-6 min-h-[3.75rem] sm:min-h-[4.25rem] flex items-start">
                    {plan.desc}
                  </p>

                  {/* Price Box - Guaranteed on the exact same horizontal baseline */}
                  <div className="flex items-baseline gap-1 mb-6 sm:mb-8 pb-5 border-b border-neutral-800">
                    <span className="text-xl sm:text-2xl font-bold text-gold-400">{plan.currency || '₹'}</span>
                    <span className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-white font-bold tracking-tight">
                      {plan.amount}
                    </span>
                    <span className="text-xs font-semibold text-neutral-400 tracking-wider">
                      {plan.period}
                    </span>
                  </div>

                  {/* Feature Checklist - flex-1 keeps buttons aligned at bottom */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features?.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-sm">
                        {feat.included ? (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gold-500/15 border border-gold-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-gold-400" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-neutral-800/80 border border-neutral-700/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <X className="w-3 h-3 text-neutral-500" />
                          </div>
                        )}
                        <span
                          className={`leading-snug ${
                            feat.included ? 'text-neutral-200' : 'text-neutral-500 line-through'
                          }`}
                        >
                          {feat.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA Button - Slightly reduced content size to prevent awkward wrapping */}
                <a
                  href="#contact"
                  onClick={(e) => handleSelectPlan(e, plan.enrollValue || plan.tier)}
                  className={`w-full py-3 px-3 sm:px-4 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 group whitespace-nowrap overflow-hidden text-ellipsis ${
                    isPopular
                      ? 'btn-gold shadow-lg shadow-gold-500/30'
                      : 'btn-outline-gold hover:bg-gold-500/10'
                  }`}
                >
                  <span className="truncate">{plan.buttonText || 'Select Plan'}</span>
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
