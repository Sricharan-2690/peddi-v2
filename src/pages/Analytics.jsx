import React, { useState, useEffect, useRef } from 'react';

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

function AnimatedBar({ item, maxViews }) {
  const [inView, setInView] = useState(false);
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([ent]) => {
      if (ent.isIntersecting) {
        // Trigger bar slide
        setTimeout(() => setInView(true), 100);
        
        // Trigger number count
        let startTimer = null;
        const duration = 2000;
        const step = (timestamp) => {
          if (!startTimer) startTimer = timestamp;
          const progress = Math.min((timestamp - startTimer) / duration, 1);
          const easeOutProgress = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(easeOutProgress * item.views));
          if (progress < 1) window.requestAnimationFrame(step);
          else setCount(item.views);
        };
        window.requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [item.views]);

  return (
    <div ref={ref} className="flex items-center gap-4">
      <div className="w-28 text-right font-inter text-xs text-p-muted uppercase tracking-widest">
        {item.lang}
      </div>
      <div className="flex-1 h-9 bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
        <div 
          className="h-full rounded-full transition-all duration-[2000ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] flex items-center justify-end px-3 relative"
          style={{ 
            width: inView ? `${(item.views / maxViews) * 100}%` : '0%',
            background: 'linear-gradient(90deg, #CC7D00, #FFB733)',
            boxShadow: inView ? '0 0 20px rgba(255,183,51,0.4)' : 'none'
          }}
        >
          <span className="font-dirt text-sm md:text-base text-white font-black tracking-widest leading-none drop-shadow-md">
            {count}M
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Analytics() {
  const [liveCount, setLiveCount] = useState(847234);
  const timelineRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Start filling when the top of the timeline is halfway up the screen
      const start = windowHeight / 2;
      const progress = ((start - rect.top) / rect.height) * 100;
      setLineHeight(Math.max(0, Math.min(100, progress)));
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const int = setInterval(() => {
      setLiveCount(prev => prev + Math.floor(Math.random() * 7) + 1);
    }, Math.random() * 4000 + 2000);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="w-full hero-bg min-h-screen pt-20">
      {/* LIVE COUNTER */}
      <section className="relative py-20 px-6 text-center border-b border-[#FF9D00]/10 overflow-hidden z-10">
        <div className="hero-glow-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] max-w-[600px] max-h-[600px]"></div>
        <h1 className="font-dirt font-black text-3xl uppercase tracking-[0.15em] mb-6 hero-text-gradient">LIVE FAN REACH</h1>
        <div className="font-dirt font-black text-7xl md:text-9xl text-p-gold leading-none" style={{ textShadow: '0 0 60px rgba(255,157,0,0.5)' }}>
          {liveCount.toLocaleString()}
        </div>
        <p className="font-inter text-xs tracking-[0.4em] text-p-muted mt-4 uppercase">FANS WORLDWIDE</p>
        
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse2"></div>
          <span className="font-inter font-black text-xs text-emerald-400 tracking-widest uppercase">LIVE</span>
        </div>
      </section>

      {/* MILESTONES TIMELINE */}
      <section className="py-20 px-6 max-w-4xl mx-auto relative text-center md:text-left text-white">
        <h2 className="font-dirt font-black text-4xl hero-text-gradient text-center mb-16 uppercase tracking-[0.1em]">RECORDS BROKEN</h2>
        
        <div className="relative" ref={timelineRef}>
          {/* Center Line Background */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2"></div>
          {/* Center Line Animated Fill */}
          <div 
            className="hidden md:block absolute left-1/2 top-0 w-0.5 bg-gradient-to-b from-[#FF9D00] via-[#FFB733] to-[#FF9D00] shadow-[0_0_15px_rgba(255,157,0,0.6)] -translate-x-1/2"
            style={{ height: `${lineHeight}%` }}
          ></div>
          
          <div className="space-y-12">
            {milestones.map((m, i) => (
              <div key={m.label} className={`md:flex items-center justify-between w-full ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-5/12 hidden md:block" />
                
                <div className={`w-full md:w-5/12 flex justify-center ${i % 2 === 0 ? 'md:justify-start md:pl-8' : 'md:justify-end md:pr-8'}`}>
                  <div className={`hero-glass-card rounded-2xl p-6 w-full max-w-sm hover:bg-white/[0.05] transition-colors duration-300 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="text-3xl mb-2">{m.emoji}</div>
                    <h3 className="font-dirt font-black text-2xl text-p-gold uppercase leading-tight">{m.value}</h3>
                    <p className="font-inter text-xs text-p-goldlt mt-1 uppercase tracking-widest font-bold">{m.label}</p>
                    <p className="font-inter text-xs text-p-muted mt-2 leading-relaxed">{m.desc}</p>
                    <p className="font-inter text-xs text-p-muted/40 tracking-widest mt-3 uppercase">{m.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BAR CHART SECTION */}
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <h2 className="font-dirt font-black text-3xl text-p-gold text-center mb-12 uppercase tracking-[0.1em]">CHIKIRI VIEWS BY LANGUAGE</h2>
        <div className="space-y-6">
          {bars.map(b => (
            <AnimatedBar key={b.lang} item={b} maxViews={maxViews} />
          ))}
        </div>
      </section>
    </div>
  );
}
