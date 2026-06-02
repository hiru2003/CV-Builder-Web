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
import { PhotoTemplate } from './templates/PhotoTemplate';

const templates = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  creative: CreativeTemplate,
  minimal: MinimalTemplate,
  executive: ExecutiveTemplate,
  ats_simple: ATSSimpleTemplate,
  ats_professional: ATSProfessionalTemplate,
  ats_modern: ATSModernTemplate,
  photo: PhotoTemplate,
};

export const CVPreview = () => {
  const { data, template, font, themeColor, spacing, fontSizeAdjust } = useCVStore();
  const [scale, setScale] = React.useState(0.7);

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile: full width minus padding
        setScale(Math.min(0.75, (width - 24) / 794));
      } else if (width < 1024) {
        // Tablet: full width minus padding
        setScale(Math.min(0.8, (width - 48) / 794));
      } else {
        // Desktop: 55% of screen width minus padding
        setScale(Math.min(0.85, (width * 0.55 - 48) / 794));
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const SelectedTemplate = templates[template] || ModernTemplate;

  return (
    <div className="w-full h-full bg-transparent overflow-auto flex justify-center custom-scrollbar">
      <div className="py-8 flex justify-center w-full">
        <div 
          style={{
            width: `${210 * scale}mm`,
            height: `${297 * scale}mm`,
            position: 'relative',
          }}
        >
          <div 
            className={`relative shadow-2xl transition-all duration-300 print:shadow-none print:m-0 bg-white font-${font}`}
            style={{
              width: '210mm',
              height: '297mm',
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              position: 'absolute',
              left: 0,
              top: 0,
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
    </div>
  );
};
