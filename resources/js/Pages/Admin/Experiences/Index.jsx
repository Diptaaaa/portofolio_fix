import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Components/AdminLayout';
import { 
    GraduationCap, Briefcase, Building2, Calendar, Plus, 
    Edit2, Trash2, X, AlertCircle, Sparkles, Users, Clock,
    BookOpen, Award, ArrowUpRight
} from 'lucide-react';

export default function ExperiencesIndex({ experiences = [], stats = {} }) {
    const [activeTab, setActiveTab] = useState('all');
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deletingItem, setDeletingItem] = useState(null);

    // Form for creating a new experience
    const createForm = useForm({
        role: '',
        company_or_org: '',
        period: '',
        type: 'work',
        description: '',
        sort_order: 1,
    });

    // Form for editing an experience
    const editForm = useForm({
        role: '',
        company_or_org: '',
        period: '',
        type: 'work',
        description: '',
        sort_order: 1,
    });

    // Filter experiences by active tab
    const filteredItems = experiences.filter((item) => {
        if (activeTab === 'all') return true;
        return item.type === activeTab;
    });

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        createForm.post('/admin/experiences', {
            preserveScroll: true,
            onSuccess: () => {
                createForm.reset();
                setIsCreateOpen(false);
            },
        });
    };

    const handleStartEdit = (item) => {
        setEditingItem(item);
        editForm.setData({
            role: item.role || '',
            company_or_org: item.company_or_org || '',
            period: item.period || '',
            type: item.type || 'work',
            description: item.description || '',
            sort_order: item.sort_order || 1,
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!editingItem) return;

        editForm.post(`/admin/experiences/${editingItem.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setEditingItem(null);
            },
        });
    };

    const handleDeleteSubmit = () => {
        if (!deletingItem) return;
        router.delete(`/admin/experiences/${deletingItem.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setDeletingItem(null);
            },
        });
    };

    // Helper for Type Badges
    const getTypeBadge = (type) => {
        switch (type) {
            case 'work':
                return {
                    label: 'Work Experience',
                    bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
                    icon: Briefcase,
                };
            case 'education':
                return {
                    label: 'Education & Training',
                    bg: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
                    icon: GraduationCap,
                };
            case 'organization':
                return {
                    label: 'Organization & Leadership',
                    bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
                    icon: Users,
                };
            default:
                return {
                    label: type,
                    bg: 'bg-stone-500/10 text-stone-400 border-stone-500/30',
                    icon: BookOpen,
                };
        }
    };

    return (
        <AdminLayout title="Trainings & Experience Manager">
            {/* Top Stats Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="p-5 rounded-2xl bg-[#1A1412] border border-[rgba(196,169,146,0.2)] flex items-center justify-between">
                    <div>
                        <span className="text-[11px] font-mono text-[#958479] uppercase tracking-wider block">Total Timeline</span>
                        <span className="font-display text-3xl text-[#F5EFEB] mt-1 block">{stats.total || experiences.length}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#241C18] flex items-center justify-center text-[#C4A992]">
                        <Clock className="w-5 h-5" />
                    </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#1A1412] border border-[rgba(196,169,146,0.2)] flex items-center justify-between">
                    <div>
                        <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block">Work Experience</span>
                        <span className="font-display text-3xl text-[#F5EFEB] mt-1 block">{stats.work || 0}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#241C18] flex items-center justify-center text-emerald-400">
                        <Briefcase className="w-5 h-5" />
                    </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#1A1412] border border-[rgba(196,169,146,0.2)] flex items-center justify-between">
                    <div>
                        <span className="text-[11px] font-mono text-sky-400 uppercase tracking-wider block">Education & Training</span>
                        <span className="font-display text-3xl text-[#F5EFEB] mt-1 block">{stats.education || 0}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#241C18] flex items-center justify-center text-sky-400">
                        <GraduationCap className="w-5 h-5" />
                    </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#1A1412] border border-[rgba(196,169,146,0.2)] flex items-center justify-between">
                    <div>
                        <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block">Organizations</span>
                        <span className="font-display text-3xl text-[#F5EFEB] mt-1 block">{stats.organization || 0}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#241C18] flex items-center justify-center text-amber-400">
                        <Users className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Actions Bar & Filter Tabs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                {/* Category Filter Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#1A1412] border border-[rgba(196,169,146,0.2)] rounded-2xl">
                    {[
                        { id: 'all', label: 'All Timeline', count: experiences.length },
                        { id: 'work', label: 'Work Experience', count: stats.work || 0 },
                        { id: 'education', label: 'Education & Training', count: stats.education || 0 },
                        { id: 'organization', label: 'Organizations', count: stats.organization || 0 },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
                                activeTab === tab.id
                                    ? 'bg-[#C4A992] text-[#1A1412] font-bold shadow-md'
                                    : 'text-[#C8BBB2] hover:text-[#F5EFEB] hover:bg-[#241C18]'
                            }`}
                        >
                            <span>{tab.label}</span>
                            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                                activeTab === tab.id ? 'bg-[#1A1412]/20 text-[#1A1412]' : 'bg-[#241C18] text-[#958479]'
                            }`}>
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Add New Experience Button */}
                <button
                    onClick={() => setIsCreateOpen(true)}
                    className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C4A992] text-[#1A1412] hover:bg-[#D4BEA8] transition-all shadow-lg flex items-center gap-2 cursor-pointer shrink-0"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add New Experience</span>
                </button>
            </div>

            {/* Timeline Table */}
            <div className="rounded-3xl overflow-hidden bg-[#1A1412] border border-[rgba(196,169,146,0.2)] shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr className="border-b border-[rgba(196,169,146,0.16)] bg-[#241C18] text-[11px] font-mono uppercase tracking-wider text-[#958479]">
                                <th className="py-4 px-6">Role & Institution</th>
                                <th className="py-4 px-6">Type</th>
                                <th className="py-4 px-6">Period</th>
                                <th className="py-4 px-6 max-w-md">Description</th>
                                <th className="py-4 px-6 text-center">Order</th>
                                <th className="py-4 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[rgba(196,169,146,0.12)]">
                            {filteredItems.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="py-12 text-center text-[#958479]">
                                        Belum ada riwayat pengalaman pada kategori ini. Klik "Add New Experience" untuk menambahkan.
                                    </td>
                                </tr>
                            ) : (
                                filteredItems.map((item) => {
                                    const typeBadge = getTypeBadge(item.type);
                                    const TypeIcon = typeBadge.icon;
                                    return (
                                        <tr key={item.id} className="hover:bg-[#241C18] transition-colors">
                                            {/* Role & Company */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-[#241C18] border border-[rgba(196,169,146,0.2)] flex items-center justify-center shrink-0 mt-0.5 text-[#C4A992]">
                                                        <TypeIcon className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <span className="font-bold text-sm text-[#F5EFEB] block">{item.role}</span>
                                                        <div className="flex items-center gap-1.5 text-[11px] text-[#C4A992] mt-0.5 font-medium">
                                                            <Building2 className="w-3 h-3 text-[#958479]" />
                                                            <span>{item.company_or_org}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Type Badge */}
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${typeBadge.bg}`}>
                                                    <TypeIcon className="w-3 h-3" />
                                                    <span>{typeBadge.label}</span>
                                                </span>
                                            </td>

                                            {/* Period */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#C8BBB2]">
                                                    <Calendar className="w-3.5 h-3.5 text-[#958479]" />
                                                    <span>{item.period}</span>
                                                </div>
                                            </td>

                                            {/* Description */}
                                            <td className="py-4 px-6 max-w-md">
                                                <p className="text-xs text-[#C8BBB2] line-clamp-2 leading-relaxed">
                                                    {item.description || '-'}
                                                </p>
                                            </td>

                                            {/* Sort Order */}
                                            <td className="py-4 px-6 text-center font-mono text-[#C8BBB2]">
                                                {item.sort_order}
                                            </td>

                                            {/* Actions */}
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleStartEdit(item)}
                                                        className="p-1.5 rounded-lg bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#C4A992] hover:bg-[#C4A992] hover:text-[#1A1412] transition-colors cursor-pointer"
                                                        title="Edit Riwayat"
                                                    >
                                                        <Edit2 className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() => setDeletingItem(item)}
                                                        className="p-1.5 rounded-lg bg-[#241C18] border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                                                        title="Hapus Riwayat"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal: Create Experience */}
            {isCreateOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-lg bg-[#1A1412] border border-[rgba(196,169,146,0.3)] rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-4 border-b border-[rgba(196,169,146,0.16)] mb-6">
                            <div>
                                <h3 className="font-display text-2xl uppercase tracking-wider text-[#F5EFEB]">Add New Experience</h3>
                                <p className="text-xs text-[#C8BBB2]">Tambahkan pengalaman karir, training, atau edukasi baru.</p>
                            </div>
                            <button
                                onClick={() => setIsCreateOpen(false)}
                                className="p-2 rounded-xl bg-[#241C18] text-[#958479] hover:text-[#F5EFEB] transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="space-y-4">
                            {/* Role / Position */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                    Role / Posisi *
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: Junior Data Analyst, Front-End Engineer, Apple Scholar"
                                    value={createForm.data.role}
                                    onChange={(e) => createForm.setData('role', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                />
                                {createForm.errors.role && (
                                    <span className="text-[11px] text-red-400 mt-1 block">{createForm.errors.role}</span>
                                )}
                            </div>

                            {/* Company / Institution */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                    Perusahaan / Institusi / Penyelenggara *
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: Universitas Brawijaya, Independent, Google, Apple"
                                    value={createForm.data.company_or_org}
                                    onChange={(e) => createForm.setData('company_or_org', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                />
                                {createForm.errors.company_or_org && (
                                    <span className="text-[11px] text-red-400 mt-1 block">{createForm.errors.company_or_org}</span>
                                )}
                            </div>

                            {/* Type & Period Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                        Kategori / Tipe *
                                    </label>
                                    <select
                                        value={createForm.data.type}
                                        onChange={(e) => createForm.setData('type', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none cursor-pointer"
                                    >
                                        <option value="work">Work Experience</option>
                                        <option value="education">Education & Training</option>
                                        <option value="organization">Organization & Leadership</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                        Periode Waktu *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Contoh: 2023 - Present, Aug - Oct 2025"
                                        value={createForm.data.period}
                                        onChange={(e) => createForm.setData('period', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                    />
                                    {createForm.errors.period && (
                                        <span className="text-[11px] text-red-400 mt-1 block">{createForm.errors.period}</span>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                    Deskripsi Pencapaian & Tanggung Jawab
                                </label>
                                <textarea
                                    rows="4"
                                    placeholder="Jelaskan peran, teknologi yang digunakan, serta dampak atau hasil yang dicapai..."
                                    value={createForm.data.description}
                                    onChange={(e) => createForm.setData('description', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none resize-none"
                                />
                            </div>

                            {/* Sort Order */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                    Sort Order (Urutan Prioritas)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={createForm.data.sort_order}
                                    onChange={(e) => createForm.setData('sort_order', parseInt(e.target.value) || 1)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end gap-3 pt-6 border-t border-[rgba(196,169,146,0.16)]">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateOpen(false)}
                                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#C8BBB2] hover:bg-[#241C18] transition-colors cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={createForm.processing}
                                    className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#C4A992] text-[#1A1412] hover:bg-[#D4BEA8] transition-all cursor-pointer shadow-lg disabled:opacity-50"
                                >
                                    {createForm.processing ? 'Menyimpan...' : 'Simpan Pengalaman'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Edit Experience */}
            {editingItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-lg bg-[#1A1412] border border-[rgba(196,169,146,0.3)] rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-4 border-b border-[rgba(196,169,146,0.16)] mb-6">
                            <div>
                                <h3 className="font-display text-2xl uppercase tracking-wider text-[#F5EFEB]">Edit Experience</h3>
                                <p className="text-xs text-[#C8BBB2]">Perbarui detail riwayat karir atau edukasi ini.</p>
                            </div>
                            <button
                                onClick={() => setEditingItem(null)}
                                className="p-2 rounded-xl bg-[#241C18] text-[#958479] hover:text-[#F5EFEB] transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            {/* Role / Position */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                    Role / Posisi *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={editForm.data.role}
                                    onChange={(e) => editForm.setData('role', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                />
                                {editForm.errors.role && (
                                    <span className="text-[11px] text-red-400 mt-1 block">{editForm.errors.role}</span>
                                )}
                            </div>

                            {/* Company / Institution */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                    Perusahaan / Institusi / Penyelenggara *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={editForm.data.company_or_org}
                                    onChange={(e) => editForm.setData('company_or_org', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                />
                                {editForm.errors.company_or_org && (
                                    <span className="text-[11px] text-red-400 mt-1 block">{editForm.errors.company_or_org}</span>
                                )}
                            </div>

                            {/* Type & Period Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                        Kategori / Tipe *
                                    </label>
                                    <select
                                        value={editForm.data.type}
                                        onChange={(e) => editForm.setData('type', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none cursor-pointer"
                                    >
                                        <option value="work">Work Experience</option>
                                        <option value="education">Education & Training</option>
                                        <option value="organization">Organization & Leadership</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                        Periode Waktu *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={editForm.data.period}
                                        onChange={(e) => editForm.setData('period', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                    />
                                    {editForm.errors.period && (
                                        <span className="text-[11px] text-red-400 mt-1 block">{editForm.errors.period}</span>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                    Deskripsi Pencapaian & Tanggung Jawab
                                </label>
                                <textarea
                                    rows="4"
                                    value={editForm.data.description}
                                    onChange={(e) => editForm.setData('description', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none resize-none"
                                />
                            </div>

                            {/* Sort Order */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                    Sort Order (Urutan Prioritas)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={editForm.data.sort_order}
                                    onChange={(e) => editForm.setData('sort_order', parseInt(e.target.value) || 1)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end gap-3 pt-6 border-t border-[rgba(196,169,146,0.16)]">
                                <button
                                    type="button"
                                    onClick={() => setEditingItem(null)}
                                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#C8BBB2] hover:bg-[#241C18] transition-colors cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={editForm.processing}
                                    className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#C4A992] text-[#1A1412] hover:bg-[#D4BEA8] transition-all cursor-pointer shadow-lg disabled:opacity-50"
                                >
                                    {editForm.processing ? 'Menyimpan...' : 'Perbarui Pengalaman'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Delete Confirmation */}
            {deletingItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-md bg-[#1A1412] border border-red-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
                        <div className="flex items-center gap-3 text-red-400 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
                                <AlertCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-display text-xl uppercase tracking-wider text-[#F5EFEB]">Hapus Pengalaman?</h3>
                                <p className="text-xs text-[#C8BBB2]">Tindakan ini tidak dapat dibatalkan.</p>
                            </div>
                        </div>

                        <p className="text-xs text-[#C8BBB2] leading-relaxed mb-6">
                            Apakah Anda yakin ingin menghapus pengalaman <strong className="text-[#F5EFEB]">{deletingItem.role}</strong> di <span className="text-[#C4A992]">{deletingItem.company_or_org}</span>?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setDeletingItem(null)}
                                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#C8BBB2] hover:bg-[#241C18] transition-colors cursor-pointer"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteSubmit}
                                className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-red-500 text-white hover:bg-red-600 transition-all cursor-pointer shadow-lg"
                            >
                                Ya, Hapus Pengalaman
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
