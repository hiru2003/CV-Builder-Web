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
import { Download, ChevronLeft, LayoutTemplate, Settings, RefreshCcw, LogOut, Type } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { AuthModal } from '@/components/AuthModal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const { setTemplate, reset, template, font, setFont } = useCVStore();
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

  const syncResumeToDatabase = async (currentUser: any, currentTemplate: string, cvData: any, currentFont: string) => {
    // Check if user already has a saved resume
    const { data: existingResumes, error: fetchError } = await supabase
      .from('resumes')
      .select('id')
      .eq('user_id', currentUser.id)
      .limit(1);

    if (fetchError) throw fetchError;

    const payload = {
      ...cvData,
      font: currentFont
    };

    if (existingResumes && existingResumes.length > 0) {
      // Update existing resume record
      const { error: updateError } = await supabase
        .from('resumes')
        .update({
          template: currentTemplate,
          data: payload,
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
          data: payload,
        });

      if (insertError) throw insertError;
    }
  };

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
      const currentFont = useCVStore.getState().font;

      // Sync database and trigger PDF export concurrently for maximum performance (no waiting for DB response to start PDF generation)
      const dbSyncPromise = syncResumeToDatabase(currentUser, currentTemplate, cvData, currentFont);
      
      const exportPromise = fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          data: cvData, 
          template: currentTemplate,
          font: currentFont
        }),
      });

      const [_, response] = await Promise.all([dbSyncPromise, exportPromise]);

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
      <header className="sticky top-0 z-50 h-auto min-h-[68px] py-3 sm:py-0 border-b border-slate-200/50 backdrop-blur-md bg-white/80 flex items-center justify-between px-4 sm:px-6 shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button 
            onClick={() => router.push('/resume/choose-template')}
            className="flex items-center justify-center text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 px-3.5 py-1.8 rounded-xl transition-all gap-1 text-xs font-bold uppercase tracking-wider shadow-sm"
            title="Back to templates"
          >
            <ChevronLeft size={16} /> <span>Back</span>
          </button>
          <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>
          <h1 className="text-base font-extrabold text-slate-800 tracking-tight hidden lg:flex items-center gap-2">
            <span>CV Editor</span>
            <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100/50 px-2 py-0.5 rounded-full uppercase tracking-wider">Workspace</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-2.5 shrink-0 ml-4 sm:ml-0">
          <button 
            onClick={() => router.push('/resume/choose-template')}
            className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-indigo-600 bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-200 px-3 py-2 rounded-xl transition-all shadow-sm"
            title="Change Template"
          >
            <LayoutTemplate size={16} /> <span>Template</span>
          </button>

          {/* Font Selector Dropdown */}
          <Select value={font} onValueChange={setFont}>
            <SelectTrigger 
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-200 px-3 py-2 h-9 rounded-xl transition-all shadow-sm focus:ring-0 focus-visible:ring-0 focus-visible:border-indigo-200 outline-none cursor-pointer"
            >
              <Type size={16} className="text-slate-450 shrink-0" />
              <span>Font:</span>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border border-slate-200/80 rounded-xl shadow-lg p-1 z-[100] min-w-[150px] max-h-[300px] overflow-y-auto">
              <SelectItem value="inter" className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 hover:text-indigo-650 rounded-lg cursor-pointer py-1.5 focus:bg-slate-50 focus:text-indigo-650">Inter</SelectItem>
              <SelectItem value="outfit" className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 hover:text-indigo-650 rounded-lg cursor-pointer py-1.5 focus:bg-slate-50 focus:text-indigo-650">Outfit</SelectItem>
              <SelectItem value="montserrat" className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 hover:text-indigo-650 rounded-lg cursor-pointer py-1.5 focus:bg-slate-50 focus:text-indigo-650">Montserrat</SelectItem>
              <SelectItem value="roboto" className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 hover:text-indigo-650 rounded-lg cursor-pointer py-1.5 focus:bg-slate-50 focus:text-indigo-650">Roboto</SelectItem>
              <SelectItem value="merriweather" className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 hover:text-indigo-650 rounded-lg cursor-pointer py-1.5 focus:bg-slate-50 focus:text-indigo-650 font-serif">Merriweather</SelectItem>
              <SelectItem value="playfair" className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 hover:text-indigo-650 rounded-lg cursor-pointer py-1.5 focus:bg-slate-50 focus:text-indigo-650 font-serif">Playfair</SelectItem>
              <SelectItem value="lora" className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 hover:text-indigo-650 rounded-lg cursor-pointer py-1.5 focus:bg-slate-50 focus:text-indigo-650 font-serif">Lora</SelectItem>
              <SelectItem value="times" className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 hover:text-indigo-650 rounded-lg cursor-pointer py-1.5 focus:bg-slate-50 focus:text-indigo-650 font-serif">Times New Roman</SelectItem>
              <SelectItem value="firacode" className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 hover:text-indigo-650 rounded-lg cursor-pointer py-1.5 focus:bg-slate-50 focus:text-indigo-650 font-mono">Fira Code</SelectItem>
            </SelectContent>
          </Select>
          
          <button 
            onClick={reset}
            className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-rose-600 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-250 px-3 py-2 rounded-xl transition-all shadow-sm"
            title="Reset Data"
          >
            <RefreshCcw size={16} /> <span>Reset</span>
          </button>

          {user && (
            <div className="flex items-center gap-2 border-l border-slate-200 pl-2.5">
              <span className="hidden xl:inline text-xs text-slate-400 font-bold max-w-[100px] truncate" title={user.email}>
                {user.email.split('@')[0]}
              </span>
              <button 
                onClick={async () => {
                  await supabase.auth.signOut();
                  reset();
                }}
                className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-250 px-3 py-2 rounded-xl transition-all shadow-sm"
                title="Sign Out"
              >
                <LogOut size={16} /> <span>Sign Out</span>
              </button>
            </div>
          )}

          <button 
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-widest text-white bg-gradient-to-r from-indigo-600 to-[#00A3FF] hover:from-indigo-700 hover:to-[#008AE6] disabled:from-blue-300 disabled:to-blue-400 px-4.5 py-2.5 rounded-xl transition-all shadow-[0_4px_12px_rgba(79,70,229,0.25)] hover:shadow-[0_6px_18px_rgba(79,70,229,0.35)] transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {isExporting ? (
              <span className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> 
                <span>Generating...</span>
              </span>
            ) : (
              <>
                <Download size={16} /> 
                <span>Download<span className="hidden sm:inline"> CV</span></span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Toggle Control */}
      <div className="lg:hidden p-3 bg-slate-50 border-b border-slate-200/50">
        <div className="flex p-1 bg-slate-200/60 rounded-xl max-w-sm mx-auto w-full border border-slate-200/50">
          <button
            onClick={() => setMobileView('edit')}
            className={`flex-1 py-2 text-xs font-bold text-center rounded-lg transition-all ${
              mobileView === 'edit' 
                ? 'bg-white text-indigo-650 shadow-sm border border-slate-200/20' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Edit Form
          </button>
          <button
            onClick={() => setMobileView('preview')}
            className={`flex-1 py-2 text-xs font-bold text-center rounded-lg transition-all ${
              mobileView === 'preview' 
                ? 'bg-white text-indigo-650 shadow-sm border border-slate-200/20' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Live Preview
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Side: Forms */}
        <div className={`w-full lg:w-[45%] ${mobileView === 'edit' ? 'flex' : 'hidden lg:flex'} flex-col bg-white border-r border-slate-200 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]`}>
          {/* Form Tabs Navigation */}
          <div className="p-3 bg-slate-50/50 border-b border-slate-200/50 shrink-0">
            <div className="flex gap-0.5 bg-slate-200/50 p-1 rounded-xl border border-slate-200/40 w-full overflow-x-auto hide-scrollbar">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-2 text-xs font-extrabold uppercase tracking-wider rounded-lg whitespace-nowrap transition-all ${
                    activeTab === tab.id 
                      ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/20' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Form Content Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-white custom-scrollbar editor-form-container">
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

        {/* Right Side: Live Preview (Figma-style dark workbench with dot grid) */}
        <div className={`${mobileView === 'preview' ? 'flex w-full' : 'hidden'} lg:flex lg:w-[55%] bg-[#0B0F19] overflow-hidden relative bg-dot-grid`}>
          <div className="absolute top-4 right-4 z-10 bg-slate-900/85 backdrop-blur-md px-3.5 py-1.8 rounded-xl text-[9px] font-extrabold uppercase tracking-widest text-slate-350 border border-white/5 shadow-2xl flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span>Live Previewing</span>
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
