import { useState, useEffect, useRef } from 'react';

export const useDashAnimation = (interval: number = 50): number => {
  const [dashOffset, setDashOffset] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setDashOffset((prev) => (prev + 1) % 20);
    }, interval);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [interval]);

  return dashOffset;
};