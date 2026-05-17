import { Resume, ResumeAction } from './types';

export const initialResume: Resume = {
  id: '1',
  personalInfo: {
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    summary: 'Dedicated professional with 5+ years of experience...',
  },
  experience: [
    {
      id: '1',
      jobTitle: 'Senior Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      startDate: '2022-01',
      endDate: '',
      current: true,
      description: 'Led development of new features...',
    },
  ],
  education: [
    {
      id: '1',
      school: 'University of California',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      graduationDate: '2018-05',
      description: 'GPA: 3.8',
    },
  ],
  skills: [
    { id: '1', name: 'React', level: 'expert' },
    { id: '2', name: 'TypeScript', level: 'advanced' },
    { id: '3', name: 'Node.js', level: 'advanced' },
  ],
  projects: [
    {
      id: '1',
      title: 'Resume Builder',
      description: 'Full-stack application for creating resumes',
      technologies: 'React, Next.js, TypeScript',
      link: 'https://example.com',
    },
  ],
  template: 'modern',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export function resumeReducer(state: Resume, action: ResumeAction): Resume {
  switch (action.type) {
    case 'SET_RESUME':
      return action.payload;

    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
        updatedAt: new Date().toISOString(),
      };

    case 'ADD_EXPERIENCE':
      return {
        ...state,
        experience: [...state.experience, action.payload],
        updatedAt: new Date().toISOString(),
      };

    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.map((exp) =>
          exp.id === action.payload.id ? { ...exp, ...action.payload } : exp
        ),
        updatedAt: new Date().toISOString(),
      };

    case 'DELETE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.filter((exp) => exp.id !== action.payload),
        updatedAt: new Date().toISOString(),
      };

    case 'ADD_EDUCATION':
      return {
        ...state,
        education: [...state.education, action.payload],
        updatedAt: new Date().toISOString(),
      };

    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map((edu) =>
          edu.id === action.payload.id ? { ...edu, ...action.payload } : edu
        ),
        updatedAt: new Date().toISOString(),
      };

    case 'DELETE_EDUCATION':
      return {
        ...state,
        education: state.education.filter((edu) => edu.id !== action.payload),
        updatedAt: new Date().toISOString(),
      };

    case 'ADD_SKILL':
      return {
        ...state,
        skills: [...state.skills, action.payload],
        updatedAt: new Date().toISOString(),
      };

    case 'UPDATE_SKILL':
      return {
        ...state,
        skills: state.skills.map((skill) =>
          skill.id === action.payload.id ? { ...skill, ...action.payload } : skill
        ),
        updatedAt: new Date().toISOString(),
      };

    case 'DELETE_SKILL':
      return {
        ...state,
        skills: state.skills.filter((skill) => skill.id !== action.payload),
        updatedAt: new Date().toISOString(),
      };

    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload],
        updatedAt: new Date().toISOString(),
      };

    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((proj) =>
          proj.id === action.payload.id ? { ...proj, ...action.payload } : proj
        ),
        updatedAt: new Date().toISOString(),
      };

    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter((proj) => proj.id !== action.payload),
        updatedAt: new Date().toISOString(),
      };

    case 'SET_TEMPLATE':
      return {
        ...state,
        template: action.payload,
        updatedAt: new Date().toISOString(),
      };

    case 'RESET':
      return initialResume;

    default:
      return state;
  }
}
