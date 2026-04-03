import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import translations from '../data/translations';

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

export const LANGUAGES = [
  { code: 'en', name: 'English',   native: 'English',   flag: '🇬🇧' },
  { code: 'te', name: 'Telugu',    native: 'తెలుగు',    flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi',     native: 'हिंदी',      flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada',   native: 'ಕನ್ನಡ',    flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം',   flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil',     native: 'தமிழ்',     flag: '🇮🇳' },
];

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try { return localStorage.getItem('peddi-language') || 'en'; }
    catch { return 'en'; }
  });

  useEffect(() => {
    try { localStorage.setItem('peddi-language', language); } catch {}
  }, [language]);

  const t = useCallback((key) => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language] || entry['en'] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
