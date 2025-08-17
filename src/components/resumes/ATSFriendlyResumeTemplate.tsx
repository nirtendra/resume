'use client';
import type { ResumeData, SectionId } from '../ResumeBuilderClient';

interface ResumePreviewProps {
  data: ResumeData;
  sectionOrder?: SectionId[];
}

const defaultSectionOrder: SectionId[] = [
  'summary',
  'skills',
  'experience',
  'projects',
  'education',
  'certifications',
  'attributes',
];


export function ATSFriendlyResumeTemplate({ data, sectionOrder = defaultSectionOrder }: ResumePreviewProps) {
  const sections: Record<SectionId, React.ReactNode> = {
    personal: null, // Not rendered in the main body
    summary: (
      <section className="mb-6">
        <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-2">
          Summary
        </h2>
        <p className="text-sm text-gray-800 leading-relaxed">{data.summary}</p>
      </section>
    ),
    skills: (
      <section className="mb-6">
        <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-2">
          Skills
        </h2>
        <p className="text-sm text-gray-800 leading-relaxed">{data.skills}</p>
      </section>
    ),
    experience: (
      <section className="mb-6">
        <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-2">
          Experience
        </h2>
        <div className="space-y-4">
          {data.experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-base">{exp.role}</h3>
                <p className="text-sm font-medium">{exp.date}</p>
              </div>
              <p className="text-sm italic">{exp.company}</p>
              <ul className="mt-2 list-disc list-inside text-sm text-gray-800 space-y-1">
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
      <section className="mb-6">
        <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-2">
          Projects
        </h2>
        <div className="space-y-4">
          {data.projects.map((proj) => (
            <div key={proj.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-base">{proj.name}</h3>
                <p className="text-sm font-medium">{proj.duration}</p>
              </div>
              <ul className="mt-2 list-disc list-inside text-sm text-gray-800 space-y-1">
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
      <section className="mb-6">
        <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-2">
          Education
        </h2>
        <div className="space-y-2">
          {data.education.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-base">{edu.degree}</h3>
                <p className="text-sm font-medium">{edu.date}</p>
              </div>
              <p className="text-sm">{edu.institution}</p>
            </div>
          ))}
        </div>
      </section>
    ),
    certifications: data.certifications && (
       <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-2">
            Certifications
          </h2>
          <p className="text-sm text-gray-800 leading-relaxed">{data.certifications}</p>
        </section>
    ),
    attributes: data.personalAttributes && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-2">
            Personal Attributes
          </h2>
          <p className="text-sm text-gray-800 leading-relaxed">{data.personalAttributes}</p>
        </section>
    ),
  };
  
  return (
    <div className="bg-white dark:bg-card shadow-lg rounded-lg overflow-hidden">
      <div className="p-8 text-black font-serif">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <p className="text-sm text-gray-600 mt-2">
            {data.email}
            {data.phone && ` | ${data.phone}`}
            {data.linkedin && ` | ${data.linkedin}`}
            {data.github && ` | ${data.github}`}
          </p>
        </header>
        
        {sectionOrder.map(id => <div key={id}>{sections[id]}</div>)}

      </div>
    </div>
  );
}
