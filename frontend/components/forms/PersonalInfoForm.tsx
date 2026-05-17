'use client';

import React, { useEffect } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { useForm } from 'react-hook-form';
import { PersonalInfo } from '@/lib/types';

export function PersonalInfoForm() {
  const { state, dispatch } = useResume();
  const { register, watch } = useForm<PersonalInfo>({
    defaultValues: state.personalInfo,
  });

  const values = watch();

  useEffect(() => {
    // Only dispatch if values have actually changed from initial state
    const hasChanged = JSON.stringify(values) !== JSON.stringify(state.personalInfo);
    if (hasChanged) {
      const timer = setTimeout(() => {
        dispatch({
          type: 'UPDATE_PERSONAL_INFO',
          payload: values,
        });
      }, 300); // Debounce to avoid too many updates
      return () => clearTimeout(timer);
    }
  }, [values]);

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Personal Information</h1>

      <form className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              {...register('fullName')}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              {...register('email')}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              {...register('phone')}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Location
            </label>
            <input
              type="text"
              {...register('location')}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="San Francisco, CA"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Professional Summary
          </label>
          <textarea
            {...register('summary')}
            rows={4}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief overview of your professional background..."
          />
        </div>
      </form>
    </div>
  );
}
