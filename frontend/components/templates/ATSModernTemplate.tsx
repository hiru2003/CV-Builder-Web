import React from 'react';
import { CVData } from '@/types/cv';
import { fontSizeMap, spacingMap, hexToRGBA } from '@/lib/templateUtils';

export const ATSModernTemplate = ({ 
  data, 
  themeColor = '#4f46e5', 
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
      <header className="mb-5 border-b-2 border-slate-100 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className={`${f.name} font-extrabold uppercase text-slate-900 tracking-tight leading-none mb-1`}>
              {data.personal.fullName || 'YOUR NAME'}
            </h1>
            {data.personal.jobTitle && (
              <p className="text-xs font-semibold tracking-wide mt-1 uppercase" style={{ color: themeColor }}>
                {data.personal.jobTitle}
              </p>
            )}
          </div>
          <div className="text-right text-[10px] text-slate-500 space-y-0.5 leading-tight">
            {data.personal.email && (
              <div>
                <a href={`mailto:${data.personal.email}`} className="hover:underline">{data.personal.email}</a>
              </div>
            )}
            {data.personal.phone && <div>{data.personal.phone}</div>}
            {data.personal.address && <div>{data.personal.address}</div>}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-slate-400 text-[10px] mt-2.5">
          {data.personal.linkedin && <span>LinkedIn: {data.personal.linkedin}</span>}
          {data.personal.github && <span>GitHub: {data.personal.github}</span>}
          {data.personal.website && <span>Portfolio: {data.personal.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section className={s.sectionMargin}>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: themeColor }}>
            Summary
          </h2>
          <p className="text-slate-700 text-justify">
            {data.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className={s.sectionMargin}>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: themeColor }}>
            Experience
          </h2>
          <div className={s.sectionSpace}>
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <h3 className={f.itemHeader}>{exp.position}</h3>
                  <span 
                    className="text-[10px] font-semibold px-2 py-0.5 rounded font-sans"
                    style={{ backgroundColor: hexToRGBA(themeColor, 0.08), color: themeColor }}
                  >
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-500 font-semibold mb-1.5">
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
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: themeColor }}>
            Featured Projects
          </h2>
          <div className="space-y-3">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900 mb-0.5">
                  <h3 className={f.itemHeader}>
                    {proj.link ? (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: themeColor }}>
                        {proj.name}
                      </a>
                    ) : (
                      proj.name
                    )}
                  </h3>
                </div>
                <p className="text-slate-700 mb-1">{proj.description}</p>
                {proj.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {proj.technologies.map((tech, i) => (
                      <span key={i} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className={s.sectionMargin}>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: themeColor }}>
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
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: themeColor }}>
            Skills
          </h2>
          <p className="text-slate-700">
            {data.skills.join('  •  ')}
          </p>
        </section>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section className={s.sectionMargin}>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: themeColor }}>
            Certifications
          </h2>
          <div className="space-y-1 text-slate-700">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <span>
                  <span className="font-semibold text-slate-900">{cert.name}</span> — <span className="text-slate-600">{cert.issuer}</span>
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
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: themeColor }}>
            Languages
          </h2>
          <p className="text-slate-700">
            {data.languages.map((lang) => `${lang.name} (${lang.level})`).join('  •  ')}
          </p>
        </section>
      )}
    </div>
  );
};
