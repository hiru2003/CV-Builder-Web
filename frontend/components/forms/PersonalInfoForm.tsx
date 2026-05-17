'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCVStore } from '@/store/useCVStore';
import { PersonalInfo } from '@/types/cv';

export const PersonalInfoForm = () => {
  const { data, updatePersonal } = useCVStore();
  
  const { register, watch } = useForm<PersonalInfo>({
    defaultValues: data.personal,
  });

  // Sync form values to global store on change
  useEffect(() => {
    const subscription = watch((value) => {
      updatePersonal(value as PersonalInfo);
    });
    return () => subscription.unsubscribe();
  }, [watch, updatePersonal]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-800">Personal Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Full Name</label>
          <input 
            {...register('fullName')}
            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="e.g. John Doe"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Job Title</label>
          <input 
            {...register('jobTitle')}
            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="e.g. Software Engineer"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input 
            {...register('email')}
            type="email"
            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="john@example.com"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Phone</label>
          <input 
            {...register('phone')}
            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="+1 234 567 890"
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">Address</label>
          <input 
            {...register('address')}
            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="City, Country"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">LinkedIn URL</label>
          <input 
            {...register('linkedin')}
            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">GitHub URL</label>
          <input 
            {...register('github')}
            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="github.com/johndoe"
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">Profile Image URL</label>
          <input 
            {...register('image')}
            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="https://example.com/my-photo.jpg"
          />
        </div>
      </div>
    </div>
  );
};
