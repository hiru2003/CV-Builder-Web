'use client';

import React from 'react';
import { useCVStore } from '@/store/useCVStore';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { ATSSimpleTemplate } from './templates/ATSSimpleTemplate';
import { ATSProfessionalTemplate } from './templates/ATSProfessionalTemplate';
import { ATSModernTemplate } from './templates/ATSModernTemplate';

const templates = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  creative: CreativeTemplate,
  minimal: MinimalTemplate,
  executive: ExecutiveTemplate,
  ats_simple: ATSSimpleTemplate,
  ats_professional: ATSProfessionalTemplate,
  ats_modern: ATSModernTemplate,
};

export const CVPreview = () => {
  const { data, template, font, themeColor, spacing, fontSizeAdjust } = useCVStore();
  const [scale, setScale] = React.useState(0.7);

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile: container is 100% width minus padding
        setScale(Math.min(0.7, (width - 32) / 794));
      } else if (width < 1024) {
        // Tablet/MD screens
        setScale(Math.min(0.7, (width - 48) / 794));
      } else {
        // Desktop
        setScale(0.7);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const SelectedTemplate = templates[template] || ModernTemplate;

  return (
    <div className="w-full h-full bg-slate-100 overflow-auto flex justify-center custom-scrollbar">
      <div className="py-8">
        <div 
          className={`relative shadow-2xl transition-all duration-300 print:shadow-none print:m-0 bg-white font-${font}`}
          style={{
            width: '210mm',
            height: '297mm',
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            marginBottom: `-${297 * (1 - scale)}mm`, // Compensate for scale zoom out
          }}
          id="cv-preview-container"
        >
          <SelectedTemplate 
            data={data} 
            themeColor={themeColor}
            spacing={spacing}
            fontSizeAdjust={fontSizeAdjust}
          />
        </div>
      </div>
    </div>
  );
};
