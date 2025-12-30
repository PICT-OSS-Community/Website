'use client';

import React from 'react';

interface WrappedSlideProps {
  children: React.ReactNode;
  className?: string;
}

const WrappedSlide: React.FC<WrappedSlideProps> = ({ children, className = '' }) => {
  return (
    <div className={`
      min-h-screen w-full flex items-center justify-center
      bg-white px-3 sm:px-6 lg:px-8 py-8 sm:py-12
      ${className}
    `}>
      <div className="max-w-4xl w-full">
        {children}
      </div>
    </div>
  );
};

export default WrappedSlide;

