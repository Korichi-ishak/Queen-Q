import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { LiveTeaBanner } from '../components/LiveTeaBanner';
import { useTranslation } from '../context/TranslationContext';

export const Layout: React.FC = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
            ? 'bg-gradient-to-b from-black/40 via-royal-purple/30 to-transparent backdrop-blur-md py-2 shadow-lg shadow-black/10' 
            : 'bg-gradient-to-b from-black/20 via-royal-purple/10 to-transparent py-3'
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
                <svg width="24" height="24" viewBox="0 0 24 24" className="mr-2 text-imperial-gold" fill="currentColor">
                  <path d="M12,1L8,5H3L5,9L3,13H8L12,17L16,13H21L19,9L21,5H16L12,1M12,3.441L14.4,5.841H17.241L16.241,8.241L17.241,10.641H14.4L12,13.041L9.6,10.641H6.759L7.759,8.241L6.759,5.841H9.6L12,3.441Z" />
                </svg>
                <span className="font-playfair font-bold text-lg bg-gradient-to-r from-imperial-gold via-rose-champagne to-imperial-gold bg-clip-text text-transparent">
                  Queen de Q
                </span>
              </div>
            </Link>

            {/* Navigation - Desktop */}
            <div className="hidden md:flex items-center space-x-6">
              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <Link 
                      to="/" 
                      className={`relative px-2 py-1 font-medium ${
                        location.pathname === '/' 
                          ? 'text-imperial-gold' 
                          : 'text-rose-champagne hover:text-imperial-gold'
                      } transition-colors`}
                    >
                      <span className="relative z-10">{t('nav.home')}</span>
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
                      <span className="relative z-10">{t('nav.cards')}</span>
                      {location.pathname === '/cards' && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-imperial-gold"></span>
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/application" 
                      className={`relative px-2 py-1 font-medium ${
                        location.pathname === '/application' 
                          ? 'text-imperial-gold' 
                          : 'text-rose-champagne hover:text-imperial-gold'
                      } transition-colors`}
                    >
                      <span className="relative z-10">L'Application</span>
                      {location.pathname === '/application' && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-imperial-gold"></span>
                      )}
                    </Link>
                  </li>
                  {/* DISABLED PAGES - Quiz, Chat, Journal, Shop */}
                  {/* <li>
                    <Link 
                      to="/quiz" 
                      className={`relative px-2 py-1 font-medium ${
                        location.pathname === '/quiz' 
                          ? 'text-imperial-gold' 
                          : 'text-rose-champagne hover:text-imperial-gold'
                      } transition-colors`}
                    >
                      <span className="relative z-10">{t('nav.quiz')}</span>
                      {location.pathname === '/quiz' && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-imperial-gold"></span>
                      )}
                    </Link>
                  </li> */}
                  {/* <li>
                    <Link 
                      to="/chat" 
                      className={`relative px-2 py-1 font-medium ${
                        location.pathname === '/chat' 
                          ? 'text-imperial-gold' 
                          : 'text-rose-champagne hover:text-imperial-gold'
                      } transition-colors`}
                    >
                      <span className="relative z-10">{t('nav.chat')}</span>
                      {location.pathname === '/chat' && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-imperial-gold"></span>
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/journal" 
                      className={`relative px-2 py-1 font-medium ${
                        location.pathname === '/journal' 
                          ? 'text-imperial-gold' 
                          : 'text-rose-champagne hover:text-imperial-gold'
                      } transition-colors`}
                    >
                      <span className="relative z-10">{t('nav.journal')}</span>
                      {location.pathname === '/journal' && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-imperial-gold"></span>
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/shop" 
                      className={`relative px-2 py-1 font-medium ${
                        location.pathname === '/shop' 
                          ? 'text-imperial-gold' 
                          : 'text-rose-champagne hover:text-imperial-gold'
                      } transition-colors`}
                    >
                      <span className="relative z-10">{t('nav.shop')}</span>
                      {location.pathname === '/shop' && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-imperial-gold"></span>
                      )}
                    </Link>
                  </li> */}
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
                aria-label={t('accessibility.menu')}
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
          className={`md:hidden absolute top-full left-0 right-0 bg-black/60 backdrop-blur-md shadow-lg shadow-black/20 transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-80 py-4' : 'max-h-0'
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
                  {t('nav.home')}
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
                  {t('nav.cards')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/application" 
                  className={`block px-4 py-2 rounded-lg ${
                    location.pathname === '/application' 
                      ? 'bg-imperial-gold/20 text-imperial-gold' 
                      : 'text-rose-champagne hover:bg-imperial-gold/10 hover:text-imperial-gold'
                  } transition-colors`}
                >
                  L'Application
                </Link>
              </li>
              {/* DISABLED PAGES - Quiz, Chat, Journal, Shop */}
              {/* <li>
                <Link 
                  to="/quiz" 
                  className={`block px-4 py-2 rounded-lg ${
                    location.pathname === '/quiz' 
                      ? 'bg-imperial-gold/20 text-imperial-gold' 
                      : 'text-rose-champagne hover:bg-imperial-gold/10 hover:text-imperial-gold'
                  } transition-colors`}
                >
                  {t('nav.quiz')}
                </Link>
              </li> */}
              {/* <li>
                <Link 
                  to="/chat" 
                  className={`block px-4 py-2 rounded-lg ${
                    location.pathname === '/chat' 
                      ? 'bg-imperial-gold/20 text-imperial-gold' 
                      : 'text-rose-champagne hover:bg-imperial-gold/10 hover:text-imperial-gold'
                  } transition-colors`}
                >
                  {t('nav.chat')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/journal" 
                  className={`block px-4 py-2 rounded-lg ${
                    location.pathname === '/journal' 
                      ? 'bg-imperial-gold/20 text-imperial-gold' 
                      : 'text-rose-champagne hover:bg-imperial-gold/10 hover:text-imperial-gold'
                  } transition-colors`}
                >
                  {t('nav.journal')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/shop" 
                  className={`block px-4 py-2 rounded-lg ${
                    location.pathname === '/shop' 
                      ? 'bg-imperial-gold/20 text-imperial-gold' 
                      : 'text-rose-champagne hover:bg-imperial-gold/10 hover:text-imperial-gold'
                  } transition-colors`}
                >
                  {t('nav.shop')}
                </Link>
              </li> */}
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <LiveTeaBanner />

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
                {t('footer.description')}
              </p>
            </div>

            {/* Colonne 2 - Navigation */}
            <div>
              <h3 className="font-playfair font-bold text-imperial-gold mb-4 text-center md:text-left">{t('footer.navigation')}</h3>
              <ul className="flex flex-col space-y-2">
                <li>
                  <Link to="/" className="text-rose-champagne hover:text-imperial-gold transition-colors flex items-center justify-center md:justify-start">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </svg>
                    {t('nav.home')}
                  </Link>
                </li>
                <li>
                  <Link to="/cards" className="text-rose-champagne hover:text-imperial-gold transition-colors flex items-center justify-center md:justify-start">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {t('nav.cards')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Colonne 3 - Contact */}
            <div>
              <h3 className="font-playfair font-bold text-imperial-gold mb-4 text-center md:text-left">{t('links.contact')}</h3>
              <div className="flex flex-col space-y-2">
                <a href={`mailto:${t('contact.email')}`} className="text-rose-champagne hover:text-imperial-gold transition-colors flex items-center justify-center md:justify-start">
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  {t('contact.email')}
                </a>
              </div>
            </div>
          </div>

          {/* Séparateur */}
          <div className="border-t border-imperial-gold/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-rose-champagne/60 text-sm">
                {t('footer.copyright')}
              </p>
              <div className="flex space-x-6">
                <Link to="/privacy" className="text-rose-champagne/60 hover:text-imperial-gold text-sm transition-colors">
                  {t('links.privacy')}
                </Link>
                <Link to="/terms" className="text-rose-champagne/60 hover:text-imperial-gold text-sm transition-colors">
                  {t('links.terms')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}; 