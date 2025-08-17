'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Download, ChevronDown, FileText, FileCode, Loader2 } from 'lucide-react';

interface ResumeEditorHeaderProps {
  handlePrint: () => void;
  handleWordDownload: () => void;
  isDownloadingWord: boolean;
}

export function ResumeEditorHeader({ handlePrint, handleWordDownload, isDownloadingWord }: ResumeEditorHeaderProps) {
  return (
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
  );
}
