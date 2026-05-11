import React, { useEffect, useRef } from 'react';

export const FlagBanner: React.FC = () => {
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    let rafId: number;
    const start = performance.now();
    
    // Animation parameters
    const params = {
      baseX: 0.009,
      baseY: 0.02
    };

    const animate = (now: number) => {
      if (!turbulenceRef.current) return;
      
      const t = (now - start);
      // Oscillate baseFrequency to create wave motion
      // We use sine/cosine to smoothly modulate the noise frequency
      const bx = params.baseX + Math.sin(t * 0.0006) * 0.003;
      const by = params.baseY + Math.cos(t * 0.0009) * 0.006;
      
      turbulenceRef.current.setAttribute('baseFrequency', `${bx} ${by}`);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="w-full h-full bg-slate-800 overflow-hidden select-none">
      <svg 
        viewBox="0 0 900 450" 
        preserveAspectRatio="none" 
        className="w-full h-full block"
      >
        <defs>
          {/* The magic filter that creates the liquid/flag ripple effect */}
          <filter id="wave" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feTurbulence 
              ref={turbulenceRef} 
              id="turb" 
              baseFrequency="0.009 0.02" 
              numOctaves="2" 
              seed="2" 
              type="fractalNoise" 
              result="noise" 
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale="30" 
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
          </filter>
        </defs>

        {/* Group applying the wave filter */}
        {/* We scale it slightly (1.05) to prevent the edges from pulling inwards during displacement */}
        <g filter="url(#wave)" transform="scale(1.05) translate(-20, -10)">
          {/* Background Base */}
          <rect width="950" height="480" fill="#0f172a" />

          {/* Flag Design matching 3legsbird Theme */}
          
          {/* Top Band: Bird Accent (Purple) */}
          <rect x="0" y="0" width="950" height="150" fill="#8b5cf6" />

          {/* Separator Stripe: Bird Pink */}
          <rect x="0" y="150" width="950" height="15" fill="#ec4899" />

          {/* Middle Band: White/Slate Light */}
          <rect x="0" y="165" width="950" height="120" fill="#f8fafc" />

          {/* Separator Stripe: Bird Pink */}
          <rect x="0" y="285" width="950" height="15" fill="#ec4899" />

          {/* Bottom Band: Bird Secondary (Emerald) */}
          <rect x="0" y="300" width="950" height="180" fill="#10b981" />
          
          {/* Geometric Decorations (Figures) overlaid on the flag */}
          <circle cx="200" cy="225" r="50" fill="#ec4899" opacity="0.3" />
          <rect x="700" y="50" width="80" height="80" fill="#fff" opacity="0.2" transform="rotate(45 740 90)" />
          <path d="M450 350 L500 400 L400 400 Z" fill="#0f172a" opacity="0.2" />
        </g>
      </svg>
    </div>
  );
};