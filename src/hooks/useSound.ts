'use client';

import { useCallback, useState, useEffect } from 'react';

export function useSound() {
  const [isMuted, setIsMuted] = useState(false);

  // Check localStorage for mute preference on mount
  useEffect(() => {
    const savedMuteState = localStorage.getItem('heavenos-muted');
    if (savedMuteState) {
      setIsMuted(JSON.parse(savedMuteState));
    }
  }, []);

  // Save mute preference to localStorage
  const toggleMute = useCallback(() => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    localStorage.setItem('heavenos-muted', JSON.stringify(newMuteState));
  }, [isMuted]);

  // Play sound function using Web Audio API for 8-bit sounds
  const playSound = useCallback((type: 'click' | 'hover' | 'success' | 'error') => {
    if (isMuted) return;

    try {
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Configure different sounds
      switch (type) {
        case 'click':
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
          break;
        case 'hover':
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
          break;
        case 'success':
          oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5
          oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1); // E5
          oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2); // G5
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          break;
        case 'error':
          oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2);
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
          break;
      }

      oscillator.type = 'square'; // 8-bit square wave
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + (type === 'success' ? 0.3 : type === 'error' ? 0.2 : 0.1));
    } catch (error) {
      // Silently fail if Web Audio API is not supported
      console.debug('Web Audio API not supported or failed:', error);
    }
  }, [isMuted]);

  return {
    playSound,
    isMuted,
    toggleMute
  };
}
