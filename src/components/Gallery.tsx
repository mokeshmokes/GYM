'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS } from '@/data/gymData';
import LightboxModal from './LightboxModal';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'facility' | 'training' | 'equipment'>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems =
    activeFilter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  const filterTabs = [
    { key: 'all', label: 'All Photos' },
    { key: 'facility', label: 'Facility' },
    { key: 'training', label: 'Training' },
    { key: 'equipment', label: 'Equipment' },
  ] as const;

  return (
    <section id="gallery" className="relative py-20 lg:py-28 bg-[#0c0c0c] border-t border-neutral-900 scroll-mt-16">
      <div className="ambient-glow top-[20%] left-[5%] opacity-20" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 mb-4">
            <Camera className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-gold-400">
              Visual Sanctuary
            </span>
          </div>

          <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-none mb-4">
            Sanctuary <span className="gold-gradient-text">Gallery</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Glimpse into Chennai’s most exclusive strength floor, premium calibrated equipment, and championship training atmosphere.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-6" />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
                  isActive
                    ? 'btn-gold shadow-md shadow-gold-500/30 scale-105'
                    : 'bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-white hover:border-gold-500/40'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(index)}
              className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden glass-card cursor-pointer border border-neutral-800 hover:border-gold-500/50 transition-all duration-300 transform hover:-translate-y-1 shadow-xl shadow-black/80"
            >
              <Image
                src={item.image}
                alt={item.caption}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* View Overlay Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-gold-500/40 flex items-center justify-center text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100 backdrop-blur-sm">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-5 transform transition-transform duration-300">
                <span className="text-[10px] font-bold text-gold-400 uppercase tracking-widest block mb-1">
                  {item.categoryLabel}
                </span>
                <h3 className="text-sm sm:text-base font-semibold text-white leading-snug group-hover:text-gold-300 transition-colors">
                  {item.caption}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        items={filteredItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}

