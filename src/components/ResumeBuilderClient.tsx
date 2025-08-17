'use client';

import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, PlusCircle, Trash2, Palette } from 'lucide-react';
import { ClassicResumeTemplate } from './resumes/ClassicResumeTemplate';
import { ModernResumeTemplate } from './resumes/ModernResumeTemplate';
import { CreativeResumeTemplate } from './resumes/CreativeResumeTemplate';

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  date: string;
  description: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  date: string;
}

const initialResumeData: ResumeData = {
  name: 'Your Name',
  email: 'your.email@example.com',
  phone: '123-456-7890',
  linkedin: 'linkedin.com/in/yourprofile',
  github: 'github.com/yourprofile',
  summary: 'A brief professional summary about you. Highlight your key skills and career goals.',
  experience: [
    {
      id: 1,
      company: 'Tech Company',
      role: 'Software Engineer',
      date: 'Jan 2020 - Present',
      description: '- Developed and maintained web applications using React and Node.js.\n- Collaborated with cross-functional teams to deliver high-quality software.'
    },
  ],
  education: [
    {
      id: 1,
      institution: 'University of Technology',
      degree: 'B.S. in Computer Science',
      date: 'Sep 2016 - May 2020',
    },
  ],
  skills: 'React, Node.js, TypeScript, Next.js, Tailwind CSS, Firebase',
};

const templates = {
  classic: ClassicResumeTemplate,
  modern: ModernResumeTemplate,
  creative: CreativeResumeTemplate,
};

type TemplateKey = keyof typeof templates;

export default function ResumeBuilderClient() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('classic');
  const resumePreviewRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => resumePreviewRef.current,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleNestedChange = <T extends Experience | Education>(
    section: 'experience' | 'education',
    id: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      ),
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

  const SelectedTemplateComponent = templates[selectedTemplate];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="bg-white dark:bg-card p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-headline font-bold">Resume Editor</h1>
            <Button onClick={handlePrint}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
            </Button>
        </div>
        <Accordion type="multiple" defaultValue={["template", "personal"]} className="w-full">
         <AccordionItem value="template">
            <AccordionTrigger>Template</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Palette />
                    Choose a Template
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={selectedTemplate}
                    onValueChange={(value) => setSelectedTemplate(value as TemplateKey)}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                  >
                    {Object.keys(templates).map((key) => (
                       <Label key={key} htmlFor={key} className="cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        <RadioGroupItem value={key} id={key} className="sr-only" />
                        <span className="text-sm font-medium capitalize">{key}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="personal">
            <AccordionTrigger>Personal Information</AccordionTrigger>
            <AccordionContent className="space-y-4">
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
                    <Input id="linkedin" name="linkedin" value={resumeData.linkedin} onChange={handleChange} />
                 </div>
                 <div className="md:col-span-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input id="github" name="github" value={resumeData.github} onChange={handleChange} />
                 </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="summary">
            <AccordionTrigger>Professional Summary</AccordionTrigger>
            <AccordionContent>
                <Label htmlFor="summary">Summary</Label>
                <Textarea id="summary" name="summary" value={resumeData.summary} onChange={handleChange} rows={5}/>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="experience">
            <AccordionTrigger>Work Experience</AccordionTrigger>
            <AccordionContent className="space-y-4">
              {resumeData.experience.map((exp) => (
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
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="education">
            <AccordionTrigger>Education</AccordionTrigger>
            <AccordionContent className="space-y-4">
              {resumeData.education.map((edu) => (
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
            </AccordionContent>
          </AccordionItem>

           <AccordionItem value="skills">
            <AccordionTrigger>Skills</AccordionTrigger>
            <AccordionContent>
                <Label htmlFor="skills">Skills (comma separated)</Label>
                <Textarea id="skills" name="skills" value={resumeData.skills} onChange={handleChange} rows={4}/>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
      <div className="lg:sticky lg:top-24">
        <SelectedTemplateComponent ref={resumePreviewRef} data={resumeData} />
      </div>
    </div>
  );
}
