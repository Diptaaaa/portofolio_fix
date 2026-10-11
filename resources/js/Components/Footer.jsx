import React from 'react';
import { Mail, ArrowUpRight, ArrowRight, ArrowUp, ShieldCheck, Download, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Footer({ profile, onOpenContact }) {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const emailAddress = profile?.email || 'rafli.pradipta@example.com';
    const githubUrl = profile?.github_url || 'https://github.com/Diptaaaa';
    const linkedinUrl = profile?.linkedin_url || 'https://linkedin.com/in/muhammad-rafli-pradipta';

    // Format display handles cleanly
    const githubHandle = githubUrl.replace(/^https?:\/\/(www\.)?github\.com\//, 'github.com/');
    const linkedinHandle = linkedinUrl.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, 'linkedin.com/in/');

    return (
        <footer id="contact" className="relative bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] text-[var(--text-primary)] transition-colors duration-300">
            {/* ==========================================================================
                1. Main Contact Section ("LET'S WORK TOGETHER") — Matching Ref 15, 22
                ========================================================================== */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16 lg:pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    
                    {/* Left Column: Heading, Bio, and Download Resume Button */}
                    <div className="lg:col-span-7 space-y-6 sm:space-y-8">
                        {/* Eyebrow */}
                        <div className="inline-block">
                            <span className="text-[11px] font-mono font-medium tracking-[0.28em] uppercase text-[var(--accent-muted)]">
                                GET IN TOUCH
                            </span>
                        </div>

                        {/* Giant Heading (Direct from Reference) */}
                        <h2 className="font-body text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-[var(--text-primary)] leading-[0.95] [text-wrap:balance]">
                            LET'S <br className="hidden sm:inline" />
                            WORK <br className="hidden sm:inline" />
                            TOGETHER
                        </h2>

                        {/* Subheading & Description */}
                        <div className="space-y-3 max-w-xl">
                            <h3 className="font-body text-lg sm:text-xl font-bold text-[var(--text-primary)] [text-wrap:balance]">
                                Looking for the next problem worth solving.
                            </h3>
                            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed [text-wrap:pretty]">
                                I'm open to opportunities where I can contribute to software engineering, fullstack web development, data analytics forecasting, and intelligent digital workflows.
                            </p>
                        </div>

                        {/* Download Resume Button (Matching Reference) */}
                        <div className="pt-2">
                            <a
                                href="/cv.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent-primary)] hover:text-[var(--bg-primary)] transition-all duration-200 shadow-lg hover:scale-105 active:scale-95 cursor-pointer min-h-[48px]"
                            >
                                <span>DOWNLOAD RESUME</span>
                                <span className="transition-transform group-hover:translate-x-1">→</span>
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Stack of 3 Numbered Cards + "SEND ME A MESSAGE" Button */}
                    <div className="lg:col-span-5 space-y-4 sm:space-y-5">
                        {/* Card 01: Email */}
                        <a
                            href={`mailto:${emailAddress}`}
                            className="group block p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-prominent)] shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer relative"
                        >
                            <span className="absolute top-5 right-6 font-mono text-xs font-semibold text-[var(--text-muted)] opacity-60 [font-variant-numeric:tabular-nums]">
                                01
                            </span>
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-primary)] group-hover:scale-110 transition-transform">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div className="space-y-0.5 pr-8">
                                    <span className="text-[10px] font-mono font-semibold tracking-widest text-[var(--text-muted)] uppercase block">
                                        EMAIL
                                    </span>
                                    <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors break-all">
                                        {emailAddress}
                                    </span>
                                </div>
                            </div>
                        </a>

                        {/* Card 02: GitHub */}
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-prominent)] shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer relative"
                        >
                            <span className="absolute top-5 right-6 font-mono text-xs font-semibold text-[var(--text-muted)] opacity-60 [font-variant-numeric:tabular-nums]">
                                02
                            </span>
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-primary)] group-hover:scale-110 transition-transform">
                                    <GithubIcon className="w-5 h-5" />
                                </div>
                                <div className="space-y-0.5 pr-8 flex-1">
                                    <span className="text-[10px] font-mono font-semibold tracking-widest text-[var(--text-muted)] uppercase block">
                                        GITHUB
                                    </span>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                                            {githubHandle}
                                        </span>
                                        <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                    </div>
                                </div>
                            </div>
                        </a>

                        {/* Card 03: LinkedIn */}
                        <a
                            href={linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-prominent)] shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer relative"
                        >
                            <span className="absolute top-5 right-6 font-mono text-xs font-semibold text-[var(--text-muted)] opacity-60 [font-variant-numeric:tabular-nums]">
                                03
                            </span>
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-primary)] group-hover:scale-110 transition-transform">
                                    <LinkedinIcon className="w-5 h-5" />
                                </div>
                                <div className="space-y-0.5 pr-8 flex-1">
                                    <span className="text-[10px] font-mono font-semibold tracking-widest text-[var(--text-muted)] uppercase block">
                                        LINKEDIN
                                    </span>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors truncate max-w-[200px] sm:max-w-xs">
                                            {linkedinHandle}
                                        </span>
                                        <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                    </div>
                                </div>
                            </div>
                        </a>

                        {/* Action: "SEND ME A MESSAGE →" Button (Direct from Reference) */}
                        <div className="pt-2">
                            <button
                                onClick={onOpenContact}
                                className="w-full py-3.5 sm:py-4 px-6 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] bg-[var(--bg-surface)] hover:bg-[var(--accent-primary)] hover:text-[var(--bg-primary)] border border-[var(--border-prominent)] hover:border-[var(--accent-primary)] shadow-md hover:shadow-xl active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer min-h-[48px] group"
                            >
                                <span>SEND ME A MESSAGE</span>
                                <span className="transition-transform group-hover:translate-x-1">→</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* ==========================================================================
                2. Footer CTA Banner ("HAVE A PROJECT IN MIND?") — Matching Ref 21
                ========================================================================== */}
            <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8">
                    <div>
                        <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.25em] uppercase text-[var(--accent-muted)] block mb-2">
                            HAVE A PROJECT IN MIND?
                        </span>
                        <h3 className="font-body text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight [text-wrap:balance]">
                            Let's build something useful.
                        </h3>
                    </div>

                    <div className="flex-shrink-0">
                        <button
                            onClick={onOpenContact}
                            className="inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent-primary)] hover:text-[var(--bg-primary)] transition-all duration-200 shadow-xl hover:scale-105 active:scale-95 cursor-pointer min-h-[48px] group"
                        >
                            <span>Hire Me</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ==========================================================================
                3. Subfooter Bar (Copyright, CMS link, Back to Top)
                ========================================================================== */}
            <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)] font-mono">
                    <div>
                        © {new Date().getFullYear()} {profile?.full_name || 'Muhammad Rafli Pradipta'}. Crafted with Laravel & Inertia.
                    </div>

                    <div className="flex items-center gap-6">
                        <a
                            href="/admin/login"
                            className="flex items-center gap-1.5 hover:text-[var(--accent-primary)] transition-colors opacity-60 hover:opacity-100"
                            title="Admin Back-Office"
                        >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>CMS</span>
                        </a>

                        <button
                            onClick={scrollToTop}
                            className="flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors cursor-pointer min-h-[36px]"
                        >
                            <span>Back to top</span>
                            <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
