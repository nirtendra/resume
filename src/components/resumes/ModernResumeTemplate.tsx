'use client';
import type { ForwardedRef } from 'react';
import React from 'react';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';
import type { ResumeData } from '../ResumeBuilderClient';

interface ResumePreviewProps {
  data: ResumeData;
}

export function ModernResumeTemplate({ data }: ResumePreviewProps) {
  return (
    <div className="bg-white dark:bg-card shadow-lg rounded-lg overflow-hidden">
      <div className="p-8 md:p-10 text-black font-body grid grid-cols-3 gap-10">
        <div className="col-span-1 border-r pr-8">
          <header className="text-left mb-8">
            <h1 className="text-3xl font-bold font-headline text-gray-800">{data.name}</h1>
            <div className="flex flex-col gap-2 mt-4 text-xs text-gray-600">
              <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:text-primary">
                <Mail size={14} /> <span>{data.email}</span>
              </a>
              <a href={`tel:${data.phone}`} className="flex items-center gap-2 hover:text-primary">
                <Phone size={14} /> <span>{data.phone}</span>
              </a>
              <a href={`https://${data.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary">
                <Linkedin size={14} /> <span>LinkedIn</span>
              </a>
              <a href={`https://${data.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary">
                <Github size={14} /> <span>GitHub</span>
              </a>
            </div>
          </header>
          
          <section className="mb-8">
            <h2 className="text-lg font-bold font-headline text-primary mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.split(',').map((skill) => (
                <span
                  key={skill.trim()}
                  className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </section>
          
          <section>
            <h2 className="text-lg font-bold font-headline text-primary mb-3">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-sm text-gray-800">{edu.institution}</h3>
                  <p className="text-xs text-gray-600">{edu.degree}</p>
                  <p className="text-xs text-gray-500 font-medium">{edu.date}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-2">
          <section className="mb-8">
            <h2 className="text-lg font-bold font-headline text-primary border-b-2 border-primary/20 pb-2 mb-3">
              Summary
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">{data.summary}</p>
          </section>

          <section>
            <h2 className="text-lg font-bold font-headline text-primary border-b-2 border-primary/20 pb-2 mb-3">
              Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-base text-gray-800">{exp.role}</h3>
                     <p className="text-xs text-gray-500 font-medium">{exp.date}</p>
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
        </div>
      </div>
    </div>
  );
}
