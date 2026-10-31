import { NextResponse } from 'next/server';
import { getAnnouncement } from '@/sanity/client';
import { DEFAULT_ANNOUNCEMENT } from '@/data/gymData';
import { encryptServerResponse } from '@/utils/cryptoServer';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getAnnouncement();
    return NextResponse.json(
      encryptServerResponse({
        success: true,
        data: data || DEFAULT_ANNOUNCEMENT,
      })
    );
  } catch (error: any) {
    console.error('Error fetching announcement:', error);
    return NextResponse.json(
      encryptServerResponse({
        success: true,
        data: DEFAULT_ANNOUNCEMENT,
        error: error?.message,
      })
    );
  }
}
