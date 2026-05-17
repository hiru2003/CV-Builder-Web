export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  graduationDate: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string;
  link: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Resume {
  id: string;
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  template: 'modern' | 'minimalist' | 'classic' | 'professional';
  createdAt: string;
  updatedAt: string;
}

export interface ResumeAction {
  type:
    | 'SET_RESUME'
    | 'UPDATE_PERSONAL_INFO'
    | 'ADD_EXPERIENCE'
    | 'UPDATE_EXPERIENCE'
    | 'DELETE_EXPERIENCE'
    | 'ADD_EDUCATION'
    | 'UPDATE_EDUCATION'
    | 'DELETE_EDUCATION'
    | 'ADD_SKILL'
    | 'UPDATE_SKILL'
    | 'DELETE_SKILL'
    | 'ADD_PROJECT'
    | 'UPDATE_PROJECT'
    | 'DELETE_PROJECT'
    | 'SET_TEMPLATE'
    | 'RESET';
  payload?: any;
}
