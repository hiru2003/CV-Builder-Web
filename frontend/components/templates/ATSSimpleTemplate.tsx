import React from 'react';
import { CVData } from '@/types/cv';
import { fontSizeMap, spacingMap } from '@/lib/templateUtils';

export const ATSSimpleTemplate = ({ 
  data, 
  themeColor = '#007BFF', 
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
      <header className="text-center mb-5">
        <h1 className={`${f.name} font-bold uppercase tracking-wide text-slate-900 mb-1`}>
          {data.personal.fullName || 'YOUR NAME'}
        </h1>
        {data.personal.jobTitle && (
          <p className="text-[11px] font-semibold uppercase tracking-wider mb-2.5" style={{ color: themeColor }}>
            {data.personal.jobTitle}
          </p>
        )}
        
        <div className="flex flex-wrap justify-center gap-x-2.5 gap-y-0.5 text-slate-655 text-[10px]">
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
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section className={s.sectionMargin}>
          <h2 className={`${f.sectionHeader} text-slate-900`} style={{ borderColor: themeColor }}>
            Professional Summary
          </h2>
          <p className="text-slate-700 text-justify mt-1.5">
            {data.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className={s.sectionMargin}>
          <h2 className={`${f.sectionHeader} text-slate-900`} style={{ borderColor: themeColor }}>
            Work Experience
          </h2>
          <div className={`${s.sectionSpace} mt-2.5`}>
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900 mb-0.5">
                  <h3 className={f.itemHeader}>{exp.position} — {exp.company}</h3>
                  <span className="text-xs font-semibold text-slate-500">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.location && (
                  <div className="text-[10px] text-slate-500 italic mb-1">{exp.location}</div>
                )}
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
          <h2 className={`${f.sectionHeader} text-slate-900`} style={{ borderColor: themeColor }}>
            Key Projects
          </h2>
          <div className="space-y-3 mt-2.5">
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
        <section className={s.sectionMargin}>
          <h2 className={`${f.sectionHeader} text-slate-900`} style={{ borderColor: themeColor }}>
            Education
          </h2>
          <div className="space-y-2 mt-2.5">
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
          <h2 className={`${f.sectionHeader} text-slate-900`} style={{ borderColor: themeColor }}>
            Skills
          </h2>
          <p className="text-slate-700 mt-1.5">
            {data.skills.join('  •  ')}
          </p>
        </section>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section className={s.sectionMargin}>
          <h2 className={`${f.sectionHeader} text-slate-900`} style={{ borderColor: themeColor }}>
            Certifications
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-slate-700 mt-1.5">
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
                <span className="text-xs text-slate-550">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <section>
          <h2 className={`${f.sectionHeader} text-slate-900`} style={{ borderColor: themeColor }}>
            Languages
          </h2>
          <p className="text-slate-700 mt-1.5">
            {data.languages.map((lang) => `${lang.name} (${lang.level})`).join('  •  ')}
          </p>
        </section>
      )}
    </div>
  );
};
