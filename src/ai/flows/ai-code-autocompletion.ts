'use server';
/**
 * @fileOverview An AI agent for providing real-time, predictive code completion suggestions.
 *
 * - aiCodeAutocompletion - A function that handles the AI code autocompletion process.
 * - AICodeAutocompletionInput - The input type for the aiCodeAutocompletion function.
 * - AICodeAutocompletionOutput - The return type for the aiCodeAutocompletion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const AICodeAutocompletionInputSchema = z.object({
  code: z.string().describe('The entire code content in the editor.'),
  language: z.string().describe('The programming language of the code (e.g., "typescript", "python", "javascript").'),
  cursorPosition: z.number().describe('The character index in the code string where the cursor is located, indicating where the completion should be inserted.'),
});
export type AICodeAutocompletionInput = z.infer<typeof AICodeAutocompletionInputSchema>;

// Output Schema
const AICodeAutocompletionOutputSchema = z.object({
  completion: z.string().describe('The suggested code completion to insert at the cursor position.'),
});
export type AICodeAutocompletionOutput = z.infer<typeof AICodeAutocompletionOutputSchema>;

// Prompt definition
const autocompletionPrompt = ai.definePrompt({
  name: 'autocompletionPrompt',
  input: {
    schema: AICodeAutocompletionInputSchema
  }, // Use the original input schema for type inference, but the prompt will use derived fields
  output: {
    schema: AICodeAutocompletionOutputSchema
  },
  prompt: `You are an AI code completion assistant. Given the following code context and the indicated cursor position, provide a concise and accurate code completion suggestion. Only provide the completion text, without any additional explanation, comments, or surrounding code.

Language: {{{language}}}

Current code before cursor:
\`\`\`{{{language}}}
{{{codeBeforeCursor}}}
\`\`\`

Current code after cursor:
\`\`\`{{{language}}}
{{{codeAfterCursor}}}
\`\`\`

Based on the context, provide the best code completion for the cursor position.`
});

// Flow definition
const aiCodeAutocompletionFlow = ai.defineFlow(
  {
    name: 'aiCodeAutocompletionFlow',
    inputSchema: AICodeAutocompletionInputSchema,
    outputSchema: AICodeAutocompletionOutputSchema,
  },
  async (input) => {
    const codeBeforeCursor = input.code.substring(0, input.cursorPosition);
    const codeAfterCursor = input.code.substring(input.cursorPosition);

    const {
      output
    } = await autocompletionPrompt({
      ...input, // Pass original input fields
      codeBeforeCursor, // Add derived fields for the prompt
      codeAfterCursor,
    });
    return output!;
  }
);

// Wrapper function
export async function aiCodeAutocompletion(input: AICodeAutocompletionInput): Promise<AICodeAutocompletionOutput> {
  return aiCodeAutocompletionFlow(input);
}