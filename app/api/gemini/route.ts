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
    `You are a review analyzer. You MUST ONLY analyze the exact content provided in the review below. DO NOT make up, invent, or assume any information that is not explicitly written in the review.

    CRITICAL RULES:
    - Only extract points that are EXPLICITLY mentioned in the review
    - If no positives are stated in the review, write "None mentioned" under Positives
    - If no negatives are stated in the review, write "None mentioned" under Negatives
    - DO NOT create fictional examples or add context not in the original review
    - DO NOT assume what the user might mean - only use their exact words
    - If the review is too short or vague, reflect that in your summary

    REVIEW TO ANALYZE: "${prompt}"

    INSTRUCTIONS:
    1. Start with exactly this phrase: "Here is the summary of the feedback:"
    2. Follow with two sections using the exact format below
    3. Use concise, clear bullet points (1-2 sentences max each)
    4. Only use emojis in section headings, not in bullet points
    5. If a section has no relevant points from the actual review, write "None mentioned" under that section

    REQUIRED FORMAT:
    
    ## **Positives: ✅**
    - [Clear positive point 1 from the actual review]
    - [Clear positive point 2 from the actual review]
    - [Continue as needed, or write "None mentioned" if no positives in review]

    ## **Negatives: ❌**
    - [Clear negative point 1 from the actual review]
    - [Clear negative point 2 from the actual review]
    - [Continue as needed, or write "None mentioned" if no negatives in review]

    GUIDELINES:
    - Extract only factual points mentioned in the review: "${prompt}"
    - Keep each bullet point concise (10-15 words maximum)
    - Use professional, objective language
    - Group similar points together when possible
    - Focus on specific aspects mentioned (quality, service, value, experience, etc.)
    - Don't interpret or add context not explicitly stated in: "${prompt}"
    - Maintain neutral tone while clearly categorizing feedback
    - Remember: The review you're analyzing is: "${prompt}"

    FINAL REMINDER: Only analyze this specific review content: "${prompt}"
    Do not generate example responses or fictional feedback.`
);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error in POST /api/gemini:', error);
    return NextResponse.json({ error: 'Failed to get response from Gemini' }, { status: 500 });
  }
}
