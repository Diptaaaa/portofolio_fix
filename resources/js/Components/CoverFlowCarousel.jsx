import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, ArrowUpRight, Layers } from 'lucide-react';

export default function CoverFlowCarousel({ projects = [], onSelectProject }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const count = projects.length;

    // Typewriter effect state for title
    const phrases = [
        'Work Gallery',
        'Selected Works',
        'Featured Systems',
    ];

    const [phraseIndex, setPhraseIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const fullText = phrases[phraseIndex];
        let timeout;

        if (isPaused) {
            timeout = setTimeout(() => {
                setIsPaused(false);
                setIsDeleting(true);
            }, 2500);
            return () => clearTimeout(timeout);
        }

        if (isDeleting) {
            if (currentText === '') {
                setIsDeleting(false);
                setPhraseIndex((prev) => (prev + 1) % phrases.length);
            } else {
                timeout = setTimeout(() => {
                    setCurrentText((prev) => prev.slice(0, -1));
                }, 40);
            }
        } else {
            if (currentText === fullText) {
                setIsPaused(true);
            } else {
                timeout = setTimeout(() => {
                    setCurrentText(fullText.slice(0, currentText.length + 1));
                }, 90);
            }
        }

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, isPaused, phraseIndex]);

    const nextSlide = () => {
        if (count > 0) {
            setCurrentIndex((prev) => (prev + 1) % count);
        }
    };

    const prevSlide = () => {
        if (count > 0) {
            setCurrentIndex((prev) => (prev - 1 + count) % count);
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [count]);

    // Touch gesture navigation
    const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
    const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 75) nextSlide();
        if (touchStart - touchEnd < -75) prevSlide();
    };

    if (!projects || count === 0) {
        return null;
    }

    const activeProject = projects[currentIndex] || projects[0];

    return (
        <section id="work" className="min-h-screen lg:h-screen lg:max-h-[760px] flex flex-col justify-between pt-20 sm:pt-24 pb-4 sm:pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden relative">
            {/* Subtle background topography contours matching reference */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.08] select-none -z-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" fill="none" stroke="currentColor">
                    <path d="M-100 150 C 350 100, 650 300, 1300 200" strokeWidth="1.5" />
                    <path d="M-100 300 C 450 250, 750 450, 1300 350" strokeWidth="1.5" />
                    <path d="M-100 500 C 350 450, 650 650, 1300 550" strokeWidth="1.5" />
                </svg>
            </div>

            {/* Header: Left-Aligned Title + Right-Aligned "View More Projects" Button */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-2 lg:mb-3">
                <div>
                    {/* Eyebrow */}
                    <div className="mb-1">
                        <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.25em] uppercase text-[var(--accent-muted)]">
                            SELECTED WORK
                        </span>
                    </div>

                    {/* Typewriter Title */}
                    <h2 className="font-body text-2xl sm:text-3xl lg:text-4xl text-[var(--text-primary)] font-bold tracking-tight mb-1 min-h-[1.2em] flex items-center leading-tight [text-wrap:balance]">
                        <span>{currentText}</span>
                        <span 
                            className="inline-block w-[3px] sm:w-[3.5px] h-[0.9em] ml-1 bg-[var(--text-primary)] animate-pulse rounded-full align-middle"
                            aria-hidden="true"
                        />
                    </h2>

                    {/* Subtitle Description (Direct from Reference) */}
                    <p className="text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed max-w-md [text-wrap:pretty]">
                        A collection of systems, digital projects, and technical work I've built.
                    </p>
                </div>

                {/* Right Action Button (Direct to Dedicated /archive Page) */}
                <div className="flex-shrink-0">
                    <Link
                        href="/archive"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl sm:rounded-2xl text-xs font-semibold tracking-wide text-zinc-900 bg-white hover:bg-zinc-100 dark:text-zinc-900 dark:bg-white dark:hover:bg-zinc-100 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer group min-h-[44px]"
                    >
                        <span>View More Projects</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* 3D Cover Flow Perspective Stage */}
            <div 
                className="perspective-container relative w-full mx-auto min-h-[240px] sm:min-h-[270px] md:min-h-[290px] flex items-center justify-center select-none my-auto"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Previous Slide Trigger Arrow */}
                <button
                    onClick={prevSlide}
                    aria-label="Previous Project"
                    className="absolute left-2 sm:left-4 md:left-8 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[var(--bg-surface)]/80 hover:bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-prominent)] hover:border-[var(--accent-primary)] hover:scale-110 shadow-xl backdrop-blur-md transition-all cursor-pointer"
                >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Next Slide Trigger Arrow */}
                <button
                    onClick={nextSlide}
                    aria-label="Next Project"
                    className="absolute right-2 sm:right-4 md:right-8 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[var(--bg-surface)]/80 hover:bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-prominent)] hover:border-[var(--accent-primary)] hover:scale-110 shadow-xl backdrop-blur-md transition-all cursor-pointer"
                >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* 3D Rotating Stack */}
                <div className="relative w-[300px] h-[190px] sm:w-[420px] sm:h-[255px] md:w-[490px] md:h-[285px] preserve-3d flex items-center justify-center">
                    {projects.map((project, index) => {
                        // Calculate relative offset to active index
                        let offset = index - currentIndex;
                        if (offset < -Math.floor(count / 2)) offset += count;
                        if (offset > Math.floor(count / 2)) offset -= count;

                        const isActive = offset === 0;
                        const isVisible = Math.abs(offset) <= 2;

                        if (!isVisible) return null;

                        // 3D Matrix Transforms matching reference coverflow
                        let transformStyle = '';
                        let zIndex = 20 - Math.abs(offset) * 2;
                        let opacity = 1;

                        if (isActive) {
                            transformStyle = 'translateX(0%) translateZ(90px) rotateY(0deg) scale(1.05)';
                            opacity = 1;
                        } else if (offset === -1) {
                            transformStyle = 'translateX(-64%) translateZ(-70px) rotateY(26deg) scale(0.85)';
                            opacity = 0.65;
                        } else if (offset === 1) {
                            transformStyle = 'translateX(64%) translateZ(-70px) rotateY(-26deg) scale(0.85)';
                            opacity = 0.65;
                        } else if (offset < -1) {
                            transformStyle = 'translateX(-118%) translateZ(-160px) rotateY(38deg) scale(0.72)';
                            opacity = 0.28;
                        } else if (offset > 1) {
                            transformStyle = 'translateX(118%) translateZ(-160px) rotateY(-38deg) scale(0.72)';
                            opacity = 0.28;
                        }

                        const thumbnailSrc = project.thumbnail_path ? `/storage/${project.thumbnail_path}` : null;

                        return (
                            <div
                                key={project.id}
                                onClick={() => {
                                    if (!isActive) {
                                        setCurrentIndex(index);
                                    } else if (onSelectProject) {
                                        onSelectProject(project);
                                    }
                                }}
                                className={`absolute inset-0 rounded-2xl sm:rounded-3xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer overflow-hidden ${
                                    isActive 
                                        ? 'shadow-[0_28px_60px_rgba(0,0,0,0.7)] ring-1 ring-[var(--border-prominent)]' 
                                        : 'shadow-2xl'
                                }`}
                                style={{
                                    transform: transformStyle,
                                    zIndex: zIndex,
                                    opacity: opacity,
                                }}
                            >
                                <div className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex flex-col group relative">
                                    {/* Browser Window Mockup Titlebar */}
                                    <div className="px-3.5 py-2.5 bg-[var(--bg-surface-elevated)] border-b border-[var(--border-subtle)] flex items-center justify-between select-none">
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80"></span>
                                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></span>
                                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></span>
                                        </div>
                                        <div className="text-[10px] font-mono text-[var(--text-muted)] truncate max-w-[180px] sm:max-w-[260px]">
                                            {project.title}
                                        </div>
                                        <div className="text-[10px] font-mono text-[var(--text-muted)] opacity-60">
                                            {project.year || '2024'}
                                        </div>
                                    </div>

                                    {/* Project Preview Image (Clean Viewport) */}
                                    <div className="relative flex-1 w-full overflow-hidden bg-[var(--bg-secondary)] flex items-center justify-center">
                                        {thumbnailSrc ? (
                                            <img
                                                src={thumbnailSrc}
                                                alt={project.title}
                                                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)] text-xs font-mono">
                                                No Preview Image
                                            </div>
                                        )}

                                        {/* Subtle Category Pill Tag */}
                                        <div className="absolute top-3 left-3 flex items-center gap-2">
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-md border ${
                                                project.category === 'technical'
                                                    ? 'bg-amber-500/20 text-amber-200 border-amber-500/30'
                                                    : 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30'
                                            }`}>
                                                {project.category === 'technical' ? 'Technical' : 'Analytics'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Active Project Details Below Carousel (Direct from Reference) */}
            <div className="mt-3 sm:mt-4 max-w-2xl mx-auto text-center px-4 transition-all duration-300">
                {/* Active Project Title */}
                <h3 className="font-body text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-[var(--text-primary)] mb-1 transition-colors line-clamp-1">
                    {activeProject.title}
                </h3>

                {/* Active Project Description */}
                <p className="text-xs sm:text-[12.5px] text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto mb-2 font-normal line-clamp-2">
                    {activeProject.full_description || activeProject.short_description}
                </p>

                {/* Action Link: View Project → */}
                <div>
                    <button
                        onClick={() => onSelectProject && onSelectProject(activeProject)}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-all group cursor-pointer underline underline-offset-4 decoration-[var(--border-prominent)] hover:decoration-[var(--accent-primary)]"
                    >
                        <span>View Project</span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                    </button>
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-1.5 mt-2.5 sm:mt-3">
                {projects.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                            currentIndex === idx 
                                ? 'w-7 bg-[var(--accent-primary)]' 
                                : 'w-2 bg-[var(--border-prominent)] hover:bg-[var(--accent-muted)]'
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}
