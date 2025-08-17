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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, PlusCircle, Trash2, Palette, ChevronDown, FileText, FileCode, Loader2, Bot } from 'lucide-react';
import { ClassicResumeTemplate } from './resumes/ClassicResumeTemplate';
import { ModernResumeTemplate } from './resumes/ModernResumeTemplate';
import { CreativeResumeTemplate } from './resumes/CreativeResumeTemplate';
import { ProfessionalResumeTemplate } from './resumes/ProfessionalResumeTemplate';
import { ATSFriendlyResumeTemplate } from './resumes/ATSFriendlyResumeTemplate';
import { createWordDocument, generateResumeFromJD } from '@/app/resume-builder/actions';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

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
  experience: [],
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
  professional: ProfessionalResumeTemplate,
  atsFriendly: ATSFriendlyResumeTemplate,
};

type TemplateKey = keyof typeof templates;

export default function ResumeBuilderClient() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('classic');
  const [isDownloadingWord, setIsDownloadingWord] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [aiError, setAiError] = useState<string | null>(null);
  const { toast } = useToast();
  const resumePreviewRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => resumePreviewRef.current,
    documentTitle: `${resumeData.name.replace(' ', '_')}_Resume`,
  });

  const handleWordDownload = async () => {
    const content = resumePreviewRef.current;
    if (content) {
      setIsDownloadingWord(true);
      try {
        const htmlString = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <style>
                body { font-family: Arial, sans-serif; color: black; }
                h1, h2, h3, h4, h5, h6 { color: black; }
                a { color: blue; text-decoration: none; }
                ul { list-style-type: disc; margin-left: 20px; }
                li { margin-bottom: 5px; }
                .font-bold { font-weight: bold; }
                .text-sm { font-size: 0.875rem; }
                .text-base { font-size: 1rem; }
                .italic { font-style: italic; }
                .mb-2 { margin-bottom: 0.5rem; }
                .mb-4 { margin-bottom: 1rem; }
                .mb-6 { margin-bottom: 1.5rem; }
                .mt-2 { margin-top: 0.5rem; }
                .pb-2 { padding-bottom: 0.5rem; }
                .flex { display: flex; }
                .justify-between { justify-content: space-between; }
                .items-baseline { align-items: baseline; }
                .space-y-4 > * + * { margin-top: 1rem; }
                .space-y-6 > * + * { margin-top: 1.5rem; }
                .border-b { border-bottom: 1px solid #e5e7eb; }
                .text-gray-800 { color: #1f2937; }
                .text-gray-600 { color: #4b5563; }
                .text-gray-500 { color: #6b7280; }
              </style>
            </head>
            <body>
              ${content.innerHTML}
            </body>
          </html>
        `;
        const base64 = await createWordDocument(htmlString);
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${resumeData.name.replace(' ', '_')}_Resume.docx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Download Failed',
          description: 'Could not generate the Word document. Please try again.',
        });
      } finally {
        setIsDownloadingWord(false);
      }
    }
  };

  const handleGenerateResume = async () => {
    setIsGenerating(true);
    setAiError(null);
    const result = await generateResumeFromJD(jobDescription, resumeData);
    setIsGenerating(false);
    if ('error' in result) {
      setAiError(result.error);
    } else {
      setResumeData(result);
      toast({
        title: 'Resume Generated!',
        description: 'Your resume has been updated with AI suggestions.',
      });
    }
  };

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handlePrint}>
                  <FileText className="mr-2 h-4 w-4" />
                  Download as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleWordDownload} disabled={isDownloadingWord}>
                  {isDownloadingWord ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileCode className="mr-2 h-4 w-4" />}
                  Download as Word
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                        <span className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="ai-generator">
            <AccordionTrigger>AI Resume Generator</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Bot />
                    Tailor Your Resume with AI
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="job-description">Paste Job Description</Label>
                    <Textarea 
                      id="job-description"
                      placeholder="Paste the full job description here to generate a tailored resume..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      rows={8}
                    />
                  </div>
                  <Button onClick={handleGenerateResume} disabled={isGenerating || !jobDescription} className="w-full">
                    {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                    Generate Tailored Resume
                  </Button>
                  {aiError && (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{aiError}</AlertDescription>
                    </Alert>
                  )}
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
        <div ref={resumePreviewRef}>
          <SelectedTemplateComponent data={resumeData} />
        </div>
      </div>
    </div>
  );
}
