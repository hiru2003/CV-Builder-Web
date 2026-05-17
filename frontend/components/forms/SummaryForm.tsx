'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCVStore } from '@/store/useCVStore';

export const SummaryForm = () => {
  const { data, updateSummary } = useCVStore();
  
  const { register, watch } = useForm<{ summary: string }>({
    defaultValues: { summary: data.summary },
  });

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.summary !== undefined) {
        updateSummary(value.summary);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, updateSummary]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-800">Professional Summary</h2>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Write a short summary about your professional background and goals.</label>
        <textarea 
          {...register('summary')}
          rows={6}
          className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-y"
          placeholder="Experienced software engineer with a passion for building scalable web applications..."
        />
      </div>
    </div>
  );
};
