import React from 'react';
import { CVData } from '@/types/cv';
import { fontSizeMap, spacingMap, hexToRGBA } from '@/lib/templateUtils';

export const CreativeTemplate = ({ 
  data, 
  themeColor = '#f43f5e', 
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
    <div className={`w-[210mm] h-[297mm] bg-white overflow-hidden shadow-sm font-sans flex flex-col relative ${f.body}`}>
      {/* Header Geometric Background */}
      <div 
        className="absolute top-0 right-0 w-[60%] h-48 rounded-bl-full z-0 opacity-50"
        style={{ backgroundColor: hexToRGBA(themeColor, 0.1) }}
      ></div>
      
      <header className={`p-8 relative z-10 flex gap-6 items-center border-b-[5px] border-slate-900`}>
        {data.personal.image && (
          <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md shrink-0 transform -rotate-3 border-4 border-white">
            <img src={data.personal.image} alt="Profile" className="w-full h-full object-cover transform rotate-3 scale-110" />
          </div>
        )}
        <div className="flex-grow">
          <h1 className={`${f.name} font-black text-slate-900 tracking-tighter leading-none mb-1`}>
            {data.personal.fullName || 'YOUR NAME'}
          </h1>
          <p className={`${f.title} font-bold tracking-wide`} style={{ color: themeColor }}>
            {data.personal.jobTitle || 'Job Title'}
          </p>
        </div>
      </header>

      <div className="flex flex-row flex-grow overflow-hidden">
        {/* Left Col */}
        <div className={`w-[35%] bg-slate-900 text-slate-300 ${s.padding}`}>
          <div className={s.sectionMargin}>
            <h2 className="text-white text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></span> Contact
            </h2>
            <div className="space-y-2 text-[10px] opacity-90 break-all">
              {data.personal.email && <div>{data.personal.email}</div>}
              {data.personal.phone && <div>{data.personal.phone}</div>}
              {data.personal.address && <div>{data.personal.address}</div>}
              {data.personal.linkedin && <div>{data.personal.linkedin}</div>}
            </div>
          </div>

          {data.skills.length > 0 && (
            <div className={s.sectionMargin}>
              <h2 className="text-white text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></span> Skills
              </h2>
              <div className="flex flex-col gap-2.5">
                {data.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span>{skill}</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ backgroundColor: themeColor, width: '80%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.education.length > 0 && (
            <div>
              <h2 className="text-white text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></span> Education
              </h2>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id} className="text-[10px] opacity-90">
                    <div className="font-bold text-white leading-tight">{edu.degree}</div>
                    <div className="text-slate-400 mt-0.5">{edu.institution}</div>
                    <div className="text-[9px] text-slate-500 mt-1">{edu.startDate} - {edu.endDate}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Col */}
        <div className={`w-[65%] bg-white ${s.padding}`}>
          {data.summary && (
            <section className={s.sectionMargin}>
              <h2 className="text-lg font-bold text-slate-900 mb-3 relative inline-block">
                Profile
                <span className="absolute bottom-0.5 left-0 w-full h-1.5 -z-10 opacity-30" style={{ backgroundColor: themeColor }}></span>
              </h2>
              <p className="text-slate-600 leading-relaxed text-justify">
                {data.summary}
              </p>
            </section>
          )}

          {data.experience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-4 relative inline-block">
                Experience
                <span className="absolute bottom-0.5 left-0 w-full h-1.5 -z-10 opacity-30" style={{ backgroundColor: themeColor }}></span>
              </h2>
              <div className="relative border-l-2 border-slate-100 pl-4 space-y-5 ml-1">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative">
                    <div className="absolute w-3.5 h-3.5 bg-white rounded-full -left-[24px] top-1 border-2 border-slate-900"></div>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className={`${f.itemHeader} font-bold text-slate-900`}>{exp.position}</h3>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold mb-2" style={{ color: themeColor }}>{exp.company}</div>
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
        </div>
      </div>
    </div>
  );
};
