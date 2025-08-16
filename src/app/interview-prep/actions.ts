'use server';

import { interviewPrep } from '@/ai/flows/interview-prep';
import type { InterviewPrepOutput } from '@/ai/flows/interview-prep';

export type FormState = {
  data: InterviewPrepOutput | null;
  error: string | null;
  message: string;
};

export async function getInterviewPrep(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const jobDescription = formData.get('jobDescription') as string;

  if (!jobDescription || jobDescription.trim().length < 50) {
    return {
      data: null,
      error: 'Job description is too short. Please provide more detail.',
      message: 'Validation failed.',
    };
  }

  try {
    const result = await interviewPrep({ jobDescription });
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
