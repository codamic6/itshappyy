
'use server';
/**
 * @fileOverview A Genkit flow for generating code snippets or entire functions based on natural language prompts.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AICodeGenerationInputSchema = z.object({
  description: z.string().describe('A natural language description of the code to generate.'),
});
export type AICodeGenerationInput = z.infer<typeof AICodeGenerationInputSchema>;

const AICodeGenerationOutputSchema = z.object({
  code: z.string().describe('The generated code snippet or function.'),
});
export type AICodeGenerationOutput = z.infer<typeof AICodeGenerationOutputSchema>;

const codeGenPrompt = ai.definePrompt({
  name: 'aiCodeGenerationPrompt',
  input: { schema: AICodeGenerationInputSchema },
  output: { schema: AICodeGenerationOutputSchema },
  prompt: `You are an expert code generation assistant. Your task is to generate clean, efficient, and well-structured code based on the user's description.

If the description is not related to coding, return a polite message asking for a coding-related task.

Description: {{{description}}}

Output ONLY the raw code or a concise explanation if it's a question. No markdown blocks if possible, just the content.`,
});

const aiCodeGenerationFlow = ai.defineFlow(
  {
    name: 'aiCodeGenerationFlow',
    inputSchema: AICodeGenerationInputSchema,
    outputSchema: AICodeGenerationOutputSchema,
  },
  async (input) => {
    const { output } = await codeGenPrompt(input);
    return output!;
  }
);

export async function aiCodeGeneration(input: AICodeGenerationInput): Promise<AICodeGenerationOutput> {
  return aiCodeGenerationFlow(input);
}
