'use client';

import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useCVStore } from '@/store/useCVStore';
import { CVData } from '@/types/cv';
import { Plus, Trash2, Check, ArrowLeft } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export const ProjectsForm = ({ onBack }: { onBack?: () => void }) => {
  const { data, setProjects } = useCVStore();
  
  const { register, control, watch, formState: { errors, touchedFields } } = useForm<{ projects: CVData['projects'] }>({
    defaultValues: {
      projects: data.projects.length > 0 ? data.projects : [{
        id: uuidv4(),
        name: '',
        description: '',
        technologies: [],
        link: '',
      }],
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects',
  });

  const formValues = watch();

  const isValidAndNotEmpty = (index: number, fieldName: 'name' | 'description' | 'link' | 'technologies') => {
    const list = formValues.projects;
    if (!list || !list[index]) return false;
    const val = list[index][fieldName];
    const fieldError = errors.projects?.[index]?.[fieldName];
    const isTouched = touchedFields.projects?.[index]?.[fieldName];
    
    const storeList = data.projects;
    let hasInitialValue = false;
    if (storeList && storeList[index]) {
      const storeVal = storeList[index][fieldName];
      hasInitialValue = Array.isArray(storeVal) ? storeVal.length > 0 : storeVal !== '';
    }
    
    if (fieldName === 'technologies') {
      const techVal = val as any;
      if (Array.isArray(techVal)) {
        return (isTouched || hasInitialValue) && techVal.length > 0 && !fieldError;
      }
      return (isTouched || hasInitialValue) && typeof techVal === 'string' && techVal.trim() !== '' && !fieldError;
    }
    
    return (isTouched || hasInitialValue) && val && typeof val === 'string' && val.trim() !== '' && !fieldError;
  };

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.projects) {
        // Convert comma-separated technologies to array
        const processedProjects = value.projects.map((p: any) => ({
          ...p,
          technologies: typeof p.technologies === 'string' 
            ? p.technologies.split(',').map((t: string) => t.trim()).filter(Boolean)
            : p.technologies
        }));
        setProjects(processedProjects as CVData['projects']);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setProjects]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        {onBack && (
          <button onClick={onBack} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors">
            <ArrowLeft size={18} />
          </button>
        )}
        <h2 className="text-xl font-bold text-slate-800">Projects</h2>
      </div>
      
      <div className="space-y-6">
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
                <label className="text-sm font-medium text-slate-700">Project Name</label>
                <div className="relative">
                  <input 
                    {...register(`projects.${index}.name`, { required: 'Name is required' })}
                    className={`w-full p-2 pr-9 border rounded-md focus:ring-2 focus:outline-none bg-white ${
                      errors.projects?.[index]?.name ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
                    }`}
                    placeholder="e.g. CV Builder Web App"
                  />
                  {isValidAndNotEmpty(index, 'name') && (
                    <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 stroke-[3px]" />
                  )}
                </div>
                {errors.projects?.[index]?.name && (
                  <p className="text-xs text-red-500 font-medium mt-1">{errors.projects[index].name.message}</p>
                )}
              </div>
              
              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Description</label>
                <div className="relative">
                  <textarea 
                    {...register(`projects.${index}.description`, { required: 'Description is required' })}
                    className={`w-full p-2 pr-9 border rounded-md focus:ring-2 focus:outline-none bg-white min-h-[80px] ${
                      errors.projects?.[index]?.description ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
                    }`}
                    placeholder="Describe your project, your role, and the impact..."
                  />
                  {isValidAndNotEmpty(index, 'description') && (
                    <Check size={18} className="absolute right-3 top-4 text-green-500 stroke-[3px]" />
                  )}
                </div>
                {errors.projects?.[index]?.description && (
                  <p className="text-xs text-red-500 font-medium mt-1">{errors.projects[index].description.message}</p>
                )}
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Technologies (comma separated)</label>
                <div className="relative">
                  <input 
                    {...register(`projects.${index}.technologies`, { required: 'Technologies are required' })}
                    className={`w-full p-2 pr-9 border rounded-md focus:ring-2 focus:outline-none bg-white ${
                      errors.projects?.[index]?.technologies ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
                    }`}
                    placeholder="e.g. React, TypeScript, Next.js"
                  />
                  {isValidAndNotEmpty(index, 'technologies') && (
                    <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 stroke-[3px]" />
                  )}
                </div>
                {errors.projects?.[index]?.technologies && (
                  <p className="text-xs text-red-500 font-medium mt-1">{errors.projects[index].technologies?.message}</p>
                )}
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Project URL (Optional)</label>
                <div className="relative">
                  <input 
                    {...register(`projects.${index}.link`)}
                    className="w-full p-2 pr-9 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    placeholder="e.g. https://github.com/..."
                  />
                  {isValidAndNotEmpty(index, 'link') && (
                    <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 stroke-[3px]" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => append({ id: uuidv4(), name: '', description: '', technologies: [], link: '' })}
        className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-blue-400 hover:text-blue-500 transition-colors"
      >
        <Plus size={18} /> Add Project
      </button>
    </div>
  );
};
