import React, { useState, useEffect } from 'react';
import { 
    Code, 
    FlaskConical, 
    Rocket, 
    ChevronRight, 
    Sparkles, 
    CheckCircle2, 
    RefreshCw, 
    Layers,
    FileText
} from 'lucide-react';

export default function TraitDeck({ 
    profile, 
    traits = [], 
    projectsCount = 12, 
    awardsCount = 9,
    onOpenContact 
}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const count = traits.length || 4;

    // Typewriter effect state for title
    const phrases = [
        'Problem Solver. Digital Generalist.',
        'Fullstack Craftsman. Data Analyst.',
        'Engineering with Empathy & Precision.',
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
                }, 35);
            }
        } else {
            if (currentText === fullText) {
                setIsPaused(true);
            } else {
                timeout = setTimeout(() => {
                    setCurrentText(fullText.slice(0, currentText.length + 1));
                }, 80);
            }
        }

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, isPaused, phraseIndex]);

    const nextTrait = () => {
        if (count > 0) {
            setActiveIndex((prev) => (prev + 1) % count);
        }
    };

    const rotations = [-4, 3, -3, 5];

    // Fallback traits if database has empty array
    const defaultTraits = [
        {
            id: 1,
            title: 'Detail-Oriented',
            tagline: 'Precision in Every Interaction',
            description: 'From 60fps micro-animations to semantic accessibility and pixel-perfect design alignment.',
        },
        {
            id: 2,
            title: 'Problem Solver',
            tagline: 'Pragmatic & Resilient Solutions',
            description: 'Decomposing complex systemic bottlenecks into elegant, modular, and maintainable software architectures.',
        },
        {
            id: 3,
            title: 'Data-Driven',
            tagline: 'Decisions Backed by Quantitative Rigor',
            description: 'Leveraging data pipelines, exploratory analytics, and machine learning models for measurable impact.',
        },
        {
            id: 4,
            title: 'Continuous Learner',
            tagline: 'Rapid Adaptation to Modern Tech',
            description: 'Constantly exploring modern web frameworks, Apple ecosystem engineering, and scalable backend design.',
        },
    ];

    const displayTraits = traits.length > 0 ? traits : defaultTraits;
    const activeTraitCount = displayTraits.length;

    const avatarSrc = profile?.profile_cutout_path 
        ? `/storage/${profile.profile_cutout_path}`
        : '/storage/profile/foto_profil.png';

    return (
        <section id="about" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden relative scroll-mt-24">
            {/* Background subtle contour topography matching reference */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06] select-none -z-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" fill="none" stroke="currentColor">
                    <path d="M-100 200 C 300 150, 700 350, 1300 250" strokeWidth="1.5" />
                    <path d="M-100 400 C 400 350, 800 550, 1300 450" strokeWidth="1.5" />
                </svg>
            </div>

            {/* Header: Eyebrow + Typewriter Title (Direct from Reference 09 & 10) */}
            <div className="mb-6 sm:mb-8">
                <div className="mb-1.5">
                    <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.25em] uppercase text-[var(--accent-muted)]">
                        ABOUT ME
                    </span>
                </div>

                <h2 className="font-body text-2xl sm:text-3xl lg:text-4xl text-[var(--text-primary)] font-bold tracking-tight min-h-[1.25em] flex items-center leading-tight">
                    <span>{currentText}</span>
                    <span 
                        className="inline-block w-[3px] sm:w-[3.5px] h-[0.9em] ml-1 bg-[var(--text-primary)] animate-pulse rounded-full align-middle"
                        aria-hidden="true"
                    />
                </h2>
            </div>

            {/* Main Content Grid: Left Profile & Bio, Right 3D Trait Deck */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* Left Column: Profile Card, Bio Narrative, and Currently Pills */}
                <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-between">
                    
                    {/* Profile Header Row: Avatar, Name with Verified Badge, and Quick Stats */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 mb-4">
                        {/* Circular Avatar Photo */}
                        <div className="relative flex-shrink-0">
                            <img
                                src={avatarSrc}
                                alt={profile?.full_name || 'Muhammad Rafli Pradipta'}
                                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-top border-2 border-[var(--border-prominent)] shadow-xl bg-[var(--bg-surface)] ring-4 ring-[var(--bg-surface)]/50"
                                onError={(e) => {
                                    // Graceful fallback to hero image or initials placeholder
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = '/favicon.png';
                                }}
                            />
                        </div>

                        {/* Name & Stats Row */}
                        <div className="flex-1 min-w-0">
                            {/* Full Name with Blue Verified Badge */}
                            <div className="flex items-center gap-1.5 mb-2.5">
                                <h3 className="font-body text-base sm:text-lg font-bold tracking-wide text-[var(--text-primary)] uppercase truncate">
                                    {profile?.full_name || 'MUHAMMAD RAFLI PRADIPTA'}
                                </h3>
                                <svg 
                                    className="w-4 h-4 text-sky-500 fill-current flex-shrink-0" 
                                    viewBox="0 0 24 24"
                                    title="Verified Profile"
                                >
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                            </div>

                            {/* 3 Stats Metrics Bar (Direct from Reference) */}
                            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-2 border-t border-[var(--border-subtle)]">
                                <div>
                                    <span className="block text-[10px] font-mono tracking-widest text-[var(--text-muted)] uppercase">
                                        PROJECTS
                                    </span>
                                    <span className="text-sm sm:text-base font-bold font-mono text-[var(--text-primary)]">
                                        {projectsCount || 12}+
                                    </span>
                                </div>
                                <div>
                                    <span className="block text-[10px] font-mono tracking-widest text-[var(--text-muted)] uppercase">
                                        CERTIFICATES
                                    </span>
                                    <span className="text-sm sm:text-base font-bold font-mono text-[var(--text-primary)]">
                                        {awardsCount || 9}
                                    </span>
                                </div>
                                <div>
                                    <span className="block text-[10px] font-mono tracking-widest text-[var(--text-muted)] uppercase truncate">
                                        CS GRADUATED
                                    </span>
                                    <span className="text-sm sm:text-base font-bold font-mono text-[var(--text-primary)]">
                                        2024
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bio Narrative Description */}
                    <div className="text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed space-y-2 mb-4 font-normal">
                        <p>
                            I'm a Computer Science graduate from <span className="text-[var(--text-primary)] font-medium">Universitas Brawijaya</span> focused on full-stack web engineering, resilient system architecture, and data analytics. I enjoy turning complex data pipelines and ideas into practical, high-performance digital solutions, particularly through web applications, databases, and system testing.
                        </p>
                        <p>
                            Throughout my academic and professional journey, I developed capstone projects for <span className="text-[var(--text-primary)] font-medium">Meta</span> and <span className="text-[var(--text-primary)] font-medium">Google</span> professional certificates, gaining hands-on mastery in reactive user interfaces, machine learning forecasting, and accessibility-first systems.
                        </p>
                        <p className="pt-0.5">
                            Want to know more about my experience?{' '}
                            <a 
                                href="/cv.pdf" 
                                download="CV_Muhammad_Rafli_Pradipta.pdf"
                                className="underline underline-offset-4 decoration-[var(--border-prominent)] hover:decoration-[var(--accent-primary)] font-semibold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors cursor-pointer"
                            >
                                Download my resume.
                            </a>
                        </p>
                    </div>

                    {/* Bottom Status: CURRENTLY Section (Direct from Reference) */}
                    <div className="pt-3 border-t border-[var(--border-subtle)]">
                        <span className="text-[10px] font-mono font-medium tracking-[0.25em] uppercase text-[var(--text-muted)] block mb-2.5">
                            CURRENTLY
                        </span>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            {/* 1. Building */}
                            <div className="p-2.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center gap-2.5 group hover:border-[var(--border-prominent)] transition-all">
                                <span className="w-7 h-7 rounded-lg bg-[var(--bg-surface-elevated)] flex items-center justify-center text-[var(--accent-primary)] flex-shrink-0">
                                    <Code className="w-3.5 h-3.5" />
                                </span>
                                <div className="min-w-0">
                                    <span className="block text-xs font-bold text-[var(--text-primary)]">Building</span>
                                    <span className="block text-[10.5px] text-[var(--text-muted)] truncate">Web & digital systems</span>
                                </div>
                            </div>

                            {/* 2. Exploring */}
                            <div className="p-2.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center gap-2.5 group hover:border-[var(--border-prominent)] transition-all">
                                <span className="w-7 h-7 rounded-lg bg-[var(--bg-surface-elevated)] flex items-center justify-center text-[var(--accent-primary)] flex-shrink-0">
                                    <FlaskConical className="w-3.5 h-3.5" />
                                </span>
                                <div className="min-w-0">
                                    <span className="block text-xs font-bold text-[var(--text-primary)]">Exploring</span>
                                    <span className="block text-[10.5px] text-[var(--text-muted)] truncate">Data intelligence & ML</span>
                                </div>
                            </div>

                            {/* 3. Learning */}
                            <div className="p-2.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center gap-2.5 group hover:border-[var(--border-prominent)] transition-all">
                                <span className="w-7 h-7 rounded-lg bg-[var(--bg-surface-elevated)] flex items-center justify-center text-[var(--accent-primary)] flex-shrink-0">
                                    <Rocket className="w-3.5 h-3.5" />
                                </span>
                                <div className="min-w-0">
                                    <span className="block text-xs font-bold text-[var(--text-primary)]">Learning</span>
                                    <span className="block text-[10.5px] text-[var(--text-muted)] truncate">Apple ecosystem & Swift</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column: 3D Interactive Trait Deck (Direct from Reference 10) */}
                <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-center justify-center pt-2 lg:pt-4">
                    <div className="relative w-full max-w-[320px] sm:max-w-[360px] h-[310px] sm:h-[340px] flex items-center justify-center select-none preserve-3d">
                        
                        {displayTraits.map((trait, index) => {
                            let offset = index - activeIndex;
                            if (offset < 0) offset += activeTraitCount;

                            const isTop = offset === 0;
                            const isSecond = offset === 1;
                            const isThird = offset === 2;
                            const isFourth = offset >= 3;

                            const zIndex = activeTraitCount - offset;
                            const rot = rotations[index % rotations.length];

                            let transform = '';
                            let opacity = 1;

                            if (isTop) {
                                transform = `rotate(${rot}deg) translateY(0px) translateZ(30px) scale(1)`;
                                opacity = 1;
                            } else if (isSecond) {
                                transform = `rotate(${-rot * 0.7}deg) translateY(12px) translateZ(-15px) scale(0.96)`;
                                opacity = 0.85;
                            } else if (isThird) {
                                transform = `rotate(${rot * 0.5}deg) translateY(24px) translateZ(-40px) scale(0.92)`;
                                opacity = 0.65;
                            } else {
                                transform = `rotate(${-rot * 0.4}deg) translateY(36px) translateZ(-65px) scale(0.88)`;
                                opacity = 0.35;
                            }

                            return (
                                <div
                                    key={trait.id || index}
                                    onClick={nextTrait}
                                    title="Click to shuffle next trait"
                                    className={`absolute inset-0 rounded-3xl p-6 sm:p-7 bg-[var(--bg-surface)] border border-[var(--border-prominent)] shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer flex flex-col justify-between ${
                                        isTop 
                                            ? 'ring-1 ring-[var(--accent-primary)]/40 hover:scale-[1.02]' 
                                            : 'pointer-events-none'
                                    }`}
                                    style={{
                                        zIndex: zIndex,
                                        transform: transform,
                                        opacity: opacity,
                                    }}
                                >
                                    {/* Card Top: Tag + Index */}
                                    <div>
                                        <div className="flex items-center justify-between mb-6">
                                            <span className="text-[11px] font-mono font-semibold tracking-[0.25em] uppercase text-[var(--accent-muted)]">
                                                TRAIT
                                            </span>
                                            <span className="text-xs font-mono text-[var(--text-muted)] font-bold">
                                                #{String(index + 1).padStart(2, '0')}
                                            </span>
                                        </div>

                                        {/* Trait Title (Large & Bold matching Reference 10) */}
                                        <h4 className="font-body text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-3 leading-snug">
                                            {trait.title}
                                        </h4>

                                        {/* Tagline / Subtitle */}
                                        {trait.tagline && (
                                            <p className="text-xs font-mono uppercase tracking-wider text-[var(--accent-primary)] mb-3">
                                                {trait.tagline}
                                            </p>
                                        )}

                                        {/* Trait Description */}
                                        <p className="text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed font-normal">
                                            {trait.description}
                                        </p>
                                    </div>

                                    {/* Card Bottom Indicator: Click to Shuffle */}
                                    <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)] font-mono">
                                        <span className="flex items-center gap-1.5 text-[11px]">
                                            <RefreshCw className="w-3 h-3 text-[var(--accent-muted)] animate-spin-slow" />
                                            <span>Click card to shuffle</span>
                                        </span>
                                        <span className="font-bold text-[var(--accent-primary)]">
                                            {index + 1} / {activeTraitCount}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}
