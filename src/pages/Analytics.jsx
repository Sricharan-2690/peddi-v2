import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

const milestoneKeys = [
  { idx: 1, emoji: '🎬' },
  { idx: 2, emoji: '💪' },
  { idx: 3, emoji: '🔥' },
  { idx: 4, emoji: '🎵' },
  { idx: 5, emoji: '💰' },
  { idx: 6, emoji: '🤝' },
  { idx: 7, emoji: '🔊' },
  { idx: 8, emoji: '👑' },
];

const barKeys = [
  { langKey: 'lang.telugu',    views: 18 },
  { langKey: 'lang.tamil',     views: 12 },
  { langKey: 'lang.hindi',     views: 9  },
  { langKey: 'lang.malayalam', views: 7  },
];
const MAX_VIEWS = 18;

function AnimatedBar({ langLabel, views }) {
  const [inView, setInView] = useState(false);
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([ent]) => {
      if (ent.isIntersecting) {
        setTimeout(() => setInView(true), 100);
        let startTimer = null;
        const duration = 2000;
        const step = (timestamp) => {
          if (!startTimer) startTimer = timestamp;
          const progress = Math.min((timestamp - startTimer) / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(easeOut * views));
          if (progress < 1) window.requestAnimationFrame(step);
          else setCount(views);
        };
        window.requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [views]);

  return (
    <div ref={ref} className="flex items-center gap-4">
      <div className="w-28 text-right font-inter text-xs text-p-muted uppercase tracking-widest">
        {langLabel}
      </div>
      <div className="flex-1 h-9 bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
        <div
          className="h-full rounded-full transition-all duration-[2000ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] flex items-center justify-end px-3 relative"
          style={{
            width: inView ? `${(views / MAX_VIEWS) * 100}%` : '0%',
            background: 'linear-gradient(90deg, #CC7D00, #FFB733)',
            boxShadow: inView ? '0 0 20px rgba(255,183,51,0.4)' : 'none',
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
  const timelineRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight / 2;
      const progress = ((start - rect.top) / rect.height) * 100;
      setLineHeight(Math.max(0, Math.min(100, progress)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full hero-bg min-h-screen pt-20">

      {/* MILESTONES TIMELINE */}
      <section className="py-20 px-6 max-w-4xl mx-auto relative text-center md:text-left text-white">
        <h2 className="font-dirt font-black text-4xl hero-text-gradient text-center mb-16 uppercase tracking-[0.1em]">
          {t('analytics.recordsBroken')}
        </h2>

        <div className="relative" ref={timelineRef}>
          {/* Center line background */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2" />
          {/* Center line animated fill */}
          <div
            className="hidden md:block absolute left-1/2 top-0 w-0.5 bg-gradient-to-b from-[#FF9D00] via-[#FFB733] to-[#FF9D00] shadow-[0_0_15px_rgba(255,157,0,0.6)] -translate-x-1/2"
            style={{ height: `${lineHeight}%` }}
          />

          <div className="space-y-12">
            {milestoneKeys.map((m, i) => (
              <div
                key={m.idx}
                className={`md:flex items-center justify-between w-full ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="w-full md:w-5/12 hidden md:block" />
                <div className={`w-full md:w-5/12 flex justify-center ${i % 2 === 0 ? 'md:justify-start md:pl-8' : 'md:justify-end md:pr-8'}`}>
                  <div className={`hero-glass-card rounded-2xl p-6 w-full max-w-sm hover:bg-white/[0.05] transition-colors duration-300 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="text-3xl mb-2">{m.emoji}</div>
                    <h3 className="font-dirt font-black text-2xl text-p-gold uppercase leading-tight">
                      {t(`milestone.${m.idx}.value`)}
                    </h3>
                    <p className="font-inter text-xs text-p-goldlt mt-1 uppercase tracking-widest font-bold">
                      {t(`milestone.${m.idx}.label`)}
                    </p>
                    <p className="font-inter text-xs text-p-muted mt-2 leading-relaxed">
                      {t(`milestone.${m.idx}.desc`)}
                    </p>
                    <p className="font-inter text-xs text-p-muted/40 tracking-widest mt-3 uppercase">
                      {t(`milestone.${m.idx}.date`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BAR CHART SECTION */}
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <h2 className="font-dirt font-black text-3xl text-p-gold text-center mb-12 uppercase tracking-[0.1em]">
          {t('analytics.chikiriViews')}
        </h2>
        <div className="space-y-6">
          {barKeys.map((b) => (
            <AnimatedBar key={b.langKey} langLabel={t(b.langKey)} views={b.views} />
          ))}
        </div>
      </section>
    </div>
  );
}
