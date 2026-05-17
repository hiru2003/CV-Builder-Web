'use client';

import React, { useEffect, useState } from 'react';
import { useCVStore } from '@/store/useCVStore';
import { X } from 'lucide-react';

export const SkillsForm = () => {
  const { data, setSkills } = useCVStore();
  const [inputValue, setInputValue] = useState('');
  
  // Local state to avoid jumping inputs
  const [skills, setLocalSkills] = useState<string[]>(data.skills);

  useEffect(() => {
    setSkills(skills);
  }, [skills, setSkills]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newSkill = inputValue.trim();
      if (newSkill && !skills.includes(newSkill)) {
        setLocalSkills([...skills, newSkill]);
      }
      setInputValue('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setLocalSkills(skills.filter(s => s !== skillToRemove));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-800">Skills</h2>
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Add a skill</label>
          <input 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="e.g. React.js (Press Enter to add)"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 pt-2">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium border border-blue-100">
              <span>{skill}</span>
              <button 
                onClick={() => removeSkill(skill)}
                className="text-blue-400 hover:text-blue-600 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          {skills.length === 0 && (
            <p className="text-sm text-slate-500 italic">No skills added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};
