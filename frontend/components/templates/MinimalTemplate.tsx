import React from 'react';
import { CVData } from '@/types/cv';

export const MinimalTemplate = ({ data }: { data: CVData }) => {
  return (
    <div className="w-[210mm] h-[297mm] bg-white p-16 overflow-hidden font-sans text-black">
      <header className="mb-12">
        <h1 className="text-4xl font-light tracking-tight mb-2">
          {data.personal.fullName || 'Your Name'}
        </h1>
        {data.personal.jobTitle && (
          <p className="text-xl text-gray-500 font-light mb-4">{data.personal.jobTitle}</p>
        )}
        
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-400 uppercase tracking-widest mt-6">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>{data.personal.phone}</span>}
          {data.personal.address && <span>{data.personal.address}</span>}
          {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
        </div>
      </header>

      {data.summary && (
        <section className="mb-10">
          <p className="text-sm leading-relaxed text-gray-700 max-w-3xl">
            {data.summary}
          </p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">Experience</h2>
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id} className="grid grid-cols-[1fr_3fr] gap-4">
                <div className="text-xs text-gray-400 pt-1">
                  {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                </div>
                <div>
                  <h3 className="text-base font-medium">{exp.position}</h3>
                  <div className="text-sm text-gray-500 mb-2">{exp.company}</div>
                  <ul className="list-disc list-outside ml-4 text-sm text-gray-600 space-y-1.5">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="leading-relaxed">{desc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">Education</h2>
          <div className="space-y-6">
            {data.education.map((edu) => (
              <div key={edu.id} className="grid grid-cols-[1fr_3fr] gap-4">
                <div className="text-xs text-gray-400 pt-1">
                  {edu.startDate} — {edu.endDate}
                </div>
                <div>
                  <h3 className="text-base font-medium">{edu.degree} in {edu.field}</h3>
                  <div className="text-sm text-gray-500">{edu.institution}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">Skills</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-700">
            {data.skills.map((skill, i) => (
              <span key={i}>{skill}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
