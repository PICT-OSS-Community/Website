'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface PhotoCarouselProps {
    images: string[];
    interval?: number;
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ images, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images.length, interval]);

    return (
        <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-900 bg-gray-100">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    <Image
                        src={images[currentIndex]}
                        alt={`Slide ${currentIndex + 1}`}
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>
            </AnimatePresence>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-6' : 'bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default PhotoCarousel;
