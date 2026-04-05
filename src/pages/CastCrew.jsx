import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import castData from '../data/castData';
import crewData from '../data/crewData';
import { useLanguage } from '../context/LanguageContext';

export default function CastCrew() {
  const { t } = useLanguage();

  return (
    <div className="w-full hero-bg min-h-screen">
      <Helmet>
        <title>Peddi Movie — Cast & Crew | Official Website</title>
        <meta name="description" content="Meet the cast and crew of Peddi Telugu movie. Releasing 30 April 2026." />
        <meta property="og:title" content="Peddi Movie — Cast & Crew" />
        <meta property="og:description" content="Full cast and crew of Peddi Telugu movie releasing 30 April 2026." />
        <meta property="og:image" content="/og-poster.jpg" />
        <meta property="og:type" content="video.movie" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Peddi Movie — Cast & Crew" />
        <meta name="twitter:description" content="Meet the cast and crew of Peddi Telugu movie. Releasing 30 April 2026." />
      </Helmet>
      <h1 className="sr-only">Peddi Telugu Movie — Cast and Crew</h1>

      {/* PAGE HERO */}
      <section className="relative flex items-end justify-center pb-8 md:pb-16 text-center pt-24 md:pt-32 overflow-hidden">
        <div className="hero-glow-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] max-w-[600px] max-h-[600px]"></div>
        <div className="z-10">
          <h1 className="font-dirt font-black text-4xl md:text-5xl uppercase tracking-[0.1em] hero-text-gradient">{t('cast.title')}</h1>
          <p className="font-inter font-bold text-xs tracking-[0.4em] text-p-muted mt-3 uppercase">{t('cast.subtitle')}</p>
        </div>
      </section>

      {/* RC SPOTLIGHT SECTION */}
      <section className="py-10 md:py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img 
              src="/images/cast/ram charan.jpg" 
              onError={e => e.target.src = 'https://picsum.photos/seed/rc1/400/500'} 
              alt="Ram Charan in Peddi Telugu movie" 
              className="aspect-[4/5] object-cover rounded-lg w-full max-w-sm mx-auto border border-p-gold/20 hover:scale-[1.02] transition-transform duration-500"
              style={{ filter: 'sepia(20%) saturate(140%) contrast(110%)' }}
            />
          </div>
          
          <div>
            <h2 className="font-dirt font-black uppercase text-4xl md:text-6xl text-p-gold leading-none">RAM CHARAN</h2>
            <p className="font-inter font-bold tracking-[0.2em] text-sm text-p-gold mt-4 uppercase">{t('cast.asPeddi')}</p>
            <div className="gold-divider mx-0 w-20 mt-4" />
            
            <p className="font-inter text-sm md:text-base text-p-cream/80 leading-relaxed md:leading-loose mt-6">
              {t('cast.rcDesc')}
            </p>
            
            <div className="hero-glass-card rounded-xl p-6 mt-8">
              <h3 className="font-dirt font-bold text-xs tracking-[0.2em] text-p-gold mb-4 uppercase">{t('cast.theTransformation')}</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <span className="font-dirt font-black text-xl md:text-2xl text-p-gold block">8 MONTHS</span>
                  <span className="font-inter font-bold text-[10px] text-p-muted mt-2 tracking-widest uppercase block">{t('cast.training')}</span>
                </div>
                <div>
                  <span className="font-dirt font-black text-xl md:text-2xl text-p-gold block">5:30 AM</span>
                  <span className="font-inter font-bold text-[10px] text-p-muted mt-2 tracking-widest uppercase block">{t('cast.dailyAkharas')}</span>
                </div>
                <div>
                  <span className="font-dirt font-black text-xl md:text-2xl text-p-gold block">Ayyappa</span>
                  <span className="font-inter font-bold text-[10px] text-p-muted mt-2 tracking-widest uppercase block">{t('cast.deeksha')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CAST LIST */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-dirt font-black text-3xl uppercase tracking-widest text-p-gold inline-block">{t('cast.mainCast')}</h2>
          <div className="gold-divider w-24" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 text-left">
            {castData.map(member => (
              <div key={member.id} className="hero-glass-card rounded-xl p-5 flex gap-5 items-center hover:bg-white/[0.05] hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FF9D00]/10 hover:border-[#FF9D00]/50 transition-all duration-200 cursor-pointer group">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-p-gold/10 border border-p-gold/20 flex flex-shrink-0 items-center justify-center group-hover:bg-p-gold/20 transition-all shadow-[0_0_15px_rgba(255,157,0,0.1)] group-hover:shadow-[0_0_20px_rgba(255,157,0,0.3)]">
                  <img 
                    src={member.image} 
                    onError={e => e.target.src = member.fallback} 
                    alt={`${member.actor} in Peddi Telugu movie`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{ objectPosition: member.objectPosition || 'center center' }}
                  />
                </div>
                <div className="flex-grow">
                  <p className="font-inter font-black text-[10px] tracking-widest text-p-gold/70 uppercase">as {member.character}</p>
                  <h3 className="font-dirt font-bold uppercase tracking-wide text-lg text-p-gold mt-1">{member.actor}</h3>
                  <p className="font-inter text-xs text-p-cream/60 mt-1 opacity-80 line-clamp-2">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CREW SECTION */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-dirt font-black text-3xl uppercase tracking-widest text-p-gold inline-block">{t('cast.keyCrew')}</h2>
          <div className="gold-divider w-24" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 text-left">
            {crewData.map((member, i) => {
              const initials = member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
              return (
                <div key={i} className="hero-glass-card rounded-xl p-5 flex gap-5 items-center hover:bg-white/[0.05] hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FF9D00]/10 hover:border-[#FF9D00]/50 transition-all duration-200 cursor-pointer group">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-p-gold/10 border border-p-gold/20 flex flex-shrink-0 items-center justify-center group-hover:bg-p-gold/20 transition-all shadow-[0_0_15px_rgba(255,157,0,0.1)] group-hover:shadow-[0_0_20px_rgba(255,157,0,0.3)]">
                    {member.image ? (
                      <img 
                        src={member.image} 
                        alt={`${member.name} in Peddi Telugu movie`} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        style={{ objectPosition: member.objectPosition || 'center top' }}
                      />
                    ) : (
                      <span className="font-dirt font-black text-sm text-p-gold">{initials}</span>
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className="font-inter font-black text-[10px] tracking-widest text-p-gold/70 uppercase">{member.role}</p>
                    <h3 className="font-dirt font-bold uppercase tracking-wide text-lg text-p-gold mt-1">{member.name}</h3>
                    <p className="font-inter text-xs text-p-cream/60 mt-1 opacity-80">{member.note}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
