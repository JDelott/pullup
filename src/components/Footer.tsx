// Footer.tsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-neutral-950 border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Brand */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white mb-2">
            PULL<span className="text-[#00FFD1]">FORCE</span>
          </h3>
          <p className="text-gray-400">
            AI-powered pull-up training that adapts to your fitness level.
          </p>
        </div>

        {/* Links */}
        <div className="flex justify-center gap-8 mb-8">
          <a href="#" className="text-gray-400 hover:text-[#00FFD1] transition-colors">
            Workouts
          </a>
          <a href="#" className="text-gray-400 hover:text-[#00FFD1] transition-colors">
            Progress
          </a>
          <a href="#" className="text-gray-400 hover:text-[#00FFD1] transition-colors">
            Help
          </a>
          <a href="#" className="text-gray-400 hover:text-[#00FFD1] transition-colors">
            Privacy
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          © 2024 PULLFORCE. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;