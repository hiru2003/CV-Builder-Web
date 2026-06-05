'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { 
  Shield, 
  Lock, 
  Eye, 
  FileText, 
  Scale, 
  UserCheck, 
  Mail, 
  Globe, 
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', label: '1. Introduction', icon: Shield },
    { id: 'info-collect', label: '2. Information We Collect', icon: Eye },
    { id: 'how-use', label: '3. How We Use Information', icon: FileText },
    { id: 'data-sharing', label: '4. Data Sharing & Disclosure', icon: Globe },
    { id: 'data-security', label: '5. Security & Retention', icon: Lock },
    { id: 'user-rights', label: '6. Your Rights (GDPR & CCPA)', icon: UserCheck },
    { id: 'contact-us', label: '7. Contact Us', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = element.offsetTop - 100;
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-850 relative">
      <Navbar />

      {/* Header Hero Banner */}
      <section className="pt-32 pb-16 bg-slate-900 text-white relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-[1300px] mx-auto px-6 relative z-10">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-semibold mb-6 group"
          >
            <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-lg max-w-xl">
            Last updated: June 4, 2026. Learn how we handle, secure, and respect your personal data and resume details.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="max-w-[1300px] mx-auto px-6 py-16 grid lg:grid-cols-12 gap-12">
        
        {/* Left Side: Sticky Navigation */}
        <aside className="lg:col-span-4 lg:sticky lg:top-28 h-fit hidden lg:block">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm tracking-wider uppercase mb-6 flex items-center gap-2">
              <Scale size={16} className="text-[#00A3FF]" />
              Policy Sections
            </h3>
            
            <nav className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between text-[15px] font-semibold transition-all duration-300 group cursor-pointer ${
                      isActive 
                        ? 'bg-slate-905 text-white shadow-md shadow-slate-950/10' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                    style={isActive ? { backgroundColor: '#1E293B' } : {}}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} className={isActive ? 'text-[#00A3FF]' : 'text-slate-400 group-hover:text-slate-655'} />
                      <span>{section.label}</span>
                    </div>
                    <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Right Side: Privacy Content */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* Section 1 */}
          <section id="introduction" className="scroll-mt-28 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="p-2.5 rounded-xl bg-blue-50 text-[#00A3FF]">
                <Shield size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">1. Introduction</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Welcome to CV Builder ("we," "our," or "us"). We value your trust and are fully committed to protecting your privacy. This Privacy Policy describes how we collect, use, process, and disclose your information, including personal data and resume details, when you access and use our website and web application.
            </p>
            <p className="text-slate-600 leading-relaxed">
              By using our service, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms outlined here, please do not access or use CV Builder.
            </p>
          </section>

          {/* Section 2 */}
          <section id="info-collect" className="scroll-mt-28 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-500">
                <Eye size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">2. Information We Collect</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              To provide you with our resume-building platform and AI-powered writing recommendations, we collect the following types of information:
            </p>
            
            <div className="space-y-4 pt-2">
              <h3 className="font-bold text-slate-800 text-lg">A. Personal Data Provided Directly</h3>
              <ul className="list-disc list-inside space-y-2.5 text-slate-600 pl-4">
                <li><strong className="text-slate-800">Account Details:</strong> Email address, password, and profile preferences when you register an account.</li>
                <li><strong className="text-slate-800">Resume / CV Data:</strong> All data input by you to build your resume, including full name, job titles, employment histories, schools attended, skills, certificates, and references.</li>
                <li><strong className="text-slate-800">Customer Support:</strong> Information you send us when requesting technical support or reporting bugs.</li>
              </ul>

              <h3 className="font-bold text-slate-800 text-lg pt-4">B. Automatically Collected Usage Data</h3>
              <ul className="list-disc list-inside space-y-2.5 text-slate-600 pl-4">
                <li><strong className="text-slate-800">Log Information:</strong> Internet Protocol (IP) address, browser type, operating system, pages visited, access date and times, and referring websites.</li>
                <li><strong className="text-slate-800">Device Data:</strong> Type of device, screen size, and configuration settings.</li>
                <li><strong className="text-slate-800">Analytics:</strong> Page flows, download interactions, and feature usage details collected through our telemetry frameworks.</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section id="how-use" className="scroll-mt-28 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-505">
                <FileText size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">3. How We Use Your Information</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              We process your data based on legitimate business interests, contractual necessity, or explicit consent. Specifically, we use the collected information for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-3 text-slate-600 pl-4">
              <li>To provide, maintain, and support the CV Builder platform and services.</li>
              <li>To compile, format, and generate your resume documents (PDF, online layouts).</li>
              <li>To supply AI-driven resume enhancement suggestions (using natural language models).</li>
              <li>To manage your account, including security notifications, access tokens, and passwords.</li>
              <li>To perform site optimization, design enhancements, and application feature updates.</li>
              <li>To protect against security threats, system abuse, or fraudulent account behaviors.</li>
              <li>To communicate administrative notices, product updates, and promotional content (where opted in).</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section id="data-sharing" className="scroll-mt-28 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-500">
                <Globe size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">4. Data Sharing & Disclosure</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              <strong className="text-slate-800">We do not sell, rent, or trade your personal data or resume details to third-party advertisers.</strong>
            </p>
            <p className="text-slate-600 leading-relaxed">
              We may disclose information under the following limited circumstances:
            </p>
            <ul className="list-disc list-inside space-y-3 text-slate-600 pl-4">
              <li><strong className="text-slate-850">Service Providers:</strong> We share access with trusted subcontractors who host our servers (e.g. Vercel), store our database (e.g. Supabase), and run AI text models. These providers are bound by strict data processing agreements.</li>
              <li><strong className="text-slate-850">Legal Obligations:</strong> We may disclose data if required by law, subpoena, or government authority, or when necessary to protect the rights, property, and safety of our users.</li>
              <li><strong className="text-slate-850">Business Transfers:</strong> In the event of a merger, acquisition, restructuring, or asset sale, your data may be transferred to the new controlling entity.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section id="data-security" className="scroll-mt-28 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-500">
                <Lock size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">5. Security & Data Retention</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              We employ robust administrative, physical, and electronic security measures to safeguard your information from unauthorized access, loss, or alteration. All web requests are protected via Secure Socket Layer (SSL/TLS) encryption.
            </p>
            <p className="text-slate-600 leading-relaxed">
              However, no internet transmission or digital storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee absolute security.
            </p>
            <p className="text-slate-600 leading-relaxed">
              <strong className="text-slate-800">Retention:</strong> We retain your personal data for as long as your account remains active. If you delete your account, we will permanently delete or anonymize your resume records from our active database within 30 days.
            </p>
          </section>

          {/* Section 6 */}
          <section id="user-rights" className="scroll-mt-28 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-500">
                <UserCheck size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">6. Your Rights (GDPR & CCPA)</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Depending on your location (such as the European Economic Area under GDPR, or California under CCPA), you are granted specific rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside space-y-3 text-slate-600 pl-4">
              <li><strong className="text-slate-800">Right of Access:</strong> The right to request copies of your personal data stored on our servers.</li>
              <li><strong className="text-slate-800">Right of Rectification:</strong> The right to demand that we correct inaccurate or incomplete data.</li>
              <li><strong className="text-slate-850">Right to Erasure (Forgetfulness):</strong> The right to request deletion of all data associated with your profile.</li>
              <li><strong className="text-slate-800">Right to Portability:</strong> The right to export your resume data in a structured, machine-readable format.</li>
              <li><strong className="text-slate-800">Right to Object:</strong> The right to opt out of administrative data tracking or marketing emails.</li>
            </ul>
            <p className="text-slate-655 leading-relaxed pt-2">
              To exercise any of these rights, please contact us at the email listed below. We will respond to your requests within the statutory timeframe (usually 30 days).
            </p>
          </section>

          {/* Section 7 */}
          <section id="contact-us" className="scroll-mt-28 bg-gradient-to-tr from-slate-900 to-slate-950 p-8 sm:p-10 rounded-3xl text-white shadow-lg space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="p-2.5 rounded-xl bg-white/10 text-[#00A3FF]">
                <Mail size={24} />
              </div>
              <h2 className="text-2xl font-bold">7. Contact Us</h2>
            </div>
            <p className="text-slate-300 leading-relaxed">
              If you have any questions, compliance inquiries, or security reports concerning this Privacy Policy, please reach out to our privacy officer:
            </p>
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2">
              <p className="text-[15px]"><strong className="text-[#00A3FF]">Email:</strong> privacy@cvbuilder.com</p>
              <p className="text-[15px]"><strong className="text-[#00A3FF]">Address:</strong> CV Builder Inc., 100 Pine Street, San Francisco, CA 94111, United States</p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
