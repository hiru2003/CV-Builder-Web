'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Folder, Star, Palette, FileText, UserSquare, Briefcase, ShieldCheck, FileCheck, Image
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TemplateItem {
  id: string;
  name: string;
  href: string;
  hasPhoto: boolean;
  tags: string[];
  component: React.ReactNode;
}

export default function ChooseTemplate() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('all');

  const templates: TemplateItem[] = [
    {
      id: 'ats_simple',
      name: 'ATS Simple',
      href: '/editor/ats_simple',
      hasPhoto: false,
      tags: ['ats'],
      component: (
        <div className="w-full h-full bg-white flex flex-col p-6 shadow-sm border border-slate-200 text-center font-sans text-[6px]">
          <div className="text-[14px] font-bold mb-1 uppercase">YOUR NAME</div>
          <div className="text-[6px] text-[#007BFF] font-semibold mb-3">Job Title</div>
          <div className="flex justify-center gap-2 mb-4 text-[5px] text-slate-400">
            <span>email@address.com</span><span>•</span><span>(123) 456-7890</span><span>•</span><span>City, ST</span>
          </div>
          <div className="h-0.5 bg-slate-200 w-full mb-3"></div>
          
          <div className="text-[8px] font-bold text-slate-800 uppercase tracking-widest text-left mb-1.5 border-b border-slate-200 pb-0.5">Professional Summary</div>
          <div className="h-1 bg-slate-200 rounded w-full mb-1"></div>
          <div className="h-1 bg-slate-200 rounded w-4/5 mb-3"></div>

          <div className="text-[8px] font-bold text-slate-800 uppercase tracking-widest text-left mb-1.5 border-b border-slate-200 pb-0.5">Work Experience</div>
          <div className="flex justify-between font-bold text-slate-800 mb-1">
            <span>Job Title — Company Name</span>
            <span>2020 - Present</span>
          </div>
          <div className="h-1 bg-slate-200 rounded w-[95%] mb-1"></div>
          <div className="h-1 bg-slate-200 rounded w-[90%] mb-3"></div>
        </div>
      )
    },
    {
      id: 'ats_professional',
      name: 'ATS Professional',
      href: '/editor/ats_professional',
      hasPhoto: false,
      tags: ['ats'],
      component: (
        <div className="w-full h-full bg-white flex flex-col p-6 shadow-sm border border-slate-200 text-left font-sans text-[6px]">
          <div className="text-[14px] font-bold mb-1 uppercase">YOUR NAME</div>
          <div className="text-[6px] text-slate-500 font-medium mb-3">Job Title</div>
          <div className="flex gap-3 mb-4 text-[5px] text-slate-400">
            <span>email@address.com</span><span>(123) 456-7890</span><span>City, ST</span>
          </div>
          
          <div className="text-[8px] font-bold text-slate-800 uppercase tracking-wider mb-1.5 border-b-2 border-slate-800 pb-0.5">Professional Summary</div>
          <div className="h-1 bg-slate-200 rounded w-full mb-1"></div>
          <div className="h-1 bg-slate-200 rounded w-4/5 mb-3"></div>

          <div className="text-[8px] font-bold text-slate-800 uppercase tracking-wider mb-1.5 border-b-2 border-slate-800 pb-0.5">Experience</div>
          <div className="flex justify-between font-bold text-slate-800 mb-0.5">
            <span>Job Title</span>
            <span>2020 - Present</span>
          </div>
          <div className="text-slate-500 mb-1">Company Name</div>
          <div className="h-1 bg-slate-200 rounded w-[95%] mb-1"></div>
          <div className="h-1 bg-slate-200 rounded w-[90%] mb-3"></div>
        </div>
      )
    },
    {
      id: 'ats_modern',
      name: 'ATS Modern',
      href: '/editor/ats_modern',
      hasPhoto: false,
      tags: ['ats'],
      component: (
        <div className="w-full h-full bg-white flex flex-col p-6 shadow-sm border border-slate-200 text-left font-sans text-[6px]">
          <div className="flex justify-between items-start mb-4 border-b-2 border-slate-100 pb-3">
            <div>
              <div className="text-[14px] font-black uppercase text-slate-900">YOUR NAME</div>
              <div className="text-[6px] text-indigo-600 font-semibold mt-0.5">Job Title</div>
            </div>
            <div className="text-right text-[5px] text-slate-400 space-y-0.5">
              <div>email@address.com</div>
              <div>(123) 456-7890</div>
            </div>
          </div>
          
          <div className="text-[8px] font-bold text-indigo-700 uppercase tracking-wider mb-1.5">Summary</div>
          <div className="h-1 bg-slate-200 rounded w-full mb-1"></div>
          <div className="h-1 bg-slate-200 rounded w-4/5 mb-3"></div>

          <div className="text-[8px] font-bold text-indigo-700 uppercase tracking-wider mb-1.5">Experience</div>
          <div className="flex justify-between font-bold text-slate-800 mb-0.5">
            <span>Job Title</span>
            <span className="text-indigo-600 bg-indigo-50/50 px-1 rounded">2020 - Present</span>
          </div>
          <div className="text-slate-500 mb-1">Company Name</div>
          <div className="h-1 bg-slate-200 rounded w-[95%] mb-1"></div>
          <div className="h-1 bg-slate-200 rounded w-[90%] mb-3"></div>
        </div>
      )
    },
    {
      id: 'modern',
      name: 'Modern',
      href: '/editor/modern',
      hasPhoto: true,
      tags: ['modern'],
      component: (
        <div className="w-full h-full bg-white flex shadow-sm border border-slate-200 text-[6px]">
          <div className="w-[30%] bg-slate-50 border-r border-slate-200 p-4">
            <div className="w-12 h-12 bg-slate-300 rounded-full mx-auto mb-4"></div>
            <div className="h-2 bg-slate-200 rounded w-full mb-2"></div>
            <div className="h-2 bg-slate-200 rounded w-4/5 mb-6"></div>
            <div className="h-1 bg-blue-400 rounded w-full mb-1"></div>
            <div className="h-1 bg-slate-200 rounded w-full mb-1"></div>
          </div>
          <div className="w-[70%] p-4">
            <div className="text-[12px] font-bold mb-1">YOUR NAME</div>
            <div className="text-[8px] text-blue-500 mb-4">Job Title</div>
            <div className="h-1 bg-slate-200 rounded w-full mb-1"></div>
            <div className="h-1 bg-slate-200 rounded w-full mb-1"></div>
            <div className="h-1 bg-slate-200 rounded w-4/5 mb-4"></div>
            
            <div className="h-1.5 bg-slate-300 rounded w-1/3 mb-2"></div>
            <div className="h-1 bg-slate-200 rounded w-full mb-1"></div>
            <div className="h-1 bg-slate-200 rounded w-full mb-1"></div>
          </div>
        </div>
      )
    },
    {
      id: 'classic',
      name: 'Classic (ATS)',
      href: '/editor/classic',
      hasPhoto: false,
      tags: ['classic', 'ats'],
      component: (
        <div className="w-full h-full bg-white flex flex-col p-6 shadow-sm border border-slate-200 text-center font-serif text-[6px]">
          <div className="text-[14px] font-bold mb-1 uppercase">YOUR NAME</div>
          <div className="text-[8px] text-slate-500 italic mb-4">Job Title</div>
          
          <div className="h-0.5 bg-slate-800 w-full mb-4"></div>
          
          <div className="h-1.5 bg-slate-300 rounded w-1/3 mx-auto mb-2"></div>
          <div className="h-1 bg-slate-200 rounded w-full mb-1"></div>
          <div className="h-1 bg-slate-200 rounded w-full mb-1"></div>
          <div className="h-1 bg-slate-200 rounded w-4/5 mx-auto mb-4"></div>

          <div className="h-1.5 bg-slate-300 rounded w-1/3 mx-auto mb-2"></div>
          <div className="h-1 bg-slate-200 rounded w-full mb-1"></div>
          <div className="h-1 bg-slate-200 rounded w-full mb-1"></div>
        </div>
      )
    },
    {
      id: 'creative',
      name: 'Creative',
      href: '/editor/creative',
      hasPhoto: true,
      tags: ['creative'],
      component: (
        <div className="w-full h-full bg-white shadow-sm border border-slate-200 flex flex-col text-[6px]">
          <div className="h-16 bg-red-50 flex items-center p-4 border-b-4 border-slate-900">
            <div className="w-10 h-10 bg-slate-300 rounded-xl transform -rotate-6 border-2 border-white mr-4"></div>
            <div>
              <div className="text-[14px] font-black">YOUR NAME</div>
              <div className="text-[8px] text-red-500 font-bold">Job Title</div>
            </div>
          </div>
          <div className="flex flex-1">
            <div className="w-[35%] bg-slate-900 p-3">
               <div className="h-1 bg-slate-700 rounded w-full mb-1"></div>
               <div className="h-1 bg-slate-700 rounded w-4/5 mb-1"></div>
            </div>
            <div className="w-[65%] p-4">
               <div className="h-1.5 bg-slate-300 rounded w-1/3 mb-2 relative"><div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-200"></div></div>
               <div className="h-1 bg-slate-200 rounded w-full mb-1"></div>
               <div className="h-1 bg-slate-200 rounded w-full mb-4"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'minimal',
      name: 'Minimal',
      href: '/editor/minimal',
      hasPhoto: false,
      tags: ['minimal'],
      component: (
        <div className="w-full h-full bg-white shadow-sm border border-slate-200 p-6 text-[6px]">
          <div className="text-[16px] font-light mb-1">Your Name</div>
          <div className="text-[8px] text-slate-400 mb-6">Job Title</div>
          
          <div className="flex gap-4">
            <div className="w-1/4 text-slate-400">2020 - Present</div>
            <div className="w-3/4">
               <div className="font-bold text-slate-800 mb-1">Company Name</div>
               <div className="h-1 bg-slate-200 rounded w-full mb-1"></div>
               <div className="h-1 bg-slate-200 rounded w-full mb-1"></div>
               <div className="h-1 bg-slate-200 rounded w-4/5 mb-4"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'executive',
      name: 'Executive',
      href: '/editor/executive',
      hasPhoto: false,
      tags: ['executive'],
      component: (
        <div className="w-full h-full bg-white shadow-sm border border-slate-200 p-6 font-serif text-[6px]">
          <div className="border-b-2 border-slate-900 pb-4 mb-4 flex justify-between items-end">
             <div>
                <div className="text-[16px] font-bold uppercase mb-1">YOUR NAME</div>
                <div className="text-[8px] text-slate-600">Job Title</div>
             </div>
          </div>
          
          <div className="h-1.5 bg-slate-800 rounded w-1/3 mb-2"></div>
          <div className="h-1 bg-slate-200 rounded w-full mb-1"></div>
          <div className="h-1 bg-slate-200 rounded w-full mb-1"></div>
          <div className="h-1 bg-slate-200 rounded w-4/5 mb-6"></div>
          
          <div className="h-1.5 bg-slate-800 rounded w-1/3 mb-2"></div>
          <div className="h-1 bg-slate-200 rounded w-full mb-1"></div>
          <div className="h-1 bg-slate-200 rounded w-full mb-1"></div>
        </div>
      )
    }
  ];

  const filteredTemplates = templates.filter(template => {
    if (activeTab === 'all') return true;
    if (activeTab === 'photo') return template.hasPhoto;
    return template.tags.includes(activeTab);
  });

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans relative overflow-hidden bg-line-grid">
      {/* Glow Blur Effect */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#00A3FF]/8 to-indigo-500/8 rounded-full blur-[100px] pointer-events-none z-0"></div>
      
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/60 backdrop-blur-md bg-white/75 shrink-0">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-black text-xl text-slate-800 tracking-tight">
            <div className="w-9 h-9 bg-gradient-to-tr from-indigo-500 to-[#00A3FF] rounded-xl flex items-center justify-center shadow-md">
              <FileCheck size={20} className="text-white" />
            </div>
            <span>CV <span className="bg-gradient-to-r from-[#00A3FF] to-indigo-600 bg-clip-text text-transparent">Builder</span></span>
          </Link>
          
          <div className="hidden md:flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-slate-500">
            <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 rounded-full shadow-sm">
              <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">1</div>
              <span>Choose template</span>
            </div>
            <div className="w-8 h-px bg-slate-200"></div>
            <div className="flex items-center gap-2 opacity-65">
              <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px]">2</div>
              <span>Enter details</span>
            </div>
            <div className="w-8 h-px bg-slate-200"></div>
            <div className="flex items-center gap-2 opacity-65">
              <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px]">3</div>
              <span>Download CV</span>
            </div>
          </div>
          
          <div className="w-[150px] hidden md:block"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1300px] mx-auto px-6 py-16 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-5 tracking-tight leading-tight">
          Select a <span className="bg-gradient-to-r from-indigo-600 to-[#00A3FF] bg-clip-text text-transparent">Resume Template</span>
        </h1>
        <p className="text-lg text-slate-500 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
          Choose from our recruiter-approved templates, optimized to pass through ATS filters and win interviews.
        </p>
        
        <div className="flex justify-center">
          <button 
            onClick={() => router.push('/editor/modern')}
            className="px-6 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-sm rounded-xl transition-all shadow-sm flex items-center gap-2 group"
          >
            Choose later & start editing
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* Tabs Tray (Glassmorphism container) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-16 mb-16 bg-slate-200/50 p-1.5 rounded-2xl border border-slate-200/60 max-w-[960px] mx-auto backdrop-blur-sm shadow-sm">
          <Tab active={activeTab === 'all'} onClick={() => setActiveTab('all')} icon={<Folder size={16} />} label="All Styles" />
          <Tab active={activeTab === 'photo'} onClick={() => setActiveTab('photo')} icon={<Image size={16} />} label="With Photo" />
          <Tab active={activeTab === 'ats'} onClick={() => setActiveTab('ats')} icon={<ShieldCheck size={16} />} label="ATS Approved" />
          <Tab active={activeTab === 'classic'} onClick={() => setActiveTab('classic')} icon={<Star size={16} />} label="Classic" />
          <Tab active={activeTab === 'creative'} onClick={() => setActiveTab('creative')} icon={<Palette size={16} />} label="Creative" />
          <Tab active={activeTab === 'minimal'} onClick={() => setActiveTab('minimal')} icon={<FileText size={16} />} label="Minimalist" />
          <Tab active={activeTab === 'modern'} onClick={() => setActiveTab('modern')} icon={<UserSquare size={16} />} label="Modern" />
          <Tab active={activeTab === 'executive'} onClick={() => setActiveTab('executive')} icon={<Briefcase size={16} />} label="Executive" />
        </div>

        {/* Grid */}
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredTemplates.map(template => (
              <TemplateCardWrapper 
                key={template.id} 
                href={template.href} 
                name={template.name}
                badge={
                  template.id === 'ats_simple' ? 'ATS Approved' :
                  template.id === 'ats_professional' ? 'Recruiter Choice' :
                  template.id === 'ats_modern' ? 'Highly Recommended' :
                  template.id === 'modern' ? 'Most Popular' :
                  template.id === 'classic' ? 'Standard' :
                  template.id === 'creative' ? 'Creative Style' :
                  template.id === 'minimal' ? 'Minimalist' :
                  template.id === 'executive' ? 'Executive' : undefined
                }
              >
                {template.component}
              </TemplateCardWrapper>
            ))}
          </div>
        ) : (
          <div className="py-24 bg-white border border-slate-200/60 rounded-3xl shadow-sm text-slate-400 font-medium max-w-xl mx-auto">
            No templates found matching this category.
          </div>
        )}
      </main>
    </div>
  );
}

