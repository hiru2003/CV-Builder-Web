'use client';

import Link from 'next/link';
import { FileText } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900">
          <img src="/logo.png" alt="CV Builder Logo" className="w-8 h-8 object-contain shrink-0" />
          <span>CV Builder</span>
        </Link>
        
        <div className="flex items-center gap-4 sm:gap-6">
          <a href="#features" className="hidden sm:block text-sm text-slate-600 hover:text-slate-900 transition-colors">
            Features
          </a>
          <a href="#templates" className="hidden sm:block text-sm text-slate-600 hover:text-slate-900 transition-colors">
            Templates
          </a>
          <Link 
            href="/resume/choose-template?new=true"
            className="px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-indigo-600 to-[#00A3FF] text-white rounded-xl hover:shadow-[0_4px_12px_rgba(79,70,229,0.2)] hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm font-bold shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
