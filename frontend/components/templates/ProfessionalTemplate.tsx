'use client';

import { Resume } from '@/lib/types';

export function ProfessionalTemplate({ resume }: { resume: Resume }) {
  return (
    <div className="bg-white p-12 text-gray-900 font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {resume.personalInfo.fullName}
        </h1>
        <div className="h-0.5 bg-gradient-to-r from-blue-600 to-transparent w-24 mb-4" />
        <div className="flex gap-4 text-sm text-gray-600 flex-wrap">
          <a href={`mailto:${resume.personalInfo.email}`} className="hover:text-blue-600">
            {resume.personalInfo.email}
          </a>
          <span className="text-gray-400">|</span>
          <span>{resume.personalInfo.phone}</span>
          <span className="text-gray-400">|</span>
          <span>{resume.personalInfo.location}</span>
        </div>
      </div>

      {/* Summary */}
      {resume.personalInfo.summary && (
        <div className="mb-8 pb-6 border-b-2 border-gray-200">
          <p className="text-gray-700 leading-relaxed text-sm">
            {resume.personalInfo.summary}
          </p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-2">
          {/* Experience */}
          {resume.experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">EXPERIENCE</h2>
              <div className="space-y-5">
                {resume.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900">{exp.jobTitle}</h3>
                      <span className="text-xs text-gray-600 whitespace-nowrap ml-4">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      {exp.company} • {exp.location}
                    </p>
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
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">EDUCATION</h2>
              <div className="space-y-3">
                {resume.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <span className="text-xs text-gray-600">{edu.graduationDate}</span>
                    </div>
                    <p className="text-sm text-gray-700">{edu.school}</p>
                    {edu.field && <p className="text-sm text-gray-700">{edu.field}</p>}
                    {edu.description && (
                      <p className="text-sm text-gray-600 mt-1">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {resume.projects.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">PROJECTS</h2>
              <div className="space-y-4">
                {resume.projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="font-semibold text-gray-900 mb-1">{proj.title}</h3>
                    {proj.description && (
                      <p className="text-sm text-gray-700 mb-1 leading-relaxed">
                        {proj.description}
                      </p>
                    )}
                    {proj.technologies && (
                      <p className="text-xs text-gray-600">
                        <span className="font-semibold">Tech: </span>{proj.technologies}
                      </p>
                    )}
                    {proj.link && (
                      <p className="text-xs text-blue-600">{proj.link}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Skills */}
          {resume.skills.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-bold text-gray-900 mb-4">SKILLS</h2>
              <div className="space-y-3">
                {resume.skills.map((skill) => (
                  <div key={skill.id} className="mb-3">
                    <p className="font-semibold text-gray-900 text-sm">{skill.name}</p>
                    <div className="w-full bg-gray-300 h-1.5 rounded mt-1">
                      <div
                        className="bg-blue-600 h-1.5 rounded"
                        style={{
                          width:
                            skill.level === 'beginner'
                              ? '25%'
                              : skill.level === 'intermediate'
                                ? '50%'
                                : skill.level === 'advanced'
                                  ? '75%'
                                  : '100%',
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1 capitalize">
                      {skill.level}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
