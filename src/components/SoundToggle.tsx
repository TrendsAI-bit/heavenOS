'use client';

import { useSound } from '@/hooks/useSound';

export default function SoundToggle() {
  const { isMuted, toggleMute } = useSound();

  return (
    <div className="fixed bottom-16 right-4 z-50">
      <button
        onClick={toggleMute}
        className={`pixel-button text-xs px-3 py-2 transition-colors ${
          isMuted ? 'bg-gray-300 text-gray-600' : 'bg-white'
        }`}
        title={`${isMuted ? 'Enable' : 'Disable'} sound effects`}
        aria-label={`${isMuted ? 'Enable' : 'Disable'} sound effects`}
      >
        🔊 {isMuted ? 'OFF' : 'ON'}
      </button>
    </div>
  );
}
