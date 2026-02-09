import type { CvData } from '@/lib/types';
import { Mail, Phone, Linkedin, Globe, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface TemplateProps {
  data: Partial<CvData>;
}

export function ModernTemplate({ data }: TemplateProps) {
  const { personalInfo, profile, experience, education, skills, languages, projects } = data;
  const nameInitial = personalInfo?.name ? personalInfo.name.charAt(0) : 'U';

  return (
    <div className="w-full h-full flex font-sans text-sm bg-white">
      {/* Left Column (Sidebar) */}
      <aside className="w-1/3 bg-gray-800 text-white p-6 flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
            <Avatar className="w-24 h-24 mb-4 border-4 border-gray-700">
                {personalInfo?.avatar && <AvatarImage src={personalInfo.avatar} alt={personalInfo.name} />}
                <AvatarFallback className="text-3xl bg-gray-600">{nameInitial}</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold">{personalInfo?.name}</h1>
        </div>
        
        <Separator className="bg-gray-600" />
        
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-primary-foreground/80 uppercase tracking-wider">Contact</h3>
          <ul className="space-y-2 text-xs">
            {personalInfo?.email && <li className="flex items-center gap-2"><Mail size={14} />{personalInfo.email}</li>}
            {personalInfo?.phone && <li className="flex items-center gap-2"><Phone size={14} />{personalInfo.phone}</li>}
            {personalInfo?.address && <li className="flex items-center gap-2"><MapPin size={14} />{personalInfo.address}</li>}
            {personalInfo?.linkedin && <li className="flex items-center gap-2"><Linkedin size={14} />{personalInfo.linkedin}</li>}
            {personalInfo?.website && <li className="flex items-center gap-2"><Globe size={14} />{personalInfo.website}</li>}
          </ul>
        </div>

        {skills && skills.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-primary-foreground/80 uppercase tracking-wider">Skills</h3>
            <ul className="flex flex-wrap gap-2 text-xs">
              {skills.map((skill, i) => <li key={i} className="bg-gray-700 px-2 py-1 rounded">{skill}</li>)}
            </ul>
          </div>
        )}

        {languages && languages.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-primary-foreground/80 uppercase tracking-wider">Languages</h3>
            <ul className="space-y-1 text-xs">
              {languages.map((lang, i) => <li key={i}>{lang}</li>)}
            </ul>
          </div>
        )}
      </aside>

      {/* Right Column (Main Content) */}
      <main className="w-2/3 p-6 overflow-y-auto">
        {profile && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-3 uppercase tracking-wider">Profile</h2>
            <p className="text-gray-600 text-xs leading-relaxed">{profile}</p>
          </section>
        )}

        {experience && experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-3 uppercase tracking-wider">Experience</h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="text-xs">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-sm text-gray-700">{exp.title}</h3>
                    <p className="text-gray-500">{exp.startDate} - {exp.endDate}</p>
                  </div>
                  <p className="text-gray-600 font-medium">{exp.company}</p>
                  <p className="text-gray-600 whitespace-pre-line mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {education && education.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-3 uppercase tracking-wider">Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="flex justify-between items-baseline">
                     <h3 className="font-semibold text-sm text-gray-700">{edu.institution}</h3>
                    <p className="text-gray-500">{edu.startDate} - {edu.endDate}</p>
                  </div>
                  <p className="text-gray-600 font-medium">{edu.degree}</p>
                  <p className="text-gray-600">{edu.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
