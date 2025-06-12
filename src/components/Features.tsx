import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      title: "Real-time Form Analysis",
      description: "Advanced computer vision technology analyzes your pull-up form in real-time, providing instant feedback for improvement.",
      icon: "📊"
    },
    {
      title: "Progress Tracking",
      description: "Track your reps, sets, and progression over time with detailed analytics and visual progress charts.",
      icon: "📈"
    },
    {
      title: "Customized Programs",
      description: "Get personalized training programs based on your current level and goals, from beginner to advanced.",
      icon: "🎯"
    },
    {
      title: "Video Library",
      description: "Access a comprehensive library of tutorial videos covering different pull-up variations and techniques.",
      icon: "🎥"
    },
    {
      title: "Community Challenges",
      description: "Join monthly challenges and compete with others in the global pull-up community.",
      icon: "🏆"
    },
    {
      title: "Smart Notifications",
      description: "Receive intelligent reminders and workout suggestions based on your training schedule.",
      icon: "🔔"
    }
  ];

  return (
    <section className="py-24 bg-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-white mb-4">
            POWERFUL
            <span className="text-red-500"> FEATURES</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to master your pull-ups and track your journey to strength.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-neutral-900 border border-neutral-700 
                hover:border-red-500 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <button className="px-8 py-4 bg-red-500 text-white font-bold rounded-lg 
            hover:bg-red-600 transition-colors">
            Explore All Features
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute right-0 -bottom-10 w-72 h-72 
        bg-red-500/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Features;