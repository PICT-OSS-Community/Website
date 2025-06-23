"use client"
import React, { useState } from 'react';
import { Menu, X, Github, Twitter, Disc as Discord, BookOpen } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b-4 border-black relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-black text-white px-3 py-2 font-mono text-xl font-bold pixelated-border">
              OSS
            </div>
            <span className="font-mono text-xl font-bold text-black">COMMUNITY</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavButton href="#home" color="red">HOME</NavButton>
            <NavButton href="#projects" color="blue">PROJECTS</NavButton>
            <NavButton href="#sessions" color="yellow">SESSIONS</NavButton>
            <NavButton href="#fossible" color="red">FOSSible</NavButton>
            <NavButton href="#about" color="green">ABOUT</NavButton>
          </nav>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-2">
            <SocialIcon href="#" icon={Github} color="blue" />
            <SocialIcon href="#" icon={BookOpen} color="red" />
            <SocialIcon href="#" icon={Twitter} color="yellow" />
            <SocialIcon href="#" icon={Discord} color="green" />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 pixelated-border bg-red-500 text-white hover:bg-red-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t-4 border-black">
            <div className="flex flex-col space-y-2">
              <NavButton href="#home" color="red" mobile>HOME</NavButton>
              <NavButton href="#projects" color="blue" mobile>PROJECTS</NavButton>
              <NavButton href="#sessions" color="yellow" mobile>SESSIONS</NavButton>
              <NavButton href="#fossible" color="red" mobile>FOSSible</NavButton>
              <NavButton href="#about" color="green" mobile>ABOUT</NavButton>
            </div>
            <div className="flex justify-center space-x-2 mt-4">
              <SocialIcon href="#" icon={Github} color="blue" />
              <SocialIcon href="#" icon={BookOpen} color="red" />
              <SocialIcon href="#" icon={Twitter} color="yellow" />
              <SocialIcon href="#" icon={Discord} color="green" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const NavButton = ({ href, children, color, mobile = false }: {
  href: string;
  children: React.ReactNode;
  color: 'red' | 'blue' | 'green' | 'yellow';
  mobile?: boolean;
}) => {
  const colorClasses = {
    red: 'bg-red-500 hover:bg-red-600 border-red-700',
    blue: 'bg-blue-500 hover:bg-blue-600 border-blue-700',
    green: 'bg-green-500 hover:bg-green-600 border-green-700',
    yellow: 'bg-yellow-500 hover:bg-yellow-600 border-yellow-700'
  };

  return (
    <a
      href={href}
      className={`
        ${colorClasses[color]} 
        text-white font-mono font-bold px-4 py-2 
        pixelated-border hover:scale-105 transition-all duration-200
        ${mobile ? 'block text-center' : 'inline-block'}
      `}
    >
      {children}
    </a>
  );
};

const SocialIcon = ({ href, icon: Icon, color }: {
  href: string;
  icon: React.ComponentType<any>;
  color: 'red' | 'blue' | 'green' | 'yellow';
}) => {
  const colorClasses = {
    red: 'bg-red-500 hover:bg-red-600',
    blue: 'bg-blue-500 hover:bg-blue-600',
    green: 'bg-green-500 hover:bg-green-600',
    yellow: 'bg-yellow-500 hover:bg-yellow-600'
  };

  return (
    <a
      href={href}
      className={`
        ${colorClasses[color]} 
        text-white p-2 pixelated-border hover:scale-110 transition-all duration-200
      `}
    >
      <Icon size={16} />
    </a>
  );
};

export default Header;