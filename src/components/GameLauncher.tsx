'use client';

import { useState } from 'react';
import FlappyHeavenGame from './apps/FlappyHeavenGame';
import { useSound } from '@/hooks/useSound';

export default function GameLauncher() {
  const [isGameOpen, setIsGameOpen] = useState(false);
  const { playSound } = useSound();

  const closeGame = () => {
    setIsGameOpen(false);
    playSound('click');
  };

  if (!isGameOpen) {
    return null;
  }

  return (
    <>
      {/* Game Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={closeGame}
      >
        {/* Game Window */}
        <div 
          className="pixel-window bg-white max-w-2xl w-full max-h-[90vh] animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Game Header */}
          <div className="pixel-window-header">
            <div className="font-pixel text-xs flex items-center">
              <span className="mr-2">🌤️</span>
              Flappy Heaven - Pixel Game
            </div>
            <button
              onClick={closeGame}
              className="pixel-window-button hover:bg-red-400"
              title="Close Game"
            >
              ×
            </button>
          </div>

          {/* Game Content */}
          <div style={{ height: '500px' }}>
            <FlappyHeavenGame />
          </div>
        </div>
      </div>
    </>
  );
}

// Export the hook to control the game launcher
export function useGameLauncher() {
  const [isGameOpen, setIsGameOpen] = useState(false);
  const { playSound } = useSound();

  const openGame = () => {
    setIsGameOpen(true);
    playSound('success');
  };

  const closeGame = () => {
    setIsGameOpen(false);
    playSound('click');
  };

  return {
    isGameOpen,
    openGame,
    closeGame,
    GameLauncher: () => (
      <>
        {isGameOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={closeGame}
          >
            <div 
              className="pixel-window bg-white max-w-2xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pixel-window-header">
                <div className="font-pixel text-xs flex items-center">
                  <span className="mr-2">🌤️</span>
                  Flappy Heaven - Pixel Game
                </div>
                <button
                  onClick={closeGame}
                  className="pixel-window-button hover:bg-red-400"
                  title="Close Game"
                >
                  ×
                </button>
              </div>
              <div style={{ height: '500px' }}>
                <FlappyHeavenGame />
              </div>
            </div>
          </div>
        )}
      </>
    )
  };
}
