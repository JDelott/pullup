import React from 'react';

const Features = () => {
  const features = [
    {
      title: "Count Every Rep",
      description: "Automatic rep counting with precision tracking for all your pull-up sessions.",
      number: "01"
    },
    {
      title: "Track All Variations",
      description: "Wide grip, chin-ups, neutral grip - we recognize and track every variation.",
      number: "02"
    },
    {
      title: "Form Feedback",
      description: "Real-time feedback to help you maintain proper form and avoid injury.",
      number: "03"
    },
    {
      title: "Progress Over Time",
      description: "See your strength gains with simple charts and weekly progress reports.",
      number: "04"
    },
    {
      title: "Set Your Goals",
      description: "Target reps, weekly goals, or personal records - stay motivated and consistent.",
      number: "05"
    },
    {
      title: "Train Anywhere",
      description: "Home gym, park, or commercial gym - track your workouts wherever you train.",
      number: "06"
    }
  ];

  return (
    <section className="py-32 bg-neutral-900 relative overflow-hidden">
      {/* Abstract geometric background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-32 left-10 w-32 h-32 bg-[#00FFD1] opacity-5 rotate-12"></div>
        <div className="absolute bottom-20 right-16 w-48 h-48 bg-white opacity-3 rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-64 bg-[#00FFD1] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="mb-24">
          <div className="flex items-center gap-8 mb-8">
            <div className="w-16 h-px bg-[#00FFD1]"></div>
            <span className="text-[#00FFD1] font-mono text-sm tracking-wider">FEATURES</span>
          </div>
          <h2 className="text-6xl font-bold text-white tracking-tight leading-tight">
            SIMPLE
            <span className="block text-[#00FFD1]">TRACKING</span>
          </h2>
        </div>

        {/* Features List */}
        <div className="space-y-0">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group border-t border-neutral-800 py-12 hover:bg-neutral-800/30 
                transition-all duration-500 relative"
            >
              {/* Feature Number */}
              <div className="absolute left-0 top-12">
                <span className="text-8xl font-bold text-neutral-800 group-hover:text-[#00FFD1]/20 
                  transition-colors duration-500 font-mono">
                  {feature.number}
                </span>
              </div>

              {/* Content */}
              <div className="ml-32 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-[#00FFD1] 
                    transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <div className="w-12 h-px bg-[#00FFD1] opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300"></div>
                </div>

                <div className="lg:pl-8">
                  <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 
                    transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Hover indicator */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 
                group-hover:opacity-100 transition-all duration-300 transform 
                translate-x-4 group-hover:translate-x-0">
                <div className="w-8 h-px bg-[#00FFD1]"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-32 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div>
            <p className="text-gray-400 text-lg max-w-md">
              Everything you need to track pull-ups. Nothing you don't.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-8 py-4 bg-[#00FFD1] text-black font-bold 
              hover:bg-[#1AFFD6] transition-colors">
              START NOW
            </button>
            <div className="flex items-center gap-2 text-white hover:text-[#00FFD1] 
              transition-colors cursor-pointer">
              <span className="font-mono text-sm">VIEW DEMO</span>
              <div className="w-6 h-px bg-current"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;