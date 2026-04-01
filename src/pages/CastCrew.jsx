import React from 'react';
import { Link } from 'react-router-dom';
import castData from '../data/castData';
import crewData from '../data/crewData';

export default function CastCrew() {
  return (
    <div className="w-full">
      {/* PAGE HERO */}
      <section className="min-h-[40vh] bg-gradient-to-b from-p-rust via-p-dark to-p-black flex items-end justify-center pb-16 text-center pt-32">
        <div>
          <h1 className="font-cinzel text-5xl text-p-gold">CAST & CREW</h1>
          <p className="font-oswald text-xs tracking-[0.4em] text-p-muted mt-3 uppercase">MEET THE WORLD OF PEDDI</p>
        </div>
      </section>

      {/* RC SPOTLIGHT SECTION */}
      <section className="bg-p-dark py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img 
              src="/images/Peddi001.jpg" 
              onError={e => e.target.src = 'https://picsum.photos/seed/rc1/400/500'} 
              alt="Ram Charan as Peddi" 
              className="aspect-[4/5] object-cover rounded-lg w-full max-w-sm mx-auto border border-p-gold/20 hover:scale-[1.02] transition-transform duration-500"
              style={{ filter: 'sepia(30%) saturate(150%) hue-rotate(10deg)' }}
            />
          </div>
          
          <div>
            <h2 className="font-cinzel text-5xl md:text-6xl text-p-gold leading-none">RAM CHARAN</h2>
            <p className="font-noto italic text-xl text-p-muted mt-2">as Peddi</p>
            <div className="gold-divider mx-0 w-20" />
            
            <p className="font-noto text-base text-p-cream/80 leading-loose mt-6">
              8 months of pehelwan training. 5:30 AM akharas. The gada as his soul. Ram Charan becomes Vizianagaram. 
              In 1980s Vizianagaram, a spirited village cricketer transforms into a pehelwan — a wrestler who unites his 
              community through sport, sacrifice, and sheer will.
            </p>
            
            <div className="bg-p-gold/5 border border-p-gold/20 rounded-xl p-6 mt-8">
              <h3 className="font-cinzel text-sm text-p-gold mb-4 uppercase">THE TRANSFORMATION</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <span className="font-oswald text-2xl text-p-gold block">8 MONTHS</span>
                  <span className="font-noto text-xs text-p-muted mt-1 uppercase block">Training</span>
                </div>
                <div>
                  <span className="font-oswald text-2xl text-p-gold block">5:30 AM</span>
                  <span className="font-noto text-xs text-p-muted mt-1 uppercase block">Daily Akharas</span>
                </div>
                <div>
                  <span className="font-oswald text-2xl text-p-gold block">Ayyappa</span>
                  <span className="font-noto text-xs text-p-muted mt-1 uppercase block">Deeksha</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CAST GRID */}
      <section className="bg-p-black py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-cinzel text-4xl text-p-gold inline-block">MAIN CAST</h2>
          <div className="gold-divider w-24" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 text-left">
            {castData.map(member => (
              <div key={member.id} className="bg-p-dark border border-p-gold/15 rounded-2xl overflow-hidden group">
                <div className="h-[400px] relative overflow-hidden">
                  <img src={member.image} onError={e => e.target.src = member.fallback} alt={member.actor} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-p-black via-p-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <h3 className="font-cinzel text-xl text-p-gold">{member.actor}</h3>
                    <p className="font-noto italic text-sm text-p-muted mt-1">as {member.character}</p>
                    <div className="gold-divider w-10 my-2 mx-0" />
                    <p className="font-noto text-xs text-p-cream/70 leading-relaxed">{member.description}</p>
                  </div>
                </div>
                <div className="p-4 border-t border-p-gold/10 bg-p-black">
                  <h3 className="font-cinzel text-base text-p-gold">{member.actor}</h3>
                  <p className="font-noto text-xs text-p-muted italic mt-1">as {member.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CREW SECTION */}
      <section className="bg-p-dark py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-cinzel text-4xl text-p-gold inline-block">KEY CREW</h2>
          <div className="gold-divider w-24" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 text-left">
            {crewData.map((member, i) => {
              const initials = member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
              return (
                <div key={i} className="bg-p-black border border-p-gold/10 rounded-xl p-5 flex gap-4 items-center hover:border-p-gold/30 transition-colors duration-200 group">
                  <div className="w-14 h-14 rounded-full bg-p-gold/10 border border-p-gold/20 flex flex-shrink-0 items-center justify-center group-hover:bg-p-gold/20 transition-colors">
                    <span className="font-cinzel text-sm text-p-gold">{initials}</span>
                  </div>
                  <div>
                    <p className="font-oswald text-xs tracking-widest text-p-muted uppercase">{member.role}</p>
                    <h3 className="font-cinzel text-lg text-p-gold mt-0.5">{member.name}</h3>
                    <p className="font-noto text-xs text-p-cream/50 mt-1 italic">{member.note}</p>
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
