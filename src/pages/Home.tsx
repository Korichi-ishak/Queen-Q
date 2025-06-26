import React from 'react';
import { Hero } from '../layout/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { Testimonials } from '../components/Testimonials';
import { FAQ } from '../components/FAQ';
import { SmoothScroll } from '../components/SmoothScroll';

export const Home: React.FC = () => {
  return (
    <SmoothScroll>
      <Hero />
      <HowItWorks />
      <Testimonials />
      <FAQ />
    </SmoothScroll>
  );
}; 