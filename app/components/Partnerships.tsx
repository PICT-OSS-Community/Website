"use client";

import React from "react";
import Image from "next/image";

const partners = [
  {
    name: "Social Winter of Code Season 6",
    subtext: "SWOC",
    logo: "/logos/swoc.jpg",
    url: "https://www.socialwinterofcode.com/"
  },
  {
    name: "GirlScript Summer of Code 2025",
    subtext: "GSSoC",
    logo: "/logos/gssoc.png",
    url: "https://gssoc.girlscript.tech/"
  },
  {
    name: "Hacktoberfest 2025",
    subtext: "DigitalOcean",
    logo: "/logos/hacktoberfest.jpg",
    url: "https://hacktoberfest.com/"
  },
  {
    name: "Apertre 3.0",
    subtext: "Resourcio Community",
    logo: "/logos/apertre.png",
    url: "https://apertre.resourcio.in/"
  },
  {
    name: "Open Source Connect Global 2026",
    subtext: "OSCG",
    logo: "/logos/osgc.png",
    url: "https://osgc.in/" // Guessed URL, standard if unknown
  }
];

// Duplicate partners for seamless looping
const doubledPartners = [...partners, ...partners, ...partners];

const Partnerships = () => {
  return (
    <section className="bg-white py-16 lg:py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto mb-16 px-4">
        <div className="text-center">
          <h2 className="font-mono text-4xl sm:text-6xl font-bold text-black mb-4">
            OUR
            <br />
            <span className="bg-[#00D16C] text-white px-6 py-2 border-4 border-black inline-block mt-2">
              PARTNERSHIPS
            </span>
          </h2>
          <p className="text-base sm:text-lg font-mono text-gray-500 max-w-3xl mx-auto">
            Collaborating with global open-source programs.
          </p>
        </div>
      </div>

      <div className="relative max-w-full">
        {/* Fading Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        {/* Marquee Container */}
        <div
          className="flex w-max animate-marquee-partners"
          style={{
            animation: 'marquee-partners 30s linear infinite',
          }}
        >
          <style jsx>{`
            @keyframes marquee-partners {
              0% { transform: translateX(0); }
              100% { transform: translateX(-33.33%); }
            }
            .animate-marquee-partners:hover {
              animation-play-state: paused !important;
            }
          `}</style>

          {doubledPartners.map((partner, index) => (
            <div
              key={index}
              className="flex-none w-[350px] sm:w-[500px] px-12"
            >
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center cursor-pointer"
              >
                {/* Logo Area - Clean transparent look */}
                <div className="relative w-full h-64 mb-8 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-2">
                  <div className="relative w-[95%] h-[95%]">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Text Below Logo */}
                <div className="text-center">
                  <p className="font-mono font-bold text-lg sm:text-xl text-black leading-tight group-hover:text-[#00D16C] transition-colors">
                    {partner.name}
                  </p>
                  <p className="font-mono text-xs sm:text-sm text-gray-400 mt-2 uppercase tracking-widest">
                    {partner.subtext}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partnerships;
