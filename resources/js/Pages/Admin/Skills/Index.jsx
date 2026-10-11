import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Components/AdminLayout';
import { 
    Code2, Plus, Edit2, Trash2, CheckCircle2, Sparkles, 
    Layers, Server, Brain, Wrench, ArrowUpDown, X, AlertCircle,
    Layout, Database, BarChart3, PieChart, Terminal, Cpu, GitBranch, 
    Palette, Zap, Workflow, Globe, Box
} from 'lucide-react';

// Suggested Lucide icons for quick selection in the modal
const SUGGESTED_ICONS = [
    { name: 'Code2', label: 'Code', icon: Code2 },
    { name: 'Layout', label: 'Layout / UI', icon: Layout },
    { name: 'Database', label: 'Database', icon: Database },
    { name: 'Server', label: 'Server / Backend', icon: Server },
    { name: 'Brain', label: 'AI / Machine Learning', icon: Brain },
    { name: 'BarChart3', label: 'Bar Chart / BI', icon: BarChart3 },
    { name: 'PieChart', label: 'Pie Chart / Analytics', icon: PieChart },
    { name: 'Terminal', label: 'Terminal / CLI', icon: Terminal },
    { name: 'Cpu', label: 'Processor / Systems', icon: Cpu },
    { name: 'GitBranch', label: 'Git / Version Control', icon: GitBranch },
    { name: 'Palette', label: 'Design / Prototyping', icon: Palette },
    { name: 'Zap', label: 'Performance / Vite', icon: Zap },
    { name: 'Workflow', label: 'Automation / Pipeline', icon: Workflow },
    { name: 'Globe', label: 'Web / Cloud', icon: Globe },
    { name: 'Layers', label: 'Architecture / Fullstack', icon: Layers },
    { name: 'Box', label: 'Package / Tools', icon: Box },
];

