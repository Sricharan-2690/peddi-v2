import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, Ticket, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import castData from '../data/castData';
import newsData from '../data/newsData';

function AnimatedStat({ value, label, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTimer = null;
          const step = (timestamp) => {
            if (!startTimer) startTimer = timestamp;
            const progress = Math.min((timestamp - startTimer) / duration, 1);
            const easeOutProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setCount(Math.floor(easeOutProgress * value));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(value);
            }
          };
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <div ref={ref} className={`rounded-xl sm:rounded-2xl border ${isLight ? 'border-[#7A4A10]/20' : 'border-[#FF9D00]/40'} p-6 sm:p-8 flex flex-col items-center justify-center backdrop-blur-sm ${isLight ? 'bg-black/[0.03]' : 'bg-white/[0.02]'} group hover:bg-[#FF9D00]/5 transition-colors`}>
      <span className={`font-mont font-black text-4xl sm:text-5xl lg:text-6xl tabular-nums ${isLight ? 'text-[#2A1505]' : 'text-white'} leading-none mb-3 group-hover:scale-110 transition-transform duration-500 flex items-baseline`} style={{ textShadow: isLight ? 'none' : '0 0 25px rgba(255,157,0,0.35)' }}>
        {count}{suffix}
      </span>
      <span className={`font-inter text-[9px] sm:text-[10px] font-black tracking-[0.2em] uppercase ${isLight ? 'text-[#7A4A10]' : 'text-[#FF9D00]'} opacity-70`}>{label}</span>
    </div>
  );
}

