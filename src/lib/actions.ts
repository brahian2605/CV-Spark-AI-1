'use server';

import {
  generateProfessionalProfile as genProfile,
  type GenerateProfessionalProfileInput,
} from '@/ai/flows/generate-professional-profile';

export async function generateProfessionalProfile(input: GenerateProfessionalProfileInput) {
  try {
    const result = await genProfile(input);
    return { success: true, data: result };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error generating professional profile:', errorMessage);
    return { success: false, error: 'Failed to generate profile.' };
  }
}