export default function SkillsIndex({ skills = [], stats = {} }) {
    const [activeTab, setActiveTab] = useState('all');
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);
    const [deletingSkill, setDeletingSkill] = useState(null);

    // Form for creating a new skill
    const createForm = useForm({
        name: '',
        category: 'frontend',
        icon_name: 'Code2',
        proficiency_level: 'Advanced',
        is_highlighted: true,
        sort_order: 1,
    });

    // Form for editing an existing skill
    const editForm = useForm({
        name: '',
        category: 'frontend',
        icon_name: 'Code2',
        proficiency_level: 'Advanced',
        is_highlighted: true,
        sort_order: 1,
    });

    // Filter skills by selected tab
    const filteredSkills = skills.filter((item) => {
        if (activeTab === 'all') return true;
        return item.category === activeTab;
    });

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        createForm.post('/admin/skills', {
            preserveScroll: true,
            onSuccess: () => {
                createForm.reset();
                setIsCreateOpen(false);
            },
        });
    };

    const handleStartEdit = (skill) => {
        setEditingSkill(skill);
        editForm.setData({
            name: skill.name || '',
            category: skill.category || 'frontend',
            icon_name: skill.icon_name || 'Code2',
            proficiency_level: skill.proficiency_level || 'Advanced',
            is_highlighted: !!skill.is_highlighted,
            sort_order: skill.sort_order || 1,
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!editingSkill) return;

        editForm.post(`/admin/skills/${editingSkill.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setEditingSkill(null);
            },
        });
    };

    const handleDeleteSubmit = () => {
        if (!deletingSkill) return;
        router.delete(`/admin/skills/${deletingSkill.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setDeletingSkill(null);
            },
        });
    };

    const handleToggleHighlight = (skill) => {
        router.post(`/admin/skills/${skill.id}/toggle-highlight`, {}, {
            preserveScroll: true,
        });
    };

    // Category Badge Helper
    const getCategoryBadge = (cat) => {
        switch (cat) {
            case 'frontend':
                return { label: 'Frontend', bg: 'bg-sky-500/10 text-sky-400 border-sky-500/30' };
            case 'backend':
                return { label: 'Backend & APIs', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
            case 'data_ai':
                return { label: 'Data & AI', bg: 'bg-purple-500/10 text-purple-400 border-purple-500/30' };
            case 'tools':
                return { label: 'Tools & DevOps', bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30' };
            default:
                return { label: cat, bg: 'bg-stone-500/10 text-stone-400 border-stone-500/30' };
        }
    };

    // Proficiency Badge Helper
    const getProficiencyBadge = (level) => {
        switch (level) {
            case 'Advanced':
                return 'bg-[#C4A992]/20 text-[#C4A992] border-[#C4A992]/40 font-bold';
            case 'Proficient':
                return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
            case 'Familiar':
                return 'bg-stone-600/20 text-stone-300 border-stone-600/30';
            default:
                return 'bg-stone-700/20 text-stone-400 border-stone-700/30';
        }
    };

    // Render icon dynamically
    const renderIconPreview = (iconName) => {
        const found = SUGGESTED_ICONS.find(i => i.name.toLowerCase() === (iconName || '').toLowerCase());
        if (found) {
            const IconComponent = found.icon;
            return <IconComponent className="w-4 h-4 text-[#C4A992]" />;
        }
        return <Code2 className="w-4 h-4 text-[#C4A992]" />;
    };

    return (
        <AdminLayout title="Skills & Tech Stack Manager">
            {/* Top Stats Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
                <div className="p-4 rounded-2xl bg-[#1A1412] border border-[rgba(196,169,146,0.2)]">
                    <span className="text-[10px] font-mono text-[#958479] uppercase tracking-wider block">Total Stack</span>
                    <span className="font-display text-2xl text-[#F5EFEB] mt-0.5 block">{stats.total || skills.length}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#1A1412] border border-[rgba(196,169,146,0.2)]">
                    <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider block">Frontend</span>
                    <span className="font-display text-2xl text-[#F5EFEB] mt-0.5 block">{stats.frontend || 0}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#1A1412] border border-[rgba(196,169,146,0.2)]">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">Backend</span>
                    <span className="font-display text-2xl text-[#F5EFEB] mt-0.5 block">{stats.backend || 0}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#1A1412] border border-[rgba(196,169,146,0.2)]">
                    <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block">Data & AI</span>
                    <span className="font-display text-2xl text-[#F5EFEB] mt-0.5 block">{stats.data_ai || 0}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#1A1412] border border-[rgba(196,169,146,0.2)]">
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">Tools</span>
                    <span className="font-display text-2xl text-[#F5EFEB] mt-0.5 block">{stats.tools || 0}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#1A1412] border border-[rgba(196,169,146,0.2)]">
                    <span className="text-[10px] font-mono text-[#C4A992] uppercase tracking-wider block">Highlighted</span>
                    <span className="font-display text-2xl text-[#C4A992] mt-0.5 block">{stats.highlighted || 0}</span>
                </div>
            </div>

            {/* Actions Bar & Filter Tabs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                {/* Category Filter Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#1A1412] border border-[rgba(196,169,146,0.2)] rounded-2xl">
                    {[
                        { id: 'all', label: 'All Stack', count: skills.length },
                        { id: 'frontend', label: 'Frontend', count: stats.frontend || 0 },
                        { id: 'backend', label: 'Backend', count: stats.backend || 0 },
                        { id: 'data_ai', label: 'Data & AI', count: stats.data_ai || 0 },
                        { id: 'tools', label: 'Tools', count: stats.tools || 0 },
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

                {/* Add New Skill Button */}
                <button
                    onClick={() => setIsCreateOpen(true)}
                    className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C4A992] text-[#1A1412] hover:bg-[#D4BEA8] transition-all shadow-lg flex items-center gap-2 cursor-pointer shrink-0"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add New Skill</span>
                </button>
            </div>

            {/* Skills Table */}
            <div className="rounded-3xl overflow-hidden bg-[#1A1412] border border-[rgba(196,169,146,0.2)] shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr className="border-b border-[rgba(196,169,146,0.16)] bg-[#241C18] text-[11px] font-mono uppercase tracking-wider text-[#958479]">
                                <th className="py-4 px-6">Skill & Icon</th>
                                <th className="py-4 px-6">Category</th>
                                <th className="py-4 px-6">Proficiency</th>
                                <th className="py-4 px-6 text-center">Bento Highlight</th>
                                <th className="py-4 px-6 text-center">Order</th>
                                <th className="py-4 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[rgba(196,169,146,0.12)]">
                            {filteredSkills.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="py-12 text-center text-[#958479]">
                                        Belum ada skill pada kategori ini. Klik "Add New Skill" untuk menambahkan.
                                    </td>
                                </tr>
                            ) : (
                                filteredSkills.map((item) => {
                                    const catBadge = getCategoryBadge(item.category);
                                    return (
                                        <tr key={item.id} className="hover:bg-[#241C18] transition-colors">
                                            {/* Skill Name & Icon */}
                                            <td className="py-3.5 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-[#241C18] border border-[rgba(196,169,146,0.2)] flex items-center justify-center shrink-0">
                                                        {renderIconPreview(item.icon_name)}
                                                    </div>
                                                    <div>
                                                        <span className="font-bold text-sm text-[#F5EFEB] block">{item.name}</span>
                                                        <span className="text-[10px] font-mono text-[#958479]">Icon: {item.icon_name || 'Code2'}</span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Category */}
                                            <td className="py-3.5 px-6">
                                                <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium border ${catBadge.bg}`}>
                                                    {catBadge.label}
                                                </span>
                                            </td>

                                            {/* Proficiency */}
                                            <td className="py-3.5 px-6">
                                                <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium border ${getProficiencyBadge(item.proficiency_level)}`}>
                                                    {item.proficiency_level || 'Proficient'}
                                                </span>
                                            </td>

                                            {/* Highlight Switch */}
                                            <td className="py-3.5 px-6 text-center">
                                                <button
                                                    onClick={() => handleToggleHighlight(item)}
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                                                        item.is_highlighted
                                                            ? 'bg-amber-400/15 text-amber-300 border-amber-400/40 hover:bg-amber-400/25'
                                                            : 'bg-stone-800/40 text-stone-500 border-stone-700/40 hover:text-stone-300'
                                                    }`}
                                                    title="Klik untuk mengubah status highlight di Bento Grid"
                                                >
                                                    <Sparkles className={`w-3 h-3 ${item.is_highlighted ? 'text-amber-400' : 'text-stone-500'}`} />
                                                    <span>{item.is_highlighted ? 'Highlighted' : 'Normal'}</span>
                                                </button>
                                            </td>

                                            {/* Sort Order */}
                                            <td className="py-3.5 px-6 text-center font-mono text-[#C8BBB2]">
                                                {item.sort_order}
                                            </td>

                                            {/* Actions */}
                                            <td className="py-3.5 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleStartEdit(item)}
                                                        className="p-1.5 rounded-lg bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#C4A992] hover:bg-[#C4A992] hover:text-[#1A1412] transition-colors cursor-pointer"
                                                        title="Edit Skill"
                                                    >
                                                        <Edit2 className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() => setDeletingSkill(item)}
                                                        className="p-1.5 rounded-lg bg-[#241C18] border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                                                        title="Hapus Skill"
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

            {/* Modal: Create Skill */}
            {isCreateOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-lg bg-[#1A1412] border border-[rgba(196,169,146,0.3)] rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-4 border-b border-[rgba(196,169,146,0.16)] mb-6">
                            <div>
                                <h3 className="font-display text-2xl uppercase tracking-wider text-[#F5EFEB]">Add New Skill</h3>
                                <p className="text-xs text-[#C8BBB2]">Tambahkan keahlian baru ke dalam Bento Grid.</p>
                            </div>
                            <button
                                onClick={() => setIsCreateOpen(false)}
                                className="p-2 rounded-xl bg-[#241C18] text-[#958479] hover:text-[#F5EFEB] transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="space-y-4">
                            {/* Skill Name */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                    Skill Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: React.js, PyTorch, Power BI"
                                    value={createForm.data.name}
                                    onChange={(e) => createForm.setData('name', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                />
                                {createForm.errors.name && (
                                    <span className="text-[11px] text-red-400 mt-1 block">{createForm.errors.name}</span>
                                )}
                            </div>

                            {/* Category & Proficiency Level Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                        Category *
                                    </label>
                                    <select
                                        value={createForm.data.category}
                                        onChange={(e) => createForm.setData('category', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none cursor-pointer"
                                    >
                                        <option value="frontend">Frontend Architecture</option>
                                        <option value="backend">Backend & APIs</option>
                                        <option value="data_ai">Data Science & AI</option>
                                        <option value="tools">Tools & DevOps</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                        Proficiency Level
                                    </label>
                                    <select
                                        value={createForm.data.proficiency_level}
                                        onChange={(e) => createForm.setData('proficiency_level', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none cursor-pointer"
                                    >
                                        <option value="Advanced">Advanced (Expertise)</option>
                                        <option value="Proficient">Proficient (Strong)</option>
                                        <option value="Familiar">Familiar (Competent)</option>
                                        <option value="Beginner">Beginner (Foundational)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Icon Name Selection */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                    Icon Name (Lucide Icon)
                                </label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        placeholder="Pilih di bawah atau ketik: Code2, Terminal, Brain"
                                        value={createForm.data.icon_name}
                                        onChange={(e) => createForm.setData('icon_name', e.target.value)}
                                        className="flex-1 px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                    />
                                    <div className="w-10 h-10 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] flex items-center justify-center shrink-0">
                                        {renderIconPreview(createForm.data.icon_name)}
                                    </div>
                                </div>

                                {/* Quick Picker Chips */}
                                <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-[#140F0D] border border-[rgba(196,169,146,0.12)] max-h-24 overflow-y-auto">
                                    {SUGGESTED_ICONS.map((ico) => {
                                        const IcoComponent = ico.icon;
                                        const isSelected = (createForm.data.icon_name || '').toLowerCase() === ico.name.toLowerCase();
                                        return (
                                            <button
                                                type="button"
                                                key={ico.name}
                                                onClick={() => createForm.setData('icon_name', ico.name)}
                                                className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-mono transition-colors cursor-pointer ${
                                                    isSelected
                                                        ? 'bg-[#C4A992] text-[#1A1412] font-bold'
                                                        : 'bg-[#241C18] text-[#C8BBB2] hover:text-[#F5EFEB]'
                                                }`}
                                            >
                                                <IcoComponent className="w-3 h-3" />
                                                <span>{ico.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Sort Order & Highlight Toggle */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                        Sort Order (Urutan)
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={createForm.data.sort_order}
                                        onChange={(e) => createForm.setData('sort_order', parseInt(e.target.value) || 1)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                    />
                                </div>

                                <div className="flex items-end pb-1">
                                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={createForm.data.is_highlighted}
                                            onChange={(e) => createForm.setData('is_highlighted', e.target.checked)}
                                            className="w-4 h-4 rounded text-[#C4A992] bg-[#241C18] border-[rgba(196,169,146,0.3)] focus:ring-[#C4A992]"
                                        />
                                        <div>
                                            <span className="text-xs font-semibold text-[#F5EFEB] block">Highlight in Bento Grid</span>
                                            <span className="text-[10px] text-[#958479]">Beri efek glow & prioritas</span>
                                        </div>
                                    </label>
                                </div>
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
                                    {createForm.processing ? 'Menyimpan...' : 'Simpan Skill'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Edit Skill */}
            {editingSkill && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-lg bg-[#1A1412] border border-[rgba(196,169,146,0.3)] rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-4 border-b border-[rgba(196,169,146,0.16)] mb-6">
                            <div>
                                <h3 className="font-display text-2xl uppercase tracking-wider text-[#F5EFEB]">Edit Skill</h3>
                                <p className="text-xs text-[#C8BBB2]">Perbarui detail dan kategori skill ini.</p>
                            </div>
                            <button
                                onClick={() => setEditingSkill(null)}
                                className="p-2 rounded-xl bg-[#241C18] text-[#958479] hover:text-[#F5EFEB] transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            {/* Skill Name */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                    Skill Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={editForm.data.name}
                                    onChange={(e) => editForm.setData('name', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                />
                                {editForm.errors.name && (
                                    <span className="text-[11px] text-red-400 mt-1 block">{editForm.errors.name}</span>
                                )}
                            </div>

                            {/* Category & Proficiency Level Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                        Category *
                                    </label>
                                    <select
                                        value={editForm.data.category}
                                        onChange={(e) => editForm.setData('category', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none cursor-pointer"
                                    >
                                        <option value="frontend">Frontend Architecture</option>
                                        <option value="backend">Backend & APIs</option>
                                        <option value="data_ai">Data Science & AI</option>
                                        <option value="tools">Tools & DevOps</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                        Proficiency Level
                                    </label>
                                    <select
                                        value={editForm.data.proficiency_level}
                                        onChange={(e) => editForm.setData('proficiency_level', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none cursor-pointer"
                                    >
                                        <option value="Advanced">Advanced (Expertise)</option>
                                        <option value="Proficient">Proficient (Strong)</option>
                                        <option value="Familiar">Familiar (Competent)</option>
                                        <option value="Beginner">Beginner (Foundational)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Icon Name Selection */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                    Icon Name (Lucide Icon)
                                </label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={editForm.data.icon_name}
                                        onChange={(e) => editForm.setData('icon_name', e.target.value)}
                                        className="flex-1 px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                    />
                                    <div className="w-10 h-10 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] flex items-center justify-center shrink-0">
                                        {renderIconPreview(editForm.data.icon_name)}
                                    </div>
                                </div>

                                {/* Quick Picker Chips */}
                                <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-[#140F0D] border border-[rgba(196,169,146,0.12)] max-h-24 overflow-y-auto">
                                    {SUGGESTED_ICONS.map((ico) => {
                                        const IcoComponent = ico.icon;
                                        const isSelected = (editForm.data.icon_name || '').toLowerCase() === ico.name.toLowerCase();
                                        return (
                                            <button
                                                type="button"
                                                key={ico.name}
                                                onClick={() => editForm.setData('icon_name', ico.name)}
                                                className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-mono transition-colors cursor-pointer ${
                                                    isSelected
                                                        ? 'bg-[#C4A992] text-[#1A1412] font-bold'
                                                        : 'bg-[#241C18] text-[#C8BBB2] hover:text-[#F5EFEB]'
                                                }`}
                                            >
                                                <IcoComponent className="w-3 h-3" />
                                                <span>{ico.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Sort Order & Highlight Toggle */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                                        Sort Order (Urutan)
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={editForm.data.sort_order}
                                        onChange={(e) => editForm.setData('sort_order', parseInt(e.target.value) || 1)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] text-[#F5EFEB] text-xs focus:border-[#C4A992] focus:outline-none"
                                    />
                                </div>

                                <div className="flex items-end pb-1">
                                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={editForm.data.is_highlighted}
                                            onChange={(e) => editForm.setData('is_highlighted', e.target.checked)}
                                            className="w-4 h-4 rounded text-[#C4A992] bg-[#241C18] border-[rgba(196,169,146,0.3)] focus:ring-[#C4A992]"
                                        />
                                        <div>
                                            <span className="text-xs font-semibold text-[#F5EFEB] block">Highlight in Bento Grid</span>
                                            <span className="text-[10px] text-[#958479]">Beri efek glow & prioritas</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end gap-3 pt-6 border-t border-[rgba(196,169,146,0.16)]">
                                <button
                                    type="button"
                                    onClick={() => setEditingSkill(null)}
                                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#C8BBB2] hover:bg-[#241C18] transition-colors cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={editForm.processing}
                                    className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#C4A992] text-[#1A1412] hover:bg-[#D4BEA8] transition-all cursor-pointer shadow-lg disabled:opacity-50"
                                >
                                    {editForm.processing ? 'Menyimpan...' : 'Perbarui Skill'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Delete Confirmation */}
            {deletingSkill && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-md bg-[#1A1412] border border-red-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
                        <div className="flex items-center gap-3 text-red-400 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
                                <AlertCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-display text-xl uppercase tracking-wider text-[#F5EFEB]">Hapus Skill?</h3>
                                <p className="text-xs text-[#C8BBB2]">Tindakan ini tidak dapat dibatalkan.</p>
                            </div>
                        </div>

                        <p className="text-xs text-[#C8BBB2] leading-relaxed mb-6">
                            Apakah Anda yakin ingin menghapus skill <strong className="text-[#F5EFEB]">{deletingSkill.name}</strong> dari kategori <span className="text-[#C4A992]">{deletingSkill.category}</span>?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setDeletingSkill(null)}
                                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#C8BBB2] hover:bg-[#241C18] transition-colors cursor-pointer"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteSubmit}
                                className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-red-500 text-white hover:bg-red-600 transition-all cursor-pointer shadow-lg"
                            >
                                Ya, Hapus Skill
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
