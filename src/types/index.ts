export interface GymHours {
  weekdays: string;
  saturday: string;
  monSat?: string;
  sunday: string;
}

export interface GymInfo {
  brandName: string;
  tagline: string;
  address: string;
  phoneDisplay: string;
  phoneInternational: string;
  phoneRaw: string;
  whatsappRaw: string;
  whatsappDisplay?: string;
  whatsappUrl?: string;
  whatsappMessage: string;
  email: string;
  instagram: string;
  googleMapsLink: string;
  googleMapsEmbed: string;
  googleSpreadsheetId?: string;
  googleSpreadsheetUrl?: string;
  defaultWebhookUrl?: string;
  hours: GymHours;
}

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
  badge?: string;
  desc: string;
  price?: string;
  currency: string;
  amount: string;
  period: string;
  features: { text: string; included: boolean }[];
  buttonText: string;
  order?: number;
  isActive?: boolean;
}

export interface GalleryItem {
  id: string;
  category: 'facility' | 'training' | 'equipment';
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

