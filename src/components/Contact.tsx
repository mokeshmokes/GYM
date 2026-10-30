'use client';

import React, { useState, useEffect } from 'react';
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
  ShieldCheck,
} from 'lucide-react';
import { GYM_INFO, PRICING_PLANS } from '@/data/gymData';
import { LeadRecord, PricingPlan } from '@/types';

interface ContactProps {
  selectedPlan: string;
  onOpenLeadsModal: () => void;
  packages?: PricingPlan[];
}

export default function Contact({
  selectedPlan,
  onOpenLeadsModal,
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

  useEffect(() => {
    if (selectedPlan) {
      setFormData((prev) => ({ ...prev, plan: selectedPlan }));
    }
  }, [selectedPlan]);

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
      setSyncStatus(
        resData.cloudSynced
          ? 'Synced in real-time with Google Sheet'
          : 'Saved in Local Vault • Ready to sync'
      );

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
      setSyncStatus('Saved safely to local Lead Vault');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 lg:py-28 bg-[#0a0a0a]">
      <div className="ambient-glow top-[20%] right-[-100px] opacity-25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Book your visit, claim your 1-day free workout pass, or speak directly with our certified master coaches.
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
              {/* Top Banner */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/40 text-gold-300 text-xs font-bold tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Complimentary VIP Consultation & Gym Pass</span>
              </div>

              <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide mb-2">
                Schedule Your Visit
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-8">
                Fill in your details below to schedule your free gym tour and personal consultation. We look forward to welcoming you to the sanctuary.
              </p>

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

                {/* Plan Dropdown */}
                <div>
                  <label
                    htmlFor="plan"
                    className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2"
                  >
                    Interested Program / Plan
                  </label>
                  <select
                    id="plan"
                    name="plan"
                    value={formData.plan}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-gold-400 transition-colors"
                  >
                    <option value="Free 1-Day VIP Trial">★ Free 1-Day VIP Trial</option>

                    <optgroup label="Membership Packages (Sanity CMS)">
                      {packages && packages.length > 0 ? (
                        packages.map((pkg) => {
                          const val = pkg.enrollValue || pkg.tier;
                          return (
                            <option key={pkg.id} value={val}>
                              {pkg.tier} ({pkg.currency || '₹'}{pkg.amount}{pkg.period})
                              {pkg.isPopular ? ' ★ Most Popular' : ''}
                            </option>
                          );
                        })
                      ) : (
                        <>
                          <option value="Monthly Starter">Monthly Starter (₹2,999/mo)</option>
                          <option value="Quarterly Pro">Quarterly Pro Athlete (₹7,499/qtr) - Most Popular</option>
                          <option value="Yearly VIP">Yearly VIP Elite (₹24,999/yr)</option>
                        </>
                      )}
                    </optgroup>

                    <optgroup label="Training Disciplines">
                      <option value="Weight Training">Weight Training Program</option>
                      <option value="Cardio">Cardio Conditioning</option>
                      <option value="CrossFit">CrossFit & HIIT</option>
                      <option value="Yoga">Yoga & Mobility</option>
                      <option value="Zumba">Zumba & Dance</option>
                      <option value="Weight Loss Program">Weight Loss & Shred</option>
                      <option value="Muscle Gain">Muscle Gain & Bulk</option>
                      <option value="Personal Training Only">1-on-1 Personal Training Only</option>
                    </optgroup>
                  </select>
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
                  className="btn-gold w-full py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
                      <span>Transmitting Lead...</span>
                    </>
                  ) : (
                    <>
                      <span>Book Free VIP Consultation</span>
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
                          Thank you! We have received your inquiry. Our fitness consultant will call or message you on WhatsApp shortly to confirm your visit.
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

              {/* Admin Database Portal Button */}
              <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500">
                <span>Leads automatically backed up locally.</span>
                <button
                  type="button"
                  onClick={onOpenLeadsModal}
                  className="hover:text-gold-400 transition-colors flex items-center gap-1 font-semibold"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>View Stored Leads (Admin)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

