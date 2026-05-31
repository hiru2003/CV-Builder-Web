'use client';

import React from 'react';
import { useCVStore } from '@/store/useCVStore';
import { Sliders, Palette, ZoomIn, ZoomOut, Move } from 'lucide-react';
import { SpacingType, FontSizeAdjustType } from '@/types/cv';

export const LayoutForm = () => {
  const { 
    themeColor, 
    spacing, 
    fontSizeAdjust, 
    setThemeColor, 
    setSpacing, 
    setFontSizeAdjust 
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
    { name: 'Pure Black', value: '#000000' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-1">Layout & Formatting</h2>
        <p className="text-sm text-slate-550">Fine-tune the presentation, sizing, and styling colors of your resume.</p>
      </div>

      {/* 1. Colors Option */}
      <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200/60 space-y-4">
        <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
          <Palette size={18} className="text-indigo-500" />
          <span>Accent Theme Color</span>
        </div>
        
        {/* Preset grid */}
        <div className="grid grid-cols-5 gap-3">
          {colorPresets.map((preset) => {
            const isActive = themeColor.toLowerCase() === preset.value.toLowerCase();
            return (
              <button
                key={preset.value}
                type="button"
                onClick={() => setThemeColor(preset.value)}
                className={`h-9 rounded-xl transition-all border relative flex items-center justify-center ${
                  isActive 
                    ? 'ring-2 ring-indigo-500 scale-[1.05] border-transparent' 
                    : 'border-slate-200/80 hover:scale-[1.02]'
                }`}
                style={{ backgroundColor: preset.value }}
                title={preset.name}
              >
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-white shadow-md"></span>
                )}
              </button>
            );
          })}
          
          {/* Custom color picker */}
          <div className="relative h-9 rounded-xl border border-slate-200/80 bg-white flex items-center justify-center cursor-pointer hover:border-slate-350 transition-colors">
            <input 
              type="color"
              value={themeColor}
              onChange={(e) => setThemeColor(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <span className="text-[10px] font-bold text-slate-500 uppercase">Custom</span>
          </div>
        </div>

        {/* Input color display */}
        <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200/60 w-fit">
          <div className="w-5 h-5 rounded-md border border-slate-200" style={{ backgroundColor: themeColor }}></div>
          <span className="text-xs font-mono font-bold text-slate-600">{themeColor.toUpperCase()}</span>
        </div>
      </div>

      {/* 2. Spacing / Margins Level */}
      <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200/60 space-y-4">
        <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
          <Move size={18} className="text-indigo-500" />
          <span>Section Margins & Spacing</span>
        </div>

        <div className="flex bg-slate-200/60 p-1 rounded-xl border border-slate-200/40 w-full">
          {(['compact', 'normal', 'loose'] as SpacingType[]).map((level) => {
            const isActive = spacing === level;
            return (
              <button
                key={level}
                type="button"
                onClick={() => setSpacing(level)}
                className={`flex-1 py-2 text-xs font-bold capitalize rounded-lg transition-all ${
                  isActive 
                    ? 'bg-white text-indigo-650 shadow-sm border border-slate-200/20' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {level}
              </button>
            );
          })}
        </div>
        <p className="text-[11px] text-slate-400">
          Compact margin is recommended if you have a lot of content and want to fit it on a single page.
        </p>
      </div>

      {/* 3. Font Size Level */}
      <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200/60 space-y-4">
        <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
          <Sliders size={18} className="text-indigo-500" />
          <span>Base Font Size Scale</span>
        </div>

        <div className="flex bg-slate-200/60 p-1 rounded-xl border border-slate-200/40 w-full">
          {(['sm', 'md', 'lg'] as FontSizeAdjustType[]).map((size) => {
            const isActive = fontSizeAdjust === size;
            const sizeLabel = size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large';
            return (
              <button
                key={size}
                type="button"
                onClick={() => setFontSizeAdjust(size)}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  isActive 
                    ? 'bg-white text-indigo-650 shadow-sm border border-slate-200/20' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {sizeLabel}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
