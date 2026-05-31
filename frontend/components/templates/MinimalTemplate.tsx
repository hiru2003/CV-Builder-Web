import React from 'react';
import { CVData } from '@/types/cv';
import { fontSizeMap, spacingMap } from '@/lib/templateUtils';

export const MinimalTemplate = ({ 
  data, 
  themeColor = '#475569', 
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
    <div className={`w-[210mm] h-[297mm] bg-white overflow-hidden shadow-sm font-sans text-black ${f.body} ${s.padding}`}>
      <header className="mb-8">
        <h1 className={`${f.name} font-light tracking-tight leading-none mb-1`}>
          {data.personal.fullName || 'Your Name'}
        </h1>
        {data.personal.jobTitle && (
          <p className={`${f.title} font-light mb-3`} style={{ color: themeColor }}>{data.personal.jobTitle}</p>
        )}
        
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-gray-400 uppercase tracking-widest mt-4">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>{data.personal.phone}</span>}
          {data.personal.address && <span>{data.personal.address}</span>}
        </div>
      </header>

      {data.summary && (
        <section className={s.sectionMargin}>
          <p className="leading-relaxed text-gray-700 max-w-3xl">
            {data.summary}
          </p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className={s.sectionMargin}>
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 border-b pb-1.5" style={{ borderColor: themeColor }}>Experience</h2>
          <div className={`${s.sectionSpace}`}>
            {data.experience.map((exp) => (
              <div key={exp.id} className="grid grid-cols-[1fr_3.5fr] gap-4">
                <div className="text-[10px] text-gray-400 pt-0.5">
                  {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                </div>
                <div>
                  <h3 className={`${f.itemHeader} font-medium`}>{exp.position}</h3>
                  <div className="text-xs text-gray-500 mb-2">{exp.company}</div>
                  <ul className={f.list}>
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
        <section className={s.sectionMargin}>
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 border-b pb-1.5" style={{ borderColor: themeColor }}>Education</h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="grid grid-cols-[1fr_3.5fr] gap-4">
                <div className="text-[10px] text-gray-400 pt-0.5">
                  {edu.startDate} — {edu.endDate}
                </div>
                <div>
                  <h3 className={`${f.itemHeader} font-medium`}>{edu.degree} in {edu.field}</h3>
                  <div className="text-xs text-gray-500">{edu.institution}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 border-b pb-1.5" style={{ borderColor: themeColor }}>Skills</h2>
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-gray-700">
            {data.skills.map((skill, i) => (
              <span key={i} className="text-xs">{skill}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
