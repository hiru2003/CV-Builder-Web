'use client';

import { useResume } from '@/contexts/ResumeContext';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with blue accents',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Elegant and simple with minimal design elements',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional and professional appearance',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Two-column layout with skills sidebar',
  },
];

export function TemplateSelector() {
  const { state, dispatch } = useResume();

  const handleSelectTemplate = (templateId: string) => {
    dispatch({
      type: 'SET_TEMPLATE',
      payload: templateId as any,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Choose a Template</h1>
      <p className="text-slate-600 mb-8">
        Select a professional template for your resume. You can change this at any time.
      </p>

      <div className="grid grid-cols-2 gap-6">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => handleSelectTemplate(template.id)}
            className={`p-6 rounded-lg border-2 transition-all text-left ${
              state.template === template.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-slate-900">{template.name}</h3>
              {state.template === template.id && (
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
            <p className="text-slate-600 text-sm">{template.description}</p>
          </button>
        ))}
      </div>

      <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Template Preview</h3>
        <p className="text-sm text-blue-800">
          The selected template &quot;{templates.find((t) => t.id === state.template)?.name}&quot;
          will be used when you view your resume preview or export it as PDF.
        </p>
      </div>
    </div>
  );
}
