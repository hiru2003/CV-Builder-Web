'use client';

import React from 'react';
import { useCVStore } from '@/store/useCVStore';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';

const templates = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  creative: CreativeTemplate,
  minimal: MinimalTemplate,
  executive: ExecutiveTemplate,
};

export const CVPreview = () => {
  const { data, template } = useCVStore();
  
  const SelectedTemplate = templates[template] || ModernTemplate;

  return (
    <div className="w-full h-full bg-slate-100 overflow-auto flex justify-center custom-scrollbar">
      <div className="py-8">
        <div 
          className="relative shadow-2xl transition-all duration-300 print:shadow-none print:m-0 bg-white"
          style={{
            width: '210mm',
            height: '297mm',
            transform: 'scale(0.7)',
            transformOrigin: 'top center',
            marginBottom: '-89.1mm', // Compensate for 0.7 scale (297 * 0.3)
          }}
          id="cv-preview-container"
        >
          <SelectedTemplate data={data} />
        </div>
      </div>
    </div>
  );
};
