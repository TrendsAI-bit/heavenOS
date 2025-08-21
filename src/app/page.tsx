'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Demo from '@/components/Demo';
import Footer from '@/components/Footer';
import CommandPalette from '@/components/CommandPalette';
import CRTToggle from '@/components/CRTToggle';
import SoundToggle from '@/components/SoundToggle';

export default function Home() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command palette shortcut (Ctrl/Cmd + K)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        <Hero />
        
        {/* About Section */}
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-pixel mb-8">
              About Heaven OS
            </h2>
            <div className="space-y-6 font-mono text-sm leading-relaxed text-gray-700">
              <p>
                Heaven OS is a love letter to the golden age of computing, when every pixel mattered 
                and interfaces were crafted with intention. We believe that modern software has lost 
                its soul in the pursuit of flashy animations and unnecessary complexity.
              </p>
              <p>
                Our mission is simple: create a computing environment that feels both nostalgic and 
                futuristic, where every interaction is meaningful and every visual element serves a purpose. 
                No bloat, no distractions, just pure digital craftsmanship.
              </p>
              <p>
                Whether you&apos;re a developer who misses the simplicity of early operating systems, 
                a designer who appreciates pixel-perfect aesthetics, or just someone who wants their 
                computer to feel more human, Heaven OS is built for you.
              </p>
            </div>
          </div>
        </section>

        <Features />
        <Demo />

        {/* Download Section */}
        <section id="download" className="py-20 px-4 sm:px-6 lg:px-8 bg-halo-gold">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-pixel mb-8 text-black">
              Ready to ascend?
            </h2>
            <p className="font-mono text-sm mb-8 text-black leading-relaxed max-w-2xl mx-auto">
              Join thousands of users who have already discovered the joy of pixel-perfect computing. 
              Download Heaven OS today and experience the future of retro computing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button className="pixel-button bg-black text-white hover:bg-gray-800 w-full sm:w-auto min-w-[200px]">
                Download for Windows
              </button>
              <button className="pixel-button bg-black text-white hover:bg-gray-800 w-full sm:w-auto min-w-[200px]">
                Download for macOS
              </button>
              <button className="pixel-button bg-black text-white hover:bg-gray-800 w-full sm:w-auto min-w-[200px]">
                Download for Linux
              </button>
            </div>

            <div className="text-xs font-mono text-black">
              Free & Open Source • No tracking • No ads • Pure pixels
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Command Palette */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      {/* CRT Toggle */}
      <CRTToggle />

      {/* Sound Toggle */}
      <SoundToggle />

      {/* Keyboard shortcut hint */}
      <div className="fixed bottom-4 left-4 z-40">
        <div className="bg-black text-halo-gold px-3 py-2 font-mono text-xs pixel-border">
          Press Ctrl/⌘+K for command palette
        </div>
      </div>
    </div>
  );
}