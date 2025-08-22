'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useSound } from '@/hooks/useSound';
import FlappyHeavenGame from './apps/FlappyHeavenGame';

export default function Hero() {
  const { playSound } = useSound();
  const [showGame, setShowGame] = useState(false);
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
          Experience computing the way it was meant to be. Heaven OS brings you pixel-perfect 
          retro computing with modern AI, interactive games, and beautiful 8-bit aesthetics. 
          {!showGame ? ' Start with Flappy Heaven below!' : ' Enjoy the game!'}
        </p>

        {/* Game Toggle & CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            className="pixel-button-primary w-full sm:w-auto min-w-[160px]"
            onClick={() => {
              setShowGame(!showGame);
              playSound('click');
            }}
            onMouseEnter={() => playSound('hover')}
          >
            {showGame ? '🌤️ Hide Game' : '🎮 Play Flappy Heaven'}
          </button>
          <button 
            className="pixel-button w-full sm:w-auto min-w-[160px]"
            onClick={() => playSound('click')}
            onMouseEnter={() => playSound('hover')}
          >
            Download OS
          </button>
        </div>

        {/* Flappy Heaven Game */}
        {showGame && (
          <div className="mt-12 animate-fade-in">
            <div className="max-w-2xl mx-auto">
              <div className="pixel-window bg-white">
                {/* Game Header */}
                <div className="pixel-window-header">
                  <div className="font-pixel text-xs flex items-center">
                    <span className="mr-2">🌤️</span>
                    Flappy Heaven - Welcome to Heaven OS!
                  </div>
                  <button
                    onClick={() => {
                      setShowGame(false);
                      playSound('click');
                    }}
                    className="pixel-window-button hover:bg-red-400"
                    title="Close Game"
                  >
                    ×
                  </button>
                </div>

                {/* Game Content */}
                <div style={{ height: '450px' }}>
                  <FlappyHeavenGame />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Version info */}
        <div className="mt-8 text-xs font-mono text-gray-500">
          Version 1.0.0 • Free & Open Source {showGame && '• Now with Pixel Games!'}
        </div>
      </div>
    </section>
  );
}
