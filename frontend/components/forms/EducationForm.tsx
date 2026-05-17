'use client';

import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useCVStore } from '@/store/useCVStore';
import { CVData } from '@/types/cv';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export const EducationForm = () => {
  const { data, setEducation } = useCVStore();
  
  const { register, control, watch } = useForm<{ education: CVData['education'] }>({
    defaultValues: {
      education: data.education.length > 0 ? data.education : [{
        id: uuidv4(),
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        current: false,
        score: '',
      }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.education) {
        setEducation(value.education as CVData['education']);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setEducation]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Education</h2>
        <button
          type="button"
          onClick={() => append({ id: uuidv4(), institution: '', degree: '', field: '', startDate: '', endDate: '', current: false, score: '' })}
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md transition-colors"
        >
          <Plus size={16} /> Add Education
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
              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Institution</label>
                <input 
                  {...register(`education.${index}.institution`)}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  placeholder="e.g. Harvard University"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Degree</label>
                <input 
                  {...register(`education.${index}.degree`)}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  placeholder="e.g. Bachelor of Science"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Field of Study</label>
                <input 
                  {...register(`education.${index}.field`)}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  placeholder="e.g. Computer Science"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Start Date</label>
                <input 
                  {...register(`education.${index}.startDate`)}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  placeholder="e.g. Sep 2018"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 flex justify-between">
                  End Date
                  <label className="flex items-center gap-1 text-xs text-slate-500 font-normal cursor-pointer">
                    <input type="checkbox" {...register(`education.${index}.current`)} className="rounded" />
                    Current
                  </label>
                </label>
                <input 
                  {...register(`education.${index}.endDate`)}
                  disabled={watch(`education.${index}.current`)}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white disabled:bg-slate-100 disabled:text-slate-400"
                  placeholder="e.g. May 2022"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Score / GPA (Optional)</label>
                <input 
                  {...register(`education.${index}.score`)}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  placeholder="e.g. 3.8/4.0"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
