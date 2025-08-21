'use client';

import Image from 'next/image';
import { useSound } from '@/hooks/useSound';

export default function Hero() {
  const { playSound } = useSound();
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-12">
          <Image
            src="/assets/logo.png"
            alt="Heaven OS Logo - Winged cloud with halo"
            width={120}
            height={120}
            priority
            className="mx-auto pixel-shadow"
          />
        </div>

        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-pixel mb-6 leading-relaxed">
          Boot to clouds.
          <br />
          Work in pixels.
        </h1>

        {/* Subtext */}
        <p className="text-sm sm:text-base font-mono mb-12 max-w-2xl mx-auto leading-relaxed text-gray-700">
          Experience computing the way it was meant to be. Heaven OS brings you a pure, 
          distraction-free environment where every pixel has purpose and every interaction 
          feels intentional.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            className="pixel-button-primary w-full sm:w-auto min-w-[160px]"
            onClick={() => playSound('click')}
            onMouseEnter={() => playSound('hover')}
          >
            Download
          </button>
          <button 
            className="pixel-button w-full sm:w-auto min-w-[160px]"
            onClick={() => playSound('click')}
            onMouseEnter={() => playSound('hover')}
          >
            Open Web App
          </button>
        </div>

        {/* Version info */}
        <div className="mt-8 text-xs font-mono text-gray-500">
          Version 1.0.0 • Free & Open Source
        </div>
      </div>
    </section>
  );
}
