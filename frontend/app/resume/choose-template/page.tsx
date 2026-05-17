'use client';

import Link from 'next/link';
import { 
  Folder, Star, Palette, FileText, UserSquare, Briefcase, ShieldCheck, FileCheck
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ChooseTemplate() {
  const router = useRouter();
  
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
          className="text-[#00A3FF] font-semibold hover:underline"
        >
          Choose later
        </button>

        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-12 mb-12 border-b border-slate-100">
          <Tab active icon={<Folder size={20} />} label="All Templates" />
          <Tab icon={<Star size={20} />} label="Classic" />
          <Tab icon={<Palette size={20} />} label="Creative" />
          <Tab icon={<FileText size={20} />} label="Minimal" />
          <Tab icon={<UserSquare size={20} />} label="Modern" />
          <Tab icon={<Briefcase size={20} />} label="Executive" />
          <Tab icon={<ShieldCheck size={20} />} label="ATS Optimized" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          
          <TemplateCardWrapper href="/editor/modern" name="Modern">
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
          </TemplateCardWrapper>

          <TemplateCardWrapper href="/editor/classic" name="Classic (ATS)">
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
          </TemplateCardWrapper>

          <TemplateCardWrapper href="/editor/creative" name="Creative">
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
          </TemplateCardWrapper>

          <TemplateCardWrapper href="/editor/minimal" name="Minimal">
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
          </TemplateCardWrapper>

          <TemplateCardWrapper href="/editor/executive" name="Executive">
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
          </TemplateCardWrapper>

        </div>
      </main>
    </div>
  );
}

function Tab({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-2 pb-4 border-b-2 px-2 cursor-pointer transition-colors ${active ? 'border-[#00A3FF] text-[#00A3FF]' : 'border-transparent text-slate-400 hover:text-[#00A3FF]'}`}>
      {icon}
      <span className="font-semibold whitespace-nowrap">{label}</span>
    </div>
  );
}

function TemplateCardWrapper({ children, href, name }: { children: React.ReactNode, href: string, name: string }) {
  return (
    <div className="group relative flex flex-col h-[600px]">
      <div className="bg-[#F8FAFC] p-6 sm:p-10 rounded-xl flex items-center justify-center border border-slate-100 hover:border-[#00A3FF]/30 transition-all cursor-pointer h-full overflow-hidden">
        <div className="w-full h-full relative shadow-sm transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-xl bg-white flex items-center justify-center pointer-events-none">
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
      <div className="mt-4 font-bold text-slate-700 text-lg">{name}</div>
    </div>
  );
}
