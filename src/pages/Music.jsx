import React, { useState, useMemo, useRef } from 'react';
import languages from '../data/languages';
import songsData from '../data/songsData';
import { Play, Pause } from 'lucide-react';

const SongCard = ({ song }) => {
  const [activeLang, setActiveLang] = useState(song.languages[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  const bars = useMemo(() => Array.from({length:40}, () => ({
    height: Math.random() * 36 + 8,
    dur: (Math.random() * 0.8 + 0.4).toFixed(2),
    delay: (Math.random() * 0.5).toFixed(2),
  })), []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-p-dark border border-p-gold/20 rounded-2xl p-8 mt-8 max-w-3xl mx-auto shadow-xl">
      {song.badge && (
        <span className="bg-p-gold text-p-black text-xs font-oswald font-bold px-3 py-1 rounded-full inline-block mb-4 uppercase">
          {song.badge}
        </span>
      )}
      <h3 className="font-cinzel text-3xl text-p-gold uppercase">{song.title}</h3>
      <p className="font-noto text-sm text-p-muted mt-2">{song.subtitle}</p>

      {/* Language Tabs */}
      <div className="flex gap-2 mt-4 flex-wrap">
        {song.languages.map(lang => (
          <button
            key={lang}
            onClick={() => setActiveLang(lang)}
            className={`font-oswald text-xs px-3 py-1 rounded transition-colors uppercase ${
              activeLang === lang 
                ? 'bg-p-gold text-p-black font-bold' 
                : 'border border-p-gold text-p-gold bg-transparent hover:bg-p-gold/10'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Waveform */}
      <div className="flex gap-0.5 items-end justify-center h-12 mt-6 overflow-hidden w-full max-w-md mx-auto">
        {bars.map((bar, i) => (
          <div 
            key={i} 
            className="w-1 rounded-sm bg-p-gold/70"
            style={{
              height: `${bar.height}px`,
              animation: `waveBar ${bar.dur}s ease-in-out infinite`,
              animationDelay: `${bar.delay}s`,
              animationPlayState: isPlaying ? 'running' : 'paused'
            }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center mt-4">
        <button onClick={togglePlay} className="w-14 h-14 bg-p-gold rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200">
          {isPlaying ? <Pause size={24} className="text-p-black fill-current" /> : <Play size={24} className="text-p-black fill-current ml-1" />}
        </button>
        {/* Silent audio config */}
        <audio ref={audioRef} src={song.audio} onEnded={() => setIsPlaying(false)} onError={(e) => { /* mock */ }} />
        
        {song.record && (
          <p className="font-oswald text-sm text-p-gold mt-4 uppercase">🏆 {song.record}</p>
        )}
      </div>
    </div>
  );
};

export default function Music() {
  return (
    <div className="w-full">
      {/* AR RAHMAN SPOTLIGHT */}
      <section className="min-h-[60vh] relative bg-gradient-to-br from-p-rust via-p-dark to-p-black flex items-center px-6 py-20 overflow-hidden pt-32">
        <h1 
          className="text-outline-gold font-cinzel absolute left-0 text-[8rem] md:text-[14rem] leading-none opacity-20 top-1/2 -translate-y-1/2 select-none whitespace-nowrap pointer-events-none"
        >
          A.R.RAHMAN
        </h1>

        <div className="relative z-10 max-w-xl mx-auto md:ml-auto md:mr-12 lg:mr-32 bg-p-black/80 backdrop-blur rounded-2xl p-10 border border-p-gold/20 shadow-2xl">
          <span className="font-oswald text-xs tracking-widest text-p-muted uppercase">MUSIC BY</span>
          <h2 className="font-cinzel text-5xl text-p-gold mt-2">A.R. Rahman</h2>
          <div className="gold-divider mx-0 w-20" />
          
          <p className="font-noto text-base italic text-p-cream/80 leading-relaxed mt-4">
            "We wanted to recreate a raw, unsung energy that hasn't been heard since Humma Humma. Vizianagaram inspired sounds I've never explored."
          </p>
          
          <div className="flex gap-3 mt-6 flex-wrap">
            {['Oscar Winner', 'Golden Globe', 'National Award'].map(b => (
              <span key={b} className="border border-p-gold/30 rounded-full px-3 py-1 text-xs font-oswald text-p-gold uppercase">{b}</span>
            ))}
          </div>

          <p className="font-noto text-xs text-p-muted/50 mt-6 uppercase">
            T-Series · ₹35 Crore Music Rights
          </p>
        </div>
      </section>

      {/* SONGS SECTION */}
      <section className="bg-p-black py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-cinzel text-4xl text-p-gold">OFFICIAL SOUNDTRACK</h2>
          <div className="gold-divider" />
          
          <div className="mt-12 space-y-8">
            {songsData.map(song => <SongCard key={song.id} song={song} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
