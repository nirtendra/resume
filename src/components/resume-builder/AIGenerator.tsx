'use client';

import { useState } from 'react';
import { Bot, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SortableSection } from '../SortableSection';
import type { ResumeData } from './types';

interface AIGeneratorProps {
  isGenerating: boolean;
  aiError: string | null;
  handleGenerate: (jobDescription: string, pastedResume: string) => Promise<void>;
  currentResume: ResumeData;
}

export function AIGenerator({ isGenerating, aiError, handleGenerate }: AIGeneratorProps) {
  const [jobDescription, setJobDescription] = useState('');
  const [pastedResume, setPastedResume] = useState('');

  const onGenerateClick = () => {
    handleGenerate(jobDescription, pastedResume);
  };

  return (
    <SortableSection id="ai-generator" title="AI Resume Generator">
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
              disabled={isGenerating}
            />
          </div>
          <div>
            <Label htmlFor="pasted-resume">Paste Your Existing Resume (Optional)</Label>
            <Textarea 
              id="pasted-resume"
              placeholder="Paste your current resume here. The AI will use it as a starting point to refine and tailor."
              value={pastedResume}
              onChange={(e) => setPastedResume(e.target.value)}
              rows={12}
              disabled={isGenerating}
            />
          </div>
          <Button onClick={onGenerateClick} disabled={isGenerating || !jobDescription} className="w-full">
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
    </SortableSection>
  );
}
