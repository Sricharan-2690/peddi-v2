import React, { useState } from 'react';
import newsData from '../data/newsData';

export default function Updates() {
  const filters = ['All', 'Announcement', 'BTS', 'Music', 'Shoot Update', 'Milestone'];
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredNews = activeFilter === 'All' ? newsData : newsData.filter(n => n.category === activeFilter);

  return (
    <div className="w-full bg-p-black min-h-screen">
      {/* PAGE HERO */}
      <section className="h-[30vh] md:h-[40vh] bg-gradient-to-b from-p-rust via-p-dark to-p-black flex items-end justify-center pb-12 pt-28 text-center text-white">
        <div>
          <h1 className="font-cinzel text-5xl text-p-gold">LATEST UPDATES</h1>
          <p className="font-oswald text-xs tracking-[0.4em] text-p-muted mt-3 uppercase">NEWS AND ANNOUNCEMENTS</p>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-[72px] z-30 bg-p-black/90 backdrop-blur border-b border-p-gold/10 overflow-x-auto w-full">
        <div className="flex gap-0 min-w-max md:justify-center border-b border-p-gold/10">
          {filters.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`font-oswald text-xs tracking-widest px-5 py-4 cursor-pointer focus:outline-none transition-colors duration-200 uppercase whitespace-nowrap border-b-2
                ${activeFilter === tab 
                  ? 'text-p-gold border-p-gold' 
                  : 'text-p-muted hover:text-p-gold border-transparent'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map(n => (
            <div key={n.id} className="bg-p-dark border border-p-gold/10 rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 hover:border-l-2 hover:border-l-p-gold transition-all duration-200 cursor-pointer group flex flex-col">
              <div className="h-48 w-full relative overflow-hidden flex-shrink-0">
                <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <span className={`font-oswald text-xs px-3 py-1 rounded-full uppercase ${n.category === 'Announcement' ? 'bg-p-gold text-p-black font-bold' : n.category === 'BTS' ? 'bg-p-red/80 text-white' : 'bg-p-gold/20 text-p-gold border border-p-gold/40'}`}>
                    {n.category}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <span className="font-oswald text-xs text-p-muted/60 tracking-wider uppercase">{n.date}</span>
                <h3 className="font-cinzel text-lg text-p-gold mt-2 leading-snug">{n.title}</h3>
                <p className="font-noto text-xs text-p-muted leading-relaxed mt-2" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {n.excerpt}
                </p>
                <div className="mt-auto pt-4">
                  <span className="font-oswald text-xs text-p-gold tracking-wide group-hover:translate-x-1 transition-transform uppercase inline-block font-bold mt-2">Read More →</span>
                </div>
              </div>
            </div>
          ))}
          {filteredNews.length === 0 && (
            <div className="col-span-full py-20 text-center font-noto text-p-muted">
              No updates found for this category yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
