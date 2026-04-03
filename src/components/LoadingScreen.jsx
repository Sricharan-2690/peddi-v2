import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(true);
  const [particles, setParticles] = useState([]);
  const [imgError, setImgError] = useState(false);
  const { theme } = useTheme();

  const isLight = theme === 'light';

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

  // Themed colors
  const bgColor = isLight ? 'bg-[#FDFAF6]' : 'bg-[#060504]';
  const textColor = isLight ? 'text-[#2A1505]' : 'text-white';
  const accentColor = isLight ? '#7A4A10' : '#FF9D00';
  const mutedTextColor = isLight ? 'text-[#8B6040]' : 'text-p-muted';

  return (
    <div className={`fixed inset-0 z-[60] ${bgColor} flex flex-col items-center justify-center overflow-hidden`}>
      {/* Phase 1: Glow */}
      <div 
        className="absolute w-[400px] h-[400px] rounded-full transition-opacity duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accentColor}55 0%, ${accentColor}00 70%)`,
          opacity: phase >= 1 ? 0.4 : 0
        }}
      />

      {/* Phase 2: Title & Phase 4: Underline */}
      <div className={`relative flex flex-col items-center justify-center transition-all duration-1000 ease-out ${phase >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-150'}`}>
        {phase >= 2 && (
          <div className="flex flex-col items-center">
            {!imgError ? (
              <img 
                src="/images/title card in all langueges/English Title.png" 
                alt="PEDDI" 
                className="h-24 md:h-32 object-contain drop-shadow-[0_0_20px_rgba(255,157,0,0.4)]" 
                onError={() => setImgError(true)} 
              />
            ) : (
              <h1 
                className={`font-dirt font-black text-6xl md:text-9xl tracking-[0.15em] uppercase text-transparent bg-clip-text bg-gradient-to-r ${isLight ? 'from-[#3D1A05] to-[#7A4A10]' : 'from-[#FFB733] to-[#FF9D00]'} leading-none`}
                style={{ filter: `drop-shadow(0 0 60px ${accentColor}99)` }}
              >
                PEDDI
              </h1>
            )}
            
            {/* Phase 4: Underline */}
            <div 
              className={`h-px bg-gradient-to-r from-transparent via-[${accentColor}] to-transparent transition-all duration-500 mt-4`}
              style={{ 
                width: phase >= 4 ? '192px' : '0',
                backgroundColor: phase >= 4 ? accentColor : 'transparent'
              }}
            />
          </div>
        )}
      </div>

      {/* Phase 5: Subtitle */}
      <div className={`absolute bottom-32 flex flex-col items-center text-center transition-opacity duration-500 ${phase >= 5 ? 'opacity-100' : 'opacity-0'}`}>
        <p className={`font-inter font-black text-[10px] tracking-[0.3em] ${isLight ? 'text-[#7A4A10]' : 'text-p-gold/70'} mb-2 uppercase`}>
          A BUCHI BABU SANA FILM
        </p>
        <p className={`font-inter text-[10px] ${isLight ? 'text-[#8B6040]' : 'text-p-muted/40'} uppercase tracking-[0.2em]`}>
          MYTHRI MOVIE MAKERS · VRIDDHI CINEMAS · SUKUMAR WRITINGS
        </p>
      </div>

      {/* Phase 3: Particles */}
      {phase >= 3 && phase < 7 && particles.map((p, i) => (
        <div 
          key={i}
          className="absolute rounded-full transition-opacity duration-600 pointer-events-none"
          style={{
            backgroundColor: accentColor,
            width: `${Math.random() * 4 + 4}px`,
            height: `${Math.random() * 4 + 4}px`,
            top: p.top,
            left: p.left,
            opacity: phase === 3 ? 1 : 0, // Fades out
          }}
        />
      ))}

      {/* Phase 6: Progress Bar */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-white/5 w-full">
        <div 
          className="h-full transition-all duration-400 ease-out"
          style={{ 
            width: phase >= 6 ? '100%' : '0%',
            backgroundColor: accentColor,
            boxShadow: `0 0 10px ${accentColor}`
          }}
        />
      </div>
    </div>
  );
}
