import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VST FITNESS WORLD — Luxury Strength & Championship Fitness Sanctuary',
    short_name: 'VST Fitness',
    description:
      'Premier luxury fitness sanctuary in Pallikaranai, Chennai. Featuring VIVA Fitness machinery, IFBB master coaches, and private training suites.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      {
        src: '/VST_Fitness_World_Logo_Transparent.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/VST_Fitness_World_Logo_Transparent.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
