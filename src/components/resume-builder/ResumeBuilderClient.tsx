'use client';

import { useRef, useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  Accordion,
} from '@/components/ui/accordion';

import { type ResumeData, type SectionId, initialResumeData, templates } from './types';
import { useResumeData } from './hooks/useResumeData';
import { usePrintAndDownload } from './hooks/usePrintAndDownload';
import { useAIGeneration } from './hooks/useAIGeneration';

import { ResumeEditorHeader } from './ResumeEditorHeader';
import { TemplateSelector } from './TemplateSelector';
import { AIGenerator } from './AIGenerator';
import { SortableSection } from '../SortableSection';
import { PersonalInfoSection } from './sections/PersonalInfoSection';
import { SummarySection } from './sections/SummarySection';
import { ExperienceSection } from './sections/ExperienceSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { EducationSection } from './sections/EducationSection';
import { SkillsSection } from './sections/SkillsSection';
import { CertificationsSection } from './sections/CertificationsSection';
import { AttributesSection } from './sections/AttributesSection';

export default function ResumeBuilderClient() {
  const [resumeData, setResumeData, sectionHandlers] = useResumeData(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof templates>('classic');
  const [sections, setSections] = useState<SectionId[]>([
    'personal',
    'summary',
    'experience',
    'projects',
    'education',
    'skills',
    'certifications',
    'attributes',
  ]);

  const resumePreviewRef = useRef(null);
  const { handlePrint, handleWordDownload, isDownloadingWord } = usePrintAndDownload(resumePreviewRef, resumeData);
  const { handleGenerateResume, isGenerating, aiError } = useAIGeneration(setResumeData);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;
    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.indexOf(active.id as SectionId);
        const newIndex = items.indexOf(over.id as SectionId);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const SelectedTemplateComponent = templates[selectedTemplate];

  const sectionComponents: Record<SectionId, { title: string; content: React.ReactNode }> = {
    personal: {
      title: 'Personal Information',
      content: <PersonalInfoSection resumeData={resumeData} setResumeData={setResumeData} />
    },
    summary: {
      title: 'Professional Summary',
      content: <SummarySection resumeData={resumeData} setResumeData={setResumeData} />
    },
    experience: {
      title: 'Work Experience',
      content: <ExperienceSection resumeData={resumeData} {...sectionHandlers} />
    },
    projects: {
      title: 'Projects',
      content: <ProjectsSection resumeData={resumeData} {...sectionHandlers} />
    },
    education: {
      title: 'Education',
      content: <EducationSection resumeData={resumeData} {...sectionHandlers} />
    },
    skills: {
      title: 'Skills',
      content: <SkillsSection resumeData={resumeData} setResumeData={setResumeData} />
    },
    certifications: {
      title: 'Certifications',
      content: <CertificationsSection resumeData={resumeData} setResumeData={setResumeData} />
    },
    attributes: {
      title: 'Personal Attributes',
      content: <AttributesSection resumeData={resumeData} setResumeData={setResumeData} />
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="bg-white dark:bg-card p-6 rounded-lg shadow-sm">
        <ResumeEditorHeader
          handlePrint={handlePrint}
          handleWordDownload={handleWordDownload}
          isDownloadingWord={isDownloadingWord}
        />
        <Accordion type="multiple" defaultValue={["template", "personal"]} className="w-full">
          <TemplateSelector selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />
          <AIGenerator
            isGenerating={isGenerating}
            aiError={aiError}
            handleGenerate={handleGenerateResume}
            currentResume={resumeData}
          />
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={sections}
              strategy={verticalListSortingStrategy}
            >
              {sections.map(id => (
                <SortableSection key={id} id={id} title={sectionComponents[id].title}>
                  <div className="space-y-4">{sectionComponents[id].content}</div>
                </SortableSection>
              ))}
            </SortableContext>
          </DndContext>
        </Accordion>
      </div>
      <div className="lg:sticky lg:top-24">
        <div ref={resumePreviewRef}>
          <SelectedTemplateComponent data={resumeData} sectionOrder={sections} />
        </div>
      </div>
    </div>
  );
}
