import React from 'react';
import { X, ExternalLink, Calendar, User, Tag, Layers, CheckCircle } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectDetailModal({ project, onClose }) {
    if (!project) return null;

    const thumbnailSrc = project.thumbnail_path ? `/storage/${project.thumbnail_path}` : null;
    const gallery = Array.isArray(project.gallery_images) ? project.gallery_images : [];

    return (
        <div 
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 overflow-y-auto"
            onClick={onClose}
        >
            <div 
                className="relative w-full max-w-3xl my-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-prominent)] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Image or Main Banner */}
                <div className="relative w-full h-64 sm:h-80 bg-[var(--bg-secondary)] overflow-hidden">
                    {thumbnailSrc ? (
                        <img 
                            src={thumbnailSrc} 
                            alt={project.title} 
                            className="w-full h-full object-cover object-top"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)] font-mono text-sm">
                            Project Documentation
                        </div>
                    )}
                    <button
                        onClick={onClose}
                        aria-label="Close Modal"
                        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
                            project.category === 'technical'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                            {project.category === 'technical' ? 'Technical • Software' : 'Digital • Analytics'}
                        </span>
                        {project.year && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-black/60 text-white backdrop-blur-md">
                                {project.year}
                            </span>
                        )}
                    </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-8 space-y-6">
                    <div>
                        <h3 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-[var(--text-primary)] mb-2">
                            {project.title}
                        </h3>
                        {project.client_or_context && (
                            <p className="text-xs font-mono text-[var(--accent-primary)] mb-4">
                                // Context: {project.client_or_context}
                            </p>
                        )}
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
                            {project.full_description || project.short_description}
                        </p>
                    </div>

                    {/* Tech Stack */}
                    {Array.isArray(project.tech_stack) && project.tech_stack.length > 0 && (
                        <div>
                            <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2.5">
                                Technologies & Tools Applied
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {project.tech_stack.map((tech, idx) => (
                                    <span key={idx} className="px-3 py-1 rounded-lg text-xs font-mono bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)]">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Additional Gallery Screenshots if available */}
                    {gallery.length > 1 && (
                        <div>
                            <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-3">
                                Screen Captures & Visual Artifacts
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {gallery.map((img, idx) => (
                                    <div key={idx} className="aspect-video rounded-xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                                        <img 
                                            src={`/storage/${img}`} 
                                            alt={`Capture ${idx + 1}`}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform" 
                                            loading="lazy"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Action Links */}
                    <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            {project.github_repo_url && (
                                <a
                                    href={project.github_repo_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--bg-surface-elevated)] border border-[var(--border-prominent)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all"
                                >
                                    <GithubIcon className="w-3.5 h-3.5" />
                                    <span>Source Code</span>
                                </a>
                            )}
                            {project.live_demo_url && (
                                <a
                                    href={project.live_demo_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--accent-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent-hover)] transition-all shadow-md"
                                >
                                    <span>Explore Production</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            )}
                        </div>

                        <button
                            onClick={onClose}
                            className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                        >
                            Close View [ESC]
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
