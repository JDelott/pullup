// Footer.tsx
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-black to-neutral-950 border-t border-gray-800/50">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Brand */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">
            PULL<span className="text-[#00FFD1]">FORCE</span>
          </h3>
          <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
            Transform your fitness with intelligent workout tracking.
          </p>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800/50 pt-8 mb-6">
          <div className="max-w-sm mx-auto">
            <h4 className="text-white font-medium mb-4 text-center">Stay Updated</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFD1] text-sm"
              />
              <button className="px-4 py-2 bg-[#00FFD1] hover:bg-[#00FFD1]/90 text-black font-medium rounded transition-colors text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800/50 pt-6 text-center">
          <p className="text-gray-500 text-xs">
            © {currentYear} PULLFORCE. Made with 💪 for fitness enthusiasts.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;