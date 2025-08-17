'use client';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ResumeData } from '../types';

interface CertificationsSectionProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export function CertificationsSection({ resumeData, setResumeData }: CertificationsSectionProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Label htmlFor="certifications">Certifications (comma separated)</Label>
      <Textarea id="certifications" name="certifications" value={resumeData.certifications || ''} onChange={handleChange} rows={3}/>
    </>
  );
}
