import React from 'react';
import { CVData } from '@/types/cv';

export const ExecutiveTemplate = ({ data }: { data: CVData }) => {
  return (
    <div className="w-[210mm] h-[297mm] bg-white p-12 overflow-hidden font-serif text-[#1e293b]">
      <header className="mb-8 border-b-4 border-[#0f172a] pb-8 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-bold uppercase tracking-tight text-[#0f172a] mb-2">
            {data.personal.fullName || 'YOUR NAME'}
          </h1>
          <p className="text-xl font-medium text-[#475569]">{data.personal.jobTitle}</p>
        </div>
        <div className="text-right text-sm text-[#475569] space-y-1">
          {data.personal.email && <div>{data.personal.email}</div>}
          {data.personal.phone && <div>{data.personal.phone}</div>}
          {data.personal.linkedin && <div>{data.personal.linkedin}</div>}
          {data.personal.address && <div>{data.personal.address}</div>}
        </div>
      </header>

      {data.summary && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-widest text-[#0f172a] mb-3">Executive Summary</h2>
          <p className="text-base leading-relaxed text-[#334155] text-justify font-sans">
            {data.summary}
          </p>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-widest text-[#0f172a] mb-3">Areas of Expertise</h2>
          <div className="grid grid-cols-3 gap-y-2 gap-x-4 text-sm font-sans font-medium text-[#334155]">
            {data.skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#0f172a] rounded-sm"></span>
                {skill}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-widest text-[#0f172a] mb-5 border-b border-[#cbd5e1] pb-2">Professional Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-end mb-1">
                  <h3 className="text-lg font-bold text-[#0f172a]">{exp.position}</h3>
                  <span className="text-sm font-bold text-[#475569] font-sans">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-md italic text-[#334155] mb-3">
                  {exp.company} {exp.location && `| ${exp.location}`}
                </div>
                <ul className="list-none ml-2 text-sm text-[#334155] space-y-2 font-sans">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-3 leading-relaxed">
                      <span className="text-[#94a3b8] mt-1 text-xs">◆</span>
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
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-widest text-[#0f172a] mb-5 border-b border-[#cbd5e1] pb-2">Education & Credentials</h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-bold text-[#0f172a]">{edu.degree} in {edu.field}</h3>
                  <div className="text-sm italic text-[#475569]">{edu.institution}</div>
                </div>
                <div className="text-sm font-bold text-[#475569] font-sans">
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
