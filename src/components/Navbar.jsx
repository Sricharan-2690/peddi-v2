import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Story', path: '/#story' },
    { name: 'Cast & Crew', path: '/cast' },
    { name: 'Music', path: '/music' },
    { name: 'Updates', path: '/updates' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Tickets', path: '/tickets' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 h-[72px] transition-all duration-300 ${scrolled ? 'bg-p-black/95 backdrop-blur-md border-b border-p-gold/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Left: Logo */}
          <Link to="/" className="font-cinzel text-2xl text-p-gold select-none flex-shrink-0" style={{ textShadow: '0 0 20px rgba(212,175,55,0.35)' }}>
            PEDDI
          </Link>

          {/* Center: Desktop Nav */}
          <div className="hidden md:flex items-center justify-center gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path === '/' && location.pathname === '');
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-oswald text-xs tracking-widest transition-colors duration-200 ${isActive ? 'text-p-gold border-b border-p-gold pb-0.5' : 'text-p-muted hover:text-p-gold'}`}
                >
                  {link.name.toUpperCase()}
                </Link>
              );
            })}
          </div>

          {/* Right: CTA Button */}
          <div className="hidden md:block">
            <Link to="/tickets" className="shimmer-btn bg-p-gold text-p-black font-oswald font-bold text-xs tracking-widest px-6 py-2.5 rounded-full hover:bg-p-goldlt hover:scale-105 active:scale-95 transition-all duration-200 inline-block">
              BOOK TICKETS
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <button className="md:hidden text-p-gold focus:outline-none" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-p-black/98 flex flex-col items-center justify-center">
          <button className="absolute top-6 right-6 text-p-gold focus:outline-none" onClick={() => setMobileMenuOpen(false)}>
            <X size={28} />
          </button>
          
          <div className="flex flex-col items-center gap-8 w-full px-6">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="font-cinzel text-3xl text-p-gold animate-fade-up text-center w-full"
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
              >
                {link.name.toUpperCase()}
              </Link>
            ))}
            <Link 
              to="/tickets" 
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 shimmer-btn bg-p-gold text-p-black font-oswald font-bold text-lg tracking-widest px-8 py-3 rounded-full animate-fade-up text-center"
              style={{ animationDelay: `${navLinks.length * 100}ms`, animationFillMode: 'both' }}
            >
              BOOK TICKETS
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