function Tab({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 py-2.5 px-4.5 rounded-xl cursor-pointer transition-all duration-200 outline-none text-xs md:text-sm font-bold ${
        active 
          ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/50' 
          : 'text-slate-500 hover:text-slate-900 hover:bg-white/40'
      }`}
    >
      <span className={active ? 'text-[#00A3FF]' : 'text-slate-400'}>{icon}</span>
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}

function TemplateCardWrapper({ children, href, name, badge }: { children: React.ReactNode, href: string, name: string, badge?: string }) {
  return (
    <div className="group relative flex flex-col h-[530px] bg-white rounded-2xl border border-slate-200/70 p-4 transition-all duration-300 hover:shadow-[0_22px_50px_rgba(79,70,229,0.11)] hover:-translate-y-1 hover:border-slate-300">
      <div className="bg-slate-50/70 rounded-xl flex items-center justify-center border border-slate-100 transition-all cursor-pointer h-[430px] overflow-hidden relative">
        <div className="w-[85%] h-[85%] relative shadow-md transition-transform duration-500 group-hover:scale-[1.03] bg-white flex items-center justify-center pointer-events-none rounded-md overflow-hidden border border-slate-100">
           {children}
        </div>
        <Link href={href} className="absolute inset-0 z-10">
          <span className="sr-only">Select {name} Template</span>
        </Link>
        
        {/* Overlay Button */}
        <div className="absolute inset-0 bg-slate-950/15 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center pointer-events-none">
          <div className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-[#00A3FF] text-white font-bold text-xs tracking-wide uppercase rounded-xl shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
            Use This Template
          </div>
        </div>

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4 z-20 bg-slate-900/90 text-white font-extrabold tracking-wide uppercase text-[8px] px-2.5 py-1.5 rounded-lg shadow-sm border border-white/10 backdrop-blur-sm">
            {badge}
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between pl-1">
        <div className="font-extrabold text-slate-800 text-base">{name}</div>
        <span className="text-[10px] text-indigo-500 font-extrabold bg-indigo-50 border border-indigo-100/50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">Free</span>
      </div>
    </div>
  );
}
