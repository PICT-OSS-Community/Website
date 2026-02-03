'use client';

import { Calendar, Code, GitBranch, Globe, Heart, MessageCircle, Share2, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CountUp from '../components/CountUp';
import GrowthGraph from '../components/GrowthGraph';
import PhotoCarousel from '../components/PhotoCarousel';
import Snowfall from '../components/Snowfall';
import TeamMemberCard from '../components/TeamMemberCard';
import WrappedMusicPlayer from '../components/WrappedMusicPlayer';
import WrappedNavigation from '../components/WrappedNavigation';
import WrappedSlide from '../components/WrappedSlide';
import wrappedData from '../data/wrapped.json';

const WrappedPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideKey, setSlideKey] = useState(0);
  const [showGrowthGraph, setShowGrowthGraph] = useState(false);

  useEffect(() => {
    if (currentSlide === 1) {
      setShowGrowthGraph(true);
    } else {
      setShowGrowthGraph(false);
    }
  }, [currentSlide]);

  const totalSlides = 14;
  const musicSources = [
    '/wrapped-music-1.mp3', // Slides 0-2
    '/wrapped-music-2.mp3', // Slides 3-5
    '/wrapped-music-0.mp3', // Slides 6-8
    '/wrapped-music-5.mp3', // Slides 9-11
  ];

  const handleNext = () => {
    if (currentSlide < totalSlides - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1);
        setSlideKey(slideKey + 1);
        setIsTransitioning(false);
      }, 200);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide - 1);
        setSlideKey(slideKey + 1);
        setIsTransitioning(false);
      }, 200);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide, isTransitioning]);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const renderSlide = () => {
    switch (currentSlide) {
      case 0:
        return (
          <WrappedSlide>
            <div className="text-center">
              <div className="mb-6 sm:mb-8 animate-scaleIn" style={{ animation: 'scaleIn 2s ease-out' }}>
                <div className="inline-block mb-3 sm:mb-4 hover:scale-110 transition-transform duration-500 animate-float" style={{ animation: 'float 4s ease-in-out infinite 1s' }}>
                  <Image
                    src="/logo.jpg"
                    alt="OSS Community Logo"
                    width={300}
                    height={300}
                    className="pixelated-border w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px]"
                  />
                </div>
              </div>

              <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6 animate-slideInUp" style={{ animation: 'slideInUp 2s ease-out 1s both' }}>
                2025 WRAPPED
              </h2>
              <p className="font-mono text-base sm:text-lg md:text-xl text-gray-600 mb-3 animate-fadeIn" style={{ animation: 'fadeIn 2.5s ease-out 1.5s both' }}>
                OSS year in review
              </p>
              <p className="font-mono text-sm sm:text-base md:text-lg text-gray-500 italic animate-fadeIn" style={{ animation: 'fadeIn 3s ease-out 2s both' }}>
                We've had a crazy year!
              </p>
            </div>
          </WrappedSlide>
        );

      case 1:
        return (
          <WrappedSlide>
            {showGrowthGraph ? (
              <GrowthGraph onComplete={() => setShowGrowthGraph(false)} />
            ) : (
              <div className="text-center animate-fadeIn">
                <div className="mb-4 sm:mb-6 animate-slideInUp" style={{ animation: 'slideInUp 2s ease-out' }}>
                  <Users className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-red-500 animate-float" style={{ animation: 'float 3s ease-in-out infinite' }} />
                  <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2 animate-fadeIn" style={{ animation: 'fadeIn 2s ease-out 0.5s both' }}>
                    NEW BLOOD
                  </h2>
                  <p className="font-mono text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 animate-fadeIn" style={{ animation: 'fadeIn 2s ease-out 0.8s both' }}>
                    Top growth days in WhatsApp community
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-6">
                  {wrappedData.growthDays.slice(0, 5).map((day, index) => (
                    <div
                      key={day.date}
                      className="bg-gray-50 p-3 sm:p-4 pixelated-border text-left hover:scale-105 transition-all duration-500 cursor-pointer animate-slideInLeft hover:shadow-lg"
                      style={{ animation: `slideInLeft 1.5s ease-out ${index * 0.2 + 0.2}s both` }}
                    >
                      <div className="flex justify-between items-center gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-mono font-bold text-base sm:text-lg text-black truncate">
                            #{index + 1} {formatDate(day.date)}
                          </p>
                        </div>
                        <div className="bg-red-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 pixelated-border font-mono font-bold text-lg sm:text-xl flex-shrink-0">
                          +<CountUp value={day.newMembers} duration={1500} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="font-mono text-sm sm:text-base text-red-600 font-bold animate-fadeIn" style={{ animation: 'fadeIn 2.5s ease-out 2s both' }}>
                  From 0 → 800+ developers strong
                </p>
              </div>
            )}
          </WrappedSlide>
        );

      case 2:
        return (
          <WrappedSlide>
            <div className="text-center">
              <div className="mb-4 sm:mb-6 animate-slideInUp" style={{ animation: 'slideInUp 2s ease-out' }}>
                <TrendingUp className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-blue-500 animate-float" style={{ animation: 'float 3.5s ease-in-out infinite' }} />
                <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2 animate-fadeIn" style={{ animation: 'fadeIn 2s ease-out 0.5s both' }}>
                  THE CORE DRIVERS
                </h2>
                <p className="font-mono text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 animate-fadeIn" style={{ animation: 'fadeIn 2s ease-out 0.8s both' }}>
                  Most active members
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div>
                  <h3 className="font-mono text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4">Top Helpers</h3>
                  <div className="space-y-2 sm:space-y-3 mb-3">
                    {wrappedData.engagementStats.topHelpers.map((helper, index) => (
                      <div
                        key={helper.name}
                        className="bg-blue-50 p-3 sm:p-4 pixelated-border flex justify-between items-center gap-2 hover:scale-105 transition-all duration-500 cursor-pointer animate-slideInLeft hover:shadow-lg"
                        style={{ animation: `slideInLeft 1.5s ease-out ${index * 0.2 + 1}s both` }}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-mono font-bold text-base sm:text-lg text-black truncate">
                            #{index + 1} {helper.name}
                          </p>
                        </div>
                        <div className="bg-blue-500 text-white px-2 py-1 sm:px-3 sm:py-1 pixelated-border font-mono font-bold text-sm sm:text-base flex-shrink-0">
                          <CountUp value={helper.count} duration={1200} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="font-mono text-xs sm:text-sm text-gray-500 italic text-center animate-fadeIn" style={{ animation: 'fadeIn 2s ease-out 2s both' }}>
                    Anish almost doubles second place. Classic anish.
                  </p>
                </div>
                <div>
                  <h3 className="font-mono text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4">Top Askers</h3>
                  <div className="space-y-2 sm:space-y-3 mb-3">
                    {wrappedData.engagementStats.topAskers.map((asker, index) => (
                      <div
                        key={asker.name}
                        className="bg-green-50 p-3 sm:p-4 pixelated-border flex justify-between items-center gap-2 hover:scale-105 transition-all duration-500 cursor-pointer animate-slideInRight hover:shadow-lg"
                        style={{ animation: `slideInRight 1.5s ease-out ${index * 0.2 + 1}s both` }}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-mono font-bold text-base sm:text-lg text-black truncate">
                            #{index + 1} {asker.name}
                          </p>
                        </div>
                        <div className="bg-green-500 text-white px-2 py-1 sm:px-3 sm:py-1 pixelated-border font-mono font-bold text-sm sm:text-base flex-shrink-0">
                          <CountUp value={asker.count} duration={1200} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="font-mono text-xs sm:text-sm text-gray-500 italic text-center animate-fadeIn" style={{ animation: 'fadeIn 2s ease-out 2s both' }}>
                    Vedant is our cat of the year.
                  </p>
                </div>
              </div>
              <p className="font-mono text-sm sm:text-base text-gray-600 italic animate-fadeIn" style={{ animation: 'fadeIn 2.5s ease-out 2.5s both' }}>
                We don't let curious cats die :)
              </p>
            </div>
          </WrappedSlide>
        );

      case 3:
        return (
          <WrappedSlide>
            <div className="text-center">
              <div className="mb-4 sm:mb-6 animate-slideInUp" style={{ animation: 'slideInUp 0.6s ease-out' }}>
                <Calendar className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-yellow-500 animate-pulse" />
                <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2">
                  MINUTES THAT MATTERED
                </h2>
                <p className="font-mono text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8">
                  Events and meetings
                </p>
              </div>
              <div className="mb-4 sm:mb-6 animate-scaleIn" style={{ animation: 'scaleIn 0.8s ease-out 0.2s both' }}>
                <div className="bg-yellow-500 text-white px-4 py-3 sm:px-6 sm:py-4 pixelated-border inline-block mb-3 sm:mb-4 hover:scale-110 transition-transform duration-300">
                  <p className="font-mono text-3xl sm:text-4xl font-bold">
                    <CountUp value={wrappedData.minutesThatMattered.totalMinutes} duration={2000} />
                  </p>
                  <p className="font-mono text-base sm:text-lg animate-fadeIn" style={{ animation: 'fadeIn 0.8s ease-out 0.6s both' }}>Total Minutes</p>
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {wrappedData.minutesThatMattered.topMeetings.map((meeting, index) => (
                  <div
                    key={meeting.name}
                    className="bg-gray-50 p-3 sm:p-4 pixelated-border text-left hover:scale-105 transition-all duration-300 cursor-pointer animate-slideInUp"
                    style={{ animation: `slideInUp 0.6s ease-out ${index * 0.15 + 0.5}s both` }}
                  >
                    <p className="font-mono font-bold text-base sm:text-lg text-black mb-1">
                      {meeting.name}
                    </p>
                    <p className="font-mono text-xs sm:text-sm text-gray-600">
                      {formatDate(meeting.date)} • {meeting.minutes} minutes
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </WrappedSlide>
        );

      case 4:
        return (
          <WrappedSlide>
            <div className="text-center">
              <div className="mb-4 sm:mb-6 animate-slideInUp" style={{ animation: 'slideInUp 2s ease-out' }}>
                <Globe className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-green-500 animate-float" style={{ animation: 'float 4s ease-in-out infinite' }} />
                <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2 animate-fadeIn" style={{ animation: 'fadeIn 2s ease-out 0.5s both' }}>
                  OUR DIGITAL FOOTPRINT
                </h2>
                <p className="font-mono text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 animate-fadeIn" style={{ animation: 'fadeIn 2s ease-out 0.8s both' }}>
                  Followers across all platforms
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto">
                <div className="bg-blue-50 p-4 sm:p-6 pixelated-border hover:scale-110 transition-transform duration-500 cursor-pointer animate-slideInLeft hover:shadow-lg" style={{ animation: 'slideInLeft 1.5s ease-out 1s both' }}>
                  <p className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-1 sm:mb-2">
                    <CountUp value={wrappedData.socialMediaFollowers.linkedin} duration={2500} />
                  </p>
                  <p className="font-mono text-xs sm:text-sm text-gray-600">LinkedIn</p>
                </div>
                <div className="bg-gray-50 p-4 sm:p-6 pixelated-border hover:scale-110 transition-transform duration-300 cursor-pointer animate-slideInRight" style={{ animation: 'slideInRight 0.6s ease-out 0.2s both' }}>
                  <p className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-1 sm:mb-2">
                    <CountUp value={wrappedData.socialMediaFollowers.x} duration={1500} />
                  </p>
                  <p className="font-mono text-xs sm:text-sm text-gray-600">X (Twitter)</p>
                </div>
                <div className="bg-gray-900 text-white p-4 sm:p-6 pixelated-border hover:scale-110 transition-transform duration-300 cursor-pointer animate-slideInLeft" style={{ animation: 'slideInLeft 0.6s ease-out 0.3s both' }}>
                  <p className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
                    <CountUp value={wrappedData.socialMediaFollowers.github} duration={1500} />
                  </p>
                  <p className="font-mono text-xs sm:text-sm">GitHub</p>
                </div>
                <div className="bg-pink-50 p-4 sm:p-6 pixelated-border hover:scale-110 transition-transform duration-300 cursor-pointer animate-slideInRight" style={{ animation: 'slideInRight 0.6s ease-out 0.4s both' }}>
                  <p className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-1 sm:mb-2">
                    <CountUp value={wrappedData.socialMediaFollowers.instagram} duration={1500} />
                  </p>
                  <p className="font-mono text-xs sm:text-sm text-gray-600">Instagram</p>
                </div>
                <div className="col-span-2 bg-green-50 p-4 sm:p-6 pixelated-border hover:scale-110 transition-transform duration-300 cursor-pointer animate-slideInUp" style={{ animation: 'slideInUp 0.6s ease-out 0.5s both' }}>
                  <p className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-1 sm:mb-2">
                    <CountUp value={801} duration={2000} />
                  </p>
                  <p className="font-mono text-xs sm:text-sm text-gray-600">WhatsApp Community</p>
                </div>
              </div>
              <p className="font-mono text-sm sm:text-base text-gray-600 italic mt-6 animate-fadeIn" style={{ animation: 'fadeIn 2s ease-out 2s both' }}>
                Open source, everywhere.
              </p>
            </div>
          </WrappedSlide>
        );

      case 5:
        return (
          <WrappedSlide>
            <div className="text-center h-full flex flex-col justify-center">
              <div className="mb-8 animate-slideInUp" style={{ animation: 'slideInUp 2s ease-out' }}>
                <h2 className="font-mono text-2xl sm:text-3xl md:text-5xl font-bold text-black mb-2 animate-fadeIn uppercase" style={{ animation: 'fadeIn 2s ease-out 0.5s both' }}>
                  The Team Behind OSS
                </h2>
                <p className="font-mono text-gray-600 animate-fadeIn" style={{ animation: 'fadeIn 2s ease-out 1s both' }}>
                  Builders & Maintainers
                </p>
              </div>

              <div className="flex flex-col gap-8 max-w-6xl mx-auto px-4 animate-fadeIn" style={{ animation: 'fadeIn 2.5s ease-out 1.5s both' }}>
                {/* First 10 members: 5x2 Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 justify-items-center">
                  <TeamMemberCard name="Anish" image1="/Anish_1.jpeg" image2="/Anish_2.jpeg" />
                  <TeamMemberCard name="Anshul" image1="/Anshul_1.jpeg" image2="/Anshul_2.jpeg" />
                  <TeamMemberCard name="Aryan" image1="/Aryan_1.jpeg" image2="/Aryan_2.jpeg" />
                  <TeamMemberCard name="Chirag" image1="/Chirag.png" />
                  <TeamMemberCard name="Kshitij" image1="/Kshitij_1.jpeg" image2="/Kshitij_2.jpeg" />
                  <TeamMemberCard name="Anurag" image1="/Anurag_1.jpeg" image2="/Anurag_2.jpeg" />
                  <TeamMemberCard name="Aswathi" image1="/Aswathi.jpeg" />
                  <TeamMemberCard name="Trupti" image1="/Trupti.jpeg" />
                  <TeamMemberCard name="Salina" image1="/Salina.png" />
                  <TeamMemberCard name="Sujal" image1="/Sujal.jpeg" />
                </div>

                {/* Last 3 members: Centered Flex */}
                <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
                  <TeamMemberCard name="Shantanu" image1="/Shantanu.png" />
                  <TeamMemberCard name="Vedant" image1="/Vedant.jpeg" />
                  <TeamMemberCard name="Sarang" image1="/Sarang.jpeg" />
                </div>
              </div>
            </div>
          </WrappedSlide>
        );

      case 6:
        return (
          <WrappedSlide>
            <div className="text-center h-full flex flex-col justify-center">
              <div className="mb-4 sm:mb-6 animate-slideInUp" style={{ animation: 'slideInUp 2s ease-out' }}>
                <Globe className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 text-orange-500 animate-float" style={{ animation: 'float 3.5s ease-in-out infinite' }} />
                <h2 className="font-mono text-2xl sm:text-3xl md:text-5xl font-bold text-black mb-4 sm:mb-6 px-4 leading-tight animate-fadeIn" style={{ animation: 'fadeIn 2s ease-out 0.5s both' }}>
                  Trip to IndiaFOSS 2025,<br />BANGALORE
                </h2>
              </div>

              <div className="px-2 sm:px-4 animate-scaleIn max-w-6xl mx-auto w-full" style={{ animation: 'scaleIn 1.5s ease-out 0.5s both' }}>
                <PhotoCarousel images={['/1.jpeg', '/2.jpeg', '/3.jpeg', '/4.jpeg', '/5.jpeg', '/6.jpeg', '/7.jpeg', '/8.jpeg']} />
              </div>
            </div>
          </WrappedSlide>
        );

      case 7:
        return (
          <WrappedSlide>
            <div className="text-center">
              <div className="mb-4 sm:mb-6 animate-slideInUp" style={{ animation: 'slideInUp 2s ease-out' }}>
                <GitBranch className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-indigo-500 animate-float" style={{ animation: 'float 3.5s ease-in-out infinite' }} />
                <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2 animate-fadeIn" style={{ animation: 'fadeIn 2s ease-out 0.5s both' }}>
                  PRs THAT LANDED
                </h2>
                <p className="font-mono text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 animate-fadeIn" style={{ animation: 'fadeIn 2s ease-out 0.8s both' }}>
                  Pull requests merged
                </p>
              </div>
              <div className="mb-6 sm:mb-8 animate-scaleIn" style={{ animation: 'scaleIn 2s ease-out 1s both' }}>
                <div className="bg-indigo-500 text-white px-6 py-5 sm:px-8 sm:py-6 pixelated-border inline-block hover:scale-110 transition-transform duration-500">
                  <p className="font-mono text-4xl sm:text-5xl font-bold">
                    <CountUp value={wrappedData.prsThatLanded.totalPRs} duration={3000} />
                  </p>
                  <p className="font-mono text-lg sm:text-xl animate-fadeIn" style={{ animation: 'fadeIn 2s ease-out 1.5s both' }}>Total PRs</p>
                </div>
              </div>
              <div className="space-y-2 sm:space-y-3 max-w-md mx-auto">
                {wrappedData.prsThatLanded.topContributors.map((contributor, index) => (
                  <div
                    key={contributor.name}
                    className="bg-gray-50 p-3 sm:p-4 pixelated-border flex justify-between items-center gap-2 hover:scale-105 transition-all duration-500 cursor-pointer animate-slideInLeft hover:shadow-lg"
                    style={{ animation: `slideInLeft 1.5s ease-out ${index * 0.2 + 1.5}s both` }}
                  >
                    <p className="font-mono font-bold text-base sm:text-lg text-black truncate flex-1 min-w-0">
                      #{index + 1} {contributor.name}
                    </p>
                    <div className="bg-indigo-500 text-white px-2 py-1 sm:px-3 sm:py-1 pixelated-border font-mono font-bold text-sm sm:text-base flex-shrink-0">
                      <CountUp value={contributor.prs} duration={2000} /> PRs
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </WrappedSlide>
        );

      case 8:
        return (
          <WrappedSlide>
            <div className="text-center">
              <div className="mb-4 sm:mb-6 animate-slideInUp" style={{ animation: 'slideInUp 2s ease-out' }}>
                <Users className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-red-500 animate-float" style={{ animation: 'float 3.5s ease-in-out infinite' }} />
                <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2 animate-fadeIn" style={{ animation: 'fadeIn 2s ease-out 0.5s both' }}>
                  THE BIGGEST ROOM
                </h2>
                <p className="font-mono text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 animate-fadeIn" style={{ animation: 'fadeIn 2s ease-out 0.8s both' }}>
                  Event with most members
                </p>
              </div>
              <div className="bg-red-500 text-white p-6 sm:p-8 pixelated-border mb-4 sm:mb-6 animate-scaleIn hover:scale-110 transition-transform duration-500" style={{ animation: 'scaleIn 2s ease-out 1s both' }}>
                <p className="font-mono text-4xl sm:text-5xl font-bold mb-2">
                  <CountUp value={wrappedData.theBiggestRoom.attendance} duration={3000} />
                </p>
                <p className="font-mono text-xl sm:text-2xl animate-fadeIn" style={{ animation: 'fadeIn 2s ease-out 1.5s both' }}>Members</p>
              </div>
              <div className="bg-gray-50 p-4 sm:p-6 pixelated-border text-left max-w-md mx-auto animate-slideInUp hover:shadow-lg mb-6" style={{ animation: 'slideInUp 1.5s ease-out 1.5s both' }}>
                <p className="font-mono font-bold text-xl sm:text-2xl text-black mb-2">
                  {wrappedData.theBiggestRoom.eventName}
                </p>
                <p className="font-mono text-xs sm:text-sm text-gray-600 mb-2">
                  {formatDate(wrappedData.theBiggestRoom.date)}
                </p>
                <p className="font-mono text-sm sm:text-base text-gray-700">
                  {wrappedData.theBiggestRoom.description}
                </p>
              </div>
              <p className="font-mono text-base sm:text-lg text-gray-600 italic max-w-xl mx-auto animate-fadeIn" style={{ animation: 'fadeIn 2.5s ease-out 2.5s both' }}>
                The Biggest Room wasn't a place.<br />
                It was <span className="font-bold">this community</span>.
              </p>
            </div>
          </WrappedSlide>
        );

      case 9:
        return (
          <WrappedSlide>
            <div className="text-center">
              <div className="mb-4 sm:mb-6 animate-slideInUp" style={{ animation: 'slideInUp 2s ease-out' }}>
                <MessageCircle className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-blue-500 animate-float" style={{ animation: 'float 4s ease-in-out infinite' }} />
                <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2 animate-fadeIn" style={{ animation: 'fadeIn 2s ease-out 0.5s both' }}>
                  THE CHATTER INDEX
                </h2>
                <p className="font-mono text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 animate-fadeIn" style={{ animation: 'fadeIn 2s ease-out 0.8s both' }}>
                  Total messages in OSS community
                </p>
              </div>
              <div className="bg-blue-500 text-white px-8 py-8 sm:px-12 sm:py-10 pixelated-border inline-block animate-scaleIn hover:scale-110 transition-transform duration-500 mb-6" style={{ animation: 'scaleIn 2.5s ease-out 1s both' }}>
                <p className="font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4">
                  <CountUp value={wrappedData.totalMessages} duration={4000} />
                </p>
                <p className="font-mono text-lg sm:text-xl md:text-2xl animate-fadeIn" style={{ animation: 'fadeIn 2.5s ease-out 2s both' }}>Messages</p>
              </div>
              <p className="font-mono text-sm sm:text-base text-gray-600 italic max-w-2xl mx-auto animate-fadeIn" style={{ animation: 'fadeIn 3s ease-out 2.5s both' }}>
                New tech. AI. AWS going down. Cloudflare doing it twice.
              </p>
            </div>
          </WrappedSlide>
        );

      case 10:
        return (
          <WrappedSlide>
            <div className="text-center">
              <div className="mb-4 sm:mb-6 animate-slideInUp" style={{ animation: 'slideInUp 2s ease-out' }}>
                <TrendingUp className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-green-500 animate-float" style={{ animation: 'float 3.5s ease-in-out infinite' }} />
                <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2 animate-fadeIn" style={{ animation: 'fadeIn 2s ease-out 0.5s both' }}>
                  THREADS THAT TOOK OFF
                </h2>
                <p className="font-mono text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 animate-fadeIn" style={{ animation: 'fadeIn 2s ease-out 0.8s both' }}>
                  Top polls by engagement
                </p>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {wrappedData.topPolls.map((poll, index) => (
                  <div
                    key={poll.date + poll.question}
                    className="bg-gray-50 p-3 sm:p-4 pixelated-border text-left hover:scale-105 transition-all duration-500 cursor-pointer animate-slideInLeft hover:shadow-lg"
                    style={{ animation: `slideInLeft 1.5s ease-out ${index * 0.2 + 1}s both` }}
                  >
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-mono font-bold text-base sm:text-lg text-black mb-1">
                          #{index + 1} {poll.question}
                        </p>
                        <p className="font-mono text-xs sm:text-sm text-gray-600">
                          {formatDate(poll.date)}
                        </p>
                      </div>
                      <div className="bg-green-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 pixelated-border font-mono font-bold text-lg sm:text-xl flex-shrink-0">
                        <CountUp value={poll.totalVotes} duration={2500} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </WrappedSlide>
        );

      case 11:
        return (
          <WrappedSlide>
            <div className="text-center">
              <div className="mb-4 sm:mb-6 animate-slideInUp" style={{ animation: 'slideInUp 2s ease-out' }}>
                <Share2 className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-orange-500 animate-float" style={{ animation: 'float 3.5s ease-in-out infinite' }} />
                <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2 animate-fadeIn" style={{ animation: 'fadeIn 2s ease-out 0.5s both' }}>
                  CONTENT SHARED
                </h2>
                <p className="font-mono text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 animate-fadeIn" style={{ animation: 'fadeIn 2s ease-out 0.8s both' }}>
                  Top shared domains
                </p>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {wrappedData.contentStats.topSharedDomains.slice(0, 5).map((domain, index) => (
                  <div
                    key={domain.domain}
                    className="bg-gray-50 p-3 sm:p-4 pixelated-border flex justify-between items-center gap-2 hover:scale-105 transition-all duration-500 cursor-pointer animate-slideInRight hover:shadow-lg"
                    style={{ animation: `slideInRight 1.5s ease-out ${index * 0.2 + 1}s both` }}
                  >
                    <p className="font-mono font-bold text-base sm:text-lg text-black truncate flex-1 min-w-0">
                      #{index + 1} {domain.domain}
                    </p>
                    <div className="bg-orange-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 pixelated-border font-mono font-bold text-sm sm:text-base flex-shrink-0">
                      <CountUp value={domain.count} duration={2500} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-mono text-xs sm:text-sm text-gray-500 italic mt-6 animate-fadeIn" style={{ animation: 'fadeIn 2.5s ease-out 2.5s both' }}>
                Google → claude → openAI → grok → repeat
              </p>
            </div>
          </WrappedSlide>
        );

      case 12:
        return (
          <WrappedSlide>
            <div className="text-center h-full flex flex-col justify-between py-4">
              <div className="animate-slideInUp text-center" style={{ animation: 'slideInUp 2s ease-out' }}>
                <p className="font-mono text-xl sm:text-2xl text-gray-400 mb-2 animate-fadeIn uppercase tracking-widest">Community Partnerships</p>
                <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-6 animate-fadeIn" style={{ animation: 'fadeIn 2s ease-out 0.5s both' }}>
                  BUILDING TOGETHER
                </h2>
              </div>

              {/* Top Image - SWOC */}
              <div className="relative w-full h-32 sm:h-40 md:h-48 mb-4 animate-scaleIn hover:scale-105 transition-transform duration-500" style={{ animation: 'scaleIn 1.5s ease-out 0.5s both' }}>
                <Image
                  src="/SWOC.jpeg"
                  alt="Social Winter of Code Season 6"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg shadow-lg"
                />
              </div>

              {/* Text Middle */}
              <div className="space-y-4 my-auto animate-fadeIn" style={{ animation: 'fadeIn 2s ease-out 1s both' }}>
                <div className="bg-orange-50 p-3 sm:p-4 pixelated-border">
                  <p className="font-mono font-bold text-lg sm:text-l md:text-xl text-black">Social Winter of Code Season 6</p>
                </div>
                <div className="flex justify-center text-gray-400">
                  <Heart className="w-6 h-6 animate-pulse text-red-400" />
                </div>
                <div className="bg-blue-50 p-3 sm:p-4 pixelated-border">
                  <p className="font-mono font-bold text-lg sm:text-l md:text-xl text-black">Apertre 3.0 by Resourcio Community</p>
                </div>
              </div>

              {/* Bottom Image - Apertre */}
              <div className="relative w-full h-32 sm:h-40 md:h-48 mt-4 animate-scaleIn hover:scale-105 transition-transform duration-500" style={{ animation: 'scaleIn 1.5s ease-out 1.5s both' }}>
                <Image
                  src="/apertre.jpeg"
                  alt="Apertre 3.0"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </WrappedSlide>
        );


      case 13:
        return (
          <WrappedSlide>
            <div className="text-center">
              <div className="mb-6 sm:mb-8">
                <Heart className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 text-red-500 animate-float" style={{ animation: 'float 3s ease-in-out infinite' }} />
                <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-3 sm:mb-4 animate-scaleIn" style={{ animation: 'scaleIn 2.5s ease-out 0.5s both' }}>
                  THANK YOU
                </h2>
                <p className="font-mono text-lg sm:text-xl md:text-2xl text-gray-600 mb-4 sm:mb-6 animate-fadeIn" style={{ animation: 'fadeIn 3s ease-out 1s both' }}>
                  For being part of the OSS Community
                </p>
                <p className="font-mono text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 animate-fadeIn max-w-2xl mx-auto" style={{ animation: 'fadeIn 3.5s ease-out 1.5s both' }}>
                  800+ developers.<br />
                  <span className="font-bold">One open source spirit.</span>
                </p>
                <div className="bg-black text-white px-4 py-3 sm:px-6 sm:py-4 pixelated-border inline-block animate-scaleIn hover:scale-110 transition-transform duration-500 mb-4" style={{ animation: 'scaleIn 2.5s ease-out 2s both' }}>
                  <p className="font-mono text-xl sm:text-2xl font-bold">2025</p>
                </div>
                <p className="font-mono text-sm sm:text-base text-gray-600 animate-fadeIn" style={{ animation: 'fadeIn 4s ease-out 2.5s both' }}>
                  See you in 2026 🚀
                </p>
              </div>
            </div>
          </WrappedSlide>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        <Image src="/new_winter.png" alt="Winter Background" layout="fill" objectFit="cover" priority />
        <div className="absolute inset-0 bg-white/80" />
      </div>
      <Snowfall />
      <WrappedMusicPlayer musicSources={musicSources} currentSlide={currentSlide} />
      <div
        key={slideKey}
        className={`
          transition-all duration-500 ease-in-out relative z-[10]
          ${isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'}
        `}
        style={{ zIndex: 10 }}
      >
        {renderSlide()}
      </div>
      <WrappedNavigation
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onNext={handleNext}
        onPrevious={handlePrevious}
        canGoNext={currentSlide < totalSlides - 1}
        canGoPrevious={currentSlide > 0}
      />
    </div>
  );
};

export default WrappedPage;

