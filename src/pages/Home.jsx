import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Play, Pause } from 'lucide-react';
import languages from '../data/languages';
import castData from '../data/castData';
import newsData from '../data/newsData';

const StatCounter = ({ stat }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([ent]) => {
      if (ent.isIntersecting) {
        let start = Date.now();
        const duration = 2000;
        let animationFrameId;
        
        const animate = () => {
          let p = (Date.now() - start) / duration;
          if (p >= 1) {
            setCount(stat.value);
            return;
          }
          const ease = 1 - Math.pow(2, -10 * p);
          setCount(Math.floor(stat.value * ease));
          animationFrameId = requestAnimationFrame(animate);
        };
        
        animationFrameId = requestAnimationFrame(animate);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stat.value]);

  return (
    <div ref={ref} className="bg-p-black py-10 px-6 text-center h-full flex flex-col justify-center items-center">
      <div>
        <span className="font-oswald font-bold text-5xl text-p-gold">{count}</span>
        <span className="font-oswald text-2xl text-p-golddk">{stat.suffix}</span>
      </div>
      <p className="font-noto text-xs text-p-muted mt-3 leading-relaxed max-w-xs mx-auto">{stat.label}</p>
      <div className="gold-divider w-10 mt-4 mx-auto" />
    </div>
  );
};

