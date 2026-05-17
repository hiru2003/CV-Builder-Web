'use client';

import { Resume } from '@/lib/types';

export function ModernTemplate({ resume }: { resume: Resume }) {
  return (
    <div className="bg-white p-12 text-gray-800 font-serif">
      {/* Header */}
      <div className="border-b-2 border-blue-600 pb-6 mb-6">
        <h1 className="text-4xl font-bold text-blue-600 mb-1">
          {resume.personalInfo.fullName}
        </h1>
        <div className="flex gap-4 text-sm text-gray-600">
          <span>{resume.personalInfo.email}</span>
          <span>•</span>
          <span>{resume.personalInfo.phone}</span>
          <span>•</span>
          <span>{resume.personalInfo.location}</span>
        </div>
      </div>

      {/* Summary */}
      {resume.personalInfo.summary && (
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed">
            {resume.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 border-b border-gray-300 pb-2">
            EXPERIENCE
          </h2>
          <div className="space-y-4">
            {resume.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900">{exp.jobTitle}</h3>
                  <span className="text-sm text-gray-600">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-600 italic mb-1">{exp.company} • {exp.location}</p>
                {exp.description && (
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 border-b border-gray-300 pb-2">
            EDUCATION
          </h2>
          <div className="space-y-3">
            {resume.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-gray-600">{edu.graduationDate}</span>
                </div>
                <p className="text-gray-600 italic">{edu.school}</p>
                {edu.field && <p className="text-sm text-gray-700">{edu.field}</p>}
                {edu.description && (
                  <p className="text-sm text-gray-700 mt-1">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 border-b border-gray-300 pb-2">
            SKILLS
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {resume.skills.map((skill) => (
              <p key={skill.id} className="text-sm text-gray-700">
                • {skill.name} ({skill.level})
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-blue-600 mb-3 border-b border-gray-300 pb-2">
            PROJECTS
          </h2>
          <div className="space-y-4">
            {resume.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="font-bold text-gray-900">{proj.title}</h3>
                {proj.description && (
                  <p className="text-sm text-gray-700 mb-1">{proj.description}</p>
                )}
                {proj.technologies && (
                  <p className="text-sm text-gray-600">Tech: {proj.technologies}</p>
                )}
                {proj.link && (
                  <p className="text-sm text-blue-600">{proj.link}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
