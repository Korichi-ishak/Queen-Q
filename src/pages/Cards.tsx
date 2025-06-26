import React from 'react';
import { CardGrid } from '../components/CardGrid';
import { SmoothScroll } from '../components/SmoothScroll';

export const Cards: React.FC = () => {
  return (
    <SmoothScroll>
      <CardGrid />
    </SmoothScroll>
  );
}; 