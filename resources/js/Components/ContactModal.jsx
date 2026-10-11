import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { X, Minus, Send, CheckCircle2, MessageSquare, ArrowUpRight } from 'lucide-react';

export default function ContactModal({ isOpen, onClose, profile }) {
    const [isMinimized, setIsMinimized] = useState(false);

    const { data, setData, post, processing, reset, errors, recentlySuccessful } = useForm({
        sender_name: '',
        sender_email: '',
        subject: 'Hire Me Inquiry',
        message: '',
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setTimeout(() => {
                    onClose();
                    setIsMinimized(false);
                }, 3000);
            },
        });
    };

    // If Minimized: Show sleek floating pill in the bottom-right corner
    if (isMinimized) {
        return (
            <div 
                className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-3 duration-200"
            >
                <button
                    onClick={() => setIsMinimized(false)}
                    className="glass-pill px-4 py-2.5 rounded-full border border-[var(--border-prominent)] shadow-2xl flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:scale-105 active:scale-95 transition-all cursor-pointer min-h-[44px]"
                    title="Click to restore contact form"
                >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Send Me a Message</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                </button>
            </div>
        );
    }

    // Full Floating Docked Window in Bottom-Right Corner (Matching Screenshot 3 / Ref 16)
    return (
        <div 
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] rounded-2xl sm:rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-prominent)] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.65)] overflow-hidden flex flex-col animate-in slide-in-from-bottom-8 fade-in duration-300 backdrop-blur-xl"
            role="dialog"
            aria-labelledby="contact-window-title"
        >
            {/* macOS / Modern Window Titlebar (Direct from Reference) */}
            <div className="px-4 py-3 bg-[var(--bg-surface-elevated)] border-b border-[var(--border-subtle)] flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
                    <span id="contact-window-title" className="text-xs sm:text-sm font-bold tracking-tight text-[var(--text-primary)]">
                        Send Me a Message
                    </span>
                </div>

                {/* Window Controls: Minimize & Close */}
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setIsMinimized(true)}
                        aria-label="Minimize Window"
                        className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] active:scale-90 transition-all cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
                        title="Minimize"
                    >
                        <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                        onClick={onClose}
                        aria-label="Close Window"
                        className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] active:scale-90 transition-all cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
                        title="Close"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            {/* Form Content */}
            <div className="p-5 max-h-[calc(100vh-10rem)] overflow-y-auto">
                {/* Success Notification */}
                {recentlySuccessful && (
                    <div className="mb-4 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                        <span>Pesan berhasil dikirim! Saya akan segera merespons via email.</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3.5">
                    {/* FULL NAME Field */}
                    <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
                            FULL NAME
                        </label>
                        <input
                            type="text"
                            required
                            value={data.sender_name}
                            onChange={(e) => setData('sender_name', e.target.value)}
                            placeholder="Your full name"
                            className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] focus:border-[var(--accent-primary)] focus:outline-none text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-colors min-h-[40px]"
                        />
                        {errors.sender_name && (
                            <p className="text-red-400 text-[10px] mt-1">{errors.sender_name}</p>
                        )}
                    </div>

                    {/* EMAIL ADDRESS Field */}
                    <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
                            EMAIL ADDRESS
                        </label>
                        <input
                            type="email"
                            required
                            value={data.sender_email}
                            onChange={(e) => setData('sender_email', e.target.value)}
                            placeholder="your.email@example.com"
                            className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] focus:border-[var(--accent-primary)] focus:outline-none text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-colors min-h-[40px]"
                        />
                        {errors.sender_email && (
                            <p className="text-red-400 text-[10px] mt-1">{errors.sender_email}</p>
                        )}
                    </div>

                    {/* MESSAGE Field */}
                    <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
                            MESSAGE
                        </label>
                        <textarea
                            required
                            rows="3"
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                            placeholder="Tell me about your project..."
                            className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] focus:border-[var(--accent-primary)] focus:outline-none text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-colors resize-none leading-relaxed"
                        ></textarea>
                        {errors.message && (
                            <p className="text-red-400 text-[10px] mt-1">{errors.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full mt-2 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--accent-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent-hover)] transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 min-h-[44px]"
                    >
                        <span>{processing ? 'SENDING...' : 'SEND MESSAGE'}</span>
                        <span className="transition-transform">→</span>
                    </button>
                </form>
            </div>
        </div>
    );
}
