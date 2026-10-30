export interface LeadRecord {
  id: string;
  timestamp: string;
  name: string;
  phone: string;
  email: string;
  plan: string;
  message: string;
  status: 'Synced' | 'Saved to Vault' | 'Pending';
}

export interface EquipmentItem {
  id: string;
  title: string;
  category: string;
  desc: string;
  brand: string;
  spec: string;
  image: string;
  alt: string;
}

export interface FeatureItem {
  id: string;
  iconName: string;
  title: string;
  desc: string;
}

export interface ProgramItem {
  id: string;
  title: string;
  enrollValue: string;
  intensity: string;
  desc: string;
  duration: string;
  calories: string;
  image: string;
  alt: string;
}

export interface TrainerItem {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  alt: string;
  instagram: string;
  linkedin: string;
  twitter: string;
}

export interface PricingPlan {
  id: string;
  tier: string;
  enrollValue: string;
  isPopular?: boolean;
  desc: string;
  currency: string;
  amount: string;
  period: string;
  features: { text: string; included: boolean }[];
  buttonText: string;
}

export interface GalleryItem {
  id: string;
  category: 'facility' | 'training' | 'results';
  categoryLabel: string;
  image: string;
  caption: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  image: string;
  stars: number;
}
