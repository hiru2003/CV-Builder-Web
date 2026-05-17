'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ActionBar } from '@/components/ActionBar';
import { ResumePreview } from '@/components/ResumePreview';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showPreview, setShowPreview] = useState(true);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ActionBar />
        <div className="flex-1 flex overflow-hidden">
          {/* Form Area */}
          <div className="flex-1 overflow-auto border-r border-slate-200">
            <main className="min-h-full">
              {children}
            </main>
          </div>

          {/* Preview Toggle Button */}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="hidden lg:flex w-10 items-center justify-center bg-slate-50 border-l border-slate-200 hover:bg-slate-100 transition-colors"
            title={showPreview ? 'Hide preview' : 'Show preview'}
          >
            {showPreview ? (
              <ChevronRight size={20} className="text-slate-600" />
            ) : (
              <ChevronLeft size={20} className="text-slate-600" />
            )}
          </button>

          {/* Preview Area - Hidden on mobile, shown on lg and up */}
          {showPreview && (
            <div className="hidden lg:flex w-2/5 overflow-hidden border-l border-slate-200 bg-slate-50">
              <div className="flex-1 overflow-auto">
                <ResumePreview />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
