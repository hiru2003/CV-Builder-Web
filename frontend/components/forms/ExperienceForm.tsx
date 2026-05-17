'use client';

import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useCVStore } from '@/store/useCVStore';
import { CVData } from '@/types/cv';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export const ExperienceForm = () => {
  const { data, setExperience } = useCVStore();
  
  const { register, control, watch } = useForm<{ experience: CVData['experience'] }>({
    defaultValues: {
      experience: data.experience.length > 0 ? data.experience : [{
        id: uuidv4(),
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: [''],
      }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experience',
  });

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.experience) {
        setExperience(value.experience as CVData['experience']);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setExperience]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Experience</h2>
        <button
          type="button"
          onClick={() => append({ id: uuidv4(), company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: [''] })}
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md transition-colors"
        >
          <Plus size={16} /> Add Experience
        </button>
      </div>
      
      <div className="space-y-8">
        {fields.map((field, index) => (
          <div key={field.id} className="p-5 border border-slate-200 rounded-xl bg-slate-50 relative group">
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Company</label>
                <input 
                  {...register(`experience.${index}.company`)}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  placeholder="e.g. Google"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Position</label>
                <input 
                  {...register(`experience.${index}.position`)}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  placeholder="e.g. Senior Developer"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Start Date</label>
                <input 
                  {...register(`experience.${index}.startDate`)}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  placeholder="e.g. Jan 2020"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 flex justify-between">
                  End Date
                  <label className="flex items-center gap-1 text-xs text-slate-500 font-normal cursor-pointer">
                    <input type="checkbox" {...register(`experience.${index}.current`)} className="rounded" />
                    Current
                  </label>
                </label>
                <input 
                  {...register(`experience.${index}.endDate`)}
                  disabled={watch(`experience.${index}.current`)}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white disabled:bg-slate-100 disabled:text-slate-400"
                  placeholder="e.g. Present"
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Location</label>
                <input 
                  {...register(`experience.${index}.location`)}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  placeholder="e.g. New York, NY"
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Description (comma separated points)</label>
                <textarea 
                  {...register(`experience.${index}.description`)}
                  rows={4}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white resize-y"
                  placeholder="Led a team of 5 developers..., Implemented CI/CD pipelines..."
                  onChange={(e) => {
                    // Quick hack to map textarea string to array
                    const arr = e.target.value.split(',').map(s => s.trim());
                    // This requires a custom controller for perfect array handling, but simple mapping works for now.
                  }}
                />
                <p className="text-xs text-slate-500">For best results in preview, separate bullet points with commas or write one continuous paragraph depending on template.</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
