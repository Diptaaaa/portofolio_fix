import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Components/AdminLayout';
import {
    Sparkles,
    Code2,
    BarChart3,
    Cpu,
    Layers,
    Smartphone,
    Zap,
    ShieldCheck,
    Palette,
    Search,
    Rocket,
    HeartHandshake,
    Plus,
    Pencil,
    Trash2,
    X,
    Check,
    Info,
    SlidersHorizontal,
    MoveRight
} from 'lucide-react';

const ICON_MAP = {
    Sparkles,
    Code2,
    BarChart3,
    Cpu,
    Layers,
    Smartphone,
    Zap,
    ShieldCheck,
    Palette,
    Search,
    Rocket,
    HeartHandshake,
};

const COLOR_MAP = {
    amber: {
        label: 'Amber / Gold',
        badgeBg: 'bg-amber-500/15',
        badgeBorder: 'border-amber-500/30',
        badgeText: 'text-amber-300',
        dot: 'bg-amber-400',
        borderAccent: 'hover:border-amber-500/40',
    },
    sky: {
        label: 'Sky / Cyan',
        badgeBg: 'bg-sky-500/15',
        badgeBorder: 'border-sky-500/30',
        badgeText: 'text-sky-300',
        dot: 'bg-sky-400',
        borderAccent: 'hover:border-sky-500/40',
    },
    emerald: {
        label: 'Emerald / Green',
        badgeBg: 'bg-emerald-500/15',
        badgeBorder: 'border-emerald-500/30',
        badgeText: 'text-emerald-300',
        dot: 'bg-emerald-400',
        borderAccent: 'hover:border-emerald-500/40',
    },
    rose: {
        label: 'Rose / Coral',
        badgeBg: 'bg-rose-500/15',
        badgeBorder: 'border-rose-500/30',
        badgeText: 'text-rose-300',
        dot: 'bg-rose-400',
        borderAccent: 'hover:border-rose-500/40',
    },
    indigo: {
        label: 'Indigo / Deep Blue',
        badgeBg: 'bg-indigo-500/15',
        badgeBorder: 'border-indigo-500/30',
        badgeText: 'text-indigo-300',
        dot: 'bg-indigo-400',
        borderAccent: 'hover:border-indigo-500/40',
    },
    violet: {
        label: 'Violet / Purple',
        badgeBg: 'bg-violet-500/15',
        badgeBorder: 'border-violet-500/30',
        badgeText: 'text-violet-300',
        dot: 'bg-violet-400',
        borderAccent: 'hover:border-violet-500/40',
    },
};

