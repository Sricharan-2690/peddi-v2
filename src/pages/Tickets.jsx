import React, { useState, useEffect } from 'react';
import languages from '../data/languages';
import { Helmet } from 'react-helmet-async';
import { Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const platforms = [
  {name:'BookMyShow', url:'https://in.bookmyshow.com/movies/hyderabad/peddi/ET00439772'},
  {name:'District', url:'https://www.district.in/movies/peddi-movie-tickets-MV194276?utm_source=paytm_redirection'},
];

// Timer matching the Hero Section style
const CompactTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const { t } = useLanguage();

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

  const timeLabels = {
    days: t('time.days'),
    hours: t('time.hours'),
    mins: t('time.mins'),
    secs: t('time.secs')
  };

  return (
    <div className="flex justify-center items-center gap-1 sm:gap-3 mt-8">
      {Object.entries(timeLeft).map(([unit, value], i, arr) => (
        <React.Fragment key={unit}>
          <div className="flex flex-col items-center">
            <div className="rounded-lg hero-border-amber px-2.5 py-2 min-w-[44px] sm:min-w-[56px] flex items-center justify-center hero-glass-card">
              <span
                className="font-dirt font-black text-xl sm:text-2xl tabular-nums text-white leading-none"
                style={{ textShadow: '0 0 20px rgba(255,157,0,0.35)' }}
              >
                {value.toString().padStart(2, '0')}
              </span>
            </div>
            <span className="font-inter text-[8px] font-black tracking-[0.15em] uppercase mt-1.5 text-[#FF9D00] opacity-60">{timeLabels[unit]}</span>
          </div>
          {i < arr.length - 1 && (
            <div className="flex flex-col gap-1 mb-4">
              <div className="w-0.5 h-0.5 rounded-full bg-[#FF9D00] opacity-40" />
              <div className="w-0.5 h-0.5 rounded-full bg-[#FF9D00] opacity-40" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default function Tickets() {
  const { t } = useLanguage();

  return (
    <div className="w-full hero-bg min-h-screen">
      <Helmet>
        <title>Peddi Movie — Book Tickets | Releasing 30 April 2026</title>
        <meta name="description" content="Book tickets for Peddi Telugu movie releasing 30 April 2026. Official ticket booking page." />
        <meta property="og:title" content="Book Tickets — Peddi Movie 30 April 2026" />
        <meta property="og:description" content="Book your tickets now for Peddi Telugu movie releasing 30 April 2026." />
        <meta property="og:image" content="/og-poster.jpg" />
        <meta property="og:type" content="video.movie" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Book Tickets — Peddi Movie 30 April 2026" />
        <meta name="twitter:description" content="Book tickets for Peddi Telugu movie releasing 30 April 2026." />
      </Helmet>
      <h1 className="sr-only">Peddi Telugu Movie — Book Tickets</h1>

      {/* HERO */}
      <section className="relative min-h-[50vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 overflow-hidden">
        <div className="hero-glow-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] max-w-[600px] max-h-[600px]"></div>
        <div className="z-10 flex flex-col items-center justify-center">
          <span className="mb-4 bg-gradient-to-r from-[#FFB733] to-[#FF9D00] text-white font-inter font-black text-[9px] sm:text-[10px] tracking-widest px-5 py-2 rounded-full uppercase shadow-[0_0_15px_rgba(255,157,0,0.4)]">
            {t('home.worldwideRelease')}
          </span>
          <h1
            className="font-dirt font-black text-5xl md:text-7xl hero-text-gradient uppercase tracking-tight"
          >
            APRIL 30, 2026
          </h1>
          <CompactTimer />
        </div>
      </section>

      {/* BOOKING PLATFORMS */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <h2 className="font-dirt font-black text-2xl md:text-3xl uppercase tracking-[0.1em] hero-text-gradient text-center">
          {t('tickets.bookYourSeats')}
        </h2>
        <div className="gold-divider" />

        <div className="mt-10 space-y-4">
          {platforms.map(p => (
            <div
              key={p.name}
              onClick={() => window.open(p.url, '_blank')}
              className="hero-glass-card rounded-xl p-5 flex justify-between items-center hover:bg-white/[0.05] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shadow-xl group"
            >
              <h3 className="font-dirt font-bold uppercase tracking-wide text-base text-p-gold">{p.name}</h3>
              <span className="font-inter font-black text-xs text-[#FF9D00] tracking-[0.2em] group-hover:translate-x-1 transition-transform uppercase">
                {t('tickets.bookNow')}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* LANGUAGE SECTION */}
      <section className="py-16 px-6 text-center">
        <h2 className="font-dirt font-black text-xl md:text-2xl uppercase tracking-[0.1em] text-p-gold">{t('tickets.availableIn5Lang')}</h2>
        <div className="flex gap-2 sm:gap-4 justify-center flex-wrap mt-8">
          {languages.map(l => (
            <span key={l.lang} className="border border-[#FF9D00]/40 rounded-full px-5 py-2 text-xs text-p-gold font-inter font-black tracking-widest uppercase hover:bg-[#FF9D00]/5 cursor-default transition-colors">
              {l.lang}
            </span>
          ))}
        </div>
      </section>

      {/* DOLBY SECTION */}
      <section className="py-12 px-6 relative z-10">
        <div className="hero-glass-card rounded-2xl p-8 md:p-10 max-w-2xl mx-auto shadow-2xl relative z-10">
          <h2 className="font-dirt font-black text-2xl md:text-3xl uppercase tracking-[0.1em] text-p-gold">{t('tickets.dolbyCinema')}</h2>
          <div className="gold-divider mx-0 w-16" />
          <p className="font-inter text-sm text-p-cream/80 mt-4 leading-relaxed max-w-lg">
            {t('tickets.dolbyDesc')}
          </p>
          <ul className="mt-8 space-y-4">
            {[t('tickets.dolbyVision'), t('tickets.dolbyAtmos'), t('tickets.premiumExperience')].map((text, i) => (
              <li key={i} className="flex flex-start gap-4">
                <Check className="text-[#FF9D00] flex-shrink-0 mt-0.5" size={20} />
                <span className="font-inter text-sm text-p-muted">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
