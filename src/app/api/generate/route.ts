import { NextResponse } from 'next/server';
import { generateNatureResponse } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API Key is not configured' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { element, city, message, tone } = body;

    if (!element || !city) {
      return NextResponse.json(
        { error: 'Element and city are required fields' },
        { status: 400 }
      );
    }

    const generatedResponse = await generateNatureResponse(
      element,
      city,
      message,
      tone
    );

    return NextResponse.json({ response: generatedResponse });
  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: error?.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
