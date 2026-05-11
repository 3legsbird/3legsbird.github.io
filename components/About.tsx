import React from 'react';
import { Zap, MapPin, Calendar, Link as LinkIcon, Code, Award } from 'lucide-react';
import { FlagBanner } from './FlagBanner';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Profile</h2>
          <div className="w-24 h-1.5 bg-slate-800 mx-auto rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-bird-accent to-bird-pink w-1/2 animate-shimmer"></div>
          </div>
        </div>

        {/* X/Twitter Style Profile Card */}
        <div className="bg-bird-card border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative group">
          
          {/* 1. Banner Section (Flag Animation) */}
          <div className="h-40 sm:h-48 md:h-64 w-full relative overflow-hidden bg-slate-800">
             <FlagBanner />
             {/* Vignette/Gradient for depth */}
             <div className="absolute inset-0 bg-gradient-to-t from-bird-card/80 via-transparent to-transparent pointer-events-none"></div>
          </div>

          {/* 2. Profile Header Section */}
          <div className="px-5 md:px-10 pb-10 relative">
            
            {/* Avatar & Action Row */}
            <div className="flex justify-between items-end -mt-14 sm:-mt-16 md:-mt-20 mb-6 relative z-10">
               {/* Avatar Container */}
               <div className="relative group/avatar">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-[4px] md:border-[6px] border-bird-card bg-slate-800 relative z-10 overflow-hidden shadow-2xl group-hover/avatar:scale-105 transition-transform duration-300 ease-out">
                    <img 
                      src="https://picsum.photos/seed/3legsbird/400/400" 
                      alt="3legsbird" 
                      className="w-full h-full object-cover"
                    />
                    {/* Inner Glow */}
                    <div className="absolute inset-0 ring-1 ring-white/10 rounded-full"></div>
                  </div>
                  {/* Verified/Status Badge */}
                  <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 z-20 bg-bird-card rounded-full p-1">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-bird-secondary flex items-center justify-center rounded-full text-bird-dark">
                        <Zap size={12} md:size={14} fill="currentColor" className="text-bird-dark" />
                    </div>
                  </div>
               </div>

               {/* Call to Action Button */}
               <a 
                 href="#contact" 
                 className="mb-2 md:mb-4 px-5 py-2 md:px-6 md:py-2.5 rounded-full border border-slate-600 text-white text-sm md:text-base font-bold hover:bg-white hover:text-bird-dark hover:border-white transition-all shadow-lg transform hover:-translate-y-1"
               >
                 Hire Me
               </a>
            </div>

            {/* Name & Handle */}
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white flex items-center gap-2">
                3legsbird
                <span className="bg-bird-accent/20 text-bird-accent p-1 rounded-full">
                    <Award size={14} md:size={16} />
                </span>
              </h3>
              <p className="text-slate-400 font-mono text-sm md:text-base">@frontend_wizard</p>
            </div>

            {/* Bio */}
            <div className="space-y-4 text-slate-300 leading-relaxed max-w-2xl mb-6 text-sm sm:text-base md:text-lg">
               <p>
                 Creative Technologist & Senior React Engineer. I transform complex logic into 
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-bird-accent to-bird-pink font-bold"> fluid digital experiences</span>. 
                 Passionate about AI, Geometric Art, and performance.
               </p>
               <p className="text-xs sm:text-sm text-slate-400">
                 Building the web of tomorrow, one component at a time.
               </p>
            </div>

            {/* Metadata Row */}
            <div className="flex flex-wrap gap-y-3 gap-x-4 md:gap-x-6 text-slate-400 text-xs sm:text-sm mb-8">
               <div className="flex items-center gap-1.5 md:gap-2 group cursor-help">
                  <MapPin size={16} className="text-bird-secondary group-hover:animate-bounce" />
                  <span className="group-hover:text-white transition-colors">Global / Remote</span>
               </div>
               <div className="flex items-center gap-1.5 md:gap-2 group">
                  <LinkIcon size={16} className="text-bird-pink" />
                  <a href="#" className="text-bird-accent hover:underline decoration-bird-accent/50 underline-offset-4">github.com/3legsbird</a>
               </div>
               <div className="flex items-center gap-1.5 md:gap-2">
                  <Calendar size={16} className="text-slate-500" />
                  <span>Joined Sep 2018</span>
               </div>
               <div className="flex items-center gap-1.5 md:gap-2">
                  <Code size={16} className="text-slate-500" />
                  <span>TypeScript & React</span>
               </div>
            </div>

            {/* Stats / Highlights */}
            <div className="flex justify-between sm:justify-start gap-4 sm:gap-8 border-t border-slate-800 pt-6">
               <div className="flex flex-col group cursor-pointer items-center sm:items-start">
                  <span className="text-white font-bold text-lg md:text-xl group-hover:text-bird-accent transition-colors">50+</span>
                  <span className="text-slate-500 text-[10px] sm:text-xs uppercase tracking-wider font-semibold">Projects</span>
               </div>
               <div className="flex flex-col group cursor-pointer items-center sm:items-start">
                  <span className="text-white font-bold text-lg md:text-xl group-hover:text-bird-secondary transition-colors">6+</span>
                  <span className="text-slate-500 text-[10px] sm:text-xs uppercase tracking-wider font-semibold">Years Exp.</span>
               </div>
               <div className="flex flex-col group cursor-pointer items-center sm:items-start">
                  <span className="text-white font-bold text-lg md:text-xl group-hover:text-bird-pink transition-colors">10k</span>
                  <span className="text-slate-500 text-[10px] sm:text-xs uppercase tracking-wider font-semibold">Commits</span>
               </div>
            </div>

          </div>
        </div>
        
      </div>
    </section>
  );
};