export default function Home() {
  const [updatesCategory, setUpdatesCategory] = useState('All');
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { t } = useLanguage();

  const titleImages = [
    '/images/title card in all langueges/English Title.png',
    '/images/title card in all langueges/Telugu Title.png',
    '/images/title card in all langueges/Hindi Title.png',
    '/images/title card in all langueges/Tamil Title.png',
    '/images/title card in all langueges/Kannada Title.png',
    '/images/title card in all langueges/Malayalam Title.png',
  ];
  const [titleIdx, setTitleIdx] = useState(0);

  // Drag-to-Scroll Slider Handlers
  const sliderRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const [activeCastIdx, setActiveCastIdx] = useState(0);

  const handleCastScroll = () => {
    if(sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      if (scrollWidth <= clientWidth) return;
      // Calculate progress and convert it to current index (0 to 4)
      const progress = scrollLeft / (scrollWidth - clientWidth);
      const index = Math.round(progress * 4);
      setActiveCastIdx(Math.max(0, Math.min(4, index)));
    }
  };

  const handleMouseDown = (e) => {
    setIsDown(true);
    if(sliderRef.current) {
      sliderRef.current.classList.remove('snap-mandatory'); // Disable snapping while dragging for smoothness
      setStartX(e.pageX - sliderRef.current.offsetLeft);
      setScrollLeftPos(sliderRef.current.scrollLeft);
    }
  };
  const handleMouseLeave = () => { setIsDown(false); if(sliderRef.current) sliderRef.current.classList.add('snap-mandatory'); };
  const handleMouseUp = () => { setIsDown(false); if(sliderRef.current) sliderRef.current.classList.add('snap-mandatory'); };
  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    if(sliderRef.current) {
      const x = e.pageX - sliderRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      sliderRef.current.scrollLeft = scrollLeftPos - walk;
    }
  };

  useEffect(() => {
    const titleInterval = setInterval(() => {
      setTitleIdx(prev => (prev + 1) % titleImages.length);
    }, 2000);
    return () => clearInterval(titleInterval);
  }, []);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    // 30 APRIL 2026
    const target = new Date('2026-04-30T00:00:00+05:30').getTime();
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



  // Translated time labels
  const timeLabels = {
    days: t('time.days'),
    hours: t('time.hours'),
    mins: t('time.mins'),
    secs: t('time.secs')
  };

  // Filter categories translated
  const filterCategories = [
    { key: 'All', label: t('filter.all') },
    { key: 'Trailers', label: t('filter.trailers') },
    { key: 'Songs', label: t('filter.songs') },
    { key: 'Reels', label: t('filter.reels') },
  ];

  // Premium Tokens based on reference image
  const themeClasses = {
    bgApp: 'hero-bg',
    cardBg: 'hero-glass-card',
    cardHover: isLight ? 'hover:bg-black/5' : 'hover:bg-white/5',
    border: isLight ? 'border-[#7A4A10]/20' : 'border-[#FF9D00]/20',
    textMuted: isLight ? 'text-[#8B6040]' : 'text-zinc-400',
    btnPrimary: 'hero-btn-primary',
    btnSecondary: 'hero-btn-secondary',
    goldText: 'hero-text-gradient'
  };



  return (
    <div className={`min-h-screen font-inter transition-colors duration-500 flex flex-col pt-16 ${themeClasses.bgApp} selection:bg-p-amber/30`}>

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center items-center text-center px-4 pt-20 pb-10 overflow-hidden">
        {/* Glow effect */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] max-w-[600px] max-h-[600px] rounded-full pointer-events-none -z-10 ${!isLight ? 'bg-p-amber/10 blur-[100px]' : 'bg-p-amber/5 blur-[80px]'}`}></div>
        
        <div className="z-10 flex flex-col items-center w-full max-w-4xl mx-auto mt-6">
            <div className={`font-mont font-normal text-sm sm:text-base tracking-[0.4em] uppercase mb-8 sm:mb-10 text-center ${isLight ? 'text-[#7A4A10]' : 'text-[#FF9D00]'} drop-shadow-[0_0_6px_rgba(255,157,0,0.7)] leading-relaxed -translate-y-4`}>
               {t('home.megaPowerStar')} <br/> {t('home.ramCharan')}
            </div>
            
            {/* Title Slideshow replacing PEDDI text */}
            <div 
               className="relative w-full max-w-[80vw] sm:max-w-[60vw] md:max-w-[500px] h-32 sm:h-40 md:h-48 overflow-hidden mb-4 sm:mb-6 flex justify-center items-center"
            >
               {titleImages.map((src, idx) => {
                 let transformClass = 'translate-y-[100%] opacity-0';
                 if (idx === titleIdx) {
                   transformClass = 'translate-y-0 opacity-100 z-10';
                 } else if (idx === (titleIdx - 1 + titleImages.length) % titleImages.length) {
                   transformClass = '-translate-y-[100%] opacity-0';
                 }
                 
                 return (
                   <img
                     key={src}
                     src={src}
                     alt="Peddi Title"
                     className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${transformClass} drop-shadow-[0_0_15px_rgba(255,157,0,0.4)]`}
                   />
                 );
               })}
            </div>
            
            <h2 className={`font-mont font-semibold text-sm sm:text-lg md:text-xl tracking-[0.4em] uppercase mb-10 ${isLight ? 'text-[#2A1505]' : 'text-white'} drop-shadow-md`}>
               {t('home.theRageBegins')}
            </h2>

            <div className="mb-10 sm:mb-12 flex flex-col items-center">
               <span className="mb-4 sm:mb-5 bg-gradient-to-r from-[#FFB733] to-[#FF9D00] text-white font-inter font-black text-[9px] sm:text-[10px] tracking-widest px-5 py-2 rounded-full uppercase shadow-[0_0_15px_rgba(255,157,0,0.4)]">
                 {t('home.worldwideRelease')}
               </span>
               <h2 className="font-mont font-black text-4xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFB733] to-[#FF9D00] uppercase tracking-tight drop-shadow-[0_0_15px_rgba(255,157,0,0.4)] transition-all">
                 APRIL 30, 2026
               </h2>
            </div>

            {/* Countdown */}
            <div className="mb-10 sm:mb-12 flex justify-center items-center gap-1.5 sm:gap-5 w-full max-w-2xl px-2">
               {Object.entries(timeLeft).map(([unit, value], idx, arr) => (
                  <React.Fragment key={unit}>
                    <div className="flex flex-col items-center">
                       {/* Digit card — thin orange border, transparent bg */}
                       <div className={`rounded-lg sm:rounded-2xl border ${isLight ? 'border-[#7A4A10]/30' : 'border-[#FF9D00]/40'} px-2 sm:px-5 py-2 sm:py-4 min-w-[44px] sm:min-w-[72px] flex items-center justify-center backdrop-blur-sm ${isLight ? 'bg-black/[0.04]' : 'bg-white/[0.02]'}`}>
                          <span 
                            className={`font-mont font-black text-2xl xs:text-3xl sm:text-5xl md:text-6xl tabular-nums ${isLight ? 'text-[#2A1505]' : 'text-white'} leading-none`}
                            style={{ textShadow: isLight ? 'none' : '0 0 25px rgba(255,157,0,0.35)' }}
                          >
                            {value.toString().padStart(2, '0')}
                          </span>
                       </div>
                       <span className={`font-inter text-[8px] sm:text-[10px] font-black tracking-[0.2em] uppercase mt-2 sm:mt-3 ${isLight ? 'text-[#7A4A10]' : 'text-[#FF9D00]'} opacity-60`}>{timeLabels[unit]}</span>
                    </div>
                    
                    {idx < arr.length - 1 && (
                      <div className="flex flex-col gap-1 sm:gap-1.5 mb-4 sm:mb-6">
                         <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${isLight ? 'bg-[#7A4A10]' : 'bg-[#FF9D00]'} opacity-40`} />
                         <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${isLight ? 'bg-[#7A4A10]' : 'bg-[#FF9D00]'} opacity-40`} />
                      </div>
                    )}
                  </React.Fragment>
               ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
               <a href="https://in.bookmyshow.com/movies/hyderabad/peddi/ET00439772" target="_blank" rel="noopener noreferrer"
                  className={`w-full sm:w-[200px] h-14 rounded-full flex items-center justify-center gap-2 font-inter tracking-[0.2em] text-xs font-black transition-all duration-300 ${themeClasses.btnPrimary}`}>
                  <Ticket size={16} /> {t('home.bookTickets')}
               </a>
               <a href="https://youtu.be/f4poVE-r8Ho?si=7_SjSUZaXbTNAhD1" target="_blank" rel="noopener noreferrer"
                  className={`w-full sm:w-[200px] h-14 rounded-full flex items-center justify-center gap-2 font-inter tracking-[0.2em] text-xs font-black transition-all duration-300 hero-btn-secondary`}>
                  <Play size={16} fill="currentColor" /> {t('home.watchTrailer')}
               </a>
            </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
           <ChevronDown size={24} className={themeClasses.textMuted} />
        </div>
      </section>

      {/* Overview Section */}
      <section className={`py-12 sm:py-16 px-6`}>
         <div className="max-w-4xl mx-auto text-center">
            <h3 className={`font-mont font-black uppercase tracking-[0.1em] text-3xl sm:text-4xl mb-6 ${themeClasses.goldText}`}>{t('home.overview')}</h3>
            <p className={`font-inter text-base sm:text-lg md:text-xl leading-relaxed font-light ${themeClasses.textMuted}`} style={{ whiteSpace: 'pre-line' }}>
               {t('home.overviewText')}
            </p>
         </div>
      </section>

      {/* Updates Section */}
      <section className={`py-12 sm:py-16 px-6 ${themeClasses.bgApp}`}>
         <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center md:items-end mb-12 sm:mb-16 gap-6">
               <h3 className={`font-mont font-black uppercase tracking-[0.1em] text-3xl sm:text-4xl text-center sm:text-left ${themeClasses.goldText}`}>{t('home.latestUpdates')}</h3>
               
               {/* Desktop Category Menu inside updates */}
               <div className="hidden sm:flex gap-4 sm:gap-6 text-xs font-inter font-bold tracking-[0.1em] uppercase">
                  {filterCategories.map(cat => (
                     <button key={cat.key} onClick={() => setUpdatesCategory(cat.key)} className={`pb-1 border-b-2 transition-colors ${updatesCategory === cat.key ? 'border-p-amber text-p-amber' : 'border-transparent ' + themeClasses.textMuted}`}>
                        {cat.label}
                     </button>
                  ))}
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
               {newsData.slice(0, 2).map((n) => (
                  <div key={n.id} className={`group rounded-[2rem] overflow-hidden ${themeClasses.cardBg} border ${themeClasses.border} transition-transform duration-500 hover:-translate-y-2 flex flex-col shadow-lg`}>
                     <div className="aspect-[16/9] w-full overflow-hidden relative">
                        <img src={n.image} alt={n.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0 grayscale-[20%]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-p-black via-transparent to-transparent opacity-80"></div>
                     </div>
                     <div className="p-8 flex flex-col flex-grow relative z-10">
                        <span className={`text-[10px] font-inter font-bold tracking-widest uppercase ${themeClasses.textMuted} mb-2 block`}>{n.date} • {n.category}</span>
                        <h4 className={`font-mont font-bold text-xl sm:text-2xl mb-4 leading-snug uppercase ${isLight ? 'text-[#2A1505]' : 'text-white'}`}>{n.title}</h4>
                        <p className={`text-sm sm:text-base font-inter ${themeClasses.textMuted} leading-relaxed flex-grow`}>{n.excerpt}</p>
                     </div>
                  </div>
               ))}
            </div>
            
            <div className="text-center">
               <Link to="/updates" className={`inline-block px-10 py-4 rounded-full font-inter tracking-[0.2em] text-xs sm:text-sm font-black transition-all duration-300 hero-btn-secondary`}>
                  {t('home.viewAllUpdates')}
               </Link>
            </div>
         </div>
      </section>

      {/* Cast Section */}
      <section className={`py-24 sm:py-32 px-6 ${themeClasses.cardBg}`}>
         <div className="max-w-7xl mx-auto">
            <h3 className={`font-mont font-black uppercase tracking-[0.1em] text-3xl sm:text-4xl text-center mb-16 ${themeClasses.goldText}`}>{t('home.theCast')}</h3>
            
            <div 
               ref={sliderRef}
               onMouseDown={handleMouseDown}
               onMouseLeave={handleMouseLeave}
               onMouseUp={handleMouseUp}
               onMouseMove={handleMouseMove}
               onScroll={handleCastScroll}
               className={`flex gap-4 sm:gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0 scroll-smooth ${isDown ? 'cursor-grabbing' : 'cursor-grab'}`} 
               style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
               <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
               
               {castData.slice(0, 5).map((member) => (
                  <div key={member.id} className="min-w-[75vw] sm:min-w-[280px] md:min-w-[320px] snap-center group cursor-pointer">
                     <div className={`relative overflow-hidden rounded-[2rem] aspect-[3/4] mb-6 ${!isLight ? 'bg-zinc-900 border border-white/5' : 'bg-gray-100 border border-black/5'} shadow-xl`}>
                        <img src={member.image} onError={e => e.target.src=member.fallback} alt={member.actor} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 filter group-hover:brightness-110 grayscale-[30%] group-hover:grayscale-0" />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-95 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8">
                           <p className="text-white/90 font-inter text-xs md:text-sm font-medium leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 line-clamp-4">
                             {member.description}
                           </p>
                        </div>
                     </div>
                     <div className="text-center px-4">
                        <h4 className={`font-mont font-bold text-lg md:text-xl mb-1 uppercase tracking-wide ${isLight ? 'text-[#2A1505]' : 'text-white'}`}>{member.actor}</h4>
                        <p className={`text-xs sm:text-sm font-inter font-semibold tracking-[0.2em] uppercase text-p-amber`}>as {member.character}</p>
                     </div>
                  </div>
               ))}
               
            </div>
            
            {/* Scroll Indicator Dots */}
            <div className="flex justify-center items-center gap-2 mt-2 mb-10 pointer-events-none transition-all duration-300">
               {Array.from({ length: 5 }).map((_, idx) => (
                 <div 
                   key={idx} 
                   className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                     activeCastIdx === idx 
                       ? 'w-6 bg-[#FF9D00] shadow-[0_0_8px_rgba(255,157,0,0.4)]' 
                       : 'w-1.5 bg-white/20 hover:bg-white/40'
                   }`}
                 />
               ))}
            </div>

            {/* View Full Cast Button */}
            <div className="text-center">
               <Link to="/cast" className={`inline-block px-10 py-4 rounded-full font-inter tracking-[0.2em] text-xs sm:text-sm font-black transition-all duration-300 hero-btn-secondary`}>
                  {t('home.viewFullCast')}
               </Link>
            </div>
         </div>
      </section>

      {/* Records & Analytics Section */}
      <section className={`py-24 sm:py-32 px-6 text-center ${themeClasses.bgApp} border-t ${themeClasses.border}`}>
         <div className="max-w-5xl mx-auto">
            <h3 className={`font-mont font-black uppercase tracking-[0.1em] text-3xl sm:text-4xl mb-16 ${themeClasses.goldText}`}>{t('home.recordsImpact')}</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
               <AnimatedStat value={46} suffix="M" label={t('stat.views24h')} duration={2500} />
               <AnimatedStat value={5} label={t('stat.languages')} duration={1500} />
               <AnimatedStat value={130} suffix={<span className="text-xl sm:text-2xl ml-1">CR</span>} label={t('stat.netflixDeal')} duration={3000} />
               <AnimatedStat value={300} suffix={<span className="text-xl sm:text-2xl ml-1">CR</span>} label={t('stat.estBudget')} duration={3500} />
            </div>
            
            <Link to="/analytics" className={`inline-block px-10 py-4 rounded-full font-inter tracking-[0.2em] text-xs sm:text-sm font-black transition-all duration-300 hero-btn-secondary`}>
               {t('home.viewAllAnalytics')}
            </Link>
         </div>
      </section>
      

    </div>
  );
}
