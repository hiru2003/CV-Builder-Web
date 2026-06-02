'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Folder, Star, Palette, FileText, UserSquare, Briefcase, ShieldCheck, FileCheck, Image
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCVStore } from '@/store/useCVStore';

interface TemplateItem {
  id: string;
  name: string;
  href: string;
  hasPhoto: boolean;
  tags: string[];
  component: React.ReactNode;
}

function ChooseTemplateContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isNew = searchParams.get('new') === 'true';
  const [activeTab, setActiveTab] = useState<string>('all');

  React.useEffect(() => {
    if (isNew) {
      useCVStore.getState().reset();
    }
  }, [isNew]);

  const templates: TemplateItem[] = [
    {
      id: 'ats_simple',
      name: 'ATS Simple',
      href: '/editor/ats_simple',
      hasPhoto: false,
      tags: ['ats'],
      component: (
        <div className="w-full h-full bg-white flex flex-col p-5 shadow-sm border border-slate-200 text-center font-sans text-[5.5px] leading-relaxed">
          <div className="text-[12px] font-bold mb-0.5 uppercase tracking-wide">ALEX MORGAN</div>
          <div className="text-[5.5px] text-[#007BFF] font-semibold uppercase tracking-wider mb-2">Senior Software Engineer</div>
          <div className="flex justify-center gap-1.5 mb-3 text-[4.5px] text-slate-500">
            <span>alex.morgan@email.com</span><span>•</span><span>(555) 019-2834</span><span>•</span><span>San Francisco, CA</span><span>•</span><span>linkedin.com/in/alexmorgan</span>
          </div>
          <div className="h-[1px] bg-slate-200 w-full mb-2.5"></div>
          
          <div className="text-[7px] font-bold text-slate-800 uppercase tracking-widest text-left mb-1 border-b border-slate-200 pb-0.5">Professional Summary</div>
          <div className="text-left text-slate-600 mb-2.5 text-[5px] leading-tight">
            Innovative Senior Software Engineer with 8+ years of experience designing and deploying scalable cloud applications. Proven track record in optimizing backend latency and leading cross-functional teams to build high-impact product features.
          </div>

          <div className="text-[7px] font-bold text-slate-800 uppercase tracking-widest text-left mb-1 border-b border-slate-200 pb-0.5">Work Experience</div>
          <div className="flex justify-between font-bold text-slate-800 mb-0.5">
            <span>Senior Software Engineer — TechCorp Inc.</span>
            <span>2022 - Present</span>
          </div>
          <div className="text-left text-slate-600 mb-1 text-[4.8px] leading-tight">
            • Replatformed core API service to Go/gRPC, boosting speed by 35% and throughput by 50%.<br/>
            • Scaled AWS infrastructure using Terraform, reducing monthly operational costs by $15k.
          </div>
          
          <div className="flex justify-between font-bold text-slate-800 mb-0.5 mt-1.5">
            <span>Software Engineer — DevSolutions LLC</span>
            <span>2019 - 2022</span>
          </div>
          <div className="text-left text-slate-600 mb-2 text-[4.8px] leading-tight">
            • Developed dynamic React web apps, increasing user engagement and click-through rates by 18%.
          </div>

          <div className="text-[7px] font-bold text-slate-800 uppercase tracking-widest text-left mb-1 border-b border-slate-200 pb-0.5">Education & Skills</div>
          <div className="flex justify-between text-slate-600 text-[5px] leading-tight">
            <span className="font-semibold text-slate-800">Stanford University — B.S. in Computer Science</span>
            <span>2015 - 2019</span>
          </div>
          <div className="text-left text-slate-600 mt-1 text-[5px] leading-tight">
            <span className="font-semibold text-slate-800">Skills:</span> React, TypeScript, Next.js, Node.js, Go, AWS, Docker, Kubernetes, SQL, CI/CD, Git
          </div>
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
        <div className="w-full h-full bg-white flex flex-col p-5 shadow-sm border border-slate-200 text-left font-sans text-[5.5px] leading-relaxed">
          <div className="text-[12px] font-bold mb-0.5 uppercase tracking-wider text-slate-900">ALEX MORGAN</div>
          <div className="text-[6px] text-slate-500 font-semibold mb-2.5 uppercase tracking-wide">Senior Software Engineer</div>
          <div className="flex gap-2.5 mb-3 text-[4.5px] text-slate-400">
            <span>alex.morgan@email.com</span><span>•</span><span>(555) 019-2834</span><span>•</span><span>San Francisco, CA</span><span>•</span><span>github.com/alexmorgan</span>
          </div>
          
          <div className="text-[7.5px] font-bold text-slate-800 uppercase tracking-wider mb-1 border-b-[1.5px] border-slate-800 pb-0.5">Professional Summary</div>
          <div className="text-slate-650 mb-2.5 text-[5px] leading-tight">
            Detail-oriented Senior Software Engineer with a passion for designing resilient software architectures. Expert in TypeScript and microservices with a strong record of driving project deliverables and mentoring engineering teams.
          </div>

          <div className="text-[7.5px] font-bold text-slate-800 uppercase tracking-wider mb-1 border-b-[1.5px] border-slate-800 pb-0.5">Experience</div>
          <div className="flex justify-between font-bold text-slate-900 mb-0.5">
            <span>Senior Software Engineer</span>
            <span>2022 - Present</span>
          </div>
          <div className="text-[#007BFF] font-semibold mb-1 text-[4.8px]">TechCorp Inc. — San Francisco, CA</div>
          <div className="text-slate-650 mb-2 text-[4.8px] leading-tight">
            • Led migration from monorepo to microservices, reducing build times by 50% and improving test coverage by 20%.<br/>
            • Architected serverless processing pipelines handling over 5 million message payloads daily.
          </div>

          <div className="flex justify-between font-bold text-slate-900 mb-0.5 mt-1.5">
            <span>Software Engineer</span>
            <span>2019 - 2022</span>
          </div>
          <div className="text-[#007BFF] font-semibold mb-1 text-[4.8px]">DevSolutions LLC — Austin, TX</div>
          <div className="text-slate-650 mb-2 text-[4.8px] leading-tight">
            • Implemented core design system using Tailwind and React, reducing frontend UI churn by 30%.
          </div>

          <div className="text-[7.5px] font-bold text-slate-800 uppercase tracking-wider mb-1 border-b-[1.5px] border-slate-800 pb-0.5">Education & Skills</div>
          <div className="flex justify-between text-slate-600 text-[5px] mb-1">
            <span><span className="font-semibold text-slate-900">B.S. in Computer Science</span> — Stanford University</span>
            <span>2015 - 2019</span>
          </div>
          <div className="text-[5px] text-slate-650 leading-tight">
            <span className="font-semibold text-slate-800">Technical Skills:</span> React, TypeScript, Next.js, Node.js, Go, Python, AWS, Docker, Kubernetes, SQL, Git, GraphQL
          </div>
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
        <div className="w-full h-full bg-white flex flex-col p-5 shadow-sm border border-slate-200 text-left font-sans text-[5.5px] leading-relaxed">
          <div className="flex justify-between items-start mb-3 border-b-2 border-slate-100 pb-2">
            <div>
              <div className="text-[12px] font-black uppercase tracking-tight text-slate-900">ALEX MORGAN</div>
              <div className="text-[6px] text-indigo-600 font-bold mt-0.5 uppercase tracking-wider">Senior Software Engineer</div>
            </div>
            <div className="text-right text-[4.8px] text-slate-400 space-y-0.5">
              <div>alex.morgan@email.com</div>
              <div>(555) 019-2834</div>
              <div>SF, CA</div>
            </div>
          </div>
          
          <div className="text-[7px] font-extrabold text-indigo-700 uppercase tracking-wider mb-1">Summary</div>
          <div className="text-slate-600 mb-2.5 text-[5px] leading-tight">
            High-performing Senior Software Engineer with a deep technical focus on reactive client interfaces and fast REST/GraphQL service layer integration. Dedicated to clean architecture, code quality, and agile shipping.
          </div>

          <div className="text-[7px] font-extrabold text-indigo-700 uppercase tracking-wider mb-1">Experience</div>
          <div className="flex justify-between font-bold text-slate-850 mb-0.5">
            <span>Senior Software Engineer</span>
            <span className="text-indigo-600 bg-indigo-50/70 px-1 rounded-[3px] text-[4.5px]">2022 - Present</span>
          </div>
          <div className="text-slate-400 font-medium mb-1">TechCorp Inc.</div>
          <div className="text-slate-600 mb-2 text-[4.8px] leading-tight">
            • Authored responsive layouts and integrated real-time analytics dashboards using Next.js and WebSockets.<br/>
            • Decreased customer-reported UI glitches by 45% through robust integration testing.
          </div>

          <div className="flex justify-between font-bold text-slate-850 mb-0.5 mt-1.5">
            <span>Software Engineer</span>
            <span className="text-slate-400 px-1 text-[4.5px]">2019 - 2022</span>
          </div>
          <div className="text-slate-400 font-medium mb-1">DevSolutions LLC</div>
          <div className="text-slate-600 mb-2 text-[4.8px] leading-tight">
            • Managed feature lifecycle of key user checkout flows, improving conversion by 12%.
          </div>

          <div className="text-[7px] font-extrabold text-indigo-700 uppercase tracking-wider mb-1">Skills & Education</div>
          <div className="text-[5px] text-slate-600 leading-tight">
            <span className="font-semibold text-slate-800">Skills:</span> Next.js, React, Node.js, TypeScript, Python, TailwindCSS, PostgreSQL, AWS, Git, CI/CD<br/>
            <span className="font-semibold text-slate-800">Stanford University:</span> B.S. in Computer Science (GPA: 3.8/4.0)
          </div>
        </div>
      )
    },
    {
      id: 'photo',
      name: 'With Photo',
      href: '/editor/photo',
      hasPhoto: true,
      tags: ['creative', 'modern'],
      component: (
        <div className="w-full h-full bg-white flex shadow-sm border border-slate-200 text-[5px] leading-relaxed">
          <div className="w-[35%] bg-[#0A2540] text-slate-100 p-3 flex flex-col items-center text-center gap-2">
            <div className="w-8 h-8 rounded-full border border-white bg-slate-300 flex items-center justify-center shrink-0 text-[6px] font-bold text-[#0A2540] uppercase">
              RS
            </div>
            <div className="w-full">
              <div className="font-extrabold text-white text-[6px] mb-1 uppercase tracking-wider border-b border-white/20 pb-0.5">Contact</div>
              <div className="text-[4px] text-slate-300 space-y-0.5 break-all w-full text-center">
                <div>+123-456-7890</div>
                <div>hello@reallygreatsite.com</div>
              </div>
            </div>
            <div className="w-full">
              <div className="font-extrabold text-white text-[6px] mb-1 uppercase tracking-wider border-b border-white/20 pb-0.5">Education</div>
              <div className="text-[4px] text-slate-300 text-center leading-tight">
                <div className="font-semibold text-white">WARDIERE UNIVERSITY</div>
                <div>Master of Business Management</div>
              </div>
            </div>
            <div className="w-full">
              <div className="font-extrabold text-white text-[6px] mb-1 uppercase tracking-wider border-b border-white/20 pb-0.5">Skills</div>
              <div className="text-[4px] text-slate-300 flex flex-wrap justify-center gap-0.5">
                {['Management', 'Relations', 'Teamwork'].map(s => (
                  <span key={s} className="bg-white/10 px-0.8 py-0.1 rounded-[1px]">{s}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="w-[65%] p-4 text-left flex flex-col justify-start gap-1">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-[9px] font-bold text-slate-800 uppercase tracking-wide">RICHARD</span>
                <span className="text-[9px] font-light text-slate-600 uppercase tracking-wide">SANCHEZ</span>
              </div>
              <div className="text-[5.5px] text-[#0A2540] font-bold uppercase tracking-wider leading-none">MARKETING MANAGER</div>
              <div className="w-6 h-[1px] bg-[#0A2540] mt-1"></div>
            </div>
            
            <div>
              <div className="font-bold text-[6px] text-slate-800 uppercase tracking-wider mb-0.5">Profile</div>
              <div className="text-slate-600 text-[4.2px] leading-normal text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
              </div>
            </div>

            <div>
              <div className="font-bold text-[6px] text-slate-800 uppercase tracking-wider mb-0.5">Work Experience</div>
              <div className="relative border-l border-slate-200 pl-2 ml-0.5 space-y-1">
                <div>
                  <div className="flex justify-between items-baseline font-bold text-slate-800 text-[4.8px]">
                    <span>Borcelle Studio</span>
                    <span className="text-[4px] font-semibold text-slate-400">2030 - PRESENT</span>
                  </div>
                  <div className="text-[4.2px] text-slate-500 font-semibold mb-0.5">Marketing Manager & Specialist</div>
                  <div className="text-slate-600 text-[4px] leading-tight">• Develop and execute comprehensive marketing campaigns.</div>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <div className="font-bold text-[5.5px] text-slate-800 uppercase tracking-wider mb-0.5">Reference</div>
              <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-0.5 text-[4px]">
                <div>
                  <div className="font-bold text-slate-800 leading-none">Estelle Darcy</div>
                  <div className="text-slate-500 text-[3.8px]">Wardiere Inc. / CTO</div>
                </div>
                <div>
                  <div className="font-bold text-slate-800 leading-none">Harper Richard</div>
                  <div className="text-slate-500 text-[3.8px]">Wardiere Inc. / CEO</div>
                </div>
              </div>
            </div>
          </div>
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
        <div className="w-full h-full bg-white flex shadow-sm border border-slate-200 text-[5px] leading-relaxed">
          <div className="w-[35%] bg-slate-50 border-r border-slate-200 p-3 flex flex-col items-center text-center">
            <img src="/placeholder-user.jpg" alt="Alex Morgan" className="w-9 h-9 rounded-full mb-2 object-cover border border-indigo-200 bg-slate-100" />
            <div className="font-extrabold text-slate-800 text-[6.5px] mb-1.5 uppercase tracking-wide">Contact</div>
            <div className="text-[4.5px] text-slate-500 space-y-0.8 mb-3 break-all w-full text-center">
              <div>alex.morgan@email.com</div>
              <div>(555) 019-2834</div>
              <div>San Francisco, CA</div>
            </div>
            <div className="font-extrabold text-slate-800 text-[6.5px] mb-1.5 uppercase tracking-wide">Skills</div>
            <div className="text-[4.5px] text-slate-600 flex flex-wrap justify-center gap-1">
              {['React', 'TypeScript', 'Next.js', 'Node.js', 'Go', 'AWS', 'Docker'].map(s => (
                <span key={s} className="bg-indigo-50 text-indigo-700 px-1 rounded-[2px]">{s}</span>
              ))}
            </div>
          </div>
          <div className="w-[65%] p-4 text-left">
            <div className="text-[12px] font-black text-slate-900 uppercase leading-none mb-0.5">ALEX MORGAN</div>
            <div className="text-[6.5px] text-blue-500 font-bold uppercase tracking-wider mb-2.5">Senior Software Engineer</div>
            
            <div className="text-slate-600 mb-2.5 text-[4.8px] leading-normal">
              Dynamic Senior Software Engineer with a solid background in designing high-quality user experiences and performant backend architectures.
            </div>

            <div className="text-[7px] font-bold text-slate-800 uppercase tracking-widest mb-1 pb-0.5 border-b border-slate-200">Experience</div>
            <div className="font-semibold text-slate-900 text-[5px]">Senior Software Engineer • TechCorp</div>
            <div className="text-slate-400 text-[4.2px] mb-0.5">2022 - Present | San Francisco, CA</div>
            <div className="text-slate-600 mb-2 text-[4.5px] leading-tight">
              • Engineered low-latency interfaces using React and GraphQL.<br/>
              • Rebuilt data sync worker pipelines utilizing Go and Redis cache.
            </div>

            <div className="text-[7px] font-bold text-slate-800 uppercase tracking-widest mb-1 pb-0.5 border-b border-slate-200">Education</div>
            <div className="font-semibold text-slate-900 text-[5px]">Stanford University</div>
            <div className="text-slate-600 text-[4.5px]">B.S. in Computer Science (2015 - 2019)</div>
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
        <div className="w-full h-full bg-white flex flex-col p-5 shadow-sm border border-slate-200 text-center font-serif text-[5.5px] leading-relaxed">
          <div className="text-[12px] font-bold mb-0.5 uppercase tracking-wide text-slate-900">ALEX MORGAN</div>
          <div className="text-[6.5px] text-slate-500 italic mb-2">Senior Software Engineer</div>
          <div className="flex justify-center gap-2 mb-3 text-[4.5px] text-slate-500">
            <span>alex.morgan@email.com</span><span>•</span><span>(555) 019-2834</span><span>•</span><span>San Francisco, CA</span>
          </div>
          
          <div className="h-[1px] bg-slate-800 w-full mb-2.5"></div>
          
          <div className="text-[7.5px] font-bold uppercase tracking-widest text-slate-900 mb-1">Professional Summary</div>
          <div className="text-slate-600 mb-2.5 text-[5px] text-justify leading-tight">
            Accomplished Senior Software Engineer with over eight years of experience delivering robust web platforms. Expertise includes reactive UI development, distributed systems architecture, and strong software engineering best practices.
          </div>

          <div className="text-[7.5px] font-bold uppercase tracking-widest text-slate-900 mb-1">Experience</div>
          <div className="flex justify-between font-bold text-slate-850 mb-0.5 text-left">
            <span>Senior Software Engineer — TechCorp Inc.</span>
            <span>2022 - Present</span>
          </div>
          <div className="text-left text-slate-605 mb-2 text-[4.8px] leading-tight">
            • Directed the architecture of a high-throughput content management tool serving millions of users.<br/>
            • Automated validation workflows using CI/CD pipelines, reducing manual deployment efforts by 80%.
          </div>

          <div className="text-[7.5px] font-bold uppercase tracking-widest text-slate-900 mb-1">Education</div>
          <div className="flex justify-between text-slate-600 text-[5px] text-left">
            <span>Stanford University — Bachelor of Science in Computer Science</span>
            <span>2015 - 2019</span>
          </div>
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
        <div className="w-full h-full bg-white shadow-sm border border-slate-200 flex flex-col text-[5.5px] font-sans">
          <div className="h-14 bg-red-50/70 flex items-center p-3 border-b-[3px] border-slate-900">
            <img src="/placeholder-user.jpg" alt="Alex Morgan" className="w-8 h-8 rounded-lg transform -rotate-6 border-2 border-white object-cover shadow-sm bg-slate-200 mr-3" />
            <div>
              <div className="text-[12px] font-black text-slate-900 tracking-tight leading-none mb-0.5">ALEX MORGAN</div>
              <div className="text-[6.5px] text-red-500 font-extrabold uppercase tracking-wide">Senior Software Engineer</div>
            </div>
          </div>
          <div className="flex flex-1 overflow-hidden">
            <div className="w-[35%] bg-slate-900 p-3 text-slate-300 text-left">
              <div className="font-extrabold text-[6.5px] text-white uppercase tracking-wider mb-1.5">Contact</div>
              <div className="space-y-1 text-[4.2px] leading-tight break-all mb-3 opacity-90">
                <div>alex.morgan@email.com</div>
                <div>(555) 019-2834</div>
                <div>San Francisco, CA</div>
              </div>
              <div className="font-extrabold text-[6.5px] text-white uppercase tracking-wider mb-1.5">Skills</div>
              <div className="flex flex-wrap gap-1 text-[4px] leading-none">
                {['React', 'NextJS', 'TS', 'Node', 'Go', 'AWS'].map(s => (
                  <span key={s} className="bg-slate-800 text-red-200 px-1 py-0.5 rounded-[2px]">{s}</span>
                ))}
              </div>
            </div>
            <div className="w-[65%] p-3.5 text-left leading-relaxed">
              <div className="text-[6.5px] font-extrabold text-slate-900 uppercase tracking-wider mb-1 relative inline-block">
                Profile
                <div className="absolute -bottom-[2px] left-0 w-full h-[2px] bg-yellow-350"></div>
              </div>
              <div className="text-slate-600 mb-3 text-[4.8px] leading-tight">
                Versatile and creative engineer focused on building interactive web experiences. Enthusiastic about design systems, animation, and front-end performance.
              </div>
              
              <div className="text-[6.5px] font-extrabold text-slate-900 uppercase tracking-wider mb-1 relative inline-block">
                Experience
                <div className="absolute -bottom-[2px] left-0 w-full h-[2px] bg-yellow-350"></div>
              </div>
              <div className="font-bold text-slate-850 text-[5px]">Senior Engineer — TechCorp</div>
              <div className="text-slate-600 text-[4.8px] leading-tight mb-1">
                • Built modular UI libraries utilized across three corporate websites, boosting developers speed by 25%.
              </div>
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
        <div className="w-full h-full bg-white shadow-sm border border-slate-200 p-5 text-[5.5px] font-sans text-left leading-relaxed">
          <div className="text-[13px] font-light tracking-wide text-slate-800 leading-none mb-0.5">Alex Morgan</div>
          <div className="text-[6.5px] text-slate-400 uppercase tracking-widest mb-4">Senior Software Engineer</div>
          
          <div className="flex gap-3 mb-2.5">
            <div className="w-[80px] text-slate-400 text-[4.8px] font-medium leading-normal">alex.morgan@email.com<br/>(555) 019-2834<br/>San Francisco, CA</div>
            <div className="flex-1 text-slate-600 text-[4.8px] leading-tight">
              Highly motivated Software Engineer specializing in modern frontend frameworks and simple, functional, client-centered layouts.
            </div>
          </div>

          <div className="border-t border-slate-100 my-2"></div>

          <div className="flex gap-3 mb-2.5">
            <div className="w-[80px] text-slate-400 text-[4.8px] font-semibold">2022 - Present</div>
            <div className="flex-1">
              <div className="font-bold text-slate-800 text-[5px]">Senior Engineer — TechCorp Inc.</div>
              <div className="text-slate-600 text-[4.8px] leading-tight">
                Led frontend migration projects to Next.js framework, improving cumulative layout shift scores by 35%.
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-[80px] text-slate-400 text-[4.8px] font-semibold">2019 - 2022</div>
            <div className="flex-1">
              <div className="font-bold text-slate-800 text-[5px]">Engineer — DevSolutions LLC</div>
              <div className="text-slate-600 text-[4.8px] leading-tight">
                Maintained internal developer portal using React, GraphQL, and micro-frontend structures.
              </div>
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
        <div className="w-full h-full bg-white shadow-sm border border-slate-200 p-5 font-serif text-[5.5px] text-left leading-relaxed">
          <div className="border-b-[1.5px] border-slate-900 pb-2.5 mb-3 flex justify-between items-end">
             <div>
                <div className="text-[12px] font-bold uppercase tracking-wide text-slate-900">ALEX MORGAN</div>
                <div className="text-[6.5px] text-slate-600 uppercase tracking-wider">Senior Software Engineer</div>
             </div>
             <div className="text-right text-[4.2px] text-slate-500 leading-normal font-sans">
               SF, CA • alex.morgan@email.com • (555) 019-2834
             </div>
          </div>
          
          <div className="text-[7.5px] font-bold uppercase text-slate-800 tracking-wider mb-1.5">Executive Summary</div>
          <div className="text-slate-600 mb-3 text-[5.2px] leading-tight text-justify">
            Results-focused Senior Software Engineer with a record of delivery in building scalable consumer platforms. Dedicated to architectural integrity, operational efficiency, and cross-functional alignment.
          </div>
          
          <div className="text-[7.5px] font-bold uppercase text-slate-800 tracking-wider mb-1.5">Professional Experience</div>
          <div className="font-bold text-slate-900 text-[5.2px]">Senior Software Engineer | TechCorp Inc.</div>
          <div className="text-slate-500 text-[4.5px] italic mb-1">2022 - Present | San Francisco, CA</div>
          <div className="text-slate-600 text-[4.8px] leading-tight mb-2">
            • Managed technical roadmap for core cloud migration, resulting in $180k annual savings.<br/>
            • Oversaw delivery of 12 major features, aligning engineering outputs with product requirements.
          </div>
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
            <img src="/logo.png" alt="CV Builder Logo" className="w-9 h-9 object-contain shrink-0" />
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

export default function ChooseTemplate() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-bold uppercase tracking-wider">Loading...</div>}>
      <ChooseTemplateContent />
    </React.Suspense>
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
