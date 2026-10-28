# VST FITNESS WORLD — Luxury Strength & Championship Fitness Sanctuary

<p align="center">
  <img src="VST_Fitness_World_Logo_Transparent.png" alt="VST Fitness World Logo" width="180">
</p>

A complete, professional, fully responsive single-page website for **"VST FITNESS WORLD"** designed with a luxury black-and-gold aesthetic, seamless animations, and direct Google Sheets lead capture integration.

---

## 📍 Official Company Information

* **Brand Name**: VST FITNESS WORLD
* **Address**: No 1, Varadharajapuram Main Rd, Pallikaranai, Chennai, Tamil Nadu 600100
* **Phone / WhatsApp**: [07550155331](tel:07550155331) / [+91 75501 55331](tel:+917550155331)
* **Google Maps Location**: [https://maps.app.goo.gl/Q5ZSLnqBKGmiz6nC9](https://maps.app.goo.gl/Q5ZSLnqBKGmiz6nC9)

---

## 🌟 Visual Theme & Tech Stack

* **Theme**: Premium Black & Gold (`#0a0a0a`, `#111111`, `#D4AF37`, `#F5D76E`)
* **Typography**: Google Fonts (*Oswald* & *Bebas Neue* for headings, *Poppins* & *Inter* for body copy)
* **Icons**: Font Awesome 6
* **Form & Leads**: Real-time validation, automatic local lead vault, and live Google Spreadsheet integration.

---

## 📋 Sections Included

1. **Sticky Navigation**: Transparent-to-dark on scroll, official 3D embossed gold logo, active link tracking, desktop CTA, and smooth mobile slide-in drawer.
2. **Hero Section**: Full-screen cinematic gym background with subtle parallax, gold crown badge, dynamic typing text animation, and dual action buttons.
3. **Live Stats Counter**: Animated count-up numbers triggered via `IntersectionObserver` (1,500+ Members, 25+ Master Trainers, 150+ Modern Machines, 12+ Years).
4. **About Us**: Split layout with luxury training floor photography, floating experience badge, and 3 key pillars.
5. **Gym Equipment Grid (12 Items)**: Treadmills, Dumbbells & Barbells, Power Racks, Smith Machine, Cable Crossover, 45° Leg Press, Chest Press, Lat Pulldown, Kettlebells, Battle Ropes, Cycling Bikes, and Functional Training Zone.
6. **Why Choose Us (9 Features)**: Certified Master Trainers, Modern Equipment, Clean & AC, 1-on-1 Personal Training, Diet & Nutrition Plans, Locker & Shower, Group Classes, Flexible Timings, Valet Parking.
7. **Specialized Programs (7 Items)**: Weight Training, Cardio, CrossFit & HIIT, Yoga, Zumba, Weight Loss, Muscle Gain. Clicking enroll auto-selects the plan in the contact form.
8. **Master Trainers (4 Elite Coaches)**: Marcus Vance, Elena Rostova, David Chen, Sarah Jenkins with specialties and social icons.
9. **Membership Pricing**: 3 plans (Starter Monthly, Quarterly Pro Athlete highlighted as **Most Popular**, Yearly VIP Elite).
10. **Transformations & Gallery**: Filterable photo gallery with hover zoom and full-screen Lightbox Modal (Keyboard navigation, next/prev, close).
11. **Testimonials**: Auto-sliding carousel with star ratings and pause on hover.
12. **Contact & Lead Capture**: Official address in Pallikaranai, Chennai, direct phone 07550155331, Google Map embed with direct directions link, and validated form.
13. **Footer**: Official emblem, address, phone, quick links, opening hours table, newsletter form, and copyright notice.
14. **Floating Actions**: WhatsApp chat button (connected to `07550155331`) and Back-to-Top smooth scroll button.

---

## 📊 Google Sheets Lead Storage

Every contact form inquiry is saved automatically:
* **Google Spreadsheet Integration**: Sends form submissions directly to a Google Apps Script Web App webhook.
* **Zero Lead Loss Vault**: All leads are automatically stored in browser storage (`localStorage`) as a failsafe.
* **Admin Demo Modal**: Click *"View Stored Leads Database (Admin / Demo)"* under the form to view all leads in real time.
* **CSV / Excel Export**: Download captured leads directly to an `.xlsx` / `.csv` file.

Detailed setup instructions and Google Apps Script code are provided in [`GOOGLE_SHEET_SETUP.md`](GOOGLE_SHEET_SETUP.md).

---

## 🚀 Getting Started

Simply open `index.html` in any modern web browser, or serve it using Python / Node:

```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .
```

Open `http://localhost:8080/index.html` in your browser.
