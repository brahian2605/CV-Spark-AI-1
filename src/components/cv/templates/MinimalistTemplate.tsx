import type { CvData } from '@/lib/types';

interface TemplateProps {
  data: Partial<CvData>;
}

export function MinimalistTemplate({ data }: TemplateProps) {
  const { personalInfo, profile, experience, education, skills, languages } = data;

  const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-8">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">{title}</h2>
      {children}
    </section>
  );

  return (
    <div className="w-full h-full p-10 font-sans bg-white text-gray-800">
      <header className="mb-10">
        <h1 className="text-4xl font-light tracking-tight">{personalInfo?.name}</h1>
        <p className="text-sm text-gray-500 mt-2">
            {personalInfo?.email}
            {personalInfo?.phone && ` · ${personalInfo.phone}`}
            {personalInfo?.website && ` · ${personalInfo.website}`}
        </p>
      </header>
      
      {profile && (
        <Section title="Profile">
          <p className="text-sm text-gray-700 leading-relaxed">{profile}</p>
        </Section>
      )}

      {experience && experience.length > 0 && (
        <Section title="Experience">
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="grid grid-cols-[100px_1fr] gap-4 text-sm">
                <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                <div>
                  <h3 className="font-semibold">{exp.title}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="text-gray-600 whitespace-pre-line mt-2 text-xs leading-normal">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}
      
      {education && education.length > 0 && (
        <Section title="Education">
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="grid grid-cols-[100px_1fr] gap-4 text-sm">
                <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                <div>
                  <h3 className="font-semibold">{edu.institution}</h3>
                  <p className="text-gray-600">{edu.degree}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      <div className="grid grid-cols-2 gap-10">
        {skills && skills.length > 0 && (
          <Section title="Skills">
             <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-700">
              {skills.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>
          </Section>
        )}

        {languages && languages.length > 0 && (
          <Section title="Languages">
            <ul className="text-sm text-gray-700 space-y-1">
              {languages.map((lang, i) => <li key={i}>{lang}</li>)}
            </ul>
          </Section>
        )}
      </div>
    </div>
  );
}
