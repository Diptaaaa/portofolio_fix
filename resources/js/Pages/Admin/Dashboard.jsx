import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';
import AdminLayout from '../../Components/AdminLayout';
import { 
    FolderGit2, MessageSquare, Award, Sparkles, CheckCircle2, 
    Save, Upload, User, Mail, MapPin, ExternalLink, GraduationCap,
    FileText, Download, RefreshCw, X, Shield, Eye
} from 'lucide-react';

export default function Dashboard({ profile, stats = {}, cv_info = {}, recentMessages = [], recentProjects = [] }) {
    const [cutoutPreview, setCutoutPreview] = useState(null);
    const [selectedCvName, setSelectedCvName] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: profile?.full_name || '',
        display_name_outline: profile?.display_name_outline || '',
        tagline: profile?.tagline || '',
        bio: profile?.bio || '',
        current_role: profile?.current_role || '',
        email: profile?.email || '',
        phone: profile?.phone || '',
        location: profile?.location || '',
        github_url: profile?.github_url || '',
        linkedin_url: profile?.linkedin_url || '',
        instagram_url: profile?.instagram_url || '',
        cutout_photo: null,
        cv_file: null,
    });

    const handleCutoutChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('cutout_photo', file);
            setCutoutPreview(URL.createObjectURL(file));
        }
    };

    const handleClearCutoutPreview = () => {
        setData('cutout_photo', null);
        setCutoutPreview(null);
    };

    const handleCvChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('cv_file', file);
            setSelectedCvName(`${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
        }
    };

    const handleClearCvSelection = () => {
        setData('cv_file', null);
        setSelectedCvName(null);
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        post('/admin/profile', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setCutoutPreview(null);
                setSelectedCvName(null);
            },
        });
    };

    const activeCutoutSrc = cutoutPreview 
        ? cutoutPreview 
        : profile?.profile_cutout_path 
            ? `/storage/${profile.profile_cutout_path}` 
            : '/storage/profile/foto_profil.png';

    return (
        <AdminLayout title="CMS Dashboard & Profile Settings">
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(196,169,146,0.16)]">
                    <div>
                        <div className="flex items-center gap-2.5 mb-1.5">
                            <h1 className="font-display text-2xl sm:text-3xl tracking-wide uppercase text-[#F5EFEB]">
                                Dashboard & Profile Control
                            </h1>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-[rgba(196,169,146,0.12)] text-[#C4A992] border border-[rgba(196,169,146,0.2)]">
                                Live Hub
                            </span>
                        </div>
                        <p className="text-xs text-[#958479]">
                            Kelola identitas utama, foto cutout profil, berkas CV PDF, dan status ketersediaan kerja portofolio.
                        </p>
                    </div>

                    <a
                        href="/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#C4A992] hover:text-[#F5EFEB] hover:bg-[#2F241F] text-xs font-semibold tracking-wide transition-all shadow-md self-start sm:self-auto"
                    >
                        <ExternalLink className="w-4 h-4" />
                        <span>Kunjungi Website Portofolio</span>
                    </a>
                </div>

                {/* Comprehensive Stats Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                    <Link 
                        href="/admin/projects"
                        className="p-4 rounded-2xl bg-[#1A1412] border border-[rgba(196,169,146,0.16)] flex flex-col justify-between hover:border-[#C4A992]/50 transition-all group"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono text-[#958479] uppercase tracking-wider">Projects</span>
                            <FolderGit2 className="w-4 h-4 text-[#C4A992]" />
                        </div>
                        <div>
                            <span className="font-display text-2xl text-[#F5EFEB] block group-hover:text-[#C4A992] transition-colors">{stats.total_projects || 0}</span>
                            <span className="text-[10px] text-[#958479]">{stats.featured_projects || 0} Featured</span>
                        </div>
                    </Link>

                    <Link 
                        href="/admin/skills"
                        className="p-4 rounded-2xl bg-[#1A1412] border border-[rgba(196,169,146,0.16)] flex flex-col justify-between hover:border-[#C4A992]/50 transition-all group"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono text-[#958479] uppercase tracking-wider">Tech Stack</span>
                            <Sparkles className="w-4 h-4 text-[#C4A992]" />
                        </div>
                        <div>
                            <span className="font-display text-2xl text-[#F5EFEB] block group-hover:text-[#C4A992] transition-colors">{stats.total_skills || 0}</span>
                            <span className="text-[10px] text-[#958479]">Stack Skills</span>
                        </div>
                    </Link>

                    <Link 
                        href="/admin/experiences"
                        className="p-4 rounded-2xl bg-[#1A1412] border border-[rgba(196,169,146,0.16)] flex flex-col justify-between hover:border-[#C4A992]/50 transition-all group"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono text-[#958479] uppercase tracking-wider">Trainings</span>
                            <GraduationCap className="w-4 h-4 text-[#C4A992]" />
                        </div>
                        <div>
                            <span className="font-display text-2xl text-[#F5EFEB] block group-hover:text-[#C4A992] transition-colors">{stats.total_experiences || 0}</span>
                            <span className="text-[10px] text-[#958479]">Career Milestones</span>
                        </div>
                    </Link>

                    <Link 
                        href="/admin/awards"
                        className="p-4 rounded-2xl bg-[#1A1412] border border-[rgba(196,169,146,0.16)] flex flex-col justify-between hover:border-[#C4A992]/50 transition-all group"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono text-[#958479] uppercase tracking-wider">Awards</span>
                            <Award className="w-4 h-4 text-[#C4A992]" />
                        </div>
                        <div>
                            <span className="font-display text-2xl text-[#F5EFEB] block group-hover:text-[#C4A992] transition-colors">{stats.total_awards || 0}</span>
                            <span className="text-[10px] text-[#958479]">Certifications</span>
                        </div>
                    </Link>

                    <Link 
                        href="/admin/traits"
                        className="p-4 rounded-2xl bg-[#1A1412] border border-[rgba(196,169,146,0.16)] flex flex-col justify-between hover:border-[#C4A992]/50 transition-all group"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono text-[#958479] uppercase tracking-wider">Trait Deck</span>
                            <Sparkles className="w-4 h-4 text-[#C4A992]" />
                        </div>
                        <div>
                            <span className="font-display text-2xl text-[#F5EFEB] block group-hover:text-[#C4A992] transition-colors">{stats.total_traits || 0}</span>
                            <span className="text-[10px] text-[#958479]">Interactive Cards</span>
                        </div>
                    </Link>

                    <Link 
                        href="/admin/messages"
                        className="p-4 rounded-2xl bg-[#1A1412] border border-[rgba(196,169,146,0.16)] flex flex-col justify-between hover:border-amber-400/50 transition-all group"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono text-[#958479] uppercase tracking-wider">Messages</span>
                            <MessageSquare className="w-4 h-4 text-amber-400" />
                        </div>
                        <div>
                            <span className="font-display text-2xl text-[#F5EFEB] block group-hover:text-amber-400 transition-colors">{stats.total_messages || 0}</span>
                            <span className="text-[10px] text-emerald-400">{stats.unread_messages || 0} Unread</span>
                        </div>
                    </Link>
                </div>

                {/* Quick Availability Status Widget */}
                <div className="p-6 rounded-3xl bg-[#1A1412] border border-[rgba(196,169,146,0.2)] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="font-display text-lg uppercase tracking-wider text-[#F5EFEB]">
                            Availability Status Indicator
                        </h3>
                        <p className="text-xs text-[#C8BBB2] mt-0.5">
                            Mengatur status badge live pulsing dot di bilah navigasi dan hero section portofolio.
                        </p>
                    </div>

                    <Link
                        href="/admin/profile/toggle-availability"
                        method="post"
                        as="button"
                        preserveScroll
                        className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                            profile?.available_for_work
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                                : 'bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30'
                        }`}
                    >
                        {profile?.available_for_work ? (
                            <>
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                <span>Currently Available for Work</span>
                            </>
                        ) : (
                            <>
                                <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                                <span>Currently Busy / Not Available</span>
                            </>
                        )}
                    </Link>
                </div>

                {/* Two Column Grid: Cutout Simulator & CV Management */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Live Hero Cutout Visualizer */}
                    <div className="rounded-3xl bg-[#181210] border border-[rgba(196,169,146,0.2)] p-6 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[rgba(196,169,146,0.12)]">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-[rgba(196,169,146,0.12)] flex items-center justify-center text-[#C4A992]">
                                        <Eye className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-base tracking-wide uppercase text-[#F5EFEB]">
                                            Hero Cutout Live Simulator
                                        </h3>
                                        <span className="text-[11px] text-[#958479]">
                                            Pratinjau foto subjek cutout di atas teks outline hero
                                        </span>
                                    </div>
                                </div>

                                {cutoutPreview ? (
                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
                                        Preview Berkas Baru
                                    </span>
                                ) : (
                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold">
                                        Foto Aktif Saat Ini
                                    </span>
                                )}
                            </div>

                            {/* Simulator Stage */}
                            <div className="w-full h-64 rounded-2xl bg-[#140F0D] border border-[rgba(196,169,146,0.15)] relative overflow-hidden flex items-center justify-center select-none shadow-inner">
                                {/* Subtle radial spotlight */}
                                <div className="absolute inset-0 bg-radial from-[#32251E]/40 via-transparent to-transparent pointer-events-none" />

                                {/* Background outline text simulating Hero section */}
                                <div 
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none text-center leading-none"
                                    style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontWeight: 900,
                                        fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                                        WebkitTextStroke: '1.5px rgba(196,169,146,0.3)',
                                        color: 'transparent',
                                        letterSpacing: '0.05em',
                                    }}
                                >
                                    {data.display_name_outline || 'RAFLI PRADIPTA'}
                                </div>

                                {/* Subject Cutout Image */}
                                <img
                                    src={activeCutoutSrc}
                                    alt="Hero Cutout"
                                    className="h-56 max-w-full object-contain relative z-10 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] transition-all duration-300"
                                />
                            </div>

                            <p className="text-[11px] text-[#A6978E] mt-3 leading-relaxed">
                                Foto di atas mensimulasikan penumpukan visual di landing page. Pastikan gambar berformat <strong>PNG transparan</strong> tanpa sisa background agar teks outline di belakangnya terlihat menyatu secara natural.
                            </p>
                        </div>

                        {/* Cutout Upload Inputs */}
                        <div className="mt-4 pt-4 border-t border-[rgba(196,169,146,0.12)]">
                            <label className="block text-xs font-mono uppercase tracking-wider text-[#C4A992] mb-2 font-semibold">
                                Unggah Foto Cutout Baru (PNG)
                            </label>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                                <input
                                    type="file"
                                    accept="image/png,image/webp,image/*"
                                    onChange={handleCutoutChange}
                                    className="w-full px-3 py-2 rounded-xl text-xs bg-[#201916] border border-[rgba(196,169,146,0.2)] text-[#C8BBB2] file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-[#C4A992] file:text-[#1A1412]"
                                />
                                {cutoutPreview && (
                                    <button
                                        type="button"
                                        onClick={handleClearCutoutPreview}
                                        className="px-3 py-2 rounded-xl bg-red-950/30 text-red-400 border border-red-500/20 hover:bg-red-950/50 text-xs font-semibold shrink-0 flex items-center justify-center gap-1.5"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                        <span>Batal</span>
                                    </button>
                                )}
                            </div>
                            {errors.cutout_photo && <p className="text-[11px] text-red-400 mt-1">{errors.cutout_photo}</p>}
                        </div>
                    </div>

                    {/* CV PDF Management Card */}
                    <div className="rounded-3xl bg-[#181210] border border-[rgba(196,169,146,0.2)] p-6 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[rgba(196,169,146,0.12)]">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-[rgba(196,169,146,0.12)] flex items-center justify-center text-[#C4A992]">
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-base tracking-wide uppercase text-[#F5EFEB]">
                                            Curriculum Vitae (CV) PDF
                                        </h3>
                                        <span className="text-[11px] text-[#958479]">
                                            Berkas resume publik yang diunduh pengunjung
                                        </span>
                                    </div>
                                </div>

                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold ${
                                    cv_info.exists 
                                        ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                                        : 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
                                }`}>
                                    {cv_info.exists ? 'Berkas Tersedia' : 'Belum Ada Berkas'}
                                </span>
                            </div>

                            {/* CV Details Box */}
                            <div className="bg-[#140F0D] border border-[rgba(196,169,146,0.15)] rounded-2xl p-5 mb-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-red-950/20 border border-red-500/25 flex items-center justify-center text-red-400">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-[#F5EFEB] block">
                                                CV_Muhammad_Rafli_Pradipta.pdf
                                            </span>
                                            <span className="text-[11px] font-mono text-[#958479]">
                                                Target path: <code className="text-[#C4A992]">/cv.pdf</code>
                                            </span>
                                        </div>
                                    </div>

                                    {cv_info.exists && (
                                        <a
                                            href={cv_info.url || '/cv.pdf'}
                                            target="_blank"
                                            rel="noreferrer"
                                            download="CV_Muhammad_Rafli_Pradipta.pdf"
                                            className="px-3.5 py-2 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.25)] text-[#C4A992] hover:text-[#F5EFEB] hover:bg-[#30241F] text-xs font-semibold flex items-center gap-1.5 transition-all"
                                        >
                                            <Download className="w-3.5 h-3.5" />
                                            <span>Unduh / Cek CV</span>
                                        </a>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[rgba(196,169,146,0.1)] text-[11px] font-mono">
                                    <div>
                                        <span className="text-[#958479] block">Ukuran Berkas:</span>
                                        <span className="text-[#F5EFEB] font-semibold">{cv_info.size_formatted || '—'}</span>
                                    </div>
                                    <div>
                                        <span className="text-[#958479] block">Terakhir Diperbarui:</span>
                                        <span className="text-[#F5EFEB] font-semibold">{cv_info.last_modified || '—'}</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-[11px] text-[#A6978E] leading-relaxed">
                                Berkas yang diunggah di sini akan langsung menggantikan berkas utama portofolio. Tombol <em>"Download CV"</em> di Trait Deck dan Footer akan otomatis mengunduh berkas terbaru ini.
                            </p>
                        </div>

                        {/* CV Upload Inputs */}
                        <div className="mt-4 pt-4 border-t border-[rgba(196,169,146,0.12)]">
                            <label className="block text-xs font-mono uppercase tracking-wider text-[#C4A992] mb-2 font-semibold">
                                Ganti / Unggah Berkas CV Baru (PDF Max 15MB)
                            </label>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                                <input
                                    type="file"
                                    accept="application/pdf,.pdf"
                                    onChange={handleCvChange}
                                    className="w-full px-3 py-2 rounded-xl text-xs bg-[#201916] border border-[rgba(196,169,146,0.2)] text-[#C8BBB2] file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-[#C4A992] file:text-[#1A1412]"
                                />
                                {selectedCvName && (
                                    <button
                                        type="button"
                                        onClick={handleClearCvSelection}
                                        className="px-3 py-2 rounded-xl bg-red-950/30 text-red-400 border border-red-500/20 hover:bg-red-950/50 text-xs font-semibold shrink-0 flex items-center justify-center gap-1.5"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                        <span>Batal</span>
                                    </button>
                                )}
                            </div>
                            {selectedCvName && (
                                <p className="text-[11px] font-mono text-emerald-400 mt-1.5 flex items-center gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>Siap disimpan: {selectedCvName}</span>
                                </p>
                            )}
                            {errors.cv_file && <p className="text-[11px] text-red-400 mt-1">{errors.cv_file}</p>}
                        </div>
                    </div>
                </div>

                {/* Main Profile Form */}
                <div className="rounded-3xl bg-[#1A1412] border border-[rgba(196,169,146,0.2)] p-6 sm:p-8 shadow-xl">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-[rgba(196,169,146,0.16)]">
                        <div>
                            <h3 className="font-display text-xl uppercase tracking-wider text-[#F5EFEB]">
                                Profile & Identity Information
                            </h3>
                            <p className="text-xs text-[#C8BBB2] mt-0.5">
                                Informasi publik yang ditampilkan di hero header, bio overview, dan kontak portofolio.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    value={data.full_name}
                                    onChange={(e) => setData('full_name', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] focus:border-[#C4A992] focus:outline-none text-[#F5EFEB]"
                                    required
                                />
                                {errors.full_name && <p className="text-[11px] text-red-400 mt-1">{errors.full_name}</p>}
                            </div>

                            <div>
                                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                    Display Name Outline (Hero Background) *
                                </label>
                                <input
                                    type="text"
                                    value={data.display_name_outline}
                                    onChange={(e) => setData('display_name_outline', e.target.value)}
                                    placeholder="RAFLI PRADIPTA"
                                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] focus:border-[#C4A992] focus:outline-none text-[#F5EFEB] font-display text-lg tracking-wider"
                                    required
                                />
                                {errors.display_name_outline && <p className="text-[11px] text-red-400 mt-1">{errors.display_name_outline}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div>
                                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                    Tagline / Role Pill *
                                </label>
                                <input
                                    type="text"
                                    value={data.tagline}
                                    onChange={(e) => setData('tagline', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] focus:border-[#C4A992] focus:outline-none text-[#F5EFEB]"
                                    required
                                />
                                {errors.tagline && <p className="text-[11px] text-red-400 mt-1">{errors.tagline}</p>}
                            </div>

                            <div>
                                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                    Current Primary Role
                                </label>
                                <input
                                    type="text"
                                    value={data.current_role}
                                    onChange={(e) => setData('current_role', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] focus:border-[#C4A992] focus:outline-none text-[#F5EFEB]"
                                />
                                {errors.current_role && <p className="text-[11px] text-red-400 mt-1">{errors.current_role}</p>}
                            </div>

                            <div>
                                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] focus:border-[#C4A992] focus:outline-none text-[#F5EFEB]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                Professional Bio
                            </label>
                            <textarea
                                rows="3"
                                value={data.bio}
                                onChange={(e) => setData('bio', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] focus:border-[#C4A992] focus:outline-none text-[#F5EFEB] resize-none"
                            ></textarea>
                            {errors.bio && <p className="text-[11px] text-red-400 mt-1">{errors.bio}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div>
                                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                    GitHub URL
                                </label>
                                <input
                                    type="url"
                                    value={data.github_url}
                                    onChange={(e) => setData('github_url', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] focus:border-[#C4A992] focus:outline-none text-[#F5EFEB]"
                                />
                                {errors.github_url && <p className="text-[11px] text-red-400 mt-1">{errors.github_url}</p>}
                            </div>

                            <div>
                                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                    LinkedIn URL
                                </label>
                                <input
                                    type="url"
                                    value={data.linkedin_url}
                                    onChange={(e) => setData('linkedin_url', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] focus:border-[#C4A992] focus:outline-none text-[#F5EFEB]"
                                />
                                {errors.linkedin_url && <p className="text-[11px] text-red-400 mt-1">{errors.linkedin_url}</p>}
                            </div>

                            <div>
                                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                    Instagram URL
                                </label>
                                <input
                                    type="url"
                                    value={data.instagram_url}
                                    onChange={(e) => setData('instagram_url', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] focus:border-[#C4A992] focus:outline-none text-[#F5EFEB]"
                                />
                                {errors.instagram_url && <p className="text-[11px] text-red-400 mt-1">{errors.instagram_url}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                    Contact Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] focus:border-[#C4A992] focus:outline-none text-[#F5EFEB]"
                                />
                                {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                    Phone / WhatsApp
                                </label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] focus:border-[#C4A992] focus:outline-none text-[#F5EFEB]"
                                />
                                {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                            </div>
                        </div>

                        {/* Submit Action */}
                        <div className="pt-4 flex items-center justify-between border-t border-[rgba(196,169,146,0.12)]">
                            <span className="text-[11px] text-[#958479]">
                                Perubahan data akan langsung aktif di landing page publik.
                            </span>

                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#C4A992] text-[#1A1412] hover:bg-[#D5BFAB] transition-all shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                <span>{processing ? 'Menyimpan...' : 'Simpan Semua Perubahan Profil'}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
