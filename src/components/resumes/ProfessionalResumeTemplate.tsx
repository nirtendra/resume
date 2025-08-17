'use client';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';
import type { ResumeData, SectionId } from '../resume-builder/types';

interface ResumePreviewProps {
  data: ResumeData;
  sectionOrder?: SectionId[];
}

const defaultSectionOrder: SectionId[] = [
  'summary',
  'experience',
  'projects',
  'education',
  'skills',
  'certifications',
  'attributes',
];

export function ProfessionalResumeTemplate({ data, sectionOrder = defaultSectionOrder }: ResumePreviewProps) {
    const sections: Record<SectionId, React.ReactNode> = {
    personal: null,
    summary: (
      <section className="mb-8">
        <h2 className="text-xl font-semibold uppercase tracking-wider text-gray-700 border-b pb-2 mb-4">
          Summary
        </h2>
        <p className="text-gray-700 text-sm leading-relaxed">{data.summary}</p>
      </section>
    ),
    experience: (
      <section className="mb-8">
        <h2 className="text-xl font-semibold uppercase tracking-wider text-gray-700 border-b pb-2 mb-4">
          Experience
        </h2>
        <div className="space-y-6">
          {data.experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-lg text-gray-800">{exp.role}</h3>
                <p className="text-sm text-gray-500 font-medium">{exp.date}</p>
              </div>
              <p className="text-base text-gray-600 italic">{exp.company}</p>
              <ul className="mt-2 list-disc list-inside text-sm text-gray-700 space-y-1">
                 {exp.description.split('\n').map((line, i) => (
                  <li key={i} className="leading-relaxed">{line.replace('-', '').trim()}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    ),
     projects: data.projects && data.projects.length > 0 && (
      <section className="mb-8">
        <h2 className="text-xl font-semibold uppercase tracking-wider text-gray-700 border-b pb-2 mb-4">
          Projects
        </h2>
        <div className="space-y-6">
          {data.projects.map((proj) => (
            <div key={proj.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-lg text-gray-800">{proj.name}</h3>
                <p className="text-sm text-gray-500 font-medium">{proj.duration}</p>
              </div>
              <ul className="mt-2 list-disc list-inside text-sm text-gray-700 space-y-1">
                 {proj.description.split('\n').map((line, i) => (
                  <li key={i} className="leading-relaxed">{line.replace('-', '').trim()}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    ),
    education: (
      <section className="mb-8">
        <h2 className="text-xl font-semibold uppercase tracking-wider text-gray-700 border-b pb-2 mb-4">
          Education
        </h2>
        <div className="space-y-4">
          {data.education.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-lg text-gray-800">{edu.institution}</h3>
                <p className="text-sm text-gray-500 font-medium">{edu.date}</p>
              </div>
              <p className="text-base text-gray-600">{edu.degree}</p>
            </div>
          ))}
        </div>
      </section>
    ),
    skills: (
      <section className="mb-8">
        <h2 className="text-xl font-semibold uppercase tracking-wider text-gray-700 border-b pb-2 mb-4">
          Skills
        </h2>
        <p className="text-gray-700 text-sm">{data.skills}</p>
      </section>
    ),
    certifications: data.certifications && (
       <section className="mb-8">
          <h2 className="text-xl font-semibold uppercase tracking-wider text-gray-700 border-b pb-2 mb-4">
            Certifications
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">{data.certifications}</p>
        </section>
    ),
    attributes: data.personalAttributes && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold uppercase tracking-wider text-gray-700 border-b pb-2 mb-4">
            Personal Attributes
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">{data.personalAttributes}</p>
        </section>
    ),
  };

  return (
    <div className="bg-white dark:bg-card shadow-lg rounded-lg overflow-hidden">
      <div className="p-8 text-black font-body">
        <header className="flex justify-between items-center mb-8 pb-4 border-b-2">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">{data.name}</h1>
          </div>
          <div className="text-right text-sm text-gray-600 space-y-1">
            {data.email && <p>{data.email}</p>}
            {data.phone && <p>{data.phone}</p>}
            {data.linkedin && <p>{data.linkedin}</p>}
            {data.github && <p>{data.github}</p>}
          </div>
        </header>

        {sectionOrder.map(id => <div key={id}>{sections[id]}</div>)}

      </div>
    </div>
  );
}
