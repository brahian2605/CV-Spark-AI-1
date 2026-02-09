export type PersonalInfo = {
  name: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  website: string;
  avatar: string;
};

export type Experience = {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  url: string;
};

export type CvData = {
  id: string;
  userId: string;
  title: string;
  personalInfo: PersonalInfo;
  profile: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  languages: string[];
  projects: Project[];
  template: 'modern' | 'professional' | 'minimalist';
  createdAt: Date;
  updatedAt: Date;
};

export type CvTemplate = 'modern' | 'professional' | 'minimalist';
