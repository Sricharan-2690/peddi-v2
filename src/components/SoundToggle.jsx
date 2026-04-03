import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function SoundToggle() {
  const { theme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());
  
  const songs = {
    light: '/audios/Peddi - Chikiri Chikiri Song Ringtone _ Peddi BGM _ Janvi k _ Ram Charan _ AR Rahman _ Psl Ringtone .mp3',
    dark: '/audios/Peddi First Shot (Ost).mp3'
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = 0.4;
    
    // Set initial source
    audio.src = theme === 'light' ? songs.light : songs.dark;
    audio.load();
    
    // If it was playing, keep playing the new track
    if (isPlaying) {
      audio.play().catch(err => console.log("Autoplay blocked:", err));
    }

    return () => {
      audio.pause();
    };
  }, [theme]); // Re-run when theme changes

  const toggleSound = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(err => console.log("Playback failed:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const isLight = theme === 'light';

  return (
    <button
      onClick={toggleSound}
      className={`fixed bottom-8 right-8 z-[60] p-3.5 rounded-full transition-all duration-500 hover:scale-110 active:scale-95 group overflow-hidden backdrop-blur-md
        ${isLight
          ? 'bg-[#FDFAF6]/80 text-[#7A4A10] border-2 border-[#7A4A10]/30 shadow-[0_4px_24px_rgba(122,74,16,0.18),0_0_0_1px_rgba(122,74,16,0.08)]'
          : 'bg-[#0A0A0A]/80 text-[#FF9D00] border-2 border-[#FF9D00]/40 shadow-[0_4px_24px_rgba(255,157,0,0.25),0_0_16px_rgba(255,157,0,0.12)]'
        }`}
      aria-label={isPlaying ? "Mute music" : "Play music"}
    >
      {/* Glow ring when playing */}
      {isPlaying && (
        <span className={`absolute inset-0 animate-ping opacity-25 rounded-full ${isLight ? 'bg-[#7A4A10]' : 'bg-[#FF9D00]'}`} />
      )}

      <div className="relative z-10">
        {isPlaying ? (
          <Volume2 className="w-5 h-5 animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5 opacity-60" />
        )}
      </div>

      {/* Hover tooltip — appears to the LEFT of button */}
      <div className={`absolute right-full mr-4 py-2 px-4 rounded-xl text-[10px] font-black tracking-widest uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-2 group-hover:translate-x-0
        ${isLight
          ? 'bg-[#FDFAF6]/90 text-[#7A4A10] border border-[#7A4A10]/25 shadow-[0_4px_16px_rgba(122,74,16,0.12)] backdrop-blur-md'
          : 'bg-[#0A0A0A]/90 text-[#FF9D00] border border-[#FF9D00]/30 shadow-[0_4px_20px_rgba(255,157,0,0.2)] backdrop-blur-md'
        }`}>
        {isPlaying ? 'MUTE SOUND' : 'PLAY BG MUSIC'}
      </div>
    </button>
  );
}
