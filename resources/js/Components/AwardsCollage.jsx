import React, { useState, useEffect } from 'react';
import { 
    Award, 
    GraduationCap, 
    CheckCircle, 
    ArrowUpRight, 
    X, 
    Maximize2,
    Trophy
} from 'lucide-react';

export default function AwardsCollage({ awards = [], awardPhotos = [] }) {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [selectedAward, setSelectedAward] = useState(null);

    // Typewriter effect state for Section Title (Matching Reference 11)
    const phrases = [
        'Award.',
        'Honors & Degrees.',
        'Academic Milestones.',
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
                setSelectedPhoto(null);
                setSelectedAward(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Split photos into 3 columns for interlocking mosaic collage
    const displayPhotos = awardPhotos.length > 0 ? awardPhotos : [];
    const col1 = [displayPhotos[0], displayPhotos[3]].filter(Boolean);
    const col2 = [displayPhotos[1], displayPhotos[4]].filter(Boolean);
    const col3 = [displayPhotos[2], displayPhotos[5] || displayPhotos[6]].filter(Boolean);

    return (
        <section id="recognition" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden relative scroll-mt-24">
            
            {/* Header: Left-Aligned Eyebrow + Typewriter Title + Subtitle (Direct from Reference 11) */}
            <div className="mb-8 sm:mb-10">
                <div className="mb-1.5">
                    <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.25em] uppercase text-[var(--accent-muted)]">
                        RECOGNITION
                    </span>
                </div>

                <h2 className="font-body text-2xl sm:text-3xl lg:text-4xl text-[var(--text-primary)] font-bold tracking-tight min-h-[1.25em] flex items-center leading-tight">
                    <span>{currentText}</span>
                    <span 
                        className="inline-block w-[3px] sm:w-[3.5px] h-[0.9em] ml-1 bg-[var(--text-primary)] animate-pulse rounded-full align-middle"
                        aria-hidden="true"
                    />
                </h2>

                <p className="text-xs sm:text-[13px] text-[var(--text-secondary)] mt-2 max-w-xl leading-relaxed font-normal">
                    A collection of academic and professional recognitions that reflect my dedication to excellence.
                </p>
            </div>

            {/* Main Content Grid: Left Photo Mosaic Wall, Right Sleek Award Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Column (lg:6 cols): Organic Photo Mosaic Wall (Direct from Reference 11) */}
                <div className="lg:col-span-6 xl:col-span-6">
                    <div className="grid grid-cols-3 gap-2 sm:gap-2.5 max-w-[540px] mx-auto lg:mx-0">
                        
                        {/* Column 1 */}
                        <div className="flex flex-col gap-2 sm:gap-2.5">
                            {col1[0] && (
                                <div
                                    onClick={() => setSelectedPhoto(col1[0])}
                                    className="relative aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-sm hover:shadow-xl hover:border-[var(--border-prominent)] transition-all duration-300 group cursor-pointer"
                                >
                                    <img
                                        src={`/storage/${col1[0].image_path}`}
                                        alt={col1[0].title || 'Milestone Moment'}
                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Maximize2 className="w-5 h-5 text-white/90 drop-shadow-md" />
                                    </div>
                                </div>
                            )}
                            {col1[1] && (
                                <div
                                    onClick={() => setSelectedPhoto(col1[1])}
                                    className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-sm hover:shadow-xl hover:border-[var(--border-prominent)] transition-all duration-300 group cursor-pointer"
                                >
                                    <img
                                        src={`/storage/${col1[1].image_path}`}
                                        alt={col1[1].title || 'Milestone Moment'}
                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Maximize2 className="w-5 h-5 text-white/90 drop-shadow-md" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Column 2 */}
                        <div className="flex flex-col gap-2 sm:gap-2.5">
                            {col2[0] && (
                                <div
                                    onClick={() => setSelectedPhoto(col2[0])}
                                    className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-sm hover:shadow-xl hover:border-[var(--border-prominent)] transition-all duration-300 group cursor-pointer"
                                >
                                    <img
                                        src={`/storage/${col2[0].image_path}`}
                                        alt={col2[0].title || 'Milestone Moment'}
                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Maximize2 className="w-5 h-5 text-white/90 drop-shadow-md" />
                                    </div>
                                </div>
                            )}
                            {col2[1] && (
                                <div
                                    onClick={() => setSelectedPhoto(col2[1])}
                                    className="relative aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-sm hover:shadow-xl hover:border-[var(--border-prominent)] transition-all duration-300 group cursor-pointer"
                                >
                                    <img
                                        src={`/storage/${col2[1].image_path}`}
                                        alt={col2[1].title || 'Milestone Moment'}
                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Maximize2 className="w-5 h-5 text-white/90 drop-shadow-md" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Column 3 */}
                        <div className="flex flex-col gap-2 sm:gap-2.5">
                            {col3[0] && (
                                <div
                                    onClick={() => setSelectedPhoto(col3[0])}
                                    className="relative aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-sm hover:shadow-xl hover:border-[var(--border-prominent)] transition-all duration-300 group cursor-pointer"
                                >
                                    <img
                                        src={`/storage/${col3[0].image_path}`}
                                        alt={col3[0].title || 'Milestone Moment'}
                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Maximize2 className="w-5 h-5 text-white/90 drop-shadow-md" />
                                    </div>
                                </div>
                            )}
                            {col3[1] && (
                                <div
                                    onClick={() => setSelectedPhoto(col3[1])}
                                    className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-sm hover:shadow-xl hover:border-[var(--border-prominent)] transition-all duration-300 group cursor-pointer"
                                >
                                    <img
                                        src={`/storage/${col3[1].image_path}`}
                                        alt={col3[1].title || 'Milestone Moment'}
                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Maximize2 className="w-5 h-5 text-white/90 drop-shadow-md" />
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                {/* Right Column (lg:6 cols): Sleek Horizontal Award Cards (Direct from Reference 11) */}
                <div className="lg:col-span-6 xl:col-span-6 space-y-3 sm:space-y-3.5">
                    {awards.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedAward(item)}
                            className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-prominent)] flex items-center justify-between gap-4 transition-all duration-200 hover:translate-x-1.5 shadow-sm hover:shadow-md cursor-pointer group"
                        >
                            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                                {/* Category Icon in Squircle Pill */}
                                <div className="w-11 h-11 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-primary)] flex-shrink-0 group-hover:scale-105 transition-transform">
                                    {item.type === 'degree' ? (
                                        <GraduationCap className="w-5 h-5" />
                                    ) : (
                                        <Award className="w-5 h-5" />
                                    )}
                                </div>

                                {/* Title and Subtitle Info */}
                                <div className="min-w-0">
                                    <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors truncate">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-0.5 text-xs text-[var(--text-secondary)] font-mono">
                                        <span className="font-semibold text-[var(--accent-primary)]">{item.year}</span>
                                        <span className="text-[var(--text-muted)]">•</span>
                                        <span className="truncate">{item.institution}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Arrow Up Right Action Icon */}
                            <div className="flex items-center text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] transition-colors flex-shrink-0">
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Lightbox Modal for Photo Preview */}
            {selectedPhoto && (
                <div 
                    className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedPhoto(null)}
                >
                    <div 
                        className="relative max-w-2xl max-h-[85vh] rounded-3xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-prominent)] p-3 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedPhoto(null)}
                            aria-label="Close"
                            className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <img
                            src={`/storage/${selectedPhoto.image_path}`}
                            alt={selectedPhoto.title || 'Milestone Photo'}
                            className="max-h-[72vh] w-auto mx-auto rounded-2xl object-contain shadow-md"
                        />
                        <div className="p-3 text-center">
                            <h4 className="text-sm font-bold text-[var(--text-primary)]">
                                {selectedPhoto.title || 'Milestone Documentation'}
                            </h4>
                            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                                {selectedPhoto.caption || 'Academic & Certification Journey'}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Detail Modal for Selected Award / Certificate */}
            {selectedAward && (
                <div 
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedAward(null)}
                >
                    <div 
                        className="relative max-w-lg w-full rounded-3xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-prominent)] p-6 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedAward(null)}
                            aria-label="Close"
                            className="absolute top-5 right-5 z-10 w-8 h-8 rounded-full bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center justify-center transition-colors cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        
                        <div className="flex items-center gap-3.5 mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-primary)]">
                                {selectedAward.type === 'degree' ? (
                                    <GraduationCap className="w-6 h-6" />
                                ) : (
                                    <Award className="w-6 h-6" />
                                )}
                            </div>
                            <div>
                                <span className="text-[10px] font-mono tracking-widest text-[var(--accent-muted)] uppercase block">
                                    VERIFIED CREDENTIAL
                                </span>
                                <span className="text-xs font-mono text-[var(--text-muted)]">
                                    {selectedAward.year} • {selectedAward.institution}
                                </span>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2.5">
                            {selectedAward.title}
                        </h3>

                        {selectedAward.description && (
                            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-5 font-normal">
                                {selectedAward.description}
                            </p>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)] text-xs">
                            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                                <CheckCircle className="w-3.5 h-3.5" /> Verified Completion
                            </span>
                            <button
                                onClick={() => setSelectedAward(null)}
                                className="px-4 py-1.5 rounded-full bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-primary)] font-medium transition-colors cursor-pointer"
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
