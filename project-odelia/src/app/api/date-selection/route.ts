import { NextRequest, NextResponse } from 'next/server';
import { sendDateSelectionNotification } from '@/lib/email';

interface DateSelectionRequest {
  option: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: DateSelectionRequest = await request.json();

    // Validate request
    if (!body.option) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request. Option is required.',
        },
        { status: 400 }
      );
    }

    // Send email notification
    await sendDateSelectionNotification(body.option);

    return NextResponse.json(
      {
        success: true,
        message: `Date selection "${body.option}" processed successfully!`,
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
