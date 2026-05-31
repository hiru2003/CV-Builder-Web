import React from 'react';
import { CVData } from '@/types/cv';
import { fontSizeMap, spacingMap } from '@/lib/templateUtils';

export const ClassicTemplate = ({ 
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
    <div className={`w-[210mm] h-[297mm] bg-white overflow-hidden shadow-sm font-serif text-slate-900 ${f.body} ${s.padding}`}>
      <header className={`text-center pb-5 mb-5 border-b-2`} style={{ borderColor: themeColor }}>
        <h1 className={`${f.name} font-bold leading-none`}>
          {data.personal.fullName || 'YOUR NAME'}
        </h1>
        {data.personal.jobTitle && (
          <p className="text-base md:text-lg italic text-slate-700 mt-1 mb-2">{data.personal.jobTitle}</p>
        )}
        
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-slate-500">
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
        <section className={s.sectionMargin}>
          <h2 className={`${f.sectionHeader} text-slate-800 border-slate-350 tracking-widest`} style={{ color: themeColor }}>Professional Summary</h2>
          <p className={`leading-relaxed text-justify mt-2`}>
            {data.summary}
          </p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className={s.sectionMargin}>
          <h2 className={`${f.sectionHeader} text-slate-800 border-slate-350 tracking-widest`} style={{ color: themeColor }}>Experience</h2>
          <div className={`${s.sectionSpace} mt-3`}>
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`${f.itemHeader} font-bold`}>{exp.position}</h3>
                  <span className="text-xs font-semibold">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-[11px] md:text-xs flex justify-between italic text-slate-600 mb-1.5">
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

      {data.education.length > 0 && (
        <section className={s.sectionMargin}>
          <h2 className={`${f.sectionHeader} text-slate-800 border-slate-350 tracking-widest`} style={{ color: themeColor }}>Education</h2>
          <div className="space-y-4 mt-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`${f.itemHeader} font-bold`}>{edu.institution}</h3>
                  <span className="text-xs font-medium">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </span>
                </div>
                <div className="text-[11px] md:text-xs flex justify-between italic text-slate-655">
                  <span>{edu.degree} in {edu.field}</span>
                  {edu.score && <span>Score: {edu.score}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <h2 className={`${f.sectionHeader} text-slate-800 border-slate-350 tracking-widest`} style={{ color: themeColor }}>Core Competencies</h2>
          <div className={`leading-relaxed mt-2`}>
            {data.skills.join('  •  ')}
          </div>
        </section>
      )}
    </div>
  );
};
