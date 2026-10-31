import { NextResponse } from 'next/server';
import { getGymSettings } from '@/sanity/client';
import { GYM_INFO } from '@/data/gymData';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const settings = await getGymSettings();
    return NextResponse.json({
      success: true,
      data: settings || GYM_INFO,
      source: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? 'sanity' : 'default_catalog',
    });
  } catch (error: any) {
    console.error('Error fetching gym settings:', error);
    return NextResponse.json({
      success: true,
      data: GYM_INFO,
      source: 'fallback',
      error: error?.message,
    });
  }
}

