'use client';

import React, { useEffect, useState } from 'react';
import CountUp from './CountUp';

interface GrowthGraphProps {
    onComplete?: () => void;
}

const GrowthGraph: React.FC<GrowthGraphProps> = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [showCounter, setShowCounter] = useState(false);
    const [beat, setBeat] = useState(false);

    // Data points adjusted for smoother, slower-feeling growth
    // More linear progression to avoid "rushing" to the top
    const points = [
        [5, 45],     // Start lower
        [20, 150],   // Slow start
        [35, 280],
        [50, 420],   // Linear middle
        [65, 580],
        [80, 700],
        [95, 801]    // End
    ];

    const generatePath = () => {
        const svgPoints = points.map(([x, y]) => {
            // Normalize Y: 800 -> 0, 0 -> 100
            // We map 0-800 to y=95 (bottom) to y=5 (top) to leave room for axes
            const normalizedY = 95 - (y / 800 * 90);
            return `${x},${normalizedY}`;
        });

        let d = `M ${svgPoints[0]}`;
        for (let i = 1; i < svgPoints.length; i++) {
            // Curve interpolation
            const [x0, y0] = svgPoints[i - 1].split(',').map(Number);
            const [x1, y1] = svgPoints[i].split(',').map(Number);

            // Simple cubic bezier for smoothness
            const cp1x = x0 + (x1 - x0) * 0.5;
            const cp1y = y0;
            const cp2x = x0 + (x1 - x0) * 0.5;
            const cp2y = y1;

            d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x1},${y1}`;
        }
        return d;
    };

    const pathD = generatePath();

    useEffect(() => {
        const startTimer = setTimeout(() => {
            setIsVisible(true);
            setShowCounter(true);
        }, 100);

        // Trigger beat at 6s (when count reaches 800/801)
        const beatTimer = setTimeout(() => {
            setBeat(true);
        }, 6000);

        const completeTimer = setTimeout(() => {
            if (onComplete) onComplete();
        }, 8000); // 6s animation + 2s wait before transition

        return () => {
            clearTimeout(startTimer);
            clearTimeout(beatTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white top-0 left-0 w-full h-full">

            <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} w-full h-full relative`}>

                {/* Counter - Centered Top */}
                <div className={`
             absolute top-16 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none text-center
             ${beat ? 'animate-scaleIn' : ''}
        `}>
                    <h2 className="font-mono text-xl sm:text-2xl text-gray-400 mb-1 animate-fadeIn uppercase tracking-widest">Community Growth</h2>
                    <div className={`flex items-baseline justify-center gap-2 transition-transform duration-300 ${beat ? 'scale-110' : ''}`}>
                        <div className="text-8xl sm:text-9xl md:text-[10rem] font-bold font-mono text-black tracking-tighter">
                            {showCounter && <CountUp value={801} duration={6000} />}
                        </div>
                    </div>

                    <p className="font-mono text-lg text-gray-400 mt-1">Active Members</p>
                </div>

                {/* Full Screen Graph - Restricted height on mobile to prevent distortion */}
                <div className="w-full h-[60%] sm:h-full absolute bottom-0 left-0 z-10 px-4 pb-12 sm:px-12 sm:py-16">
                    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                        {/* Axes */}
                        <line x1="5" y1="5" x2="5" y2="95" stroke="#e5e7eb" strokeWidth="0.5" /> {/* Y Axis */}
                        <line x1="5" y1="95" x2="95" y2="95" stroke="#e5e7eb" strokeWidth="0.5" /> {/* X Axis */}

                        {/* X Axis Labels */}
                        <text x="5" y="98" fontSize="2" fill="#9ca3af" textAnchor="middle">Jan</text>
                        <text x="50" y="98" fontSize="2" fill="#9ca3af" textAnchor="middle">Jun</text>
                        <text x="95" y="98" fontSize="2" fill="#9ca3af" textAnchor="middle">Dec</text>

                        {/* Y Axis Labels */}
                        <text x="4" y="95" fontSize="2" fill="#9ca3af" textAnchor="end">0</text>
                        <text x="4" y="55" fontSize="2" fill="#9ca3af" textAnchor="end">400</text>
                        <text x="4" y="5" fontSize="2" fill="#9ca3af" textAnchor="end">800</text>

                        {/* Grid Lines */}
                        <line x1="5" y1="55" x2="95" y2="55" stroke="#e5e7eb" strokeWidth="0.2" strokeDasharray="1 1" />
                        <line x1="5" y1="50" x2="95" y2="50" stroke="#e5e7eb" strokeWidth="0.2" strokeDasharray="1 1" />

                        {/* Area Fill */}
                        <defs>
                            <linearGradient id="gradientRed" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.1" />
                                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        <path
                            d={`${pathD} L 95,95 L 5,95 Z`}
                            fill="url(#gradientRed)"
                            className="opacity-0 animate-fadeIn"
                            style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
                        />

                        {/* The Line - Defined with an ID for the marker to follow */}
                        <path
                            id="growthLine"
                            d={pathD}
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="path-draw-long"
                            style={{ filter: 'drop-shadow(0px 2px 4px rgba(239, 68, 68, 0.2))' }}
                        />

                        {/* Arrow Head - following the path */}
                        <g>
                            <animateMotion dur="6s" repeatCount="1" fill="freeze" calcMode="linear" rotate="auto">
                                <mpath href="#growthLine" />
                            </animateMotion>
                            {/* The shape is rotated so 0 degrees points +X. 
                         Our path goes roughly +X so this aligns. 
                         Triangle pointing right.
                     */}
                            <path d="M -2,-2 L 2,0 L -2,2 Z" fill="#ef4444" transform="scale(1.5)" />
                        </g>

                    </svg>
                </div>

            </div>

            {/* CSS for long path drawing animation */}
            <style jsx>{`
        .path-draw-long {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw 6s linear forwards;
        }
        
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
        </div>
    );
};

export default GrowthGraph;
