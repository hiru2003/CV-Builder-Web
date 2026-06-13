import React from 'react';
import { CVData } from '@/types/cv';
import { fontSizeMap, spacingMap } from '@/lib/templateUtils';

export const ATSProfessionalTemplate = ({ 
  data, 
  themeColor = '#1e293b', 
  spacing = 'normal', 
  fontSizeAdjust = 'md' 
}: { 
  data: CVData; 
  themeColor?: string; 
  spacing?: 'compact' | 'normal' | 'loose'; 
  fontSizeAdjust?: 'sm' | 'md' | 'lg'; 
}) => {
  const f = fontSizeMap[fontSizeAdjust];
  const s = spacingMap[spacing];

  return (
    <div className={`w-[210mm] h-[297mm] bg-white overflow-hidden shadow-sm font-sans text-slate-800 ${f.body} ${s.padding}`}>
      {/* Header */}
      <header className="mb-5">
        <h1 className={`${f.name} font-bold uppercase text-slate-900 tracking-tight leading-none mb-1`}>
          {data.personal.fullName || 'YOUR NAME'}
        </h1>
        {data.personal.jobTitle && (
          <p className="text-xs font-semibold tracking-wide text-slate-655 mb-2.5">
            {data.personal.jobTitle}
          </p>
        )}
        
        <div className="flex flex-wrap gap-x-3.5 gap-y-0.5 text-slate-500 text-[10px]">
          {data.personal.email && (
            <a href={`mailto:${data.personal.email}`} className="hover:underline">
              {data.personal.email}
            </a>
          )}
          {data.personal.phone && <span>{data.personal.phone}</span>}
          {data.personal.address && <span>{data.personal.address}</span>}
          {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section className={s.sectionMargin}>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">
            Professional Summary
          </h2>
          <p className="text-slate-750 text-justify">
            {data.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className={s.sectionMargin}>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3.5">
            Professional Experience
          </h2>
          <div className={s.sectionSpace}>
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <h3 className={f.itemHeader}>{exp.position}</h3>
                  <span className="text-xs font-semibold text-slate-500 font-sans">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-600 font-semibold mb-1.5">
                  <span>{exp.company}</span>
                  {exp.location && <span>{exp.location}</span>}
                </div>
                <ul className={f.list}>
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
        <section className={s.sectionMargin}>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3.5">
            Projects
          </h2>
          <div className="space-y-3">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900 mb-0.5">
                  <h3 className={f.itemHeader}>
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
                  <p className="text-[10px] text-slate-500">
                    <span className="font-semibold">Key Technologies:</span> {proj.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className={s.sectionMargin}>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3.5">
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree} in {edu.field}</span>
                  <span className="text-slate-500 text-xs"> — {edu.institution}</span>
                </div>
                <span className="text-xs text-slate-500 font-semibold">
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className={s.sectionMargin}>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">
            Areas of Expertise
          </h2>
          <p className="text-slate-700">
            {data.skills.join('  •  ')}
          </p>
        </section>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section className={s.sectionMargin}>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">
            Certifications & Licenses
          </h2>
          <div className="space-y-1 text-slate-700">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <span>
                  <span className="font-semibold">{cert.name}</span> — <span className="text-slate-600">{cert.issuer}</span>
                </span>
                <span className="text-xs text-slate-550">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">
            Languages
          </h2>
          <p className="text-slate-700 font-sans">
            {data.languages.map((lang) => `${lang.name} (${lang.level})`).join('  •  ')}
          </p>
        </section>
      )}
    </div>
  );
};
