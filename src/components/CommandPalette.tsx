'use client';

import { useState, useEffect } from 'react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<Array<{ input: string; response: string }>>([]);

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
    'joke': () => {
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
        "Why do Java developers wear glasses? Because they can't C# 👓",
        "What's a programmer's favorite hangout place? Foo Bar! 🍺"
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    },
    'calc': 'Try: calc 2+2, calc 10*5, calc sqrt(16)',
    'history': () => {
      if (history.length === 0) return 'No command history yet. Start typing some commands!';
      return `Recent commands:\n${history.slice(-5).map((h, i) => `${i + 1}. ${h.input}`).join('\n')}`;
    }
  };

  const callOpenAI = async (prompt: string): Promise<string> => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: prompt
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      return data.response || 'Sorry, I had trouble processing that request.';
    } catch (error) {
      console.error('OpenAI API error:', error);
      return 'AI assistant temporarily unavailable. Try built-in commands like "help", "time", or "joke"!';
    }
  };

  const handleCalculation = (expression: string) => {
    try {
      // Basic calculator - only allow safe mathematical expressions
      const sanitized = expression.replace(/[^0-9+\-*/().\s]/g, '');
      if (sanitized.includes('sqrt')) {
        const num = parseFloat(sanitized.replace('sqrt(', '').replace(')', ''));
        return `√${num} = ${Math.sqrt(num)}`;
      }
      const result = eval(sanitized);
      return `${expression} = ${result}`;
    } catch (error) {
      return `Invalid calculation: ${expression}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userInput = input.toLowerCase().trim();
    setIsLoading(true);

    let result = '';

    // Handle built-in commands first
    if (userInput === 'clear') {
      setResponse('');
      setInput('');
      setHistory([]);
      setIsLoading(false);
      return;
    }

    if (userInput.startsWith('calc ')) {
      result = handleCalculation(userInput.substring(5));
    } else if (userInput in commands) {
      const commandResult = commands[userInput as keyof typeof commands];
      result = typeof commandResult === 'function' ? commandResult() : commandResult;
    } else {
      // Use OpenAI for more complex queries
      result = await callOpenAI(input);
    }

    // Add to history
    const newHistoryEntry = { input, response: result };
    setHistory(prev => [...prev.slice(-9), newHistoryEntry]); // Keep last 10 entries

    setResponse(result);
    setInput('');
    setIsLoading(false);
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
            <div className="font-pixel text-xs flex items-center">
              <span className="mr-2">🌤️</span>
              Heaven Prompt {isLoading && <span className="ml-2 animate-pulse">●</span>}
            </div>
            <button
              onClick={onClose}
              className="pixel-window-button hover:bg-red-400"
              title="Close"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Response Display */}
            {(response || isLoading) && (
              <div className="bg-black text-halo-gold font-mono text-sm p-4 mb-4 min-h-[100px] max-h-[300px] overflow-auto">
                {isLoading ? (
                  <div className="flex items-center">
                    <span className="animate-pulse mr-2">🤖</span>
                    <span className="animate-pulse">Heaven OS is thinking...</span>
                    <span className="animate-bounce ml-2">▋</span>
                  </div>
                ) : (
                  <div className="whitespace-pre-line">
                    <span className="text-white">heaven@os:~$</span> {history[history.length - 1]?.input}
                    <br />
                    {response}
                  </div>
                )}
              </div>
            )}

            {/* Command Input */}
            <form onSubmit={handleSubmit}>
              <div className="flex items-center border-2 border-black focus-within:border-halo-gold transition-colors">
                <span className="px-3 py-3 bg-halo-gold font-mono text-sm">
                  🌤️
                </span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything, or try 'help' for commands..."
                  className="flex-1 px-3 py-3 font-mono text-sm bg-white border-none outline-none"
                  disabled={isLoading}
                  autoFocus
                />
                {isLoading && (
                  <div className="px-3 py-3">
                    <div className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full"></div>
                  </div>
                )}
              </div>
            </form>

            {/* Quick Commands */}
            <div className="mt-4 flex flex-wrap gap-2">
              {['help', 'time', 'joke', 'calc 2+2', 'weather'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => setInput(cmd)}
                  className="pixel-button text-xs px-2 py-1 hover:bg-halo-gold"
                  disabled={isLoading}
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Help Text */}
            <div className="mt-4 text-xs font-mono text-gray-500 text-center">
              <div>💡 Try asking questions, calculations, or use built-in commands</div>
              <div className="mt-1">Press Escape to close • Enter to execute • Powered by AI ✨</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
