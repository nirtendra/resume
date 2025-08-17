import { ClassicResumeTemplate } from '../resumes/ClassicResumeTemplate';
import { ModernResumeTemplate } from '../resumes/ModernResumeTemplate';
import { CreativeResumeTemplate } from '../resumes/CreativeResumeTemplate';
import { ProfessionalResumeTemplate } from '../resumes/ProfessionalResumeTemplate';
import { ATSFriendlyResumeTemplate } from '../resumes/ATSFriendlyResumeTemplate';

export interface Project {
  id: number;
  name: string;
  duration: string;
  description: string;
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  linkedin?: string;
  github?: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string;
  projects?: Project[];
  certifications?: string;
  personalAttributes?: string;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  date: string;
  description: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  date: string;
}

export type SectionId = 'personal' | 'summary' | 'experience' | 'projects' | 'education' | 'skills' | 'certifications' | 'attributes';

export const initialResumeData: ResumeData = {
  name: 'Your Name',
  email: 'your.email@example.com',
  phone: '123-456-7890',
  linkedin: 'linkedin.com/in/yourprofile',
  github: 'github.com/yourprofile',
  summary: 'A brief professional summary about you. Highlight your key skills and career goals.',
  experience: [],
  education: [
    {
      id: 1,
      institution: 'University of Technology',
      degree: 'B.S. in Computer Science',
      date: 'Sep 2016 - May 2020',
    },
  ],
  skills: 'React, Node.js, TypeScript, Next.js, Tailwind CSS, Firebase',
  projects: [],
  certifications: '',
  personalAttributes: '',
};

export const templates = {
  classic: ClassicResumeTemplate,
  modern: ModernResumeTemplate,
  creative: CreativeResumeTemplate,
  professional: ProfessionalResumeTemplate,
  atsFriendly: ATSFriendlyResumeTemplate,
};

export type TemplateKey = keyof typeof templates;
