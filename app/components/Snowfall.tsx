'use client';

import React, { useEffect, useState } from 'react';

const Snowfall = () => {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: string; animationDuration: string; animationDelay: string; size: string }>>([]);

  useEffect(() => {
    // Calculate base size based on screen width
    const getBaseSize = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        if (width < 640) return { min: 0.1, max: 0.3 }; // Mobile: 0.1-0.3rem
        if (width < 1024) return { min: 0.15, max: 0.4 }; // Tablet: 0.15-0.4rem
        return { min: 0.2, max: 0.7 }; // Desktop: 0.2-0.7rem (original)
      }
      return { min: 0.2, max: 0.7 }; // Default
    };

    const generateSnowflakes = () => {
      const baseSize = getBaseSize();
      const flakes = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        animationDelay: `${Math.random() * 2}s`,
        size: `${Math.random() * (baseSize.max - baseSize.min) + baseSize.min}rem`,
      }));
      setSnowflakes(flakes);
    };

    generateSnowflakes();

    // Optional: Regenerate on resize (debounced)
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(generateSnowflakes, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute top-[-10%] bg-sky-300 rounded-full opacity-80 animate-snowfall"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            animationDuration: flake.animationDuration,
            animationDelay: flake.animationDelay,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes snowfall {
          0% {
            transform: translateY(0) translateX(0);
          }
          100% {
            transform: translateY(110vh) translateX(20px);
          }
        }
        .animate-snowfall {
          animation-name: snowfall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};

export default Snowfall;
