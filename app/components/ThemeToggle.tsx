'use client'

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="fixed bottom-6 right-6 z-50 w-11 h-11 pixelated-border" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`fixed bottom-6 right-6 z-50 p-2.5 pixelated-border hover:cursor-pointer
        hover:scale-110 transition-all duration-200
        ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Moon size={22} /> : <Sun size={22} />}
    </button>
  );
}
