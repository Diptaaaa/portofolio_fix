import React, { useState, useEffect } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { 
    LayoutDashboard, FolderGit2, Code2, GraduationCap, 
    Trophy, Sparkles, MessageSquare, ExternalLink, 
    LogOut, CheckCircle2, Shield, Menu, X 
} from 'lucide-react';

export default function AdminLayout({ children, title = 'CMS Dashboard' }) {
    const { auth, flash } = usePage().props;
    const currentUrl = window.location.pathname;
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    // Auto-close mobile drawer on Inertia route navigation or Escape key
    useEffect(() => {
        const removeListener = router.on('navigate', () => {
            setMobileNavOpen(false);
        });

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setMobileNavOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            removeListener();
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Prevent body scroll when mobile drawer is open
    useEffect(() => {
        if (mobileNavOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileNavOpen]);

    const navLinks = [
        { href: '/admin/dashboard', label: 'Dashboard & Profile', icon: LayoutDashboard },
        { href: '/admin/projects', label: 'Projects Manager', icon: FolderGit2 },
        { href: '/admin/skills', label: 'Skills & Tech Stack', icon: Code2 },
        { href: '/admin/experiences', label: 'Trainings & Experience', icon: GraduationCap },
        { href: '/admin/awards', label: 'Awards & Recognition', icon: Trophy },
        { href: '/admin/traits', label: 'What I Can Do (Traits)', icon: Sparkles },
        { href: '/admin/messages', label: 'Inquiries & Messages', icon: MessageSquare },
    ];

    // Shared Nav Link item renderer
    const renderNavItems = (onItemClick) => (
        <nav className="space-y-1.5">
            {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = currentUrl.startsWith(item.href) || (item.href === '/admin/dashboard' && currentUrl === '/admin');
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onItemClick}
                        className={`flex items-center gap-3 px-4 py-3 sm:py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all min-h-[44px] ${
                            isActive
                                ? 'bg-[#C4A992] text-[#1A1412] shadow-md font-bold'
                                : 'text-[#C8BBB2] hover:text-[#F5EFEB] hover:bg-[#241C18] active:bg-[#2E241F]'
                        }`}
                    >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span>{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );

    // Shared Bottom Actions renderer
    const renderBottomActions = () => (
        <div className="pt-6 border-t border-[rgba(196,169,146,0.16)] space-y-2 mt-6">
            <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-medium text-[#C8BBB2] hover:bg-[#241C18] hover:text-[#F5EFEB] transition-colors min-h-[44px]"
            >
                <span className="flex items-center gap-2">
                    <ExternalLink className="w-3.5 h-3.5 text-[#C4A992]" />
                    <span>View Live Site</span>
                </span>
                <span className="text-[10px] font-mono text-[#958479]">Public</span>
            </a>

            <Link
                href="/admin/logout"
                method="post"
                as="button"
                className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors text-left cursor-pointer min-h-[44px]"
            >
                <LogOut className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Sign Out</span>
            </Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#140F0D] text-[#F5EFEB] flex flex-col md:flex-row">
            <Head title={`${title} — Admin CMS`} />

            {/* =========================================================
                1. DESKTOP SIDEBAR (Visible on md: and above, sticky)
               ========================================================= */}
            <aside className="hidden md:flex md:w-64 bg-[#1A1412] border-r border-[rgba(196,169,146,0.16)] flex-col justify-between p-6 shrink-0 h-screen sticky top-0 overflow-y-auto z-30">
                <div>
                    {/* Brand */}
                    <div className="flex items-center gap-2.5 mb-8">
                        <div className="w-9 h-9 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.25)] flex items-center justify-center text-[#C4A992] shadow-sm">
                            <Shield className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="font-display text-xl tracking-wider uppercase text-[#F5EFEB] block leading-none">
                                RAFLI CMS
                            </span>
                            <span className="text-[10px] font-mono text-[#958479] tracking-widest uppercase">
                                Admin Control
                            </span>
                        </div>
                    </div>

                    {/* Nav Links */}
                    {renderNavItems()}
                </div>

                {/* Bottom Actions */}
                {renderBottomActions()}
            </aside>

            {/* =========================================================
                2. MOBILE OFF-CANVAS DRAWER & BACKDROP (< md)
               ========================================================= */}
            {mobileNavOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 animate-in fade-in"
                    onClick={() => setMobileNavOpen(false)}
                    aria-hidden="true"
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-[#1A1412] border-r border-[rgba(196,169,146,0.2)] flex flex-col justify-between p-6 z-50 md:hidden shadow-2xl transition-transform duration-300 ease-in-out ${
                    mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
                aria-label="Mobile Navigation"
            >
                <div className="overflow-y-auto">
                    {/* Drawer Header with Close Button */}
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-[rgba(196,169,146,0.12)]">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.25)] flex items-center justify-center text-[#C4A992]">
                                <Shield className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="font-display text-xl tracking-wider uppercase text-[#F5EFEB] block leading-none">
                                    RAFLI CMS
                                </span>
                                <span className="text-[10px] font-mono text-[#958479] tracking-widest uppercase">
                                    Admin Control
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => setMobileNavOpen(false)}
                            aria-label="Close navigation"
                            className="w-9 h-9 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] flex items-center justify-center text-[#C8BBB2] hover:text-[#F5EFEB] active:scale-95 transition-all cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Nav Links */}
                    {renderNavItems(() => setMobileNavOpen(false))}
                </div>

                {/* Bottom Actions */}
                {renderBottomActions()}
            </aside>

            {/* =========================================================
                3. MAIN CONTENT AREA (Header + Body)
               ========================================================= */}
            <div className="flex-1 flex flex-col min-w-0 min-h-screen">
                
                {/* A. MOBILE STICKY TOPBAR (< md) */}
                <header className="sticky top-0 z-30 h-14 bg-[#1A1412]/95 backdrop-blur-md border-b border-[rgba(196,169,146,0.16)] px-4 flex md:hidden items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMobileNavOpen(true)}
                            aria-label="Open Navigation Menu"
                            className="w-10 h-10 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] flex items-center justify-center text-[#C4A992] hover:text-[#F5EFEB] active:scale-95 transition-all cursor-pointer"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2">
                            <span className="font-display text-base tracking-wider uppercase text-[#F5EFEB]">
                                RAFLI CMS
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <span className="text-[11px] font-mono text-[#958479] hidden xs:inline">
                            Admin
                        </span>
                        <div className="w-8 h-8 rounded-full bg-[#C4A992] text-[#1A1412] flex items-center justify-center font-bold text-xs shadow-sm">
                            RP
                        </div>
                    </div>
                </header>

                {/* B. DESKTOP TOPBAR (>= md) */}
                <header className="hidden md:flex h-16 bg-[#1A1412] border-b border-[rgba(196,169,146,0.16)] px-6 md:px-8 items-center justify-between sticky top-0 z-20">
                    <h2 className="font-display text-xl uppercase tracking-wider text-[#F5EFEB]">
                        {title}
                    </h2>

                    <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-[#C8BBB2]">
                            Signed in as <strong className="text-[#F5EFEB]">{auth?.user?.name || 'Rafli'}</strong>
                        </span>
                        <div className="w-8 h-8 rounded-full bg-[#C4A992] text-[#1A1412] flex items-center justify-center font-bold text-xs shadow-sm">
                            RP
                        </div>
                    </div>
                </header>

                {/* C. PAGE BODY CONTAINER */}
                <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
                    {flash?.success && (
                        <div className="mb-4 sm:mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2 shadow-lg animate-in fade-in">
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                            <span>{flash.success}</span>
                        </div>
                    )}

                    {children}
                </main>
            </div>
        </div>
    );
}
