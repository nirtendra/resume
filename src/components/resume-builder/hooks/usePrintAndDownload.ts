'use client';

import { useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { createWordDocument } from '@/app/resume-builder/actions';
import { useToast } from '@/hooks/use-toast';
import type { ResumeData } from '../types';

export function usePrintAndDownload(
  resumePreviewRef: React.RefObject<HTMLDivElement>,
  resumeData: ResumeData
) {
  const [isDownloadingWord, setIsDownloadingWord] = useState(false);
  const { toast } = useToast();

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

  return { handlePrint, handleWordDownload, isDownloadingWord };
}
