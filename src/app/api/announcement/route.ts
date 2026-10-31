import { NextResponse } from 'next/server';
import { getAnnouncement } from '@/sanity/client';
import { DEFAULT_ANNOUNCEMENT } from '@/data/gymData';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getAnnouncement();
    return NextResponse.json({
      success: true,
      data: data || DEFAULT_ANNOUNCEMENT,
    });
  } catch (error: any) {
    console.error('Error fetching announcement:', error);
    return NextResponse.json({
      success: true,
      data: DEFAULT_ANNOUNCEMENT,
      error: error?.message,
    });
  }
}

