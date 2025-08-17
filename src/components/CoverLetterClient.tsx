'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Bot, Clipboard, Loader2, FileText } from 'lucide-react';
import type { User } from 'firebase/auth';

import { getCoverLetter } from '@/app/cover-letter/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  data: null,
  error: null,
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Bot className="mr-2 h-4 w-4" />
          Generate Cover Letter
        </>
      )}
    </Button>
  );
}

export default function CoverLetterClient({ user }: { user: User }) {
  const [state, formAction] = useActionState(getCoverLetter, initialState);
  const { toast } = useToast();

  const handleCopy = () => {
    if (state.data?.coverLetter) {
      navigator.clipboard.writeText(state.data.coverLetter);
      toast({
        title: 'Copied to clipboard!',
        description: 'You can now paste the cover letter into your document.',
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-headline font-bold">AI Cover Letter Generator</h1>
        <p className="text-muted-foreground mt-2">
          Paste your resume and a job description to generate a tailored cover letter in seconds.
        </p>
      </div>

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="userName" value={user.displayName || user.email || 'Applicant'} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="resume" className="font-medium">Your Resume</label>
            <Textarea
              id="resume"
              name="resume"
              placeholder="Paste your full resume content here..."
              rows={15}
              className="text-base"
              required
            />
          </div>
          <div className="space-y-2">
             <label htmlFor="jobDescription" className="font-medium">Job Description</label>
            <Textarea
              id="jobDescription"
              name="jobDescription"
              placeholder="Paste the full job description here..."
              rows={15}
              className="text-base"
              required
            />
          </div>
        </div>
        <SubmitButton />
      </form>

      {state.error && (
        <Alert variant="destructive" className="mt-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state.data && (
        <Card className="mt-8">
          <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                    <FileText className="text-primary" />
                    <span>Your Generated Cover Letter</span>
                </CardTitle>
                <Button variant="outline" size="icon" onClick={handleCopy}>
                    <Clipboard className="h-4 w-4" />
                </Button>
            </div>
            <CardDescription>Review the generated letter below. You can copy it to your clipboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none p-4 border rounded-md bg-muted/50 whitespace-pre-wrap font-body text-base">
              {state.data.coverLetter}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