export default function TraitsIndex({ traits = [], stats = {} }) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingTrait, setEditingTrait] = useState(null);
    const [deletingTrait, setDeletingTrait] = useState(null);
    const [activePreviewIdx, setActivePreviewIdx] = useState(0);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        tagline: '',
        description: '',
        icon_name: 'Sparkles',
        badge_color: 'amber',
        sort_order: '',
    });

    const openCreateModal = () => {
        reset();
        const nextOrder = traits.length > 0 ? Math.max(...traits.map((t) => t.sort_order || 0)) + 1 : 1;
        setData({
            title: '',
            tagline: '',
            description: '',
            icon_name: 'Sparkles',
            badge_color: 'amber',
            sort_order: nextOrder,
        });
        setIsCreateOpen(true);
    };

    const openEditModal = (trait) => {
        setEditingTrait(trait);
        setData({
            title: trait.title || '',
            tagline: trait.tagline || '',
            description: trait.description || '',
            icon_name: trait.icon_name || 'Sparkles',
            badge_color: trait.badge_color || 'amber',
            sort_order: trait.sort_order ?? '',
        });
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        post('/admin/traits', {
            onSuccess: () => {
                setIsCreateOpen(false);
                reset();
            },
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        post(`/admin/traits/${editingTrait.id}`, {
            onSuccess: () => {
                setEditingTrait(null);
                reset();
            },
        });
    };

    const handleDelete = () => {
        if (!deletingTrait) return;
        router.delete(`/admin/traits/${deletingTrait.id}`, {
            onSuccess: () => setDeletingTrait(null),
        });
    };

    const getIcon = (name) => {
        const IconComp = ICON_MAP[name] || Sparkles;
        return IconComp;
    };

    const getColorTheme = (colorKey) => {
        return COLOR_MAP[colorKey] || COLOR_MAP.amber;
    };

    return (
        <AdminLayout title="What I Can Do (Traits Deck) Manager">
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(196,169,146,0.14)]">
                    <div>
                        <div className="flex items-center gap-2.5 mb-1.5">
                            <h1 className="font-display text-2xl sm:text-3xl tracking-wide uppercase text-[#F5EFEB]">
                                What I Can Do (Traits Deck)
                            </h1>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-[rgba(196,169,146,0.12)] text-[#C4A992] border border-[rgba(196,169,146,0.2)]">
                                {traits.length} Cards
                            </span>
                        </div>
                        <p className="text-xs text-[#958479]">
                            Kelola kartu interaktif pada deck karakteristik dan nilai kerja profesional di section About Me portofolio.
                        </p>
                    </div>

                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#C4A992] text-[#1A1412] hover:bg-[#D5BFAB] font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-black/30"
                    >
                        <Plus className="w-4 h-4" />
                        Tambah Trait Card
                    </button>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#1A1412] border border-[rgba(196,169,146,0.16)] rounded-2xl p-4 flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-[11px] font-mono tracking-wider text-[#958479] uppercase block">
                                Total Trait Cards
                            </span>
                            <span className="text-xl font-bold text-[#F5EFEB]">
                                {traits.length} Kartu
                            </span>
                        </div>
                    </div>

                    <div className="bg-[#1A1412] border border-[rgba(196,169,146,0.16)] rounded-2xl p-4 flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-300">
                            <Layers className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-[11px] font-mono tracking-wider text-[#958479] uppercase block">
                                Display Deck Mode
                            </span>
                            <span className="text-xl font-bold text-[#F5EFEB]">
                                3D Stack Rotate
                            </span>
                        </div>
                    </div>

                    <div className="bg-[#1A1412] border border-[rgba(196,169,146,0.16)] rounded-2xl p-4 flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-300">
                            <Palette className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-[11px] font-mono tracking-wider text-[#958479] uppercase block">
                                Color Themes Active
                            </span>
                            <span className="text-xl font-bold text-[#F5EFEB]">
                                {stats.colors ? stats.colors.length : 0} Varian
                            </span>
                        </div>
                    </div>
                </div>

                {/* Live Miniature Deck Preview */}
                {traits.length > 0 && (
                    <div className="bg-[#181210] border border-[rgba(196,169,146,0.2)] rounded-3xl p-6 relative overflow-hidden">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                            <div className="flex items-center gap-2">
                                <SlidersHorizontal className="w-4 h-4 text-[#C4A992]" />
                                <h3 className="font-display text-sm tracking-wider uppercase text-[#F5EFEB]">
                                    Live Miniature Deck Preview
                                </h3>
                            </div>
                            <span className="text-[11px] font-mono text-[#958479]">
                                Klik kartu di bawah untuk meninjau rotasi preview
                            </span>
                        </div>

                        {/* Interactive miniature stack */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {traits.map((trait, idx) => {
                                const theme = getColorTheme(trait.badge_color);
                                const IconComponent = getIcon(trait.icon_name);
                                const isSelected = activePreviewIdx === idx;

                                return (
                                    <div
                                        key={trait.id}
                                        onClick={() => setActivePreviewIdx(idx)}
                                        className={`cursor-pointer transition-all duration-300 rounded-2xl p-5 border relative ${
                                            isSelected
                                                ? 'bg-[#241C18] border-[#C4A992] shadow-xl shadow-black/40 scale-[1.02]'
                                                : 'bg-[#1D1714] border-[rgba(196,169,146,0.12)] hover:border-[rgba(196,169,146,0.25)] opacity-80 hover:opacity-100'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${theme.badgeBg} ${theme.badgeBorder} border`}>
                                                    <IconComponent className={`w-4 h-4 ${theme.badgeText}`} />
                                                </div>
                                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#140F0D] text-[#958479] border border-[rgba(196,169,146,0.1)]">
                                                    #{trait.sort_order}
                                                </span>
                                            </div>
                                            <span className={`w-2 h-2 rounded-full ${theme.dot}`} />
                                        </div>

                                        <h4 className="font-display text-sm font-bold text-[#F5EFEB] mb-1">
                                            {trait.title}
                                        </h4>
                                        <p className="text-[11px] font-medium text-[#C4A992] mb-2 leading-tight">
                                            {trait.tagline}
                                        </p>
                                        <p className="text-[11px] text-[#A6978E] line-clamp-2 leading-relaxed">
                                            {trait.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Trait Cards Management List */}
                <div className="bg-[#1A1412] border border-[rgba(196,169,146,0.16)] rounded-3xl p-6">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-[rgba(196,169,146,0.1)]">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-[rgba(196,169,146,0.1)] flex items-center justify-center text-[#C4A992]">
                                <Layers className="w-4 h-4" />
                            </div>
                            <div>
                                <h2 className="font-display text-base tracking-wide uppercase text-[#F5EFEB]">
                                    Daftar Trait Cards
                                </h2>
                                <span className="text-[11px] text-[#958479]">
                                    Kartu diurutkan sesuai urutan prioritas sort order
                                </span>
                            </div>
                        </div>

                        <span className="text-xs font-mono text-[#958479]">
                            {traits.length} item tersimpan
                        </span>
                    </div>

                    {traits.length === 0 ? (
                        <div className="py-16 text-center">
                            <Sparkles className="w-12 h-12 text-[#958479] mx-auto mb-3 opacity-40" />
                            <h3 className="font-display text-base uppercase text-[#F5EFEB] mb-1">
                                Belum Ada Trait Card
                            </h3>
                            <p className="text-xs text-[#958479] max-w-sm mx-auto mb-4">
                                Tambahkan karakteristik atau keunggulan profesional Anda untuk ditampilkan di deck interaktif landing page.
                            </p>
                            <button
                                onClick={openCreateModal}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C4A992] text-[#1A1412] font-bold text-xs uppercase tracking-wider"
                            >
                                <Plus className="w-4 h-4" />
                                Tambah Trait Pertama
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {traits.map((trait) => {
                                const theme = getColorTheme(trait.badge_color);
                                const IconComponent = getIcon(trait.icon_name);

                                return (
                                    <div
                                        key={trait.id}
                                        className={`bg-[#201916] border border-[rgba(196,169,146,0.14)] ${theme.borderAccent} rounded-2xl p-4 sm:p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4`}
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Icon Box */}
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${theme.badgeBg} ${theme.badgeBorder} border`}>
                                                <IconComponent className={`w-6 h-6 ${theme.badgeText}`} />
                                            </div>

                                            {/* Info */}
                                            <div className="space-y-1">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#16100E] text-[#958479] border border-[rgba(196,169,146,0.1)]">
                                                        Urutan #{trait.sort_order}
                                                    </span>
                                                    <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${theme.badgeBg} ${theme.badgeBorder} ${theme.badgeText} flex items-center gap-1.5`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
                                                        {theme.label}
                                                    </span>
                                                    <span className="text-[11px] font-mono text-[#958479]">
                                                        ikon: {trait.icon_name || 'Sparkles'}
                                                    </span>
                                                </div>

                                                <h3 className="font-display text-base font-bold text-[#F5EFEB]">
                                                    {trait.title}
                                                </h3>
                                                <p className="text-xs font-semibold text-[#C4A992]">
                                                    {trait.tagline}
                                                </p>
                                                <p className="text-xs text-[#A6978E] leading-relaxed pt-1 max-w-2xl">
                                                    {trait.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Action buttons */}
                                        <div className="flex items-center gap-2 shrink-0 self-end md:self-center pt-2 md:pt-0 border-t md:border-t-0 border-[rgba(196,169,146,0.08)]">
                                            <button
                                                onClick={() => openEditModal(trait)}
                                                className="p-2 rounded-xl bg-[#29201C] hover:bg-[#342924] text-[#C4A992] border border-[rgba(196,169,146,0.16)] transition-all"
                                                title="Edit Trait Card"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => setDeletingTrait(trait)}
                                                className="p-2 rounded-xl bg-red-950/20 hover:bg-red-950/40 text-red-400 border border-red-500/20 transition-all"
                                                title="Hapus Trait Card"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Create / Edit Trait */}
            {(isCreateOpen || editingTrait) && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-[#1A1412] border border-[rgba(196,169,146,0.25)] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
                        <button
                            onClick={() => {
                                setIsCreateOpen(false);
                                setEditingTrait(null);
                            }}
                            className="absolute top-6 right-6 p-2 rounded-xl bg-[#241C18] text-[#958479] hover:text-[#F5EFEB] transition-all"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[rgba(196,169,146,0.12)] border border-[rgba(196,169,146,0.2)] flex items-center justify-center text-[#C4A992]">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-display text-lg tracking-wide uppercase text-[#F5EFEB]">
                                    {editingTrait ? 'Edit Trait Card' : 'Tambah Trait Card Baru'}
                                </h3>
                                <p className="text-xs text-[#958479]">
                                    Konfigurasi konten, tema warna aksen, dan ikon kartu
                                </p>
                            </div>
                        </div>

                        <form onSubmit={editingTrait ? handleEditSubmit : handleCreateSubmit} className="space-y-4">
                            {/* Title */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                    Judul Karakteristik / Keahlian *
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Contoh: Detail-Oriented, Problem Solver"
                                    className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:outline-none focus:border-[#C4A992]"
                                    required
                                />
                                {errors.title && <p className="text-[11px] text-red-400 mt-1">{errors.title}</p>}
                            </div>

                            {/* Tagline */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                    Tagline Singkat *
                                </label>
                                <input
                                    type="text"
                                    value={data.tagline}
                                    onChange={(e) => setData('tagline', e.target.value)}
                                    placeholder="Contoh: Precision in Every Interaction"
                                    className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:outline-none focus:border-[#C4A992]"
                                    required
                                />
                                {errors.tagline && <p className="text-[11px] text-red-400 mt-1">{errors.tagline}</p>}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                    Deskripsi Detail *
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={3}
                                    placeholder="Jelaskan value proposisi, metodologi kerja, atau fokus kualitas yang Anda bawa..."
                                    className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:outline-none focus:border-[#C4A992]"
                                    required
                                />
                                {errors.description && <p className="text-[11px] text-red-400 mt-1">{errors.description}</p>}
                            </div>

                            {/* Badge Color Selection */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-2">
                                    Pilih Tema Warna Aksen
                                </label>
                                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                    {Object.entries(COLOR_MAP).map(([colorKey, colorConfig]) => {
                                        const isSelected = data.badge_color === colorKey;
                                        return (
                                            <button
                                                key={colorKey}
                                                type="button"
                                                onClick={() => setData('badge_color', colorKey)}
                                                className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                                                    isSelected
                                                        ? `${colorConfig.badgeBg} ${colorConfig.badgeBorder} border-2`
                                                        : 'bg-[#241C18] border-[rgba(196,169,146,0.15)] opacity-70 hover:opacity-100'
                                                }`}
                                            >
                                                <span className={`w-3.5 h-3.5 rounded-full ${colorConfig.dot}`} />
                                                <span className="text-[10px] font-mono text-[#F5EFEB] capitalize">
                                                    {colorKey}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Icon Selection */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-2">
                                    Pilih Ikon Lucide
                                </label>
                                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-36 overflow-y-auto p-1 bg-[#140F0D] rounded-xl border border-[rgba(196,169,146,0.12)]">
                                    {Object.entries(ICON_MAP).map(([iconName, IconComp]) => {
                                        const isSelected = data.icon_name === iconName;
                                        return (
                                            <button
                                                key={iconName}
                                                type="button"
                                                onClick={() => setData('icon_name', iconName)}
                                                className={`p-2 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                                                    isSelected
                                                        ? 'bg-[#C4A992] text-[#1A1412] font-bold shadow-md'
                                                        : 'text-[#958479] hover:text-[#F5EFEB] hover:bg-[#241C18]'
                                                }`}
                                                title={iconName}
                                            >
                                                <IconComp className="w-4 h-4" />
                                                <span className="text-[9px] font-mono truncate max-w-full">
                                                    {iconName}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Sort Order */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                    Urutan Tampil (Sort Order)
                                </label>
                                <input
                                    type="number"
                                    value={data.sort_order}
                                    onChange={(e) => setData('sort_order', e.target.value)}
                                    placeholder="1, 2, 3..."
                                    className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:outline-none focus:border-[#C4A992]"
                                />
                            </div>

                            {/* Submit & Cancel Buttons */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[rgba(196,169,146,0.12)]">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsCreateOpen(false);
                                        setEditingTrait(null);
                                    }}
                                    className="px-4 py-2.5 rounded-xl bg-[#241C18] text-[#C4A992] hover:text-[#F5EFEB] text-xs font-semibold"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2.5 rounded-xl bg-[#C4A992] text-[#1A1412] hover:bg-[#D5BFAB] text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : editingTrait ? 'Perbarui Trait' : 'Simpan Trait'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Confirm Delete */}
            {deletingTrait && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#1A1412] border border-red-500/30 rounded-3xl max-w-md w-full p-6 shadow-2xl">
                        <div className="flex items-center gap-3 text-red-400 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                <Trash2 className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-display text-base uppercase text-[#F5EFEB]">
                                    Hapus Trait Card?
                                </h3>
                                <span className="text-[11px] text-[#958479]">
                                    Tindakan ini tidak dapat dibatalkan
                                </span>
                            </div>
                        </div>

                        <p className="text-xs text-[#C8BBB2] mb-6">
                            Apakah Anda yakin ingin menghapus kartu trait <strong className="text-[#F5EFEB]">"{deletingTrait.title}"</strong> ({deletingTrait.tagline}) dari portofolio?
                        </p>

                        <div className="flex items-center justify-end gap-3">
                            <button
                                onClick={() => setDeletingTrait(null)}
                                className="px-4 py-2.5 rounded-xl bg-[#241C18] text-[#C4A992] hover:text-[#F5EFEB] text-xs font-semibold"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider"
                            >
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
