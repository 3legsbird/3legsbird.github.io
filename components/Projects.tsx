import React from 'react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Neon Dashboard",
    description: "A high-performance analytics dashboard featuring real-time data visualization using D3.js and React.",
    tags: ["React", "D3.js", "Tailwind"],
    imageUrl: "https://picsum.photos/seed/neon/600/400",
    link: "#"
  },
  {
    id: 2,
    title: "Gemini Chat Interface",
    description: "An experimental chat UI leveraging the Google GenAI SDK for multimodal interactions.",
    tags: ["TypeScript", "Gemini API", "Vite"],
    imageUrl: "https://picsum.photos/seed/gemini/600/400",
    link: "#"
  },
  {
    id: 3,
    title: "Geometric Landings",
    description: "A collection of landing pages focused on abstract geometry and CSS-only animations.",
    tags: ["CSS3", "HTML5", "Design"],
    imageUrl: "https://picsum.photos/seed/geo/600/400",
    link: "#"
  }
];

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 relative">
       {/* Decorative Background Blob */}
       <div className="absolute right-0 top-1/4 w-96 h-96 bg-bird-pink/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Selected Works</h2>
            <p className="text-slate-400 max-w-md">A curation of my digital experiments, ranging from functional dashboards to abstract art.</p>
          </div>
          <a href="#" className="group hidden md:flex items-center gap-2 text-slate-300 font-bold hover:text-bird-accent transition-colors px-4 py-2 rounded-full border border-transparent hover:border-bird-accent/30 hover:bg-bird-accent/5">
            View GitHub <Github size={18} className="group-hover:rotate-12 transition-transform" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROJECTS.map((project) => (
            <div key={project.id} className="group relative">
              {/* Gradient Border Effect - Only visible on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-bird-accent via-bird-pink to-bird-secondary rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500 group-hover:duration-200 animate-tilt"></div>
              
              <div className="relative h-full flex flex-col bg-bird-card rounded-2xl overflow-hidden border border-slate-800 group-hover:border-transparent transition-colors">
                
                {/* Image Container */}
                <div className="relative overflow-hidden h-56">
                  <div className="absolute inset-0 bg-bird-accent/20 z-10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-bird-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm z-20">
                     <button className="p-3 bg-white text-bird-dark rounded-full hover:scale-110 hover:bg-bird-accent hover:text-white transition-all shadow-lg">
                       <ExternalLink size={20} />
                     </button>
                     <button className="p-3 bg-black text-white border border-white/20 rounded-full hover:scale-110 hover:border-bird-accent hover:text-bird-accent transition-all shadow-lg">
                       <Github size={20} />
                     </button>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-white group-hover:text-bird-accent transition-colors">{project.title}</h3>
                    <ArrowUpRight className="text-slate-600 group-hover:text-bird-accent opacity-0 group-hover:opacity-100 transition-all -translate-y-2 group-hover:translate-y-0" size={20} />
                  </div>
                  
                  <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed border-t border-slate-800 pt-4 mt-2">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700/50 group-hover:border-bird-accent/30 transition-colors">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};