'use client';
import type { ResumeData } from '../ResumeBuilderClient';

interface ResumePreviewProps {
  data: ResumeData;
}

export function ATSFriendlyResumeTemplate({ data }: ResumePreviewProps) {
  return (
    <div className="bg-white dark:bg-card shadow-lg rounded-lg overflow-hidden">
      <div className="p-8 text-black font-serif">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <p className="text-sm text-gray-600 mt-2">
            {data.email} | {data.phone} | {data.linkedin} | {data.github}
          </p>
        </header>

        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-2">
            Summary
          </h2>
          <p className="text-sm text-gray-800 leading-relaxed">{data.summary}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-2">
            Skills
          </h2>
          <p className="text-sm text-gray-800 leading-relaxed">{data.skills}</p>
        </section>

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

        <section>
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
      </div>
    </div>
  );
}
