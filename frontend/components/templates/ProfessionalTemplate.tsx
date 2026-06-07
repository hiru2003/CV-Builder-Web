import React from 'react';
import { CVData } from '@/types/cv';
import { fontSizeMap, spacingMap, hexToRGBA } from '@/lib/templateUtils';

export const ProfessionalTemplate = ({ 
  data, 
  themeColor = '#1e3a8a', 
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
    <div className={`w-[210mm] h-[297mm] bg-white overflow-hidden shadow-sm font-sans text-slate-800 ${f.body} flex`}>
      
      {/* Left Column (Main Content) - 65% width */}
      <div className={`w-[65%] ${s.padding} flex flex-col h-full overflow-hidden border-r border-slate-100`}>
        {/* Name and Job Title */}
        <header className="mb-6">
          <h1 className={`${f.name} font-black text-slate-900 tracking-tight leading-none mb-1.5`}>
            {data.personal.fullName || 'YOUR NAME'}
          </h1>
          {data.personal.jobTitle && (
            <p className="text-sm font-bold uppercase tracking-wider" style={{ color: themeColor }}>
              {data.personal.jobTitle}
            </p>
          )}
          <div className="w-12 h-1 mt-3 rounded-full" style={{ backgroundColor: themeColor }} />
        </header>

        {/* Professional Summary */}
        {data.summary && (
          <section className={s.sectionMargin}>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-2 border-b pb-1">
              Profile Summary
            </h2>
            <p className="text-slate-700 leading-relaxed text-justify">
              {data.summary}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {data.experience.length > 0 && (
          <section className={s.sectionMargin}>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3 border-b pb-1">
              Work Experience
            </h2>
            <div className={s.sectionSpace}>
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l border-slate-200">
                  {/* Bullet Dot */}
                  <div 
                    className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-white"
                    style={{ backgroundColor: themeColor }}
                  />
                  <div className="flex justify-between items-baseline font-bold text-slate-900 mb-0.5">
                    <h3 className={f.itemHeader}>{exp.position}</h3>
                    <span className="text-[10px] text-slate-500 font-semibold">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs font-bold mb-2 text-slate-600">
                    {exp.company} {exp.location && `• ${exp.location}`}
                  </div>
                  <ul className="list-disc list-outside space-y-1 text-slate-655 pl-4 text-xs leading-relaxed">
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
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3 border-b pb-1">
              Key Projects
            </h2>
            <div className="space-y-4">
              {data.projects.map((proj) => (
                <div key={proj.id} className="pl-4 border-l border-slate-200 relative">
                  <div 
                    className="absolute -left-1 top-1.5 w-2 h-2 rounded-full border border-white"
                    style={{ backgroundColor: themeColor }}
                  />
                  <div className="flex justify-between items-baseline font-bold text-slate-900 mb-1">
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
                  <p className="text-slate-655 text-xs mb-1.5 leading-relaxed">{proj.description}</p>
                  {proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {proj.technologies.map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-2 py-0.5 rounded text-[9px] font-bold tracking-wide uppercase"
                          style={{ backgroundColor: hexToRGBA(themeColor, 0.08), color: themeColor }}
                        >
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
      </div>

      {/* Right Column (Sidebar) - 35% width */}
      <div className={`w-[35%] bg-slate-50 ${s.padding} flex flex-col h-full overflow-hidden gap-8`}>
        {/* Contact Details */}
        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4 border-b pb-1">
            Contact
          </h2>
          <div className="space-y-2.5 text-xs">
            {data.personal.email && (
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Email</span>
                <a href={`mailto:${data.personal.email}`} className="text-slate-700 hover:underline truncate">{data.personal.email}</a>
              </div>
            )}
            {data.personal.phone && (
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Phone</span>
                <span className="text-slate-700">{data.personal.phone}</span>
              </div>
            )}
            {data.personal.address && (
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Location</span>
                <span className="text-slate-700">{data.personal.address}</span>
              </div>
            )}
            {data.personal.linkedin && (
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase">LinkedIn</span>
                <span className="text-slate-700 truncate">{data.personal.linkedin}</span>
              </div>
            )}
            {data.personal.github && (
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase">GitHub</span>
                <span className="text-slate-700 truncate">{data.personal.github}</span>
              </div>
            )}
            {data.personal.website && (
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Website</span>
                <a href={data.personal.website} target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:underline truncate">{data.personal.website}</a>
              </div>
            )}
          </div>
        </div>

        {/* Education Section */}
        {data.education.length > 0 && (
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4 border-b pb-1">
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-bold text-slate-800 text-xs">
                    {edu.degree} in {edu.field}
                  </div>
                  <div className="text-slate-500 text-xs mt-0.5">{edu.institution}</div>
                  <div className="text-[10px] text-slate-400 font-semibold mt-1">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4 border-b pb-1">
              Core Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((skill, i) => (
                <span 
                  key={i} 
                  className="bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded text-xs font-semibold shadow-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Section */}
        {data.certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4 border-b pb-1">
              Certifications
            </h2>
            <div className="space-y-3">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="text-xs">
                  <div className="font-bold text-slate-800">{cert.name}</div>
                  <div className="text-slate-500">{cert.issuer}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{cert.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages Section */}
        {data.languages.length > 0 && (
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4 border-b pb-1">
              Languages
            </h2>
            <div className="space-y-2">
              {data.languages.map((lang) => (
                <div key={lang.id} className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">{lang.name}</span>
                  <span 
                    className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: hexToRGBA(themeColor, 0.08), color: themeColor }}
                  >
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
