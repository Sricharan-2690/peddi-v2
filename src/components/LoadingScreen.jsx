import React, { useState, useEffect } from 'react';

export default function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(true);
  const [particles, setParticles] = useState([]);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    // Phase 3 particles
    const p = Array.from({ length: 16 }).map(() => ({
      top: 50 + (Math.random() * 40 - 20) + '%',
      left: 50 + (Math.random() * 40 - 20) + '%',
      delay: Math.random() * 600,
    }));
    setParticles(p);

    const timeouts = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 900),
      setTimeout(() => setPhase(4), 1000),
      setTimeout(() => setPhase(5), 1200),
      setTimeout(() => setPhase(6), 1600),
      setTimeout(() => {
        setVisible(false);
        if (onDone) onDone();
      }, 2100)
    ];

    return () => timeouts.forEach(clearTimeout);
  }, [onDone]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Phase 1: Glow */}
      <div 
        className="absolute w-[400px] h-[400px] rounded-full transition-opacity duration-1000 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, rgba(212,175,55,0) 70%)',
          opacity: phase >= 1 ? 0.3 : 0
        }}
      />

      {/* Phase 2: Title & Phase 4: Underline */}
      <div className={`relative flex flex-col items-center justify-center transition-all ${phase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
        {phase >= 2 && (
          <div className="flex flex-col items-center">
            {!imgError ? (
              <img 
                src="/images/Peddi026.jpg" 
                alt="PEDDI" 
                className="h-24 md:h-32 object-contain animate-fade-up" 
                onError={() => setImgError(true)} 
              />
            ) : (
              <h1 
                className="font-cinzel text-6xl md:text-9xl text-p-gold leading-none animate-fade-up"
                style={{ textShadow: '0 0 80px rgba(212,175,55,0.5)' }}
              >
                PEDDI
              </h1>
            )}
            
            {/* Phase 4: Underline */}
            <div 
              className={`h-px bg-p-gold transition-all duration-500 mt-4 ${phase >= 4 ? 'w-48' : 'w-0'}`}
            />
          </div>
        )}
      </div>

      {/* Phase 5: Subtitle */}
      <div className={`absolute bottom-32 flex flex-col items-center text-center transition-opacity duration-500 ${phase >= 5 ? 'opacity-100' : 'opacity-0'}`}>
        <p className="font-oswald text-xs tracking-widest text-p-gold/60 mb-2">
          A BUCHI BABU SANA FILM
        </p>
        <p className="font-noto text-xs text-p-muted/40 uppercase">
          MYTHRI MOVIE MAKERS · VRIDDHI CINEMAS · SUKUMAR WRITINGS
        </p>
      </div>

      {/* Phase 3: Particles */}
      {phase >= 3 && phase < 7 && particles.map((p, i) => (
        <div 
          key={i}
          className="absolute bg-p-gold rounded-full transition-opacity duration-600 pointer-events-none"
          style={{
            width: `${Math.random() * 4 + 4}px`,
            height: `${Math.random() * 4 + 4}px`,
            top: p.top,
            left: p.left,
            opacity: phase === 3 ? 1 : 0, // Fades out
          }}
        />
      ))}

      {/* Phase 6: Progress Bar */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-p-gold/20 w-full">
        <div 
          className="h-full bg-p-gold transition-all duration-400 ease-out"
          style={{ width: phase >= 6 ? '100%' : '0%' }}
        />
      </div>
    </div>
  );
}
