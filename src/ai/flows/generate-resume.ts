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

const ProjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  duration: z.string(),
  description: z.string(),
});

const ResumeDataSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  summary: z.string(),
  experience: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  skills: z.string(),
  projects: z.array(ProjectSchema).optional(),
  certifications: z.string().optional(),
  personalAttributes: z.string().optional(),
});

const GenerateResumeInputSchema = z.object({
  jobDescription: z.string().describe('The job description to tailor the resume for.'),
  currentResume: ResumeDataSchema.describe("The user's current resume data, which may be partially filled."),
  pastedResume: z.string().optional().describe("The full text of the user's existing resume, pasted in by the user."),
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
      pastedResume: z.string().optional(),
    }),
  },
  output: {schema: ResumeDataSchema},
  prompt: `You are a top-tier resume writer and career coach with extensive experience in creating professional, ATS-friendly resumes that land interviews at top companies.

  Your task is to conduct a comprehensive analysis of the provided job description and the user's current resume data. You will then rewrite and optimize the entire resume to be perfectly tailored for the target role, ensuring every section is complete, professional, and strategic.
  
  **Primary Information Source:**
  If the user has provided their pasted resume content, use that as the primary source of truth for their experience, skills, and education. If it is empty, use the 'currentResume' data from the form. If both are sparse, generate content based on the job description.

  Job Description:
  {{{jobDescription}}}

  Current Resume Data (from form fields, in JSON format):
  {{{currentResume}}}

  Pasted Resume Content (if provided by user):
  {{{pastedResume}}}

  **Core Instructions:**

  1.  **Rewrite the Professional Summary**: Craft a concise, powerful, and compelling professional summary (2-3 sentences) that is directly aligned with the key requirements and qualifications mentioned in the job description. It must immediately grab the recruiter's attention.

  2.  **Optimize Work Experience**:
      *   For each role, rewrite the descriptions to highlight quantifiable achievements and skills that are most relevant to the job description.
      *   Use strong action verbs and focus on results (e.g., "Increased sales by 15%," "Reduced server costs by 30%").
      *   Ensure the output for each experience description is a bulleted list. Each bullet point MUST start with '- '.

  3.  **Generate Work Experience (If Missing)**:
      *   If the 'experience' array in the current or pasted resume is empty, you MUST generate a complete, relevant, and professional work history based on the job description.
      *   Invent plausible companies, roles, dates, and detailed, accomplishment-oriented descriptions that align perfectly with the target job. Create at least two distinct professional roles.
  
  4.  **Generate Projects (If relevant)**:
      *   Analyze the job description to determine if a 'Projects' section would be beneficial (e.g., for technical roles, creative portfolios).
      *   If so, and if the user has not provided any, generate one or two relevant project examples with a name, duration, and a compelling description of the outcome and technologies used.

  5.  **Tailor Skills, Certifications, and Attributes**:
      *   Analyze the job description for key technical skills, soft skills, tools, and relevant keywords.
      *   Update the 'skills' section to be a comprehensive, comma-separated list that includes these keywords.
      *   Populate the 'certifications' and 'personalAttributes' fields with relevant items derived from the job description if they would strengthen the resume.

  6.  **Maintain Professional Integrity & Contextualize Contact Info**:
      *   **Do Not Change**: Do not alter the user's name, email, or phone. Preserve the user's provided values for LinkedIn and GitHub if they exist.
      *   **Contextual Links**: Based on the job description, decide if the 'linkedin' and 'github' fields are relevant. For example, a software engineering role should include GitHub, but a sales role might not. If a field is not relevant, omit it from the final JSON output.

  7.  **Return a Complete Resume**: Your final output must be the complete, updated resume data in the specified JSON format, with all sections intelligently filled out.
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
      jobDescription: input.jobDescription,
      currentResume: JSON.stringify(input.currentResume, null, 2),
      pastedResume: input.pastedResume
    };
    const {output} = await prompt(promptInput);
    return output!;
  }
);
