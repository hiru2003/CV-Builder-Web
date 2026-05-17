'use client';

import { Resume } from '@/lib/types';

export function MinimalistTemplate({ resume }: { resume: Resume }) {
  return (
    <div className="bg-white p-12 text-gray-900 font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-light tracking-wide mb-1">
          {resume.personalInfo.fullName}
        </h1>
        <div className="flex gap-3 text-xs text-gray-600 tracking-widest">
          <span>{resume.personalInfo.email}</span>
          <span className="text-gray-400">|</span>
          <span>{resume.personalInfo.phone}</span>
          <span className="text-gray-400">|</span>
          <span>{resume.personalInfo.location}</span>
        </div>
      </div>

      {/* Summary */}
      {resume.personalInfo.summary && (
        <div className="mb-8 text-sm leading-relaxed text-gray-800">
          {resume.personalInfo.summary}
        </div>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-900 mb-4">
            Experience
          </h2>
          <div className="space-y-5">
            {resume.experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-gray-300 pl-4">
                <div className="flex justify-between mb-1">
                  <h3 className="font-semibold text-gray-900">{exp.jobTitle}</h3>
                  <span className="text-xs text-gray-600">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{exp.company}, {exp.location}</p>
                {exp.description && (
                  <p className="text-sm text-gray-800 leading-relaxed">
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
        <div className="mb-8">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-900 mb-4">
            Education
          </h2>
          <div className="space-y-4">
            {resume.education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-gray-300 pl-4">
                <div className="flex justify-between mb-1">
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <span className="text-xs text-gray-600">{edu.graduationDate}</span>
                </div>
                <p className="text-xs text-gray-600">{edu.school}</p>
                {edu.field && <p className="text-xs text-gray-700 mt-1">{edu.field}</p>}
                {edu.description && (
                  <p className="text-xs text-gray-600 mt-1">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-900 mb-4">
            Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {resume.skills.map((skill) => (
              <span
                key={skill.id}
                className="text-xs bg-gray-100 px-3 py-1.5 rounded text-gray-800"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-900 mb-4">
            Projects
          </h2>
          <div className="space-y-4">
            {resume.projects.map((proj) => (
              <div key={proj.id} className="border-l-2 border-gray-300 pl-4">
                <h3 className="font-semibold text-gray-900 mb-1">{proj.title}</h3>
                {proj.description && (
                  <p className="text-sm text-gray-800 mb-1 leading-relaxed">
                    {proj.description}
                  </p>
                )}
                {proj.technologies && (
                  <p className="text-xs text-gray-600 mb-1">
                    Technologies: {proj.technologies}
                  </p>
                )}
                {proj.link && (
                  <p className="text-xs text-gray-600">{proj.link}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
