import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, useCdn } from './env';
import { PricingPlan, GymInfo, AnnouncementData } from '@/types';
import { PRICING_PLANS, GYM_INFO, DEFAULT_ANNOUNCEMENT } from '@/data/gymData';

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
    })
  : null;

export const PACKAGES_QUERY = `*[_type == "package" && (isActive == true || !defined(isActive))] | order(order asc, _createdAt asc) {
  _id,
  title,
  "id": _id,
  "tier": title,
  "enrollValue": coalesce(enrollValue, title),
  "price": coalesce(price, amount),
  "amount": amount,
  "currency": coalesce(currency, "₹"),
  "period": coalesce(period, "/ month"),
  "isPopular": coalesce(isPopular, false),
  "desc": coalesce(desc, ""),
  "buttonText": coalesce(buttonText, "Claim Membership"),
  "order": coalesce(order, 100),
  "features": features[]{
    "text": text,
    "included": coalesce(included, true)
  }
}`;

export const SETTINGS_QUERY = `*[_type == "gymSettings"][0]{
  _id,
  brandName,
  tagline,
  address,
  phoneDisplay,
  phoneInternational,
  phoneRaw,
  "whatsappRaw": coalesce(whatsappNumber, whatsappRaw),
  whatsappMessage,
  email,
  timingWeekdays,
  timingSaturday,
  timingSunday,
  googleMapsLink,
  googleMapsEmbed,
  instagram,
  facebook,
  youtube
}`;

export const ANNOUNCEMENT_QUERY = `*[_type == "announcement"][0]{
  _id,
  isActive,
  title,
  badge,
  message,
  ctaText,
  ctaLink,
  showBanner,
  showPopup,
  popupFrequency
}`;

export async function getPackages(): Promise<PricingPlan[]> {
  if (!client || !projectId) {
    return PRICING_PLANS;
  }

  try {
    const data = await client.fetch<any[]>(PACKAGES_QUERY, {}, { next: { revalidate: 30 } });
    if (!data || data.length === 0) {
      return PRICING_PLANS;
    }

    return data.map((item) => {
      const rawPrice = String(item.price || item.amount || '2,999').trim();
      let currency = '₹';
      let amount = rawPrice;

      if (rawPrice.startsWith('₹')) {
        currency = '₹';
        amount = rawPrice.slice(1).trim();
      } else if (rawPrice.startsWith('Rs.') || rawPrice.startsWith('Rs ') || rawPrice.startsWith('rs.')) {
        currency = '₹';
        amount = rawPrice.replace(/^(Rs\.?|rs\.?)\s*/i, '').trim();
      } else if (/^[^\d\s]/.test(rawPrice)) {
        currency = rawPrice.slice(0, 1);
        amount = rawPrice.slice(1).trim();
      }

      return {
        id: item.id || item._id,
        tier: item.tier || item.title || 'Membership Package',
        enrollValue: item.enrollValue || item.tier || item.title || 'Membership Package',
        isPopular: Boolean(item.isPopular),
        badge: item.isPopular ? 'Most Popular' : undefined,
        desc: item.desc || '',
        currency,
        amount,
        period: item.period || '/ month',
        features: Array.isArray(item.features)
          ? item.features.map((f: any) => ({
              text: typeof f === 'string' ? f : f?.text || '',
              included: typeof f === 'object' && f?.included !== undefined ? Boolean(f.included) : true,
            }))
          : [],
        buttonText: item.buttonText || 'Select Plan',
      };
    });
  } catch (error) {
    console.warn('Sanity getPackages fallback to local gymData:', error);
    return PRICING_PLANS;
  }
}

export async function getGymSettings(): Promise<GymInfo> {
  if (!client || !projectId) {
    return GYM_INFO;
  }

  try {
    const data = await client.fetch<any>(SETTINGS_QUERY, {}, { next: { revalidate: 30 } });
    if (!data) {
      return GYM_INFO;
    }

    return {
      brandName: data.brandName || GYM_INFO.brandName,
      tagline: data.tagline || GYM_INFO.tagline,
      address: data.address || GYM_INFO.address,
      phoneDisplay: data.phoneDisplay || GYM_INFO.phoneDisplay,
      phoneInternational: data.phoneInternational || GYM_INFO.phoneInternational,
      phoneRaw: data.phoneRaw || data.phoneDisplay || GYM_INFO.phoneRaw,
      whatsappRaw: data.whatsappRaw || GYM_INFO.whatsappRaw,
      whatsappDisplay: data.phoneInternational || GYM_INFO.whatsappDisplay,
      whatsappUrl: `https://wa.me/${(data.whatsappRaw || GYM_INFO.whatsappRaw || '917550155331').replace(/\D/g, '')}?text=${encodeURIComponent(data.whatsappMessage || GYM_INFO.whatsappMessage || 'Hello VST Fitness World, I am interested in a Gym Membership!')}`,
      whatsappMessage: data.whatsappMessage || GYM_INFO.whatsappMessage,
      email: data.email || GYM_INFO.email,
      instagram: data.instagram || GYM_INFO.instagram,
      googleMapsLink: data.googleMapsLink || GYM_INFO.googleMapsLink,
      googleMapsEmbed: data.googleMapsEmbed || GYM_INFO.googleMapsEmbed,
      googleSpreadsheetId: GYM_INFO.googleSpreadsheetId,
      googleSpreadsheetUrl: GYM_INFO.googleSpreadsheetUrl,
      defaultWebhookUrl: GYM_INFO.defaultWebhookUrl,
      hours: {
        weekdays: data.timingWeekdays || GYM_INFO.hours.weekdays,
        saturday: data.timingSaturday || GYM_INFO.hours.saturday,
        monSat: data.timingWeekdays || GYM_INFO.hours.monSat,
        sunday: data.timingSunday || GYM_INFO.hours.sunday,
      },
    };
  } catch (error) {
    console.warn('Sanity getGymSettings fallback to local gymData:', error);
    return GYM_INFO;
  }
}

export async function getAnnouncement(): Promise<AnnouncementData> {
  if (!client || !projectId) {
    return DEFAULT_ANNOUNCEMENT;
  }

  try {
    const data = await client.fetch<any>(ANNOUNCEMENT_QUERY, {}, { next: { revalidate: 15 } });
    if (!data) {
      return DEFAULT_ANNOUNCEMENT;
    }

    return {
      isActive: data.isActive !== undefined ? Boolean(data.isActive) : DEFAULT_ANNOUNCEMENT.isActive,
      title: data.title || DEFAULT_ANNOUNCEMENT.title,
      badge: data.badge || DEFAULT_ANNOUNCEMENT.badge,
      message: data.message || DEFAULT_ANNOUNCEMENT.message,
      ctaText: data.ctaText || DEFAULT_ANNOUNCEMENT.ctaText,
      ctaLink: data.ctaLink || DEFAULT_ANNOUNCEMENT.ctaLink,
      showBanner: data.showBanner !== undefined ? Boolean(data.showBanner) : DEFAULT_ANNOUNCEMENT.showBanner,
      showPopup: data.showPopup !== undefined ? Boolean(data.showPopup) : DEFAULT_ANNOUNCEMENT.showPopup,
      popupFrequency: data.popupFrequency || DEFAULT_ANNOUNCEMENT.popupFrequency,
    };
  } catch (error) {
    console.warn('Sanity getAnnouncement fallback to default:', error);
    return DEFAULT_ANNOUNCEMENT;
  }
}
