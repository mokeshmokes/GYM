# VST FITNESS WORLD — Luxury Strength & Championship Fitness Sanctuary

<p align="center">
  <img src="public/VST_Fitness_World_Logo_Transparent.png" alt="VST Fitness World Logo" width="180">
</p>

A state-of-the-art Next.js 14 web application built for **"VST FITNESS WORLD"** in Pallikaranai, Chennai. Designed with an ultra-premium black-and-gold visual language, fully dynamic content managed via Sanity CMS, responsive architecture across all breakpoints, and automated dual-layer Google Sheets lead storage.

---

## 📍 Official Company Information

* **Brand Name**: VST FITNESS WORLD
* **Address**: No 1, Varadharajapuram Main Rd, Pallikaranai, Chennai, Tamil Nadu 600100
* **Phone / WhatsApp**: [07550155331](tel:07550155331) / [+91 75501 55331](tel:+917550155331)
* **Instagram**: [@vst_fitnesss](https://www.instagram.com/vst_fitnesss?utm_source=qr&srtk=amE1YXM2OHFpNWV5)
* **Google Maps Location**: [https://maps.app.goo.gl/Q5ZSLnqBKGmiz6nC9](https://maps.app.goo.gl/Q5ZSLnqBKGmiz6nC9)

---

## ⚡ Tech Stack & Architecture

* **Framework**: Next.js 14 (App Router)
* **Language**: TypeScript (`strict: true`)
* **Styling**: Tailwind CSS with custom Black & Gold theme (`#0a0a0a`, `#111111`, `#D4AF37`, `#F5D76E`)
* **Icons**: Lucide React
* **Typography**: Bebas Neue, Oswald, Inter, Poppins
* **Server Routes**:
  * `/api/leads`: Google Apps Script webhook proxy
  * `/api/packages`: Dynamic package and pricing provider from Sanity CMS
  * `/api/settings`: Dynamic gym contact, address, timings, and location provider from Sanity CMS
* **CMS Studio**: Embedded Sanity Studio route at `/studio` with custom structured desk management
* **Lead Storage**: Dual-layer architecture (Live Google Spreadsheet webhook + local browser vault failsafe)

---

## 🛠️ Sanity CMS Dynamic Content Management

Both the **Pricing** and **Contact** sections (plus all site-wide contact touchpoints) are fully controlled by Sanity CMS:

### 1. Membership Packages & Pricing (`/studio` -> Membership Packages & Pricing)
* **Create New Plans**: Add unlimited membership packages with customized names, slugs, billing periods (`/ month`, `/ quarter`, `/ year`), prices, and CTA buttons.
* **Add & Edit Features**: Add dynamic feature checklists per plan. Set each feature as included (✓ green check) or excluded (✗ strikethrough). Reorder features via drag-and-drop.
* **Popular / Custom Badges**: Highlight tiers with "Most Popular", "Best Value", or custom badge ribbons.
* **Dynamic Site Sync**: Changes instantly reflect in:
  * The main **Pricing Section** cards and feature checklists.
  * The **Contact Section Form** membership package selector.
  * The **Dynamic Plan Features preview** displayed directly inside the Contact form when a user selects a plan!

### 2. Gym & Contact Settings (`/studio` -> Gym & Contact Information)
* **Physical Address**: Edit gym address, updating the Contact card and Footer automatically.
* **Phone Numbers**: Primary display phone, secondary phone, and raw `tel:` dialer link.
* **WhatsApp Integration**: WhatsApp number and default customer message for floating chat and quick links.
* **Email Address**: Official contact email across the site.
* **Sanctuary Timings**: Dynamic Weekday (Mon–Sat), Saturday, Sunday, VIP member access, and Spa/Sauna timings synced across both the Contact info block and the Footer timings table.
* **Google Maps & Socials**: Interactive embed iframe URL and direct Google Maps navigation link.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the Next.js development server
npm run dev

# 3. Open the website
# Main site:   http://localhost:3000
# Sanity CMS:  http://localhost:3000/studio
```

---

## 🔑 Sanity CMS Setup

To connect your own Sanity project:
1. Create a free project at [Sanity.io](https://www.sanity.io).
2. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
3. Set your `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`.
4. Open `http://localhost:3000/studio` and publish your content!
