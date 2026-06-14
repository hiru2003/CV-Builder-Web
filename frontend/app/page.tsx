'use client';

import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { 
  ArrowRight, FileText, Sparkles, MessageSquare, 
  FolderOpen, Edit3, DownloadCloud, TrendingUp, Star, CheckCircle, Briefcase, GraduationCap, Code
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans relative overflow-hidden">
      
      {/* Custom Animations defined here to avoid tailwind config changes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-main-fade {
          from { opacity: 0; transform: translateY(-50%) translateX(80px); }
          to { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
        @keyframes slide-in-cv1-fade {
          from { opacity: 0; transform: translateY(-50%) translateX(100px); }
          to { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
        @keyframes slide-in-cv2-fade {
          from { opacity: 0; transform: translateY(-50%) translateX(60px); }
          to { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float 6s ease-in-out infinite; animation-delay: 3s; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; opacity: 0; }
        .animate-pulse-soft { animation: pulse-soft 3s ease-in-out infinite; }
        
        .animate-slide-in-main { animation: slide-in-main-fade 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-in-cv1 { animation: slide-in-cv1-fade 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-in-cv2 { animation: slide-in-cv2-fade 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        .cv-main-inner {
          transform: scale(0.6) rotate(-2deg);
          transform-origin: right center;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease;
        }
        .cv-main-inner:hover {
          transform: scale(0.64) rotate(0deg);
          box-shadow: 0 45px 90px -15px rgba(0, 163, 255, 0.3);
        }

        .cv-1-inner {
          transform: scale(0.5) rotate(-12deg);
          transform-origin: right center;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cv-1-inner:hover {
          transform: scale(0.55) rotate(-8deg);
        }

        .cv-2-inner {
          transform: scale(0.55) rotate(6deg);
          transform-origin: right center;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cv-2-inner:hover {
          transform: scale(0.6) rotate(3deg);
        }
        
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }
      `}} />

      <Navbar />
      
      {/* Report Problem Tab */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 bg-[#3AB0FF] text-white py-4 px-2 rounded-l-lg shadow-lg flex flex-col items-center gap-2 cursor-pointer z-50 hover:bg-[#2A90DF] transition-colors hover:pr-4 group duration-300">
        <span className="font-medium tracking-wide" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Report Problem</span>
        <MessageSquare size={20} className="mt-2 group-hover:scale-110 transition-transform" />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-20 lg:pt-32 relative">
        {/* Background glow effects */}
        <div className="absolute top-20 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-20 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className="max-w-2xl z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center gap-2 mb-8 animate-fade-in-up delay-100">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-slate-600 font-medium text-sm border border-slate-200 px-3 py-1 rounded-full bg-slate-50 shadow-sm">
                <strong className="text-slate-900">49,398</strong> resumes created today
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-[#1E293B] mb-6 leading-[1.1] tracking-tight animate-fade-in-up delay-200">
              Create your CV with an <br className="hidden lg:block"/>
              <span className="bg-gradient-to-r from-[#00A3FF] to-[#00F0FF] bg-clip-text text-transparent pb-2 inline-block">
                AI-powered CV maker
              </span>
            </h1>
            
            <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-[500px] mx-auto lg:mx-0 animate-fade-in-up delay-300">
              The first step to a better job? A better CV. Only 2% of CVs win interviews, and yours will be one of them. Build it now!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in-up delay-400">
              <Link
                href="/resume/choose-template?new=true"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#00A3FF] to-[#008AE6] text-white font-bold text-lg rounded-xl hover:shadow-[0_0_30px_rgba(0,163,255,0.4)] transition-all transform hover:-translate-y-1 group"
              >
                Create My CV Now 
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                href="/resume/choose-template?new=true"
                className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold text-lg rounded-xl hover:border-[#00A3FF] hover:text-[#00A3FF] transition-all"
              >
                View Templates
              </Link>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-12 items-center sm:items-start text-center sm:text-left animate-fade-in-up delay-500">
              <div className="group cursor-default">
                <div className="text-3xl font-black text-[#10B981] mb-2 inline-flex items-center gap-1 group-hover:scale-105 transition-transform">
                  48% <TrendingUp size={24} strokeWidth={3} />
                </div>
                <div className="text-slate-500 font-medium">more likely to get hired</div>
              </div>
              <div className="w-px h-16 bg-slate-200 hidden sm:block"></div>
              <div className="group cursor-default">
                <div className="text-3xl font-black text-[#F59E0B] mb-2 inline-flex items-center gap-1 group-hover:scale-105 transition-transform">
                  12% <TrendingUp size={24} strokeWidth={3} />
                </div>
                <div className="text-slate-500 font-medium">better pay with your next job</div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Visual Mockup */}
          <div className="relative hidden lg:block h-full min-h-[700px] w-full perspective-1000">
            
            {/* Background CV 1 (Minimalist Stacked) */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 z-0 w-[550px] h-[780px] origin-right animate-slide-in-cv1 opacity-0" style={{ animationDelay: '200ms' }}>
              <div className="w-full h-full animate-float-delayed">
                <div className="cv-1-inner w-full h-full bg-slate-50 shadow-xl border border-slate-200 opacity-60 rounded-sm p-12 flex flex-col gap-8">
                  <div className="flex gap-6 items-center border-b-2 border-slate-200 pb-8">
                     <div className="w-24 h-24 bg-slate-300 rounded-full"></div>
                     <div>
                       <div className="w-56 h-8 bg-slate-300 rounded mb-4"></div>
                       <div className="w-40 h-5 bg-slate-200 rounded"></div>
                     </div>
                  </div>
                  <div className="space-y-5 mt-4">
                    <div className="w-full h-4 bg-slate-200 rounded"></div>
                    <div className="w-5/6 h-4 bg-slate-200 rounded"></div>
                    <div className="w-full h-4 bg-slate-200 rounded"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-10 mt-10">
                    <div className="space-y-5">
                      <div className="w-32 h-5 bg-slate-300 rounded mb-8"></div>
                      <div className="w-full h-4 bg-slate-200 rounded"></div>
                      <div className="w-4/5 h-4 bg-slate-200 rounded"></div>
                      <div className="w-full h-4 bg-slate-200 rounded mt-6"></div>
                      <div className="w-3/4 h-4 bg-slate-200 rounded"></div>
                    </div>
                    <div className="space-y-5">
                      <div className="w-32 h-5 bg-slate-300 rounded mb-8"></div>
                      <div className="w-full h-4 bg-slate-200 rounded"></div>
                      <div className="w-5/6 h-4 bg-slate-200 rounded"></div>
                      <div className="w-full h-4 bg-slate-200 rounded mt-6"></div>
                      <div className="w-4/5 h-4 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background CV 2 (Creative Stacked) */}
            <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 z-0 w-[550px] h-[780px] origin-right animate-slide-in-cv2 opacity-0" style={{ animationDelay: '400ms' }}>
              <div className="w-full h-full animate-float">
                <div className="cv-2-inner w-full h-full bg-white shadow-xl border border-slate-200 opacity-80 flex rounded-sm overflow-hidden">
                  <div className="w-1/3 bg-[#00A3FF] h-full p-8 flex flex-col items-center">
                     <div className="w-24 h-24 bg-white/20 rounded-full mb-10 mt-8"></div>
                     <div className="space-y-4 w-full">
                       <div className="w-full h-3 bg-white/30 rounded"></div>
                       <div className="w-4/5 h-3 bg-white/30 rounded"></div>
                       <div className="w-full h-3 bg-white/30 rounded mt-10"></div>
                       <div className="w-3/4 h-3 bg-white/30 rounded"></div>
                       <div className="w-5/6 h-3 bg-white/30 rounded"></div>
                     </div>
                  </div>
                  <div className="w-2/3 p-10 mt-8">
                     <div className="w-48 h-8 bg-slate-800 rounded mb-4"></div>
                     <div className="w-32 h-5 bg-slate-300 rounded mb-12"></div>
                     <div className="space-y-5 mb-12">
                        <div className="w-full h-4 bg-slate-200 rounded"></div>
                        <div className="w-full h-4 bg-slate-200 rounded"></div>
                        <div className="w-3/4 h-4 bg-slate-200 rounded"></div>
                     </div>
                     <div className="space-y-5">
                        <div className="w-32 h-5 bg-slate-300 rounded mb-6"></div>
                        <div className="w-full h-4 bg-slate-200 rounded"></div>
                        <div className="w-5/6 h-4 bg-slate-200 rounded"></div>
                     </div>
                  </div>
                </div>
              </div>
            </div>

            {/* The Main CV Document (Scaled to fit) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-[600px] h-[848px] origin-right animate-slide-in-main opacity-0">
              <div className="w-full h-full animate-float">
                <div className="cv-main-inner w-full h-full bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border border-slate-100 rounded-sm">
                  
                  {/* CV Header: Executive Style */}
                  <div className="bg-[#1E293B] text-white p-10 flex justify-between items-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                    <div className="z-10">
                      <h2 className="text-5xl font-black tracking-tighter mb-2 uppercase text-white">Alexander<br/><span className="text-[#00A3FF]">Wright</span></h2>
                      <div className="text-xl font-medium tracking-widest text-slate-300 uppercase">Senior Full-Stack Engineer</div>
                    </div>
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#00A3FF] shadow-lg z-10 bg-slate-800">
                      <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80" alt="Professional" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* CV Body Grid */}
                  <div className="grid grid-cols-[1fr_2.5fr] h-[calc(100%-192px)]">
                    
                    {/* Left Sidebar */}
                    <div className="bg-slate-50 p-8 border-r border-slate-100 h-full flex flex-col gap-8">
                      {/* Contact */}
                      <div>
                        <div className="text-xs font-bold text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 pb-2 mb-4">Contact</div>
                        <ul className="text-sm text-slate-600 space-y-3 font-medium">
                          <li>alex.wright@email.com</li>
                          <li>+1 (415) 555-0198</li>
                          <li>San Francisco, CA</li>
                          <li className="text-[#00A3FF]">linkedin.com/in/alexw</li>
                          <li className="text-[#00A3FF]">github.com/alexwright</li>
                        </ul>
                      </div>

                      {/* Skills */}
                      <div>
                        <div className="text-xs font-bold text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 pb-2 mb-4">Core Skills</div>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-[#1E293B] text-white px-3 py-1.5 rounded-md text-xs font-semibold shadow-sm">React/Next.js</span>
                          <span className="bg-[#1E293B] text-white px-3 py-1.5 rounded-md text-xs font-semibold shadow-sm">TypeScript</span>
                          <span className="bg-[#1E293B] text-white px-3 py-1.5 rounded-md text-xs font-semibold shadow-sm">Node.js</span>
                          <span className="bg-[#1E293B] text-white px-3 py-1.5 rounded-md text-xs font-semibold shadow-sm">Python</span>
                          <span className="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-md text-xs font-semibold">AWS/Docker</span>
                          <span className="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-md text-xs font-semibold">PostgreSQL</span>
                          <span className="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-md text-xs font-semibold">System Design</span>
                        </div>
                      </div>

                      {/* Education */}
                      <div>
                        <div className="text-xs font-bold text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 pb-2 mb-4">Education</div>
                        <div className="mb-4">
                          <div className="text-sm font-bold text-slate-800">M.S. Computer Science</div>
                          <div className="text-xs text-[#00A3FF] font-medium mb-1">Stanford University</div>
                          <div className="text-xs text-slate-500 italic">2014 - 2016</div>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-800">B.S. Software Engineering</div>
                          <div className="text-xs text-[#00A3FF] font-medium mb-1">MIT</div>
                          <div className="text-xs text-slate-500 italic">2010 - 2014</div>
                        </div>
                      </div>
                    </div>

                    {/* Right Main Content */}
                    <div className="p-8 h-full bg-white flex flex-col gap-8">
                      {/* Profile */}
                      <div>
                        <div className="flex items-center gap-2 text-lg font-bold text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 pb-2 mb-4">
                          <span className="text-[#00A3FF]"><Star size={20} fill="currentColor" /></span>
                          Professional Profile
                        </div>
                        <p className="text-[15px] text-slate-600 leading-relaxed text-justify">
                          Results-driven Senior Full-Stack Engineer with over 8 years of experience architecting scalable web applications and distributed systems. Proven track record of leading high-performance engineering teams, optimizing cloud infrastructure, and delivering mission-critical enterprise solutions that drive business growth.
                        </p>
                      </div>

                      {/* Experience */}
                      <div>
                        <div className="flex items-center gap-2 text-lg font-bold text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 pb-2 mb-6">
                          <span className="text-[#00A3FF]"><Briefcase size={20} /></span>
                          Work Experience
                        </div>
                        
                        {/* Job 1 */}
                        <div className="mb-6 relative">
                          <div className="absolute -left-3 top-2 w-2 h-2 rounded-full bg-[#00A3FF]"></div>
                          <div className="pl-4 border-l-2 border-slate-100">
                            <div className="flex justify-between items-baseline mb-1">
                              <h3 className="text-lg font-bold text-slate-800">Lead Engineering Manager</h3>
                              <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">2020 - Present</span>
                            </div>
                            <div className="text-base font-semibold text-[#00A3FF] mb-3">TechCorp Solutions • San Francisco</div>
                            <ul className="space-y-2 text-[14px] text-slate-600 list-disc list-inside">
                              <li>Spearheaded the migration of a legacy monolith to a microservices architecture, improving system uptime by 99.99%.</li>
                              <li>Managed a cross-functional team of 12 engineers, fostering an agile culture and reducing deployment cycles by 40%.</li>
                              <li>Architected a real-time data processing pipeline using Kafka and AWS Lambda, handling 1M+ events per minute.</li>
                            </ul>
                          </div>
                        </div>

                        {/* Job 2 */}
                        <div className="relative">
                          <div className="absolute -left-3 top-2 w-2 h-2 rounded-full bg-[#00A3FF]"></div>
                          <div className="pl-4 border-l-2 border-slate-100">
                            <div className="flex justify-between items-baseline mb-1">
                              <h3 className="text-lg font-bold text-slate-800">Senior Full-Stack Developer</h3>
                              <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">2016 - 2020</span>
                            </div>
                            <div className="text-base font-semibold text-[#00A3FF] mb-3">Innovate Systems • Austin, TX</div>
                            <ul className="space-y-2 text-[14px] text-slate-600 list-disc list-inside">
                              <li>Developed a highly interactive enterprise dashboard using React and Redux, adopted by 50+ Fortune 500 clients.</li>
                              <li>Optimized database queries in PostgreSQL, reducing average API response times from 1.2s to 200ms.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Projects */}
                      <div>
                        <div className="flex items-center gap-2 text-lg font-bold text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 pb-2 mb-4">
                          <span className="text-[#00A3FF]"><Code size={20} /></span>
                          Key Projects
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <div className="font-bold text-slate-800 mb-1">NexusFlow CRM</div>
                            <div className="text-[13px] text-slate-600">Built a multi-tenant SaaS CRM scaling to 10k active users using Next.js and Supabase.</div>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <div className="font-bold text-slate-800 mb-1">AI Data Parser</div>
                            <div className="text-[13px] text-slate-600">Implemented an OpenAI-powered document parser saving 500+ manual hours monthly.</div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating UI Elements */}
            <div className="absolute inset-0 pointer-events-none z-20">
              
              {/* ATS Perfect Badge (Floats on bottom left) */}
              <div className="absolute bottom-[20%] -left-12 bg-white text-slate-800 p-4 rounded-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.2)] border border-slate-100 flex items-center gap-4 animate-float">
                <div className="bg-[#E6F9F0] p-3 rounded-full">
                  <CheckCircle size={28} className="text-[#10B981]" />
                </div>
                <div>
                  <div className="text-lg font-black leading-tight">ATS Perfect</div>
                  <div className="text-sm text-slate-500 font-medium">100% Score</div>
                </div>
              </div>


              {/* Color Picker (Floats on left middle) */}
              <div className="absolute top-[40%] -left-16 bg-white rounded-full p-3 shadow-xl border border-slate-100 flex flex-col gap-3 animate-float delay-500">
                <div className="w-6 h-6 rounded-full bg-[#1E293B] border-2 border-white shadow-[0_0_0_2px_#00A3FF]"></div>
                <div className="w-6 h-6 rounded-full bg-[#00A3FF] hover:scale-110 transition-transform"></div>
                <div className="w-6 h-6 rounded-full bg-[#10B981] hover:scale-110 transition-transform"></div>
                <div className="w-6 h-6 rounded-full bg-[#F59E0B] hover:scale-110 transition-transform"></div>
              </div>

            </div>

          </div>
        </div>

        {/* Logos Section */}
        <div className="mt-20 pt-10 border-t border-slate-200/60 flex flex-col md:flex-row items-center justify-between gap-8 w-full max-w-[1200px] mx-auto z-10 relative animate-fade-in-up delay-600">
          <p className="text-slate-500 font-bold tracking-wide uppercase text-sm text-center md:text-left whitespace-normal sm:whitespace-nowrap">Our customers have been hired at:</p>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-12 gap-y-6 items-center w-full grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-7 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" alt="Meta" className="h-5 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="h-6 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-7 object-contain mt-2" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" alt="Spotify" className="h-8 object-contain" />
          </div>
        </div>
      </section>

      {/* --- TIMELINE SECTION: Create your job-winning CV --- */}
      <section className="py-24 max-w-[1300px] mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-center">
          
          {/* Left Visual: CV Mockups */}
          <div className="bg-[#EBF5FF] rounded-[40px] p-8 md:p-12 relative min-h-[550px] flex items-center justify-center">
            
            {/* Scribble SVG Decoration */}
            <svg className="absolute top-10 right-10 w-16 h-16 text-slate-400 opacity-60" viewBox="0 0 100 100" fill="none">
              <path d="M10 90 L30 50 L50 70 L90 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M70 10 L90 10 L90 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            {/* Background Minimal CV */}
            <div className="hidden sm:block absolute left-12 top-12 w-[65%] aspect-[1/1.4] bg-white rounded-lg shadow-sm border border-slate-100 p-6 opacity-70 transform -rotate-3 transition-transform hover:-rotate-6">
              <div className="flex gap-3 mb-6">
                <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                <div>
                  <div className="w-24 h-3 bg-slate-300 rounded mb-2"></div>
                  <div className="w-16 h-2 bg-slate-200 rounded"></div>
                </div>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded mb-2"></div>
              <div className="w-4/5 h-1.5 bg-slate-100 rounded mb-6"></div>
              
              <div className="w-20 h-2 bg-slate-300 rounded mb-4"></div>
              <div className="w-full h-1.5 bg-slate-100 rounded mb-2"></div>
              <div className="w-full h-1.5 bg-slate-100 rounded mb-2"></div>
              <div className="w-3/4 h-1.5 bg-slate-100 rounded mb-6"></div>
            </div>

            {/* Foreground Main CV */}
            <div className="relative w-[90%] sm:w-[75%] aspect-[1/1.4] bg-white rounded-lg shadow-2xl border border-slate-100 overflow-hidden z-10 transform translate-x-0 sm:translate-x-8 translate-y-0 sm:translate-y-8 flex">
                         {/* Left Sidebar */}
              <div className="w-[32%] bg-[#1E293B] text-white p-2 flex flex-col justify-start gap-1.5 shrink-0">
                {/* Photo / Avatar Placeholder */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00A3FF] to-[#00F0FF] mx-auto border border-white/20 shadow-sm flex items-center justify-center font-bold text-[8px]">
                  JS
                </div>
                
                {/* Contact Info */}
                <div className="space-y-0.5">
                  <div className="text-[5.5px] font-extrabold tracking-widest text-[#00A3FF] uppercase border-b border-white/10 pb-0.2 mb-0.5 text-center">Contact</div>
                  <p className="text-[4.5px] text-slate-355 truncate">jessie@email.com</p>
                  <p className="text-[4.5px] text-slate-355">+1 (555) 123-4567</p>
                  <p className="text-[4.5px] text-slate-355">New York, NY</p>
                  <p className="text-[4.5px] text-slate-355 truncate">linkedin.com/in/jessie</p>
                  <p className="text-[4.5px] text-slate-355 truncate">github.com/jessie-hr</p>
                </div>
                
                {/* Core Strengths */}
                <div className="space-y-0.5">
                  <div className="text-[5.5px] font-extrabold tracking-widest text-[#00A3FF] uppercase border-b border-white/10 pb-0.2 mb-0.5 text-center">Strengths</div>
                  <p className="text-[4.5px] text-slate-355 leading-tight">• Talent Acquisition</p>
                  <p className="text-[4.5px] text-slate-355 leading-tight">• Employee Relations</p>
                  <p className="text-[4.5px] text-slate-355 leading-tight">• HR Compliance</p>
                  <p className="text-[4.5px] text-slate-355 leading-tight">• Diversity & Inclusion</p>
                </div>
                
                {/* Skills Pills */}
                <div className="space-y-0.5">
                  <div className="text-[5.5px] font-extrabold tracking-widest text-[#00A3FF] uppercase border-b border-white/10 pb-0.2 mb-0.5 text-center">Skills</div>
                  <div className="flex flex-wrap gap-0.5 justify-center">
                    <span className="bg-white/10 text-white px-0.8 py-0.1 rounded text-[3.8px] font-bold">Recruiting</span>
                    <span className="bg-white/10 text-white px-0.8 py-0.1 rounded text-[3.8px] font-bold">HRIS / ATS</span>
                    <span className="bg-white/10 text-white px-0.8 py-0.1 rounded text-[3.8px] font-bold">Compliance</span>
                    <span className="bg-white/10 text-white px-0.8 py-0.1 rounded text-[3.8px] font-bold">Relations</span>
                    <span className="bg-white/10 text-white px-0.8 py-0.1 rounded text-[3.8px] font-bold">Onboarding</span>
                    <span className="bg-white/10 text-white px-0.8 py-0.1 rounded text-[3.8px] font-bold">Agile HR</span>
                    <span className="bg-white/10 text-white px-0.8 py-0.1 rounded text-[3.8px] font-bold">Payroll</span>
                    <span className="bg-white/10 text-white px-0.8 py-0.1 rounded text-[3.8px] font-bold">Strategy</span>
                    <span className="bg-white/10 text-white px-0.8 py-0.1 rounded text-[3.8px] font-bold">Analytics</span>
                  </div>
                </div>

                {/* Software / Tools */}
                <div className="space-y-0.5">
                  <div className="text-[5.5px] font-extrabold tracking-widest text-[#00A3FF] uppercase border-b border-white/10 pb-0.2 mb-0.5 text-center">Software</div>
                  <div className="flex flex-wrap gap-0.5 justify-center">
                    <span className="bg-[#2D3748] text-slate-200 px-0.8 py-0.1 rounded text-[3.8px] font-medium">Workday</span>
                    <span className="bg-[#2D3748] text-slate-200 px-0.8 py-0.1 rounded text-[3.8px] font-medium">Lever</span>
                    <span className="bg-[#2D3748] text-slate-200 px-0.8 py-0.1 rounded text-[3.8px] font-medium">Greenhouse</span>
                    <span className="bg-[#2D3748] text-slate-200 px-0.8 py-0.1 rounded text-[3.8px] font-medium">ADP</span>
                    <span className="bg-[#2D3748] text-slate-200 px-0.8 py-0.1 rounded text-[3.8px] font-medium">Jira</span>
                  </div>
                </div>

                {/* Certifications */}
                <div className="space-y-0.5">
                  <div className="text-[5.5px] font-extrabold tracking-widest text-[#00A3FF] uppercase border-b border-white/10 pb-0.2 mb-0.5 text-center">Certificates</div>
                  <p className="text-[4.5px] text-slate-200 font-bold leading-tight">SHRM-CP • 2020</p>
                  <p className="text-[4.5px] text-slate-200 font-bold leading-tight">PHR Cert. • 2018</p>
                </div>

                {/* Education */}
                <div className="space-y-0.5">
                  <div className="text-[5.5px] font-extrabold tracking-widest text-[#00A3FF] uppercase border-b border-white/10 pb-0.2 mb-0.5 text-center">Education</div>
                  <p className="text-[4.5px] text-slate-200 font-bold leading-tight">B.S. Business Admin</p>
                  <p className="text-[4px] text-slate-400">Univ. of Texas • GPA 3.8</p>
                  <p className="text-[4.5px] text-slate-200 font-bold leading-tight mt-0.5">M.S. Human Resources</p>
                  <p className="text-[4px] text-slate-400">NYU • GPA 3.9</p>
                </div>

                {/* Languages */}
                <div className="space-y-0.5">
                  <div className="text-[5.5px] font-extrabold tracking-widest text-[#00A3FF] uppercase border-b border-white/10 pb-0.2 mb-0.5 text-center">Languages</div>
                  <p className="text-[4.5px] text-slate-355 font-bold text-center leading-tight">English (Native)</p>
                  <p className="text-[4.5px] text-slate-355 font-bold text-center leading-tight">Spanish (Fluent)</p>
                </div>

                {/* Interests */}
                <div className="space-y-0.5">
                  <div className="text-[5.5px] font-extrabold tracking-widest text-[#00A3FF] uppercase border-b border-white/10 pb-0.2 mb-0.5 text-center">Interests</div>
                  <p className="text-[4.5px] text-slate-400 text-center leading-tight">Tech Trends • Running • Mentoring</p>
                </div>
              </div>
              
              {/* Right Content Column */}
              <div className="flex-1 p-3 flex flex-col justify-start gap-1.5 bg-white text-left overflow-hidden">
                {/* Header */}
                <div className="border-b border-slate-100 pb-0.5">
                  <h3 className="text-xs font-extrabold text-[#1E293B] tracking-tight leading-none mb-0.5">Jessie Smith</h3>
                  <p className="text-[7px] font-extrabold text-[#00A3FF] uppercase tracking-wider">Human Resource Manager</p>
                </div>
                
                {/* Summary */}
                <div>
                  <h4 className="text-[6px] font-extrabold text-slate-800 uppercase tracking-widest mb-0.5">Professional Summary</h4>
                  <p className="text-[5px] text-slate-500 leading-normal text-justify">
                    Dynamic, SHRM-certified HR Manager with 8+ years of experience directing full-cycle recruitment, optimizing automated onboarding pipelines, and managing labor compliance standards. Proven track record of boosting retention and driving organizational excellence.
                  </p>
                </div>
                
                {/* Work Experience */}
                <div className="flex flex-col gap-1">
                  <h4 className="text-[6px] font-extrabold text-slate-800 uppercase tracking-widest mb-0.5">Work Experience</h4>
                  
                  {/* Job 1 */}
                  <div className="relative pl-2 border-l border-slate-150">
                    <div className="absolute -left-[3.5px] top-1 w-1.5 h-1.5 rounded-full bg-[#00A3FF]"></div>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="text-[6px] font-bold text-slate-800">Human Resource Manager</span>
                      <span className="text-[4.5px] font-semibold text-slate-400">2019 - Present</span>
                    </div>
                    <p className="text-[5px] font-bold text-[#00A3FF] mb-0.5">Jim's Widget Factory • Plano, TX</p>
                    <ul className="text-[4.8px] text-slate-500 list-disc list-inside space-y-0.2 leading-tight">
                      <li>Revamped onboarding protocols, raising 90-day retention by 22%.</li>
                      <li>Spearheaded integration of Lever ATS, cutting time-to-hire by 35%.</li>
                      <li>Resolved labor relations grievances and oversaw payroll compliance for 200+ staff.</li>
                      <li>Administered employee performance appraisals and compensation reviews.</li>
                    </ul>
                  </div>

                  {/* Job 2 */}
                  <div className="relative pl-2 border-l border-slate-150">
                    <div className="absolute -left-[3.5px] top-1 w-1.5 h-1.5 rounded-full bg-[#00A3FF]"></div>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="text-[6px] font-bold text-slate-800">Junior HR Generalist</span>
                      <span className="text-[4.5px] font-semibold text-slate-400">2016 - 2019</span>
                    </div>
                    <p className="text-[5px] font-bold text-[#00A3FF] mb-0.5">Innovate Systems • Austin, TX</p>
                    <ul className="text-[4.8px] text-slate-500 list-disc list-inside space-y-0.2 leading-tight">
                      <li>Administered monthly payroll processing, benefits, and HR audit compliance records.</li>
                      <li>Coordinated performance reviews and onboarding seminars for 150+ staff.</li>
                    </ul>
                  </div>

                  {/* Job 3 */}
                  <div className="relative pl-2 border-l border-slate-150">
                    <div className="absolute -left-[3.5px] top-1 w-1.5 h-1.5 rounded-full bg-[#00A3FF]"></div>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="text-[6px] font-bold text-slate-800">HR Assistant</span>
                      <span className="text-[4.5px] font-semibold text-slate-400">2014 - 2016</span>
                    </div>
                    <p className="text-[5px] font-bold text-[#00A3FF] mb-0.5">Apex Retail Corp • Dallas, TX</p>
                    <ul className="text-[4.8px] text-slate-500 list-disc list-inside space-y-0.2 leading-tight">
                      <li>Maintained employee databases and screened candidate resumes.</li>
                      <li>Coordinated interview schedules and processed background checks.</li>
                    </ul>
                  </div>
                </div>
                
                {/* Projects */}
                <div>
                  <h4 className="text-[6px] font-extrabold text-slate-800 uppercase tracking-widest mb-0.5">Key Projects</h4>
                  <div className="grid grid-cols-3 gap-1.5">
                    <div>
                      <span className="text-[5.5px] font-bold text-slate-700 block">HR Portal Launch</span>
                      <span className="text-[4.8px] text-slate-500 block leading-tight">Designed digital directory saving 20+ hours of manual updates weekly.</span>
                    </div>
                    <div>
                      <span className="text-[5.5px] font-bold text-slate-700 block">ATS Migration</span>
                      <span className="text-[4.8px] text-slate-500 block leading-tight">Unified databases across 4 state offices, reducing fees by 15%.</span>
                    </div>
                    <div>
                      <span className="text-[5.5px] font-bold text-slate-700 block">Compliance Audit</span>
                      <span className="text-[4.8px] text-slate-500 block leading-tight">Overhauled audit protocols to achieve zero-penalty labor checks.</span>
                    </div>
                  </div>
                </div>

                {/* Publications & Affiliations */}
                <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-1">
                  <div>
                    <h4 className="text-[6px] font-extrabold text-slate-800 uppercase tracking-widest mb-0.5">Publications</h4>
                    <span className="text-[5.5px] font-bold text-slate-700 block">Recruiting Trends 2024</span>
                    <span className="text-[4.8px] text-slate-500 block leading-tight">Keynote speaker at National NY HR Conference.</span>
                  </div>
                  <div>
                    <h4 className="text-[6px] font-extrabold text-slate-800 uppercase tracking-widest mb-0.5">Affiliations</h4>
                    <span className="text-[5.5px] font-bold text-slate-700 block">SHRM Board Member</span>
                    <span className="text-[4.8px] text-slate-500 block leading-tight">Member of National HR Recruiters Association.</span>
                  </div>
                </div>

                {/* Honors & Volunteering */}
                <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-1">
                  <div>
                    <h4 className="text-[6px] font-extrabold text-slate-800 uppercase tracking-widest mb-0.5">Honors & Awards</h4>
                    <span className="text-[5.5px] font-bold text-slate-700 block">SHRM Excellence Award</span>
                    <span className="text-[4.8px] text-slate-500 block leading-tight">Recruiter of the Year nominee (2021).</span>
                  </div>
                  <div>
                    <h4 className="text-[6px] font-extrabold text-slate-800 uppercase tracking-widest mb-0.5">Leadership</h4>
                    <span className="text-[5.5px] font-bold text-slate-700 block">UT Career Mentor</span>
                    <span className="text-[4.8px] text-slate-500 block leading-tight">Volunteer career adviser for UT Network.</span>
                  </div>
                </div>

                {/* Professional Development */}
                <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-1">
                  <div>
                    <h4 className="text-[6px] font-extrabold text-slate-800 uppercase tracking-widest mb-0.5">Training</h4>
                    <span className="text-[5.5px] font-bold text-slate-700 block">Agile HR Leadership</span>
                    <span className="text-[4.8px] text-slate-500 block leading-tight">Agile Alliance certificate course (2023).</span>
                  </div>
                  <div>
                    <h4 className="text-[6px] font-extrabold text-slate-800 uppercase tracking-widest mb-0.5">Conferences</h4>
                    <span className="text-[5.5px] font-bold text-slate-700 block">HR Tech Expo 2025</span>
                    <span className="text-[4.8px] text-slate-500 block leading-tight">Panel speaker on AI recruitment tools.</span>
                  </div>
                </div>

                {/* References */}
                <div className="border-t border-slate-100 pt-1">
                  <h4 className="text-[6px] font-extrabold text-slate-800 uppercase tracking-widest mb-0.5">References</h4>
                  <p className="text-[4.8px] text-slate-500 leading-tight">
                    Professional and managerial references are available immediately upon request.
                  </p>
                </div>
              </div>
            </div>

            {/* Badge */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#2D3748] text-white px-4 py-3 sm:px-6 sm:py-4 rounded-2xl shadow-xl flex items-center gap-3 sm:gap-4 z-20 font-bold whitespace-nowrap border-4 border-white transform hover:-translate-y-1 transition-transform">
              <div className="bg-white/10 p-1.5 sm:p-2 rounded-lg text-[#00A3FF]">
                <TrendingUp size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-lg leading-tight">Get the job</span>
                <span className="text-[#00A3FF] text-sm sm:text-lg leading-tight">2x faster</span>
              </div>
            </div>

          </div>

          {/* Right Timeline */}
          <div className="pl-0 lg:pl-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2D3748] mb-12 leading-[1.2] tracking-tight text-center lg:text-left w-full">
              Create your job-winning <span className="text-[#00A3FF]">CV in<br className="hidden md:block"/> 3 simple steps</span>
            </h2>
            
            <div className="space-y-12 relative">
              {/* Dashed line */}
              <div className="absolute left-[27px] top-8 bottom-12 w-px border-l-2 border-dashed border-[#CBD5E1] z-0"></div>
              
              {/* Step 1 */}
              <div className="relative z-10 flex gap-6 md:gap-8 group cursor-default">
                <div className="w-14 h-14 bg-white border-2 border-[#CBD5E1] group-hover:border-[#00A3FF] rounded-full flex items-center justify-center shrink-0 transition-colors shadow-sm">
                  <FolderOpen size={24} className="text-[#64748B] group-hover:text-[#00A3FF] transition-colors" />
                </div>
                <div className="pt-1">
                  <div className="text-sm font-bold text-[#94A3B8] mb-2 tracking-wider">STEP 1</div>
                  <h3 className="text-2xl font-bold text-[#2D3748] mb-3">Choose a stylish template</h3>
                  <p className="text-[#64748B] leading-relaxed text-lg">Select one of the recruiter-approved CV templates designed specifically to always make it past the screening stage.</p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative z-10 flex gap-6 md:gap-8 group cursor-default">
                <div className="w-14 h-14 bg-white border-2 border-[#CBD5E1] group-hover:border-[#00A3FF] rounded-full flex items-center justify-center shrink-0 transition-colors shadow-sm">
                  <Edit3 size={24} className="text-[#64748B] group-hover:text-[#00A3FF] transition-colors" />
                </div>
                <div className="pt-1">
                  <div className="text-sm font-bold text-[#94A3B8] mb-2 tracking-wider">STEP 2</div>
                  <h3 className="text-2xl font-bold text-[#2D3748] mb-3">Customize each CV section</h3>
                  <p className="text-[#64748B] leading-relaxed text-lg">Add details about your experience, education, and skills with one click. Need more sections? We've got plenty.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex gap-6 md:gap-8 group cursor-default">
                <div className="w-14 h-14 bg-white border-2 border-[#CBD5E1] group-hover:border-[#00A3FF] rounded-full flex items-center justify-center shrink-0 transition-colors shadow-sm">
                  <DownloadCloud size={24} className="text-[#64748B] group-hover:text-[#00A3FF] transition-colors" />
                </div>
                <div className="pt-1">
                  <div className="text-sm font-bold text-[#94A3B8] mb-2 tracking-wider">STEP 3</div>
                  <h3 className="text-2xl font-bold text-[#2D3748] mb-3">Download your CV in seconds</h3>
                  <p className="text-[#64748B] leading-relaxed text-lg">You've saved hours on CV creation—now use that extra time to prepare for job interviews and shine on them.</p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-6 ml-0 sm:ml-20 flex justify-center sm:justify-start">
                <Link href="/resume/choose-template?new=true" className="inline-block px-8 py-4 sm:px-10 sm:py-5 bg-[#00A3FF] text-white font-bold text-lg rounded-xl hover:bg-[#008AE6] transition-colors shadow-lg shadow-[#00A3FF]/20 text-center">
                  Create My CV Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- REVIEWS SECTION: Trustpilot Style --- */}
      <section className="bg-[#F4FAFF] py-28">
        <div className="max-w-[1400px] mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-[#2D3748] mb-20 tracking-tight">
            What our customers are <span className="text-[#00A3FF]">saying about us</span>
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-start">
            
            {/* Left: Trustpilot summary */}
            <div className="w-full lg:w-[250px] flex flex-col items-center lg:items-start shrink-0 text-center lg:text-left">
              <div className="text-[40px] font-bold text-[#2D3748] mb-3 leading-none">4.5 out of 5</div>
              <div className="flex gap-1.5 mb-6 text-[#00B67A]">
                <Star className="fill-current" size={32} strokeWidth={1} />
                <Star className="fill-current" size={32} strokeWidth={1} />
                <Star className="fill-current" size={32} strokeWidth={1} />
                <Star className="fill-current" size={32} strokeWidth={1} />
                <div className="relative overflow-hidden w-[32px] h-[32px]">
                   <Star className="text-slate-300 absolute inset-0" size={32} strokeWidth={1} />
                   <div className="absolute inset-0 overflow-hidden w-[50%]">
                     <Star className="fill-[#00B67A] text-[#00B67A]" size={32} strokeWidth={1} />
                   </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xl font-bold text-[#2D3748] mb-2">
                <Star className="fill-[#00B67A] text-[#00B67A]" size={28} /> Trustpilot
              </div>
              <p className="text-sm text-slate-500">based on 3,112 reviews</p>
            </div>
            
            {/* Right: Reviews Row */}
            <div className="flex-1 w-full">
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {/* Review 1 */}
                <div className="flex flex-col">
                  <div className="flex gap-1 text-[#00B67A] mb-4">
                    <Star className="fill-current" size={18}/><Star className="fill-current" size={18}/><Star className="fill-current" size={18}/><Star className="fill-current" size={18}/><Star className="fill-current" size={18}/>
                  </div>
                  <h3 className="text-xl font-bold text-[#2D3748] mb-4">A great CV builder</h3>
                  <p className="text-[#334155] leading-relaxed mb-6 text-lg flex-grow">
                    I struggled to create a CV before and had no idea it needed to be optimized for hiring software. This tool fixed it, and now I finally have a job!
                  </p>
                  <div className="text-sm text-slate-400">Byron Moreno • about 16 hours ago</div>
                </div>

                {/* Review 2 */}
                <div className="flex flex-col">
                  <div className="flex gap-1 text-[#00B67A] mb-4">
                    <Star className="fill-current" size={18}/><Star className="fill-current" size={18}/><Star className="fill-current" size={18}/><Star className="fill-current" size={18}/><Star className="fill-current" size={18}/>
                  </div>
                  <h3 className="text-xl font-bold text-[#2D3748] mb-4">AI suggestions are on point!</h3>
                  <p className="text-[#334155] leading-relaxed mb-6 text-lg flex-grow">
                    Their AI suggestions improved my bullet points so much! My CV feels stronger, and I've already landed an interview.
                  </p>
                  <div className="text-sm text-slate-400">David Johnson • about 16 hours ago</div>
                </div>

                {/* Review 3 */}
                <div className="flex flex-col">
                  <div className="flex gap-1 text-[#00B67A] mb-4">
                    <Star className="fill-current" size={18}/><Star className="fill-current" size={18}/><Star className="fill-current" size={18}/><Star className="fill-current" size={18}/><Star className="fill-current" size={18}/>
                  </div>
                  <h3 className="text-xl font-bold text-[#2D3748] mb-4">Loved the AI features!</h3>
                  <p className="text-[#334155] leading-relaxed mb-6 text-lg flex-grow">
                    AI suggestions with relevant keywords made my bullet-points much more persuasive IMO. My ATS CV got me 3 interviews just this week!
                  </p>
                  <div className="text-sm text-slate-400">Sophia Miller • about 19 hours ago</div>
                </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00A3FF] opacity-50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#00A3FF]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#00A3FF] opacity-50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#00A3FF] opacity-50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#00A3FF] opacity-50"></div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION: Why use CV Builder --- */}
      <section className="py-28 max-w-[1300px] mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-[#2D3748] mb-20 tracking-tight">
          Why use CV Builder's CV builder?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Card 1: Pre-written text */}
          <div className="text-center group">
            <div className="bg-[#EBF5FF] h-64 rounded-3xl mb-8 relative flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:-translate-y-2">
              <div className="w-[140px] h-[190px] bg-white rounded shadow-lg p-3 transform rotate-3">
                <div className="text-[6px] font-bold text-center mb-1">Jessica Claire</div>
                <div className="h-0.5 bg-slate-200 w-full mb-3"></div>
                <div className="h-1 bg-slate-300 w-1/3 mb-1"></div>
                <div className="h-1 bg-slate-200 w-full mb-0.5"></div>
                <div className="h-1 bg-slate-200 w-full mb-0.5"></div>
                <div className="h-1 bg-slate-200 w-4/5 mb-4"></div>
                <div className="h-1 bg-slate-300 w-1/3 mb-1"></div>
                <div className="h-1 bg-slate-200 w-full mb-0.5"></div>
                <div className="h-1 bg-slate-200 w-3/4"></div>
              </div>
              <div className="absolute bottom-10 left-10 w-10 h-10 bg-[#00A3FF] rounded-full shadow-lg flex items-center justify-center transform -rotate-12 border-2 border-white">
                <Edit3 size={18} className="text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#2D3748] mb-3">Pre-written text & customization</h3>
            <p className="text-[15px] text-[#64748B] leading-relaxed">Skip the writing struggle and save time on content, formatting, and design.</p>
          </div>

          {/* Card 2: AI Suggestions */}
          <div className="text-center group">
            <div className="bg-[#EBF5FF] h-64 rounded-3xl mb-8 relative flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:-translate-y-2">
              <div className="w-[180px] bg-white rounded-xl shadow-lg p-4">
                <div className="text-[10px] font-bold text-slate-800 mb-1">Ideas Suggestion</div>
                <div className="text-[7px] text-slate-400 mb-3">Click the left-facing arrow icon to add bullet points...</div>
                
                <div className="flex gap-2 mb-2 items-start">
                  <div className="w-3 h-3 rounded-full bg-[#00A3FF] shrink-0 mt-0.5"></div>
                  <div className="h-2 bg-slate-200 rounded w-full"></div>
                </div>
                <div className="flex gap-2 mb-4 items-start opacity-50">
                  <div className="w-3 h-3 rounded-full bg-slate-300 shrink-0 mt-0.5"></div>
                  <div className="h-2 bg-slate-200 rounded w-full"></div>
                </div>
                
                <div className="w-full py-2 bg-gradient-to-r from-[#00A3FF] to-[#FF4B4B] rounded-lg text-white text-[9px] font-bold flex items-center justify-center gap-1">
                  <Sparkles size={10} /> Generate with AI
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#2D3748] mb-3">Get inspired by AI suggestions</h3>
            <p className="text-[15px] text-[#64748B] leading-relaxed">AI suggests ideas and helps find the proper words to highlight your achievements.</p>
          </div>

          {/* Card 3: ATS Friendly */}
          <div className="text-center group">
            <div className="bg-[#EBF5FF] h-64 rounded-3xl mb-8 relative flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:-translate-y-2">
              <div className="w-[140px] h-[190px] bg-white rounded shadow-lg p-4 border border-slate-100">
                <div className="h-1 bg-slate-800 w-1/2 mx-auto mb-1"></div>
                <div className="h-0.5 bg-slate-400 w-1/3 mx-auto mb-4"></div>
                
                <div className="h-1 bg-slate-800 w-1/3 mx-auto mb-2"></div>
                <div className="h-0.5 bg-slate-200 w-full mb-0.5"></div>
                <div className="h-0.5 bg-slate-200 w-full mb-0.5"></div>
                <div className="h-0.5 bg-slate-200 w-4/5 mx-auto mb-4"></div>
                
                <div className="flex justify-between items-center mt-6">
                  <div className="w-8 h-8 rounded bg-slate-200"></div>
                  <div className="w-8 h-8 rounded bg-slate-200"></div>
                  <div className="w-8 h-8 rounded bg-slate-200"></div>
                </div>
              </div>
              <div className="absolute top-10 right-10 w-16 h-16 bg-white rounded-full shadow-lg border-2 border-[#00A3FF] flex flex-col items-center justify-center z-10 transform rotate-12">
                <div className="text-[#00A3FF] font-black text-lg leading-none">100%</div>
                <div className="text-[8px] font-bold text-slate-600 uppercase">ATS Friendly</div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#2D3748] mb-3">Reach recruiters every time</h3>
            <p className="text-[15px] text-[#64748B] leading-relaxed">Get a readable, scannable, and impressive CV that passes the screening software.</p>
          </div>

          {/* Card 4: Level up paycheck */}
          <div className="text-center group">
            <div className="bg-[#EBF5FF] h-64 rounded-3xl mb-8 relative flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:-translate-y-2">
              <div className="w-[160px] bg-white rounded-xl shadow-lg p-4 border border-slate-100 relative z-10">
                <div className="text-[9px] font-bold text-slate-800 mb-2">Hello,</div>
                <div className="space-y-1.5 mb-4">
                  <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                  <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                  <div className="h-1.5 bg-slate-200 rounded w-3/4"></div>
                </div>
                <div className="inline-block bg-[#EBF5FF] text-[#00A3FF] text-[8px] px-2 py-1 rounded font-bold">
                  you'll be an excellent addition to our team.
                </div>
              </div>
              <div className="absolute bottom-12 bg-white px-4 py-2 rounded-full shadow-md text-[10px] font-bold text-slate-700 z-20 whitespace-nowrap border border-slate-100">
                Ready to <span className="text-[#00A3FF]">boost your career?</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#2D3748] mb-3">Level up your paycheck</h3>
            <p className="text-[15px] text-[#64748B] leading-relaxed">AI frames your skills and accomplishments the right way to beat your competition.</p>
          </div>

        </div>

        <div className="text-center mt-16">
          <Link href="/resume/choose-template?new=true" className="inline-block px-10 py-5 bg-[#00A3FF] text-white font-bold text-lg rounded-xl hover:bg-[#008AE6] transition-colors shadow-lg shadow-[#00A3FF]/20">
            Build a CV for Free
          </Link>
        </div>
      </section>

      <Footer />

    </div>
  );
}
