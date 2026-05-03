'use client'

import React from 'react';
import { Users } from 'lucide-react';
import Image from 'next/image';
import Cube3D from './Cube3D';
import Link from 'next/link';

const Hero = () => {
  return (
    <section
      id="home"
      className="bg-white dark:bg-gray-900 py-16 lg:py-20 relative overflow-hidden transition-colors duration-500 grid-bg"
    >
      <PixelCouch />
      <PixelLaptop />

      <div className="absolute top-10 right-10 hidden md:flex gap-2">
        {['bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500'].map((c) => (
          <div key={c} className={`w-6 h-6 ${c} pixelated-border`} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section tag — matches Blogs section style */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs font-bold tracking-[0.2em] text-red-600 dark:text-red-400">
            [OPEN SOURCE COMMUNITY]
          </span>
          <span className="h-px flex-1 max-w-xs bg-black/20 dark:bg-white/20" />
          <span className="font-mono text-xs font-bold tracking-[0.2em] text-black dark:text-white">
            PICT · PUNE
          </span>
        </div>

        {/* Main content: text + cube */}
        <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-8 lg:gap-16 mb-4">

          {/* Text */}
          <div className="lg:w-1/2 flex-shrink-0 text-center lg:text-left">
            <div className="mb-6 flex justify-center lg:justify-start">
              <Image
                src="/logo-Picsart-BackgroundRemover.png"
                alt="PICT OSS Community Logo"
                width={400}
                height={300}
                className="w-auto h-auto max-w-[140px] sm:max-w-[170px] md:max-w-[200px] lg:max-w-[230px] xl:max-w-[270px] dark:hidden"
                priority
              />
              <Image
                src="/dark-logo-Picsart-BackgroundRemover(1).png"
                alt="PICT OSS Community Logo"
                width={400}
                height={300}
                className="w-auto h-auto max-w-[140px] sm:max-w-[170px] md:max-w-[200px] lg:max-w-[230px] xl:max-w-[270px] hidden dark:block"
                priority
              />
            </div>

            <p className="text-base sm:text-lg lg:text-xl font-mono text-gray-700 dark:text-gray-100 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              A student-led open-source community of{' '}
              <span className="bg-yellow-500 text-black px-1 font-bold">850+</span>{' '}
              developers, Linux enthusiasts & tech builders at Pune Institute of Computer Technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <Link href="https://whatsapp.com/channel/0029VbClPP2LCoX0UjNkKt0f">
                <CTAButton color="red" size="large">
                  <Users size={20} />
                  JOIN COMMUNITY
                </CTAButton>
              </Link>
              <Link href="/wrapped">
                <CTAButton color="blue" size="large">
                  VIEW WRAPPED 2025!
                </CTAButton>
              </Link>
            </div>
          </div>

          {/* 3D Cube */}
          <div className="lg:flex lg:w-1/2 items-center justify-center mt-8 lg:mt-0 scale-60 md:scale-75 lg:scale-100">
            <div className="relative transform scale-125 mt-4 w-fit">
              <div className="relative p-4 lg:p-6 w-fit">
                <div className="relative z-10">
                  <Cube3D />
                  <p className="text-center mt-3 font-mono text-xs text-gray-600 dark:text-gray-400 leading-tight">
                    Hover & Click to explore<br />
                    <span className="font-bold">54 open source projects</span>
                  </p>
                </div>
              </div>

              <div className="absolute top-0 right-0 w-4 h-4 bg-blue-500 pixelated-border animate-pulse" />
              <div className="absolute bottom-0 left-0 w-4 h-4 bg-red-500 pixelated-border animate-pulse" />
              <div className="absolute top-1/2 left-1 w-3 h-3 bg-green-500 pixelated-border opacity-60" />
              <div className="absolute top-1/4 right-1 w-3 h-3 bg-yellow-500 pixelated-border opacity-60" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

type PixelColor = 'red' | 'blue' | 'green' | 'yellow';

const CTAButton = ({
  children,
  color,
  size = 'medium',
  className = '',
}: {
  children: React.ReactNode;
  color: PixelColor;
  size?: 'medium' | 'large';
  className?: string;
}) => {
  const colorClasses: Record<PixelColor, string> = {
    red:    'bg-red-500    hover:bg-red-600    text-white border-red-700',
    blue:   'bg-blue-500   hover:bg-blue-600   text-white border-blue-700',
    green:  'bg-green-500  hover:bg-green-600  text-white border-green-700',
    yellow: 'bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-700',
  };

  const sizeClasses = {
    medium: 'px-4 py-2 text-lg',
    large:  'px-6 py-3 text-xl',
  };

  return (
    <button className={`
      ${colorClasses[color]}
      ${sizeClasses[size]}
      ${className}
      font-mono font-bold pixelated-border
      hover:scale-105 transition-all duration-200
      flex items-center gap-2 justify-center
      cursor-pointer
    `}>
      {children}
    </button>
  );
};


function PixelCouch() {
  const rows: (string | null)[][] = [
    [null, 'g3', 'g3', 'g3', 'g3', 'g3', 'g3', 'g3', null],
    ['g4', 'g3', 'g3', 'g3', 'g3', 'g3', 'g3', 'g3', 'g4'],
    ['g4', 'g4', null, 'g2', 'g2', 'g2', null, 'g4', 'g4'],
    ['g4', 'g3', 'g3', 'g2', 'g2', 'g2', 'g3', 'g3', 'g4'],
    [null, 'g3', 'g3', 'g3', 'g3', 'g3', 'g3', 'g3', null],
    [null, 'g4', null, null, null, null, null, 'g4', null],
  ];
  const colorMap: Record<string, string> = {
    g2: 'bg-gray-200 dark:bg-gray-600',
    g3: 'bg-gray-300 dark:bg-gray-500',
    g4: 'bg-gray-400 dark:bg-gray-400',
  };
  return (
    <div className="absolute bottom-10 right-10 hidden lg:block opacity-30">
      <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(9, 14px)' }}>
        {rows.map((row, ri) =>
          row.map((cell, ci) =>
            cell ? (
              <div key={`${ri}-${ci}`} className={`w-3.5 h-3.5 ${colorMap[cell]}`} />
            ) : (
              <div key={`${ri}-${ci}`} className="w-3.5 h-3.5" />
            )
          )
        )}
      </div>
    </div>
  );
}

function PixelLaptop() {
  const rows: (string | null)[][] = [
    [null, 'g4', 'g4', 'g4', 'g4', 'g4', 'g4', 'g4', null],
    [null, 'g4', 'g2', 'g2', 'g2', 'g2', 'g2', 'g4', null],
    [null, 'g4', 'g2', 'r5', 'g2', 'g2', 'g2', 'g4', null],
    [null, 'g4', 'g2', 'g2', 'g2', 'g2', 'g2', 'g4', null],
    [null, 'g4', 'g4', 'g4', 'g4', 'g4', 'g4', 'g4', null],
    ['g4', 'g4', 'g4', 'g4', 'g4', 'g4', 'g4', 'g4', 'g4'],
  ];
  const colorMap: Record<string, string> = {
    g2: 'bg-gray-200 dark:bg-gray-600',
    g4: 'bg-gray-400 dark:bg-gray-500',
    r5: 'bg-red-500',
  };
  return (
    <div className="absolute top-20 right-10 hidden md:block opacity-30">
      <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(9, 12px)' }}>
        {rows.map((row, ri) =>
          row.map((cell, ci) =>
            cell ? (
              <div key={`${ri}-${ci}`} className={`w-3 h-3 ${colorMap[cell]}`} />
            ) : (
              <div key={`${ri}-${ci}`} className="w-3 h-3" />
            )
          )
        )}
      </div>
    </div>
  );
}

export default Hero;
