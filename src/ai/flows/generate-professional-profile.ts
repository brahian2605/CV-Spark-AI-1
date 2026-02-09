'use server';

/**
 * @fileOverview An AI agent for generating professional profile sections for CVs.
 *
 * - generateProfessionalProfile - A function that generates a professional profile section.
 * - GenerateProfessionalProfileInput - The input type for the generateProfessionalProfile function.
 * - GenerateProfessionalProfileOutput - The return type for the generateProfessionalProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProfessionalProfileInputSchema = z.object({
  experience: z
    .string()
    .describe('Description of the users professional experience.'),
  skills: z.string().describe('A list of the users skills.'),
  desiredJob: z.string().describe('The type of job the user is applying for.'),
});
export type GenerateProfessionalProfileInput = z.infer<typeof GenerateProfessionalProfileInputSchema>;

const GenerateProfessionalProfileOutputSchema = z.object({
  profile: z.string().describe('A professional profile section for a CV.'),
});
export type GenerateProfessionalProfileOutput = z.infer<typeof GenerateProfessionalProfileOutputSchema>;

export async function generateProfessionalProfile(
  input: GenerateProfessionalProfileInput
): Promise<GenerateProfessionalProfileOutput> {
  return generateProfessionalProfileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProfessionalProfilePrompt',
  input: {schema: GenerateProfessionalProfileInputSchema},
  output: {schema: GenerateProfessionalProfileOutputSchema},
  prompt: `You are a professional CV writer. Use the users experience, skills, and desired job to write a professional profile section for their CV.

Experience: {{{experience}}}
Skills: {{{skills}}}
Desired job: {{{desiredJob}}}

Profile:`,
});

const generateProfessionalProfileFlow = ai.defineFlow(
  {
    name: 'generateProfessionalProfileFlow',
    inputSchema: GenerateProfessionalProfileInputSchema,
    outputSchema: GenerateProfessionalProfileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
