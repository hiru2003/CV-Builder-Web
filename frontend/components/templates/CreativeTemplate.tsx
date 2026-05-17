import React from 'react';
import { CVData } from '@/types/cv';

export const CreativeTemplate = ({ data }: { data: CVData }) => {
  return (
    <div className="w-[210mm] h-[297mm] bg-white overflow-hidden shadow-sm font-sans flex flex-col relative">
      {/* Header Geometric Background */}
      <div className="absolute top-0 right-0 w-[60%] h-48 bg-[#FFE5E5] rounded-bl-full z-0 opacity-50"></div>
      
      <header className="p-10 relative z-10 flex gap-8 items-center border-b-[6px] border-slate-900">
        {data.personal.image && (
          <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-lg shrink-0 transform -rotate-3 border-4 border-white">
            <img src={data.personal.image} alt="Profile" className="w-full h-full object-cover transform rotate-3 scale-110" />
          </div>
        )}
        <div className="flex-grow">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-1">
            {data.personal.fullName || 'YOUR NAME'}
          </h1>
          <p className="text-2xl font-bold text-red-500 tracking-wide">
            {data.personal.jobTitle || 'Job Title'}
          </p>
        </div>
      </header>

      <div className="flex flex-row flex-grow">
        {/* Left Col */}
        <div className="w-[35%] p-8 bg-slate-900 text-slate-300">
          <div className="mb-8">
            <h2 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span> Contact
            </h2>
            <div className="space-y-3 text-sm">
              {data.personal.email && <div>{data.personal.email}</div>}
              {data.personal.phone && <div>{data.personal.phone}</div>}
              {data.personal.address && <div>{data.personal.address}</div>}
              {data.personal.linkedin && <div>{data.personal.linkedin}</div>}
            </div>
          </div>

          {data.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span> Skills
              </h2>
              <div className="flex flex-col gap-3">
                {data.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{skill}</span>
                    </div>
                    <div className="w-full bg-slate-700 h-1 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-red-500 to-orange-400 h-full w-[85%]"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.education.length > 0 && (
            <div>
              <h2 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span> Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id} className="text-sm">
                    <div className="font-bold text-white">{edu.degree}</div>
                    <div className="text-slate-400">{edu.institution}</div>
                    <div className="text-xs text-slate-500 mt-1">{edu.startDate} - {edu.endDate}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Col */}
        <div className="w-[65%] p-10 bg-white">
          {data.summary && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 relative inline-block">
                Profile
                <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-200 -z-10"></span>
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {data.summary}
              </p>
            </section>
          )}

          {data.experience.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 relative inline-block">
                Experience
                <span className="absolute bottom-1 left-0 w-full h-3 bg-blue-200 -z-10"></span>
              </h2>
              <div className="relative border-l-2 border-slate-200 pl-6 space-y-8 ml-3">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative">
                    <div className="absolute w-4 h-4 bg-white border-4 border-slate-900 rounded-full -left-[33px] top-1"></div>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-xl font-bold text-slate-900">{exp.position}</h3>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-md font-medium text-red-500 mb-3">{exp.company}</div>
                    <ul className="list-disc list-outside ml-4 text-sm text-slate-600 space-y-2">
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
