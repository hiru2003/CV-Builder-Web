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
            <span>BetterCV</span>
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
          
          <div className="w-[120px] hidden md:block"></div> {/* Spacer for centering the stepper */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#2C3E50] mb-4">Resume templates</h1>
        <p className="text-lg text-slate-500 mb-4 max-w-2xl mx-auto">
          Simple to use and ready in minutes resume templates — give it a try for free now!
        </p>
        <button 
          onClick={() => router.push('/editor/personal')}
          className="text-[#00A3FF] font-semibold hover:underline"
        >
          Choose later
        </button>

        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-12 mb-12 border-b border-slate-100">
          <Tab active icon={<Folder size={20} />} label="All Templates" />
          <Tab icon={<Star size={20} />} label="Simple" />
          <Tab icon={<Palette size={20} />} label="Modern" />
          <Tab icon={<FileText size={20} />} label="One column" />
          <Tab icon={<UserSquare size={20} />} label="With photo" />
          <Tab icon={<Briefcase size={20} />} label="Professional" />
          <Tab icon={<ShieldCheck size={20} />} label="ATS" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Card 1: Kelly Blackwell */}
          <TemplateCardWrapper href="/editor/personal?template=kelly">
            <KellyTemplate />
          </TemplateCardWrapper>

          {/* Card 2: Howard Jones */}
          <TemplateCardWrapper href="/editor/personal?template=howard">
            <HowardTemplate />
          </TemplateCardWrapper>

          {/* Card 3: Samantha Williams */}
          <TemplateCardWrapper href="/editor/personal?template=samantha">
            <SamanthaTemplate />
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

