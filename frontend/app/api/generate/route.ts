import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured. Please add GEMINI_API_KEY to your .env.local file.' },
        { status: 500 }
      );
    }

    const { type, payload } = await request.json();

    const genAI = new GoogleGenerativeAI(apiKey);
    // Use gemini-1.5-flash for speed and reliability
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    if (type === 'summary') {
      const { jobTitle, skills, currentSummary } = payload;
      
      const prompt = `
You are an expert professional resume writer. Write a compelling, high-impact professional summary for a resume/CV.

Job Title: ${jobTitle || 'Professional'}
Skills: ${skills && skills.length > 0 ? skills.join(', ') : 'Not specified'}
Current Summary/Context: ${currentSummary || 'None'}

Guidelines:
1. Keep it professional, engaging, and ATS-friendly.
2. Write a single concise paragraph (around 3 to 4 sentences, 50-80 words).
3. Do not use generic buzzwords. Focus on value, achievements, and capabilities.
4. Focus on the target Job Title and incorporate key skills naturally.
5. Do not include markdown formatting, bullet points, headers, or quotes. Output ONLY the raw text summary.
`;

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      return NextResponse.json({ text });

    } else if (type === 'experience') {
      const { position, company, skills, currentDescription } = payload;

      const prompt = `
You are an expert professional resume writer. Rewrite and enhance the work experience description for a CV to make it high-impact, results-oriented, and ATS-friendly.

Job Title/Position: ${position || 'Employee'}
Company: ${company || 'Company'}
Skills: ${skills && skills.length > 0 ? skills.join(', ') : 'Not specified'}
Current Description (draft): ${currentDescription || 'Not specified'}

Guidelines:
1. Create exactly 3 to 4 high-impact bullet points.
2. Use the "Action Verb + Task + Result/Impact" formula (e.g. "Developed dynamic features using React, reducing loading time by 20%").
3. Quantify impact where possible (use realistic/hypothetical metric examples if none are provided, e.g. "boosting performance by 15%", "saving 10 hours weekly").
4. Incorporate relevant skills.
5. Return the bullet points as a single, comma-separated string where each bullet point is separated by a comma (NO bullet symbols like '-' or '*', NO list numbers, and NO newlines). Just return the points separated by commas.
6. Do not include markdown formatting or headers. Output ONLY the raw comma-separated string.
`;

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      return NextResponse.json({ text });

    } else {
      return NextResponse.json({ error: 'Invalid generation type' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate text using AI.' }, { status: 500 });
  }
}
