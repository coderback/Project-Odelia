import { NextResponse } from 'next/server';
import { getResponseStats } from '@/lib/db';

export async function GET() {
  try {
    const stats = getResponseStats();

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch statistics',
      },
      { status: 500 }
    );
  }
}
