'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import About from '@/components/About';
import Equipment from '@/components/Equipment';
import Features from '@/components/Features';
import Programs from '@/components/Programs';
import Trainers from '@/components/Trainers';
import Pricing from '@/components/Pricing';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import LeadsVaultModal from '@/components/LeadsVaultModal';
import { usePackages } from '@/hooks/usePackages';

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<string>('Quarterly Pro');
  const [leadsModalOpen, setLeadsModalOpen] = useState<boolean>(false);
  const { packages } = usePackages();

  const handleSelectProgramOrPlan = (planOrProgramName: string) => {
    setSelectedPlan(planOrProgramName);
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-neutral-100 flex flex-col justify-between overflow-x-hidden">
      {/* Sticky Glass Navbar */}
      <Navbar onOpenLeadsModal={() => setLeadsModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        <Hero />
        <Stats />
        <About />
        <Gallery />
        <Equipment />
        <Features />
        <Programs onSelectProgram={handleSelectProgramOrPlan} />
        <Trainers />
        <Testimonials />
        <Pricing packages={packages} onSelectPlan={handleSelectProgramOrPlan} />
        <Contact
          packages={packages}
          selectedPlan={selectedPlan}
          onOpenLeadsModal={() => setLeadsModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer onOpenLeadsModal={() => setLeadsModalOpen(true)} />

      {/* Floating Action Buttons (WhatsApp & Back-to-Top) */}
      <FloatingActions />

      {/* Stored Leads Vault Modal (Admin & Demo Inspector) */}
      <LeadsVaultModal
        isOpen={leadsModalOpen}
        onClose={() => setLeadsModalOpen(false)}
      />
    </div>
  );
}
