import React from 'react';
import { Hero } from './layout/Hero';
import { SmoothScroll } from './components/SmoothScroll';

function App() {
  return (
    <SmoothScroll>
      <Hero />
      
      {/* Temporary content to test scroll effects */}
      <section className="min-h-screen bg-gradient-to-br from-imperial-gold to-rose-champagne flex items-center justify-center">
        <div className="text-center text-royal-purple">
          <h2 className="text-4xl font-playfair font-bold mb-4">Découvrez votre royaume</h2>
          <p className="text-xl">Les archétypes royaux vous attendent...</p>
        </div>
      </section>
      
      <section className="min-h-screen bg-gradient-to-br from-rose-champagne to-royal-purple flex items-center justify-center">
        <div className="text-center text-imperial-gold">
          <h2 className="text-4xl font-playfair font-bold mb-4">Votre destinée royale</h2>
          <p className="text-xl">Embrassez votre archétype authentique</p>
        </div>
      </section>
    </SmoothScroll>
  );
}

export default App;
