'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CVData, TemplateType } from '@/types/cv';
import { ModernTemplate } from '@/components/templates/ModernTemplate';
import { ClassicTemplate } from '@/components/templates/ClassicTemplate';
import { CreativeTemplate } from '@/components/templates/CreativeTemplate';
import { MinimalTemplate } from '@/components/templates/MinimalTemplate';
import { ExecutiveTemplate } from '@/components/templates/ExecutiveTemplate';

const templates = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  creative: CreativeTemplate,
  minimal: MinimalTemplate,
  executive: ExecutiveTemplate,
};

export default function PrintPreviewPage() {
  const searchParams = useSearchParams();
  const templateId = (searchParams.get('template') || 'modern') as TemplateType;
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
    <div className="w-[210mm] h-[297mm] bg-white overflow-hidden m-0 p-0">
      <SelectedTemplate data={data} />
    </div>
  );
}
