import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { GoogleGenerativeAI } from '@google/generative-ai';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const runGemini = async (prompt: string) => {
  const model = genAI.getGenerativeModel({ model: 'gemma-3-1b-it' });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
