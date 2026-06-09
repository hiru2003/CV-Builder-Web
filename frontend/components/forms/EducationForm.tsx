'use client';

import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useCVStore } from '@/store/useCVStore';
import { CVData } from '@/types/cv';
import { Plus, Trash2, Check } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { insertionSort, parseResumeDate, compareDatesReverse } from '@/lib/templateUtils';

export const EducationForm = () => {
  const { data, setEducation } = useCVStore();
  
  const { toast } = useToast();
  const { register, control, watch, setValue, formState: { errors, touchedFields } } = useForm<{ education: CVData['education'] }>({
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
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });

  const formValues = watch();

  const sortEducation = () => {
    const list = watch('education');
    if (!list || list.length <= 1) return;

    const sorted = insertionSort(list, (a, b) => {
      // Sort by end date (most recent first)
      const aEnd = parseResumeDate(a.endDate, a.current);
      const bEnd = parseResumeDate(b.endDate, b.current);
      const endCompare = compareDatesReverse(aEnd, bEnd);
      if (endCompare !== 0) return endCompare;

      // If end dates are equal, sort by start date
      const aStart = parseResumeDate(a.startDate);
      const bStart = parseResumeDate(b.startDate);
      return compareDatesReverse(aStart, bStart);
    });

    // Replace the fields in react-hook-form
    setValue('education', sorted, { shouldDirty: true, shouldValidate: true });
    
    toast({
      title: 'Sorted Successfully',
      description: 'Your education records have been sorted in reverse-chronological order (most recent first) using stable Insertion Sort!',
    });
  };

  const isValidAndNotEmpty = (index: number, fieldName: 'institution' | 'degree' | 'field' | 'startDate' | 'endDate' | 'score') => {
    const list = formValues.education;
    if (!list || !list[index]) return false;
    const val = list[index][fieldName];
    const fieldError = errors.education?.[index]?.[fieldName];
    const isTouched = touchedFields.education?.[index]?.[fieldName];
    const storeList = data.education;
    const hasInitialValue = storeList && storeList[index] && storeList[index][fieldName] && storeList[index][fieldName] !== '';
    return (isTouched || hasInitialValue) && val && typeof val === 'string' && val.trim() !== '' && !fieldError;
  };

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
        <div className="flex gap-2">
          {fields.length > 1 && (
            <button
              type="button"
              onClick={sortEducation}
              className="flex items-center gap-1.5 text-sm font-semibold text-indigo-650 hover:text-indigo-750 bg-indigo-55 bg-indigo-50 hover:bg-indigo-100 border border-indigo-150 px-3 py-1.5 rounded-md transition-colors shadow-xs cursor-pointer"
            >
              Sort Chronologically
            </button>
          )}
          <button
            type="button"
            onClick={() => append({ id: uuidv4(), institution: '', degree: '', field: '', startDate: '', endDate: '', current: false, score: '' })}
            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md transition-colors"
          >
            <Plus size={16} /> Add Education
          </button>
        </div>
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
                <div className="relative">
                  <input 
                    {...register(`education.${index}.institution`, { required: 'Institution is required' })}
                    className={`w-full p-2 pr-9 border rounded-md focus:ring-2 focus:outline-none bg-white ${
                      errors.education?.[index]?.institution ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
                    }`}
                    placeholder="e.g. Harvard University"
                  />
                  {isValidAndNotEmpty(index, 'institution') && (
                    <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 stroke-[3px]" />
                  )}
                </div>
                {errors.education?.[index]?.institution && (
                  <p className="text-xs text-red-500 font-medium mt-1">{errors.education[index].institution.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Degree</label>
                <div className="relative">
                  <input 
                    {...register(`education.${index}.degree`, { required: 'Degree is required' })}
                    className={`w-full p-2 pr-9 border rounded-md focus:ring-2 focus:outline-none bg-white ${
                      errors.education?.[index]?.degree ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
                    }`}
                    placeholder="e.g. Bachelor of Science"
                  />
                  {isValidAndNotEmpty(index, 'degree') && (
                    <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 stroke-[3px]" />
                  )}
                </div>
                {errors.education?.[index]?.degree && (
                  <p className="text-xs text-red-500 font-medium mt-1">{errors.education[index].degree.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Field of Study</label>
                <div className="relative">
                  <input 
                    {...register(`education.${index}.field`, { required: 'Field of study is required' })}
                    className={`w-full p-2 pr-9 border rounded-md focus:ring-2 focus:outline-none bg-white ${
                      errors.education?.[index]?.field ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
                    }`}
                    placeholder="e.g. Computer Science"
                  />
                  {isValidAndNotEmpty(index, 'field') && (
                    <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 stroke-[3px]" />
                  )}
                </div>
                {errors.education?.[index]?.field && (
                  <p className="text-xs text-red-500 font-medium mt-1">{errors.education[index].field.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Start Date</label>
                <div className="relative">
                  <input 
                    {...register(`education.${index}.startDate`, { required: 'Start Date is required' })}
                    className={`w-full p-2 pr-9 border rounded-md focus:ring-2 focus:outline-none bg-white ${
                      errors.education?.[index]?.startDate ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
                    }`}
                    placeholder="e.g. Sep 2018"
                  />
                  {isValidAndNotEmpty(index, 'startDate') && (
                    <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 stroke-[3px]" />
                  )}
                </div>
                {errors.education?.[index]?.startDate && (
                  <p className="text-xs text-red-500 font-medium mt-1">{errors.education[index].startDate.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 flex justify-between">
                  End Date
                  <label className="flex items-center gap-1 text-xs text-slate-500 font-normal cursor-pointer">
                    <input type="checkbox" {...register(`education.${index}.current`)} className="rounded" />
                    Current
                  </label>
                </label>
                <div className="relative">
                  <input 
                    {...register(`education.${index}.endDate`, { 
                      validate: (val, formVals) => {
                        const currentChecked = formVals.education[index]?.current;
                        if (!currentChecked && (!val || val.trim() === '')) {
                          return 'End Date is required';
                        }
                        return true;
                      }
                    })}
                    disabled={watch(`education.${index}.current`)}
                    className={`w-full p-2 pr-9 border rounded-md focus:ring-2 focus:outline-none bg-white disabled:bg-slate-100 disabled:text-slate-400 ${
                      errors.education?.[index]?.endDate ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
                    }`}
                    placeholder="e.g. May 2022"
                  />
                  {isValidAndNotEmpty(index, 'endDate') && !watch(`education.${index}.current`) && (
                    <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 stroke-[3px]" />
                  )}
                </div>
                {errors.education?.[index]?.endDate && (
                  <p className="text-xs text-red-500 font-medium mt-1">{errors.education[index].endDate.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Score / GPA (Optional)</label>
                <div className="relative">
                  <input 
                    {...register(`education.${index}.score`)}
                    className="w-full p-2 pr-9 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    placeholder="e.g. 3.8/4.0"
                  />
                  {isValidAndNotEmpty(index, 'score') && (
                    <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 stroke-[3px]" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
