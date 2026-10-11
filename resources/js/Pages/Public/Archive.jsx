import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { 
    Sun, 
    Moon, 
    Send, 
    Search, 
    ArrowUpRight, 
    ArrowLeft, 
    ExternalLink, 
    Code2, 
    BarChart2, 
    Layers, 
    Eye, 
    CheckCircle2,
    Sparkles,
    Filter
} from 'lucide-react';
import { GithubIcon } from '../../Components/Icons';
import ProjectDetailModal from '../../Components/ProjectDetailModal';
import ContactModal from '../../Components/ContactModal';
import Footer from '../../Components/Footer';

export default function Archive({
    profile,
    projects = [],
    technicalProjects = [],
    digitalProjects = []
}) {
    const { flash } = usePage().props;
    const [activeTab, setActiveTab] = useState('technical'); // 'technical' | 'digital'
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isDark, setIsDark] = useState(true);

    // Typewriter effect state for title
    const tabPhrases = {
        technical: [
            'Technical',
            'Systems & Architecture',
            'Engineering Archive',
        ],
        digital: [
            'Beyond Code',
            'Data & Analytics',
            'Creative & Digital',
        ],
    };

    const phrases = tabPhrases[activeTab] || tabPhrases.technical;
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Reset typewriter when activeTab changes
    useEffect(() => {
        setPhraseIndex(0);
        setCurrentText('');
        setIsDeleting(false);
        setIsPaused(false);
    }, [activeTab]);

    useEffect(() => {
        const fullText = phrases[phraseIndex] || phrases[0];
        let timeout;

        if (isPaused) {
            timeout = setTimeout(() => {
                setIsPaused(false);
                setIsDeleting(true);
            }, 3000);
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
                }, 85);
            }
        }

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, isPaused, phraseIndex, activeTab]);

    // Initialize Theme
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            setIsDark(true);
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, []);

    // Theme Switcher
    const toggleTheme = () => {
        const nextDark = !isDark;
        setIsDark(nextDark);
        document.documentElement.classList.add('theme-transitioning');

        if (nextDark) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }

        setTimeout(() => {
            document.documentElement.classList.remove('theme-transitioning');
        }, 400);
    };

    // Filtered lists based on active tab & search query
    const currentList = activeTab === 'technical' 
        ? (technicalProjects.length > 0 ? technicalProjects : projects.filter(p => p.category === 'technical' || !p.category))
        : (digitalProjects.length > 0 ? digitalProjects : projects.filter(p => p.category === 'digital'));

    const filteredProjects = currentList.filter((item) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title?.toLowerCase().includes(q);
        const matchesDesc = (item.short_description || item.full_description || '')?.toLowerCase().includes(q);
        const matchesContext = item.client_or_context?.toLowerCase().includes(q);
        const matchesTech = Array.isArray(item.tech_stack) && item.tech_stack.some(t => t.toLowerCase().includes(q));
        return matchesTitle || matchesDesc || matchesContext || matchesTech;
    });

    // Helper to format 2-digit numbers
    const padNumber = (num) => String(num).padStart(2, '0');

    // Helper to extract primary framework/tech subtitle
    const getFrameworkLabel = (project) => {
        if (Array.isArray(project.tech_stack) && project.tech_stack.length > 0) {
            return project.tech_stack.slice(0, 2).join(' · ').toUpperCase();
        }
        return project.category === 'technical' ? 'FULLSTACK ENGINEERING' : 'DATA ANALYTICS & INSIGHT';
    };

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 flex flex-col selection:bg-[var(--accent-primary)] selection:text-[var(--bg-primary)]">
            <Head>
                <title>{`Project Archive — ${activeTab === 'technical' ? 'Technical Systems' : 'Digital & Analytics'} | Muhammad Rafli Pradipta`}</title>
                <meta name="description" content="Complete repository and archive of technical software engineering and data analytics projects built by Muhammad Rafli Pradipta." />
            </Head>

            {/* Flash Message Toast Notification */}
            {flash?.success && (
                <div className="fixed bottom-6 right-6 z-50 glass-pill px-4 py-3 rounded-2xl border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2 shadow-2xl animate-in slide-in-from-bottom-5">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>{flash.success}</span>
                </div>
            )}

            {/* ==========================================================================
                1. Dedicated Top Floating Pill Navbar (Matching Reference Screenshot 17-20)
                ========================================================================== */}
            <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-6 transition-all duration-300">
                <nav className="glass-pill w-full max-w-5xl rounded-full px-5 py-2.5 sm:py-3 flex items-center justify-between shadow-2xl border border-[var(--border-prominent)] backdrop-blur-xl">
                    {/* Brand Logo & Back to Home */}
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/" 
                            className="flex items-center gap-2 group cursor-pointer min-h-[44px] min-w-[44px]"
                            title="Back to Home"
                        >
                            <span className="w-8 h-8 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] group-hover:border-[var(--accent-primary)] group-hover:scale-105 transition-all">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                            </span>
                            <span className="font-display text-xl sm:text-2xl tracking-wider text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                                DIPTA<span className="text-[var(--accent-primary)]">.</span>
                            </span>
                        </Link>
                    </div>

                    {/* Center Tabs: TECHNICAL & DIGITAL (Direct Reference Replica) */}
                    <div className="flex items-center p-1 rounded-full bg-[var(--bg-surface)]/80 border border-[var(--border-subtle)] backdrop-blur-md shadow-inner">
                        <button
                            onClick={() => setActiveTab('technical')}
                            className={`px-4 sm:px-6 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 min-h-[40px] flex items-center justify-center cursor-pointer ${
                                activeTab === 'technical'
                                    ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)] shadow-md scale-[1.02]'
                                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
                            }`}
                        >
                            <span>Technical</span>
                            <span className="ml-1.5 text-[10px] opacity-75 font-mono">
                                ({technicalProjects.length || 4})
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('digital')}
                            className={`px-4 sm:px-6 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 min-h-[40px] flex items-center justify-center cursor-pointer ${
                                activeTab === 'digital'
                                    ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)] shadow-md scale-[1.02]'
                                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
                            }`}
                        >
                            <span>Digital</span>
                            <span className="ml-1.5 text-[10px] opacity-75 font-mono">
                                ({digitalProjects.length || 4})
                            </span>
                        </button>
                    </div>

                    {/* Right Controls: Theme Toggle + Contact Button */}
                    <div className="flex items-center gap-2.5 sm:gap-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle Theme"
                            className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] active:scale-95 transition-all border border-[var(--border-subtle)] cursor-pointer"
                            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-stone-700" />}
                        </button>

                        {/* Contact / Hire Me Button (Matching Reference) */}
                        <button
                            onClick={() => setIsContactOpen(true)}
                            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--accent-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent-hover)] transition-all shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer min-h-[40px]"
                        >
                            <span>Hire Me</span>
                        </button>
                    </div>
                </nav>
            </header>

            {/* ==========================================================================
                2. Main Content Container
                ========================================================================== */}
            <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-20">
                {/* Header Title Section (Direct Reference Replica) */}
                <div className="mb-10 sm:mb-12">
                    {/* Eyebrow */}
                    <div className="mb-2">
                        <span className="text-[11px] font-mono font-medium tracking-[0.28em] uppercase text-[var(--accent-muted)]">
                            {activeTab === 'technical' ? 'ARCHIVE' : 'DIGITAL PROJECTS'}
                        </span>
                    </div>

                    {/* Main Section Title with Live Typewriter Effect */}
                    <h1 className="font-body text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-3 min-h-[1.2em] flex items-center leading-tight [text-wrap:balance]">
                        <span>{currentText}</span>
                        <span 
                            className="inline-block w-[3.5px] h-[0.85em] ml-2.5 bg-[var(--text-primary)] animate-pulse rounded-full align-middle"
                            aria-hidden="true"
                        />
                    </h1>

                    {/* Subtitle Description */}
                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl [text-wrap:pretty]">
                        {activeTab === 'technical' 
                            ? 'A complete collection of my technical work, systems, and digital projects.'
                            : 'Creative, visual, content, and digital projects developed alongside my technical work.'}
                    </p>

                    {/* Search & Filter Toolbar */}
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[var(--border-subtle)]">
                        <div className="relative w-full sm:w-80">
                            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                            <input
                                type="text"
                                placeholder={`Search ${activeTab === 'technical' ? 'systems, stacks...' : 'analytics, tools...'}`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs bg-[var(--bg-surface)] border border-[var(--border-subtle)] focus:border-[var(--accent-primary)] focus:outline-none text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-colors shadow-sm min-h-[44px]"
                            />
                        </div>

                        <div className="text-xs font-mono text-[var(--text-muted)] self-end sm:self-center">
                            Showing <span className="text-[var(--text-primary)] font-bold">{filteredProjects.length}</span> of {currentList.length} items
                        </div>
                    </div>
                </div>

                {/* ==========================================================================
                    3. TAB A: TECHNICAL (Numbered Minimalist List Rows — Screenshot 17 & 18)
                    ========================================================================== */}
                {activeTab === 'technical' && (
                    <div className="divide-y divide-[var(--border-subtle)] border-t border-b border-[var(--border-subtle)]">
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project, index) => {
                                const rowNumber = padNumber(index + 1);
                                const framework = getFrameworkLabel(project);

                                return (
                                    <div
                                        key={project.id}
                                        onClick={() => setSelectedProject(project)}
                                        className="group py-7 sm:py-8 px-2 sm:px-4 flex flex-col md:flex-row md:items-start justify-between gap-4 sm:gap-6 hover:bg-[var(--bg-surface)]/50 transition-colors duration-200 cursor-pointer rounded-2xl"
                                    >
                                        {/* Left: Number + Main Project Info */}
                                        <div className="flex items-start gap-4 sm:gap-6 flex-1">
                                            {/* Number */}
                                            <span className="font-mono text-sm sm:text-base font-semibold text-[var(--text-muted)] opacity-60 group-hover:text-[var(--accent-primary)] group-hover:opacity-100 transition-colors select-none [font-variant-numeric:tabular-nums] pt-0.5">
                                                {rowNumber}
                                            </span>

                                            {/* Content Block */}
                                            <div className="space-y-2 flex-1">
                                                {/* Project Title */}
                                                <h3 className="font-body text-base sm:text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors leading-snug flex items-center gap-2">
                                                    <span>{project.title}</span>
                                                    {project.is_featured && (
                                                        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30">
                                                            Featured
                                                        </span>
                                                    )}
                                                </h3>

                                                {/* Short Description */}
                                                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl [text-wrap:pretty]">
                                                    {project.short_description || project.full_description}
                                                </p>

                                                {/* Framework & Tech Stack Badges (Direct from Reference) */}
                                                <div className="pt-2 flex flex-wrap items-center gap-2">
                                                    <span className="text-[10px] font-mono font-semibold tracking-wider text-[var(--accent-muted)] uppercase mr-1">
                                                        {framework}
                                                    </span>

                                                    {Array.isArray(project.tech_stack) && project.tech_stack.map((tech, idx) => (
                                                        <span 
                                                            key={idx}
                                                            className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] group-hover:border-[var(--border-prominent)] transition-colors"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right: Arrow Link Action Button */}
                                        <div className="flex items-center justify-end md:justify-start gap-3 flex-shrink-0 self-end md:self-center">
                                            {project.github_repo_url && (
                                                <a
                                                    href={project.github_repo_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] border border-transparent hover:border-[var(--border-subtle)] transition-all"
                                                    title="View Source on GitHub"
                                                >
                                                    <GithubIcon className="w-4 h-4" />
                                                </a>
                                            )}
                                            
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedProject(project);
                                                }}
                                                className="w-11 h-11 rounded-full flex items-center justify-center bg-[var(--bg-surface)] group-hover:bg-[var(--accent-primary)] text-[var(--text-secondary)] group-hover:text-[var(--bg-primary)] border border-[var(--border-subtle)] group-hover:border-[var(--accent-primary)] transition-all shadow-sm group-hover:scale-105 active:scale-95 cursor-pointer"
                                                title="Open Project Details"
                                            >
                                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="py-16 text-center text-[var(--text-muted)] font-mono text-xs">
                                No technical projects match your search query "{searchQuery}".
                            </div>
                        )}
                    </div>
                )}

                {/* ==========================================================================
                    4. TAB B: DIGITAL (2-Column Visual Media Mockup Grid — Screenshot 19 & 20)
                    ========================================================================== */}
                {activeTab === 'digital' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project, index) => {
                                const rowNumber = padNumber(index + 1);
                                const thumbnailSrc = project.thumbnail_path ? `/storage/${project.thumbnail_path}` : null;

                                return (
                                    <div
                                        key={project.id}
                                        onClick={() => setSelectedProject(project)}
                                        className="group rounded-3xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-prominent)] shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col relative"
                                    >
                                        {/* Browser / Workspace Mockup Titlebar */}
                                        <div className="px-4 py-3 bg-[var(--bg-surface-elevated)] border-b border-[var(--border-subtle)] flex items-center justify-between select-none">
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80"></span>
                                                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></span>
                                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></span>
                                            </div>
                                            <div className="text-[11px] font-mono text-[var(--text-muted)] truncate max-w-[220px]">
                                                {project.title}
                                            </div>
                                            <div className="text-[10px] font-mono text-[var(--text-muted)] opacity-60">
                                                {project.year || '2024'}
                                            </div>
                                        </div>

                                        {/* Mockup Screen Viewport (Aspect 16/10) */}
                                        <div className="relative w-full aspect-[16/10] bg-[var(--bg-secondary)] overflow-hidden flex items-center justify-center">
                                            {thumbnailSrc ? (
                                                <img
                                                    src={thumbnailSrc}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-surface)]">
                                                    <BarChart2 className="w-12 h-12 text-[var(--accent-muted)] mb-2 opacity-50 group-hover:scale-110 transition-transform" />
                                                    <span className="font-mono text-xs text-[var(--text-muted)]">
                                                        Analytical Dashboard & Insights
                                                    </span>
                                                </div>
                                            )}

                                            {/* Category Pill Tag */}
                                            <div className="absolute top-3 left-3">
                                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 backdrop-blur-md">
                                                    Data Analytics & BI
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Information Block with Faint Watermark Number */}
                                        <div className="p-6 flex-1 flex flex-col justify-between relative overflow-hidden">
                                            {/* Big Faint Watermark Number in background (Matching Screenshot 19 & 20) */}
                                            <div className="absolute -right-2 -bottom-4 font-display text-8xl font-black text-[var(--text-primary)] opacity-[0.04] dark:opacity-[0.06] select-none pointer-events-none [font-variant-numeric:tabular-nums]">
                                                {rowNumber}
                                            </div>

                                            <div className="relative z-10 space-y-2">
                                                <h3 className="font-body text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors leading-snug">
                                                    {project.title}
                                                </h3>

                                                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3 [text-wrap:pretty]">
                                                    {project.short_description || project.full_description}
                                                </p>
                                            </div>

                                            {/* Tech Badges & Action */}
                                            <div className="relative z-10 pt-4 mt-3 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2">
                                                <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                                                    {Array.isArray(project.tech_stack) && project.tech_stack.slice(0, 3).map((tech, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                    {Array.isArray(project.tech_stack) && project.tech_stack.length > 3 && (
                                                        <span className="px-1.5 py-0.5 text-[10px] font-mono text-[var(--text-muted)]">
                                                            +{project.tech_stack.length - 3}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-1 text-xs font-semibold text-[var(--accent-primary)] group-hover:translate-x-0.5 transition-transform">
                                                    <span>Explore</span>
                                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-full py-16 text-center text-[var(--text-muted)] font-mono text-xs">
                                No digital or analytics projects match your search query "{searchQuery}".
                            </div>
                        )}
                    </div>
                )}

                {/* Back to Home CTA at Bottom */}
                <div className="mt-16 sm:mt-20 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)] transition-all shadow-md active:scale-95 min-h-[44px]"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Return to Main Portfolio</span>
                    </Link>
                </div>
            </main>

            {/* Footer */}
            <Footer 
                profile={profile} 
                onOpenContact={() => setIsContactOpen(true)} 
            />

            {/* Modals */}
            <ProjectDetailModal 
                project={selectedProject} 
                onClose={() => setSelectedProject(null)} 
            />

            <ContactModal 
                isOpen={isContactOpen} 
                onClose={() => setIsContactOpen(false)} 
                profile={profile} 
            />
        </div>
    );
}
