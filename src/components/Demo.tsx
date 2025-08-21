'use client';

import { useState } from 'react';

export default function Demo() {
  const [isWindowOpen, setIsWindowOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [commandInput, setCommandInput] = useState('');
  const [commandResponse, setCommandResponse] = useState('');

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const responses = [
      "✨ Heaven OS is listening...",
      "🌤️ Clouds are perfectly aligned today",
      "⚡ Pixel perfection achieved",
      "🎯 Your wish is my command",
      "🔮 The digital realm responds",
      "⭐ Magic happens in pixels",
      "🚀 Launching into the digital sky",
      "💫 Stardust and code combined"
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    setCommandResponse(`> ${commandInput}\n${randomResponse}`);
    setCommandInput('');
  };

  const closeWindow = () => {
    setIsWindowOpen(false);
    setTimeout(() => setIsWindowOpen(true), 2000); // Reopen after 2 seconds
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isWindowOpen) {
    return (
      <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-pixel mb-8">
            Live Demo
          </h2>
          <div className="pixel-window bg-gray-100 p-8 text-center">
            <div className="font-mono text-sm text-gray-500">
              Window closed. Reopening in a moment...
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-pixel mb-4">
            Live Demo
          </h2>
          <p className="text-sm font-mono text-gray-600">
            Try the Heaven OS experience right in your browser
          </p>
        </div>

        {/* Demo Window */}
        <div className="max-w-2xl mx-auto">
          <div className="pixel-window bg-white">
            {/* Window Header */}
            <div className="pixel-window-header">
              <div className="font-pixel text-xs">Heaven Terminal v1.0</div>
              <div className="pixel-window-controls">
                <button
                  onClick={toggleMinimize}
                  className="pixel-window-button"
                  title="Minimize"
                >
                  _
                </button>
                <button
                  onClick={closeWindow}
                  className="pixel-window-button"
                  title="Close"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Window Content */}
            {!isMinimized && (
              <div className="p-6">
                {/* Terminal Output */}
                <div className="bg-black text-halo-gold font-mono text-sm p-4 mb-4 min-h-[120px] overflow-auto">
                  <div className="mb-2">Heaven OS Terminal [Version 1.0.0]</div>
                  <div className="mb-2">Copyright (c) 2024 Heaven OS. All rights reserved.</div>
                  <div className="mb-4">---</div>
                  
                  {commandResponse && (
                    <div className="mb-2 whitespace-pre-line">
                      {commandResponse}
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <span className="text-white">heaven@os:~$</span>
                    <span className="ml-2 animate-blink">▋</span>
                  </div>
                </div>

                {/* Command Input */}
                <form onSubmit={handleCommand} className="mb-4">
                  <input
                    type="text"
                    value={commandInput}
                    onChange={(e) => setCommandInput(e.target.value)}
                    placeholder="Try typing something..."
                    className="command-input"
                    
                  />
                </form>

                {/* Instructions */}
                <div className="text-xs font-mono text-gray-500 text-center">
                  Press Enter to execute • Try: &quot;hello&quot;, &quot;help&quot;, or anything you like
                </div>
              </div>
            )}

            {isMinimized && (
              <div className="p-4 text-center">
                <div className="font-mono text-sm text-gray-500">
                  Window minimized
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className="text-xs font-mono text-gray-500">
            This is just a preview. The full Heaven OS experience includes draggable windows, 
            file management, and much more.
          </p>
        </div>
      </div>
    </section>
  );
}
