'use client';

import { Volume2, VolumeX } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface WrappedMusicPlayerProps {
  musicSources: string[];
  currentSlide: number;
}

const WrappedMusicPlayer: React.FC<WrappedMusicPlayerProps> = ({ musicSources, currentSlide }) => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const currentTrackIndexRef = useRef<number>(-1);
  const isInitializedRef = useRef<boolean>(false);

  const getTrackIndex = (slide: number): number => {
    return Math.floor(slide / 3);
  };

  const playTrack = (trackIndex: number) => {
    if (trackIndex >= musicSources.length || trackIndex < 0) {
      return;
    }

    const audio = audioRefs.current[trackIndex];
    if (audio && !isMuted) {
      audio.loop = true;
      audio.volume = 0.3;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Audio play failed:', error);
        });
      }
    }
  };

  const initializeFirstTrack = (audio: HTMLAudioElement, trackIndex: number) => {
    if (!isInitializedRef.current && trackIndex === 0 && currentTrackIndexRef.current === -1) {
      currentTrackIndexRef.current = trackIndex;
      isInitializedRef.current = true;
      
      audio.loop = true;
      audio.volume = 0.3;
      
      const tryPlay = () => {
        if (!isMuted) {
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.log('Audio play failed:', error);
            });
          }
        }
      };

      if (audio.readyState >= 2) {
        setTimeout(tryPlay, 100);
      } else {
        const handleCanPlay = () => {
          tryPlay();
        };
        audio.addEventListener('canplay', handleCanPlay, { once: true });
        audio.load();
      }
    }
  };

  // Start music on initial mount
  useEffect(() => {
    if (currentTrackIndexRef.current === -1 && audioRefs.current[0]) {
      const audio = audioRefs.current[0];
      audio.loop = true;
      audio.volume = 0.3;
      
      const tryPlay = () => {
        if (currentTrackIndexRef.current === -1) {
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.log('Audio play failed:', error);
            });
          }
          currentTrackIndexRef.current = 0;
          isInitializedRef.current = true;
        }
      };

      if (audio.readyState >= 2) {
        setTimeout(tryPlay, 100);
      } else {
        audio.addEventListener('canplay', tryPlay, { once: true });
        audio.load();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const trackIndex = getTrackIndex(currentSlide);
    
    if (trackIndex >= musicSources.length) {
      return;
    }

    // If this is the initial load and we haven't started any track yet
    if (currentTrackIndexRef.current === -1 && trackIndex === 0) {
      const audio = audioRefs.current[0];
      if (audio) {
        audio.loop = true;
        audio.volume = 0.3;
        const tryPlay = () => {
          if (!isMuted) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
              playPromise.catch((error) => {
                console.log('Audio play failed:', error);
              });
            }
          }
        };
        
        if (audio.readyState >= 2) {
          tryPlay();
        } else {
          audio.addEventListener('canplay', tryPlay, { once: true });
          audio.load();
        }
        currentTrackIndexRef.current = 0;
        isInitializedRef.current = true;
      }
      return;
    }

    if (trackIndex !== currentTrackIndexRef.current) {
      const previousTrack = currentTrackIndexRef.current;
      
      if (previousTrack >= 0 && audioRefs.current[previousTrack]) {
        audioRefs.current[previousTrack]?.pause();
        audioRefs.current[previousTrack]!.currentTime = 0;
      }

      currentTrackIndexRef.current = trackIndex;
      playTrack(trackIndex);
    }
  }, [currentSlide, musicSources, isMuted]);

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);

    const currentTrack = currentTrackIndexRef.current;
    if (currentTrack >= 0 && audioRefs.current[currentTrack]) {
      if (newMutedState) {
        audioRefs.current[currentTrack]?.pause();
      } else {
        audioRefs.current[currentTrack]?.play().catch((error) => {
          console.log('Audio play failed:', error);
        });
      }
    }
  };

  return (
    <>
      {musicSources.map((src, index) => (
        <audio
          key={index}
          ref={(el) => {
            audioRefs.current[index] = el;
            if (el && index === 0) {
              initializeFirstTrack(el, index);
            }
          }}
          src={src}
          preload="auto"
        />
      ))}
      <button
        onClick={toggleMute}
        className={`
          fixed top-4 right-4 z-50
          w-12 h-12 pixelated-border
          flex items-center justify-center
          transition-all duration-200
          ${isMuted 
            ? 'bg-gray-300 text-gray-600 hover:bg-gray-400' 
            : 'bg-black text-white hover:bg-gray-800'
          }
        `}
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </>
  );
};

export default WrappedMusicPlayer;