export default function Home() {
  // Rotate language
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const int = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % languages.length);
    }, 2800);
    return () => clearInterval(int);
  }, []);

  // Countdown timer
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

  // Stats Counter
  const stats = [
    { value: 46, suffix: 'M', label: 'Chikiri Views in 24 Hours' },
    { value: 300, suffix: 'CR+', label: 'Estimated Budget (₹)' },
    { value: 1000, suffix: '+', label: 'Dancers in Chikiri Song' },
    { value: 8, suffix: ' MONTHS', label: "Ram Charan's Training" },
    { value: 130, suffix: 'CR', label: 'Netflix OTT Deal (₹)' },
    { value: 5, suffix: '', label: 'Pan-India Languages' },
  ];
  


  // Music Player
  const [bgImageError, setBgImageError] = useState(false);
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
    <div className="w-full">
      {/* SECTION 1 — HERO */}
      <section className="min-h-screen relative overflow-hidden bg-p-black">
        {!bgImageError ? (
          <img src="/images/et00439772-usfbnptffh-landscape.avif" onError={() => setBgImageError(true)} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-p-dark via-p-black to-p-rust opacity-80" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-p-black/50 to-p-black" />

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 px-6 pt-24 text-center z-10">
          <div className="h-56 md:h-[20rem] flex items-center justify-center w-full py-4">
             <div key={currentIndex} className="animate-fade-up flex items-center justify-center w-full h-full">
               <h2 className={`${languages[currentIndex].font} text-8xl md:text-[10rem] font-bold text-p-gold leading-normal pb-4`} style={{ textShadow:'0 0 60px rgba(212,175,55,0.25)' }}>
                 {languages[currentIndex].script}
               </h2>
             </div>
          </div>

          <div className="gold-divider" />

          <p className="font-oswald text-xs tracking-[0.3em] text-p-muted uppercase">
            {languages[currentIndex].lang}
          </p>

          <h1 className="font-cinzel text-xl text-p-muted/60 tracking-[0.5em] mt-4">PEDDI</h1>
          <p className="font-noto text-sm italic text-p-muted/50 mt-1">A Rural Legend. A Village's Pride.</p>

          <div className="flex gap-3 justify-center items-center my-4 flex-wrap">
             <span className="border border-p-gold/40 rounded px-4 py-1.5 font-oswald text-xs tracking-widest text-p-gold">
               IN CINEMAS — APRIL 30, 2026
             </span>
             <span className="bg-p-gold text-p-black font-oswald font-bold text-xs tracking-widest px-3 py-1.5 rounded">
               DOLBY CINEMA
             </span>
          </div>

          <div className="flex gap-4 justify-center flex-wrap mt-6">
             <Link to="/tickets" className="flex items-center gap-2 shimmer-btn bg-p-gold text-p-black font-oswald font-bold text-sm tracking-widest px-8 py-4 rounded-full hover:bg-p-goldlt hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-p-gold/30">
               <span>🎟</span> BOOK TICKETS NOW
             </Link>
             <button onClick={() => window.open('https://youtube.com', '_blank')} className="flex items-center gap-2 border border-p-gold text-p-gold font-oswald font-bold text-sm tracking-widest px-8 py-4 rounded-full hover:bg-p-gold/10 hover:-translate-y-1 transition-all duration-200">
               <span>▶</span> WATCH TRAILER
             </button>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <ChevronDown size={24} className="text-p-gold animate-bounce2" />
            <span className="font-oswald text-xs tracking-[0.4em] text-p-gold/40 mt-1">SCROLL</span>
          </div>
        </div>
      </section>

      {/* SECTION 2 — COUNTDOWN TIMER */}
      <section className="bg-p-dark border-y border-p-gold/10 py-16 text-center px-4">
        <p className="font-oswald text-xs tracking-[0.4em] text-p-muted">COUNTING DOWN TO</p>
        <h2 className="font-cinzel text-xl text-p-gold mt-2 mb-8">PEDDI IN CINEMAS</h2>
        
        <div className="flex gap-2 sm:gap-4 justify-center flex-wrap">
          {Object.entries(timeLeft).map(([unit, value], i, arr) => (
            <React.Fragment key={unit}>
              <div className="w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 relative flex flex-col items-center">
                <div className="w-full h-16 sm:h-20 md:h-24 bg-gradient-to-b from-p-rust to-p-dark border border-p-gold/20 rounded-lg flex items-center justify-center relative shadow-xl">
                  <span className="font-oswald font-bold text-4xl sm:text-5xl md:text-6xl text-p-gold">{value.toString().padStart(2, '0')}</span>
                  <div className="absolute w-full h-px bg-black/50 top-1/2 left-0" />
                </div>
                <span className="font-oswald text-[10px] sm:text-xs tracking-[0.3em] text-p-muted mt-2 uppercase">{unit}</span>
              </div>
              {i < arr.length - 1 && (
                <span className="font-oswald text-2xl sm:text-3xl text-p-gold/40 self-start mt-4 sm:mt-6 mx-0 sm:mx-1 animate-pulse2">:</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* SECTION 3 — ABOUT THE FILM */}
      <section className="bg-p-black py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-4">
            {[{v:'1980s', l:'Vizianagaram Setting'}, {v:'RC16', l:"Ram Charan's 16th Film"}, {v:'₹300Cr+', l:'Estimated Budget'}, {v:'OTT: Netflix', l:'Digital Rights Partner'}].map(item => (
              <div key={item.v} className="bg-p-dark border border-p-gold/15 rounded-xl p-6 text-center md:text-left flex flex-col justify-center">
                <span className="font-oswald text-2xl sm:text-3xl text-p-gold leading-tight">{item.v}</span>
                <span className="font-noto text-xs text-p-muted mt-1">{item.l}</span>
              </div>
            ))}
          </div>
          <div>
            <p className="font-oswald text-xs tracking-[0.4em] text-p-muted uppercase">ABOUT THE FILM</p>
            <h2 className="font-cinzel text-4xl text-p-gold mt-2">The World of Peddi</h2>
            <div className="gold-divider ml-0 w-20" />
            <p className="font-noto text-base text-p-cream/80 leading-loose mt-6">
              In 1980s Vizianagaram, a spirited village cricketer transforms into a pehelwan — a wrestler who unites his community through sport, sacrifice, and sheer will. Directed by National Award winner Buchi Babu Sana, PEDDI is a rural, emotional, and rustic journey into the heart of Andhra Pradesh. Music by the legendary AR Rahman.
            </p>
            <p className="font-oswald text-xs tracking-[0.3em] text-p-gold/50 mt-8">A BUCHI BABU SANA FILM</p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — STATS COUNTERS */}
      <section className="bg-p-dark py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-cinzel text-4xl text-p-gold text-center">BY THE NUMBERS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-p-gold/5 mt-12 rounded-xl overflow-hidden border border-p-gold/10">
            {stats.map(s => <StatCounter key={s.label} stat={s} />)}
          </div>
        </div>
      </section>

      {/* SECTION 5 — MUSIC TEASER */}
      <section className="bg-p-black py-20 px-6 text-center">
        <p className="font-oswald text-xs tracking-[0.4em] text-p-muted">MUSIC BY</p>
        <h2 className="font-cinzel text-5xl md:text-6xl text-p-gold mt-2">A.R. RAHMAN</h2>
        <div className="flex gap-2 sm:gap-4 justify-center flex-wrap mt-4">
          {['Oscar Winner', 'Golden Globe', 'National Award'].map(b => (
            <span key={b} className="border border-p-gold/30 rounded-full px-4 py-1 text-xs font-oswald text-p-gold uppercase">{b}</span>
          ))}
        </div>

        <div className="bg-p-dark border border-p-gold/20 rounded-2xl p-6 sm:p-8 mt-10 max-w-2xl mx-auto shadow-2xl">
          <span className="bg-p-gold text-p-black text-xs font-oswald font-bold px-3 py-1 rounded-full uppercase">🏆 ALL-TIME RECORD</span>
          <h3 className="font-cinzel text-3xl text-p-gold mt-4">CHIKIRI CHIKIRI</h3>
          <p className="font-noto text-sm text-p-muted mt-1">46 Million Views in 24 Hours</p>
          
          <div className="flex gap-0.5 items-end justify-center h-12 mt-6 overflow-hidden max-w-full">
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
          
          <button onClick={togglePlay} className="w-14 h-14 bg-p-gold rounded-full flex items-center justify-center mx-auto mt-6 hover:scale-105 active:scale-95 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-p-gold/20">
            {isPlaying ? <Pause size={24} className="text-p-black fill-current" /> : <Play size={24} className="text-p-black fill-current ml-1" />}
          </button>
          
          {/* Silent audio track for demo */}
          <audio ref={audioRef} src="/audios/Chikiri Chikiri.mp3" loop onEnded={() => setIsPlaying(false)} onError={() => { /* fallback gracefully handled via state toggle */ }} />

          <div className="mt-8">
            <Link to="/music" className="inline-block border border-p-gold/40 text-p-gold rounded-full px-6 py-2 font-oswald text-xs tracking-widest hover:bg-p-gold/10 transition-colors uppercase">
              EXPLORE FULL SOUNDTRACK →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6 — CAST PREVIEW */}
      <section className="bg-p-dark py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-cinzel text-4xl text-p-gold text-center">MAIN CAST</h2>
          <div className="gold-divider" />
          
          <div className="flex gap-6 overflow-x-auto md:grid md:grid-cols-3 pb-4 md:pb-0 scrollbar-none mt-12">
            {castData.slice(0, 3).map(member => (
              <div key={member.id} className="w-64 md:w-auto flex-shrink-0 bg-p-black border border-p-gold/15 rounded-xl overflow-hidden group">
                <div className="h-80 w-full overflow-hidden">
                  <img src={member.image} onError={e => e.target.src = member.fallback} alt={member.actor} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 bg-p-black relative z-10">
                  <h3 className="font-cinzel text-lg text-p-gold">{member.actor}</h3>
                  <p className="font-noto text-sm italic text-p-muted mt-0.5">as {member.character}</p>
                  <p className="font-noto text-xs text-p-cream/60 leading-relaxed mt-3" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/cast" className="inline-block font-oswald text-sm text-p-gold tracking-widest hover:text-p-goldlt transition-colors underline underline-offset-4 decoration-p-gold/30 hover:decoration-p-gold">
              SEE FULL CAST →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7 — UPDATES PREVIEW */}
      <section className="bg-p-black py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-cinzel text-4xl text-p-gold text-center">LATEST UPDATES</h2>
          <div className="gold-divider" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {newsData.slice(0, 3).map(n => (
              <Link to="/updates" key={n.id} className="bg-p-dark border border-p-gold/10 rounded-xl overflow-hidden hover:-translate-y-1 hover:border-l-2 hover:border-l-p-gold hover:shadow-xl hover:shadow-black/50 transition-all duration-200 group block">
                <div className="h-48 w-full relative overflow-hidden">
                  <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className={`font-oswald text-xs px-3 py-1 rounded-full uppercase ${n.category === 'Announcement' ? 'bg-p-gold text-p-black font-bold' : n.category === 'BTS' ? 'bg-p-red/80 text-white' : 'bg-p-gold/20 text-p-gold border border-p-gold/40'}`}>
                      {n.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col h-[calc(100%-12rem)]">
                  <span className="font-oswald text-xs text-p-muted/60 tracking-wider uppercase">{n.date}</span>
                  <h3 className="font-cinzel text-lg text-p-gold mt-2 leading-snug">{n.title}</h3>
                  <p className="font-noto text-xs text-p-muted leading-relaxed mt-2 flex-grow" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {n.excerpt}
                  </p>
                  <span className="font-oswald text-xs text-p-gold tracking-wide mt-4 group-hover:translate-x-1 transition-transform uppercase inline-block font-bold">Read More →</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/updates" className="inline-block shimmer-btn bg-p-gold text-p-black font-oswald font-bold text-xs tracking-widest px-8 py-3 rounded-full hover:bg-p-goldlt hover:scale-105 active:scale-95 transition-all duration-200">
              ALL UPDATES →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
