'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCVStore } from '@/store/useCVStore';
import { TemplateType } from '@/types/cv';
import { CVPreview } from '@/components/CVPreview';
import { PersonalInfoForm } from '@/components/forms/PersonalInfoForm';
import { SummaryForm } from '@/components/forms/SummaryForm';
import { ExperienceForm } from '@/components/forms/ExperienceForm';
import { EducationForm } from '@/components/forms/EducationForm';
import { SkillsForm } from '@/components/forms/SkillsForm';
import { Download, ChevronLeft, LayoutTemplate, Settings, RefreshCcw } from 'lucide-react';

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const { setTemplate, reset, template } = useCVStore();
  const [activeTab, setActiveTab] = useState<'personal' | 'summary' | 'experience' | 'education' | 'skills'>('personal');
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    if (params.templateId) {
      setTemplate(params.templateId as TemplateType);
    }
  }, [params.templateId, setTemplate]);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          data: useCVStore.getState().data, 
          template: useCVStore.getState().template 
        }),
      });

      if (!response.ok) throw new Error('Failed to generate PDF');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume-${useCVStore.getState().data.personal.fullName.replace(/\s+/g, '-').toLowerCase() || 'draft'}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to generate PDF. Make sure the API route is running properly.');
    } finally {
      setIsExporting(false);
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Details' },
    { id: 'summary', label: 'Summary' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
  ];

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden font-sans">
      {/* Top Navbar */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/resume/choose-template')}
            className="text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1 text-sm font-medium"
          >
            <ChevronLeft size={18} /> Back
          </button>
          <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>
          <h1 className="text-lg font-bold text-slate-800 hidden sm:block">CV Builder</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.push('/resume/choose-template')}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:bg-slate-50 px-3 py-2 rounded-md transition-colors border border-slate-200"
          >
            <LayoutTemplate size={16} /> Change Template
          </button>
          <button 
            onClick={reset}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 px-3 py-2 rounded-md transition-colors border border-slate-200"
          >
            <RefreshCcw size={16} /> Reset
          </button>
          <button 
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex items-center gap-2 text-sm font-medium text-white bg-[#00A3FF] hover:bg-[#008AE6] disabled:bg-blue-300 px-4 py-2 rounded-md transition-all shadow-sm"
          >
            {isExporting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Generating...
              </span>
            ) : (
              <><Download size={16} /> Download PDF</>
            )}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Side: Forms */}
        <div className="w-full lg:w-[45%] flex flex-col bg-white border-r border-slate-200 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          {/* Form Tabs Navigation */}
          <div className="flex overflow-x-auto border-b border-slate-100 p-2 gap-1 hide-scrollbar bg-slate-50">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-white text-[#00A3FF] shadow-sm border border-slate-200' 
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 border border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Content Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-white custom-scrollbar">
            <div className="max-w-2xl mx-auto">
              {activeTab === 'personal' && <PersonalInfoForm />}
              {activeTab === 'summary' && <SummaryForm />}
              {activeTab === 'experience' && <ExperienceForm />}
              {activeTab === 'education' && <EducationForm />}
              {activeTab === 'skills' && <SkillsForm />}
            </div>
          </div>
        </div>

        {/* Right Side: Live Preview */}
        <div className="hidden lg:flex lg:w-[55%] bg-[#F8FAFC] overflow-hidden relative">
          <div className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-slate-500 border border-slate-200 shadow-sm flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Live Preview
          </div>
          <CVPreview />
        </div>
        
      </div>
    </div>
  );
}
