import { NextResponse } from 'next/server';
import { getPackages } from '@/sanity/client';
import { PRICING_PLANS } from '@/data/gymData';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const packages = await getPackages();
    return NextResponse.json({
      success: true,
      data: packages && packages.length > 0 ? packages : PRICING_PLANS,
      source: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? 'sanity' : 'default_catalog',
    });
  } catch (error: any) {
    console.error('Error fetching packages:', error);
    return NextResponse.json({
      success: true,
      data: PRICING_PLANS,
      source: 'fallback',
      error: error?.message,
    });
  }
}

