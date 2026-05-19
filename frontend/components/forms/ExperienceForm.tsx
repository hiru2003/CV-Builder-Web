'use client';

import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useCVStore } from '@/store/useCVStore';
import { CVData } from '@/types/cv';
import { Plus, Trash2, Check } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export const ExperienceForm = () => {
  const { data, setExperience } = useCVStore();
  
  const { register, control, watch, formState: { errors, touchedFields } } = useForm<{ experience: CVData['experience'] }>({
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
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experience',
  });

  const formValues = watch();

  const isValidAndNotEmpty = (index: number, fieldName: 'company' | 'position' | 'location' | 'startDate' | 'endDate' | 'description') => {
    const list = formValues.experience;
    if (!list || !list[index]) return false;
    const val = list[index][fieldName];
    const fieldError = errors.experience?.[index]?.[fieldName];
    const isTouched = touchedFields.experience?.[index]?.[fieldName];
    
    const storeList = data.experience;
    let hasInitialValue = false;
    if (storeList && storeList[index]) {
      const storeVal = storeList[index][fieldName];
      if (fieldName === 'description') {
        const descArray = storeVal as any;
        hasInitialValue = Array.isArray(descArray) ? (descArray.length > 0 && descArray[0] !== '') : (descArray && descArray !== '');
      } else {
        hasInitialValue = storeVal && storeVal !== '';
      }
    }
    
    const isTouchedOrHasInitial = isTouched || hasInitialValue;

    if (fieldName === 'description') {
      const descVal = val as any;
      if (Array.isArray(descVal)) {
        return isTouchedOrHasInitial && descVal.length > 0 && descVal[0].trim() !== '' && !fieldError;
      }
      return isTouchedOrHasInitial && descVal && typeof descVal === 'string' && descVal.trim() !== '' && !fieldError;
    }
    
    return isTouchedOrHasInitial && val && typeof val === 'string' && val.trim() !== '' && !fieldError;
  };

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
                <div className="relative">
                  <input 
                    {...register(`experience.${index}.company`, { required: 'Company is required' })}
                    className={`w-full p-2 pr-9 border rounded-md focus:ring-2 focus:outline-none bg-white ${
                      errors.experience?.[index]?.company ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
                    }`}
                    placeholder="e.g. Google"
                  />
                  {isValidAndNotEmpty(index, 'company') && (
                    <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 stroke-[3px]" />
                  )}
                </div>
                {errors.experience?.[index]?.company && (
                  <p className="text-xs text-red-500 font-medium mt-1">{errors.experience[index].company.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Position</label>
                <div className="relative">
                  <input 
                    {...register(`experience.${index}.position`, { required: 'Position is required' })}
                    className={`w-full p-2 pr-9 border rounded-md focus:ring-2 focus:outline-none bg-white ${
                      errors.experience?.[index]?.position ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
                    }`}
                    placeholder="e.g. Senior Developer"
                  />
                  {isValidAndNotEmpty(index, 'position') && (
                    <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 stroke-[3px]" />
                  )}
                </div>
                {errors.experience?.[index]?.position && (
                  <p className="text-xs text-red-500 font-medium mt-1">{errors.experience[index].position.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Start Date</label>
                <div className="relative">
                  <input 
                    {...register(`experience.${index}.startDate`, { required: 'Start Date is required' })}
                    className={`w-full p-2 pr-9 border rounded-md focus:ring-2 focus:outline-none bg-white ${
                      errors.experience?.[index]?.startDate ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
                    }`}
                    placeholder="e.g. Jan 2020"
                  />
                  {isValidAndNotEmpty(index, 'startDate') && (
                    <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 stroke-[3px]" />
                  )}
                </div>
                {errors.experience?.[index]?.startDate && (
                  <p className="text-xs text-red-500 font-medium mt-1">{errors.experience[index].startDate.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 flex justify-between">
                  End Date
                  <label className="flex items-center gap-1 text-xs text-slate-500 font-normal cursor-pointer">
                    <input type="checkbox" {...register(`experience.${index}.current`)} className="rounded" />
                    Current
                  </label>
                </label>
                <div className="relative">
                  <input 
                    {...register(`experience.${index}.endDate`, { 
                      validate: (val, formVals) => {
                        const currentChecked = formVals.experience[index]?.current;
                        if (!currentChecked && (!val || val.trim() === '')) {
                          return 'End Date is required';
                        }
                        return true;
                      }
                    })}
                    disabled={watch(`experience.${index}.current`)}
                    className={`w-full p-2 pr-9 border rounded-md focus:ring-2 focus:outline-none bg-white disabled:bg-slate-100 disabled:text-slate-400 ${
                      errors.experience?.[index]?.endDate ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
                    }`}
                    placeholder="e.g. Present"
                  />
                  {isValidAndNotEmpty(index, 'endDate') && !watch(`experience.${index}.current`) && (
                    <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 stroke-[3px]" />
                  )}
                </div>
                {errors.experience?.[index]?.endDate && (
                  <p className="text-xs text-red-500 font-medium mt-1">{errors.experience[index].endDate.message}</p>
                )}
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Location</label>
                <div className="relative">
                  <input 
                    {...register(`experience.${index}.location`)}
                    className="w-full p-2 pr-9 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    placeholder="e.g. New York, NY"
                  />
                  {isValidAndNotEmpty(index, 'location') && (
                    <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 stroke-[3px]" />
                  )}
                </div>
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Description (comma separated points)</label>
                <div className="relative">
                  <textarea 
                    {...register(`experience.${index}.description`)}
                    rows={4}
                    className="w-full p-2 pr-9 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white resize-y"
                    placeholder="Led a team of 5 developers..., Implemented CI/CD pipelines..."
                  />
                  {isValidAndNotEmpty(index, 'description') && (
                    <Check size={18} className="absolute right-3 top-3 text-green-500 stroke-[3px]" />
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1">For best results in preview, separate bullet points with commas or write one continuous paragraph depending on template.</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
