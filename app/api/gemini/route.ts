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
        `You are a review analyzer. Analyze the following review and create a structured summary in markdown format.

        INSTRUCTIONS:
        1. Start with exactly this phrase: "Here is the summary of the feedback:"
        2. Follow with two sections using the exact format below
        3. Use concise, clear bullet points (1-2 sentences max each)
        4. Only use emojis in section headings, not in bullet points
        5. If a section has no relevant points, write "None mentioned" under that section

        REQUIRED FORMAT:
        
        ## **Positives: ✅**
        - [Clear positive point 1]
        - [Clear positive point 2]
        - [Continue as needed]

        ## **Negatives: ❌**
        - [Clear negative point 1]
        - [Clear negative point 2]
        - [Continue as needed]

        GUIDELINES:
        - Extract only factual points mentioned in the review
        - Keep each bullet point concise (10-15 words maximum)
        - Use professional, objective language
        - Group similar points together when possible
        - Focus on specific aspects (quality, service, value, experience, etc.)
        - Don't interpret or add context not explicitly stated
        - Maintain neutral tone while clearly categorizing feedback

        Review to analyze:
        ${prompt}`
    );
    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error in POST /api/gemini:', error);
    return NextResponse.json({ error: 'Failed to get response from Gemini' }, { status: 500 });
  }
}
