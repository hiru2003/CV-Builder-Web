'use client';

import React from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { useForm } from 'react-hook-form';
import { Education } from '@/lib/types';
import { Trash2, Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export function EducationForm() {
  const { state, dispatch } = useResume();

  const handleAddEducation = () => {
    const newEducation: Education = {
      id: uuidv4(),
      school: '',
      degree: '',
      field: '',
      graduationDate: '',
      description: '',
    };
    dispatch({
      type: 'ADD_EDUCATION',
      payload: newEducation,
    });
  };

  const handleDeleteEducation = (id: string) => {
    dispatch({
      type: 'DELETE_EDUCATION',
      payload: id,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Education</h1>
        <button
          onClick={handleAddEducation}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Add Education
        </button>
      </div>

      <div className="space-y-6">
        {state.education.map((edu) => (
          <EducationItem
            key={edu.id}
            education={edu}
            onDelete={handleDeleteEducation}
          />
        ))}
      </div>
    </div>
  );
}

function EducationItem({
  education,
  onDelete,
}: {
  education: Education;
  onDelete: (id: string) => void;
}) {
  const { dispatch } = useResume();
  const { register, watch } = useForm<Education>({
    defaultValues: education,
  });

  const values = watch();
  React.useEffect(() => {
    const hasChanged = JSON.stringify(values) !== JSON.stringify(education);
    if (hasChanged) {
      const timer = setTimeout(() => {
        dispatch({
          type: 'UPDATE_EDUCATION',
          payload: values,
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [values, dispatch, education]);

  return (
    <div className="border border-slate-200 rounded-lg p-6">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">
          {values.school || 'School Name'}
        </h3>
        <button
          onClick={() => onDelete(education.id)}
          className="text-red-600 hover:text-red-800 transition-colors"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            School/University
          </label>
          <input
            type="text"
            {...register('school')}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="University of California"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Degree
          </label>
          <input
            type="text"
            {...register('degree')}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Bachelor of Science"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Field of Study
          </label>
          <input
            type="text"
            {...register('field')}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Computer Science"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Graduation Date
          </label>
          <input
            type="month"
            {...register('graduationDate')}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Additional Information
        </label>
        <textarea
          {...register('description')}
          rows={3}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          placeholder="GPA, honors, relevant coursework, etc."
        />
      </div>
    </div>
  );
}
