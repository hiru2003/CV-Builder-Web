import React, { useState } from 'react';
import { 
  Globe, 
  Award, 
  Trophy, 
  Link as LinkIcon, 
  Handshake, 
  Gamepad2, 
  LayoutGrid,
  Plus
} from 'lucide-react';

export const AdditionalSectionsForm = ({ 
  onSelectSection 
}: { 
  onSelectSection: (sectionId: string) => void 
}) => {
  const sections = [
    { id: 'languages', label: 'Languages', icon: Globe },
    { id: 'certifications', label: 'Certifications and licenses', icon: Award },
    { id: 'awards', label: 'Awards and honors', icon: Trophy },
    { id: 'social', label: 'Websites and social media', icon: LinkIcon },
    { id: 'references', label: 'References', icon: Handshake },
    { id: 'hobbies', label: 'Hobbies and interests', icon: Gamepad2 },
    { id: 'projects', label: 'Custom section', icon: LayoutGrid },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 font-serif mb-2">Additional Sections</h2>
        <p className="text-slate-500 font-medium">Add certifications, languages, awards, or any extra details you want recruiters to see.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => onSelectSection(section.id)}
              className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-xl transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#E1F3FF] flex items-center justify-center text-[#00A3FF]">
                  <Icon size={20} />
                </div>
                <span className="font-semibold text-slate-700">{section.label}</span>
              </div>
              <Plus size={20} className="text-slate-400 group-hover:text-[#00A3FF] transition-colors" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
