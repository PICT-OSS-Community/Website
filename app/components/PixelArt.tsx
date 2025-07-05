"use client";
import React from 'react'

const PixelArt = () => (
    <div className="grid grid-cols-8 gap-1 w-16 h-16">
      {Array.from({ length: 64 }).map((_, i) => {
        const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-gray-700'];
        const randomColor = Math.random() > 0.7 ? colors[Math.floor(Math.random() * colors.length)] : 'bg-gray-800';
        return (
          <div
            key={i}
            className={`w-1 h-1 ${randomColor} transition-colors duration-1000`}
            style={{
              animationDelay: `${i * 50}ms`
            }}
          ></div>
        );
      })}
    </div>
  );

export default PixelArt