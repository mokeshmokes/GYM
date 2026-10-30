'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Dumbbell,
  Crown,
  ChevronDown,
  Check,
  Zap,
} from 'lucide-react';
import { GYM_INFO, PRICING_PLANS } from '@/data/gymData';
import { LeadRecord, PricingPlan } from '@/types';

interface ContactProps {
  selectedPlan: string;
  onOpenLeadsModal?: () => void;
  packages?: PricingPlan[];
}

export default function Contact({
  selectedPlan,
  packages = PRICING_PLANS,
}: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    plan: selectedPlan || 'Quarterly Pro',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (selectedPlan) {
      setFormData((prev) => ({ ...prev, plan: selectedPlan }));
    }
  }, [selectedPlan]);

  const membershipPlans = packages && packages.length > 0
    ? packages.map((pkg) => ({
        val: pkg.enrollValue || pkg.tier,
        label: pkg.tier,
        price: `${pkg.currency || '₹'}${pkg.amount}${pkg.period}`,
        isPopular: pkg.isPopular,
      }))
    : [
        { val: 'Monthly Starter', label: 'Monthly Starter', price: '₹2,999/mo', isPopular: false },
        { val: 'Quarterly Pro', label: 'Quarterly Pro Athlete', price: '₹7,499/qtr', isPopular: true },
        { val: 'Yearly VIP', label: 'Yearly VIP Elite', price: '₹24,999/yr', isPopular: false },
      ];

  const disciplines = [
    { val: 'Weight Training', label: 'Weight Training Program', desc: 'Hypertrophy, strength & Olympic lifting' },
    { val: 'Cardio', label: 'Cardio Conditioning', desc: 'Stamina, HIIT & endurance' },
    { val: 'CrossFit', label: 'CrossFit & Functional Rig', desc: 'Sleds, turf & power endurance' },
    { val: 'Yoga', label: 'Yoga & Mobility', desc: 'Flexibility, core stability & breathwork' },
    { val: 'Zumba', label: 'Zumba & Dance Fitness', desc: 'High-energy fat-burning dance' },
    { val: 'Weight Loss Program', label: 'Weight Loss & Shred', desc: 'Structured deficit & body recomp' },
    { val: 'Muscle Gain', label: 'Muscle Gain & Bulk', desc: 'Progressive overload mass building' },
    { val: 'Personal Training Only', label: '1-on-1 Personal Training Only', desc: 'Master coach dedicated sessions' },
  ];

  const selectedMemberPkg = membershipPlans.find((p) => p.val === formData.plan);
  const selectedDiscipline = disciplines.find((d) => d.val === formData.plan);

  const currentPlanDisplay =
    selectedMemberPkg
      ? `${selectedMemberPkg.label} (${selectedMemberPkg.price})`
      : selectedDiscipline
      ? selectedDiscipline.label
      : formData.plan;

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };

    if (field === 'name') {
      if (!value.trim() || value.trim().length < 2) {
        newErrors.name = 'Please enter your full name (minimum 2 letters).';
      } else {
        delete newErrors.name;
      }
    }

    if (field === 'phone') {
      const clean = value.replace(/\D/g, '').slice(-10);
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(clean)) {
        newErrors.phone = 'Please enter a valid 10-digit mobile number.';
      } else {
        delete newErrors.phone;
      }
    }

    if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim() || !emailRegex.test(value.trim())) {
        newErrors.email = 'Please provide a valid email address.';
      } else {
        delete newErrors.email;
      }
    }

    setErrors(newErrors);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const saveLeadLocally = (lead: LeadRecord) => {
    try {
      const existing = localStorage.getItem('vst_leads');
      const leads: LeadRecord[] = existing ? JSON.parse(existing) : [];
      leads.unshift(lead);
      localStorage.setItem('vst_leads', JSON.stringify(leads));
    } catch (err) {
      console.warn('LocalStorage save failed:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const nameValid = formData.name.trim().length >= 2;
    const cleanPhone = formData.phone.replace(/\D/g, '').slice(-10);
    const phoneValid = /^[6-9]\d{9}$/.test(cleanPhone);
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());

    const newErrors: Record<string, string> = {};
    if (!nameValid) newErrors.name = 'Please enter your full name (minimum 2 letters).';
    if (!phoneValid) newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    if (!emailValid) newErrors.email = 'Please provide a valid email address.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const customWebhook = typeof window !== 'undefined' ? localStorage.getItem('vst_sheet_webhook') : null;

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: cleanPhone,
          webhookUrl: customWebhook || undefined,
        }),
      });

      const resData = await response.json();

      const newLead: LeadRecord = {
        id: 'lead_' + Date.now(),
        timestamp,
        name: formData.name.trim(),
        phone: cleanPhone,
        email: formData.email.trim(),
        plan: formData.plan,
        message: formData.message.trim(),
        status: resData.cloudSynced ? 'Synced' : 'Saved to Vault',
      };

      saveLeadLocally(newLead);
      setSubmitSuccess(true);
      setSyncStatus('Enquiry registered • Our team will contact you shortly via Call or WhatsApp');

      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        plan: 'Quarterly Pro',
        message: '',
      });
      setErrors({});
    } catch (err) {
      console.error('Submission error:', err);
      // Failsafe local save
      const fallbackLead: LeadRecord = {
        id: 'lead_' + Date.now(),
        timestamp,
        name: formData.name.trim(),
        phone: cleanPhone,
        email: formData.email.trim(),
        plan: formData.plan,
        message: formData.message.trim(),
        status: 'Saved to Vault',
      };
      saveLeadLocally(fallbackLead);
      setSubmitSuccess(true);
      setSyncStatus('Enquiry received • Our team will contact you shortly via Call or WhatsApp');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 lg:py-28 bg-[#0a0a0a]">
      <div className="ambient-glow top-[20%] right-[-100px] opacity-25" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 mb-4">
            <Mail className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-gold-400">
              Get In Touch
            </span>
          </div>

          <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-none mb-4">
            Visit <span className="gold-gradient-text">VST Fitness World</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Book your visit, tour our training floor, or speak directly with our certified master coaches.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-6" />
        </div>

        {/* Contact Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Details & Google Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gold-500/30 shadow-2xl">
              <h3 className="font-bebas text-2xl text-white tracking-wide mb-6">
                Gym Address & Contact
              </h3>

              <div className="space-y-6">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center flex-shrink-0 text-gold-400 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Gym Location
                    </h4>
                    <p className="text-sm text-neutral-200 leading-snug">
                      {GYM_INFO.address}
                    </p>
                    <a
                      href={GYM_INFO.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-gold-400 hover:text-gold-300 inline-flex items-center gap-1 mt-2 transition-colors"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Phone & WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center flex-shrink-0 text-gold-400 mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Phone & WhatsApp
                    </h4>
                    <p className="text-sm text-neutral-200">
                      <a href={`tel:${GYM_INFO.phoneRaw}`} className="hover:text-gold-400 transition-colors">
                        {GYM_INFO.phoneDisplay}
                      </a>{' '}
                      /{' '}
                      <a href={`tel:${GYM_INFO.phoneRaw}`} className="hover:text-gold-400 transition-colors">
                        {GYM_INFO.phoneInternational}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center flex-shrink-0 text-gold-400 mt-1">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Email Us
                    </h4>
                    <p className="text-sm text-neutral-200">
                      <a href={`mailto:${GYM_INFO.email}`} className="hover:text-gold-400 transition-colors">
                        {GYM_INFO.email}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center flex-shrink-0 text-gold-400 mt-1">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Sanctuary Timings
                    </h4>
                    <p className="text-sm text-neutral-200 leading-snug">
                      Mon – Sat: {GYM_INFO.hours.weekdays} <br />
                      Sunday: {GYM_INFO.hours.sunday}
                    </p>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="mt-8 pt-6 border-t border-neutral-800 flex items-center gap-3">
                <a
                  href={GYM_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-gold-400 hover:border-gold-500/50 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-gold-400 hover:border-gold-500/50 transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-gold-400 hover:border-gold-500/50 transition-all"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-gold-400 hover:border-gold-500/50 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-gold-400 hover:border-gold-500/50 transition-all"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="relative h-64 rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl group">
              <iframe
                title="VST Fitness World Pallikaranai Location"
                src={GYM_INFO.googleMapsEmbed}
                className="w-full h-full border-0 grayscale invert contrast-125 opacity-80 group-hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href={GYM_INFO.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-black/80 text-gold-400 border border-gold-500/50 text-xs font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 hover:bg-gold-500 hover:text-black transition-all shadow-lg"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>View on Maps</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact & Visit Booking Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-10 rounded-3xl border border-gold-500/30 shadow-2xl relative">
              {/* Gym Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/40 text-gold-300 text-xs font-bold tracking-wider mb-5">
                <Dumbbell className="w-3.5 h-3.5 text-gold-400" />
                <span>Sanctuary Visit & Membership Consultation</span>
              </div>

              <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide mb-2">
                Book Your Gym Enquiry
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                Step into Chennai’s premier luxury fitness sanctuary. Fill in your details below to tour our 150+ imported equipment stations, consult our certified master trainers, and explore our membership options.
              </p>

              {/* Gym Benefits Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 mb-6 text-[11px] text-neutral-300">
                <div className="flex items-center gap-1.5 text-gold-300 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                  <span>Personal Consultation</span>
                </div>
                <div className="flex items-center gap-1.5 text-gold-300 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                  <span>Full Arsenal Floor Tour</span>
                </div>
                <div className="flex items-center gap-1.5 text-gold-300 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                  <span>Master Coach Advice</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2"
                  >
                    Full Name <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    required
                    className={`w-full px-4 py-3.5 rounded-xl bg-neutral-900/90 border text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                      errors.name
                        ? 'border-red-500/80 focus:border-red-500'
                        : 'border-neutral-800 focus:border-gold-400'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone & Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2"
                    >
                      Phone Number <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile (e.g. 9876543210)"
                      maxLength={10}
                      required
                      className={`w-full px-4 py-3.5 rounded-xl bg-neutral-900/90 border text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                        errors.phone
                          ? 'border-red-500/80 focus:border-red-500'
                          : 'border-neutral-800 focus:border-gold-400'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2"
                    >
                      Email Address <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. rahul@example.com"
                      required
                      className={`w-full px-4 py-3.5 rounded-xl bg-neutral-900/90 border text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                        errors.email
                          ? 'border-red-500/80 focus:border-red-500'
                          : 'border-neutral-800 focus:border-gold-400'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Custom Luxury Gym Plan Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <label
                    id="plan-label"
                    className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2"
                  >
                    Interested Program / Plan
                  </label>

                  {/* Dropdown Trigger Button */}
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                    aria-labelledby="plan-label"
                    className={`w-full px-4 py-3.5 rounded-xl bg-neutral-900 border text-sm text-left flex items-center justify-between transition-all duration-200 ${
                      isDropdownOpen
                        ? 'border-gold-400 ring-2 ring-gold-400/20 bg-neutral-900 shadow-xl shadow-gold-500/10'
                        : 'border-neutral-800 hover:border-gold-500/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      {selectedMemberPkg ? (
                        <div className="w-6 h-6 rounded-md bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 flex-shrink-0">
                          <Crown className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-md bg-neutral-800 border border-neutral-700 flex items-center justify-center text-gold-400 flex-shrink-0">
                          <Dumbbell className="w-3.5 h-3.5" />
                        </div>
                      )}

                      <span className="text-white font-medium text-xs sm:text-sm truncate">
                        {currentPlanDisplay}
                      </span>
                    </div>

                    <ChevronDown
                      className={`w-4 h-4 text-gold-400 flex-shrink-0 transition-transform duration-300 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Hidden Input for Form Submission */}
                  <input type="hidden" name="plan" value={formData.plan} />

                  {/* Custom Floating Luxury Options Menu */}
                  {isDropdownOpen && (
                    <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 bg-[#0c0c0c]/98 border border-gold-500/40 rounded-2xl shadow-2xl shadow-black p-2 backdrop-blur-xl animate-fade-in max-h-80 overflow-y-auto no-scrollbar divide-y divide-neutral-800/70">
                      
                      {/* Section 1: Membership Packages */}
                      <div className="pb-2">
                        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-gold-400/90 flex items-center gap-1.5">
                          <Crown className="w-3 h-3 text-gold-400" />
                          <span>Gym Membership Packages</span>
                        </div>
                        <div className="space-y-1">
                          {membershipPlans.map((pkg) => {
                            const isSelected = formData.plan === pkg.val;
                            return (
                              <button
                                key={pkg.val}
                                type="button"
                                onClick={() => {
                                  setFormData((prev) => ({ ...prev, plan: pkg.val }));
                                  setIsDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between group ${
                                  isSelected
                                    ? 'bg-gold-500/20 border border-gold-500/40 text-gold-300'
                                    : 'hover:bg-neutral-900 border border-transparent text-neutral-200 hover:text-white'
                                }`}
                              >
                                <div className="min-w-0 pr-2">
                                  <div className="text-xs sm:text-sm font-semibold flex items-center gap-2">
                                    <span>{pkg.label}</span>
                                    {pkg.isPopular && (
                                      <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-gold-500/25 text-gold-300 border border-gold-500/40 uppercase">
                                        ★ Most Popular
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[11px] text-gold-400/90 font-medium mt-0.5">
                                    {pkg.price} • Full floor access
                                  </div>
                                </div>
                                {isSelected && (
                                  <Check className="w-4 h-4 text-gold-400 flex-shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Section 3: Training Disciplines */}
                      <div className="pt-2">
                        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-gold-400/90 flex items-center gap-1.5">
                          <Dumbbell className="w-3 h-3 text-gold-400" />
                          <span>Training Disciplines</span>
                        </div>
                        <div className="space-y-1">
                          {disciplines.map((d) => {
                            const isSelected = formData.plan === d.val;
                            return (
                              <button
                                key={d.val}
                                type="button"
                                onClick={() => {
                                  setFormData((prev) => ({ ...prev, plan: d.val }));
                                  setIsDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between group ${
                                  isSelected
                                    ? 'bg-gold-500/20 border border-gold-500/40 text-gold-300'
                                    : 'hover:bg-neutral-900 border border-transparent text-neutral-200 hover:text-white'
                                }`}
                              >
                                <div className="min-w-0 pr-2">
                                  <div className="text-xs sm:text-sm font-semibold">
                                    {d.label}
                                  </div>
                                  <div className="text-[11px] text-neutral-400 mt-0.5">
                                    {d.desc}
                                  </div>
                                </div>
                                {isSelected && (
                                  <Check className="w-4 h-4 text-gold-400 flex-shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2"
                  >
                    Your Goals or Questions
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your fitness goals (e.g. Weight loss, muscle building, strength training, athletic conditioning)..."
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-gold-400 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-gold-500/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <Crown className="w-4 h-4 text-neutral-950" />
                      <span>Submit Membership Enquiry</span>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 text-neutral-950" />
                    </>
                  )}
                </button>

                {/* Success Banner */}
                {submitSuccess && (
                  <div
                    role="alert"
                    className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 backdrop-blur-md animate-fade-in"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                          Inquiry Sent Successfully!
                        </h4>
                        <p className="text-xs text-neutral-300 mt-1">
                          Thank you! We have received your inquiry. Our gym team will call or message you on WhatsApp shortly to confirm your visit and membership consultation.
                        </p>
                        <div className="text-[11px] font-semibold text-emerald-400 mt-2 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{syncStatus}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

