import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export const Layout: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  // Détecter le scroll pour changer l'apparence du header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-royal-purple/90 backdrop-blur-md py-3 shadow-lg shadow-black/20' 
            : 'bg-gradient-to-b from-black/70 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link 
              to="/" 
              className="group relative flex items-center"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-imperial-gold/20 via-imperial-gold/40 to-imperial-gold/20 rounded-lg blur-md opacity-70 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative flex items-center">
                {/* Couronne SVG personnalisée */}
                <svg width="28" height="28" viewBox="0 0 24 24" className="mr-2 text-imperial-gold" fill="currentColor">
                  <path d="M12,1L8,5H3L5,9L3,13H8L12,17L16,13H21L19,9L21,5H16L12,1M12,3.441L14.4,5.841H17.241L16.241,8.241L17.241,10.641H14.4L12,13.041L9.6,10.641H6.759L7.759,8.241L6.759,5.841H9.6L12,3.441Z" />
                </svg>
                <span className="font-playfair font-bold text-xl bg-gradient-to-r from-imperial-gold via-rose-champagne to-imperial-gold bg-clip-text text-transparent">
                  Queen de Q
                </span>
              </div>
            </Link>

            {/* Navigation - Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <nav>
                <ul className="flex space-x-8">
                  <li>
                    <Link 
                      to="/" 
                      className={`relative px-2 py-1 font-medium ${
                        location.pathname === '/' 
                          ? 'text-imperial-gold' 
                          : 'text-rose-champagne hover:text-imperial-gold'
                      } transition-colors`}
                    >
                      <span className="relative z-10">{t.header.home}</span>
                      {location.pathname === '/' && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-imperial-gold"></span>
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/cards" 
                      className={`relative px-2 py-1 font-medium ${
                        location.pathname === '/cards' 
                          ? 'text-imperial-gold' 
                          : 'text-rose-champagne hover:text-imperial-gold'
                      } transition-colors`}
                    >
                      <span className="relative z-10">{t.header.cards}</span>
                      {location.pathname === '/cards' && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-imperial-gold"></span>
                      )}
                    </Link>
                  </li>
                </ul>
              </nav>
              
              {/* Language Switcher */}
              <LanguageSwitcher />
            </div>

            {/* Menu hamburger - Mobile */}
            <div className="md:hidden flex items-center space-x-4">
              <LanguageSwitcher />
              
              <button 
                className="flex flex-col justify-center items-center w-10 h-10 rounded-full border border-imperial-gold/30 focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
              >
                <span className={`block w-5 h-0.5 bg-imperial-gold transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-imperial-gold mt-1 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-imperial-gold mt-1 transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        <div 
          className={`md:hidden absolute top-full left-0 right-0 bg-royal-purple/95 backdrop-blur-md shadow-lg shadow-black/20 transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-60 py-4' : 'max-h-0'
          }`}
        >
          <nav className="max-w-7xl mx-auto px-4 sm:px-6">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link 
                  to="/" 
                  className={`block px-4 py-2 rounded-lg ${
                    location.pathname === '/' 
                      ? 'bg-imperial-gold/20 text-imperial-gold' 
                      : 'text-rose-champagne hover:bg-imperial-gold/10 hover:text-imperial-gold'
                  } transition-colors`}
                >
                  {t.header.home}
                </Link>
              </li>
              <li>
                <Link 
                  to="/cards" 
                  className={`block px-4 py-2 rounded-lg ${
                    location.pathname === '/cards' 
                      ? 'bg-imperial-gold/20 text-imperial-gold' 
                      : 'text-rose-champagne hover:bg-imperial-gold/10 hover:text-imperial-gold'
                  } transition-colors`}
                >
                  {t.header.cards}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="pt-24">
        <Outlet />
      </main>

      <footer className="relative py-16 bg-gradient-to-b from-royal-purple to-black overflow-hidden">
        {/* Particules dorées décoratives */}
        <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-1 h-1 rounded-full bg-imperial-gold animate-pulse-slow"></div>
          <div className="absolute top-8 left-1/3 w-1.5 h-1.5 rounded-full bg-imperial-gold/70 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-12 left-2/3 w-1 h-1 rounded-full bg-imperial-gold/80 animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-4 left-3/4 w-2 h-2 rounded-full bg-imperial-gold/60 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-16 left-1/5 w-1 h-1 rounded-full bg-imperial-gold/70 animate-pulse-slow" style={{ animationDelay: '0.8s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Colonne 1 - Logo et description */}
            <div className="flex flex-col items-center md:items-start">
              <Link to="/" className="group relative inline-flex items-center mb-4">
                <div className="absolute -inset-2 bg-gradient-to-r from-imperial-gold/20 via-imperial-gold/40 to-imperial-gold/20 rounded-lg blur-md opacity-70 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative flex items-center">
                  {/* Couronne SVG personnalisée plus grande */}
                  <svg width="36" height="36" viewBox="0 0 24 24" className="mr-2 text-imperial-gold" fill="currentColor">
                    <path d="M12,1L8,5H3L5,9L3,13H8L12,17L16,13H21L19,9L21,5H16L12,1M12,3.441L14.4,5.841H17.241L16.241,8.241L17.241,10.641H14.4L12,13.041L9.6,10.641H6.759L7.759,8.241L6.759,5.841H9.6L12,3.441Z" />
                    <path d="M12,15C10.89,15 10,15.89 10,17V20H14V17C14,15.89 13.11,15 12,15Z" />
                  </svg>
                  <span className="font-playfair font-bold text-2xl bg-gradient-to-r from-imperial-gold via-rose-champagne to-imperial-gold bg-clip-text text-transparent">
                    Queen de Q
                  </span>
                </div>
              </Link>
              <p className="text-rose-champagne/70 text-center md:text-left">
                {t.footer.description}
              </p>
            </div>

            {/* Colonne 2 - Navigation */}
            <div>
              <h3 className="font-playfair font-bold text-imperial-gold mb-4 text-center md:text-left">{t.footer.navigation}</h3>
              <ul className="flex flex-col space-y-2">
                <li>
                  <Link to="/" className="text-rose-champagne hover:text-imperial-gold transition-colors flex items-center justify-center md:justify-start">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </svg>
                    {t.header.home}
                  </Link>
                </li>
                <li>
                  <Link to="/cards" className="text-rose-champagne hover:text-imperial-gold transition-colors flex items-center justify-center md:justify-start">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21.47,4.35L20.13,3.79V12.82L22.56,6.96C22.97,5.94 22.5,4.77 21.47,4.35M1.97,8.05L6.93,20C7.24,20.77 7.97,21.24 8.74,21.26C9,21.26 9.27,21.21 9.53,21.1L16.9,18.05C17.65,17.74 18.11,17 18.13,16.26C18.14,16 18.09,15.71 18,15.45L13,3.5C12.71,2.73 11.97,2.26 11.19,2.25C10.93,2.25 10.67,2.31 10.42,2.4L3.06,5.45C2.04,5.87 1.55,7.04 1.97,8.05M18.12,4.25A2,2 0 0,0 16.12,2.25H14.67L18.12,10.59" />
                    </svg>
                    {t.header.cards}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Colonne 3 - Liens légaux */}
            <div>
              <h3 className="font-playfair font-bold text-imperial-gold mb-4 text-center md:text-left">{t.footer.legal}</h3>
              <ul className="flex flex-col space-y-2">
                <li>
                  <a href="#" className="text-rose-champagne hover:text-imperial-gold transition-colors flex items-center justify-center md:justify-start">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14,10H19.5L14,4.5V10M5,3H15L21,9V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3M5,5V19H19V12H12V5H5Z" />
                    </svg>
                    {t.footer.terms}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-rose-champagne hover:text-imperial-gold transition-colors flex items-center justify-center md:justify-start">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
                    </svg>
                    {t.footer.privacy}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-rose-champagne hover:text-imperial-gold transition-colors flex items-center justify-center md:justify-start">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
                    </svg>
                    {t.footer.contact}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Séparateur décoratif */}
          <div className="relative h-px w-full mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-imperial-gold/50 to-transparent"></div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-rose-champagne/50 mb-4 md:mb-0">
              © {new Date().getFullYear()} Queen de Q. {t.footer.copyright}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-rose-champagne/70 hover:text-imperial-gold transition-colors" aria-label="Instagram">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                </svg>
              </a>
              <a href="#" className="text-rose-champagne/70 hover:text-imperial-gold transition-colors" aria-label="Facebook">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                </svg>
              </a>
              <a href="#" className="text-rose-champagne/70 hover:text-imperial-gold transition-colors" aria-label="Twitter">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}; 