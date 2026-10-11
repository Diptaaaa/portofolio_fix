import React from 'react';

export default function CapabilitiesBento({ skills = {} }) {
    // 16 Tech Stack Icons matching 4x4 matrix in reference
    const techStackIcons = [
        // Row 1
        {
            name: 'HTML5',
            badge: (
                <div className="w-8 h-8 rounded-lg bg-[#E44D26] flex items-center justify-center font-black text-white text-xs shadow-sm">
                    5
                </div>
            ),
        },
        {
            name: 'Tailwind CSS',
            badge: (
                <svg className="w-7 h-7 text-[#06B6D4]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
                </svg>
            ),
        },
        {
            name: 'React.js',
            badge: (
                <svg className="w-7 h-7 text-[#61DAFB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(30 12 12)" />
                    <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(90 12 12)" />
                    <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(150 12 12)" />
                    <circle cx="12" cy="12" r="1.8" fill="currentColor" />
                </svg>
            ),
        },
        {
            name: 'Figma',
            badge: (
                <svg className="w-6 h-6" viewBox="0 0 38 57" fill="none">
                    <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
                    <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83"/>
                    <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262"/>
                    <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
                    <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
                </svg>
            ),
        },

        // Row 2
        {
            name: 'CSS3',
            badge: (
                <div className="w-8 h-8 rounded-lg bg-[#1572B6] flex items-center justify-center font-black text-white text-xs shadow-sm">
                    3
                </div>
            ),
        },
        {
            name: 'Django',
            badge: (
                <div className="w-8 h-8 rounded-lg bg-[#092E20] flex items-center justify-center font-bold text-white text-[11px] font-mono shadow-sm">
                    dj
                </div>
            ),
        },
        {
            name: 'Next.js',
            badge: (
                <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-black text-sm shadow-sm">
                    N
                </div>
            ),
        },
        {
            name: 'Vercel',
            badge: (
                <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center shadow-sm">
                    <svg className="w-4 h-4 fill-white" viewBox="0 0 1155 1000">
                        <path d="m577.346 0 577.346 1000H0Z"/>
                    </svg>
                </div>
            ),
        },

        // Row 3
        {
            name: 'JavaScript',
            badge: (
                <div className="w-8 h-8 rounded-lg bg-[#F7DF1E] flex items-center justify-center font-black text-black text-xs shadow-sm">
                    JS
                </div>
            ),
        },
        {
            name: 'PHP',
            badge: (
                <div className="w-8 h-8 rounded-lg bg-[#777BB4] flex items-center justify-center font-bold text-white text-[10px] shadow-sm">
                    php
                </div>
            ),
        },
        {
            name: 'Google Analytics & Workspace',
            badge: (
                <div className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                </div>
            ),
        },
        {
            name: 'SQL & Relational Databases',
            badge: (
                <div className="w-8 h-8 rounded-lg bg-[#00758F] flex items-center justify-center text-white shadow-sm">
                    <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                        <ellipse cx="12" cy="5" rx="9" ry="3"/>
                        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                    </svg>
                </div>
            ),
        },

        // Row 4
        {
            name: 'Python',
            badge: (
                <div className="w-8 h-8 rounded-lg bg-[#3776AB] flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path fill="#FFD43B" d="M11.9 1.5c-2.4 0-4.5.8-4.5 2.6v2h4.6v.7H4.3c-1.8 0-3.3 1.2-3.3 3.6 0 2.2 1.3 3.5 3.3 3.5h1.7v-2.3c0-1.8 1.5-3.3 3.3-3.3h4.6c1.3 0 2.3-1 2.3-2.3V4.1c0-1.8-1.9-2.6-4.3-2.6z"/>
                        <path fill="#3776AB" d="M12.1 22.5c2.4 0 4.5-.8 4.5-2.6v-2h-4.6v-.7h7.7c1.8 0 3.3-1.2 3.3-3.6 0-2.2-1.3-3.5-3.3-3.5H18v2.3c0 1.8-1.5 3.3-3.3 3.3h-4.6c-1.3 0-2.3 1-2.3 2.3v4.6c0 1.8 1.9 2.6 4.3 2.6z"/>
                    </svg>
                </div>
            ),
        },
        {
            name: 'Git & GitHub',
            badge: (
                <div className="w-8 h-8 rounded-lg bg-[#F05032] flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.53 1.03 1.53 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.16 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                </div>
            ),
        },
        {
            name: 'C / C++',
            badge: (
                <div className="w-8 h-8 rounded-lg bg-[#00599C] flex items-center justify-center font-black text-white text-xs shadow-sm">
                    C
                </div>
            ),
        },
        {
            name: 'Power BI & Tableau',
            badge: (
                <div className="w-8 h-8 rounded-lg bg-[#F2C811] flex items-center justify-center text-black font-black text-xs shadow-sm">
                    <svg className="w-5 h-5 fill-black" viewBox="0 0 24 24">
                        <rect x="3" y="10" width="4" height="10" rx="1"/>
                        <rect x="10" y="5" width="4" height="15" rx="1"/>
                        <rect x="17" y="2" width="4" height="18" rx="1"/>
                    </svg>
                </div>
            ),
        },
    ];

    // Card 01 Tag Pills (Matching reference exactly)
    const cardOnePills = [
        'Web Development',
        'System Testing',
        'Bug Identification',
        'System Analysis',
        'Database Management',
        'MySQL',
        'PHP',
        'Python',
        'HTML',
        'CSS',
        'JavaScript',
        'RFID & QR Integration',
    ];

    // Card 02 Tag Pills (Matching reference exactly)
    const cardTwoPills = [
        'Data Entry',
        'Data Validation',
        'Document Management',
        'Online Research',
        'Administrative Support',
        'Google Workspace',
        'Social Media Management',
        'Content Optimization',
        'Power BI & Tableau',
        'Workflow Automation',
    ];

    return (
        <section id="what-i-can-do" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative scroll-mt-24">
            {/* Anchor alias for backwards compatibility */}
            <div id="capabilities" className="absolute -top-24 left-0 pointer-events-none" aria-hidden="true" />
            
            {/* Background subtle contour topography matching reference */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04] select-none -z-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" fill="none" stroke="currentColor">
                    <path d="M-100 200 C 300 150, 700 350, 1300 250" strokeWidth="1.5" />
                    <path d="M-100 350 C 400 300, 700 500, 1300 400" strokeWidth="1.5" />
                    <path d="M-100 500 C 350 450, 650 650, 1300 550" strokeWidth="1.5" />
                    <path d="M-100 650 C 450 600, 750 800, 1300 700" strokeWidth="1.5" />
                </svg>
            </div>

            {/* 3-Column Layout: Left (Info + 4x4 Grid), Middle (Card 01), Right (Card 02) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* =================================================================
                    LEFT COLUMN: Header, What I Can Do Title, Subtitle, 4x4 Icon Matrix
                   ================================================================= */}
                <div className="lg:col-span-4 flex flex-col justify-between py-2">
                    <div>
                        {/* Eyebrow Label */}
                        <div className="mb-2">
                            <span className="text-[11px] font-mono font-semibold tracking-[0.25em] uppercase text-[var(--accent-muted)]">
                                MY CAPABILITIES
                            </span>
                        </div>

                        {/* Title matching reference screenshot 08 with blinking terminal cursor */}
                        <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] text-[var(--text-primary)] font-bold tracking-tight mb-4 min-h-[1.25em] flex items-center leading-tight">
                            <span>What I Can Do</span>
                            <span 
                                className="inline-block w-[3.5px] sm:w-[4px] h-[0.9em] ml-2 bg-[var(--text-primary)] animate-pulse rounded-full align-middle"
                                aria-hidden="true"
                            />
                        </h2>

                        {/* Subtitle Description (Direct from Reference) */}
                        <p className="text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed mb-8 max-w-sm">
                            I combine technical, problem-solving, and digital skills to build reliable systems, test systems, manage data, and support efficient digital workflows.
                        </p>
                    </div>

                    {/* 4x4 Matrix of Colorful Tech Stack App Icons */}
                    <div className="mt-auto">
                        <div className="grid grid-cols-4 gap-3 sm:gap-3.5 w-fit">
                            {techStackIcons.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="group relative z-10 hover:z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center p-2 cursor-pointer shadow-sm"
                                >
                                    {item.badge}
                                    
                                    {/* Tooltip on Hover */}
                                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all duration-200 z-50 whitespace-nowrap">
                                        <div className="relative px-2.5 py-1 rounded-md bg-[var(--bg-surface-elevated)] border border-[var(--border-prominent)] text-[10px] font-mono text-[var(--text-primary)] shadow-xl">
                                            {item.name}
                                            {/* Pointer arrow downward */}
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[var(--bg-surface-elevated)] border-r border-b border-[var(--border-prominent)]"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* =================================================================
                    MIDDLE COLUMN: Bento Card 01 (IT, Web Development & QA)
                   ================================================================= */}
                <div className="lg:col-span-4 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-7 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-[var(--accent-primary)]/40 transition-all duration-300">
                    <div>
                        {/* Top Header: 01 + Title */}
                        <div className="flex items-start justify-between mb-2">
                            <span className="font-display text-5xl sm:text-6xl font-bold text-[var(--text-primary)] leading-none tracking-tight">
                                01
                            </span>
                            <div className="text-right text-[11px] font-mono font-semibold tracking-wider uppercase text-[var(--text-muted)] leading-tight">
                                IT, WEB<br />DEVELOPMENT &<br />QA
                            </div>
                        </div>

                        {/* Center Graphic Badge: Terminal Window with < / > */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto my-6 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] shadow-md flex flex-col items-center justify-center p-2.5 transition-transform duration-300 group-hover:scale-105 select-none">
                            <div className="w-full flex items-center gap-1 mb-1.5 px-0.5 border-b border-[var(--border-subtle)] pb-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            </div>
                            <div className="font-mono text-[var(--text-primary)] text-lg sm:text-xl font-bold tracking-tighter">
                                &lt; / &gt;
                            </div>
                        </div>

                        {/* Description (Direct from Reference) */}
                        <p className="text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed mb-6">
                            Building and testing functional digital systems, from database-driven web applications to RFID and QR-based solutions, with a focus on reliability, usability, and practical problem-solving.
                        </p>
                    </div>

                    {/* Tag Pills Grid */}
                    <div className="flex flex-wrap gap-2 pt-2">
                        {cardOnePills.map((pill, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[11px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-muted)] transition-all cursor-default"
                            >
                                {pill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* =================================================================
                    RIGHT COLUMN: Bento Card 02 (VA & Digital Operations)
                   ================================================================= */}
                <div className="lg:col-span-4 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-7 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-[var(--accent-primary)]/40 transition-all duration-300">
                    <div>
                        {/* Top Header: 02 + Title */}
                        <div className="flex items-start justify-between mb-2">
                            <span className="font-display text-5xl sm:text-6xl font-bold text-[var(--text-primary)] leading-none tracking-tight">
                                02
                            </span>
                            <div className="text-right text-[11px] font-mono font-semibold tracking-wider uppercase text-[var(--text-muted)] leading-tight">
                                VA & DIGITAL<br />OPERATIONS
                            </div>
                        </div>

                        {/* Center Graphic Badge: Operator / Analyst at Laptop */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto my-6 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] shadow-md flex items-center justify-center p-2.5 transition-transform duration-300 group-hover:scale-105 select-none">
                            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--text-primary)]" viewBox="0 0 48 48" fill="none">
                                {/* Head with headset */}
                                <circle cx="24" cy="16" r="6" stroke="currentColor" strokeWidth="2.5" fill="none" />
                                <path d="M18 16c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                <rect x="29" y="14" width="3" height="4" rx="1.5" fill="currentColor" />
                                <path d="M30 18v2a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                {/* Body */}
                                <path d="M14 34c0-5 4.5-8 10-8s10 3 10 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                {/* Laptop */}
                                <rect x="16" y="32" width="16" height="9" rx="1.5" fill="var(--bg-surface)" stroke="currentColor" strokeWidth="2" />
                                <line x1="12" y1="41" x2="36" y2="41" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                {/* Thought / Speech bubble */}
                                <path d="M34 10a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5l.5 2.5-2.5-1.2A4 4 0 0 1 34 10z" fill="#FEF08A" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </div>

                        {/* Description (Direct from Reference) */}
                        <p className="text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed mb-6">
                            Supporting teams with organized data, documentation, research, and digital workflows while helping keep day-to-day operations accurate and efficient.
                        </p>
                    </div>

                    {/* Tag Pills Grid */}
                    <div className="flex flex-wrap gap-2 pt-2">
                        {cardTwoPills.map((pill, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[11px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-muted)] transition-all cursor-default"
                            >
                                {pill}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
