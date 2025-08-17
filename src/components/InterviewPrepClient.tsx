'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Bot, Lightbulb, Loader2, MessageSquareQuote } from 'lucide-react';

import { getInterviewPrep } from '@/app/interview-prep/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
          Analyzing...
        </>
      ) : (
        <>
          <Bot className="mr-2 h-4 w-4" />
          Generate Insights
        </>
      )}
    </Button>
  );
}

export default function InterviewPrepClient() {
  const [state, formAction] = useFormState(getInterviewPrep, initialState);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-headline font-bold">AI Interview Prep</h1>
        <p className="text-muted-foreground mt-2">
          Paste a job description below to get AI-powered interview questions and talking points.
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        <Textarea
          name="jobDescription"
          placeholder="Paste the full job description here..."
          rows={10}
          className="text-base"
          required
        />
        <SubmitButton />
      </form>

      {state.error && (
        <Alert variant="destructive" className="mt-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state.data && (
        <div className="mt-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquareQuote className="text-primary" />
                Potential Interview Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {state.data.questions.map((q, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{q}</AccordionTrigger>
                    <AccordionContent>
                      Consider preparing a response using the STAR method (Situation, Task, Action, Result) to structure your answer effectively.
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="text-primary" />
                Key Talking Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {state.data.talkingPoints.map((tp, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                      <Lightbulb className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-muted-foreground">{tp}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
