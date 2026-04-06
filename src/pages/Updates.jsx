import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Play, ExternalLink, X } from 'lucide-react';
import newsData from '../data/newsData';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function Updates() {
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState(location.state?.filter || 'All');

  useEffect(() => {
    if (location.state?.filter) {
      setActiveFilter(location.state.filter);
    }
  }, [location.state]);
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

  const songsList = [
    {
      id: 1,
      title: 'Chikiri Song',
      subtitle: 'First Single',
      links: [
        { lang: 'Telugu', url: 'https://youtu.be/vVDp1ulBKIk?si=KM-H90N8lY5GygjN' },
        { lang: 'Hindi', url: 'https://youtu.be/l2vB4qovRoE?si=iDjxEGHrZN7AQmG9' },
        { lang: 'Tamil', url: 'https://youtu.be/Zb6yhc2SgEo?si=IQfzUQOxEIHf1Fxl' },
        { lang: 'Kannada', url: 'https://youtu.be/p4uqRbeujCw?si=KfNRmn2Ro35eQZPi' },
        { lang: 'Malayalam', url: 'https://youtu.be/Cp2Gm_BNQSU?si=VuH9bW8M9s_Y-J3u' }
      ]
    },
    {
      id: 2,
      title: 'Rai Rai Ra Ra',
      subtitle: 'Second Single',
      links: [
        { lang: 'Telugu', url: 'https://youtu.be/g5oUluD9ScA?si=mX54r8qdP-sQU-J-' },
        { lang: 'Hindi', url: 'https://youtu.be/3IDAr45xjUQ?si=DJPNtiKe3mqid83z' },
        { lang: 'Tamil', url: 'https://youtu.be/J70g85LILlM?si=pceK85ERwFCT3dAo' },
        { lang: 'Kannada', url: 'https://youtu.be/-Pu7QM3x6BM?si=hBV3hygLlDF8Fk32' },
        { lang: 'Malayalam', url: 'https://youtu.be/3bUFagXfbYQ?si=mWOWuV5377MRsClL' }
      ]
    }
  ];

  const trailersList = [
    {
      id: 'first-shot',
      title: 'First Shot',
      links: [
        { lang: 'Telugu', url: 'https://www.youtube.com/watch?si=B6-5tKGGOe7C79_i&v=2y_DH5gIrCU&feature=youtu.be' },
        { lang: 'Hindi', url: 'https://www.youtube.com/watch?si=vrOkF_dRuaH6jXez&v=77KAnoqpoFw&feature=youtu.be' },
        { lang: 'Tamil', url: 'https://www.youtube.com/watch?si=VG7tc6-FQ0bd1ZK4&v=mGrFXawfrd4&feature=youtu.be' },
        { lang: 'Kannada', url: 'https://www.youtube.com/watch?si=D7iHQJegez5Xogtr&v=lvodg_AjQpY&feature=youtu.be' },
        { lang: 'Malayalam', url: 'https://www.youtube.com/watch?si=RQuhnUGgiKJ2jqXe&v=_DnvGloHnFs&feature=youtu.be' }
      ]
    },
    {
      id: 'glimpse',
      title: 'Glimpse',
      links: [
        { lang: 'Telugu', url: 'https://www.youtube.com/watch?si=XQ_zuBdJ0x4aUtbH&v=f4poVE-r8Ho&feature=youtu.be' },
        { lang: 'Hindi', url: 'https://www.youtube.com/watch?si=IWiX6p1ke1soO-0q&v=ctbsR2557AA&feature=youtu.be' },
        { lang: 'Tamil', url: 'https://www.youtube.com/watch?si=5RiUiIWZB7niYabM&v=-HjPL9Nmf5M&feature=youtu.be' },
        { lang: 'Kannada', url: 'https://www.youtube.com/watch?si=fhKagvp0cMBNLOOk&v=n4RYUGfYGU0&feature=youtu.be' },
        { lang: 'Malayalam', url: 'https://www.youtube.com/watch?si=bs1oATz16hEf9QJ6&v=vfHKPy7MuFM&feature=youtu.be' }
      ]
    },
    {
      id: 'trailer',
      title: 'Trailer',
      links: [],
      comingSoon: true
    }
  ];

  const [activeTrailerAccordion, setActiveTrailerAccordion] = useState(null);

  const reelsList = [
    {
      id: 1,
      url: 'https://www.instagram.com/reel/DWZNBE0k251/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
      shortcode: 'DWZNBE0k251',
      label: 'Reel 1'
    },
    {
      id: 2,
      url: 'https://www.instagram.com/reel/DWYa5rik6fn/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
      shortcode: 'DWYa5rik6fn',
      label: 'Reel 2'
    },
    {
      id: 3,
      url: 'https://www.instagram.com/reel/DWHJgkZAO6K/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
      shortcode: 'DWHJgkZAO6K',
      label: 'Reel 3'
    },
    {
      id: 4,
      url: 'https://www.instagram.com/reel/DWBhcvrE5RQ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
      shortcode: 'DWBhcvrE5RQ',
      label: 'Reel 4'
    },
    {
      id: 5,
      url: 'https://www.instagram.com/reel/DViBQUek_E6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
      shortcode: 'DViBQUek_E6',
      label: 'Reel 5'
    }
  ];

  return (
    <div className="w-full hero-bg min-h-screen">
      <Helmet>
        <title>Peddi Movie — Latest Updates & News | Official Website</title>
        <meta name="description" content="Stay updated with the latest news, announcements and updates from Peddi Telugu movie. Releasing 30 April 2026." />
        <meta property="og:title" content="Peddi Movie — Latest Updates & News" />
        <meta property="og:description" content="Latest news and announcements from Peddi Telugu movie releasing 30 April 2026." />
        <meta property="og:image" content="/og-poster.jpg" />
        <meta property="og:type" content="video.movie" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Peddi Movie — Latest Updates & News" />
        <meta name="twitter:description" content="Latest news and updates from Peddi Telugu movie. Releasing 30 April 2026." />
      </Helmet>
      <h1 className="sr-only">Peddi Telugu Movie — Latest News and Updates</h1>

      {/* PAGE HERO */}
      <section className={`relative h-[30vh] md:h-[40vh] flex items-end justify-center pb-12 pt-28 text-center ${isLight ? 'text-[#2A1505]' : 'text-white'} overflow-hidden`}>
        <div className="hero-glow-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] max-w-[600px] max-h-[600px]"></div>
        <div className="z-10">
          <h1 className="font-dirt font-black text-4xl md:text-5xl uppercase tracking-[0.1em] hero-text-gradient">{t('updates.title')}</h1>
          <p className={`font-inter font-bold text-xs tracking-[0.4em] ${isLight ? 'text-[#8B6040]' : 'text-p-muted'} mt-3 uppercase`}>{t('updates.subtitle')}</p>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-[64px] md:top-[80px] z-30 bg-black/80 backdrop-blur-md border-b border-[#FF9D00]/40 overflow-x-auto w-full">
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
        {activeFilter === 'Songs' ? (
          <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            {songsList.map(song => (
              <div key={song.id} className={`hero-glass-card rounded-2xl p-6 md:p-10 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FF9D00]/10 hover:border-[#FF9D00]/50 transition-all duration-300 text-center border flex flex-col items-center justify-center ${isLight ? 'border-[#7A4A10]/40 bg-white/50' : 'border-[#FF9D00]/40 bg-black/40'}`}>
                <h3 className={`font-dirt font-black text-3xl sm:text-5xl uppercase tracking-[0.1em] ${isLight ? 'text-[#7A4A10]' : 'text-p-gold'}`}>{song.id === 1 ? t('updates.songs.chikiri') : t('updates.songs.rairai')}</h3>
                <p className={`font-inter text-[10px] md:text-xs mt-2 font-black tracking-widest uppercase ${isLight ? 'text-[#8B6040]' : 'text-p-muted'}`}>{song.id === 1 ? t('updates.songs.firstSingle') : t('updates.songs.secondSingle')}</p>
                
                <p className={`font-inter text-xs font-semibold tracking-widest uppercase mt-8 mb-5 ${isLight ? 'text-[#5A3010]/60' : 'text-white/40'}`}>{t('updates.songs.listenYoutube')}</p>
                
                <div className="flex gap-3 justify-center flex-wrap">
                  {song.links.map(link => (
                    <a 
                      key={link.lang}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-inter font-black text-[10px] sm:text-xs px-5 py-2.5 rounded-full transition-all uppercase tracking-widest border 
                        ${isLight ? 'border-[#7A4A10]/30 text-[#5A3010] hover:bg-[#7A4A10] hover:text-white' : 'border-[#FF9D00]/40 text-[#FF9D00] hover:bg-[#FF9D00] hover:text-black hover:shadow-[0_0_15px_rgba(255,157,0,0.5)] bg-black/40 hover:bg-[#FF9D00]'}
                      `}
                    >
                      {link.lang}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : activeFilter === 'Trailers' ? (
          <div className="flex flex-col gap-4 max-w-3xl mx-auto w-full">
            {trailersList.map(item => (
              <div key={item.id} className="flex flex-col w-full">
                {activeTrailerAccordion === item.id ? (
                   // Expanded View
                   <div className={`py-12 md:py-16 text-center animate-fade-in flex flex-col items-center border ${isLight ? 'border-[#7A4A10]/20 bg-white/40' : 'border-[#FF9D00]/40 bg-black/60'} rounded-2xl w-full hero-glass-card shadow-lg relative`}>
                      <button 
                        onClick={() => setActiveTrailerAccordion(null)}
                        className={`absolute top-3 right-3 sm:top-5 sm:right-5 p-2 rounded-full z-10 transition-colors ${isLight ? 'text-[#7A4A10] hover:bg-[#7A4A10]/10' : 'text-[#FF9D00] hover:bg-[#FF9D00]/10'}`}
                      >
                        <X size={24} />
                      </button>
                      
                      <h2 className={`font-dirt font-black text-4xl sm:text-5xl uppercase tracking-widest ${isLight ? 'text-[#2A1505]' : 'text-white'} mb-3 mt-2 sm:mt-0 px-12 md:px-16`}>{item.id === 'first-shot' ? t('updates.trailers.firstShot') : item.id === 'glimpse' ? t('updates.trailers.glimpse') : t('updates.trailers.trailer')}</h2>
                      <p className={`font-inter text-[10px] md:text-xs font-semibold tracking-widest uppercase ${isLight ? 'text-[#8B6040]' : 'text-zinc-500'} mb-10`}>{t('updates.trailers.selectLanguage')}</p>
                      
                      {item.comingSoon ? (
                         <div className="py-6">
                            <p className={`font-inter text-sm md:text-base font-semibold ${isLight ? 'text-[#7A4A10]/70' : 'text-zinc-400'} animate-pulse`}><span className={isLight ? 'text-[#7A4A10]' : 'text-[#FF9D00]'}>•</span> {t('updates.trailers.comingSoon')}</p>
                         </div>
                      ) : (
                         <div className="flex flex-col gap-3 w-full max-w-xl px-4 md:px-0 mx-auto">
                           {item.links.map(link => (
                              <a key={link.lang} href={link.url} target="_blank" rel="noopener noreferrer" 
                                 className={`group flex items-center justify-between rounded-xl px-6 py-5 transition-all duration-300 border ${isLight ? 'border-[#7A4A10]/20 hover:border-[#7A4A10]/60 bg-white/60' : 'border-[#FF9D00]/20 hover:border-[#FF9D00]/60 bg-black/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[#FF9D00]/20'}`}>
                                 <span className={`font-inter font-bold tracking-[0.1em] text-sm md:text-base uppercase ${isLight ? 'text-[#2A1505]' : 'text-white/90 group-hover:text-white'}`}>{link.lang}</span>
                                 <ExternalLink size={18} className={`${isLight ? 'text-[#7A4A10]' : 'text-[#FF9D00]'} opacity-70 group-hover:opacity-100 transition-opacity`} />
                              </a>
                           ))}
                         </div>
                      )}
                   </div>
                ) : (
                   // Collapsed View
                   <button 
                     onClick={() => setActiveTrailerAccordion(item.id)}
                     className={`flex items-center justify-between hero-glass-card rounded-xl px-6 py-6 transition-all duration-300 border ${isLight ? 'border-[#7A4A10]/20 hover:border-[#7A4A10]/50 bg-white/40' : 'border-[#FF9D00]/20 hover:border-[#FF9D00]/50 bg-black/40 hover:shadow-[0_0_15px_rgba(255,157,0,0.15)] shadow-md'}`}
                   >
                     <span className={`font-inter font-bold tracking-wide text-lg sm:text-xl ${isLight ? 'text-[#2A1505]' : 'text-white/90'}`}>{item.id === 'first-shot' ? t('updates.trailers.firstShot') : item.id === 'glimpse' ? t('updates.trailers.glimpse') : t('updates.trailers.trailer')}</span>
                     <Play size={20} className={isLight ? 'text-[#7A4A10]' : 'text-[#FF9D00]'} />
                   </button>
                )}
              </div>
            ))}
          </div>
        ) : activeFilter === 'Reels' ? (
          <div className="max-w-5xl mx-auto">
            <p className={`text-center font-inter text-xs tracking-widest uppercase mb-10 ${isLight ? 'text-[#8B6040]' : 'text-zinc-500'}`}>{t('updates.reels.official')}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {reelsList.map(reel => (
                <a
                  key={reel.id}
                  href={reel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block rounded-2xl overflow-hidden aspect-[9/16] border border-[#FF9D00]/40 hover:border-[#FF9D00]/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,157,0,0.25)] shadow-md bg-black"
                >
                  {/* Instagram embed thumbnail via their CDN */}
                  <img
                    src={`https://www.instagram.com/p/${reel.shortcode}/media/?size=l`}
                    alt={`Peddi movie Instagram reel ${reel.id}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-75"
                    onError={e => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback gradient bg if image fails */}
                  <div
                    className="absolute inset-0 hidden items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #1a0a00 0%, #3d1800 50%, #1a0a00 100%)' }}
                  >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FF9D00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  </div>
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 border-[#FF9D00]/80 bg-black/50 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-[#FF9D00]/20 group-hover:border-[#FF9D00] group-hover:shadow-[0_0_20px_rgba(255,157,0,0.5)]`}>
                      <Play size={22} className="text-[#FF9D00] ml-1" fill="#FF9D00" />
                    </div>
                  </div>
                  {/* Instagram icon badge */}
                  <div className="absolute top-3 right-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center backdrop-blur-sm ${isLight ? 'bg-white/80' : 'bg-black/60'} border border-[#FF9D00]/30`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isLight ? '#7A4A10' : '#FF9D00'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map(n => (
              <a key={n.id} href={n.url} target="_blank" rel="noopener noreferrer" className={`hero-glass-card rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FF9D00]/10 hover:border-[#FF9D00]/50 transition-all duration-200 cursor-pointer group flex flex-col border ${isLight ? 'border-[#7A4A10]/40' : 'border-[#FF9D00]/40'}`}>
                <div className="h-48 w-full relative overflow-hidden flex-shrink-0">
                  <img src={n.image} alt="Peddi movie official still 2026" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" style={{ objectPosition: n.objectPosition || 'center center' }} />
                  <div className="absolute top-3 left-3">
                    <span className={`font-inter font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-widest ${n.category === 'Announcement' ? 'bg-gradient-to-r from-p-golddk to-p-goldlt text-white shadow-[0_0_10px_rgba(255,157,0,0.4)]' : n.category === 'BTS' ? 'bg-p-golddk/80 text-white' : 'bg-p-gold/20 text-p-gold border border-p-gold/40'}`}>
                      {t(`news.${n.id}.category`)}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <span className={`font-inter font-black text-[10px] md:text-xs ${isLight ? 'text-[#8B6040]/70' : 'text-p-muted/60'} tracking-wider uppercase`}>{t(`news.${n.id}.date`)}</span>
                  <h3 className={`font-dirt font-bold uppercase tracking-wide text-lg ${isLight ? 'text-[#7A4A10]' : 'text-p-gold'} mt-2 leading-snug`}>{t(`news.${n.id}.title`)}</h3>
                  <p className={`font-inter text-xs ${isLight ? 'text-[#5A3010]' : 'text-p-muted'} leading-relaxed mt-2`} style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {t(`news.${n.id}.excerpt`)}
                  </p>
                  <div className="mt-auto pt-4">
                    <span className={`font-inter font-bold text-xs ${isLight ? 'text-[#7A4A10]' : 'text-p-gold'} tracking-[0.2em] group-hover:translate-x-1 transition-transform uppercase inline-block mt-2`}>{t('updates.readMore')}</span>
                  </div>
                </div>
              </a>
            ))}
            {filteredNews.length === 0 && (
              <div className={`col-span-full py-20 text-center font-inter ${isLight ? 'text-[#8B6040]' : 'text-p-muted'}`}>
                {t('updates.noUpdates')}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
