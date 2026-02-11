'use server';

/**
 * @fileOverview Un agente de IA para generar secciones de perfil profesional para CVs.
 *
 * - generateProfessionalProfile - Una función que genera una sección de perfil profesional.
 * - GenerateProfessionalProfileInput - El tipo de entrada para la función generateProfessionalProfile.
 * - GenerateProfessionalProfileOutput - El tipo de retorno para la función generateProfessionalProfile.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProfessionalProfileInputSchema = z.object({
  experience: z
    .string()
    .describe('Descripción de la experiencia profesional del usuario.'),
  skills: z.string().describe('Una lista de las habilidades del usuario.'),
  desiredJob: z.string().describe('El tipo de trabajo que el usuario está solicitando.'),
});
export type GenerateProfessionalProfileInput = z.infer<typeof GenerateProfessionalProfileInputSchema>;

const GenerateProfessionalProfileOutputSchema = z.object({
  profile: z.string().describe('Una sección de perfil profesional para un CV.'),
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
  prompt: `Eres un redactor profesional de CVs. Usa la experiencia, habilidades y el trabajo deseado del usuario para escribir una sección de perfil profesional para su CV.

Experiencia: {{{experience}}}
Habilidades: {{{skills}}}
Trabajo deseado: {{{desiredJob}}}

Perfil:`,
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
