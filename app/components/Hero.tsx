'use client'

import React from 'react';
import { Code, Users, Zap, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Cube3D from './Cube3D';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

const Hero = () => {
  return (
    <section className="bg-white dark:bg-gray-800 py-16 lg:py-12 relative overflow-hidden transition-colors duration-500">
      {/* Decorative Clouds */}
      <div className="absolute top-10 left-10 opacity-20">
        <PixelCloud />
      </div>
      <div className="absolute top-20 right-10 opacity-20">
        <PixelCloud />
      </div>
      <div className="absolute bottom-20 left-1/4 opacity-20">
        <PixelCloud />
      </div>

      <ThemeToggle />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Content with Cube */}
        <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-8 lg:gap-16 mb-32">

          {/* Text Content - On Left */}
          <div className="lg:w-1/2 flex-shrink-0 text-center lg:text-left">
            <div className="mb-12 sm:mb-16 flex justify-center lg:justify-start lg:mt-12">
              <Image
                src="/logo.jpg"
                alt="PICT OSS Community Logo"
                width={400}
                height={300}
                className="w-auto h-auto 
                  max-w-[200px] 
                  sm:max-w-[250px] 
                  md:max-w-[300px] 
                  lg:max-w-[350px] 
                  xl:max-w-[450px] dark:hidden"
                priority
              />
              <Image
                src="/dark-logo.png"
                alt="PICT OSS Community Logo"
                width={400}
                height={300}
                className="w-auto h-auto 
                  max-w-[200px] 
                  sm:max-w-[250px] 
                  md:max-w-[300px] 
                  lg:max-w-[350px] 
                  xl:max-w-[450px] hidden dark:block"
                priority
              />
            </div>

            <p className="text-lg sm:text-xl lg:text-2xl font-mono text-gray-700 dark:text-gray-50 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              A student-led open-source community of devs, learners & curious minds at Pune Institute of Computer Technology
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <Link href="https://whatsapp.com/channel/0029VbClPP2LCoX0UjNkKt0f" >
                <CTAButton className="mr-2" color="red" size="large">
                  <Users size={20} />
                  JOIN COMMUNITY
                </CTAButton>
              </Link>
              <Link href="/wrapped">
                <CTAButton className="mr-2" color="red" size="large">
                
                  VIEW WRAPPED 2025!
                </CTAButton>
              </Link>
            </div>
          </div>

          {/* 3D Cube - Adjusted for mobile responsiveness */}
          <div className="lg:flex lg:w-1/2 items-center justify-center mt-32 lg:mt-0 scale-60 md:scale-75 lg:scale-100">
            <div className="relative transform scale-125 mt-12 w-fit">
              {/* Cube Container with proper bounds */}
              <div className="relative p-4 lg:p-6 w-fit">
                <div className="relative z-10">
                  <Cube3D />
                  <p className="text-center mt-3 font-mono text-xs text-gray-600 leading-tight">
                    Hover & Click to explore<br />
                    <span className="font-bold">54 open source projects</span>
                  </p>
                </div>
              </div>

              {/* Decorative Elements - Positioned safely within bounds */}
              <div className="absolute top-0 right-0 w-4 h-4 bg-blue-500 pixelated-border animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 bg-red-500 pixelated-border animate-pulse"></div>
              <div className="absolute top-1/2 left-1 w-3 h-3 bg-green-500 pixelated-border opacity-60"></div>
              <div className="absolute top-1/4 right-1 w-3 h-3 bg-yellow-500 pixelated-border opacity-60"></div>
            </div>
          </div>
        </div>

        {/* Feature Icons - Hidden initially */}
        <div className="hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <FeatureCard
            icon={<BookOpen size={40} />}
            title="FOSSIBLE"
            description="Our Medium publication sharing insights and stories from the open-source world"
            color="red"
          />
          <FeatureCard
            icon={<Zap size={40} />}
            title="SESSIONS"
            description="Regular workshops, talks, and learning sessions for the community"
            color="yellow"
          />
          <FeatureCard
            icon={<Code size={40} />}
            title="PROJECTS"
            description="Collaborative open-source projects built by our community members"
            color="blue"
          />
          <FeatureCard
            icon={<Users size={40} />}
            title="850+ MEMBERS"
            description="A thriving community of passionate developers and innovators"
            color="green"
          />
        </div>
      </div>
    </section>
  );
};

const CTAButton = ({
  children,
  color,
  size = 'medium',
  variant = 'solid',
  className = '',
}: {
  children: React.ReactNode;
  color: 'red' | 'blue' | 'green' | 'yellow';
  size?: 'medium' | 'large';
  variant?: 'solid' | 'outline';
  className?: string;
}) => {
  const colorClasses = {
    red: variant === 'solid'
      ? 'bg-red-500 hover:bg-red-600 text-white border-red-700'
      : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white',
    blue: variant === 'solid'
      ? 'bg-blue-500 hover:bg-blue-600 text-white border-blue-700'
      : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
    green: variant === 'solid'
      ? 'bg-green-500 hover:bg-green-600 text-white border-green-700'
      : 'border-green-500 text-green-500 hover:bg-green-500 hover:text-white',
    yellow: variant === 'solid'
      ? 'bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-700'
      : 'border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white'
  };

  const sizeClasses = {
    medium: 'px-4 py-2 text-lg',
    large: 'px-6 py-3 text-xl'
  };

  return (
    <button className={`
      ${colorClasses[color]} 
      ${sizeClasses[size]}
      ${className}
      font-mono font-bold pixelated-border 
      hover:scale-105 transition-all duration-200 
      flex items-center justify-center
      cursor-pointer
    `}>
      {children}
    </button>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
  color
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'red' | 'blue' | 'green' | 'yellow';
}) => {
  const colorClasses = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500'
  };

  return (
    <div className="text-center group">
      <div className={`
        ${colorClasses[color]} 
        text-white w-20 h-20 mx-auto mb-4 
        pixelated-border flex items-center justify-center
        group-hover:scale-110 transition-transform duration-200
      `}>
        {icon}
      </div>
      <h3 className="font-mono text-xl font-bold text-black mb-2">{title}</h3>
      <p className="text-gray-600 font-mono text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const PixelCloud = () => (
  <div className="relative">
    <div className="bg-gray-300 w-16 h-8 pixelated-border dark:bg-gray-50"></div>
    <div className="bg-gray-300 w-12 h-6 pixelated-border absolute -top-2 left-2 dark:bg-gray-50"></div>
    <div className="bg-gray-300 w-8 h-4 pixelated-border absolute -top-1 right-1 dark:bg-gray-50"></div>
  </div>
);

export default Hero;