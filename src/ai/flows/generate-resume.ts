'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating an optimized resume based on a job description.
 *
 * The flow takes a job description and the current resume data as input,
 * and returns a rewritten, ATS-friendly resume.
 * It exports:
 *   - generateResume: The main function to trigger the flow.
 *   - GenerateResumeInput: The input type for the flow.
 *   - GenerateResumeOutput: The output type for the flow (which is the full resume data).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExperienceSchema = z.object({
  id: z.number(),
  company: z.string(),
  role: z.string(),
  date: z.string(),
  description: z.string(),
});

const EducationSchema = z.object({
  id: z.number(),
  institution: z.string(),
  degree: z.string(),
  date: z.string(),
});

const ResumeDataSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  linkedin: z.string(),
  github: z.string(),
  summary: z.string(),
  experience: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  skills: z.string(),
});

const GenerateResumeInputSchema = z.object({
  jobDescription: z.string().describe('The job description to tailor the resume for.'),
  currentResume: ResumeDataSchema.describe('The user\'s current resume data.'),
});

export type GenerateResumeInput = z.infer<typeof GenerateResumeInputSchema>;
export type GenerateResumeOutput = z.infer<typeof ResumeDataSchema>;

export async function generateResume(input: GenerateResumeInput): Promise<GenerateResumeOutput> {
  return generateResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResumePrompt',
  input: {
    schema: z.object({
      jobDescription: z.string(),
      currentResume: z.string(), // Expecting a JSON string now
    }),
  },
  output: {schema: ResumeDataSchema},
  prompt: `You are an expert resume writer and career coach specializing in creating ATS-friendly resumes that get noticed.

  Your task is to analyze the provided job description and rewrite the user's current resume to be perfectly tailored for the role.

  Job Description:
  {{{jobDescription}}}

  Current Resume Data (in JSON format):
  {{{currentResume}}}

  Instructions:
  1.  **Rewrite the Professional Summary**: Make it concise, powerful, and directly aligned with the key requirements of the job description.
  2.  **Optimize Work Experience**: For each role, rewrite the descriptions to highlight accomplishments and skills that are most relevant to the job description. Use action verbs and quantify achievements where possible. Ensure the output is a bulleted list format within the description string, with each bullet point starting with '- '.
  3.  **Tailor Skills**: Update the skills section to include keywords from the job description while retaining the user's core competencies. Ensure it's a comma-separated string.
  4.  **Do Not Change**: Do not change the user's name, contact information (email, phone, linkedin, github), or education details (institution, degree, date).
  5.  **Return full resume**: Return the complete, updated resume data in the specified JSON format.
  `,
});

const generateResumeFlow = ai.defineFlow(
  {
    name: 'generateResumeFlow',
    inputSchema: GenerateResumeInputSchema,
    outputSchema: ResumeDataSchema,
  },
  async (input) => {
    const promptInput = {
      ...input,
      currentResume: JSON.stringify(input.currentResume, null, 2),
    };
    const {output} = await prompt(promptInput);
    return output!;
  }
);
