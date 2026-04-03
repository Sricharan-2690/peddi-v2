import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <div ref={ref} className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all duration-300 hover:scale-105 focus:outline-none text-xs font-inter font-bold tracking-wider uppercase ${
          isLight
            ? 'text-[#7A4A10] hover:bg-[#7A4A10]/8 border border-[#7A4A10]/20'
            : 'text-[#FF9D00] hover:bg-[#FF9D00]/10 border border-[#FF9D00]/30 drop-shadow-[0_0_6px_rgba(255,157,0,0.3)]'
        }`}
        aria-label="Change language"
        id="language-selector-btn"
      >
        <Globe size={15} />
        <span className="hidden sm:inline">{current.code.toUpperCase()}</span>
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 top-[calc(100%+8px)] z-50 min-w-[200px] rounded-xl overflow-hidden transition-all duration-300 origin-top-right ${
          open
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        } ${
          isLight
            ? 'bg-[#FDFAF6] border border-[#7A4A10]/20 shadow-[0_8px_30px_rgba(40,20,5,0.15)]'
            : 'bg-[#131313] border border-[#FF9D00]/25 shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
        }`}
      >
        {/* Header */}
        <div className={`px-4 py-2.5 border-b ${isLight ? 'border-[#7A4A10]/10' : 'border-[#FF9D00]/15'}`}>
          <span className={`font-inter font-black text-[9px] tracking-[0.2em] uppercase ${isLight ? 'text-[#8B6040]' : 'text-[#FF9D00]/60'}`}>
            🌐 Choose Language
          </span>
        </div>

        {/* Language Options */}
        <div className="py-1">
          {LANGUAGES.map(lang => {
            const isActive = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => { setLanguage(lang.code); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 flex items-center justify-between gap-3 transition-all duration-200 group ${
                  isActive
                    ? isLight
                      ? 'bg-[#7A4A10]/10 text-[#7A4A10]'
                      : 'bg-[#FF9D00]/10 text-[#FF9D00]'
                    : isLight
                      ? 'text-[#5A3010] hover:bg-[#7A4A10]/5'
                      : 'text-zinc-400 hover:bg-white/5 hover:text-[#FF9D00]'
                }`}
                id={`lang-option-${lang.code}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{lang.flag}</span>
                  <div className="flex flex-col">
                    <span className="font-inter font-bold text-sm leading-tight">{lang.native}</span>
                    <span className={`font-inter text-[10px] ${isActive ? (isLight ? 'text-[#8B6040]' : 'text-[#FF9D00]/60') : (isLight ? 'text-[#8B6040]/60' : 'text-zinc-600')}`}>
                      {lang.name}
                    </span>
                  </div>
                </div>
                {isActive && (
                  <div className={`w-1.5 h-1.5 rounded-full ${isLight ? 'bg-[#7A4A10]' : 'bg-[#FF9D00] shadow-[0_0_6px_rgba(255,157,0,0.6)]'}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