function TemplateCardWrapper({ children, href }: { children: React.ReactNode, href: string }) {
  return (
    <div className="group relative bg-[#F8FAFC] p-6 sm:p-10 rounded-xl flex items-center justify-center border border-slate-100 hover:border-[#00A3FF]/30 transition-all cursor-pointer h-[550px] overflow-hidden">
      <div className="w-full h-full relative shadow-sm transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-xl bg-white flex items-center justify-center">
         {children}
      </div>
      <Link href={href} className="absolute inset-0 z-10">
        <span className="sr-only">Select Template</span>
      </Link>
      
      {/* Overlay Button */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
        <div className="px-6 py-3 bg-[#00A3FF] text-white font-semibold rounded-full shadow-lg whitespace-nowrap">
          Use This Template
        </div>
      </div>
    </div>
  );
}

// Below are miniature CSS representations of the templates.

function KellyTemplate() {
  return (
    <div className="w-full h-full flex flex-row text-left bg-white text-[6px] sm:text-[7px] leading-tight overflow-hidden p-0 border border-slate-200 shadow-sm">
       <div className="w-[35%] bg-slate-50 p-4 border-r border-slate-200 h-full flex flex-col gap-4">
          <div>
            <h2 className="text-[12px] sm:text-[14px] font-black text-slate-800 tracking-widest uppercase mb-1">Kelly<br/>Blackwell</h2>
            <div className="text-[7px] text-slate-500">Administrative Assistant</div>
          </div>
          
          <div>
            <div className="font-bold text-[6px] tracking-wider mb-2 text-slate-700">DETAILS</div>
            <div className="text-slate-500 space-y-1.5">
               <div>kelly.blackwell@example.com</div>
               <div>(210) 286-1624</div>
               <div>1685 N Commerce Island<br/>Pkwy, Weston, FL 33326</div>
            </div>
          </div>

          <div>
            <div className="font-bold text-[6px] tracking-wider mb-2 text-slate-700">SKILLS</div>
            <div className="text-slate-500 space-y-1.5">
               <div>Analytical Thinking</div>
               <div>Tolerant & Flexible</div>
               <div>Team Leadership</div>
               <div>Organization & Prioritization</div>
               <div>Strong Communication</div>
            </div>
          </div>
       </div>
       <div className="w-[65%] p-4 h-full flex flex-col gap-4">
          <div>
            <div className="font-bold text-[7px] tracking-wider mb-2 text-slate-800 border-b border-slate-200 pb-1">SUMMARY</div>
            <p className="text-slate-600 leading-relaxed">Administrative assistant with 9+ years of experience organizing presentations, preparing facility reports, and maintaining the utmost confidentiality. Possesses a B.A. in history and expertise in Microsoft Excel. Looking to leverage my wealth of knowledge and experience into the open administrative assistant role at your organization.</p>
          </div>
          
          <div>
            <div className="font-bold text-[7px] tracking-wider mb-2 text-slate-800 border-b border-slate-200 pb-1">EXPERIENCE</div>
            
            <div className="mb-4">
               <div className="text-[7px] font-bold text-slate-800 mb-0.5">Administrative Assistant</div>
               <div className="text-slate-500 italic mb-1.5">Bedford & Sons, Boston, MA</div>
               <ul className="list-none pl-1 text-slate-600 space-y-1">
                  <li className="flex gap-1"><span className="text-slate-300">-</span> Schedule and coordinate meetings, appointments, and travel arrangements for supervisors and managers.</li>
                  <li className="flex gap-1"><span className="text-slate-300">-</span> Trained 2 administrative assistants during a period of company expansion to ensure attention to detail.</li>
               </ul>
            </div>
            
            <div>
               <div className="text-[7px] font-bold text-slate-800 mb-0.5">Secretary</div>
               <div className="text-slate-500 italic mb-1.5">Bright Spot Ltd., Boston</div>
               <ul className="list-none pl-1 text-slate-600 space-y-1">
                  <li className="flex gap-1"><span className="text-slate-300">-</span> Typed documents such as correspondence, drafts, memos, and emails, and prepared 3 reports weekly.</li>
                  <li className="flex gap-1"><span className="text-slate-300">-</span> Opened, sorted, and distributed incoming messages and correspondence.</li>
               </ul>
            </div>
          </div>
       </div>
    </div>
  );
}

function HowardTemplate() {
  return (
    <div className="w-full h-full text-center bg-white text-[6px] sm:text-[7px] leading-tight overflow-hidden p-6 border border-slate-200 font-serif shadow-sm">
       <h2 className="text-[14px] sm:text-[16px] font-bold text-slate-900 uppercase mb-1 tracking-wide">Howard Jones</h2>
       <div className="text-slate-600 font-bold mb-3 text-[7px]">Lawyer</div>
       <div className="text-slate-500 mb-5 flex justify-center gap-2">
          <span>78 Yardley Road, San Francisco, CA 94133</span>
          <span>•</span>
          <span>howard.jones@gmail.com</span>
          <span>•</span>
          <span>(415) 555-2671</span>
       </div>
       
       <div className="font-bold text-[8px] text-slate-900 border-y border-slate-300 py-1.5 mb-3 uppercase tracking-wider">Summary</div>
       <p className="text-slate-700 text-left mb-5 px-3 leading-relaxed">Experienced and innovative Lawyer with a passion and dedication to justice. Highly organized, and skilled in public speaking. Bringing forth a proven track record of achieving favorable outcomes for clients. Adept in preparing for trials, reviewing documents, and effectively presenting cases in court. A strong leader who works well under pressure, and understands the complexities of the legal system.</p>

       <div className="font-bold text-[8px] text-slate-900 border-y border-slate-300 py-1.5 mb-3 uppercase tracking-wider">Experience</div>
       <div className="text-left px-3 mb-4">
          <div className="flex justify-between font-bold text-slate-800 mb-1.5">
             <span>Lawyer, Madison and Fletcher Attorneys at Law</span>
             <span className="font-normal text-slate-500">Nov 2018 — Jul 2023</span>
          </div>
          <ul className="list-disc pl-4 text-slate-700 space-y-1">
             <li>Performed adequate research to ensure a deep understanding of cases.</li>
             <li>Prepared legal documents without error and in a timely manner.</li>
             <li>Analyzed laws in relation to the situation of a client.</li>
          </ul>
       </div>
       
       <div className="text-left px-3">
          <div className="flex justify-between font-bold text-slate-800 mb-1.5">
             <span>Lawyer, Johnson & Levice, LLC</span>
             <span className="font-normal text-slate-500">Aug 2014 — Sep 2018</span>
          </div>
          <ul className="list-disc pl-4 text-slate-700 space-y-1">
             <li>Worked with clients to understand their circumstances and needs.</li>
             <li>Mediated disputes and sought to enforce the proper regulations.</li>
             <li>Counseled clients about the law and legal options.</li>
          </ul>
       </div>
    </div>
  );
}

function SamanthaTemplate() {
  return (
    <div className="w-full h-full bg-[#FAF9F6] text-[6px] sm:text-[7px] leading-tight overflow-hidden p-6 border border-slate-200 shadow-sm">
       <div className="flex gap-4 mb-5 border-b border-slate-200 pb-5">
          <div className="w-14 h-14 bg-slate-200 overflow-hidden rounded-sm shrink-0">
             <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex-grow pt-1">
             <h2 className="text-[14px] sm:text-[16px] font-serif text-slate-800 mb-1">Samantha Williams</h2>
             <div className="text-[7px] font-bold text-slate-500 mb-2">Senior Analyst</div>
             <div className="text-slate-400 space-y-1 flex gap-3">
                <span>New York, NY 10001</span>
                <span>•</span>
                <span>samantha.williams@example.com</span>
                <span>•</span>
                <span>(555) 789-1234</span>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-[1fr_2fr] gap-6">
          <div className="flex flex-col gap-5">
             <div>
               <div className="font-bold text-[7px] text-slate-800 border-b border-slate-300 pb-1 mb-2 tracking-widest uppercase">Summary</div>
               <div className="text-slate-600 leading-relaxed">Senior Analyst with 5+ years of experience in data analysis, business intelligence, and process optimization. Skilled in driving operational efficiency, forecasting, and leading data-driven strategies to support business decisions.</div>
             </div>
             <div>
               <div className="font-bold text-[7px] text-slate-800 border-b border-slate-300 pb-1 mb-2 tracking-widest uppercase">Skills</div>
               <div className="text-slate-600 space-y-1.5">
                  <div>• Project Management</div>
                  <div>• Data-driven Decision Making</div>
                  <div>• SQL & Excel</div>
                  <div>• Financial Analysis</div>
                  <div>• Business Intelligence tools</div>
               </div>
             </div>
          </div>
          <div className="flex flex-col gap-5">
             <div>
               <div className="font-bold text-[7px] text-slate-800 border-b border-slate-300 pb-1 mb-2 tracking-widest uppercase">Experience</div>
               
               <div className="mb-4">
                  <div className="flex justify-between font-bold text-slate-800 mb-0.5">
                     <span>Senior Analyst</span>
                     <span className="font-normal italic text-slate-500">Jan 2021 — Current</span>
                  </div>
                  <div className="text-slate-600 italic mb-1.5">Leam & Lamers Co. - New York, NY</div>
                  <ul className="text-slate-600 space-y-1.5 list-none pl-1">
                     <li className="flex gap-1"><span className="text-slate-300">-</span> Spearhead data analysis and reporting for key business functions, identifying trends and providing insights to improve company performance.</li>
                     <li className="flex gap-1"><span className="text-slate-300">-</span> Conduct in-depth market analysis and competitive benchmarking to inform strategic decisions.</li>
                  </ul>
               </div>
               
               <div>
                  <div className="flex justify-between font-bold text-slate-800 mb-0.5">
                     <span>Business Analyst</span>
                     <span className="font-normal italic text-slate-500">Jul 2017 — Dec 2020</span>
                  </div>
                  <div className="text-slate-600 italic mb-1.5">Willow & West Ltd. - New York, NY</div>
                  <ul className="text-slate-600 space-y-1.5 list-none pl-1">
                     <li className="flex gap-1"><span className="text-slate-300">-</span> Analyzed and interpreted large datasets to identify business opportunities and recommend process improvements.</li>
                  </ul>
               </div>
             </div>
          </div>
       </div>
    </div>
  );
}
