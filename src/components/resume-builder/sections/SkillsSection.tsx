'use client';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ResumeData } from '../types';

interface SkillsSectionProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export function SkillsSection({ resumeData, setResumeData }: SkillsSectionProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Label htmlFor="skills">Skills (comma separated)</Label>
      <Textarea id="skills" name="skills" value={resumeData.skills} onChange={handleChange} rows={4}/>
    </>
  );
}
