'use client';

import React, { useEffect, useState } from 'react';

const Snowfall = () => {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: string; animationDuration: string; animationDelay: string; size: string }>>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      animationDelay: `${Math.random() * 2}s`,
      size: `${Math.random() * 0.5 + 0.2}rem`,
    }));
    setSnowflakes(flakes);
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
