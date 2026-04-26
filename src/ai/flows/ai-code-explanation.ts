'use server';
/**
 * @fileOverview An AI agent that explains code snippets.
 *
 * - aiCodeExplanation - A function that handles the code explanation process.
 * - AICodeExplanationInput - The input type for the aiCodeExplanation function.
 * - AICodeExplanationOutput - The return type for the aiCodeExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AICodeExplanationInputSchema = z.object({
  code: z.string().describe('The code snippet to explain.'),
});
export type AICodeExplanationInput = z.infer<typeof AICodeExplanationInputSchema>;

const AICodeExplanationOutputSchema = z.object({
  explanation: z.string().describe('The AI-generated explanation of the code.'),
});
export type AICodeExplanationOutput = z.infer<typeof AICodeExplanationOutputSchema>;

export async function aiCodeExplanation(input: AICodeExplanationInput): Promise<AICodeExplanationOutput> {
  return aiCodeExplanationFlow(input);
}

const aiCodeExplanationPrompt = ai.definePrompt({
  name: 'aiCodeExplanationPrompt',
  input: {schema: AICodeExplanationInputSchema},
  output: {schema: AICodeExplanationOutputSchema},
  prompt: `You are an expert software engineer and a great explainer of code.

Your task is to explain the provided code snippet in a clear, concise, and easy-to-understand manner.
Focus on its functionality, purpose, and any key concepts or patterns used.

Code:
---
{{{code}}}
---

Explanation:`,
});

const aiCodeExplanationFlow = ai.defineFlow(
  {
    name: 'aiCodeExplanationFlow',
    inputSchema: AICodeExplanationInputSchema,
    outputSchema: AICodeExplanationOutputSchema,
  },
  async input => {
    const {output} = await aiCodeExplanationPrompt(input);
    return output!;
  }
);
