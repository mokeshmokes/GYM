# VST FITNESS WORLD — Next.js Luxury Strength & Championship Fitness Sanctuary

<p align="center">
  <img src="public/VST_Fitness_World_Logo_Transparent.png" alt="VST Fitness World Logo" width="180">
</p>

A state-of-the-art **Next.js 14 (App Router) + TypeScript + Tailwind CSS** web application for **"VST FITNESS WORLD"** located in Pallikaranai, Chennai. Designed with an ultra-luxury black & gold aesthetic, seamless micro-interactions, responsive design across all viewports, and integrated Google Sheets lead capture.

---

## 📍 Official Company Information

* **Brand Name**: VST FITNESS WORLD
* **Address**: No 1, Varadharajapuram Main Rd, Pallikaranai, Chennai, Tamil Nadu 600100
* **Phone / WhatsApp**: [07550155331](tel:07550155331) / [+91 75501 55331](tel:+917550155331)
* **Instagram**: [@vst_fitnesss](https://www.instagram.com/vst_fitnesss?utm_source=qr&srtk=amE1YXM2OHFpNWV5)
* **Google Maps Location**: [https://maps.app.goo.gl/Q5ZSLnqBKGmiz6nC9](https://maps.app.goo.gl/Q5ZSLnqBKGmiz6nC9)
* **Connected Google Spreadsheet**: [VST FITNESS WORLD Leads](https://docs.google.com/spreadsheets/d/1Nj1lwFkmBaIgQUjvQ6Pg8cXTH-BVxt7CM7axShckPSc/edit?usp=drivesdk) (ID: `1Nj1lwFkmBaIgQUjvQ6Pg8cXTH-BVxt7CM7axShckPSc`)

---

## ⚡ Tech Stack & Architecture

* **Framework**: Next.js 14 (App Router)
* **Language**: TypeScript (`strict: true`)
* **Styling**: Tailwind CSS with custom Black & Gold theme (`#0a0a0a`, `#111111`, `#D4AF37`, `#F5D76E`)
* **Icons**: Lucide React
* **Typography**: Bebas Neue, Oswald, Inter, Poppins
* **Server Routes**: `/api/leads` (Google Apps Script webhook proxy) and `/api/packages` (Sanity CMS & package catalog provider)
* **CMS Studio**: Embedded Sanity Studio route at `/studio` for live package add, edit, and tier pricing management
* **Lead Storage**: Dual-layer architecture (Live Google Spreadsheet webhook + local browser vault failsafe)

---

## 📋 Sections Included

1. **Sticky Glassmorphism Navigation (`Navbar`)**: Transparent-to-dark on scroll, official 3D embossed gold logo, separate **Reviews** menu, desktop CTA, and smooth responsive drawer optimized for all resolutions (mobile, tablet, desktop, ultra-wide).
2. **Hero Section (`Hero`)**: Full-screen cinematic gym background, gold crown badge, dynamic typing text animation, and dual action buttons.
3. **Live Stats Counter (`Stats`)**: Animated count-up numbers triggered via `IntersectionObserver` (1,500+ Members, 25+ Master Trainers, 150+ Modern Machines, 12+ Years).
4. **About Us (`About`)**: Split layout with luxury training floor photography, floating experience badge, and 3 key pillars.
5. **Gym Equipment Grid (`Equipment`)**: 12 commercial pieces (Treadmills, Dumbbells & Barbells, Power Racks, Smith Machine, Cable Crossover, 45° Leg Press, Chest Press, Lat Pulldown, Kettlebells, Battle Ropes, Cycling Bikes, and Functional Training Zone).
6. **Why Choose Us (`Features`)**: 9 core advantages with custom icon badges.
7. **Specialized Programs (`Programs`)**: 7 disciplines (Weight Training, Cardio, CrossFit & HIIT, Yoga, Zumba, Weight Loss, Muscle Gain). Clicking "Enroll" auto-selects the plan in the contact form.
8. **Master Trainers (`Trainers`)**: 4 elite coaches with specialties and Instagram links.
9. **Membership Pricing (`Pricing`)**: Dynamic Sanity-managed tiered pricing packages (Starter Monthly, Quarterly Pro Athlete highlighted as **Most Popular**, Yearly VIP Elite) with direct `/studio` management link.
10. **Transformations & Gallery (`Gallery` + `LightboxModal`)**: Category filter tabs ("All", "Facility", "Workouts", "Transformations") with full-screen Lightbox Modal (Keyboard navigation, next/prev, close).
11. **Member Reviews (`Testimonials`)**: Dedicated `#reviews` section with 4.9-star verification, auto-sliding carousel, and member transformation reviews.
12. **Contact & Lead Capture (`Contact`)**: Official address, direct phone/WhatsApp links, interactive Google Map embed, and real-time validated form with dynamic Sanity package dropdown connected to `/api/leads`.
13. **Staff Lead Vault (`LeadsVaultModal`)**: View captured leads in real time, export to CSV/Excel, and manage Google Sheet Webhooks.
14. **Footer (`Footer`)**: Emblem, address, phone, quick links (including Reviews), operating hours table, newsletter form, and copyright.
15. **Floating Actions (`FloatingActions`)**: Direct WhatsApp chat button (connected to `07550155331`) and Back-to-Top smooth scroll button.

---

## 🛠️ Sanity Studio (Packages CMS)

To add or edit membership packages:
1. Open `http://localhost:3000/studio` in your browser (or click **Studio** in the website header/pricing section).
2. Configure your Sanity project ID in `.env.local` (`NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`).
3. Easily create, edit prices, update features, reorder, or toggle active packages. All changes sync dynamically to the website's Pricing section and the Contact form's Package dropdown!

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the Next.js development server
npm run dev

# 3. Build for production
npm run build

# 4. Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

