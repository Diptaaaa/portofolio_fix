import React, { useState } from 'react';
import { ArrowDown, MapPin, Sparkles } from 'lucide-react';

export default function HeroSection({ profile, onOpenContact }) {
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const rect = currentTarget.getBoundingClientRect();
        const x = (clientX - (rect.left + rect.width / 2)) / 30;
        const y = (clientY - (rect.top + rect.height / 2)) / 30;
        setMouseOffset({ x, y });
    };

    const handleMouseLeave = () => {
        setMouseOffset({ x: 0, y: 0 });
    };

    const outlineName = profile?.display_name_outline || 'RAFLI PRADIPTA';
    // Use cropped clean high-res image
    const cutoutUrl = '/storage/profile/foto_profil.png?v=4';

    return (
        <section 
            id="hero"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative h-screen min-h-[640px] max-h-[1080px] w-full flex items-end justify-center overflow-hidden px-4 select-none"
        >
            {/* Ambient Background Lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[800px] h-[650px] sm:h-[800px] bg-[var(--accent-primary)]/10 rounded-full blur-[160px] pointer-events-none -z-10"></div>
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>

            {/* Giant Background Infinite Scrolling Marquee Typography (Layer 1) */}
            <div 
                className="absolute inset-x-0 top-[63%] -translate-y-1/2 flex items-center select-none pointer-events-none z-0 overflow-hidden"
                style={{
                    transform: `translate3d(0, calc(-50% + ${-mouseOffset.y * 0.35}px), 0)`,
                    transition: 'transform 0.15s ease-out'
                }}
            >
                <div className="animate-hero-marquee flex items-center whitespace-nowrap">
                    {/* First Track */}
                    <div className="flex items-center shrink-0">
                        <span className="font-display text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] tracking-tight uppercase leading-none text-outline-hero select-none px-6 sm:px-12">
                            MUHAMMAD RAFLI PRADIPTA
                        </span>
                        <span className="font-display text-[12vw] sm:text-[10vw] leading-none text-outline-thin opacity-40 select-none px-3">
                            •
                        </span>
                        <span className="font-display text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] tracking-tight uppercase leading-none text-outline-hero select-none px-6 sm:px-12">
                            MUHAMMAD RAFLI PRADIPTA
                        </span>
                        <span className="font-display text-[12vw] sm:text-[10vw] leading-none text-outline-thin opacity-40 select-none px-3">
                            •
                        </span>
                    </div>

                    {/* Exact Duplicate Track for Seamless Infinite Looping */}
                    <div className="flex items-center shrink-0" aria-hidden="true">
                        <span className="font-display text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] tracking-tight uppercase leading-none text-outline-hero select-none px-6 sm:px-12">
                            MUHAMMAD RAFLI PRADIPTA
                        </span>
                        <span className="font-display text-[12vw] sm:text-[10vw] leading-none text-outline-thin opacity-40 select-none px-3">
                            •
                        </span>
                        <span className="font-display text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] tracking-tight uppercase leading-none text-outline-hero select-none px-6 sm:px-12">
                            MUHAMMAD RAFLI PRADIPTA
                        </span>
                        <span className="font-display text-[12vw] sm:text-[10vw] leading-none text-outline-thin opacity-40 select-none px-3">
                            •
                        </span>
                    </div>
                </div>
            </div>

            {/* Large Subject Cutout Photo Layer (Layer 2) - Anchored at Bottom */}
            <div 
                className="relative z-10 flex justify-center items-end h-[78vh] sm:h-[84vh] md:h-[89vh] max-h-[890px] w-auto pointer-events-none"
                style={{
                    transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
                    transition: 'transform 0.12s ease-out'
                }}
            >
                <div className="relative h-full flex items-end">
                    {/* Subtle Radial Glow Behind Subject */}
                    <div className="absolute inset-x-10 bottom-6 top-16 bg-[var(--accent-primary)]/20 rounded-full blur-3xl -z-10"></div>

                    <img
                        src={cutoutUrl}
                        alt={profile?.full_name || 'Muhammad Rafli Pradipta'}
                        className="h-full w-auto max-w-none object-contain object-bottom drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)] select-none pointer-events-auto transition-transform duration-500 hover:scale-[1.015]"
                        loading="eager"
                        onError={(e) => {
                            // Fallback if storage symlink is reloading
                            e.currentTarget.src = '/images/foto_profil_hero.png?v=3';
                        }}
                    />
                </div>
            </div>

            {/* Floating Info Pill - Bottom Left */}
            <div className="absolute bottom-8 left-6 sm:left-12 z-20 flex flex-col gap-2 max-w-xs sm:max-w-sm pointer-events-auto">
                <div className="glass-pill px-4 py-2 rounded-2xl flex items-center gap-2.5 border border-[var(--border-prominent)] shadow-xl w-fit">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span className="text-xs font-semibold tracking-wider uppercase text-[var(--text-primary)]">
                        {profile?.tagline || 'Fullstack Engineer & Data Analyst'}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)] pl-1">
                    <MapPin className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    <span>{profile?.location || 'Malang / Surabaya, ID'}</span>
                    <span className="opacity-40">•</span>
                    <span className="text-[var(--text-secondary)]">Universitas Brawijaya</span>
                </div>
            </div>

            {/* Vertical Scroll Down Indicator - Bottom Right (Direct from Reference) */}
            <a 
                href="#work" 
                className="absolute bottom-8 right-6 sm:right-12 z-20 hidden sm:flex flex-col items-center gap-3 text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors group cursor-pointer"
                aria-label="Scroll Down"
            >
                <span className="text-[10px] tracking-[0.25em] uppercase font-semibold rotate-90 origin-right translate-x-2.5 mb-5 opacity-70 group-hover:opacity-100 transition-opacity">
                    SCROLL DOWN
                </span>
                <div className="w-[1px] h-12 bg-[var(--border-prominent)] group-hover:h-16 group-hover:bg-[var(--accent-primary)] transition-all duration-300"></div>
            </a>

            {/* Mobile Scroll Down Indicator */}
            <a 
                href="#work"
                className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 sm:hidden flex flex-col items-center text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors cursor-pointer"
                aria-label="Scroll Down"
            >
                <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
        </section>
    );
}
