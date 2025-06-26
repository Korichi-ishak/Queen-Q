import { useState, useEffect } from 'react';

interface SpotsData {
  left: number;
}

export const useSpotsLeft = () => {
  const [spotsLeft, setSpotsLeft] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpotsLeft = async () => {
      try {
        const response = await fetch('/api/spots.json');
        if (!response.ok) {
          throw new Error('Failed to fetch spots data');
        }
        const data: SpotsData = await response.json();
        setSpotsLeft(data.left);
      } catch (err) {
        console.error('Error fetching spots left:', err);
        setError('Failed to load spots data');
        // Fallback value in case of error
        setSpotsLeft(500);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpotsLeft();
  }, []);

  return { spotsLeft, isLoading, error };
}; 