import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Ticket, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isLight = theme === 'light';

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'UPDATES', path: '/updates' },
    { name: 'GALLERY', path: '/gallery' },
    { name: 'CAST', path: '/cast' },
    { name: 'RECORDS', path: '/analytics' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [mobileMenuOpen]);

  // Navbar background logic
  const navBg = (() => {
    if (location.pathname !== '/') {
      return isLight
        ? 'bg-[#FDFAF6] border-b border-[#7A4A10]/15 shadow-[0_2px_20px_rgba(40,20,5,0.07)]'
        : 'bg-[#0A0A0A] border-b border-[#FF9D00]/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]';
    }
    if (scrolled) {
      return isLight
        ? 'bg-[#FDFAF6]/96 border-b border-[#7A4A10]/15 backdrop-blur-md transition-colors duration-200'
        : 'bg-[#0A0A0A] border-b border-[#FF9D00]/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-colors duration-200';
    }
    return 'bg-transparent border-b border-white/0 transition-colors duration-200';
  })();

  const linkBase = isLight ? 'text-[#5A3010] hover:text-[#7A4A10]' : 'text-zinc-400 hover:text-[#FF9D00]';
  const linkActive = isLight ? 'text-[#7A4A10] border-b-2 border-[#7A4A10] pb-1' : 'text-[#FF9D00] border-b-2 border-[#FF9D00] pb-1';
  const hamburgerColor = isLight ? 'text-[#7A4A10]' : 'text-[#FF9D00] drop-shadow-[0_0_8px_rgba(255,157,0,0.5)]';
  const toggleColor = isLight ? 'text-[#7A4A10] hover:bg-[#7A4A10]/8' : 'text-[#FF9D00] hover:bg-[#FF9D00]/10 drop-shadow-[0_0_6px_rgba(255,157,0,0.4)]';
  const mobileBg = isLight ? 'bg-[#FDFAF6]' : 'bg-[#0A0A0A]';
  const mobileLinkBase = isLight ? 'text-[#5A3010] hover:text-[#7A4A10]' : 'text-white/70 hover:text-[#FF9D00]';
  const mobileLinkActive = isLight ? 'text-[#7A4A10] font-medium' : 'text-[#FF9D00] font-medium drop-shadow-[0_0_10px_rgba(255,157,0,0.4)]';

  return (
    <>
      {/* Desktop & Mobile Top Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-40 h-[64px] md:h-[80px] flex items-center ${navBg}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between w-full">
          
          {/* Logo */}
          <Link to="/" className="flex items-center hover:brightness-125 transition-all">
             <img src="/images/title card in all langueges/English Title.png" alt="PEDDI" className="h-6 md:h-8 object-contain drop-shadow-[0_0_12px_rgba(255,157,0,0.4)]" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path === '/' && location.pathname === '');
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-inter text-xs font-bold tracking-[0.1em] uppercase transition-colors duration-300 ${
                    isActive ? linkActive : linkBase
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Actions & Mobile Toggle */}
          <div className="flex items-center gap-3 md:gap-4">
            <Link to="/tickets" className="hidden md:flex items-center gap-2 hero-btn-primary px-6 py-2.5 rounded-full text-xs">
              <Ticket size={14} /> TICKETS
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none ${toggleColor}`}
              aria-label="Toggle theme"
            >
              {isLight ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            <button 
              className={`lg:hidden focus:outline-none hover:scale-110 transition-transform ${hamburgerColor}`} 
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>
 
      {/* Global Full-Screen Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 transition-all duration-700 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
         {/* Solid backdrop */}
         <div className={`absolute inset-0 ${mobileBg} backdrop-blur-3xl`} onClick={() => setMobileMenuOpen(false)}></div>
         
         {/* Cinematic Full-Screen Menu */}
         <div className={`absolute inset-0 p-6 flex flex-col items-center justify-center transition-all duration-700 transform ${mobileMenuOpen ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-10 scale-110 opacity-0'} z-10`}>
            
            <button onClick={() => setMobileMenuOpen(false)} className={`absolute top-6 right-6 lg:hidden p-2 rounded-full transition-colors ${isLight ? 'text-[#A06C10] hover:bg-[#C8922A]/10' : 'text-[#FF9D00] hover:bg-[#FF9D00]/5 drop-shadow-[0_0_10px_rgba(255,157,0,0.4)]'}`}>
              <X size={36} />
            </button>
            
            <div className="flex flex-col gap-8 lg:hidden font-inter font-light uppercase tracking-[0.3em] text-lg sm:text-xl text-center w-full max-w-sm">
               {navLinks.map((link) => {
                 const isActive = location.pathname === link.path || (link.path === '/' && location.pathname === '');
                 return (
                   <Link 
                     key={link.name}
                     to={link.path} 
                     onClick={() => setMobileMenuOpen(false)} 
                     className={`transition-colors duration-500 py-2 relative group ${isActive ? mobileLinkActive : mobileLinkBase}`}
                   >
                     <span className="relative z-10">{link.name}</span>
                   </Link>
                 );
               })}
               
               {/* Mobile CTA */}
                <Link 
                  to="/tickets" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="mt-6 mx-auto hero-btn-primary flex items-center justify-center gap-2 px-10 py-5 rounded-full text-sm w-full"
                >
                  <Ticket size={20} /> BOOK TICKETS
                </Link>
            </div>
         </div>
      </div>
    </>
  );
}
