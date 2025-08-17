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
  prompt: `You are a top-tier resume writer and career coach with extensive experience in creating professional, ATS-friendly resumes that land interviews at top companies.

  Your task is to conduct a comprehensive analysis of the provided job description and the user's current resume data. You will then rewrite and optimize the entire resume to be perfectly tailored for the target role, ensuring every section is complete, professional, and strategic.

  Job Description:
  {{{jobDescription}}}

  Current Resume Data (in JSON format):
  {{{currentResume}}}

  **Core Instructions:**

  1.  **Rewrite the Professional Summary**: Craft a concise, powerful, and compelling professional summary (2-3 sentences) that is directly aligned with the key requirements and qualifications mentioned in the job description. It must immediately grab the recruiter's attention.

  2.  **Optimize Work Experience**:
      *   For each role, rewrite the descriptions to highlight quantifiable achievements and skills that are most relevant to the job description.
      *   Use strong action verbs and focus on results (e.g., "Increased sales by 15%," "Reduced server costs by 30%").
      *   Ensure the output for each experience description is a bulleted list. Each bullet point MUST start with '- '.

  3.  **Generate Work Experience (If Missing)**:
      *   If the 'experience' array in the current resume is empty, you MUST generate a complete, relevant, and professional work history based on the job description.
      *   Invent plausible companies, roles, dates, and detailed, accomplishment-oriented descriptions that align perfectly with the target job. Create at least two distinct professional roles.

  4.  **Tailor Skills Section**:
      *   Analyze the job description for key technical skills, soft skills, and relevant keywords.
      *   Update the skills section to be a comprehensive, comma-separated list that includes these keywords while retaining the user's core competencies.

  5.  **Maintain Professional Integrity**:
      *   **Do Not Change**: Do not alter the user's name, contact information (email, phone, linkedin, github), or education details (institution, degree, date).
      *   **Tone & Quality**: Maintain a highly professional and polished tone throughout the entire document.

  6.  **Return a Complete Resume**: Your final output must be the complete, updated resume data in the specified JSON format, with all sections intelligently filled out.
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
