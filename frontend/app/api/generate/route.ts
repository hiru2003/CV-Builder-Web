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
    const { 
      jobTitle, 
      skills, 
      currentSummary, 
      position, 
      company, 
      currentDescription, 
      tone = 'professional', 
      mode = 'generate' 
    } = payload || {};

    const genAI = new GoogleGenerativeAI(apiKey);
    // Use gemini-2.5-flash for speed and reliability
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    let prompt = '';

    if (type === 'summary') {
      const toneGuideline = 
        tone === 'technical' ? 'Emphasize engineering expertise, technical methodologies, architecture, and technology stacks.' :
        tone === 'executive' ? 'Emphasize strategic leadership, business impact, scaling teams, management, and business results.' :
        tone === 'creative' ? 'Use a dynamic, narrative-driven tone that highlights innovation, unique problem solving, and storytelling.' :
        'Maintain a balanced, standard, polished professional corporate tone.'; // default: professional

      if (mode === 'refine') {
        prompt = `
You are an expert professional resume writer. Rewrite, polish, and enhance the following draft professional summary to make it compelling, high-impact, and ATS-friendly.

Draft Summary to Enhance: "${currentSummary || ''}"
Target Job Title: ${jobTitle || 'Professional'}
Skills to Highlight (integrate naturally if appropriate): ${skills && skills.length > 0 ? skills.join(', ') : 'Not specified'}

Guidelines:
1. ${toneGuideline}
2. Fix all grammatical issues and improve active vocabulary.
3. Keep the factual details but elevate the delivery.
4. Output exactly ONE concise paragraph (around 3 to 4 sentences, 50-80 words).
5. Do not include markdown formatting, bullet points, headers, or quotes. Output ONLY the raw text summary.
`;
      } else {
        prompt = `
You are an expert professional resume writer. Write a compelling, high-impact professional summary for a resume/CV from scratch.

Target Job Title: ${jobTitle || 'Professional'}
Skills to Highlight: ${skills && skills.length > 0 ? skills.join(', ') : 'Not specified'}
Additional Context/Draft (if any): ${currentSummary || 'None'}

Guidelines:
1. ${toneGuideline}
2. Keep it engaging, professional, and ATS-friendly.
3. Output exactly ONE concise paragraph (around 3 to 4 sentences, 50-80 words).
4. Do not use generic buzzwords. Focus on achievements, capability, and value.
5. Do not include markdown formatting, bullet points, headers, or quotes. Output ONLY the raw text summary.
`;
      }

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      return NextResponse.json({ text });

    } else if (type === 'experience') {
      const toneGuideline = 
        tone === 'technical' ? 'Emphasize technical architecture, tools, code quality, and specific engineering contributions.' :
        tone === 'results-driven' ? 'Focus heavily on metrics, percentages, dollar amounts, time saved, and direct business outcomes.' :
        'Use strong action verbs (e.g., Designed, Spearheaded, Optimized) focusing on specific tasks and impact.'; // default: action-oriented

      if (mode === 'refine') {
        prompt = `
You are an expert professional resume writer. Enhance and rewrite the following work experience description to make it high-impact, professional, and ATS-friendly.

Draft Description to Enhance: "${currentDescription || ''}"
Job Title/Position: ${position || 'Employee'}
Company: ${company || 'Company'}
Skills (integrate where appropriate): ${skills && skills.length > 0 ? skills.join(', ') : 'Not specified'}

Guidelines:
1. ${toneGuideline}
2. Create exactly 3 to 4 high-impact bullet points based on the draft.
3. Use the "Action Verb + Task + Result/Impact" formula (e.g. "Developed dynamic features using React, reducing loading time by 20%").
4. Fix any spelling/grammar and elevate the vocabulary.
5. Return the bullet points as a single, comma-separated string where each bullet point is separated by a comma (NO bullet symbols like '-' or '*', NO list numbers, and NO newlines). Just return the points separated by commas.
6. Output ONLY the raw comma-separated string.
`;
      } else {
        prompt = `
You are an expert professional resume writer. Write a work experience description from scratch based on the job details.

Job Title/Position: ${position || 'Employee'}
Company: ${company || 'Company'}
Skills to Highlight: ${skills && skills.length > 0 ? skills.join(', ') : 'Not specified'}
Additional Context/Draft: ${currentDescription || 'None'}

Guidelines:
1. ${toneGuideline}
2. Create exactly 3 to 4 high-impact bullet points.
3. Use the "Action Verb + Task + Result/Impact" formula (e.g. "Spearheaded design of user experience flows, increasing engagement by 15%").
4. Return the bullet points as a single, comma-separated string where each bullet point is separated by a comma (NO bullet symbols like '-' or '*', NO list numbers, and NO newlines). Just return the points separated by commas.
5. Output ONLY the raw comma-separated string.
`;
      }

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

