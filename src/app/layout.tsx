import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://vstfitnessworld.com'),
  title: 'VST FITNESS WORLD — Luxury Strength & Championship Fitness Sanctuary',
  description:
    'Premier luxury fitness sanctuary in Pallikaranai, Chennai. Featuring Eleiko & LifeFitness machinery, IFBB master coaches, infrared sauna, cold plunge, and private biometric suites.',
  keywords: [
    'VST Fitness World',
    'Gym in Pallikaranai',
    'Luxury Gym Chennai',
    'Bodybuilding Chennai',
    'Personal Training Pallikaranai',
    'CrossFit Chennai',
    'Fitness Center Chennai',
    'Weight Training',
  ],
  authors: [{ name: 'VST Fitness World' }],
  icons: {
    icon: '/VST_Fitness_World_Logo_Transparent.png',
    apple: '/VST_Fitness_World_Logo_Transparent.png',
  },
  openGraph: {
    title: 'VST FITNESS WORLD — Luxury Strength & Championship Fitness Sanctuary',
    description:
      'Experience the pinnacle of physical mastery at VST Fitness World, Pallikaranai, Chennai. 24/7 VIP access, master coaches, and elite recovery suites.',
    url: 'https://vstfitnessworld.com',
    siteName: 'VST Fitness World',
    images: [
      {
        url: '/VST_Fitness_World_Logo_Transparent.png',
        width: 800,
        height: 600,
        alt: 'VST Fitness World Emblem',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/png" href="/VST_Fitness_World_Logo_Transparent.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&family=Oswald:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-[#0a0a0a] text-neutral-200 antialiased selection:bg-gold-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
