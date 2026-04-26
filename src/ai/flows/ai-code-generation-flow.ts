
'use server';
/**
 * @fileOverview A Genkit flow for generating code snippets or entire functions based on natural language prompts.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

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
  prompt: `You are an expert AI code generator. 

Your task is to generate clean, high-quality, and efficient code based on this description:
{{{description}}}

If the request is not related to coding, technical explanation, or logic, please respond with: "Please describe a coding problem or task."

Rules:
1. Provide ONLY the code or concise technical answer.
2. Do not include verbose introductory text.
3. If generating code, ensure it is syntactically correct.

Output:`,
});

const aiCodeGenerationFlow = ai.defineFlow(
  {
    name: 'aiCodeGenerationFlow',
    inputSchema: AICodeGenerationInputSchema,
    outputSchema: AICodeGenerationOutputSchema,
  },
  async (input) => {
    try {
      if (!process.env.GOOGLE_GENAI_API_KEY) {
        throw new Error("GOOGLE_GENAI_API_KEY is not configured in the environment.");
      }
      
      const { output } = await codeGenPrompt(input);
      if (!output) {
        return { code: "// AI: Failed to generate code. Please try a more specific prompt." };
      }
      return output;
    } catch (error: any) {
      console.error("Genkit Flow Error:", error);
      throw new Error(error.message || "Failed to connect to AI service. Check your API configuration.");
    }
  }
);

export async function aiCodeGeneration(input: AICodeGenerationInput): Promise<AICodeGenerationOutput> {
  return aiCodeGenerationFlow(input);
}
