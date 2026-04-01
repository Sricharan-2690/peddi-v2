import React, { useState, useEffect } from 'react';
import languages from '../data/languages';
import { Check } from 'lucide-react';

const platforms = [
  {name:'BookMyShow', url:'https://in.bookmyshow.com'},
  {name:'Paytm Movies', url:'https://paytm.com/movies'},
  {name:'Amazon Pay Movies', url:'https://amazon.in/movies'},
  {name:'INOX', url:'https://inoxmovies.com'},
  {name:'Cinépolis India', url:'https://cinepolisindia.com'},
  {name:'Fandango (USA)', url:'https://fandango.com'},
];

// Reusable timer for TICKETS hero
const CompactTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  useEffect(() => {
    const target = new Date('2026-04-30T00:30:00+05:30').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff % 86400000) / 3600000),
          mins: Math.floor((diff % 3600000) / 60000),
          secs: Math.floor((diff % 60000) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-2 justify-center mt-10">
      {Object.entries(timeLeft).map(([unit, value], i, arr) => (
        <React.Fragment key={unit}>
          <div className="w-16 h-20 bg-p-black border border-p-gold/20 rounded flex flex-col items-center justify-center">
            <span className="font-oswald font-bold text-3xl text-p-gold leading-none">{value.toString().padStart(2, '0')}</span>
            <span className="font-oswald text-[10px] tracking-widest text-p-muted mt-1 uppercase">{unit}</span>
          </div>
          {i < arr.length - 1 && <span className="font-oswald text-2xl text-p-gold/40 mt-3 mx-1">:</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default function Tickets() {
  return (
    <div className="w-full bg-p-black min-h-screen">
      {/* HERO */}
      <section className="min-h-[45vh] flex flex-col items-center justify-center bg-gradient-to-b from-p-dark to-p-black text-center px-6 pt-32 pb-16">
        <h1 className="font-oswald font-bold text-6xl md:text-8xl text-p-gold uppercase tracking-tight" style={{ textShadow: '0 0 40px rgba(212,175,55,0.2)' }}>
          APRIL 30, 2026
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <span className="font-oswald text-xs tracking-widest text-p-muted uppercase border border-p-gold/30 px-4 py-1.5 rounded-full">
            WORLDWIDE THEATRICAL RELEASE
          </span>
          <span className="bg-p-gold text-p-black font-oswald font-bold text-xs tracking-widest px-4 py-1.5 rounded-full uppercase">
            DOLBY CINEMA
          </span>
        </div>
        <CompactTimer />
      </section>

      {/* BOOKING PLATFORMS */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <h2 className="font-cinzel text-3xl text-p-gold text-center">BOOK YOUR SEATS</h2>
        <div className="gold-divider" />
        
        <div className="mt-10 space-y-4">
          {platforms.map(p => (
            <div 
              key={p.name}
              onClick={() => window.open(p.url, '_blank')}
              className="bg-p-dark border border-p-gold/20 rounded-xl p-5 flex justify-between items-center hover:bg-p-gold/5 hover:border-p-gold/50 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shadow-lg group"
            >
              <h3 className="font-cinzel text-lg text-p-gold">{p.name}</h3>
              <span className="font-oswald text-xs text-p-gold tracking-widest group-hover:translate-x-1 transition-transform uppercase font-bold">
                BOOK NOW →
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* LANGUAGE SECTION */}
      <section className="py-16 px-6 text-center">
        <h2 className="font-cinzel text-2xl text-p-gold">AVAILABLE IN 5 LANGUAGES</h2>
        <div className="flex gap-2 sm:gap-4 justify-center flex-wrap mt-8">
          {languages.map(l => (
            <span key={l.lang} className="border border-p-gold/40 rounded-full px-5 py-2 text-sm text-p-gold font-oswald tracking-widest uppercase hover:bg-p-gold/5 cursor-default transition-colors">
              {l.lang}
            </span>
          ))}
        </div>
      </section>

      {/* DOLBY SECTION */}
      <section className="py-12 px-6">
        <div className="bg-p-dark border border-p-gold/20 rounded-2xl p-8 md:p-10 max-w-2xl mx-auto shadow-2xl">
          <h2 className="font-cinzel text-3xl text-p-gold">DOLBY CINEMA</h2>
          <div className="gold-divider mx-0 w-16" />
          <p className="font-noto text-sm text-p-cream/80 mt-4 leading-relaxed max-w-lg">
            Experience PEDDI in the most immersive theatrical format ever created.
          </p>
          <ul className="mt-8 space-y-4">
            {["Dolby Vision — Crystal clear, lifelike images", "Dolby Atmos — Hear every blade of grass in Vizianagaram", "Premium theatrical experience worldwide"].map((text, i) => (
              <li key={i} className="flex flex-start gap-4">
                <Check className="text-p-gold flex-shrink-0 mt-0.5" size={20} />
                <span className="font-noto text-sm text-p-muted">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
