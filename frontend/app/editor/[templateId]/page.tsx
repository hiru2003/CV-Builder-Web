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
import { LayoutForm } from '@/components/forms/LayoutForm';
import { Download, ChevronLeft, LayoutTemplate, Settings, RefreshCcw, LogOut, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { AuthModal } from '@/components/AuthModal';


export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const { data, template, font, themeColor, spacing, fontSizeAdjust, setTemplate, reset, setFont } = useCVStore();
  const [activeTab, setActiveTab] = useState<'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'layout' | 'additional'>('personal');
  const [subView, setSubView] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit');
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [hasLoadedFromDB, setHasLoadedFromDB] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');


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
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (!currentUser) {
        setHasLoadedFromDB(false);
        setSaveStatus('idle');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 1. Fetch saved resume from Supabase when user logs in
  useEffect(() => {
    if (user && !hasLoadedFromDB) {
      const loadResume = async () => {
        try {
          const { data: savedResume, error } = await supabase
            .from('resumes')
            .select('*')
            .eq('user_id', user.id)
            .maybeSingle();

          if (error) throw error;

          if (savedResume) {
            const { template: savedTemplate, data: payload } = savedResume;
            const { font: savedFont, themeColor: savedColor, spacing: savedSpacing, fontSizeAdjust: savedSize, ...cvData } = payload;
            
            useCVStore.setState({
              data: cvData as any,
              template: savedTemplate as any,
              font: savedFont || 'inter',
              themeColor: savedColor || '#00A3FF',
              spacing: savedSpacing || 'normal',
              fontSizeAdjust: savedSize || 'md'
            });
          } else {
            // No cloud resume exists. If the user has guest edits, sync them to the database immediately
            const localStore = useCVStore.getState();
            const hasLocalEdits = 
              localStore.data.personal.fullName !== '' ||
              localStore.data.personal.email !== '' ||
              localStore.data.summary !== '' ||
              localStore.data.experience.length > 0 ||
              localStore.data.education.length > 0 ||
              localStore.data.skills.length > 0 ||
              localStore.data.projects.length > 0 ||
              localStore.data.certifications.length > 0 ||
              localStore.data.languages.length > 0;

            if (hasLocalEdits) {
              await syncResumeToDatabase(
                user,
                localStore.template,
                localStore.data,
                localStore.font,
                localStore.themeColor,
                localStore.spacing,
                localStore.fontSizeAdjust
              );
              setSaveStatus('saved');
              setTimeout(() => setSaveStatus('idle'), 2000);
            }
          }
        } catch (err: any) {
          console.error('Error loading saved resume:', err?.message || err?.details || err);
        } finally {
          setHasLoadedFromDB(true);
        }
      };
      loadResume();
    }
  }, [user, hasLoadedFromDB]);

  const syncResumeToDatabase = async (
    currentUser: any, 
    currentTemplate: string, 
    cvData: any, 
    currentFont: string,
    themeColor: string,
    spacing: string,
    fontSizeAdjust: string
  ) => {
    const payload = {
      ...cvData,
      font: currentFont,
      themeColor,
      spacing,
      fontSizeAdjust
    };

    const { error } = await supabase
      .from('resumes')
      .upsert({
        user_id: currentUser.id,
        template: currentTemplate,
        data: payload,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id'
      });

    if (error) throw error;
  };

  // 2. Auto-save changes to Supabase (debounced)
  useEffect(() => {
    if (!user || !hasLoadedFromDB) return;

    setSaveStatus('saving');

    const timer = setTimeout(async () => {
      try {
        const cvData = useCVStore.getState().data;
        const currentTemplate = useCVStore.getState().template;
        const currentFont = useCVStore.getState().font;
        const currentThemeColor = useCVStore.getState().themeColor;
        const currentSpacing = useCVStore.getState().spacing;
        const currentFontSizeAdjust = useCVStore.getState().fontSizeAdjust;

        await syncResumeToDatabase(
          user,
          currentTemplate,
          cvData,
          currentFont,
          currentThemeColor,
          currentSpacing,
          currentFontSizeAdjust
        );
        setSaveStatus('saved');
        
        // Reset to idle after 2 seconds
        const idleTimer = setTimeout(() => setSaveStatus('idle'), 2000);
        return () => clearTimeout(idleTimer);
      } catch (err: any) {
        console.error('Auto-save error details:', err?.message || err?.details || err);
        setSaveStatus('idle');
      }
    }, 1500); // Trigger save 1.5s after typing stops

    return () => clearTimeout(timer);
  }, [data, template, font, themeColor, spacing, fontSizeAdjust, user, hasLoadedFromDB]);

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
      const currentThemeColor = useCVStore.getState().themeColor;
      const currentSpacing = useCVStore.getState().spacing;
      const currentFontSizeAdjust = useCVStore.getState().fontSizeAdjust;

      // Sync database and trigger PDF export concurrently for maximum performance
      const dbSyncPromise = syncResumeToDatabase(
        currentUser, 
        currentTemplate, 
        cvData, 
        currentFont,
        currentThemeColor,
        currentSpacing,
        currentFontSizeAdjust
      ).catch(err => {
        console.error("Database sync failed:", err);
        throw new Error(`Database save failed: ${err.message || err.details || 'Unknown database error'}`);
      });
      
      const exportPromise = fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          data: cvData, 
          template: currentTemplate,
          font: currentFont,
          themeColor: currentThemeColor,
          spacing: currentSpacing,
          fontSizeAdjust: currentFontSizeAdjust
        }),
      }).then(async res => {
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(`PDF generation failed: ${errData.error || res.statusText}`);
        }
        return res;
      });

      const [_, response] = await Promise.all([dbSyncPromise, exportPromise]);

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume-${cvData.personal.fullName.replace(/\s+/g, '-').toLowerCase() || 'draft'}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error: any) {
      console.error('Export/Save error:', error);
      alert(error.message || 'Failed to save your CV to the cloud or generate PDF.');
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
    { id: 'layout', label: 'Layout & Styling' },
  ];

  return (
    <div className="h-screen h-[100dvh] flex flex-col bg-white overflow-hidden font-sans">
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
            <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100/50 px-2 py-0.5 rounded-full uppercase tracking-wider font-sans">Workspace</span>
            {user ? (
              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-2.5 py-0.5 rounded-full font-sans transition-all duration-200 select-none">
                {saveStatus === 'saving' && (
                  <>
                    <div className="w-1.5 h-1.5 border border-slate-400 border-t-transparent rounded-full animate-spin shrink-0"></div>
                    <span>Saving...</span>
                  </>
                )}
                {saveStatus === 'saved' && (
                  <>
                    <span className="text-green-500 font-bold shrink-0">✓</span>
                    <span>Saved</span>
                  </>
                )}
                {saveStatus === 'idle' && (
                  <>
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></div>
                    <span>Synced</span>
                  </>
                )}
              </span>
            ) : (
              <span 
                onClick={() => setShowAuthModal(true)}
                className="text-[10px] font-bold text-indigo-500 hover:text-indigo-600 cursor-pointer flex items-center gap-1 border border-indigo-100 bg-indigo-50/30 hover:bg-indigo-50 px-2.5 py-0.5 rounded-full font-sans transition-all duration-150 shrink-0 select-none"
              >
                ☁ Sync Active
              </span>
            )}
          </h1>
        </div>
        
        <div className="flex items-center gap-2.5 shrink-0 ml-4 sm:ml-0">
          <button 
            onClick={() => router.push('/resume/choose-template')}
            className="hidden md:flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-indigo-600 bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-200 px-3 py-2 rounded-xl transition-all shadow-sm"
            title="Change Template"
          >
            <LayoutTemplate size={16} /> <span>Template</span>
          </button>


          
          <button 
            onClick={() => {
              useCVStore.setState({
                data: {
                  personal: {
                    fullName: 'Richard Sanchez',
                    jobTitle: 'Marketing Manager',
                    email: 'hello@reallygreatsite.com',
                    phone: '+123-456-7890',
                    address: '123 Anywhere St., Any City',
                    website: 'www.reallygreatsite.com',
                    image: '', 
                    linkedin: 'linkedin.com/in/richardsanchez',
                    github: 'github.com/richardsanchez'
                  },
                  summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                  experience: [
                    {
                      id: '1',
                      company: 'Borcelle Studio',
                      position: 'Marketing Manager & Specialist',
                      location: 'New York, NY',
                      startDate: '2030',
                      endDate: 'PRESENT',
                      current: true,
                      description: [
                        'Develop and execute comprehensive marketing strategies and campaigns that align with the company\'s goals and objectives.',
                        'Lead, mentor, and manage a high-performing marketing team, fostering a collaborative and results-driven work environment.',
                        'Monitor brand consistency across marketing channels and materials.'
                      ]
                    },
                    {
                      id: '2',
                      company: 'Fauget Studio',
                      position: 'Marketing Manager & Specialist',
                      location: 'Chicago, IL',
                      startDate: '2025',
                      endDate: '2029',
                      current: false,
                      description: [
                        'Create and manage the marketing budget, ensuring efficient allocation of resources and optimizing ROI.',
                        'Oversee market research to identify emerging trends, customer needs, and competitor strategies.',
                        'Monitor brand consistency across marketing channels and materials.'
                      ]
                    },
                    {
                      id: '3',
                      company: 'Studio Shodwe',
                      position: 'Marketing Manager & Specialist',
                      location: 'Los Angeles, CA',
                      startDate: '2024',
                      endDate: '2025',
                      current: false,
                      description: [
                        'Develop and maintain strong relationships with partners, agencies, and vendors to support marketing initiatives.',
                        'Monitor and maintain brand consistency across all marketing channels and materials.'
                      ]
                    }
                  ],
                  education: [
                    {
                      id: '1',
                      institution: 'Wardiere University',
                      degree: 'Master of Business Management',
                      field: 'Business Management',
                      startDate: '2029',
                      endDate: '2030',
                      current: false,
                      score: '4.0'
                    },
                    {
                      id: '2',
                      institution: 'Wardiere University',
                      degree: 'Bachelor of Business',
                      field: 'Business',
                      startDate: '2025',
                      endDate: '2029',
                      current: false,
                      score: '3.8'
                    }
                  ],
                  skills: [
                    'Project Management',
                    'Public Relations',
                    'Teamwork',
                    'Time Management',
                    'Leadership',
                    'Effective Communication',
                    'Critical Thinking'
                  ],
                  projects: [
                    {
                      id: '1',
                      name: 'Brand Alignment Campaign',
                      description: 'Successfully rebranded three product lines leading to 24% increased customer engagement within six months.',
                      technologies: ['Branding', 'Analytics', 'Social Media']
                    },
                    {
                      id: '2',
                      name: 'Digital Campaign Overhaul',
                      description: 'Overhauled the main digital traffic acquisition pipeline, resulting in a 40% reduction in lead conversion cost.',
                      technologies: ['SEO', 'Google Ads', 'Content Strategy']
                    }
                  ],
                  certifications: [
                    {
                      id: '1',
                      name: 'Google Digital Marketing Professional',
                      issuer: 'Google',
                      date: '2024'
                    },
                    {
                      id: '2',
                      name: 'Agile Marketing Leadership',
                      issuer: 'Agile Alliance',
                      date: '2025'
                    }
                  ],
                  languages: [
                    { id: '1', name: 'English', level: 'Fluent' },
                    { id: '2', name: 'French', level: 'Fluent' },
                    { id: '3', name: 'German', level: 'Basics' },
                    { id: '4', name: 'Spanish', level: 'Intermediate' }
                  ]
                }
              });
            }}
            className="hidden md:flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3 py-2 rounded-xl transition-all shadow-sm"
            title="Load Sample Data"
          >
            <Sparkles size={16} /> <span>Demo Data</span>
          </button>
          
          <button 
            onClick={reset}
            className="hidden md:flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-655 hover:text-rose-605 bg-white hover:bg-rose-50 border border-slate-205 border-slate-200 hover:border-rose-250 px-3 py-2 rounded-xl transition-all shadow-sm"
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
                className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-250 p-2 sm:px-3 sm:py-2 rounded-xl transition-all shadow-sm"
                title="Sign Out"
              >
                <LogOut size={16} /> <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          )}

          <button 
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-widest text-white bg-gradient-to-r from-indigo-600 to-[#00A3FF] hover:from-indigo-700 hover:to-[#008AE6] disabled:from-blue-300 disabled:to-blue-400 px-3 py-2 sm:px-4.5 sm:py-2.5 rounded-xl transition-all shadow-[0_4px_12px_rgba(79,70,229,0.25)] hover:shadow-[0_6px_18px_rgba(79,70,229,0.35)] transform hover:-translate-y-0.5 active:translate-y-0"
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
      <div className="lg:hidden p-3 bg-slate-50 border-b border-slate-200/50 shrink-0">
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
        <div className={`w-full lg:w-[45%] ${mobileView === 'edit' ? 'flex flex-1 min-h-0' : 'hidden lg:flex'} flex-col bg-white border-r border-slate-200 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]`}>
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
          <div className="flex-1 overflow-y-auto p-6 pb-24 md:p-8 bg-white custom-scrollbar editor-form-container">
            <div className="max-w-2xl mx-auto">
              {activeTab === 'personal' && <PersonalInfoForm />}
              {activeTab === 'experience' && <ExperienceForm />}
              {activeTab === 'education' && <EducationForm />}
              {activeTab === 'skills' && <SkillsForm />}
              {activeTab === 'summary' && <SummaryForm />}
              {activeTab === 'layout' && <LayoutForm />}
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

        {/* Right Side: Live Preview (Figma-style light workbench with dot grid) */}
        <div className={`${mobileView === 'preview' ? 'flex w-full flex-1 min-h-0' : 'hidden'} lg:flex lg:w-[55%] bg-slate-100/70 overflow-hidden relative bg-dot-grid`}>
          <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-md px-3.5 py-1.8 rounded-xl text-[9px] font-extrabold uppercase tracking-widest text-slate-500 border border-slate-200/80 shadow-sm flex items-center gap-2">
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
