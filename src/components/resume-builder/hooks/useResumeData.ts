'use client';

import { useState } from 'react';
import type { ResumeData, Experience, Education, Project } from '../types';

export function useResumeData(initialData: ResumeData) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleNestedChange = <T extends Experience | Education | Project>(
    section: 'experience' | 'education' | 'projects',
    id: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({
      ...prev,
      [section]: (prev[section] as any[] | undefined)?.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      ) || [],
    }));
  };
  
  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {id: Date.now(), company: '', role: '', date: '', description: ''}
      ]
    }))
  }

  const removeExperience = (id: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(item => item.id !== id)
    }))
  }

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {id: Date.now(), institution: '', degree: '', date: ''}
      ]
    }))
  }

  const removeEducation = (id: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(item => item.id !== id)
    }))
  }
  
  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [
        ...(prev.projects || []),
        {id: Date.now(), name: '', duration: '', description: ''}
      ]
    }))
  }

  const removeProject = (id: number) => {
    setResumeData(prev => ({
      ...prev,
      projects: (prev.projects || []).filter(item => item.id !== id)
    }))
  }

  const sectionHandlers = {
    handleNestedChange,
    addExperience,
    removeExperience,
    addEducation,
    removeEducation,
    addProject,
    removeProject,
  };

  return [resumeData, setResumeData, sectionHandlers] as const;
}
