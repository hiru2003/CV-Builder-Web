'use client';

import React from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { useForm } from 'react-hook-form';
import { Skill } from '@/lib/types';
import { Trash2, Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export function SkillsForm() {
  const { state, dispatch } = useResume();

  const handleAddSkill = () => {
    const newSkill: Skill = {
      id: uuidv4(),
      name: '',
      level: 'intermediate',
    };
    dispatch({
      type: 'ADD_SKILL',
      payload: newSkill,
    });
  };

  const handleDeleteSkill = (id: string) => {
    dispatch({
      type: 'DELETE_SKILL',
      payload: id,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Skills</h1>
        <button
          onClick={handleAddSkill}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Add Skill
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {state.skills.map((skill) => (
          <SkillItem
            key={skill.id}
            skill={skill}
            onDelete={handleDeleteSkill}
          />
        ))}
      </div>
    </div>
  );
}

function SkillItem({
  skill,
  onDelete,
}: {
  skill: Skill;
  onDelete: (id: string) => void;
}) {
  const { dispatch } = useResume();
  const { register, watch } = useForm<Skill>({
    defaultValues: skill,
  });

  const values = watch();
  React.useEffect(() => {
    const hasChanged = JSON.stringify(values) !== JSON.stringify(skill);
    if (hasChanged) {
      const timer = setTimeout(() => {
        dispatch({
          type: 'UPDATE_SKILL',
          payload: values,
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [values, dispatch, skill]);

  return (
    <div className="border border-slate-200 rounded-lg p-4">
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold text-slate-900">
          {values.name || 'Skill'}
        </h3>
        <button
          onClick={() => onDelete(skill.id)}
          className="text-red-600 hover:text-red-800 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Skill Name
          </label>
          <input
            type="text"
            {...register('name')}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="e.g., React"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Proficiency Level
          </label>
          <select
            {...register('level')}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </select>
        </div>
      </div>
    </div>
  );
}
