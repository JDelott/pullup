import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-neutral-900">
      {/* Abstract geometric shapes for Swiss design feel */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-40 h-40 bg-red-500 rounded-full opacity-10"></div>
        <div className="absolute bottom-40 left-20 w-60 h-60 bg-white rounded-lg rotate-45 opacity-5"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left column - Text content */}
          <div className="space-y-8">
            <h1 className="text-6xl font-bold text-white tracking-tight">
              ELEVATE YOUR
              <span className="block text-red-500">PULL-UP GAME</span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl">
              Track your progress. Perfect your form. Achieve your goals.
              The ultimate companion for your pull-up journey.
            </p>

            <div className="flex gap-4">
              <button className="px-8 py-4 bg-red-500 text-white font-bold rounded-lg 
                hover:bg-red-600 transition-colors">
                Start Training
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-bold 
                rounded-lg hover:bg-white hover:text-black transition-all">
                Learn More
              </button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              {['TRACK', 'ANALYZE', 'IMPROVE'].map((text, index) => (
                <div key={index} className="text-center">
                  <div className="text-red-500 font-mono text-sm">{`0${index + 1}`}</div>
                  <div className="text-white font-bold">{text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Visual element */}
          <div className="relative hidden lg:block">
            <div className="aspect-square rounded-full bg-gradient-to-tr from-red-500/20 
              to-transparent p-8">
              <div className="w-full h-full rounded-full border-2 border-white/10 
                flex items-center justify-center">
                <span className="text-8xl font-bold text-white">↑</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
