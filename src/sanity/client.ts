import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, useCdn } from './env';
import { PricingPlan, GymInfo } from '@/types';
import { PRICING_PLANS, GYM_INFO } from '@/data/gymData';

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
  "amount": amount,
  "currency": coalesce(currency, "₹"),
  "period": coalesce(period, "/ month"),
  "isPopular": coalesce(isPopular, false),
  "badge": badge,
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
  timingVip,
  timingSpa,
  googleMapsLink,
  googleMapsEmbed,
  instagram,
  facebook,
  youtube
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

    return data.map((item) => ({
      id: item.id || item._id,
      tier: item.tier || item.title || 'Membership Package',
      enrollValue: item.enrollValue || item.tier || item.title || 'Membership Package',
      isPopular: Boolean(item.isPopular),
      badge: item.badge || (item.isPopular ? 'Most Popular' : undefined),
      desc: item.desc || '',
      currency: item.currency || '₹',
      amount: String(item.amount || '0'),
      period: item.period || '/ month',
      features: Array.isArray(item.features)
        ? item.features.map((f: any) => ({
            text: typeof f === 'string' ? f : f?.text || '',
            included: typeof f === 'object' && f?.included !== undefined ? Boolean(f.included) : true,
          }))
        : [],
      buttonText: item.buttonText || 'Select Plan',
    }));
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
        sunday: data.timingSunday || GYM_INFO.hours.sunday,
        vip: data.timingVip || GYM_INFO.hours.vip,
        spa: data.timingSpa || GYM_INFO.hours.spa,
      },
    };
  } catch (error) {
    console.warn('Sanity getGymSettings fallback to local gymData:', error);
    return GYM_INFO;
  }
}
