import React, { useState, useEffect } from 'react';
import { Sun, Moon, ArrowUpRight, Send, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar({ profile, onOpenContact }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener('scroll', handleScroll);
        
        // Check initial theme
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

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth Global Theme Switcher (Option 2 - Silky Crossfade)
    const toggleTheme = () => {
        const nextDark = !isDark;
        setIsDark(nextDark);

        // Add temporary smooth theme transition class to root
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

        // Clean up transition class after crossfade completes
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transitioning');
        }, 400);
    };

    const scrollTo = (id) => {
        setMobileMenuOpen(false);
        const targetId = id === 'capabilities' ? 'what-i-can-do' : id;
        const element = document.getElementById(targetId) || document.getElementById(id);
        if (element) {
            if (targetId === 'work') {
                window.scrollTo({
                    top: element.offsetTop,
                    behavior: 'smooth'
                });
            } else {
                const navOffset = 96;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-6 transition-all duration-300">
            <nav className={`glass-pill w-full max-w-5xl rounded-full px-5 py-3 flex items-center justify-between transition-all duration-300 ${scrolled ? 'shadow-2xl py-2.5' : ''}`}>
                {/* Brand Logo */}
                <a 
                    href="#hero" 
                    onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
                    className="flex items-center gap-2 group cursor-pointer"
                >
                    <span className="font-display text-2xl tracking-wider text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                        DIPTA<span className="text-[var(--accent-primary)]">.</span>
                    </span>
                    {profile?.available_for_work && (
                        <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            Available
                        </span>
                    )}
                </a>

                {/* Desktop Nav Items */}
                <div className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-medium text-[var(--text-secondary)]">
                    <button onClick={() => scrollTo('work')} className="hover:text-[var(--text-primary)] hover:scale-105 transition-all py-2 cursor-pointer min-h-[44px] flex items-center">Work</button>
                    <button onClick={() => scrollTo('what-i-can-do')} className="hover:text-[var(--text-primary)] hover:scale-105 transition-all py-2 cursor-pointer min-h-[44px] flex items-center">What I Can Do</button>
                    <button onClick={() => scrollTo('about')} className="hover:text-[var(--text-primary)] hover:scale-105 transition-all py-2 cursor-pointer min-h-[44px] flex items-center">About</button>
                    <button onClick={() => scrollTo('recognition')} className="hover:text-[var(--text-primary)] hover:scale-105 transition-all py-2 cursor-pointer min-h-[44px] flex items-center">Recognition</button>
                    <button onClick={() => scrollTo('trainings')} className="hover:text-[var(--text-primary)] hover:scale-105 transition-all py-2 cursor-pointer min-h-[44px] flex items-center">Trainings</button>
                </div>

                {/* Actions: Theme Toggle & Contact Button */}
                <div className="flex items-center gap-3">
                    {/* Theme Toggle with Ripple */}
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle Theme"
                        className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] active:scale-95 transition-all border border-[var(--border-subtle)] cursor-pointer"
                        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-stone-700" />}
                    </button>

                    {/* Contact Button (Hire Me - Matching Reference) */}
                    <button
                        onClick={onOpenContact}
                        className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--accent-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent-hover)] transition-all shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer min-h-[40px]"
                    >
                        <span>Hire Me</span>
                    </button>

                    {/* Mobile Menu Trigger */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2.5 text-[var(--text-primary)] cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label="Toggle Menu"
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Nav Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed top-20 left-4 right-4 glass-pill rounded-2xl p-6 flex flex-col gap-3 text-center z-50 border border-[var(--border-prominent)] shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
                    <button onClick={() => scrollTo('work')} className="py-2.5 text-sm uppercase tracking-wider text-[var(--text-primary)] min-h-[44px] flex items-center justify-center">Work</button>
                    <button onClick={() => scrollTo('what-i-can-do')} className="py-2.5 text-sm uppercase tracking-wider text-[var(--text-primary)] min-h-[44px] flex items-center justify-center">What I Can Do</button>
                    <button onClick={() => scrollTo('about')} className="py-2.5 text-sm uppercase tracking-wider text-[var(--text-primary)] min-h-[44px] flex items-center justify-center">About</button>
                    <button onClick={() => scrollTo('recognition')} className="py-2.5 text-sm uppercase tracking-wider text-[var(--text-primary)] min-h-[44px] flex items-center justify-center">Recognition</button>
                    <button onClick={() => scrollTo('trainings')} className="py-2.5 text-sm uppercase tracking-wider text-[var(--text-primary)] min-h-[44px] flex items-center justify-center">Trainings</button>
                    <button 
                        onClick={() => { setMobileMenuOpen(false); onOpenContact(); }}
                        className="w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--accent-primary)] text-[var(--bg-primary)] mt-2 min-h-[44px] flex items-center justify-center"
                    >
                        Contact Me
                    </button>
                </div>
            )}
        </header>
    );
}
