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
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-800">
            <div className="w-8 h-8 bg-[#00A3FF] rounded-lg flex items-center justify-center transform rotate-12">
              <FileCheck size={20} className="text-white transform -rotate-12" />
            </div>
            <span>CV Builder</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-2 text-[#00A3FF]">
              <div className="w-6 h-6 rounded-full bg-[#00A3FF] text-white flex items-center justify-center text-xs">1</div>
              <span>Choose template</span>
            </div>
            <div className="w-12 h-px bg-slate-200"></div>
            <div className="flex items-center gap-2 text-slate-400">
              <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs">2</div>
              <span>Enter your details</span>
            </div>
            <div className="w-12 h-px bg-slate-200"></div>
            <div className="flex items-center gap-2 text-slate-400">
              <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs">3</div>
              <span>Download resume</span>
            </div>
          </div>
          
          <div className="w-[120px] hidden md:block"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#2C3E50] mb-4">Resume templates</h1>
        <p className="text-lg text-slate-500 mb-4 max-w-2xl mx-auto">
          Simple to use and ready in minutes resume templates — give it a try for free now!
        </p>
        <button 
          onClick={() => router.push('/editor/modern')}
          className="text-[#00A3FF] font-semibold hover:underline border border-transparent hover:border-[#00A3FF]/20 px-3 py-1 rounded transition-all"
        >
          Choose later
        </button>

        {/* Tabs / Columns */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-12 mb-12 border-b border-slate-100 pb-2">
          <Tab active={activeTab === 'all'} onClick={() => setActiveTab('all')} icon={<Folder size={18} />} label="All Templates" />
          <Tab active={activeTab === 'photo'} onClick={() => setActiveTab('photo')} icon={<Image size={18} />} label="With Photo" />
          <Tab active={activeTab === 'classic'} onClick={() => setActiveTab('classic')} icon={<Star size={18} />} label="Classic" />
          <Tab active={activeTab === 'creative'} onClick={() => setActiveTab('creative')} icon={<Palette size={18} />} label="Creative" />
          <Tab active={activeTab === 'minimal'} onClick={() => setActiveTab('minimal')} icon={<FileText size={18} />} label="Minimal" />
          <Tab active={activeTab === 'modern'} onClick={() => setActiveTab('modern')} icon={<UserSquare size={18} />} label="Modern" />
          <Tab active={activeTab === 'executive'} onClick={() => setActiveTab('executive')} icon={<Briefcase size={18} />} label="Executive" />
        </div>

        {/* Grid */}
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredTemplates.map(template => (
              <TemplateCardWrapper key={template.id} href={template.href} name={template.name}>
                {template.component}
              </TemplateCardWrapper>
            ))}
          </div>
        ) : (
          <div className="py-20 text-slate-400 text-lg">
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
      className={`flex items-center gap-2 pb-3 border-b-2 px-3 cursor-pointer transition-all duration-200 outline-none ${
        active 
          ? 'border-[#00A3FF] text-[#00A3FF] font-bold' 
          : 'border-transparent text-slate-400 hover:text-[#00A3FF] hover:border-slate-200'
      }`}
    >
      {icon}
      <span className="whitespace-nowrap text-sm md:text-base">{label}</span>
    </button>
  );
}

function TemplateCardWrapper({ children, href, name }: { children: React.ReactNode, href: string, name: string }) {
  return (
    <div className="group relative flex flex-col h-[520px]">
      <div className="bg-[#F8FAFC] p-6 sm:p-8 rounded-xl flex items-center justify-center border border-slate-100 hover:border-[#00A3FF]/30 transition-all cursor-pointer h-full overflow-hidden shadow-sm hover:shadow-md">
        <div className="w-full h-full relative shadow-sm transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-xl bg-white flex items-center justify-center pointer-events-none rounded overflow-hidden">
           {children}
        </div>
        <Link href={href} className="absolute inset-0 z-10">
          <span className="sr-only">Select {name} Template</span>
        </Link>
        
        {/* Overlay Button */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
          <div className="px-6 py-3 bg-[#00A3FF] text-white font-semibold rounded-full shadow-lg whitespace-nowrap">
            Use This Template
          </div>
        </div>
      </div>
      <div className="mt-4 font-bold text-slate-700 text-lg text-left pl-1">{name}</div>
    </div>
  );
}
