'use client';

import { useResume } from '@/contexts/ResumeContext';
import { ModernTemplate } from './templates/ModernTemplate';
import { MinimalistTemplate } from './templates/MinimalistTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';

export function ResumePreview() {
  const { state } = useResume();

  const renderTemplate = () => {
    switch (state.template) {
      case 'modern':
        return <ModernTemplate resume={state} />;
      case 'minimalist':
        return <MinimalistTemplate resume={state} />;
      case 'classic':
        return <ClassicTemplate resume={state} />;
      case 'professional':
        return <ProfessionalTemplate resume={state} />;
      default:
        return <ModernTemplate resume={state} />;
    }
  };

  return (
    <div className="h-full w-full bg-slate-50 overflow-auto flex flex-col">
      <div className="sticky top-0 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between z-10">
        <h3 className="text-sm font-semibold text-slate-900">Live Preview</h3>
        <span className="text-xs text-slate-500">Updates in real-time</span>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <div className="flex justify-center">
          <div className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden" data-print-target>
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
}
