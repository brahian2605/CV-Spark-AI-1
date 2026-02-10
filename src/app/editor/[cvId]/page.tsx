'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { doc, collection, serverTimestamp, setDoc, addDoc } from 'firebase/firestore';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { Header } from '@/components/layout/Header';
import { CvForm } from '@/components/cv/CvForm';
import { CvPreview } from '@/components/cv/CvPreview';
import type { CvData, CvTemplate } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Download, Save, Loader2 } from 'lucide-react';
import { useUser, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

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

export default function EditorPage({ params }: { params: { cvId: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const previewRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'unsaved' | 'saving'>('saved');

  const isNewCv = params.cvId === 'new';

  const cvDocRef = useMemoFirebase(() => {
    if (!user || isNewCv) return null;
    return doc(firestore, 'users', user.uid, 'cvs', params.cvId);
  }, [firestore, user, params.cvId, isNewCv]);
  
  const { data: existingCv, isLoading: isCvLoading } = useDoc<CvData>(cvDocRef);
  
  const [template, setTemplate] = useState<CvTemplate>('modern');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
  });

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (isCvLoading) return;
    let cvData;
    if (isNewCv) {
      cvData = {
        title: 'Untitled CV',
        personalInfo: { name: user?.displayName || '', email: user?.email || '', phone: '', address: '', linkedin: '', website: '', avatar: user?.photoURL || '' },
        profile: '',
        experience: [],
        education: [],
        skills: [],
        languages: [],
        projects: [],
      };
    } else if (existingCv) {
      cvData = {
        ...existingCv,
        skills: existingCv.skills.map((s, i) => ({ id: `skill-${i}`, value: s })),
        languages: existingCv.languages.map((l, i) => ({ id: `lang-${i}`, value: l })),
      };
      setTemplate(existingCv.template);
    }
    
    if (cvData) {
        form.reset(cvData);
    }
  }, [existingCv, isNewCv, form, user, isCvLoading]);


  const cvData = form.watch();

  const handleSave = useCallback(async (isAutosave = false) => {
    if (!user) {
      if (!isAutosave) {
        toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to save.' });
      }
      return;
    }

    if (saveStatus === 'saving') return;
    
    setSaveStatus('saving');
    
    const values = form.getValues();
    const dataToSave = {
        ...values,
        skills: values.skills.map(s => s.value),
        languages: values.languages.map(l => l.value),
        template: template,
        userId: user.uid,
        updatedAt: serverTimestamp(),
    };

    try {
      if (isNewCv) {
          const newDocRef = collection(firestore, 'users', user.uid, 'cvs');
          const docRef = await addDoc(newDocRef, { ...dataToSave, createdAt: serverTimestamp() });
          
          if (!isAutosave) {
            toast({ title: 'CV Saved!', description: 'Your new CV has been created.' });
          }
          router.replace(`/editor/${docRef.id}`);

      } else {
          const docRef = doc(firestore, 'users', user.uid, 'cvs', params.cvId);
          await setDoc(docRef, dataToSave, { merge: true });
          
          if (!isAutosave) {
            toast({ title: 'CV Updated!', description: 'Your changes have been saved.' });
          }
      }
      form.reset(values);
      setSaveStatus('saved');
    } catch (error) {
      console.error("Error saving CV:", error);
      setSaveStatus('unsaved');
      if (!isAutosave) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not save your CV. Please try again.' });
      }
    }
  }, [user, firestore, form, template, isNewCv, params.cvId, router, toast, saveStatus]);
  
  useEffect(() => {
    if (!form.formState.isDirty || isCvLoading) {
      return;
    }
    
    setSaveStatus('unsaved');
    const timer = setTimeout(() => {
      handleSave(true);
    }, 2000); 

    return () => clearTimeout(timer);
  }, [cvData, form.formState.isDirty, handleSave, isCvLoading]);


  const handleTemplateChange = (newTemplate: CvTemplate) => {
    setTemplate(newTemplate);
  };
  
  const handleDownloadPdf = () => {
    if (!previewRef.current) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Preview not available for download.',
        });
        return;
    }
    setIsDownloading(true);

    html2canvas(previewRef.current, {
      scale: 2,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      const cvTitle = form.getValues('title') || 'cv';
      pdf.save(`${cvTitle.replace(/ /g, '_')}.pdf`);
      setIsDownloading(false);
      toast({ title: 'Success!', description: 'Your CV has been downloaded.' });
    }).catch(err => {
      console.error("Error generating PDF", err);
      toast({
        variant: 'destructive',
        title: 'PDF Download Failed',
        description: 'An error occurred while generating the PDF. Please try again.',
      });
      setIsDownloading(false);
    });
  };

  if (isUserLoading || (!isNewCv && isCvLoading)) {
     return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!isNewCv && !existingCv && !isCvLoading) {
      return (
          <div className="flex h-screen items-center justify-center text-center">
              <div>
                <h1 className="text-2xl font-bold">CV not found</h1>
                <p className="text-muted-foreground">This CV may have been deleted or you may not have permission to view it.</p>
                <Button asChild className="mt-4"><Link href="/dashboard">Go to Dashboard</Link></Button>
              </div>
          </div>
      )
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_45%] overflow-hidden">
        {/* Form Panel */}
        <div className="flex flex-col overflow-hidden">
           <div className="p-4 border-b flex items-center justify-between gap-4">
              <h1 className="text-xl font-bold font-headline truncate">Editing: {cvData.title}</h1>
              <div className="flex items-center gap-2">
                <div className="text-sm text-muted-foreground w-32 text-right">
                  {saveStatus === 'saving' && <span className="flex items-center justify-end"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</span>}
                  {saveStatus === 'saved' && 'All changes saved'}
                  {saveStatus === 'unsaved' && 'Unsaved changes'}
                </div>
                <Button variant="outline" onClick={() => handleSave(false)} disabled={saveStatus !== 'unsaved' || isDownloading}>
                    <Save className="mr-2 h-4 w-4" /> 
                    Save Now
                </Button>
                <Button onClick={handleDownloadPdf} disabled={saveStatus === 'saving' || isDownloading}>
                    {isDownloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                    Download PDF
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
            ref={previewRef}
            data={{ ...cvData, skills: cvData.skills?.map(s => s.value), languages: cvData.languages?.map(l => l.value), template }}
            onTemplateChange={handleTemplateChange}
          />
        </div>
      </div>
    </div>
  );
}
