'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2 } from 'lucide-react';
import type { ResumeData, Project } from '../types';

interface ProjectsSectionProps {
  resumeData: ResumeData;
  handleNestedChange: (section: 'projects', id: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  addProject: () => void;
  removeProject: (id: number) => void;
}

export function ProjectsSection({ resumeData, handleNestedChange, addProject, removeProject }: ProjectsSectionProps) {
  return (
    <div className="space-y-4">
      {(resumeData.projects || []).map((proj: Project) => (
        <div key={proj.id} className="p-4 border rounded-md space-y-2 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <Label htmlFor={`name-${proj.id}`}>Project Name</Label>
                <Input id={`name-${proj.id}`} name="name" value={proj.name} onChange={(e) => handleNestedChange('projects', proj.id, e)} />
            </div>
            <div>
                <Label htmlFor={`duration-${proj.id}`}>Duration</Label>
                <Input id={`duration-${proj.id}`} name="duration" value={proj.duration} onChange={(e) => handleNestedChange('projects', proj.id, e)} />
            </div>
          </div>
          <div>
            <Label htmlFor={`description-proj-${proj.id}`}>Description</Label>
            <Textarea id={`description-proj-${proj.id}`} name="description" value={proj.description} onChange={(e) => handleNestedChange('projects', proj.id, e)} rows={4}/>
          </div>
          <Button variant="outline" size="icon" className="absolute top-2 right-2" onClick={() => removeProject(proj.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button variant="outline" onClick={addProject}>
        <PlusCircle className="mr-2 h-4 w-4" /> Add Project
      </Button>
    </div>
  );
}
