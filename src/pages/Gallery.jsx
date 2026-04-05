import React, { useState, useEffect } from 'react';
import { Expand, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

const images = [
  { id: 1, src: '/images/gallery/Peddi_1.jpg', label: 'Peddi Still 1' },
  { id: 2, src: '/images/gallery/Peddi_2.jpg', label: 'Peddi Poster 1' },
  { id: 3, src: '/images/gallery/Peddi_3.jpg', label: 'Peddi Still 2' },
  { id: 4, src: '/images/gallery/Peddi_4.jpg', label: 'Peddi BTS 1' },
  { id: 5, src: '/images/gallery/Peddi_5.jpg', label: 'Peddi Location 1' },
  { id: 6, src: '/images/gallery/Peddi_6.jpg', label: 'Peddi Still 3' },
  { id: 7, src: '/images/gallery/Peddi_7.jpg', label: 'Peddi Poster 2' },
  { id: 8, src: '/images/gallery/8.jpg', label: 'Peddi Still 8' },
  { id: 9, src: '/images/gallery/9.jpg', label: 'Peddi Still 9' },
  { id: 10, src: '/images/gallery/10.jpg', label: 'Peddi Still 10' },
  { id: 11, src: '/images/gallery/11.webp', label: 'Peddi Still 11' },
  { id: 12, src: '/images/gallery/12.webp', label: 'Peddi Still 12' },
  { id: 13, src: '/images/gallery/625050526_17908931397321387_3604436370782743869_n.jpg', label: 'Peddi Still 13' },
  { id: 14, src: '/images/gallery/640950515_17912923245321387_6371777549057626703_n.jpg', label: 'Peddi Still 14' },
  { id: 15, src: '/images/gallery/656161218_17916599958321387_1403066188012517578_n.jpg', label: 'Peddi Still 15' },
  { id: 16, src: '/images/gallery/656256577_17916464490321387_1235556681354708021_n.jpg', label: 'Peddi Still 16' },
  { id: 17, src: '/images/gallery/658908365_17917592013321387_7461824596852421820_n.jpg', label: 'Peddi Still 17' },
];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const maxIndex = images.length - 1;

  const openLightbox = (index) => { setLightboxIndex(index); setIsOpen(true); };
  const closeLightbox = () => setIsOpen(false);
  const prevImage = (e) => { e.stopPropagation(); setLightboxIndex(prev => (prev === 0 ? maxIndex : prev - 1)); };
  const nextImage = (e) => { e.stopPropagation(); setLightboxIndex(prev => (prev === maxIndex ? 0 : prev + 1)); };

  useEffect(() => {
    const handleKey = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') setLightboxIndex(prev => (prev === 0 ? maxIndex : prev - 1));
      if (e.key === 'ArrowRight') setLightboxIndex(prev => (prev === maxIndex ? 0 : prev + 1));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, maxIndex]);

  return (
    <div className="w-full hero-bg min-h-screen">
      <Helmet>
        <title>Peddi Movie — Official Gallery | Photos &amp; Stills</title>
        <meta name="description" content="Browse official photos, stills and behind the scenes images from Peddi Telugu movie. Releasing 30 April 2026." />
        <meta property="og:title" content="Peddi Movie — Official Gallery" />
        <meta property="og:image" content="/og-poster.jpg" />
        <meta property="og:type" content="video.movie" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <h1 className="sr-only">Peddi Telugu Movie — Official Photo Gallery</h1>

      {/* HERO */}
      <section className="relative h-[30vh] flex items-end justify-center pb-10 pt-24 text-center overflow-hidden">
        <div className="hero-glow-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] max-w-[600px] max-h-[600px]"></div>
        <div className="z-10">
          <h1 className="font-dirt font-black text-5xl uppercase tracking-[0.15em] hero-text-gradient">{t('gallery.title')}</h1>
          <p className="font-inter font-bold text-xs tracking-[0.4em] text-p-muted mt-3 uppercase">{t('gallery.subtitle')}</p>
        </div>
      </section>

      {/* MASONRY GRID */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div style={{ columns: '3 280px', columnGap: '16px' }}>
          {images.map((img, index) => (
            <div
              key={img.id}
              className="relative overflow-hidden rounded-lg cursor-pointer group animate-fade-up"
              style={{ breakInside: 'avoid', marginBottom: '16px', animationDelay: `${(index % 10) * 50}ms` }}
              onClick={() => openLightbox(index)}
            >
              <img src={img.src} alt="Peddi movie official still 2026" className="w-full h-auto block rounded-lg group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-transparent group-hover:bg-black/50 transition-all duration-300 rounded-lg flex items-center justify-center pointer-events-none">
                <Expand size={28} className="text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-200" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX */}
      {isOpen && images[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={closeLightbox}>
          <button className="absolute top-6 right-6 text-p-gold hover:scale-110 cursor-pointer p-2 z-50 focus:outline-none" onClick={(e) => { e.stopPropagation(); closeLightbox(); }}>
            <X size={28} />
          </button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-p-gold hover:text-p-goldlt hover:scale-110 p-2 z-50 focus:outline-none transition-all" onClick={prevImage}>
            <ChevronLeft size={36} />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-p-gold hover:text-p-goldlt hover:scale-110 p-2 z-50 focus:outline-none transition-all" onClick={nextImage}>
            <ChevronRight size={36} />
          </button>
          <div className="relative px-16 flex items-center justify-center w-full h-full" onClick={e => e.stopPropagation()}>
            <img
              src={images[lightboxIndex].src}
              alt="Peddi movie official still 2026"
              className="max-h-[85vh] max-w-[85vw] object-contain border border-p-gold/20 rounded shadow-2xl transition-transform animate-fade-up"
            />
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-noto text-xs text-p-gold text-center bg-black/60 px-4 py-2 rounded uppercase tracking-wider">
              {images[lightboxIndex].label}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
