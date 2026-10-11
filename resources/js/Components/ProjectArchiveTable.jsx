import React, { useState } from 'react';
import { Search, ExternalLink, Filter, Code2, BarChart2, Eye, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectArchiveTable({ projects = [], onSelectProject }) {
    const [selectedTab, setSelectedTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProjects = projects.filter((project) => {
        const matchesCategory = 
            selectedTab === 'all' || 
            project.category === selectedTab;

        const query = searchQuery.toLowerCase();
        const matchesSearch = 
            project.title.toLowerCase().includes(query) ||
            (project.short_description && project.short_description.toLowerCase().includes(query)) ||
            (project.client_or_context && project.client_or_context.toLowerCase().includes(query)) ||
            (Array.isArray(project.tech_stack) && project.tech_stack.some(t => t.toLowerCase().includes(query)));

        return matchesCategory && matchesSearch;
    });

    return (
        <section id="archive" className="py-24 px-4 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[11px] uppercase tracking-widest text-[var(--accent-primary)] mb-3">
                        <Filter className="w-3.5 h-3.5" />
                        <span>Complete Repository</span>
                    </div>
                    <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-wider text-[var(--text-primary)]">
                        PROJECT ARCHIVE
                    </h2>
                </div>

                {/* Search Bar & Filter Tabs */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                    {/* Search Input */}
                    <div className="relative w-full sm:w-64">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                        <input
                            type="text"
                            placeholder="Filter by title, stack..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 rounded-full text-xs bg-[var(--bg-surface)] border border-[var(--border-subtle)] focus:border-[var(--accent-primary)] focus:outline-none text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-colors"
                        />
                    </div>

                    {/* Category Switcher Tabs */}
                    <div className="flex items-center p-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] w-full sm:w-auto">
                        <button
                            onClick={() => setSelectedTab('all')}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                                selectedTab === 'all'
                                    ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)]'
                                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                            }`}
                        >
                            All ({projects.length})
                        </button>
                        <button
                            onClick={() => setSelectedTab('technical')}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                                selectedTab === 'technical'
                                    ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)]'
                                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                            }`}
                        >
                            Technical
                        </button>
                        <button
                            onClick={() => setSelectedTab('digital')}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                                selectedTab === 'digital'
                                    ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)]'
                                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                            }`}
                        >
                            Digital
                        </button>
                    </div>
                </div>
            </div>

            {/* Archive Table */}
            <div className="rounded-3xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                                <th className="py-4 px-6">Year</th>
                                <th className="py-4 px-6">Project Title</th>
                                <th className="py-4 px-6 hidden sm:table-cell">Context / Client</th>
                                <th className="py-4 px-6 hidden md:table-cell">Tech Stack</th>
                                <th className="py-4 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-subtle)] text-xs">
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map((project) => (
                                    <tr
                                        key={project.id}
                                        onClick={() => onSelectProject && onSelectProject(project)}
                                        className="hover:bg-[var(--bg-surface-elevated)] transition-colors group cursor-pointer"
                                    >
                                        <td className="py-4 px-6 font-mono text-[var(--text-muted)] whitespace-nowrap">
                                            {project.year || '—'}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                                                    {project.title}
                                                </span>
                                                {project.is_featured && (
                                                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/25">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-[11px] text-[var(--text-muted)] line-clamp-1 sm:hidden mt-0.5">
                                                {project.client_or_context}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-[var(--text-secondary)] hidden sm:table-cell">
                                            {project.client_or_context || 'Personal Exploration'}
                                        </td>
                                        <td className="py-4 px-6 hidden md:table-cell">
                                            <div className="flex flex-wrap gap-1.5 max-w-xs">
                                                {Array.isArray(project.tech_stack) && project.tech_stack.slice(0, 3).map((t, idx) => (
                                                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
                                                        {t}
                                                    </span>
                                                ))}
                                                {Array.isArray(project.tech_stack) && project.tech_stack.length > 3 && (
                                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-[var(--text-muted)]">
                                                        +{project.tech_stack.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                                <button
                                                    onClick={() => onSelectProject && onSelectProject(project)}
                                                    className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors cursor-pointer"
                                                    title="Quick View"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                {project.github_repo_url && (
                                                    <a
                                                        href={project.github_repo_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors"
                                                        title="GitHub Repo"
                                                    >
                                                        <GithubIcon className="w-4 h-4" />
                                                    </a>
                                                )}
                                                {project.live_demo_url && (
                                                    <a
                                                        href={project.live_demo_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors"
                                                        title="Live Link"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-12 text-center text-[var(--text-muted)] font-mono">
                                        No projects match the current filter criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
