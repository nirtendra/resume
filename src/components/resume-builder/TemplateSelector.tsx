'use client';

import { Palette } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { SortableSection } from '../SortableSection';
import { templates, type TemplateKey } from './types';

interface TemplateSelectorProps {
  selectedTemplate: TemplateKey;
  setSelectedTemplate: (template: TemplateKey) => void;
}

export function TemplateSelector({ selectedTemplate, setSelectedTemplate }: TemplateSelectorProps) {
  return (
    <SortableSection id="template" title="Template">
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
    </SortableSection>
  );
}
