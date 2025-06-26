import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-royal-purple/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="text-imperial-gold font-playfair font-bold text-xl">
              Queen de Q
            </Link>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link to="/" className="text-rose-champagne hover:text-imperial-gold transition-colors">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link to="/cards" className="text-rose-champagne hover:text-imperial-gold transition-colors">
                    Les 54 Cartes
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="pt-16">
        <Outlet />
      </main>

      <footer className="py-12 bg-royal-purple text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-playfair font-bold text-imperial-gold mb-4">
              Queen de Q
            </h2>
            <p className="text-rose-champagne/70 max-w-md mx-auto">
              Discover your royal archetype and unlock your true potential
            </p>
          </div>
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="text-imperial-gold hover:text-rose-champagne transition-colors">
              Terms
            </a>
            <a href="#" className="text-imperial-gold hover:text-rose-champagne transition-colors">
              Privacy
            </a>
            <a href="#" className="text-imperial-gold hover:text-rose-champagne transition-colors">
              Contact
            </a>
          </div>
          <p className="text-sm text-rose-champagne/50">
            © {new Date().getFullYear()} Queen de Q. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}; 