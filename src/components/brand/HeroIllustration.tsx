import React from 'react';

/**
 * Hero Illustration: Developer-Themed Illustration Built in Code (Section 5.5)
 * Components:
 * - Code editor window
 * - Terminal-style card
 * - Signature branch graph with 4 coloured nodes
 * - Purposeful subtle animation (blinking cursor, gentle node draw) respecting prefers-reduced-motion
 */
export const HeroIllustration: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative ${className} select-none`}>
      {/* Decorative background aura with zero slop */}
      <div 
        aria-hidden="true"
        className="absolute -inset-2 bg-gradient-to-tr from-[#E8F0FE] to-[#F4F2EC] rounded-2xl filter blur-xl opacity-60 -z-10" 
      />

      {/* Main Container Card: Editor + Terminal */}
      <div className="relative rounded-2xl bg-[#FFFFFF] border border-[#E6E3DC] shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
        
        {/* Editor Window Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#F4F2EC] border-b border-[#E6E3DC]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#D93025]" title="Close" />
            <span className="w-3 h-3 rounded-full bg-[#F9AB00]" title="Minimize" />
            <span className="w-3 h-3 rounded-full bg-[#188038]" title="Maximize" />
            <span className="ml-2 text-xs font-mono text-[#4B525C] font-semibold flex items-center gap-1.5">
              <span>campus-workspace.ts</span>
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#4B525C] bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#E6E3DC]">
            Poornima Univ • IST
          </span>
        </div>

        {/* Editor Body */}
        <div className="p-5 font-mono text-xs sm:text-sm bg-[#FFFFFF] space-y-3">
          
          {/* Code block */}
          <div className="space-y-1 text-xs">
            <p className="text-[#4B525C]">
              <span className="text-[#1A73E8] font-semibold">import</span> &#123; createChapter &#125; <span className="text-[#1A73E8] font-semibold">from</span> <span className="text-[#188038]">'@gdg-campus/poornima'</span>;
            </p>
            <p className="text-[#4B525C] pt-1">
              <span className="text-[#1A73E8] font-semibold">const</span> community = <span className="text-[#1557B0] font-semibold">createChapter</span>(&#123;
            </p>
            <p className="text-[#4B525C] pl-4">
              campus: <span className="text-[#188038]">'Poornima University, Jaipur'</span>,
            </p>
            <p className="text-[#4B525C] pl-4">
              learningAreas: [<span className="text-[#188038]">'Web'</span>, <span className="text-[#188038]">'AI'</span>, <span className="text-[#188038]">'Cloud'</span>, <span className="text-[#188038]">'Open Source'</span>],
            </p>
            <p className="text-[#4B525C] pl-4">
              welcomeLevel: <span className="text-[#188038]">'Beginners to Advanced'</span>
            </p>
            <p className="text-[#4B525C]">&#125;);</p>
          </div>

          {/* Embedded Branch Graph Visual (Section 5.4 Signature Motif) */}
          <div className="p-3.5 rounded-xl bg-[#FBFAF7] border border-[#E6E3DC] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase font-bold text-[#4B525C] tracking-wider">
                Git Branch Graph
              </span>
              <span className="text-xs font-semibold text-[#15171A]">
                main ← feature/collaborate
              </span>
            </div>

            {/* SVG Branch Graph in Editor */}
            <svg
              width="140"
              height="36"
              viewBox="0 0 140 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="overflow-visible"
              aria-label="Git Branch Graph with 4 Colored Nodes"
            >
              {/* Main Trunk Line */}
              <line x1="8" y1="26" x2="132" y2="26" stroke="#15171A" strokeWidth="2" strokeLinecap="round" />
              
              {/* Diverging & Merging Branch */}
              <path
                d="M26 26C42 26 50 10 70 10H86C104 10 110 26 122 26"
                stroke="#15171A"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />

              {/* 4 Coloured Nodes */}
              {/* Blue Node */}
              <circle cx="24" cy="26" r="4.5" fill="#1A73E8" stroke="#FFFFFF" strokeWidth="1.5" className="motion-safe:animate-pulse" />
              
              {/* Red Node */}
              <circle cx="68" cy="10" r="4" fill="#D93025" stroke="#FFFFFF" strokeWidth="1.5" />
              
              {/* Yellow Node */}
              <circle cx="92" cy="10" r="4" fill="#F9AB00" stroke="#FFFFFF" strokeWidth="1.5" />
              
              {/* Green Node */}
              <circle cx="122" cy="26" r="4.5" fill="#188038" stroke="#FFFFFF" strokeWidth="1.5" className="motion-safe:animate-pulse" />
            </svg>
          </div>

          {/* Terminal Card Window Inside */}
          <div className="p-3.5 rounded-xl bg-[#15171A] text-white space-y-2 border border-[#2D3139]">
            <div className="flex items-center justify-between text-[11px] text-[#A6ABB5] font-mono border-b border-[#2D3139] pb-1.5">
              <span>Terminal — bash</span>
              <span className="text-[#188038] flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#188038]" /> active
              </span>
            </div>

            <div className="space-y-1 font-mono text-xs">
              <p className="text-[#A6ABB5]">
                <span className="text-[#188038] font-bold">student@campus</span>:<span className="text-[#1A73E8]">~/dev</span>$ git checkout -b build-solutions
              </p>
              <p className="text-[#E8F0FE]">Switched to a new branch 'build-solutions'</p>
              <p className="text-[#A6ABB5]">
                <span className="text-[#188038] font-bold">student@campus</span>:<span className="text-[#1A73E8]">~/dev</span>$ npm run build
              </p>
              <p className="text-[#188038] flex items-center">
                <span>✓ Compiled 12 modules in 142ms</span>
                {/* Blinking cursor respecting prefers-reduced-motion */}
                <span className="inline-block w-2 h-4 bg-white ml-1.5 motion-safe:animate-bounce" aria-hidden="true" />
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
