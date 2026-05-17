'use client';

import { Resume } from '@/lib/types';

export function ClassicTemplate({ resume }: { resume: Resume }) {
  return (
    <div className="bg-white p-10 text-gray-800 font-serif">
      {/* Header */}
      <div className="text-center mb-8 border-b-4 border-gray-800 pb-6">
        <h1 className="text-5xl font-bold mb-2">{resume.personalInfo.fullName}</h1>
        <div className="flex gap-6 justify-center text-sm text-gray-700">
          <span>{resume.personalInfo.email}</span>
          <span>|</span>
          <span>{resume.personalInfo.phone}</span>
          <span>|</span>
          <span>{resume.personalInfo.location}</span>
        </div>
      </div>

      {/* Summary */}
      {resume.personalInfo.summary && (
        <div className="mb-8 text-center leading-relaxed">
          {resume.personalInfo.summary}
        </div>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 uppercase border-b-2 border-gray-400 pb-2">
            Professional Experience
          </h2>
          <div className="space-y-5">
            {resume.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-bold">{exp.jobTitle}</h3>
                  <span className="text-sm text-gray-700">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="font-semibold mb-1">{exp.company}, {exp.location}</p>
                {exp.description && (
                  <p className="text-gray-800 leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 uppercase border-b-2 border-gray-400 pb-2">
            Education
          </h2>
          <div className="space-y-4">
            {resume.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                  <span className="text-sm text-gray-700">{edu.graduationDate}</span>
                </div>
                <p className="font-semibold">{edu.school}</p>
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
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 uppercase border-b-2 border-gray-400 pb-2">
            Skills
          </h2>
          <div className="space-y-2">
            {resume.skills.map((skill) => (
              <p key={skill.id} className="text-gray-800">
                • {skill.name} ({skill.level})
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 uppercase border-b-2 border-gray-400 pb-2">
            Notable Projects
          </h2>
          <div className="space-y-4">
            {resume.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="font-bold">{proj.title}</h3>
                {proj.description && (
                  <p className="text-sm text-gray-800 mb-1 leading-relaxed">
                    {proj.description}
                  </p>
                )}
                {proj.technologies && (
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    {proj.technologies}
                  </p>
                )}
                {proj.link && <p className="text-sm text-gray-600">{proj.link}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
