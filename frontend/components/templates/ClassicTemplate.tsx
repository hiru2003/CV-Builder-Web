import React from 'react';
import { CVData } from '@/types/cv';

export const ClassicTemplate = ({ data }: { data: CVData }) => {
  return (
    <div className="w-[210mm] h-[297mm] bg-white p-12 overflow-hidden shadow-sm font-serif text-slate-900">
      <header className="text-center mb-8 border-b-2 border-slate-900 pb-6">
        <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">
          {data.personal.fullName || 'YOUR NAME'}
        </h1>
        {data.personal.jobTitle && (
          <p className="text-xl italic text-slate-700 mb-4">{data.personal.jobTitle}</p>
        )}
        
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-slate-600">
          {data.personal.address && <span>{data.personal.address}</span>}
          {data.personal.phone && (
            <><span>|</span><span>{data.personal.phone}</span></>
          )}
          {data.personal.email && (
            <><span>|</span><span>{data.personal.email}</span></>
          )}
          {data.personal.linkedin && (
            <><span>|</span><span>{data.personal.linkedin}</span></>
          )}
        </div>
      </header>

      {data.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-widest border-b border-slate-300 mb-3 pb-1">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-justify">
            {data.summary}
          </p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-widest border-b border-slate-300 mb-4 pb-1">Experience</h2>
          <div className="space-y-5">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold">{exp.position}</h3>
                  <span className="text-sm font-medium">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-sm italic mb-2 flex justify-between text-slate-700">
                  <span>{exp.company}</span>
                  {exp.location && <span>{exp.location}</span>}
                </div>
                <ul className="list-disc list-outside ml-4 text-sm space-y-1">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="leading-relaxed">{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-widest border-b border-slate-300 mb-4 pb-1">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold">{edu.institution}</h3>
                  <span className="text-sm font-medium">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </span>
                </div>
                <div className="text-sm flex justify-between italic text-slate-700">
                  <span>{edu.degree} in {edu.field}</span>
                  {edu.score && <span>Score: {edu.score}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-widest border-b border-slate-300 mb-3 pb-1">Core Competencies</h2>
          <div className="text-sm leading-relaxed">
            {data.skills.join(' • ')}
          </div>
        </section>
      )}
    </div>
  );
};
