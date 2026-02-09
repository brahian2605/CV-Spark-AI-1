'use client';

import { useState } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { Sparkles, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateProfessionalProfile } from '@/lib/actions';

interface AiProfileGeneratorProps {
  form: UseFormReturn<any>;
}

export function AiProfileGenerator({ form }: AiProfileGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [desiredJob, setDesiredJob] = useState('');

  const { toast } = useToast();
  const watchedExperience = useWatch({ control: form.control, name: 'experience' });
  const watchedSkills = useWatch({ control: form.control, name: 'skills' });

  const handleOpen = () => {
    const experienceText = watchedExperience
      .map((exp: any) => `${exp.title} at ${exp.company}: ${exp.description}`)
      .join('\n');
    setExperience(experienceText);

    const skillsText = watchedSkills.map((skill: any) => skill.value).join(', ');
    setSkills(skillsText);

    setIsOpen(true);
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const result = await generateProfessionalProfile({
        experience,
        skills,
        desiredJob,
      });
      if (result.success && result.data) {
        form.setValue('profile', result.data.profile, { shouldValidate: true });
        toast({ title: 'Success', description: 'Professional profile generated!' });
        setIsOpen(false);
      } else {
        throw new Error(result.error || 'An unknown error occurred');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate profile. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={handleOpen}>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Professional Profile</DialogTitle>
          <DialogDescription>
            Provide some details and let our AI craft a compelling summary for you.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="desired-job">Desired Job / Role</Label>
            <Textarea id="desired-job" value={desiredJob} onChange={(e) => setDesiredJob(e.target.value)} placeholder="e.g., Senior Frontend Developer" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="experience-summary">Professional Experience</Label>
            <Textarea id="experience-summary" value={experience} onChange={(e) => setExperience(e.target.value)} rows={5} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="skills-list">Skills</Label>
            <Textarea id="skills-list" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="e.g., React, Node.js, Project Management"/>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleGenerate} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
