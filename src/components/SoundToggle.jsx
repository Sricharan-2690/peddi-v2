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
      className={`fixed bottom-8 left-8 z-[60] p-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 group overflow-hidden
        ${isLight 
          ? 'bg-[#FDFAF6] text-[#7A4A10] border border-[#7A4A10]/20 shadow-[0_4px_20px_rgba(40,20,5,0.15)]' 
          : 'bg-[#060504] text-[#FF9D00] border border-[#FF9D00]/20 shadow-[0_4px_30px_rgba(255,157,0,0.3)]'
        }`}
      aria-label={isPlaying ? "Mute music" : "Play music"}
    >
      {/* Pulse effect when playing */}
      {isPlaying && (
        <span className={`absolute inset-0 animate-ping opacity-20 rounded-full ${isLight ? 'bg-[#7A4A10]' : 'bg-[#FF9D00]'}`} />
      )}
      
      <div className="relative z-10">
        {isPlaying ? (
          <Volume2 className="w-6 h-6 animate-pulse" />
        ) : (
          <VolumeX className="w-6 h-6 opacity-60" />
        )}
      </div>

      {/* Hover tooltip */}
      <div className={`absolute left-full ml-4 py-2 px-4 rounded-lg text-[10px] font-black tracking-widest uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none transform -translate-x-4 group-hover:translate-x-0
        ${isLight ? 'bg-[#FDFAF6] text-[#7A4A10] border border-[#7A4A10]/20 shadow-lg' : 'bg-[#060504] text-[#FF9D00] border border-[#FF9D00]/20 shadow-xl'}`}>
        {isPlaying ? 'MUTE SOUND' : 'PLAY BG MUSIC'}
      </div>
    </button>
  );
}
