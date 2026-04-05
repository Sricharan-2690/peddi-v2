import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Instagram = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const XTwitter = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="hero-bg border-t border-[#FF9D00]/20 w-full relative z-30">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
          {/* Left — same gradient as Navbar */}
          <Link to="/" className="flex items-center hover:scale-105 transition-all duration-300 flex-shrink-0">
            <img 
              src="/images/title card in all langueges/English Title.png" 
              alt="PEDDI" 
              className="h-8 md:h-10 object-contain drop-shadow-[0_0_15px_rgba(255,157,0,0.3)]" 
            />
          </Link>
          
          {/* Center */}
          <div className="flex gap-6 flex-wrap justify-center font-inter font-bold text-xs text-p-muted tracking-widest uppercase">
            <Link to="/" className="hover:text-p-gold transition-colors duration-200">{t('footer.home')}</Link>
            <Link to="/cast" className="hover:text-p-gold transition-colors duration-200">{t('footer.castCrew')}</Link>
            <Link to="/updates" className="hover:text-p-gold transition-colors duration-200">{t('footer.updates')}</Link>
            <Link to="/gallery" className="hover:text-p-gold transition-colors duration-200">{t('footer.gallery')}</Link>
          </div>
          
          {/* Right */}
          <div className="flex gap-6 flex-shrink-0">
            <a href="https://www.instagram.com/peddimovie?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="text-p-muted hover:text-p-gold transition-colors duration-200">
              <Instagram size={20} />
            </a>
            <a href="https://x.com/PeddiMovieOffl?s=20" target="_blank" rel="noreferrer" className="text-p-muted hover:text-p-gold transition-colors duration-200">
              <XTwitter size={20} />
            </a>
          </div>
        </div>
        
        {/* Orange divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-p-gold/40 to-transparent my-10" />
        
        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-inter text-xs text-p-muted/50 text-center md:text-left">
          <p>{t('footer.copyright')}</p>
          <p>{t('footer.presented')}</p>
        </div>
      </div>
    </footer>
  );
}
