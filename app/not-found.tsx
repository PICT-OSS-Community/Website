"use client"
import { BookOpen, Code, ExternalLink, Disc as Discord, Github, Mail, Twitter, Users } from "lucide-react";
import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import dynamic from 'next/dynamic';

const PixelArt = dynamic(() => import("./components/PixelArt"), { ssr: false });

export default function NotFound() {

    const CTAButton = ({
        children,
        color,
        size = 'medium',
        variant = 'solid',
        className = '',
    }: {
        children: React.ReactNode;
        color: 'red' | 'blue' | 'green' | 'yellow';
        size?: 'medium' | 'large';
        variant?: 'solid' | 'outline';
        className?: string;
    }) => {
        const colorClasses = {
            red: variant === 'solid'
                ? 'bg-red-500 hover:bg-red-600 text-white border-red-700'
                : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white',
            blue: variant === 'solid'
                ? 'bg-blue-500 hover:bg-blue-600 text-white border-blue-700'
                : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
            green: variant === 'solid'
                ? 'bg-green-500 hover:bg-green-600 text-white border-green-700'
                : 'border-green-500 text-green-500 hover:bg-green-500 hover:text-white',
            yellow: variant === 'solid'
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-700'
                : 'border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white'
        };

        const sizeClasses = {
            medium: 'px-4 py-2 text-lg',
            large: 'px-6 py-3 text-xl'
        };

        return (
            <button className={`
          ${colorClasses[color]} 
          ${sizeClasses[size]}
          ${className}
          font-mono font-bold pixelated-border 
          hover:scale-105 transition-all duration-200 
          flex items-center justify-center
          cursor-pointer
        `}>
                {children}
            </button>
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
            text-white p-3 pixelated-border-white hover:scale-110 transition-all duration-200
          `}
                target="_blank"
            >
                <Icon size={20} />
            </a>
        );
    };

    const PixelCloud = () => (
        <div className="relative">
            <div className="bg-gray-300 w-16 h-8 pixelated-border"></div>
            <div className="bg-gray-300 w-12 h-6 pixelated-border absolute -top-2 left-2"></div>
            <div className="bg-gray-300 w-8 h-4 pixelated-border absolute -top-1 right-1"></div>
        </div>
    );



    return (
        <div className="min-h-screen bg-white flex justify-center items-center">
            <div className="flex flex-col lg:flex-row w-full justify-center gap-14 items-center ">
                {/* Decorative Clouds */}
                <div className="absolute top-10 left-10 opacity-20">
                    <PixelCloud />
                </div>
                <div className="absolute top-28 right-36 opacity-20">
                    <PixelCloud />
                </div>
                <div className="absolute bottom-20 left-1/4 opacity-20">
                    <PixelCloud />
                </div>

                <div className="flex text-black flex-col lg:w-[40%] w-[70%] items-center md:items-start lg:p-20 gap-5 lg:gap-14">
                    <div className="code font-mono text-2xl text-gray-700 ">Error Code : 404</div>
                    <div className="error flex flex-col font-mono gap-3 justify-center items-center  md:items-start">
                        <span className="oops font-extrabold text-5xl md:text-7xl min-w-fit">OOPS !</span>
                        <div className="reason text-center md:text-start  text-5xl">
                            Page not found.
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 items-center md:items-start justify-start">
                        <div className="message font-mono text-gray-700">
                            Here are some helpful links :
                        </div>
                        <div className="text-center flex flex-row gap-4 items-center" >
                            <Link
                                href="/"
                                className="bg-black text-white font-mono font-bold px-6 py-3 text-xl pixelated-border hover:scale-105 transition-all duration-200 flex items-center justify-center mx-auto w-fit"
                            >
                            <ExternalLink className="mr-2" size={20} />
                                HOMEPAGE
                            </Link>

                            <Link href="#Events" >
                                <CTAButton className="mr-2" color="red" size="large">
                                    <Users className="mr-2" size={23} />
                                    Events
                                </CTAButton>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="right flex flex-row md:flex-col lg:w-[40%] w-fit justify-start lg:gap-6 lg:items-end md:w-full md:pl-32 lg:pr-32">
                    <div className="flex space-x-2 md:space-x-7 lg:space-x-2 lg:pr-12">
                        <SocialIcon href="https://github.com/PICT-OSS-Community" icon={Github} color="blue" />
                        <SocialIcon href="" icon={BookOpen} color="red" />
                        <SocialIcon href="" icon={Twitter} color="yellow" />
                        <SocialIcon href="https://discord.gg/zgGmkFSr" icon={Discord} color="green" />
                        <SocialIcon href="#" icon={Mail} color="blue" />
                    </div>
                    <div className="gif w-fit lg:block hidden">
                        <Image
                            src="/search404.gif"
                            alt="gif"
                            width={400}
                            height={400}
                            loading="lazy"
                        />
                    </div>
                    <div className="hidden lg:flex justify-center lg:justify-end lg:pr-12">
                        <PixelArt />
                    </div>
                </div>
            </div>
        </div>
    );
}