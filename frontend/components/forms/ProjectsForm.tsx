'use client';

import React from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { useForm } from 'react-hook-form';
import { Project } from '@/lib/types';
import { Trash2, Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export function ProjectsForm() {
  const { state, dispatch } = useResume();

  const handleAddProject = () => {
    const newProject: Project = {
      id: uuidv4(),
      title: '',
      description: '',
      technologies: '',
      link: '',
    };
    dispatch({
      type: 'ADD_PROJECT',
      payload: newProject,
    });
  };

  const handleDeleteProject = (id: string) => {
    dispatch({
      type: 'DELETE_PROJECT',
      payload: id,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
        <button
          onClick={handleAddProject}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Add Project
        </button>
      </div>

      <div className="space-y-6">
        {state.projects.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            onDelete={handleDeleteProject}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectItem({
  project,
  onDelete,
}: {
  project: Project;
  onDelete: (id: string) => void;
}) {
  const { dispatch } = useResume();
  const { register, watch } = useForm<Project>({
    defaultValues: project,
  });

  const values = watch();
  React.useEffect(() => {
    const hasChanged = JSON.stringify(values) !== JSON.stringify(project);
    if (hasChanged) {
      const timer = setTimeout(() => {
        dispatch({
          type: 'UPDATE_PROJECT',
          payload: values,
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [values, dispatch, project]);

  return (
    <div className="border border-slate-200 rounded-lg p-6">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">
          {values.title || 'Project Title'}
        </h3>
        <button
          onClick={() => onDelete(project.id)}
          className="text-red-600 hover:text-red-800 transition-colors"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Project Title
          </label>
          <input
            type="text"
            {...register('title')}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Resume Builder"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Project Link
          </label>
          <input
            type="url"
            {...register('link')}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="https://example.com"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Description
        </label>
        <textarea
          {...register('description')}
          rows={3}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          placeholder="Describe your project and its impact..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Technologies Used
        </label>
        <input
          type="text"
          {...register('technologies')}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          placeholder="React, TypeScript, Node.js"
        />
      </div>
    </div>
  );
}
