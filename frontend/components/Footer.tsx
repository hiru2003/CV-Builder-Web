'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Facebook, 
  ArrowUp, 
  Mail, 
  Sparkles, 
  Heart, 
  Send,
  ShieldCheck,
  Zap
} from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative bg-slate-950 text-slate-400 pt-24 pb-12 overflow-hidden border-t border-slate-900">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 translate-y-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern overlay for futuristic texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-6 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-900">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link href="/" className="flex items-center gap-3 font-extrabold text-2xl text-white mb-6 group w-fit">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#00A3FF] to-indigo-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
                  <img 
                    src="/logo.png" 
                    alt="CV Builder Logo" 
                    className="relative w-10 h-10 object-contain rounded-xl bg-white p-1.5 shrink-0 shadow-md transform group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent group-hover:text-white transition-colors duration-300">
                  CV Builder
                </span>
              </Link>
              
              <p className="text-base leading-relaxed text-slate-400 mb-8 max-w-sm">
                Empowering job seekers worldwide to design stunning, ATS-friendly resumes and land their dream roles twice as fast.
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-3">
              {[
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Facebook, href: '#', label: 'Facebook' }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#00A3FF] hover:border-[#00A3FF]/40 hover:bg-slate-900/60 shadow-inner hover:shadow-[0_0_12px_rgba(0,163,255,0.2)] transition-all duration-300 group"
                >
                  <social.icon size={18} className="transform group-hover:scale-110 transition-transform duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF]" />
              Templates
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'Executive Style', href: '/resume/choose-template?new=true' },
                { name: 'Modern Creative', href: '/resume/choose-template?new=true' },
                { name: 'ATS-Friendly', href: '/resume/choose-template?new=true' },
                { name: 'Cover Letters', href: '#' },
                { name: 'Pricing & Plans', href: '#' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href} 
                    className="text-base text-slate-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block transform"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Resources Column */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Resources
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'Resume Guide', href: '#' },
                { name: 'FAQ & Help', href: '#' },
                { name: 'Contact Us', href: '#' },
                { name: 'Terms of Use', href: '#' },
                { name: 'Privacy Policy', href: '#' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href} 
                    className="text-base text-slate-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block transform"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-900 relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 p-3 text-slate-800 opacity-20 pointer-events-none">
                <Sparkles size={60} />
              </div>
              
              <h4 className="text-white font-bold text-base mb-2 flex items-center gap-2">
                <Sparkles className="text-[#00A3FF]" size={16} />
                Get Career Hacks
              </h4>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                Subscribe to our newsletter for exclusive resume guides, interview tips, and product releases.
              </p>

              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-[#00A3FF]/60 focus:ring-2 focus:ring-[#00A3FF]/15 transition-all duration-300"
                  />
                  <Mail size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" />
                </div>
                
                <button
                  type="submit"
                  disabled={subscribed}
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                    subscribed 
                      ? 'bg-emerald-600 shadow-md shadow-emerald-950/20' 
                      : 'bg-gradient-to-r from-indigo-600 to-[#00A3FF] hover:shadow-[0_4px_20px_rgba(0,163,255,0.3)] hover:-translate-y-0.5'
                  }`}
                >
                  {subscribed ? (
                    'Subscribed successfully!'
                  ) : (
                    <>
                      Subscribe
                      <Send size={14} className="transform group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
              <p className="text-[11px] text-slate-500 mt-3 text-center">No spam, unsubscribe anytime.</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          
          {/* Copyright Info */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} CV Builder. All rights reserved.</p>
            <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-slate-800" />
            <span className="flex items-center gap-1.5 text-slate-500">
              <ShieldCheck size={16} className="text-[#00A3FF]" />
              ATS Secured & Guaranteed
            </span>
          </div>

          {/* Tech Stack & Back to Top */}
          <div className="flex items-center gap-6 text-sm">
            <span className="flex items-center gap-1.5 text-slate-500">
              Built with 
              <Heart size={14} className="text-rose-500 fill-rose-500 animate-pulse duration-1000" />
              using React & Next.js
            </span>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className={`p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all duration-300 shadow-inner group cursor-pointer ${
                showScrollTop ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-90'
              }`}
              title="Scroll to top"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} className="transform group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
