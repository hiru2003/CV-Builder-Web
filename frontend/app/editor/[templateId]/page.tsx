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
import { AdditionalSectionsForm } from '@/components/forms/AdditionalSectionsForm';
import { LanguagesForm } from '@/components/forms/LanguagesForm';
import { CertificationsForm } from '@/components/forms/CertificationsForm';
import { ProjectsForm } from '@/components/forms/ProjectsForm';
import { Download, ChevronLeft, LayoutTemplate, Settings, RefreshCcw, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { AuthModal } from '@/components/AuthModal';

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const { setTemplate, reset, template } = useCVStore();
  const [activeTab, setActiveTab] = useState<'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'additional'>('personal');
  const [subView, setSubView] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit');
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (params.templateId) {
      setTemplate(params.templateId as TemplateType);
    }
  }, [params.templateId, setTemplate]);

  useEffect(() => {
    // Check active session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleExportPDF = async () => {
    const currentUser = user || (await supabase.auth.getUser()).data.user;

    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }

    setIsExporting(true);
    try {
      const cvData = useCVStore.getState().data;
      const currentTemplate = useCVStore.getState().template;

      // Sync with Supabase Database
      // Check if user already has a saved resume
      const { data: existingResumes, error: fetchError } = await supabase
        .from('resumes')
        .select('id')
        .eq('user_id', currentUser.id)
        .limit(1);

      if (fetchError) throw fetchError;

      if (existingResumes && existingResumes.length > 0) {
        // Update existing resume record
        const { error: updateError } = await supabase
          .from('resumes')
          .update({
            template: currentTemplate,
            data: cvData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingResumes[0].id);

        if (updateError) throw updateError;
      } else {
        // Insert new resume record
        const { error: insertError } = await supabase
          .from('resumes')
          .insert({
            user_id: currentUser.id,
            template: currentTemplate,
            data: cvData,
          });

        if (insertError) throw insertError;
      }

      // Generate PDF download
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          data: cvData, 
          template: currentTemplate 
        }),
      });

      if (!response.ok) throw new Error('Failed to generate PDF');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume-${cvData.personal.fullName.replace(/\s+/g, '-').toLowerCase() || 'draft'}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export/Save error:', error);
      alert('Failed to save your CV to the cloud or generate PDF.');
    } finally {
      setIsExporting(false);
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Details' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'summary', label: 'Summary' },
    { id: 'additional', label: 'Add Section' },
  ];

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden font-sans">
      {/* Top Navbar */}
      <header className="h-auto min-h-[64px] py-3 sm:py-0 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shrink-0 z-20 overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button 
            onClick={() => router.push('/resume/choose-template')}
            className="w-10 h-10 sm:w-auto sm:h-auto sm:px-0 flex items-center justify-center sm:justify-start text-slate-500 hover:text-slate-800 hover:bg-slate-100 sm:hover:bg-transparent rounded-full sm:rounded-none transition-colors gap-1 text-sm font-medium"
            title="Back"
          >
            <ChevronLeft size={20} /> <span className="hidden sm:inline">Back</span>
          </button>
          <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>
          <h1 className="text-lg font-bold text-slate-800 hidden lg:block">CV Builder</h1>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-4 sm:ml-0">
          <button 
            onClick={() => router.push('/resume/choose-template')}
            className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 w-10 h-10 sm:w-auto sm:h-auto sm:px-3 sm:py-2 rounded-full sm:rounded-lg transition-all shadow-sm"
            title="Change Template"
          >
            <LayoutTemplate size={18} className="sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Template</span>
          </button>
          
          <button 
            onClick={reset}
            className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 hover:text-red-600 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-200 w-10 h-10 sm:w-auto sm:h-auto sm:px-3 sm:py-2 rounded-full sm:rounded-lg transition-all shadow-sm"
            title="Reset Data"
          >
            <RefreshCcw size={18} className="sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Reset</span>
          </button>

          {user && (
            <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
              <span className="hidden xl:inline text-xs text-slate-500 font-medium max-w-[120px] truncate" title={user.email}>
                {user.email}
              </span>
              <button 
                onClick={async () => {
                  await supabase.auth.signOut();
                  reset();
                }}
                className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 w-10 h-10 sm:w-auto sm:h-auto sm:px-3 sm:py-2 rounded-full sm:rounded-lg transition-all shadow-sm"
                title="Sign Out"
              >
                <LogOut size={18} className="sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          )}

          <button 
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex items-center justify-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-[#00A3FF] to-[#007BFF] hover:from-[#008AE6] hover:to-[#0069D9] disabled:from-blue-300 disabled:to-blue-400 px-4 sm:px-5 py-2 sm:py-2 rounded-full sm:rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {isExporting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> 
                <span className="hidden sm:inline">Generating...</span>
              </span>
            ) : (
              <>
                <Download size={18} className="sm:w-4 sm:h-4" /> 
                <span>Download<span className="hidden sm:inline"> PDF</span></span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Toggle Control */}
      <div className="lg:hidden p-3 bg-slate-50 border-b border-slate-200">
        <div className="flex p-1 bg-slate-200/60 rounded-xl max-w-sm mx-auto w-full border border-slate-200">
          <button
            onClick={() => setMobileView('edit')}
            className={`flex-1 py-2 text-sm font-bold text-center rounded-lg transition-all ${
              mobileView === 'edit' 
                ? 'bg-white text-[#00A3FF] shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setMobileView('preview')}
            className={`flex-1 py-2 text-sm font-bold text-center rounded-lg transition-all ${
              mobileView === 'preview' 
                ? 'bg-white text-[#00A3FF] shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Side: Forms */}
        <div className={`w-full lg:w-[45%] ${mobileView === 'edit' ? 'flex' : 'hidden lg:flex'} flex-col bg-white border-r border-slate-200 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]`}>
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
              {activeTab === 'experience' && <ExperienceForm />}
              {activeTab === 'education' && <EducationForm />}
              {activeTab === 'skills' && <SkillsForm />}
              {activeTab === 'summary' && <SummaryForm />}
              {activeTab === 'additional' && (
                <>
                  {subView === null && <AdditionalSectionsForm onSelectSection={setSubView} />}
                  {subView === 'languages' && <LanguagesForm onBack={() => setSubView(null)} />}
                  {subView === 'certifications' && <CertificationsForm onBack={() => setSubView(null)} />}
                  {subView === 'projects' && <ProjectsForm onBack={() => setSubView(null)} />}
                  {['awards', 'social', 'references', 'hobbies'].includes(subView || '') && (
                    <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
                      <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Settings size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">Coming Soon</h3>
                      <p className="text-slate-500 mb-6 max-w-sm mx-auto">This section is currently under development. Please check back later.</p>
                      <button 
                        onClick={() => setSubView(null)} 
                        className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
                      >
                        Back to Additional Sections
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Live Preview */}
        <div className={`${mobileView === 'preview' ? 'flex w-full' : 'hidden'} lg:flex lg:w-[55%] bg-[#F8FAFC] overflow-hidden relative`}>
          <div className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-slate-500 border border-slate-200 shadow-sm flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Live Preview
          </div>
          <CVPreview />
        </div>
        
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setTimeout(() => {
            handleExportPDF();
          }, 300);
        }}
      />
    </div>
  );
}
