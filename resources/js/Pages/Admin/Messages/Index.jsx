import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '../../../Components/AdminLayout';
import { Mail, CheckCircle2, Clock, Trash2, Eye, X, MessageSquare } from 'lucide-react';

export default function Index({ messages = [] }) {
    const [viewingMessage, setViewingMessage] = useState(null);

    const handleToggleRead = (id) => {
        router.post(`/admin/messages/${id}/toggle-read`, {}, {
            preserveScroll: true,
        });
    };

    const handleDelete = (id, sender) => {
        if (confirm(`Hapus pesan dari "${sender}"?`)) {
            router.delete(`/admin/messages/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout title="Inquiries & Messages Inbox">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="font-display text-2xl uppercase tracking-wider text-[#F5EFEB]">
                        Contact Inquiries ({messages.length})
                    </h3>
                    <p className="text-xs text-[#C8BBB2] mt-0.5 font-mono">
                        Messages submitted by visitors via public contact modal.
                    </p>
                </div>
            </div>

            {/* Messages List Table */}
            <div className="rounded-3xl overflow-hidden bg-[#1A1412] border border-[rgba(196,169,146,0.2)] shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr className="border-b border-[rgba(196,169,146,0.16)] bg-[#241C18] text-[11px] font-mono uppercase tracking-wider text-[#958479]">
                                <th className="py-4 px-6">Status</th>
                                <th className="py-4 px-6">Sender Details</th>
                                <th className="py-4 px-6">Subject</th>
                                <th className="py-4 px-6">Date</th>
                                <th className="py-4 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[rgba(196,169,146,0.12)]">
                            {messages.length > 0 ? (
                                messages.map((item) => (
                                    <tr 
                                        key={item.id} 
                                        className={`hover:bg-[#241C18] transition-colors cursor-pointer ${
                                            !item.is_read ? 'bg-[#241C18]/60 font-medium' : ''
                                        }`}
                                        onClick={() => setViewingMessage(item)}
                                    >
                                        <td className="py-4 px-6">
                                            {item.is_read ? (
                                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono text-[#958479] bg-[#140F0D]">
                                                    Read
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                                    New
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="font-bold text-sm text-[#F5EFEB] block">{item.sender_name}</span>
                                            <a 
                                                href={`mailto:${item.sender_email}`} 
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-[11px] text-[#C4A992] hover:underline"
                                            >
                                                {item.sender_email}
                                            </a>
                                        </td>
                                        <td className="py-4 px-6 text-[#C8BBB2]">
                                            <span className="line-clamp-1">{item.subject || 'No Subject'}</span>
                                        </td>
                                        <td className="py-4 px-6 font-mono text-[11px] text-[#958479] whitespace-nowrap">
                                            {new Date(item.created_at).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </td>
                                        <td className="py-4 px-6 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleToggleRead(item.id)}
                                                    className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-[#140F0D] text-[#C8BBB2] hover:text-[#C4A992] transition-colors"
                                                    title="Toggle Read Status"
                                                >
                                                    {item.is_read ? 'Mark Unread' : 'Mark Read'}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id, item.sender_name)}
                                                    className="p-1.5 rounded-lg text-[#C8BBB2] hover:text-red-400 hover:bg-[#140F0D] transition-colors"
                                                    title="Delete Message"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-12 text-center text-[#958479] font-mono">
                                        No contact inquiries received yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Read Message Detail Modal */}
            {viewingMessage && (
                <div 
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={() => setViewingMessage(null)}
                >
                    <div 
                        className="relative w-full max-w-lg rounded-3xl bg-[#1A1412] border border-[rgba(196,169,146,0.3)] p-6 sm:p-8 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setViewingMessage(null)}
                            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#241C18] text-[#C8BBB2] hover:text-white flex items-center justify-center cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="mb-6">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C4A992] block mb-1">
                                Inquiry Details
                            </span>
                            <h3 className="font-display text-2xl uppercase tracking-wider text-[#F5EFEB]">
                                {viewingMessage.subject || 'Portfolio Inquiry'}
                            </h3>
                            <div className="flex items-center gap-3 mt-2 text-xs text-[#C8BBB2]">
                                <span>From: <strong className="text-[#F5EFEB]">{viewingMessage.sender_name}</strong></span>
                                <span>•</span>
                                <a href={`mailto:${viewingMessage.sender_email}`} className="text-[#C4A992] hover:underline">
                                    {viewingMessage.sender_email}
                                </a>
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-[#140F0D] border border-[rgba(196,169,146,0.15)] text-xs text-[#F5EFEB] leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto mb-6">
                            {viewingMessage.message}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-[rgba(196,169,146,0.16)] text-xs">
                            <a
                                href={`mailto:${viewingMessage.sender_email}?subject=Re: ${encodeURIComponent(viewingMessage.subject || 'Portfolio Inquiry')}`}
                                className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C4A992] text-[#1A1412] hover:bg-[#D4BEA8] transition-all"
                            >
                                Reply via Email
                            </a>

                            <button
                                onClick={() => {
                                    handleToggleRead(viewingMessage.id);
                                    setViewingMessage(null);
                                }}
                                className="text-xs font-mono text-[#958479] hover:text-[#C4A992]"
                            >
                                {viewingMessage.is_read ? 'Mark as Unread' : 'Mark as Read'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
