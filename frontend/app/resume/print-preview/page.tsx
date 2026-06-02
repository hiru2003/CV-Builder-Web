'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CVData, TemplateType } from '@/types/cv';
import { ModernTemplate } from '@/components/templates/ModernTemplate';
import { ClassicTemplate } from '@/components/templates/ClassicTemplate';
import { CreativeTemplate } from '@/components/templates/CreativeTemplate';
import { MinimalTemplate } from '@/components/templates/MinimalTemplate';
import { ExecutiveTemplate } from '@/components/templates/ExecutiveTemplate';
import { ATSSimpleTemplate } from '@/components/templates/ATSSimpleTemplate';
import { ATSProfessionalTemplate } from '@/components/templates/ATSProfessionalTemplate';
import { ATSModernTemplate } from '@/components/templates/ATSModernTemplate';
import { PhotoTemplate } from '@/components/templates/PhotoTemplate';

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

function PrintPreviewContent() {
  const searchParams = useSearchParams();
  const templateId = (searchParams.get('template') || 'modern') as TemplateType;
  const fontId = searchParams.get('font') || 'inter';
  const themeColor = searchParams.get('themeColor') || '#00A3FF';
  const spacing = (searchParams.get('spacing') || 'normal') as any;
  const fontSizeAdjust = (searchParams.get('fontSizeAdjust') || 'md') as any;
  const [data, setData] = useState<CVData | null>(null);

  useEffect(() => {
    // Puppeteer injected the data into localStorage
    const storedData = localStorage.getItem('print-cv-data');
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      // Fallback
      setData(null);
    }
  }, []);

  if (!data) return <div>Loading print preview...</div>;

  const SelectedTemplate = templates[templateId] || ModernTemplate;

  return (
    <div className={`w-[210mm] h-[297mm] bg-white overflow-hidden m-0 p-0 font-${fontId}`}>
      <SelectedTemplate 
        data={data} 
        themeColor={themeColor} 
        spacing={spacing} 
        fontSizeAdjust={fontSizeAdjust} 
      />
    </div>
  );
}

export default function PrintPreviewPage() {
  return (
    <React.Suspense fallback={<div>Loading print preview...</div>}>
      <PrintPreviewContent />
    </React.Suspense>
  );
}
