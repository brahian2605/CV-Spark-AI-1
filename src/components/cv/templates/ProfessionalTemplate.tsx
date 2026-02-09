import type { CvData } from '@/lib/types';
import { Mail, Phone, Linkedin, Globe, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface TemplateProps {
  data: Partial<CvData>;
}

export function ProfessionalTemplate({ data }: TemplateProps) {
  const { personalInfo, profile, experience, education, skills, languages } = data;

  return (
    <div className="w-full h-full p-8 font-serif bg-white text-gray-800">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold tracking-wider">{personalInfo?.name}</h1>
        <ul className="flex justify-center items-center gap-x-4 gap-y-1 mt-2 text-xs text-gray-600 flex-wrap">
          {personalInfo?.email && <li className="flex items-center gap-1"><Mail size={12} />{personalInfo.email}</li>}
          {personalInfo?.phone && <li className="flex items-center gap-1"><Phone size={12} />{personalInfo.phone}</li>}
          {personalInfo?.address && <li className="flex items-center gap-1"><MapPin size={12} />{personalInfo.address}</li>}
        </ul>
        <ul className="flex justify-center items-center gap-x-4 gap-y-1 mt-1 text-xs text-blue-600 flex-wrap">
          {personalInfo?.linkedin && <li className="flex items-center gap-1"><Linkedin size={12} />{personalInfo.linkedin}</li>}
          {personalInfo?.website && <li className="flex items-center gap-1"><Globe size={12} />{personalInfo.website}</li>}
        </ul>
      </header>

      <Separator className="my-6 bg-gray-300"/>

      {profile && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-2 border-b border-gray-300 pb-1">Profile</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{profile}</p>
        </section>
      )}

      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-3 border-b border-gray-300 pb-1">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="text-sm">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold">{exp.title}</h3>
                  <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                </div>
                <p className="italic text-gray-600">{exp.company}</p>
                <div className="text-gray-700 whitespace-pre-line mt-1 text-xs leading-normal">{exp.description}</div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-3 border-b border-gray-300 pb-1">Education</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="text-sm">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{edu.institution}</h3>
                  <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                </div>
                <p className="italic text-gray-600">{edu.degree}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-6">
        {skills && skills.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3 border-b border-gray-300 pb-1">Skills</h2>
            <ul className="text-sm text-gray-700 columns-2 gap-x-4">
              {skills.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>
          </section>
        )}

        {languages && languages.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3 border-b border-gray-300 pb-1">Languages</h2>
            <ul className="text-sm text-gray-700 space-y-1">
              {languages.map((lang, i) => <li key={i}>{lang}</li>)}
            </ul>
          </section>
        )}
      </div>

    </div>
  );
}
