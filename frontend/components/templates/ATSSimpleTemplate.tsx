import React from 'react';
import { CVData } from '@/types/cv';

export const ATSSimpleTemplate = ({ data }: { data: CVData }) => {
  return (
    <div className="w-[210mm] h-[297mm] bg-white p-12 overflow-hidden shadow-sm font-sans text-slate-800 text-[13px] leading-relaxed">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold uppercase text-slate-900 tracking-wide mb-2">
          {data.personal.fullName || 'YOUR NAME'}
        </h1>
        {data.personal.jobTitle && (
          <p className="text-sm font-semibold uppercase tracking-wider text-[#007BFF] mb-3">
            {data.personal.jobTitle}
          </p>
        )}
        
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-slate-600 text-xs">
          {data.personal.address && <span>{data.personal.address}</span>}
          {data.personal.phone && (
            <>
              <span className="text-slate-300">•</span>
              <span>{data.personal.phone}</span>
            </>
          )}
          {data.personal.email && (
            <>
              <span className="text-slate-300">•</span>
              <a href={`mailto:${data.personal.email}`} className="hover:underline">{data.personal.email}</a>
            </>
          )}
          {data.personal.linkedin && (
            <>
              <span className="text-slate-300">•</span>
              <span className="break-all">{data.personal.linkedin}</span>
            </>
          )}
          {data.personal.github && (
            <>
              <span className="text-slate-300">•</span>
              <span className="break-all">{data.personal.github}</span>
            </>
          )}
          {data.personal.website && (
            <>
              <span className="text-slate-300">•</span>
              <span className="break-all">{data.personal.website}</span>
            </>
          )}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-slate-700 text-justify">
            {data.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-3">
            Work Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <h3>{exp.position} — {exp.company}</h3>
                  <span className="text-xs font-medium text-slate-500">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.location && (
                  <div className="text-xs text-slate-500 italic mb-1.5">{exp.location}</div>
                )}
                <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700">
                  {exp.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-3">
            Key Projects
          </h2>
          <div className="space-y-3">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <h3>
                    {proj.link ? (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {proj.name}
                      </a>
                    ) : (
                      proj.name
                    )}
                  </h3>
                </div>
                <p className="text-slate-700 mb-1">{proj.description}</p>
                {proj.technologies.length > 0 && (
                  <p className="text-xs text-slate-500">
                    <span className="font-semibold">Technologies:</span> {proj.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree} in {edu.field}</span>
                  <span className="text-slate-500 text-xs"> — {edu.institution}</span>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Skills
          </h2>
          <p className="text-slate-700">
            {data.skills.join(' • ')}
          </p>
        </section>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Certifications
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-slate-700">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <span className="font-semibold">
                  {cert.link ? (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {cert.name}
                    </a>
                  ) : (
                    cert.name
                  )}
                </span>
                <span className="text-xs text-slate-500">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Languages
          </h2>
          <p className="text-slate-700">
            {data.languages.map((lang) => `${lang.name} (${lang.level})`).join(' • ')}
          </p>
        </section>
      )}
    </div>
  );
};
