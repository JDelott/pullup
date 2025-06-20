// Footer.tsx
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Workouts', href: '/workouts' },
      { name: 'Progress Tracking', href: '/progress' },
      { name: 'Challenges', href: '/challenges' },
      { name: 'Community', href: '/community' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Feedback', href: '/feedback' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: '𝕏' },
    { name: 'Instagram', href: '#', icon: '📷' },
    { name: 'YouTube', href: '#', icon: '📺' },
    { name: 'Discord', href: '#', icon: '💬' }
  ];

  return (
    <footer className="bg-gradient-to-t from-black to-neutral-950 border-t border-gray-800/50">
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-3xl font-extrabold text-white mb-3 tracking-tight">
                PULL<span className="text-[#00FFD1] font-black">FORCE</span>
              </h3>
              <p className="text-gray-400 text-base leading-relaxed">
                Transform your fitness journey with intelligent workout tracking and peak performance analytics.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800/50 hover:bg-[#00FFD1]/20 border border-gray-700 hover:border-[#00FFD1]/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#00FFD1] transition-all duration-300 group"
                  aria-label={social.name}
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6 relative">
              Product
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#00FFD1]"></div>
            </h4>
            <ul className="space-y-4">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#00FFD1] transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6 relative">
              Support
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#00FFD1]"></div>
            </h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#00FFD1] transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6 relative">
              Legal
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#00FFD1]"></div>
            </h4>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#00FFD1] transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800/50 pt-12 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-white font-semibold text-lg mb-3">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-6">
              Get the latest workout tips and feature updates delivered to your inbox.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFD1] focus:ring-1 focus:ring-[#00FFD1] transition-colors"
              />
              <button className="px-6 py-3 bg-[#00FFD1] hover:bg-[#00FFD1]/90 text-black font-semibold rounded-lg transition-colors duration-200 hover:scale-105 transform">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            © {currentYear} PULLFORCE. All rights reserved.
          </div>
          <div className="text-gray-500 text-sm">
            Made with 💪 for fitness enthusiasts
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;