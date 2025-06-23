import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-black to-neutral-950 border-t border-gray-800/50">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Brand */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-black text-white mb-2 tracking-tight leading-none group cursor-default">
            PULL<span className="text-[#00FFD1] drop-shadow-[0_0_8px_rgba(0,255,209,0.3)] transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(0,255,209,0.5)]">FORCE</span>
          </h3>
          <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
            Transform your fitness with intelligent workout tracking.
          </p>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800/50 pt-8 mb-6">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
              <h4 className="text-white font-bold text-lg mb-2 tracking-tight">
                Stay Updated
              </h4>
              <p className="text-gray-400 text-sm">
                Get the latest updates and exclusive content
              </p>
            </div>

            <form className="space-y-3">
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700/80 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFD1] focus:bg-gray-800 transition-all duration-300 text-sm backdrop-blur-sm group-hover:border-gray-600"
                  required
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#00FFD1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-3 bg-gradient-to-r from-[#00FFD1] to-[#00E6C3] hover:from-[#00E6C3] hover:to-[#00FFD1] text-black font-semibold rounded-lg transition-all duration-300 text-sm shadow-lg hover:shadow-[#00FFD1]/25 hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Subscribe Now
              </button>
            </form>

            <p className="text-center text-gray-500 text-xs mt-3">
              No spam, unsubscribe anytime
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800/50 pt-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#00FFD1]/50"></div>
            <div className="w-1.5 h-1.5 bg-[#00FFD1] rounded-full animate-pulse"></div>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#00FFD1]/50"></div>
          </div>
          <div className="space-y-1">
            <p className="text-gray-300 text-sm font-medium tracking-wide">
              © {currentYear} <span className="text-white font-bold">PULLFORCE</span>
            </p>
            <p className="text-gray-500 text-xs tracking-wider uppercase font-light">
              Engineered for peak performance by ovation solutions
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;