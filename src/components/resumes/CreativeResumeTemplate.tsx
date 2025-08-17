'use client';
import type { ForwardedRef } from 'react';
import React from 'react';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';
import type { ResumeData } from '../ResumeBuilderClient';

interface ResumePreviewProps {
  data: ResumeData;
  ref: ForwardedRef<HTMLDivElement>;
}

export function CreativeResumeTemplate({ data, ref }: ResumePreviewProps) {
  return (
    <div ref={ref} className="bg-white dark:bg-card shadow-lg rounded-lg overflow-hidden font-body text-black">
      <div className="p-8">
        <header className="relative text-center mb-8 pb-4">
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gray-200"></div>
          <h1 className="text-4xl font-bold font-headline text-gray-800 tracking-wider">{data.name}</h1>
          <p className="text-sm text-primary font-medium tracking-widest mt-1">PROFESSIONAL</p>
        </header>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-4 space-y-8">
             <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Contact</h2>
              <div className="flex flex-col gap-2 text-xs text-gray-600">
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
            </section>

             <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Education</h2>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold text-sm text-gray-800">{edu.institution}</h3>
                    <p className="text-xs text-gray-600">{edu.degree}</p>
                    <p className="text-xs text-gray-500">{edu.date}</p>
                  </div>
                ))}
              </div>
            </section>

             <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Skills</h2>
              <div className="space-y-1">
                {data.skills.split(',').map((skill) => (
                  <p key={skill.trim()} className="text-sm text-gray-700">{skill.trim()}</p>
                ))}
              </div>
            </section>
          </div>

          <div className="col-span-8 space-y-8">
            <section>
               <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Summary</h2>
              <p className="text-gray-700 text-sm leading-relaxed">{data.summary}</p>
            </section>

            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Experience</h2>
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold text-base text-gray-800">{exp.role}</h3>
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
    </div>
  );
}
