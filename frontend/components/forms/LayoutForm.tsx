'use client';

import React from 'react';
import { useCVStore } from '@/store/useCVStore';
import { Sliders, Palette, Layout, Sparkles, Check, HelpCircle, Type, LayoutTemplate } from 'lucide-react';
import { SpacingType, FontSizeAdjustType } from '@/types/cv';

export const LayoutForm = () => {
  const { 
    themeColor, 
    spacing, 
    fontSizeAdjust, 
    setThemeColor, 
    setSpacing, 
    setFontSizeAdjust,
    font,
    setFont,
    template,
    setTemplate
  } = useCVStore();

  const colorPresets = [
    { name: 'Sky Blue', value: '#00A3FF' },
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Rose', value: '#f43f5e' },
    { name: 'Amber', value: '#f59e0b' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Royal Blue', value: '#3b82f6' },
    { name: 'Charcoal', value: '#334155' },
    { name: 'Classic Black', value: '#000000' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header card with styling tips */}
      <div className="relative overflow-hidden bg-gradient-to-tr from-indigo-50/50 to-blue-50/20 rounded-2xl border border-indigo-100/50 p-6 shadow-[0_4px_12px_rgba(79,70,229,0.02)]">
        <div className="relative z-10 flex gap-4 items-start">
          <div className="p-3 bg-white rounded-xl shadow-sm border border-indigo-100 flex justify-center items-center shrink-0">
            <Layout size={24} className="text-indigo-600 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-800 tracking-tight mb-1 flex items-center gap-1.5">
              <span>Layout & Formatting</span>
              <span className="text-[9px] font-bold bg-indigo-100 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full uppercase tracking-wider">Styling</span>
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Fine-tune colors, margin spacing, and text sizes to fit all contents perfectly. Choosing compact spacing is ideal for fitting detailed content on a single page.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
          <Sparkles className="w-20 h-20 text-indigo-700" />
        </div>
      </div>

      {/* 1. Accent Theme Color */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.01)] space-y-5">
        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5 font-bold text-slate-800 text-sm">
            <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
              <Palette size={15} className="text-rose-500" />
            </div>
            <span>Accent Theme Color</span>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-2.5 py-1.2 rounded-xl">
            <div className="w-3.5 h-3.5 rounded-md border border-slate-300" style={{ backgroundColor: themeColor }}></div>
            <span className="text-[10px] font-mono font-black text-slate-600">{themeColor.toUpperCase()}</span>
          </div>
        </div>
        
        {/* Color swatches */}
        <div className="grid grid-cols-5 gap-3">
          {colorPresets.map((preset) => {
            const isActive = themeColor.toLowerCase() === preset.value.toLowerCase();
            return (
              <button
                key={preset.value}
                type="button"
                onClick={() => setThemeColor(preset.value)}
                className={`h-10 rounded-xl transition-all border relative flex items-center justify-center cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.02)] ${
                  isActive 
                    ? 'ring-2 ring-offset-2 ring-indigo-500 scale-[1.05] border-transparent' 
                    : 'border-slate-100 hover:scale-[1.03] hover:shadow-md'
                }`}
                style={{ backgroundColor: preset.value }}
                title={preset.name}
              >
                {isActive && (
                  <div className="w-2.5 h-2.5 rounded-full bg-white shadow-md flex items-center justify-center">
                    <Check size={8} className="text-slate-800 stroke-[3px]" />
                  </div>
                )}
              </button>
            );
          })}
          
          {/* Custom color picker card */}
          <div className="relative h-10 rounded-xl border border-slate-200/80 bg-slate-50 hover:bg-slate-100/50 flex flex-col items-center justify-center cursor-pointer transition-colors shadow-inner group">
            <input 
              type="color"
              value={themeColor}
              onChange={(e) => setThemeColor(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider group-hover:text-slate-700">Custom</span>
          </div>
        </div>
      </div>

      {/* 2. Spacing / Margins Level (Redesigned visual cards) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.01)] space-y-5">
        <div className="flex items-center gap-2.5 font-bold text-slate-800 text-sm pb-2 border-b border-slate-100">
          <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
            <Layout size={15} className="text-blue-500" />
          </div>
          <span>Margins & Document Spacing</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {(['compact', 'normal', 'loose'] as SpacingType[]).map((level) => {
            const isActive = spacing === level;
            return (
              <button
                key={level}
                type="button"
                onClick={() => setSpacing(level)}
                className={`group flex flex-col items-center gap-3 p-4 rounded-xl border text-center transition-all cursor-pointer ${
                  isActive 
                    ? 'border-indigo-500 bg-indigo-50/10 ring-2 ring-indigo-500/20 scale-[1.02] shadow-sm' 
                    : 'border-slate-200 hover:border-slate-350 hover:bg-slate-50/40'
                }`}
              >
                {/* Custom spacing outlines */}
                <div className={`p-2 rounded-lg border transition-colors ${isActive ? 'bg-white border-indigo-200' : 'bg-slate-50 border-slate-150 group-hover:bg-white'}`}>
                  {level === 'compact' && (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className={isActive ? 'text-indigo-600' : 'text-slate-400'}>
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.2" />
                      <rect x="5" y="5" width="14" height="14" rx="1" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1.5 1.5" className="opacity-40" />
                      <line x1="7" y1="8" x2="17" y2="8" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="7" y1="11" x2="17" y2="11" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="7" y1="14" x2="13" y2="14" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  )}
                  {level === 'normal' && (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className={isActive ? 'text-indigo-600' : 'text-slate-400'}>
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.2" />
                      <rect x="6" y="6" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1.5 1.5" className="opacity-40" />
                      <line x1="8" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="8" y1="13" x2="14" y2="13" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  )}
                  {level === 'loose' && (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className={isActive ? 'text-indigo-600' : 'text-slate-400'}>
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.2" />
                      <rect x="7" y="7" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1.5 1.5" className="opacity-40" />
                      <line x1="9" y1="11" x2="15" y2="11" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="9" y1="15" x2="12" y2="15" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  )}
                </div>
                
                <div className="flex flex-col">
                  <span className={`text-[11px] font-extrabold capitalize ${isActive ? 'text-indigo-600' : 'text-slate-700'}`}>{level}</span>
                  <span className="text-[9px] text-slate-400 mt-0.5 leading-none">
                    {level === 'compact' ? '0.4in margins' : level === 'normal' ? '0.6in margins' : '0.8in margins'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Base Font Size Scale (Redesigned visual cards) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.01)] space-y-5">
        <div className="flex items-center gap-2.5 font-bold text-slate-800 text-sm pb-2 border-b border-slate-100">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <Sliders size={15} className="text-indigo-500" />
          </div>
          <span>Typography Base Size</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {(['sm', 'md', 'lg'] as FontSizeAdjustType[]).map((size) => {
            const isActive = fontSizeAdjust === size;
            const sizeLabel = size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large';
            return (
              <button
                key={size}
                type="button"
                onClick={() => setFontSizeAdjust(size)}
                className={`group flex flex-col items-center gap-2.5 p-4 rounded-xl border text-center transition-all cursor-pointer ${
                  isActive 
                    ? 'border-indigo-500 bg-indigo-50/10 ring-2 ring-indigo-500/20 scale-[1.02] shadow-sm' 
                    : 'border-slate-200 hover:border-slate-350 hover:bg-slate-50/40'
                }`}
              >
                {/* Custom size visualizer */}
                <div className={`w-9 h-9 rounded-lg border transition-all flex items-center justify-center ${
                  isActive ? 'bg-white border-indigo-200' : 'bg-slate-50 border-slate-150 group-hover:bg-white'
                }`}>
                  <span 
                    className={`font-black ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}
                    style={{ fontSize: size === 'sm' ? '12px' : size === 'md' ? '16px' : '20px' }}
                  >
                    A
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className={`text-[11px] font-extrabold ${isActive ? 'text-indigo-600' : 'text-slate-700'}`}>{sizeLabel}</span>
                  <span className="text-[9px] text-slate-400 mt-0.5 leading-none">
                    {size === 'sm' ? '11px-12px text' : size === 'md' ? '13px-14px text' : '15px-16px text'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Document Font Selection */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.01)] space-y-5 animate-fadeIn">
        <div className="flex items-center gap-2.5 font-bold text-slate-800 text-sm pb-2 border-b border-slate-100">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <Type size={15} className="text-indigo-500" />
          </div>
          <span>Document Font</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'inter', name: 'Inter' },
            { id: 'outfit', name: 'Outfit' },
            { id: 'montserrat', name: 'Montserrat' },
            { id: 'roboto', name: 'Roboto' },
            { id: 'playfair', name: 'Playfair' },
            { id: 'merriweather', name: 'Merriweather' },
            { id: 'lora', name: 'Lora' },
            { id: 'times', name: 'Times' },
            { id: 'firacode', name: 'Fira Code' },
          ].map((f) => {
            const isActive = font === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFont(f.id as any)}
                className={`group flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  isActive 
                    ? 'border-indigo-500 bg-indigo-50/10 ring-2 ring-indigo-500/20 scale-[1.02] shadow-sm' 
                    : 'border-slate-200 hover:border-slate-350 hover:bg-slate-50/40'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg border transition-all flex items-center justify-center bg-slate-50 border-slate-150 group-hover:bg-white`}>
                  <span className={`text-sm font-black ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>Aa</span>
                </div>
                <span className={`text-[10px] font-extrabold truncate w-full ${isActive ? 'text-indigo-600 font-bold' : 'text-slate-650 font-semibold'}`}>
                  {f.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Template Selection */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.01)] space-y-5 animate-fadeIn">
        <div className="flex items-center gap-2.5 font-bold text-slate-800 text-sm pb-2 border-b border-slate-100">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <LayoutTemplate size={15} className="text-indigo-500" />
          </div>
          <span>Template Style</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'ats_simple', name: 'ATS Simple' },
            { id: 'ats_professional', name: 'ATS Professional' },
            { id: 'ats_modern', name: 'ATS Modern' },
            { id: 'modern', name: 'Modern' },
            { id: 'classic', name: 'Classic' },
            { id: 'creative', name: 'Creative' },
            { id: 'minimal', name: 'Minimal' },
            { id: 'executive', name: 'Executive' },
          ].map((t) => {
            const isActive = template === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTemplate(t.id as any)}
                className={`group flex items-center gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive 
                    ? 'border-indigo-500 bg-indigo-50/10 ring-2 ring-indigo-500/20 scale-[1.02] shadow-sm' 
                    : 'border-slate-200 hover:border-slate-350 hover:bg-slate-50/40'
                }`}
              >
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                  isActive ? 'bg-indigo-650 border-indigo-650 text-white' : 'bg-slate-100 border-slate-200 text-transparent'
                }`}>
                  <Check size={10} className="stroke-[3px]" />
                </div>
                <span className={`text-[10px] font-extrabold truncate ${isActive ? 'text-indigo-600 font-bold' : 'text-slate-650 font-semibold'}`}>
                  {t.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
