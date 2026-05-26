'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCVStore } from '@/store/useCVStore';
import { Check, Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SummaryForm = () => {
  const { data, updateSummary } = useCVStore();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { register, watch, setValue, formState: { errors, touchedFields } } = useForm<{ summary: string }>({
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

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'summary',
          payload: {
            jobTitle: data.personal.jobTitle,
            skills: data.skills,
            currentSummary: value,
          },
        }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || 'Failed to generate summary');
      }

      if (resData.text) {
        setValue('summary', resData.text, { shouldDirty: true, shouldValidate: true });
        toast({
          title: 'Success',
          description: 'AI professional summary generated successfully!',
        });
      }
    } catch (err: any) {
      console.error(err);
      toast({
        title: 'AI Generation Failed',
        description: err.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Professional Summary</h2>
        <button
          type="button"
          onClick={handleGenerateAI}
          disabled={isGenerating}
          className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg border border-indigo-100 transition-all duration-200 shadow-sm"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Generate with AI</span>
            </>
          )}
        </button>
      </div>
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
