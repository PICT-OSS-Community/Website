'use client';

import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Shantanu Wable",
    role: "Alumnus, CE",
    quote: "There’s always some new discussion going on that really helps me to stay updated in tech! Easy-to-approach general chat.",
    color: "emerald"
  },
  {
    name: "Omkar Wagholikar",
    role: "Alumnus, CE",
    quote: "Helped me connect with people who are contributing to the open source projects as well as the community is very focused on the tech which is good to passively improve my knowledge.",
    color: "sky"
  },
  {
    name: "Saurav Shinde",
    role: "BE, IT",
    quote: "It helped me get into linux, talking about distros or getting answers for some dumb linux issues. Being in this community makes me feel smart 😌",
    color: "indigo"
  },
  {
    name: "Prathamesh Kinagi",
    role: "SY, IT",
    quote: "Got to engage in helpful and meaningful sessions and got to know about various open source programs. How helpful the seniors are and how active the group is.",
    color: "amber"
  },
  {
    name: "Kshitij Aucharmal",
    role: "BE, EnTC",
    quote: "I've really benefited from the sessions... The unhinged nature of conversations, strong opinions by people about OSS and tech i general.",
    color: "rose"
  },
  {
    name: "Chirag Dave",
    role: "BE, EnTC",
    quote: "I merged 3 PRs into an Organisation and completed the hacktoberfest. One year after that I even received a remote job offer because of that contribution.",
    color: "violet"
  },
  {
    name: "Tanish Charthankar",
    role: "BE, IT",
    quote: "It makes me feel proud that we have people like him PICT who are capable to build and most importantly sustain the community. Just proud of him.",
    color: "fuchsia"
  },
  {
    name: "Eshwari Sagar Jain",
    role: "FY, ECE",
    quote: "Make me aware of knowing what is happening in technical world. How we can progress in our life and a way to build network with many people.",
    color: "pink"
  },
  {
    name: "Soham Metha",
    role: "TE, CE",
    quote: "Helped me find out about various open source programs (GSSOC, LFX). Helps me keep up-to-date with the latest open-source news/programs/opportunities.",
    color: "cyan"
  },
  {
    name: "Vedant Jadhav",
    role: "SY, AIDS",
    quote: "I've got a lot more knowledge about Linux and open source, and have been able to host and present sessions. Getting to know about cool projects.",
    color: "purple"
  }
];

// Duplicate testimonials for seamless looping
const doubledTestimonials = [...testimonials, ...testimonials];

const Testimonials = () => {
  return (
    <section className="bg-white py-16 lg:py-24 border-t-4 border-black overflow-hidden">
      <div className="max-w-full mx-auto">
        <div className="text-center mb-16 px-4">
          <h2 className="font-mono text-4xl sm:text-6xl font-bold text-black mb-8">
            COMMUNITY
            <br />
            <span className="bg-purple-500 text-white px-4 py-2 pixelated-border inline-block">
              VOICES
            </span>
          </h2>
          <p className="text-xl font-mono text-gray-600 max-w-3xl mx-auto">
            Real stories from students and alumni about their growth with us.
          </p>
        </div>

        <div className="relative w-full overflow-hidden">
          {/* Fading Gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

          {/* Marquee Container */}
          <div
            className="flex w-[200%] md:w-max hover:[animation-play-state:paused] animate-marquee"
            style={{
              animation: 'marquee 40s linear infinite',
            }}
          >
            <style jsx>{`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee:hover {
                animation-play-state: paused !important;
              }
            `}</style>

            {doubledTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-none w-[300px] sm:w-[400px] px-4"
              >
                <div className="h-full bg-gray-50 p-8 pixelated-border flex flex-col relative group hover:-translate-y-2 transition-transform duration-300">
                  {/* Decorative background element */}
                  <div className={`absolute top-0 right-0 w-16 h-16 opacity-10 bg-${testimonial.color}-500`} />

                  <Quote className={`text-${testimonial.color}-500 w-10 h-10 mb-6`} />

                  <p className="font-mono text-lg text-gray-800 mb-8 flex-grow leading-relaxed">
                    "{testimonial.quote}"
                  </p>

                  <div className="flex items-center gap-4 mt-auto">
                    <div className={`w-12 h-12 bg-${testimonial.color}-500 pixelated-border flex items-center justify-center shrink-0`}>
                      <span className="font-mono font-bold text-white text-xl">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold font-mono text-black">
                        {testimonial.name}
                      </h4>
                      {/* Fixed visibility: Removed dynamic color class for text and used a static dark gray */}
                      <p className="text-sm font-mono text-gray-700 font-bold">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
