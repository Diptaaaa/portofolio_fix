<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Skill;

class SkillController extends Controller
{
    public function index(): Response
    {
        $skills = Skill::orderBy('category')
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        $stats = [
            'total' => $skills->count(),
            'frontend' => $skills->where('category', 'frontend')->count(),
            'backend' => $skills->where('category', 'backend')->count(),
            'data_ai' => $skills->where('category', 'data_ai')->count(),
            'tools' => $skills->where('category', 'tools')->count(),
            'highlighted' => $skills->where('is_highlighted', true)->count(),
        ];

        return Inertia::render('Admin/Skills/Index', [
            'skills' => $skills,
            'stats' => $stats,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'category' => 'required|in:frontend,backend,data_ai,tools',
            'icon_name' => 'nullable|string|max:50',
            'proficiency_level' => 'nullable|string|max:50',
            'is_highlighted' => 'boolean',
            'sort_order' => 'nullable|integer',
        ]);

        if (!isset($validated['sort_order']) || $validated['sort_order'] === null) {
            $maxOrder = Skill::where('category', $validated['category'])->max('sort_order') ?? 0;
            $validated['sort_order'] = $maxOrder + 1;
        }

        Skill::create($validated);

        return redirect()->back()->with('success', 'Skill berhasil ditambahkan ke tech stack.');
    }

    public function update(Request $request, Skill $skill)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'category' => 'required|in:frontend,backend,data_ai,tools',
            'icon_name' => 'nullable|string|max:50',
            'proficiency_level' => 'nullable|string|max:50',
            'is_highlighted' => 'boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $skill->update($validated);

        return redirect()->back()->with('success', 'Skill berhasil diperbarui.');
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();

        return redirect()->back()->with('success', 'Skill berhasil dihapus.');
    }

    public function toggleHighlight(Skill $skill)
    {
        $skill->update([
            'is_highlighted' => !$skill->is_highlighted,
        ]);

        return redirect()->back()->with('success', 'Status highlight skill berhasil diubah.');
    }
}
