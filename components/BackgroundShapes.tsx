import React from 'react';

export const BackgroundShapes: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Gradient Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-bird-accent/20 rounded-full mix-blend-screen filter blur-[64px] opacity-60 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-bird-secondary/20 rounded-full mix-blend-screen filter blur-[64px] opacity-60 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-bird-pink/20 rounded-full mix-blend-screen filter blur-[64px] opacity-60 animate-blob animation-delay-4000"></div>
      
      {/* Large Gradient Spheres */}
      <div className="absolute -top-[10%] -right-[5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-bird-accent/5 to-transparent blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-[10%] -left-[10%] w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-bird-secondary/5 to-transparent blur-3xl animate-float-delayed"></div>
      
      {/* Rotating Grid Ring */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] border border-slate-800/30 rounded-full animate-spin-slow opacity-20"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] border border-dashed border-slate-800/30 rounded-full animate-spin-reverse-slow opacity-20"></div>

      {/* Floating Geometry - Custom Shapes */}
      <svg className="absolute top-20 left-10 w-24 h-24 text-bird-accent/10 animate-float" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>

      <svg className="absolute bottom-40 right-10 w-32 h-32 text-bird-pink/10 animate-float-delayed" viewBox="0 0 100 100">
        <rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)" stroke="currentColor" strokeWidth="1" fill="none" />
        <rect x="30" y="30" width="40" height="40" transform="rotate(45 50 50)" fill="currentColor" className="opacity-20" />
      </svg>
      
      {/* Scattered Particles */}
      <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-bird-secondary rounded-full animate-ping opacity-20"></div>
      <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-bird-accent rounded-full animate-ping opacity-20" style={{ animationDuration: '3s' }}></div>
      <div className="absolute top-1/2 right-10 w-3 h-3 border border-bird-pink rounded-full animate-float opacity-30"></div>

      {/* Plus Signs Grid Effect (Subtle) */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ 
        backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', 
        backgroundSize: '40px 40px' 
      }}></div>
      
      {/* Noise Overlay for Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
    </div>
  );
};