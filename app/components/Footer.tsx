import React from 'react';
import { Github, Twitter, Disc as Discord, Mail, Heart, BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-white text-black px-3 py-2 font-mono text-xl font-bold pixelated-border">
                OSS
              </div>
              <span className="font-mono text-xl font-bold">COMMUNITY</span>
            </div>
            <p className="font-mono text-gray-300 leading-relaxed mb-6">
              Building the future of open source software through collaboration, 
              innovation, and community-driven development. Join our 650+ members!
            </p>
            <div className="flex space-x-2">
              <SocialIcon href="#" icon={Github} color="blue" />
              <SocialIcon href="#" icon={BookOpen} color="red" />
              <SocialIcon href="#" icon={Twitter} color="yellow" />
              <SocialIcon href="#" icon={Discord} color="green" />
              <SocialIcon href="#" icon={Mail} color="blue" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-mono font-bold text-lg mb-4 text-green-500">QUICK LINKS</h3>
            <ul className="space-y-2 font-mono">
              <li><FooterLink href="#projects">Projects</FooterLink></li>
              <li><FooterLink href="#sessions">Sessions</FooterLink></li>
              <li><FooterLink href="#fossible">FOSSible</FooterLink></li>
              <li><FooterLink href="#events">Events</FooterLink></li>
              <li><FooterLink href="#contribute">Contribute</FooterLink></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-mono font-bold text-lg mb-4 text-blue-500">COMMUNITY</h3>
            <ul className="space-y-2 font-mono">
              <li><FooterLink href="#discord">Discord Server</FooterLink></li>
              <li><FooterLink href="#medium">Medium Publication</FooterLink></li>
              <li><FooterLink href="#workshops">Workshops</FooterLink></li>
              <li><FooterLink href="#mentorship">Mentorship</FooterLink></li>
              <li><FooterLink href="#code-of-conduct">Code of Conduct</FooterLink></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t-4 border-gray-700 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Pixel Art */}
            <div className="flex justify-center md:justify-start">
              <PixelArt />
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="font-mono text-gray-400 flex items-center justify-center">
                Made with <Heart size={16} className="mx-2 text-red-500" /> by OSS Community
              </p>
              
            </div>

          </div>
        </div>
      </div>
    </footer>
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
        text-white p-3 pixelated-border hover:scale-110 transition-all duration-200
      `}
    >
      <Icon size={20} />
    </a>
  );
};

const FooterLink = ({ href, children }: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="text-gray-300 hover:text-white transition-colors duration-200"
  >
    {children}
  </a>
);

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

export default Footer;