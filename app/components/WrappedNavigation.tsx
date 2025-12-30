'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WrappedNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

const WrappedNavigation: React.FC<WrappedNavigationProps> = ({
  currentSlide,
  totalSlides,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
}) => {
  return (
    <div className="fixed bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center gap-3 sm:gap-4">
      {/* Progress Dots */}
      <div className="flex gap-1.5 sm:gap-2 items-center max-w-[90vw] overflow-x-auto pb-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              // This will be handled by parent component
            }}
            className={`
              w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 flex-shrink-0
              ${index === currentSlide 
                ? 'bg-black w-6 sm:w-8' 
                : 'bg-gray-300 hover:bg-gray-400'
              }
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-2 sm:gap-4 items-center">
        <button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className={`
            ${canGoPrevious 
              ? 'bg-black text-white hover:bg-gray-800 cursor-pointer' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
            w-10 h-10 sm:w-12 sm:h-12 pixelated-border
            flex items-center justify-center
            transition-all duration-200
            disabled:opacity-50
          `}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
        </button>

        <span className="font-mono text-xs sm:text-sm text-gray-600 px-2 sm:px-4">
          {currentSlide + 1} / {totalSlides}
        </span>

        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={`
            ${canGoNext 
              ? 'bg-black text-white hover:bg-gray-800 cursor-pointer' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
            w-10 h-10 sm:w-12 sm:h-12 pixelated-border
            flex items-center justify-center
            transition-all duration-200
            disabled:opacity-50
          `}
          aria-label="Next slide"
        >
          <ChevronRight size={20} className="sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
};

export default WrappedNavigation;

