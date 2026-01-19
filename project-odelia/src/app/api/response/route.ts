import { NextRequest, NextResponse } from 'next/server';
import { saveResponse } from '@/lib/db';
import { sendYesNotification } from '@/lib/email';
import { ResponseData, ApiResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: ResponseData = await request.json();

    // Validate request
    if (!body.answer || !['yes', 'no'].includes(body.answer)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid answer. Must be "yes" or "no".',
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Save to database
    const result = saveResponse(
      body.answer,
      body.sessionId,
      body.metadata
    );

    // Send email notification if she said YES!
    if (body.answer === 'yes') {
      await sendYesNotification();
    }

    return NextResponse.json(
      {
        success: true,
        responseId: result.id,
        message: `Response "${body.answer}" saved successfully!`,
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving response:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to save response. Please try again.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'Use POST to submit a response',
    },
    { status: 405 }
  );
}
