'use client';

import { useState } from 'react';
import { generateResumeFromJD } from '@/app/resume-builder/actions';
import { useToast } from '@/hooks/use-toast';
import type { ResumeData } from '../types';

export function useAIGeneration(
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>
) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateResume = async (jobDescription: string, pastedResume: string) => {
    setIsGenerating(true);
    setAiError(null);
    
    // This is a temporary solution to get the current state of resumeData
    // A better solution might involve passing it as an argument if the hook structure allows
    const currentResume = (await new Promise<ResumeData>(resolve => {
        setResumeData(prev => {
            resolve(prev);
            return prev;
        });
    }));

    const result = await generateResumeFromJD(jobDescription, currentResume, pastedResume);
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

  return { handleGenerateResume, isGenerating, aiError };
}
