<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Experience;

class ExperienceController extends Controller
{
    public function index(): Response
    {
        $experiences = Experience::orderBy('type')
            ->orderBy('sort_order')
            ->orderByDesc('created_at')
            ->get();

        $stats = [
            'total' => $experiences->count(),
            'work' => $experiences->where('type', 'work')->count(),
            'education' => $experiences->where('type', 'education')->count(),
            'organization' => $experiences->where('type', 'organization')->count(),
        ];

        return Inertia::render('Admin/Experiences/Index', [
            'experiences' => $experiences,
            'stats' => $stats,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'role' => 'required|string|max:150',
            'company_or_org' => 'required|string|max:150',
            'period' => 'required|string|max:100',
            'description' => 'nullable|string',
            'type' => 'required|in:work,education,organization',
            'sort_order' => 'nullable|integer',
        ]);

        if (!isset($validated['sort_order']) || $validated['sort_order'] === null) {
            $maxOrder = Experience::where('type', $validated['type'])->max('sort_order') ?? 0;
            $validated['sort_order'] = $maxOrder + 1;
        }

        Experience::create($validated);

        return redirect()->back()->with('success', 'Riwayat pengalaman berhasil ditambahkan.');
    }

    public function update(Request $request, Experience $experience)
    {
        $validated = $request->validate([
            'role' => 'required|string|max:150',
            'company_or_org' => 'required|string|max:150',
            'period' => 'required|string|max:100',
            'description' => 'nullable|string',
            'type' => 'required|in:work,education,organization',
            'sort_order' => 'nullable|integer',
        ]);

        $experience->update($validated);

        return redirect()->back()->with('success', 'Riwayat pengalaman berhasil diperbarui.');
    }

    public function destroy(Experience $experience)
    {
        $experience->delete();

        return redirect()->back()->with('success', 'Riwayat pengalaman berhasil dihapus.');
    }
}
