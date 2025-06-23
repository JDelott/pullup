import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-neutral-950 overflow-hidden">
      {/* Enhanced grid background with depth */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,209,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,209,0.02)_1px,transparent_1px)] bg-[size:400px_400px]"></div>
      </div>

      {/* Multiple accent lines for depth */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00FFD1]/60 to-transparent"></div>
      <div className="absolute top-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00FFD1]/20 to-transparent"></div>

      {/* Subtle glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00FFD1]/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 pt-24 pb-20">

        {/* Enhanced badge with animation */}
        <div className="text-center mb-12">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-[#00FFD1]/20 blur-sm rounded-sm"></div>
            <span className="relative px-6 py-3 text-xs font-mono font-bold tracking-[0.2em] text-[#00FFD1] border border-[#00FFD1]/40 bg-neutral-950/80 backdrop-blur-sm">
              AI-POWERED FITNESS REVOLUTION
            </span>
          </div>
        </div>

        {/* Enhanced main headline with better typography */}
        <div className="text-center mb-12">
          <h1 className="text-7xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-4">
            <span className="block text-white relative">
              PULL
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FFD1]/30 to-transparent"></div>
            </span>
            <span className="block text-[#00FFD1] relative">
              FORCE
              <div className="absolute -top-2 right-0 w-3/4 h-px bg-gradient-to-l from-[#00FFD1]/50 to-transparent"></div>
            </span>
          </h1>

          {/* Subtitle with better hierarchy */}
          <div className="mt-8 space-y-2">
            <p className="text-2xl lg:text-3xl font-light text-gray-300 tracking-wide">
              Master Your Pull-Ups
            </p>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
              Real-time AI form analysis • Personalized training programs • Performance tracking
            </p>
          </div>
        </div>

        {/* Enhanced CTA section */}
        <div className="text-center mb-20">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/signup"
              className="group relative px-12 py-5 bg-[#00FFD1] text-black font-bold tracking-wide text-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              <span className="relative">START TRAINING</span>
            </Link>

            <Link
              href="/login"
              className="group relative px-12 py-5 border-2 border-gray-600 text-white font-bold tracking-wide text-lg transition-all duration-300 hover:border-[#00FFD1] hover:text-[#00FFD1] hover:shadow-[0_0_20px_rgba(0,255,209,0.3)]"
            >
              <div className="absolute inset-0 bg-[#00FFD1]/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <span className="relative">LOGIN</span>
            </Link>
          </div>

          {/* Trust indicator */}
          <p className="mt-8 text-sm text-gray-500 font-mono">
            Join thousands of athletes • No equipment needed • Start in 45 seconds
          </p>
        </div>

        {/* Enhanced stats with better visual hierarchy */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-gray-800/50">
            {[
              { value: "98.7%", label: "Form Accuracy", sublabel: "AI-powered analysis" },
              { value: "12K+", label: "Active Athletes", sublabel: "Growing community" },
              { value: "24/7", label: "AI Coaching", sublabel: "Always available" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4">
                  <div className="text-4xl lg:text-5xl font-black text-white mb-2 group-hover:text-[#00FFD1] transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 font-semibold text-lg mb-1">
                    {stat.label}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {stat.sublabel}
                  </div>
                </div>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto group-hover:via-[#00FFD1] transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional social proof section */}
        {/* Enhanced social proof section */}
        <div className="text-center mt-20 pt-16 border-t border-gray-800/30">
          <p className="text-gray-400 text-sm mb-8 font-mono tracking-wide">
            TRUSTED BY ATHLETES WORLDWIDE
          </p>

          {/* Logo placeholders with better design */}
          <div className="flex justify-center items-center gap-12 mb-8">
            {[
              { width: 'w-32', name: 'FitnessPro' },
              { width: 'w-28', name: 'AthleteX' },
              { width: 'w-36', name: 'TrainingLab' },
              { width: 'w-24', name: 'GymTech' }
            ].map((logo, index) => (
              <div
                key={index}
                className={`${logo.width} h-10 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-sm relative overflow-hidden group cursor-pointer transition-all duration-300 hover:from-gray-600/70 hover:to-gray-500/70`}
              >
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

                {/* Placeholder text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-mono text-gray-500 group-hover:text-gray-400 transition-colors">
                    {logo.name.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial quotes */}
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="p-6 border border-gray-800/50 bg-neutral-900/30 backdrop-blur-sm">
                <div className="mb-4">
                  <div className="text-[#00FFD1] text-2xl font-mono leading-none">"</div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  The AI form analysis helped me perfect my pull-ups in just 2 weeks.
                  My max reps increased by 40%.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full"></div>
                  <div>
                    <div className="text-white text-sm font-medium">Sarah Chen</div>
                    <div className="text-gray-500 text-xs">CrossFit Athlete</div>
                  </div>
                </div>
              </div>

              <div className="p-6 border border-gray-800/50 bg-neutral-900/30 backdrop-blur-sm">
                <div className="mb-4">
                  <div className="text-[#00FFD1] text-2xl font-mono leading-none">"</div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Game-changer for my training. The real-time feedback
                  is incredibly accurate and motivating.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full"></div>
                  <div>
                    <div className="text-white text-sm font-medium">Marcus Rodriguez</div>
                    <div className="text-gray-500 text-xs">Personal Trainer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievement badges */}
          <div className="flex justify-center items-center gap-6 mt-12 pt-8 border-t border-gray-800/20">
            <div className="flex items-center gap-2 px-4 py-2 bg-neutral-900/50 border border-gray-800/50 rounded-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs font-mono text-gray-400">4.9/5 RATING</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-neutral-900/50 border border-gray-800/50 rounded-sm">
              <div className="w-2 h-2 bg-[#00FFD1] rounded-full"></div>
              <span className="text-xs font-mono text-gray-400">ISO CERTIFIED</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-neutral-900/50 border border-gray-800/50 rounded-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-xs font-mono text-gray-400">GDPR COMPLIANT</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;