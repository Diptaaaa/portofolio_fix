import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Components/AdminLayout';
import { 
    Trophy, Award, GraduationCap, Image as ImageIcon, Plus, 
    Edit2, Trash2, X, AlertCircle, Sparkles, Calendar, Building2,
    Sliders, RotateCw, CheckCircle2, Upload, ExternalLink
} from 'lucide-react';

export default function AwardsIndex({ awards = [], awardPhotos = [], stats = {} }) {
    const [activeSection, setActiveSection] = useState('awards'); // 'awards' or 'photos'
    const [awardsFilter, setAwardsFilter] = useState('all');

    // Modals state for Awards
    const [isCreateAwardOpen, setIsCreateAwardOpen] = useState(false);
    const [editingAward, setEditingAward] = useState(null);
    const [deletingAward, setDeletingAward] = useState(null);

    // Modals state for Photos
    const [isCreatePhotoOpen, setIsCreatePhotoOpen] = useState(false);
    const [editingPhoto, setEditingPhoto] = useState(null);
    const [deletingPhoto, setDeletingPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    // Form for Award Create
    const createAwardForm = useForm({
        title: '',
        institution: '',
        year: '',
        type: 'certification',
        description: '',
        sort_order: 1,
    });

    // Form for Award Edit
    const editAwardForm = useForm({
        title: '',
        institution: '',
        year: '',
        type: 'certification',
        description: '',
        sort_order: 1,
    });

    // Form for Photo Create
    const createPhotoForm = useForm({
        title: '',
        caption: '',
        photo: null,
        rotation_deg: 0,
        sort_order: 1,
    });

    // Form for Photo Edit
    const editPhotoForm = useForm({
        title: '',
        caption: '',
        photo: null,
        rotation_deg: 0,
        sort_order: 1,
    });

    // Filter awards
    const filteredAwards = awards.filter((item) => {
        if (awardsFilter === 'all') return true;
        return item.type === awardsFilter;
    });

    // Handlers for Awards
    const handleCreateAwardSubmit = (e) => {
        e.preventDefault();
        createAwardForm.post('/admin/awards', {
            preserveScroll: true,
            onSuccess: () => {
                createAwardForm.reset();
                setIsCreateAwardOpen(false);
            },
        });
    };

    const handleStartEditAward = (award) => {
        setEditingAward(award);
        editAwardForm.setData({
            title: award.title || '',
            institution: award.institution || '',
            year: award.year || '',
            type: award.type || 'certification',
            description: award.description || '',
            sort_order: award.sort_order || 1,
        });
    };

    const handleEditAwardSubmit = (e) => {
        e.preventDefault();
        if (!editingAward) return;

        editAwardForm.post(`/admin/awards/${editingAward.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setEditingAward(null);
            },
        });
    };

    const handleDeleteAwardSubmit = () => {
        if (!deletingAward) return;
        router.delete(`/admin/awards/${deletingAward.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setDeletingAward(null);
            },
        });
    };

    // Handlers for Photos
    const handlePhotoFileChange = (e, isEdit = false) => {
        const file = e.target.files[0];
        if (file) {
            if (isEdit) {
                editPhotoForm.setData('photo', file);
            } else {
                createPhotoForm.setData('photo', file);
            }
            const reader = new FileReader();
            reader.onload = (ev) => {
                setPhotoPreview(ev.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreatePhotoSubmit = (e) => {
        e.preventDefault();
        createPhotoForm.post('/admin/awards/photos', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                createPhotoForm.reset();
                setPhotoPreview(null);
                setIsCreatePhotoOpen(false);
            },
        });
    };

    const handleStartEditPhoto = (photo) => {
        setEditingPhoto(photo);
        setPhotoPreview(`/storage/${photo.image_path}`);
        editPhotoForm.setData({
            title: photo.title || '',
            caption: photo.caption || '',
            photo: null,
            rotation_deg: photo.rotation_deg || 0,
            sort_order: photo.sort_order || 1,
        });
    };

    const handleEditPhotoSubmit = (e) => {
        e.preventDefault();
        if (!editingPhoto) return;

        editPhotoForm.post(`/admin/awards/photos/${editingPhoto.id}`, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setEditingPhoto(null);
                setPhotoPreview(null);
            },
        });
    };

    const handleDeletePhotoSubmit = () => {
        if (!deletingPhoto) return;
        router.delete(`/admin/awards/photos/${deletingPhoto.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setDeletingPhoto(null);
            },
        });
    };

    const getAwardTypeBadge = (type) => {
        switch (type) {
            case 'degree':
                return {
                    label: 'Academic Degree',
                    bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
                };
            case 'certification':
                return {
                    label: 'Professional Certificate',
                    bg: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
                };
            case 'honor':
                return {
                    label: 'Honor & Recognition',
                    bg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
                };
            default:
                return {
                    label: type,
                    bg: 'bg-stone-500/10 text-stone-400 border-stone-500/30',
                };
        }
    };

    return (
        <AdminLayout title="Awards & Recognition Manager">
            {/* Top Stats Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="p-5 rounded-2xl bg-[#1A1412] border border-[rgba(196,169,146,0.2)] flex items-center justify-between">
                    <div>
                        <span className="text-[11px] font-mono text-[#958479] uppercase tracking-wider block">Total Awards</span>
                        <span className="font-display text-3xl text-[#F5EFEB] mt-1 block">{stats.total_awards || awards.length}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#241C18] flex items-center justify-center text-[#C4A992]">
                        <Trophy className="w-5 h-5" />
                    </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#1A1412] border border-[rgba(196,169,146,0.2)] flex items-center justify-between">
                    <div>
                        <span className="text-[11px] font-mono text-sky-400 uppercase tracking-wider block">Certifications</span>
                        <span className="font-display text-3xl text-[#F5EFEB] mt-1 block">{stats.certifications || 0}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#241C18] flex items-center justify-center text-sky-400">
                        <Award className="w-5 h-5" />
                    </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#1A1412] border border-[rgba(196,169,146,0.2)] flex items-center justify-between">
                    <div>
                        <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block">Academic Degrees</span>
                        <span className="font-display text-3xl text-[#F5EFEB] mt-1 block">{stats.degrees || 0}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#241C18] flex items-center justify-center text-amber-400">
                        <GraduationCap className="w-5 h-5" />
                    </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#1A1412] border border-[rgba(196,169,146,0.2)] flex items-center justify-between">
                    <div>
                        <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider block">Polaroid Photos</span>
                        <span className="font-display text-3xl text-[#F5EFEB] mt-1 block">{stats.total_photos || awardPhotos.length}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#241C18] flex items-center justify-center text-purple-400">
                        <ImageIcon className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Main Section Switcher Tabs */}
            <div className="flex border-b border-[rgba(196,169,146,0.16)] mb-6">
                <button
                    onClick={() => setActiveSection('awards')}
                    className={`pb-3 px-5 text-sm font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
                        activeSection === 'awards'
                            ? 'border-[#C4A992] text-[#F5EFEB]'
                            : 'border-transparent text-[#958479] hover:text-[#C8BBB2]'
                    }`}
                >
                    <Trophy className="w-4 h-4 text-[#C4A992]" />
                    <span>Certifications & Honors ({awards.length})</span>
                </button>
                <button
                    onClick={() => setActiveSection('photos')}
                    className={`pb-3 px-5 text-sm font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
                        activeSection === 'photos'
                            ? 'border-[#C4A992] text-[#F5EFEB]'
                            : 'border-transparent text-[#958479] hover:text-[#C8BBB2]'
                    }`}
                >
                    <ImageIcon className="w-4 h-4 text-[#C4A992]" />
                    <span>Polaroid Photo Collage ({awardPhotos.length})</span>
                </button>
            </div>

            {/* =========================================================================
                SECTION 1: CERTIFICATIONS & HONORS
               ========================================================================= */}
            {activeSection === 'awards' && (
                <div>
                    {/* Controls Bar */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#1A1412] border border-[rgba(196,169,146,0.2)] rounded-2xl">
                            {[
                                { id: 'all', label: 'All Awards' },
                                { id: 'certification', label: 'Certifications' },
                                { id: 'degree', label: 'Degrees' },
                                { id: 'honor', label: 'Honors' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setAwardsFilter(tab.id)}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                                        awardsFilter === tab.id
                                            ? 'bg-[#C4A992] text-[#1A1412] font-bold shadow-md'
                                            : 'text-[#C8BBB2] hover:text-[#F5EFEB] hover:bg-[#241C18]'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setIsCreateAwardOpen(true)}
                            className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C4A992] text-[#1A1412] hover:bg-[#D4BEA8] transition-all shadow-lg flex items-center gap-2 cursor-pointer shrink-0"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add New Award</span>
                        </button>
                    </div>

                    {/* Awards Table */}
                    <div className="rounded-3xl overflow-hidden bg-[#1A1412] border border-[rgba(196,169,146,0.2)] shadow-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                    <tr className="border-b border-[rgba(196,169,146,0.16)] bg-[#241C18] text-[11px] font-mono uppercase tracking-wider text-[#958479]">
                                        <th className="py-4 px-6">Title & Institution</th>
                                        <th className="py-4 px-6">Type</th>
                                        <th className="py-4 px-6">Year</th>
                                        <th className="py-4 px-6 max-w-md">Description</th>
                                        <th className="py-4 px-6 text-center">Order</th>
                                        <th className="py-4 px-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[rgba(196,169,146,0.12)]">
                                    {filteredAwards.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="py-12 text-center text-[#958479]">
                                                Belum ada penghargaan pada kategori ini.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredAwards.map((item) => {
                                            const badge = getAwardTypeBadge(item.type);
                                            return (
                                                <tr key={item.id} className="hover:bg-[#241C18] transition-colors">
                                                    <td className="py-4 px-6">
                                                        <span className="font-bold text-sm text-[#F5EFEB] block">{item.title}</span>
                                                        <div className="flex items-center gap-1.5 text-[11px] text-[#C4A992] mt-0.5 font-medium">
                                                            <Building2 className="w-3 h-3 text-[#958479]" />
                                                            <span>{item.institution}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium border ${badge.bg}`}>
                                                            {badge.label}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-6 font-mono text-[#C8BBB2]">
                                                        {item.year}
                                                    </td>
                                                    <td className="py-4 px-6 max-w-md">
                                                        <p className="text-xs text-[#C8BBB2] line-clamp-2 leading-relaxed">
                                                            {item.description || '-'}
                                                        </p>
                                                    </td>
                                                    <td className="py-4 px-6 text-center font-mono text-[#C8BBB2]">
                                                        {item.sort_order}
                                                    </td>
                                                    <td className="py-4 px-6 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => handleStartEditAward(item)}
                                                                className="p-1.5 rounded-lg bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#C4A992] hover:bg-[#C4A992] hover:text-[#1A1412] transition-colors cursor-pointer"
                                                                title="Edit Award"
                                                            >
                                                                <Edit2 className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button
                                                                onClick={() => setDeletingAward(item)}
                                                                className="p-1.5 rounded-lg bg-[#241C18] border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                                                                title="Hapus Award"
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
                </div>
            )}

            {/* =========================================================================
                SECTION 2: POLAROID PHOTO COLLAGE
               ========================================================================= */}
            {activeSection === 'photos' && (
                <div>
                    {/* Controls Bar */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-display text-xl uppercase tracking-wider text-[#F5EFEB]">Polaroid Milestone Collage</h3>
                            <p className="text-xs text-[#C8BBB2]">Kelola foto dokumentasi fisik, yudisium, dan sertifikat yang tampil pada kolase berputar.</p>
                        </div>

                        <button
                            onClick={() => {
                                setPhotoPreview(null);
                                setIsCreatePhotoOpen(true);
                            }}
                            className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C4A992] text-[#1A1412] hover:bg-[#D4BEA8] transition-all shadow-lg flex items-center gap-2 cursor-pointer shrink-0"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Upload New Photo</span>
                        </button>
                    </div>

                    {/* Photos Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {awardPhotos.length === 0 ? (
                            <div className="col-span-full py-16 text-center text-[#958479] bg-[#1A1412] rounded-3xl border border-[rgba(196,169,146,0.2)]">
                                Belum ada foto kolase. Klik "Upload New Photo" untuk menambahkan dokumentasi.
                            </div>
                        ) : (
                            awardPhotos.map((photo) => (
                                <div
                                    key={photo.id}
                                    className="p-3.5 rounded-2xl bg-[#1A1412] border border-[rgba(196,169,146,0.2)] shadow-xl hover:border-[#C4A992]/40 transition-all flex flex-col justify-between group"
                                >
                                    <div>
                                        {/* Image Container with rotation tilt preview */}
                                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#241C18] border border-[rgba(196,169,146,0.15)] mb-3">
                                            <img
                                                src={`/storage/${photo.image_path}`}
                                                alt={photo.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {/* Rotation degree badge */}
                                            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-[#C4A992] border border-[rgba(196,169,146,0.3)]">
                                                {photo.rotation_deg > 0 ? `+${photo.rotation_deg}°` : `${photo.rotation_deg}°`}
                                            </div>
                                        </div>

                                        {/* Meta */}
                                        <h4 className="font-bold text-sm text-[#F5EFEB] line-clamp-1">{photo.title}</h4>
                                        <p className="text-[11px] text-[#958479] line-clamp-1 mt-0.5">{photo.caption || 'Academic Milestone'}</p>
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-[rgba(196,169,146,0.12)]">
                                        <span className="text-[10px] font-mono text-[#C8BBB2]">
                                            Order: #{photo.sort_order}
                                        </span>

                                        <div className="flex items-center gap-1.5">
                                            <button
                                                onClick={() => handleStartEditPhoto(photo)}
                                                className="p-1.5 rounded-lg bg-[#241C18] text-[#C4A992] hover:bg-[#C4A992] hover:text-[#1A1412] transition-colors cursor-pointer"
                                                title="Edit Foto"
                                            >
                                                <Edit2 className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={() => setDeletingPhoto(photo)}
                                                className="p-1.5 rounded-lg bg-[#241C18] text-red-400 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                                                title="Hapus Foto"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* =========================================================================
                MODALS FOR AWARDS
               ========================================================================= */}
            {/* Modal: Create Award */}
            {isCreateAwardOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-lg bg-[#1A1412] border border-[rgba(196,169,146,0.3)] rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-4 border-b border-[rgba(196,169,146,0.16)] mb-6">
                            <div>
                                <h3 className="font-display text-2xl uppercase tracking-wider text-[#F5EFEB]">Add New Award</h3>
                                <p className="text-xs text-[#C8BBB2]">Tambahkan sertifikat, gelar, atau penghargaan baru.</p>
                            </div>
                            <button onClick={() => setIsCreateAwardOpen(false)} className="p-2 rounded-xl bg-[#241C18] text-[#958479] hover:text-[#F5EFEB] cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateAwardSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">Judul Penghargaan / Sertifikat *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: Meta Front-End Developer, Bachelor of CS"
                                    value={createAwardForm.data.title}
                                    onChange={(e) => createAwardForm.setData('title', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">Lembaga / Universitas *</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Contoh: Google, Meta, Univ Brawijaya"
                                        value={createAwardForm.data.institution}
                                        onChange={(e) => createAwardForm.setData('institution', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">Tahun *</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Contoh: 2024"
                                        value={createAwardForm.data.year}
                                        onChange={(e) => createAwardForm.setData('year', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">Tipe *</label>
                                    <select
                                        value={createAwardForm.data.type}
                                        onChange={(e) => createAwardForm.setData('type', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none cursor-pointer"
                                    >
                                        <option value="certification">Professional Certificate</option>
                                        <option value="degree">Academic Degree</option>
                                        <option value="honor">Honor & Recognition</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">Urutan (Order)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={createAwardForm.data.sort_order}
                                        onChange={(e) => createAwardForm.setData('sort_order', parseInt(e.target.value) || 1)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">Deskripsi Singkat</label>
                                <textarea
                                    rows="3"
                                    placeholder="Jelaskan kompetensi yang dicakup atau predikat kelulusan..."
                                    value={createAwardForm.data.description}
                                    onChange={(e) => createAwardForm.setData('description', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none resize-none"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-6 border-t border-[rgba(196,169,146,0.16)]">
                                <button type="button" onClick={() => setIsCreateAwardOpen(false)} className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#C8BBB2] hover:bg-[#241C18] cursor-pointer">
                                    Batal
                                </button>
                                <button type="submit" disabled={createAwardForm.processing} className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#C4A992] text-[#1A1412] hover:bg-[#D4BEA8] shadow-lg disabled:opacity-50 cursor-pointer">
                                    {createAwardForm.processing ? 'Menyimpan...' : 'Simpan Award'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Edit Award */}
            {editingAward && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-lg bg-[#1A1412] border border-[rgba(196,169,146,0.3)] rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-4 border-b border-[rgba(196,169,146,0.16)] mb-6">
                            <div>
                                <h3 className="font-display text-2xl uppercase tracking-wider text-[#F5EFEB]">Edit Award</h3>
                                <p className="text-xs text-[#C8BBB2]">Perbarui detail sertifikat atau gelar ini.</p>
                            </div>
                            <button onClick={() => setEditingAward(null)} className="p-2 rounded-xl bg-[#241C18] text-[#958479] hover:text-[#F5EFEB] cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleEditAwardSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">Judul Penghargaan / Sertifikat *</label>
                                <input
                                    type="text"
                                    required
                                    value={editAwardForm.data.title}
                                    onChange={(e) => editAwardForm.setData('title', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">Lembaga / Universitas *</label>
                                    <input
                                        type="text"
                                        required
                                        value={editAwardForm.data.institution}
                                        onChange={(e) => editAwardForm.setData('institution', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">Tahun *</label>
                                    <input
                                        type="text"
                                        required
                                        value={editAwardForm.data.year}
                                        onChange={(e) => editAwardForm.setData('year', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">Tipe *</label>
                                    <select
                                        value={editAwardForm.data.type}
                                        onChange={(e) => editAwardForm.setData('type', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none cursor-pointer"
                                    >
                                        <option value="certification">Professional Certificate</option>
                                        <option value="degree">Academic Degree</option>
                                        <option value="honor">Honor & Recognition</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">Urutan (Order)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={editAwardForm.data.sort_order}
                                        onChange={(e) => editAwardForm.setData('sort_order', parseInt(e.target.value) || 1)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">Deskripsi Singkat</label>
                                <textarea
                                    rows="3"
                                    value={editAwardForm.data.description}
                                    onChange={(e) => editAwardForm.setData('description', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none resize-none"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-6 border-t border-[rgba(196,169,146,0.16)]">
                                <button type="button" onClick={() => setEditingAward(null)} className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#C8BBB2] hover:bg-[#241C18] cursor-pointer">
                                    Batal
                                </button>
                                <button type="submit" disabled={editAwardForm.processing} className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#C4A992] text-[#1A1412] hover:bg-[#D4BEA8] shadow-lg disabled:opacity-50 cursor-pointer">
                                    {editAwardForm.processing ? 'Menyimpan...' : 'Perbarui Award'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Delete Award */}
            {deletingAward && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-md bg-[#1A1412] border border-red-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
                        <div className="flex items-center gap-3 text-red-400 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
                                <AlertCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-display text-xl uppercase tracking-wider text-[#F5EFEB]">Hapus Penghargaan?</h3>
                                <p className="text-xs text-[#C8BBB2]">Tindakan ini tidak dapat dibatalkan.</p>
                            </div>
                        </div>

                        <p className="text-xs text-[#C8BBB2] leading-relaxed mb-6">
                            Apakah Anda yakin ingin menghapus <strong className="text-[#F5EFEB]">{deletingAward.title}</strong> ({deletingAward.institution})?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button type="button" onClick={() => setDeletingAward(null)} className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#C8BBB2] hover:bg-[#241C18] cursor-pointer">
                                Batal
                            </button>
                            <button type="button" onClick={handleDeleteAwardSubmit} className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-red-500 text-white hover:bg-red-600 shadow-lg cursor-pointer">
                                Ya, Hapus Award
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* =========================================================================
                MODALS FOR PHOTOS
               ========================================================================= */}
            {/* Modal: Create Photo */}
            {isCreatePhotoOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-lg bg-[#1A1412] border border-[rgba(196,169,146,0.3)] rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-4 border-b border-[rgba(196,169,146,0.16)] mb-6">
                            <div>
                                <h3 className="font-display text-2xl uppercase tracking-wider text-[#F5EFEB]">Upload Polaroid Photo</h3>
                                <p className="text-xs text-[#C8BBB2]">Unggah foto kenangan yudisium, wisuda, atau dokumentasi sertifikat.</p>
                            </div>
                            <button onClick={() => setIsCreatePhotoOpen(false)} className="p-2 rounded-xl bg-[#241C18] text-[#958479] hover:text-[#F5EFEB] cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreatePhotoSubmit} className="space-y-4">
                            {/* Photo File Upload & Live Preview */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">File Foto Dokumentasi *</label>
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <div 
                                        className="w-32 h-24 rounded-2xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] overflow-hidden flex items-center justify-center shrink-0 transition-transform duration-300"
                                        style={{ transform: `rotate(${createPhotoForm.data.rotation_deg}deg)` }}
                                    >
                                        {photoPreview ? (
                                            <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-center p-2">
                                                <ImageIcon className="w-6 h-6 text-[#958479] mx-auto mb-1" />
                                                <span className="text-[10px] text-[#958479]">No Photo</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 w-full">
                                        <input
                                            type="file"
                                            required
                                            accept="image/*"
                                            onChange={(e) => handlePhotoFileChange(e, false)}
                                            className="w-full text-xs text-[#C8BBB2] file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#C4A992] file:text-[#1A1412] hover:file:bg-[#D4BEA8] file:cursor-pointer cursor-pointer"
                                        />
                                        <p className="text-[10px] text-[#958479] mt-1.5">PNG, JPG, JPEG atau WebP (Maks. 10MB)</p>
                                    </div>
                                </div>
                            </div>

                            {/* Title & Caption */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">Judul Momen / Foto *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: Yudisium Ilmu Komputer, Meta Specialization Handshake"
                                    value={createPhotoForm.data.title}
                                    onChange={(e) => createPhotoForm.setData('title', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">Caption Polaroid</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: Academic & Certification Journey"
                                    value={createPhotoForm.data.caption}
                                    onChange={(e) => createPhotoForm.setData('caption', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                />
                            </div>

                            {/* Rotation Degree Slider & Order */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="text-xs font-mono uppercase tracking-wider text-[#958479]">Derajat Rotasi Kemiringan</label>
                                        <span className="text-xs font-mono font-bold text-[#C4A992]">{createPhotoForm.data.rotation_deg}°</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="-10"
                                        max="10"
                                        step="1"
                                        value={createPhotoForm.data.rotation_deg}
                                        onChange={(e) => createPhotoForm.setData('rotation_deg', parseInt(e.target.value) || 0)}
                                        className="w-full accent-[#C4A992] cursor-pointer"
                                    />
                                    <div className="flex justify-between text-[10px] font-mono text-[#958479] mt-0.5">
                                        <span>-10°</span>
                                        <span>0°</span>
                                        <span>+10°</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">Urutan Kolase (Order)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={createPhotoForm.data.sort_order}
                                        onChange={(e) => createPhotoForm.setData('sort_order', parseInt(e.target.value) || 1)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-6 border-t border-[rgba(196,169,146,0.16)]">
                                <button type="button" onClick={() => setIsCreatePhotoOpen(false)} className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#C8BBB2] hover:bg-[#241C18] cursor-pointer">
                                    Batal
                                </button>
                                <button type="submit" disabled={createPhotoForm.processing} className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#C4A992] text-[#1A1412] hover:bg-[#D4BEA8] shadow-lg disabled:opacity-50 cursor-pointer">
                                    {createPhotoForm.processing ? 'Mengunggah...' : 'Unggah Foto'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Edit Photo */}
            {editingPhoto && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-lg bg-[#1A1412] border border-[rgba(196,169,146,0.3)] rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-4 border-b border-[rgba(196,169,146,0.16)] mb-6">
                            <div>
                                <h3 className="font-display text-2xl uppercase tracking-wider text-[#F5EFEB]">Edit Polaroid Photo</h3>
                                <p className="text-xs text-[#C8BBB2]">Sesuaikan judul, caption, rotasi, atau ganti file foto.</p>
                            </div>
                            <button onClick={() => setEditingPhoto(null)} className="p-2 rounded-xl bg-[#241C18] text-[#958479] hover:text-[#F5EFEB] cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleEditPhotoSubmit} className="space-y-4">
                            {/* Photo File Upload & Live Preview */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">Ganti File Foto (Opsional)</label>
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <div 
                                        className="w-32 h-24 rounded-2xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] overflow-hidden flex items-center justify-center shrink-0 transition-transform duration-300"
                                        style={{ transform: `rotate(${editPhotoForm.data.rotation_deg}deg)` }}
                                    >
                                        {photoPreview ? (
                                            <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-center p-2">
                                                <ImageIcon className="w-6 h-6 text-[#958479] mx-auto mb-1" />
                                                <span className="text-[10px] text-[#958479]">No Photo</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 w-full">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handlePhotoFileChange(e, true)}
                                            className="w-full text-xs text-[#C8BBB2] file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#C4A992] file:text-[#1A1412] hover:file:bg-[#D4BEA8] file:cursor-pointer cursor-pointer"
                                        />
                                        <p className="text-[10px] text-[#958479] mt-1.5">Kosongkan jika tidak ingin mengganti file gambar.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Title & Caption */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">Judul Momen / Foto *</label>
                                <input
                                    type="text"
                                    required
                                    value={editPhotoForm.data.title}
                                    onChange={(e) => editPhotoForm.setData('title', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">Caption Polaroid</label>
                                <input
                                    type="text"
                                    value={editPhotoForm.data.caption}
                                    onChange={(e) => editPhotoForm.setData('caption', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                />
                            </div>

                            {/* Rotation Degree Slider & Order */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="text-xs font-mono uppercase tracking-wider text-[#958479]">Derajat Rotasi Kemiringan</label>
                                        <span className="text-xs font-mono font-bold text-[#C4A992]">{editPhotoForm.data.rotation_deg}°</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="-10"
                                        max="10"
                                        step="1"
                                        value={editPhotoForm.data.rotation_deg}
                                        onChange={(e) => editPhotoForm.setData('rotation_deg', parseInt(e.target.value) || 0)}
                                        className="w-full accent-[#C4A992] cursor-pointer"
                                    />
                                    <div className="flex justify-between text-[10px] font-mono text-[#958479] mt-0.5">
                                        <span>-10°</span>
                                        <span>0°</span>
                                        <span>+10°</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">Urutan Kolase (Order)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={editPhotoForm.data.sort_order}
                                        onChange={(e) => editPhotoForm.setData('sort_order', parseInt(e.target.value) || 1)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-6 border-t border-[rgba(196,169,146,0.16)]">
                                <button type="button" onClick={() => setEditingPhoto(null)} className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#C8BBB2] hover:bg-[#241C18] cursor-pointer">
                                    Batal
                                </button>
                                <button type="submit" disabled={editPhotoForm.processing} className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#C4A992] text-[#1A1412] hover:bg-[#D4BEA8] shadow-lg disabled:opacity-50 cursor-pointer">
                                    {editPhotoForm.processing ? 'Menyimpan...' : 'Perbarui Foto'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Delete Photo */}
            {deletingPhoto && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-md bg-[#1A1412] border border-red-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
                        <div className="flex items-center gap-3 text-red-400 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
                                <AlertCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-display text-xl uppercase tracking-wider text-[#F5EFEB]">Hapus Foto Kolase?</h3>
                                <p className="text-xs text-[#C8BBB2]">Tindakan ini tidak dapat dibatalkan.</p>
                            </div>
                        </div>

                        <p className="text-xs text-[#C8BBB2] leading-relaxed mb-6">
                            Apakah Anda yakin ingin menghapus foto <strong className="text-[#F5EFEB]">{deletingPhoto.title}</strong>? File foto akan dihapus dari server.
                        </p>

                        <div className="flex justify-end gap-3">
                            <button type="button" onClick={() => setDeletingPhoto(null)} className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#C8BBB2] hover:bg-[#241C18] cursor-pointer">
                                Batal
                            </button>
                            <button type="button" onClick={handleDeletePhotoSubmit} className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-red-500 text-white hover:bg-red-600 shadow-lg cursor-pointer">
                                Ya, Hapus Foto
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
