import React from 'react';
import { CVData } from '@/types/cv';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export const ModernTemplate = ({ data }: { data: CVData }) => {
  return (
    <div className="w-[210mm] h-[297mm] bg-white flex flex-row overflow-hidden shadow-sm font-sans">
      {/* Sidebar */}
      <div className="w-[30%] bg-slate-50 text-slate-800 p-8 flex flex-col border-r border-slate-200">
        {data.personal.image && (
          <div className="w-32 h-32 rounded-full overflow-hidden mb-6 mx-auto border-4 border-white shadow-sm">
            <img src={data.personal.image} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
        
        <div className="mb-8">
          <h2 className="text-sm font-bold tracking-widest text-slate-400 mb-4 uppercase border-b border-slate-200 pb-2">Contact</h2>
          <div className="space-y-3 text-xs">
            {data.personal.email && (
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-[#00A3FF] shrink-0" />
                <span className="break-all">{data.personal.email}</span>
              </div>
            )}
            {data.personal.phone && (
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-[#00A3FF] shrink-0" />
                <span>{data.personal.phone}</span>
              </div>
            )}
            {data.personal.address && (
              <div className="flex items-center gap-3">
                <MapPin size={14} className="text-[#00A3FF] shrink-0" />
                <span>{data.personal.address}</span>
              </div>
            )}
            {data.personal.linkedin && (
              <div className="flex items-center gap-3">
                <Linkedin size={14} className="text-[#00A3FF] shrink-0" />
                <span className="break-all">{data.personal.linkedin}</span>
              </div>
            )}
            {data.personal.github && (
              <div className="flex items-center gap-3">
                <Github size={14} className="text-[#00A3FF] shrink-0" />
                <span className="break-all">{data.personal.github}</span>
              </div>
            )}
            {data.personal.website && (
              <div className="flex items-center gap-3">
                <Globe size={14} className="text-[#00A3FF] shrink-0" />
                <span className="break-all">{data.personal.website}</span>
              </div>
            )}
          </div>
        </div>

        {data.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold tracking-widest text-slate-400 mb-4 uppercase border-b border-slate-200 pb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="bg-white border border-slate-200 px-3 py-1 text-xs rounded-full shadow-sm text-slate-600">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.languages.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold tracking-widest text-slate-400 mb-4 uppercase border-b border-slate-200 pb-2">Languages</h2>
            <div className="space-y-2">
              {data.languages.map((lang, index) => (
                <div key={index} className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700">{lang.name}</span>
                  <span className="text-slate-500">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-[70%] p-10 flex flex-col bg-white">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-slate-800 mb-2 tracking-tight uppercase">
            {data.personal.fullName || 'YOUR NAME'}
          </h1>
          <p className="text-xl text-[#00A3FF] font-medium tracking-wide">
            {data.personal.jobTitle || 'Job Title'}
          </p>
        </header>

        {data.summary && (
          <section className="mb-8">
            <h2 className="text-sm font-bold tracking-widest text-slate-800 mb-3 uppercase border-b-2 border-[#00A3FF] pb-1 inline-block">Profile</h2>
            <p className="text-sm text-slate-600 leading-relaxed text-justify">
              {data.summary}
            </p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-bold tracking-widest text-slate-800 mb-5 uppercase border-b-2 border-[#00A3FF] pb-1 inline-block">Experience</h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-slate-100">
                  <div className="absolute w-2 h-2 bg-[#00A3FF] rounded-full -left-[5px] top-1.5"></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-base font-bold text-slate-800">{exp.position}</h3>
                    <span className="text-xs text-[#00A3FF] font-semibold bg-blue-50 px-2 py-0.5 rounded">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-slate-500 mb-2 flex justify-between">
                    <span>{exp.company}</span>
                    {exp.location && <span>{exp.location}</span>}
                  </div>
                  <ul className="list-disc list-outside ml-4 text-sm text-slate-600 space-y-1">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="leading-relaxed">{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-bold tracking-widest text-slate-800 mb-5 uppercase border-b-2 border-[#00A3FF] pb-1 inline-block">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-base font-bold text-slate-800">{edu.degree} in {edu.field}</h3>
                    <span className="text-xs text-slate-500 font-medium">
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </span>
                  </div>
                  <div className="text-sm text-slate-600 flex justify-between">
                    <span>{edu.institution}</span>
                    {edu.score && <span className="font-medium text-[#00A3FF]">Score: {edu.score}</span>}
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
