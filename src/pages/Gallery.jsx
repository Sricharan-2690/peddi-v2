import React, { useState, useEffect } from 'react';
import { Expand, X, ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  {id:1, src:'/images/Peddi001.jpg', category:'Posters', label:'Ram Charan First Look'},
  {id:2, src:'/images/Peddi003.jpg', category:'Stills', label:'Vizianagaram 1980s'},
  {id:3, src:'/images/Peddi004.jpg', category:'Posters', label:'Janhvi Kapoor — Achiyyamma'},
  {id:4, src:'/images/Peddi005.jpg', category:'BTS', label:'Chikiri Song Set'},
  {id:5, src:'/images/Peddi006.jpg', category:'Stills', label:'Pehelwan Training'},
  {id:6, src:'/images/Peddi008.jpg', category:'BTS', label:'Steel Factory Action'},
  {id:7, src:'/images/Peddi014.jpg', category:'Locations', label:'Mysuru Song Set'},
  {id:8, src:'/images/Peddi018.jpg', category:'Posters', label:'Ensemble Poster'},
  {id:9, src:'/images/Peddi019.jpg', category:'Stills', label:'Village Mela'},
  {id:10, src:'/images/Peddi022.jpg', category:'Locations', label:'Vintage Train'},
  {id:11, src:'/images/Peddi026.jpg', category:'Posters', label:'Villain Arrival'},
  {id:12, src:'/images/Peddi029.jpg', category:'BTS', label:'Action Planning'},
  {id:13, src:'/images/et00439772-usfbnptffh-landscape.avif', category:'Stills', label:'Hero bg'},
];

const filters = ['All', 'Posters', 'Stills', 'BTS', 'Locations'];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Computed based on filtered items
  const filtered = activeFilter === 'All' ? images : images.filter(img => img.category === activeFilter);
  const maxIndex = filtered.length - 1;

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);
  const prevImage = (e) => { e.stopPropagation(); setLightboxIndex(prev => (prev === 0 ? maxIndex : prev - 1)); };
  const nextImage = (e) => { e.stopPropagation(); setLightboxIndex(prev => (prev === maxIndex ? 0 : prev + 1)); };

  useEffect(() => {
    const handleKey = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') { setLightboxIndex(prev => (prev === 0 ? maxIndex : prev - 1)); }
      if (e.key === 'ArrowRight') { setLightboxIndex(prev => (prev === maxIndex ? 0 : prev + 1)); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, maxIndex]);

  // When filter changes, reset lightbox index if it might be out of bounds, or just close it to be safe
  useEffect(() => {
    if (isOpen) closeLightbox();
    // eslint-disable-next-line
  }, [activeFilter]);

  return (
    <div className="w-full hero-bg min-h-screen">
      {/* HERO */}
      <section className="relative h-[30vh] flex items-end justify-center pb-10 pt-24 text-center overflow-hidden">
        <div className="hero-glow-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] max-w-[600px] max-h-[600px]"></div>
        <div className="z-10">
          <h1 className="font-dirt font-black text-5xl uppercase tracking-[0.15em] hero-text-gradient">GALLERY</h1>
          <p className="font-inter font-bold text-xs tracking-[0.4em] text-p-muted mt-3 uppercase">VISUALS OF VIZIANAGARAM</p>
        </div>
      </section>

      {/* FILTER BAR */}
      <div className="sticky top-[64px] md:top-[80px] z-30 bg-black/80 backdrop-blur-md border-b border-[#FF9D00]/20 overflow-x-auto w-full">
        <div className="flex gap-0 min-w-max md:justify-center">
          {filters.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`font-inter font-black text-xs tracking-widest px-5 py-4 cursor-pointer focus:outline-none transition-colors duration-200 uppercase whitespace-nowrap border-b-2
                ${activeFilter === tab ? 'text-p-gold border-p-gold' : 'text-p-muted hover:text-p-gold border-transparent'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* MASONRY GRID */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div style={{ columns: '3 280px', columnGap: '16px' }}>
          {filtered.map((img, index) => (
            <div 
              key={img.id} 
              className="relative overflow-hidden rounded-lg cursor-pointer group animate-fade-up"
              style={{ breakInside: 'avoid', marginBottom: '16px', animationDelay: `${(index % 10) * 50}ms` }}
              onClick={() => openLightbox(index)}
            >
              <img src={img.src} alt={img.label} className="w-full h-auto block rounded-lg group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-transparent group-hover:bg-p-black/50 transition-all duration-300 rounded-lg flex items-center justify-center pointer-events-none">
                <Expand size={28} className="text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-200" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX */}
      {isOpen && filtered[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={closeLightbox}>
          {/* Close */}
          <button className="absolute top-6 right-6 text-p-gold hover:scale-110 cursor-pointer p-2 z-50 focus:outline-none" onClick={(e) => { e.stopPropagation(); closeLightbox(); }}>
            <X size={28} />
          </button>
          
          {/* Controls */}
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-p-gold hover:text-p-goldlt hover:scale-110 p-2 z-50 focus:outline-none transition-all" onClick={prevImage}>
            <ChevronLeft size={36} />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-p-gold hover:text-p-goldlt hover:scale-110 p-2 z-50 focus:outline-none transition-all" onClick={nextImage}>
            <ChevronRight size={36} />
          </button>

          {/* Image Container */}
          <div className="relative px-16 flex items-center justify-center w-full h-full" onClick={e => e.stopPropagation()}>
            <img 
              src={filtered[lightboxIndex].src} 
              alt={filtered[lightboxIndex].label} 
              className="max-h-[85vh] max-w-[85vw] object-contain border border-p-gold/20 rounded shadow-2xl transition-transform animate-fade-up" 
            />
            
            {/* Caption */}
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-noto text-xs text-p-gold text-center bg-black/60 px-4 py-2 rounded uppercase tracking-wider">
              {filtered[lightboxIndex].label}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
