'use client';

import type { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { GripVertical } from 'lucide-react';

interface SortableSectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export function SortableSection({ id, title, children }: SortableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 'auto',
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <AccordionItem value={id} className="bg-background">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <span {...attributes} {...listeners} className="cursor-grab p-1">
                <GripVertical className="h-5 w-5 text-muted-foreground" />
            </span>
            <span>{title}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-4 p-4">
          {children}
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}
