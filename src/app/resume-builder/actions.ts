'use server';

import htmlToDocx from 'html-to-docx';
import { generateResume, type GenerateResumeInput } from '@/ai/flows/generate-resume';
import type { ResumeData } from '@/components/ResumeBuilderClient';

export async function createWordDocument(htmlContent: string) {
  if (!htmlContent) {
    throw new Error('HTML content is missing.');
  }

  try {
    const fileBuffer = await htmlToDocx(htmlContent, undefined, {
      skipMediaErrors: true,
    });
    return fileBuffer.toString('base64');
  } catch (error) {
    console.error('Error generating DOCX:', error);
    throw new Error('Failed to generate Word document.');
  }
}

export async function generateResumeFromJD(
  jobDescription: string,
  currentResume: ResumeData,
  pastedResume: string,
): Promise<ResumeData | { error: string }> {
  if (!jobDescription || jobDescription.trim().length < 50) {
    return {
      error: 'Job description is too short. Please provide more detail.',
    };
  }

  try {
    const input: GenerateResumeInput = {
      jobDescription,
      currentResume,
      pastedResume,
    };
    const result = await generateResume(input);
    return result;
  } catch (e: any) {
    console.error('AI resume generation failed:', e);
    return {
      error: e.message || 'An unexpected error occurred while generating the resume.',
    };
  }
}
