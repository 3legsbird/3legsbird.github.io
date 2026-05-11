import React from 'react';
import { Box, Cpu, Globe, Layout, Database, PenTool } from 'lucide-react';
import { Skill } from '../types';

const SKILLS: Skill[] = [
  { name: 'React & Hooks', level: 95, icon: 'Layout', category: 'frontend' },
  { name: 'TypeScript', level: 90, icon: 'Code', category: 'frontend' },
  { name: 'Tailwind CSS', level: 95, icon: 'PenTool', category: 'design' },
  { name: 'Gemini API', level: 85, icon: 'Cpu', category: 'backend' },
  { name: 'Node.js', level: 80, icon: 'Database', category: 'backend' },
  { name: 'Three.js / D3', level: 75, icon: 'Box', category: 'design' },
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-slate-900/30 relative overflow-hidden">
      {/* Subtle grid background for this section */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-bird-dark/80 radial-gradient"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
          
          {/* Text Side */}
          <div className="w-full md:w-1/3 md:sticky md:top-24">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
              Tech <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-bird-accent to-bird-pink">Arsenal</span>
            </h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              My toolkit is curated for speed, scalability, and aesthetic precision. I bridge the gap between heavy backend logic and delicate frontend interactions.
            </p>
            <div className="flex flex-wrap gap-2">
               {['Frontend', 'Backend', 'AI Integration', 'UI/UX'].map(tag => (
                 <span key={tag} className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:border-bird-accent/50 hover:text-white transition-colors cursor-default">
                   {tag}
                 </span>
               ))}
            </div>
          </div>

          {/* Cards Grid Side */}
          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SKILLS.map((skill, index) => (
              <div 
                key={skill.name}
                className="group relative bg-bird-card border border-slate-800 p-6 rounded-2xl hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(139,92,246,0.3)] overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Hover Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-bird-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-bird-accent/20 rounded-full blur-3xl group-hover:bg-bird-accent/30 transition-colors"></div>
                
                <div className="relative z-10 flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-bird-secondary group-hover:text-bird-accent group-hover:border-bird-accent/50 group-hover:scale-110 transition-all duration-300">
                        {React.cloneElement(getIcon(skill.icon) as React.ReactElement, { size: 24 })}
                    </div>

                    <div className="flex-grow">
                        <h3 className="text-lg font-bold text-slate-100 mb-1">{skill.name}</h3>
                        <div className="flex justify-between text-xs text-slate-500 mb-3">
                            <span className="uppercase tracking-wider font-semibold">{skill.category}</span>
                            <span>{skill.level}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-bird-accent to-bird-pink group-hover:animate-shimmer bg-[length:200%_auto] rounded-full" 
                                style={{ width: `${skill.level}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const getIcon = (name: string) => {
  switch (name) {
    case 'Layout': return <Layout />;
    case 'Code': return <Globe />;
    case 'PenTool': return <PenTool />;
    case 'Cpu': return <Cpu />;
    case 'Database': return <Database />;
    case 'Box': return <Box />;
    default: return <Box />;
  }
};