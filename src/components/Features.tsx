import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      title: "Real-time Form Analysis",
      description: "Advanced computer vision technology analyzes your pull-up form in real-time, providing instant feedback for improvement.",
      number: "01"
    },
    {
      title: "Progress Tracking",
      description: "Track your reps, sets, and progression over time with detailed analytics and visual progress charts.",
      number: "02"
    },
    {
      title: "Customized Programs",
      description: "Get personalized training programs based on your current level and goals, from beginner to advanced.",
      number: "03"
    },
    {
      title: "Video Library",
      description: "Access a comprehensive library of tutorial videos covering different pull-up variations and techniques.",
      number: "04"
    },
    {
      title: "Community Challenges",
      description: "Join monthly challenges and compete with others in the global pull-up community.",
      number: "05"
    },
    {
      title: "Smart Notifications",
      description: "Receive intelligent reminders and workout suggestions based on your training schedule.",
      number: "06"
    }
  ];

  return (
    <section className="py-32 bg-neutral-900 relative overflow-hidden">
      {/* Abstract geometric background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-32 left-10 w-32 h-32 bg-red-500 opacity-5 rotate-12"></div>
        <div className="absolute bottom-20 right-16 w-48 h-48 bg-white opacity-3 rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-64 bg-red-500 opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="mb-24">
          <div className="flex items-center gap-8 mb-8">
            <div className="w-16 h-px bg-red-500"></div>
            <span className="text-red-500 font-mono text-sm tracking-wider">FEATURES</span>
          </div>
          <h2 className="text-6xl font-bold text-white tracking-tight leading-tight">
            BUILT FOR
            <span className="block text-red-500">EXCELLENCE</span>
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
                <span className="text-8xl font-bold text-neutral-800 group-hover:text-red-500/20 
                  transition-colors duration-500 font-mono">
                  {feature.number}
                </span>
              </div>

              {/* Content */}
              <div className="ml-32 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-red-500 
                    transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <div className="w-12 h-px bg-red-500 opacity-0 group-hover:opacity-100 
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
                <div className="w-8 h-px bg-red-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-32 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div>
            <p className="text-gray-400 text-lg max-w-md">
              Every feature designed with precision to elevate your training experience.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-8 py-4 bg-red-500 text-white font-bold 
              hover:bg-red-600 transition-colors">
              START NOW
            </button>
            <div className="flex items-center gap-2 text-white hover:text-red-500 
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