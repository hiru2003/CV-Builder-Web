'use client';

import React from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { useForm } from 'react-hook-form';
import { Experience } from '@/lib/types';
import { Trash2, Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export function ExperienceForm() {
  const { state, dispatch } = useResume();

  const handleAddExperience = () => {
    const newExperience: Experience = {
      id: uuidv4(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    dispatch({
      type: 'ADD_EXPERIENCE',
      payload: newExperience,
    });
  };

  const handleDeleteExperience = (id: string) => {
    dispatch({
      type: 'DELETE_EXPERIENCE',
      payload: id,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Work Experience</h1>
        <button
          onClick={handleAddExperience}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Add Experience
        </button>
      </div>

      <div className="space-y-6">
        {state.experience.map((exp) => (
          <ExperienceItem
            key={exp.id}
            experience={exp}
            onDelete={handleDeleteExperience}
          />
        ))}
      </div>
    </div>
  );
}

function ExperienceItem({
  experience,
  onDelete,
}: {
  experience: Experience;
  onDelete: (id: string) => void;
}) {
  const { dispatch } = useResume();
  const { register, watch } = useForm<Experience>({
    defaultValues: experience,
  });

  const values = watch();
  React.useEffect(() => {
    const hasChanged = JSON.stringify(values) !== JSON.stringify(experience);
    if (hasChanged) {
      const timer = setTimeout(() => {
        dispatch({
          type: 'UPDATE_EXPERIENCE',
          payload: values,
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [values, dispatch, experience]);

  return (
    <div className="border border-slate-200 rounded-lg p-6">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">
          {values.jobTitle || 'Job Title'}
        </h3>
        <button
          onClick={() => onDelete(experience.id)}
          className="text-red-600 hover:text-red-800 transition-colors"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Job Title
          </label>
          <input
            type="text"
            {...register('jobTitle')}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Senior Engineer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Company
          </label>
          <input
            type="text"
            {...register('company')}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Tech Corp"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Location
          </label>
          <input
            type="text"
            {...register('location')}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="San Francisco, CA"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Start Date
          </label>
          <input
            type="month"
            {...register('startDate')}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              {...register('current')}
              className="mr-2"
            />
            Currently working here
          </label>
        </div>

        {!values.current && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              End Date
            </label>
            <input
              type="month"
              {...register('endDate')}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Description
        </label>
        <textarea
          {...register('description')}
          rows={3}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          placeholder="Describe your responsibilities and achievements..."
        />
      </div>
    </div>
  );
}
