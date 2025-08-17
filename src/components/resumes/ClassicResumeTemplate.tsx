'use client';
import type { ForwardedRef } from 'react';
import React from 'react';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';
import type { ResumeData } from '../ResumeBuilderClient';

interface ResumePreviewProps {
  data: ResumeData;
  ref: ForwardedRef<HTMLDivElement>;
}

export function ClassicResumeTemplate({ data, ref }: ResumePreviewProps) {
  return (
    <div
      ref={ref}
      className="bg-white dark:bg-card shadow-lg rounded-lg overflow-hidden"
    >
      <div className="p-8 md:p-12 text-black font-body">
        <header className="text-center mb-8 border-b pb-6">
          <h1 className="text-4xl font-bold font-headline text-primary">{data.name}</h1>
          <div className="flex justify-center items-center gap-x-6 gap-y-2 flex-wrap mt-4 text-sm text-gray-600">
            <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:text-primary">
              <Mail size={14} /> {data.email}
            </a>
            <a href={`tel:${data.phone}`} className="flex items-center gap-2 hover:text-primary">
              <Phone size={14} /> {data.phone}
            </a>
            <a href={`https://${data.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary">
              <Linkedin size={14} /> {data.linkedin}
            </a>
             <a href={`https://${data.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary">
              <Github size={14} /> {data.github}
            </a>
          </div>
        </header>

        <section className="mb-8">
          <h2 className="text-xl font-bold font-headline text-primary border-b-2 border-primary/50 pb-2 mb-4">
            Professional Summary
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">{data.summary}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold font-headline text-primary border-b-2 border-primary/50 pb-2 mb-4">
            Work Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-base text-gray-800">{exp.role}</h3>
                  <p className="text-sm text-gray-500 font-medium">{exp.date}</p>
                </div>
                <p className="text-sm text-gray-600 italic">{exp.company}</p>
                <ul className="mt-2 list-disc list-inside text-sm text-gray-700 space-y-1">
                   {exp.description.split('\n').map((line, i) => (
                    <li key={i} className="leading-relaxed">{line.replace('-', '').trim()}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold font-headline text-primary border-b-2 border-primary/50 pb-2 mb-4">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-base text-gray-800">{edu.institution}</h3>
                  <p className="text-sm text-gray-500 font-medium">{edu.date}</p>
                </div>
                <p className="text-sm text-gray-600">{edu.degree}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold font-headline text-primary border-b-2 border-primary/50 pb-2 mb-4">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.split(',').map((skill) => (
              <span
                key={skill.trim()}
                className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
