'use server';

/**
 * @fileOverview This file defines a Genkit flow for interview preparation.
 *
 * The flow takes a job description as input and generates potential interview questions and talking points.
 * It exports:
 *   - interviewPrep: The main function to trigger the flow.
 *   - InterviewPrepInput: The input type for the interviewPrep function.
 *   - InterviewPrepOutput: The output type for the interviewPrep function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InterviewPrepInputSchema = z.object({
  jobDescription: z.string().describe('The job description to generate interview questions and talking points for.'),
});
export type InterviewPrepInput = z.infer<typeof InterviewPrepInputSchema>;

const InterviewPrepOutputSchema = z.object({
  questions: z.array(z.string()).describe('An array of potential interview questions.'),
  talkingPoints: z.array(z.string()).describe('An array of talking points to discuss during the interview.'),
});
export type InterviewPrepOutput = z.infer<typeof InterviewPrepOutputSchema>;

export async function interviewPrep(input: InterviewPrepInput): Promise<InterviewPrepOutput> {
  return interviewPrepFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interviewPrepPrompt',
  input: {schema: InterviewPrepInputSchema},
  output: {schema: InterviewPrepOutputSchema},
  prompt: `You are an expert career coach helping a job seeker prepare for an interview.

  Based on the following job description, generate a list of potential interview questions and talking points that the job seeker can use to prepare.

  Job Description: {{{jobDescription}}}

  Format the questions and talking points as arrays of strings in the output. Make sure talking points are no more than two sentences.
  `,
});

const interviewPrepFlow = ai.defineFlow(
  {
    name: 'interviewPrepFlow',
    inputSchema: InterviewPrepInputSchema,
    outputSchema: InterviewPrepOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
