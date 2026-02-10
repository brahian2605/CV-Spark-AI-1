'use client';

import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AiProfileGenerator } from './AiProfileGenerator';

interface CvFormProps {
  form: UseFormReturn<any>;
}

export function CvForm({ form }: CvFormProps) {
  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({
    control: form.control,
    name: "experience",
  });
  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({
    control: form.control,
    name: "education",
  });
    const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control: form.control,
    name: "skills",
  });
  const { fields: langFields, append: appendLang, remove: removeLang } = useFieldArray({
    control: form.control,
    name: "languages",
  });
  const { fields: projFields, append: appendProj, remove: removeProj } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})} className="p-4 md:p-6 space-y-6">
        <Tabs defaultValue="personal">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 lg:grid-cols-7 mb-4 h-auto flex-wrap">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="languages">Languages</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="space-y-4">
             <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CV Title</FormLabel>
                    <FormControl><Input placeholder="e.g. Software Engineer CV" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField name="personalInfo.name" control={form.control} render={({ field }) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} placeholder="John Doe" /></FormControl><FormMessage /></FormItem>)} />
                <FormField name="personalInfo.email" control={form.control} render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} type="email" placeholder="john.doe@email.com" /></FormControl><FormMessage /></FormItem>)} />
                <FormField name="personalInfo.phone" control={form.control} render={({ field }) => (<FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} placeholder="+1 234 567 890" /></FormControl><FormMessage /></FormItem>)} />
                <FormField name="personalInfo.address" control={form.control} render={({ field }) => (<FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} placeholder="City, Country" /></FormControl><FormMessage /></FormItem>)} />
                <FormField name="personalInfo.linkedin" control={form.control} render={({ field }) => (<FormItem><FormLabel>LinkedIn</FormLabel><FormControl><Input {...field} placeholder="linkedin.com/in/..." /></FormControl><FormMessage /></FormItem>)} />
                <FormField name="personalInfo.website" control={form.control} render={({ field }) => (<FormItem><FormLabel>Website/Portfolio</FormLabel><FormControl><Input {...field} placeholder="your-portfolio.com" /></FormControl><FormMessage /></FormItem>)} />
                <FormField
                    control={form.control}
                    name="personalInfo.avatar"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                        <FormLabel>Avatar URL</FormLabel>
                        <FormControl><Input {...field} placeholder="https://example.com/your-photo.jpg" /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Professional Profile</CardTitle>
                 <AiProfileGenerator form={form} />
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="profile"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea {...field} rows={8} placeholder="A brief summary of your professional background..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="experience" className="space-y-4">
            {expFields.map((field, index) => (
              <Card key={field.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Experience #{index + 1}</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => removeExp(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField name={`experience.${index}.title`} render={({ field }) => (<FormItem><FormLabel>Job Title</FormLabel><FormControl><Input {...field} placeholder="Software Engineer" /></FormControl></FormItem>)} />
                    <FormField name={`experience.${index}.company`} render={({ field }) => (<FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} placeholder="Tech Corp" /></FormControl></FormItem>)} />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField name={`experience.${index}.startDate`} render={({ field }) => (<FormItem><FormLabel>Start Date</FormLabel><FormControl><Input {...field} type="date" /></FormControl></FormItem>)} />
                        <FormField name={`experience.${index}.endDate`} render={({ field }) => (<FormItem><FormLabel>End Date</FormLabel><FormControl><Input {...field} type="date" /></FormControl></FormItem>)} />
                    </div>
                    <FormField name={`experience.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} placeholder="Your responsibilities and achievements..." /></FormControl></FormItem>)} />
                </CardContent>
              </Card>
            ))}
            <Button type="button" variant="outline" onClick={() => appendExp({ id: `exp-${Date.now()}`, title: '', company: '', location: '', startDate: '', endDate: '', description: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Experience</Button>
          </TabsContent>
          
           <TabsContent value="education" className="space-y-4">
            {eduFields.map((field, index) => (
              <Card key={field.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Education #{index + 1}</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => removeEdu(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField name={`education.${index}.institution`} render={({ field }) => (<FormItem><FormLabel>Institution</FormLabel><FormControl><Input {...field} placeholder="State University" /></FormControl></FormItem>)} />
                    <FormField name={`education.${index}.degree`} render={({ field }) => (<FormItem><FormLabel>Degree</FormLabel><FormControl><Input {...field} placeholder="B.S. in Computer Science" /></FormControl></FormItem>)} />
                     <div className="grid grid-cols-2 gap-4">
                        <FormField name={`education.${index}.startDate`} render={({ field }) => (<FormItem><FormLabel>Start Date</FormLabel><FormControl><Input {...field} type="date" /></FormControl></FormItem>)} />
                        <FormField name={`education.${index}.endDate`} render={({ field }) => (<FormItem><FormLabel>End Date</FormLabel><FormControl><Input {...field} type="date" /></FormControl></FormItem>)} />
                    </div>
                    <FormField name={`education.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} placeholder="Awards, societies, relevant coursework..." /></FormControl></FormItem>)} />
                </CardContent>
              </Card>
            ))}
            <Button type="button" variant="outline" onClick={() => appendEdu({ id: `edu-${Date.now()}`, institution: '', degree: '', location: '', startDate: '', endDate: '', description: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Education</Button>
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            {skillFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <FormField name={`skills.${index}.value`} render={({ field }) => (<FormItem className="flex-1"><FormControl><Input {...field} placeholder="e.g. JavaScript" /></FormControl></FormItem>)} />
                <Button variant="ghost" size="icon" onClick={() => removeSkill(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => appendSkill({ id: `skill-${Date.now()}`, value: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Skill</Button>
          </TabsContent>

          <TabsContent value="languages" className="space-y-4">
            {langFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <FormField name={`languages.${index}.value`} render={({ field }) => (<FormItem className="flex-1"><FormControl><Input {...field} placeholder="e.g. English (Native)" /></FormControl></FormItem>)} />
                <Button variant="ghost" size="icon" onClick={() => removeLang(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => appendLang({ id: `lang-${Date.now()}`, value: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Language</Button>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            {projFields.map((field, index) => (
              <Card key={field.id}>
                 <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Project #{index + 1}</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => removeProj(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField name={`projects.${index}.name`} render={({ field }) => (<FormItem><FormLabel>Project Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                  <FormField name={`projects.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl></FormItem>)} />
                  <FormField name={`projects.${index}.url`} render={({ field }) => (<FormItem><FormLabel>URL</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                </CardContent>
              </Card>
            ))}
            <Button type="button" variant="outline" onClick={() => appendProj({ id: `proj-${Date.now()}`, name: '', description: '', url: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Project</Button>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
}
