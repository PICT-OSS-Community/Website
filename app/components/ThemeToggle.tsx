'use client'

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch - return null or a placeholder during SSR
  if (!mounted) {
    return (
      <div className={`absolute top-5 right-10 border-2 rounded-lg p-2 w-[52px] h-[52px] md:right-90 ${className}`} />
    );
  }

  const currentTheme = resolvedTheme || theme;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`absolute top-5 right-10 border-2 rounded-lg p-2 hover:cursor-pointer lg:right-90
        ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} 
        transition-colors hover:scale-110 duration-200 ${className}`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Moon size={24} /> : <Sun size={24} />}
    </button>
  );
}