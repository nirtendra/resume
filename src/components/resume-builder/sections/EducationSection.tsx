'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Trash2 } from 'lucide-react';
import type { ResumeData, Education } from '../types';

interface EducationSectionProps {
  resumeData: ResumeData;
  handleNestedChange: (section: 'education', id: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  addEducation: () => void;
  removeEducation: (id: number) => void;
}

export function EducationSection({ resumeData, handleNestedChange, addEducation, removeEducation }: EducationSectionProps) {
  return (
    <div className="space-y-4">
      {resumeData.education.map((edu: Education) => (
        <div key={edu.id} className="p-4 border rounded-md space-y-2 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                <Input id={`institution-${edu.id}`} name="institution" value={edu.institution} onChange={(e) => handleNestedChange('education', edu.id, e)} />
            </div>
              <div>
                <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                <Input id={`degree-${edu.id}`} name="degree" value={edu.degree} onChange={(e) => handleNestedChange('education', edu.id, e)} />
            </div>
          </div>
          <div>
              <Label htmlFor={`date-edu-${edu.id}`}>Date</Label>
              <Input id={`date-edu-${edu.id}`} name="date" value={edu.date} onChange={(e) => handleNestedChange('education', edu.id, e)} />
          </div>
            <Button variant="outline" size="icon" className="absolute top-2 right-2" onClick={() => removeEducation(edu.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
        <Button variant="outline" onClick={addEducation}>
        <PlusCircle className="mr-2 h-4 w-4" /> Add Education
      </Button>
    </div>
  );
}
