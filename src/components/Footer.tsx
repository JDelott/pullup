// Footer.tsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="relative bg-neutral-950 border-t border-gray-800">
      {/* Minimal grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>

      {/* Accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00FFD1]/30 to-transparent"></div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 py-20">

        {/* Main brand section - centered */}
        <div className="text-center mb-16">
          <h3 className="text-4xl font-black text-white tracking-tight mb-4">
            PULL<span className="text-[#00FFD1]">FORCE</span>
          </h3>
          <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
            AI-powered pull-up training that adapts to your fitness level.
          </p>
        </div>

        {/* Navigation links - centered grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-center">
          <div>
            <a href="#" className="text-gray-400 hover:text-[#00FFD1] transition-colors font-medium">
              Workouts
            </a>
          </div>
          <div>
            <a href="#" className="text-gray-400 hover:text-[#00FFD1] transition-colors font-medium">
              Progress
            </a>
          </div>
          <div>
            <a href="#" className="text-gray-400 hover:text-[#00FFD1] transition-colors font-medium">
              Help
            </a>
          </div>
          <div>
            <a href="#" className="text-gray-400 hover:text-[#00FFD1] transition-colors font-medium">
              Privacy
            </a>
          </div>
        </div>

        {/* Bottom section - centered */}
        <div className="text-center space-y-4">
          <div className="inline-block">
            <span className="px-3 py-1 text-xs font-mono tracking-wider text-[#1AFFD6] border border-[#00FFD1]/30 bg-[#00FFD1]/5">
              BETA VERSION
            </span>
          </div>

          <div className="text-gray-400 text-sm font-mono">
            © 2024 PULLFORCE. ALL RIGHTS RESERVED.
          </div>

          <div className="text-xs text-gray-500 font-mono tracking-wider">
            BUILT FOR ATHLETES • POWERED BY AI
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;