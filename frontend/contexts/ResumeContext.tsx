'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Resume, ResumeAction } from '@/lib/types';
import { resumeReducer, initialResume } from '@/lib/resume-reducer';

interface ResumeContextType {
  state: Resume;
  dispatch: React.Dispatch<ResumeAction>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(resumeReducer, initialResume);
 
  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
