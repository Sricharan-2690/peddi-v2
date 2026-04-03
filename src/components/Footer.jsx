import React from 'react';
import { Link } from 'react-router-dom';

const Instagram = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const Twitter = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;
const Youtube = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>;

export default function Footer() {
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
            <Link to="/" className="hover:text-p-gold transition-colors duration-200">HOME</Link>
            <Link to="/cast" className="hover:text-p-gold transition-colors duration-200">CAST & CREW</Link>
            <Link to="/music" className="hover:text-p-gold transition-colors duration-200">MUSIC</Link>
            <Link to="/updates" className="hover:text-p-gold transition-colors duration-200">UPDATES</Link>
            <Link to="/gallery" className="hover:text-p-gold transition-colors duration-200">GALLERY</Link>
          </div>
          
          {/* Right */}
          <div className="flex gap-6 flex-shrink-0">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-p-muted hover:text-p-gold transition-colors duration-200">
              <Instagram size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-p-muted hover:text-p-gold transition-colors duration-200">
              <Twitter size={20} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-p-muted hover:text-p-gold transition-colors duration-200">
              <Youtube size={20} />
            </a>
          </div>
        </div>
        
        {/* Orange divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-p-gold/40 to-transparent my-10" />
        
        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-inter text-xs text-p-muted/50 text-center md:text-left">
          <p>© 2026 Mythri Movie Makers. All rights reserved.</p>
          <p>Presented by Sukumar Writings · Vriddhi Cinemas</p>
        </div>
      </div>
    </footer>
  );
}
