import React from 'react';

const Features = () => {
  const features = [
    {
      title: "Smart Rep Counting",
      description: "AI-powered precision tracking that counts every rep across all pull-up variations - wide grip, chin-ups, neutral grip.",
      number: "01"
    },
    {
      title: "Real-Time Form Analysis",
      description: "Instant feedback on your form to maximize gains and prevent injury with computer vision technology.",
      number: "02"
    },
    {
      title: "Progress Intelligence",
      description: "Advanced analytics show your strength progression with personalized insights and weekly performance reports.",
      number: "03"
    },
    {
      title: "Goal-Driven Training",
      description: "Set targets, track streaks, and hit personal records with intelligent goal setting and motivation systems.",
      number: "04"
    },
    {
      title: "Train Everywhere",
      description: "Works in any environment - home gym, park, or commercial facility. Your progress follows you anywhere.",
      number: "05"
    }
  ];

  return (
    <section className="py-32 bg-neutral-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-10 w-32 h-32 bg-[#00FFD1] opacity-5 rotate-12 blur-sm"></div>
        <div className="absolute bottom-20 right-16 w-48 h-48 bg-white opacity-3 rounded-full blur-md"></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-64 bg-gradient-to-b from-[#00FFD1] to-transparent opacity-20"></div>
        <div className="absolute top-1/4 left-1/2 w-1 h-32 bg-[#00FFD1] opacity-10 rotate-45"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mb-28">
          <div className="flex items-center gap-8 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-[#00FFD1] to-transparent"></div>
            <span className="text-[#00FFD1] font-mono text-sm tracking-[0.2em] uppercase">Features</span>
          </div>
          <h2 className="text-7xl font-black text-white tracking-tight leading-[0.9]">
            INTELLIGENT
            <span className="block text-[#00FFD1] mt-2">TRACKING</span>
          </h2>
        </div>

        <div className="space-y-0">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group border-t border-neutral-800 first:border-t-0 py-16 
                hover:bg-gradient-to-r hover:from-neutral-800/20 hover:to-transparent
                transition-all duration-700 relative cursor-pointer"
            >
              <div className="absolute left-0 top-16 select-none">
                <span className="text-9xl font-black text-neutral-800/80 
                  group-hover:text-[#00FFD1]/30 transition-all duration-700 
                  font-mono group-hover:scale-110 origin-left">
                  {feature.number}
                </span>
              </div>

              <div className="ml-40 grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                <div className="lg:col-span-2">
                  <h3 className="text-4xl font-bold text-white mb-6 
                    group-hover:text-[#00FFD1] transition-all duration-500
                    leading-tight">
                    {feature.title}
                  </h3>
                  <div className="w-16 h-0.5 bg-[#00FFD1] transform scale-x-0 
                    group-hover:scale-x-100 transition-transform duration-500 
                    origin-left"></div>
                </div>

                <div className="lg:col-span-3">
                  <p className="text-gray-400 text-xl leading-relaxed 
                    group-hover:text-gray-200 transition-colors duration-500">
                    {feature.description}
                  </p>
                </div>
              </div>

              <div className="absolute right-8 top-1/2 -translate-y-1/2 
                opacity-0 group-hover:opacity-100 transition-all duration-500 
                transform translate-x-8 group-hover:translate-x-0">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-px bg-[#00FFD1]"></div>
                  <div className="w-2 h-2 bg-[#00FFD1] rotate-45"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-40 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
          <div className="max-w-lg">
            <p className="text-gray-400 text-xl leading-relaxed mb-4">
              Everything you need to master pull-ups.
            </p>
            <p className="text-gray-500 text-lg">
              Nothing you don't.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button className="px-10 py-5 bg-[#00FFD1] text-black font-bold text-lg
              hover:bg-[#1AFFD6] hover:shadow-lg hover:shadow-[#00FFD1]/20
              transition-all duration-300 transform hover:-translate-y-0.5">
              START TRACKING
            </button>
            <div className="flex items-center gap-3 text-white hover:text-[#00FFD1] 
              transition-colors duration-300 cursor-pointer group">
              <span className="font-mono text-sm tracking-wider">WATCH DEMO</span>
              <div className="w-8 h-px bg-current group-hover:w-12 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;