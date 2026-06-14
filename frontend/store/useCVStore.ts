import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CVData, TemplateType, initialCVData, SpacingType, FontSizeAdjustType } from '@/types/cv';

interface CVState {
  data: CVData;
  template: TemplateType;
  font: string;
  themeColor: string;
  spacing: SpacingType;
  fontSizeAdjust: FontSizeAdjustType;
  updatePersonal: (data: Partial<CVData['personal']>) => void;
  updateSummary: (summary: string) => void;
  setExperience: (experience: CVData['experience']) => void;
  setEducation: (education: CVData['education']) => void;
  setSkills: (skills: string[]) => void;
  setProjects: (projects: CVData['projects']) => void;
  setCertifications: (certifications: CVData['certifications']) => void;
  setLanguages: (languages: CVData['languages']) => void;
  setTemplate: (template: TemplateType) => void;
  setFont: (font: string) => void;
  setThemeColor: (color: string) => void;
  setSpacing: (spacing: SpacingType) => void;
  setFontSizeAdjust: (fontSize: FontSizeAdjustType) => void;
  reset: () => void;
}

export const useCVStore = create<CVState>()(
  persist(
    (set) => ({
      data: initialCVData,
      template: 'modern',
      font: 'inter',
      themeColor: '#00A3FF',
      spacing: 'normal',
      fontSizeAdjust: 'md',
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
      setFont: (font) => set({ font }),
      setThemeColor: (themeColor) => set({ themeColor }),
      setSpacing: (spacing) => set({ spacing }),
      setFontSizeAdjust: (fontSizeAdjust) => set({ fontSizeAdjust }),
      reset: () => set((state) => ({ 
        data: initialCVData, 
        template: state.template, 
        font: 'inter', 
        themeColor: '#00A3FF', 
        spacing: 'normal', 
        fontSizeAdjust: 'md' 
      })),
    }),
    {
      name: 'cv-storage',
      merge: (persistedState: any, currentState: CVState) => {
        if (!persistedState) return currentState;
        
        const mergedState = { ...currentState, ...persistedState };
        
        if (mergedState.data && Array.isArray(mergedState.data.experience)) {
          mergedState.data.experience = mergedState.data.experience.map((exp: any) => ({
            ...exp,
            description: typeof exp.description === 'string'
              ? exp.description.split(',').map((d: string) => d.trim()).filter(Boolean)
              : (Array.isArray(exp.description) ? exp.description : [])
          }));
        }

        if (mergedState.data && Array.isArray(mergedState.data.projects)) {
          mergedState.data.projects = mergedState.data.projects.map((proj: any) => ({
            ...proj,
            technologies: typeof proj.technologies === 'string'
              ? proj.technologies.split(',').map((t: string) => t.trim()).filter(Boolean)
              : (Array.isArray(proj.technologies) ? proj.technologies : [])
          }));
        }

        return mergedState;
      },
    }
  )
);
