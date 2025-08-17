'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2 } from 'lucide-react';
import type { ResumeData, Experience } from '../types';

interface ExperienceSectionProps {
  resumeData: ResumeData;
  handleNestedChange: (section: 'experience', id: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  addExperience: () => void;
  removeExperience: (id: number) => void;
}

export function ExperienceSection({ resumeData, handleNestedChange, addExperience, removeExperience }: ExperienceSectionProps) {
  return (
    <div className="space-y-4">
      {resumeData.experience.map((exp: Experience) => (
        <div key={exp.id} className="p-4 border rounded-md space-y-2 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <Label htmlFor={`role-${exp.id}`}>Role</Label>
                <Input id={`role-${exp.id}`} name="role" value={exp.role} onChange={(e) => handleNestedChange('experience', exp.id, e)} />
            </div>
            <div>
                <Label htmlFor={`company-${exp.id}`}>Company</Label>
                <Input id={`company-${exp.id}`} name="company" value={exp.company} onChange={(e) => handleNestedChange('experience', exp.id, e)} />
            </div>
          </div>
          <div>
              <Label htmlFor={`date-exp-${exp.id}`}>Date</Label>
              <Input id={`date-exp-${exp.id}`} name="date" value={exp.date} onChange={(e) => handleNestedChange('experience', exp.id, e)} />
          </div>
          <div>
            <Label htmlFor={`description-${exp.id}`}>Description</Label>
            <Textarea id={`description-${exp.id}`} name="description" value={exp.description} onChange={(e) => handleNestedChange('experience', exp.id, e)} rows={4}/>
          </div>
          <Button variant="outline" size="icon" className="absolute top-2 right-2" onClick={() => removeExperience(exp.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button variant="outline" onClick={addExperience}>
        <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
      </Button>
    </div>
  );
}
