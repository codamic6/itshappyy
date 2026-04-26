'use server';
/**
 * @fileOverview A Genkit flow for generating code snippets or entire functions based on natural language prompts.
 *
 * - aiCodeGeneration - A function that handles the AI code generation process.
 * - AICodeGenerationInput - The input type for the aiCodeGeneration function.
 * - AICodeGenerationOutput - The return type for the aiCodeGeneration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AICodeGenerationInputSchema = z.object({
  description: z
    .string()
    .describe('A natural language description of the code to generate.'),
});
export type AICodeGenerationInput = z.infer<typeof AICodeGenerationInputSchema>;

const AICodeGenerationOutputSchema = z.object({
  code: z.string().describe('The generated code snippet or function.'),
});
export type AICodeGenerationOutput = z.infer<typeof AICodeGenerationOutputSchema>;

export async function aiCodeGeneration(
  input: AICodeGenerationInput
): Promise<AICodeGenerationOutput> {
  return aiCodeGenerationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCodeGenerationPrompt',
  input: {schema: AICodeGenerationInputSchema},
  output: {schema: AICodeGenerationOutputSchema},
  prompt: `You are an expert code generation assistant. Your task is to generate clean, efficient, and well-structured code based on the user's description.

Generate the code that matches the following description:

Description: {{{description}}}

Only provide the code, do not include any additional explanations or text outside of the code block. If the code is for a specific language, use a fenced code block with the language specified.`,
});

const aiCodeGenerationFlow = ai.defineFlow(
  {
    name: 'aiCodeGenerationFlow',
    inputSchema: AICodeGenerationInputSchema,
    outputSchema: AICodeGenerationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
