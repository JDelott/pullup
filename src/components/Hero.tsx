import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 overflow-hidden">
      {/* Modern geometric background elements */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-red-700/15 to-red-800/15 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-red-500 rotate-45 animate-bounce delay-300"></div>
        <div className="absolute top-40 right-40 w-2 h-2 bg-red-400 rounded-full animate-ping delay-700"></div>
        <div className="absolute bottom-32 left-32 w-3 h-3 bg-red-600 rotate-12 animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left column - Enhanced text content */}
          <div className="space-y-10">
            {/* Brand badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/20 backdrop-blur-sm">
              <span className="text-red-400 text-sm font-medium">NEXT-GEN FITNESS TRACKING</span>
            </div>

            {/* Main headline with gradient text */}
            <h1 className="text-7xl lg:text-8xl font-black tracking-tight leading-none">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                PULL
              </span>
              <span className="block bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent animate-pulse">
                FORCE
              </span>
            </h1>

            {/* Enhanced description */}
            <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
              Revolutionary AI-powered pull-up tracking with real-time form analysis,
              personalized training programs, and gamified progress tracking.
            </p>

            {/* Modern CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25">
                <span className="relative z-10">Start Your Journey</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button className="group px-8 py-4 border-2 border-gray-600 text-white font-bold rounded-2xl backdrop-blur-sm hover:border-red-400 hover:bg-red-400/10 transition-all duration-300">
                <span className="group-hover:text-red-400 transition-colors duration-300">Watch Demo</span>
              </button>
            </div>

            {/* Enhanced stats - no icons */}
            <div className="grid grid-cols-3 gap-8 pt-12">
              {[
                { label: 'TRACK', desc: 'Real-time metrics' },
                { label: 'ANALYZE', desc: 'AI form analysis' },
                { label: 'IMPROVE', desc: 'Personalized plans' }
              ].map((item, index) => (
                <div key={index} className="text-center group cursor-pointer">
                  <div className="text-red-400 font-mono text-sm font-bold mb-2">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="text-white font-bold text-lg group-hover:text-red-400 transition-colors duration-300">
                    {item.label}
                  </div>
                  <div className="text-gray-400 text-sm mt-1">
                    {item.desc}
                  </div>
                  <div className="w-8 h-px bg-red-500 mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Modern 3D visual */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Main circular element with 3D effect */}
              <div className="aspect-square rounded-full bg-gradient-to-tr from-red-500/20 via-red-600/20 to-red-700/20 p-1 backdrop-blur-sm border border-white/10">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 backdrop-blur-xl border border-white/5 flex items-center justify-center relative overflow-hidden">

                  {/* Animated pull-up visualization */}
                  <div className="relative">
                    {/* Pull-up bar representation */}
                    <div className="w-32 h-2 bg-gradient-to-r from-red-400 to-red-600 rounded-full mb-8"></div>

                    {/* Stylized figure doing pull-up */}
                    <div className="text-6xl font-black bg-gradient-to-b from-red-400 to-red-600 bg-clip-text text-transparent animate-bounce">
                      ↑
                    </div>

                    {/* Orbiting elements */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                      <div className="absolute -top-8 left-1/2 w-2 h-2 bg-red-400 rounded-full"></div>
                      <div className="absolute top-1/2 -right-8 w-2 h-2 bg-red-500 rounded-full"></div>
                      <div className="absolute -bottom-8 left-1/2 w-2 h-2 bg-red-600 rounded-full"></div>
                      <div className="absolute top-1/2 -left-8 w-2 h-2 bg-red-700 rounded-full"></div>
                    </div>
                  </div>

                  {/* Inner glow effect */}
                  <div className="absolute inset-4 rounded-full bg-gradient-to-r from-red-500/10 to-red-600/10 blur-xl"></div>
                </div>
              </div>

              {/* Floating metrics cards */}
              <div className="absolute -top-4 -right-4 bg-neutral-800/80 backdrop-blur-xl rounded-xl p-3 border border-red-500/20">
                <div className="text-red-400 text-sm font-mono">+12 PRs</div>
                <div className="text-white text-xs">This week</div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-neutral-800/80 backdrop-blur-xl rounded-xl p-3 border border-red-600/20">
                <div className="text-red-500 text-sm font-mono">98%</div>
                <div className="text-white text-xs">Form score</div>
              </div>

              {/* Additional floating elements for more masculine feel */}
              <div className="absolute top-1/2 -left-8 w-16 h-px bg-red-500 opacity-50"></div>
              <div className="absolute top-1/3 -right-6 w-12 h-px bg-red-400 opacity-30 rotate-45"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;