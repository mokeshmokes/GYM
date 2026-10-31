'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LazySection from '@/components/LazySection';
import { usePackages } from '@/hooks/usePackages';
import { useGymSettings } from '@/hooks/useGymSettings';
import { useAnnouncement } from '@/hooks/useAnnouncement';

// Dynamically import all below-the-fold sections for maximum performance
const AnnouncementSection = dynamic(() => import('@/components/AnnouncementSection'), { ssr: false });
const Stats = dynamic(() => import('@/components/Stats'));
const About = dynamic(() => import('@/components/About'));
const Gallery = dynamic(() => import('@/components/Gallery'));
const Equipment = dynamic(() => import('@/components/Equipment'));
const Features = dynamic(() => import('@/components/Features'));
const Programs = dynamic(() => import('@/components/Programs'));
const Trainers = dynamic(() => import('@/components/Trainers'));
const Testimonials = dynamic(() => import('@/components/Testimonials'));
const Pricing = dynamic(() => import('@/components/Pricing'));
const Contact = dynamic(() => import('@/components/Contact'));
const Footer = dynamic(() => import('@/components/Footer'));
const FloatingActions = dynamic(() => import('@/components/FloatingActions'), { ssr: false });
const LeadsVaultModal = dynamic(() => import('@/components/LeadsVaultModal'), { ssr: false });
const AnnouncementModal = dynamic(() => import('@/components/AnnouncementModal'), { ssr: false });

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<string>('Quarterly Pro');
  const [leadsModalOpen, setLeadsModalOpen] = useState<boolean>(false);
  const { packages } = usePackages();
  const { settings } = useGymSettings();
  const { announcement } = useAnnouncement();

  const handleSelectProgramOrPlan = (planOrProgramName: string) => {
    setSelectedPlan(planOrProgramName);
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-neutral-100 flex flex-col justify-between overflow-x-hidden">
      {/* Sticky Glass Navbar */}
      <Navbar settings={settings} onOpenLeadsModal={() => setLeadsModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* Immediate Above-the-fold Hero */}
        <Hero />

        {/* Announcement Banner (Client-side when active) */}
        {announcement?.showBanner && (
          <LazySection minHeight="80px">
            <AnnouncementSection announcement={announcement} />
          </LazySection>
        )}

        {/* Dynamic Viewport Lazy Loaded Sections */}
        <LazySection minHeight="140px">
          <Stats />
        </LazySection>

        <LazySection id="about" minHeight="560px">
          <About />
        </LazySection>

        <LazySection id="gallery" minHeight="560px">
          <Gallery />
        </LazySection>

        <LazySection id="equipment" minHeight="560px">
          <Equipment />
        </LazySection>

        <LazySection id="features" minHeight="560px">
          <Features />
        </LazySection>

        <LazySection id="programs" minHeight="560px">
          <Programs onSelectProgram={handleSelectProgramOrPlan} />
        </LazySection>

        <LazySection id="trainers" minHeight="560px">
          <Trainers />
        </LazySection>

        <LazySection id="reviews" minHeight="460px">
          <Testimonials />
        </LazySection>

        <LazySection id="pricing" minHeight="640px">
          <Pricing packages={packages} onSelectPlan={handleSelectProgramOrPlan} />
        </LazySection>

        <LazySection id="contact" minHeight="640px">
          <Contact
            settings={settings}
            packages={packages}
            selectedPlan={selectedPlan}
            onOpenLeadsModal={() => setLeadsModalOpen(true)}
          />
        </LazySection>
      </main>

      {/* Footer Lazy Loaded on Viewport Arrival */}
      <LazySection minHeight="320px">
        <Footer settings={settings} onOpenLeadsModal={() => setLeadsModalOpen(true)} />
      </LazySection>

      {/* Floating Action Buttons (WhatsApp & Back-to-Top) */}
      <FloatingActions settings={settings} />

      {/* Stored Leads Vault Modal (Admin & Demo Inspector) */}
      <LeadsVaultModal
        settings={settings}
        isOpen={leadsModalOpen}
        onClose={() => setLeadsModalOpen(false)}
      />

      {/* Auto Pop-up Announcement Modal on Site Open (Controlled by Sanity) */}
      <AnnouncementModal announcement={announcement} />
    </div>
  );
}
