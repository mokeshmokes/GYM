import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, useCdn } from './env';
import { PricingPlan } from '@/types';
import { PRICING_PLANS } from '@/data/gymData';

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
      desc: item.desc || '',
      currency: item.currency || '₹',
      amount: String(item.amount || '0'),
      period: item.period || '/ month',
      features: Array.isArray(item.features)
        ? item.features.map((f: any) => ({
            text: typeof f === 'string' ? f : f.text || '',
            included: typeof f === 'object' && f.included !== undefined ? Boolean(f.included) : true,
          }))
        : [],
      buttonText: item.buttonText || 'Select Plan',
    }));
  } catch (error) {
    console.warn('Sanity getPackages fallback to local gymData:', error);
    return PRICING_PLANS;
  }
}
