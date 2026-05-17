'use client';

import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { ArrowRight, CheckCircle, FileText, Download, Sparkles, MessageSquare } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F0F8FF] font-sans relative overflow-hidden">
      <Navbar />
      
      {/* Report Problem Tab */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 bg-[#3AB0FF] text-white py-4 px-2 rounded-l-lg shadow-lg flex flex-col items-center gap-2 cursor-pointer z-50 hover:bg-[#2A90DF] transition-colors">
        <span className="font-medium tracking-wide" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Report Problem</span>
        <MessageSquare size={20} className="mt-2" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-16 lg:pt-32 relative">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className="max-w-2xl z-10">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-slate-600 font-medium text-sm">
                <strong className="text-slate-800">49,398</strong> CVs created today
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-extrabold text-[#334155] mb-6 leading-[1.15]">
              Create your CV with an <br className="hidden lg:block"/>
              <span className="text-[#0096FF]">AI-powered CV maker</span>
            </h1>
            
            <p className="text-lg text-[#475569] mb-10 leading-relaxed max-w-[480px]">
              The first step to a better job? A better CV. Only 2% of CVs win, and yours will be one of them. Build it now!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link
                href="/resume/choose-template"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#00A3FF] text-white font-semibold rounded-lg hover:bg-[#008AE6] transition-all shadow-lg shadow-[#00A3FF]/20"
              >
                Create a New CV
              </Link>
              <Link
                href="/resume/choose-template"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-[#B3E0FF] text-[#00A3FF] font-semibold rounded-lg hover:bg-[#E6F5FF] transition-colors"
              >
                Improve My CV
              </Link>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-12 items-center sm:items-start text-center sm:text-left">
              <div>
                <div className="text-3xl font-bold text-[#10B981] mb-2 bg-[#E6F9F0] inline-block px-3 py-1 rounded">48%</div>
                <div className="text-[#64748B] text-sm">more likely to get hired</div>
              </div>
              <div className="w-px h-16 bg-[#CBD5E1] hidden sm:block"></div>
              <div>
                <div className="text-3xl font-bold text-[#F59E0B] mb-2 bg-[#FFF8E6] inline-block px-3 py-1 rounded">12%</div>
                <div className="text-[#64748B] text-sm">better pay with your next job</div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Visual */}
          <div className="relative hidden lg:block h-full min-h-[600px]">
            {/* The CV Mockup */}
            <div className="absolute right-12 top-1/2 -translate-y-[55%] w-[520px] bg-white rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] p-10 border border-slate-100 transform -rotate-1 z-0">
              
              {/* Header */}
              <div className="flex gap-5 mb-8">
                <div className="w-20 h-20 rounded overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow pt-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-2xl font-bold text-slate-800 tracking-tight">Samantha Williams</div>
                      <div className="text-sm font-medium text-slate-500 mt-0.5">Senior Analyst</div>
                    </div>
                    <div className="text-[10px] text-slate-600 font-bold flex items-center gap-1">
                      <span className="font-serif italic font-black text-blue-700">in</span> LinkedIn
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 mt-2">New York, NY 10001 <br/> (555) 789-1234</div>
                </div>
              </div>

              {/* Body Columns */}
              <div className="grid grid-cols-[1fr_2fr] gap-8">
                {/* Left Col */}
                <div>
                  <div className="text-[10px] font-bold text-slate-800 border-b border-slate-200 mb-3 pb-1 tracking-wider">SUMMARY</div>
                  <div className="text-[9px] text-slate-500 leading-[1.6] mb-6">
                    Senior Analyst with 5+ years of experience in data analysis, business intelligence, and process optimization. Skilled in driving operational efficiency, forecasting, and leading data-driven strategies to support business decisions and improvements.
                  </div>
                  
                  <div className="text-[10px] font-bold text-slate-800 border-b border-slate-200 mb-3 pb-1 tracking-wider">SKILLS</div>
                  <ul className="text-[9px] text-slate-500 leading-relaxed list-none space-y-1.5">
                    <li>• Project Management</li>
                    <li>• Data-driven Decision Making</li>
                    <li>• SQL & Excel</li>
                    <li>• Financial Analysis</li>
                    <li>• Business Intelligence tools</li>
                    <li>• Statistical Modeling</li>
                  </ul>
                </div>
                
                {/* Right Col */}
                <div>
                  <div className="text-[10px] font-bold text-slate-800 border-b border-slate-200 mb-3 pb-1 tracking-wider">EXPERIENCE</div>
                  
                  <div className="mb-5">
                    <div className="flex justify-between items-baseline mb-1">
                      <div className="text-[11px] font-bold text-slate-800">Senior Analyst</div>
                      <div className="text-[9px] text-slate-500 font-medium">Jan 2021 - Current</div>
                    </div>
                    <div className="text-[10px] text-slate-500 mb-2 italic">Leam & Lamers Co. - New York, NY</div>
                    <ul className="text-[9px] text-slate-500 leading-[1.6] list-none space-y-1.5 pl-1">
                      <li className="flex gap-1.5 items-start"><span className="text-slate-300">•</span> <span>Spearhead data analysis and reporting for key business functions.</span></li>
                      <li className="flex gap-1.5 items-start"><span className="text-slate-300">•</span> <span>Identifying trends and providing insights to improve company performance and profitability.</span></li>
                      <li className="flex gap-1.5 items-start"><span className="text-slate-300">•</span> <span>Conduct in-depth market analysis and competitive benchmarking to inform strategic decisions.</span></li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <div className="text-[11px] font-bold text-slate-800">Business Analyst</div>
                      <div className="text-[9px] text-slate-500 font-medium">Jul 2017 - Dec 2020</div>
                    </div>
                    <div className="text-[10px] text-slate-500 mb-2 italic">Willow & West Ltd. - New York, NY</div>
                    <ul className="text-[9px] text-slate-500 leading-[1.6] list-none space-y-1.5 pl-1">
                      <li className="flex gap-1.5 items-start"><span className="text-slate-300">•</span> <span>Analyzed and interpreted large datasets to identify business opportunities.</span></li>
                      <li className="flex gap-1.5 items-start"><span className="text-slate-300">•</span> <span>Created detailed financial models and dashboards to track key performance indicators.</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Color Picker */}
              <div className="absolute top-[25%] -left-6 bg-white rounded-full p-2.5 shadow-xl border border-slate-100 flex gap-2.5 pointer-events-auto">
                <button className="w-5 h-5 rounded-full bg-[#FFE5E5] border border-red-100"></button>
                <button className="w-5 h-5 rounded-full bg-[#E5F0FF] border border-blue-100"></button>
                <button className="w-5 h-5 rounded-full bg-[#E5F5E9] border border-green-100"></button>
                <button className="w-5 h-5 rounded-full bg-[#FFF5E5] border border-orange-100"></button>
                <button className="w-5 h-5 rounded-full bg-[#F1F5F9] border border-slate-200"></button>
              </div>

              {/* ATS Perfect Badge */}
              <div className="absolute top-[60%] -left-8 bg-[#E6F9F0] text-[#10B981] px-4 py-2 rounded-xl shadow-lg border border-[#A7F3D0] flex items-center gap-2 font-semibold text-sm pointer-events-auto z-10">
                <CheckCircle size={18} />
                ATS Perfect
              </div>

              {/* Download Buttons */}
              <div className="absolute top-0 right-4 flex flex-col gap-3 pointer-events-auto">
                <button className="bg-white p-2.5 rounded-xl shadow-lg border border-slate-100 text-red-400 hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center min-w-[48px]">
                  <FileText size={20} className="mb-0.5" />
                  <span className="text-[8px] font-bold">PDF</span>
                </button>
                <button className="bg-white p-2.5 rounded-xl shadow-lg border border-slate-100 text-[#00A3FF] hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center min-w-[48px]">
                  <FileText size={20} className="mb-0.5" />
                  <span className="text-[8px] font-bold">DOC</span>
                </button>
              </div>

              {/* AI Ideas Box */}
              <div className="absolute top-[65%] right-6 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-slate-100 p-5 w-[300px] pointer-events-auto z-20">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={18} className="text-[#00A3FF]" fill="#00A3FF" />
                  <span className="font-bold text-slate-800 text-sm">AI-powered ideas:</span>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-3 bg-[#F4F9FF] p-3 rounded-lg border border-[#E6F2FF]">
                    <div className="mt-0.5 bg-[#00A3FF] text-white rounded-full p-0.5 shrink-0 h-min"><ArrowRight size={14} /></div>
                    <p className="text-xs text-[#475569] leading-relaxed">Analyzed market trends to identify new growth opportunities.</p>
                  </div>
                  <div className="flex gap-3 bg-[#F4F9FF] p-3 rounded-lg border border-[#E6F2FF]">
                    <div className="mt-0.5 bg-[#00A3FF] text-white rounded-full p-0.5 shrink-0 h-min"><ArrowRight size={14} /></div>
                    <p className="text-xs text-[#475569] leading-relaxed">Reduced operational costs by 15% through process optimization.</p>
                  </div>
                </div>
              </div>
              
              {/* Sparkles around AI Box */}
              <div className="absolute top-[55%] right-6 pointer-events-none">
                 <Sparkles size={24} className="text-[#B3E0FF] absolute -left-6 -top-6 animate-pulse" fill="#B3E0FF" />
              </div>
            </div>

          </div>
        </div>

        {/* Logos Section */}
        <div className="mt-32 pt-10 flex flex-col md:flex-row items-center justify-between gap-8 w-full max-w-[1200px] mx-auto z-10 relative">
          <p className="text-[#475569] font-medium whitespace-nowrap">Our customers have been hired at:</p>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-12 gap-y-6 items-center w-full">
            <span className="text-2xl font-bold font-sans text-[#94A3B8] opacity-80">Google</span>
            <span className="text-2xl font-black italic text-[#94A3B8] opacity-80">DHL</span>
            <span className="text-xl font-bold text-[#94A3B8] opacity-80">Booking.com</span>
            <div className="flex items-center gap-1.5 opacity-80">
              <div className="w-5 h-5 rounded-full bg-[#94A3B8] flex items-center justify-center">
                 <div className="w-3 h-3 rounded-full bg-[#F0F8FF]"></div>
              </div>
              <span className="text-xl font-bold text-[#94A3B8]">Spotify</span>
            </div>
            <span className="text-2xl font-bold text-[#94A3B8] opacity-80">facebook</span>
            <span className="text-2xl font-bold text-[#94A3B8] opacity-80">amazon</span>
          </div>
        </div>

      </div>
    </div>
  );
}
