import React, { useState, useEffect } from 'react';
import { 
    Calendar, 
    ArrowUpRight, 
    X, 
    Maximize2, 
    Award, 
    CheckCircle2, 
    ExternalLink,
    Building2,
    Sparkles
} from 'lucide-react';

export default function TrainingsSection({ experiences = [] }) {
    const [selectedItem, setSelectedItem] = useState(null);

    // Typewriter effect state for Section Title (Matching Reference 12-14)
    const phrases = [
        'Trainings & Workshops.',
        'Hackathons & Events.',
        'Continuous Growth.',
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
            }, 2600);
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

    // Close modal on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSelectedItem(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Curated real trainings, workshops & academic growth from Rafli's CV
    const trainingItems = [
        {
            id: 1,
            title: 'Meta Front-End Developer Specialization',
            subtitle: 'React Architecture & Reactive Web Systems',
            organization: 'Meta / Coursera',
            period: 'Sep 2026',
            description: 'Completed a 9-course intensive professional specialization covering React component composition, responsive DOM manipulation, UX prototyping in Figma, and automated testing with Jest. Developed the Little Lemon restaurant reservation application featuring local device time synchronization and client-side booking validation.',
            actionLabel: 'CERTIFICATE OF COMPLETION',
            imagePath: '/storage/projects/little_lemon/Screenshot 2026-10-10 073039.png',
            badge: 'Professional Specialization',
        },
        {
            id: 2,
            title: 'Google Data Analytics Professional Intensive',
            subtitle: 'Large-Scale Cyclistic Pipeline & Tableau Business Intelligence',
            organization: 'Google / Coursera',
            period: 'Aug 2026',
            description: 'Engineered an end-to-end data analytics pipeline cleaning over 5.5 million historical bicycle trip records from Cyclistic Chicago using Python (Pandas) and SQL. Built an interactive Tableau dashboard correlating commute patterns with casual rider behaviors to formulate data-backed annual membership conversion strategies.',
            actionLabel: 'CERTIFICATE OF COMPLETION',
            imagePath: '/storage/projects/cyclistic/Screenshot 2026-10-10 073616.png',
            badge: 'Capstone Project',
        },
        {
            id: 3,
            title: 'Informatics & School Systems Educator Program',
            subtitle: 'Kurikulum Merdeka Instructional Architecture & Systems Observation',
            organization: 'Brawijaya Smart School (BSS) | Malang',
            period: 'Aug - Oct 2025',
            description: 'Designed and executed Grade 10 Informatics lesson plans focusing on Computer Systems, Algorithms, and Operating System architecture under Kurikulum Merdeka. Developed interactive digital instructional materials, gamified learning workflows via Blooket, and contributed to school videotron media and academic administration.',
            actionLabel: 'CERTIFICATE OF APPRECIATION',
            imagePath: '/storage/awards/award_6_WhatsApp Image 2025-12-15 at 02.40.18.jpeg',
            badge: 'School Observation',
        },
        {
            id: 4,
            title: 'Educational Technology & LMS Infrastructure Deployment',
            subtitle: 'Centralized Moodle Platform Setup & Server Administration',
            organization: 'SMA Negeri 1 Sooko | Mojokerto',
            period: 'Jun - Aug 2025',
            description: 'Configured, customized, and deployed a self-hosted Moodle Learning Management System directly onto school server infrastructure to support centralized digital assessments under Kurikulum Merdeka. Streamlined digital learning workflows and user access management for teaching staff and students.',
            actionLabel: 'CERTIFICATE OF COMPLETION',
            imagePath: '/storage/awards/award_5_WhatsApp Image 2025-12-14 at 23.38.03.jpeg',
            badge: 'Infrastructure Tech',
        },
        {
            id: 5,
            title: 'AI Agent Architecture & Prompt Engineering Workshop',
            subtitle: 'Modern Developer Tooling & Autonomous AI Workflows',
            organization: 'Anthropic Developer Community',
            period: '2026',
            description: 'Participated in hands-on technical workshops exploring Claude AI tool use, eval-driven development, and autonomous agent loops to accelerate fullstack engineering with precision and safety.',
            actionLabel: 'CERTIFICATE OF PARTICIPATION',
            imagePath: '/storage/awards/award_2_PORTOFOLIO_MUHAMMAD RAFLI PRADIPTA (3).png',
            badge: 'Hands-on Workshop',
        },
    ];

    return (
        <section id="trainings" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden relative scroll-mt-24">
            
            {/* Header: Left-Aligned Eyebrow + Typewriter Title + Subtitle (Direct from Reference 12-14) */}
            <div className="mb-10 sm:mb-14">
                <div className="mb-1.5">
                    <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.25em] uppercase text-[var(--accent-muted)]">
                        GROWTH & EXPERIENCE
                    </span>
                </div>

                <h2 className="font-body text-2xl sm:text-3xl lg:text-4xl text-[var(--text-primary)] font-bold tracking-tight min-h-[1.25em] flex items-center leading-tight [text-wrap:balance]">
                    <span>{currentText}</span>
                    <span 
                        className="inline-block w-[3px] sm:w-[3.5px] h-[0.9em] ml-1 bg-[var(--text-primary)] animate-pulse rounded-full align-middle"
                        aria-hidden="true"
                    />
                </h2>

                <p className="text-xs sm:text-[13px] text-[var(--text-secondary)] mt-2 max-w-xl leading-relaxed font-normal [text-wrap:pretty]">
                    A collection of trainings, workshops, and hackathons that shaped my technical and collaborative skills.
                </p>
            </div>

            {/* Alternating Zig-Zag / Staggered Layout (Direct from Reference 12-14) */}
            <div className="space-y-12 sm:space-y-16">
                {trainingItems.map((item, index) => {
                    // Alternate: even index = Text on Left, Media on Right; odd index = Media on Left, Text on Right
                    const isEven = index % 2 === 0;

                    return (
                        <div 
                            key={item.id}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                        >
                            {/* Text Info Column */}
                            <div className={`lg:col-span-6 flex flex-col justify-center ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                                
                                {/* Meta Header: Period & Organization */}
                                <div className="flex items-center justify-between gap-4 mb-2">
                                    <span className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-[var(--accent-primary)]">
                                        {item.organization}
                                    </span>
                                    <span className="text-[11px] sm:text-xs font-mono text-[var(--text-muted)] tabular-nums">
                                        {item.period}
                                    </span>
                                </div>

                                {/* Title & Subtitle */}
                                <h3 className="font-body text-xl sm:text-2xl font-bold text-[var(--text-primary)] leading-snug tracking-tight mb-1 [text-wrap:balance]">
                                    {item.title}
                                </h3>

                                {item.subtitle && (
                                    <h4 className="text-xs sm:text-sm font-medium text-[var(--text-secondary)] mb-3">
                                        {item.subtitle}
                                    </h4>
                                )}

                                {/* Narrative Description */}
                                <p className="text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed mb-4 font-normal [text-wrap:pretty]">
                                    {item.description}
                                </p>

                                {/* Action Credential Link / Button (44px hit area) */}
                                <div>
                                    <button
                                        onClick={() => setSelectedItem(item)}
                                        className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[var(--text-primary)] hover:text-[var(--accent-primary)] py-2 group cursor-pointer transition-colors"
                                    >
                                        <span>{item.actionLabel}</span>
                                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </button>
                                </div>
                            </div>

                            {/* Media Photo / Documentation Column */}
                            <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                                <div 
                                    onClick={() => setSelectedItem(item)}
                                    className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-md hover:shadow-2xl hover:border-[var(--border-prominent)] group cursor-pointer transition-all duration-300"
                                >
                                    <img
                                        src={item.imagePath}
                                        alt={item.title}
                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 outline outline-1 outline-black/10 dark:outline-white/10 -outline-offset-1"
                                        loading="lazy"
                                    />

                                    {/* Hover Overlay with Action Icon */}
                                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-mono font-medium flex items-center gap-1.5 shadow-lg">
                                            <Maximize2 className="w-3.5 h-3.5" />
                                            <span>View Documentation</span>
                                        </div>
                                    </div>

                                    {/* Floating Category Badge (concentric radius) */}
                                    <div className="absolute top-3 left-3 pointer-events-none">
                                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-[var(--bg-primary)]/80 backdrop-blur-md text-[var(--text-primary)] border border-[var(--border-subtle)] shadow-sm">
                                            {item.badge}
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>

            {/* Modal Lightbox for Full Documentation & Credential View */}
            {selectedItem && (
                <div 
                    className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedItem(null)}
                >
                    <div 
                        className="relative max-w-2xl w-full max-h-[90vh] rounded-3xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-prominent)] p-5 sm:p-6 shadow-2xl flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedItem(null)}
                            aria-label="Close"
                            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-primary)] flex items-center justify-center transition-colors cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Top Meta info */}
                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-[var(--accent-primary)]/15 text-[var(--accent-primary)]">
                                {selectedItem.badge}
                            </span>
                            <span className="text-xs font-mono text-[var(--text-muted)]">
                                {selectedItem.period} • {selectedItem.organization}
                            </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-1">
                            {selectedItem.title}
                        </h3>

                        {selectedItem.subtitle && (
                            <p className="text-xs sm:text-sm text-[var(--accent-muted)] font-medium mb-3">
                                {selectedItem.subtitle}
                            </p>
                        )}

                        {/* Image Preview */}
                        <div className="relative rounded-2xl overflow-hidden bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] my-2 aspect-[16/10] max-h-[48vh]">
                            <img
                                src={selectedItem.imagePath}
                                alt={selectedItem.title}
                                className="w-full h-full object-contain mx-auto"
                            />
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mt-3 mb-4 [text-wrap:pretty]">
                            {selectedItem.description}
                        </p>

                        {/* Footer Status */}
                        <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] text-xs">
                            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                                <CheckCircle2 className="w-4 h-4" /> Verified Participation
                            </span>
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="px-4 py-2 rounded-full bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-primary)] font-medium transition-colors cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
}
