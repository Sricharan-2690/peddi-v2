import React, { useState, useEffect } from 'react';

const milestones = [
  { emoji: '🎬', value: 'PROJECT ANNOUNCED', label: 'RC16 Official', desc: 'Buchi Babu Sana and Ram Charan confirm collaboration.', date: 'MAR 2024' },
  { emoji: '💪', value: '8 MONTHS', label: 'Transformation', desc: 'Ram Charan begins extensive physical training.', date: 'AUG 2024' },
  { emoji: '🔥', value: 'TITLE REVEAL', label: 'PEDDI', desc: 'First look poster shakes the internet.', date: 'JAN 2025' },
  { emoji: '🎵', value: '46M VIEWS', label: 'Chikiri Chikiri', desc: 'First single sets all-time 24h record.', date: 'NOV 2025' },
  { emoji: '💰', value: '₹130 CR', label: 'OTT Rights', desc: 'Netflix acquires digital streaming rights.', date: 'DEC 2025' },
  { emoji: '🤝', value: 'PAN-INDIA', label: '5 Languages', desc: 'Theatrical distribution locked globally.', date: 'FEB 2026' },
  { emoji: '🔊', value: 'DOLBY CINEMA', label: 'Premium Format', desc: 'Confirmed for Vision and Atmos screens.', date: 'MAR 2026' },
  { emoji: '👑', value: 'APRIL 30', label: 'Grand Release', desc: 'The world of Vizianagaram opens to audiences.', date: 'APR 2026' },
];

const bars = [
  { lang: 'Telugu', emoji: '🇮🇳', views: 18 },
  { lang: 'Tamil', emoji: '🇮🇳', views: 12 },
  { lang: 'Hindi', emoji: '🇮🇳', views: 9 },
  { lang: 'Malayalam', emoji: '🇮🇳', views: 7 },
];
const maxViews = 18;

export default function Analytics() {
  const [liveCount, setLiveCount] = useState(847234);

  useEffect(() => {
    const int = setInterval(() => {
      setLiveCount(prev => prev + Math.floor(Math.random() * 7) + 1);
    }, Math.random() * 4000 + 2000);
    return () => clearInterval(int);
  }, []);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full bg-p-black min-h-screen pt-20">
      {/* LIVE COUNTER */}
      <section className="bg-p-dark py-20 px-6 text-center">
        <h1 className="font-cinzel text-3xl text-p-gold uppercase mb-6">LIVE FAN REACH</h1>
        <div className="font-oswald font-bold text-7xl md:text-9xl text-p-gold leading-none" style={{ textShadow: '0 0 40px rgba(212,175,55,0.3)' }}>
          {liveCount.toLocaleString()}
        </div>
        <p className="font-oswald text-xs tracking-[0.4em] text-p-muted mt-4 uppercase">FANS WORLDWIDE</p>
        
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse2"></div>
          <span className="font-oswald text-xs text-green-400 tracking-widest uppercase font-bold">LIVE</span>
        </div>
      </section>

      {/* MILESTONES TIMELINE */}
      <section className="py-20 px-6 max-w-4xl mx-auto relative text-center md:text-left text-white">
        <h2 className="font-cinzel text-4xl text-p-gold text-center mb-16">RECORDS BROKEN</h2>
        
        <div className="relative">
          {/* Center Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-p-gold/15 -translate-x-1/2"></div>
          
          <div className="space-y-12">
            {milestones.map((m, i) => (
              <div key={m.label} className={`md:flex items-center justify-between w-full ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-5/12 hidden md:block" />
                
                <div className={`w-full md:w-5/12 flex justify-center ${i % 2 === 0 ? 'md:justify-start md:pl-8' : 'md:justify-end md:pr-8'}`}>
                  <div className={`bg-p-dark border border-p-gold/15 rounded-xl p-6 w-full max-w-sm ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="text-3xl mb-2">{m.emoji}</div>
                    <h3 className="font-oswald text-3xl font-bold text-p-gold uppercase leading-tight">{m.value}</h3>
                    <p className="font-cinzel text-sm text-p-gold/80 mt-1 uppercase">{m.label}</p>
                    <p className="font-noto text-xs text-p-muted mt-2 leading-relaxed">{m.desc}</p>
                    <p className="font-oswald text-xs text-p-muted/40 tracking-widest mt-3 uppercase">{m.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BAR CHART SECTION */}
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <h2 className="font-cinzel text-3xl text-p-gold text-center mb-12">CHIKIRI VIEWS BY LANGUAGE</h2>
        <div className="space-y-6">
          {bars.map(b => (
            <div key={b.lang} className="flex items-center gap-4">
              <div className="w-28 text-right font-oswald text-xs text-p-muted uppercase">
                {b.lang}
              </div>
              <div className="flex-1 h-9 bg-p-gold/10 rounded overflow-hidden">
                <div 
                  className="h-full rounded transition-all duration-1000 ease-out flex items-center justify-end px-3"
                  style={{ 
                    width: mounted ? `${(b.views / maxViews) * 100}%` : '0%',
                    background: 'linear-gradient(90deg, #8B0000, #D4AF37)'
                  }}
                >
                  <span className="font-oswald text-sm md:text-lg text-white font-bold tracking-widest leading-none drop-shadow-md">{b.views}M</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
