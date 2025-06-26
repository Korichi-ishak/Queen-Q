import React from 'react';
import { Hero } from './layout/Hero';
import { SmoothScroll } from './components/SmoothScroll';

function App() {
  return (
    <SmoothScroll>
      <Hero />
    </SmoothScroll>
  );
}

export default App;
