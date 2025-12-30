'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  value: number;
  duration?: number;
  decimals?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  delay?: number;
}

const CountUp: React.FC<CountUpProps> = ({
  value,
  duration = 2000,
  decimals = 0,
  className = '',
  prefix = '',
  suffix = '',
  delay = 0,
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    hasAnimatedRef.current = false;
    setIsVisible(false);
    setCount(0);

    let checkInterval: NodeJS.Timeout | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const checkVisibility = (element: HTMLElement): boolean => {
      const style = window.getComputedStyle(element);
      const opacity = parseFloat(style.opacity);
      const visibility = style.visibility;
      const display = style.display;
      
      return opacity > 0.1 && visibility !== 'hidden' && display !== 'none';
    };

    const startAnimation = () => {
      if (hasAnimatedRef.current || !countRef.current) return;
      
      hasAnimatedRef.current = true;
      const startDelay = delay > 0 ? delay : 1200;
      timeoutId = setTimeout(() => {
        if (countRef.current && checkVisibility(countRef.current)) {
          setIsVisible(true);
        }
      }, startDelay);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current && countRef.current) {
            if (checkVisibility(countRef.current)) {
              startAnimation();
            } else {
              checkInterval = setInterval(() => {
                if (countRef.current && checkVisibility(countRef.current)) {
                  if (checkInterval) {
                    clearInterval(checkInterval);
                    checkInterval = null;
                  }
                  startAnimation();
                }
              }, 100);
              
              setTimeout(() => {
                if (checkInterval) {
                  clearInterval(checkInterval);
                  checkInterval = null;
                }
                if (!hasAnimatedRef.current && countRef.current && entry.isIntersecting) {
                  startAnimation();
                }
              }, 4000);
            }
          }
        });
      },
      { threshold: 0.5, rootMargin: '0px' }
    );

    if (countRef.current) {
      if (checkVisibility(countRef.current)) {
        const rect = countRef.current.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInViewport) {
          startAnimation();
        } else {
          observer.observe(countRef.current);
        }
      } else {
        observer.observe(countRef.current);
      }
    }

    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [delay]);

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = easeOutQuart * value;

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, value, duration]);

  const formatNumber = (num: number): string => {
    if (decimals > 0) {
      return num.toFixed(decimals);
    }
    return Math.floor(num).toLocaleString();
  };

  return (
    <span ref={countRef} className={className}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
};

export default CountUp;

