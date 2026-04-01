/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'p-black':  '#0A0604',
        'p-dark':   '#1A0A00',
        'p-rust':   '#2C1810',
        'p-gold':   '#D4AF37',
        'p-goldlt': '#F0D060',
        'p-golddk': '#B8860B',
        'p-red':    '#8B0000',
        'p-cream':  '#F5F0E8',
        'p-muted':  '#A89070',
        'p-soil':   '#5C3D1E',
      },
      fontFamily: {
        cinzel:  ['"Cinzel Decorative"', 'serif'],
        noto:    ['"Noto Sans"', 'sans-serif'],
        oswald:  ['Oswald', 'sans-serif'],
        telugu:  ['"Noto Sans Telugu"', 'sans-serif'],
        tamil:   ['"Noto Sans Tamil"', 'sans-serif'],
        hindi:   ['"Noto Sans Devanagari"', 'sans-serif'],
        malay:   ['"Noto Sans Malayalam"', 'sans-serif'],
        kannada: ['"Noto Sans Kannada"', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        bounce2: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(10px)' },
        },
        pulse2: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0.2' },
        },
        waveBar: {
          '0%,100%': { transform: 'scaleY(0.3)' },
          '50%':     { transform: 'scaleY(1)' },
        },
        flipTop: {
          '0%':   { transform: 'rotateX(0deg)' },
          '100%': { transform: 'rotateX(-90deg)' },
        },
        flipBottom: {
          '0%':   { transform: 'rotateX(90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
        countPulse: {
          '0%,100%': { textShadow: '0 0 20px rgba(212,175,55,0.3)' },
          '50%':     { textShadow: '0 0 40px rgba(212,175,55,0.8)' },
        },
        grainShift: {
          '0%,100%': { transform: 'translate(0,0)' },
          '50%':     { transform: 'translate(-2px,-2px)' },
        },
      },
      animation: {
        'fade-up':     'fadeUp 0.7s ease forwards',
        'shimmer':     'shimmer 2s linear infinite',
        'bounce2':     'bounce2 1.5s ease-in-out infinite',
        'pulse2':      'pulse2 1s ease-in-out infinite',
        'wave-bar':    'waveBar var(--dur,0.8s) ease-in-out infinite',
        'flip-top':    'flipTop 0.28s ease-in forwards',
        'flip-bottom': 'flipBottom 0.28s ease-out forwards',
        'count-pulse': 'countPulse 0.4s ease',
        'grain':       'grainShift 0.08s steps(1) infinite',
      },
    },
  },
  plugins: [],
};
