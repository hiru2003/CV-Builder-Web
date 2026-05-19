'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCVStore } from '@/store/useCVStore';
import { Check } from 'lucide-react';

export const SummaryForm = () => {
  const { data, updateSummary } = useCVStore();
  
  const { register, watch, formState: { errors, touchedFields } } = useForm<{ summary: string }>({
    defaultValues: { summary: data.summary },
    mode: 'onChange',
  });

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.summary !== undefined) {
        updateSummary(value.summary);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, updateSummary]);

  const value = watch('summary');
  const hasInitialValue = data.summary && data.summary !== '';
  const isValidAndNotEmpty = (touchedFields.summary || hasInitialValue) && value && value.trim() !== '' && !errors.summary;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-800">Professional Summary</h2>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Write a short summary about your professional background and goals.</label>
        <div className="relative">
          <textarea 
            {...register('summary', { 
              required: 'Summary is required',
              minLength: { value: 30, message: 'Summary should be at least 30 characters long.' }
            })}
            rows={6}
            className={`w-full p-3 pr-10 border rounded-md focus:ring-2 focus:outline-none resize-y ${
              errors.summary ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
            }`}
            placeholder="Experienced software engineer with a passion for building scalable web applications..."
          />
          {isValidAndNotEmpty && (
            <Check size={18} className="absolute right-3 top-3 text-green-500 stroke-[3px]" />
          )}
        </div>
        {errors.summary && (
          <p className="text-xs text-red-500 font-medium mt-1">{errors.summary.message}</p>
        )}
      </div>
    </div>
  );
};
