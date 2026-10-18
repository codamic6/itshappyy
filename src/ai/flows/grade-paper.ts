
'use server';
/**
 * @fileOverview AI flow for grading academic papers from images.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GradePaperInputSchema = z.object({
  photoDataUri: z.string().describe("A photo of the exam paper as a data URI."),
  markingScheme: z.string().describe("The marking scheme or instructions for grading."),
});

const GradePaperOutputSchema = z.object({
  score: z.number().describe("The score awarded to the student."),
  totalMarks: z.number().describe("The total possible marks."),
  feedback: z.string().describe("General feedback on the student's performance."),
  corrections: z.array(z.object({
    question: z.string(),
    issue: z.string(),
    suggestion: z.string(),
  })).describe("Specific errors found and suggestions for improvement."),
});

export async function gradePaper(input: z.infer<typeof GradePaperInputSchema>) {
  return gradePaperFlow(input);
}

const gradePaperPrompt = ai.definePrompt({
  name: 'gradePaperPrompt',
  input: { schema: GradePaperInputSchema },
  output: { schema: GradePaperOutputSchema },
  prompt: `You are an expert academic examiner. 
Your task is to grade the provided exam paper based on the marking scheme instructions.

Follow these rules:
1. Be fair and accurate in scoring.
2. Identify specific mistakes in the handwriting or text of the paper.
3. Provide constructive feedback for the student.

Marking Scheme / Instructions:
{{{markingScheme}}}

Paper Photo: {{media url=photoDataUri}}`,
});

const gradePaperFlow = ai.defineFlow(
  {
    name: 'gradePaperFlow',
    inputSchema: GradePaperInputSchema,
    outputSchema: GradePaperOutputSchema,
  },
  async (input) => {
    const { output } = await gradePaperPrompt(input);
    if (!output) throw new Error("AI failed to generate a response.");
    return output;
  }
);
