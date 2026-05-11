import React from 'react';
import { ArrowRight, Code, Layers, Sparkles, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-12 md:pt-20 md:pb-0 overflow-hidden perspective-1000">
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Text Content */}
        <div className="space-y-6 md:space-y-8 relative z-20 order-2 lg:order-1 text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bird-card/50 border border-bird-accent/30 backdrop-blur-md text-bird-accent text-xs font-bold tracking-wider uppercase shadow-[0_0_20px_-10px_rgba(139,92,246,0.5)] animate-float mx-auto lg:mx-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bird-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-bird-accent"></span>
            </span>
            Available for hire
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold leading-tight">
            Constructing <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-bird-accent via-bird-pink to-bird-secondary bg-[length:200%_auto] animate-shimmer">
              Digital Realities
            </span>
          </h1>
          
          <p className="text-slate-400 text-base md:text-lg max-w-md leading-relaxed border-l-2 border-slate-800 pl-6 mx-auto lg:mx-0 text-left">
            I am 3legsbird. A Senior React Engineer crafting pixel-perfect, accessible, and performant web experiences with a touch of geometric art.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
            <a 
              href="#projects"
              className="group relative px-8 py-4 bg-slate-100 text-bird-dark font-bold rounded-full overflow-hidden shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] w-full sm:w-auto text-center"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative flex items-center justify-center gap-2">
                View Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
            <a 
              href="#contact"
              className="px-8 py-4 rounded-full bg-transparent border border-slate-700 text-white hover:border-bird-accent hover:bg-bird-accent/5 hover:shadow-[0_0_30px_-10px_rgba(139,92,246,0.3)] transition-all w-full sm:w-auto text-center"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Visual Graphic - 3D Floating Elements */}
        <div className="relative h-[400px] md:h-[600px] flex items-center justify-center order-1 lg:order-2">
           {/* Central Glow */}
           <div className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-bird-accent/40 to-bird-pink/40 blur-[60px] md:blur-[100px] animate-pulse-slow"></div>
           
           {/* Back Layer - Rotating Grid */}
           <div className="absolute inset-0 flex items-center justify-center opacity-20">
             <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] border border-dashed border-slate-500 rounded-full animate-spin-slow"></div>
           </div>

           {/* Main Card - Code Editor Mockup */}
           <div className="relative z-20 w-64 sm:w-80 md:w-96 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-1 shadow-2xl transform transition-all duration-700 hover:rotate-y-12 hover:rotate-x-12 preserve-3d hover:scale-105 hover:shadow-bird-accent/20 group">
              {/* Inner border gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-bird-accent/20 to-transparent rounded-2xl pointer-events-none"></div>
              
              <div className="bg-bird-card/90 rounded-xl p-4 md:p-6 h-full relative overflow-hidden">
                <div className="flex items-center gap-2 mb-4 md:mb-6 border-b border-slate-800 pb-4">
                   <div className="flex gap-1.5">
                     <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                   </div>
                   <div className="ml-auto text-[10px] md:text-xs text-slate-500 font-mono flex items-center gap-1">
                     <Code size={10} /> App.tsx
                   </div>
                </div>
                
                <div className="space-y-2 md:space-y-3 font-mono text-[10px] sm:text-xs md:text-sm relative z-10">
                   <div className="flex gap-1 md:gap-2">
                      <span className="text-bird-pink">const</span>
                      <span className="text-bird-secondary">Portfolio</span>
                      <span className="text-white">=</span>
                      <span className="text-yellow-300">()</span>
                      <span className="text-bird-pink">=&gt;</span>
                      <span className="text-white">{`{`}</span>
                   </div>
                   <div className="pl-4 flex gap-1 md:gap-2">
                      <span className="text-slate-400">// Rendering magic</span>
                   </div>
                   <div className="pl-4 flex gap-1 md:gap-2">
                      <span className="text-bird-pink">return</span>
                      <span className="text-white">(</span>
                   </div>
                   <div className="pl-8 text-bird-accent">{'<Experience />'}</div>
                   <div className="pl-8 text-bird-accent">{'<Creativity />'}</div>
                   <div className="pl-8 text-bird-accent">{'<Innovation />'}</div>
                   <div className="pl-4 text-white">);</div>
                   <div className="text-white">{`};`}</div>
                </div>

                {/* Subtle reflection */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/5 to-transparent pointer-events-none"></div>
              </div>
              
              {/* Floating Badge on Card */}
              <div className="absolute -right-4 md:-right-8 top-10 bg-bird-card p-2 md:p-3 rounded-xl border border-slate-700 shadow-xl animate-float-delayed backdrop-blur-md">
                 <Sparkles className="text-yellow-400 w-5 h-5 md:w-6 md:h-6" />
              </div>
           </div>

           {/* Front Layer - Floating Glass Cards */}
           <div className="absolute z-30 bottom-0 left-0 md:bottom-10 md:left-10 bg-bird-card/80 backdrop-blur-md border border-white/10 p-3 md:p-4 rounded-2xl shadow-2xl animate-float hover:bg-bird-card transition-colors cursor-default hidden sm:block">
              <div className="flex items-center gap-3 md:gap-4">
                 <div className="bg-bird-secondary/20 p-2 md:p-3 rounded-xl">
                    <Zap className="text-bird-secondary w-5 h-5 md:w-6 md:h-6" />
                 </div>
                 <div>
                    <div className="text-[9px] md:text-[10px] text-slate-400 uppercase font-bold tracking-wider">Performance</div>
                    <div className="text-lg md:text-xl font-bold text-white">100%</div>
                 </div>
              </div>
           </div>

           <div className="absolute z-10 top-0 right-0 md:top-10 md:-right-5 bg-bird-card/80 backdrop-blur-md border border-white/10 p-3 md:p-4 rounded-2xl shadow-2xl animate-float-fast hover:bg-bird-card transition-colors cursor-default hidden sm:block">
              <div className="flex items-center gap-3 md:gap-4">
                 <div className="bg-bird-pink/20 p-2 md:p-3 rounded-xl">
                    <Layers className="text-bird-pink w-5 h-5 md:w-6 md:h-6" />
                 </div>
                 <div>
                    <div className="text-[9px] md:text-[10px] text-slate-400 uppercase font-bold tracking-wider">Stack</div>
                    <div className="text-xs md:text-sm font-bold text-white">React + AI</div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};