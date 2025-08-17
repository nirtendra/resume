'use server';

import { generateCoverLetter } from '@/ai/flows/generate-cover-letter';
import type { GenerateCoverLetterOutput } from '@/ai/flows/generate-cover-letter';

export type FormState = {
  data: GenerateCoverLetterOutput | null;
  error: string | null;
  message: string;
};

export async function getCoverLetter(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const jobDescription = formData.get('jobDescription') as string;
  const resume = formData.get('resume') as string;
  const userName = formData.get('userName') as string;

  if (!jobDescription || jobDescription.trim().length < 50) {
    return {
      data: null,
      error: 'Job description is too short. Please provide more detail.',
      message: 'Validation failed.',
    };
  }
  
  if (!resume || resume.trim().length < 50) {
    return {
      data: null,
      error: 'Resume content is too short. Please provide more detail.',
      message: 'Validation failed.',
    };
  }
  
  if (!userName) {
    return {
        data: null,
        error: 'Could not find user name.',
        message: 'Validation failed.'
    }
  }

  try {
    const result = await generateCoverLetter({ jobDescription, resume, userName });
    return {
      data: result,
      error: null,
      message: 'Success!',
    };
  } catch (e: any) {
    return {
      data: null,
      error: e.message || 'An unexpected error occurred.',
      message: 'An error occurred.',
    };
  }
}
