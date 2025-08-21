'use client';

import { useState, useEffect } from 'react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const commands = {
    'help': 'Available commands: help, about, features, download, clear, time, weather',
    'about': 'Heaven OS - A retro pixel operating system for the modern age',
    'features': 'Heaven Prompt • Halo Bar • Cloud Desk • Quiet Mode',
    'download': 'Download coming soon! This is a web demo for now.',
    'clear': '',
    'time': () => new Date().toLocaleTimeString(),
    'weather': 'Always sunny in the digital clouds ☁️',
    'hello': 'Hello there! Welcome to Heaven OS 👋',
    'hi': 'Hi! Nice to see you here ✨',
    'status': 'All systems operational. Pixels aligned perfectly.',
    'version': 'Heaven OS v1.0.0 - Built with love and pixels',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = input.toLowerCase().trim();
    
    if (command === 'clear') {
      setResponse('');
      setInput('');
      return;
    }

    let result = '';
    if (command in commands) {
      const commandResult = commands[command as keyof typeof commands];
      result = typeof commandResult === 'function' ? commandResult() : commandResult;
    } else if (command) {
      result = `Command "${command}" not found. Type "help" for available commands.`;
    }

    setResponse(result);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setInput('');
      setResponse('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="command-palette-backdrop"
        onClick={onClose}
      />

      {/* Command Palette */}
      <div className="command-palette">
        <div className="pixel-window bg-white">
          {/* Header */}
          <div className="pixel-window-header">
            <div className="font-pixel text-xs">Heaven Prompt</div>
            <button
              onClick={onClose}
              className="pixel-window-button"
              title="Close"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Response Display */}
            {response && (
              <div className="bg-black text-halo-gold font-mono text-sm p-4 mb-4 min-h-[60px] overflow-auto">
                <div className="whitespace-pre-line">{response}</div>
              </div>
            )}

            {/* Command Input */}
            <form onSubmit={handleSubmit}>
              <div className="flex items-center border-2 border-black">
                <span className="px-3 py-2 bg-halo-gold font-mono text-sm">
                  &gt;
                </span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command..."
                  className="flex-1 px-3 py-2 font-mono text-sm bg-white border-none outline-none"
                  autoFocus
                />
              </div>
            </form>

            {/* Help Text */}
            <div className="mt-4 text-xs font-mono text-gray-500 text-center">
              Type &quot;help&quot; for commands • Press Escape to close • Enter to execute
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
