import { runGemini } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt required' }, { status: 400 });
    }

    const reply = await runGemini("Summerize this prompt give a res in a json format Segregating postives and negatives: "+prompt);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error in POST /api/gemini:', error);
    return NextResponse.json({ error: 'Failed to get response from Gemini' }, { status: 500 });
  }
}
