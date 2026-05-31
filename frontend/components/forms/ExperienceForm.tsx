'use client';

import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useCVStore } from '@/store/useCVStore';
import { CVData } from '@/types/cv';
import { Plus, Trash2, Check, Sparkles, Loader2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';

export const ExperienceForm = () => {
  const { data, setExperience } = useCVStore();
  const { toast } = useToast();
  const [generatingIndex, setGeneratingIndex] = useState<number | null>(null);
  const [tone, setTone] = useState<'action-oriented' | 'technical' | 'results-driven'>('action-oriented');
  const [mode, setMode] = useState<'generate' | 'refine'>('generate');
  
  const { register, control, watch, setValue, formState: { errors, touchedFields } } = useForm<{ experience: CVData['experience'] }>({
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

  const handleEnhanceExperience = async (index: number) => {
    const list = watch('experience');
    const item = list?.[index];
    if (!item) return;

    if (!item.position || !item.company) {
      toast({
        title: 'More Context Needed',
        description: 'Please fill in Company and Position fields to generate tailored experience bullet points.',
      });
      return;
    }

    if (mode === 'refine' && (!item.description || (Array.isArray(item.description) ? item.description.join('').trim() === '' : (item.description as any).trim() === ''))) {
      toast({
        title: 'Draft Required',
        description: 'Please write a draft in the description textarea first, then click "Polish Draft" to let AI enhance it.',
      });
      return;
    }

    setGeneratingIndex(index);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'experience',
          payload: {
            position: item.position,
            company: item.company,
            skills: data.skills,
            currentDescription: Array.isArray(item.description) ? item.description.join(', ') : item.description,
            tone,
            mode,
          },
        }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || 'Failed to enhance description');
      }

      if (resData.text) {
        setValue(`experience.${index}.description` as any, resData.text, { shouldDirty: true, shouldValidate: true });
        toast({
          title: 'Success',
          description: mode === 'refine' ? 'AI polished your experience draft successfully!' : 'Experience description enhanced successfully!',
        });
      }
    } catch (err: any) {
      console.error(err);
      toast({
        title: 'Enhancement Failed',
        description: err.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setGeneratingIndex(null);
    }
  };

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
        hasInitialValue = !!(storeVal && storeVal !== '');
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
        // Convert comma-separated descriptions or paragraphs to array if it is a string
        const processedExperience = value.experience.map((exp: any) => ({
          ...exp,
          description: typeof exp.description === 'string'
            ? exp.description.split(',').map((d: string) => d.trim()).filter(Boolean)
            : (Array.isArray(exp.description) ? exp.description : [])
        }));
        setExperience(processedExperience as CVData['experience']);
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
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-slate-700">Description (comma separated points)</label>
                  <button
                    type="button"
                    onClick={() => handleEnhanceExperience(index)}
                    disabled={generatingIndex !== null}
                    className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed px-2.5 py-1 rounded-md border border-indigo-100 transition-all duration-200 shadow-sm"
                  >
                    {generatingIndex === index ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>{mode === 'refine' ? 'Polishing...' : 'Enhancing...'}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{mode === 'refine' ? 'Polish Draft' : 'Enhance with AI'}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-slate-100 border border-slate-200 p-2 rounded-md flex flex-wrap gap-3 items-center justify-between text-[10px] text-slate-500 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-slate-600">Tone:</span>
                      <select
                        value={tone}
                        onChange={(e) => setTone(e.target.value as any)}
                        className="p-0.5 border border-slate-300 rounded bg-white text-slate-700 focus:outline-none"
                      >
                        <option value="action-oriented">Action-Oriented</option>
                        <option value="technical">Technical</option>
                        <option value="results-driven">Results-Driven</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-slate-600">Mode:</span>
                      <div className="flex bg-slate-200 rounded p-0.5 border border-slate-300">
                        <button
                          type="button"
                          onClick={() => setMode('generate')}
                          className={`px-1.5 py-0.5 rounded transition-all text-[9px] ${
                            mode === 'generate'
                              ? 'bg-white font-semibold text-slate-700 shadow-sm'
                              : 'text-slate-500'
                          }`}
                        >
                          Write New
                        </button>
                        <button
                          type="button"
                          onClick={() => setMode('refine')}
                          className={`px-1.5 py-0.5 rounded transition-all text-[9px] ${
                            mode === 'refine'
                              ? 'bg-white font-semibold text-slate-700 shadow-sm'
                              : 'text-slate-500'
                          }`}
                        >
                          Polish Draft
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
