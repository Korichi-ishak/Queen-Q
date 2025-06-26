import React from 'react';
import { Hero } from './layout/Hero';
import { SmoothScroll } from './components/SmoothScroll';

function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen">
        <Hero />
      </div>
    </SmoothScroll>
  );
}

export default App;
