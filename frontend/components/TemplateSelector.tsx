'use client';

import { useResume } from '@/contexts/ResumeContext';
import { motion } from 'framer-motion';
import { Check, LayoutTemplate, Briefcase, Sparkles, Coffee } from 'lucide-react';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with vibrant accents.',
    icon: Sparkles,
    gradient: 'from-blue-500 to-cyan-400',
    tags: ['Creative', 'Tech', 'Design'],
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Structured two-column layout tailored for corporate roles.',
    icon: Briefcase,
    gradient: 'from-slate-600 to-slate-800',
    tags: ['Corporate', 'Business', 'Standard'],
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Elegant, simple, and distraction-free with minimal elements.',
    icon: Coffee,
    gradient: 'from-emerald-400 to-teal-500',
    tags: ['Simple', 'Clean', 'Modern'],
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional layout for an academic or formal appearance.',
    icon: LayoutTemplate,
    gradient: 'from-amber-500 to-orange-400',
    tags: ['Traditional', 'Academic', 'Formal'],
  },
];

export function TemplateSelector() {
  const { state, dispatch } = useResume();

  const handleSelectTemplate = (templateId: string) => {
    dispatch({
      type: 'SET_TEMPLATE',
      payload: templateId as any,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="mb-12 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight"
        >
          Choose your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Perfect Template</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-600 max-w-2xl mx-auto"
        >
          Select a professional design that best highlights your unique experience and skills. You can always change this later.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 xl:gap-8">
        {templates.map((template, index) => {
          const isSelected = state.template === template.id;
          const Icon = template.icon;

          return (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={template.id}
              onClick={() => handleSelectTemplate(template.id)}
              className={`group relative text-left w-full rounded-3xl p-6 md:p-8 transition-all duration-300 overflow-hidden ${
                isSelected
                  ? 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] scale-[1.02] ring-2 ring-blue-500 ring-offset-2'
                  : 'bg-slate-50/50 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:scale-[1.01] border border-slate-200/60'
              }`}
            >
              {/* Background Gradient Blob for visual interest */}
              <div 
                className={`absolute -right-20 -top-20 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-br ${template.gradient}`}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${template.gradient} text-white shadow-lg shadow-${template.gradient.split(' ')[0].split('-')[1]}-500/30`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400 group-hover:bg-slate-300'
                  }`}>
                    <Check className={`w-5 h-5 transition-transform duration-300 ${isSelected ? 'scale-100' : 'scale-0'}`} strokeWidth={3} />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3">{template.name}</h3>
                <p className="text-slate-600 leading-relaxed mb-6 flex-grow">{template.description}</p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {template.tags.map(tag => (
                    <span 
                      key={tag} 
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        isSelected 
                          ? 'bg-blue-50 text-blue-700 border border-blue-200/50' 
                          : 'bg-slate-100 text-slate-600 border border-slate-200/50 group-hover:bg-slate-50'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Selection Indicator Border (Fallback since layoutId requires AnimateSharedLayout which is deprecated in modern Framer Motion for simple use cases without LayoutGroup, using CSS border instead for simplicity) */}
              {isSelected && (
                <div className="absolute inset-0 border-2 border-blue-500 rounded-3xl pointer-events-none" />
              )}
            </motion.button>
          );
        })}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50 border border-blue-100/50 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-start md:items-center gap-6"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5 -z-10">
          <Sparkles className="w-32 h-32" />
        </div>
        <div className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm border border-white/80 hidden md:block shrink-0">
          <LayoutTemplate className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Live Preview Ready</h3>
          <p className="text-slate-600 leading-relaxed">
            The <span className="font-semibold text-blue-700">{templates.find((t) => t.id === state.template)?.name}</span> template
            is now active. Navigate to the preview tab to see it in action, or continue editing your details.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
