'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Header } from '@/components/layout/Header';
import { CvForm } from '@/components/cv/CvForm';
import { CvPreview } from '@/components/cv/CvPreview';
import type { CvData, CvTemplate } from '@/lib/types';
import { cvs } from '@/lib/data'; // Using mock data for now
import { Button } from '@/components/ui/button';
import { Download, Save } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  personalInfo: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string(),
    address: z.string(),
    linkedin: z.string().url().optional().or(z.literal('')),
    website: z.string().url().optional().or(z.literal('')),
    avatar: z.string().url().optional().or(z.literal('')),
  }),
  profile: z.string(),
  experience: z.array(z.object({
    id: z.string(),
    title: z.string(),
    company: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    description: z.string(),
  })),
  education: z.array(z.object({
    id: z.string(),
    institution: z.string(),
    degree: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    description: z.string(),
  })),
  skills: z.array(z.object({ id: z.string(), value: z.string() })),
  languages: z.array(z.object({ id: z.string(), value: z.string() })),
  projects: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    url: z.string().url().optional().or(z.literal('')),
  })),
});

type FormValues = z.infer<typeof formSchema>;

const emptyCv: CvData = {
  id: 'new',
  userId: 'user1',
  title: 'Untitled CV',
  personalInfo: { name: '', email: '', phone: '', address: '', linkedin: '', website: '', avatar: '' },
  profile: '',
  experience: [],
  education: [],
  skills: [],
  languages: [],
  projects: [],
  template: 'modern',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function EditorPage({ params }: { params: { cvId: string } }) {
  const [template, setTemplate] = useState<CvTemplate>('modern');

  const existingCv = params.cvId === 'new' ? emptyCv : cvs.find((cv) => cv.id === params.cvId);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...existingCv,
      skills: existingCv?.skills.map((s, i) => ({ id: `skill-${i}`, value: s })) || [],
      languages: existingCv?.languages.map((l, i) => ({ id: `lang-${i}`, value: l })) || [],
    },
    mode: 'onBlur',
  });

  const cvData = form.watch();

  const handleTemplateChange = (newTemplate: CvTemplate) => {
    setTemplate(newTemplate);
  };
  
  const onSubmit = (values: FormValues) => {
    // Here you would save the data to Firebase
    console.log(values);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_45%] overflow-hidden">
        {/* Form Panel */}
        <div className="flex flex-col overflow-hidden">
           <div className="p-4 border-b flex items-center justify-between gap-4">
              <h1 className="text-xl font-bold font-headline truncate">Editing: {cvData.title}</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                    <Save className="mr-2 h-4 w-4" /> Save
                </Button>
                <Button>
                    <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
              </div>
           </div>
           <div className="flex-1 overflow-y-auto">
             <CvForm form={form as any} />
           </div>
        </div>

        {/* Preview Panel */}
        <div className="hidden md:flex flex-col bg-secondary overflow-y-auto">
          <CvPreview
            data={{ ...cvData, skills: cvData.skills.map(s => s.value), languages: cvData.languages.map(l => l.value), template }}
            onTemplateChange={handleTemplateChange}
          />
        </div>
      </div>
    </div>
  );
}
