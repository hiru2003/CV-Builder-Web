'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCVStore } from '@/store/useCVStore';
import { PersonalInfo } from '@/types/cv';
import { Check, X, Sparkles, FileUp } from 'lucide-react';

export const PersonalInfoForm = () => {
  const { data, updatePersonal, template } = useCVStore();
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const { register, watch, formState: { errors, touchedFields } } = useForm<PersonalInfo>({
    defaultValues: data.personal,
    mode: 'onChange',
  });

  const values = watch();

  const isValidAndNotEmpty = (fieldName: keyof PersonalInfo) => {
    const val = values[fieldName];
    const isTouched = touchedFields[fieldName];
    const hasInitialValue = data.personal[fieldName] && data.personal[fieldName] !== '';
    return (isTouched || hasInitialValue) && val && typeof val === 'string' && val.trim() !== '' && !errors[fieldName];
  };

  const showPhotoOption = template === 'modern' || template === 'creative';

  const processFile = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      updatePersonal({ image: reader.result as string });
      setIsPhotoModalOpen(false);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        processFile(file);
      }
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
                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(true)}
                  className="inline-flex items-center justify-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  {data.personal.image ? 'Change Photo' : 'Upload Photo'}
                </button>
                <p className="mt-2 text-xs text-slate-500 leading-normal">Supports JPG, PNG or GIF. Max size: 10MB.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsPhotoModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="p-8 pb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-2 font-serif">Photo Upload</h2>
              <p className="text-slate-500 font-medium mb-8">Follow the instructions to ensure you have the best photo for your resume.</p>
              
              <div className="mb-8">
                <h3 className="text-[#00A3FF] font-semibold mb-4 text-lg">How to add your photo:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-700 font-medium">
                    <Sparkles className="text-yellow-400 shrink-0 mt-0.5 fill-yellow-400" size={18} />
                    <span>Use a recent color photo in JPEG, PNG, or GIF format and up to 10 MB.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 font-medium">
                    <Sparkles className="text-yellow-400 shrink-0 mt-0.5 fill-yellow-400" size={18} />
                    <span>Crop your photo so it only shows your head and shoulders.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 font-medium">
                    <Sparkles className="text-yellow-400 shrink-0 mt-0.5 fill-yellow-400" size={18} />
                    <span>If you already uploaded a photo, uploading another will replace it.</span>
                  </li>
                </ul>
              </div>

              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-[1.5rem] p-10 text-center transition-colors ${
                  isDragging ? 'border-[#00A3FF] bg-[#00A3FF]/5' : 'border-slate-300'
                }`}
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-slate-50 border border-slate-300 shadow-sm rounded-lg flex items-center justify-center mb-6">
                    <FileUp size={32} className="text-slate-400 stroke-1" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">Drag and drop your photo here</h4>
                  <p className="text-slate-400 font-medium mb-6">or</p>
                  
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="modal-photo-upload"
                  />
                  <label
                    htmlFor="modal-photo-upload"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-lg text-white bg-[#00A3FF] hover:bg-[#0090e6] shadow-sm hover:shadow-md cursor-pointer transition-all active:scale-95"
                  >
                    Upload from device
                  </label>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
              <p className="text-sm font-medium text-slate-600">Some employers won't consider resumes with photos. Check the job application requirements before you add a photo.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
