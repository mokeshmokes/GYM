import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://vstfitnessworld.com'),
  title: {
    default: 'VST FITNESS WORLD — Luxury Strength & Championship Fitness Sanctuary',
    template: '%s | VST FITNESS WORLD',
  },
  description:
    'Premier luxury fitness sanctuary in Pallikaranai, Chennai. Featuring Olympic calibrated machinery, certified master personal coaches, customized nutrition blueprints, and flexible luxury membership plans.',
  keywords: [
    'VST Fitness World',
    'Gym in Pallikaranai',
    'Best Gym in Chennai',
    'Luxury Gym Chennai',
    'Bodybuilding Pallikaranai',
    'Personal Training Pallikaranai',
    'Strength and Conditioning Chennai',
    'Weight Training Pallikaranai',
    'Fitness Center Pallikaranai',
    'CrossFit Chennai',
  ],
  authors: [{ name: 'VST Fitness World', url: 'https://vstfitnessworld.com' }],
  creator: 'VST Fitness World',
  publisher: 'VST Fitness World',
  formatDetection: {
    telephone: true,
    date: false,
    address: true,
    email: true,
  },
  alternates: {
    canonical: 'https://vstfitnessworld.com',
  },
  icons: {
    icon: [
      { url: '/VST_Fitness_World_Logo_Transparent.png', type: 'image/png' },
    ],
    apple: [
      { url: '/VST_Fitness_World_Logo_Transparent.png', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'VST FITNESS WORLD — Luxury Strength & Championship Fitness Sanctuary',
    description:
      'Experience the pinnacle of physical mastery at VST Fitness World, Pallikaranai, Chennai. 24/7 VIP access, master coaches, and elite recovery suites.',
    url: 'https://vstfitnessworld.com',
    siteName: 'VST FITNESS WORLD',
    images: [
      {
        url: '/VST_Fitness_World_Logo_Transparent.png',
        width: 1200,
        height: 630,
        alt: 'VST Fitness World Luxury Sanctuary',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VST FITNESS WORLD — Luxury Strength & Championship Fitness Sanctuary',
    description:
      'Premier luxury gym and athletic performance sanctuary in Pallikaranai, Chennai. Master personal training, certified nutrition blueprints, and flexible tiers.',
    images: ['/VST_Fitness_World_Logo_Transparent.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'IN-TN',
    'geo.placename': 'Pallikaranai, Chennai',
    'geo.position': '12.9352;80.2078',
    'ICBM': '12.9352, 80.2078',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ExerciseGym',
  name: 'VST FITNESS WORLD',
  alternateName: 'VST Fitness World Pallikaranai',
  description:
    'Premier luxury fitness sanctuary in Pallikaranai, Chennai. Featuring Olympic calibrated machinery, certified master personal coaches, customized nutrition blueprints, and flexible luxury membership plans.',
  url: 'https://vstfitnessworld.com',
  logo: 'https://vstfitnessworld.com/VST_Fitness_World_Logo_Transparent.png',
  image: 'https://vstfitnessworld.com/VST_Fitness_World_Logo_Transparent.png',
  telephone: '+917550155331',
  email: 'memberships@vstfitnessworld.com',
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, Credit Card, UPI',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No 1, Varadharajapuram Main Rd, Pallikaranai',
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    postalCode: '600100',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 12.9352,
    longitude: 80.2078,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '05:00',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday'],
      opens: '05:00',
      closes: '10:00',
    },
  ],
  sameAs: [
    'https://www.instagram.com/vst_fitnesss',
    'https://maps.app.goo.gl/Q5ZSLnqBKGmiz6nC9',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&family=Oswald:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-[#0a0a0a] text-neutral-200 antialiased selection:bg-gold-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
