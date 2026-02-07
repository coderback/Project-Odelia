import { NextRequest, NextResponse } from 'next/server';
import { sendDateSelectionNotification } from '@/lib/email';

interface DateSelectionRequest {
  restaurants: string[];
  activities: string[];
  meals?: { breakfast: string; lunch: string; dinner: string };
}

export async function POST(request: NextRequest) {
  try {
    const body: DateSelectionRequest = await request.json();

    // Validate request
    if (!body.restaurants?.length || !body.activities?.length) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request. Restaurant and activity rankings are required.',
        },
        { status: 400 }
      );
    }

    // Send email notification
    await sendDateSelectionNotification(body.restaurants, body.activities, body.meals);

    return NextResponse.json(
      {
        success: true,
        message: `Date plan processed successfully!`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing date selection:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process date selection. Please try again.',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'Use POST to submit a date selection',
    },
    { status: 405 }
  );
}
