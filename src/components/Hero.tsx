import React from 'react';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-neutral-950 overflow-hidden">
      {/* Minimal grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>

      {/* Single accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF0040]/50 to-transparent"></div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 pt-32 pb-20 text-center">

        {/* Badge */}
        <div className="inline-block mb-8">
          <span className="px-4 py-2 text-xs font-mono tracking-wider text-[#FF1A55] border border-[#FF0040]/30 bg-[#FF0040]/5">
            AI-POWERED FITNESS
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-6xl lg:text-8xl font-black tracking-tight leading-none mb-8">
          <span className="text-white block">PULL</span>
          <span className="text-[#FF0040] block">FORCE</span>
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12">
          AI-powered pull-up tracking with real-time form analysis
          and personalized training programs.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button className="px-10 py-4 bg-[#FF0040] text-white font-bold tracking-wide hover:bg-[#E6003A] transition-colors duration-200 text-lg">
            START TRAINING
          </button>
          <button className="px-10 py-4 border border-gray-600 text-white font-bold tracking-wide hover:border-[#FF0040] hover:text-[#FF0040] transition-all duration-200 text-lg">
            WATCH DEMO
          </button>
        </div>

        {/* Simple stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto pt-16 border-t border-gray-800">
          <div className="space-y-2">
            <div className="text-white text-2xl font-bold">98%</div>
            <div className="text-gray-400 text-sm">Form Accuracy</div>
          </div>
          <div className="space-y-2">
            <div className="text-white text-2xl font-bold">10K+</div>
            <div className="text-gray-400 text-sm">Athletes</div>
          </div>
          <div className="space-y-2">
            <div className="text-white text-2xl font-bold">24/7</div>
            <div className="text-gray-400 text-sm">AI Coaching</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;