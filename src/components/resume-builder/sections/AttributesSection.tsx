'use client';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ResumeData } from '../types';

interface AttributesSectionProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export function AttributesSection({ resumeData, setResumeData }: AttributesSectionProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Label htmlFor="personalAttributes">Personal Attributes (comma separated)</Label>
      <Textarea id="personalAttributes" name="personalAttributes" value={resumeData.personalAttributes || ''} onChange={handleChange} rows={3}/>
    </>
  );
}
