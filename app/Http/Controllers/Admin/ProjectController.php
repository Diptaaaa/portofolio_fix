<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Project;

class ProjectController extends Controller
{
    public function index(): Response
    {
        $projects = Project::orderBy('sort_order')->orderByDesc('created_at')->get();

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'category' => 'required|in:technical,digital',
            'is_featured' => 'boolean',
            'featured_order' => 'nullable|integer',
            'short_description' => 'required|string|max:300',
            'full_description' => 'nullable|string',
            'tech_stack' => 'nullable|array',
            'tech_stack.*' => 'string|max:50',
            'live_demo_url' => 'nullable|url|max:255',
            'github_repo_url' => 'nullable|url|max:255',
            'year' => 'nullable|string|max:10',
            'client_or_context' => 'nullable|string|max:150',
            'sort_order' => 'nullable|integer',
            'thumbnail' => 'nullable|image|max:5120',
        ]);

        $slug = Str::slug($validated['title']);
        $originalSlug = $slug;
        $count = 1;
        while (Project::where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-{$count}";
            $count++;
        }
        $validated['slug'] = $slug;

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('projects', 'public');
            $validated['thumbnail_path'] = $path;
        }

        unset($validated['thumbnail']);
        Project::create($validated);

        return redirect()->back()->with('success', 'Proyek berhasil ditambahkan ke portofolio.');
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'category' => 'required|in:technical,digital',
            'is_featured' => 'boolean',
            'featured_order' => 'nullable|integer',
            'short_description' => 'required|string|max:300',
            'full_description' => 'nullable|string',
            'tech_stack' => 'nullable|array',
            'tech_stack.*' => 'string|max:50',
            'live_demo_url' => 'nullable|url|max:255',
            'github_repo_url' => 'nullable|url|max:255',
            'year' => 'nullable|string|max:10',
            'client_or_context' => 'nullable|string|max:150',
            'sort_order' => 'nullable|integer',
            'thumbnail' => 'nullable|image|max:5120',
        ]);

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('projects', 'public');
            $validated['thumbnail_path'] = $path;
        }

        unset($validated['thumbnail']);
        $project->update($validated);

        return redirect()->back()->with('success', 'Proyek berhasil diperbarui.');
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return redirect()->back()->with('success', 'Proyek berhasil dihapus.');
    }
}
