import React, { useState } from 'react';
import newsData from '../data/newsData';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function Updates() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { t } = useLanguage();

  const filters = [
    { key: 'All', label: t('filter.all') },
    { key: 'Trailers', label: t('filter.trailers') },
    { key: 'Songs', label: t('filter.songs') },
    { key: 'Reels', label: t('filter.reels') },
  ];

  const filteredNews = activeFilter === 'All' ? newsData : newsData.filter(n => n.category === activeFilter);

  return (
    <div className="w-full hero-bg min-h-screen">
      {/* PAGE HERO */}
      <section className={`relative h-[30vh] md:h-[40vh] flex items-end justify-center pb-12 pt-28 text-center ${isLight ? 'text-[#2A1505]' : 'text-white'} overflow-hidden`}>
        <div className="hero-glow-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] max-w-[600px] max-h-[600px]"></div>
        <div className="z-10">
          <h1 className="font-dirt font-black text-4xl md:text-5xl uppercase tracking-[0.1em] hero-text-gradient">{t('updates.title')}</h1>
          <p className={`font-inter font-bold text-xs tracking-[0.4em] ${isLight ? 'text-[#8B6040]' : 'text-p-muted'} mt-3 uppercase`}>{t('updates.subtitle')}</p>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-[64px] md:top-[80px] z-30 bg-black/80 backdrop-blur-md border-b border-[#FF9D00]/20 overflow-x-auto w-full">
        <div className="flex gap-0 min-w-max md:justify-center border-b border-transparent">
          {filters.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`font-inter font-black text-[10px] sm:text-xs tracking-widest px-5 py-4 cursor-pointer focus:outline-none transition-colors duration-200 uppercase whitespace-nowrap border-b-2
                ${activeFilter === tab.key 
                  ? (isLight ? 'text-[#7A4A10] border-[#7A4A10]' : 'text-p-gold border-p-gold')
                  : (isLight ? 'text-[#8B6040] hover:text-[#7A4A10] border-transparent' : 'text-p-muted hover:text-p-gold border-transparent')
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map(n => (
            <div key={n.id} className="hero-glass-card rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FF9D00]/10 hover:border-[#FF9D00]/50 transition-all duration-200 cursor-pointer group flex flex-col">
              <div className="h-48 w-full relative overflow-hidden flex-shrink-0">
                <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" style={{ objectPosition: n.objectPosition || 'center center' }} />
                <div className="absolute top-3 left-3">
                  <span className={`font-inter font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-widest ${n.category === 'Announcement' ? 'bg-gradient-to-r from-p-golddk to-p-goldlt text-white shadow-[0_0_10px_rgba(255,157,0,0.4)]' : n.category === 'BTS' ? 'bg-p-golddk/80 text-white' : 'bg-p-gold/20 text-p-gold border border-p-gold/40'}`}>
                    {n.category}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <span className={`font-inter font-black text-[10px] md:text-xs ${isLight ? 'text-[#8B6040]/70' : 'text-p-muted/60'} tracking-wider uppercase`}>{n.date}</span>
                <h3 className={`font-dirt font-bold uppercase tracking-wide text-lg ${isLight ? 'text-[#7A4A10]' : 'text-p-gold'} mt-2 leading-snug`}>{n.title}</h3>
                <p className={`font-inter text-xs ${isLight ? 'text-[#5A3010]' : 'text-p-muted'} leading-relaxed mt-2`} style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {n.excerpt}
                </p>
                <div className="mt-auto pt-4">
                  <span className={`font-inter font-bold text-xs ${isLight ? 'text-[#7A4A10]' : 'text-p-gold'} tracking-[0.2em] group-hover:translate-x-1 transition-transform uppercase inline-block mt-2`}>{t('updates.readMore')}</span>
                </div>
              </div>
            </div>
          ))}
          {filteredNews.length === 0 && (
            <div className={`col-span-full py-20 text-center font-inter ${isLight ? 'text-[#8B6040]' : 'text-p-muted'}`}>
              {t('updates.noUpdates')}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
