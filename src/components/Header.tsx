'use client';

import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Wordmark */}
          <div className="flex items-center space-x-2">
            <div className="text-lg font-pixel uppercase tracking-wider">
              Heaven OS
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm font-pixel uppercase tracking-wide hover:text-halo-gold transition-colors focus:outline-none focus:ring-2 focus:ring-halo-gold"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-sm font-pixel uppercase tracking-wide hover:text-halo-gold transition-colors focus:outline-none focus:ring-2 focus:ring-halo-gold"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('demo')}
              className="text-sm font-pixel uppercase tracking-wide hover:text-halo-gold transition-colors focus:outline-none focus:ring-2 focus:ring-halo-gold"
            >
              Demo
            </button>
            <a
              href="#download"
              className="text-sm font-pixel uppercase tracking-wide hover:text-halo-gold transition-colors focus:outline-none focus:ring-2 focus:ring-halo-gold"
            >
              Download
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden pixel-button text-xs p-2"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t-2 border-black bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-3 py-2 text-sm font-pixel uppercase tracking-wide hover:bg-halo-gold focus:outline-none focus:ring-2 focus:ring-halo-gold"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="block w-full text-left px-3 py-2 text-sm font-pixel uppercase tracking-wide hover:bg-halo-gold focus:outline-none focus:ring-2 focus:ring-halo-gold"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('demo')}
                className="block w-full text-left px-3 py-2 text-sm font-pixel uppercase tracking-wide hover:bg-halo-gold focus:outline-none focus:ring-2 focus:ring-halo-gold"
              >
                Demo
              </button>
              <a
                href="#download"
                className="block px-3 py-2 text-sm font-pixel uppercase tracking-wide hover:bg-halo-gold focus:outline-none focus:ring-2 focus:ring-halo-gold"
                onClick={() => setIsMenuOpen(false)}
              >
                Download
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
