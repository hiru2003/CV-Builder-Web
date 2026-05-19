'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCVStore } from '@/store/useCVStore';
import { PersonalInfo } from '@/types/cv';
import { Check } from 'lucide-react';

export const PersonalInfoForm = () => {
  const { data, updatePersonal, template } = useCVStore();
  
  const { register, watch, formState: { errors } } = useForm<PersonalInfo>({
    defaultValues: data.personal,
    mode: 'onChange',
  });

  const values = watch();

  const isValidAndNotEmpty = (fieldName: keyof PersonalInfo) => {
    const val = values[fieldName];
    return val && typeof val === 'string' && val.trim() !== '' && !errors[fieldName];
  };

  const showPhotoOption = template === 'modern' || template === 'creative';

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonal({ image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Sync form values to global store on change
  useEffect(() => {
    const subscription = watch((value) => {
      // Avoid overwriting image with undefined/empty during watch sync
      const { image, ...rest } = value;
      updatePersonal(rest as PersonalInfo);
    });
    return () => subscription.unsubscribe();
  }, [watch, updatePersonal]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-800">Personal Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Full Name</label>
          <div className="relative">
            <input 
              {...register('fullName', { required: 'Full Name is required' })}
              className={`w-full p-2 pr-9 border rounded-md focus:ring-2 focus:outline-none ${
                errors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
              }`}
              placeholder="e.g. John Doe"
            />
            {isValidAndNotEmpty('fullName') && (
              <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 stroke-[3px]" />
            )}
          </div>
          {errors.fullName && (
            <p className="text-xs text-red-500 font-medium mt-1">{errors.fullName.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Job Title</label>
          <div className="relative">
            <input 
              {...register('jobTitle', { required: 'Job Title is required' })}
              className={`w-full p-2 pr-9 border rounded-md focus:ring-2 focus:outline-none ${
                errors.jobTitle ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
              }`}
              placeholder="e.g. Software Engineer"
            />
            {isValidAndNotEmpty('jobTitle') && (
              <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 stroke-[3px]" />
            )}
          </div>
          {errors.jobTitle && (
            <p className="text-xs text-red-500 font-medium mt-1">{errors.jobTitle.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <div className="relative">
            <input 
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              type="email"
              className={`w-full p-2 pr-9 border rounded-md focus:ring-2 focus:outline-none ${
                errors.email ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
              }`}
              placeholder="john@example.com"
            />
            {isValidAndNotEmpty('email') && (
              <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 stroke-[3px]" />
            )}
          </div>
          {errors.email && (
            <p className="text-xs text-red-500 font-medium mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Phone</label>
          <div className="relative">
            <input 
              {...register('phone', {
                pattern: {
                  value: /^[+]?[0-9\s-]{7,15}$/,
                  message: 'Invalid phone number format'
                }
              })}
              className={`w-full p-2 pr-9 border rounded-md focus:ring-2 focus:outline-none ${
                errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
              }`}
              placeholder="+1 234 567 890"
            />
            {isValidAndNotEmpty('phone') && (
              <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 stroke-[3px]" />
            )}
          </div>
          {errors.phone && (
            <p className="text-xs text-red-500 font-medium mt-1">{errors.phone.message}</p>
          )}
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">Address</label>
          <div className="relative">
            <input 
              {...register('address')}
              className={`w-full p-2 pr-9 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              placeholder="City, Country"
            />
            {isValidAndNotEmpty('address') && (
              <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 stroke-[3px]" />
            )}
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">LinkedIn URL</label>
          <div className="relative">
            <input 
              {...register('linkedin', {
                pattern: {
                  value: /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/i,
                  message: 'Must be a valid LinkedIn URL'
                }
              })}
              className={`w-full p-2 pr-9 border rounded-md focus:ring-2 focus:outline-none ${
                errors.linkedin ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
              }`}
              placeholder="linkedin.com/in/johndoe"
            />
            {isValidAndNotEmpty('linkedin') && (
              <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 stroke-[3px]" />
            )}
          </div>
          {errors.linkedin && (
            <p className="text-xs text-red-500 font-medium mt-1">{errors.linkedin.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">GitHub URL</label>
          <div className="relative">
            <input 
              {...register('github', {
                pattern: {
                  value: /^(https?:\/\/)?(www\.)?github\.com\/.*$/i,
                  message: 'Must be a valid GitHub URL'
                }
              })}
              className={`w-full p-2 pr-9 border rounded-md focus:ring-2 focus:outline-none ${
                errors.github ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
              }`}
              placeholder="github.com/johndoe"
            />
            {isValidAndNotEmpty('github') && (
              <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 stroke-[3px]" />
            )}
          </div>
          {errors.github && (
            <p className="text-xs text-red-500 font-medium mt-1">{errors.github.message}</p>
          )}
        </div>
        {showPhotoOption && (
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Profile Photo</label>
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
              {data.personal.image ? (
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm shrink-0 group">
                  <img src={data.personal.image} alt="Profile Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => updatePersonal({ image: '' })}
                    className="absolute inset-0 bg-black/60 text-white flex flex-col items-center justify-center text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-slate-200 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 font-bold text-xs shrink-0 select-none">
                  No Photo
                </div>
              )}
              <div className="flex-grow">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="profile-photo-upload"
                />
                <label
                  htmlFor="profile-photo-upload"
                  className="inline-flex items-center justify-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Upload Photo
                </label>
                <p className="mt-2 text-xs text-slate-500 leading-normal">Supports JPG, PNG or WEBP. Recommended size: 500x500px.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
