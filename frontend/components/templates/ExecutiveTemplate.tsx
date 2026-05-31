import React from 'react';
import { CVData } from '@/types/cv';
import { fontSizeMap, spacingMap } from '@/lib/templateUtils';

export const ExecutiveTemplate = ({ 
  data, 
  themeColor = '#0f172a', 
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
    <div className={`w-[210mm] h-[297mm] bg-white overflow-hidden shadow-sm font-serif text-[#1e293b] ${f.body} ${s.padding}`}>
      <header className="mb-6 border-b-[3px] pb-6 flex justify-between items-end" style={{ borderColor: themeColor }}>
        <div>
          <h1 className={`${f.name} font-bold leading-none mb-1`} style={{ color: themeColor }}>
            {data.personal.fullName || 'YOUR NAME'}
          </h1>
          <p className={`${f.title} font-medium text-slate-500`}>{data.personal.jobTitle}</p>
        </div>
        <div className="text-right text-[10px] text-[#475569] space-y-0.5 font-sans leading-tight">
          {data.personal.email && <div>{data.personal.email}</div>}
          {data.personal.phone && <div>{data.personal.phone}</div>}
          {data.personal.linkedin && <div>{data.personal.linkedin}</div>}
        </div>
      </header>

      {data.summary && (
        <section className={s.sectionMargin}>
          <h2 className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: themeColor }}>Executive Summary</h2>
          <p className="leading-relaxed text-[#334155] text-justify font-sans">
            {data.summary}
          </p>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className={s.sectionMargin}>
          <h2 className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: themeColor }}>Areas of Expertise</h2>
          <div className="grid grid-cols-3 gap-y-1.5 gap-x-4 text-xs font-sans font-medium text-[#334155]">
            {data.skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-sm shrink-0" style={{ backgroundColor: themeColor }}></span>
                {skill}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className={s.sectionMargin}>
          <h2 className="text-sm font-bold uppercase tracking-widest mb-3 border-b pb-1.5" style={{ color: themeColor, borderColor: themeColor }}>Professional Experience</h2>
          <div className={s.sectionSpace}>
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-end mb-1">
                  <h3 className={`${f.itemHeader} font-bold text-[#0f172a]`}>{exp.position}</h3>
                  <span className="text-xs font-bold text-slate-500 font-sans">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-[11px] italic text-[#334155] mb-2 font-serif">
                  {exp.company} {exp.location && `| ${exp.location}`}
                </div>
                <ul className="ml-1 text-xs text-[#334155] space-y-1 font-sans leading-relaxed">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 text-[10px] shrink-0" style={{ color: themeColor }}>◆</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest mb-3 border-b pb-1.5" style={{ color: themeColor, borderColor: themeColor }}>Education & Credentials</h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className={`${f.itemHeader} font-bold text-[#0f172a]`}>{edu.degree} in {edu.field}</h3>
                  <div className="text-[11px] italic text-[#475569]">{edu.institution}</div>
                </div>
                <div className="text-xs font-bold text-slate-500 font-sans">
                  {edu.startDate} – {edu.endDate}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
