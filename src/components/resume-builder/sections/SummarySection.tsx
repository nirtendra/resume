'use client';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ResumeData } from '../types';

interface SummarySectionProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export function SummarySection({ resumeData, setResumeData }: SummarySectionProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Label htmlFor="summary">Summary</Label>
      <Textarea id="summary" name="summary" value={resumeData.summary} onChange={handleChange} rows={5}/>
    </>
  );
}
