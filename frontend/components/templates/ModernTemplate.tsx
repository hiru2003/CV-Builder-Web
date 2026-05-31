import React from 'react';
import { CVData } from '@/types/cv';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';
import { fontSizeMap, spacingMap, hexToRGBA } from '@/lib/templateUtils';

export const ModernTemplate = ({ 
  data, 
  themeColor = '#00A3FF', 
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
    <div className={`w-[210mm] h-[297mm] bg-white flex flex-row overflow-hidden shadow-sm font-sans ${f.body}`}>
      {/* Sidebar */}
      <div className={`w-[30%] bg-slate-50 text-slate-800 flex flex-col border-r border-slate-200 ${s.padding}`}>
        {data.personal.image && (
          <div className="w-24 h-24 rounded-full overflow-hidden mb-6 mx-auto border-4 border-white shadow-sm shrink-0">
            <img src={data.personal.image} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
        
        <div className={s.sectionMargin}>
          <h2 className="text-[11px] font-bold tracking-widest text-slate-400 mb-3 uppercase border-b border-slate-200 pb-1.5">Contact</h2>
          <div className={`${s.space} text-[10px]`}>
            {data.personal.email && (
              <div className="flex items-center gap-2">
                <Mail size={12} style={{ color: themeColor }} className="shrink-0" />
                <span className="break-all">{data.personal.email}</span>
              </div>
            )}
            {data.personal.phone && (
              <div className="flex items-center gap-2">
                <Phone size={12} style={{ color: themeColor }} className="shrink-0" />
                <span>{data.personal.phone}</span>
              </div>
            )}
            {data.personal.address && (
              <div className="flex items-center gap-2">
                <MapPin size={12} style={{ color: themeColor }} className="shrink-0" />
                <span>{data.personal.address}</span>
              </div>
            )}
            {data.personal.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin size={12} style={{ color: themeColor }} className="shrink-0" />
                <span className="break-all">{data.personal.linkedin}</span>
              </div>
            )}
            {data.personal.github && (
              <div className="flex items-center gap-2">
                <Github size={12} style={{ color: themeColor }} className="shrink-0" />
                <span className="break-all">{data.personal.github}</span>
              </div>
            )}
            {data.personal.website && (
              <div className="flex items-center gap-2">
                <Globe size={12} style={{ color: themeColor }} className="shrink-0" />
                <span className="break-all">{data.personal.website}</span>
              </div>
            )}
          </div>
        </div>

        {data.skills.length > 0 && (
          <div className={s.sectionMargin}>
            <h2 className="text-[11px] font-bold tracking-widest text-slate-400 mb-3 uppercase border-b border-slate-200 pb-1.5">Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((skill, index) => (
                <span key={index} className="bg-white border border-slate-200 px-2 py-0.5 text-[9px] rounded-md shadow-sm text-slate-650">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.languages.length > 0 && (
          <div>
            <h2 className="text-[11px] font-bold tracking-widest text-slate-400 mb-3 uppercase border-b border-slate-200 pb-1.5">Languages</h2>
            <div className="space-y-1.5">
              {data.languages.map((lang, index) => (
                <div key={index} className="flex justify-between text-[10px]">
                  <span className="font-medium text-slate-700">{lang.name}</span>
                  <span className="text-slate-500">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className={`w-[70%] flex flex-col bg-white ${s.padding}`}>
        <header className="mb-6">
          <h1 className={`${f.name} text-slate-800 leading-none`}>
            {data.personal.fullName || 'YOUR NAME'}
          </h1>
          <p className={`${f.title} font-semibold tracking-wide`} style={{ color: themeColor }}>
            {data.personal.jobTitle || 'Job Title'}
          </p>
        </header>

        {data.summary && (
          <section className={s.sectionMargin}>
            <h2 className={`${f.sectionHeader} text-slate-800 inline-block`} style={{ borderColor: themeColor }}>Profile</h2>
            <p className={`text-slate-600 leading-relaxed text-justify mt-2`}>
              {data.summary}
            </p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className={s.sectionMargin}>
            <h2 className={`${f.sectionHeader} text-slate-800 inline-block`} style={{ borderColor: themeColor }}>Experience</h2>
            <div className={`${s.sectionSpace} mt-3`}>
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-slate-100">
                  <div className="absolute w-2 h-2 rounded-full -left-[5px] top-1.5" style={{ backgroundColor: themeColor }}></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className={`${f.itemHeader} text-slate-800`}>{exp.position}</h3>
                    <span 
                      className={`${f.meta}`}
                      style={{ backgroundColor: hexToRGBA(themeColor, 0.08), color: themeColor }}
                    >
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-[11px] md:text-xs font-semibold text-slate-500 mb-1.5 flex justify-between">
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
          <section>
            <h2 className={`${f.sectionHeader} text-slate-800 inline-block`} style={{ borderColor: themeColor }}>Education</h2>
            <div className="space-y-4 mt-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className={`${f.itemHeader} text-slate-800`}>{edu.degree} in {edu.field}</h3>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </span>
                  </div>
                  <div className="text-[11px] md:text-xs text-slate-655 flex justify-between">
                    <span>{edu.institution}</span>
                    {edu.score && <span className="font-semibold" style={{ color: themeColor }}>Score: {edu.score}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
