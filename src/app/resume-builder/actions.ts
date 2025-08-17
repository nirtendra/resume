'use server';

import htmlToDocx from 'html-to-docx';

export async function createWordDocument(htmlContent: string) {
  if (!htmlContent) {
    throw new Error('HTML content is missing.');
  }

  try {
    const fileBuffer = await htmlToDocx(htmlContent, undefined, {
      skipMediaErrors: true,
    });
    return fileBuffer.toString('base64');
  } catch (error) {
    console.error('Error generating DOCX:', error);
    throw new Error('Failed to generate Word document.');
  }
}
