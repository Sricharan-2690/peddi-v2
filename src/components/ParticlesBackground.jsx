import React, { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';

/* ─── Premium Dark Mode: Animated Gold Sand Dust ─────────────
   Three particle layers:
   1. Fine golden dust  — tiny, fast, drifting diagonally
   2. Glowing embers    — larger, slow, pulsing amber orbs
   3. Deep background   — very large, ultra-slow, soft blur
   ─────────────────────────────────────────────────────────── */

function useParticles(count, opts) {
  return useMemo(() =>
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 110 - 5,
      y: Math.random() * 110 - 5,
      size: opts.minSize + Math.random() * (opts.maxSize - opts.minSize),
      duration: opts.minDur + Math.random() * (opts.maxDur - opts.minDur),
      delay: Math.random() * -opts.maxDur,
      opacity: opts.minOp + Math.random() * (opts.maxOp - opts.minOp),
      blur: opts.blur ? `${Math.random() * opts.blur}px` : '0px',
      round: Math.random() > 0.45,
      color: opts.colors[Math.floor(Math.random() * opts.colors.length)],
      driftX: 8 + Math.random() * 14,
      driftY: -(6 + Math.random() * 10),
    })),
  []);
}

export default function ParticlesBackground() {
  const { theme } = useTheme();

  // Layer 1 — fine golden dust grains
  const dustParticles = useParticles(90, {
    minSize: 0.8, maxSize: 2.2,
    minDur: 9,   maxDur: 22,
    minOp: 0.18, maxOp: 0.55,
    blur: 0.8,
    colors: ['#FFB733', '#FF9D00', '#FFCA5A', '#FFD580'],
  });

  // Layer 2 — glowing amber embers
  const emberParticles = useParticles(30, {
    minSize: 2.5, maxSize: 5.5,
    minDur: 18,  maxDur: 40,
    minOp: 0.12, maxOp: 0.35,
    blur: 3,
    colors: ['#FF9D00', '#FFB733', '#FF8800'],
  });

  // Layer 3 — deep soft background orbs (barely visible, very large)
  const orbParticles = useParticles(8, {
    minSize: 60, maxSize: 140,
    minDur: 40,  maxDur: 80,
    minOp: 0.03, maxOp: 0.07,
    blur: 30,
    colors: ['#FF9D00', '#FFB733'],
  });

  if (theme === 'light') {
    // In light mode: just a clean white bg, no particles
    return (
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-[#FDFAF6]" />
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#060504]">

      <style>{`
        @keyframes dust-drift {
          0%   { transform: translate(0, 0) scale(1);    opacity: 0; }
          8%   { opacity: var(--op); }
          88%  { opacity: var(--op); }
          100% { transform: translate(calc(var(--dx) * 1vw), calc(var(--dy) * 1vh)) scale(0.7); opacity: 0; }
        }
        @keyframes ember-drift {
          0%   { transform: translate(0, 0) scale(1);    opacity: 0; }
          12%  { opacity: var(--op); }
          85%  { opacity: var(--op); }
          100% { transform: translate(calc(var(--dx) * 0.7vw), calc(var(--dy) * 0.7vh)) scale(1.2); opacity: 0; }
        }
        @keyframes orb-breathe {
          0%, 100% { transform: translate(0, 0) scale(1);   opacity: var(--op); }
          50%       { transform: translate(2vw, -3vh) scale(1.15); opacity: calc(var(--op) * 0.5); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.06; transform: scale(1); }
          50%       { opacity: 0.12; transform: scale(1.05); }
        }
      `}</style>

      {/* ── Ambient Glow Orbs (fixed, breathing) ── */}
      <div
        className="absolute rounded-full"
        style={{
          top: '-15%', left: '-10%',
          width: '70vw', height: '70vw',
          background: 'radial-gradient(circle, rgba(255,157,0,0.13) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'glow-pulse 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          bottom: '-20%', right: '-10%',
          width: '80vw', height: '80vw',
          background: 'radial-gradient(circle, rgba(255,183,51,0.09) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'glow-pulse 12s ease-in-out infinite 4s',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          top: '40%', left: '30%',
          width: '50vw', height: '50vw',
          background: 'radial-gradient(circle, rgba(255,130,0,0.05) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'glow-pulse 16s ease-in-out infinite 2s',
        }}
      />

      {/* ── Layer 3: Deep soft background orbs ── */}
      {orbParticles.map(p => (
        <div
          key={`orb-${p.id}`}
          className="absolute rounded-full"
          style={{
            left: `${p.x}vw`,
            top:  `${p.y}vh`,
            width:  `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            filter: `blur(${p.blur}px)`,
            '--op': p.opacity,
            animation: `orb-breathe ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* ── Layer 2: Glowing ember particles ── */}
      {emberParticles.map(p => (
        <div
          key={`ember-${p.id}`}
          className="absolute"
          style={{
            left: `${p.x}vw`,
            top:  `${p.y}vh`,
            width:  `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            borderRadius: p.round ? '50%' : '30%',
            filter: `blur(${p.blur}px)`,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}88`,
            '--op': p.opacity,
            '--dx': p.driftX * 0.6,
            '--dy': p.driftY * 0.6,
            opacity: 0,
            animation: `ember-drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* ── Layer 1: Fine golden dust grains ── */}
      {dustParticles.map(p => (
        <div
          key={`dust-${p.id}`}
          className="absolute"
          style={{
            left: `${p.x}vw`,
            top:  `${p.y}vh`,
            width:  `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            borderRadius: p.round ? '50%' : '20%',
            filter: `blur(${p.blur})`,
            '--op': p.opacity,
            '--dx': p.driftX,
            '--dy': p.driftY,
            opacity: 0,
            animation: `dust-drift ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* ── Vignette for depth ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)',
        }}
      />

      {/* ── Film grain ── */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
          animation: 'grainShift 0.08s steps(1) infinite',
        }}
      />
    </div>
  );
}
