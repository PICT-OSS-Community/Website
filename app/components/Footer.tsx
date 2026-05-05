"use client"
import React from 'react';
import { Github, Twitter, Mail, Heart, Linkedin, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Logo + Description + Socials */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="font-mono text-xl font-bold">PICT</span>
              <div className="bg-white text-black px-3 py-2 font-mono text-xl font-bold pixelated-border">
                OSS
              </div>
              <span className="font-mono text-xl font-bold">COMMUNITY</span>
            </div>
            <p className="font-mono text-gray-300 leading-relaxed mb-6 max-w-sm">
            Helping students discover, start, and grow in open source.            </p>
            <p className="font-mono font-bold text-white text-sm mb-3">Follow Us</p>
            <div className="flex flex-wrap gap-2">
              <SocialIcon href="https://github.com/PICT-OSS-Community"               icon={Github}    color="blue"   />
              <SocialIcon href="https://www.linkedin.com/company/oss-community"       icon={Linkedin}  color="red"    />
              <SocialIcon href="https://x.com/pict_oss"                              icon={Twitter}   color="yellow" />
              <SocialIcon href="https://www.instagram.com/oss__community"             icon={Instagram} color="green"  />
              <SocialIcon href="mailto:pictosscommunity@gmail.com"                    icon={Mail}      color="blue"   />
              <SocialIcon href="https://www.youtube.com/@pict-oss-community"          icon={Youtube}   color="red"    />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-mono font-bold text-sm tracking-widest text-green-500 mb-4">QUICK LINKS</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home',         href: '/'                                            },
                { label: 'Blogs',         href: '/blogs'                                       },
                { label: 'Events',       href: '/events'                                      },
                { label: 'Projects',     href: '/projects'                                    },
                { label: 'Contribute',   href: 'https://github.com/PICT-OSS-Community/Website' },
                { label: 'Achievements', href: '/achievements'                                },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="font-mono text-gray-300 hover:text-white transition-colors duration-200">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-mono font-bold text-sm tracking-widest text-blue-500 mb-4">COMMUNITY</h3>
            <ul className="space-y-3">
              {[
                { label: 'YouTube Channel',    href: 'https://www.youtube.com/@PICT-OSS-Community'          },
                { label: 'WhatsApp Channel',    href: 'https://whatsapp.com/channel/0029VbClPP2LCoX0UjNkKt0f' },
                { label: 'Medium Publication',  href: 'https://medium.com/fossible'                          },
                { label: 'GitHub Organization',          href: 'https://github.com/PICT-OSS-Community'                },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer"
                    className="font-mono text-gray-300 hover:text-white transition-colors duration-200">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t-4 border-gray-700 mt-12 pt-8 flex justify-center">
          <p className="font-mono text-gray-400 flex items-center">
            Made with <Heart size={16} className="mx-2 text-red-500" /> by PICT OSS Community
          </p>
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
    red:    'bg-red-500 hover:bg-red-600',
    blue:   'bg-blue-500 hover:bg-blue-600',
    green:  'bg-green-500 hover:bg-green-600',
    yellow: 'bg-yellow-500 hover:bg-yellow-600',
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${colorClasses[color]} text-white p-3 pixelated-border hover:scale-110 transition-all duration-200`}
    >
      <Icon size={20} />
    </a>
  );
};

export default Footer;
