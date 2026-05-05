"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

type NavId = 'home' | 'contributions' | 'blogs' | 'projects' | 'achievements' | 'events' | 'team';

const NAV_ITEMS: { id: NavId; label: string; color: 'red' | 'blue' | 'yellow' | 'green' }[] = [
  { id: 'home',          label: 'HOME',          color: 'red' },
  { id: 'blogs',         label: 'BLOGS',         color: 'yellow' },
  { id: 'projects',      label: 'PROJECTS',      color: 'green' },
  { id: 'achievements',  label: 'ACHIEVEMENTS',  color: 'red' },
  { id: 'contributions', label: 'CONTRIBUTIONS', color: 'blue' },
  { id: 'events',        label: 'EVENTS',        color: 'red' },
  { id: 'team',          label: 'OUR TEAM',      color: 'blue' },
];

const COLOR_CLASSES = {
  red:    { base: 'bg-red-500',    hover: 'hover:bg-red-600',    active: 'bg-red-700 hover:bg-red-700' },
  blue:   { base: 'bg-blue-500',   hover: 'hover:bg-blue-600',   active: 'bg-blue-700 hover:bg-blue-700' },
  yellow: { base: 'bg-yellow-500', hover: 'hover:bg-yellow-600', active: 'bg-yellow-600 hover:bg-yellow-600' },
  green:  { base: 'bg-green-500',  hover: 'hover:bg-green-600',  active: 'bg-green-700 hover:bg-green-700' },
};

const SUB_PAGES: Partial<Record<string, NavId>> = {
  '/events':        'events',
  '/blogs':         'blogs',
  '/projects':      'projects',
  '/achievements':  'achievements',
  '/team':          'team',
  '/contributions': 'contributions',
};

const Header = () => {
  const pathname = usePathname();
  const subPage = SUB_PAGES[pathname] ?? null;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<NavId>(subPage ?? 'home');

  useEffect(() => {
    if (subPage) return;

    const sections = NAV_ITEMS
      .filter(({ id }) => id !== 'events' && id !== 'blogs' && id !== 'projects' && id !== 'achievements' && id !== 'team' && id !== 'contributions')
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveNav(entry.target.id as NavId);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [subPage]);

  const handleNavClick = useCallback((id: NavId) => {
    setActiveNav(id);
    setIsMenuOpen(false);
  }, []);

  function hrefFor(id: NavId) {
    if (id === 'events')        return '/events';
    if (id === 'blogs')         return '/blogs';
    if (id === 'projects')      return '/projects';
    if (id === 'achievements')  return '/achievements';
    if (id === 'team')          return '/team';
    if (id === 'contributions') return '/contributions';
    return subPage ? `/#${id}` : `#${id}`;
  }

  return (
    <header className="bg-white dark:bg-gray-800 border-b-4 border-black dark:border-gray-500 relative z-50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 gap-4">

          {/* Logo */}
          <a href={subPage ? '/' : '#home'} className="shrink-0 hidden sm:flex items-center gap-2" onClick={() => handleNavClick('home')}>
            <span className="font-mono text-2xl font-bold text-black dark:text-white">PICT</span>
            <span className="font-mono text-2xl font-bold bg-black text-white dark:bg-white dark:text-black px-2 py-0.5 pixelated-border">OSS</span>
            <span className="font-mono text-2xl font-bold text-black dark:text-white">COMMUNITY</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2 ml-auto">
            {NAV_ITEMS.map(({ id, label, color }) => {
              const isActive = subPage ? id === subPage : activeNav === id;
              const c = COLOR_CLASSES[color];
              return (
                <a
                  key={id}
                  href={hrefFor(id)}
                  onClick={() => handleNavClick(id)}
                  className={`relative font-mono font-bold px-3 py-2 text-sm text-white pixelated-border hover:scale-105 transition-all duration-200 ${isActive ? `${c.active} nav-active` : `${c.base} ${c.hover}`}`}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden ml-auto p-2 pixelated-border bg-red-500 text-white hover:bg-red-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t-4 border-black dark:border-gray-500">
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map(({ id, label, color }) => {
                const isActive = subPage ? id === subPage : activeNav === id;
                const c = COLOR_CLASSES[color];
                return (
                  <a
                    key={id}
                    href={hrefFor(id)}
                    onClick={() => handleNavClick(id)}
                    className={`font-mono font-bold px-3 py-2 text-sm text-white pixelated-border block text-center transition-all duration-200 ${isActive ? c.active : `${c.base} ${c.hover}`}`}
                  >
                    {label}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
