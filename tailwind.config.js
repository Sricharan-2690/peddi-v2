/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'p-black':  '#0A0A0A',
        'p-dark':   '#0A0A0A',   // Unify dark with pure black for hero look
        'p-rust':   '#1A1205',   // deep amber-black (hero glow bg)
        'p-gold':   '#FF9D00',   // primary accent — premium amber
        'p-goldlt': '#FFB733',   // lighter gold highlight
        'p-golddk': '#CC7D00',   // darker aged gold
        'p-red':    '#CC7D00',   // replace red with deep gold for premium look
        'p-cream':  '#F5F0E8',
        'p-muted':  '#8A8A8A',
        'p-soil':   '#3D260A',   // deep warm dark
        'p-amber':  '#FF9D00',
      },
      fontFamily: {
        cinzel:  ['"Cinzel Decorative"', 'serif'],
        mont:    ['Montserrat', 'sans-serif'],
        inter:   ['Inter', 'sans-serif'],
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
          '0%,100%': { textShadow: '0 0 20px rgba(255,157,0,0.4)' },
          '50%':     { textShadow: '0 0 50px rgba(255,157,0,1)' },
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
