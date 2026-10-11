import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Components/AdminLayout';
import { 
    Plus, Trash2, Edit3, ExternalLink, Image as ImageIcon, 
    CheckCircle2, X, Sparkles, FolderGit2 
} from 'lucide-react';

export default function Index({ projects = [] }) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    // Form for Create
    const createForm = useForm({
        title: '',
        category: 'technical',
        is_featured: false,
        featured_order: 1,
        short_description: '',
        full_description: '',
        tech_stack_input: '',
        live_demo_url: '',
        github_repo_url: '',
        year: new Date().getFullYear().toString(),
        client_or_context: '',
        sort_order: 1,
        thumbnail: null,
    });

    // Form for Edit
    const editForm = useForm({
        title: '',
        category: 'technical',
        is_featured: false,
        featured_order: 1,
        short_description: '',
        full_description: '',
        tech_stack_input: '',
        live_demo_url: '',
        github_repo_url: '',
        year: '',
        client_or_context: '',
        sort_order: 1,
        thumbnail: null,
    });

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        const techStackArray = createForm.data.tech_stack_input
            ? createForm.data.tech_stack_input.split(',').map(s => s.trim()).filter(Boolean)
            : [];

        router.post('/admin/projects', {
            ...createForm.data,
            tech_stack: techStackArray,
        }, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                createForm.reset();
                setIsCreateOpen(false);
            },
        });
    };

    const handleStartEdit = (project) => {
        setEditingProject(project);
        editForm.setData({
            title: project.title || '',
            category: project.category || 'technical',
            is_featured: !!project.is_featured,
            featured_order: project.featured_order || 1,
            short_description: project.short_description || '',
            full_description: project.full_description || '',
            tech_stack_input: Array.isArray(project.tech_stack) ? project.tech_stack.join(', ') : '',
            live_demo_url: project.live_demo_url || '',
            github_repo_url: project.github_repo_url || '',
            year: project.year || '',
            client_or_context: project.client_or_context || '',
            sort_order: project.sort_order || 1,
            thumbnail: null,
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!editingProject) return;

        const techStackArray = editForm.data.tech_stack_input
            ? editForm.data.tech_stack_input.split(',').map(s => s.trim()).filter(Boolean)
            : [];

        router.post(`/admin/projects/${editingProject.id}`, {
            ...editForm.data,
            tech_stack: techStackArray,
        }, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setEditingProject(null);
            },
        });
    };

    const handleDelete = (id, title) => {
        if (confirm(`Hapus proyek "${title}" dari portofolio?`)) {
            router.delete(`/admin/projects/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout title="Projects Manager">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h3 className="font-display text-2xl uppercase tracking-wider text-[#F5EFEB]">
                        All Portfolio Projects ({projects.length})
                    </h3>
                    <p className="text-xs text-[#C8BBB2] mt-0.5 font-mono">
                        Manage technical and digital projects shown in 3D Carousel & Archive.
                    </p>
                </div>

                <button
                    onClick={() => setIsCreateOpen(true)}
                    className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C4A992] text-[#1A1412] hover:bg-[#D4BEA8] transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add New Project</span>
                </button>
            </div>

            {/* Projects Table */}
            <div className="rounded-3xl overflow-hidden bg-[#1A1412] border border-[rgba(196,169,146,0.2)] shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr className="border-b border-[rgba(196,169,146,0.16)] bg-[#241C18] text-[11px] font-mono uppercase tracking-wider text-[#958479]">
                                <th className="py-4 px-6">Preview</th>
                                <th className="py-4 px-6">Project Title</th>
                                <th className="py-4 px-6">Category</th>
                                <th className="py-4 px-6">Status</th>
                                <th className="py-4 px-6">Year</th>
                                <th className="py-4 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[rgba(196,169,146,0.12)]">
                            {projects.map((item) => (
                                <tr key={item.id} className="hover:bg-[#241C18] transition-colors">
                                    <td className="py-3 px-6">
                                        <div className="w-14 h-10 rounded-lg overflow-hidden bg-[#140F0D] border border-[rgba(196,169,146,0.2)]">
                                            {item.thumbnail_path ? (
                                                <img
                                                    src={`/storage/${item.thumbnail_path}`}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[#958479]">
                                                    <ImageIcon className="w-4 h-4" />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-3 px-6">
                                        <span className="font-bold text-sm text-[#F5EFEB] block">{item.title}</span>
                                        <span className="text-[11px] text-[#958479] line-clamp-1">{item.client_or_context}</span>
                                    </td>
                                    <td className="py-3 px-6">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                            item.category === 'technical'
                                                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/20'
                                                : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20'
                                        }`}>
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6">
                                        {item.is_featured ? (
                                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#C4A992]/20 text-[#C4A992] border border-[#C4A992]/30">
                                                Featured #{item.featured_order}
                                            </span>
                                        ) : (
                                            <span className="text-[#958479] text-[11px] font-mono">Archive</span>
                                        )}
                                    </td>
                                    <td className="py-3 px-6 font-mono text-[#958479]">
                                        {item.year || '—'}
                                    </td>
                                    <td className="py-3 px-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleStartEdit(item)}
                                                className="p-1.5 rounded-lg text-[#C8BBB2] hover:text-[#C4A992] hover:bg-[#140F0D] transition-colors cursor-pointer"
                                                title="Edit Project"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id, item.title)}
                                                className="p-1.5 rounded-lg text-[#C8BBB2] hover:text-red-400 hover:bg-[#140F0D] transition-colors cursor-pointer"
                                                title="Delete Project"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Project Modal */}
            {isCreateOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                    <div className="relative w-full max-w-2xl my-8 rounded-3xl bg-[#1A1412] border border-[rgba(196,169,146,0.3)] p-6 sm:p-8 shadow-2xl">
                        <button
                            onClick={() => setIsCreateOpen(false)}
                            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#241C18] text-[#C8BBB2] hover:text-white flex items-center justify-center cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <h3 className="font-display text-2xl uppercase tracking-wider text-[#F5EFEB] mb-6">
                            Add New Project to Portfolio
                        </h3>

                        <form onSubmit={handleCreateSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1">
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={createForm.data.title}
                                        onChange={(e) => createForm.setData('title', e.target.value)}
                                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] focus:border-[#C4A992] focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1">
                                        Category *
                                    </label>
                                    <select
                                        value={createForm.data.category}
                                        onChange={(e) => createForm.setData('category', e.target.value)}
                                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] focus:border-[#C4A992] focus:outline-none"
                                    >
                                        <option value="technical">Technical (Software & Code)</option>
                                        <option value="digital">Digital (Analytics & Data)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1">
                                        Year
                                    </label>
                                    <input
                                        type="text"
                                        value={createForm.data.year}
                                        onChange={(e) => createForm.setData('year', e.target.value)}
                                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] focus:border-[#C4A992] focus:outline-none"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1">
                                        Client / Context
                                    </label>
                                    <input
                                        type="text"
                                        value={createForm.data.client_or_context}
                                        onChange={(e) => createForm.setData('client_or_context', e.target.value)}
                                        placeholder="e.g. Meta Capstone, Client Project"
                                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] focus:border-[#C4A992] focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1">
                                    Short Description (Shown on Card) *
                                </label>
                                <textarea
                                    required
                                    rows="2"
                                    value={createForm.data.short_description}
                                    onChange={(e) => createForm.setData('short_description', e.target.value)}
                                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] focus:border-[#C4A992] focus:outline-none resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1">
                                    Tech Stack (comma separated, e.g. React, TailwindCSS, Vite)
                                </label>
                                <input
                                    type="text"
                                    value={createForm.data.tech_stack_input}
                                    onChange={(e) => createForm.setData('tech_stack_input', e.target.value)}
                                    placeholder="React, Laravel, MySQL, REST API"
                                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] focus:border-[#C4A992] focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1">
                                        GitHub Repo URL
                                    </label>
                                    <input
                                        type="url"
                                        value={createForm.data.github_repo_url}
                                        onChange={(e) => createForm.setData('github_repo_url', e.target.value)}
                                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] focus:border-[#C4A992] focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1">
                                        Live Demo URL
                                    </label>
                                    <input
                                        type="url"
                                        value={createForm.data.live_demo_url}
                                        onChange={(e) => createForm.setData('live_demo_url', e.target.value)}
                                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] focus:border-[#C4A992] focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="p-3 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={createForm.data.is_featured}
                                        onChange={(e) => createForm.setData('is_featured', e.target.checked)}
                                        className="w-4 h-4 rounded text-[#C4A992]"
                                    />
                                    <span className="text-xs font-semibold text-[#F5EFEB]">Show in 3D Cover Flow Carousel (Featured)</span>
                                </label>
                                {createForm.data.is_featured && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-mono text-[#958479]">Carousel Order:</span>
                                        <input
                                            type="number"
                                            value={createForm.data.featured_order}
                                            onChange={(e) => createForm.setData('featured_order', parseInt(e.target.value) || 1)}
                                            className="w-14 px-2 py-1 rounded bg-[#140F0D] text-xs text-center border border-[rgba(196,169,146,0.2)]"
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1">
                                    Project Thumbnail Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => createForm.setData('thumbnail', e.target.files[0])}
                                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] text-[#C8BBB2] file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#C4A992] file:text-[#1A1412]"
                                />
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateOpen(false)}
                                    className="px-4 py-2 rounded-full text-xs font-semibold text-[#C8BBB2] hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C4A992] text-[#1A1412] hover:bg-[#D4BEA8]"
                                >
                                    Save Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Project Modal */}
            {editingProject && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                    <div className="relative w-full max-w-2xl my-8 rounded-3xl bg-[#1A1412] border border-[rgba(196,169,146,0.3)] p-6 sm:p-8 shadow-2xl">
                        <button
                            onClick={() => setEditingProject(null)}
                            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#241C18] text-[#C8BBB2] hover:text-white flex items-center justify-center cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <h3 className="font-display text-2xl uppercase tracking-wider text-[#F5EFEB] mb-6">
                            Edit Project: {editingProject.title}
                        </h3>

                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1">
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={editForm.data.title}
                                        onChange={(e) => editForm.setData('title', e.target.value)}
                                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] focus:border-[#C4A992] focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1">
                                        Category *
                                    </label>
                                    <select
                                        value={editForm.data.category}
                                        onChange={(e) => editForm.setData('category', e.target.value)}
                                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] focus:border-[#C4A992] focus:outline-none"
                                    >
                                        <option value="technical">Technical (Software & Code)</option>
                                        <option value="digital">Digital (Analytics & Data)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1">
                                        Year
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.data.year}
                                        onChange={(e) => editForm.setData('year', e.target.value)}
                                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] focus:border-[#C4A992] focus:outline-none"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1">
                                        Client / Context
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.data.client_or_context}
                                        onChange={(e) => editForm.setData('client_or_context', e.target.value)}
                                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] focus:border-[#C4A992] focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1">
                                    Short Description *
                                </label>
                                <textarea
                                    required
                                    rows="2"
                                    value={editForm.data.short_description}
                                    onChange={(e) => editForm.setData('short_description', e.target.value)}
                                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] focus:border-[#C4A992] focus:outline-none resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1">
                                    Tech Stack (comma separated)
                                </label>
                                <input
                                    type="text"
                                    value={editForm.data.tech_stack_input}
                                    onChange={(e) => editForm.setData('tech_stack_input', e.target.value)}
                                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] focus:border-[#C4A992] focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1">
                                        GitHub Repo URL
                                    </label>
                                    <input
                                        type="url"
                                        value={editForm.data.github_repo_url}
                                        onChange={(e) => editForm.setData('github_repo_url', e.target.value)}
                                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] focus:border-[#C4A992] focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1">
                                        Live Demo URL
                                    </label>
                                    <input
                                        type="url"
                                        value={editForm.data.live_demo_url}
                                        onChange={(e) => editForm.setData('live_demo_url', e.target.value)}
                                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] focus:border-[#C4A992] focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="p-3 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={editForm.data.is_featured}
                                        onChange={(e) => editForm.setData('is_featured', e.target.checked)}
                                        className="w-4 h-4 rounded text-[#C4A992]"
                                    />
                                    <span className="text-xs font-semibold text-[#F5EFEB]">Show in 3D Cover Flow Carousel (Featured)</span>
                                </label>
                                {editForm.data.is_featured && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-mono text-[#958479]">Carousel Order:</span>
                                        <input
                                            type="number"
                                            value={editForm.data.featured_order}
                                            onChange={(e) => editForm.setData('featured_order', parseInt(e.target.value) || 1)}
                                            className="w-14 px-2 py-1 rounded bg-[#140F0D] text-xs text-center border border-[rgba(196,169,146,0.2)]"
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1">
                                    Update Thumbnail (Optional)
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => editForm.setData('thumbnail', e.target.files[0])}
                                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] text-[#C8BBB2] file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#C4A992] file:text-[#1A1412]"
                                />
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingProject(null)}
                                    className="px-4 py-2 rounded-full text-xs font-semibold text-[#C8BBB2] hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C4A992] text-[#1A1412] hover:bg-[#D4BEA8]"
                                >
                                    Update Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
