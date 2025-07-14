import { runGemini } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt required' }, { status: 400 });
    }

    const reply = await runGemini(
    `Please analyze the following review and summarize it into two clear sections:

    **Positives:**
    - List the positive points using short, engaging sentences
    - Feel free to use emojis to make it expressive and fun

    **Negatives:**
    - List the negative points in the same style

    Format:
    - Start each section with a bold heading (**Positives:** and **Negatives:**)
    - Use dashes (-) or bullet points for each item
    - Keep the tone human, short, and easy to read

    Here is the review:
    ${prompt}`
    );
    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error in POST /api/gemini:', error);
    return NextResponse.json({ error: 'Failed to get response from Gemini' }, { status: 500 });
  }
}
