import React from 'react';
import { CVData } from '@/types/cv';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { fontSizeMap, spacingMap, hexToRGBA } from '@/lib/templateUtils';

export const PhotoTemplate = ({ 
  data, 
  themeColor = '#0A2540', 
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

  // Helper to split name
  const nameParts = data.personal.fullName ? data.personal.fullName.split(' ') : ['RICHARD', 'SANCHEZ'];
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return (
    <div className={`w-[210mm] h-[297mm] bg-white flex flex-row overflow-hidden shadow-sm font-sans ${f.body}`}>
      {/* Sidebar (35% width, dark blue background) */}
      <div className={`w-[35%] bg-[#0A2540] text-slate-100 flex flex-col justify-start shrink-0 ${s.padding} ${s.gap || 'gap-5'}`}>
        {/* Profile Image / Photo */}
        <div className="flex flex-col items-center">
          {data.personal.image ? (
            <div className="w-24 h-24 rounded-full overflow-hidden border-[4px] border-white shadow-md">
              <img src={data.personal.image} alt="Profile" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-slate-600 to-slate-400 border-[4px] border-white shadow-md flex items-center justify-center font-bold text-2xl text-white uppercase">
              {firstName?.[0] || 'R'}{lastName?.[0] || 'S'}
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <h2 className="text-[11px] font-bold tracking-widest text-white uppercase border-b-2 border-white/20 pb-1">
            Contact
          </h2>
          <div className={`${s.space} text-[9.5px] opacity-90`}>
            {data.personal.phone && (
              <div className="flex items-center gap-2">
                <Phone size={11} className="text-white shrink-0" />
                <span>{data.personal.phone}</span>
              </div>
            )}
            {data.personal.email && (
              <div className="flex items-center gap-2">
                <Mail size={11} className="text-white shrink-0" />
                <span className="break-all">{data.personal.email}</span>
              </div>
            )}
            {data.personal.address && (
              <div className="flex items-center gap-2">
                <MapPin size={11} className="text-white shrink-0" />
                <span>{data.personal.address}</span>
              </div>
            )}
            {data.personal.website && (
              <div className="flex items-center gap-2">
                <Globe size={11} className="text-white shrink-0" />
                <span className="break-all">{data.personal.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-[11px] font-bold tracking-widest text-white uppercase border-b-2 border-white/20 pb-1">
              Education
            </h2>
            <div className={`${s.space} text-[9.5px] opacity-90`}>
              {data.education.map((edu) => (
                <div key={edu.id} className="space-y-0.5">
                  <div className="font-semibold text-slate-350 text-[8.5px]">{edu.startDate} - {edu.endDate}</div>
                  <div className="font-bold text-white uppercase">{edu.institution}</div>
                  <div className="text-slate-300 font-medium">{edu.degree} {edu.field ? `in ${edu.field}` : ''}</div>
                  {edu.score && <div className="text-slate-400 text-[8px]">GPA: {edu.score}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Section */}
        {data.certifications && data.certifications.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-[11px] font-bold tracking-widest text-white uppercase border-b-2 border-white/20 pb-1">
              Certifications
            </h2>
            <div className={`${s.space} text-[9.5px] opacity-90`}>
              {data.certifications.map((cert) => (
                <div key={cert.id} className="space-y-0.5">
                  <div className="font-bold text-white uppercase">{cert.name}</div>
                  <div className="text-slate-300 font-medium">{cert.issuer}</div>
                  <div className="text-slate-400 text-[8px]">{cert.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {data.skills && data.skills.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-[11px] font-bold tracking-widest text-white uppercase border-b-2 border-white/20 pb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-1">
              {data.skills.map((skill, index) => (
                <span key={index} className="bg-white/10 text-white px-1.5 py-0.5 text-[9px] rounded-md shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages Section */}
        {data.languages && data.languages.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-[11px] font-bold tracking-widest text-white uppercase border-b-2 border-white/20 pb-1">
              Languages
            </h2>
            <div className="space-y-1 text-[9.5px] opacity-90">
              {data.languages.map((lang, index) => (
                <div key={index} className="flex justify-between">
                  <span className="font-medium text-slate-100">{lang.name}</span>
                  <span className="text-slate-300">({lang.level})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content (65% width, white background) */}
      <div className={`w-[65%] bg-white flex flex-col justify-start shrink-0 overflow-hidden ${s.padding} ${s.gap || 'gap-6'}`}>
        {/* Header */}
        <header className="border-b border-slate-200 pb-3">
          <div className="flex items-baseline gap-2 mb-0.5">
            <h1 className="text-2xl font-bold text-slate-800 tracking-wide uppercase">
              {firstName || 'RICHARD'}
            </h1>
            <h1 className="text-2xl font-light text-slate-655 tracking-wide uppercase">
              {lastName || 'SANCHEZ'}
            </h1>
          </div>
          <p className="text-xs font-semibold tracking-widest uppercase text-slate-500">
            {data.personal.jobTitle || 'MARKETING MANAGER'}
          </p>
          {/* Subtitle Horizontal Divider */}
          <div className="w-16 h-0.5 mt-2" style={{ backgroundColor: themeColor }}></div>
        </header>

        {/* Profile / Summary Section */}
        {data.summary && (
          <section className="space-y-1">
            <h2 className="text-xs font-bold tracking-widest text-slate-800 uppercase">
              Profile
            </h2>
            <p className="text-slate-605 text-[11px] leading-relaxed text-justify">
              {data.summary}
            </p>
          </section>
        )}

        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-xs font-bold tracking-widest text-slate-800 uppercase">
              Work Experience
            </h2>
            <div className="relative border-l border-slate-300 pl-3 space-y-3.5 ml-1">
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative">
                  {/* Timeline Circle */}
                  <div 
                    className="absolute w-1.5 h-1.5 rounded-full -left-[16.5px] top-1 border border-white"
                    style={{ backgroundColor: themeColor }}
                  ></div>
                  
                  {/* Job details */}
                  <div className="flex justify-between items-baseline mb-0.5 text-[11px]">
                    <span className="font-bold text-slate-800">{exp.company}</span>
                    <span className="text-[9px] font-semibold text-slate-500">
                      {exp.startDate} - {exp.current ? 'PRESENT' : exp.endDate}
                    </span>
                  </div>
                  
                  <div className="text-[10px] font-semibold text-slate-500 mb-1">
                    {exp.position} {exp.location ? `• ${exp.location}` : ''}
                  </div>
                  
                  {exp.description && exp.description.length > 0 && (
                    <ul className="space-y-0.5 text-[9.5px] text-slate-605 list-disc list-inside leading-relaxed">
                      {exp.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {data.projects && data.projects.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-xs font-bold tracking-widest text-slate-800 uppercase">
              Projects
            </h2>
            <div className="space-y-2.5">
              {data.projects.map((project) => (
                <div key={project.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline text-[11px]">
                    <span className="font-bold text-slate-800">{project.name}</span>
                    {project.link && (
                      <span className="text-[9px] text-blue-500 hover:underline break-all">
                        {project.link}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-605 text-[9.5px] leading-relaxed">
                    {project.description}
                  </p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="bg-slate-100 text-slate-700 px-1 py-0.1 rounded-[2px] text-[8px] font-medium">
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

        {/* Reference Section */}
        <section className="space-y-2 mt-auto">
          <h2 className="text-xs font-bold tracking-widest text-slate-800 uppercase">
            Reference
          </h2>
          <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-2">
            <div>
              <div className="font-bold text-[10px] text-slate-800 leading-tight">Estelle Darcy</div>
              <div className="text-[9px] text-slate-500">Wardiere Inc. / CTO</div>
              <div className="text-[8.5px] text-slate-600 mt-0.5">Phone: 123-456-7890</div>
              <div className="text-[8.5px] text-slate-600">Email: hello@reallygreatsite.com</div>
            </div>
            <div>
              <div className="font-bold text-[10px] text-slate-800 leading-tight">Harper Richard</div>
              <div className="text-[9px] text-slate-500">Wardiere Inc. / CEO</div>
              <div className="text-[8.5px] text-slate-600 mt-0.5">Phone: 123-456-7890</div>
              <div className="text-[8.5px] text-slate-600">Email: hello@reallygreatsite.com</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
