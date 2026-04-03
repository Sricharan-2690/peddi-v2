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
    <div className="hero-glass-card rounded-2xl p-8 mt-8 max-w-3xl mx-auto shadow-2xl hover:border-p-gold/40 transition-colors duration-300">
      {song.badge && (
        <span className="bg-gradient-to-r from-p-golddk to-p-gold text-white text-xs font-inter font-black px-3 py-1 rounded-full inline-block mb-4 uppercase tracking-widest shadow-[0_0_15px_rgba(255,157,0,0.5)]">
          {song.badge}
        </span>
      )}
      <h3 className="font-dirt font-black text-3xl text-p-gold uppercase tracking-[0.1em]">{song.title}</h3>
      <p className="font-inter text-sm text-p-muted mt-2">{song.subtitle}</p>

      {/* Language Tabs */}
      <div className="flex gap-2 mt-4 flex-wrap">
        {song.languages.map(lang => (
          <button
            key={lang}
            onClick={() => setActiveLang(lang)}
            className={`font-inter font-black text-xs px-3 py-1 rounded-full transition-all uppercase tracking-widest ${
              activeLang === lang 
                ? 'bg-gradient-to-r from-p-golddk to-p-gold text-white shadow-[0_0_8px_rgba(255,157,0,0.4)]' 
                : 'border border-p-gold/30 text-p-muted bg-transparent hover:border-p-gold hover:text-p-gold'
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
        <button onClick={togglePlay} className="w-14 h-14 bg-gradient-to-br from-p-goldlt to-p-golddk rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200 shadow-[0_0_20px_rgba(255,157,0,0.5)]">
          {isPlaying ? <Pause size={24} className="text-white fill-current" /> : <Play size={24} className="text-white fill-current ml-1" />}
        </button>
        {/* Silent audio config */}
        <audio ref={audioRef} src={song.audio} onEnded={() => setIsPlaying(false)} onError={(e) => { /* mock */ }} />
        
        {song.record && (
          <p className="font-inter font-black text-sm text-p-gold mt-4 uppercase tracking-widest">🏆 {song.record}</p>
        )}
      </div>
    </div>
  );
};

export default function Music() {
  return (
    <div className="w-full hero-bg min-h-screen">
      {/* AR RAHMAN SPOTLIGHT */}
      <section className="min-h-[60vh] relative flex items-center px-6 py-20 overflow-hidden pt-32">
        <div className="hero-glow-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] max-w-[600px] max-h-[600px]"></div>
        <h1 
          className="text-outline-gold font-dirt font-black absolute left-0 text-[8rem] md:text-[14rem] leading-none opacity-10 top-1/2 -translate-y-1/2 select-none whitespace-nowrap pointer-events-none uppercase tracking-widest"
        >
          A.R.RAHMAN
        </h1>

        <div className="relative z-10 max-w-xl mx-auto md:ml-auto md:mr-12 lg:mr-32 hero-glass-card backdrop-blur-xl rounded-2xl p-10 shadow-2xl">
          <span className="font-inter font-black text-xs tracking-widest text-p-muted uppercase">MUSIC BY</span>
          <h2 className="font-dirt font-black text-5xl uppercase tracking-[0.1em] hero-text-gradient mt-2">A.R. Rahman</h2>
          <div className="gold-divider mx-0 w-20" />
          
          <p className="font-inter text-base italic text-p-cream/80 leading-relaxed mt-4">
            "We wanted to recreate a raw, unsung energy that hasn't been heard since Humma Humma. Vizianagaram inspired sounds I've never explored."
          </p>
          
          <div className="flex gap-3 mt-6 flex-wrap">
            {['Oscar Winner', 'Golden Globe', 'National Award'].map(b => (
              <span key={b} className="border border-p-gold/40 rounded-full px-3 py-1 text-xs font-inter font-bold text-p-gold uppercase tracking-widest hover:bg-p-gold/10 transition-colors">{b}</span>
            ))}
          </div>

          <p className="font-inter text-xs text-p-muted/50 mt-6 uppercase tracking-widest">
            T-Series · ₹35 Crore Music Rights
          </p>
        </div>
      </section>

      {/* SONGS SECTION */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-dirt font-black text-4xl uppercase tracking-[0.1em] hero-text-gradient">OFFICIAL SOUNDTRACK</h2>
          <div className="gold-divider" />
          
          <div className="mt-12 space-y-8">
            {songsData.map(song => <SongCard key={song.id} song={song} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
