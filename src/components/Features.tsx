import React from 'react';

const Features = () => {
  const features = [
    {
      title: "AI Rep Counter",
      description: "Never miss a rep. AI tracks every pull-up variation with surgical precision.",
      icon: "01"
    },
    {
      title: "Form Check",
      description: "Real-time feedback prevents injury and maximizes every movement.",
      icon: "02"
    },
    {
      title: "Progress Intel",
      description: "Data-driven insights reveal your strength evolution over time.",
      icon: "03"
    },
    {
      title: "Goal Engine",
      description: "Set targets, crush records, build unstoppable momentum.",
      icon: "04"
    }
  ] as const;

  return (
    <section className="py-24 bg-neutral-900 relative overflow-hidden">
      {/* Ambient Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-8 w-24 h-24 bg-[#00FFD1] opacity-10 rotate-12 blur-lg"></div>
        <div className="absolute bottom-16 right-12 w-32 h-32 bg-white opacity-5 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-48 bg-gradient-to-b from-[#00FFD1] to-transparent opacity-30"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-12 h-px bg-[#00FFD1]"></div>
            <span className="text-[#00FFD1] font-mono text-sm tracking-[0.3em] uppercase">Features</span>
          </div>
          <h2 className="text-6xl font-black text-white tracking-tight leading-[0.85]">
            SMART
            <span className="block text-[#00FFD1]">TRAINING</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.icon}
              className="group relative p-8 border border-neutral-800 
                hover:border-[#00FFD1]/30 hover:bg-neutral-800/20
                transition-all duration-500 cursor-pointer overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Number */}
              <div className="absolute -top-4 -right-4 select-none">
                <span className="text-8xl font-black text-neutral-800/40 
                  group-hover:text-[#00FFD1]/20 transition-all duration-700 
                  font-mono group-hover:scale-110">
                  {feature.icon}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4 
                  group-hover:text-[#00FFD1] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed 
                  group-hover:text-gray-200 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-6 right-6 
                opacity-0 group-hover:opacity-100 transition-all duration-300 
                transform translate-x-4 group-hover:translate-x-0">
                <div className="w-6 h-px bg-[#00FFD1]"></div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00FFD1]/5 to-transparent 
                opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 
            border border-[#00FFD1]/30 hover:border-[#00FFD1] 
            hover:bg-[#00FFD1]/10 transition-all duration-300 
            cursor-pointer group">
            <span className="text-white font-semibold">Start Training Smarter</span>
            <div className="w-4 h-px bg-[#00FFD1] 
              group-hover:w-8 transition-all duration-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;