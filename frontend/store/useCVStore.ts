import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CVData, TemplateType, initialCVData } from '@/types/cv';

interface CVState {
  data: CVData;
  template: TemplateType;
  updatePersonal: (data: Partial<CVData['personal']>) => void;
  updateSummary: (summary: string) => void;
  setExperience: (experience: CVData['experience']) => void;
  setEducation: (education: CVData['education']) => void;
  setSkills: (skills: string[]) => void;
  setProjects: (projects: CVData['projects']) => void;
  setCertifications: (certifications: CVData['certifications']) => void;
  setLanguages: (languages: CVData['languages']) => void;
  setTemplate: (template: TemplateType) => void;
  reset: () => void;
}

export const useCVStore = create<CVState>()(
  persist(
    (set) => ({
      data: initialCVData,
      template: 'modern',
      updatePersonal: (personalData) =>
        set((state) => ({
          data: {
            ...state.data,
            personal: { ...state.data.personal, ...personalData },
          },
        })),
      updateSummary: (summary) =>
        set((state) => ({
          data: { ...state.data, summary },
        })),
      setExperience: (experience) =>
        set((state) => ({
          data: { ...state.data, experience },
        })),
      setEducation: (education) =>
        set((state) => ({
          data: { ...state.data, education },
        })),
      setSkills: (skills) =>
        set((state) => ({
          data: { ...state.data, skills },
        })),
      setProjects: (projects) =>
        set((state) => ({
          data: { ...state.data, projects },
        })),
      setCertifications: (certifications) =>
        set((state) => ({
          data: { ...state.data, certifications },
        })),
      setLanguages: (languages) =>
        set((state) => ({
          data: { ...state.data, languages },
        })),
      setTemplate: (template) => set({ template }),
      reset: () => set({ data: initialCVData, template: 'modern' }),
    }),
    {
      name: 'cv-storage',
    }
  )
);
