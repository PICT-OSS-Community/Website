'use client';

import Image from 'next/image';
import React, { useState } from 'react';

interface TeamMemberCardProps {
    name: string;
    image1: string;
    image2?: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ name, image1, image2 }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-4 border-black pixelated-border shadow-lg transition-transform duration-500 group-hover:scale-125">
                {/* Base Image (Image 1) */}
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src={image1}
                        alt={name}
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                </div>

                {/* Hover Image (Image 2) - Fades in if present */}
                {image2 && (
                    <div
                        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <Image
                            src={image2}
                            alt={`${name} hover`}
                            layout="fill"
                            objectFit="cover"
                            priority
                        />
                    </div>
                )}
            </div>
            <div className="mt-2 text-center">
                <p className="font-mono font-bold text-sm sm:text-base md:text-lg text-black bg-white inline-block px-2 py-1 pixelated-border">
                    {name}
                </p>
            </div>
        </div>
    );
};

export default TeamMemberCard;
