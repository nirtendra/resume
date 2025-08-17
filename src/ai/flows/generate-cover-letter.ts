'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a cover letter.
 *
 * The flow takes a job description and resume content as input, and returns a
 * professionally written cover letter tailored to the job.
 * It exports:
 *   - generateCoverLetter: The main function to trigger the flow.
 *   - GenerateCoverLetterInput: The input type for the flow.
 *   - GenerateCoverLetterOutput: The output type for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCoverLetterInputSchema = z.object({
  jobDescription: z.string().describe('The job description to tailor the cover letter for.'),
  resume: z.string().describe("The user's resume content."),
  userName: z.string().describe("The user's name."),
});

export type GenerateCoverLetterInput = z.infer<typeof GenerateCoverLetterInputSchema>;

const GenerateCoverLetterOutputSchema = z.object({
  coverLetter: z.string().describe('The generated cover letter text.'),
});

export type GenerateCoverLetterOutput = z.infer<typeof GenerateCoverLetterOutputSchema>;


export async function generateCoverLetter(input: GenerateCoverLetterInput): Promise<GenerateCoverLetterOutput> {
  return generateCoverLetterFlow(input);
}


const prompt = ai.definePrompt({
  name: 'generateCoverLetterPrompt',
  input: { schema: GenerateCoverLetterInputSchema },
  output: { schema: GenerateCoverLetterOutputSchema },
  prompt: `You are an expert career coach and professional resume writer. Your task is to write a compelling and professional cover letter for a job applicant.

  **Applicant's Name:**
  {{{userName}}}

  **Applicant's Resume:**
  {{{resume}}}

  **Target Job Description:**
  {{{jobDescription}}}

  **Instructions:**

  1.  **Analyze the Resume and Job Description**: Thoroughly review the applicant's resume to understand their skills, experience, and achievements. Cross-reference this with the key requirements and qualifications listed in the job description.

  2.  **Craft a Compelling Narrative**: Write a cover letter that tells a story. It should connect the applicant's experience directly to the needs of the employer as stated in the job description. Do not just repeat the resume.

  3.  **Structure and Tone**:
      *   The tone should be professional, confident, and enthusiastic.
      *   Structure the letter with a clear introduction (state the position being applied for and where it was seen), a body (highlight 2-3 key qualifications with specific examples from the resume), and a conclusion (reiterate interest and include a call to action).
      *   The letter should be concise, ideally 3-4 paragraphs long.

  4.  **Tailor Content**:
      *   Identify the most critical skills and experiences from the job description and highlight how the applicant's background aligns with them. Use keywords from the job description where appropriate.
      *   If the resume shows a clear accomplishment (e.g., "Increased sales by 20%"), try to weave that into the cover letter as evidence of their capabilities.

  5.  **Final Output**:
      *   The final output should be only the text of the cover letter in the 'coverLetter' field.
      *   Do not include placeholders like "[Your Name]" or "[Company Name]". Use the provided applicant name. Assume the hiring manager's name and the company address are unknown and format the letter accordingly (e.g., "Dear Hiring Manager,").
  `,
});


const generateCoverLetterFlow = ai.defineFlow(
  {
    name: 'generateCoverLetterFlow',
    inputSchema: GenerateCoverLetterInputSchema,
    outputSchema: GenerateCoverLetterOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
