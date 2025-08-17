'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ResumeData } from '../types';

interface PersonalInfoSectionProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export function PersonalInfoSection({ resumeData, setResumeData }: PersonalInfoSectionProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" value={resumeData.name} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={resumeData.email} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" value={resumeData.phone} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input id="linkedin" name="linkedin" value={resumeData.linkedin || ''} onChange={handleChange} />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="github">GitHub</Label>
          <Input id="github" name="github" value={resumeData.github || ''} onChange={handleChange} />
        </div>
    </div>
  );
}
